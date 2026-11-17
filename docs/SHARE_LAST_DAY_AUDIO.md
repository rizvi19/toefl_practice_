# Give the prepared audio to a friend

## Easiest: use the published site

Open <https://rizvi19.github.io/toefl_practice_/last-day.html> in Chrome or Edge. Select a mock, check the microphone, and click **Generate & cache all test audio**. For these five mocks, this downloads and verifies 40 already-rendered Kokoro clips; it does not synthesize speech. Your friend does not need Kokoro, Python, an ONNX model, or your browser cache. Each mock is about 5 MB of prepared audio. The first post-test Whisper transcription still needs its own model download.

## Copy the files for a local site

The prepared files on this PC are under:

```text
C:\Users\shahr\Documents\Codex\2026-10-29\now-implement-x20\work\site\simulator\last-day\media
```

The corresponding `audio-manifest.json` is in the parent `last-day` folder. Keep it with the MP3 files; the site checks it before caching audio.

A ready-to-copy ZIP is created at:

```text
C:\Users\shahr\Documents\Codex\2026-10-29\now-implement-x20\work\TOEFL_Last_Day_Audio_200.zip
```

1. Send that ZIP by USB, Drive or another file-transfer method.
2. On the friend's PC, obtain the updated site folder from the GitHub repository's **Code → Download ZIP**, then extract it. The current repository already includes these same rendered MP3s; the separate pack is useful if transferring them separately.
3. Extract the audio pack into the site root, allowing matching files to be replaced. The result must be `SITE_FOLDER\simulator\last-day\audio-manifest.json` and `SITE_FOLDER\simulator\last-day\media\last-day-01-l1-response1.mp3`, and so on. Do not put the ZIP itself in the media folder.
4. With Node.js installed, open a terminal in the site root and run `node tools/serve-subpath.mjs`. This server needs no npm dependency installation.
5. Open `http://127.0.0.1:4177/toefl_practice_/last-day.html`, permit the microphone and prepare a mock. The audio comes from their local MP3 files. Keep the terminal open during practice.

Do not open the HTML by double-clicking it: modules, microphone access and browser storage need the localhost server. Do not copy Chrome's internal cache folders. Localhost and the live site have separate answer/audio storage, so continue an attempt at the same address where you started. Internet is still required for the initial Whisper model and transcription runtime downloads. This pack avoids audio rendering; it is not a fully offline Whisper installer.
