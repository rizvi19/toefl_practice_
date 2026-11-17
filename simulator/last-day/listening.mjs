import {q,audio as a} from './helpers.mjs';
// Each response row is an original spoken prompt, an appropriate reply, and three alternatives.
export const responses=[
[
['Would you mind keeping an eye on my suitcase while I get a ticket?','Sure, I’ll stay here until you return.','The tickets were cheaper last month.','I packed it before breakfast.','Yes, the station has several entrances.'],
['I thought the discussion was in this room.','They moved it to the room upstairs.','I thought your argument was convincing.','There are three rooms in my apartment.','Yes, this discussion was very helpful.'],
['How did your interview go?','Better than I expected, actually.','Through the main entrance.','It’s the person sitting near the window.','About three kilometers from here.'],
['Could you give me a hand with these chairs?','Of course. Where should we put them?','I handed in the form yesterday.','They were quite comfortable.','My hands are cold too.'],
['Is there any chance you could cover my shift on Friday?','I can, if you take my Sunday shift.','There should be some shade by then.','The clock is on the opposite wall.','Friday’s lecture covered the next chapter.'],
['The last bus has already left, hasn’t it?','Yes, we’ll need to find another way home.','No, I haven’t left my umbrella anywhere.','Yes, the driver is standing to your left.','I usually read on the bus.'],
['Where do I take these empty printer cartridges?','There’s a collection box beside the office.','The printer takes several kinds of paper.','I printed three copies of the document.','They were empty when I bought the desk.'],
['I’m not sure this paragraph supports your main point.','You’re right; I should explain the connection.','The paragraph is on the second page.','The main entrance closes at six.','I prefer to write with a blue pen.'],
['Has the maintenance team fixed the lift yet?','Not yet. They’re waiting for a part.','Yes, I lift weights twice a week.','The team finished the match early.','It was a useful part of the presentation.'],
['Which of these two posters is easier to read?','The one with the larger lettering.','I read both articles last night.','You can post it before five.','There are two lectures on the list.'],
['You don’t happen to know the Wi-Fi password, do you?','It’s written on the board near the desk.','Yes, I know where you live.','My computer is lighter than yours.','The board meets once a month.'],
['I was hoping to borrow your notes from Monday.','Certainly. I’ll send you a copy tonight.','Monday was unusually warm.','The notebook has a green cover.','I borrowed the book for a week.'],
['Why don’t we split the cost of a taxi?','Good idea. It would be affordable between us.','Because the receipt is already torn.','I paid the full price last time.','The taxi arrived ten minutes early.'],
['Does this train stop at the university?','Yes, it’s the next stop after Riverside.','No, I stopped studying an hour ago.','The university starts classes next week.','I prefer the window seat.'],
['I can’t believe I left the signed form at home.','Can someone at home send you a photo of it?','The sign says the office is closed.','I believe you signed up last term.','There are several forms of transport.'],
['When would be a good time to call you back?','After four, when my class is over.','The call was about your application.','I called from the library lobby.','My phone is in the back pocket.'],
['This draft is much clearer than the earlier one.','Thanks. Your comments helped me reorganize it.','It’s clear outside this morning.','The earlier bus leaves at seven.','I haven’t received the first draft yet.']
],
[
['Are you still using the scanner?','Just for one more page, then it’s yours.','The page numbers are at the bottom.','I used to study in that building.','There’s still some paper in the drawer.'],
['I’m afraid the cafe has run out of soup.','Then I’ll have a sandwich instead.','I usually run before breakfast.','The soup bowl is beside the sink.','Yes, I’m afraid of getting lost.'],
['Would it be all right if I opened the window?','Please do. It’s getting warm in here.','The window was repaired last summer.','I’m all right, thanks for asking.','Please open the next chapter.'],
['How long have you been waiting?','Only about five minutes.','At the entrance near the stairs.','Until someone moves the table.','The line is quite long today.'],
['You’ve met our new tutor, haven’t you?','Yes, she helped me with my outline yesterday.','No, the tutorial hasn’t started yet.','The new building is opposite the library.','I haven’t decided what to study.'],
['Could we put off the rehearsal until tomorrow?','That works for me; I need more practice anyway.','I put the instrument in its case.','The performance was very well received.','Tomorrow is the name of our new song.'],
['What did you make of the final chapter?','I found its argument persuasive, but a little rushed.','I made a copy for the discussion.','The chapter starts on page ninety.','It’s made from recycled paper.'],
['I wish I’d booked a seat sooner.','Maybe someone will cancel their reservation.','The seats were installed last year.','I usually book a quiet study room.','The sooner you arrive, the longer the lecture.'],
['Whose turn is it to collect the equipment?','Mine. I’ll go after lunch.','Turn left at the next corner.','The equipment works well outdoors.','We collected enough money last week.'],
['Is this the queue for returning library books?','No, returns go in the slot over there.','I’ve already read that book.','The queue moved quite quickly yesterday.','The library bought several new books.'],
['I don’t suppose you have a spare charger?','I do. You can use it until the meeting ends.','No, I don’t charge for tutoring.','The spare room is already occupied.','The meeting was shorter than expected.'],
['What’s the easiest way to get to the science museum?','Take the number six bus from the main gate.','The exhibit explains several easy experiments.','It was built more than a century ago.','The museum has six main galleries.'],
['Shall I make another copy for you?','Yes, please. This one is missing the last page.','I made it from a simple recipe.','It’s another building near the river.','You can copy the address from the sign.'],
['The deadline has been extended by a week.','That gives us time to check the figures.','Yes, the line extends around the building.','I spent a week collecting the equipment.','The figure is drawn in the first chapter.'],
['Do you know whether the workshop is suitable for beginners?','It is; no previous experience is required.','The workshop began half an hour late.','I know the instructor from another class.','There are beginner courses on Tuesdays.'],
['Could you speak a little more slowly?','Of course. Let me repeat the last part.','I spoke to her after the lecture.','There’s little time before it starts.','The slow train leaves from platform two.'],
['I think we’re talking at cross purposes.','Let’s clarify what each of us is trying to decide.','The crossing is beside the traffic lights.','I think the talk begins at noon.','We chose a topic for our next presentation.']
],
[
['Did anyone turn in a pair of glasses?','Let me check the lost-property drawer.','The glass doors open automatically.','I turned the light off before leaving.','The pair worked on the project together.'],
['Can I get you anything while I’m at the shop?','A notebook, if they have one without lines.','The shop was crowded yesterday.','I got there just before it closed.','There’s a line outside the building.'],
['I can barely hear the person at the back.','I’ll ask them to move closer to the microphone.','The back door is usually locked.','I heard about the event last week.','The microphone belongs to the department.'],
['Where should I leave the keys when I’m done?','In the envelope on the reception desk.','The main point is quite straightforward.','I finished the task yesterday afternoon.','The key was difficult to explain.'],
['How come you’re taking the earlier train?','I want some time to explore before the meeting.','It arrives on platform three.','The earlier train was painted blue.','I came here by train last summer.'],
['I’m torn between these two course options.','Which one is more relevant to your project?','The paper tore when I folded it.','There are two copies on the shelf.','I took the course in my first year.'],
['Do we need to sign in before entering?','Yes, please write your name on that sheet.','The sign was put up this morning.','We entered through the side door.','I prefer the sheet with the diagram.'],
['I’d rather walk if it’s not too far.','It’s only ten minutes from here.','I walk to class most mornings.','The path was repaired last month.','The far side of the room is quieter.'],
['Have you heard back about your application?','Not yet, but they said they’d reply this week.','The back of the form needs a signature.','I heard the lecture from the hallway.','The application has three separate pages.'],
['Would you be able to lend me a measuring tape?','Sure. Please bring it back before the practical class.','The recorded lecture is on the course page.','I measured it twice this morning.','The class tape was very interesting.'],
['I’m sorry; I didn’t realize this seat was taken.','No problem. There’s a free one beside me.','I took the bus to the performance.','The seats are made of wood.','I realized the answer after class.'],
['What time are we supposed to hand in the equipment?','By five, even if our booking ends earlier.','We handed the list to the technician.','The equipment was supplied by the university.','The earlier class uses the same room.'],
['Could you let me know if a place becomes available?','Certainly. What’s the best number to reach you on?','The place is close to the station.','I let my friend use my ticket.','Several people know the area well.'],
['That’s not quite what I had in mind.','What would you like to change about it?','I’m trying to keep the date in mind.','The mind is the topic of tomorrow’s lecture.','I had it printed at the copy shop.'],
['Do you take a deposit when I borrow the camera?','Yes, but it’s returned when you bring the camera back.','I took several photographs on the trip.','The bank is on the ground floor.','The camera has a useful zoom setting.'],
['The room booking is only provisional.','Then we should confirm it before inviting everyone.','The room contains enough chairs.','I booked it through the usual website.','Everyone liked the invitation design.'],
['I should have checked the opening hours first.','At least we can come back tomorrow morning.','I checked out two books yesterday.','The opening paragraph explains the problem.','The first hour of class is a discussion.']
],
[
['Could you point me toward the registration desk?','It’s just past the stairs on your right.','The point of the exercise is to practise.','I registered for two classes last term.','The desk has several drawers.'],
['Is the evening lecture still going ahead?','Yes, but a different speaker will give it.','I usually go ahead of the group.','The lecture lasted about an hour.','There are more seats near the front.'],
['I can’t make it to the planning session.','Would you like me to send you the notes afterward?','The plan was made several weeks ago.','I can make another copy of the chart.','The session was very well organized.'],
['Who should I contact about a timetable clash?','The course administrator can help with that.','The timetable is displayed near the door.','I contacted my partner after class.','The class is about conflict in history.'],
['Would you rather present first or second?','Second, if that’s all right with you.','The first presentation was excellent.','I received a useful present yesterday.','I’d rather have the smaller room.'],
['We’re supposed to bring our own containers.','Thanks for telling me; I’ll get one from home.','The building contains several laboratories.','We brought the equipment back on time.','I suppose the class is almost finished.'],
['Do these forms have to be submitted in person?','No, a scanned copy is fine.','The person beside me works in admissions.','I submitted mine before the deadline.','Several forms of transport are available.'],
['I’m having second thoughts about that topic.','Perhaps we should discuss the alternatives.','The second speaker addressed the same topic.','I thought the talk began at two.','The discussion took place in the hallway.'],
['How often does the shuttle run?','Every twenty minutes during term time.','Along the road beside the sports field.','The driver runs in the university team.','It was often crowded last winter.'],
['Could I interrupt you for a moment?','Of course. What do you need?','The lecture was interrupted by a fire alarm.','I needed a moment to find my notes.','There are several moments in the film.'],
['There’s no point waiting outside in the rain.','Let’s go into the lobby until they arrive.','The main point appears on the final slide.','I was waiting for the next chapter.','It rained heavily last weekend.'],
['Which version of the form should we use?','The one dated this month.','We use it to record attendance.','The form was difficult to fill in.','I sent my answer last month.'],
['Do you happen to have change for a five-pound note?','Let me see what coins I have.','The notes have changed since last term.','I made five pages of notes.','You can change your course next week.'],
['I don’t think this cable reaches the socket.','Try the longer one in the drawer.','The cable arrived yesterday morning.','I reached the station just in time.','The drawer has been locked for repairs.'],
['When can I expect the corrected draft?','I’ll send it by the end of tomorrow.','I expected the lecture to be useful.','The first draft was difficult to read.','It was corrected with a green pen.'],
['The workshop is fully booked, I’m afraid.','Can you put me on the waiting list?','I borrowed the book from the workshop.','The full list is quite interesting.','I’m not afraid of speaking in public.'],
['You look as though you could use a break.','You’re right. I’ve been working all afternoon.','The broken chair is beside the wall.','I used the other room yesterday.','The work looks different in this light.']
],
[
['Would it be possible to have the receipt emailed?','Certainly. Which address should I send it to?','The email arrived just after lunch.','I received the package yesterday.','There are several addresses on the form.'],
['I’m not getting anywhere with this calculation.','Shall we go through it together?','The meeting is in the building next door.','I got here ten minutes ago.','The calculator needs a new battery.'],
['Is there a charge for using the lockers?','No, but you’ll need to bring your own lock.','I charged my phone before the lecture.','The lockers are painted dark green.','The staff member is in charge today.'],
['Could we meet somewhere a bit quieter?','There’s an empty study room upstairs.','The study took place last year.','We met through a class project.','I usually read quietly at home.'],
['The speaker has brought the start time forward.','So we need to arrive earlier than planned.','The speaker moved to the front of the room.','I brought a copy of the program.','The plan took a long time to prepare.'],
['Have you managed to get hold of the article?','Yes, the librarian found a digital copy for me.','I managed the club last semester.','The article is about holding public events.','The library building is easy to find.'],
['Would you like me to save you a seat?','Yes, please. I’m on my way now.','The seat needs a small repair.','I’ve saved the document on my computer.','I like sitting near a window.'],
['I think we’ve missed a step in the instructions.','Let’s check them from the beginning.','The steps outside are quite slippery.','I missed the bus by a minute.','The instructor spoke very clearly.'],
['Are these shelves arranged by subject or by author?','By subject, with authors listed within each section.','The shelves were arranged yesterday.','The author gives a useful example.','I’m taking the subject next term.'],
['Can you remind me what we agreed to bring?','A notebook and a pair of comfortable shoes.','I brought it up during the last meeting.','The agreement was signed last spring.','I remember enjoying the visit.'],
['I might have to leave the meeting a little early.','That’s fine; we’ll cover your part first.','The meeting room has plenty of light.','I left my notes beside the entrance.','The early bus is usually reliable.'],
['Who’s responsible for checking the final figures?','Maya is; I’m checking the references.','The figures are shown in the appendix.','The final lecture was on Friday.','I prefer the earlier version of the chart.'],
['The nearest printer is out of order.','There’s another one in the computer room.','I put the pages in the correct order.','The order was delivered this morning.','The nearest room is quite small.'],
['Could we keep this between ourselves for now?','Of course. I won’t mention it to anyone.','The room is between the two staircases.','We kept the equipment for a week.','I mentioned the problem in my report.'],
['I’m not sure whether that source is reliable.','We should check who produced it and when.','The source is listed on the final page.','I’m sure the class starts at nine.','The report was printed in blue ink.'],
['What do you say we take a different route back?','Sure, we have time to explore a little.','I said the bus was already full.','The route is marked in red on the map.','We took the earlier train last time.'],
['I didn’t expect so many people to turn up.','Neither did I. We’ll need some extra chairs.','Please turn the volume up a little.','The people in the photograph are students.','I expected to finish the work yesterday.']
]
];

export const conversations=[
[
a('Returning a borrowed lens',`Woman: I’m returning the lens, but I couldn’t find the little pouch it came in.
Man: The pouch isn’t essential. Have you got both the lens caps?
Woman: Yes, they’re here. I was worried I’d have to pay for another pouch.
Man: No, you’re fine. Next time, keep the caps on whenever the lens isn’t attached to the camera.
Woman: I will. Could I book it again for next weekend?
Man: Put a request through the website. It’s still available at the moment.`,[
q('What was the woman worried about?','Being charged for a missing accessory','Having damaged the camera lens','Being unable to find her booking','Returning the equipment after closing','She feared paying for a missing pouch.'),
q('What will the woman probably do next?','Request another booking online','Buy replacement lens caps','Look for a different camera model','Pay at the equipment desk','The man directs her to the website to reserve the available lens.','inference')]),
a('Preparing a student survey',`Man: We’ve only had twelve responses to our survey. Should we ask the whole class again?
Woman: Before we do, look at question three. Two people told me they weren’t sure whether it meant weekly or monthly spending.
Man: Oh, that could change the answers quite a bit.
Woman: Exactly. Let’s fix that first and ask those twelve people to check their responses.
Man: Then we can send one clear version to everyone else.
Woman: Yes. More answers won’t help much if people interpret the question differently.`,[
q('What problem does the woman identify?','A question lacks a clear time period','The survey asks about too many subjects','Students have already answered twice','The survey cannot be sent to the whole class','Weekly versus monthly spending is ambiguous.'),
q('Why does she say more answers will not help much?','They may be based on inconsistent interpretations','They will require an additional survey fee','The class has already chosen a different topic','Twelve responses are sufficient for every purpose','More responses do not correct an unclear question.','purpose')]),
a('A change in exhibition plans',`Woman: The large display board won’t fit in the lift. I measured it this morning.
Man: Could we carry it up the stairs?
Woman: The stairway turns too sharply. But the board comes apart into two panels.
Man: I didn’t realize that. Would separating them damage the display?
Woman: Not if we remove the photographs first. We can put them back upstairs.
Man: Then I’ll get a screwdriver, and you can start taking the photographs down.
Woman: Good. It’s a bit more work, but we won’t have to change rooms.`,[
q('How will the speakers move the board?','By separating it into smaller panels','By carrying it around a different stairway','By removing the lift doors','By using another exhibition room','The board can be taken apart.'),
q('How does the woman view the solution?','It requires effort but preserves their room arrangement','It is too risky for the photographs','It will be quicker than their original plan','It depends on borrowing a larger board','She accepts extra work to avoid changing rooms.','attitude')]),
a('Planning a group visit',`Man: I’ve found a museum tour on Saturday, but the student discount only applies if ten people book together.
Woman: We’ve got eight definite replies and three people who haven’t answered.
Man: Should I just buy eleven tickets?
Woman: I wouldn’t. We’d be paying for empty places if they couldn’t come.
Man: Right. I’ll message them with a deadline for this evening.
Woman: And if we’re still below ten, ask the museum whether we can join another student group.
Man: That’s worth trying.`,[
q('Why does the woman advise against buying eleven tickets?','Some people have not confirmed that they can attend','The museum does not admit groups larger than ten','The student discount ends before Saturday','Their group has already paid for eight tickets','Unconfirmed people might leave paid places unused.'),
q('What alternative does the woman suggest?','Combining with another group to meet the discount condition','Visiting a different museum without a tour','Buying full-price tickets for the whole class','Moving the visit to a weekday evening','Joining another student group could bring the total to ten.')]),
a('A clearer presentation',`Woman: Your slides look much less crowded now.
Man: I took out the detailed table. I’ll give people a handout instead.
Woman: Good idea. Will you still explain where the numbers came from?
Man: Yes. The first graph shows the main result, and I’ll explain the method before that.
Woman: Then people who want the details can check the handout later.
Man: Exactly. I was trying to make every slide do everything.
Woman: This way, the slides and the handout have different jobs.`,[
q('What change has the man made?','Moved detailed figures from the slides to a handout','Removed the explanation of his research method','Replaced a graph with a larger table','Decided to distribute all slides after the talk','The detailed table moves to the handout.'),
q('What do the speakers agree about?','Different materials can serve different audience needs','Every detail should be read aloud during the talk','The audience should examine the handout before any graph','Explaining the source of figures is unnecessary','The slides convey the main message while the handout preserves detail.','inference')])
],
[
a('Choosing a practice room',`Man: I booked the small music room, but our group has grown to six people.
Woman: It’ll be crowded. The large room is free after four, though.
Man: Our singer has to leave at five. Would an hour be enough?
Woman: If we practise the instruments separately before four, we can use the group hour just for the pieces with singing.
Man: That makes sense. I’ll change the booking and send everyone the plan.
Woman: Make sure they know we’re not all starting at the same time.`,[
q('What makes the original booking unsuitable?','The group now has more members','The singer cannot attend that day','The instruments have been moved elsewhere','The room is being repaired after four','Six people would crowd the small room.'),
q('How will the group use the larger room efficiently?','By reserving joint rehearsal time for pieces involving the singer','By asking the singer to practise alone first','By extending the booking beyond five o’clock','By moving every instrumental practice into the same hour','Separate preparation makes the limited shared hour useful.')]),
a('Understanding assignment feedback',`Woman: My tutor wrote “needs a clearer connection” beside this example. I thought the example was interesting.
Man: It is, but what point is it supposed to support?
Woman: That public spaces can encourage people to meet.
Man: Then you need a sentence explaining how your example shows that. At the moment, you describe the space but not what people do there.
Woman: So I don’t necessarily need a different example?
Man: I don’t think so. You need to make its purpose clear.`,[
q('What does the man think the example needs?','An explanation linking it to the argument','A longer description of its appearance','A replacement from a different subject','A reference to the tutor’s own work','The missing connection is between the described place and social interaction.'),
q('What does the woman realize?','She may be able to improve the existing example','Her tutor objects to using public spaces as a topic','She needs to remove every descriptive detail','Her example already proves the point without explanation','She asks whether the example can stay, and he agrees.','inference')]),
a('Borrowing a bicycle',`Man: I’d like to borrow a campus bicycle for the whole weekend.
Woman: The usual loans are only for a day. Are you attending the field course?
Man: Yes, we’re staying at the research station on Saturday night.
Woman: In that case, your instructor can approve an extended loan. We need the approval before you collect the bike.
Man: I’ll email her now. Can you hold one until this afternoon?
Woman: Until three, yes. After that, we’ll offer it to the next person waiting.`,[
q('What does the man need for a longer loan?','Approval from his instructor','A reservation at a different station','Payment for an additional bicycle','Proof that the normal loan lasts two days','The field-course exception needs instructor approval.'),
q('What will happen if he does not collect the bicycle by three?','It may be made available to someone else','His instructor will receive a penalty notice','The research station will cancel his visit','He will automatically receive a different bicycle','The desk will offer the held bike to the next person.')]),
a('A shared kitchen problem',`Woman: There are still lots of unwashed cups after our club meetings.
Man: We put a reminder on the door last week.
Woman: People see it when they arrive, not when they leave. What if we put a tray beside the sink with a clear label?
Man: For used cups?
Woman: Yes, but the label should ask everyone to wash their own cup first. The tray is just for the clean ones to dry.
Man: Right. Otherwise people might think someone else is doing the washing.`,[
q('Why does the woman question the reminder’s location?','People encounter it at the wrong stage of their visit','The door is usually left open during meetings','The sign uses words that members cannot understand','The club meets in a different kitchen each week','The reminder is seen on arrival rather than departure.'),
q('What should the tray label make clear?','Members must wash their cups before placing them there','Only cups brought from home may be used','Someone will collect dirty cups after the meeting','The tray should be moved to the entrance','The tray is for drying clean cups, not collecting dirty ones.')]),
a('Arranging a campus interview',`Man: The gardener agreed to speak with me for my project, but she’s only free at seven tomorrow morning.
Woman: That’s early. Can you record the interview then and write it up later?
Man: I can, but I’m worried about the wind outdoors.
Woman: Ask whether you can sit inside the potting shed. It’s close to where she works, and you’d be out of the wind.
Man: Good suggestion. I’ll check that the recording is clear before we begin properly.`,[
q('What concerns the man about the interview?','Outdoor conditions could reduce recording quality','The gardener has not agreed to participate','He cannot write anything before seven o’clock','His project requires a longer interview','He worries that wind will affect the recording.'),
q('Why does the woman suggest the potting shed?','It offers shelter near the gardener’s workplace','It contains equipment needed for the project','It will allow the interview to take place later','It is the location required by the instructor','The shed is both convenient and protected from wind.')])
],
[
a('An unavailable textbook',`Woman: The bookshop says our textbook won’t arrive until next week.
Man: We need chapter two for Friday. Could we use the older edition in the library?
Woman: The chapter numbers are different, but the lecturer posted a list matching the topics.
Man: I hadn’t seen that. Then we can find the right section.
Woman: Yes. The library has a short-loan copy, so we should plan when to use it.
Man: I’m free tomorrow morning. I’ll check whether we need to reserve it.`,[
q('How can the students prepare before the new books arrive?','Use a topic guide to locate material in an older edition','Read chapter two of any available textbook','Ask the bookshop to change the course deadline','Borrow a new edition from another student in class','The lecturer’s matching list identifies the relevant older-edition section.'),
q('What will the man check?','Whether the library copy requires a reservation','Whether the lecturer will write a new chapter','Whether the bookshop has cancelled their orders','Whether the course uses different topics next week','He will check reservation conditions for the short-loan copy.')]),
a('Sharing a poster session',`Man: Two presenters have asked to use the same screen at our poster session.
Woman: Could they take turns every half hour?
Man: Their demonstrations are only five minutes long, but people arrive at different times.
Woman: Then a regular ten-minute cycle might work better: five minutes each, repeated through the session.
Man: We’d need a little sign showing the order.
Woman: Yes, so visitors know when to come back instead of assuming they’ve missed the demonstration.
Man: I’ll ask both presenters if that suits them.`,[
q('What solution does the woman propose?','Alternate short demonstrations throughout the session','Give each presenter a single half-hour demonstration','Move one presenter to a different day','Replace both demonstrations with printed posters','She proposes a repeating five-minutes-each cycle.'),
q('Why does she recommend a sign?','To let visitors predict when each demonstration will occur','To explain how presenters should connect the screen','To limit the number of people entering the session','To show which presenter created the equipment','The sign tells visitors the order and when to return.','purpose')]),
a('A timetable misunderstanding',`Woman: I thought the study visit was leaving at nine, but this message says eight thirty.
Man: Nine is when the tour starts. The earlier time is when we meet the coach.
Woman: Oh, I was about to arrange a bus that gets here at eight forty-five.
Man: That would be too late. There’s a train arriving at eight ten, if that helps.
Woman: It does. I’ll take that and bring breakfast with me.
Man: Good plan. The message says we can eat before boarding.`,[
q('What did the woman confuse?','The tour’s starting time and the departure meeting time','The time of the return trip and the first train','The location of the coach and the tour entrance','The breakfast arrangement and the end of the tour','Nine is the tour; eight thirty is the coach meeting.'),
q('What does she decide to do?','Take an earlier train and bring breakfast','Keep the bus booking and meet the coach at 8:45','Travel to the museum independently for the nine-o’clock tour','Take the later train and have breakfast after boarding','She chooses the train arriving at eight ten.')]),
a('Testing an explanation',`Man: I’ve made a diagram for the workshop, but I’m not sure it’s clear enough.
Woman: Have you shown it to anyone who hasn’t done the activity before?
Man: Only to my project partner, and she understood it.
Woman: She already knows how the equipment works. Ask someone new to explain what they think each arrow means.
Man: Without me talking them through it?
Woman: Exactly. Then you’ll see which parts of the diagram actually communicate the steps on their own.`,[
q('Why might the partner’s reaction be insufficient?','Her prior knowledge may help her interpret unclear parts','She has not seen the equipment being used','She is responsible for drawing the final diagram','Her explanation will be included in the workshop','A familiar user can fill gaps that a beginner cannot.','inference'),
q('What test does the woman suggest?','Let a beginner interpret the diagram without guidance','Remove every arrow before showing the diagram','Ask the partner to memorize the written instructions','Explain each step before asking for a reaction','An unaided interpretation tests what the diagram communicates.')]),
a('An alternative volunteering role',`Woman: I’d like to help at the open day, but I can’t stand outside for the whole afternoon.
Man: We also need someone at the indoor information table.
Woman: Would I have to answer questions about every department?
Man: No, you’d give visitors the program and direct specialist questions to the right desk. We’ll have a contact list.
Woman: That sounds manageable. Is there any training?
Man: A short briefing at eleven. The visitors start arriving at noon.
Woman: Then please put my name down.`,[
q('Why is the indoor role suitable for the woman?','It avoids the extended outdoor standing she cannot do','It requires no interaction with visitors','It takes place after all visitors have left','It lets her give advice without a contact list','The indoor information table is an alternative to standing outside.'),
q('What will she mainly do?','Provide general information and direct specialist questions','Give detailed talks about every department','Train volunteers who arrive after noon','Organize transport for visitors','Her job is programs and referrals, not specialist advice.')])
],
[
a('Moving a group meeting',`Man: Our usual study room is being used for an exam tomorrow.
Woman: There’s a free room in the science building, but it doesn’t have a screen.
Man: We only need a screen to compare the graphs. Could we print those?
Woman: We could, and discuss the written sections without one.
Man: Then we don’t have to postpone the meeting.
Woman: Right. I’ll book the room, and you can print two copies of each graph so people can share.`,[
q('What problem are the speakers solving?','Their usual meeting space is unavailable','They have lost the data for their graphs','Their exam has been moved to another building','They need to postpone a group deadline','The usual room is assigned to an exam.'),
q('How will they adapt to the replacement room?','Use printed graphs instead of a screen','Discuss only the written sections and omit the graphs','Ask the exam group to leave early','Borrow a screen from the exam room','Printouts replace the display function.')]),
a('Editing a walking tour',`Woman: Our walking tour takes nearly an hour, but the event organizer asked for forty minutes.
Man: Could we walk faster between stops?
Woman: Some visitors may find that difficult. I’d rather cut one stop.
Man: The old workshop overlaps with what we say at the railway station. We could leave that out.
Woman: Yes, and keep the riverside stop because it explains how the town developed.
Man: I’ll revise the map. We should try the shorter route once before the event.`,[
q('Why does the woman reject walking faster?','It might make the tour less accessible to some visitors','It would require a new map for every visitor','It would remove the need to explain the town’s history','It might cause them to arrive at the railway station too early','She is concerned about visitors who would struggle with the pace.'),
q('Why do they choose to remove the workshop stop?','Its content repeats information given elsewhere','It is farther from the river than the other stops','It has become unsafe for visitors to enter','The organizer has asked them to avoid old buildings','The workshop overlaps with the station discussion.')]),
a('Choosing a project partner',`Man: My usual project partner is away this term. I’m not sure whom to work with.
Woman: What skills does this project need?
Man: Interviewing and making sense of the responses. I’m fairly comfortable with interviewing.
Woman: Then look for someone who enjoys analyzing information, rather than someone whose strengths are exactly the same as yours.
Man: That would balance the work better.
Woman: And talk about schedules before you decide. Different skills won’t help much if you can never meet.`,[
q('What kind of partner does the woman recommend?','Someone whose strengths complement the man’s','Someone who has already completed the project alone','Someone with an identical weekly schedule and interests','Someone who prefers to conduct all the interviews','She suggests an analysis-focused partner to complement his interviewing.','main idea'),
q('Why does she mention schedules?','Compatible availability is also necessary for collaboration','The course requires a written timetable from each pair','The project deadline has changed without notice','Analysis must always be completed before interviews','Complementary skills are not enough if they cannot meet.','purpose')]),
a('Checking a room photograph',`Woman: I’ve found a photograph for our event page. It shows the room when it was completely full.
Man: Is that a good idea? People might think there won’t be space.
Woman: I wanted it to look lively.
Man: Perhaps use a picture with people talking in smaller groups. That would show the atmosphere without making it seem crowded.
Woman: I have one from the beginning of the event. I’ll check that everyone visible agreed to have their photo used.
Man: Good. Then we can put it online.`,[
q('What concern does the man raise?','The image may give an unhelpful impression of crowding','The room looks too empty to attract visitors','The photograph was taken in a different building','The event page cannot display group photographs','A full-room image could discourage people worried about space.'),
q('What will the woman check before using another photograph?','Whether the people shown gave permission','Whether the event has already sold all its tickets','Whether the room contains enough chairs','Whether the image was taken after everyone left','She will verify consent from visible participants.')]),
a('Working around a repair',`Man: The technician says the kiln won’t be ready until next Thursday.
Woman: That’s after our ceramics deadline. Should we ask for an extension?
Man: We should tell the tutor what’s happened, but we can still finish shaping the pieces and photograph them.
Woman: Then we’d have evidence of the work we completed on time.
Man: Exactly. We can submit those photographs with an explanation and ask how she wants us to handle the firing stage.
Woman: I’ll write to her this afternoon.`,[
q('What prevents the students from finishing the usual process?','A piece of equipment is unavailable until after the deadline','They have not begun shaping their ceramic pieces','Their tutor has rejected their chosen design','They cannot obtain photographs before the exhibition','The kiln repair extends beyond the deadline.'),
q('What approach do they agree on?','Document completed work and consult the tutor about the remaining stage','Wait until Thursday before informing anyone','Use photographs instead of making the ceramic pieces','Assume the deadline no longer applies to their class','They will show timely progress and seek instructions about firing.')])
],
[
a('Using an archive appointment',`Woman: My archive appointment is tomorrow, but I still haven’t decided which boxes to request.
Man: Start with the dates relevant to your question. You can’t read the whole collection in one morning.
Woman: I was hoping something interesting would turn up.
Man: It might, but a short list will give you a starting point. Keep some time for unexpected leads after that.
Woman: So a plan doesn’t mean I have to ignore everything else.
Man: Exactly. It helps you use the limited time well.`,[
q('What does the man recommend?','Begin with a focused selection while allowing time for discoveries','Read every box in the collection before forming a question','Cancel the appointment until all possible sources are known','Avoid material outside the dates on the first list','He balances an initial plan with room for unexpected leads.'),
q('What does the woman come to understand?','A plan can guide research without making it inflexible','An archive visit is useful only after the answer is known','Unexpected material should replace her original question','One morning is enough to examine the whole collection','She realizes planning does not require ignoring other evidence.','inference')]),
a('A short-notice schedule change',`Man: The guest speaker can only join us online now. Her train has been cancelled.
Woman: We can use the seminar room’s video link. Does she still have the full hour?
Man: Only forty minutes, because she has another meeting afterward.
Woman: Then ask her to speak for twenty-five minutes and keep fifteen for questions.
Man: We’d planned a longer introduction too.
Woman: Put her biography on the event page instead. People can read it before they arrive.
Man: That should protect the discussion time.`,[
q('What is the main constraint on the revised event?','The speaker has less time available','The seminar room has no online equipment','Students have not submitted any questions','The event page cannot be updated','The speaker now has only forty minutes.'),
q('Why does the woman suggest posting the biography online?','To preserve live time for speaking and questions','To avoid telling students that the event has changed','To replace the guest speaker’s presentation entirely','To let the speaker join without using a video link','Moving the introduction online protects the limited discussion time.','purpose')]),
a('Understanding a service estimate',`Woman: The repair shop estimated forty pounds for my laptop, but now they say it could cost more.
Man: Did they say what the original estimate covered?
Woman: Just the inspection and a basic replacement cable, apparently.
Man: Then ask for a written total before they do any extra work.
Woman: I’ve also got an assignment due. I can’t leave it there indefinitely.
Man: The library lends laptops. You could use one while you decide whether the repair is worth it.
Woman: I’ll check that today.`,[
q('What should the woman clarify with the repair shop?','The total price before approving additional work','Whether the shop can lend her a library laptop','The date when her assignment was first announced','Whether a replacement cable was used last year','A written total will clarify the cost of extra work.'),
q('Why does the man mention the library?','It may provide a temporary solution to her study needs','It can negotiate the repair price on her behalf','It requires assignments to be written on its computers','It sells replacement cables at a lower price','A loan laptop could let her work during the repair decision.')]),
a('Making a club meeting inclusive',`Man: We always begin the club meeting by asking everyone to introduce themselves. Some new members seem uncomfortable.
Woman: What if people talked to one partner first, then introduced their partner to the group?
Man: That would give them a little time to prepare.
Woman: Yes, and we can say it’s fine to share just a name and one interest. No need for a long speech.
Man: Let’s try it next week and ask afterward whether it helped.
Woman: Good. We shouldn’t assume everyone prefers the same arrangement.`,[
q('What change do the speakers propose?','Let members prepare in pairs before group introductions','Remove all introductions from future club meetings','Require new members to give longer personal speeches','Ask established members to speak while newcomers listen','Partner discussion provides preparation before speaking to the whole group.'),
q('Why will they ask for reactions afterward?','To check whether the change meets members’ needs','To choose a new club leader immediately','To identify who prepared the longest introduction','To confirm that all members have the same interests','They recognize that preferences may differ.','inference')]),
a('Keeping a useful project record',`Woman: We should delete the unsuccessful designs from our project folder. It’s getting messy.
Man: Maybe move them into a separate folder instead. We’ll need to explain how the final design developed.
Woman: You think the mistakes are worth showing?
Man: Some of them, yes. Especially the test that made us change the handle. It shows we responded to evidence.
Woman: All right. I’ll label the versions with dates, so we can find the important ones.
Man: That’s better than keeping everything mixed together.`,[
q('Why does the man want to retain earlier designs?','They provide evidence of how the final design developed','They can replace the final design if the folder is lost','They are all required to be displayed at the exhibition','They will reduce the time needed to test the handle','Earlier versions document decisions informed by testing.'),
q('What does the woman decide to do?','Organize and label earlier versions separately','Remove dates from the main project folder','Repeat every unsuccessful test before submission','Put all designs into the final presentation','She will use a dated separate folder rather than deleting or mixing versions.')])
]
];

export const announcements=[
[
a('Workshop relocation',`A quick update for everyone attending tomorrow’s map-making workshop. We’ll meet in the geography studio rather than the computer lab because the lab’s network is being upgraded. The start time is still two o’clock. Bring a laptop if you have one, but don’t worry if you don’t; we have a few available to share. Please download the sample files from the course page before arriving, since we may not have internet access in the studio.`,[
q('Why has the workshop location changed?','Work on the computer lab’s network makes it unavailable','More students registered than the lab can hold','The workshop no longer involves computers','The geography studio has newer internet equipment','The lab’s network is being upgraded.'),
q('What should participants do before the workshop?','Save the sample files on their devices','Collect sample files from the lab during the session','Bring a laptop because sharing is not permitted','Meet in the studio before the usual two-o’clock start','Files must be downloaded in advance because internet access may be unavailable.')]),
a('Field trip head count',`Before we leave the museum, please check that your partner is back on the coach. We’ll depart in ten minutes, so there’s time to use the facilities, but please don’t go back into the galleries. If you bought a large item in the shop, put it in the luggage compartment rather than in the aisle. We’ll make one short stop on the journey home. The driver will tell us when it’s safe to get off.`,[
q('What does the speaker ask students to check?','Whether their partners have returned to the coach','Whether the museum shop is still open','Whether their gallery tickets are valid','Whether the driver has visited the facilities','Students are asked to check that their partners are aboard.'),
q('Why should large purchases go in the luggage compartment?','To keep the aisle unobstructed','To make them available at the short stop','To allow the museum to check their receipts','To prevent them being included in the head count','Keeping bulky items out of the aisle preserves a clear passage.','inference')]),
a('A reusable-cup trial',`Starting Monday, the cafe will offer a small discount when you bring a reusable cup. Please hand the empty cup to the server before ordering, so they can check that it fits the drink you want. We’ll run the scheme for a month and then review how it worked. The discount applies to takeaway drinks only; prices for drinks served in our own cups inside the cafe will stay the same.`,[
q('What is the announcement mainly about?','A temporary discount scheme for reusable takeaway cups','An increase in prices for all cafe drinks','A rule requiring customers to eat outside','A permanent replacement of the cafe’s cups','It introduces a month-long trial for takeaway drinks.','main idea'),
q('When should customers present their cups?','Before placing their drink orders','After paying for their drinks','At the end of the month-long trial','Only when ordering a second drink','The server checks suitability before the order.')]),
a('Student performance access',`Welcome to the lunchtime performance. You’re welcome to take photographs before and after the music, but please put phones away while the musicians are playing. Some pieces are quiet, and even a short notification can be distracting. There will be a brief pause halfway through. If you need to leave, that’s a good opportunity to do so. The program lists the performers, but two pieces have changed; the musicians will introduce those themselves.`,[
q('Why are audience members asked to put phones away?','To avoid disturbing quiet musical passages','To stop photographs being taken before the concert','To make room for additional performers','To prevent changes to the printed program','Notifications could distract during quiet pieces.'),
q('How will the audience learn about the changed pieces?','The musicians will introduce them','Revised programs will be emailed after lunch','The changes will be shown on audience phones','The host will announce them after the final piece','The performers will introduce the changed selections.')])
],
[
a('Archive handling rules',`Before you start using the archive boxes, a reminder about handling the material. Keep the documents in their present order, even if the dates seem mixed up. That order may contain information about how the original owner used them. If you notice a page that appears damaged, leave it where it is and tell a staff member. You may use pencils for your own notes, but food, drinks, and ink pens should stay in the lockers.`,[
q('Why should users preserve the document order?','It may provide evidence about the collection’s original use','It guarantees that every date is already correct','It makes damaged pages easier to remove','It was chosen to match the lockers','The order can itself carry historical information.'),
q('What should a user do on finding a damaged page?','Report it without moving it','Remove it from the box immediately','Repair it using material at the desk','Put it with documents of a similar date','The instruction is to leave it in place and notify staff.')]),
a('A revised sports practice',`This afternoon’s outdoor practice has been moved indoors because of the rain. We’ll use the smaller hall from four until five, so today we’ll concentrate on coordination exercises rather than the full game. Please bring clean indoor shoes; outdoor shoes can make the floor slippery. If you normally arrive by bicycle, allow time to walk around to the east entrance, as the door beside the cycle racks is closed during building work.`,[
q('How will the activity change?','It will focus on exercises suited to a smaller indoor space','It will continue outdoors with a shorter break','It will become a full match starting at five','It will be replaced by a meeting about building work','The smaller hall changes the focus to coordination exercises.'),
q('What special instruction is given to cyclists?','Use the east entrance instead of the nearby door','Leave bicycles inside the smaller hall','Arrive after the building work finishes','Wear outdoor shoes while entering the building','The door near the bicycle racks is closed.')]),
a('Short-loan equipment reminder',`Anyone borrowing a recorder for this weekend’s interviews should collect it by three on Friday. The media desk will close early for a staff meeting. Please make a short test recording before leaving the building; staff will be available to check any problems then. We can’t guarantee technical help over the weekend. Return recorders on Monday morning, even if your interview was cancelled, so they’re ready for the next group.`,[
q('Why should borrowers test the recorders before leaving?','Technical help is available there but may not be available later','All interview recordings must be approved in advance','The weekend interviews will take place in the media building','A test recording extends the return deadline','Testing while staff are present allows problems to be addressed.'),
q('When must a recorder from a cancelled interview be returned?','Monday morning','As soon as the staff meeting begins','At three on Saturday','Only when the next group requests it','The Monday return requirement applies even after cancellation.')]),
a('A postponed discussion',`The guest discussion scheduled for this evening will now take place next Tuesday. The speaker’s flight was delayed, and she cannot join us at the original time. Your existing registration will remain valid, so you do not need to sign up again. If you can’t attend on Tuesday, please cancel through the confirmation email. That will allow us to offer your place to someone on the waiting list. A recording will be available afterward.`,[
q('What should registered people do if they can attend the new date?','Keep their existing registration','Confirm attendance by submitting the form again','Keep the old date and watch the recording there','Cancel the existing booking before joining the new session','Existing registrations remain valid.'),
q('Why are people unable to attend asked to cancel?','So another person can use the available place','So the speaker can change her flight','So the recording can be sent before the event','So the university can choose an earlier date','Cancellation frees a place for the waiting list.')])
],
[
a('A change to laboratory groups',`For tomorrow’s practical session, please check the updated group list on the course page. We’ve moved a few people so that each group has access to the same number of microscopes. Your starting time has not changed. If you normally work with a particular partner, you may be separated for this session, but you can compare your notes afterward. Bring your own notebook; the shared worksheet is a guide, not a replacement for recording your observations.`,[
q('Why were the groups changed?','To make equipment access more equal','To shorten every student’s starting time','To keep usual partners together','To replace notebooks with a shared worksheet','The grouping change balances access to microscopes.'),
q('What is emphasized about the shared worksheet?','Students must still record their own observations','It contains the results for every microscope','It should be completed with a former partner beforehand','It replaces the need to bring personal materials','The worksheet is guidance, not a substitute for notes.')]),
a('An exhibition feedback request',`As you leave the exhibition, please consider completing the short feedback card beside the exit. We’re especially interested in displays that were difficult to understand, not just in your overall rating. Write the display number if you can. The team will use your comments to revise the labels before the exhibition travels to another campus next month. Please put completed cards in the box rather than handing them to the student guides, who are helping new visitors.`,[
q('What kind of feedback is particularly requested?','Identification of displays that were unclear','Estimates of how many people visited','Suggestions for student guide uniforms','Ratings of the other campus’s facilities','The speaker specifically asks which displays were hard to understand.'),
q('How will the comments be used?','To improve labels before the exhibition moves','To decide whether the guides should complete the cards','To cancel displays that received no comments','To choose the destination for next year’s exhibition','The stated purpose is revising labels before next month’s move.')]),
a('Changes near a bus stop',`From Wednesday, the south-gate bus stop will be temporarily relocated to the corner beside the pharmacy. The usual stop is inside the roadworks area, so please do not wait there even if you can still see the shelter. Bus times and route numbers are unchanged. The temporary stop has a yellow sign, and a staff member will be there during the first morning to answer questions. We expect the usual stop to reopen next week.`,[
q('What remains the same during the relocation?','The bus schedule and route numbers','The place where passengers should wait','Access to the usual shelter','The color of the permanent stop sign','Only the stop location changes; times and route numbers do not.'),
q('Why does the speaker mention the visible shelter?','To prevent passengers from waiting at the closed stop','To tell passengers where staff will distribute signs','To explain why the pharmacy is changing its hours','To suggest a place to wait if a bus is late','Seeing the shelter should not be taken as permission to use that stop.','purpose')]),
a('A rehearsal recording',`We’ll record today’s rehearsal so that you can review the timing of your parts. This recording is for the group only and won’t be posted publicly. Please do not share clips on social media. You’ll receive a private link tomorrow, and you can tell me if there is a section you want to discuss in the next session. We’re using a fixed camera, so stay within the marked area when you are speaking.`,[
q('What is the main purpose of the recording?','To help participants review their performance timing','To advertise the group on social media','To select a new camera position during the session','To replace the next rehearsal with public feedback','It is an internal review recording.','main idea'),
q('Why should speakers stay inside the marked area?','The camera will not follow them around','They need to avoid being included in the recording','The private link works only in that area','Other performers are using the same microphone','A fixed camera frames a specific area.')])
],
[
a('A library collection point',`Books requested from the storage collection will be available at the north service desk this week. The usual collection counter is being replaced. You will still receive an email when your books are ready, and the collection deadline in that email will not change. Please bring your student card. If you can’t collect a book yourself, a friend may do so with written authorization from you; a text message showing the request is sufficient.`,[
q('What has changed for storage requests?','The place where books are collected','The length of time books are held','The need to receive a confirmation email','The requirement to identify the borrower','The collection desk changes while other arrangements remain.'),
q('How can a friend collect a requested book?','By showing the borrower’s written authorization','By using the new desk without any documentation','By waiting until the original deadline has passed','By submitting a separate storage request','The borrower can authorize collection in writing, including a text message.')]),
a('A survey recruitment update',`Thank you to everyone who volunteered for the food-choice survey. We now have enough first-year participants, but we still need students in later years. If you have already booked a session, please keep it; we’re only changing who can make new bookings. The survey takes twenty minutes, and participation is voluntary. You may leave a question unanswered if you prefer. The results will be reported for groups, without identifying individual respondents.`,[
q('Who can make a new booking now?','Students beyond their first year','Only students who already completed the survey','New first-year students without appointments','Only members of the research team','New recruitment is limited to later-year students.'),
q('What should already booked first-year participants do?','Attend their scheduled sessions','Cancel and apply again next term','Ask a later-year student to replace them','Submit their answers without attending','Existing appointments are explicitly retained.')]),
a('The format of a campus competition',`For this year’s design competition, submit a photograph of your model and a short explanation by Friday. Please don’t bring the physical model to the office yet; we don’t have storage space for every entry. The first review will use the photographs. If your design is selected for the final round, we’ll ask you to bring the model to the exhibition room. The explanation should focus on the problem your design addresses, not on listing its materials.`,[
q('What is required for the first review?','A photograph and a short explanation','The finished model delivered to the office','A complete list of materials without photographs','An exhibition-room reservation for every entry','The physical model is needed only for finalists.'),
q('What should the written explanation emphasize?','The purpose of the design','The order in which materials were purchased','The amount of available office storage','The number of people entering the competition','It should explain the problem addressed by the design.')]),
a('A walking-route check',`Before Saturday’s community walk, we need two volunteers to check the route on Friday afternoon. You’ll be looking for temporary obstacles, such as building work or closed gates, rather than measuring the total distance again. Take photographs of any problem and send them to the organizer by six. If a section is blocked, please don’t attempt to cross it. We can adjust the route once we know where the difficulty is.`,[
q('What is the volunteers’ main task?','Identify obstacles that could affect the planned walk','Measure a new route from the beginning','Remove barriers at closed building sites','Lead the community walk on Friday','They are checking current access problems, not remeasuring distance.','main idea'),
q('What should they do if a section is blocked?','Document the problem and avoid crossing it','Open the gate before taking a photograph','Cancel the whole walk without contacting the organizer','Wait until Saturday to report the location','They should report with photographs and not try to cross.')])
],
[
a('Changes to a student publication',`The student magazine will accept shorter articles for the next issue because we want to include more contributors. The suggested length is now four hundred words, rather than six hundred. This is not a request to remove useful evidence from an existing article. If you have already agreed on a longer piece with an editor, contact that editor before making changes. New contributors can send a brief proposal first, so we can help them narrow their topic.`,[
q('Why is the magazine suggesting shorter articles?','To include work from more contributors','To remove evidence from previously approved pieces','To replace student writers with editorial summaries','To publish fewer topics in the next issue','Shorter pieces make room for more contributors.'),
q('What should a writer with an agreed longer piece do?','Consult the editor before shortening it','Automatically cut it to four hundred words','Submit it as several unrelated proposals','Wait until a later issue without contacting anyone','Existing agreements should be discussed with the editor first.')]),
a('A quiet-room reminder',`This room is reserved for silent individual study during the examination period. If you need to discuss a problem with a friend, please use the group room across the hall. Headphones are permitted, but check that sound cannot be heard by someone beside you. Staff will not make spoken closing announcements in this room. Instead, the display near the door will show a reminder fifteen minutes before closing, so please keep an eye on it.`,[
q('Where should students hold a discussion?','In the group room across the hall','Beside the closing-time display','Anywhere in the silent room if they wear headphones','At the staff desk inside this room','Discussion belongs in the separate group room.'),
q('How will students be reminded that the room is closing?','By a message on the display','By a spoken announcement over the room speakers','By an email sent fifteen minutes after closing','By staff speaking to each student individually','The room uses a visual reminder to preserve silence.')]),
a('An early collection deadline',`If you ordered a printed project booklet, please collect it from the print room by noon tomorrow. The room will be closed in the afternoon while new equipment is installed. Uncollected booklets will be moved to the reception desk, where you can collect them after two. Please check the name on the package before leaving; several groups used similar project titles. Let staff know immediately if the pages in your copy are not in order.`,[
q('Where will an uncollected booklet be available after two?','At reception','In the closed print room','Inside the new equipment room','At the project exhibition','Uncollected packages are transferred to reception.'),
q('Why should students check the name on the package?','Similar project titles could lead to a mix-up','The new printers may have changed the title','Staff need proof that each title is original','Only packages without names can be collected','The name distinguishes groups with similar titles.')]),
a('A recording-permission request',`At the start of today’s discussion, I’ll ask whether everyone is comfortable with an audio recording. It would help me prepare an accurate summary, but we’ll record only if everyone agrees. The summary will not name individual speakers. If anyone prefers not to be recorded, I’ll take written notes instead. You don’t need to explain your reason, and choosing not to be recorded will not affect your participation in the discussion.`,[
q('Under what condition will the discussion be recorded?','Every participant agrees','Most participants have spoken at least once','The speaker finishes the written summary','No participant asks a question about the topic','Recording requires everyone’s agreement.'),
q('What alternative is offered?','Taking written notes','Excluding participants who object','Publishing a summary with speakers’ names','Asking each participant to record at home','If anyone declines, written notes replace recording.')])
]
];
