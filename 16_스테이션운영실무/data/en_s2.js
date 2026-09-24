/* 優れたステーションのつくり方 — English version (Part 2) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("2-1",{title:"What the SGHA and the SLA Settle",hl:"SGHA and SLA",subtitle:"The contract says what is done; the SLA says how well. Promise in numbers and you can manage in numbers",
lead:["A station’s relationship with its ground handler starts with IATA’s Standard Ground Handling Agreement (SGHA). But the SGHA mainly settles which services are contracted and what they cost. How well they must be done is set in a separate service level agreement (SLA).","If the SLA is vague, every quality problem ends with “we are doing what the contract says”. This article covers the different roles of the SGHA and the SLA, what to measure in an SLA, and how to agree it."],
sections:[
{h:"SGHA versus SLA",blocks:[{t:"table",cols:["","SGHA","SLA"],rows:[
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
{h:"How to agree it",blocks:[{t:"check",items:[
{name:"Only what can be measured",x:"Not “treat passengers courteously” but times, counts and percentages."},
{name:"Agree the data source",x:"Decide at the outset who measures, and from which system or record."},
{name:"Start with achievable targets",x:"Targets that are too tough from day one become a formality. Raise them step by step as results come in."},
{name:"What happens on a miss",x:"Write down the corrective action plan, the deadline and how repeat misses are handled (such as charge adjustments)."},
{name:"Recognise good results too",x:"Agree how sustained achievement will be recognised; it helps the relationship."}]},
{t:"point",x:"An SLA is not a document for tying the other side down; it is a document for sharing the same goal. Promise in numbers and your meetings can argue about numbers, not feelings."}]}],
voice:"[Interview to be added] Where the station and the handler met in the middle when setting SLA figures.",
terms:[["Standard Ground Handling Agreement (SGHA)","標準地上業務委託契約","표준 지상조업 계약"],["Service Level Agreement (SLA)","サービス水準の合意書","서비스 수준 협약"],["Key Performance Indicator (KPI)","重要業績評価指標","핵심성과지표"],["Corrective Action Plan","是正計画","시정 계획"]],
quiz:[{q:"What does an SLA mainly settle?",opts:["Service standards and how they are measured","Only the scope of services","The company share price","Staff salaries"],a:0,exp:"Scope and charges are in the SGHA; standards and measurement in the SLA."},
{q:"How should SLA measures be written?",opts:["In times, counts and percentages","As “courteously”","Not at all","Verbally"],a:0,exp:"Include only what can be measured."},
{q:"What happens if targets are too tough from the start?",opts:["They tend to become a formality","They are always met","Quality always rises","The relationship improves"],a:0,exp:"Raise them step by step as results come in."}],
next:"2-2 Using a quality audit checklist"});

set("2-2",{title:"Using a Quality Audit Checklist",hl:"checklist",subtitle:"The point is not the score. It is a tool for checking that last time’s findings were fixed",
lead:["Many airlines have their stations audit the handler’s work regularly. They keep a checklist for each area — passenger, ramp, service — pick one flight and watch it from start to finish.","This article covers how a checklist is laid out, how scores and findings are graded, and what to look at during an audit."],
sections:[
{h:"How a checklist is laid out (example)",blocks:[{t:"table",cols:["Section","Content"],rows:[
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
{h:"What to look at (examples)",blocks:[{t:"check",items:[
{name:"Ramp: before arrival",x:"Staff and equipment in position before the aircraft arrives; FOD walk; safety equipment (ear defenders, safety shoes); chocks on parked equipment."},
{name:"Ramp: arrival and departure",x:"Marshalling hand signals or standing by the docking system’s emergency stop; cone positions; how equipment approaches; door procedures; loading to the load plan."},
{name:"Passenger: before opening",x:"Pre-flight seat allocation (infants, children, wheelchairs), equipment, printers and microphone ready, notices displayed, forms ready, staffing, briefing."},
{name:"Passenger: during check-in",x:"Checking passports and visas, checking bags and asking the dangerous goods questions, running the bag-drop counter, managing the cut-off."}]},
{t:"point",x:"Write facts in the remarks, not impressions. Not “slow”, but “equipment not in position 15 minutes before arrival (it arrived 5 minutes before)”. Facts let the other side answer with improvements rather than arguments."}]}],
voice:"[Interview to be added] A small audit finding that you believe prevented a serious incident.",
terms:[["Quality Audit","品質審査","품질심사"],["Foreign Object Debris (FOD)","異物（FOD）","이물질(FOD)"],["Chocks","輪止め","고임목"],["IATA Safety Audit for Ground Operations (ISAGO)","地上業務の安全監査","지상조업 안전감사"]],
quiz:[{q:"What do you check first on a checklist?",opts:["Whether last time’s findings were fixed","The auditor’s preferences","The weather","Charges"],a:0,exp:"If old problems are not fixed, the same findings keep coming back."},
{q:"How should remarks be written?",opts:["As facts: times, headcounts","As impressions: “slow”","Not at all","Verbally only"],a:0,exp:"Facts lead to improvement."},
{q:"What is checked on the ramp before arrival?",opts:["Staff and equipment in position, and the FOD walk","Passenger boarding","Fares","Bookings"],a:0,exp:"Preparation before arrival underpins safety and punctuality."}],
next:"2-3 The monthly meeting and corrective action"});

set("2-3",{title:"The Monthly Meeting and Corrective Action",hl:"monthly meeting",subtitle:"If the same finding appears three months running, the meeting is not working",
lead:["The monthly meeting with the handler is at the heart of station management. Bring the audit findings, the delay and baggage numbers and the customer feedback; discuss the causes, agree corrections, and check them the following month.","This article covers a standard agenda, how to run corrective actions, and the signs that the meeting has become a formality."],
sections:[
{h:"A standard agenda (example)",blocks:[{t:"ladder",rise:10,steps:[{name:"Last month’s promises",sub:"Progress on corrections"},{name:"Numbers",sub:"Punctuality, baggage, complaints, safety"},{name:"Audit findings",sub:"This month’s"},{name:"Changes",sub:"Rules, schedules, facilities"},{name:"New promises",sub:"Owners and deadlines"}]}]},
{h:"Running corrective actions",blocks:[{t:"table",cols:["Stage","What happens"],rows:[
["Share the facts","When, on which flight, what happened — shown with records and photos"],
["Cause","The direct cause, and why it happened (training, staffing, procedure, equipment)"],
["Action","Who does what by when, including something that stops a repeat (a procedure change, training)"],
["Verify","Check at next month’s meeting and the next audit that it really is fixed"],
["Record","Minute it and have both sides confirm"]]}]},
{h:"Signs the meeting has become a formality",blocks:[{t:"check",items:[
{name:"The same findings keep appearing",x:"In many companies’ scorecards, repeated identical corrective actions also count against the station."},
{name:"Months with no meeting",x:"The busier the month, the more it matters to meet, even briefly. Some companies count a skipped meeting as “not done” in their scorecard. ★"},
{name:"No numbers on the table",x:"It has become an exchange of opinions. Start by sharing the figures."},
{name:"No one from the front line",x:"Actions agreed only between managers never reach the floor. Bring the supervisors in."}]},
{t:"point",x:"The monthly meeting is a place for making promises, not for assigning blame. In months when promises were kept, say so clearly."}]}],
voice:"[Interview to be added] What changed the atmosphere of the monthly meeting.",
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
{h:"Where the duty manager stands",blocks:[{t:"table",cols:["Towards","What the duty manager does"],rows:[
["The handler","Explains the airline’s standards and listens to the floor’s problems; looks for ways to make things work, not reasons they cannot"],
["Head office","Explains local realities — staffing, facilities, airport rules — in facts and numbers, and asks for the support needed"],
["Station staff","Makes it a rule that findings for the handler go through the duty manager, so there is one point of contact"]]},
{t:"point",x:"At a good station the handler says “it’s a pleasure to work that airline’s flights”. That reputation pays off most on the night things go wrong."}]}],
voice:"[Interview to be added] A night when trust with the handler saved the station during a disruption.",
terms:[["Key Person","キーパーソン","핵심 담당자"],["Duty Manager","デューティーマネージャー","듀티 매니저"],["Peak Season","繁忙期","성수기"],["Single Point of Contact","窓口","창구"]],
quiz:[{q:"What finally rescues the station on a night of disruption?",opts:["Trust with the handler’s people","The contract clauses","Penalties","Fares"],a:0,exp:"Build the relationship in ordinary times."},
{q:"How should a handler problem be reported to head office?",opts:["Tell the handler first and check the cause together","Escalate quietly","Do not report","Post it on social media"],a:0,exp:"That order protects trust."},
{q:"What is the rule when station staff raise issues with the handler?",opts:["Go through the duty manager, one point of contact","Everyone speaks freely","In front of passengers","Never raise them"],a:0,exp:"One point of contact avoids confusion."}],
next:"Part 3 The Duty Manager’s Judgment and Attitude — 3-1 The duty manager’s day and the briefing"});
})(window.ARTS);
