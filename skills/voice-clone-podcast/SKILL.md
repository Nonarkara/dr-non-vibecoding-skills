---
name: voice-clone-podcast
description: An entirely-local, zero-shot voice-cloned podcast pipeline (f5-tts-mlx on Apple Silicon) — script generation per-segment to avoid voice drift, and the two non-obvious quality gates that catch what duration checks can't. Use when building any local TTS pipeline, when a cloned voice drops words or babbles at chunk boundaries, or when scripting long-form audio with a local LLM.
license: MIT
---

# Voice-Clone Podcast Pipeline

Two shows, one shared engine, entirely local — no cloud TTS key, no cloud LLM key, by explicit design constraint. The interesting part isn't "call a TTS API"; it's the four failure modes that only show up at real chunk lengths and only get caught by checking the right thing.

## The pipeline

```
Source material → topic/segment selection → per-segment LLM script → chunking
    → f5-tts-mlx voice clone → quality-gated take selection → mastering → R2 publish
```

**Source → script.** Two shows, two source shapes: a news brief scores RSS+HN items by keyword weighting and fills a fixed segment plan (never "cover N stories" — that overshoots); a personal-essay show selects quotable passages from a corpus via LLM with a deterministic arithmetic fallback if the model's answer is unusable. Both call a local Ollama model (M5 first, M3 fallback — see `local-ai-fabric`), **one segment/beat per LLM call, never a whole episode in one call** — a local model holds the voice for the first topic and loses it by the third on long generations. Style/voice rules are enforced as explicit prompt constraints plus post-hoc gates (fabrication checks, dedupe, sentence-length limits) that reject and retry a bad segment before it ever reaches TTS.

**Voice cloning — f5-tts-mlx.** Zero-shot: a ~20s reference clip (`reference.wav`, mono 24kHz) + its exact transcript (`reference.txt`) is enough, no fine-tuning. Record the reference **flat and unemotional on purpose** — the model copies the reference clip's emotional contour, not just its timbre, so an expressive reference produces an oddly emphatic clone.

```bash
uv run --with f5-tts-mlx --with mlx==0.31.2 --with soundfile --with numpy --with mlx-whisper \
  python speak.py script.txt out.wav voice/reference.wav voice/reference.txt
```
`mlx` pinned to `0.31.2` — `f5-tts-mlx` has no upper bound and newer `mlx` builds have broken its sampler before. Pin it explicitly in whatever locks your dependencies.

**Chunking and pacing.** The model's own duration estimate is unreliable, so derive pacing from the reference clip itself: `per_char = ref_seconds / len(ref_text)`, then `expected_duration = len(chunk) * per_char * PACE`. Script splits on sentence/paragraph boundaries into small chunks (a few hundred characters), sized so reference+generation stays under the model's fixed frame budget — chunks near that cap are exactly where the failures below happen.

## The two lessons a duration check will not catch

**1. Long chunks silently drop phrases, not silence — a duration/vocabulary check passes them anyway.** A ~55-word sentence near the chunk-size cap had a 9-word phrase vanish mid-sentence — deterministically, reproduced on a plain re-render with the same script. The audio stayed inside its duration budget with diverse vocabulary, so existing runaway/vocab-collapse gates passed it clean; only a Whisper transcript catch it. Cause: near-cap chunks crowd the model's fixed frame budget (shared between the reference clip and the generation), and under that pressure the model reads incompletely rather than overrunning. Fix, two layers: **editorially**, split any sentence over ~30 words before rendering. **Mechanically**, transcribe the take (Whisper) and compare against the chunk's own text with a sequence-matcher coverage score; below a threshold (~0.72, set above the cloned voice's own transcription noise floor), re-roll at the *same* duration — clamping shorter makes truncation worse — and keep the better of the two takes.

**2. A babble ceiling calibrated to a generic "plausible speech rate" is roughly 2x too loose for a specific cloned voice.** Bursts of confident invented syllables ("praktidante hansel velsenhoen") sat after the real sentence ended, in the cloned voice, sounding fluent enough that a coverage check (lesson 1) missed it — this failure *adds* words instead of dropping them, so text-coverage stays high while the audio is wrong. The ceiling was `words / generic_floor_wpm`; measured against the *actual* reference clip's rate, that ceiling was 2.03× the real expected duration at every chunk length — the model could spend nearly half its output inventing sound and still pass by construction. **The general lesson: a validation threshold must be calibrated against the same measured quantity the system is driven by (this voice's actual rate from the reference clip), never against a generic human-plausibility constant.** Fix: derive the ceiling from the same `per_char` rate used to size the generation window, then trim trailing babble by finding the last real silence-gap (20ms-frame RMS) before the chunk's own expected end — cutting the invented tail without clipping a real word.

**Compounding rule, both lessons:** score every take, keep the best of up to 3 re-rolls, never fall back to silence — the audio is usually mostly right, so re-rolling beats muting.

**A third, related failure** (mentioned for completeness): per-chunk output-gain drift causes audible volume jumps between paragraphs — "phantom shouting." Fixed by RMS level-matching each chunk against the reference clip before concatenation.

## Publish

Mastering: `ffmpeg -af dynaudnorm,loudnorm=I=-16:TP=-1.5:LRA=9` → mp3. Upload via `wrangler r2 object put <bucket>/<key> --file <local> --remote`; served behind a normal HTTPS route with an RSS feed alongside the audio. `--script-only` and `--no-publish` flags let you test the writing and the voice independently before spending render time on both together.

## The one-line version

Clone from a flat, unemotional reference clip; write one segment per LLM call; and calibrate every quality gate — duration ceiling, babble ceiling, coverage floor — against that specific reference clip's own measured rate, never a generic constant. Two independent gates (coverage-for-omission, ceiling-for-invention) are both needed; each misses what the other catches.
