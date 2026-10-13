# Reading quality upgrade — 13 October 2026

Reading now uses a separately authored, editable bank instead of repeatedly expanding a small set of passage and question templates. Listening's 800 activities and all its 1,800 answer keys match baseline commit `b15a662f881feac44e99d325ad3800075b6b7ac6` exactly. Writing, Speaking, recordings and the library's non-Reading activity slots are preserved.

## Bank and audit

| Practice variant | Distinct activities | Scored items |
|---|---:|---:|
| Complete the Words | 100 | 1,000 |
| Daily Life Short | 30 | 60 |
| Daily Life Long | 30 | 90 |
| Text Chain | 30 | 90 |
| Academic Passage | 32 | 160 |
| Total | 222 | 1,400 |

The three daily-life variants belong to ETS's single Read in Daily Life task. They are not three additional official task types. Fifty distinct independently authored site cloze paragraphs are retained, with newly generated second-half deletions; fifty cloze paragraphs and all 122 daily/academic activities are newly authored. No uploaded publisher passages or questions are reproduced. Cloze openings remain intact and each activity has ten suffix deletions. Academic questions cover details, main ideas, inference, vocabulary, reference, purpose, negative detail, sentence selection, simplification and insertion. Scientific, historical, cultural and everyday contexts vary. Every MCQ has four individually authored options and exact passage evidence in its explanation. Runtime option shuffling remaps keys, including clickable sentence/insertion markers.

The entire original Reading bank was inspected, including legacy full-form slots and collection generators. The [machine-readable audit](READING_QUALITY_AUDIT.json) compares all active Reading passages, questions and option sets against the previous 600 activities. After lowercase/alphanumeric normalization and removal of sentence-position markers:

- Exact duplicate copies: **49 → 0**.
- Passage pairs with five-word-shingle Jaccard similarity ≥ 0.28: **1,375 → 0**. This includes exact pairs, so the two figures must not be added together.
- Maximum identical option-set reuse: **99 → 2**. The two repeated sets are the legitimate Sentence A–D choices.
- Most repeated complete question stem: **99 → 2**.

These checks identify mechanical overlap, unsupported evidence, invalid keys and structural defects. They cannot establish psychometric validity or guarantee the absence of every semantic ambiguity. Editorial content review and automated validation are separate safeguards. Bank size counts distinct usable activities rather than inflating it with near-identical variants.

## Forms and exposure history

The default practice form has 35 + 15 scored items and a 21 + 9 minute timer. It contains 30 cloze gaps overall. Its upper branch has 10 daily and 10 academic questions overall; its lower branch has 15 daily and 5 academic questions overall. The published ETS blueprint allows varying daily/academic distributions; this site's particular forms and 70% routing threshold are local practice choices.

Five fixed presets reproduce the activity layouts in the supplied screenshot:

| Preset | Module 1 activities in order | Module 2 activities | Scored items |
|---|---|---|---:|
| Advanced 1 | Words ×2, Short, Chain, Long, Academic | Words, Academic | 48 |
| Advanced 2 | Words, Short, Long, Academic | Words, Academic | 35 |
| Advanced 3 | Words, Short, Chain, Long, Academic | Words, Academic | 38 |
| Intermediate 1 | Words ×2, Short, Long, Academic | Words, Short, Long | 45 |
| Intermediate 2 | Words, Short, Long ×2, Academic | Words, Short, Long | 38 |

These screenshot layouts have different local question totals; they are not asserted to be ETS operational forms. Choose mixed, intermediate or advanced pools, automatic/upper/lower routing, and 0–4 activities of each variant per module. Each module must contain 5–60 items; module timers are configurable. Within each variant, the higher half of a reproducible editorial complexity ranking is Advanced. The rubric uses sentence length, long-word share and reasoning-question count. These labels are relative practice groupings, not calibrated TOEFL or CEFR levels.

Selection never repeats an activity or family within a generated form, including its unused branch. The shared Reading exposure ledger prefers unseen items in the eligible pool across section tests and random library practice. Only activities actually displayed are recorded, once per session; abandoned unseen screens and unchosen branches remain eligible. When an eligible pool is exhausted, the least-used, oldest exposure is selected and section reports disclose reused selections. Browser storage survives trimming the recent 20-report list. It is local to that browser and origin, cannot coordinate concurrent tabs atomically, and is cleared by clearing site data; there is no cross-device sync. Old saved sessions and reports remain frozen rather than silently receiving changed questions.

## Scores and feedback

ETS introduced section reporting on a 1–6 scale in 0.5 increments in January 2026. This site matches that display scale **only**: `round-to-half(1 + 5 × correct / total)`. Every local item is scored; unanswered items count as incorrect. ETS's blueprint also includes unscored items, so the local raw total must not be treated as ETS's scored raw total. The public materials inspected do not provide a raw-accuracy conversion suitable for this independent bank. Official legacy-score comparison tables are not a raw conversion for these questions.

The UI explicitly says **Local estimated practice score**. It is uncalibrated and is not a validated prediction, CEFR assessment or admissions score. Incomplete and ended-early new Reading attempts have no score estimate. Reports validate their actual configured denominator and show accuracy by task and skill, unanswered items, evidence-based answer review and three priorities ordered by missed-item count. Small skill samples and easier/lower/custom forms should be interpreted through the actual item results, not compared as equivalent official forms.

## References inspected

All four uploaded PDFs were extracted and representative pages visually inspected: Essential Exercise TOEFL 2026; Complete the Words Practice Questions (visible); TOEFL Preparation Book 2026–2027; and The Official Guide to the TOEFL iBT Test, Pocket Edition. The attached five-preset screenshot was inspected. These remain private, read-only references outside this repository.

Official references checked on 13 October 2026: [ETS current content](https://www.ets.org/toefl/test-takers/ibt/about/content.html), [Reading descriptions](https://www.ets.org/toefl/test-takers/ibt/about/content/reading.html), [2026 blueprint](https://www.ets.org/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf), and [score reporting](https://www.ets.org/toefl/test-takers/ibt/scores/understand-scores.html). The blueprint specifies three Reading task types, two adaptive stages, a base of 50 items, 30 cloze items and one point per scored item. Its timing is 18–21 minutes plus 9; actual content and timing may vary. Its pre-launch revision caveat remains relevant when distinguishing a published blueprint from a guaranteed form.

Background facts in the additional explanatory passages were cross-checked against primary institutional or research sources: [Emlen’s stellar-compass study](https://pubmed.ncbi.nlm.nih.gov/17744052/), [USGS capillary action](https://www.usgs.gov/water-science-school/science/capillary-action-and-water), [USGS isotope dating](https://pubs.usgs.gov/info/ayuso2/), [NOAA coral bleaching](https://oceanservice.noaa.gov/facts/coral_bleach.html), [UNESCO trade networks](https://www.unesco.org/en/silk-roads/about-silk-roads), [NPS rock cooling](https://www.nps.gov/goga/learn/education/diabase-faq.htm), [isotope-traced fungal exchange](https://pubmed.ncbi.nlm.nih.gov/21472448/), and [Folger printing corrections](https://www.folger.edu/blogs/collation/correcting-mistakes/). Passages and questions are independently composed, not copied excerpts.

## Editing, checks and deployment

Author content in `reading/short.mjs`, `long.mjs`, `chains.mjs`, `academic.mjs`, `academic-revisions.mjs`, and `cloze.mjs`. `retained-cloze.json` contains the 50 selected site paragraphs. Run `npm ci`, `npm run build:bank`, `npm run audit:reading`, `npm run validate`, `node tools/validate-listening.mjs`, and `npm run test:sections`. Build outputs in `reading/bank.json`, `reading/library-bank.js` and `exam/bank.json` must be committed together. The audit requires the baseline commit in Git history.

Start `node tools/serve-subpath.mjs`, then run `npm run test:browser`, `npm run smoke`, `node tools/smoke-listening-playwright.mjs`, and `node tools/smoke-timers-playwright.mjs`. Tests cover 600 seeded forms across six presets, every answer key, option remapping, exhaustion, exposure history, fixed/adaptive routes, score denominators, partial reports, reload/navigation, mobile layout, sentence markers, actual audio, one-play Listening and timers. Windows uses installed Edge; CI installs Chromium.

Deploy the repository root through GitHub Pages after merging the reviewed change. Keep `reading/` alongside `exam/`, `collections/`, `assets/`, `audio/` and `docs/`. Actions validates pull requests and produces verified Pages/source archives as workflow artifacts; it does not commit archives or push to main. Existing downloads are historical releases. The legacy compiled library has a small, tested Reading adapter because editable original React source is absent. Old Reading metadata scripts remain loaded where the unchanged Listening generators require them; their obsolete question banks are no longer active Reading pools.
