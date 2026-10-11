# Complete the Words — Extended 100 (2026)

This independent practice collection adds **100 complete academic/social passages**, each with **10 fixed missing-word endings**, for 1,000 graded sequences. The initial sentence is intact to establish context; later words have a fixed visible prefix and individually editable character slots.

- IDs: `ctw26-ext-001` through `ctw26-ext-100`; they are distinct from all original IDs.
- Four rotating practice variations per topic across 25 mixed topics.
- Grades and explanations are handled by the existing React app. Each answer has a passage-specific contextual explanation.
- The original **120-item full practice form** remains the separate `xi.items` data source.
- The shared library joins the original 120, the 100 extended passages, and the current visitor's imported items without altering any existing imports.
- Existing browser data remains under the `toefl-studio-v1` key with compatible progress and response formats.

## Public website and publishing

GitHub Pages must be set to **Deploy from a branch → main → / (root)**. The existing URL remains:

https://rizvi19.github.io/toefl_practice_/

The deployable ZIP has `index.html` at the archive root and relative references; no npm or command line is required for deployment. **Extract the ZIP; upload its contents, not the ZIP file**.

## Content editing for future collections

The editable source for the new collection is `collections/complete-words-100.js`. Its topic sentences and selection algorithm can be edited independently. The checked-in React frontend is **an existing minified production bundle**, not the original unminified React/TypeScript source. That upstream source was not in the public repository, so claiming otherwise would be inaccurate. The editable-project ZIP keeps the exact working bundle plus the original collection generator, tests, packaging workflow, and assets so future changes can be implemented without reconstructing the site.

## Deployment ZIP contents

`index.html`, `assets/`, `audio/`, `docs/`, `collections/`, and existing notices. Replace/upload those to the main branch repository root. Do not delete other existing repository files or change existing GitHub Pages configuration.

## Verification scope

`tools/validate-collection.mjs` validates the item count, IDs, original built-in item count, required letter slots, answers, explanations, original audio asset paths, and relative scripts. `tools/smoke-playwright.mjs` tests the production application at the exact `/toefl_practice_/` subpath, including navigation, selecting 100 items, fixed slots, autosave/reload, correct grading, and the original 120-item full form. The release workflow extracts both ZIPs and reruns validation and the browser smoke test against the extracted deployment ZIP.

These original exercises are independently authored practice, not ETS questions and not an official score predictor.
