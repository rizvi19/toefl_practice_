const s=(prompt,prefix,tiles,suffix='.',extra,explanation)=>({prompt,frame:[prefix,suffix],solution:tiles.split(' / '),extra,explanation});
export const writing=[
[
s('The workshop has a waiting list.','','How / many / people / are / already / on it','?',undefined,'How many asks about a count; are precedes the subject in the direct question.'),
s('I left my water bottle in the seminar room.','','Did / you / check / whether / it / was there','?','was','The outer question uses Did you check; whether introduces statement order.'),
s('The display opens on Friday.','We need','to / finish / the labels / before / the visitors / arrive',' on Friday.',undefined,'Before introduces a time clause using present tense for a future event.'),
s('Nadia cannot come to the rehearsal.','','Who / will / take / her place / in / the final scene','?',undefined,'Who is the subject of will take; no added subject pronoun is needed.'),
s('I don’t understand this part of the application.','Could you explain','what / information / they / expect / us / to provide','?','do','The embedded clause keeps they before expect; expect takes an object and infinitive.'),
s('The old meeting room is being repaired.','The group','has / been / meeting / in / a / smaller room',' since last month.',undefined,'Present perfect progressive describes an activity continuing from a past starting point.'),
s('The team changed the original plan.','They chose','a route / that / could be completed / without / crossing / the busy road','.',undefined,'That introduces a relative clause; could be completed is passive.'),
s('The results surprised the organizers.','Fewer','students / registered / for the evening session / than / they / had expected','.',undefined,'The comparison uses fewer with students and a past-perfect earlier expectation.'),
s('We still need a person to review the budget.','','Would / you / be / willing / to check / the figures','?','checking','Be willing takes a to-infinitive, not an -ing complement.'),
s('The equipment arrived after the practical class.','If it','had arrived / earlier, / we / could have used / it / during the lesson','.',undefined,'An unreal past condition uses had arrived and a modal perfect result.')
],
[
s('The student film club meets every week.','','Where / do / the / members / usually watch / the films','?',undefined,'A direct location question uses do before the plural subject.'),
s('Someone sent the corrected map to the group.','','Who / sent / the map / with / the revised / meeting point','?',undefined,'Who is the subject, so the past verb sent needs no additional auxiliary.'),
s('Our reserved room is on the top floor.','Do you know','whether / the lift / will be working / by / tomorrow / morning','?','will','Whether introduces statement word order inside the outer question.'),
s('The librarian found the book for me.','It was','the copy / that / I / had requested / through / another library','.',undefined,'The object relative clause connects the copy with the earlier request.'),
s('Sam’s explanation was useful.','He showed','us / how / the different parts / fit / together / inside the case','.',undefined,'Showed takes us as recipient and an embedded how-clause.'),
s('The committee wants a shorter summary.','We should','include / the main findings / rather than / list / every / individual response','.',undefined,'Should governs include; rather than coordinates a contrasting action.'),
s('You can borrow the recorder for the weekend.','It must','be returned / to the desk / before / the next group / collects / its equipment','.',undefined,'The passive follows must, and the time clause uses present tense.'),
s('The course has become quite popular.','This year, more people','have / applied / for / places / than / the department can accept','.',undefined,'The comparison links completed applications with present capacity.'),
s('I’m trying to arrange the interview.','','What / time / would / be / convenient / for you','?','is','What time is the subject of would be; a second finite verb is unnecessary.'),
s('I forgot to keep a copy of my first notes.','I wish','I / had saved / them / before / changing / the original file','.',undefined,'I wish plus past perfect expresses regret about a past action.')
],
[
s('The shuttle goes to the sports center.','','How / often / does / it / leave / the main gate','?',undefined,'How often asks about frequency; does takes the base verb leave.'),
s('I’m unsure which version of the form is current.','Please check','which / one / has / the latest / date / at the top','.',undefined,'Which one is the subject of the embedded clause.'),
s('The new students have not visited the laboratory.','They need','someone / to show / them / where / the safety equipment / is kept','.',undefined,'Someone takes an infinitival modifier; where introduces a passive clause.'),
s('I think the interview went well.','The researcher','seemed / interested / in / the examples / that / I described','.',undefined,'Interested takes in; that introduces an object relative clause.'),
s('Our class will submit one joint report.','','Have / all / the group members / agreed / on / the final wording','?','agree','Present perfect question order uses Have before the subject and agreed as participle.'),
s('The poster looked different after printing.','We discovered','that / the colors / were / less distinct / than / on the screen','.',undefined,'The reported discovery contains a comparison with less distinct than.'),
s('Some participants could not hear the instructions.','The speaker','asked / them / to move / closer / to / the microphone','.',undefined,'Asked takes an object followed by a to-infinitive.'),
s('We can meet after your lecture.','I will','wait / near the entrance / until / you / have finished / talking to the tutor','.',undefined,'Until introduces a time clause; present perfect can mark its completed action.'),
s('The article refers to several earlier studies.','','Which / of those studies / provides / the strongest / evidence / for the claim','?','provide','Which of those studies has a singular head, requiring provides.'),
s('The room was available, but nobody told us.','Had we known,','we / would have held / the meeting / there / instead of / cancelling it','.',undefined,'Had we known is an inverted past condition; the result uses would have held.')
],
[
s('I need to contact the person organizing the visit.','','Who / is / responsible / for / sending / the final schedule','?',undefined,'Responsible takes for plus an -ing form; who is the subject.'),
s('The tour starts beside the old market.','','Do / we / need / to arrive / before / half past ten','?','needed','The direct question uses Do with base-form need and a following infinitive.'),
s('The lecturer mentioned a change to the reading list.','Did she say','which / chapter / we / should read / before / the next class','?',undefined,'The embedded question places we before should read.'),
s('The afternoon workshop filled very quickly.','It was','so / popular / that / the organizers / offered / another session','.',undefined,'So plus adjective and that-clause expresses a result.'),
s('I borrowed a bicycle from the university.','The bicycle','that / I / was given / had / a basket / on the front','.',undefined,'That introduces the object relative clause; had is the main verb.'),
s('Our group has several suggestions for the room.','We would like','more / space / for / students / to work / together',' after class.',undefined,'The noun phrase more space is followed by a for-object infinitive.'),
s('The speaker’s train was delayed.','Although she','could not / come in person, / she / joined / the discussion / online','.',undefined,'Although introduces the contrasting subordinate clause.'),
s('You have already interviewed six people.','','How / many / more / do / you / plan to interview','?','does','The direct question uses do with you; how many more is the object.'),
s('This explanation is easier to follow.','It makes','the relationship / between / the two ideas / much / clearer / than before','.',undefined,'Make takes an object and adjective complement; much modifies the comparative.'),
s('The final design uses fewer parts.','It can','be repaired / more easily / because / each part / is / accessible','.',undefined,'The passive modal phrase is followed by a because-clause explaining the advantage.')
],
[
s('The campus shop has changed its opening hours.','','When / does / it / close / on / Friday evenings','?',undefined,'A direct question with does requires the base verb close.'),
s('My tutor asked about our project.','She wanted','to know / how / we / had collected / the information / for the report','.',undefined,'The embedded how-clause retains subject-before-verb order.'),
s('The form was sent without the final page.','You should','ask / them / to send / the missing page / as / an attachment','.',undefined,'Ask takes an object and a to-infinitive; as specifies its form.'),
s('The group needs someone to check the equipment.','','Is / there / anyone / who / knows / how it works','?','know','Anyone is singular, so the relative clause takes knows.'),
s('I finally found a quiet place to study.','It is','the small room / next to / the stairs / that / few people / seem to notice','.',undefined,'That connects the room with an object relative clause.'),
s('Some of the old records were difficult to read.','We compared','them / with / other copies / so that / we / could check the dates','.',undefined,'So that introduces the purpose of comparing copies.'),
s('The discussion gave us a useful new idea.','We had','not considered / using / the empty space / for / a shared / reading area','.',undefined,'Considered takes an -ing complement; for introduces the proposed use.'),
s('The interview is scheduled for tomorrow morning.','','Have / you / been told / where / you / should wait','?','did','The outer present-perfect passive question contains an embedded where-clause.'),
s('We changed the route after checking it on foot.','The revised route','is / shorter / than / the one / that / we originally planned','.',undefined,'The comparative phrase is followed by a relative clause modifying the one.'),
s('The event was successful because everyone helped.','Without their help,','we / would not have finished / all the preparations / before / the visitors / arrived','.',undefined,'A modal-perfect result describes the unreal past situation without the help.')
]
];
export const emails=[
{to:'Ms. Cole, equipment coordinator',subject:'Request about a demonstration kit',scenario:'You reserved a demonstration kit for a student workshop on Friday. When you collected it, one of the items listed in the booking confirmation was missing. The workshop can still take place if the item is supplied or a suitable alternative is arranged. Write to the equipment coordinator.',points:['Identify your booking and explain what is missing.','Explain how the missing item affects the planned workshop.','Request a practical solution and say when you are available to collect it.']},
{to:'Dr. Raman, course instructor',subject:'Suggestion for the project feedback session',scenario:'Your class has a feedback session scheduled for its group projects. Several groups will present, and you are concerned that the current schedule leaves little time to discuss each project. You have an idea that could make the feedback more useful without extending the session. Write to the instructor.',points:['Explain your concern about the current arrangement.','Describe your proposed change to the session.','Explain how the change would benefit the class and offer to help.']},
{to:'Alex, residence activities organizer',subject:'Helping with the residence welcome event',scenario:'You agreed to help visitors find their way around at a residence welcome event. A change to your class schedule means you cannot be present for the first hour. You still want to contribute, and you know some preparation work is needed before the event. Write to Alex.',points:['Explain the schedule conflict and state when you can attend.','Suggest how you could help before or during the event.','Ask Alex to confirm which arrangement would be most useful.']},
{to:'Mr. Evans, archive librarian',subject:'Preparing for an archive appointment',scenario:'You have booked an archive appointment to research how your town’s public spaces have changed. Since making the booking, you have narrowed your topic to one neighborhood and a shorter period. You want the librarian’s advice so you can make good use of the appointment. Write to the librarian.',points:['Explain how your research focus has changed.','Identify the kinds of material you hope to consult.','Request advice about preparation and any changes needed to your appointment.']},
{to:'Maya, community project partner',subject:'A change to our community exhibition plan',scenario:'You and Maya are arranging a small exhibition of local residents’ photographs. The space you planned to use is no longer available, but you have found another possible location. You need to discuss the change before confirming it. Write to Maya.',points:['Explain why the original location cannot be used.','Describe the alternative and one advantage or limitation.','Suggest a next step and ask for Maya’s opinion before you confirm.']}
];
export const discussions=[
{professor:'Professor Ellis',question:'Our class is considering how universities should improve student life with a limited budget. Some people favor extending the hours of existing facilities; others favor creating new activities during normal hours. Which approach should receive priority? Explain how your choice would address a real student need.',students:[['Lina','I would extend opening hours. Many students have classes or jobs during the day, so an excellent facility is not useful to them if it closes before they can get there. Better access could help without constructing another building.'],['Omar','I would add new activities. Longer hours may benefit the same students who already use a facility. New activities could attract people who have not found anything that interests them and help them feel part of the university.']]},
{professor:'Professor Moreno',question:'In a course where students learn a practical skill, should instructors give detailed step-by-step directions or allow students to discover methods through trial and error? What balance would you recommend, and why? Consider both the quality of learning and the difficulties students may face.',students:[['Eva','Clear directions should come first. Beginners can spend a lot of time repeating the same mistake without understanding it. Once they know a reliable method, they can try variations and compare the results.'],['Noah','I would allow more discovery. When students have to decide what to try, they become active problem-solvers. If the instructor explains every step in advance, students may finish the task without learning how to approach a new one.']]},
{professor:'Professor Shah',question:'A city is creating information for visitors. It can invest in an interactive phone service or in more signs and printed maps around the city. Which investment would be more valuable? Support your view, considering how different visitors might use the information.',students:[['Mina','A phone service would be better because information can be updated immediately. It could also suggest routes based on a visitor’s interests. Printed maps may be out of date before they are distributed.'],['Leo','I prefer better signs and maps. They work without a charged phone or internet connection. Clear information in the environment also lets people look around and talk to each other rather than constantly checking a screen.']]},
{professor:'Professor Duarte',question:'When evaluating a group project, should a university place more emphasis on the final product or on evidence of the process used to create it? Explain your position and discuss why your preferred approach would lead to fairer or more useful evaluation.',students:[['Nora','The final product should matter most. It shows whether the group achieved its goal, and evaluating the same outcome gives everyone a clear standard. A long record of effort should not outweigh a product that fails to work.'],['Idris','The process deserves more attention. A good result can partly come from luck or from one experienced member. Records of testing and revision reveal what students learned and how they responded when something did not work.']]},
{professor:'Professor Chen',question:'People increasingly rely on short summaries to keep up with information. Should schools encourage students to use summaries as a regular study tool, or should they place greater emphasis on reading complete source materials? Explain your view and how it would affect students’ learning.',students:[['Sara','Summaries are useful because students face more material than they can read in full. A well-written overview helps them identify important ideas and decide which sources deserve closer attention. That is a valuable skill in itself.'],['Ben','Complete sources should have priority. A summary may leave out the reasoning or uncertainty behind a conclusion. Students can repeat the main point without understanding why it is supported or where it might not apply.']]}
];
export const speaking=[
{context:'You are welcoming visitors to a campus workshop. Repeat each instruction exactly once.',repeat:[
'The workshop entrance is beside the garden.',
'Please leave large bags near the front desk.',
'You can collect a printed schedule from the table.',
'The morning session includes a short demonstration of the equipment.',
'Anyone who needs assistance should speak to a member of staff.',
'Before the practical activity begins, check that your work area is clear.',
'If you finish early, please leave your materials in place until the instructor checks them.'
],interviewContext:'A university researcher is interviewing students about the facilities they use on campus.',interview:[
'Tell me about a campus facility you use regularly. What do you usually do there, and why is it useful to you?',
'Describe a time when a shared facility was too busy or unavailable. How did you deal with the situation?',
'Some universities extend opening hours instead of building new facilities. What do you think is the main advantage or disadvantage of that approach?',
'Imagine you could recommend one change to a campus facility. What would you change, and how would it improve students’ experience?'
]},
{context:'You are listening to an introduction to a student media room. Repeat each instruction exactly once.',repeat:[
'The media room closes at six.',
'Headphones are stored in the lower drawer.',
'Please check your recording before you leave the room.',
'A staff member can help you choose the correct microphone.',
'All borrowed equipment must be returned before your booking period ends.',
'If the sound is unclear, try moving the microphone closer to the speaker.',
'Save a copy of your edited project where you can access it after the session.'
],interviewContext:'An interviewer is asking about how people learn practical skills.',interview:[
'What is a practical skill you have learned recently or would like to learn? Explain what interests you about it.',
'When learning something new, do you prefer watching someone demonstrate it or trying it yourself first? Describe an example.',
'What can a teacher do when a learner keeps making the same mistake? Explain why your suggested approach would help.',
'Some people say making mistakes is essential for learning. Do you agree with that statement? Explain your view and any limits you would place on it.'
]},
{context:'You are receiving instructions for a student field visit. Repeat each instruction exactly once.',repeat:[
'Our coach leaves from the east gate.',
'Please arrive ten minutes before the departure time.',
'The group will stop for lunch near the river.',
'You should bring comfortable shoes and something to write with.',
'Photographs are permitted unless a sign says that they are restricted.',
'If you become separated from the group, return to the main information desk.',
'Before we begin the return journey, make sure that all the members of your group are present.'
],interviewContext:'You have volunteered for a study about planning everyday journeys and visits.',interview:[
'Think of a place you enjoy visiting. Describe how you usually get there and what makes the visit worthwhile.',
'Tell me about a journey that did not go as planned. What happened, and what did you do?',
'When visiting an unfamiliar place, is it better to plan every activity or leave some time unplanned? Give reasons for your answer.',
'Imagine you are organizing a one-day visit for people with different interests. How would you decide on a plan that could work for the group?'
]},
{context:'You are hearing instructions before a group project presentation. Repeat each instruction exactly once.',repeat:[
'The presentation room is now open.',
'Please place your display beside the numbered sign.',
'Each group will have a few minutes for questions.',
'You may use the table to demonstrate how your model works.',
'Keep the space in front of your display clear for other visitors.',
'If your presentation includes a video, test the sound before the session begins.',
'After the event, return borrowed equipment to the staff member beside the door.'
],interviewContext:'An interviewer is interested in students’ experiences of working with other people.',interview:[
'Describe a group activity or project you have taken part in. What was your role in the group?',
'What do you find most useful about working with someone whose strengths are different from yours? Give an example.',
'Some groups divide a task into separate parts, while others work through it together. What are the advantages of your preferred approach?',
'Imagine two members of a group strongly disagree about the next step. What would you do to help the group move forward, and why?'
]},
{context:'You are learning how to use a university archive reading room. Repeat each instruction exactly once.',repeat:[
'The reading room opens at nine.',
'Please keep your bags in the lockers outside.',
'You can request more material from the service desk.',
'Use a pencil when taking notes beside the original documents.',
'The papers in each folder must remain in their present order.',
'If you find a damaged page, leave it where it is and tell a staff member.',
'Before returning a box, make sure you have removed your notes without moving the papers.'
],interviewContext:'A researcher is asking students how they find and evaluate information.',interview:[
'When you need information for an unfamiliar task, where do you usually begin? Explain why that starting point is useful.',
'Describe a time when two sources gave you different information. How did you decide what to trust?',
'Do you think short summaries help people understand complicated subjects, or can they create problems? Give reasons for your view.',
'Imagine a friend shares a surprising claim online without naming a source. How would you check it, and how would you discuss your findings with your friend?'
]}
];

// Reviewed grammatical alternative: the adverb can also precede the passive infinitive.
writing[3][9].acceptedOrders=[[1,0,2,3,4,5]];
