# Browser speech dependencies

- kokoro-js 1.2.1, official browser distribution (Apache-2.0): https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/dist/kokoro.web.js
- lamejs 1.2.1, browser MP3 encoder (LGPL-3.0): https://cdn.jsdelivr.net/npm/lamejs@1.2.1/lame.min.js
- The runtime requests only Transformers.js 3.5.1's required CPU WASM files from its pinned distribution: https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.5.1/dist/
- Model: onnx-community/Kokoro-82M-v1.0-ONNX, onnx/model_quantized.onnx (92,361,116 bytes). Only af_heart and am_michael voice files are requested as needed. No alternative checkpoints, datasets or GPU libraries are fetched.

Model and voice downloads are public static files, not an inference API. Inference runs on the visitor's CPU in a dedicated worker. Kokoro model/voices use browser cache; generated mono MP3s use a separate bounded IndexedDB cache.
