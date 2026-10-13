# Reading upgrade verification — 13 October 2026

All checks below passed locally on Windows with Node 23.5 and Edge, under the exact `/toefl_practice_/` repository subpath. Chromium runs in the updated GitHub Actions workflow; hosted CI results must be read separately.

- Bank build and validation: 222 distinct Reading activities / 1,400 scored items; generated library and exam banks agree. Every key, evidence quotation, length, option set and deletion is checked. Audit: 49 exact duplicate copies and 1,375 similar passage pairs in the baseline, zero in the active replacement under the documented threshold.
- 12 unit tests pass, including 600 seeded forms across six presets, all answer keys, 20 option-shuffle seeds per MCQ activity, invalid schema rejection, pool exhaustion, routing, custom timing, partial scores and mixed task/skill feedback.
- Reading browser test: five screenshot layouts plus adaptive and custom forms, editorial levels, viewed-only exposure history, repeat avoidance, reload and shared library history. Desktop/mobile setup and active-test screenshots inspected; no horizontal overflow.
- Complete section journeys: Reading 50/50 and Listening 47/47. Back, Review, flags, locked modules, persisted answers, fixed/automatic routes, module expiry, result download, mistake filter and feedback verified. No JavaScript errors or unexpected failed asset requests.
- Native recorded audio: 4.053-second WAV played through actual playing/ended events without TTS. Choices stay hidden until completion; interrupted reload recovery and recording-failure fallback pass.
- Preserved library checks: all 800 Listening activities / 1,800 keys, two-voice conversation narration, 32 + 15-question rehearsal, one-play audio, grading and storage pass. Reading cloze 10/10, daily 2/2, academic 5/5, random selection, insertion markers, full Reading practice and original 60-screen full form pass.
- Custom library timer: 2.5-minute duration, stop on submission, reset on next activity, invalid-input rejection, rehearsal, untimed mode and default timing all pass.
- Extracted Pages archive passes the same section, Reading/library, Listening/audio and timer browser checks, plus bank validators. ZIP integrity and required runtime files are verified. Repeated builds reproduce the generated banks exactly.
- All 44 Listening/audio source files, the Listening bank fingerprint and original non-Reading full-form data match the baseline. Uploaded publisher files and screenshots are outside the repository and unchanged.

Commands: `npm run build:bank`, `npm run audit:reading`, `npm run validate`, `node tools/validate-listening.mjs`, `npm run test:sections`, `npm run test:browser`, `npm run smoke`, `node tools/smoke-listening-playwright.mjs`, `node tools/smoke-timers-playwright.mjs`. Browser speech is mocked for fast full-form tests; recorded audio uses native playback separately. Test success verifies implemented behavior, not psychometric scoring or voice quality on every device.

Current release details: [Reading v2](docs/READING_V2_RELEASE.md). Historical verification below describes earlier versions, not the active Reading bank.

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
