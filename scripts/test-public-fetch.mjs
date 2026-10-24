import assert from 'node:assert/strict';
import {fetchWithFallback} from '../skills/public-api-integration/assets/fetch-with-fallback.mjs';
const now=()=>1_000_000;
const valid={value:0};
const validate=data=>Number.isFinite(data?.value);
const good=async()=>new Response(JSON.stringify(valid));
const offline=async()=>{throw Error('offline');};
function storage(raw=null){return {getItem:()=>raw,setItem(k,v){raw=v;},removeItem(){raw=null;}};}
const run=(options={})=>fetchWithFallback('fixture','https://example.org/data',{
  validate,now,storage:storage(),fetcher:good,...options,
});
assert.equal((await run()).source,'network');
assert.equal((await run({storage:storage('{bad'),fetcher:offline})).source,'unavailable');
assert.equal((await run({storage:{getItem(){throw Error('blocked');}}})).source,'network');
assert.equal((await run({storage:{getItem:()=>null,setItem(){throw Error('quota');}}})).source,'network');
const cached=timestamp=>storage(JSON.stringify({data:valid,timestamp}));
assert.equal((await run({storage:cached(now()-1),fetcher:offline})).source,'cache');
const stale=await run({storage:cached(now()-400_000),fetcher:offline});
assert.equal(stale.source,'stale-cache');assert.equal(stale.isFresh,false);
assert.equal((await run({storage:cached(now()-90_000_000),fetcher:offline})).data,null);
assert.equal((await run({storage:cached(now()+1),fetcher:offline})).data,null);
for(const timestamp of ['999999',null,{},1e100]) assert.equal((await run({storage:cached(timestamp)})).source,'network');
assert.equal((await run({storage:cached('999999'),fetcher:offline})).source,'unavailable');
assert.equal((await run({fetcher:async()=>new Response('{}')})).error,'invalid-payload');
assert.equal((await run({fetcher:async()=>new Response('{bad')})).error,'invalid-payload');
assert.equal((await run({fetcher:async()=>new Response('',{status:429})})).error,'http-429');
assert.equal((await run({maxBytes:2})).error,'response-too-large');
assert.equal((await run({validate(){throw Error('bad');}})).error,'invalid-payload');
const never=async(url,{signal})=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(Error('aborted'))));
assert.equal((await run({fetcher:never,timeoutMs:5})).error,'timeout');
await assert.rejects(run({validate:undefined}),/validator/);
await assert.rejects(fetchWithFallback('x','http://example.org',{validate}),/HTTPS/);
console.log('OK: public fetch network/cache/stale/unavailable; corrupt/blocked/quota storage and timestamp, schema, 429, timeout and size guards');
