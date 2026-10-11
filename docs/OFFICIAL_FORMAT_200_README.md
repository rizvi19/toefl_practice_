# TOEFL Practice Studio — Complete the Words (200 exercises, 2026)

This is **independently written, unofficial practice content** based on the task description in *The Official Guide to the TOEFL iBT Test, Pocket Edition*, pages 51–53. No ETS exercise text is reproduced, and ETS has not evaluated or endorsed these exercises.

## Inventory

- Exactly **200 activities**, each with an independent passage of **70–100 words** and **ten missing-word endings** (2,000 graded completions).
- Original full-form activities retain IDs **words-01**, **words-02**, and **words-03**, original positions, and their updated text. The other 57 activity screens are unchanged.
- Extra collection retains the prior 100 IDs **ctw26-ext-001** through **ctw26-ext-100** and adds **ctw26-ext-101** through **ctw26-ext-197**.
- 50 academic topics across science, social science, history, technology, society, and the environment. Multiple distinct drills approach each topic through different selected evidence and details.
- The intact opening sentence establishes context. Starting just afterward, missing endings are assigned in an alternating-word sequence, with occasional adjustments to preserve a mix of content and function words.
- Each edited word shows its visible first half, with a fixed count of letter slots for the deleted second half. Function words can have one-letter endings.
- Explanations identify the completed word, surrounding sentence, meaning/grammar clue, and exact missing ending.

## Practice UX and saved work

These passages use the existing fixed-size, keyboard-accessible slot editor, correct-answer feedback, per-activity timers, progress reports and browser persistence. The site continues to use localStorage key `toefl-studio-v1`. Previously saved sessions or reports are not rewritten, so historical reviews can still show the passage version used at the time. Existing audio tracks, speaking recordings and text-to-speech behavior are retained.

**Original full form remains separate:** 60 screens / 120 questions; it launches from its dedicated button and does not include the 197 additional standalone exercises. The built-in shared library has **257 activity screens** in total (the 60 full-form screens plus 197 added activities). **200** of those screens are Complete the Words tasks.

## Files to upload to GitHub Pages

GitHub Pages remains **Deploy from a branch → main → / (root)** at https://rizvi19.github.io/toefl_practice_/. Extract the Pages ZIP, then upload its **contents** to the repository root:

- `index.html`
- `assets/`
- `collections/` (both the topic data and the 200-exercise generator)
- `audio/`
- `docs/`
- `LICENSE.txt`, `PUBLISHING.txt`, `THIRD_PARTY_NOTICES.md`

No npm installation or local build is needed to publish. The existing frontend is a minified production build and its original React source was not supplied in the repository. The editable-project ZIP contains editable collection scripts and tests, but it **cannot truthfully be described as the original React source project**.

## Quality assurance

The GitHub Actions pipeline runs `tools/validate-collection.mjs`, checks ZIP integrity, extracts both archives, rechecks the extracted copy and uses Playwright to test the site under the exact `/toefl_practice_/` repository subpath. The browser check covers visibility of all 200 activities, letter-slot counts, answer entry, full-credit grading, reload/resume persistence, preservation of the 60-screen original form, audio and documentation paths.

## Note about realism

The official Reading section is **multistage adaptive**, but this standalone practice collection is **not** a scored adaptive TOEFL replica. It targets the specifically described Complete the Words exercise mechanics; it does not predict official TOEFL scores.
