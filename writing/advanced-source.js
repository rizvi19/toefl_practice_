// 500 independently authored exercises in 50 teaching families. No name-swapping templates.
// context | fixed opening | ordered phrase tiles | fixed ending | item-specific analysis | unused tile
const groups=[];
function g(id,title,rule,trap,rows){groups.push({id,title,rule,trap,rows:rows.trim().split('\n')});}
g('embedded-wh','Embedded wh-questions','Inside a question embedded after know, explain, or wonder, use wh-word + subject + verb. Inversion belongs to the outer direct question, not the embedded clause.','Do not insert do/does/did into an embedded clause that already contains its tensed verb.',`
The timetable changed without an announcement.|Could you tell me |when / the revised timetable / will be / published|?|The revised timetable is the subject of will be published.|does
The survey link has disappeared.|I cannot understand |why / the survey / is no longer / available|.|Why introduces the cause being questioned; the survey precedes is.
Our tutor mentioned a replacement textbook.|Do you remember |which textbook / she / recommended / for the course|?|She is the subject; which textbook is the object of recommended.
I need to calculate the printing charge.|Please explain |how / the printing fee / is / calculated|.|The fee receives the action, so the embedded predicate is passive.
The proposal returned with no comments.|I would like to know |why / the proposal / that we submitted / has not / been reviewed|.|That we submitted modifies proposal; has not been reviewed is the main embedded predicate.
The course has prerequisites I do not recognize.|Can you explain |which qualifications / applicants / are expected / to have / before enrolling|?|Applicants are expected is passive, followed by the infinitive to have.
The sample was accepted even though its label was missing.|Nobody has explained |how / the sample / could have / been identified / without its label|.|Could have been identified combines modal, perfect and passive layers.
The staff keep referring to a decision made last month.|I wonder |what / the committee / had agreed / before / the funding was withdrawn|.|The committee had agreed occurred before the later withdrawal.
The revised policy mentions students already enrolled.|Could you clarify |how / students / who are already enrolled / will be / affected / by the change|?|Who are already enrolled modifies students, the subject of will be affected.
We cannot trace the source of the conflicting figures.|We need to establish |which version / the analysts / were using / when / the discrepancy arose|.|Which version is the object; the analysts were using keeps statement order.
`);
g('embedded-whether','Whether, if and alternative questions','Use whether/if + subject + verb for an embedded yes/no question. Use whether before an infinitive or directly after a preposition; whether ... or expresses alternatives.','Whether is not interchangeable with a question auxiliary; do not invert the embedded subject.',`
The room booking is still provisional.|Please check |whether / the room / has been / reserved|.|Whether introduces a yes/no uncertainty about a completed reservation.|did
I cannot decide which session to attend.|I am unsure |whether / to attend / the morning session / or the evening one|.|Whether can introduce an infinitive choice between two sessions.
The notice does not mention an admission fee.|Do you know |if / visitors / are required / to pay|?|If introduces an indirect yes/no question, not a future condition here.
We may need the original receipt.|Everything depends on |whether / the office / accepts / a scanned copy|.|Whether is required directly after the preposition on.
The organizer cannot promise an outdoor venue.|We have not decided |whether / to hold / the ceremony / outside / or in the hall|.|The two location alternatives belong to the same hold infinitive.
Your explanation assumes the laboratory will remain open.|The question is |whether / the laboratory / will remain open / after / the repairs begin|.|Whether introduces a content clause functioning as the complement of is.
The scholarship has different rules for returning students.|Can you confirm |whether / applicants / who have already graduated / are eligible / for this award|?|The relative clause modifies applicants; the main verb is are.
Two advisers disagree about resubmission.|I need advice on |whether / to revise / the existing application / or / to submit / a new one|.|Whether follows on and coordinates two parallel to-infinitives.
The minutes do not record a final vote.|There is some doubt about |whether / the amendment / had actually been approved / before / the meeting ended|.|The passive perfect marks an approval allegedly preceding the meeting’s end.
Our group needs a firm answer about reimbursement.|Please let us know |whether / the expenses / will be reimbursed / regardless of / which supplier / we choose|.|The outer whether-clause contains a second embedded choice after regardless of.
`);
g('subject-object-questions','Subject questions versus object questions','A subject wh-phrase is followed directly by its verb. An object wh-phrase needs normal question inversion of the auxiliary and subject. A longer noun phrase can still be one subject.','Do not add a second subject to a subject question or omit the auxiliary from an object question.',`
One of the new rules affects evening students.| |Which rule / affects / students / who attend / evening classes|?|Which rule is the subject of affects; students is its object.|does
Someone approved the revised budget.| |Who / approved / the budget / that the club / submitted|?|Who is the subject of approved; the relative clause identifies the budget.
You consulted several people about the timetable.| |Whom / did / you / consult / about the timetable|?|Whom is the object, so did precedes the separate subject you.
Several departments have offered equipment.| |Which departments / have offered / to lend / their equipment|?|Which departments is the subject of the present perfect have offered.
We need the person responsible for reviewing appeals.| |Who / is responsible / for reviewing / applications / that were initially rejected|?|Who is the subject; for takes the gerund reviewing and a relative clause identifies applications.
The revised figures support one of the competing explanations.| |Which explanation / do / the revised figures / appear / to support|?|The explanation is the object of support; do agrees with plural figures.
Your supervisor asked for an additional document.| |Which document / has / your supervisor / asked / you / to provide|?|The object question uses has before supervisor; ask takes you to provide.
One change will make the procedure less confusing.| |What / would make / the procedure / easier / for new students / to follow|?|What is the subject of would make; easier is an object complement.
An unknown reviewer raised a concern about consent.| |Who / questioned / whether / the participants / had given / informed consent|?|Who is the outer subject; whether introduces the embedded yes/no content.
Several observations challenge what we originally assumed.| |Which observations / are inconsistent / with / what / the researchers / originally predicted|?|The wh-subject takes are; what the researchers predicted is a nominal clause after with.
`);
g('nested-direct','Direct questions with embedded clauses','Build the outer direct question with auxiliary + subject. Any statement or question nested inside it retains its own clause order and verb pattern. Negative questions can express surprise.','Do not extend outer-question inversion into a that-, whether-, or relative clause.',`
I thought your course had no final presentation.| |Didn't / you / say / that the course / included / a presentation|?|Didn’t takes the base verb say; the reported clause uses included.|said
The assistant promised to check the calculations.| |Has / she / explained / why the totals / do not match|?|Has precedes she; why the totals do not match keeps embedded order.
The new tutor may already know the software.| |Could / you / ask / whether the tutor / has used / this software before|?|Could takes ask; whether introduces a present-perfect embedded question.
The message suggested the fee had been waived.| |Are / we / supposed to / assume / that no payment / is required|?|Are we supposed to forms the outer question; payment is required is passive.
The meeting is tomorrow, but the room is still unconfirmed.| |Shouldn't / someone / have checked / whether the room / was available / before inviting everyone|?|Shouldn’t have checked expresses a past expectation; whether-clause order stays declarative.
Your draft treats the original findings as conclusive.| |Would / it / be reasonable / to question / whether those findings / have been replicated|?|The outer would-question contains an infinitive and a passive embedded question.
The notice arrived after the application closed.| |How / could / applicants / have known / that the deadline / had been brought forward|?|Could applicants have known is inverted; had been brought forward describes an earlier change.
The form requires a signature from someone we have never met.| |Why / are / we / being asked / to contact / a supervisor who has already retired|?|Are we being asked is a progressive passive; who has retired modifies supervisor.
The lab cannot reopen without a safety inspection.| |When / do / you / expect / the inspection / that is still outstanding / to be completed|?|Expect takes an object and passive infinitive; the relative clause modifies inspection.
The committee has not explained its interpretation of the rule.| |What / would / you / advise / a student whose application was rejected / to do / next|?|Advise takes the long object a student whose application was rejected before to do.
`);
g('relative-subject','Subject relative clauses and clause boundaries','A subject relative pronoun supplies the subject of its own clause. Keep the relative clause with the noun it modifies, then identify the main verb outside it.','Do not supply an extra he/it/they after a subject relative pronoun.',`
I need a study group with a flexible schedule.|I am looking for a group |that / meets / after / the evening lectures|.|That is the subject of meets and refers to a singular group.|it
The students received a special invitation.|Those |who / completed / the training / are eligible / to apply|.|Who completed the training modifies those; are eligible is the main predicate.
Which software would help inexperienced users?|The program |that / provides / step-by-step guidance / is / the most suitable|.|That provides modifies program, which controls main-clause is.
The missing document delayed our approval.|A document |that / confirms / your identity / must be / attached|.|Confirms belongs to the relative clause; must be attached is the main passive.
The coordinator mentioned several scholarships.|The scholarships |that / cover / accommodation as well as tuition / tend / to attract / more applicants|.|Plural scholarships controls both cover inside the relative clause and tend outside it.
How can we find reliable reports?|Reports |that / explain / how the data were collected / are / easier / to evaluate|.|How the data were collected is nested inside the relative clause explaining reports.
The first survey overlooked students studying remotely.|Students |who / had been attending / classes online / were not included / in the original sample|.|Who had been attending modifies students; were not included is the main passive.
The board needs a policy that can survive changes in staffing.|A policy |that / depends / on one person's availability / is unlikely / to remain / effective|.|The relative clause identifies the dependency; is unlikely to remain is the main predicate.
The new account still cannot access our files.|The permission |that / allows / outside users / to view these files / has not / been activated|.|Allows takes outside users to view; singular permission controls has not been activated.
Why should we retain the unsuccessful trial results?|Evidence |that / challenges / what we expected / can be / just as informative / as evidence that confirms it|.|The subject relative contains a nominal what-clause; the main comparison balances two kinds of evidence.
`);
g('relative-object','Object relatives and prepositions','In an object relative, the noun is already represented by that/which/whom or a gap. The clause still needs its own subject. Formal preposition + whom/which must stay together.','Avoid duplicating the relative object with it/them. A preposition can be stranded or fronted, but not both.',`
The adviser suggested an optional workshop.|The workshop |that / she / recommended / is / already full|.|She is the subject of recommended; that represents its object.|it
I spoke to a staff member about the appeal.|The person |to whom / I spoke / explained / the next step|.|To whom supplies the object of spoke to; explained is the main verb.
Which notes should we use for the revision?|Use the notes |that / the tutor / posted / after the seminar|.|The tutor is the relative subject; that refers to the object notes.
We used an unusual method for comparing the samples.|The method |by which / the samples / were compared / was / carefully documented|.|By which introduces the method of comparison; singular method controls was.
The committee questioned the assumptions in your model.|The assumptions |on which / our model / was based / have / been revised|.|On which belongs to was based on; have been revised agrees with assumptions.
An external reviewer has evaluated both proposals.|The proposal |which / the reviewer / considered / more feasible / will receive / funding|.|Which is the object of considered and more feasible is its object complement.
Did the provider specify conditions for cancellation?|The conditions |under which / bookings / can be canceled / are / listed / on the receipt|.|Under which introduces the relevant circumstances; are listed is the main predicate.
We should revisit the evidence you used to reach that conclusion.|The evidence |from which / you / drew / that conclusion / does not / establish a causal link|.|From which belongs to drew; singular noncount evidence takes does not establish.
The editor returned the chapter that our team had rewritten.|The chapter |that / we / had spent / weeks revising / needs / further clarification|.|Had spent weeks revising forms the relative clause; needs is the main verb.
The grant requires cooperation between departments.|The departments |with which / the project team / will be collaborating / have not yet / appointed / representatives|.|With which belongs to collaborating; departments controls the main perfect have appointed.
`);
g('relative-possession','Whose, where and supplementary relatives','Whose modifies a noun to show possession. Where introduces a place relationship. A supplementary which-clause can comment on a whole preceding proposition rather than one noun.','Do not replace whose + noun with who + noun; distinguish a place from the object of a verb.',`
An applicant submitted a portfolio with missing pages.|The applicant |whose / portfolio / was incomplete / has been / contacted|.|Whose portfolio means the applicant’s portfolio; has been contacted describes the applicant.|who
We need a place suitable for confidential interviews.|Choose a room |where / conversations / cannot be / overheard|.|Where links the room to the passive situation of conversations being overheard.
The author will discuss her latest research.|The researcher |whose / work / you cited / is speaking / next|.|Whose work is the object of cited; researcher is the subject of is speaking.
The department moved without notifying us.|The office relocated, |which / explains / why / our letters / were returned|.|Which comments on the relocation, not only the office.
The exhibition includes work from students who studied overseas.|Students |whose / projects / reflect / different cultural experiences / will present / first|.|Projects is the relative subject of reflect; students controls will present.
The old reading room has become a laboratory.|The building |where / we / used to study / now houses / a research center|.|Where replaces a location relation; the building is the main subject of houses.
We found a supplier whose delivery dates are reliable.|A supplier |whose / delivery schedule / we can depend on / would reduce / the risk / of further delays|.|Whose delivery schedule is the object of depend on within the relative clause.
The deadline was extended after several students reported problems.|The deadline was extended, |which / gave / students whose uploads had failed / another opportunity / to submit / their work|.|Which represents the extension; the long indirect object contains a second relative clause.
The training takes place in a room with no reliable internet.|The room |in which / the training / is scheduled / cannot support / the activities / we have planned|.|In which introduces the location; the final object contains an omitted object-relative pronoun.
Several survey participants could no longer be reached.|Participants |whose / contact details / had changed / were excluded / from the follow-up, / which reduced the sample size|.|Whose marks ownership of details; the final which-clause comments on the exclusion’s effect.
`);
g('reduced-relatives','Reduced active and passive relative clauses','An -ing phrase can reduce a relative describing an active subject; a past-participle phrase can describe a passive relationship. The main clause still needs a finite verb.','Do not confuse the participle in a noun modifier with the main tensed predicate.',`
Some forms still need signatures.|Forms |submitted / without a signature / will be / returned|.|Submitted means that were submitted; will be returned is the finite predicate.
The students waiting outside have appointments.|Students |waiting / for an appointment / should check in / at reception|.|Waiting reduces who are waiting and actively describes students.
Which equipment has priority for repair?|Equipment |damaged / during the move / must be / inspected first|.|Damaged is passive in meaning and modifies equipment.
Our course has an additional option for part-time students.|Students |taking / the course part-time / may request / an alternative deadline|.|Taking means who are taking; may request is the main predicate.
The archive contains reports that were never published.|Reports |written / before the policy changed / may contain / terminology / that is no longer used|.|Written is a reduced passive relative; the final relative modifies terminology.
We cannot process applications missing proof of residence.|Applications |lacking / the required evidence / will not be considered / until / the omission / has been corrected|.|Lacking actively describes applications; the main clause is passive.
Does the notice apply to all experimental materials?|Materials |stored / in the shared freezer / must remain / clearly labeled / throughout / the experiment|.|Stored means that are stored; remain takes the adjective complement labeled.
The funding is reserved for ongoing community projects.|Projects |involving / local residents / are more likely / to receive / support / than projects conducted entirely on campus|.|Involving is active; conducted is passive in the comparison phrase.
Why were several proposals removed from the shortlist?|Proposals |considered / too costly to implement / were omitted / from the list / circulated / to reviewers|.|Considered modifies proposals; circulated separately modifies list.
Which observations can be included in the analysis?|Observations |recorded / after the sensor failed / cannot be treated / as evidence / supporting / the original hypothesis|.|Recorded modifies observations passively; supporting modifies evidence actively.
`);
g('nominal-relatives','What, whoever and fused relatives','What can mean the thing(s) that and form a noun clause. Whoever/whatever can supply an unrestricted person/thing. Treat the complete clause as a sentence constituent.','Do not add a redundant noun or that after a fused what-relative.',`
The instructions do not match the demonstration.|What matters is |what / the instructor / actually demonstrated / in class|.|What the instructor demonstrated functions as the complement of is.|that
We need to preserve the important part of the record.|Keep |whatever / you / need / for the final report|.|Whatever combines the object idea and its relative link.
Who will receive the spare ticket?|Give it to |whoever / arrives / at the desk / first|.|Whoever is the subject of arrives inside a clause functioning after to.
The editor asked us to distinguish results from assumptions.|What we observed |was / different / from / what we had predicted|.|The second what-clause is the object of from and describes the earlier prediction.
The committee wants an explanation of the delay.|What caused the delay |was / not / what / the organizer / initially suspected|.|Two what-clauses refer to the actual cause and the suspected cause.
Nobody knows who will coordinate the volunteers.|Whoever accepts the role |will have / to ensure / that everyone / knows / what to do|.|Whoever-clause is the main subject; the that-clause contains an embedded infinitive question.
We may have misunderstood the reviewers' request.|What the reviewers wanted |was / for us / to explain / how / the participants / had been selected|.|For us to explain supplies the requested action, followed by a passive embedded question.
The workshop should be open to students with different goals.|Participants should choose |whichever / activity / best matches / what / they / hope to learn|.|Whichever modifies activity; what they hope to learn specifies the match.
The new measurements undermine our first account of the problem.|What we now know |makes / what / we assumed / at the beginning / difficult / to defend|.|One what-clause is the subject; another is the object of makes, with difficult as complement.
The group needs a shared record, regardless of who attends.|Whatever is decided |must be documented / so that / whoever / misses the meeting / can understand / the outcome|.|Whatever-clause is passive subject content; whoever is the subject in the purpose clause.
`);
g('content-clauses','Noun content clauses and apposition','A clause after fact, possibility, concern or evidence can state that noun’s content. It differs from a relative clause: a content clause already has its own complete subject and predicate.','Use that to introduce a statement’s content and whether to introduce uncertainty; do not create a missing object.',`
We were surprised by the cancellation.|The fact |that / the lecture / was canceled / was / unexpected|.|The that-clause states the fact; the second was is the main verb.
There may be a cheaper alternative.|We should consider the possibility |that / a shared license / would cost / less|.|That introduces the content of the possibility, not a relative object.
The office may not accept late documents.|The question |whether / late documents / can be accepted / remains / unresolved|.|Whether states the unresolved yes/no question after the noun question.
Your explanation depends on an untested assumption.|The assumption |that / every participant / understood the instructions / needs / to be tested|.|Every participant understood the instructions is a complete content clause.
The board did not explain why it had changed course.|The decision |to abandon / the original plan / raised concerns / that / the consultation / had been meaningless|.|To abandon specifies decision; that-clause gives the content of the concerns.
The reviewers suspect that the samples were mixed up.|There is no evidence |that / the samples / had been mislabeled / before / they reached / the laboratory|.|The evidence content includes a passive perfect before a later past event.
Could the same approach work with a much larger class?|The issue |of whether / the method / can be scaled up / has received / little attention|.|Of whether introduces the issue’s content; singular issue controls has received.
The change was announced before anyone had tested it.|The claim |that / the revised system / would be more reliable / was based / on results / that had not been verified|.|The first that-clause supplies claim content; the second is a relative modifying results.
The panel wants to know whether students approve of the policy.|The belief |that / students / support the policy / should not be confused / with evidence / that they were consulted|.|Belief content and evidence content are different propositions.
The chair rejected the idea of inviting an outside reviewer.|The suggestion |that / an independent reviewer / should examine / what had gone wrong / was dismissed / without discussion|.|The suggestion’s content includes a nested what-clause as the object of examine.
`);

g('real-conditions','Real conditions with embedded detail','For an open future condition, use a present form after if and a future/modal result. A relative or content clause inside the condition does not change that relationship.','Do not put will in an ordinary if-clause merely because its meaning concerns the future.',`
The room may become available.|We will book it if |the group / that reserved it / cancels / its meeting|.|Reserved identifies the group; cancels states the condition.|will
Can the club afford the materials?|We can proceed if |the estimate / includes / everything / we need|.|Includes is present; we need modifies everything.
The printer requires a code.|If you enter the code, |the machine / will print / whichever document / you selected|.|Will print is the result; whichever introduces its object.
Some applicants may need more time.|If the deadline changes, |students / who have already applied / will receive / an update|.|The relative identifies students; will receive is the result.
The method has not been tried with beginners.|We will recommend it if |students / who lack prior experience / can follow / the instructions / without assistance|.|Can follow tests a real condition, not a hypothetical past.
The committee needs evidence before approving payment.|The claim will be accepted if |the receipts / demonstrate / that the expenses / were necessary / for the project|.|The present demonstrate introduces evidence about past expenses.
The trial may reveal a fault.|If a problem emerges, |we will revise / the procedure / before / any further data / are collected|.|The result precedes a present passive time clause.
Will the revised plan be approved?|Approval is likely if |the revised plan / addresses / the concerns / that / the panel / raised|.|Addresses is the condition’s main verb; raised belongs to the relative.
We need an option for students working off campus.|If remote access is permitted, |anyone / who cannot attend / will be able / to follow / what happens / online|.|Future ability applies to anyone identified by the relative clause.
Can we retain the original research question?|We can retain it if |the evidence / we gather / supports / what / the proposal / predicts|.|We gather modifies evidence; supports takes the what-clause as object.
`);
g('conditional-links','Unless, provided, as long as and even if','Unless means if not; provided/as long as introduce requirements; even if introduces a condition that does not change the result. Match the connector to the intended meaning.','Do not add a second negative after unless when the meaning already requires if not.',`
The application needs a reference.|It cannot be processed unless |a referee / agrees / to confirm / your experience|.|Unless states the missing condition preventing processing.|not
Is it possible to extend the loan?|You can keep it provided that |nobody else / has / a reservation / for it|.|Provided that introduces the requirement for extension.
The group can use the workshop equipment.|Access is allowed as long as |a trained supervisor / is / present / throughout the session|.|As long as means on condition that, not elapsed duration.
A refund is unlikely despite the delay.|Even if you complain, |the fee / may not / be refunded / under this policy|.|Even if marks a condition that may not change the outcome.
We cannot distribute the recording without permission.|Unless everyone consents, |the recording / must remain / unavailable / to people / outside the group|.|Unless already means if everyone does not consent.
We need assurance that students can still see the material.|The update can go ahead provided that |existing users / retain / access / to everything / they have already purchased|.|Retain is present; the relative identifies existing purchases.
Could we avoid changing the venue?|We can use the original venue as long as |the entrance / that is being repaired / is reopened / before / the guests / arrive|.|The condition includes a progressive relative and a present time clause.
The data will be incomplete even with more volunteers.|Even if participation increases, |we will still / lack / evidence / about students / who have already left|.|Still emphasizes a limitation unaffected by the condition.
The club may lose its storage space.|Unless a suitable alternative is found, |we will have / to postpone / activities / that require / equipment / to be stored overnight|.|The unless-clause is passive; require takes equipment plus passive infinitive.
The new timetable must not disadvantage evening students.|We will support it only if |students / whose classes end late / are given / enough time / to reach / the shuttle stop|.|Only if makes the condition necessary; the passive applies to a qualified group.
`);
g('second-conditional','Hypothetical present and future conditions','An unreal or remote present/future condition commonly uses if + past form with would/could + base verb. Formal were can be used for hypothetical be.','Past morphology can mark remoteness rather than past time; do not substitute would in both clauses.',`
The room is too small for everyone.|If it were larger, |we / could invite / all the students / on the waiting list|.|Were marks a hypothetical present room size.
Our office closes before the evening class.|If it stayed open later, |students / would not need / to leave / their lectures early|.|Stayed is a remote condition; would not need is its result.
The course currently has no practical component.|If it included a placement, |students / would gain / experience / that employers value|.|Included is hypothetical; the relative identifies useful experience.
I cannot advise you without seeing the feedback.|If I knew the reasons, |I / could suggest / a more effective / response|.|Knew describes missing present knowledge.
Our team has no member with design experience.|If someone had those skills, |we / would be able / to produce / the diagrams / without / outside help|.|Had means possessed here; it is not a perfect auxiliary.
The archive has not been digitized.|If the records were searchable, |researchers / would spend / less time / locating / the evidence / they need|.|Were searchable describes an unreal state; spend takes locating.
The proposed rule could create additional work.|If that rule applied to every request, |staff / would have / to verify / information / that is already / on file|.|Would have to expresses an obligation resulting from the hypothetical rule.
Your argument depends on equal access to technology.|If access were genuinely equal, |the comparison / would be / more convincing / than / it currently / is|.|Were introduces the unreal condition; the comparison contrasts actual persuasiveness.
Nobody is available to coordinate both teams.|If the roles were combined, |the coordinator / would need / to understand / how / both departments / operate|.|Would need takes an infinitive containing an embedded how-clause.
We are considering a system with no appeal process.|If errors could not be challenged, |students / would have / little confidence / that / decisions / were fair|.|The condition is passive; confidence takes a content clause about fairness.
`);
g('third-conditional','Past unreal conditions','If + had + past participle with would/could/might have + past participle presents an alternative to a completed past. Passive forms can occur in either clause.','Had is the perfect auxiliary here; would have is not used in the ordinary if-clause.',`
We missed the last registration date.|If we had applied earlier, |we / would have received / a place / on the course|.|Both clauses refer to an unreal alternative past.
The instructions arrived after the test.|If they had arrived on time, |the students / could have / prepared / properly|.|Could have prepared expresses lost past possibility.
The group did not notice the missing page.|If someone had checked the file, |the omission / would have been / discovered / sooner|.|The unreal result is perfect passive.
The lecture room was locked when we arrived.|We could have entered if |the caretaker / had left / the key / at reception|.|Had left is an unreal past condition after if.
We used the wrong version of the questionnaire.|If the revised version had been circulated, |we / would not have / collected / responses / to questions / that had been removed|.|The passive condition precedes the hypothetical collection and earlier removal.
The experiment failed because the samples became too warm.|If the temperature had been monitored, |the technician / might have / noticed / that the freezer / was not working|.|Might have noticed is uncertain, rather than a guaranteed result.
An unclear message caused several students to withdraw.|If the message had explained the alternatives, |fewer students / would have / assumed / that withdrawal / was / their only option|.|The hypothetical belief concerns options at the earlier time.
The booking was canceled because nobody replied.|The room would have remained available if |the organizer / had confirmed / how many people / were planning / to attend|.|The unreal condition contains an embedded question about planned attendance.
We did not preserve the intermediate results.|If those results had been retained, |the reviewers / could have assessed / whether / the change / affected / our conclusion|.|The passive condition enables an unreal assessment of an embedded issue.
The report was rejected for an error that a colleague had noticed.|If the correction had been incorporated, |the report / might not have / been rejected / for a mistake / that had already / been identified|.|Both the unreal result and the earlier identification are passive perfects.
`);
g('mixed-conditional','Mixed-time conditionals','Choose tense by the time of the condition and result. A past unreal cause can have a present result; an ongoing present trait can explain an unreal past outcome.','Do not automatically make both clauses past perfect just because one event is past.',`
I did not take the introductory course.|If I had taken it, |I / would understand / this material / now|.|The missed course is past; understanding is a present result.
We bought equipment that is too heavy.|If we had chosen a lighter model, |we / could carry / it / without assistance|.|Past choice affects current ability.
Our adviser is cautious and rejected the risky plan.|If she were less cautious, |she / might have approved / the plan / last week|.|A present trait explains a hypothetical past decision.
The team ignored the repair warning.|If we had acted on it, |the laboratory / would still / be / available|.|Had acted concerns the past; would be concerns the present.
The assistant has no access to the database.|If access were not restricted, |she / could have verified / the figures / before / submitting / the report|.|An ongoing restriction explains a lost opportunity before submission.
I moved away and can no longer attend in person.|If I had remained nearby, |I / would be attending / the seminar / with everyone else / this semester|.|Past relocation affects a continuing present activity.
We did not reserve a backup venue.|If we had arranged an alternative, |we / would not be / wondering / where / to hold / tomorrow's event|.|A past omission leads to present uncertainty about a future event.
The method relies on equipment we do not own.|If the procedure were less demanding, |we / could have completed / the trial / using / the equipment / already available|.|Present procedural demands explain unreal past feasibility.
The supplier sent parts that do not fit.|If the specifications had been followed, |we / would not need / to replace / components / that should have / worked together|.|The past passive condition produces a present need; should have expresses failed expectation.
I am not confident enough to chair a difficult meeting.|If I were more experienced, |I / would have challenged / the assumption / on which / yesterday's decision / was based|.|A general present limitation explains a hypothetical challenge to a past decision.
`);
g('wish-preference','Wish, regret and would rather','Wish + past form often marks an unreal present; wish + past perfect expresses past regret. Would rather can take a bare infinitive or a past-form clause with a different subject.','Distinguish wanting a present change from regretting a finished event.',`
I missed the optional tour.|I wish |I / had signed up / before / registration closed|.|Had signed up expresses regret about a finished opportunity.
The office is difficult to reach.|I wish |the office / were / easier / to contact|.|Were marks an unreal present situation.
The group wants to delay the vote.|We would rather |discuss / the objections / before / voting|.|Would rather takes bare discuss, not to discuss.|to discuss
Your draft quotes the old policy.|I would rather |you / used / the revised wording / instead|.|Different-subject preference uses you used for a desired present action.
I shared the recording without asking everyone.|I wish |I / had checked / whether / all the participants / had agreed / to be recorded|.|Past regret contains an embedded question about earlier consent.
The committee keeps changing the conditions.|I wish |the committee / would explain / why / the requirements / keep / changing|.|Would explain requests a change in behavior; why-clause order remains declarative.
The editor insists on publishing immediately.|I would rather |the findings / were checked / by someone / who was not involved / in collecting / the data|.|Were checked expresses preferred passive review by an independent person.
We relied on a single untested source.|If only |we / had compared / what it said / with / the original / documents|.|If only plus past perfect intensifies regret about an omitted comparison.
I cannot change the venue now.|I wish |it / were possible / to choose / a room / that everyone / could reach|.|Were possible is a present unreal state containing an accessible-room relative.
The dean wants me to announce the result before approval.|I would rather |not announce / anything / until / the decision / has been / formally confirmed|.|Rather takes negative bare infinitive; until uses present perfect for future completion.
`);
g('future-time','Future time clauses and completion','After when, once, until, before and as soon as, use present forms for ordinary future time. Present perfect can emphasize completion before a future main-clause action.','A future meaning does not require will inside every subordinate time clause.',`
The registration form is not open yet.|We will notify you when |the form / becomes / available / online|.|Becomes is present in a future time clause.|will become
The funding decision is still pending.|Do not buy supplies until |the grant / has been / approved / in writing|.|Present perfect passive marks required completion.
The students need feedback before revising.|They will begin once |the tutor / has explained / what / needs changing|.|Once-clause contains a what-clause as explained’s object.
The software must finish installing.|You can reopen the file as soon as |the installation / is / complete|.|Is describes the future state in the time clause.
The archive will close while the shelves are repaired.|When the work is finished, |materials / that were moved / will be returned / to their / original / locations|.|A present passive time clause precedes a future passive result.
We need final approval before inviting guests.|By the time invitations are sent, |the committee / will have / confirmed / whether / the venue / is suitable|.|Future perfect places confirmation before a future sending point.
The instrument may take hours to stabilize.|No readings should be recorded until |the instrument / has maintained / a constant temperature / for / at least / thirty minutes|.|Present perfect expresses a completed period required before recording.
Several objections must be resolved before printing.|Once agreement has been reached, |we will circulate / the version / that incorporates / what / everyone / accepted|.|The once-clause marks completion; the object contains two nested clauses.
The replacement system will launch next month.|Before the old system is withdrawn, |users / must be shown / how / their existing records / can be / transferred|.|Before introduces a present passive; the embedded how-clause is also passive.
We need to retain our notes until the appeal ends.|Keep the original records until |you / are certain / that / no further review / will be / required|.|Until contains present are certain; its embedded prediction may legitimately use will.
`);
g('past-sequence','Past perfect and event sequencing','Past perfect locates an event before another past reference point. Past perfect continuous emphasizes an activity’s duration leading up to that point.','Do not use past perfect indiscriminately for every past event; identify the earlier reference.',`
The file was empty when I opened it.|Someone |had deleted / the contents / before / I arrived|.|Deletion preceded the later arrival.
The lecture repeated material we already knew.|We |had covered / the same topic / in / the previous course|.|Had covered establishes the earlier learning.
The assistant looked exhausted at noon.|She |had been helping / new students / since / the office opened|.|Continuous perfect emphasizes the activity leading up to noon.
The visitors missed the demonstration.|It |had already / finished / by the time / they arrived|.|The demonstration ended before the arrival reference point.
We discovered the discrepancy during the final check.|Until then, |nobody / had noticed / that / the totals / did not / include delivery costs|.|Had noticed is earlier awareness; did not include describes the figures’ content.
The room smelled of paint when we entered.|The walls |had been / repainted / before / the new furniture / was / delivered|.|Passive perfect places painting before delivery.
The coordinator recognized the address immediately.|She |had been corresponding / with the researcher / whose name / appeared / on / the envelope|.|Prior correspondence explains recognition; the relative identifies the researcher.
The experiment was abandoned after repeated failures.|By that point, |the team / had spent / several weeks / trying / to isolate / the cause|.|Spent takes an -ing complement describing the earlier effort.
The adviser was surprised by the sudden withdrawal.|She |had assumed / that / the applicant / had accepted / the offer / without reservations|.|The earlier assumption concerns an acceptance earlier still.
The technicians discovered that the backup was unusable.|They realized |that / the files / they had been relying on / had not been updated / since / the previous semester|.|The relative and main content predicate both refer to earlier past circumstances.
`);
g('present-perfect','Present perfect, continuing states and duration','Present perfect connects earlier events or continuing states to now. Continuous perfect focuses on ongoing activity; many state verbs instead use the simple perfect.','Use since for a starting point and for for a duration; avoid a finished past-time marker with an ordinary present perfect.',`
The application is still being reviewed.|We |have been waiting / for a decision / for / several weeks|.|For introduces a duration of continuing waiting.
I recognize the adviser from earlier meetings.|I |have known / her / since / my first semester|.|Know is a state verb and normally uses simple perfect here.|have been knowing
The new printer now works reliably.|The technician |has replaced / the part / that caused / the fault|.|Present perfect emphasizes a repair with a current result.
The team is still collecting responses.|We |have been interviewing / students / who use / the evening shuttle|.|Continuous perfect presents an ongoing series of interviews.
The online record no longer matches our copy.|Someone |has changed / the entry / without explaining / why / it needed / revision|.|The completed change has a present effect and a nested why-clause.
The temporary desk has been there longer than expected.|The office |has occupied / this space / ever since / the main building / was closed / for repairs|.|A continuing state began at a specific past closure.
I am tired of the same unanswered question.|We |have been asking / whether / the fees / include / access / to the recordings|.|Repeated ongoing asking contains an indirect yes/no question.
The findings differ from those in earlier studies.|Our analysis |has revealed / a pattern / that / previous researchers / appear to have / overlooked|.|Present result is followed by a relative containing a perfect infinitive.
The waiting list continues to grow.|More students |have requested / places / than / the department / can currently / accommodate|.|Present perfect records requests relevant to the current capacity problem.
We still have no reliable evidence of improvement.|No study |has yet established / whether / the benefits / claimed by the provider / persist / over time|.|Perfect establish takes an embedded question with a reduced relative inside it.
`);
g('future-perfect','Future perfect and future continuous','Future perfect marks completion by a future reference point; future perfect continuous measures activity up to that point. Future continuous describes activity in progress at a future time.','Keep will + have + participle distinct from will + be + -ing.',`
I need the room at midday.|At noon, |another group / will be using / it / for interviews|.|Future continuous describes an activity in progress at noon.
The review must finish before the board meets.|By then, |the panel / will have read / all / the submissions|.|Future perfect marks completion before the meeting.
The desk closes at six.|By the time you arrive, |the staff / will have left / for / the day|.|Arrival is the future reference for prior departure.
The replacement tutor starts next week.|This time next week, |she / will be teaching / the class / on her own|.|Continuous future presents the activity underway then.
We started monitoring the site two years ago.|By next spring, |we / will have been collecting / observations / for / three years|.|Future perfect continuous measures duration up to next spring.
The results need verification before public release.|By the publication date, |every calculation / will have been / checked / by / an independent / reviewer|.|Will have been checked is future perfect passive.
The installation should be finished before our first class.|By the time teaching begins, |the old equipment / will have been replaced / with models / that / use / less energy|.|Future perfect passive precedes the teaching reference point.
The application window opens while I am abroad.|When applications open, |I / will be working / somewhere / that / has / limited internet access|.|A future continuous main clause follows a present time clause.
The report must cover all responses received by Friday.|By Friday evening, |we / will have analyzed / everything / that / the participants / have submitted|.|Future perfect analysis includes submissions complete by that point.
Our project reaches its final review next month.|By that review, |the team / will have been testing / whether / the revised method / can detect / smaller changes|.|Duration-focused future perfect continuous contains an embedded research question.
`);

g('passive-layers','Modal, progressive and perfect passives','Passive constructions use a form of be plus a past participle. Add modal, perfect and progressive auxiliaries in their normal order before the final participle.','Distinguish is being checked, has been checked and should have been checked.',`
The draft still needs approval.|It |must be / approved / before / it is circulated|.|Must be approved is a modal passive.
We cannot use the entrance during repairs.|The doorway |is being / widened / to improve / access|.|Is being widened describes ongoing work on the doorway.
The office has received all the forms.|The applications |have been / recorded / in / the register|.|Have been recorded is present perfect passive.
The equipment should be inspected every month.|It |should have been / inspected / before / anyone used it|.|Perfect modal passive refers to an expected past inspection.
The committee is still examining the objections.|Several objections |are being / considered / by a panel / whose members / were not involved / in the original decision|.|Progressive passive describes current review by an independently identified panel.
The email may have gone to the wrong address.|The reminder |might have been / sent / to a student / who / had already / withdrawn|.|Might have been sent expresses uncertain past passive action.
We are not allowed to destroy the original records.|The records |must be / retained / until / all appeals / have been / resolved|.|Modal passive retention lasts until present-perfect passive resolution.
The final copy must incorporate the reviewers' comments.|Those suggestions |will have to be / addressed / before / the manuscript / can be / accepted|.|Will have to be addressed combines future obligation and passive voice.
The building work was incomplete when the inspection took place.|Several safety features |had not been / installed / when / the inspectors / arrived / on site|.|Negative past-perfect passive places missing installation before inspection.
Why was the event postponed without an explanation?|An explanation |ought to have been / provided / to everyone / who / had already paid / to attend|.|Ought to have been provided is past obligation in the passive.
`);
g('perfect-modals','Perfect modals: inference, criticism and possibility','Modal + have + past participle locates a judgment in the past. Must have often signals inference, might/could have possibility, and should have an expectation or criticism.','A past modal judgment is not the same as a factual report that the event definitely occurred.',`
The office is dark and nobody answers.|The staff |must have / left / before / we arrived|.|Must have left infers a past departure from current evidence.
The package did not reach the right room.|Someone |might have / written / the wrong number / on it|.|Might have written proposes a possible cause.
I sent the form without the attachment.|I |should have / checked / it / more carefully|.|Should have checked criticizes an omitted past action.
You attended a session that was optional.|You |need not have / attended / the briefing / in person|.|Need not have attended says attendance happened but was unnecessary.
The applicants were not informed of the restriction.|They |could not have known / that / the places / had already / been allocated|.|Could not have known denies past possibility; allocation is earlier passive perfect.
The figures were copied from an outdated table.|The error |should have / been noticed / by whoever / checked / the final / version|.|Should have been noticed is expected past detection by an unspecified checker.
The technician found a setting that no longer matched the manual.|Someone |must have / altered / what / had originally / been configured / by the supplier|.|Inference concerns alteration of an earlier passive configuration.
The venue was available, but we did not ask.|We |could have / avoided / the cancellation / if / we had checked / its availability|.|Could have avoided expresses an unreal past possibility linked to a condition.
The reviewer overlooked a serious limitation.|She |may not have / realized / how much / the missing data / affected / the comparison|.|May not have realized is uncertain negative inference with an embedded clause.
The meeting ended before anyone requested a written decision.|We |ought to have / asked / for confirmation / of what / had actually / been agreed|.|Ought to have asked evaluates past conduct; the final clause identifies the agreement.
`);
g('causative','Causative have/get and make/let','Have/get + object + past participle describes arranging for work to be done. Make/let + object takes a bare infinitive; get + object + to-infinitive persuades someone to act.','Do not confuse having a technician repair something with having something repaired.',`
The printer needs servicing.|We should have |the printer / serviced / before / the next workshop|.|The object receives servicing in the causative passive.
The supervisor insisted that we repeat the test.|She made |us / repeat / the procedure / from the beginning|.|Active make takes an object and bare repeat.|to repeat
The club finally persuaded a local expert to help.|We got |an expert / to review / the plan / without charging a fee|.|Get takes an active object plus to-infinitive.
The assistant allowed us to examine the original.|She let |us / inspect / the document / under supervision|.|Let takes a bare infinitive after its object.
The report contains a translation we cannot verify.|We need to get |the translation / checked / by someone / who / understands / the technical terms|.|Checked describes work arranged on the translation.
The coordinator arranged an inspection after the complaint.|She had |the equipment / inspected / to establish / whether / it was safe / to use|.|Causative passive is followed by a purpose and embedded question.
The unexpected cost forced us to revise our plan.|The increase made |us / reconsider / how / the remaining funds / could be / allocated|.|Make takes bare reconsider, whose object is an indirect question.
We persuaded participants to review the transcript.|We got |each participant / to confirm / that / their comments / had been / recorded accurately|.|Get plus to confirm introduces a passive perfect content clause.
The editor arranged outside checks before publication.|She had |the claims / that could not be verified internally / examined / by an / independent / specialist|.|The causative object includes a relative clause before examined.
The room booking error prevented us from continuing.|It made |the team / explain / why / the arrangements / they had confirmed / were no longer possible|.|Explain is bare after made; embedded why-clause order remains declarative.
`);
g('reporting-passive','Reporting passives and infinitive time','It is believed that ... and subject + is believed to ... report claims impersonally. A perfect infinitive places the reported action before the reporting point.','Use to have done for earlier events and to be doing for ongoing activity; preserve passive layers where needed.',`
People believe the building is unsafe.|The building |is believed / to be / unsafe / for public use|.|To be describes a state simultaneous with the belief.
Reports suggest that the documents disappeared earlier.|The documents |are thought / to have disappeared / before / the inspection|.|Perfect infinitive places disappearance before current reporting.
The committee expects the new process to help.|The process |is expected / to reduce / the time / needed for approval|.|To reduce describes an anticipated result.
Staff say the office is reviewing applications now.|The office |is said / to be reviewing / the applications / this week|.|Progressive infinitive describes ongoing reported activity.
The archive apparently received the missing letters years ago.|The letters |are believed / to have been / delivered / before / the archive / moved|.|Perfect passive infinitive places delivery before the move.
There may be an error in the published figures.|It is thought |that / the figures / include / entries / that should have / been removed|.|Impersonal reporting introduces a content clause with a modal passive relative.
The director apparently approved an earlier version.|The director |is understood / to have approved / a version / that did not / include / the latest changes|.|The approval precedes current understanding; the relative specifies the version.
The successful applicants may not have been contacted yet.|Several applicants |are believed / not to have been / informed / that / their applications / were successful|.|Negative perfect passive infinitive reports an earlier notification that did not happen.
The previous team may have relied on incomplete records.|The earlier analysis |is thought / to have been based / on information / that / was no longer / accurate|.|Perfect passive based on introduces information qualified by a relative clause.
Everyone assumes that the revised rule applies retrospectively.|The revised rule |is generally assumed / to apply / to students / who / had enrolled / before it was announced|.|The reported application concerns students identified by an earlier-past relative clause.
`);
g('reported-sequence','Reported speech and sequence of tense','Reported clauses retain statement order. Backshift can locate a report in a past perspective: would for a then-future event and had done for an earlier event.','Do not invert the subject in a reported question; do not backshift mechanically when the context states an ongoing fact.',`
The tutor promised an answer later.|She said |she / would reply / as soon as / she could|.|Would reply is future seen from a past promise.
The organizer asked about our choice of room.|He asked |which room / we / preferred / for the event|.|A reported object question keeps we preferred order.
The assistant said the form had already arrived.|She explained |that / the office / had received / it / that morning|.|Past perfect places receipt before the explanation.
The students were told to keep their drafts.|The tutor reminded |us / not to delete / the files / before marking|.|Remind takes an object plus negative to-infinitive.
The dean said the rule would be reconsidered after consultation.|She announced |that / the policy / would be reviewed / once / students / had been consulted|.|Would be reviewed is then-future passive; consultation precedes it.
The reviewer wanted to know how the sample had been chosen.|He asked |how / participants / had been selected / and whether / anyone / had been excluded|.|Two coordinated reported questions use passive perfect statement order.
The coordinator had promised that no one would be left behind.|She had assured |us / that / anyone / who arrived on time / would be allowed / to join|.|Assure takes an object and a content clause containing a subject relative.
The technician warned that a restart might delete unsaved work.|We were warned |that / restarting / could erase / anything / that had not / been saved|.|Gerund restarting is the content-clause subject; the object includes a passive relative.
The team was asked to explain the unexpected difference.|The panel wanted to know |why / the results / we had obtained / differed / from those / reported earlier|.|The embedded question contains a relative and a reduced passive modifier.
The consultant asked whether an alternative had been considered.|She asked |whether / we / had considered / what would happen / if the original supplier / withdrew|.|Reported whether-clause contains another nominal clause and a hypothetical condition.
`);
g('verb-complements','Gerund and infinitive complements','Complement patterns depend on the governing verb: avoid/consider/finish take -ing; decide/hope/agree take to-infinitives. Some verbs change meaning between the two patterns.','Check the governing verb rather than assuming that every second verb takes to.',`
The group has not decided whether to hire a room.|We are considering |holding / the discussion / outside / instead|.|Consider selects an -ing complement.|to hold
The technician agreed to check the sensor.|She promised |to inspect / it / before / the trial|.|Promised selects to inspect; the inspection is the action she committed to carrying out.
The replacement material is difficult to find.|We cannot afford |to delay / ordering / it / any longer|.|Afford takes to delay; delay takes ordering.
The workshop needs only a final cleanup.|We have finished |setting up / the tables / and arranging / the equipment|.|Finish takes coordinated -ing complements.
We were interrupted while explaining the results.|After the interruption, |the tutor / went on / to discuss / what / the figures / implied|.|Go on to discuss means move to a new activity.
The message was sent, but I cannot remember doing it.|I do not remember |sending / the version / that / contains / those comments|.|Remember sending concerns memory of a past action.
Please make sure that you save the final version.|Remember |to save / whatever / you have changed / before / closing / the program|.|Remember to save is a prospective duty; before takes closing.
We tried a simple change to see whether it would help.|We tried |moving / the microphone / closer / to reduce / the background / noise|.|Try moving describes experimenting with a possible solution.
I omitted a page while copying the report.|I regret |not checking / whether / every page / had been included / before / submitting it|.|Regret takes -ing for past regret; the embedded check is passive perfect.
The students object to revising a task that has already been graded.|They resent |being required / to repeat / work / that / they had understood / was complete|.|Resent takes a passive gerund; repeat takes a relative-qualified object.
`);
g('object-infinitive','Object + infinitive and infinitive subjects','Advise, encourage, allow, require and expect commonly take object + to-infinitive. For + noun/pronoun can supply the subject of an infinitive clause.','Do not omit the object that is meant to perform the infinitive action.',`
The tutor wants everyone to contribute.|She encouraged |each student / to explain / a different / example|.|Each student is the person encouraged to explain.
The library can give us extra time.|The extension allows |us / to finish / the project / without rushing|.|Us is the understood subject of to finish.
The instructions must be understandable to beginners.|It is important |for new users / to know / where / to begin|.|For new users supplies the infinitive’s subject.
The organizer needs a definite answer.|We expect |the office / to confirm / the booking / tomorrow|.|The office is the expected confirmer.
The policy should accommodate students studying remotely.|We would prefer |the recordings / to remain / available / until / everyone / has finished|.|The recordings are the subject of to remain; until marks completion.
The panel needs an explanation from the project leader.|They have asked |the leader / to explain / how / the unexpected costs / will be / covered|.|Ask takes an object and an infinitive containing a passive question.
The application requires applicants to disclose relevant experience.|The form requires |anyone / who has held a similar position / to provide / details / of their / responsibilities|.|The object anyone includes a relative clause before to provide.
The adviser cautioned us about relying on the summary.|She advised |us / not to assume / that / the summary / included / every exception|.|Not to assume negates the infinitive, not the advising event.
We need enough time for an independent reviewer to respond.|It would be unreasonable |for the panel / to expect / someone unfamiliar with the project / to assess / all the evidence / overnight|.|For supplies the outer subject; expect has a second object-infinitive pattern.
The draft does not distinguish correlation from causation.|The tutor wants |us / to make / it clear / that / the findings / do not establish cause|.|Want takes us to make; make takes dummy it and a content clause.
`);
g('perfect-nonfinite','Passive and perfect infinitives and gerunds','Use to be done/being done when the nonfinite subject receives an action. Use to have done/having done for anterior action when the time relationship requires it.','Active and passive nonfinite forms assign different roles; choose who performs the action.',`
The applicant wants the decision reconsidered.|She hopes |to be given / another chance / to explain / her circumstances|.|The applicant receives a chance in a passive infinitive.
Nobody likes repeated interruptions.|Students dislike |being interrupted / while / they are / presenting|.|Dislike takes a passive -ing complement.
The speaker seems familiar with the report.|She appears |to have read / the report / before / the meeting|.|Perfect infinitive places reading before the present appearance.
The researcher admitted a mistake in the calculation.|He admitted |having used / the wrong formula / for / the estimate|.|Perfect gerund emphasizes earlier use.
We cannot assume that all the samples were treated identically.|The samples appear |to have been / stored / under conditions / that / varied / considerably|.|Perfect passive infinitive describes earlier storage.
The organizer was pleased to receive recognition.|She appreciated |being thanked / for work / that / had taken / months to complete|.|Passive gerund follows appreciate; relative past perfect supplies background.
The committee is considering a policy that has not been tested.|The policy is unlikely |to be adopted / without / its consequences / being examined / in / greater detail|.|Passive infinitive follows unlikely; without introduces a passive gerund clause.
The candidate says the explanation was never provided.|She claims |not to have been / told / that / the interview / would be / recorded|.|Negative perfect passive infinitive reports an earlier omission.
The archive’s catalog lists a document that cannot be found.|The document seems |to have been / removed / without / anyone / having recorded / its destination|.|Perfect passive removal precedes present inference; without has an overt gerund subject.
The survey included a question some participants found intrusive.|Several respondents objected to |being asked / to disclose / information / they believed / should have / remained private|.|Passive gerund is followed by infinitive; the relative contains their belief.
`);
g('preposition-gerund','Prepositions followed by gerunds','After a preposition, a verb normally takes -ing. To is a preposition in look forward to, object to and be accustomed to; it is not an infinitive marker there.','Distinguish prepositional to from infinitival to by the expression governing it.',`
The staff are pleased about the upcoming visit.|They are looking forward to |meeting / the students / who / will attend|.|In looking forward to, to is a preposition and therefore takes meeting, not meet.|meet
We should not distribute the unapproved draft.|Please refrain from |sharing / the document / outside / the group|.|From is followed by the gerund sharing.
The new system requires a different routine.|We are getting used to |submitting / our requests / through / the portal|.|Used to here concerns becoming accustomed, so to takes -ing.
The assistant took responsibility for the error.|She apologized for |sending / the wrong version / to / the reviewers|.|Apologized for takes the gerund sending to identify the action she regrets.
The students disagree with compulsory public presentations.|They object to |being assessed / on work / that / was originally assigned / as a / private reflection|.|Prepositional to takes passive being assessed.
We cannot complete the study without access to the originals.|Progress depends on |obtaining / permission / to inspect / records / that have not / been digitized|.|On takes obtaining; permission independently takes to inspect.
We chose to summarize the findings rather than repeat every detail.|Instead of |describing / each response separately, / we / identified / patterns / across the interviews|.|Instead of takes describing; we is the understood describer.
The panel is worried about the lack of independent checks.|There are concerns about |allowing / the same team / to evaluate / a method / it was responsible / for developing|.|About takes allowing; the final relative uses for developing.
Why did you keep a separate copy of the notes?|We wanted to avoid the risk of |losing / information / that / could not / be reconstructed / from memory|.|Of takes losing; the relative describes irreplaceable information.
Our participants must understand how their comments will be used.|Consent involves more than |agreeing / to participate / without / knowing / what / participation entails|.|Than follows more; without takes knowing, whose object is a what-clause.
`);
g('participial-control','Participial clauses and shared subjects','An introductory participial clause normally shares its understood subject with the main clause. Having done marks prior action; being/having been done can express passive relationships.','Avoid dangling modifiers: the main subject must be the person or thing doing the participial action.',`
The tutor read the draft before commenting.|Having read the draft, |she / identified / several points / needing clarification|.|She is both the reader and the identifier.
We need to compare both versions carefully.|Looking at the originals, |we / can see / where / the wording changed|.|We supplies the understood subject of looking.
The application lacked an essential document.|Submitted without the certificate, |the application / could not be / processed / on time|.|The application receives the action submitted.
The technician repeated the check to be certain.|Not trusting the first reading, |she / took / a second / measurement|.|She is the person not trusting and taking.
The team completed the initial interviews before revising the questions.|Having completed the interviews, |the researchers / revised / questions / that participants / had found / confusing|.|Researchers controls the perfect participle and main verb.
The students had not been warned about the change.|Not having been informed, |they / continued / to follow / instructions / that were no longer / applicable|.|Passive perfect participle explains the students’ earlier lack of information.
The new room has been designed for small-group teaching.|Equipped with movable desks, |it / can be adapted / to suit / activities / requiring / different layouts|.|The room is equipped and adapted; requiring modifies activities.
The coordinator found a serious mismatch between the two lists.|Having compared the lists, |she / asked / why / several names / appeared / on only one|.|She performed comparison; the embedded why-question follows statement order.
We selected a smaller sample to limit the workload.|Working within a tight schedule, |we / chose / cases / that would let us / examine / the issue in depth|.|We works within the schedule and chooses cases; let takes bare examine.
The witnesses had seen different stages of the incident.|Having been interviewed separately, |they / gave accounts / that / differed / without necessarily / contradicting each other|.|Witnesses receive the interview action; differing need not imply contradiction.
`);

g('concession','Concession: although, despite and however','Although/even though take finite clauses; despite/in spite of take noun phrases or -ing clauses. However + adjective/adverb can mean no matter how.','Do not combine despite directly with a bare finite clause or add redundant but after although.',`
The explanation was brief but useful.|Although it was brief, |the explanation / answered / most / of our questions|.|Although introduces a complete clause.
The team completed the project with limited funding.|Despite the limited budget, |they / produced / a convincing / demonstration|.|Despite takes the noun phrase the limited budget.
The room is expensive but accessible.|We selected it despite |having / less money / than / we expected|.|Despite takes the gerund having, not a finite clause.
The tutor welcomed criticism of her approach.|Even though some students disagreed, |she / encouraged / them / to explain why|.|Even though concedes disagreement without blocking encouragement.
The article is influential, but its evidence is incomplete.|Although widely cited, |the study / does not establish / whether / its results / apply / beyond the original sample|.|Although widely cited is a reduced passive concession about study.
The proposal remains impractical even after revision.|However carefully it is rewritten, |it / will still / depend / on resources / that are not / available|.|However carefully means no matter how carefully.
The committee acknowledged the problem without accepting responsibility.|Despite acknowledging the difficulty, |the committee / declined / to explain / how / it intended / to resolve it|.|Despite takes acknowledging; decline takes to explain.
The new system looks simple but requires extensive training.|Simple as it appears, |it / cannot be used / effectively / by anyone / who has not / been trained|.|Adjective-fronted as introduces concession; the relative is passive perfect.
The second trial failed even under favorable conditions.|Even though the conditions were favorable, |the procedure / failed / to produce / what / the researchers / had predicted|.|Concession contrasts favorable conditions with failure to produce a prediction.
We cannot treat every complaint as proof of a systemic problem.|However legitimate a complaint may be, |it / should be examined / alongside / evidence / from other / sources|.|However legitimate introduces an unrestricted degree of legitimacy.
`);
g('reason-result','Reason, result and clause versus phrase','Because/since/as can introduce reasons; because of/owing to take noun or -ing phrases. So ... that and such ... that link degree to result.','Choose a connector that matches both the logical relationship and the grammatical form following it.',`
We postponed the demonstration after a power failure.|It was postponed because |the backup system / had failed / during / the outage|.|Because takes a finite reason clause.
The application was delayed by a missing signature.|Processing stopped because of |the absence / of a signature / on / the final page|.|Because of takes the noun phrase the absence, rather than a complete subject-verb clause.
The room was too noisy for interviews.|It was so noisy that |we / could not hear / what / participants said|.|So modifies noisy and that introduces the result.
The instructions were unusually clear.|They provided such clear guidance that |we / needed / very little / additional help|.|Such modifies a noun phrase, clear guidance.
The speaker had not received the final agenda.|Since nobody had sent it, |she / was unaware / that / the discussion / had been / rescheduled|.|Since gives a reason; the content clause reports an earlier passive change.
The old data cannot be compared fairly with the new sample.|Because the selection criteria differed, |the two samples / may not / represent / populations / with comparable / characteristics|.|The reason concerns selection, leading to a limitation on comparison.
The application required information that we could not obtain.|The requirements were so restrictive that |many applicants / abandoned / the process / before / their eligibility / had been assessed|.|Degree causes a result occurring before passive assessment.
The team had to repeat the interviews.|Owing to errors in the recording, |parts of the conversation / were / too incomplete / to establish / what / had been said|.|Owing to takes a noun phrase; too incomplete prevents establishing content.
The trial produced more uncertainty than insight.|It generated such inconsistent results that |we / could not determine / whether / the method / was detecting change / or merely recording noise|.|Such introduces a noun phrase; whether coordinates alternative interpretations.
We lost access to records we had expected to use.|As the consent forms limited access, |we / had to exclude / material / that / would otherwise / have been valuable|.|As supplies a cause; otherwise have been describes counterfactual usefulness.
`);
g('purpose','Purpose, prevention and intended outcomes','To/in order to/so as to take a base verb for purpose; so that takes a clause, often with a modal. Prevent/keep/stop + object + from takes -ing.','Distinguish an intended purpose from an actual result, and avoid inserting to after a preposition.',`
The tutor recorded the demonstration.|She recorded it so that |absent students / could follow / the same / procedure|.|So that introduces a purpose with its own subject.
We left extra space on the form.|It was included to |allow / applicants / to explain / unusual circumstances|.|Purpose to allow contains another object-infinitive pattern.
The librarian covered the fragile pages.|The cover prevents |the pages / from being / damaged / during handling|.|Prevent takes object plus from and a passive gerund.
We arrived early to avoid disturbing the speaker.|We came early so as not to |interrupt / the introduction / once / it began|.|Not negates the purpose infinitive interrupt; avoiding interruption is why we arrived early.
The team removed names before sharing the responses.|Names were removed in order to |make / it impossible / for readers / to identify / individual / respondents|.|Make takes dummy it plus adjective and a for-infinitive clause.
Some students cannot attend the scheduled briefing.|A recording will be available so that |anyone / who misses the session / can still / find out / what / is required|.|Purpose clause contains a relative subject and a what-clause.
The software blocks duplicate submissions.|It keeps |the same response / from being / counted / more than once / in / the final totals|.|Keep takes an object followed by from being counted.
The organizers arranged a quiet alternative room.|They wanted to ensure that |participants / who needed a break / could leave / without / disrupting / the discussion|.|Ensure takes that-content; without takes disrupting.
The questionnaire avoids collecting unnecessary details.|It was designed to |reduce / the risk / of participants / being identified / from / their answers|.|Purpose reduce takes a risk phrase containing a passive gerund clause.
The committee asked the author to define the terms.|Definitions were requested so that |reviewers / would not have to / guess / what / the author / meant|.|So that expresses intended avoidance of a need to infer meaning.
`);
g('comparison','Comparisons, degree and infinitive complements','Use comparative + than, as ... as and degree modifiers such as far/much/slightly. Enough follows its adjective; too precedes it. Comparisons must match like grammatical units.','Do not combine more with an already inflected comparative or place enough before an adjective.',`
The second explanation was easier to follow.|It was |far / clearer / than / the first one|.|Far intensifies the comparative clearer.|more
The report is useful, but not as detailed as expected.|It is not |as comprehensive / as / we had / hoped|.|Not as ... as compares comprehensiveness.
The data set is too small for that conclusion.|It is not |large enough / to support / such a broad / claim|.|Enough follows large and takes an infinitive.
The revised form takes less time to complete.|It can be completed |much / more quickly / than / the original|.|Much intensifies a comparative adverb phrase.
The two versions differ mainly in how specific they are.|The revision is |considerably / more precise / than / what / we originally / submitted|.|The comparison uses a nominal what-clause as its second term.
The instructions must be understandable without help.|They need to be |clear enough / for someone / who has never used the equipment / to follow / without / supervision|.|For supplies the infinitive subject, including a relative clause.
The sample does not represent every age group equally.|The older group is |less well represented / than / the younger group / in / the data / we collected|.|Less modifies a participial description; the relative identifies the data.
The fee increased more than we anticipated.|It rose |more sharply / than / anyone / involved in the planning / had / expected|.|The second comparison term includes a reduced relative about anyone.
Our result is similar, but the evidence is stronger.|The conclusion is |no different / from / the one / we reached before, / but / it is better supported|.|Different takes from; the comparison contrasts support rather than conclusion content.
The report cannot establish causation on the evidence provided.|The evidence is |too limited / for us / to determine / whether / the intervention / caused the improvement|.|Too limited blocks an infinitive action containing a whether-clause.
`);
g('parallelism','Parallel and correlative structures','Coordinate matching grammatical units with both ... and, either ... or, neither ... nor and not only ... but also. Preserve the same complement form across coordinated elements.','Do not coordinate an -ing form with a mismatched to-infinitive when both fill the same grammatical role.',`
The course develops two related skills.|It focuses on both |interpreting / evidence / and evaluating / arguments|.|Both coordinated complements of on are gerunds.
There are two acceptable ways to submit the form.|You can either |upload / a signed copy / or deliver / the original|.|Either/or coordinates bare verbs after can.
The venue lacks equipment and accessible transport.|It provides neither |adequate equipment / nor / a convenient / transport connection|.|Neither/nor coordinates matching noun phrases.
The new policy affects staff as well as students.|It applies not only to |students / but also to / members / of staff|.|The repeated preposition makes the parallel relation explicit.
The project requires accuracy and an ability to explain results.|Participants must be able both |to analyze / the information / and to explain / what / their analysis / shows|.|Both coordinates two infinitive complements.
The revised system improves access but adds new responsibilities.|It not only |makes / records easier to find / but also / requires / users / to verify their accuracy|.|Not only/but also coordinates main verbs with different complements.
Applicants can use either of two kinds of supporting evidence.|They may submit either |a reference / written by a supervisor / or / an account / of work / they have completed|.|Either/or coordinates noun phrases, each with its own modifier.
Neither source offers a reliable account of the meeting.|Neither the minutes nor the recording |explains / why / the proposal / was rejected / without / a vote|.|Neither/nor forms the subject; explains governs an embedded question.
The workshop combines practical work with reflection.|Students will practice |collecting / evidence, / organizing / what they find, / and presenting / a defensible interpretation|.|Three gerunds form a parallel object series after practice.
The scheme must serve current users without excluding newcomers.|The aim is both |to preserve / what existing users value / and to remove / barriers / that prevent / new students from joining|.|Two coordinated infinitives each contain further clause structure.
`);
g('agreement','Agreement across long subjects','Agreement follows the head of the subject, not the nearest noun in a modifier. Each/every and many indefinite pronouns are singular; a number of + plural noun is plural, the number is singular.','Find the subject head before choosing is/are, has/have or a third-person -s verb.',`
The list includes several outdated addresses.|The list of addresses |needs / to be checked / before / we use it|.|Singular list, not plural addresses, controls needs.|need
Every application has missing information.|Each of the forms |has / a section / that / needs completing|.|Each is the singular head of the subject and takes has despite the nearby plural forms.
Several students want a different time.|A number of students |have requested / a change / to / the timetable|.|A number of students takes plural have.
More requests are arriving this week.|The number of requests |has increased / since / the notice / appeared|.|The number means a single total, so has agrees with number rather than plural requests.
The report’s recommendations do not all concern funding.|One of the recommendations |is / that / each department / should appoint / a representative|.|One controls is; the following content clause states the recommendation.
The equipment arrived with incomplete instructions.|The equipment in the boxes |does not / include / everything / that / was listed / on the order|.|Noncount equipment takes does, regardless of plural boxes.
Everyone assigned to the project must respond.|Everyone involved in the interviews |has been asked / to confirm / whether / their notes / are / complete|.|Everyone controls has; plural notes independently controls are.
We compared the two available copies of the report.|Neither copy of the report |contains / the appendix / that / the reviewers / requested|.|Neither copy is a singular subject despite report modifiers.
The success of several workshops depends on one decision.|Whether the workshops can proceed |depends / on / how much funding / is / actually / available|.|A whole whether-clause serves as a singular subject of depends.
The main difficulty is tracing the original documents.|What concerns the archivist most |is / the possibility / that / some records / have been / permanently lost|.|The nominal what-clause takes is; plural records takes have inside content.
`);
g('quantification','Quantifiers, countability and negative scope','Use fewer/many/a few with count plurals and less/much/a little with noncount nouns. Few/little suggest scarcity; a few/a little assert some. Not all does not mean none.','Check both noun countability and what the negative actually negates.',`
The review provided almost no practical guidance.|There was |little / useful advice / on / how to proceed|.|Advice is noncount; little emphasizes scarcity.|few
Several seats remain, so you can still register.|There are |a few / places / still available / for late applicants|.|A few asserts some remaining countable places.
The revision has removed unnecessary details.|It contains |less / repetition / and fewer / examples|.|Repetition is noncount; examples is count plural.
The survey did not reach every student.|Not all participants |were able / to answer / every / question|.|Not all means at least some could not, not that nobody could.
The sample provides too little evidence for a general conclusion.|We do not have |enough / information / to establish / whether / the difference / is meaningful|.|Noncount information follows enough; whether names what cannot be established.
Some volunteers have not completed both requirements.|Very few volunteers |have submitted / both / the consent form / and / the training certificate|.|Few describes a small count; both coordinates the two required objects.
The new procedure seems to require fewer steps.|It involves |far less / paperwork / than / the process / that / it replaces|.|Less modifies noncount paperwork; than introduces the older process.
No single explanation accounts for every observation.|None of the explanations |accounts / for / all / the variation / that / we observed|.|None can take singular agreement here; all qualifies the noncount variation.
The most experienced applicants did not all receive offers.|Not every applicant with relevant experience |was offered / a position / that / matched / their / qualifications|.|Not every has narrower negative scope than no applicant.
The evidence is limited, but there is enough for a pilot.|There is |sufficient / evidence / to justify / a small trial / without claiming / that the method is proven|.|Sufficient supports a limited action, not a claim of proof.
`);
g('determiners','Determiners, reference and noun phrases','Articles and determiners identify a noun as new, specific, generic, countable or noncount. Another means an additional/different singular item; the other identifies the remaining one(s).','Avoid double determiners and singular count nouns with no required determiner.',`
One of the two rooms is booked.|We can use |the other / room / for / the interviews|.|The other identifies the remaining member of a pair.
We need an additional person to check the files.|Could we ask |another / reviewer / to examine / them|?|Another modifies a singular additional reviewer.
The notice introduces a new support service.|It describes |a / service / that / students can use|.|A introduces a singular service before identifying it with a relative.
We must retain the original, not just a copy.|Please keep |the / version / that / bears the signature|.|The identifies the specific version defined by the relative.
The feedback was general rather than directed at individuals.|It offered |some / advice / on how / the team / could improve / its procedure|.|Some can modify noncount advice without an article.
One report was useful, but the remaining reports were not.|The other reports |did not / address / the issue / that / we had been / asked to investigate|.|The other plus plural reports identifies the remaining specified reports.
The panel needs a different explanation from the one already given.|We should provide |an alternative / explanation / that / accounts for / the evidence / they cited|.|An introduces an additional singular explanation qualified by a relative.
The course accepts students from any academic field.|Applicants do not need |a degree / in the subject / but / they do need / evidence / of relevant experience|.|A marks a countable qualification; evidence remains noncount.
Our team must use the same definition throughout the report.|Every section |should apply / the same / criteria / when / interpreting / the results|.|The same identifies consistent criteria across all sections.
The room must be one that everyone can access.|We need |a venue / whose entrance / can be reached / without using / any stairs / or narrow corridors|.|A introduces venue; whose specifies its entrance and any covers possible barriers.
`);
g('adverb-scope','Adverb placement and scope','Adverbs interact with auxiliaries and meaning. Already/yet/still and only/even affect timing or scope. A chunk may bind an adverb to the verb or constituent it modifies.','Do not move only/even freely when doing so changes what is restricted or emphasized.',`
The tutor has completed the first review.|She |has already / checked / the main / calculations|.|Already is bound to the perfect auxiliary in this tile.
The results are not available despite the delay.|They |have still not / been / released / to participants|.|Still not emphasizes continuing non-release.
The online version differs in one respect.|Only the appendix |has been / changed / since / the last review|.|Only restricts the subject appendix rather than the kind of change.
The assistant did more than provide the code.|She even |explained / why / the first attempt / had failed|.|Even emphasizes an additional, less expected act.
The remaining questions have not received attention.|The panel has not yet |considered / how / the changes / will affect / students / already enrolled|.|Not yet marks pending consideration; already enrolled modifies students.
The organizer declined to confirm the venue a second time.|She would only |confirm / what / had already been / agreed / in / writing|.|Only limits the content she would confirm to existing written agreement.
The office is uncertain about the source of the new figures.|Nobody has ever |explained / where / those figures / are supposed / to have / come from|.|Ever falls under negative nobody; the embedded clause includes a perfect infinitive.
The revisions go beyond the problem we identified.|The update does not merely |correct / the error / but also / change / how / entries are validated|.|Does governs both bare verbs correct and change in the coordinated structure.
The tutor was surprised that even advanced students needed help.|Even students familiar with the method |had difficulty / explaining / why / the second trial / produced / a different result|.|Even scopes over an unexpectedly affected subject group.
Our original assumptions remain questionable after revision.|We can no longer |assume / that / what / worked for one group / will necessarily / work for another|.|No longer rejects a prior assumption; necessarily concerns the prediction’s certainty.
`);
g('negative-inversion','Inversion after negative and restrictive openings','Fronted negative/restrictive expressions such as never, rarely, only after and not until trigger auxiliary–subject inversion in the main clause. A subordinate clause inside the opening keeps statement order.','Invert the main clause, not the clause after until/after; use do-support when no auxiliary is already present.',`
We had never seen such a detailed plan.|Never before |had / we / seen / such careful / preparation|.|Fronted never triggers had we inversion.
The committee rarely explains individual decisions.|Rarely |does / the committee / explain / its reasoning|.|Does carries the tense, so explain is bare.|explains
We understood the problem only after reading the original.|Only then |did / we / recognize / the misunderstanding|.|Only then triggers did we, not we did.
The room cannot be used without supervision.|Under no circumstances |may / students / use / the room / unsupervised|.|The negative opening triggers modal inversion.
The error became clear after the files were compared.|Only after the files had been compared |did / the team / realize / that / a page / was missing|.|The after-clause stays declarative; the main clause inverts did the team.
The participants learned about the recording when they arrived.|Not until they arrived |were / the participants / told / that / the session / would be recorded|.|Were participants is the inverted passive main clause.
The new figures contradict the original prediction.|At no point |did / the investigators / suggest / that / the outcome / was inevitable|.|Do-support follows the fronted negative time expression.
The team was not just late; it also lacked permission.|Not only |had / the team / missed the deadline / but / it had also failed / to obtain consent|.|Not only triggers inversion in the first coordinated clause.
We received an answer immediately after sending the reminder.|Scarcely |had / we / sent / the reminder / when / a reply / arrived|.|Scarcely had ... when links two closely successive past events.
The reviewers rarely confront such conflicting evidence.|Seldom |have / the reviewers / had to decide / between explanations / that are both plausible / yet mutually incompatible|.|Negative seldom triggers have the reviewers; had to decide remains the perfect complement.
`);

g('inverted-conditionals','Conditionals without if','Formal conditionals can omit if by inverting had, were or should with the subject: Had we known ..., Were it possible ..., Should you need ....','Do not combine conditional inversion with if, and keep the result appropriate to the condition’s time.',`
We did not know the room was unavailable.|Had we known, |we / would have chosen / a different / venue|.|Had we known replaces if we had known and introduces an unreal alternative to our past choice.|if
You may need help after the office closes.|Should you need assistance, |please / contact / the supervisor / on duty|.|Should you need expresses an open future condition.
The scheme depends on a subsidy that might disappear.|Were the subsidy withdrawn, |the scheme / would become / difficult / to sustain|.|Were withdrawn is a hypothetical passive condition.
We failed to record the reference number.|Had we kept it, |we / could have / traced / the application|.|Inverted past perfect introduces an unreal past condition.
There is no evidence that the alternative would be safer.|Were we to adopt the alternative, |we / would still need / to establish / whether / it reduced / the risk|.|Were we to adopt introduces a hypothetical action.
The original files were destroyed before anyone compared them.|Had those files been retained, |we / might have discovered / why / the two versions / differed / so substantially|.|Had files been retained is inverted perfect passive.
The reviewer might request a complete transcript.|Should a transcript be required, |we / will need / to explain / which sections / cannot be released / without further consent|.|Should introduces a possible passive requirement; the result contains an embedded choice.
The proposed changes could remove an important safeguard.|Were that safeguard removed, |students / would have / no reliable way / to challenge / a decision / they considered mistaken|.|Inverted hypothetical passive precedes a modal result with a relative.
The assistants were not given the updated instructions.|Had they been given clearer guidance, |they / might not have / assumed / that / the earlier procedure / still applied|.|The unreal past condition is passive; the result concerns a mistaken belief.
The data might reveal a second pattern.|Should further analysis reveal a discrepancy, |we / would have to / reconsider / what / we currently / regard as established|.|Should expresses a contingency whose result challenges an existing assumption.
`);
g('clefts','It-clefts and what-clefts','Clefts separate a focused constituent from background information: It was X that ...; What we need is X. Keep the focused constituent in its correct grammatical role.','Do not add a second object where the cleft already supplies it.',`
The missing signature caused the delay.|It was |the missing signature / that / delayed / the approval|.|The cleft focuses the subject causing delay.
We need clarification rather than another summary.|What we need is |an explanation / of / why / the rule changed|.|The what-cleft focuses an explanation containing a why-clause.
We noticed the error only during the final check.|It was during the final check |that / we / discovered / the discrepancy|.|The focused element is a time phrase.
The funding did not fail; the timetable did.|It was |the schedule / rather than the budget / that / made the project / impossible|.|The cleft contrasts two possible causes.
The reviewers questioned how we selected participants.|What concerned them most |was / the way / in which / the participants / had been / selected|.|The focused noun phrase contains a formal relative passive.
We learned most from the participants who disagreed.|It was |those who challenged our assumptions / who / helped / us / understand / the limitations|.|The focused subject already includes a relative clause.
The tutor asked us to distinguish findings from interpretation.|What she wanted us to explain |was / how / the observations / supported / the interpretation / we proposed|.|The cleft complement is an embedded question with an object relative.
The extra session mattered because it allowed questions.|It was |the opportunity to ask questions / that / made / the session / particularly / useful|.|Made takes the session as object and useful as complement.
The report says little about what was excluded.|What is missing from the report |is / an account / of / why / certain responses / were omitted|.|The cleft identifies missing explanatory content, expressed by a passive why-clause.
The result depended on cooperation between departments.|It was only because both teams cooperated |that / we / were able / to complete / what had seemed / an impossible task|.|The focused reason clause explains the successful result.
`);
g('anticipatory-it','Anticipatory it and extraposition','It can hold a subject/object position while a to-infinitive or that-clause supplies the real content later: It is important to ...; make it clear that ....','Do not omit dummy it in make/find/consider it + adjective + clause patterns.',`
The students need to understand the instructions.|It is essential |for everyone / to know / what / is expected|.|For everyone supplies the infinitive subject.
We cannot judge the proposal without cost estimates.|It is difficult |to assess / a plan / without / knowing its cost|.|The infinitive content follows anticipatory it.
The findings do not establish cause.|We must make it clear |that / the association / does not prove / causation|.|It holds the object position before the that-clause.
The assistant did not know whom to contact.|She found it hard |to identify / the person / responsible / for approvals|.|It is the anticipatory object of found.
The participants must be told how recordings will be used.|It would be unfair |to expect / anyone / to agree / without knowing / what participation / involves|.|Expect takes an object-infinitive pattern inside the extraposed subject.
The committee assumed everybody had access to the portal.|We should not take it for granted |that / students / studying remotely / can access / everything / they need|.|Take it for granted anticipates a complete content clause.
The proposed appeal route is confusing.|The revision should make it easier |for applicants / whose requests were rejected / to understand / how / to challenge / the decision|.|The infinitive subject contains a passive relative.
The results changed after the outliers were removed.|It remains unclear |whether / excluding / those observations / altered / what / the analysis measured|.|The extraposed whether-clause has a gerund subject and a nominal what-object.
We have not checked that the supplier can deliver on time.|I consider it risky |to commit / the funds / before / we have established / whether delivery / is guaranteed|.|Consider it risky anticipates the infinitive action and its timing condition.
The final summary omits the most important limitation.|It should be obvious |to anyone / who reads the full report / that / the conclusion / depends / on an untested assumption|.|The beneficiary phrase contains a relative; the later that-clause supplies the content.
`);
g('comparative-correlatives','The more ... the more and proportional change','The + comparative clause, the + comparative clause expresses linked change. Clause subjects and predicates keep normal order, and comparison may involve degree, amount or likelihood.','Do not insert a separate than between the two correlated clauses.',`
Practice gradually makes the method easier.|The more you practice, |the easier / the procedure / becomes / to follow|.|Two comparative clauses link practice with ease.
Extra instructions seem to create confusion.|The more details we add, |the less / clear / the main message / becomes|.|More details correlates with a lower degree of clarity.
A longer delay leaves fewer options.|The longer we wait, |the fewer / alternatives / we / will have|.|Fewer agrees with countable alternatives.
Wider participation makes the sample more useful.|The broader the participation, |the more representative / the sample / is likely / to be|.|The first clause omits be; the second contains is likely to be.
The initial assumption affects every later choice.|The more we rely on that assumption, |the harder / it becomes / to consider / evidence / that / contradicts it|.|The result clause uses anticipatory it and a relative-qualified object.
More detailed coding takes additional time.|The finer the distinctions we make, |the longer / it takes / to classify / responses / that / do not fit neatly|.|Distinctions is modified by an object relative; result describes classification time.
The fee rises as the booking date approaches.|The closer we get to the deadline, |the less likely / it is / that / we will find / an affordable / venue|.|The second comparative measures likelihood of a that-clause.
Larger groups make individual contributions harder to identify.|The larger the team becomes, |the more important / it is / to document / who / is responsible / for each task|.|The result contains an extraposed infinitive and an embedded subject question.
Extensive revisions create more versions to compare.|The more often the text is revised, |the greater / the risk / that / someone / will use / an outdated copy|.|The result is an elliptical clause with a content clause after risk.
More complete records reduce dependence on memory.|The better the records are maintained, |the less / we need / to rely / on what / individual participants / remember|.|Passive record maintenance correlates with reduced need; on takes a what-clause.
`);
g('ellipsis','Ellipsis, substitution and avoiding repetition','Auxiliary verbs can stand for an understood verb phrase; so/neither can introduce parallel agreement. Do so substitutes for an action, while one/ones replaces a count noun.','Keep the replacement consistent with the original auxiliary, polarity and noun countability.',`
I have finished the consent form.|So |have / the other members / of / my group|.|So have parallels a positive present-perfect statement.
I did not receive a confirmation.|Neither |did / anyone else / in / the class|.|Neither did parallels a negative simple-past statement.
We need a quieter room than the present one.|The room upstairs |is / quieter / than / this one|.|One replaces the singular count noun room.
The tutor asked us to revise, and we agreed.|We agreed |to do so / before / the next / meeting|.|Do so substitutes for revising the draft.
The first team had not been told about the change.|Neither |had / the team / responsible / for coordinating / the volunteers|.|Neither had parallels a negative past-perfect passive context.
The coordinator expected a delay, but the assistant did not.|The coordinator |expected / the process / to take longer / than / the assistant / did|.|Did substitutes for expected it to take.
Some applicants prefer written feedback; others do not.|Those who do |can request / a written explanation / of / why / their application / was unsuccessful|.|Do substitutes for prefer written feedback inside the relative.
We can use either version, but the revised one is clearer.|The revised one |makes / the conditions / easier / to understand / than / the original does|.|One substitutes for version; does substitutes for makes conditions easy to understand.
The students were asked to identify a limitation if possible.|Anyone who could |was invited / to explain / how / that limitation / affected / the conclusion|.|Could stands for identify a limitation; the main clause is passive.
The committee promised a response but failed to provide one.|Having promised to respond, |it / should have / done so / before / the deadline / expired|.|Done so replaces the promised response action in a perfect modal construction.
`);
g('mandative','Recommendations, requirements and the subjunctive','After recommend/insist/request that, formal English can use a base-form mandative verb: that she attend, that it be checked. Should + base form is another common pattern.','A mandative base form does not take third-person -s and can be passively formed with be + participle.',`
The tutor recommended independent verification.|She recommended that |the result / be / checked / by another team|.|Be checked is a passive mandative form.|is
The coordinator requested early arrival.|He asked that |everyone / arrive / before / the briefing|.|Arrive is a base-form mandative after that.
The board insists on keeping original receipts.|It insists that |each receipt / be / retained / for inspection|.|Singular receipt still takes mandative be.
The adviser suggested a change of emphasis.|She suggested that |we / should focus / on evidence / rather than speculation|.|Should focus is an alternative mandative pattern.
The reviewer requires the uncertainty to be stated.|She requested that |the authors / explain / how / the uncertainty / had been / estimated|.|Mandative explain introduces an embedded passive perfect question.
The committee recommended an independent appeal route.|It recommended that |any student / whose request was rejected / be allowed / to seek / a second / review|.|The long mandative subject precedes passive be allowed.
The chair would not proceed without informed consent.|She insisted that |no participant / be recorded / until / they / had understood / the purpose|.|Negative no scopes over a passive mandative; until marks prior understanding.
The tutor suggested retaining evidence of unsuccessful attempts.|She proposed that |we / keep / records / of trials / that did not produce / the expected result|.|Keep is mandative; the relative describes unsuccessful trials.
The auditor wants the final figure distinguished from an estimate.|It is essential that |the report / state / which figures / have been verified / and which / remain provisional|.|Mandative state is followed by parallel embedded clauses.
The students requested clearer rules before agreeing to participate.|They requested that |the conditions / under which recordings could be shared / be explained / before / consent / was sought|.|The mandative subject includes a formal relative before passive be explained.
`);
g('adjective-participle','Adjectives, participles and dependent complements','An -ing adjective often describes an effect; an -ed adjective describes an affected state. Many adjectives take specific prepositions or infinitive/that-clause complements.','Distinguish bored/boring, concerned/concerning and responsible for/eligible for; the complement must fit the adjective.',`
The demonstration held everyone's attention.|The students found |the demonstration / engaging / rather than / confusing|.|Engaging describes the effect of the demonstration.
We did not understand the revised instructions.|We were |confused by / the changes / made / to the form|.|Confused describes our affected state.
The new role comes with responsibility for records.|The assistant is |responsible for / keeping / the records / accurate|.|For takes keeping; keep takes object plus adjective complement.
The report should be understandable to nonspecialists.|It needs to be |accessible to / readers / unfamiliar with / the terminology|.|Accessible to and unfamiliar with govern their own complements.
The committee is worried about the effect of the change.|Members are concerned |that / students / who rely on the shuttle / may be / unable / to attend|.|Concerned takes a content clause describing a qualified group.
The summary made the claim sound more certain than it was.|We were surprised |to find / that / the evidence / was less convincing / than / the summary implied|.|Surprised describes the experiencer; to find introduces the discovery.
The method requires experience we do not yet have.|We are not sufficiently |familiar with / the equipment / to assess / whether / its readings / are reliable|.|Familiar with takes equipment; to assess states the blocked action.
The complaints raise a problem relevant to the entire class.|The issue is relevant to |anyone / who is required / to use / resources / that / are only available online|.|Relevant to takes a person modified by a passive relative.
The participants felt uncomfortable about the recording.|They were reluctant |to discuss / matters / they considered / too personal / to share / publicly|.|Reluctant takes an infinitive; considered takes an object complement.
The committee doubted the plan could work without additional staff.|It was skeptical about |whether / the team / was capable of / maintaining / the service / on its own|.|Skeptical about takes whether; capable of takes maintaining.
`);
g('dependent-prepositions','Dependent prepositions and complex complements','Verb/noun/adjective combinations may govern specific prepositions: account for, distinguish between, comply with, attribute to. Their objects can be nouns, gerunds or nominal clauses.','Do not choose a preposition solely from literal spatial meaning; follow the expression’s grammatical pattern.',`
The revised estimate omits delivery charges.|It does not account for |the cost / of / transporting / the equipment|.|Account for means include or explain; of takes transporting.
The instructions compare two kinds of evidence.|They distinguish between |what / was observed / and / what was inferred|.|Between coordinates two nominal what-clauses.
Students must follow the revised storage rules.|Everyone must comply with |the conditions / set out / in / the agreement|.|Comply with takes the conditions as object.
The technician linked the fault to a loose connection.|She attributed |the failure / to / a connection / that had worked loose|.|Attribute takes object plus to and a cause phrase.
The reviewers disagree about the interpretation of the same pattern.|Their disagreement stems from |how / they / define / what / counts as / relevant evidence|.|From takes a how-clause containing a nominal what-clause.
The current policy is inconsistent with earlier guidance.|It conflicts with |what / applicants / were told / when / they / registered|.|With takes the entire nominal clause about earlier information.
We should compare students with similar backgrounds.|The analysis must distinguish |between / differences in preparation / and / differences / caused by / the intervention|.|Between coordinates parallel noun phrases with different modifiers.
The panel will not overlook an unsupported conclusion.|It takes issue with |the claim / that / the results / prove / the method / works universally|.|Take issue with governs claim; that introduces its content.
Our access depends on how the original consent was worded.|We are bound by |the terms / under which / participants / agreed / to let / their responses be used|.|Bound by takes terms; under which introduces a formal relative.
The criticism focuses on an assumption we have not tested.|It calls into question |whether / the relationship / on which the prediction rests / remains / stable / over time|.|Call into question takes an embedded issue containing a prepositional relative.
`);
g('polarity-reference','Negative polarity, reference and clause links','Negative expressions license words such as any/ever and affect the interpretation of later clauses. Maintain clear reference between a noun phrase and the relative clause or comparison that qualifies it.','Do not turn a narrow negative into a claim that nothing happened; check what any/ever and only refer to.',`
Nobody responded to the reminder.|We have not received |any / reply / to / our message|.|Not licenses any reply; the negative applies to receiving a reply, not merely to its usefulness.
No participant has raised this issue before.|Nobody has ever |asked / whether / the questions / were compulsory|.|Ever is licensed by negative nobody.
There is no evidence that the rule was applied consistently.|We found no evidence |that / every applicant / was assessed / in the same way|.|No evidence of a universal claim does not prove universal unfairness.
Only some files contain the updated note.|Not every file |contains / the explanation / that / was added later|.|Not every means some files lack the note.
We cannot support the claim with the material provided.|There is hardly any evidence |to suggest / that / the intervention / caused / a lasting / improvement|.|Hardly any conveys near absence rather than a strong positive finding.
We have no reason to assume that the missing records are identical.|Nothing in the summary |establishes / whether / the omitted cases / were / comparable / to those retained|.|Nothing is singular; whether states an unresolved comparison.
The reviewers have never accepted such a weak justification.|At no stage have they |suggested / that / a conclusion / can be accepted / merely because / it is plausible|.|Fronted negative scope covers the reported suggestion.
The form does not provide a way to explain unusual circumstances.|There is no section |in which / an applicant / can explain / why / the standard conditions / do not apply|.|No section is qualified by a relative containing an embedded why-clause.
Neither explanation addresses the timing of the change.|Neither explanation |accounts for / why / the difference / appeared / only after / the second trial|.|Neither is singular; only restricts the timing of appearance.
The documents do not show that anyone authorized public release.|We cannot find any record |of anyone / having agreed / that / the material / could be shared / without restriction|.|Any follows a negative search; of introduces a perfect gerund with its own subject.
`);
g('layered-synthesis','Layered clauses and competing dependencies','In a long sentence, identify the main clause, then attach each relative, content, conditional or nonfinite clause to its own governor. Work from subject–verb relationships rather than adjacent word pairs.','A locally plausible word pair can still break the larger sentence; account for every subject and finite verb.',`
The tutor wants a clearer account of our choices.|We need to explain |why / the method / we chose / was appropriate / for the question|.|We chose modifies method; was appropriate completes the why-clause.
The students want assurance that revisions will matter.|They need to know |that / the feedback / they receive / can be used / to improve their work|.|The content-clause subject includes a relative before its passive predicate.
The application refers to records we cannot locate.|We must establish |whether / the records / on which it relies / still / exist|.|Whether introduces the issue; on which it relies modifies records.
The room is unavailable until the inspection has finished.|We cannot confirm |when / the space / will be ready / for students / to use|.|The indirect question contains a for-infinitive identifying the users.
We cannot tell which part of the revision caused the improvement.|What remains uncertain |is / whether / the changes / that were introduced together / would have worked / separately|.|The what-subject takes is; whether contains a passive relative and perfect modal.
The reviewer questions a promise made before the trial.|She doubts |that / the benefits / we were told to expect / can be achieved / without / additional support|.|The content subject benefits includes an object relative with passive reporting.
Our conclusions depend on an assumption participants may not share.|We should ask |whether / what we regard as convenient / is also / acceptable to / the people / expected to participate|.|Whether-clause has a nominal what-subject and a reduced passive modifier.
The study excluded people whose answers were incomplete.|We need to explain |how / excluding those respondents / might have affected / what / the final sample / represents|.|The embedded how-clause uses a gerund subject and nominal what-object.
The committee wants an independent test before making a claim.|Only after the method has been replicated |will / we / be able / to assess / whether its apparent advantages / persist / under different conditions|.|Only after triggers main-clause inversion; the final whether-clause remains declarative.
The applicants deserve an explanation of decisions they cannot appeal.|Anyone whose request has been rejected |should be told / why / the evidence / they submitted / was considered / insufficient|.|A relative-qualified subject takes a modal passive followed by a layered why-clause.
`);

export {groups};
