# TOEFL Practice Studio — Reading 600, October 2026

**Public URL:** https://rizvi19.github.io/toefl_practice_/

This version follows the **task descriptions and question strategies** in Chapter 2 (pages 51–128) of the official 2026 TOEFL iBT Pocket Guide, while using independently written, unofficial practice content. It is not an ETS publication or score predictor.

## Exactly 200 complete activities in each task

| Task | In original full form | Additional public library | Total |
| --- | ---: | ---: | ---: |
| Complete the Words | 3 | 197 | **200** |
| Read in Daily Life | 5 | 195 | **200** |
| Read an Academic Passage | 2 | 198 | **200** |
| **Reading total** | **10** | **590** | **600** |

The **original 60-screen full practice form** stays separate (120 original questions/letter-completion units plus task-specific activities). The shared library has 650 activity screens including the non-Reading tasks. Previously saved user data keeps the same `toefl-studio-v1` key and existing question IDs.

### Complete the Words

A complete introductory sentence, approximately 70–100 words per academic passage, ten missing-word sequences, fixed slots corresponding to the deleted second half of a word, with both academic and function words. Existing original IDs `words-01` through `words-03`, extended IDs `ctw26-ext-001` through `ctw26-ext-197` remain stable.

### Read in Daily Life

Each independently readable campus text contains 15–150 words and **two or three questions**. Fifty campus scenarios are represented in four distinct communicative formats, including emails, notices, threads and practical instructions. Questions test factual details, negative factual understanding, context vocabulary, reference, supported inferences and rhetorical functions. Scenario-specific deadlines, requirements, exceptions, arrangements and false claims are included in the question key.

### Read an Academic Passage

Each expository academic activity contains **five questions**, a passage of approximately 200 words, academic vocabulary, and supported interpretations. Fifty academic subjects recur across four focused variations using differently marked paragraphs or selected evidence. The set practices all eight ETS-named question families:

1. Factual and Negative Factual
2. Vocabulary
3. Select the Sentence
4. Sentence Simplification
5. Reference
6. Inference
7. Rhetorical Purpose
8. Insert Text

The two marking-based types use four clickable bracketed markers [A]–[D] within the passage and also retain conventional four-option answer choices as a keyboard-accessible fallback. For Insert Text, selecting a marker previews the additional sentence in its chosen location.

The answer review gives a correct answer, objective question-type label, passage-based justification, explanation of why other choices do not fit, and an applicable strategy. The difficulty flags Easy/Medium/Hard/Mixed **do not represent ETS calibrated scores**.

## Practice controls

- **Random · Complete the Words**
- **Random · Daily Life**
- **Random · Academic Passage**
- **Reading trio · 17–18 questions**: Complete the Words → Daily Life → Academic Passage. Actual total can vary by one question because Daily Life texts may contain two or three questions; the interface label is a nominal estimate.
- **Reading rehearsal · 50 questions**: 2 Complete the Words + a 3-question Daily Life + a 2-question Daily Life + 2 Academic (35 answers), followed by 1 Complete the Words + 1 Academic (15 answers). This is the intended chronological task sequence across two blocks.

**Important:** The longer rehearsal is **not a true ETS multistage adaptive test**. It does not have the official 21/9-minute module clocks, module-level review boundaries, adaptive branching, or official scoring. Study mode uses the existing per-activity timer and retains its feedback, autosaving, and navigation features. These distinctions are disclosed in the UI.

## Publishing ZIP (no local commands required)

Keep GitHub Pages at **Deploy from a branch → main → / (root)**. From the prebuilt ZIP, extract and upload these exact contents to the repository root:

| ZIP entry | Destination |
| --- | --- |
| `index.html` | repository root |
| `assets/` | `assets/` |
| `collections/` | `collections/` |
| `audio/` | `audio/` |
| `docs/` | `docs/` |
| `LICENSE.txt` | repository root |
| `PUBLISHING.txt` | repository root |
| `THIRD_PARTY_NOTICES.md` | repository root |

The frontend remains a checked-in production JavaScript/CSS bundle because the original React source was not available in the public repository. The second ZIP is editable for **question banks, generators, tests and release workflow**, but should not be mistaken for missing original unminified React source.

## Automated checks and limitations

GitHub Actions installs Node/Playwright, validates the combined 600 activity counts, 5-question academic sets, 2–3-question everyday sets, fixed ten-word completions, passage lengths, unique IDs, eight question families, complete answer options, answer explanations, and original 60-screen form. Browser tests grade completed CTW, Daily Life and Academic Passage activities, exercise insertion previews and random selection, verify 35+15 rehearsal counts, recover saved answers, and test the exact `/toefl_practice_/` GitHub Pages subpath. The generated ZIP is extracted and tested independently before publication.

Question quality is authored for learning, but these items have **not** undergone external TOEFL psychometric calibration, professional item-writer adjudication, or live student pilot studies. Repeated core subjects across differently targeted variants are intentional, and exercises are **not copied from ETS practice sets**.
