# Listening quality release — 17 October 2026

## Audit and editorial decisions

The baseline is `e23943f`. All 800 Listening activities / 1,800 questions, their script families, options, keys, explanations, selection, audio and scoring paths were inspected. There were no exact spoken-script duplicates, but 294 similar script pairs, 1,155 repeated question copies, one option set reused 147 times, 47 prompts whose correct venue was unstated, and 49 explanations citing a phrase absent from the script. See [before/after audit](LISTENING_QUALITY_AUDIT.json).

The replacement has **200 distinct activities / 450 questions**: 50 Choose a Response (one question), 50 Conversations (two), 50 Announcements (two) and 50 Academic Talks (four). The 27 distinct original recorded scripts were retained with completely revised questions/reviews. The 773 templated generated activities were retired from active pools and replaced by 173 original activities. Historical files/attempts remain accessible; retired collection scripts are no longer loaded. Size describes independent stimuli rather than lightly varied template copies.

Scripts vary situation, communicative purpose, discipline and organization. Prompts test requests, suggestions, objections, indirect answers and implied intentions. Conversations/announcements require details, implications or likely next actions from their own recording. Talks cover natural/social sciences, arts, humanities and research methods. Distractors use unsupported extensions, reversed relationships, misplaced examples or mistaken mechanisms from the same subject. Each question has one key, exact script evidence and a rationale for all four choices. Main Idea, Factual, Inference, Purpose, Method and Attitude are represented. Generic directions may repeat; complete question/option combinations do not.

Comparisons normalize speaker labels and punctuation. Scripts of at least 30 words are flagged at five-word-shingle Jaccard similarity ≥0.28. Exact question signatures include stem and unordered options. Current results: zero exact/near script duplicates, zero repeated question copies, no repeated complete option set and no repeated individual choice text across all 1,800 choices. These checks supplement editorial review; they do not certify psychometric equivalence or eliminate every possible subjective similarity.

## Format and references

The four uploaded PDFs were read as private references. Relevant ETS Pocket Edition pages were rendered and visually inspected. Complete the Words concerns Reading and supplies no Listening content. The Pocket guide informed one-play, forward-only navigation, four tasks, 1/2/2/4 question grouping and concise scripts. Its sample timing and commercial-preparation routing examples are not operational ETS guarantees. No publisher transcripts, questions, answers, screenshots or audio were republished.

Primary ETS sources checked on 17 October 2026:

- [Current Listening tasks](https://www.ets.org/toefl/test-takers/ibt/about/content/listening.html): all four descriptions. The introduction says “two” despite listing four; the specification confirms four.
- [2026 specification](https://www.ets.org/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf): base 47 items including unscored items; router 18 minutes and second module 7/11 minutes. Whole-section ranges: 15–19 response questions, 10 conversation questions, 6–10 announcement questions and 8–16 talk questions.
- [Current content/timing](https://www.ets.org/toefl/test-takers/ibt/about/content.html).
- [Official score reporting](https://www.ets.org/toefl/test-takers/ibt/scores/understand-scores.html): 1–6 in half bands; no raw-percent conversion for this bank.

Default local router: 10 prompts + 3 conversations + 4 announcements + 2 talks = 32 questions. Upper module: 5 prompts + 2 conversations + 1 announcement + 1 talk = 15. Lower: 9 prompts + 2 conversations + 1 announcement = 15. Both routes meet the blueprint ranges. All local questions receive one point; the site does not invent operational unscored items.

## Selection, modules and feedback

Presets: mixed adaptive practice, advanced fixed upper and intermediate fixed lower. Every task has 25 activities per editorial level. Configure activity counts for router/upper/lower (0–20 per task; 5–60 questions per module), strict level/route and section/Module 1 durations. Insufficient eligible material produces an error instead of silently relaxing level. Custom structures are practice layouts and need not match official totals. Editorial levels are not calibrated proficiency bands.

Seeded forms shuffle options with their keys/rationales. Stimuli/families never repeat within a form, including the unused branch. The shared browser-local ledger prefers eligible unheard material, then least-used/oldest after exhaustion. Only full successful playback enters history, once per session. Selection, preparation, sound checks, interrupted/failed plays, hidden branches and review replay do not consume material. The ledger persists separately from the latest 20 reports. Clearing storage resets it; devices and concurrent tabs are not coordinated. A finite bank cannot avoid repeats forever.

Section transcripts/choices are hidden until audio completion. Questions appear individually; answering unlocks Next and earlier responses lock. The clock runs during playback, Help and transitions; initial Kokoro preparation is excluded, preserving existing behavior. Reload during playback offers a flagged recovery. Failed recordings offer identified speech retry for that item while retaining Kokoro preferences. Study mode keeps replay/transcripts.

Reports reconcile task/skill correct totals, missed priorities, unanswered counts and configured denominators. Local estimate: `round-to-half(1 + 5 × correct/total)`, bounded 1–6. At least 70% selects the upper adaptive practice route. Neither rule is ETS-calibrated. Ended-early attempts and attempts without Module 2 have no estimate. A perfect result does not imply an official 6.0; different editorial levels are not equated forms.

## Recorded audio

All active activities have script-matched audio: 27 existing recordings plus 173 new Kokoro MP3s. The 38 original WAV files and historical pilot MP3 are preserved. New conversations alternate `af_heart` and `am_michael`; talks alternate these American English synthetic voices. This does not reproduce the full ETS accent range or human delivery. Current recordings play directly without a model download/helper; optional browser/local Kokoro and browser speech remain available.

The manifest records script SHA-256, duration, size, voices and provenance. New files are mono 24 kHz MP3 at 48 kbps. Generation reuses the existing CPU installation, normalizes finite non-silent audio and decodes each output with FFmpeg. Serial bounded batches release model memory and resume from valid entries. Bundled release clips are protected from helper cache eviction. No model, environment or system setting was changed. Uploaded references are absent from source/runtime archives.

To prepare future script revisions with an existing Kokoro environment (no installation is attempted):

```sh
python tools/generate-listening-recordings.py --kokoro-home /path/to/existing/kokoro --ffmpeg /path/to/existing/ffmpeg
node tools/seal-listening-audio.mjs
python tools/audit-listening-audio.py --ffmpeg /path/to/existing/ffmpeg
python tools/package-kokoro-helper.py
node tools/validate-listening.mjs
```

Run the generator with that environment's Python. It skips script-matched files, processes bounded serial batches and resumes after interruption. Rebuild the banks before recording changed scripts. Commit MP3s, the manifest, full audio audit and helper ZIP together. Normal site use requires none of these authoring steps.

## Preservation and verification

Reading's 222 activities / 1,400 items are fingerprinted against the release baseline. Frozen original full-form data, Writing/Speaking slots, storage keys and original recordings remain. The compiled library uses a small Listening adapter because editable original React source is unavailable. Its 47-question rehearsal shares the bank/selection and retains linear practice behavior. Saved attempts are not retroactively rewritten.

See [README commands](../README.md) and [actual verification results](../VERIFICATION.md). Unit checks cover every key/rationale, malformed evidence, duplicate rejection, 600 seeded forms, strict levels, shuffling, pool exhaustion, custom timing/routing, scoring, completion gating and Reading preservation. Browser checks cover all task types, complete 47-question scoring, shared fully-heard history, settings, reload, mobile layout, helper preferences/fallback, timer exclusion, native WAV and all four MP3 task types. Source and extracted Pages files are tested under `/toefl_practice_/`. CI rebuilds, checks generated-file drift, validates, tests and packages archives. Automated success verifies implemented behavior, not external calibration or speech quality on every device.
