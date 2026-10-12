# TOEFL Practice Studio — 2026 section tests

Live: https://rizvi19.github.io/toefl_practice_/

The main page provides separate Reading and Listening section tests with customizable module timers, practice adaptive routing and estimated 1–6 section scores. Reading defaults to 25 minutes; Listening defaults to 29 on the upper route. The previous practice studio is preserved at `library.html`, including Writing, Speaking, imports, recordings, Kokoro controls and historical item IDs.

- Editable exam source: `exam/app.js`, `exam/core.js`, `exam/style.css`.
- Readable format/scoring documentation: `docs/SECTION_TESTS_2026.html`.
- Bank generation: `npm run build:bank` extracts the already published independently authored activities into `exam/bank.json`.
- Engine checks: `npm run test:sections`.
- Browser checks: run `node tools/serve-subpath.mjs`, then `npm run test:browser`. Tests use installed Edge on Windows and Playwright Chromium in CI.
- Existing library checks: `npm run validate`, `node tools/validate-listening.mjs` and the three `tools/smoke-*-playwright.mjs` scripts.

Deploy from main / root in GitHub Pages. No server or framework build is required. GitHub Actions validates both the exam and library and produces updated site/source download ZIPs.

## Simulation limits

The router uses a transparent 70% Module 1 threshold. Scores use `round-to-half(1 + 5 × accuracy)`. These are uncalibrated training choices, not ETS algorithms or validated TOEFL predictions. Module time continues through Help, confirmations, audio, reload and time away. Interrupted playback recovery is reported. Available recordings are real synthetic audio files; the rest use device English voices. Related question variants revisit topics.

No user-uploaded publisher passages, questions, transcripts, answer keys, screenshots or recordings are included in this update. The bank is the existing independently authored collection. See the format page for ETS sources and the reference materials inspected on 12 October 2026.

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
