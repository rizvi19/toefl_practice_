# Sentence builder update — 15 November 2026

## Practice and controls

Open `sentence-practice.html`, then select **Exercise collection**:

- **Original 500**: the existing original questions, with smaller movable units and shorter fixed openings.
- **TST Prep PDF**: all 30 Build a Sentence tasks from the user-supplied *Free Writing Practice 2026* PDF, with source-page references and site-authored explanations.
- **All 530**: both collections. Encounter history, deliberate retries and saved answers remain available.

Writing tests also offer the 30-question source bank in fresh ten-question blocks. The retained 120 original Writing questions remain separately selectable. The five original full-test forms and the supplied book form retain their original questions and keys.

Drag any available tile into an exact blank. Dropping onto an occupied slot swaps two placed tiles, or replaces its tile with one from the bank. Drag back to the bank to remove. An invalid drop, Escape or a cancelled touch gesture leaves the answer unchanged. Empty slots stay in their exact positions after removal and reload. Tiles cannot be duplicated. A highlighted destination and floating tile show the move; reduced-motion settings disable the settling animation. Touch uses Pointer Events, including automatic page scrolling near the viewport edges.

Clicking or tapping tiles and blanks does not place or remove words. For keyboard access, Space/Enter picks up a tile, Left/Right selects a destination, Enter drops, Backspace returns it to the bank and Escape cancels. Alt+Left/Right also moves a placed tile, and a live region announces placement. Submitted/checked answers and expired tasks cannot be edited. Existing saved question snapshots retain their earlier segmentation and token indices; retrying uses the current layout.

## Reference review and its limits

The user supplied [this YouTube playlist](https://www.youtube.com/playlist?list=PLfNWEZJODl5htK3X5fvG-oyzzwwSNpG82). The review inspected playlist metadata and sampled complete question screens at approximately 110, 210 and 310 seconds from six videos: Practice #144 (`UhYfCWql-QM`), #124 (`5PZyrxNkips`), #104 (`zM5ipzbcliM`), #83 (`nKYO9EJrSyQ`), #63 (`Dvw9zhFRwFQ`) and #44 (`w4sOoCnhQZo`). First-question screens from #144, #104 and #44 were also inspected. This is a representative layout review, not a claim to have watched every video in the playlist.

The useful patterns were short conversational prompts; a mix of statements and questions; individual words mixed with short phrase tiles; fixed words at the beginning, middle or end; embedded questions and clause-order contrasts; and a separate answer reveal. Video descriptions explicitly say the countdown is deliberately faster than actual TOEFL pacing. Video timers were therefore not treated as official task clocks. No video exercises or thumbnails were copied into the site.

The original 500 answers retain their authored wording and explanations. Finer segmentation changes the task from arranging a few long phrases toward ordering words and short phrases. Their current range is 5–9 movable tiles, 7–21 answer words, with a median of 13 words; 36 items include an internal fixed connector. The 30 supplied PDF tasks have 6–8 movable tiles and 7–13 answer words, with a median of 10 words. The retained original 120 include shorter introductory items. Sentence length alone is not a measure of linguistic difficulty, and the existing medium/hard labels remain editorial rather than ETS calibration.

The default ten-sentence Writing block now uses six minutes, consistent with the supplied PDF's directions and the existing full-test simulator. Custom practice budgets and previously saved deadlines remain intact.

## Source fidelity and corrections

The source is [TST Prep, Free Writing Practice 2026](https://media.tstprep.com/freebies/2026/toefl-writing-100-questions-freebie-2026.pdf). The user's file has 30 sentence-building exercises on physical PDF pages 3–13, with keys on pages 25–26. Its other task types are not part of this sentence import. Attribution, original word pools, original frames, physical source/key pages and the file SHA-256 are stored in `writing/tst-source.js`. The original PDF is not republished.

Two printed defects prevent completing the supplied key exactly without correction:

1. Question 5 prints six blanks, but the fixed word and the answer key require seven tiles. One blank was added.
2. Question 10's key needs two occurrences of “she”, but its bank and frame supply only one. A second tile and one blank were added.

Both corrections appear in the exercise's post-answer feedback and timed review. Repeated identical words may exchange positions without losing credit, provided each supplied token is used at most once. Capitalization and typographic apostrophe differences are normalized. All 30 reconstructed keyed answers are checked against the printed answer key.

To reproduce the import, install `pypdf` and Poppler, then run `python tools/import-tst-writing.py path/to/the-user-supplied.pdf`. Those tools are only needed for re-importing, not to use the website.

## Verification

`npm run test:writing` checks canonical sentences, source keys/corrections, identical-tile scoring, exact-slot moves, saved-answer validation and timer boundaries. `npm run test:writing:browser` checks the existing Writing/focused/history flows plus mouse and native touch dragging, swaps, removal, replacement, cancellation, keyboard controls, saved gaps, timeout locking, all 30 PDF tasks, source feedback, no repeats, mobile layout and a six-minute source block. Chapter 6 and full-simulator browser checks cover the other sentence-builder adapters. Runtime and editable archives include the shared interaction module, styling and source banks.
