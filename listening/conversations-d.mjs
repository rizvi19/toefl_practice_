import {conversation as c,q} from './authoring.mjs';
export default [
c(41,'The survey link sent to the wrong group',`Man: Our cycling survey got almost no responses from people who don't cycle.
Woman: Where did you share it?
Man: In the cycling society's group chat.
Woman: Then you mostly reached cyclists. The question wasn't the only issue; the invitation was selective.
Man: I'll ask the student office to circulate it more widely.
Woman: Good. If you want to understand why people don't cycle, you need a way to hear from them too.`,[
q('Inference','What limits the survey’s current responses?',['The recruitment channel mainly reaches existing cyclists','The university has no students who avoid cycling','The questionnaire requires a bicycle purchase','The group chat prevents members from submitting answers'],'mostly reached cyclists','Sharing only through a cycling society restricts who is likely to see it.',['The missing group may simply not have received it.','No purchase condition is mentioned.','Some answers were received.']),
q('Factual','What will the man ask the student office to do?',['Distribute the invitation to a broader audience','Remove questions about non-cyclists','Select only experienced cycling members','Count bicycles without collecting more responses'],'circulate it more widely','Wider circulation can reach people outside the society.',['The aim includes non-cyclists.','That repeats the original selection problem.','The plan is to improve response coverage.'])]),
c(42,'A light suitcase with heavy plans',`Woman: I packed only hand luggage, so I won't have to collect a suitcase.
Man: Are you bringing the model you made for the exhibition?
Woman: I forgot about that. It won't fit in this bag.
Man: Could the organizer receive it by courier?
Woman: I'll ask. Carrying less sounds convenient, but not if I arrive without the thing I'm presenting.
Man: Check the delivery date before you decide which ticket to buy.`,[
q('Main Idea','What complication changes the woman’s travel planning?',["She also has an exhibition model to carry","The exhibition model has already been sent to a different destination","Her personal suitcase has been excluded from the booked fare","The exhibition organizer has changed the date she needs to travel"],'It won\'t fit in this bag','The model creates a requirement omitted from her light-packing plan.',["The complication is transporting it, not correcting a completed shipment.","The dialogue does not establish that fare restriction.","The model’s size, not a date change, alters the plan."]),
q('Factual','What needs checking before she chooses the ticket?',['Whether the model can arrive by the required date','Whether the man wants to attend the exhibition','Whether all passengers must check a suitcase','Whether the model can be presented without being delivered'],'Check the delivery date','A courier alternative is useful only if it arrives in time.',['His attendance is not relevant to the stated problem.','No such rule is stated.','She needs the actual object for the presentation.'])]),
c(43,'A reference letter with enough notice',`Man: Could you ask your tutor for a reference this afternoon? The deadline is tomorrow.
Woman: She may not be able to write it that quickly. Have you checked whether the reference can follow the application?
Man: The form says supporting letters may arrive a week later.
Woman: Then tell her that, and send the details she needs today.
Man: Good point. I can meet my deadline without making hers unnecessarily impossible.`,[
q('Inference','What distinction helps solve the problem?',['The application and reference have different allowed deadlines','The tutor can submit the entire application without the student','Supporting letters are optional for everyone','The deadline tomorrow applies only to tutors'],'supporting letters may arrive a week later','The later supporting-letter date creates time for the tutor.',['The student still submits the application.','A later date does not mean the letter is optional.','Tomorrow is the applicant’s deadline.']),
q('Factual','What should the man send today?',['The information the tutor needs for the reference','A completed reference for the tutor to sign without review','A request to cancel the application deadline','The application with no mention of the later letter'],'send the details she needs today','Prompt information makes the later reference feasible.',['Writing the reference for her is not proposed.','The existing rule already provides time.','The tutor should be told the actual letter deadline.'])]),
c(44,'An image that looks sharper than it is',`Woman: The photo looks sharp on my phone, but the printer says it won't work as a large poster.
Man: A small screen can hide the lack of detail. Do you have the original file?
Woman: This is the copy someone sent in a message.
Man: Ask for the original rather than enlarging that copy again.
Woman: I'll do that. I thought making the file bigger would bring the detail back.
Man: More space doesn't necessarily mean more information.`,[
q('Inference','Why may the message copy be unsuitable?',['It may contain too little detail for large printing','The subject cannot legally be shown on paper','The phone screen is larger than the intended poster','The printer requires the image to have no original file'],'lack of detail','A small display can mask limitations that become visible when enlarged.',['Permission is not discussed.','The poster is the larger output.','The original is requested as a better source.']),
q('Factual','What will the woman request?',['The original image file','A larger phone screen','Another enlargement of the same message copy','A poster printed without a photograph'],'Ask for the original','The source may retain information lost in the message copy.',['Changing the viewing device does not restore file detail.','Further enlargement does not recover missing information.','They seek a usable version of the image.'])]),
c(45,'A change that cannot be measured yet',`Man: Our club introduced a new welcome session, and membership went up. So it worked.
Woman: Maybe. Wasn't the membership fee reduced at the same time?
Man: Yes, and the club had a stall at the fair.
Woman: Then several changes could have contributed.
Man: We can still say membership rose, but not that the session alone caused it.
Woman: Exactly. Ask new members how they heard about the club; that could help with next year's planning.`,[
q('Inference','Why is the woman cautious about the man’s conclusion?',["Several changes could explain the increase","The membership figures were collected before the welcome session","The lower fees must explain the full increase on their own","The welcome session had a negative effect that the fee change concealed"],'several changes could have contributed','The evidence does not isolate one cause.',["The concern is competing explanations, not that established timing error.","They are another possible contributor, not a proven sole cause.","The dialogue does not isolate the direction of the session’s effect."]),
q('Method','What further information does the woman suggest collecting?',['How new members learned about the club','Only the number of existing committee members','The previous welcome session’s room dimensions','A count of clubs that charge higher fees'],'how they heard about the club','Recruitment sources can inform future planning without proving a single cause.',['Committee size does not identify recruitment routes.','Room size is not the proposed evidence.','Other clubs’ prices do not identify these members’ sources.'])]),
c(46,'A costume with an unexpected restriction',`Woman: I found a costume hire place. The coat would be perfect for our outdoor play.
Man: Does the hire agreement allow outdoor use?
Woman: I only checked the size. Let me see. It says indoor performances only.
Man: Then we shouldn't book it on the assumption nobody will notice.
Woman: I'll ask whether they have something suitable for outdoors. A perfect appearance isn't enough if we can't use it where we're performing.`,[
q('Factual','What restriction affects the proposed coat?',['It is hired for indoor use only','It cannot be worn by student actors','It is available only in a different size','It must be purchased rather than hired'],'indoor performances only','The planned outdoor performance conflicts with the agreement.',['No student exclusion is stated.','Size was checked and is not the issue.','The service offers hire.']),
q('Inference','What will the woman prioritize in the alternative?',['Permission for the actual performance conditions','An identical appearance regardless of the agreement','Avoiding contact with the hire company','A costume that cannot be used in any performance'],'something suitable for outdoors','Suitability includes permitted use, not appearance alone.',['They reject that assumption.','She plans to ask the company.','She needs a usable alternative.'])]),
c(47,'An exhibition object that tells a different story',`Man: I chose the oldest object for our display. It must be the most interesting.
Woman: What question is the display supposed to explore?
Man: How students communicated before mobile phones.
Woman: Then the noticeboard materials might tell that story better than the old laboratory instrument.
Man: You're right. Age alone doesn't make an object relevant.
Woman: Keep the instrument for another theme. Choose the objects that help visitors follow this one.`,[
q('Purpose','Why does the woman ask about the display’s question?',['To select objects that support its intended story','To establish the exact age of every instrument','To argue that old objects should not be displayed','To replace the communication theme with a laboratory theme'],'tell that story better','Relevance to the communication question guides selection.',['Exact dating is not their decision criterion.','She suggests a different theme for the instrument.','She retains the current theme.']),
q('Inference','What will the man reconsider?',["Whether age alone makes an object suitable","Whether the theme should be abandoned to display only the oldest objects","Whether noticeboards existed before mobile communication became common","Whether visitors should choose their own theme before viewing the objects"],'Age alone doesn\'t make an object relevant','He accepts that age and thematic usefulness are different.',["The woman redirects selection toward the theme, not away from it.","The discussion is about relevance rather than denying that history.","The planned exhibition still has an organizing theme."])]),
c(48,'A battery that seems to charge too slowly',`Woman: My phone is charging much more slowly than usual.
Man: Is that the charger you normally use?
Woman: No, I borrowed this one. The cable fits, so I assumed it was equivalent.
Man: A matching plug doesn't tell you how much power it supplies.
Woman: I'll try my own charger when I get home before deciding the phone needs repair.
Man: Good idea. Change one thing at a time so you can tell what made the difference.`,[
q('Inference','What assumption does the woman question?',["That physical fit guarantees equivalent charging","The phone must use a different kind of battery with the borrowed cable","The home charger’s location explains the borrowed cable’s physical fit","Borrowed equipment is less effective solely because it belongs to another person"],'assumed it was equivalent','Physical fit does not establish the power delivered.',["Compatibility of charging equipment does not replace the battery.","Where the original charger is located does not establish equivalent charging performance.","The relevant difference is the setup, not ownership itself."]),
q('Method','Why change one part of the setup at a time?',['To identify which change affects charging','To repair every possible fault immediately','To make all chargers supply identical power','To avoid comparing the borrowed charger with her own'],'tell what made the difference','A controlled comparison helps isolate the cause.',['The first step is diagnosis, not every repair.','The comparison does not alter charger capability.','That comparison is the proposed test.'])]),
c(49,'An extra ticket that belongs to someone else',`Man: There’s an unused ticket in the group folder. Can I give it to my cousin?
Woman: It belongs to Jo. She hasn't decided whether she can attend.
Man: I assumed it was spare because nobody had downloaded it.
Woman: Better ask her. Not being downloaded doesn't mean it has been given up.
Man: I'll message her before offering it. I don't want two people expecting the same seat.
Woman: Thanks. That saves an awkward conversation later.`,[
q('Inference','Why is the ticket not necessarily available?',['Its owner has not relinquished it','It has already been used for a different performance','The folder prohibits downloading tickets','The cousin has already paid Jo'],'hasn\'t decided whether she can attend','Jo still holds a claim even without downloading the ticket.',['The performance has not occurred.','The issue is ownership, not a download prohibition.','No payment has been made.']),
q('Factual','What will the man do before offering the ticket?',['Ask Jo about her plans','Download every ticket in the folder','Assign the seat to both people','Request a refund without contacting Jo'],'message her before offering it','He will obtain clarification from the actual owner.',['Bulk downloading does not establish permission.','He wants to avoid conflicting expectations.','He plans contact rather than unilateral action.'])]),
c(50,'A route that is short only on the map',`Woman: The map says the gallery is only five hundred metres away. We can make it in five minutes.
Man: That line goes across the river. The nearest pedestrian bridge is farther north.
Woman: Ah, I measured the straight line, not the walking route.
Man: The route planner says fifteen minutes. We should leave now if we want to join the tour.
Woman: Agreed. I'll use the walking directions rather than judging by the gap between two points.`,[
q('Factual','What makes the walk longer than the woman expected?',['The need to reach a pedestrian bridge','A gallery that moved farther north','A tour that begins on the river','A map with no distance measurement'],'nearest pedestrian bridge is farther north','The crossing requires a detour from the straight line.',['The bridge, not the gallery, is north.','They need to reach the gallery for the tour.','The map supplies a distance, but not her actual path.']),
q('Inference','What planning change does the woman make?',['Use an accessible route instead of straight-line distance','Assume every five-hundred-metre journey takes fifteen minutes','Wait five minutes before leaving for the tour','Choose a route that crosses the river without a bridge'],'use the walking directions','She now distinguishes spatial proximity from travel along usable paths.',['One particular detour does not fix all walking times.','They agree to leave now.','The bridge is the necessary crossing.'])])
];
