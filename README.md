# TOEFL Practice Studio — Reading, Listening and Writing (2026)

Live: https://rizvi19.github.io/toefl_practice_/

**Sentence distractor revision (21 October 2026):** 123 of the new 500 sentence questions now have one plausible unused tile; 377 use all tiles. Together with the original 17, 140 questions have extras, each with a specific grammar rationale after grading. Complete correct sentences, saved attempts and practiced-history IDs are preserved. See [revision notes](docs/WRITING_ADVANCED_2026.md#extra-tile-revision--21-october-2026).

**Writing expansion (19 October 2026):** [Practice sentences only](https://rizvi19.github.io/toefl_practice_/sentence-practice.html) — **500 new questions**, 200 medium + 300 hard, across 50 grammar families; 620 including the original bank. Lowercase bank tiles with automatic sentence-initial casing. Topic/difficulty filters, immediate grammar explanations, persistent no-repeat history shared with new timed blocks, and explicit exhaustion. **Practiced sentences** lists all seen items with search, last-result filters and pagination; **Practice again** and **Try this sentence again** allow deliberate retries without resetting earlier progress. Email and Discussion now have **24 prompts each**. See [expansion notes](docs/WRITING_ADVANCED_2026.md) and [audit](docs/WRITING_ADVANCED_AUDIT.json). Run `npm run audit:writing`, `npm run test:writing`, and `npm run test:writing:browser`.

**Initial Writing release:** [writing.html](https://rizvi19.github.io/toefl_practice_/writing.html) — 12 original full tests, 120 exact-graded sentence items with explanations, 12 seven-minute Email scenarios and 12 ten-minute Academic Discussions. Separate copy-for-ChatGPT packets include the full task and response, timing, and structured 0–5 rubric-based feedback instructions. Full/individual modes, configurable clocks, saved composing, word counts, refresh recovery and locked-task review. Sentence practice defaults to the requested 5 minutes; select 6 for the guide’s approximately 23-minute full timing. No automated Email/Discussion grade or official Writing score conversion. [Writing release notes](docs/WRITING_2026.md).

Writing checks: `npm run test:writing`, then `npm run test:writing:browser` while the subpath preview server runs.

Listening now has **200 distinct activities / 450 questions**, 50 each of Choose a Response, Conversation, Announcement and Academic Talk. Repetitive generated material has been replaced with independently authored scripts, plausible distractors, exact evidence and a rationale for every option. All 200 activities have matched audio: 27 existing recordings and 173 new Kokoro MP3s. Conversations use two distinct voices. No model download or helper is needed to play these bundled recordings.

Reading remains **222 activities / 1,400 scored items**. Writing, Speaking, saved historical attempts and the 38 original WAVs are preserved. The active library contains 445 activities: 222 Reading, 200 Listening and 23 Writing/Speaking.

See [Listening release details](docs/LISTENING_V2_RELEASE.md), [Listening before/after audit](docs/LISTENING_QUALITY_AUDIT.json), [Reading release details](docs/READING_V2_RELEASE.md) and [format/scoring](docs/SECTION_TESTS_2026.html). The four uploaded PDFs informed task structure and question design; publisher content is not included.

## Build and verify

```sh
npm ci
npm run build:bank
npm run audit:reading
npm run audit:listening
npm run validate
node tools/validate-listening.mjs
npm run test:sections
node tools/serve-subpath.mjs
# Another terminal while the server runs:
npm run test:browser
npm run smoke
node tools/smoke-listening-playwright.mjs
node tools/smoke-timers-playwright.mjs
```

Content sources are in `reading/` and `listening/`. Commit both generated banks and their library adapters together with `exam/bank.json`. Audits use baseline commits retained in Git history. Windows tests use installed Edge; CI uses Chromium. Browser speech is mocked for full-form navigation tests; separate tests play real WAV/MP3 files to completion at normal speed.

`python tools/package-release.py ../quality-release` creates and extracts verified Pages/source archives outside the repository. GitHub Pages serves main / root with no build. Include `listening/` and `reading/` alongside `exam/`, `assets/`, `audio/`, `collections/` and `docs/`. Actions validates source and extracted Pages files and publishes ZIP workflow artifacts. Existing `downloads/` archives are historical versions.

## Practice settings and limits

Reading defaults to 35 + 15 items in 21 + 9 minutes. Listening defaults to 32 + 15 items, with 18 + 11 minutes on the upper route or 18 + 7 on the lower route. Listening offers mixed adaptive, advanced fixed-upper and intermediate fixed-lower presets, editable module activity counts, level and route controls, a custom section timer and custom Module 1 budget. Levels are relative editorial labels, not externally calibrated difficulty or CEFR bands.

Listening questions appear after audio completion, one at a time; answering unlocks Next. Each stimulus plays once in section tests; study mode retains replay/transcripts. Playback failure and interrupted reload have explicit recovery. Initial Kokoro preparation time is excluded from the countdown, while playback and answering consume time. All currently active items have prebuilt audio; optional browser/local Kokoro and browser English speech remain available.

Selection avoids repeated IDs/families within a form. Shared browser-local exposure ledgers prefer unheard Listening and unseen Reading in the eligible pool, then least-used/oldest material after exhaustion. Listening counts only a successfully completed playback, once per session; sound checks, failed/interrupted playback, hidden branches and review replays are excluded. Clearing storage resets exposure history; concurrent tabs and devices are not coordinated. Old saved attempts keep their frozen content.

**Local estimated practice score** = `round-to-half(1 + 5 × accuracy)`, bounded 1–6. ETS reports official 2026 scores on that scale, but this formula and the local 70% routing threshold are uncalibrated. Incomplete attempts without Module 2 and ended-early attempts have no estimate. Task/skill feedback uses actual configured denominators and counts unanswered questions as incorrect. This is not a validated TOEFL score prediction.

---

## Earlier library release documentation

# TOEFL Practice Studio — 2026 Reading & Listening

**Live website:** https://rizvi19.github.io/toefl_practice_/

## 1,400 Reading and Listening activities, 200 of every task type

| Section | Task | Complete activities | Questions per activity |
|---|---|---:|---:|
| Reading | Complete the Words | 200 | 10 |
| Reading | Read in Daily Life | 200 | 2–3 |
| Reading | Read an Academic Passage | 200 | 5 |
| Listening | Listen and Choose a Response | 200 | 1 |
| Listening | Listen to a Conversation | 200 | 2 |
| Listening | Listen to an Announcement | 200 | 2 |
| Listening | Listen to an Academic Talk | 200 | 4 |

All three Reading tasks and four Listening tasks have **random activity selectors**, plus optional ordered section practice flows. The Listening rehearsal uses a **32-question stage followed by a 15-question stage (47 questions)**, one-play audio and hidden transcripts. It is explicitly **non-adaptive** and not an ETS score predictor.

**Learning material and answer reviews:** All new Reading tasks follow the Chapter 2 skill categories; Listening follows the Chapter 3 task and six comprehension-question types. New question reviews identify the type, substantiate the answer, explain all three rejected options and supply a useful strategy.

### Custom practice timers

Open **Practice library**, keep **Timed** enabled, and enter any duration from **0.5 to 240 minutes** in **Custom timer (minutes)**. Leave it blank for recommended timing, or uncheck Timed for untimed practice. The choice is applied whenever you start an activity, random activity, circuit, full form or rehearsal. In study sessions the custom duration resets for each activity; in exam mode it applies to the section, with individual Writing blocks timed separately; the 47-question Listening rehearsal has one shared timer.

**Checking answers immediately stops the study countdown**, so it cannot expire while you review explanations. **Save & continue** starts a fresh countdown for the next study activity. Finishing a session removes its timer and saves the report. Existing practice history and saved question IDs remain intact.

### Sound and recordings

The 38 original WAV files remain available. Additional Listening exercises use **browser English voice narration**; conversations alternate two voices when the browser makes at least two English voices available. Browser TTS is not equivalent to professionally recorded speech. Choose a voice in Settings. The full Listening rehearsal hides transcripts and blocks replay; study mode offers transcripts and repetitions.

### Separate original full practice form

The original 60-screen form remains separate and unaltered in question identity. The combined browseable library contains **1,423 activity screens** (1,400 Reading+Listening plus 23 original Writing and Speaking activities). The existing `toefl-studio-v1` progress key and original question IDs remain usable.

### Guide references, constraints and verification

- [Listening 800 release guide](docs/LISTENING_800_RELEASE.md): audio differences, question families, example-informed practice strategy, 47-question session and content QA.
- [Reading 600 release guide](docs/READING_600_RELEASE.md): reading task design and limitations.
- [Downloads](downloads/): static GitHub Pages ZIP for exact root upload and separate editable question/project ZIP.
- [Automated checks](.github/workflows/package-extended-100.yml): content-length checks, bank counts, answer validation, browser test under `/toefl_practice_/`, ZIP extraction and re-testing.

For manual future publishing, unzip the prebuilt Pages archive and upload its **contents** to the repository's `main` branch **root**. Retain Pages: *Deploy from a branch → main → / (root)*. No local npm or build command is necessary.

These educational exercises are independently authored and unofficial. The bank is not ETS material, has no external item-writer review, no official speech recordings for newly added items, and no adaptive-scoring calibration. The editable project contains the original production frontend bundle and editable question generators/tests; the unminified original React source was not supplied in the initial repository.
