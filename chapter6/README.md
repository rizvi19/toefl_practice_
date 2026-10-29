# Full Practice Test 01 — Chapter 6

Open `../chapter6.html` through an HTTP server or GitHub Pages. The existing homepage links to this form. No build or account is required.

The fixed form has Reading (35 + 15), Listening (32 + 15), Writing (10 + 1 + 1), and Speaking (7 + 4): 120 items. All supplied tracks 53–94 and videos 1–4 are in `media/`; their source names and byte sizes are in `media-manifest.json`. Tracks 91–94 are retained as supplied supplemental recordings and are not used as test prompts.

The default ETS base timing uses Reading 21 + 9 minutes and Listening 18 + 11, based on the [2026 specification blueprint](https://www.ets.org/content/dam/ets-india/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf) and [current section overview](https://www.ets.org/toefl/test-takers/ibt/about/content.html?version=after-jan-2026). The alternate chapter preset uses the supplied chapter's 20 + 9 and 18 + 9. Both use Writing 6 + 7 + 10 minutes. Speaking response limits are 8, 8, 10, 10, 10, 12, 12, 45, 45, 45, 45 seconds, beginning after each prompt. Introductory directions are untimed; approximate section base times are not extra Speaking response clocks.

Audio and video start automatically. If browser policy blocks playback, the recovery button unlocks it. Questions appear after Listening playback; recordings shared by multiple questions play once. Listening is forward only. Reading and sentence-building support within-module review; submission and timeout lock a module. Continuous absolute deadlines survive reload. An interrupted prompt can be recovered, with an event in the attempt log.

Speaking uses `getUserMedia` and `MediaRecorder` over HTTPS or localhost. Recording starts after the prompt and stops at the response deadline; the next question starts automatically. Recordings are stored in IndexedDB; answer state, events, flags, notes and deadlines use a separate LocalStorage key. Leaving a response flags an interruption. Closing the page during an active recording can lose that recording; use Save & exit or Export first. A JSON backup includes available recording blobs as data URLs and can be imported on another device. There is no server sync or sign-in.

The supplied text does **not** contain its promised answer key, transcripts, scoring conversion or explanations. No official answers or score are invented. Completed cloze words and sentence suggestions are reconstructed study aids. The textile-weaving sentence was severely reordered in the pasted extraction; its reconstruction is disclosed in the player and review. The form is linear, matching the chapter's directions, rather than adaptive. The cleaned source is retained in `source.txt`; PDF watermark identifiers and encoded extraction artifacts are removed.

Validation:

```sh
node --test tests/chapter6-core.test.mjs tests/section-core.test.mjs
node tools/serve-subpath.mjs
node tests/chapter6-browser.mjs
```

The browser check uses real audio/video playback at increased speed and a real MediaRecorder with a browser fake microphone. It checks fixed deadlines, module locks, Reading review, Listening autoplay and shared recordings, sentence construction, saved writing, automatic speaking recording and transition, 45-second interview limits, recording backups and responsive layout. Existing section-browser checks cover the homepage integration.

The GitHub repository and GitHub Pages site are public. Making a repository private does not make its Pages website private. GitHub Free requires a public repository for Pages; private Pages access control requires an Enterprise Cloud organization. No frontend password or sign-in is implemented.
