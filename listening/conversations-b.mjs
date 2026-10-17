import {conversation as c,q} from './authoring.mjs';
export default [
c(17,'An office hour for a better question',`Woman: I went to office hours, but I couldn't explain what I didn't understand.
Man: Could you bring the example where you got stuck?
Woman: I thought I was supposed to have a clear question first.
Man: Showing where your reasoning stops is a clear starting point.
Woman: Then I'll mark the step in my notes. I understand the definition; it's applying it to a new case that loses me.
Man: Say exactly that.`,[
q('Inference','What should the woman bring to the next meeting?',['An example showing the step she cannot complete','A replacement definition for the lecturer','A full solution copied from another student','Only a request for a higher mark'],'mark the step in my notes','A concrete obstacle will help identify the difficulty.',['She already understands the definition.','A copied solution would not reveal her reasoning.','Grades are not the issue.']),
q('Factual','Which part of the material troubles the woman?',["Using the definition in an unfamiliar case","Recalling the definition without looking at her notes","Finding a different definition that avoids the present example","Determining which lecture first introduced the definition"],'applying it to a new case','Her difficulty is transfer, not recalling the definition.',["She can access the definition; application is what troubles her.","The proposed discussion is about using the existing concept.","The date of introduction is not the difficulty identified."])]),
c(18,'The plant that was watered twice',`Man: I watered the office plant this morning. It still looks unhappy.
Woman: I watered it yesterday too. The soil's soaking wet.
Man: I thought a wilted leaf meant it needed more.
Woman: Not necessarily. Let's check the care instructions before doing anything else.
Man: I'll put a watering note by the pot so we don't both act without knowing.
Woman: Good. We can take turns, but first we need to know what this plant actually needs.`,[
q('Inference','What have the speakers discovered about their care routine?',['They acted separately without sharing information','They consistently followed the same written schedule','They forgot to water for several weeks','They own two different office plants'],'I watered it yesterday too','Both independently added water, leaving the soil soaked.',['There was no coordinated schedule.','Water was added on consecutive days.','They discuss the same plant.']),
q('Purpose','Why will the man add a note beside the pot?',['To coordinate future watering','To replace the plant’s care instructions','To record which leaf looks worst','To request a new office location'],'so we don\'t both act without knowing','The note will communicate care already provided.',['They still need the actual care guidance.','Leaf measurement is not the proposed use.','The office location is not discussed.'])]),
c(19,'A photograph that needs permission',`Woman: This picture from the charity walk would look great on our club page.
Man: Has everyone in it agreed to have it posted?
Woman: They agreed to the photograph at the event.
Man: That might not include publishing it online. We should check.
Woman: I'll ask them. If anyone prefers not to appear, we can use the picture of the banners instead.
Man: That still shows what the club did without putting anyone on the spot.`,[
q('Inference','What distinction is the man making?',["Photo consent may not cover online publication","Permission for a club event also permits any later use of its pictures","Publishing a group photograph requires no attention to individual consent","A photograph used for charity has the same consent terms as a private copy"],'might not include publishing it online','Consent for taking a picture need not cover its later use.',["The man distinguishes the publication use from being photographed.","The intended public use still needs consideration.","The purpose alone does not establish the scope of permission."]),
q('Factual','What alternative will the woman consider?',['A photograph of the banners','A cropped copy showing only people’s faces','A different photograph of the same unwilling person','A private message containing everyone’s portraits'],'use the picture of the banners instead','The alternative can show the event without featuring people.',['Faces would retain the consent concern.','A different portrait does not resolve unwillingness.','The proposed replacement is a banner image.'])]),
c(20,'A presentation cut to time',`Man: My practice talk lasted fourteen minutes. We only have ten.
Woman: Which part could the audience read afterward?
Man: The background timeline takes four minutes, but I need some of it to explain the problem.
Woman: Keep the two dates that matter. Put the full timeline in your handout.
Man: Then I can spend more time explaining the result, instead of rushing the conclusion.
Woman: Try it aloud again; cutting four slides doesn't automatically save four minutes.`,[
q('Purpose','Why does the woman suggest retaining only two dates?',['To preserve necessary context while reducing the talk','To remove the research result from the presentation','To fill four extra minutes in the conclusion','To replace spoken explanation with every background detail'],'the two dates that matter','The advice reduces background without losing its function.',['The result should receive more attention.','The problem is exceeding the limit.','The full chronology goes in a handout.']),
q('Inference','Why is another spoken rehearsal needed?',["Fewer slides may not mean enough time saved","The time spent speaking is fixed by the number of slides shown","The shortened version no longer needs to explain the main finding","Restoring the full timeline will necessarily meet the time limit"],'doesn\'t automatically save four minutes','Timing depends on delivery as well as slide numbers.',["The dialogue rejects that direct relationship.","The finding remains part of the presentation.","Adding material does not establish that the shorter limit is met."])]),
c(21,'An awkward queue arrangement',`Woman: I joined the café queue, but apparently that line is only for collecting orders.
Man: The ordering queue starts at the other end. The signs are hard to see behind the crowd.
Woman: I felt silly when they sent me back.
Man: It happened to two people before you. I'll mention it to the manager; moving a sign could save everyone time.
Woman: Thanks. At least I know where to start tomorrow.`,[
q('Factual','What mistake did the woman make?',["She queued to collect before placing an order","She joined a queue for advance bookings instead of same-day orders","She waited for table service when customers collect all meals themselves","She entered the payment queue after collecting a meal"],'that line is only for collecting orders','She entered the wrong stage of the process.',["The stated distinction is between ordering and collecting.","The issue is which queue she joined, not table service.","That reverses the sequence of her actual problem."]),
q('Attitude','How does the man respond to her embarrassment?',['Reassuringly, by showing that the signs confuse others too','Impatiently, because she ignored a clear instruction','Indifferently, because he refuses to discuss the queue','Critically, because he thinks she should manage the café'],'It happened to two people before you','He reduces personal blame and proposes a practical improvement.',['He says signs are hard to see.','He discusses the cause and plans to mention it.','He proposes moving a sign, not appointing her manager.'])]),
c(22,'An interview time-zone error',`Man: The interview invitation says nine in the morning. I assumed that was our time.
Woman: The office is three hours behind us. Did the email specify a zone?
Man: Yes, their local time. So it's noon here.
Woman: Can you still attend?
Man: Fortunately my class ends at eleven thirty. I'll change the calendar entry and include the time zone so the reminder is right.
Woman: And check the meeting link now, rather than at noon.`,[
q('Factual','At what local time should the man join?',['Noon','Nine in the morning','Six in the morning','Eleven thirty'],'So it\'s noon here','The office’s nine corresponds to noon where the man is.',['Nine is the office’s time.','That applies the difference in the wrong direction.','Eleven thirty is when his class ends.']),
q('Inference','What nearly caused the scheduling mistake?',['Assuming the invitation used the recipient’s time zone','A meeting link that had been canceled','A class that lasts until the interview ends','An office that moved its interview to another day'],'I assumed that was our time','The invitation specifies a different local time zone.',['The link is to be checked, not known to be canceled.','Class ends before the corrected interview time.','The day is unchanged.'])]),
c(23,'A group discount with a catch',`Woman: We can get cheaper exhibition tickets as a group of ten.
Man: We only have eight definite replies.
Woman: Two more people said they might come.
Man: The group booking is nonrefundable. Saving money isn't much use if we pay for people who don't attend.
Woman: I'll ask them to confirm by tonight. If we don't reach ten, we'll each buy an ordinary ticket.
Man: That seems safer than guessing.`,[
q('Inference','Why is the man cautious about the discount?',["Paying for uncertain attendees could erase the saving","The lower per-person rate applies only after every attendee has paid separately","The reduced price becomes unavailable as soon as the group reaches ten","The ordinary ticket would require the group to attend on different days"],'pay for people who don\'t attend','A nonrefundable commitment can outweigh the advertised saving.',["The concern is committing the group before attendance is secure.","Ten people are not stated as disqualifying the booking.","No different-day requirement is supplied."]),
q('Factual','What will happen if fewer than ten confirm?',['People will buy individual ordinary tickets','Eight people will share ten group tickets','The exhibition will extend the deadline','The two uncertain people must pay for everyone'],'each buy an ordinary ticket','The woman states a fallback without guessing attendance.',['They decide against speculative group payment.','No extension is promised.','No such charge is proposed.'])]),
c(24,'A recording in the wrong room',`Man: The interview sounded fine through my headphones, but now there's a hum underneath it.
Woman: Was the refrigerator running in that room?
Man: Yes. I didn't notice it while we talked.
Woman: Headphones during the test recording might have caught it.
Man: We can move to the meeting room for the next interview. I'll record thirty seconds and listen back before starting.
Woman: Good. A quiet conversation doesn't always make a clean recording.`,[
q('Inference','What is the likely source of the recording problem?',['Background equipment noise','An interviewee who spoke too quietly to hear','A refrigerator that erased the file','Headphones that recorded a separate conversation'],'Was the refrigerator running in that room?','The exchange identifies room noise as a likely hum source.',['The issue is an added hum, not missing speech.','The file exists and can be played.','No second conversation is described.']),
q('Factual','What check will the man do before the next interview?',['Play back a short recording from the room','Replace every interview question','Leave the refrigerator door open','Record the entire interview before checking'],'record thirty seconds and listen back','A short playback check can reveal unwanted noise in advance.',['The questions did not cause the hum.','Opening the refrigerator is not the proposed solution.','He intends to check before the main interview.'])]),
c(25,'Choosing a manageable reading plan',`Woman: I made a reading plan with six articles a day. I'm already behind.
Man: Are all six equally important for your paper?
Woman: No. Two explain the main argument; the rest are examples.
Man: Start with the central ones and take notes on how they connect. You can select examples afterward.
Woman: That feels more realistic. I was measuring progress by the number of pages, not by what I understood.
Man: A smaller useful set beats a rushed pile.`,[
q('Purpose','Why does the man distinguish central articles from examples?',['To prioritize reading that supports understanding','To make the woman abandon her paper','To show that examples cannot support an argument','To require an equal page count every day'],'Start with the central ones','The suggested order follows conceptual importance.',['The advice supports the paper.','Examples can be selected later.','He rejects quantity as the only measure.']),
q('Attitude','How does the woman feel about the revised approach?',['It is more achievable than her original quota','It requires more daily articles than before','It has no connection to her main argument','It will let her avoid taking any notes'],'That feels more realistic','She sees the priority-based plan as manageable.',['The suggested starting set is smaller.','The central argument determines the priorities.','The man explicitly recommends connection notes.'])]),
c(26,'The parcel with an old address',`Woman: My order says delivered, but I haven't received it.
Man: Could it have gone to your old address?
Woman: I changed the address in my account last week.
Man: Did that update the order already placed?
Woman: Oh, the receipt still shows my previous flat. I'll contact the seller with the order number.
Man: And check whether the old building's reception has it. Changing an account doesn't always change an existing delivery.`,[
q('Inference','What does the receipt reveal?',["The order still lists the previous address","The account settings show the old address despite her attempted change","The delivery company has changed the address since dispatch","The seller has canceled delivery to her former flat"],'receipt still shows my previous flat','The account change did not carry into that placed order.',["She changed the account; the existing order is the distinct problem.","The receipt shows the order’s retained address, not a later carrier change.","The receipt does not establish that cancellation."]),
q('Factual','Which additional action does the man suggest?',['Ask the old building’s reception about the parcel','Place the same order again immediately','Delete the account before contacting the seller','Collect the parcel from the warehouse without confirmation'],'check whether the old building\'s reception has it','Reception at the recorded address is a possible collection point to investigate.',['Duplicate ordering does not locate this parcel.','He suggests using the order information.','No warehouse location is established.'])]),
c(27,'A class swap that changes an assessment',`Man: The afternoon language group fits my timetable better. I'll switch.
Woman: Check the assessment schedule first. That group does the oral test next week.
Man: Ours isn't until the following week. I hadn't noticed the difference.
Woman: The course content is the same, but the groups don't do every task on the same day.
Man: Then I'll ask whether switching means taking the earlier test. A free afternoon isn't worth losing a week of preparation.`,[
q('Factual','How does the afternoon group’s test differ?',['It takes place one week earlier','It covers a different language','It replaces the written course content','It requires no preparation'],'That group does the oral test next week','The current group tests the following week.',['The course content is the same.','The discussion is timing, not course replacement.','The man values preparation time.']),
q('Inference','What will influence the man’s decision now?',['Whether the switch reduces his preparation time','Whether the oral test can be replaced with attendance','Whether the afternoon class is canceled','Whether every task must be completed twice'],'losing a week of preparation','He weighs assessment readiness against timetable convenience.',['No assessment replacement is proposed.','The group is available.','Duplicate assessment is not suggested.'])]),
c(28,'Borrowing rather than buying',`Woman: I need a drill to put up one shelf, but buying one seems wasteful.
Man: The neighbourhood tool library lends them out.
Woman: Is membership expensive?
Man: There's a small annual fee, and you book the tool for a few days. You need to return it clean and complete.
Woman: That might make sense. I'll check if the right drill is available before joining.
Man: Good plan. Membership doesn't guarantee a particular tool is free that day.`,[
q('Main Idea','What alternative are the speakers discussing?',['Borrowing a tool through a lending scheme','Paying someone to build a new library','Selling a drill after one use','Joining a workshop to make tools'],'tool library lends them out','The scheme offers temporary access instead of ownership.',['The library already exists.','The suggestion is borrowing, not resale.','Tool manufacturing is not described.']),
q('Inference','Why will the woman check availability before paying?',["Paying the fee does not reserve that drill","The annual membership fee includes the drill’s purchase price","New members must buy cleaning supplies before checking the tool list","The tool will be held for a year once the membership payment arrives"],'doesn\'t guarantee a particular tool is free','Joining and securing a specific booking are different steps.',["Membership provides lending access rather than buying the drill.","Cleaning requirements do not make this an advance purchase condition.","Membership duration is not a year-long reservation."])])
];
