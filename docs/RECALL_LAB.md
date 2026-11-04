# Recall Lab: Vocabulary Mountain

Open [Recall Lab](../recall/index.html). This area is for vocabulary, collocations, flashcards and interactive stories. The existing TOEFL section tests, full tests and their storage remain separate.

## What to do

1. Start with **Group 1**. A group contains 20 items by default.
2. Finish a full round. The next round includes **Groups 1–2**, then **1–3**, and so on. Completing a round means practicing it, not proving mastery.
3. For a shorter session, choose **20-card weighted focus** (the default; change its size in Settings). Select any summit to revisit earlier groups or move at your own pace. Vocabulary-only and expression-only mountains retain separate summits.
4. Bring an expression to mind before revealing it. Type or say the answer, compare the back and grade honestly. Six directions include situation, meaning, cloze, register, form repair and new-context use.
5. Open an item **In a story**. Read the highlighted expression, explore its word partners, hide 20/40/70% of the targets, retell the scene, then use an expression in a different situation.
6. Back up progress in **Settings**. Each device keeps its own data; there is no automatic synchronization or sign-in.

There is **no day cycle, timed writing test, interview test or reading/listening test in Recall Lab**. Optional five-second recall challenges are learning exercises. Optional retelling recording is limited to 60 seconds and requires microphone permission; text retelling works without it.

## Selection and repair

Weighted focus samples without replacement using a seeded exponential-race ordering:

- unread item: weight **7**;
- recent wrong answer: **12**;
- Hard: **5**;
- recovering after misses: a declining weight as successful attempts accumulate;
- steady correct item: **1**, so it still has a chance to return.

Favorites modestly increase weight. “Show less often” reduces weighted-focus priority but does not remove an item from full cumulative rounds. Sampling is an editorial practice rule, not a claimed psychometric model.

Again and Hard can insert another attempt after **3–5 distinct intervening cards**. The repair changes recall direction. Each item is attempted at most three times in a round; total attempts have a finite cap. A short round may finish before a repair has enough intervening cards. The item remains highly weighted for subsequent practice rather than looping immediately.

Repeated misses show a short meaning/pattern/example/cloze repair lesson. Two successful retrieval contexts are needed before a missed item is marked recovering. Recognition and guided correction never increment retrieval or new-use counts. Retrying immediately after seeing the answer is guided repair, not clean retrieval. Response latency is captured at the first check/reveal, not after reading the back.

## Content and source integrity

Actual input counts:

| Source | Records |
|---|---:|
| Supplied seed CSV | 249 |
| Masterbook numbered expressions | 220, IDs 1–220 |
| Masterbook vocabulary tables | 228 records, 212 distinct source forms |
| Original editorial additions | 119 |
| Total source records | 816 |
| Final canonical learning items | 714: 380 words + 334 expressions |

All 33 originals are checked by both IDs and exact requested forms/explicit aliases. The 30 PDF memory families are retained. Overlaps consolidate while preserving the original term, meaning, example, source ID and CSV record or physical/printed PDF page. Related but different forms such as resilient/resilience remain distinct. No arbitrary CEFR, frequency rank or “band 6 word” label is assigned.

All **714/714** items have flashcard content and marked appearances in **120 original scenes**. A strict build fails on missing story coverage or unmatched example/cloze targets. Scenes are original practice narratives, not copied masterbook passages. The absent earlier DOCX is not claimed as imported.

Source files are `recall/source/seed_bank.csv` and `recall/source/masterbook-extracted.json`. The PDF itself is not required to run the site. `recall/data/source_report.json` contains the CSV text hash normalized to LF, the original PDF hash, actual extraction counts, original checklist, deduplications, family list and coverage audit.

Extraction combines Poppler layout/word bounding boxes with pypdf horizontal table-rule coordinates. Headers and source row boundaries were visually checked. Re-extraction fails if expression IDs, family totals or vocabulary record counts mismatch:

```powershell
python tools/import-recall-pdf.py "C:\path\to\TOEFL_2026_220_Phrases_and_Vocabulary_Masterbook.pdf"
```

This optional authoring command needs pypdf and Poppler `pdftotext`. Normal building uses the checked-in extraction and requires neither Python nor the original PDF.

## Honest feedback

Exact target recall checks accepted forms, spelling, punctuation normalization, contractions and selected grammatical inflections. A communicatively suitable synonym can still miss the target. Cloze checking requires the form used in its sentence.

Word-partner checks catch selected errors such as conducive for, role on, discuss about, and information/feedback plurals. They also check some register preferences and reject a copied example as transfer. They cannot fully judge grammar, meaning or naturalness. New-use evidence requires the learner’s confirmation. Form repairs may have more than one grammatical answer, so comparison is labeled accordingly.

High-risk items have edited usage contrasts; other items may use clearly labeled spelling-repair cards. The bank provides original context sentences and source word partners, rather than pretending a spelling check is full usage assessment. No mastery estimate is an official TOEFL score. Precise, relevant language matters more than forcing advanced-looking words into an answer.

## Audio, privacy and offline behavior

Kokoro is the default optional voice, shared with the full simulator. It generates and caches examples/scenes on this device. The first model download and CPU generation can be slow. There is no silent voice fallback. Settings provides an explicit browser-dependent device-voice option, with accent and speed preferences. Core study does not require audio or paid services.

The service worker is scoped to `recall/`. It caches the learning shell, content and required local modules for offline text practice after a successful connected load. It does not control other Practice Studio pages. Uncached voice models and audio still need internet/preparation; device voices depend on browser installation and support. Browser storage/cache can be cleared or evicted, so export backups.

Review events, cards, settings, rounds, retellings, sentences and optional recording blobs use a separate IndexedDB database. Backup import validates version/schema, merges by stable IDs, keeps newer local records (fresh defaults do not block restoring a backup) and combines event histories without duplicates. Counters are rebuilt from merged events where the event history is complete. Reset requires typing RESET and affects only Recall Lab.

## Development and verification

Use Node 22 LTS. The site is static HTML and native JavaScript modules, matching the existing GitHub Pages project. Runtime study has no framework dependency. TypeScript checks the content/state core; ESLint checks the new JavaScript. Existing tests use Node’s test runner and Playwright.

```text
npm install
npm run build:recall
npm run typecheck:recall
npm run lint:recall
npm run test:recall
npm run dev
# In a second terminal:
npm run test:recall:browser
```

The preview URL is `http://127.0.0.1:4177/toefl_practice_/recall/index.html`.

Unit checks cover source counts and provenance, exact original coverage, complete story linkage, CSV parsing, alias normalization, cumulative groups, summit progression, sampling weights, delayed repair, finite sessions, evidence separation, grammar patterns and backup rejection.

Browser checks exercise cumulative rounds, reload persistence, all six directions, repair lessons, story cloze/retelling/transfer, optional native recording with a fake microphone, permission-denied text fallback, backup/reset/idempotent merge, dark mode, 320px layout, keyboard/reduced motion and actual service-worker offline reload. Model audio is explicitly doubled in the main UI test; that does not claim a human listening assessment or physical-microphone test. The unchanged Kokoro runtime has separate real-model verification documented for the full simulator.

GitHub Actions also tests the existing practice pages and the extracted release archive. Test screenshots are generated locally under ignored `tests/screenshots/`.
