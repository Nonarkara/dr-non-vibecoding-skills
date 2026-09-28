/**
 * Per-province brand palette — layered on top of Axiom Design Core's fixed
 * structural tokens (tokens.css), never replacing them.
 *
 * THE ONE RULE THAT KEEPS THIS SAFE, stated as an invariant an agent (or a
 * future you) can check against a diff:
 *
 *   Status colors (green/amber/orange/red — flood band, AQI band, coupling
 *   band) are LOAD-BEARING and must NEVER be reused for province branding.
 *   A province's brand palette owns chrome only: nav underline, logo plate,
 *   hero accents, section dividers. It never appears on a status badge, a
 *   coupling card's band color, or a map layer that encodes risk level.
 *
 * This is the Lopburi 2.0 rule (flag blue/white, sunflower yellow, old-town
 * street-art hues, kept strictly separate from the flood/AQI/coupling
 * status ramp), generalized. Every province gets its own `cool`/`sun`/
 * `streetAccents` from its own flag, crop calendar, and craft traditions —
 * the mechanism and the separation rule don't change.
 */

import type { BrandPalette } from "../core/src/city-config.ts";

export interface ResolvedPalette {
  light: { cool: string; sun: string; sunDim: string; street: string[] };
  dark: { cool: string; sun: string; sunDim: string; street: string[] };
}

/**
 * Darkens/lightens a hex color by a percentage — used to derive a light-mode
 * "dim" variant of the seasonal accent so it never collides with the
 * amber/orange status colors at full saturation.
 */
function shade(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const r = Math.max(0, Math.min(255, (num >> 16) + amt));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
  const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/** Builds light/dark variants of a province's brand palette. Does not touch, define, or reference the status ramp — that lives in the consuming app's globals.css, untouched by this function. */
export function resolveBrandPalette(brand: BrandPalette): ResolvedPalette {
  const street = (brand.streetAccents ?? []).slice(0, 4);
  return {
    light: {
      cool: brand.cool,
      sun: shade(brand.sun, -20), // darkened for AA contrast on a light background
      sunDim: shade(brand.sun, -35),
      street,
    },
    dark: {
      cool: shade(brand.cool, 35),
      sun: shade(brand.sun, 45),
      sunDim: shade(brand.sun, 25),
      street: street.map((c) => shade(c, 30)),
    },
  };
}

/** Emits the CSS custom-property block for a city's globals.css. Names are deliberately distinct from any status token (--bull/--bear/--band-*) so a search for "reused status color" always turns up empty. */
export function toCssVariables(resolved: ResolvedPalette, mode: "light" | "dark"): string {
  const p = resolved[mode];
  const streetVars = p.street.map((c, i) => `  --street-${i + 1}: ${c};`).join("\n");
  return `:root {\n  --cool: ${p.cool};\n  --sun: ${p.sun};\n  --sun-dim: ${p.sunDim};\n${streetVars}\n}`;
}
