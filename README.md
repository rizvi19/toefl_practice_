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
