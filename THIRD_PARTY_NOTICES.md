# Third-party notices

- DM Sans and Manrope fonts are bundled from the @fontsource packages and are licensed under the SIL Open Font License 1.1. Full notices: docs/DM_SANS_LICENSE.txt and docs/MANROPE_LICENSE.txt. Their names are not claimed as original app work.
- React / React DOM: MIT. Vite and its React plugin: MIT. Lucide icons: ISC. Full dependency versions are preserved in package-lock.json.
- Test tools (not included in the deployed website): Vitest, Playwright, Testing Library, jsdom and axe-core packages retain their respective open-source licenses in their installed packages.
- Bundled WAV files are newly synthesized from original scripts using installed Windows text-to-speech voices. They do not contain ETS audio, commercial preparation recordings or any person’s microphone recording.
- TOEFL and TOEFL iBT are trademarks of ETS. This app is independent and unaffiliated.

- New Listening MP3 narration uses the existing [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) model and af_heart / am_michael synthetic voices. Model weights are Apache-2.0; model/runtime files are not bundled in this release. Generated speech reads independently authored scripts and contains no ETS/preparation-book recordings.
