/* 航空機と整備 Part 0 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("0-1",{title:"What Maintenance Protects: Airworthiness and How Aircraft Are Kept Fit to Fly",hl:"Airworthiness",subtitle:"Type certificate, certificate of airworthiness, continuing airworthiness and release for each flight: four linked stages behind every safe departure",
lead:["An airliner passes through layer after layer of checks, from its design to each day’s departure. The word that ties them together is airworthiness: being in a condition to fly safely.","This course explains what people who are not engineers (airport stations, passenger services, dispatch and sales) need to know about maintenance, comparing the narrow-body B737 with the wide-body B787. The first lesson is the big picture of how airworthiness is protected."],
sections:[
{h:"Four stages",blocks:[{t:"fig",id:"mnt_air",cap:"Animated figure: certification of the design (type certificate), certification of each aircraft (certificate of airworthiness), keeping it airworthy through maintenance, and the check before every departure, linked in sequence."},
{t:"table",cols:["Stage","What it is","Who"],rows:[
["Type certificate (TC)","Certifies that the type’s design meets the safety standards","Authority of the state of design (the US FAA for the B737 and B787)"],
["Certificate of airworthiness (C of A)","Certifies that each aircraft is fit to fly; one of the documents carried on board","Authority of the state of registry (Korea’s transport ministry for a Korean aircraft)"],
["Continuing airworthiness","Inspections and repairs under the maintenance programme, compliance with airworthiness directives (ADs) and records","The airline (maintenance department)"],
["Release for each flight","Checks before every flight and the certifying engineer’s signature (release to service)","Certifying engineer; finally accepted by the captain"]]}]},
{h:"Where the B737 and B787 fit",blocks:[{t:"table",cols:["","B737 (B737-800 etc.)","B787 (B787-9 etc.)"],rows:[
["Size","Narrow-body (about 180–190 seats)","Wide-body (about 250–300 seats)"],
["Typical use","Short and medium routes, many sectors a day","Long routes, one or two sectors a day"],
["Structure","Mainly aluminium alloy","About half the structural weight (fuselage, wings and more) is carbon-fibre composite"],
["Systems","Bleed air from the engines for air conditioning, pressurisation and anti-icing","Almost no bleed air; air conditioning, pressurisation and anti-icing are electric"]]},
{t:"point",x:"Even among airliners, different uses and designs shift the focus of maintenance. With many take-offs and landings, the B737’s checks are tied closely to cycles; with long flights, the B787’s are tied to flight hours, and electrical and software management matter more (Part 2)."}]},
{h:"What non-engineers should know",blocks:[{t:"check",items:[
{name:"Maintenance decides",x:"Whether an aircraft with a defect may depart is decided by maintenance (and the captain). Stations and passenger services should not rush that decision"},
{name:"Documents must be on board",x:"The certificate of airworthiness, registration certificate, radio licence and others are carried on board; without them the aircraft cannot depart"},
{name:"Ask early how long it will take",x:"Knowing early how long maintenance will take lets you decide sooner on boarding, connections and aircraft changes"},
{name:"Use the same words",x:"Stations should use maintenance terms correctly, such as INOP (inoperative), MEL and AOG (aircraft on ground)"}]}]}],
voice:"Maintenance decisions come before departure times. What the station can do is not hurry the decision, but be ready to act the moment it is made.",
terms:[["Airworthiness","耐空性","감항성"],["Type certificate","型式証明","형식증명"],["Certificate of airworthiness","耐空証明","감항증명"],["Airworthiness directive (AD)","耐空性改善通報","감항성개선지시"],["Maintenance control manual","整備規程","정비규정"],["Certifying engineer","確認整備士","확인정비사"]],
quiz:[{q:"What certifies that each individual aircraft is fit to fly?",opts:["Type certificate","Certificate of airworthiness","Maintenance control manual","Operations manual"],a:1,exp:"The type certificate covers the design of the type; the certificate of airworthiness covers each aircraft."},
{q:"Which describes the B787?",opts:["An all-aluminium fuselage","Bleed air for air conditioning","Extensive composites, with electric air conditioning and pressurisation","Four engines"],a:2,exp:"The B787 uses a lot of carbon-fibre composite and is a ‘more electric’ design that uses almost no bleed air."},
{q:"With a defect, who finally decides whether the aircraft may depart?",opts:["The station manager","Passenger services","Maintenance (and the captain)","Sales"],a:2,exp:"Airworthiness decisions belong to maintenance, and the captain finally accepts the aircraft. The station prepares rather than rushing them."}],
next:"0-2 The Maintenance Organisation"});
set("0-2",{title:"The Maintenance Organisation: Head Office, Line Maintenance and Contractors",hl:"Maintenance Organisation",subtitle:"Four roles (planning, quality, parts and control), the airline’s own line maintenance, resident engineers and contractors at overseas airports, and heavy maintenance",
lead:["Maintenance is not only the people who fix aircraft in the hangar. Daily operations also depend on those who plan when each aircraft is checked, those who watch quality, those who ship parts and those who take defect reports around the clock and decide what to do.","At overseas airports, maintenance is done by the airline’s own resident engineers, by a local maintenance company under contract, or by a mix of both. That front-line maintenance is what stations deal with every day."],
sections:[
{h:"Head office and the field",blocks:[{t:"fig",id:"mnt_org",cap:"Animated figure: the four roles in the head-office maintenance division and the three forms of field work (own line maintenance, overseas airports, heavy maintenance). Defect reports flow to maintenance control (MCC). Names differ by airline."},
{t:"table",cols:["Role","Main work"],rows:[
["Planning and engineering","Planning check timings, reviewing manufacturer service bulletins (SBs) and airworthiness directives (ADs) and planning their embodiment, reliability analysis"],
["Quality assurance","Internal audits, audits of contractors, checking training and qualifications, handling authority audits"],
["Parts and materials","Stock and positioning of parts, managing parts sent for repair, urgent supply when an aircraft is grounded (AOG)"],
["Maintenance control (MCC)","Receiving defects from every airport, deciding whether to apply the MEL, directing work and coordinating with dispatch"]]}]},
{h:"Three forms in the field",blocks:[{t:"rows",items:[
{name:"Line maintenance (own bases)",x:"The home airport: checks on arrival and departure, daily checks and minor repairs, with engineers, parts and tools on hand"},
{name:"Overseas airports",x:"Often a resident engineer signs the release and part of the work is contracted to a local company. At airports with few flights, everything may be contracted (the airline still checks the contractor’s approvals and training)"},
{name:"Travelling engineers",x:"An engineer may fly with the aircraft to an airport that has no engineer"},
{name:"Heavy maintenance",x:"Major checks every few years (such as C checks), in the airline’s own hangar or at a maintenance shop (MRO) at home or abroad"}]},
{t:"point",x:"Airlines flying the B737 often have large fleets and a wide network of line stations. Many B787 operators have smaller fleets, so at overseas airports a mix of contractors and manufacturer support is common."}]},
{h:"Where the station comes in",blocks:[{t:"check",items:[
{name:"Maintenance contracts",x:"Checking contracts and invoices with the local maintenance company (rates, vehicles, office space and so on)"},
{name:"Resident engineers",x:"Visas, housing, commuting and airport passes (see also the expatriate guide)"},
{name:"Notifications to the authority",x:"Foreign airlines tell the authority of each country they serve how maintenance is arranged (who maintains the aircraft where). In Japan, a maintenance arrangement list is submitted with the operating application ★"},
{name:"Audits",x:"Authority and head-office audits may look at the maintenance office, tools, parts storage and training records"}]}]}],
voice:"If everyone at the station knows where the maintenance office is and how to reach the engineers, you gain precious minutes on the morning a defect appears.",
terms:[["Maintenance division","整備部門","정비 부문"],["Maintenance control centre (MCC)","整備統制","정비 통제"],["Line maintenance","ライン整備","라인 정비"],["Heavy maintenance","重整備","중정비"],["Contracted maintenance","整備委託","정비 위탁"],["Resident engineer","駐在整備士","주재 정비사"]],
quiz:[{q:"Who takes defect reports from every airport around the clock and makes decisions?",opts:["Quality assurance","Maintenance control (MCC)","Parts and materials","Sales"],a:1,exp:"MCC receives defects, decides whether to apply the MEL and directs the work."},
{q:"Major checks every few years in a hangar or shop are called…",opts:["Line maintenance","Heavy maintenance","A walkaround","Travelling engineer work"],a:1,exp:"Heavy maintenance such as C checks takes place in the airline’s hangar or at an MRO."},
{q:"What is common at overseas airports?",opts:["Only the airline’s own engineers","A mix of resident engineers and local contractors","No maintenance at all","The captain does everything"],a:1,exp:"Often a resident engineer signs the release and part of the work is contracted; at airports with few flights everything may be contracted."}],
next:"0-3 Where the Station Meets Maintenance"});
set("0-3",{title:"Where the Station Meets Maintenance: The 60-Minute Turnaround and the Morning of a Defect",hl:"Station Meets Maintenance",subtitle:"Maintenance tasks between arrival and departure, the technical log, and the order in which the station acts when a defect is reported",
lead:["Between arrival and the next departure, engineers walk around the aircraft, check the records and, if there is a defect, either fix it or decide whether it can depart under the MEL. That decision drives the start of boarding and the departure time.","The station does not just wait for the decision. It prepares connections, aircraft options and passenger information in parallel so it can act the moment the decision is made."],
sections:[
{h:"The 60-minute turnaround",blocks:[{t:"fig",id:"mnt_turn",cap:"Animated figure: from arrival to departure, deplaning, the walkaround, refuelling, technical log review, the defect decision, the release and signature, and boarding overlap. A time line moves to the right."},
{t:"table",cols:["Maintenance task","What it involves"],rows:[
["Walkaround","Tyres, brakes, leaks, dents, bird strike marks, doors and panels closed"],
["Technical log","Defects written up by the crew on the previous flight (pilot reports) and the action maintenance took"],
["Defect decision","Fix it now, defer it under the MEL to the next base, or stop the departure"],
["Release and signature","The certifying engineer signs that the aircraft may depart (CRS)"]]}]},
{h:"When a defect is reported",blocks:[{t:"rows",items:[
{name:"1 Ask for the outlook",x:"Ask maintenance what happened, whether it will be fixed or deferred under the MEL, and how long it will take (agree a time to check back rather than chasing)"},
{name:"2 Share with dispatch",x:"Check with dispatch whether MEL restrictions (altitude, route, fuel) affect the departure"},
{name:"3 Passengers and connections",x:"Announce the expected delay and look first at passengers with connections. Check the meal and hotel rules"},
{name:"4 Aircraft change",x:"Prepare for head office the information needed for a replacement aircraft or a cancellation if it cannot be fixed"},
{name:"5 Record",x:"Record the delay under a technical delay code and keep a timeline"}]},
{t:"point",warn:true,x:"Asking an engineer only “What time can we go?” gets in the way of the decision. Asking “When would be a good time to check back with you?” lets maintenance focus and lets the station plan."}]},
{h:"What the station should have ready",blocks:[{t:"check",items:[
{name:"Contacts",x:"Phone numbers and radio channels for the maintenance office, resident engineers, contractors and MCC"},
{name:"Receiving parts",x:"How urgent parts are cleared through customs and collected (Part 5)"},
{name:"Costs",x:"Meal, hotel and transport rules for technical delays, and how they are invoiced"},
{name:"Training",x:"Make sure counter and gate staff understand MEL and INOP and can explain them correctly to passengers"}]}]}],
voice:"On the morning of a defect everyone tends to wait for maintenance. If you build the connection list and the alternatives while you wait, you can move the moment the decision comes.",
terms:[["Walkaround check","外部点検","외부 점검"],["Technical log","テクニカルログ","테크니컬 로그"],["Pilot report (PIREP)","パイロット・レポート","조종사 보고"],["Certificate of release to service (CRS)","整備の確認","정비 확인"],["Deferral","持ち越し","이월"],["Delay code (technical)","遅延コード（整備）","지연 코드(정비)"]],
quiz:[{q:"Which record holds the crew’s defect reports from the previous flight and the action taken?",opts:["Load sheet","Technical log","Passenger manifest","NOTAM"],a:1,exp:"The technical log records crew reports and maintenance action."},
{q:"What is a good response when the station hears of a defect?",opts:["Ask the engineer for a time every five minutes","Agree when to check back and prepare connections and alternatives in parallel","Do nothing and wait","Guess the cause and tell passengers"],a:1,exp:"Don’t rush the decision; agree when to check back and prepare connections, aircraft options and announcements in parallel."},
{q:"Which signature shows the aircraft may depart?",opts:["The captain’s alone","The certifying engineer’s release to service (CRS)","The station manager’s","The dispatcher’s"],a:1,exp:"The certifying engineer signs the CRS and the captain accepts it."}],
next:"Part 1 Airframe and Systems: 1-1 Airframe Structure and Materials"});
})(window.ARTS);
