import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { scanSource, GIVEAWAYS, BANNED_FACES, isBannedFace } from './giveaway-bans.mjs';
import { RULES, score, SLOP_THRESHOLD_POINTS, REVIEW_THRESHOLD_POINTS } from './slop-rules.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const fix = path.join(root, 'fixtures/giveaways');
const read = name => fs.readFileSync(path.join(fix, name), 'utf8');

const OLD_WEIGHTS = {
  'stretch-to-fill': 2,
  'rounded-same': 2,
  'emoji-icons': 2,
  'dark-command-centre': 2,
  void: 2,
  'hero-no-data': 2,
  'shadow-everything': 1,
  'box-soup': 1,
  'pill-clutter': 1,
  'modal-on-load': 1,
  gradients: 1,
  glass: 1,
  'big-number-tiles': 1,
  'long-lines': 1,
  'type-chaos': 1,
  'boxed-everything': 0,
  'mobile-overflow': 1,
  'broken-placeholder': 1,
  'default-font': 0,
};

test('each giveaway fixture hits that ban and no other', () => {
  for (const g of GIVEAWAYS) {
    const result = scanSource(read(`${g.id}.html`));
    assert.deepEqual(result.hits, [g.id], `${g.id}: ${result.hits.join(',')}`);
  }
});

test('variant fixtures stay on the same ban', () => {
  const cases = [
    ['one-italic-gradient.html', 'one-italic-word'],
    ['one-italic-accent.html', 'one-italic-word'],
    ['display-caps-button.html', 'display-caps'],
    ['banned-face-link.html', 'banned-face'],
    ['status-phrase.html', 'status-dot'],
    ['status-keyframes.html', 'status-dot'],
    ['label-kicker.html', 'eyebrows'],
  ];
  for (const [file, id] of cases) {
    assert.deepEqual(scanSource(read(file)).hits, [id], file);
  }
});

test('a house page with hairlines, a ruled strip and a skeleton does not hit', () => {
  assert.deepEqual(scanSource(read('clean.html')).hits, []);
});

test('source patterns that are not the tell stay quiet', () => {
  assert.deepEqual(scanSource('<style>body{font-family:Jost, Inter, sans-serif}</style><p>Water</p>').hits, []);
  assert.deepEqual(scanSource('<h1><em>Flood board</em></h1>').hits, []);
  assert.deepEqual(scanSource('<button class="uppercase">API</button>').hits, []);
  assert.deepEqual(scanSource('<div class="card" style="border:1px solid #ccc">24</div>').hits, []);
  assert.deepEqual(scanSource('<div class="animate-pulse" style="width:100%;height:16px"></div>').hits, []);
  assert.deepEqual(scanSource('<p>Gauge late · 14:02</p>').hits, []);
  assert.deepEqual(scanSource('<style>code{font-family:"Geist Mono",monospace}</style><code>24</code>').hits, []);
  assert.deepEqual(scanSource('<style>body{font-family:Prompt,sans-serif}</style><p>น้ำ</p>').hits, []);
  assert.deepEqual(scanSource('<h2 className="uppercase tracking-widest">Features</h2>').hits, ['display-caps']);
  assert.deepEqual(scanSource("import { Inter } from 'next/font/google'\nexport const font = Inter()\n").hits, ['banned-face']);
  assert.deepEqual(scanSource('<style>body{font-family:"DM Sans",sans-serif}</style><p>Canal</p>').hits, ['banned-face']);
  assert.deepEqual(scanSource('<p>AI Engine Active</p>').hits, ['status-dot']);
  assert.deepEqual(scanSource('<p>All Systems Operational</p>').hits, ['status-dot']);
  assert.deepEqual(scanSource('<p>Not all systems operational at 14:02</p>').hits, []);
  assert.deepEqual(scanSource('<p>The AI engine active period ended at 14:02</p>').hits, []);
  assert.deepEqual(scanSource('<p>Not all systems operational at 14:02</p>\n<p>All Systems Operational</p>').hits, ['status-dot']);
});

test('two cards and two blurbs stay under the repeated-row line', () => {
  const html = `
    <h2>Cameras</h2><p class="text-sm text-gray-500">What the feeds show.</p>
    <h2>Roads</h2><p class="text-sm text-gray-500">Which streets are shut.</p>
    <div>
      <article class="stat"><strong>24</strong> cameras</article>
      <article class="stat"><strong>3</strong> late</article>
    </div>`;
  assert.deepEqual(scanSource(html).hits, []);
});

test('STYLE.md waives the named ban and leaves the others', () => {
  const page = read('stack.html');
  const open = scanSource(page);
  assert.deepEqual(open.hits, ['eyebrows', 'side-stripe', 'status-dot']);
  const kept = scanSource(page, { style: 'Eyebrows are a deliberate choice on the masthead.\n' });
  assert.deepEqual(kept.hits, ['side-stripe', 'status-dot']);
  const allowed = scanSource(read('side-stripe.html'), { style: 'allow: side-stripe\n' });
  assert.deepEqual(allowed.hits, []);
  const refused = scanSource(read('eyebrows.html'), { style: 'Eyebrows are not a deliberate choice.\n' });
  assert.deepEqual(refused.hits, ['eyebrows']);
  const mixed = scanSource(page, { style: 'Eyebrows are a deliberate choice, and side stripes stay out.\n' });
  assert.ok(mixed.hits.includes('side-stripe'));
  assert.ok(!mixed.hits.includes('eyebrows'));
});

test('existing rule weights and thresholds are unchanged', () => {
  assert.equal(SLOP_THRESHOLD_POINTS, 6);
  assert.equal(REVIEW_THRESHOLD_POINTS, 3);
  for (const [id, weight] of Object.entries(OLD_WEIGHTS)) {
    const rule = RULES.find(item => item.id === id);
    assert.ok(rule, id);
    assert.equal(rule.w, weight, id);
  }
  assert.equal(RULES.length, Object.keys(OLD_WEIGHTS).length + GIVEAWAYS.length);
  for (const g of GIVEAWAYS) {
    const rule = RULES.find(item => item.id === g.id);
    assert.equal(rule.w, 1, g.id);
  }
});

test('giveaway points add to the old score and do not replace it', () => {
  const base = score({ maxLineEm: 50 });
  assert.deepEqual(base.hits, ['long-lines']);
  assert.equal(base.points, 1);
  const plus = score({ maxLineEm: 50, eyebrowKickers: 1, titleBlurbs: 2 });
  assert.deepEqual(plus.hits, ['long-lines', 'eyebrows']);
  assert.equal(plus.points, 2);
  assert.deepEqual(score({ titleBlurbs: 3 }).hits, ['title-blurb']);
  assert.deepEqual(score({ titleBlurbs: 2 }).hits, []);
  assert.equal(score({ equalStatCardRows: 1 }).points, 1);
  const arial = score({ defaultFont: true, primaryFont: 'arial' });
  assert.deepEqual(arial.hits, ['default-font']);
  assert.equal(arial.points, 0);
  const inter = score({ defaultFont: true, primaryFont: 'inter' });
  assert.ok(inter.hits.includes('default-font'));
  assert.ok(inter.hits.includes('banned-face'));
  assert.equal(inter.points, 1);
  const kanit = score({ defaultFont: true, primaryFont: 'kanit' });
  assert.deepEqual(kanit.hits, ['default-font']);
  assert.equal(isBannedFace('prompt'), false);
  assert.equal(isBannedFace('geist mono'), false);
  for (const face of BANNED_FACES) assert.equal(isBannedFace(face), true, face);
});

test('the rendered linter still names the same faces and fields', () => {
  const src = fs.readFileSync(path.join(root, 'slop-lint.mjs'), 'utf8');
  for (const face of BANNED_FACES) assert.ok(src.includes(`'${face}'`), face);
  for (const key of ['eyebrowKickers', 'sideStripes', 'italicHeadlineWords', 'displayCaps', 'titleBlurbs', 'statusDots', 'equalStatCardRows', 'bannedFace']) {
    assert.ok(src.includes(key), key);
  }
});

test('the file checker reads a STYLE.md beside the file', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'giveaway-'));
  const page = path.join(dir, 'page.html');
  const script = path.join(root, 'giveaway-bans.mjs');
  fs.writeFileSync(page, read('stack.html'));
  const open = spawnSync(process.execPath, [script, page], { encoding: 'utf8' });
  assert.equal(open.status, 1);
  assert.match(open.stdout, /eyebrows/);
  assert.match(open.stdout, /side-stripe/);
  fs.writeFileSync(path.join(dir, 'STYLE.md'), 'Eyebrows are a deliberate choice on the masthead.\n');
  const waived = spawnSync(process.execPath, [script, page], { encoding: 'utf8' });
  assert.equal(waived.status, 1);
  assert.doesNotMatch(waived.stdout, /eyebrows/);
  assert.match(waived.stdout, /side-stripe/);
  fs.writeFileSync(page, read('eyebrows.html'));
  const clear = spawnSync(process.execPath, [script, page], { encoding: 'utf8' });
  assert.equal(clear.status, 0, clear.stdout);
  assert.match(clear.stdout, /OK/);
});
