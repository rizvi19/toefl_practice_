# TOEFL Practice Studio — Reading quality upgrade (2026)

Live: https://rizvi19.github.io/toefl_practice_/

Reading now has **222 distinct activities / 1,400 scored items**: 100 Complete the Words, 30 Daily Life Short, 30 Daily Life Long, 30 Text Chain and 32 Academic Passage activities. It offers history-aware selection, shuffled choices, mixed/intermediate/advanced pools, six presets, editable module structures and task/skill feedback. The default is 35 + 15 items in 21 + 9 minutes. Listening's 800 activities, audio, Writing and Speaking are preserved.

See [Reading release details](docs/READING_V2_RELEASE.md), [before/after audit](docs/READING_QUALITY_AUDIT.json) and [format/scoring page](docs/SECTION_TESTS_2026.html). The four uploaded PDFs and five-layout screenshot informed structure; none of their publisher content is included.

## Build and verify

```sh
npm ci
npm run build:bank
npm run audit:reading
npm run validate
node tools/validate-listening.mjs
npm run test:sections
node tools/serve-subpath.mjs
# In another terminal while the preview server runs:
npm run test:browser
npm run smoke
node tools/smoke-listening-playwright.mjs
node tools/smoke-timers-playwright.mjs
```

Content sources are in `reading/`. Commit all generated bank files together. The audit needs the baseline commit in Git history. Windows browser tests use Edge; CI installs Chromium. `python tools/package-release.py ../reading-release` creates verified Pages and editable source archives outside the repository.

GitHub Pages serves main / root without a server build. Include `reading/` with the other runtime folders. Actions validates pull requests and generates archives as workflow artifacts; historical files in `downloads/` are not this release. The original compiled practice library remains at `library.html` with a tested Reading adapter. Its 60-activity full form keeps its non-Reading slots and replaces only Reading material; overall active library size is 1,045 activities.

## Practice limits

**Local estimated practice score** uses `round-to-half(1 + 5 × accuracy)`. Its display follows ETS's 2026 1–6 reporting scale, but the formula and 70% routing threshold are uncalibrated local choices. These are not validated TOEFL predictions, equivalent difficulty forms or CEFR results. Incomplete/ended-early new Reading attempts have no score estimate. Editorial pool levels and automatic mechanical checks do not substitute for external item calibration or expert review.

Reading exposure history persists in the same browser and is shared by random library and section practice. Unseen eligible items are preferred; exhausted pools rotate least-used, oldest items. Only viewed material is counted. Clearing storage resets the ledger, and concurrent tabs are not coordinated. Old saved attempts keep their frozen content.

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
