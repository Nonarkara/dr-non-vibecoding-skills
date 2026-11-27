#!/usr/bin/env node
// slop-lint.mjs — score any URL for "AI design slop" signals with Playwright.
// Usage: node slop-lint.mjs <url> [more urls...] [--json] [--shots=dir]
// Setup once: npm i -D playwright pngjs && npx playwright install chromium   (or set CHROME=/path/to/chrome)
// Verdict: >=6 points SLOP (fix before shipping) · 3-5 REVIEW (a person checks the hits) · <3 OK. Rules: see ANTI-SLOP.md.
// Exports: measurePage(page), pixelStats(pngBuffer), score(desktop, mobile), lintUrl(browser,url,opts)
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import fs from 'fs';
import { score, SLOP_THRESHOLD_POINTS, REVIEW_THRESHOLD_POINTS } from './slop-rules.mjs';

export { RULES, score, SLOP_THRESHOLD_POINTS, REVIEW_THRESHOLD_POINTS } from './slop-rules.mjs';

// ---------------------------------------------------------------- in-page DOM metrics
export function inPageMetrics() {
  const VW = innerWidth, VH = innerHeight, VA = VW * VH;
  const MAPSEL = '.leaflet-container,.maplibregl-map,.mapboxgl-map,.gm-style,.ol-viewport,.esri-view,.cesium-widget,.cesium-viewer,.deckgl-overlay,iframe[src*="map"],iframe[src*="arcgis"],[class*="MapContainer"],[id^="map"]';
  const big = e => { const r = e.getBoundingClientRect(); return r.width * r.height > VA * 0.04; };
  let maps = [...document.querySelectorAll(MAPSEL)].filter(big);
  // a large canvas (WebGL map / 3D) that is not inside a found map counts as map
  for (const c of document.querySelectorAll('canvas')) { const r = c.getBoundingClientRect(); if (r.width * r.height > VA * 0.2 && !maps.some(m => m.contains(c))) maps.push(c); }
  maps = maps.filter(m => !maps.some(o => o !== m && o.contains(m))); // outermost
  const inMap = el => maps.some(m => m.contains(el));
  const hasMap = el => maps.some(m => el.contains(m));
  const docTopLimit = VH * 4; // only look at the first ~4 screens
  const parseC = s => { const m = s && s.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?/); return m ? [+m[1], +m[2], +m[3], m[4] === undefined ? 1 : +m[4]] : null; };
  const hsl = ([r, g, b]) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b); let h = 0, s = 0, l = (mx + mn) / 2; if (mx !== mn) { const d = mx - mn; s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; } return [h, s, l]; };
  const hex = c => '#' + c.slice(0, 3).map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
  const TW = new Set('0f172a 1e293b 334155 475569 64748b 94a3b8 cbd5e1 e2e8f0 f1f5f9 f8fafc 020617 111827 1f2937 374151 4b5563 6b7280 9ca3af d1d5db e5e7eb f3f4f6 f9fafb 030712 09090b 18181b 27272a 3f3f46 52525b 71717a a1a1aa 6366f1 4f46e5 4338ca 818cf8 8b5cf6 7c3aed 6d28d9 a78bfa a855f7 9333ea c084fc 3b82f6 2563eb 1d4ed8 60a5fa 93c5fd 10b981 059669 34d399 22c55e 16a34a ef4444 dc2626 f87171 f59e0b d97706 fbbf24 eab308 06b6d4 22d3ee 0ea5e9 38bdf8 ec4899 f472b6 f97316 fb923c 14b8a6'.split(' ').map(x => '#' + x));
  const out = { vw: VW, vh: VH, title: document.title.slice(0, 120) };
  out.mapCount = maps.length;
  const clipV = r => Math.max(0, Math.min(r.right, VW) - Math.max(r.left, 0)) * Math.max(0, Math.min(r.bottom, VH) - Math.max(r.top, 0));
  out.mapShareFirstScreen = Math.min(1, maps.reduce((a, m) => a + clipV(m.getBoundingClientRect()), 0) / VA);
  // charts / tables = data
  let chart = 0;
  for (const e of document.querySelectorAll('svg,canvas,table,img[src*="chart"],[class*="chart"],[class*="Chart"],[class*="recharts"]')) {
    if (inMap(e)) continue; const r = e.getBoundingClientRect(); if (r.width < 120 || r.height < 60) continue;
    if (e.parentElement && e.parentElement.closest('svg,table,[class*="chart"],[class*="Chart"]')) continue;
    chart += clipV(r);
  }
  out.chartTableShareFirstScreen = Math.min(1, chart / VA);
  out.dataShareFirstScreen = Math.min(1, out.mapShareFirstScreen + out.chartTableShareFirstScreen);
  out.scrollHeightScreens = +(document.documentElement.scrollHeight / VH).toFixed(2);
  out.hOverflow = document.documentElement.scrollWidth > VW + 2;
  out.textChars0 = (document.body.innerText||'').length;
  const els = [...document.body.querySelectorAll('*')].slice(0, 9000);
  const info = new Map();
  const boxes = [];
  let gradients = 0, textGradients = 0, glass = 0, shadows = 0, pills = 0, eyebrows = 0, iconTiles = 0, flexKids = 0, flexGrowKids = 0;
  const fontSizes = new Map(), radii = new Map(); const colorArea = { purple: 0, painted: 0 }; const hues = new Map(); let twHits = 0, colorSamples = 0, oklch = 0;
  const fams = new Map();
  for (const el of els) {
    if (el.closest('svg') && el.tagName !== 'svg') continue;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2 || r.top > docTopLimit || r.bottom < -VH) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity < 0.05) continue;
    const im = inMap(el);
    const directText = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim();
    if (directText && !im) {
      const fs = Math.round(parseFloat(cs.fontSize) * 2) / 2; fontSizes.set(fs, (fontSizes.get(fs) || 0) + directText.length);
      const fam = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim().toLowerCase(); fams.set(fam, (fams.get(fam) || 0) + directText.length);
      if (cs.textTransform === 'uppercase' && parseFloat(cs.letterSpacing) > 0.04 * parseFloat(cs.fontSize) && directText.length < 40) eyebrows++;
      const tc = parseC(cs.color); if (tc) { colorSamples++; if (TW.has(hex(tc))) twHits++; const [h, s, l] = hsl(tc); if (s > .4 && l > .2 && l < .85) { const b = Math.round(h / 30) % 12; hues.set(b, (hues.get(b) || 0) + 1); } }
      if (cs.color.includes('oklch') || cs.color.includes('oklab')) oklch++;
    }
    if (im) continue;
    const bgImg = cs.backgroundImage || '';
    if (bgImg.includes('gradient')) { gradients++; if ((cs.webkitBackgroundClip || cs.backgroundClip) === 'text') textGradients++; }
    if (cs.backdropFilter && cs.backdropFilter !== 'none' && cs.backdropFilter.includes('blur')) glass++;
    if (cs.boxShadow && cs.boxShadow !== 'none') shadows++;
    if (cs.display.includes('flex') || cs.display.includes('grid')) {
      for (const k of el.children) { const kcs = getComputedStyle(k); if (kcs.display === 'none' || kcs.position === 'absolute' || kcs.position === 'fixed') continue; flexKids++; if (parseFloat(kcs.flexGrow) > 0 || (cs.display.includes('grid') && cs.justifyItems.includes('stretch') && kcs.width && 0)) flexGrowKids++; }
    }
    const bg = parseC(cs.backgroundColor);
    const pbg = el.parentElement ? parseC(getComputedStyle(el.parentElement).backgroundColor) : null;
    const hasBg = bg && bg[3] > 0.05 && !(pbg && pbg[3] > 0.05 && Math.abs(bg[0] - pbg[0]) + Math.abs(bg[1] - pbg[1]) + Math.abs(bg[2] - pbg[2]) < 6);
    const bw = ['Top', 'Right', 'Bottom', 'Left'].filter(s => parseFloat(cs['border' + s + 'Width']) > 0 && cs['border' + s + 'Style'] !== 'none').length;
    const isBox = hasBg || bw >= 3 || (cs.boxShadow && cs.boxShadow !== 'none') || bgImg.includes('gradient');
    if (bg && bg[3] > 0.05) {
      const a = clipV(r); if (a > 0 && el.tagName !== 'BODY') { colorArea.painted += a; const [h, s, l] = hsl(bg); if (h >= 235 && h <= 300 && s > .3 && l > .15 && l < .85) colorArea.purple += a; if (TW.has(hex(bg))) twHits += 2; colorSamples += 2; if (s > .4 && l > .2 && l < .85 && a > 400) { const b = Math.round(h / 30) % 12; hues.set(b, (hues.get(b) || 0) + 1); } }
    }
    if (cs.backgroundColor.includes('oklch')) oklch++;
    if (!isBox || hasMap(el)) continue;
    const area = r.width * r.height;
    if (area < 600 || area > VA * 0.9) continue;
    const rad = Math.round(parseFloat(cs.borderTopLeftRadius) || 0);
    if (rad > 0 && rad >= r.height / 2 - 1 && r.height < 44) pills++;
    if (area > 1500) radii.set(rad, (radii.get(rad) || 0) + 1);
    const pad = { l: parseFloat(cs.paddingLeft) || 0, r: parseFloat(cs.paddingRight) || 0, t: parseFloat(cs.paddingTop) || 0, b: parseFloat(cs.paddingBottom) || 0 };
    const rec = { el, r, cs, pad, rad, cArea: 0, bx: [1e9, 1e9, -1e9, -1e9], text: 0, digits: false, media: 0, fs: parseFloat(cs.fontSize) };
    info.set(el, rec); boxes.push(rec);
  }
  // content: text rects + media rects, attributed to every ancestor box
  const add = (node, rect, isText, len, digit) => {
    let p = node.nodeType === 1 ? node : node.parentElement;
    for (let d = 0; p && d < 30; d++, p = p.parentElement) {
      const b = info.get(p); if (!b) continue;
      b.cArea += rect.width * rect.height; b.bx[0] = Math.min(b.bx[0], rect.left); b.bx[1] = Math.min(b.bx[1], rect.top); b.bx[2] = Math.max(b.bx[2], rect.right); b.bx[3] = Math.max(b.bx[3], rect.bottom);
      if (isText) { b.text += len; if (digit) b.digits = true; } else b.media++;
    }
  };
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n, tcount = 0; const range = document.createRange();
  const lines = []; const emojiRe = /\p{Extended_Pictographic}/u; let emoji = 0, emojiIcons = 0;
  const paraSeen = new Set();
  while ((n = tw.nextNode()) && tcount < 6000) {
    const t = n.textContent.trim(); if (!t) continue; const pe = n.parentElement; if (!pe || pe.closest('script,style,noscript')) continue;
    if (inMap(pe)) continue;
    range.selectNodeContents(n); const rects = [...range.getClientRects()].filter(q => q.width > 0 && q.top < docTopLimit);
    if (!rects.length) continue; tcount++;
    const em = [...t.matchAll(/\p{Extended_Pictographic}/gu)].length; emoji += em;
    if (em && (t.length <= 40 || emojiRe.test(t.slice(0, 3))) ) emojiIcons++;
    for (const q of rects) add(n, q, true, t.length / rects.length, /\d/.test(t));
    // line length (em) for prose blocks
    const blk = pe.closest('p,li,dd,blockquote,div,span,td'); if (blk && !paraSeen.has(blk) && (blk.innerText || '').length > 120) {
      paraSeen.add(blk); const fsz = parseFloat(getComputedStyle(blk).fontSize) || 16;
      const r2 = document.createRange(); r2.selectNodeContents(blk); const lr = [...r2.getClientRects()]; const byLine = new Map();
      for (const q of lr) { const k = Math.round(q.top / 4); const o = byLine.get(k) || [1e9, -1e9]; o[0] = Math.min(o[0], q.left); o[1] = Math.max(o[1], q.right); byLine.set(k, o); }
      const ls = [...byLine.values()].filter(o => o[1] - o[0] <= VW).map(o => (o[1] - o[0]) / fsz); if (ls.length >= 2) { const cpl = (blk.innerText || '').length / ls.length; lines.push({ em: Math.max(...ls), cpl }); }
    }
  }
  for (const m of document.querySelectorAll('img,svg,canvas,video,input,select,textarea,iframe,button')) { if (inMap(m) || (m.tagName !== 'svg' && m.closest('svg'))) continue; const r = m.getBoundingClientRect(); if (r.width > 1 && r.height > 1 && r.top < docTopLimit) add(m, r, false, 0, false); }
  // per-box analysis
  let inflated = 0, statTiles = 0, wideChips = 0, tallBoxes = 0, measured = 0; const fills = []; const examples = [];
  for (const b of boxes) {
    const { r, pad } = b; const area = r.width * r.height; if (b.text === 0 && b.media === 0) continue;
    measured++; const fill = Math.min(1, b.cArea / area); fills.push(fill);
    const iw = Math.max(1, r.width - pad.l - pad.r), ih = Math.max(1, r.height - pad.t - pad.b);
    const cw = Math.max(0, b.bx[2] - b.bx[0]), ch = Math.max(0, b.bx[3] - b.bx[1]);
    const lh = (b.fs || 14) * 1.4;
    const emptyW = iw - cw, emptyH = ih - ch;
    const txtOnly = b.media === 0;
    // inflated box: lots of unused inner space relative to the type size
    if (txtOnly && area > 6000 && fill < 0.12 && (emptyH > 4 * lh || emptyW > 12 * lh)) { inflated++; if (examples.length < 6) examples.push({ kind: 'inflated', w: Math.round(r.width), h: Math.round(r.height), fill: +fill.toFixed(3), text: (b.el.innerText || '').trim().slice(0, 40) }); }
    if (b.text <= 40 && b.digits && area > 8000 && fill < 0.12 && r.top < VH * 2) statTiles++;
    if (b.text <= 24 && b.text > 0 && r.height < 56 && r.width > Math.max(3 * cw, cw + 140) && b.el.parentElement && r.width > 0.5 * b.el.parentElement.getBoundingClientRect().width) { wideChips++; if (examples.length < 8) examples.push({ kind: 'wide-chip', w: Math.round(r.width), cw: Math.round(cw), text: (b.el.innerText || '').trim().slice(0, 30) }); }
    if (txtOnly && emptyH > Math.max(60, 3 * lh) && ch < 0.4 * ih) tallBoxes++;
    if (r.width <= 72 && r.height <= 72 && Math.abs(r.width - r.height) < 6 && b.text <= 2 && (b.media > 0 || b.text > 0) && b.rad > 0) iconTiles++;
  }
  // equal-height stretch + uniform grids + sparse stretched rows
  let eqStretch = 0, eqRows = 0, uniGrids = 0, uniGrid34 = 0, sparseRows = 0;
  const parents = new Set(boxes.map(b => b.el.parentElement).filter(Boolean));
  for (const p of parents) {
    const kids = [...p.children].map(k => info.get(k)).filter(Boolean).filter(k => k.text + k.media > 0);
    if (kids.length < 2) continue;
    const rows = new Map(); for (const k of kids) { const key = Math.round(k.r.top / 3); (rows.get(key) || rows.set(key, []).get(key)).push(k); }
    for (const row of rows.values()) {
      if (row.length >= 2) {
        const hs = row.map(k => k.r.height), chs = row.map(k => Math.max(1, k.bx[3] - k.bx[1]));
        const sameH = Math.max(...hs) - Math.min(...hs) < 3;
        if (sameH && Math.max(...chs) / Math.min(...chs) > 1.6 && Math.max(...chs) - Math.min(...chs) > 40) { eqRows++; eqStretch += row.filter(k => (k.bx[3] - k.bx[1]) < 0.7 * k.r.height).length; }
        const ws = row.map(k => k.r.width); const sameW = (Math.max(...ws) - Math.min(...ws)) / Math.max(...ws) < 0.06;
        if (sameW && row.length >= 3 && row.every(k => k.r.width * k.r.height > 15000)) { uniGrids++; if (row.length === 3 || row.length === 4) uniGrid34++; }
      }
      // too-few items stretched across a wide row
      const pr = p.getBoundingClientRect();
      if (row.length <= 3 && pr.width > 0.6 * VW && row.every(k => k.r.width > 0.28 * VW) && row.every(k => (k.cArea / (k.r.width * k.r.height)) < 0.15 && k.media === 0)) sparseRows++;
    }
  }
  // ---- direct stretch test: how much bigger is each content box than its own content wants to be?
  const stretch = { w: 0, h: 0, byCause: {}, examples: [] };
  const cand = boxes.filter(b => b.text > 0 && b.text <= 80 && b.r.width >= 60 && b.r.top < VH * 2 && b.r.width < VW * 0.995).slice(0, 350);
  for (const b of cand) {
    const el = b.el, st = el.style, saved = st.cssText, r0 = el.getBoundingClientRect();
    const pcs = el.parentElement ? getComputedStyle(el.parentElement) : null;
    st.setProperty('width', 'max-content', 'important'); st.setProperty('min-width', '0', 'important'); st.setProperty('max-width', 'none', 'important'); st.setProperty('flex', 'none', 'important');
    st.setProperty('height', 'auto', 'important'); st.setProperty('min-height', '0', 'important'); st.setProperty('align-self', 'flex-start', 'important'); st.setProperty('justify-self', 'start', 'important');
    const r1 = el.getBoundingClientRect(); st.cssText = saved;
    const wR = r0.width / Math.max(1, r1.width), hR = r0.height / Math.max(1, r1.height);
    if (r1.width < 20 || r1.height < 12) continue; // content is absolutely positioned or a background image: can't measure intrinsic size
    const wHit = wR >= 2 && r0.width - r1.width >= 120, hHit = hR >= 1.6 && r0.height - r1.height >= 40;
    if (!wHit && !hHit) continue;
    const isStat = b.digits && b.text <= 30;
    const parentW = el.parentElement ? el.parentElement.getBoundingClientRect().width : VW;
    if (!isStat && parentW <= 480) continue; // full-width rows/controls inside a side panel or phone column are normal
    const kcs = b.cs; let cause = 'block-full-width';
    if (pcs && pcs.display.includes('grid')) cause = 'grid-track';
    else if (pcs && pcs.display.includes('flex')) cause = (parseFloat(kcs.flexGrow) > 0) ? 'flex-grow' : (hHit && !wHit ? 'equal-height(align-stretch)' : 'flex-stretch');
    if (hHit && parseFloat(kcs.minHeight) > 0) cause = 'min-height';
    if (hHit && kcs.height && el.style.height) cause = 'fixed-height';
    const kind = (b.digits && b.text <= 30) ? 'stat-tile' : (b.text <= 24 && r1.height < 48 ? 'chip/badge/button' : 'card/panel');
    if (wHit) stretch.w++; if (hHit) stretch.h++;
    const key = kind + ' · ' + cause; stretch.byCause[key] = (stretch.byCause[key] || 0) + 1;
    if (stretch.examples.length < 8) stretch.examples.push({ kind, cause, w: Math.round(r0.width), wantW: Math.round(r1.width), h: Math.round(r0.height), wantH: Math.round(r1.height), text: (el.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 36) });
  }
  out.stretchedW = stretch.w; out.stretchedH = stretch.h; out.stretchedTotal = Object.values(stretch.byCause).reduce((a, b) => a + b, 0); out.stretchByCause = stretch.byCause; out.stretchExamples = stretch.examples;
  out.stretchedShareOfSmallBoxes = cand.length ? +(out.stretchedTotal / cand.length).toFixed(2) : 0; out.smallBoxesTested = cand.length;
  // modal / wall on load
  let modal = false;
  for (const e of document.querySelectorAll('body *')) { const cs = getComputedStyle(e); if (cs.position !== 'fixed' && cs.position !== 'absolute') continue; const r = e.getBoundingClientRect(); if (r.width * r.height < VA * 0.85) continue; const c = parseC(cs.backgroundColor); if ((c && c[3] >= 0.2 && c[3] <= 0.97 && !inMap(e)) || (cs.backdropFilter && cs.backdropFilter.includes('blur'))) { modal = true; break; } }
  if (!modal) for (const e of document.querySelectorAll('dialog[open],[role=dialog],[aria-modal=true]')) { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); if (cs.display !== 'none' && cs.visibility !== 'hidden' && r.width * r.height > VA * 0.12 && clipV(r) > 0) { modal = true; break; } }
  out.modalOnLoad = modal;
  // content column width (phone layout on a desktop?)
  const xs = []; { const w2 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let t, c = 0; const rg = document.createRange(); while ((t = w2.nextNode()) && c < 3000) { if (!t.textContent.trim() || !t.parentElement || inMap(t.parentElement)) continue; rg.selectNodeContents(t); for (const q of rg.getClientRects()) if (q.top >= 0 && q.top < VH && q.width > 0 && q.right > 0 && q.left < VW) { xs.push(Math.max(0, q.left), Math.min(VW, q.right)); c++; } } }
  xs.sort((a, b) => a - b); out.textColumnShare = xs.length > 10 ? +((xs[Math.floor(xs.length * 0.97)] - xs[Math.floor(xs.length * 0.03)]) / VW).toFixed(2) : null;
  // neon glow + big-number tiles + dark theme
  let glow = 0, bigNum = 0;
  for (const b of boxes) { const sh = b.cs.boxShadow || ''; const m = sh.match(/rgba?\([^)]+\)/g) || []; if (m.some(c => { const q = parseC(c); if (!q) return false; const [, s2, l2] = hsl(q); return s2 > .5 && l2 > .3 && q[3] > .2; }) && /\d+px\s+\d+px\s+([1-9]\d|[4-9])px/.test(sh)) glow++; }
  for (const e of document.querySelectorAll('body *')) { if (e.children.length) continue; const t = (e.textContent || '').trim(); if (!/^[\d.,%+\-]{1,7}$/.test(t)) continue; const r = e.getBoundingClientRect(); if (r.top > VH * 2 || r.width === 0 || inMap(e)) continue; if (parseFloat(getComputedStyle(e).fontSize) >= 26) bigNum++; }
  out.neonGlow = glow; out.bigNumbers = bigNum;
  { let inBox = 0, tot = 0; for (const [el, b] of info) {} const w3 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let t, c = 0;
    while ((t = w3.nextNode()) && c < 4000) { const tx = t.textContent.trim(); const pe = t.parentElement; if (!tx || !pe || inMap(pe) || pe.closest('script,style')) continue; const r = pe.getBoundingClientRect(); if (r.top > VH || r.bottom < 0 || r.width === 0) continue; c++; tot += tx.length;
      let q = pe, boxed = false; for (let d = 0; q && d < 12; d++, q = q.parentElement) { const b = info.get(q); if (b && b.r.width * b.r.height < VA * 0.35) { boxed = true; break; } } if (boxed) inBox += tx.length; }
    out.boxedTextShare = tot ? +(inBox / tot).toFixed(2) : 0; }
  const bb = parseC(getComputedStyle(document.body).backgroundColor) || [255, 255, 255, 0]; const hb = parseC(getComputedStyle(document.documentElement).backgroundColor) || [255, 255, 255, 0];
  const bgc = bb[3] > 0.1 ? bb : hb[3] > 0.1 ? hb : [255, 255, 255, 1]; out.darkTheme = (0.3 * bgc[0] + 0.59 * bgc[1] + 0.11 * bgc[2]) < 50;
  // hero
  const h1 = [...document.querySelectorAll('h1,h2,[class*="hero"],header')].find(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.top < VH; });
  let hero = 0;
  if (h1) { let s = h1, best = h1; while (s && s !== document.body) { const r = s.getBoundingClientRect(); if (r.width >= 0.8 * VW && r.top <= 5 + window.scrollY * 0 && r.height < 1.5 * VH) best = s; if (r.height >= 1.5 * VH) break; s = s.parentElement; } const r = best.getBoundingClientRect(); if (!hasMap(best) && !best.querySelector('table,canvas')) hero = Math.min(r.bottom, VH * 1.5) / VH; }
  // first data element top
  const dataEls = [...maps, ...document.querySelectorAll('table,canvas,svg[class*="chart"],[class*="recharts"]')].map(e => e.getBoundingClientRect()).filter(r => r.width > 120 && r.height > 60);
  out.firstDataTopScreens = dataEls.length ? +(Math.min(...dataEls.map(r => r.top)) / VH).toFixed(2) : null;
  // largest non-map box share (clipped to first screen)
  let largest = 0; for (const b of boxes) { if (b.el === document.body) continue; const a = clipV(b.r); if (a / VA > largest && b.r.width < VW * 0.98 + 1) largest = a / VA; }
  const rv = [...radii.entries()].filter(([k]) => k > 0).sort((a, b) => b[1] - a[1]); const rTot = [...radii.values()].reduce((a, b) => a + b, 0);
  const txt = (document.body.innerText || '').slice(0, 200000);
  const ph = {}; const PH = { lorem: /lorem ipsum/gi, placeholder: /placeholder/gi, sample: /sample data|ข้อมูลตัวอย่าง|\bdemo data\b|\bmock\b|dummy/gi, simulated: /simulated|จำลอง/gi, broken: /\bundefined\b|\bNaN\b|\[object Object\]/g, loading: /loading\.\.\.|กำลังโหลด/gi, comingSoon: /coming soon|เร็ว ?ๆ ?นี้/gi, dash: /(^|\s)(--|—|N\/A)(\s|$)/g };
  for (const [k, re] of Object.entries(PH)) ph[k] = (txt.match(re) || []).length;
  const famTop = [...fams.entries()].sort((a, b) => b[1] - a[1]);
  const SLOPF = ['inter', 'poppins', 'montserrat', 'roboto', 'open sans', 'lato', 'dm sans', 'space grotesk', 'geist', 'plus jakarta sans', 'manrope', 'nunito', 'system-ui', '-apple-system', 'blinkmacsystemfont', 'segoe ui', 'arial', 'helvetica', 'sans-serif', 'ui-sans-serif', 'noto sans thai', 'ibm plex sans thai', 'sarabun', 'kanit', 'prompt'];
  // Eight giveaway bans. Field names match tools/giveaway-bans.mjs. A hairline
  // (left border under 2px, or the same width as the other sides) is a rule, not a stripe.
  const bannedFaces = ['plus jakarta sans', 'space grotesk', 'dm sans', 'open sans', 'inter', 'poppins', 'montserrat', 'roboto', 'lato', 'geist', 'manrope', 'nunito'];
  const trackedOf = cs => { const ls = parseFloat(cs.letterSpacing), fs = parseFloat(cs.fontSize) || 16; return Number.isFinite(ls) && ls > 0.02 * fs; };
  const upperOf = cs => cs.textTransform === 'uppercase';
  const mutedOf = cs => { const c = parseC(cs.color); if (!c) return false; const [, s, l] = hsl(c); return s < 0.22 && l > 0.28 && l < 0.72; };
  const saturatedOf = color => { const c = parseC(color); return !!c && hsl(c)[1] > 0.35; };
  let eyebrowKickers = 0, sideStripes = 0, italicHeadlineWords = 0, displayCaps = 0, titleBlurbs = 0, statusDots = 0, equalStatCardRows = 0;
  const kickerEls = new Set();
  for (const h of document.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
    const hr = h.getBoundingClientRect();
    if (hr.width < 2 || hr.top > docTopLimit) continue;
    const prev = h.previousElementSibling;
    if (prev && !/^H[1-6]$/.test(prev.tagName)) {
      const pcs = getComputedStyle(prev);
      const pt = (prev.innerText || '').replace(/\s+/g, ' ').trim();
      const words = pt.split(' ').filter(Boolean);
      const letters = pt.replace(/[^A-Za-z]/g, '');
      const caps = upperOf(pcs) || (letters.length >= 3 && letters === letters.toUpperCase());
      const fs = parseFloat(pcs.fontSize) || 16;
      const cls = prev.getAttribute('class') || '';
      const small = fs <= 14 || prev.tagName === 'SMALL' || /\btext-(xs|sm)\b/.test(cls);
      if (pt && pt.length <= 32 && words.length <= 4 && (small || caps) && (caps || trackedOf(pcs))) { eyebrowKickers++; kickerEls.add(prev); }
    }
  }
  for (const h of document.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
    const hr = h.getBoundingClientRect();
    if (hr.width < 2 || hr.top > docTopLimit) continue;
    const hcs = getComputedStyle(h);
    if (!kickerEls.has(h) && upperOf(hcs) && trackedOf(hcs)) displayCaps++;
    if (/^H[1-3]$/.test(h.tagName)) {
      for (const n of h.querySelectorAll('em, i, span')) {
        if (n.closest('a')) continue;
        const t = (n.textContent || '').trim();
        if (!t || /\s/.test(t)) continue;
        if (!(h.textContent || '').replace(n.textContent || '', '').trim()) continue;
        const ncs = getComputedStyle(n);
        const clip = ncs.webkitBackgroundClip || ncs.backgroundClip;
        const italic = n.tagName === 'EM' || n.tagName === 'I' || ncs.fontStyle === 'italic';
        const grad = (ncs.backgroundImage || '').includes('gradient') && clip === 'text';
        const accent = n.tagName === 'SPAN' && ncs.color !== hcs.color && saturatedOf(ncs.color);
        if (italic || grad || accent) { italicHeadlineWords++; break; }
      }
    }
    const next = h.nextElementSibling;
    if (next && next.tagName === 'P') {
      const ncs = getComputedStyle(next);
      const nt = (next.innerText || '').trim();
      const nfs = parseFloat(ncs.fontSize) || 16;
      const hfs = parseFloat(hcs.fontSize) || 16;
      if (nt && nt.length <= 120 && nfs < hfs && mutedOf(ncs)) titleBlurbs++;
    }
  }
  for (const b of document.querySelectorAll('button, [role="button"], label')) {
    if (kickerEls.has(b)) continue;
    const r = b.getBoundingClientRect();
    if (r.width < 2 || r.top > docTopLimit) continue;
    const cs = getComputedStyle(b);
    if (upperOf(cs) && trackedOf(cs)) displayCaps++;
  }
  let seenGiveaway = 0;
  for (const el of document.body.querySelectorAll('*')) {
    if (++seenGiveaway > 4000) break;
    if ((el.closest('svg') && el.tagName !== 'svg') || el.tagName === 'BODY' || el.tagName === 'HTML') continue;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2 || r.top > docTopLimit) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const lw = parseFloat(cs.borderLeftWidth) || 0, rw = parseFloat(cs.borderRightWidth) || 0, tw = parseFloat(cs.borderTopWidth) || 0, bw = parseFloat(cs.borderBottomWidth) || 0;
    if (lw >= 2 && lw >= rw + 2 && lw >= tw + 2 && lw >= bw + 2) sideStripes++;
    const anim = `${cs.animationName || ''} ${el.getAttribute('class') || ''}`;
    if (/\bpulse\b|\bping\b|\bblink\b|animate-pulse|animate-ping/i.test(anim) && r.width <= 16 && r.height <= 16) statusDots++;
  }
  for (const p of parents) {
    if (['TABLE', 'THEAD', 'TBODY', 'TR'].includes(p.tagName)) continue;
    const kids = [...p.children].map(k => info.get(k)).filter(Boolean).filter(k => k.el.tagName !== 'TD' && k.el.tagName !== 'TH');
    if (kids.length < 3) continue;
    const rows = new Map();
    for (const k of kids) { const key = Math.round(k.r.top / 8); if (!rows.has(key)) rows.set(key, []); rows.get(key).push(k); }
    for (const row of rows.values()) {
      if (row.length < 3) continue;
      const ws = row.map(k => k.r.width), maxW = Math.max(...ws);
      if (!(maxW > 0) || (maxW - Math.min(...ws)) / maxW >= 0.08) continue;
      if (row.every(k => k.digits && k.text > 0 && k.text <= 80)) equalStatCardRows++;
    }
  }
  // Same canned-badge test as cannedStatusBadge in tools/giveaway-bans.mjs.
  // A negation or a clock time on the line is a status sentence, not the badge.
  if (txt.split(/\n+|(?<=[.!?])\s+/).some(line => {
    const t = line.replace(/\s+/g, ' ').trim();
    if (!/all systems operational|ai engine active/i.test(t)) return false;
    if (/\b(?:not|no|never|isn'?t|aren'?t|wasn'?t|weren'?t)\b/i.test(t)) return false;
    if (/\b\d{1,2}:\d{2}\b/.test(t)) return false;
    return true;
  })) statusDots++;
  const bannedFace = famTop[0] && bannedFaces.includes(famTop[0][0]) ? 1 : 0;
  Object.assign(out, {
    boxesMeasured: measured, medianFill: fills.length ? +fills.sort((a, b) => a - b)[Math.floor(fills.length / 2)].toFixed(3) : null,
    inflatedBoxes: inflated, statTilesStretched: statTiles, wideChips, tallEmptyBoxes: tallBoxes, eqHeightRows: eqRows, eqHeightStretchedCards: eqStretch,
    sparseStretchedRows: sparseRows, flexGrowShare: flexKids ? +(flexGrowKids / flexKids).toFixed(2) : 0,
    uniformGrids: uniGrids, uniformGrids3or4: uniGrid34, largestNonMapBoxShare: +largest.toFixed(3), heroShare: +hero.toFixed(2),
    fontSizes: fontSizes.size, fontSizesMajor: [...fontSizes.values()].filter(v => v >= 20).length,
    gradients, textGradients, glassBlur: glass, shadows, pills, eyebrowLabels: eyebrows, iconTiles,
    emoji, emojiIcons, maxLineEm: lines.length ? +Math.max(...lines.map(l => l.em)).toFixed(1) : 0, maxCpl: lines.length ? Math.round(Math.max(...lines.map(l => l.cpl))) : 0,
    radiusDistinct: rv.length, radiusModalShare: rTot ? +((rv[0]?.[1] || 0) / rTot).toFixed(2) : 0, radiusModal: rv[0]?.[0] ?? 0, roundedShare: rTot ? +(rv.reduce((a, b) => a + b[1], 0) / rTot).toFixed(2) : 0,
    purpleShare: colorArea.painted ? +(colorArea.purple / colorArea.painted).toFixed(3) : 0, accentHues: [...hues.entries()].filter(([, c]) => c >= 3).length,
    tailwindDefaultShare: colorSamples ? +(twHits / colorSamples).toFixed(2) : 0, oklch, primaryFont: famTop[0]?.[0] || '', fontFamilies: famTop.filter(([, c]) => c > 50).length,
    defaultFont: famTop[0] ? SLOPF.includes(famTop[0][0]) : false,
    eyebrowKickers, sideStripes, italicHeadlineWords, displayCaps, titleBlurbs, statusDots, equalStatCardRows, bannedFace,
    placeholderHits: ph, textChars: txt.length, bodySample: txt.slice(0, 160).replace(/\s+/g, ' '), examples
  });
  return out;
}

// ---------------------------------------------------------------- screenshot pixel stats
// share of the first screen that is flat (empty) and the largest connected flat region
export function pixelStats(buf) {
  const png = PNG.sync.read(buf); const { width: W, height: H, data } = png; const T = 20;
  const cols = Math.floor(W / T), rows = Math.floor(H / T); const flat = new Uint8Array(cols * rows); const tcol = new Array(cols * rows);
  for (let ty = 0; ty < rows; ty++) for (let tx = 0; tx < cols; tx++) {
    let s = 0, s2 = 0, n = 0, R = 0, G = 0, B = 0;
    for (let y = ty * T; y < ty * T + T; y += 2) for (let x = tx * T; x < tx * T + T; x += 2) { const i = (y * W + x) * 4; const l = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2]; s += l; s2 += l * l; n++; R += data[i]; G += data[i + 1]; B += data[i + 2]; }
    const sd = Math.sqrt(Math.max(0, s2 / n - (s / n) ** 2)); flat[ty * cols + tx] = sd < 1.5 ? 1 : 0; tcol[ty * cols + tx] = [R / n, G / n, B / n];
  }
  const total = cols * rows; const flatShare = flat.reduce((a, b) => a + b, 0) / total;
  // largest 4-connected region of flat tiles with similar colour
  const seen = new Uint8Array(total); let best = 0;
  for (let i = 0; i < total; i++) { if (!flat[i] || seen[i]) continue; let size = 0; const st = [i]; seen[i] = 1; const c0 = tcol[i];
    while (st.length) { const j = st.pop(); size++; const x = j % cols, y = (j / cols) | 0; for (const k of [x > 0 ? j - 1 : -1, x < cols - 1 ? j + 1 : -1, y > 0 ? j - cols : -1, y < rows - 1 ? j + cols : -1]) { if (k < 0 || seen[k] || !flat[k]) continue; const c = tcol[k]; if (Math.abs(c[0] - c0[0]) + Math.abs(c[1] - c0[1]) + Math.abs(c[2] - c0[2]) > 12) continue; seen[k] = 1; st.push(k); } }
    best = Math.max(best, size); }
  let lum = 0; for (const c of tcol) lum += 0.3 * c[0] + 0.59 * c[1] + 0.11 * c[2]; lum /= total;
  return { flatShare: +flatShare.toFixed(3), largestFlatRegion: +(best / total).toFixed(3), meanLum: Math.round(lum), darkScreen: lum < 70 };
}

export async function measure(page) {
  const dom = await page.evaluate(inPageMetrics);
  const shot = await page.screenshot({ type: 'png' });
  return { dom: { ...dom, ...pixelStats(shot) }, shot };
}

export async function lintUrl(browser, url, { shotsDir, slug, settleMs = 7000, saveShots = true } = {}) {
  const res = { url };
  for (const [vp, w, h, mobile] of [['desktop', 1440, 900, false], ['mobile', 390, 844, true]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: false, hasTouch: mobile, locale: 'th-TH', timezoneId: 'Asia/Bangkok', userAgent: mobile ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1' : undefined, ignoreHTTPSErrors: true });
    const page = await ctx.newPage();
    try {
      const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 35000 });
      res[vp + 'Status'] = resp ? resp.status() : null;
      await page.waitForLoadState('networkidle', { timeout: settleMs + 5000 }).catch(() => {});
      await page.waitForTimeout(settleMs / 2);
      const { dom, shot } = await measure(page);
      res[vp] = dom; res.finalUrl = page.url();
      if (shotsDir && saveShots) fs.writeFileSync(`${shotsDir}/${slug}-${vp}.png`, shot);
    } catch (e) { res[vp + 'Error'] = String(e.message || e).split('\n')[0].slice(0, 200); }
    await ctx.close();
  }
  const dd = res.desktop;
  if (dd && /just a moment|attention required|checking your browser|ตรวจสอบความปลอดภัย/i.test(dd.title + ' ' + (dd.bodySample || ''))) { res.status = 'BLOCKED'; }
  else if (dd && dd.textChars < 400 && !dd.mapCount && (dd.largestFlatRegion || 0) > 0.6) { res.status = 'DEAD/EMPTY'; }
  else if (dd) res.status = 'OK';
  if (res.desktop && res.status === 'OK') res.lint = score(res.desktop, res.mobile || {});
  if (res.lint) res.lint.verdict = res.lint.points >= SLOP_THRESHOLD_POINTS ? 'SLOP' : res.lint.points >= REVIEW_THRESHOLD_POINTS ? 'REVIEW' : 'OK';
  return res;
}

// ---------------------------------------------------------------- CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2); const urls = args.filter(a => !a.startsWith('--')); const json = args.includes('--json');
  const shotsDir = (args.find(a => a.startsWith('--shots=')) || '').slice(8) || null;
  if (!urls.length) { console.error('usage: node slop-lint.mjs <url>... [--json] [--shots=dir]'); process.exit(2); }
  const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  for (const u of urls) {
    const r = await lintUrl(browser, u, { shotsDir, slug: u.replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/gi, '-').slice(0, 50) });
    if (json) console.log(JSON.stringify(r)); else if (!r.lint) console.log(`${u}\t${r.status || 'ERROR'}\t${r.desktopError || r.mobileError || ''}`);
    else console.log(`${u}\t${r.lint.verdict}\tscore=${r.lint.score} points=${r.lint.points}\t${r.lint.hits.join(',')}`);
  }
  await browser.close();
}
