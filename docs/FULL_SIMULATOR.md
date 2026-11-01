# Full-test simulator: setup, workflow and limits

Open [Full tests](../full-tests.html). Five **new original forms**, Tests 02–06, are provided in addition to the supplied Book Test 01. Each selected full route has 50 Reading, 47 Listening, 12 Writing and 11 Speaking items. Each original form stores 150 items across both possible routes; unused branch questions never appear in that attempt.

The original section tests, practice library, original Chapter 6 recordings and saved attempts remain available. The full simulator uses a separate database and does not delete their storage.

## For you and your friend

1. Use a current desktop Chrome or Edge browser. No Python installation, API key, account or helper service is required. Browser Whisper is open source, not the browser's remote speech-recognition service.
2. Open the same public site on each device. Each browser keeps its own models, prepared audio, attempts and recordings. There is no automatic synchronization.
3. Choose a test and name your attempt. Choose Full Test for strict behavior, or Practice for an individual section/task and optional untimed work. Speaking recording limits still apply in untimed practice.
4. Test the microphone for three seconds, play the clip, and confirm that you can hear yourself. Check the short sound as well. Use headphones to avoid recording the prompt through the microphone.
5. Choose **Whisper Small English** for the larger, more accurate English model, or **Whisper Base English** for a lighter option. Neither is claimed to be universally the best speech recognizer. Both run locally, using quantized WASM weights for broad compatibility.
6. Select **Generate & cache all test audio**. The first run downloads Kokoro model files. Both possible adaptive branches are generated before the exam, with a progress bar, elapsed time and a remaining-time estimate. On a slower CPU this can take tens of minutes; plan preparation separately from your exam sitting. Completed clips are reused on retry and future attempts.
7. Start each task/module after its directions. No speech synthesis is invoked while an exam is running. Every new-simulator prompt, including the simulator version of Book Test 01, must come from its prepared Kokoro cache. There is no browser-voice fallback.
8. At submission, Whisper transcribes all available Speaking clips, including Listen and Repeat. The processing page shows progress and time; completed transcripts survive a retry. It may need to download its model on first use. No candidate audio is uploaded to an inference server.
9. Review the full question-and-answer record. Preserve the raw machine transcript; an optional correction is stored separately. Download individual audio clips or a backup including all available recordings.
10. Select **Copy answers to score with ChatGPT**. Paste the packet into ChatGPT yourself. It contains the relevant texts/scripts, questions, choices, authored keys, deterministic marks, written responses, raw and corrected speech transcripts, timing/technical information and a 2026 task-rubric prompt. Attach the recordings when seeking delivery/pronunciation assessment.

The initial models and their runtime files are downloaded from Hugging Face/jsDelivr. Model sizes vary by revision and configuration; allow several hundred MB of storage in addition to generated audio. Browser cache persistence is requested but cannot be guaranteed. Do not clear site data during a test. A backup restores answers, transcripts and recordings, but prepared Kokoro audio is regenerated or reused on the destination device before an active attempt resumes. Its original deadlines are retained, so a long transfer/preparation can cause a timed task to expire.

This is not an offline-installable application. Internet access is needed to load the site and uncached model/runtime files. Once audio preparation completes, playback reads local blobs, not a generation service. A refresh may still need the website connection.

## Exam policy

Configuration is in `simulator/config.js`; state transitions and deadline logic are in `simulator/core.js`.

| Scope | Policy |
|---|---|
| Reading | Shared 19-minute router; fresh 9-minute second module; Back/Review only within the active module |
| Listening short response | 20 seconds starting with valid playback, excluding loading; no timeout advance before a valid prompt ends |
| Conversation / announcement | Shared stimulus plays once; each question then gets 20 seconds |
| Academic talk | Shared stimulus plays once; each question then gets 30 seconds |
| Writing | Independent 6-minute sentence, 7-minute email and 10-minute discussion tasks |
| Repeat | 7 recordings: 8, 8, 10, 10, 10, 12, 12 seconds, starting after prompt and beep |
| Interview | 4 recordings of 45 seconds; no preparation period or manual skipping |

The 19-minute Reading router and exact Listening answer limits are **the requested practice profile**, not claims about universal ETS limits. Published blueprint module estimates are approximately Reading 18–21 + 9 minutes and Listening 18 + 7/11 minutes. No contradictory overall Listening module clock is imposed on the per-question profile. Directions and technical model preparation are untimed. Help and Hide Time do not pause active clocks.

New Reading/Listening second modules are selected by a transparent local 70% router-accuracy heuristic. Lower/higher labels are editorial judgments, not calibrated ETS difficulty measures. The route is hidden during the test. The supplied book form stays linear, as its directions specify. All original practice items count toward practice raw performance; the new forms do not pretend to contain ETS calibration/pretest items.

Deadlines are absolute and persist. Reading navigation does not reset a module. Listening answers lock on Next/timeout, and shared stimuli do not replay between their questions. Interrupted playback has an explicit recovery state and an attempt-log entry. It never silently switches voice or counts a failed download as a completed prompt. An interrupted speaking response is marked as such; it is not silently claimed to be complete. Save failures stop automatic progression until resolved. A user closing the tab during an unfinished clip may lose that unfinished clip; already finalized clips are retained. The full-test toolbar does not expose an advance/skip button during Speaking.

## Scoring and the supplied book

Original Reading and Listening have authored keys and explanations. Their deterministic raw totals and sentence-building binary marks are computed locally. No fabricated ETS raw-to-band conversion is applied. Email, Academic Discussion and Speaking need assessment.

The supplied PDF now verifies Book Test 01 keys, sentence arrangements and spoken prompt scripts. Its unscored flags are retained: Reading has 35 scored items of 50 presented; Listening has 35 of 47. The old `exhi` OCR fragment was corrected to `exh`; old entered suffixes are migrated once to preserve the same completed word. Old recordings and storage keys are retained. Book-specific conversion tables are reference information for that book form only, not conversions for the original forms.

The evaluation packet paraphrases the 2026 task criteria: Email and Discussion 0–5, Repeat 0–5 per response, Interview 0–5 per response, and binary sentence marks. It explicitly separates objective marks, qualitative feedback, uncalibrated practice estimates and official ETS scores.

**Text is insufficient for full Speaking scoring.** Whisper can normalize numbers, omit repetitions, change punctuation or mishear words. A transcript cannot establish pronunciation, rhythm, pauses, pace or intelligibility. The prompt instructs ChatGPT to mark these dimensions not assessable without recordings, rather than inventing them or treating an ASR error as a candidate error. Any section bands entered after assessment are practice estimates; the overall is their average rounded to the nearest half band. No automatic claim of an official 0–120 result is made.

Primary references reviewed: the user-supplied 2026 Pocket Edition, Chapter 1 pp.13–35; task scoring guides in Chapters 4–5; and the supplied Chapter 6 key/script pages. Public references: [ETS 2026 overview and task guides](https://www.ets.org/pdfs/toefl/toefl-ibt-test-at-a-glance.pdf), [ETS score interpretation](https://www.ets.org/toefl/test-takers/ibt/scores/understand-scores.html), [browser Whisper documentation](https://huggingface.co/docs/transformers.js/guides/webgpu), [Whisper Small English ONNX model](https://huggingface.co/onnx-community/whisper-small.en).

## Content and verification

Original source is under `simulator/content/`. `node tools/build-full-forms.mjs` creates Tests 02–06. The supplied book is a separately identified reference form and is not reused to author the five new forms.

`node tools/audit-full-forms.mjs` verifies lengths, answer-position distribution, distinct stimuli and no exact retained-bank text reuse. The result is `docs/FULL_FORMS_AUDIT.json`. These checks do not establish psychometric equivalence to ETS forms or replace professional item calibration.

```text
node --test tests/full-simulator-core.test.mjs
node tools/audit-full-forms.mjs
node tools/serve-subpath.mjs
node tests/full-simulator-browser.mjs
```

The normal browser test uses a clearly identified model double and native audio/MediaRecorder with a browser fake microphone. It checks the complete 120-item flow, timers, navigation, clip-saving sequence, clipboard export, backups and responsive layout. It is not a physical microphone or model-accuracy test.

Opt-in real model checks, run on the device and potentially very slow:

```text
node tools/verify-browser-transcription.mjs
node tools/verify-browser-speech.mjs
node tools/verify-browser-speech.mjs --all
```

Recorded evidence from this computer is in `FULL_SPEECH_VERIFICATION.json`: all 49 clips of one complete form prepared with real Kokoro; a repeat sentence transcribed exactly with Whisper Base; a separate Whisper Small probe correctly normalized “nine” to “9”. The other forms passed content/manifest checks; their full audio was not individually rendered in this run. No physical microphone or human listening-quality assessment is claimed.

The last command prepares all original forms, including both adaptive routes, rather than using fixture audio. These real-model checks are separate from ordinary CI so a model download or CPU speed does not masquerade as a navigation failure. Prepared audio uses an explicit Kokoro engine identity and script hash. Missing cache data fails visibly; no alternative synthesizer is substituted.

The GitHub Pages site is public. Answers and recordings are browser-local; exporting a backup creates a local file. No sign-in was added.
