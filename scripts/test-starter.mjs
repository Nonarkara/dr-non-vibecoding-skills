// No browser package required: execute the shipped inline script against API fixtures.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const html = fs.readFileSync(new URL('../templates/starter-dashboard.html.template', import.meta.url), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const good = [
  {current_weather:{temperature:29,windspeed:2,winddirection:90}},
  {features:[]},
  {date:'2026-10-09',rates:{THB:33,EUR:0.9,JPY:150}}
];
async function scenario(fixtures, expected, timeout=false) {
  const elements = new Map();
  const get = id => {
    if (!elements.has(id)) elements.set(id,{textContent:'',parentElement:{dataset:{},setAttribute(){}}});
    return elements.get(id);
  };
  let request=0;
  const sandbox = {
    document:{getElementById:get,querySelector:get},
    window:{addEventListener(){}}, performance:{now:()=>0},console:{warn(){}},
    AbortController,
    setTimeout: callback => { if(timeout) queueMicrotask(callback); return 1; },
    clearTimeout(){},
    fetch: async (url,{signal}) => {
      const fixture=fixtures[request++];
      if(timeout) return new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(new Error('aborted'))));
      if(fixture===null) throw new Error('offline');
      return {ok:true,json:async()=>fixture};
    }
  };
  vm.createContext(sandbox);
  vm.runInContext(script,sandbox);
  await vm.runInContext('loadDashboard()',sandbox);
  assert.ok(get('status-text').textContent.startsWith(expected),get('status-text').textContent);
  assert.equal(request,3);
  if(expected.startsWith('UNAVAILABLE')) assert.equal(get('weather-temp').textContent,'Unavailable');
}
await scenario([null,null,null],'UNAVAILABLE · 0/3');
await scenario([good[0],null,good[2]],'PARTIAL · 2/3');
await scenario(good,'READY · 3/3');
await scenario([{}, {features:[{properties:{mag:'bad'}}]}, {rates:{THB:33}}],'UNAVAILABLE · 0/3');
await scenario([null,null,null],'UNAVAILABLE · 0/3',true);
console.log('OK: starter offline, partial, ready, malformed and timeout fixtures');
