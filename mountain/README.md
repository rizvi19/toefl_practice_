# English Mastery Mountain (TOEFL 2026)

**Live route:** [../mountain.html](../mountain.html) / https://rizvi19.github.io/toefl_practice_/mountain.html

This is an independent, original self-study feature, not an ETS or GregMat product.

## Batch 1 (published October 17, 2026)

- Fully populated parts **1–10**. Future Parts **11–50** are listed on the roadmap but deliberately marked "Coming later".
- Each live part includes **35 contextual vocabulary entries, 15 phrases/collocations, 5 carefully explained grammar patterns, 8 word roots/word-formation clues, and 8 corrections of common errors**.
- Current bank: **350 words + 150 phrases + 50 grammar patterns + 80 root entries + 80 errors = 710 learning items**. Each item can be reviewed, bookmarked or revisited; quizzes are generated from these items.
- Parts can be studied **in any order**.
- Marking any part studied adds it to the default cumulative Mountain.
- Practice supports custom part selection; one of five categories or mixed categories; **Smart Cumulative**, **Random**, **Due**, **Weak**, **Exhaustive** and **Active Recall** modes.
- Mistakes and self-rated difficulty feed the weakness list; interval-based review due dates are derived from Again/Hard/Good/Easy results. Recognition questions record correct/incorrect automatically.
- Searchable lesson text, browser speech for words and phrases, per-item personal notes, bookmarks, progress by part and category, recent session history, backups and reset.
- User data is persisted via **localStorage** in the current browser. Export JSON regularly; progress is not automatically synced across browsers/devices.

## Data format and adding future lessons

Add a new JSON batch file under `mountain/`. Every part object includes:

```json
{
  "id": 11,
  "title": "Transitions and Logical Relationships",
  "focus": "Human-readable focus",
  "words": [{"id":"11-v1","term":"term","meaning":"definition","example":"Correct sentence."}],
  "phrases": [{"id":"11-p1","term":"phrase","meaning":"function","example":"Correct sentence."}],
  "grammars": [{"id":"11-g1","title":"Rule","rule":"Explanation","correct":"Sentence.","incorrect":"Sentence.","explanation":"Why the first is correct."}],
  "roots": [{"id":"11-r1","term":"root","meaning":"meaning","example":"related words"}],
  "traps": [{"id":"11-e1","incorrect":"Wrong sentence.","correct":"Correct sentence.","explanation":"Why."}]
}
```

Modify the list of JSON URLs in `mountain/app.js` and update the availability check and minimum/maximum part range (currently fixed to 10). Keep IDs stable: changing an ID disconnects saved progress and bookmarks.

**Curriculum quality safeguards:** verify every definition, sentence and answer; ensure wrong answers are clearly wrong; do not duplicate entries to inflate counts; use natural collocations; avoid treating grammar guidelines as universal when context has exceptions. Regression check: `npm run test:mountain`.

## Reference materials and responsible use

The selection and teaching style were informed by materials provided for this project, especially:

- *Building Grammar Skills for the TOEFL iBT* (early chapters on sentence parts, agreement, prepositions, verb tenses, adjectives, clauses, verbals, passive voice and modals)
- *Barron's TOEFL Essential Words*, 8th edition
- *Magoosh TOEFL vocabulary* handout
- *Complete the Words* example questions
- ETS *The Official Guide to the TOEFL iBT Test*
- Selectively: *GregMat's Vocabulary List*, *GRE Vocab Capacity*, *Word Smart*, *Magoosh Vocabulary* and *The Vocabulary Builder Workbook*

The Mountain features newly authored definitions, contextual examples and questions rather than copied textbook pages. Word-root clues are aids, not guaranteed methods for inferring every unfamiliar word.

**Official current TOEFL format/scoring:** consult [ETS](https://www.ets.org/toefl/test-takers/ibt.html). TOEFL reports section and overall scores on the **1–6 scale** (0.5 increments) in 2026. Mountain quiz accuracy is **not** calibrated to that official score.

## Limitations

- This release does not include all future 40 parts; those will be authored and quality-checked incrementally.
- Multiple-choice tests measure recognition; use Active Recall and speaking/writing on the existing practice site to train production.
- The review scheduler is a practical approximation rather than a scientifically validated spaced-repetition system or an official TOEFL training method.
- Speech playback depends on local browser voice availability.
- Progress is local only; export a backup to move between devices.

## Daily study suggestion

Study Parts 1–5 and 6–10 as time allows; mark studied only after reading the explanations. Start with a mixed Smart cumulative quiz; revisit weak errors, use Active Recall to verify actual retention, and take regular full TOEFL practice sessions outside the Mountain. Don't attempt to cram all 710 items at the expense of listening, speaking and writing.
