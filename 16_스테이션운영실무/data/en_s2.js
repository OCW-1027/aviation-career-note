/* 優れたステーションのつくり方 — English version (Part 2) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("2-1",{title:"What the SGHA and the SLA Settle",hl:"SGHA and SLA",subtitle:"The contract says what is done; the SLA says how well. Promise in numbers and you can manage in numbers",
lead:["A station’s relationship with its ground handler starts with IATA’s Standard Ground Handling Agreement (SGHA). But the SGHA mainly settles which services are contracted and what they cost. How well they must be done is set in a separate service level agreement (SLA).","If the SLA is vague, every quality problem ends with “we are doing what the contract says”. This article covers the different roles of the SGHA and the SLA, what to measure in an SLA, and how to agree it."],
sections:[
{h:"SGHA versus SLA",blocks:[{t:"fig",id:"stn_sla",cap:"Top: what the SGHA and the SLA each settle. Bottom: an example SLA scorecard (green met, red missed)."},{t:"table",cols:["","SGHA","SLA"],rows:[
["What it settles","Scope of services, charges, liability and indemnity","Service standards (times, accuracy, staffing), how they are measured, how shortfalls are fixed"],
["Form","IATA standard form (main agreement plus Annexes A and B)","Written by each company in its own format"],
["Reviewed","At rate changes or contract renewal","Regularly against results, every six to twelve months"]]},
{t:"note",x:"* Check the current SGHA edition and annex structure in IATA’s latest material. ★"}]},
{h:"What to measure in an SLA (examples)",blocks:[{t:"table",cols:["Area","Example measures"],rows:[
["Passenger","Counter opening time, queue time (for example economy within x minutes), keeping to boarding start and close times"],
["Baggage","Time to first and last bag on the belt after arrival, mishandled baggage rate"],
["Ramp","Staff and equipment in position before arrival, loading and unloading times, delays caused by equipment faults"],
["Load control","Loadsheet finalised on time, zero load errors"],
["Quality and training","Validity of licences and training, deadlines for correcting audit findings"]]},
{t:"note",x:"* Target values vary with the airport, aircraft and number of flights. Methods differ too: Company A may define queue time as “90% of passengers within x minutes”, Company B as “an average of x minutes”. ★"}]},
{h:"An SLA scorecard (example)",blocks:[{t:"table",cols:["Indicator","Target","This month","Result"],rows:[
["Check-in queue","90% of passengers within 15 min","92%","Met"],
["First bag","Within 15 min of arrival","88%","Missed: corrective plan"],
["Load sheet finalised","By 20 min before departure","100%","Met"],
["Ground-caused delays","3 or fewer a month","5","Missed: cause analysis"]]},
{t:"note",x:"* Figures are examples. Showing the same table every month makes it clear at a glance whether things are improving. For costs, see Airline Passenger Operations 6-8 (checking invoices); for handler management overall, see 6-2 of the same course."}]},
{h:"How to agree it",blocks:[{t:"check",items:[
{name:"Only what can be measured",x:"Not “treat passengers courteously” but times, counts and percentages."},
{name:"Agree the data source",x:"Decide at the outset who measures, and from which system or record."},
{name:"Start with achievable targets",x:"Targets that are too tough from day one become a formality. Raise them step by step as results come in."},
{name:"What happens on a miss",x:"Write down the corrective action plan, the deadline and how repeat misses are handled (such as charge adjustments)."},
{name:"Recognise good results too",x:"Agree how sustained achievement will be recognised; it helps the relationship."}]},
{t:"point",x:"An SLA is not a document for tying the other side down; it is a document for sharing the same goal. Promise in numbers and your meetings can argue about numbers, not feelings."}]}],
deepLabel:"In depth: a sample SLA",
deep:[
{h:"How an SLA is structured (sample)",blocks:[{t:"table",cols:["Clause","What it contains"],rows:[
["Purpose and scope","The airports, flights and services covered, and which SGHA annex it relates to"],
["Measures and targets","Set out in a schedule (see the table below)"],
["Measurement","Data source, when measured, and what is not counted (exclusions)"],
["Reporting","The format of the monthly scorecard and when it is due"],
["When a target is missed","Cause analysis, corrective plan, re-measurement the following month"],
["Review","Every six to twelve months, or when routes, aircraft or airport facilities change"],
["Contacts","The person responsible on each side, and a deputy"]]}]},
{h:"Schedule of measures (sample)",blocks:[{t:"table",cols:["Area","Measure","Example target","How it is measured","Example exclusions"],rows:[
["Passenger","Check-in queue","90% of passengers within 15 minutes","Sampling at peak times","System failure, rebooking from a cancelled flight"],
["Baggage","First bag","Within 15 minutes of arrival (block-in)","Record when the first bag reaches the belt","Delays caused by CIQ inspection"],
["Load control","Load sheet finalised","By 20 minutes before departure","Message time stamp","Late changes instructed by the airline"],
["Ramp","Equipment ready before arrival","100% by five minutes before arrival","Observation at audits, photographs","Arrival much earlier than planned"],
["Punctuality","Ground-caused delays","Three or fewer a month","Delay code statistics","Causes on the airline’s side"],
["Safety","Ground accidents, aircraft damage","Zero","Safety reports","—"]]},
{t:"note",x:"* The figures are examples. Targets depend on the route, aircraft, airport facilities and contract. ★"}]},
{h:"Avoiding arguments about the numbers",blocks:[{t:"check",items:[
{name:"Define each time first",x:"For example, “first bag” is when the first bag reaches the belt, counted from block-in."},
{name:"Agree exclusions first",x:"Write them into the agreement so nobody argues later that something should not count."},
{name:"Use one data source",x:"If the airline and the handler keep separate records, the numbers will not match."},
{name:"Agree how to sample",x:"For things you cannot measure in full, such as queue time, agree when and how many to measure."}]}]}],
voice:"SLA targets last longer when they start at a level the handler can actually meet and rise step by step. Unachievable numbers only erode trust on both sides.",
terms:[["Standard Ground Handling Agreement (SGHA)","標準地上業務委託契約","표준 지상조업 계약"],["Service Level Agreement (SLA)","サービス水準の合意書","서비스 수준 협약"],["Key Performance Indicator (KPI)","重要業績評価指標","핵심성과지표"],["Corrective Action Plan","是正計画","시정 계획"]],
quiz:[{q:"What does an SLA mainly settle?",opts:["Service standards and how they are measured","Only the scope of services","The company share price","Staff salaries"],a:0,exp:"Scope and charges are in the SGHA; standards and measurement in the SLA."},
{q:"How should SLA measures be written?",opts:["In times, counts and percentages","As “courteously”","Not at all","Verbally"],a:0,exp:"Include only what can be measured."},
{q:"What happens if targets are too tough from the start?",opts:["They tend to become a formality","They are always met","Quality always rises","The relationship improves"],a:0,exp:"Raise them step by step as results come in."}],
next:"2-2 Using a quality audit checklist"});

set("2-2",{title:"Using a Quality Audit Checklist",hl:"checklist",subtitle:"The point is not the score. It is a tool for checking that last time’s findings were fixed",
lead:["Many airlines have their stations audit the handler’s work regularly. They keep a checklist for each area — passenger, ramp, service — pick one flight and watch it from start to finish.","This article covers how a checklist is laid out, how scores and findings are graded, and what to look at during an audit."],
sections:[
{h:"How a checklist is laid out (example)",blocks:[{t:"fig",id:"stn_audit",cap:"Moving diagram: the dotted line shows the next audit returning to the previous findings. Below: an example of how to write a remark."},{t:"table",cols:["Section","Content"],rows:[
["Flight details","Date, flight number, scheduled and actual arrival and departure times, auditor, station manager’s signature"],
["Previous findings","Problems found last time and whether they have been fixed"],
["Check items","Items in process order: before arrival, arrival, loading, departure"],
["Score and remarks","A score per item, and what was seen (times, headcounts, equipment — facts)"],
["Action","Fixed on the spot, recommendation for improvement, or corrective action"]]}]},
{h:"Grading scores and findings (examples)",blocks:[{t:"table",cols:["","Company A (5 levels)","Company B (3 levels)"],rows:[
["No problem","5","Conforming"],
["Minor issue, fixed on the spot","4","Conforming (observation)"],
["Recommendation for improvement","3","—"],
["Corrective action needed","2","Non-conforming"],
["Stop immediately","1 (immediate correction)","Non-conforming (major)"]]},
{t:"note",x:"* Some audits, such as IATA’s Safety Audit for Ground Operations (ISAGO), judge simply conforming or non-conforming. ★"}]},
{h:"Writing findings well",blocks:[{t:"check",items:[
{name:"Write what you saw",x:"When, where and what. Not “poor handling” but “10:05, counter 3: bag tagged without checking the weight”."},
{name:"Cite the standard",x:"Add which rule or procedure, and which section, was not met. A finding with no standard gives the other side nothing to fix."},
{name:"State the impact",x:"One sentence on what happens if it is left (safety, punctuality, passengers)."},
{name:"Keep evidence",x:"Attach photos or copies of records. Look at procedures and systems rather than individuals."},
{name:"Confirm on the spot",x:"At the end of the check, read the findings through with the handler’s manager and agree the facts before finalising."}]},
{t:"note",x:"* For the audit process as a whole, see Airline Passenger Operations 6-2 (managing handlers) and 6-4 (preparing for audits)."}]},
{h:"What to look at (examples)",blocks:[{t:"check",items:[
{name:"Ramp: before arrival",x:"Staff and equipment in position before the aircraft arrives; FOD walk; safety equipment (ear defenders, safety shoes); chocks on parked equipment."},
{name:"Ramp: arrival and departure",x:"Marshalling hand signals or standing by the docking system’s emergency stop; cone positions; how equipment approaches; door procedures; loading to the load plan."},
{name:"Passenger: before opening",x:"Pre-flight seat allocation (infants, children, wheelchairs), equipment, printers and microphone ready, notices displayed, forms ready, staffing, briefing."},
{name:"Passenger: during check-in",x:"Checking passports and visas, checking bags and asking the dangerous goods questions, running the bag-drop counter, managing the cut-off."}]},
{t:"point",x:"Write facts in the remarks, not impressions. Not “slow”, but “equipment not in position 15 minutes before arrival (it arrived 5 minutes before)”. Facts let the other side answer with improvements rather than arguments."}]}],
deepLabel:"In depth: sample checklists by area",
deep:[
{h:"Ramp (example)",blocks:[{t:"table",cols:["Check item","What to look at"],rows:[
["Readiness before arrival","Staff and equipment in position five minutes before arrival; stand checked for foreign objects (FOD)"],
["Approaching the aircraft","A guide person present; vehicle speeds and stopping positions as per procedure"],
["Chocks and cones","Placed in the right order and positions"],
["Loading","Positions as per the loading instruction (LIR); restraints and nets in place"],
["Dangerous goods and special cargo","Position, segregation and securing; notification to the captain (NOTOC)"],
["Before departure","Final walk-around; doors and panels confirmed closed"]]}]},
{h:"Passenger (example)",blocks:[{t:"table",cols:["Check item","What to look at"],rows:[
["Counter opening","Opened at the agreed time with the agreed number of staff"],
["Document check","Passports, visas and travel requirements checked as per procedure"],
["Baggage acceptance","Dangerous goods questions, weight and pieces, tag destination"],
["Gate","Announcements, boarding order, boarding pass checked against passport"],
["Headcount","Boarded passengers match the system; the procedure when they do not"],
["After closing","Handover of documents; handling of bags of passengers who did not board"]]}]},
{h:"Service (example)",blocks:[{t:"table",cols:["Check item","What to look at"],rows:[
["Signs and queue management","Signs easy to see; passengers directed to the right queue"],
["Special passengers","Handling and handover for wheelchair users and unaccompanied minors"],
["Information during delays","Time and content of the first announcement, and when the next will come"],
["Appearance and name badges","As per company standards"],
["Complaints","Handling on the spot, and recording and reporting"]]},
{t:"note",x:"* These are typical examples. Build your own from the company manuals and IATA’s ground handling standards (IGOM, AHM). ★"}]}],
voice:"Do not dismiss small findings on the checklist as trivial. Serious incidents usually grow from small shortcuts piling up.",
terms:[["Quality Audit","品質監査","품질심사"],["Foreign Object Debris (FOD)","異物（FOD）","이물질(FOD)"],["Chocks","輪止め","고임목"],["IATA Safety Audit for Ground Operations (ISAGO)","地上業務の安全監査","지상조업 안전감사"]],
quiz:[{q:"What do you check first on a checklist?",opts:["Whether last time’s findings were fixed","The auditor’s preferences","The weather","Charges"],a:0,exp:"If old problems are not fixed, the same findings keep coming back."},
{q:"How should remarks be written?",opts:["As facts: times, headcounts","As impressions: “slow”","Not at all","Verbally only"],a:0,exp:"Facts lead to improvement."},
{q:"What is checked on the ramp before arrival?",opts:["Staff and equipment in position, and the FOD walk","Passenger boarding","Fares","Bookings"],a:0,exp:"Preparation before arrival underpins safety and punctuality."}],
next:"2-3 The monthly meeting and corrective action"});

set("2-3",{title:"The Monthly Meeting and Corrective Action",hl:"monthly meeting",subtitle:"If the same finding appears three months running, the meeting is not working",
lead:["The monthly meeting with the handler is at the heart of station management. Bring the audit findings, the delay and baggage numbers and the customer feedback; discuss the causes, agree corrections, and check them the following month.","This article covers a standard agenda, how to run corrective actions, and the signs that the meeting has become a formality."],
sections:[
{h:"A standard agenda (example)",blocks:[{t:"ladder",rise:10,steps:[{name:"Last month’s promises",sub:"Progress on corrections"},{name:"Numbers",sub:"Punctuality, baggage, complaints, safety"},{name:"Audit findings",sub:"This month’s"},{name:"Changes",sub:"Rules, schedules, facilities"},{name:"New promises",sub:"Owners and deadlines"}]}]},
{h:"Running corrective actions",blocks:[{t:"fig",id:"stn_capa",cap:"Two findings followed over three months: one closed, one repeated."},{t:"table",cols:["Stage","What happens"],rows:[
["Share the facts","When, on which flight, what happened — shown with records and photos"],
["Cause","The direct cause, and why it happened (training, staffing, procedure, equipment)"],
["Action","Who does what by when, including something that stops a repeat (a procedure change, training)"],
["Verify","Check at next month’s meeting and the next audit that it really is fixed"],
["Record","Minute it and have both sides confirm"]]}]},
{h:"Putting the meeting pack on one page",blocks:[{t:"rows",items:[
{name:"Last month’s numbers",x:"The SLA scorecard (2-1) and punctuality, baggage and safety figures, side by side with the previous month and year."},
{name:"Causes",x:"For each missed item, separate the causes you know from those still being investigated."},
{name:"Progress on corrective actions",x:"The list of actions agreed so far, with owner, deadline and done or not done."},
{name:"Next month’s focus",x:"Narrow it to two or three points, such as extra flights or seasonal preparation."}]},
{t:"note",x:"* Airline Passenger Operations 6-9 (the station KPI monthly report) teaches how to build the monthly report, with practice material."}]},
{h:"Signs the meeting has become a formality",blocks:[{t:"check",items:[
{name:"The same findings keep appearing",x:"In many companies’ scorecards, repeated identical corrective actions also count against the station."},
{name:"Months with no meeting",x:"The busier the month, the more it matters to meet, even briefly. Some companies count a skipped meeting as “not done” in their scorecard. ★"},
{name:"No numbers on the table",x:"It has become an exchange of opinions. Start by sharing the figures."},
{name:"No one from the front line",x:"Actions agreed only between managers never reach the floor. Bring the supervisors in."}]},
{t:"point",x:"The monthly meeting is a place for making promises, not for assigning blame. In months when promises were kept, say so clearly."}]}],
voice:"End the monthly meeting on what you will do together next month rather than on criticism, and the mood changes. Ask questions that let the handler propose the fixes.",
terms:[["Monthly Performance Meeting","月例会議","월간 회의"],["Corrective Action","是正措置","시정조치"],["Minutes","議事録","회의록"],["Root Cause","根本原因","근본 원인"]],
quiz:[{q:"What is checked first at the monthly meeting?",opts:["Progress on last month’s promises","New demands","Small talk","Charges"],a:0,exp:"Start with whether promises were kept."},
{q:"What must a corrective action include?",opts:["Something that stops a repeat","Only an apology","Only a penalty","Nothing"],a:0,exp:"Include procedure changes and training."},
{q:"Which is a sign the meeting has become a formality?",opts:["The same findings keep appearing","Discussion is based on numbers","Front-line staff attend","Promises are kept"],a:0,exp:"Repeated findings are the warning sign."}],
next:"2-4 Becoming one team with your handler"});

set("2-4",{title:"Becoming One Team with Your Handler",hl:"one team",subtitle:"Not a contractor but colleagues getting the same flight away. Build the relationship before you need it",
lead:["A night of disruption, a sudden extra flight, a peak season short of hands. At times like these, what finally rescues the station is not the contract but trust with the handler’s people.","This article covers building relationships with the handler’s key people, spotting staffing problems early, and behaviour to avoid."],
sections:[
{h:"The basics of the relationship",blocks:[{t:"check",items:[
{name:"Know the key people",x:"The duty manager, the supervisors, the sales and contract lead. Know who can decide what."},
{name:"Talk regularly",x:"Not only in meetings: see each other on the floor, and sometimes hear what people really think over a meal (within company rules)."},
{name:"Spot staffing issues early",x:"Resignations, hiring, peak-season rosters. Work out measures with head office before hands run short."},
{name:"Put good work into words",x:"On days the flight left on time or a hard flight was handled well, thank people specifically, and mention it in reports to head office."}]}]},
{h:"What not to do",blocks:[{t:"rows",items:[
{name:"Raise your voice on the floor",x:"Give findings as facts, through the person in charge — never in front of passengers."},
{name:"Treat extra work as a given",x:"Ask first about anything outside the contract; if it costs money, settle it with head office."},
{name:"Escalate behind their backs",x:"Tell the handler first, check the cause together, then report."},
{name:"Play favourites",x:"Use the same standard for everyone. Rely on one person and nothing works on their day off."}]}]},
{h:"Working with the operations department",blocks:[{t:"rows",items:[
{name:"Point of contact on the day",x:"Know the handler’s duty manager for the day and route flight-by-flight contact through them."},
{name:"Sharing training records",x:"Receive the list of qualification and training expiry dates every month and check together who is about to lapse."},
{name:"Joint exercises",x:"Run tabletop exercises for disruptions and pre-season briefings together."},
{name:"Saying thank you",x:"Tell the handler, by name, about flights that went well and staff who did a good job."}]},
{t:"note",x:"* The role and training of a handler’s operations department are covered in detail in Airline Passenger Operations 6-7."}]},
{h:"Where the duty manager stands",blocks:[{t:"fig",id:"stn_team",cap:"What the duty manager gives to and takes from the handler, head office and station staff."},{t:"table",cols:["Towards","What the duty manager does"],rows:[
["The handler","Explains the airline’s standards and listens to the floor’s problems; looks for ways to make things work, not reasons they cannot"],
["Head office","Explains local realities — staffing, facilities, airport rules — in facts and numbers, and asks for the support needed"],
["Station staff","Makes it a rule that findings for the handler go through the duty manager, so there is one point of contact"]]},
{t:"point",x:"At a good station the handler says “it’s a pleasure to work that airline’s flights”. That reputation pays off most on the night things go wrong."}]}],
voice:"Trust with your handler is built from everyday thanks and fair evaluation. With that trust, they will go the extra mile with you on a disruption night.",
terms:[["Key Person","キーパーソン","핵심 담당자"],["Duty Manager","デューティーマネージャー","듀티 매니저"],["Peak Season","繁忙期","성수기"],["Single Point of Contact","窓口","창구"]],
quiz:[{q:"What finally rescues the station on a night of disruption?",opts:["Trust with the handler’s people","The contract clauses","Penalties","Fares"],a:0,exp:"Build the relationship in ordinary times."},
{q:"How should a handler problem be reported to head office?",opts:["Tell the handler first and check the cause together","Escalate quietly","Do not report","Post it on social media"],a:0,exp:"That order protects trust."},
{q:"What is the rule when station staff raise issues with the handler?",opts:["Go through the duty manager, one point of contact","Everyone speaks freely","In front of passengers","Never raise them"],a:0,exp:"One point of contact avoids confusion."}],
next:"Part 3 The Duty Manager’s Judgment and Attitude — 3-1 The duty manager’s day and the briefing"});
})(window.ARTS);
