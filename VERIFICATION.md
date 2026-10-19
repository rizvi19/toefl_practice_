# Advanced Writing expansion verification — 19 October 2026

[Expansion details](docs/WRITING_ADVANCED_2026.md) and [content audit](docs/WRITING_ADVANCED_AUDIT.json).

- 500 new original questions, 50 families, 200 medium/300 hard; 620 unique keys including originals. Each new item has 3–7 slots and item-specific analysis plus a rule/trap explanation. No exact or lexical near-duplicate answer pairs above the documented 0.70 Jaccard threshold. Keys and explanations also received an internal contextual/grammar review; checks do not establish external calibration.
- 12 Writing unit tests pass, including the prior engine checks plus every new key, lowercase bank display for all 620 items, placement-dependent casing, wrong/incomplete/distractor grading, all 500 drawn without repeats before stopping, filters, storage and active-block reservations.
- Full Writing and focused-practice browser journeys pass locally under the Pages subpath. Focused checks cover wrong and correct feedback, hidden explanations, keyboard access, saved current questions, skips, pool/whole-bank exhaustion, downloads, shared timed history, reservations and 390px layouts. Desktop and mobile screenshots were visually inspected.
- Both written prompt banks contain 24 complete original tasks. Existing timers, separate copy packets, saved responses, original test selection and older histories are preserved.
- Existing Reading/Listening unit tests (23), Mountain checks (3), bank validators and library checks are retained. Reading/Listening question banks, audio and Mountain sources were not changed.

Commands: `npm run test:writing`, `npm run audit:writing`, `npm run test:writing:browser`, `npm run test:sections`, `npm run test:mountain`, `npm run validate`, `node tools/validate-listening.mjs`, `npm run test:browser`, `npm run smoke`, `node tools/smoke-timers-playwright.mjs`.

---

# Writing section verification — 18 October 2026

[Writing release details](docs/WRITING_2026.md). 12 complete original forms: 120 sentence items, 12 Email prompts and 12 professor/two-student discussions. Local checks use Windows, Node 23.5 and Edge at the GitHub Pages subpath.

- Seven Writing unit tests pass, including all 120 keys, incorrect/incomplete orders and distractors, tile placement limits, independent clocks, expiry protection, frozen session content, individual modes, fresh form rotation, word count and separate feedback packets.
- The Writing browser journey passes: 10/10 full form, tile removal, Back/Next, flags, Review, keyboard entry, separate 5/7/10 timers, custom six-minute timer, saved drafts and unchanged deadlines after refresh, all three expiries, locked submitted responses, complete task-specific copy packets, selected-text clipboard fallback, JSON download, individual-task modes, fresh selection and literal response escaping.
- Desktop (1440px) and mobile (390px) layouts were inspected; overflow checks pass. Copying leaves the active clock running. Timing is visible while scrolling long Writing prompts.
- Existing Reading/Listening unit checks (23), Mountain checks (3), collection validators, section browser journeys and legacy library/timer smoke tests pass. Reading and Listening banks, core engines, recordings, legacy library bundle and Mountain sources are unchanged.
- Both Pages and editable archives pass integrity and required-file checks. Packaging includes Writing and the existing Mountain route. Writing checks run against source and extracted Pages files in the existing Actions workflow.

Writing feedback is requested by copying a packet; no automatic Email or Discussion grade or official section-score prediction is claimed. The supplied PDFs and synced project sources remain unchanged. The prior conversation could not be retrieved; only available reference materials and the visible transcript were used. Hosted deployment and CI status are verified separately from local checks.

Commands: `npm run test:writing`, `npm run test:writing:browser`, `npm run test:sections`, `npm run test:mountain`, `npm run validate`, `node tools/validate-listening.mjs`, `npm run test:browser`, `npm run smoke`, `node tools/smoke-timers-playwright.mjs`, `python tools/package-release.py ../writing-release`.

---

# Listening quality upgrade verification — 17 October 2026

Verified locally on Windows with Node 23.5 and installed Edge under `/toefl_practice_/`. Current release: [Listening v2](docs/LISTENING_V2_RELEASE.md). Reading's previously published question bank is preserved.

- **23 unit tests pass**: all 450 Listening keys, evidence and option rationales; exact/near duplicate rejection; 600 seeded Listening forms across three presets; strict levels; option/key/rationale shuffling; unheard-first selection and pool exhaustion; custom module timing and score denominators; mixed task/skill feedback; audio/answer completion gating; and Reading's 1,400 keys/selection/routing. Shortest/longest correct-choice dominance is checked per Listening task pool. All 1,800 individual choices are distinct. A cross-section script/passages comparison found no Reading/Listening overlap at the documented 0.28 threshold.
- All 38 pre-existing WAVs and the historical pilot MP3 match baseline `e23943f` byte for byte. The frozen original full-form data and current Reading bank match that baseline.
- Source browser suites pass: complete Reading 50/50 and Listening 47/47; automatic/fixed routing, reload, module expiry, custom timing, locked earlier answers, no test replay/transcript, result download and feedback. No JavaScript errors or unexpected failed asset requests.
- New Listening browser checks pass for all presets, custom counts/time, strict levels, fully-heard-only exposure, repeat avoidance, shared library history, reload/replay and 390px/1440px layouts. Desktop/mobile setup and active-test screenshots were visually inspected; no horizontal overflow.
- Native original WAV playback: 4.053832 seconds, real playing/ended events, no TTS. Interrupted reload recovery and failed-recording speech retry pass; the user's Kokoro preference is retained.
- Native new MP3 playback at normal speed passes for all four types: l2-r016 (2.375s), l2-c005 (29.865s), l2-n005 (25.375s), l2-t005 (64s). Every selected track completes without TTS/error, exposes questions only after ended, blocks Next before an answer, records one exposure and prevents test replay.
- Optional helper/browser Kokoro choices and persisted preference pass. A mocked helper uses the actual requested ID/script hash and real WAV playback. Its 12-second preparation delay is excluded from an 11-second module budget; playback and answering consume time. No model download runs in tests.
- Library checks pass: four Listening task pools, all keys, shuffled grading, two-voice TTS, 32+15 rehearsal, one-play behavior and saved progress. Reading cloze 10/10, daily 2/2, academic 5/5, random/rehearsal, original 60-screen form and subpath assets pass. Custom timer 2.5 minutes, stop on submission, reset on next, invalid input, rehearsal, untimed and default behavior pass.
- Audio-source checks pass without loading a model: all long-talk chunks retain every word in order; all 46 new conversations preserve every turn and use both assigned voices. The portable helper ZIP matches the current helper and 200-script catalog, contains no models/installers and passes ZIP integrity.

Final inventory: all 200 recordings passed full FFmpeg decoding and non-silence checks; all 173 new MP3s have matched script hashes and protected bundled entries. The strict validator verifies every recording against the audio audit. Both release ZIPs pass CRC checks and extraction. Extracted Pages bank validators and complete Reading 50/50 / Listening 47/47 browser journeys pass. Repeated builds reproduce all five bank/adapter files exactly. The complete browser suites also run against extracted Pages files in CI. Browser speech is mocked only for fast full-form navigation; native WAV/MP3 playback is tested separately. Test success verifies implemented behavior, not external item calibration or voice quality on every device.

Commands: `npm run build:bank`, `npm run audit:reading`, `npm run audit:listening`, `npm run validate`, `node tools/validate-listening.mjs`, `npm run test:sections`, `python tests/listening-audio-source.py`, `python tools/package-kokoro-helper.py --check`, `npm run test:browser`, `npm run smoke`, `node tools/smoke-listening-playwright.mjs`, `node tools/smoke-timers-playwright.mjs`.

---

## Previous Reading release verification

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
