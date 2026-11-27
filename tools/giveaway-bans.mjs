#!/usr/bin/env node
// giveaway-bans.mjs — source check for the eight giveaway bans in ANTI-SLOP.md.
// A hit is a ban. STYLE.md waives one only when it names that ban as a deliberate
// choice ("Eyebrows are a deliberate choice on the masthead.") or `allow: eyebrows`.
// Usage: node tools/giveaway-bans.mjs <file> [more files...]
import fs from 'fs';
import path from 'path';

// Exact family names. "Geist Mono" is a code face and stays out. Prompt and Kanit
// are house faces for Thai and stay out. system-ui stays on the reported-only
// default-font rule in slop-lint, weight 0.
export const BANNED_FACES = [
  'plus jakarta sans',
  'space grotesk',
  'dm sans',
  'open sans',
  'inter',
  'poppins',
  'montserrat',
  'roboto',
  'lato',
  'geist',
  'manrope',
  'nunito',
];

export function isBannedFace(name) {
  const n = String(name || '').toLowerCase().replace(/["']/g, '').trim();
  if (!n || n.endsWith(' mono')) return false;
  return BANNED_FACES.includes(n);
}

// Weights match the single-tell rules in slop-lint (a gradient, a glass layer):
// 1 point each. title-blurb and equal-stat-cards fire on a repeated row, not one.
export const GIVEAWAYS = [
  { id: 'eyebrows', w: 1, metric: 'eyebrowKickers', at: 1, desc: 'Small tracked or all-caps kicker above a heading' },
  { id: 'side-stripe', w: 1, metric: 'sideStripes', at: 1, desc: 'Accent bar on one side of a card, callout or list item (border-left stripe of 2px or more)' },
  { id: 'one-italic-word', w: 1, metric: 'italicHeadlineWords', at: 1, desc: 'A single italic, gradient or accent-coloured word inside an h1–h3' },
  { id: 'display-caps', w: 1, metric: 'displayCaps', at: 1, desc: 'Uppercase plus letter-spacing on a heading, button or label' },
  { id: 'banned-face', w: 1, metric: 'bannedFace', at: 1, desc: 'Primary face is Inter or another banned default (Poppins, Montserrat, Roboto, Open Sans, Lato, DM Sans, Space Grotesk, Geist, Plus Jakarta Sans, Manrope, Nunito)' },
  { id: 'equal-stat-cards', w: 1, metric: 'equalStatCardRows', at: 1, desc: 'A row of three or more equal sibling stat cards' },
  { id: 'title-blurb', w: 1, metric: 'titleBlurbs', at: 3, desc: 'A small muted subtitle directly under a heading, three or more times' },
  { id: 'status-dot', w: 1, metric: 'statusDots', at: 1, desc: 'A pulsing or glowing status dot, or a badge reading All Systems Operational / AI Engine Active' },
];

export const GIVEAWAY_RULES = GIVEAWAYS.map(g => ({
  id: g.id,
  w: g.w,
  desc: g.desc,
  test: d => (d[g.metric] || 0) >= g.at || (g.id === 'banned-face' && isBannedFace(d.primaryFont || '')),
}));

const ALIASES = {
  eyebrows: ['eyebrow', 'eyebrows', 'kicker', 'kickers'],
  'side-stripe': ['side-stripe', 'side stripe', 'side stripes', 'accent bar', 'colour down one side', 'color down one side'],
  'one-italic-word': ['one-italic-word', 'one italic word', 'italic word'],
  'display-caps': ['display-caps', 'display caps', 'all caps for looks'],
  'banned-face': ['banned-face', 'banned face', 'inter'],
  'equal-stat-cards': ['equal-stat-cards', 'equal stat cards', 'stat cards'],
  'title-blurb': ['title-blurb', 'title blurb', 'blurb under every title'],
  'status-dot': ['status-dot', 'status dot', 'status dots', 'blinking status'],
};

const VOID = new Set('area base br col embed hr img input link meta source track wbr'.split(' '));
const CHROMATIC = /^(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)$/;

function mentions(text, alias) {
  const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '\\s+');
  return new RegExp(`(?:^|[^a-z0-9])${escaped}(?:$|[^a-z0-9])`, 'i').test(text);
}

export function waiversFromStyle(style) {
  const waived = new Set();
  const grant = scope => {
    const low = scope.toLowerCase();
    for (const [id, aliases] of Object.entries(ALIASES)) {
      if (id === low || aliases.some(alias => mentions(low, alias) || alias === low)) waived.add(id);
    }
  };
  for (const line of String(style || '').split(/\n+/)) {
    const allow = line.match(/^\s*allow:\s*(.+?)\s*$/i);
    if (allow) {
      grant(allow[1].replace(/[.]+$/, '').trim().toLowerCase());
      continue;
    }
    for (const sentence of line.split(/(?<=[.!])\s+/)) {
      if (/\b(not|never|no|avoid|without|ban|banned|forbid|forbidden)\b/i.test(sentence)) continue;
      const subject = sentence.match(/(.{0,80}?)\b(?:is|are)\s+a\s+deliberate\s+choice\b/i);
      if (subject) grant(subject[1]);
    }
  }
  return waived;
}

function classesOf(el) {
  return String(el.attrs.class || el.attrs.classname || '').trim().split(/\s+/).filter(Boolean);
}

function parseDecls(text) {
  const dec = {};
  for (const part of String(text || '').split(';')) {
    const i = part.indexOf(':');
    if (i < 0) continue;
    const key = part.slice(0, i).trim().toLowerCase();
    const value = part.slice(i + 1).trim();
    if (key) dec[key] = value;
  }
  return dec;
}

function pxWidth(value) {
  if (value == null) return null;
  const m = String(value).trim().match(/^(\d+(?:\.\d+)?)px\b/);
  return m ? parseFloat(m[1]) : null;
}

function firstFamily(value) {
  return String(value || '').split(',')[0].replace(/["']/g, '').trim();
}

function parseCss(css) {
  const frames = [];
  const rules = [];
  const src = String(css || '').replace(/\/\*[\s\S]*?\*\//g, '');
  let i = 0;
  const skipSpace = () => { while (i < src.length && /\s/.test(src[i])) i++; };
  while (i < src.length) {
    skipSpace();
    if (i >= src.length) break;
    const start = i;
    let depth = 0;
    while (i < src.length && !(src[i] === '{' && depth === 0)) {
      if (src[i] === '"' || src[i] === "'") {
        const q = src[i++];
        while (i < src.length && src[i] !== q) i++;
        i++;
        continue;
      }
      i++;
    }
    if (i >= src.length) break;
    const prelude = src.slice(start, i).trim();
    i++;
    const bodyStart = i;
    depth = 1;
    while (i < src.length && depth > 0) {
      if (src[i] === '{') depth++;
      else if (src[i] === '}') depth--;
      i++;
    }
    const body = src.slice(bodyStart, i - 1);
    if (/^@keyframes\b/i.test(prelude)) {
      const name = prelude.replace(/^@keyframes\s+/i, '').trim().toLowerCase();
      if (name) frames.push(name);
      continue;
    }
    if (/^@(media|supports|layer|container)\b/i.test(prelude)) {
      const inner = parseCss(body);
      frames.push(...inner.frames);
      rules.push(...inner.rules);
      continue;
    }
    if (prelude.startsWith('@')) continue;
    rules.push({ prelude, dec: parseDecls(body) });
  }
  return { frames, rules };
}

function compoundMatch(compound, el) {
  if (!el || !el.tag) return false;
  const raw = compound.trim().toLowerCase();
  if (!raw) return false;
  if (raw === ':root' || raw === ':root,' ) return el.tag === 'html' || el.tag === 'body';
  const stripped = raw.replace(/::?[a-z-]+(\([^)]*\))?/g, '');
  if (!stripped) return raw === ':root';
  const m = stripped.match(/^([a-z][a-z0-9-]*)?((?:\.[_a-z][\w-]*)*)(#[_a-z][\w-]*)?$/i);
  if (!m) return false;
  const [, tag, classBlob, id] = m;
  if (tag && tag !== el.tag) return false;
  if (id && id.slice(1) !== (el.attrs.id || '').toLowerCase()) return false;
  if (classBlob) {
    const have = new Set(classesOf(el).map(c => c.toLowerCase()));
    for (const token of classBlob.split('.').filter(Boolean)) {
      if (!have.has(token.toLowerCase())) return false;
    }
  }
  return Boolean(tag || classBlob || id);
}

function selectorMatches(selector, el) {
  const parts = selector.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return false;
  if (!compoundMatch(parts[parts.length - 1], el)) return false;
  let ancestor = el.parent;
  for (let p = parts.length - 2; p >= 0; p--) {
    while (ancestor && !compoundMatch(parts[p], ancestor)) ancestor = ancestor.parent;
    if (!ancestor) return false;
    ancestor = ancestor.parent;
  }
  return true;
}

function applicable(el, rules) {
  const dec = {};
  for (const rule of rules) {
    const selectors = rule.prelude.split(',').map(s => s.trim()).filter(Boolean);
    if (selectors.some(sel => selectorMatches(sel, el))) Object.assign(dec, rule.dec);
  }
  Object.assign(dec, parseDecls(el.attrs.style || ''));
  return dec;
}

function parseHtml(html) {
  const root = { tag: '#root', attrs: {}, children: [], parent: null };
  const stack = [root];
  const s = String(html || '');
  let i = 0;
  while (i < s.length) {
    if (s.startsWith('<!--', i)) {
      const end = s.indexOf('-->', i + 4);
      i = end < 0 ? s.length : end + 3;
      continue;
    }
    if (s.startsWith('<!', i) || s.startsWith('<?', i)) {
      const end = s.indexOf('>', i);
      i = end < 0 ? s.length : end + 1;
      continue;
    }
    if (s[i] !== '<') {
      const next = s.indexOf('<', i);
      const text = s.slice(i, next < 0 ? s.length : next);
      if (text) stack[stack.length - 1].children.push({ type: 'text', text });
      i = next < 0 ? s.length : next;
      continue;
    }
    if (s.startsWith('</', i)) {
      const m = /^<\/([a-zA-Z][\w-]*)\s*>/.exec(s.slice(i));
      if (!m) { i++; continue; }
      const tag = m[1].toLowerCase();
      i += m[0].length;
      for (let k = stack.length - 1; k > 0; k--) {
        if (stack[k].tag === tag) { stack.length = k; break; }
      }
      continue;
    }
    const open = /^<([a-zA-Z][\w-]*)\b/.exec(s.slice(i));
    if (!open) { i++; continue; }
    const tag = open[1].toLowerCase();
    let j = i + open[0].length;
    const attrs = {};
    while (j < s.length && s[j] !== '>') {
      const am = /^\s+([^\s=\/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/.exec(s.slice(j));
      if (!am) { j++; continue; }
      attrs[am[1].toLowerCase()] = am[2] ?? am[3] ?? am[4] ?? '';
      j += am[0].length;
    }
    const selfClose = j > i && s[j - 1] === '/' || VOID.has(tag);
    if (s[j] === '>') j++;
    const el = { tag, attrs, children: [], parent: stack[stack.length - 1] };
    stack[stack.length - 1].children.push(el);
    if (tag === 'script' || tag === 'style') {
      const endTag = `</${tag}>`;
      const end = s.toLowerCase().indexOf(endTag, j);
      const inner = end < 0 ? s.slice(j) : s.slice(j, end);
      if (tag === 'style') el.css = inner;
      else el.script = inner;
      el.children.push({ type: 'text', text: inner });
      i = end < 0 ? s.length : end + endTag.length;
      continue;
    }
    i = j;
    if (!selfClose) stack.push(el);
  }
  return root;
}

function walk(el, fn) {
  for (const child of el.children || []) {
    if (!child.tag) continue;
    fn(child);
    walk(child, fn);
  }
}

function textOf(el) {
  let t = '';
  for (const child of el.children || []) {
    if (child.type === 'text') t += child.text;
    else if (child.tag && child.tag !== 'style' && child.tag !== 'script') t += textOf(child);
  }
  return t;
}

function elementChildren(el) {
  return (el.children || []).filter(c => c.tag && c.tag !== 'script' && c.tag !== 'style');
}

function nextElement(el) {
  if (!el.parent) return null;
  const kids = elementChildren(el.parent);
  const index = kids.indexOf(el);
  return index >= 0 ? kids[index + 1] || null : null;
}

function classHas(el, pred) {
  return classesOf(el).some(pred);
}

function positiveTracking(value) {
  if (!value) return false;
  const v = String(value).trim().toLowerCase();
  if (v === 'normal' || v === '0') return false;
  const m = v.match(/^(-?(?:\d+)?\.?\d+)(px|em|rem)?$/);
  return Boolean(m) && parseFloat(m[1]) > 0;
}

function hasTracking(el, dec) {
  if (classHas(el, c => c === 'tracking-wide' || c === 'tracking-wider' || c === 'tracking-widest')) return true;
  if (classHas(el, c => {
    const m = c.match(/^tracking-\[(-?(?:\d+)?\.?\d+)(px|em|rem)?\]$/);
    return Boolean(m) && parseFloat(m[1]) > 0;
  })) return true;
  return positiveTracking(dec['letter-spacing']);
}

function hasUpper(el, dec) {
  if (classHas(el, c => c === 'uppercase')) return true;
  return (dec['text-transform'] || '').toLowerCase() === 'uppercase';
}

function isSmall(el, dec) {
  if (el.tag === 'small') return true;
  if (classHas(el, c => c === 'text-xs' || c === 'text-sm' || c === 'eyebrow' || c === 'kicker')) return true;
  if (classHas(el, c => {
    const m = c.match(/^text-\[(\d+(?:\.\d+)?)px\]$/);
    return Boolean(m) && parseFloat(m[1]) <= 14;
  })) return true;
  const fs = pxWidth(dec['font-size']);
  return fs != null && fs <= 14;
}

function letters(text) {
  return String(text || '').replace(/[^A-Za-z]/g, '');
}

function isStripe(el, dec) {
  if (el.tag === 'html' || el.tag === 'body' || el.tag === '#root') return false;
  if (classHas(el, c => /^border-l-(?:[2-9]|\d{2,})$/.test(c))) return true;
  if (classHas(el, c => {
    const m = c.match(/^border-l-\[(\d+(?:\.\d+)?)px\]$/);
    return Boolean(m) && parseFloat(m[1]) >= 2;
  })) return true;
  const left = pxWidth(dec['border-left-width']) ?? pxWidth(dec['border-left']);
  const right = pxWidth(dec['border-right-width']) ?? pxWidth(dec['border-right']);
  const top = pxWidth(dec['border-top-width']) ?? pxWidth(dec['border-top']);
  const bottom = pxWidth(dec['border-bottom-width']) ?? pxWidth(dec['border-bottom']);
  const all = pxWidth(dec.border);
  const lw = left ?? all;
  if (lw == null || lw < 2) return false;
  if (left != null && right == null && top == null && bottom == null && all == null) return true;
  const rw = right ?? all ?? 0;
  const tw = top ?? all ?? 0;
  const bw = bottom ?? all ?? 0;
  return lw >= rw + 2 && lw >= tw + 2 && lw >= bw + 2;
}

function decoratedWord(el, dec) {
  if (el.tag === 'em' || el.tag === 'i') return true;
  if (classHas(el, c => c === 'italic')) return true;
  if ((dec['font-style'] || '').toLowerCase() === 'italic') return true;
  if (classHas(el, c => c === 'bg-clip-text')) return true;
  const clip = `${dec['background-clip'] || ''} ${dec['-webkit-background-clip'] || ''}`;
  const bg = `${dec.background || ''} ${dec['background-image'] || ''}`;
  if (clip.includes('text') && /gradient/i.test(bg)) return true;
  if (classHas(el, c => c === 'text-accent' || c === 'text-primary')) return true;
  if (classHas(el, c => {
    const m = c.match(/^text-([a-z]+)-\d{2,3}$/);
    return Boolean(m) && CHROMATIC.test(m[1]);
  })) return true;
  return false;
}

function looksLikeCard(el, dec) {
  if (classHas(el, c => /(?:^|[-_])(card|stat|tile|feature)(?:$|[-_])/.test(c) || c === 'card' || c === 'stat' || c === 'tile')) return true;
  if (classHas(el, c => c === 'border' || c.startsWith('rounded') || c.startsWith('shadow') || c.startsWith('bg-') || c.startsWith('border-'))) return true;
  const blob = `${dec.border || ''} ${dec['background-color'] || ''} ${dec.background || ''} ${dec['box-shadow'] || ''}`;
  return /border|background|box-shadow/i.test(blob);
}

function hasStatNumber(el) {
  const t = textOf(el).replace(/\s+/g, ' ').trim();
  if (!t || t.length > 80) return false;
  return /(?:^|\s)\d[\d,]*(?:\.\d+)?(?:%|[kKmM])?(?=\s|$)/.test(` ${t} `) || /(?:^|\s)\d[\d,]*(?:\.\d+)?(?:%|[kKmM])?(?=\s|$)/.test(t);
}

function isMuted(el, dec) {
  if (classHas(el, c => /^text-(?:gray|slate|neutral|zinc|stone|muted)(?:-|$)/.test(c) || c === 'text-muted-foreground' || c.includes('muted-foreground'))) return true;
  const color = (dec.color || '').trim().toLowerCase();
  if (!color) return false;
  if (color === 'gray' || color === 'grey') return true;
  const hex = color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const raw = hex[1].length === 3 ? hex[1].split('').map(ch => ch + ch).join('') : hex[1];
    const r = parseInt(raw.slice(0, 2), 16);
    const g = parseInt(raw.slice(2, 4), 16);
    const b = parseInt(raw.slice(4, 6), 16);
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;
    const light = (max + min) / 2 / 255;
    return sat < 0.25 && light > 0.28 && light < 0.75;
  }
  const rgb = color.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgb) {
    const [r, g, b] = [rgb[1], rgb[2], rgb[3]].map(Number);
    return Math.abs(r - g) < 12 && Math.abs(g - b) < 12 && r > 70 && r < 190;
  }
  return false;
}

function isSmallText(el, dec) {
  if (isSmall(el, dec)) return true;
  if (classHas(el, c => c === 'text-sm' || c === 'text-xs')) return true;
  const fs = pxWidth(dec['font-size']);
  return fs != null && fs <= 16;
}

function dotSize(el, dec) {
  const widthClass = classHas(el, c => /^(?:w|size)-(?:1\.5|2\.5|1|2|3|4|\[(?:[4-9]|1[0-6])px\])$/.test(c));
  const heightClass = classHas(el, c => /^(?:h|size)-(?:1\.5|2\.5|1|2|3|4|\[(?:[4-9]|1[0-6])px\])$/.test(c));
  const round = classHas(el, c => c === 'rounded-full') || /^(?:50%|9999px)$/.test(String(dec['border-radius'] || '').trim());
  if (round && widthClass && heightClass) return true;
  const w = pxWidth(dec.width);
  const h = pxWidth(dec.height);
  return w != null && h != null && w > 0 && h > 0 && w <= 16 && h <= 16;
}

function pulsing(el, dec) {
  if (classHas(el, c => c === 'animate-pulse' || c === 'animate-ping')) return true;
  const anim = `${dec.animation || ''} ${dec['animation-name'] || ''}`.toLowerCase();
  return /\b(pulse|ping|blink)\b/.test(anim);
}

function familiesInUrl(url) {
  const found = [];
  const q = String(url || '').split('?')[1] || '';
  for (const part of q.split('&')) {
    const eq = part.indexOf('=');
    if (eq < 0) continue;
    if (part.slice(0, eq) !== 'family') continue;
    const raw = decodeURIComponent(part.slice(eq + 1)).replace(/\+/g, ' ');
    for (const item of raw.split('|')) found.push(item.split(':')[0].trim());
  }
  return found;
}

function collectFaces(root, rules, rawStyles) {
  const faces = [];
  const take = value => {
    const name = firstFamily(value);
    if (name) faces.push(name);
  };
  for (const rule of rules) {
    if (rule.dec['font-family']) take(rule.dec['font-family']);
  }
  walk(root, el => {
    if (el.attrs.style && /font-family\s*:/i.test(el.attrs.style)) take(parseDecls(el.attrs.style)['font-family']);
    for (const token of classesOf(el)) {
      const arbitrary = token.match(/^font-\[['"]([^'"]+)['"]\]$/);
      if (arbitrary) faces.push(arbitrary[1]);
    }
    if (el.tag === 'link') familiesInUrl(el.attrs.href || '').forEach(name => faces.push(name));
  });
  for (const css of rawStyles) {
    const imports = css.match(/@import[^;]*url\(\s*['"]?([^'")]+)/gi) || [];
    for (const line of imports) {
      const url = line.match(/url\(\s*['"]?([^'")]+)/i);
      if (url) familiesInUrl(url[1]).forEach(name => faces.push(name));
    }
  }
  return faces;
}

function nextFontFaces(source) {
  const faces = [];
  const re = /import\s*\{([^}]+)\}\s*from\s*['"]next\/font\/google['"]/g;
  let m;
  while ((m = re.exec(source))) {
    for (const part of m[1].split(',')) {
      const ident = part.trim().split(/\s+as\s+/i)[0].trim();
      if (ident) faces.push(ident.replace(/_/g, ' '));
    }
  }
  return faces;
}

// The two badge phrases from the eight-ban law. A line that negates them, or
// that carries a clock time, is a status sentence. The bare badge still hits.
export function cannedStatusBadge(text) {
  return String(text || '').split(/\n+|(?<=[.!?])\s+/).some(chunk => {
    const t = chunk.replace(/\s+/g, ' ').trim();
    if (!/all systems operational|ai engine active/i.test(t)) return false;
    if (/\b(?:not|no|never|isn'?t|aren'?t|wasn'?t|weren'?t)\b/i.test(t)) return false;
    if (/\b\d{1,2}:\d{2}\b/.test(t)) return false;
    return true;
  });
}

export function scanSource(source, { style = '' } = {}) {
  const waived = waiversFromStyle(style);
  const root = parseHtml(source);
  const cssChunks = [];
  walk(root, el => { if (el.tag === 'style' && el.css) cssChunks.push(el.css); });
  const parsed = cssChunks.map(parseCss);
  const rules = parsed.flatMap(p => p.rules);
  const counts = {
    eyebrowKickers: 0,
    sideStripes: 0,
    italicHeadlineWords: 0,
    displayCaps: 0,
    bannedFace: 0,
    equalStatCardRows: 0,
    titleBlurbs: 0,
    statusDots: 0,
  };
  const kickers = new Set();
  const elements = [];
  walk(root, el => elements.push(el));
  const decOf = new Map(elements.map(el => [el, applicable(el, rules)]));

  for (const el of elements) {
    if (!/^h[1-6]$/.test(el.tag)) continue;
    const prev = el.parent ? elementChildren(el.parent)[elementChildren(el.parent).indexOf(el) - 1] : null;
    if (!prev || /^h[1-6]$/.test(prev.tag)) continue;
    const prevDec = decOf.get(prev) || {};
    const raw = textOf(prev).replace(/\s+/g, ' ').trim();
    const words = raw.split(' ').filter(Boolean);
    const caps = hasUpper(prev, prevDec) || (letters(raw).length >= 3 && letters(raw) === letters(raw).toUpperCase());
    const small = isSmall(prev, prevDec);
    if (raw && raw.length <= 32 && words.length <= 4 && (small || caps) && (caps || hasTracking(prev, prevDec))) {
      counts.eyebrowKickers++;
      kickers.add(prev);
    }
  }

  for (const el of elements) {
    const dec = decOf.get(el) || {};
    if (isStripe(el, dec)) counts.sideStripes++;
    const capsTarget = /^h[1-6]$/.test(el.tag) || el.tag === 'button' || el.tag === 'label' || (el.attrs.role || '').toLowerCase() === 'button';
    if (capsTarget && !kickers.has(el) && hasUpper(el, dec) && hasTracking(el, dec)) counts.displayCaps++;
    if (/^h[1-6]$/.test(el.tag)) {
      const next = nextElement(el);
      if (next && next.tag === 'p') {
        const nd = decOf.get(next) || {};
        const copy = textOf(next).replace(/\s+/g, ' ').trim();
        if (copy && copy.length <= 120 && isSmallText(next, nd) && isMuted(next, nd)) counts.titleBlurbs++;
      }
    }
    if (pulsing(el, dec) && dotSize(el, dec)) counts.statusDots++;
    if (!['table', 'thead', 'tbody', 'tr'].includes(el.tag)) {
      const kids = elementChildren(el).filter(k => k.tag !== 'td' && k.tag !== 'th');
      let run = [];
      let key = '';
      const flush = () => {
        if (run.length >= 3 && run.every(kid => looksLikeCard(kid, decOf.get(kid) || {}) && hasStatNumber(kid))) counts.equalStatCardRows++;
        run = [];
      };
      for (const kid of kids) {
        const kidKey = classesOf(kid).join(' ');
        if (kidKey && kidKey === key) run.push(kid);
        else {
          flush();
          key = kidKey;
          run = kidKey ? [kid] : [];
        }
      }
      flush();
    }
  }

  for (const el of elements) {
    if (!/^h[1-3]$/.test(el.tag)) continue;
    const whole = textOf(el);
    let hit = false;
    walk(el, node => {
      if (hit || node === el) return;
      if (node.tag === 'a') return;
      let parent = node.parent;
      while (parent) {
        if (parent.tag === 'a') return;
        parent = parent.parent;
      }
      const word = textOf(node).trim();
      if (!word || /\s/.test(word)) return;
      if (!whole.replace(word, '').trim()) return;
      if (decoratedWord(node, decOf.get(node) || {})) hit = true;
    });
    if (hit) counts.italicHeadlineWords++;
  }

  if (cannedStatusBadge(textOf(root))) counts.statusDots++;

  const faces = [...collectFaces(root, rules, cssChunks), ...nextFontFaces(source)];
  if (faces.some(isBannedFace)) counts.bannedFace = 1;

  const hits = GIVEAWAYS.filter(g => counts[g.metric] >= g.at && !waived.has(g.id)).map(g => g.id);
  return { hits, counts, waived: [...waived] };
}

function findStyle(file) {
  let dir = path.dirname(path.resolve(file));
  for (let i = 0; i < 8; i++) {
    if (fs.existsSync(path.join(dir, '.git'))) {
      const candidate = path.join(dir, 'STYLE.md');
      return fs.existsSync(candidate) ? fs.readFileSync(candidate, 'utf8') : '';
    }
    const candidate = path.join(dir, 'STYLE.md');
    if (fs.existsSync(candidate)) return fs.readFileSync(candidate, 'utf8');
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return '';
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const files = process.argv.slice(2).filter(a => !a.startsWith('--'));
  if (!files.length) {
    console.error('usage: node tools/giveaway-bans.mjs <file> [more files...]');
    process.exit(2);
  }
  let failed = 0;
  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8');
    const result = scanSource(source, { style: findStyle(file) });
    if (result.hits.length) failed = 1;
    console.log(`${file}\t${result.hits.length ? result.hits.join(',') : 'OK'}`);
  }
  process.exit(failed);
}
