// No browser package required: execute the shipped inline script against API fixtures.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const html = fs.readFileSync(new URL('../templates/starter-dashboard.html.template', import.meta.url), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const good = [
  {utc_offset_seconds:0,current_weather_units:{temperature:'°C',windspeed:'km/h',winddirection:'°'},current_weather:{temperature:29,windspeed:2,winddirection:90,time:'2026-10-24T06:00'}},
  {features:[]},
  {base:'USD',amount:1,date:'2026-10-23',rates:{THB:33,EUR:0.9,JPY:150}}
];
async function scenario(fixtures, expected, timeout=false) {
  const elements = new Map();
  const get = id => {
    if (!elements.has(id)) elements.set(id,{textContent:'',dataset:{},addEventListener(){},parentElement:{dataset:{},setAttribute(){}}});
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
  assert.equal(get('refresh').disabled,false);
  if(expected.startsWith('UNAVAILABLE')) assert.equal(get('weather-temp').textContent,'Unavailable');
}
await scenario([null,null,null],'UNAVAILABLE · 0/3');
await scenario([good[0],null,good[2]],'PARTIAL · 2/3');
await scenario(good,'READY · 3/3');
await scenario([{}, {features:[{properties:{mag:'bad'}}]}, {rates:{THB:33}}],'UNAVAILABLE · 0/3');
await scenario([null,null,null],'UNAVAILABLE · 0/3',true);
await scenario([{...good[0],current_weather_units:{temperature:'°F'}},good[1],good[2]],'PARTIAL · 2/3');
await scenario([{...good[0],current_weather:{...good[0].current_weather,time:'2026-02-30T06:00'}},good[1],{...good[2],date:'2026-02-30'}],'PARTIAL · 1/3');
await scenario([good[0],good[1],{...good[2],base:'EUR'}],'PARTIAL · 2/3');
await scenario([good[0],good[1],{...good[2],amount:2}],'PARTIAL · 2/3');
console.log('OK: 9 starter fixture scenarios: offline, partial, ready, malformed, timeout, units, dates, FX base and amount');
