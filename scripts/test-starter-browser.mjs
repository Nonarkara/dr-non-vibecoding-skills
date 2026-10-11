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
  await page.route(/^https?:\/\//,r=>r.abort());
  await page.goto(pathToFileURL(path.join(project,'index.html')).href);
  await page.waitForFunction(()=>document.querySelector('#status-text').textContent.startsWith('UNAVAILABLE'));
  assert.match(await page.locator('#status-text').innerText(),/^UNAVAILABLE · 0\/3/);
  for(const width of [320,375,768,1280]){
    await page.setViewportSize({width,height:900});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width);
  }
  assert.deepEqual(errors,[]);
  console.log('OK: fresh bootstrap in Chromium, blocked APIs, 320/375/768/1280 reflow, no page errors');
} finally {
  await browser.close();
  fs.rmSync(scratch,{recursive:true,force:true});
}
