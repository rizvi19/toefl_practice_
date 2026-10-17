> Historical release. The active bank is now [Listening v2: 200 distinct activities / 450 questions](LISTENING_V2_RELEASE.md). The counts and template behavior below describe the retired bank.

# TOEFL Practice Studio — Listening 800, October 2026

**Website:** https://rizvi19.github.io/toefl_practice_/

The listening collection follows the task descriptions and strategies of **Chapter 3, Listening Section**, in *The Official Guide to the TOEFL iBT Test: Pocket Edition*, supplied by the user. Task design and question types are modeled on the guide; scripts, options and explanations are independently written. This is a **non-ETS, unofficial learning resource**.

## Exactly 200 activity screens per Listening task

| Listening format | Original full-form screens | New complete activities | Total | Graded questions per activity |
|---|---:|---:|---:|---:|
| Listen and Choose a Response | 15 | 185 | **200** | 1 |
| Listen to a Conversation | 4 | 196 | **200** | 2 |
| Listen to an Announcement | 4 | 196 | **200** | 2 |
| Listen to an Academic Talk | 4 | 196 | **200** | 4 |
| **Total** | **27** | **773** | **800** | **1,800 questions in total** |

All 600 previously published Reading activities remain accessible alongside the **separate original 60-screen full practice form**, and non-Reading, non-Listening tasks remain intact. The shared library has **1,423 activity screens** excluding user imports. Historical item IDs, saved history, original 38 bundled audio files, writing, speaking and existing recordings are retained.

The 773 new activities use distinct, separately graded Listening tasks based on 50 campus-case dossiers and 50 academic topic dossiers (49 complete four-variation dossiers for conversations, announcements and talks). Variants revisit a subject but use different prompts, dialogue structures, listening objectives, or question emphases. **These are 200 activity screens per type, not 200 entirely unrelated subject areas per type.**

## Requirements from Chapter 3

1. **Choose a Response:** one short spoken prompt, four written choices, one most socially/contextually appropriate response; original and new exercises include polite requests, implied advice, statements, information inquiries and everyday campus contexts.
2. **Conversation:** two speakers in a campus/social exchange of up to approximately 100 words; two single-best-answer multiple-choice questions. Practice includes intention, personal attitude, implications, purpose and method of explanation.
3. **Announcement:** short spoken campus notices within the guide's typical 85-word limit; two MCQs grounded in purposes, deadlines, clarifications, audience needs and reasonable inferences.
4. **Academic Talk:** short focused spoken exposition of no more than 250 words, with four MCQs testing big picture, important stated evidence, justified inferences, purposeful examples, organization and speaker attitude.

The six comprehension question types described in Chapter 3 are **Main Idea, Factual, Inference, Purpose, Method and Attitude**. Choose a Response instead tests the conversational skill of **Response Appropriateness**.

Answer review identifies the type, gives the correct choice and context, explains each of the three incorrect answers, and offers a guide-aligned strategy. Difficulty labels Easy / Medium / Hard / Mixed are educational classifications, **not ETS-calibrated levels**.

## Listening practice modes

**Study mode**: review the listening activity, press *Play audio*, replay if needed and optionally open the transcript. Questions can be checked for immediate feedback. Choose a random item within each task category or browse the complete list; uncompleted work is prioritized.

**Listening circuit**: one activity from each of the four tasks, in order. One response + two conversation + two announcement + four academic = **9 questions**.

**Listening full rehearsal**: a single **47-question, 25-activity**, non-adaptive examination-like sequence:

- Stage 1: eight Choose-a-Response prompts (8) + four Conversations (8) + four Announcements (8) + two Academic Talks (8) = **32 answers**.
- Stage 2: three Choose-a-Response prompts (3) + one Conversation (2) + one Announcement (2) + two Academic Talks (8) = **15 answers**.
- **Total = 32 + 15 = 47 questions**, selected randomly, with no activity duplicates in a session. The same 29-minute study countdown covers the entire Listening section.
- Full rehearsal hides transcripts, allows one audio playback per activity, reveals choices when playback finishes, does not show the answer key until the end, and offers no back navigation. Results are stored in the original browser progress format.

**Important limitations:** Stage 2 is **not genuinely adaptive**; the app does not perform ETS's official routing, calibrated difficulty selection, scoring, or real module-level timing restrictions. The 29-minute practice timer is a single continuous section timer, not separate official stage clocks. Playback requires a user gesture because browsers restrict automatic speech/audio.

## Audio source and fidelity

The **38 original WAV audio files remain bundled** and unchanged. The 773 additional Listening activities use **browser-based English text-to-speech**, rather than claiming that pre-generated studio-quality MP3 files exist. For conversations the site removes 'Woman:' and 'Man:' spoken labels and alternates two English voices when at least two are installed. When only one usable English voice is available, both turns may sound the same. Users can choose an English browser voice and study replay speed under Settings; the mock always plays at normal rate.

**Browser voice naturalness, pronunciation, ability to synthesize audio and gender distinction differ by device and browser.** This is not an official native-speaker recording set, and the questions have not been subjected to psychometric calibration or an external human TOEFL-item audit. It is suitable for independent repeatable Listening practice with these clearly disclosed limitations.

## Continuous validation and packaged delivery

CI scripts validate all activity counts, question numbers, scripts' word limits, answer uniqueness, option-specific rationales, all Chapter 3 question families, reading compatibility, original item IDs and unchanged storage key. Playwright checks browse and answer grading for all four types, two-voice narration simulation, all four random selectors, the nine-answer circuit, 32+15 mock sequencing, one-play behavior, hidden transcripts and audio completion gating, original 60-screen form, and site delivery from the **/toefl_practice_/** Pages path. The workflow also extracts and tests both release ZIPs before committing the direct-download archives.

Manual upload only when needed: extract the **prebuilt** GitHub Pages ZIP, then upload **index.html**, **assets/**, **audio/**, **collections/**, **docs/**, **LICENSE.txt**, **PUBLISHING.txt**, **THIRD_PARTY_NOTICES.md** to the root of the `main` branch. Retain Pages settings *Deploy from a branch → main → / (root)*. No local npm/Node/build is required.

The **editable** project ZIP contains all listening and reading content generators, tests, bundled frontend JavaScript/CSS, documentation and the release workflow. The original unminified React source was never included in the initial repository, so it is not present in this release.
