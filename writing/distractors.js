// Item-specific editorial choices, not randomly inserted filler.
// id | unused tile | misconception | explanation | optional finer tile segmentation
const rows=`
wa-embedded-wh-01|does|embedded-auxiliary|Does cannot be added before the embedded subject or used with published without a suitable verb construction; the existing will be already supplies its auxiliaries.
wa-embedded-whether-01|did|embedded-auxiliary|Did requires a bare lexical verb; it cannot replace has in has been reserved, and the embedded whether-clause does not take direct-question inversion.
wa-subject-object-questions-01|does|subject-question|Which rule is already the subject of affects. Does would require affect, not affects, and no extra question auxiliary is needed.
wa-nested-direct-01|said|verb-form|Didn't already carries the past tense, so the following lexical verb must be say rather than said.
wa-relative-subject-01|it|resumptive-pronoun|That supplies the relative clause's subject. Adding it would duplicate that subject; replacing that with it would leave two unconnected finite clauses.
wa-relative-object-01|them|resumptive-pronoun|That represents the workshop as the object of recommended, so an extra object pronoun is not needed. Them also cannot replace the subject she because it is an object-case form.
wa-relative-possession-01|who|relative-case|Whose is needed before portfolio to show possession. Who cannot determine the noun portfolio.
wa-nominal-relatives-01|that|clause-link|What means the thing that and supplies the object of demonstrated. That alone would introduce a clause with the object missing.
wa-real-conditions-01|will|conditional-auxiliary|The if-clause uses the present cancels for the future condition. Will cannot be placed before cancels, which would need the base form cancel.
wa-conditional-links-01|not|double-negative|Unless already means if not. Adding not here reverses the required condition, wrongly saying processing depends on a referee refusing to confirm the experience.
wa-wish-preference-03|to discuss|verb-complement|Would rather takes the bare infinitive discuss. To discuss is not licensed after would rather.
wa-future-time-01|will become|future-time-clause|For this ordinary future time clause after when, use becomes rather than will become; the main clause already expresses the future notification.
wa-present-perfect-02|have been knowing|stative-aspect|Know describes a continuing state here. Have known is appropriate; the progressive have been knowing is not the normal construction for this acquaintance.
wa-causative-02|to repeat|verb-complement|Active made takes us followed by the bare infinitive repeat. The to-infinitive is used in a passive such as were made to repeat, which is not this sentence.
wa-verb-complements-01|to hold|verb-complement|Considering selects the gerund holding in this construction, not the to-infinitive to hold.
wa-preposition-gerund-01|meet|preposition-gerund|To belongs to looking forward to and functions as a preposition, so it requires meeting rather than bare meet.
wa-comparison-01|clear|comparison|Than introduces a comparison, which needs comparative clearer rather than plain clear. Far intensifies clearer; it does not turn the plain adjective clear into a comparative.
wa-agreement-01|need|agreement|The head of the subject is singular list, not plural addresses, so the finite verb must be needs.
wa-quantification-01|few|countability|Advice is noncount. Little useful advice is grammatical; few useful advice is not.
wa-negative-inversion-02|explains|inversion|Fronted rarely triggers does the committee explain. Does carries agreement and tense, leaving the lexical verb in its base form explain.
wa-inverted-conditionals-01|if|conditional-inversion|Had we known already expresses if we had known through inversion. Adding if without undoing that inversion creates an invalid conditional opening.
wa-mandative-01|being|mandative|The that-clause needs a finite predicate, here mandative be checked after recommended. Being checked is nonfinite and would leave that clause without its required predicate.
wa-embedded-wh-04|are|agreement|The embedded subject is singular the printing fee, so the passive requires is calculated rather than are calculated.
wa-embedded-wh-05|have|agreement|The subject of the main embedded predicate is singular proposal. The plural we inside its relative clause does not change has not been reviewed.|why / the proposal / that we submitted / has / not / been / reviewed
wa-embedded-wh-06|is|agreement|Applicants is plural, so the passive requires are expected to have, not is expected to have.|which qualifications / applicants / are / expected / to have / before enrolling
wa-embedded-wh-08|did|verb-form|Had agreed uses a past participle. Did would require agree and cannot be combined with agreed in the supplied clause.|what / the committee / had / agreed / before / the funding was withdrawn
wa-embedded-whether-02|if|clause-link|Whether can introduce to attend ... or ... after unsure. If cannot introduce this infinitival alternative question.
wa-embedded-whether-04|accept|agreement|The office is singular and requires accepts. Whether does not remove ordinary subject–verb agreement.
wa-embedded-whether-07|is|agreement|The relative clause who have already graduated modifies plural applicants. The main predicate must therefore be are eligible.|whether / applicants / who have already graduated / are / eligible / for this award
wa-subject-object-questions-02|approving|verb-form|Who needs a finite predicate here. Approved supplies it; approving would need an auxiliary that is not provided.
wa-subject-object-questions-04|has|agreement|Which departments is plural. The perfect question requires have offered, not has offered.|which departments / have / offered / to lend / their equipment
wa-subject-object-questions-07|have|agreement|The auxiliary agrees with singular your supervisor, not with the person addressed as you. Use has your supervisor asked.
wa-nested-direct-02|have|agreement|The direct-question subject she is singular, so has precedes it. Have she explained would have the wrong agreement.
wa-nested-direct-04|is|agreement|The subject of the outer question is we, so the auxiliary is are. The is inside the embedded payment clause cannot be duplicated or transferred to we.
wa-nested-direct-06|been|verb-form|Would takes the base verb be, giving would it be reasonable. Been needs a perfect auxiliary have, which is absent here.|would / it / be / reasonable / to question / whether those findings / have been replicated
wa-nested-direct-08|is|agreement|Why are we being asked requires plural are with we, even though supervisor later in the sentence is singular.
wa-relative-subject-02|whom|relative-case|The relative pronoun performs the action completed. It is therefore subject who; object whom would not supply the required subject.
wa-relative-subject-04|confirm|agreement|That refers to singular document and takes confirms. The main clause's must does not govern the verb inside this relative clause.
wa-relative-subject-05|tends|agreement|The main subject is plural scholarships. The intervening phrase about accommodation and tuition does not make tends correct.
wa-relative-subject-07|was|agreement|Students is the plural main subject, so use were not included. The intervening relative clause does not change that agreement.|who / had been attending / classes online / were / not included / in the original sample
wa-relative-object-02|whom|preposition|Spoke requires to when introducing the person addressed. To whom supplies that relation; whom alone would leave the preposition missing.
wa-relative-object-05|has|agreement|Plural assumptions controls the main perfect have been revised. Singular model belongs to the relative clause and does not license has.
wa-relative-object-07|is|agreement|Plural conditions requires are listed. The plural bookings inside the relative clause is not the subject of the main verb.
wa-relative-possession-03|who|relative-case|The noun work needs possessive whose. Who work cannot express the researcher’s ownership of the cited work.
wa-relative-possession-04|explain|agreement|Supplementary which refers to the relocation as a whole, so it takes singular explains. Plural letters belongs to the later why-clause.
wa-relative-possession-05|whom|relative-case|Whose determines projects and expresses possession. Whom is an object pronoun and cannot fill that determiner role.
wa-reduced-relatives-01|submits|reduced-relative|Forms needs a reduced passive modifier submitted before its main predicate will be returned. Finite submits would create an unlinked second predicate and also disagree with forms.
wa-reduced-relatives-02|wait|reduced-relative|Waiting reduces who are waiting. Bare wait would add another finite predicate before should check in without a clause connector.
wa-reduced-relatives-05|wrote|reduced-relative|Written is the past participle modifying reports passively. Wrote is a finite past form and cannot replace that modifier before may contain.
wa-nominal-relatives-07|were|agreement|The complete subject What the reviewers wanted is a singular nominal clause, followed by the infinitival content for us to explain. It takes was, not were.
wa-nominal-relatives-09|make|agreement|What we now know is one nominal clause functioning as the main subject, so the main verb is makes despite we inside that clause.
wa-content-clauses-01|which|clause-link|That introduces the content of fact. The lecture was canceled is already a complete clause, leaving no relative-pronoun role for which.
wa-content-clauses-04|need|agreement|The head subject assumption is singular, so it needs to be tested. Participant belongs to the content clause, not the main predicate.
wa-content-clauses-07|have|agreement|The issue is the singular main subject and takes has received; the whether-clause inside it does not control the main verb.|of whether / the method / can be scaled up / has / received / little attention
wa-real-conditions-02|include|agreement|Singular estimate requires includes in the if-clause. The we in the relative clause we need does not govern this verb.
wa-real-conditions-06|demonstrates|agreement|The subject receipts is plural, so demonstrate is needed even though the complete if-clause expresses one condition.
wa-conditional-links-02|have|agreement|Nobody else is grammatically singular and requires has a reservation, not have a reservation.
wa-conditional-links-06|retains|agreement|Existing users is plural and takes retain. The singular update in the fixed main clause does not control this conditional predicate.
wa-second-conditional-06|spent|verb-form|Would requires the bare infinitive spend. Spent cannot follow that modal, even though the hypothetical if-clause uses a past form.|researchers / would / spend / less time / locating / the evidence / they need
wa-third-conditional-02|prepare|verb-form|Could have requires the past participle prepared. Prepare is not the participle required after have.
wa-third-conditional-04|leave|verb-form|The past-unreal condition uses had left. Leave is a base form and cannot replace the participle after had.|the caretaker / had / left / the key / at reception
wa-third-conditional-06|notice|verb-form|Might have requires the past participle noticed. The verb was in the embedded clause cannot supply the missing perfect participle.
wa-mixed-conditional-02|carried|verb-form|Could takes the base verb carry for the current ability. The past condition does not require a past-tense verb after could.|we / could / carry / it / without assistance
wa-mixed-conditional-06|attend|verb-form|Would be attending describes the unreal continuing activity this semester. The base form attend cannot follow be in that construction.|i / would / be / attending / the seminar / with everyone else / this semester
wa-wish-preference-02|been|verb-form|The unreal present state after wish uses were. Been is a nonfinite participle and has no perfect auxiliary here.
wa-wish-preference-05|check|verb-form|Past regret uses I had checked. Check cannot replace the required participle after had.|i / had / checked / whether / all the participants / had agreed / to be recorded
wa-future-time-02|have|agreement|Singular grant requires has been approved, even inside a future-oriented until-clause.|the grant / has / been / approved / in writing
wa-future-time-04|are|agreement|Singular installation requires is complete. The future meaning of as soon as does not change agreement.
wa-past-sequence-09|assuming|verb-form|Had assumed is a perfect finite predicate. Assuming would require been after had to make a progressive, and no such tile is supplied.|had / assumed / that / the applicant / had accepted / the offer / without reservations
wa-present-perfect-04|interview|verb-form|After have been, the ongoing active form must be interviewing. Bare interview cannot complete this progressive construction.|have / been / interviewing / students / who use / the evening shuttle
wa-present-perfect-06|have|agreement|The main subject office is singular and requires has occupied. The later building clause has its own separate predicate.|has / occupied / this space / ever since / the main building / was closed / for repairs
wa-future-perfect-02|has|verb-form|Will requires the bare auxiliary have, giving will have read. Finite has cannot follow will.|the panel / will / have / read / all / the submissions
wa-future-perfect-04|teaches|verb-form|Will be teaching is future continuous. Finite teaches cannot replace the -ing participle after be.|she / will / be / teaching / the class / on her own
wa-passive-layers-02|be|verb-form|Is being widened needs being to form the progressive passive. Bare be cannot follow is in this construction.|is / being / widened / to improve / access
wa-passive-layers-04|being|verb-form|Should have been inspected is a perfect modal passive. Being cannot replace been after perfect have.|should / have / been / inspected / before / anyone used it
wa-passive-layers-07|been|verb-form|Must be retained needs bare be after the modal. Been would need a preceding have, and the later have been belongs to the until-clause.|must / be / retained / until / all appeals / have been / resolved
wa-perfect-modals-01|leave|verb-form|Must have left requires the past participle left for an inferred past departure, not base-form leave.
wa-perfect-modals-02|wrote|verb-form|The perfect modal might have takes written. Wrote is the finite past-tense form, not the required participle.|might / have / written / the wrong number / on it
wa-causative-04|to inspect|verb-complement|Active let takes us inspect, without to. To inspect is not licensed by let in this sentence.
wa-causative-07|to reconsider|verb-complement|Made takes the team’s bare action reconsider. To reconsider would require a different construction, such as were made to reconsider.
wa-causative-10|to explain|verb-complement|Made the team explain uses a bare infinitive after its object. Active made does not license to explain here.
wa-reporting-passive-02|is|agreement|The main reporting passive agrees with plural documents: are thought. The perfect infinitive has no finite subject agreement of its own.|are / thought / to have disappeared / before / the inspection
wa-reporting-passive-04|are|agreement|The office is singular, so the reporting passive is is said. Applications is an object inside the infinitive clause.|is / said / to be reviewing / the applications / this week
wa-reporting-passive-07|are|agreement|The main subject director is singular and needs is understood. Neither version nor changes in later clauses controls that verb.|is / understood / to have approved / a version / that did not / include / the latest changes
wa-reported-sequence-02|preferring|verb-form|We needs a finite predicate in the reported question. Preferred supplies it; preferring would need an auxiliary not supplied here.
wa-reported-sequence-03|receiving|verb-form|Had received is a finite past-perfect predicate. Had receiving lacks the been needed for a progressive form.|that / the office / had / received / it / that morning
wa-reported-sequence-04|deleting|verb-complement|Reminded us not to delete uses an object followed by a negative to-infinitive. Deleting cannot substitute for to delete in this pattern.|us / not / to delete / the files / before marking
wa-verb-complements-02|inspecting|verb-complement|Promised selects the intended action as to inspect. It does not take inspecting as its action complement in this construction.
wa-verb-complements-03|order|verb-complement|Delay requires the gerund ordering. Bare order cannot serve as the object of delay.
wa-verb-complements-04|to set up|verb-complement|Finished takes setting up and arranging as parallel -ing complements. To set up breaks both the complement pattern and the parallel structure.
wa-object-infinitive-02|finishes|verb-complement|Allows takes the object us followed by to finish. Finite finishes cannot fill that infinitive position.
wa-object-infinitive-04|confirm|verb-complement|Expect takes the office followed by to confirm. Bare confirm is not licensed after this object.
wa-object-infinitive-06|explained|verb-complement|Asked the leader requires the to-infinitive to explain for the requested action. Finite explained would leave two unconnected predicates.
wa-perfect-nonfinite-02|be|verb-form|Dislike takes a gerund, here passive being interrupted. Bare be cannot fill that gerund position.|being / interrupted / while / they are / presenting
wa-perfect-nonfinite-04|have|verb-form|Admitted takes a gerund, here perfect having used. Finite have cannot replace having after admitted.|having / used / the wrong formula / for / the estimate
wa-perfect-nonfinite-06|be|verb-form|Appreciated takes passive being thanked. Bare be cannot form the required passive gerund.|being / thanked / for work / that / had taken / months to complete
wa-preposition-gerund-02|to share|preposition-gerund|Refrain from requires an -ing complement, sharing. A to-infinitive cannot follow the preposition from here.
wa-preposition-gerund-04|sent|preposition-gerund|For takes the gerund sending in apologized for sending. Finite past sent cannot serve as that complement.
wa-preposition-gerund-06|obtain|preposition-gerund|Depends on requires the gerund obtaining. The later to inspect belongs to permission and does not license bare obtain after on.
wa-participial-control-02|us|pronoun-case|The main clause needs nominative we as the subject of can see. Object-form us cannot fill that subject position.
wa-participial-control-04|taking|verb-form|After the introductory participial phrase, she needs a finite main verb, took. Taking would leave the sentence without a finite predicate.
wa-participial-control-06|them|pronoun-case|The main subject of continued must be nominative they. Them cannot supply the subject after the introductory passive participle.
wa-concession-04|encouraging|verb-form|After the although-clause, she needs a finite main predicate. Encouraged supplies it; encouraging would require an auxiliary that is not supplied.
wa-concession-07|declining|verb-form|Despite acknowledging forms the introductory concession. The committee still needs the finite main verb declined; declining would leave that main clause incomplete.
wa-reason-result-05|were|agreement|The main subject she requires was unaware. The later plural-sounding discussion phrase cannot license were, and this is a factual past statement rather than a hypothetical condition.
wa-purpose-02|allows|verb-form|The fixed purpose marker to requires bare allow. Allows is finite and cannot follow that infinitive marker.
wa-purpose-07|be|preposition-gerund|From is a preposition in keeps the same response from being counted. It requires the passive gerund being, not bare be.|the same response / from / being / counted / more than once / in / the final totals
wa-comparison-06|enough clear|comparison|Enough follows an adjective: clear enough. Enough clear reverses that order and cannot introduce the for-infinitive complement here.
wa-parallelism-02|uploading|parallelism|Can governs the parallel bare verbs upload and deliver. Uploading cannot replace upload after can either.
wa-parallelism-09|to collect|parallelism|Practice selects an -ing action complement here. Collecting also parallels organizing and presenting; to collect does not fit that pattern.
wa-agreement-02|have|agreement|Each is the singular head of Each of the forms. It takes has, even though plural forms is closer to the verb.
wa-agreement-04|have|agreement|The number is a singular total, so it takes has increased. Do not confuse the number of requests with a number of requests.|has / increased / since / the notice / appeared
wa-agreement-06|do not|agreement|The subject is noncount equipment, which takes singular does not. Plural boxes is inside a modifier and does not control the verb.
wa-quantification-07|fewer|countability|Paperwork is noncount, so the comparative is less. Fewer requires a count plural such as forms.|far / less / paperwork / than / the process / that / it replaces
wa-determiners-05|an|countability|Advice is noncount in this context. Some advice is grammatical; an advice would incorrectly treat it as a singular count noun.
wa-adverb-scope-05|consider|verb-form|Has not yet requires the past participle considered. Consider is the bare verb and cannot replace that participle after perfect has.
wa-negative-inversion-05|realized|inversion|Fronted Only after triggers did the team realize. Did already carries past tense, so realized cannot replace the bare verb realize.
wa-inverted-conditionals-02|contacting|verb-form|Please introduces an imperative after the inverted condition. The directive needs bare contact; contacting would leave it without a finite imperative predicate.
wa-clefts-05|select|verb-form|Had been selected is a past-perfect passive. Bare select cannot follow been; the passive needs the participle selected.
wa-anticipatory-it-02|assess|verb-complement|The extraposed infinitive after difficult needs its marker to: to assess a plan. Bare assess cannot fill that slot without to.
wa-comparative-correlatives-02|become|agreement|The main message is singular, so the correlated result clause takes becomes. Plural details in the fixed first clause does not control that verb.
wa-ellipsis-02|done|verb-form|Neither did echoes the earlier negative past-tense action. Done is a nonfinite participle and cannot supply the auxiliary before anyone else.
wa-layered-synthesis-05|are|agreement|The subject of the main predicate is the nominal clause What remains uncertain, which takes is here before a whether-clause. Plural changes is inside that later clause and does not control the main verb.
w01-s1|borrowing|verb-form|The modal can takes the bare infinitive borrow. Borrowing cannot follow can without another auxiliary.
w01-s2|begins|verb-form|Does carries tense and singular agreement in this direct question, so its lexical verb must be bare begin rather than begins.
w01-s3|does|embedded-auxiliary|The embedded clause uses the application form is available. Does cannot replace is before the adjective available, and it does not license question inversion inside this clause.
w02-s1|did|verb-form|Did takes bare check, which is not provided. Checked is the participle required by Have you checked.
w02-s3|did|verb-form|Has passed uses a past participle. Did would require pass and cannot be substituted before passed.
w03-s2|recommended|verb-form|Did already marks past tense. The verb after the subject must therefore be bare recommend, not recommended.
w03-s3|do|subject-question|Which bus is the singular subject of stops. Do cannot replace that finite verb or be added before stops, which would need the base form stop.
w04-s1|needs|verb-form|Do supplies tense in the question. The lexical verb must be bare need even if a nearby noun looks singular.
w04-s3|did|verb-form|The passive been delayed needs perfect has. Did cannot be followed by been delayed, and the embedded clause keeps subject-before-verb order.
w05-s3|does|verb-form|Works is already finite and agrees with the singular service. Does would need the unavailable bare work and does not belong in embedded-question inversion.
w06-s3|does|verb-form|The embedded subject the trip takes finite costs. Does cannot be used with costs; a direct question would instead require the bare form cost.
w07-s3|did|verb-form|Reduced is a finite past verb here. Did would require reduce, not reduced, and the embedded why-clause keeps statement order.
w08-s3|did|verb-form|The file has been uploaded is a perfect passive. Did cannot replace has before been uploaded.
w09-s3|is|agreement|Which courses is plural. It requires are open rather than is open, even inside the embedded question.
w10-s3|did|verb-form|What is the subject of has changed. Did would require bare change rather than changed, and no extra question auxiliary is needed.
w11-s3|does|verb-form|Is supposed to work needs finite is before the passive participle supposed. Does cannot fill that position or introduce inversion inside this embedded clause.
w12-s3|is|agreement|The embedded subject students is plural. Are allowed is grammatical; is allowed has the wrong agreement.
`;

export const distractors=Object.fromEntries(rows.trim().split('\n').map(line=>{
  const [id,tile,type,explanation,chunks]=line.split('|');
  return [id,{tile,type,explanation,...(chunks?{chunks:chunks.split(' / ')}:{})}];
}));

export function applyDistractor(q){
  const d=distractors[q.id];if(!d)return q;
  const chunks=d.chunks||q.chunks;
  if(chunks.join(' ').toLowerCase()!==q.chunks.join(' ').toLowerCase())throw Error(`Distractor revision changes the answer: ${q.id}`);
  if(chunks.length<3||chunks.length>7||chunks.some(t=>t.toLowerCase()===d.tile.toLowerCase()))throw Error(`Invalid distractor revision: ${q.id}`);
  return {...q,chunks,extra:[d.tile],extraType:d.type,extraExplanation:d.explanation,explanation:`${q.explanation} Unused tile “${d.tile}”: ${d.explanation}`};
}
