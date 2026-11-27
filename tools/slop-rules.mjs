// Scoring rules for slop-lint. No browser imports: fixture tests load this file
// without Playwright. Thresholds are the Oct 2026 flood-app study. Giveaway
// bans are appended at weight 1, the same weight as a gradient or a glass layer.
// Existing weights are unchanged.
import { GIVEAWAY_RULES } from './giveaway-bans.mjs';

const stretchCount = (d, mobile) => Object.entries(d.stretchByCause || {}).reduce((a, [k, v]) => a + (k === 'card/panel · block-full-width' || (mobile && k === 'chip/badge/button · block-full-width') ? 0 : v), 0);

export const RULES = [
  { id: 'stretch-to-fill', w: 2, desc: 'Small things (stat tiles, chips, short cards) laid out ≥2× wider or ≥1.6× taller than their own content needs, ≥2 of them', test: (d, m) => stretchCount(d, false) + stretchCount(m, true) >= 2 },
  { id: 'rounded-same', w: 2, desc: 'Rounded-everything: ≥80% of boxes rounded and ≥40% share one radius (≥8 boxes)', test: d => d.boxesMeasured >= 8 && d.roundedShare >= 0.8 && d.radiusModalShare >= 0.4 },
  { id: 'emoji-icons', w: 2, desc: '≥3 emoji used as icons on labels, headings, buttons or list items', test: (d, m) => Math.max(d.emojiIcons || 0, m.emojiIcons || 0) >= 3 },
  { id: 'dark-command-centre', w: 2, desc: 'Dark "command centre" first screen (mean luminance <70) plus any of: glow, gradient, glass, ≥10 pills, ≥3 emoji icons', test: (d, m) => !!(d.darkScreen || m.darkScreen) && ((d.neonGlow || 0) >= 1 || (d.gradients || 0) >= 1 || (d.glassBlur || 0) >= 1 || (d.pills || 0) >= 10 || (d.emojiIcons || 0) >= 3) },
  { id: 'void', w: 2, desc: 'A flat empty region ≥35% of the first screen, or text squeezed into <45% of a desktop width, with no big map', test: (d, m) => (d.mapShareFirstScreen || 0) < 0.4 && (d.dataShareFirstScreen || 0) < 0.4 && ((d.largestFlatRegion || 0) >= 0.35 || (d.textColumnShare != null && d.textColumnShare < 0.45)) },
  { id: 'hero-no-data', w: 2, desc: 'Hero ≥55% of the first screen with <20% map or data on it', test: d => d.heroShare >= 0.55 && d.dataShareFirstScreen < 0.2 },
  { id: 'shadow-everything', w: 1, desc: 'Fake depth: ≥8 boxes carry a drop shadow on one screen', test: d => (d.shadows || 0) >= 8 },
  { id: 'box-soup', w: 1, desc: '≥30 separate boxes with ≥5 different corner radii (no system, everything containerised)', test: d => (d.boxesMeasured || 0) >= 30 && (d.radiusDistinct || 0) >= 5 },
  { id: 'pill-clutter', w: 1, desc: '≥10 pills/badges on one screen', test: (d, m) => Math.max(d.pills || 0, m.pills || 0) >= 10 },
  { id: 'modal-on-load', w: 1, desc: 'A modal or full-screen overlay covers the content on first load', test: (d, m) => !!(d.modalOnLoad || m.modalOnLoad) },
  { id: 'gradients', w: 1, desc: '≥3 decorative gradient fills, or gradient text', test: (d, m) => Math.max(d.gradients || 0, m.gradients || 0) >= 3 || (d.textGradients || 0) >= 1 },
  { id: 'glass', w: 1, desc: '≥2 glassmorphism (backdrop blur) layers', test: (d, m) => Math.max(d.glassBlur || 0, m.glassBlur || 0) >= 2 },
  { id: 'big-number-tiles', w: 1, desc: '≥2 big (≥26px) bare numbers in tiles', test: d => (d.bigNumbers || 0) >= 2 },
  { id: 'long-lines', w: 1, desc: 'Prose lines wider than ~40em (≈80+ Latin characters)', test: d => d.maxLineEm > 40 },
  { id: 'type-chaos', w: 1, desc: '≥9 distinct font sizes (no type scale)', test: d => d.fontSizes >= 9 },
  { id: 'boxed-everything', w: 0, desc: '≥70% of first-screen text sits inside cards or boxes (reported only: map apps put text in panels by necessity)', test: d => (d.boxedTextShare || 0) >= 0.7 },
  { id: 'mobile-overflow', w: 1, desc: 'Phone layout scrolls sideways', test: (d, m) => !!m.hOverflow },
  { id: 'broken-placeholder', w: 1, desc: 'Visible undefined/NaN, lorem ipsum or mock/sample data', test: d => (d.placeholderHits?.broken || 0) + (d.placeholderHits?.lorem || 0) + (d.placeholderHits?.sample || 0) >= 1 },
  { id: 'default-font', w: 0, desc: 'Primary face is a stock default (reported only: clean apps use them too)', test: d => !!d.defaultFont },
  ...GIVEAWAY_RULES,
];

export function score(d, m = {}) {
  const hits = RULES.filter(r => { try { return r.test(d, m); } catch { return false; } });
  const pts = hits.reduce((a, r) => a + r.w, 0); const max = RULES.reduce((a, r) => a + r.w, 0);
  return { score: Math.round(100 * pts / max), points: pts, hits: hits.map(r => r.id) };
}

// >=6 points: SLOP (high precision); 3-5: REVIEW (a person looks); <3: OK. See REPORT.md for the precision/recall behind these.
export const SLOP_THRESHOLD_POINTS = +(process.env.SLOP_THRESHOLD || 6);
export const REVIEW_THRESHOLD_POINTS = +(process.env.REVIEW_THRESHOLD || 3);
