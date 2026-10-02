import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

// Exercise the shipped template, not a reimplementation. No bootstrap, installs,
// repositories, real fetches, browser services, or external dependencies needed.
const html = readFileSync(new URL('../templates/starter-dashboard.html.template', import.meta.url), 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length, 1, 'expected one inline starter script');
const script = scripts[0][1];

const weather = { current_weather: { temperature: 0, windspeed: 0, winddirection: 0, time: '2020-01-01T12:00' } };
const seismic = { features: [{ properties: { mag: 4.6, place: 'Fixture City', time: Date.parse('2020-01-01T11:00:00Z') }, geometry: { coordinates: [100, 13, 10] } }] };
const fx = { date: '2019-12-31', rates: { THB: 32.1, EUR: 0.9, JPY: 110.2 } };
const good = [weather, seismic, fx];

function harness(fixtures = good) {
  const elements = new Map([...html.matchAll(/id="([^"]+)"[^>]*>([^<]*)/g)]
    .map(([, id, text]) => [id, { textContent: text, dataset: {} }]));
  elements.get('system-status').dataset.state = 'pending';
  let run;
  let inputs = fixtures;
  let requests = [];
  const warnings = [];
  const context = vm.createContext({
    document: { getElementById(id) { assert.ok(elements.has(id), `template is missing #${id}`); return elements.get(id); } },
    window: { addEventListener(event, callback) { assert.equal(event, 'DOMContentLoaded'); run = callback; } },
    console: { warn(...args) { warnings.push(args); } },
    performance: { now: () => 0 },
    async fetch(url) {
      const index = requests.length;
      requests.push(url);
      assert.ok(index < inputs.length, `unexpected request ${url}`);
      const value = inputs[index];
      if (value instanceof Error) throw value;
      if (value?.httpError) return { ok: false, status: value.httpError };
      return { ok: true, async json() { if (value?.jsonError) throw new SyntaxError('fixture JSON failure'); return structuredClone(value); } };
    }
  });
  vm.runInContext(script, context, { timeout: 1000 });
  assert.equal(typeof run, 'function');
  return {
    text: id => elements.get(id).textContent,
    state: () => elements.get('system-status').dataset.state,
    warnings,
    async load(next = inputs) { inputs = next; requests = []; await run(); assert.equal(requests.length, 3); },
    requests: () => requests
  };
}

function assertUnavailable(h) {
  assert.equal(h.state(), 'unavailable');
  assert.equal(h.text('status-text'), 'UNAVAILABLE · 0/3 FEEDS');
  assert.equal(h.text('weather-temp'), '--°C');
  assert.equal(h.text('quake-mag'), 'M --');
  assert.equal(h.text('fx-rate'), '-- THB');
  for (const id of ['weather-meta', 'quake-meta', 'fx-meta']) assert.match(h.text(id), /UNAVAILABLE$/);
}

test('initial state does not announce successful or live data', () => {
  const h = harness();
  assert.equal(h.text('status-text'), 'NOT FETCHED');
  assert.equal(h.state(), 'pending');
  assert.match(html, /\.status-dot\s*\{[^}]*background-color: var\(--text-dim\)/);
});

test('network, HTTP and JSON failures cannot produce a green LIVE state', async () => {
  const h = harness([new Error('offline'), { httpError: 503 }, { jsonError: true }]);
  await h.load();
  assertUnavailable(h);
  assert.equal(h.warnings.length, 3);
});

test('one successful provider is partial, and later providers are still attempted', async () => {
  const h = harness([weather, new Error('offline'), { httpError: 429 }]);
  await h.load();
  assert.equal(h.state(), 'partial');
  assert.equal(h.text('status-text'), 'PARTIAL · 1/3 FEEDS');
  assert.equal(h.text('weather-temp'), '0°C');
  assert.equal(h.text('weather-wind'), '0 km/h');
  assert.match(h.text('quake-meta'), /UNAVAILABLE$/);
  assert.match(h.text('fx-meta'), /UNAVAILABLE$/);
});

test('valid dated data is a snapshot; old observations never become LIVE', async () => {
  const h = harness();
  await h.load();
  assert.equal(h.state(), 'complete');
  assert.equal(h.text('status-text'), 'SNAPSHOT · 3/3 FEEDS');
  assert.match(h.text('weather-meta'), /2020-01-01T12:00$/);
  assert.equal(h.text('quake-time'), '2020-01-01T11:00:00.000Z');
  assert.match(h.text('fx-meta'), /2019-12-31$/);
  assert.equal(h.text('fx-rate'), '32.10 THB');
});

test('empty payloads have no usable data', async () => {
  const h = harness([{}, {}, {}]);
  await h.load();
  assertUnavailable(h);
});

test('a valid empty earthquake list reports absence rather than a fake event', async () => {
  const h = harness([weather, { features: [] }, fx]);
  await h.load();
  assert.equal(h.text('status-text'), 'SNAPSHOT · 3/3 FEEDS');
  assert.equal(h.text('quake-meta'), 'USGS M4.5+ · NO MATCHING EVENTS');
  assert.equal(h.text('quake-place'), 'No events in this response');
  assert.equal(h.text('quake-mag'), 'M --');
  assert.equal(h.text('quake-time'), '--');
});

test('missing numeric fields do not throw or masquerade as successful data', async () => {
  const h = harness([
    { current_weather: { temperature: 30 } },
    { features: [{ properties: { mag: null, time: null }, geometry: {} }] },
    { rates: { THB: 32.1, EUR: 0.9 } }
  ]);
  await h.load();
  assertUnavailable(h);
});

test('non-finite/string/null numbers and invalid dates are rejected safely', async () => {
  const h = harness([
    { current_weather: { temperature: '30', windspeed: null, winddirection: Infinity } },
    { features: [{ properties: { mag: 4.6, time: 1e30 }, geometry: { coordinates: [100, 13, 10] } }] },
    { rates: { THB: NaN, EUR: 0, JPY: -1 } }
  ]);
  await h.load();
  assertUnavailable(h);
});

test('usable numbers with missing publication dates are explicitly undated', async () => {
  const h = harness([
    { current_weather: { temperature: 30, windspeed: 5, winddirection: 90 } },
    seismic,
    { rates: fx.rates }
  ]);
  await h.load();
  assert.equal(h.text('status-text'), 'SNAPSHOT · 3/3 FEEDS');
  assert.match(h.text('weather-meta'), /time unknown$/);
  assert.match(h.text('fx-meta'), /date unknown$/);
});

test('a failed repeat clears old values rather than restamping stale data', async () => {
  const h = harness();
  await h.load();
  assert.equal(h.text('fx-rate'), '32.10 THB');
  await h.load([null, null, null]);
  assertUnavailable(h);
  assert.equal(h.text('quake-time'), '--');
  assert.equal(h.text('quake-place'), 'No usable data');
});
