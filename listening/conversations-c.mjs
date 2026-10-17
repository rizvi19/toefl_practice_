import {conversation as c,q} from './authoring.mjs';
export default [
c(29,'A recipe that cannot simply be doubled',`Man: I doubled every ingredient, but the cake sank.
Woman: Did you change the tin?
Man: No, I used the same deep one.
Woman: Then the mixture was much deeper. The outside could look ready while the middle wasn't.
Man: So adding more time isn't the only thing to think about.
Woman: Right. Try two tins next time, and check the recipe's advice for larger batches.
Man: I'll do that before blaming the ingredients.`,[
q('Inference','What factor did the man overlook?',['The effect of putting more mixture in the same tin','A recipe that already required two cakes','A missing ingredient in the original instructions','The purchase price of a larger oven'],'the mixture was much deeper','The same container changed the depth of the doubled batch.',['The original requirement for two cakes is not stated.','He doubled every ingredient.','Oven cost is not discussed.']),
q('Factual','What practical change does the woman suggest?',['Divide the mixture between two tins','Double the ingredients a second time','Use the same tin without checking the middle','Remove half the ingredients after baking'],'Try two tins next time','Two tins avoid putting the entire larger batch in one deep container.',['More mixture would not address the problem.','Checking readiness remains important.','The suggestion concerns preparation before baking.'])]),
c(30,'A translation that sounds too formal',`Woman: I translated the welcome message accurately, but it sounds like a legal notice.
Man: Who will read it?
Woman: Visitors to the student club's website.
Man: Then keep the meaning and make the invitation sound friendly. You don't need to copy the original sentence structure.
Woman: I was worried changing the structure would change the message.
Man: Read it to someone from the club. Ask whether it invites them in, not just whether each word is correct.`,[
q('Main Idea','What problem are the speakers trying to solve?',['A welcome translation whose tone does not suit its readers','A legal notice with missing factual information','A club website that cannot display translated text','A visitor list written in the wrong language'],'sounds like a legal notice','The issue is communicative tone despite accurate wording.',['It is a welcome message, not a legal notice.','No technical display problem is mentioned.','They discuss wording, not translating a list.']),
q('Purpose','Why should the woman read it to a club member?',["To test its effect on the intended audience","To obtain a literal translation that preserves every original sentence","To establish the club’s current total of active members","To remove expressions that distinguish this club from other groups"],'whether it invites them in','The listener can assess the social effect and audience fit.',["The concern is natural invitation and effect, not strict word-for-word structure.","The listener is a relevant reader rather than a membership-data source.","The aim is to assess the invitation, not eliminate its particular identity."])]),
c(31,'A gym session held for someone else',`Man: I booked the court, but Jordan can't come. Can you take his place?
Woman: Possibly. Is the booking in your name or his?
Man: His, actually.
Woman: The desk checks the named member's card. We shouldn't assume another person can use it.
Man: I'll ask whether they can transfer the booking. If not, we'll reserve another slot.
Woman: Let me know before I bring the equipment over.`,[
q('Inference','Why does the woman ask whose name is on the booking?',["The booking may require the named member","She wants to compare the cardholder’s equipment with her own","She thinks booking under another name guarantees a cheaper court","She assumes the booking has already been transferred to her"],'checks the named member\'s card','The reservation may not be usable simply by substituting a player.',["Equipment ownership is not the identification issue.","No name-based discount is given.","She asks because that authority is not established."]),
q('Factual','What will the man do first?',['Ask the desk about transferring the booking','Tell the woman to arrive without checking','Cancel all future court reservations','Collect Jordan’s membership card without permission'],'ask whether they can transfer the booking','He will establish the permitted procedure before using the slot.',['They decide against assuming access.','A new slot is only the fallback.','No use of another person’s card is proposed.'])]),
c(32,'A piece of feedback that seemed contradictory',`Woman: My tutor said the essay was clear but needed a stronger argument. Aren't those the same thing?
Man: You can write clearly without giving enough support for a conclusion.
Woman: So I shouldn't just replace words with more academic ones?
Man: I'd look at the evidence and explain how it supports each claim.
Woman: That makes the comment much more useful. I'll revise one paragraph first and check whether the reasoning is actually stronger.`,[
q('Inference','What distinction helps the woman understand the feedback?',['Clear expression differs from well-supported reasoning','Academic vocabulary guarantees a strong argument','A conclusion is unnecessary in a clear essay','Evidence matters only when sentences are difficult'],'without giving enough support for a conclusion','Clarity of language does not establish adequacy of argument.',['The advice concerns support, not harder words.','The conclusion still needs justification.','Evidence is relevant even in clear prose.']),
q('Factual','How will the woman begin revising?',['Test a stronger line of reasoning in one paragraph','Replace every familiar word with a technical term','Delete the conclusion before checking the evidence','Ask for the same comment without revising'],'revise one paragraph first','She will try a focused revision before broader changes.',['That is the approach she rejects.','The plan is strengthening connections, not deleting a conclusion.','She now has an actionable interpretation of the comment.'])]),
c(33,'A sale price with missing parts',`Man: This second-hand desk is much cheaper than the others.
Woman: Does it include the drawers in the photograph?
Man: The description says those are sold separately. I nearly missed that.
Woman: And can you collect it? Delivery isn't offered.
Man: By the time I hire a van and buy storage, the other desk may cost less overall.
Woman: Compare what you'll actually receive, not just the number at the top of the advert.`,[
q('Factual','Which part shown in the photograph costs extra?',["The drawer units","The supporting frame","The desktop itself","The desk’s legs"],'those are sold separately','The photograph shows something excluded from the advertised base price.',["The frame belongs to the basic desk rather than the separate drawer units.","The desk’s main surface is not identified as the separately priced component.","The quoted extra concerns the drawers, not the desk legs."]),
q('Inference','Why may another desk be the better buy?',["The extras may outweigh the advertised saving","The listed price already includes storage components and transport","The other desk must cost less before any additional expenses","Collecting it with a hired van makes the separate drawers unnecessary"],'cost less overall','The man is adding omitted costs to make a fair comparison.',["Those costs are precisely why the total needs checking.","A better total cost need not mean a lower advertised price.","Transport does not replace the missing storage components."])]),
c(34,'A meeting that does not need everyone',`Woman: Our project meetings are getting long. Half the discussion is about editing the video.
Man: Only three of us work on that part.
Woman: Could that group meet separately, then bring back any decisions affecting the whole project?
Man: Yes. We still need everyone for the final story and budget.
Woman: Then let's keep those on the main agenda.
Man: That should free time without leaving the rest of us unaware of important changes.`,[
q('Main Idea','What change to the meetings is proposed?',["Hold specialist discussion in a separate subgroup","Let the video team settle the project’s full budget during its own meeting","Replace the full-group meeting with written decisions from the video team","Keep the whole group together but postpone the video discussion indefinitely"],'Could that group meet separately','The main meeting will retain shared decisions and receive relevant updates.',["Whole-group decisions remain distinct from specialist discussion.","The proposal separates discussions rather than transferring all decisions.","The group can meet separately rather than abandoning the discussion."]),
q('Inference','Which issue should remain at the main meeting?',['A change to the overall project budget','The exact timing of one editor’s cut','A technical adjustment affecting only the video team','A choice with no effect beyond one work subgroup'],'everyone for the final story and budget','A shared resource decision requires the whole group.',['Specialist editing detail can be handled separately.','Only shared consequences need the full meeting.','Such an issue belongs in the subgroup.'])]),
c(35,'The borrowed coat in the photograph',`Man: That old photograph shows my grandfather in a military coat. I assumed he was a soldier.
Woman: Did your family confirm that?
Man: My aunt says he borrowed the coat because the winter was so cold.
Woman: So the photograph tells you what he wore, but not necessarily his occupation.
Man: I'll change the caption. I can mention the coat without turning an assumption into a fact.
Woman: And keep your aunt's account with the photograph.`,[
q('Inference','What has the man learned about interpreting the photograph?',['Visible clothing does not by itself establish a person’s occupation','A relative’s account proves that the photograph is not genuine','Borrowed clothes cannot be mentioned in a caption','The coat must have belonged to his aunt'],'not necessarily his occupation','The new account provides an alternative explanation for the uniform-like coat.',['Authenticity is not questioned.','He can accurately describe the clothing.','Its owner is not identified.']),
q('Factual','What will the man revise?',['The photograph’s caption','The date on his aunt’s birth record','The coat’s original label','The photograph’s physical surface'],'I\'ll change the caption','He will avoid presenting an unsupported occupational claim.',['No birth record is discussed.','The label is not part of the plan.','He changes interpretation rather than altering the image.'])]),
c(36,'Leaving room in a research notebook',`Woman: My field notes are neat, but I can't tell which observations I wrote on site and which I added later.
Man: Could you date the later comments separately?
Woman: Yes. I also need room to explain why I changed an identification.
Man: Keep the original entry and add a correction. Then the reasoning is visible.
Woman: Better than erasing it. Next time I'll leave a wider margin instead of trying to squeeze everything between the lines.`,[
q('Purpose','Why does the man recommend keeping the original entry?',['To preserve the history of an identification and its correction','To prevent any identification from being revised','To avoid dating observations made on site','To make later comments look like original observations'],'Then the reasoning is visible','A preserved entry and added correction document how judgment changed.',['Correction is explicitly allowed.','Separate dating is encouraged.','They want to distinguish later additions.']),
q('Factual','What physical change will the woman make to her notes?',['Leave more space at the margin','Write later comments without dates','Erase each earlier identification','Stop recording observations at the site'],'leave a wider margin','The extra space will accommodate explanations and corrections.',['Dating will distinguish later comments.','She agrees preservation is better than erasing.','On-site observations remain important.'])]),
c(37,'A rehearsal recording that is too fast',`Man: I practiced the speech with a timer, and now I fit ten minutes exactly.
Woman: Let me hear a bit. You're not leaving any pause after the important points.
Man: I thought that was efficient.
Woman: The audience needs time to follow. Could you cut an example rather than speed through all of them?
Man: I'll keep the clearest two and slow down. Finishing on time isn't much help if nobody understands the result.`,[
q('Attitude','What concern does the woman express about the speech?',["The pace leaves too little time to absorb ideas","The examples require equipment that the audience cannot see","The speech is too short to satisfy the assigned time requirement","The final result contradicts the earlier example and needs replacing"],'not leaving any pause','Meeting the time limit by excessive speed harms comprehension.',["The concern is pauses for comprehension rather than equipment access.","The concern is delivery pace, not insufficient duration.","She recommends space to process ideas rather than this substantive correction."]),
q('Factual','How will the man change the speech?',['Use fewer examples and a slower pace','Keep every example and speak even faster','Add another result without changing the pace','Remove pauses only from the conclusion'],'keep the clearest two and slow down','He chooses selection and clearer delivery over speed.',['He abandons that approach.','No extra result is proposed.','He needs more processing space throughout.'])]),
c(38,'An invitation to a different kind of work',`Woman: I signed up to help at the garden, but digging all afternoon may be too much for my knee.
Man: They also need someone to record where the seedlings are planted.
Woman: I could do that. Does it still count as a volunteer shift?
Man: Yes. The record helps next season's team; it isn't just busywork.
Woman: I'll ask for that role rather than cancel. I like the project, even if I can't do every physical task.`,[
q('Inference','Why is the woman considering a different role?',['She wants to participate within a physical limitation','She has lost interest in the garden’s purpose','She wants a paid shift instead of volunteering','She thinks record keeping has no value'],'too much for my knee','She remains interested but needs a suitable activity.',['She says she likes the project.','Payment is not discussed.','The man explains its value, and she accepts the role.']),
q('Purpose','Why does the man mention next season’s team?',['To explain the practical value of the records','To postpone every current volunteer task','To recruit her as the team’s only gardener','To suggest the seedlings will not be planted this season'],'helps next season\'s team','He shows the record is useful rather than a token task.',['Current planting continues.','Several roles are available.','The record concerns where current seedlings are planted.'])]),
c(39,'The coupon that has not reduced the bill',`Man: I entered the discount code, but the total hasn't changed.
Woman: Does it apply to items already on sale?
Man: The small print says full-price items only. Everything in my basket is reduced.
Woman: Then the website probably isn't broken.
Man: Right. I nearly bought another item just to use the code.
Woman: That wouldn't be a saving unless you needed it.
Man: I'll stick with the basket I planned.`,[
q('Factual','Why does the code not reduce the total?',['The basket contains only sale items','The website has stopped accepting any codes','The man has not entered the code','Every item is priced above its original value'],'full-price items only','The stated eligibility condition excludes his reduced items.',['The code’s conditions, not a general failure, explain it.','He has already entered it.','The items are discounted.']),
q('Inference','Why does the man reject adding an item?',['Buying something unnecessary would undermine the saving','The discount requires him to empty the basket','The code applies only to a previously purchased item','The woman says sale goods cannot be ordered'],'unless you needed it','His decision focuses on actual spending rather than using a promotion for its own sake.',['No empty-basket requirement exists.','The condition concerns full-price goods.','The sale goods can still be purchased normally.'])]),
c(40,'Making an interview question neutral',`Woman: My interview starts, "Why was the new bus route such a disappointment?"
Man: That assumes the person was disappointed.
Woman: I was trying to get them talking.
Man: Ask how the route affected their journey first. They might have found it helpful.
Woman: Then I can follow up on whatever they actually say.
Man: Exactly. You can explore difficulties without putting the answer into the question.`,[
q('Method','How does the man suggest improving the interview?',["Ask about experience without assuming criticism","Ask passengers to explain why they agree that the route is helpful","Begin by explaining why the interviewer opposes the route","Select only passengers whose travel became more difficult"],'how the route affected their journey','A neutral opening permits different kinds of response.',["That substitutes a positive leading assumption for the negative one.","That reveals and reinforces a position rather than inviting a neutral account.","That selection would build a negative assumption into the sample."]),
q('Inference','What is wrong with the original opening?',['It builds an evaluation into the question','It asks about an unrelated form of transport','It contains no invitation to describe an experience','It requires the interviewer to have used the route'],'assumes the person was disappointed','The wording presupposes the attitude it should investigate.',['The new bus route is relevant.','It invites explanation but biases its starting point.','The concern is phrasing, not the interviewer’s travel history.'])])
];
