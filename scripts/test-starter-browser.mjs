// Optional browser gate. Point DR_NON_PLAYWRIGHT at an installed module file.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
const {chromium}=await import(process.env.DR_NON_PLAYWRIGHT ? pathToFileURL(process.env.DR_NON_PLAYWRIGHT).href : 'playwright');
const scratch=fs.mkdtempSync(path.join(os.tmpdir(),'drnon-starter-browser-'));
const project=path.join(scratch,'starter');
const setup=path.resolve(new URL('../setup.sh',import.meta.url).pathname);
execFileSync('bash',[setup,'--init-project',project,'--yes','--no-services'],{stdio:'pipe'});
const browser=await chromium.launch();
try {
  const page=await browser.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const good=[
    {utc_offset_seconds:0,current_weather_units:{temperature:'°C',windspeed:'km/h',winddirection:'°'},current_weather:{temperature:29,windspeed:2,winddirection:90,time:'2026-10-24T06:00'}},
    {features:[{properties:{mag:4.8,time:1792828800000,place:'<img src=x onerror="window.fixtureXSS=true">'},geometry:{coordinates:[100,14,12]}}]},
    {base:'USD',amount:1,date:'2026-10-23',rates:{THB:33,EUR:0.9,JPY:150}}
  ];
  let fixtures=null;
  await page.route(/^https?:\/\//,r=>{
    if(!fixtures) return r.abort();
    const url=r.request().url();
    const index=url.includes('open-meteo')?0:url.includes('usgs')?1:2;
    return r.fulfill({json:fixtures[index]});
  });
  await page.goto(pathToFileURL(path.join(project,'index.html')).href);
  await page.waitForFunction(()=>document.querySelector('#status-text').textContent.startsWith('UNAVAILABLE'));
  assert.match(await page.locator('#status-text').innerText(),/^UNAVAILABLE · 0\/3/);
  const screenshotDir=process.env.DR_NON_SCREENSHOTS;
  if(screenshotDir) fs.mkdirSync(screenshotDir,{recursive:true});
  for(const width of [320,390,1024,1440]){
    await page.setViewportSize({width,height:900});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width);
    if(screenshotDir) await page.screenshot({path:path.join(screenshotDir,`offline-${width}.png`),fullPage:true});
  }
  fixtures=good;
  await page.getByRole('button',{name:'Refresh feeds'}).focus();
  assert.equal(await page.locator('#refresh').evaluate(el=>el.matches(':focus-visible')),true);
  if(screenshotDir) await page.screenshot({path:path.join(screenshotDir,'focus-1440.png'),fullPage:true});
  await page.keyboard.press('Enter');
  await page.waitForFunction(()=>document.querySelector('#status-text').textContent.startsWith('READY'));
  assert.match(await page.locator('#weather-time').innerText(),/2026-10-24 06:00 UTC/);
  assert.match(await page.locator('#quake-time').innerText(),/2026-.* UTC/);
  assert.equal(await page.locator('#quake-place img').count(),0);
  assert.equal(await page.evaluate(()=>window.fixtureXSS),undefined);
  assert.match(await page.locator('#quake-place').innerText(),/^<img/);
  for(const width of [320,390,1024,1440]){
    await page.setViewportSize({width,height:900});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width);
    if(screenshotDir) await page.screenshot({path:path.join(screenshotDir,`ready-${width}.png`),fullPage:true});
  }
  for(const override of [{base:'EUR'},{amount:2},{date:'2026-02-30'}]){
    fixtures=[good[0],good[1],{...good[2],...override}];
    await page.getByRole('button',{name:'Refresh feeds'}).click();
    await page.waitForFunction(()=>document.querySelector('#status-text').textContent.startsWith('PARTIAL'));
    assert.equal(await page.locator('#fx-rate').innerText(),'Unavailable');
    assert.equal(await page.locator('#fx-eur').innerText(),'--');
  }
  fixtures=[{}, {features:[{properties:{mag:'bad'}}]}, {}];
  await page.getByRole('button',{name:'Refresh feeds'}).click();
  await page.waitForFunction(()=>document.querySelector('#status-text').textContent.startsWith('UNAVAILABLE'));
  assert.equal(await page.locator('#weather-wind').innerText(),'-- km/h');
  assert.equal(await page.locator('#quake-depth').innerText(),'-- km');
  assert.equal(await page.locator('#refresh').isEnabled(),true);
  if(screenshotDir) await page.screenshot({path:path.join(screenshotDir,'invalid-1440.png'),fullPage:true});
  assert.deepEqual(errors,[]);
  console.log('OK: fresh Chromium bootstrap; offline/ready/invalid; FX wrong base, amount and date; keyboard refresh; literal XSS; cleared readings; 320/390/1024/1440 reflow; no page errors');
} finally {
  await browser.close();
  fs.rmSync(scratch,{recursive:true,force:true});
}
