// Original practice material. Each line is context | fixed opening | ordered chunks | ending | extra | explanation.
// Chunks, rather than capitalization or punctuation, determine the exact one-point key.
const sentenceSets = [
`I need to borrow a laptop for tomorrow's seminar.| |Can / I / borrow / a laptop / from the media desk|?|borrowing|Can comes before the subject I in this yes/no question. Borrow stays in its base form after the modal.
The workshop starts tomorrow, but I lost the schedule.| |What time / does / the workshop / begin|?|begins|What time introduces the question; does comes before the singular subject. Use begin, not begins, after does.
I cannot find the application form.|Do you know |where / the application form / is / available|?|does|An embedded question uses subject before verb: the application form is. The question inversion is already in Do you know.
Someone left a blue folder on my desk.| |Who / left / this blue folder / on your desk|?||Who is the subject, so no do or did is needed. Left directly follows who.
Is this the tutor you mentioned yesterday?|Yes, she is the tutor |who / helped / me / with my presentation|.||Who refers to a person and serves as the subject of the relative clause. Helped takes me as its object.
Can we reserve the practice room now?|We can reserve it |if / nobody else / has / a booking|.||The condition uses the present tense after if. Nobody else is singular, so has is required.
Why is the east entrance closed?|The entrance |is / being / repaired / this week|.||The present continuous passive is is being repaired. The entrance receives the action.
Will you need another library orientation?|No, I |have already / attended / two orientation sessions|.||Have attended links past experience to the present need. Already goes between the auxiliary and past participle in this supplied structure.
Which room would suit our large group?|The room upstairs is |large enough / to accommodate / all of us|.||Enough follows the adjective large and is followed by an infinitive expressing what the room can accommodate.
I am nervous about speaking at the meeting.|The coordinator encouraged |me / to share / my ideas / with the group|.||Encourage takes an object followed by to plus a base verb: encouraged me to share.`,
`I think the printer has stopped working.| |Have / you / checked / the paper tray|?|Did|The present perfect question places have before you and uses the past participle checked. Did would require the base form check.
I want to join the weekend cleanup.| |Where / should / the volunteers / meet|?||Where asks for a place and is followed by the modal should, the subject the volunteers, and the base verb meet.
The signup link no longer works.|I wonder |whether / the registration deadline / has / passed|.|did|After wonder, whether introduces an indirect yes/no question with statement word order: the deadline has passed.
We still need someone to lead the tour.| |Which student / knows / the campus / best|?||Which student is the subject of the question. Knows agrees with that singular subject; no auxiliary inversion is needed.
I liked the exhibition you recommended.|The artist |whose / paintings / you admired / will visit / our class|.||Whose shows possession and modifies paintings. The whole relative clause describes the artist, the subject of will visit.
I cannot attend both sessions.|If I |attended / the morning session, / I would / miss / my lab|.||This hypothetical condition pairs a past form in the if-clause with would plus a base verb in the result. The fixed if-clause ends before I would.
Who arranged the chairs for the concert?|They |were / arranged / by / the student volunteers|.||The past passive uses were arranged because they refers to plural chairs. By introduces the people who did the work.
Is the travel office still processing your request?|Yes, they |have / been / reviewing / it / since Monday|.||Have been reviewing describes an activity continuing from Monday to now. Since marks the starting point.
Both routes seem convenient.|The river path is |less / crowded / than / the main road|.||Less modifies crowded, and than introduces the comparison with the main road.
How did your team avoid delays?|We made a checklist |so that / everyone / could track / the remaining tasks|.||So that introduces the purpose; everyone is the subject of could track.`,
`The guest speaker is waiting downstairs.| |Could / someone / show / her / to the lecture hall|?||Could precedes the subject someone; show is the base verb. Her is the object, followed by the destination.
I missed yesterday's review session.| |What / did / the instructor / recommend / for the final exam|?|recommended|Did carries the past tense, so recommend must remain in its base form. What is the object of recommend.
I am not sure which bus to take.|Can you tell me |which bus / stops / outside / the science building|?|do|Which bus is the subject inside this embedded question. The singular verb stops follows it directly.
The online form asks for an advisor's signature.| |Whose signature / is / required / on this form|?||Whose signature is the subject. The passive is required agrees with the singular noun signature.
How did you choose your partner for the project?|I chose someone |with whom / I / had worked / before|.||The preposition with goes with worked; whom is its object. Had worked places that collaboration before the choice.
The projector is unavailable today.|Unless we |find / another projector, / we will / need / printed handouts|.||Unless means if we do not. Use present find for the future condition and will need for its result.
Is the conference schedule final?|The schedule |will / be / published / after the speakers confirm|.||The future passive is will be published. The after-clause uses present confirm to refer to a future event.
Were you still collecting data when the lab closed?|No, we |had / finished / collecting data / before it closed|.||Had finished places completion before the later past event. Finish takes the -ing form collecting.
Was the lecture difficult to follow?|It was |not as / complicated / as / I had expected|.||The not as ... as construction expresses a lower degree than expected. The adjective stays in its ordinary form.
What did you decide about the optional workshop?|I decided |to attend / it / despite / my busy schedule|.||Decide takes a to-infinitive. Despite is followed by the noun phrase my busy schedule, not a complete clause.`,
`The equipment must stay in this room.| |Do / all students / need / permission / to use it|?|needs|Do agrees with plural all students and precedes the subject. Need remains in the base form.
I heard the café is changing its hours.| |When / will / the new hours / take effect|?||When introduces the time question; will precedes the subject, followed by base-form take.
My package has not arrived.|I would like to know |why / the delivery / has / been delayed|.|did|An indirect question uses the delivery has been delayed. Has been delayed is present perfect passive.
There are three proposals on the table.| |Which proposal / offers / the most practical / solution|?||Which proposal is the singular subject of offers. The most practical modifies solution.
Is that the notebook you were searching for?|Yes, it is the notebook |that / I / left / in the auditorium|.||That introduces a relative clause modifying notebook and is the object of left; I is the subject.
I did not know the meeting had been moved.|If you |had checked / your email, / you would have / seen / the announcement|.||The past unreal condition uses had checked and would have seen. It describes a past action that did not happen.
Can students borrow these reference books?|These books |must / be / kept / inside the library|.||A modal passive uses must be plus the past participle kept. Books receive the action.
Have you chosen your courses yet?|I |have / not / decided / which courses / to take|.||Have not decided is present perfect negative. Which courses to take is an embedded infinitive question.
How long is the new shuttle route?|It is |twice as / long / as / the old route|.||Twice as ... as compares extent. Long belongs between the two as elements.
The survey deadline is very soon.|We need |to remind / the participants / to submit / their responses|.||Need takes to remind, and remind takes an object plus another to-infinitive: remind the participants to submit.`,
`I cannot hear the announcement clearly.| |Would / you / mind / closing / the window|?||Would you mind is followed by an -ing form. Closing is required, rather than to close.
The team has not selected a leader.| |How / are / you / going to / make the decision|?||The be going to question puts are before you, with the base verb make after to.
The article mentions a new campus service.|Could you explain |how / the new service / works|?|does|After explain, the indirect question keeps subject-verb order. Works agrees with singular service.
Something caused the alarm to go off.| |What / caused / the alarm / to sound|?||What is the subject of caused. Cause takes an object and a to-infinitive: caused the alarm to sound.
I need a quiet place to rehearse.|There is a room |where / students / can practice / without disturbing others|.||Where introduces a relative clause describing a place. Can is followed by the base verb practice.
We have only one empty seat.|Even if you |arrive / early, / you may / have to / stand|.||Even if introduces a condition that does not guarantee a seat. Present arrive is followed by the possible result may have to stand.
Why are the paintings wrapped in paper?|They |are / being / protected / from dust|.||The progressive passive are being protected describes an action happening now to plural paintings.
Do you still need to complete the safety course?|By next Friday, I |will / have / completed / all the required training|.||Will have completed is future perfect, marking completion before a specified future point.
How did the second rehearsal compare with the first?|It went |much / more smoothly / than / the first one|.||Much strengthens the comparative adverb more smoothly. Than introduces the first rehearsal as the comparison.
Do you regret missing the open lecture?|Yes, I wish |I / had attended / the lecture|.||Wish plus past perfect expresses regret about a past event. Had attended describes the unreal alternative.`,
`I want to ask about the assignment deadline.| |May / I / speak / to the course coordinator|?||May comes before I in a polite permission question. Speak stays in its base form.
We have not received a reply from the venue.| |Why / hasn't / the manager / answered / our message|?||The negative auxiliary hasn't precedes the subject. Answered is the past participle required by has.
I cannot remember the fee for the trip.|Do you remember |how much / the trip / costs|?|does|The embedded question takes the trip costs, without does. How much asks for the amount.
Someone has booked the last practice slot.| |Who / has / booked / the last available slot|?||Who is the subject and is followed by has booked. The auxiliary is part of the present perfect, not subject inversion.
Can you recommend a useful study group?|The group |that meets / on Thursdays / is / especially helpful|.||The relative clause that meets on Thursdays modifies group. Is is the main verb of the sentence.
I cannot upload the file without internet access.|As soon as I |get / online, / I will / send / it to you|.||A time clause referring to the future uses present get; the main clause uses will send.
The organizer has not chosen the finalists yet.|The finalists |have / not / been / selected|.||The negative present perfect passive is have not been selected. The plural subject requires have.
Did the lab assistant explain the procedure before you began?|Yes, she |had / explained / each step / before we started|.||Had explained marks the explanation as earlier than the past event started.
I cannot read the tiny writing on this map.|The labels are |too small / for me / to read|.||Too plus adjective describes an excessive degree; for me identifies who cannot perform the infinitive action.
Why did you choose a morning appointment?|Taking an early appointment |allows / me / to attend / my afternoon class|.||The -ing phrase Taking an early appointment is a singular subject, so it takes allows. Allow takes an object plus to-infinitive.`,
`The instructor said the discussion would be recorded.| |Is / everyone / comfortable / with being recorded|?||Is precedes everyone in this question. With takes the -ing passive being recorded.
I need to contact the person who manages room bookings.| |Who / should / I / contact / about a reservation|?||Who is the object of contact; should precedes the subject I. The modal takes base-form contact.
The budget changed, but nobody explained the details.|I do not understand |why / the committee / reduced / our funding|.|did|The indirect question uses the committee reduced, without did. Our funding is the object.
One of these keys opens the storage cabinet.| |Which key / opens / the cabinet / beside the desk|?||Which key is the subject; the singular verb opens follows it. Beside the desk identifies the cabinet.
I met an impressive researcher at the poster session.|She studies a problem |that / very few people / have examined / in detail|.||That is the object of have examined in the relative clause; very few people is the plural subject.
I cannot join the excursion because I have a shift at work.|If I |did not have / to work, / I would / join / the excursion|.||The present unreal condition uses did not have and would join. After did, have is in the base form.
Has anyone told the volunteers about the change?|All the volunteers |should / have / been / informed / by now|.||Should have been informed is a perfect modal passive, expressing an expected completed notification.
Why were you so tired at the meeting?|I |had / been / studying / for hours / before it began|.||Had been studying emphasizes the duration of a continuing activity before a later past event.
Was the second speaker persuasive?|Her argument was |far / more convincing / than / I expected|.||Far can intensify the comparative more convincing. Than introduces the comparison with the expectation.
How can we make the handout more useful?|The tutor suggested |adding / a diagram / to explain / the process|.||Suggest takes an -ing complement: suggested adding. To explain gives the purpose of the diagram.`,
`I am ready to submit the proposal.| |Have / all the references / been / checked|?||The present perfect passive question starts with have, followed by the plural subject and been checked.
I heard your research group is moving.| |Which building / will / your group / move into|?||Which building is the object of move into. Will precedes the subject; the preposition remains after move.
I cannot see the presentation on the shared drive.|Please check |whether / the file / has / been uploaded|.|did|Whether introduces an embedded yes/no question. The file has been uploaded uses statement order and passive voice.
Something in this report needs revision.| |Which section / needs / the most / revision|?||Which section is the subject and takes needs. The most modifies the amount of revision.
I finally found a course that fits my schedule.|It is a course |whose / weekly assignments / can be completed / online|.||Whose links the course to its assignments. The passive can be completed describes what can happen to those assignments.
The application closes at noon.|You can still apply |provided that / you / submit / the form / before noon|.||Provided that introduces the condition. The time condition uses present submit even though it concerns the future.
Does anyone still use the old computer lab?|It |has / been / converted / into a study lounge|.||The present perfect passive has been converted describes a completed change with a present result.
Will the assistant be available at ten?|At ten, she |will / be / helping / another student|.||Will be helping is future continuous, describing an activity in progress at a future time.
Was the workshop as practical as you hoped?|It was |even / more practical / than / I had hoped|.||Even intensifies more practical. Had hoped places the expectation before the actual workshop.
What is the best way to prepare for the interview?|It is useful |to practice / answering / questions / with a partner|.||Useful takes a to-infinitive; practice takes an -ing complement. This gives to practice answering.`,
`The bus stop has moved to the south gate.| |Does / this bus / still / stop / near the library|?||Does precedes the singular subject. Still fits between subject and base verb stop in these supplied chunks.
The advisor asked for more information.| |What information / does / she / need / from us|?||What information is the object; does comes before she and takes base-form need.
The course list is confusing.|I cannot tell |which courses / are / open / to first-year students|.|is|Which courses is the plural subject inside the embedded question, followed by are open.
One student discovered an error in the table.| |Who / noticed / the error / in the results table|?||Who is a subject question word and is followed directly by noticed. There is no need for did.
Why is this café popular with students?|It is the only café |that / stays / open / after midnight|.||That is the subject of stays in a relative clause about café. Singular café requires stays.
I cannot approve the poster until the date is confirmed.|Once the date |is / confirmed, / we can / print / the posters|.||The time clause uses present passive is confirmed; the main clause uses modal can plus print.
Can visitors enter the archive without an appointment?|An appointment |must / be / made / in advance|.||Must be made is a modal passive. In advance tells when the appointment needs to be made.
Are you still waiting for your results?|Yes, I |have / been / waiting / since last week|.||Have been waiting describes an activity continuing to the present; since introduces its starting point.
How does the revised plan compare with the original?|It requires |fewer / resources / than / the original plan|.||Fewer modifies the countable plural resources. Than introduces the plan being compared.
Why did the organizer send everyone a reminder?|She wanted |to make sure / that everyone / knew / the new location|.||Wanted takes the to-infinitive to make sure, followed by a that-clause. Knew matches the past reporting context.`,
`We may need another person for the experiment.| |Can / one of your classmates / help / us / this afternoon|?||The modal can precedes the subject phrase one of your classmates. Help stays in the base form regardless of subject number.
I need an estimate for printing the program.| |How much / would / printing fifty copies / cost|?||The -ing phrase printing fifty copies is the subject. Would precedes it and takes the base verb cost.
The forms look different this semester.|Could you tell me |what / has / changed / on the forms|?|did|What is the subject of the embedded question. Has changed is present perfect; no extra subject or auxiliary is required.
One room has a working projector.| |Which room / has / the projector / that we need|?||Which room is the subject and has is its main verb. That we need modifies projector.
Did you meet the librarian who helped us?|Yes, the librarian |to whom / we spoke / was / very knowledgeable|.||To whom introduces the relative clause because we spoke to the librarian. Was is the main verb agreeing with librarian.
I forgot to bring the tickets.|If you |had reminded / me, / I would have / brought / them|.||Had reminded pairs with would have brought in a past unreal condition. Brought is the past participle of bring.
Are students allowed to photograph the paintings?|Photography |is / not / permitted / in this gallery|.||The present passive negative is is not permitted. Photography is singular.
Did the new app solve the scheduling problem?|It |has / made / it easier / to arrange / group meetings|.||Has made expresses a present result. The pattern make it easier to do something uses it as a placeholder object.
Why are you using the second entrance?|It is |the most / accessible / entrance / in the building|.||The superlative the most accessible compares this entrance with all the others in the building.
What did the technician advise you to do?|She advised |me / not to restart / the computer / during the update|.||Advise takes an object and a to-infinitive. Not precedes to to make that infinitive negative.`,
`I might need to change my lab section.| |Would / it / be / possible / to switch sections|?||The polite question places would before it, followed by base-form be. Possible takes a to-infinitive.
I heard the student council approved the proposal.| |When / was / the proposal / approved|?||The past passive question uses was before the singular subject and approved as the past participle.
Nobody has explained the new recycling system.|I am not sure |how / the new system / is / supposed to work|.|does|The indirect question uses subject before is. Is supposed to work describes the intended operation.
One of these instructions is unnecessary.| |Which instruction / can / we / leave out|?||Which instruction is the object of leave out. The modal can precedes the subject we.
Is that the student who organized the fundraiser?|Yes, she is the student |whose / idea / inspired / the whole campaign|.||Whose shows that the idea belonged to the student. Idea is the singular subject of inspired inside the relative clause.
The event may be canceled if it rains.|Even if it |rains / tomorrow, / we will / hold / the workshop indoors|.||The condition takes present rains and the main clause uses will hold. Indoors describes the alternative arrangement.
Why are these survey responses anonymous?|Personal details |were / removed / before / the data was shared|.||The past passive were removed agrees with plural details. Before introduces the later event.
Had the students used the software before the course?|Most of them |had / never / used / it / before|.||Had never used is past perfect negative, expressing no prior experience before the course began.
Can everyone see the board from the back row?|The writing is |not / clear enough / for everyone / to read|.||Enough follows clear; the for-phrase identifies the readers and the infinitive names the action.
Why did you take notes during the visit?|I took notes |in order to / remember / the details / more accurately|.||In order to introduces a purpose and takes base-form remember. More accurately modifies remembering.`,
`The office has not confirmed my appointment.| |Should / I / call / them / again|?||Should precedes I in this advice-seeking question and is followed by base-form call.
The seminar has a long waiting list.| |How many students / have / registered / for the seminar|?||How many students is the plural subject. Have registered follows it as present perfect; there is no separate subject to invert.
I want to find out about evening access.|Do you know |whether / students / are allowed / to stay / after six|?|is|Whether introduces an indirect yes/no question. Students are allowed keeps statement order and uses a passive construction.
Two of the proposed dates conflict with exams.| |Which dates / conflict / with / the exam schedule|?||Which dates is the plural subject, so conflict has no -s. With introduces what the dates conflict with.
We need a tool that everyone can use.|The platform |that you recommended / seems / suitable / for our team|.||The relative clause that you recommended modifies platform. Seems is the main verb and agrees with that singular subject.
I have not saved enough for the trip.|If the fee |were / lower, / more students / would be able / to participate|.||Were lower introduces a hypothetical present condition. Would be able to participate gives its result.
Will the lab be ready when the visitors arrive?|All the equipment |will / have / been / installed / by then|.||Will have been installed is future perfect passive: installation will be complete before the visitors arrive.
Why did you recognize the speaker's name?|I |had / read / one of her articles / before the lecture|.||Had read is past perfect, marking reading before the lecture. Read is spelled the same in base and participle forms.
Did the extra practice help your presentation?|I felt |considerably / more confident / than / I had felt before|.||Considerably intensifies more confident. Than introduces the earlier confidence level.
How did you finish the report so quickly?|My partner helped |me / organize / the evidence / into clear sections|.||Help permits an object followed by a bare infinitive: helped me organize. Into introduces the resulting arrangement.`
];

export const sentences = sentenceSets.map((set, form) => set.trim().split('\n').map((line, i) => {
  const [context, prefix, chunks, suffix, extra, explanation] = line.split('|');
  return {id:`w${String(form+1).padStart(2,'0')}-s${i+1}`,context,prefix:prefix.trim(),chunks:chunks.split(' / '),suffix,extra:extra?[extra]:[],explanation};
}));
