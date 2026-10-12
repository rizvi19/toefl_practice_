# Section tests verification — 12 October 2026

- 100 generated forms for each section satisfy 35 + 15 Reading / 32 + 15 Listening totals, with no repeated activity IDs and distinct upper/lower task composition. Listening totals match the published blueprint task ranges.
- Complete browser journeys: Reading 50/50 and Listening 47/47; estimated score 6.0. Reading Back, Review and flags preserve answers. Listening blocks choices until audio completes and locks earlier questions.
- Customized Reading duration, saved absolute deadlines, module expiry, lower route, extended time away, incomplete attempts, answer review, transcripts, mistake filter and JSON download verified.
- Real WAV playback (4.05 seconds) verified through native `playing` and `ended` events, without TTS. Recording failures keep choices locked and offer a speech retry. Reload recovery is reported as nonstandard practice.
- Desktop 1440px and mobile 390px screenshots reviewed; no horizontal overflow, runtime errors or unintended failed asset requests.
- Existing Reading, Listening and custom-timer library browser checks pass at `library.html`; historical storage key and all 1,400 Reading/Listening activity IDs retained.
- Bank validation: 200 activities for every task type; 600 Reading + 800 Listening. Generated bank is rebuilt and checked for drift in CI.
- No protected uploaded questions, audio, answer keys or screenshots published. Sources under the synced project remain unchanged.

Verification scripts: `tests/section-core.test.mjs`, `tests/section-browser.mjs`, `tests/section-audio.mjs`, `tools/validate-collection.mjs`, `tools/validate-listening.mjs` and legacy library smoke checks. Browser speech is mocked only for the fast full-form interaction tests; recorded audio is tested with native playback separately. Voice quality across every browser/OS is not validated.

---

## Earlier library verification

# Release verification — 11 October 2026

Verified locally on Windows using Node 24.19.0 and an isolated headless Microsoft Edge browser.

## Completed application checks

- **19 unit/component tests passed.** Original bank validation, all 12 task types and 50/47/12/11 item counts; all objective answer keys; fixed slot count, letter replacement, bounded paste, cross-word arrows/Backspace, suffix handling; malformed imports and corrupt local storage; deadlines and paused timing; writing budgets; storage failure reporting.
- **12 browser tests passed against the production build.** Fixed slots and correct grading; reload recovery; validated import and duplicate rejection; sentence reconstruction; saved writing/self-review; bundled audio playback and persistent synthetic microphone recording; section expiry; all 60 screens/all 120 items in a complete form; mobile layout at 390×844; microphone-denied fallback; TTS script, voice and speed selection; local docs/media resources.
- **Full form answer-key run:** 107/107 objective inputs correct; all 60 activity screens submitted. The remaining 13 items are writing/speaking responses requiring self-review, not machine scoring.
- **Accessibility:** automated axe scans returned no violations on the dashboard, missing-word practice, library, bank, settings, writing, writing review, speaking and report screens. Visible keyboard focus, keyboard slot editing, dialog focus trapping/Escape and mobile navigation were exercised. Automated scans do not replace an actual screen-reader assessment.
- **Responsive visual inspection:** desktop dashboard and missing-letter screen; mobile dashboard and missing-letter screen; writing and speaking screenshots are included in docs/previews.
- **Production build succeeded.** Relative asset paths are used; fonts and 38 WAV tracks are bundled. Normal app load sends no external asset requests.
- **Dependency audit:** no known vulnerabilities reported in the locked dependencies at verification time, including development dependencies.

## Release packaging checks

The release packaging script excludes reference PDFs, the uploaded HTML, private browser data, node_modules and temporary test output. It creates both a source/project ZIP and a prebuilt Pages ZIP, validates every archive CRC and extracts each to a fresh directory.

The extracted prebuilt site is smoke-tested under `/toefl-practice/`, matching a GitHub Pages repository URL. The smoke test checks loading without console errors or external requests, permanent letter slots, saved answers after reload, guide URLs and audio files. The source ZIP is also extracted for a clean dependency installation, test run and rebuild. Actual results and SHA-256 values are recorded in the accompanying release-verification.json and zip-manifest.json beside the downloadable archives.

## Device-specific limits

Microphone tests use a browser-generated synthetic input rather than a person’s voice. Actual device permissions and sound quality should be checked on the intended phone/computer. TTS behavior is tested deterministically with a test voice; bundled narration was synthesized using installed voices and played in the browser. Available browser voices vary by device. There is no automatic pronunciation or language proficiency evaluation.

The app has one independently written linear form. It does not reproduce ETS adaptive routing, calibrated difficulty, official rater behavior, exact speaking playback transitions or official scoring. General standalone task timers are training targets. No 1–6 or 0–120 TOEFL score is predicted.
