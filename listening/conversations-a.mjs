import {conversation as c,q} from './authoring.mjs';
export default [
c(5,'A timetable that leaves no room',`Woman: You picked three seminars on Wednesday. That's convenient.
Man: In theory. Two finish and start at the same time, on opposite sides of campus.
Woman: Could you watch one online?
Man: Not this term. But the history seminar has a Friday group.
Woman: Would moving that one leave a gap for lunch?
Man: Yes, and I wouldn't spend Wednesday running between buildings. I'll change groups while there are still places.`,[
q('Inference','Why will the man move the history seminar?',['To make Wednesday’s schedule workable','To take all seminars online','To avoid studying on Fridays','To join a seminar without available places'],'running between buildings','The change solves travel and break-time conflicts.',['Online attendance is unavailable.','The proposed solution adds a Friday class.','He intends to act while places remain.']),
q('Attitude','What does the man imply by “In theory”?',['The apparent convenience does not work well in practice','He prefers theoretical seminars to practical ones','He has not yet received any timetable','The buildings’ locations are uncertain'],'on opposite sides of campus','He qualifies the woman’s positive assessment using a practical problem.',['The phrase concerns the timetable, not course content.','He knows the actual class times.','The travel problem relies on known locations.'])]),
c(6,'A poster with too much detail',`Man: Your conference poster has all the results, but the type is tiny.
Woman: I was afraid leaving anything out would seem careless.
Man: Could the full table go in a handout? Keep the main comparison on the poster.
Woman: That would give the graph some space. I can add a short link for people who want the details.
Man: Exactly. You still have the evidence, but visitors can understand the point while standing back.`,[
q('Purpose','Why does the man suggest a handout?',['To preserve detail while making the poster readable','To avoid showing any results at the conference','To replace the poster with a spoken presentation','To add more tables to the poster'],'Keep the main comparison on the poster','The supporting detail can be available separately.',['The main result remains visible.','A change of presentation format is not proposed.','Moving detail off the poster creates space.']),
q('Inference','What has worried the woman about shortening the poster?',['It might appear insufficiently thorough','The handout might use too much colour','The conference might prohibit graphs','Visitors might stand too close'],'would seem careless','She associates omitted information with an impression of carelessness.',['Colour is not mentioned.','Graphs are not prohibited.','Distance is a readability concern raised by the man, not her original worry.'])]),
c(7,'The bicycle repair estimate',`Woman: The shop says my bicycle needs a new wheel, but the estimate is higher than I expected.
Man: Is that including labour?
Woman: Yes. The mechanic said the old wheel can't be straightened safely.
Man: Then comparing just the price of a wheel online won't tell you much.
Woman: True. I'll ask another shop for a complete estimate. I don't want to choose a cheaper part and discover fitting costs extra.`,[
q('Factual','Why is a new wheel recommended?',["The wheel cannot be safely straightened","The replacement wheel costs less than the repair labour","The ordered parts will not fit the bicycle’s current frame","The rider requested a different kind of wheel before the inspection"],'can\'t be straightened safely','The mechanic’s reason is safety, not preference.',["No such comparison is offered as the reason for replacement.","The wheel’s condition, not an incompatible frame, is the problem.","The recommendation follows the condition found in the inspection."]),
q('Inference','What will the woman compare next?',['Total repair costs from another shop','Only online prices for loose wheels','The cost of buying two new bicycles','Labour fees without the replacement part'],'a complete estimate','She wants a like-for-like estimate covering both part and fitting.',['She recognizes this leaves out fitting costs.','She plans a repair rather than two purchases.','A complete estimate includes the necessary part.'])]),
c(8,'A teammate’s quiet contribution',`Man: Priya hardly spoke at our meeting. Do you think she's losing interest?
Woman: Have you seen the document? She reorganized the evidence and added sources last night.
Man: I only looked at the slides.
Woman: She told me she prefers preparing a written suggestion before discussing it.
Man: Then I jumped to conclusions. I'll send the next agenda early so she has time to respond before we meet.`,[
q('Inference','What changes the man’s interpretation of Priya’s silence?',['Evidence of her substantial written work','A promise that she will deliver all the slides','A request that she stop attending meetings','A complaint that the agenda was too detailed'],'reorganized the evidence and added sources','Her work shows engagement despite limited speech.',['No presentation promise is made.','No one asks her to leave.','Early access, not less detail, is proposed.']),
q('Purpose','Why will the man send the agenda early?',['To allow preparation in Priya’s preferred form','To cancel the next discussion','To ask Priya to correct the slides alone','To prevent further written contributions'],'time to respond before we meet','Advance information lets her formulate a response.',['The meeting will still happen.','The change concerns the group’s process, not assigning all correction work.','It supports written contributions.'])]),
c(9,'Getting the deposit back',`Woman: I returned the rented projector, but the deposit hasn't appeared in my account.
Man: Did the desk refund it to your card?
Woman: They said it had been processed yesterday.
Man: Mine took three working days to show up. That isn't the same as the desk keeping the money.
Woman: I'll check again after the weekend, then contact them if it's still missing.
Man: Keep the return receipt in the meantime.`,[
q('Factual','What has the rental desk already done?',['Processed the refund','Rejected the equipment return','Asked for a second deposit','Sent a replacement projector'],'processed yesterday','The desk reports initiating the refund.',['The equipment has been returned.','No further payment is requested.','The discussion concerns money, not replacement equipment.']),
q('Inference','Why does the woman decide to wait?',['A processed refund may take time to appear','The desk is entitled to keep every deposit','Her return receipt has been lost','The projector has not yet reached the desk'],'three working days to show up','The man’s experience distinguishes processing from visible bank credit.',['The deposit is being refunded.','She is advised to keep the receipt.','She has already returned it.'])]),
c(10,'Who needs the original file',`Man: Could you send me the chart as an image? I'm putting it in the newsletter.
Woman: Sure. Do you need to change the labels?
Man: Not this time. The editor just wants a clear copy.
Woman: Then an image is fine. I'll keep the spreadsheet separately in case the numbers need updating later.
Man: Good idea. Please include the source note under the image too; it gets lost when I copy only the graph.`,[
q('Factual','What format does the man need now?',['A clear image of the chart','The full editable spreadsheet','A graph without the source note','A revised set of data labels'],'The editor just wants a clear copy','He does not need to edit the chart.',['The spreadsheet is retained for possible later updates.','He explicitly requests the source note.','No current label change is needed.']),
q('Purpose','Why will the woman keep the spreadsheet?',['To make future data updates possible','To prevent the newsletter from using the image','To remove the original source information','To let the editor change this issue’s labels'],'in case the numbers need updating later','The editable source serves a later need.',['She agrees to supply the image.','The source note must be included.','The current labels do not need changing.'])]),
c(11,'A restaurant that is not booked',`Woman: Is our table confirmed for Saturday?
Man: I sent a request, but the restaurant hasn't replied.
Woman: The website said requests aren't reservations until staff confirm them.
Man: I missed that line. I'll phone before inviting everyone.
Woman: Ask about a later time as well. The early sitting may be full.
Man: Right. I'd rather change the time now than arrive with eight people and no table.`,[
q('Inference','What mistake has the man made?',['Treating a submitted request as a confirmed booking','Inviting eight people to an already canceled dinner','Booking the late sitting instead of the early one','Phoning a restaurant that accepts only online requests'],'requests aren\'t reservations until staff confirm them','The missing confirmation means no table is assured yet.',['He has not yet invited everyone.','No sitting has been confirmed.','The website distinction does not prohibit telephone enquiries.']),
q('Factual','What additional question will the man ask?',['Whether a later time is available','Whether eight separate tables are required','Whether the group should bring its own food','Whether staff have changed the website address'],'Ask about a later time as well','The woman proposes flexibility over sitting time.',['One group table is the goal.','Food arrangements are not discussed.','The website address is not in doubt.'])]),
c(12,'An unhelpful survey question',`Man: I asked whether students found the library useful, and nearly everyone said yes.
Woman: Useful for what? Borrowing books, finding a seat, getting research help?
Man: I didn't separate those.
Woman: Then the result won't tell staff which service needs improvement.
Man: I'll keep the general question but add a few specific ones.
Woman: That should help. People can value the library overall and still have trouble with one part of it.`,[
q('Main Idea','What are the speakers trying to improve?',['The information a library survey collects','The number of seats in a new library','The accuracy of student borrowing records','The wording of the library’s opening hours'],'add a few specific ones','They are revising questions to produce actionable feedback.',['Seating is one possible service, not a planned building change.','Borrowing records are not the survey.','Opening times are not the subject.']),
q('Inference','Why is the original result insufficient?',["A general approval can hide problems with one service","A yes answer establishes satisfaction with every individual service","The survey identifies which service each respondent used most recently","The reported result measures demand rather than general usefulness"],'trouble with one part of it','General approval does not identify which component needs attention.',["The dialogue explicitly allows trouble with one part despite general approval.","The original broad question does not identify that specific service experience.","The broad answer concerns whether the library is useful, not demand by service."])]),
c(13,'Rehearsing without an audience',`Woman: The first rehearsal felt terrible. We kept stopping.
Man: We were trying the lighting cues, remember. A smooth performance wasn't the point yet.
Woman: I suppose we did find the places where the lights changed too late.
Man: Exactly. Fixing those now is better than discovering them with an audience.
Woman: I'll write down the timings before tomorrow. Then we can try a complete run instead of guessing each cue.`,[
q('Attitude','How does the man view the interrupted rehearsal?',['Useful because it exposed technical problems','Disappointing because the audience left','Unnecessary because the cues were already correct','Successful mainly because no timing notes were needed'],'Fixing those now is better','He treats the interruptions as part of finding and fixing faults.',['There was no audience.','Late changes show the cues needed work.','Written timings are the next improvement.']),
q('Factual','What will the woman prepare?',['A record of the lighting timings','A new list of audience members','An invitation to skip tomorrow’s run','Replacement lights for every cue'],'write down the timings','Notes will allow a more complete subsequent rehearsal.',['Audience planning is not discussed.','She intends to prepare for the run.','No equipment replacement is proposed.'])]),
c(14,'Sharing a delivery fairly',`Man: My parcel arrived with yours, but the delivery charge looks larger than last time.
Woman: There was a heavy-item fee for my shelving. You shouldn't pay half of that.
Man: So we'll split the normal delivery cost and you'll cover the extra?
Woman: Exactly. The invoice lists them separately.
Man: That's straightforward, then. I'll send my share tonight.
Woman: Thanks. Combining the order still saved us two separate delivery charges.`,[
q('Factual','How will the extra fee be paid?',['The woman will cover it','Both will split it equally','The delivery company will refund it','The man will pay it instead of normal delivery'],'a heavy-item fee for my shelving','The woman accepts the surcharge generated by her item.',['She says he should not pay half of the surcharge.','No refund is offered.','He contributes his share of the normal charge.']),
q('Inference','Why was combining the orders still worthwhile?',['It avoided paying the basic delivery charge twice','It removed the heavy-item fee entirely','It made both parcels qualify for free delivery','It let them omit one item from the invoice'],'saved us two separate delivery charges','One combined delivery is cheaper than two separate base charges.',['The surcharge remains.','They still have a delivery cost.','Both items remain on the listed invoice.'])]),
c(15,'A scholarship statement with no evidence',`Woman: My application says I'm a good team member. Is that enough?
Man: Can you give an example of something you actually did?
Woman: I coordinated the rota when our volunteer group lost two members.
Man: That's much stronger. Explain the problem, your action, and what changed.
Woman: We still staffed every session. I'll use that rather than adding more adjectives.
Man: Exactly. Let the example show the quality you're claiming.`,[
q('Purpose','Why does the man ask for an example?',['To support a general claim with an observable action','To replace the application with a volunteer timetable','To remove the reference to teamwork','To show that descriptive adjectives are sufficient'],'Let the example show the quality','Concrete evidence substantiates the personal claim.',['The rota is evidence within the statement, not the entire application.','Teamwork remains the claimed quality.','They choose an example rather than more adjectives.']),
q('Factual','What result will the woman describe?',['Every volunteer session remained staffed','Two new members immediately joined','The group reduced the number of sessions','She completed the work without a rota'],'still staffed every session','The outcome demonstrates the value of her coordination.',['No replacement members are mentioned.','The point is maintaining coverage.','Her action involved coordinating the rota.'])]),
c(16,'Waiting for a replacement train',`Man: They canceled our train. The display says use the next service.
Woman: Does our ticket work on it?
Man: The announcement said yes, but seat reservations don't transfer.
Woman: So we can travel without buying again, but might have to stand.
Man: Right. There's another service half an hour later if this one is packed.
Woman: Let's see how full it is before deciding. Getting there early isn't worth a crowded journey today.`,[
q('Factual','What remains valid after the cancellation?',['The travel ticket','The original reserved seat','A refund for a different route','A guaranteed seat on both later services'],'seat reservations don\'t transfer','The ticket is accepted, but its seat allocation is not.',['The seat reservation does not carry over.','No alternate-route refund is discussed.','No later seat is guaranteed.']),
q('Inference','What matters to the woman in choosing a replacement?',['The crowding as well as arrival time','Keeping the canceled train’s seat number','Buying the cheapest new ticket','Leaving before the canceled departure'],'Getting there early isn\'t worth a crowded journey today','She is willing to wait for a more comfortable journey.',['That seat does not transfer.','A new ticket is unnecessary.','The original service has already been canceled.'])])
];
