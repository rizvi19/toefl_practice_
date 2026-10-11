# Kokoro Listening integration

The website offers Settings → Audio source → Kokoro (local, on demand). The helper runs on each visitor's own PC, on 127.0.0.1:8766. It uses an existing Kokoro Python environment, CPU PyTorch, local model, af_heart/am_michael voices and FFmpeg. It installs or downloads nothing. Start Launch-Kokoro.cmd and leave the window open. Setup and a small portable helper download are linked from Settings (docs/kokoro.html).

Original recordings always have priority in recorded/Kokoro modes. The shared MP3 pilot is also available without the helper. For other activities, Kokoro mode posts only the stable activity ID and SHA-256 of its script; the helper uses the actual extracted activity text and refuses stale scripts. Generation starts only when Play is pressed. Missing helper or generation failure uses browser speech. Explicit Browser text-to-speech continues to use browser narration. The browser may require the user to grant local network access to the public site.

Examination playback stays at normal speed, once only; native audio completion unlocks questions. Transcripts remain restricted. Scores, progress, original full form, 800 Listening activities and original recordings are retained.

## One shared pilot

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

Data validators cover 60 original screens, 600 Reading activities, 800 Listening activities and 1,800 Listening questions. Browser checks cover persisted Settings, helper use/fallback, real MP3 playback, 2/2 scoring, no exam replay/transcript, completion gating, 32+15 rehearsal structure and original practice modes. The model, environment and two existing American voices are reused. No paid API, dependency installation or model download is needed.
