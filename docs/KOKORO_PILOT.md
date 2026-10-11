# Kokoro Listening integration

## Directly from GitHub Pages

Open https://rizvi19.github.io/toefl_practice_/ and select Settings → Audio source → Kokoro (in this browser). Press Play audio on a Listening activity. No Python, helper, account or paid service is required. Original recordings and the single shared MP3 still play first; missing recordings are generated on demand in a CPU browser worker.

First use downloads approximately 118 MB: one 92,361,116-byte q8 ONNX model, the required CPU WASM runtime, browser JavaScript and American voice files as needed. No alternative checkpoints, GPU libraries or datasets are downloaded. Model/voices are cached by the browser; clearing site data or browser eviction may require downloading them again. Once cached, generation can work offline while the website is already loaded; initial website navigation still requires internet.

Audio uses af_heart for narration and Woman, and am_michael for Man. Conversation labels are removed and turns have natural pauses. Long scripts are split into sentences so the complete text is generated. MP3 is mono 24 kHz, 48 kbps, approximately 360 KB/minute. Only played activities are generated, with a separate 20 MB browser MP3 cache that removes older generated recordings. Existing progress, scores and microphone recordings use their original storage.

Old recorded/local-helper preferences migrate to browser Kokoro once; explicit Browser text-to-speech preferences are preserved. If browser generation fails, the player reports the fallback and uses browser speech. The initial model setup and generation time are excluded from a timed activity's countdown. Actual audio playback follows the existing timing, one-play exam behavior, native audio-completion gate and transcript restrictions.

The optional local Python helper remains available as Kokoro (local helper). Its setup is in docs/kokoro.html. It reuses the existing installation and downloads nothing.

## Shared pilot and local helper

conversation26-001: Campus conversation 001 — Restoring the campus greenhouse · Details.
Woman af_heart / Man am_michael. 35.14 seconds, 211,485 bytes, MP3 mono 24 kHz 48 kbps. Generation and encoding took 10.70 seconds plus 5.51 seconds initial model loading. The script comes from existing collection data; labels are stripped only for narration. There is only one shared generated MP3. The rest generate individually on users' PCs as needed.

## Local usage on this PC

```powershell
& 'D:\LocalTTS\venv\Scripts\python.exe' '.\tools\kokoro-local.py' --serve --allow-generation
```

Or double-click Launch-Kokoro.cmd. The existing Stremio FFmpeg is detected. The local model remains at D:\LocalTTS\models\kokoro. Cache defaults to 20 MB; --cache-mb 10 reduces it. Only older helper-owned MP3s listed in its manifest are evicted, excluding the pilot/current activity. Original recordings, models and user files are excluded. No WAV intermediate is stored. Offline model flags prevent downloads.

The portable ZIP contains a JSON catalog and needs no Node.js. In the repository checkout, the extractor uses existing Node.js to execute the collection files in index.html order and read the original embedded bank. Refresh the portable ZIP's catalog when scripts change. It contains no question answers, model checkpoints or extra tools.

Selected CLI generation is still possible with --id conversation26-002 (repeat --id for a small set). No bulk generation runs automatically. Of the 800 activities, 27 already have original recordings and 773 previously used browser narration; 772 further generated recordings would cover all missing recordings after the pilot. To explicitly prepare all missing recordings later, use --all --cache-mb 1000. To create separate Kokoro copies for the other 799 IDs including originals, use --all --include-original --cache-mb 1000. Neither batch command was run. Existing originals remain the player's first choice.

## Tests

Data validators cover 60 original screens, 600 Reading activities, 800 Listening activities and 1,800 Listening questions. Browser checks cover persisted Settings, helper use/fallback, real MP3 playback, 2/2 scoring, no exam replay/transcript, completion gating, 32+15 rehearsal structure and original practice modes. The model, environment and two existing American voices are reused. The optional Python helper requires no new installation. Browser mode uses the separate approved quantized model download.
