/* 航空機と整備 Part 4 — English version (4-1〜4-3) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("4-1",{title:"Outsourcing Line Maintenance: Entrusting the Maintenance You Do Not Staff Yourself",hl:"Outsourced Line Maintenance",subtitle:"Four ways to cover maintenance at overseas airports, what to require of contractors, what the contract covers, and the responsibility that stays with the airline",
lead:["At overseas airports, airlines often have no engineers of their own and entrust line maintenance (pre-departure checks and defect rectification) to a local maintenance company or another airline. Keeping engineers permanently at an airport with a few flights a day is hard to justify on cost.","Even so, responsibility for keeping the aircraft airworthy stays with the airline. Choosing, training and checking contractors is important work for the quality department and the station."],
sections:[
{h:"Setting up a contract",blocks:[{t:"fig",id:"mnt_outsrc",cap:"Animated figure: surveying candidates, quality audit, contract, training and authorisation, then operations and regular audits, highlighted in turn. The colours on the right show the main department responsible."}]},
{h:"Four ways to cover maintenance",blocks:[{t:"table",cols:["Approach","Advantages","Watch out for"],rows:[
["Own engineers based on site","Familiar with company procedures; quick decisions","Costly with few flights; cover for leave and sickness"],
["Local maintenance company","Cost scales with the number of flights","They serve several airlines and may be short-staffed at peak times"],
["Another airline","Experience and parts if they fly the same type","Their own flights may come first"],
["Engineers flown in when needed","Suits rare tasks","Arrival takes time, so AOGs last longer"]]}]},
{h:"What to require of contractors",blocks:[{t:"rows",items:[
{name:"Authority approval",x:"An approved maintenance organisation in that country; the state of registry may also require its own approval ★"},
{name:"Type experience",x:"Enough engineers trained on the type (737, 787 and so on)"},
{name:"Tools and ground equipment",x:"Type-specific tow bars, jacks, nitrogen, oil and so on, with calibration records"},
{name:"Parts storage",x:"Consignment stock stored within temperature, humidity and shelf-life limits"},
{name:"Records",x:"Work recorded on company forms and sent promptly to head office"}]},
{t:"point",warn:true,x:"Outsourcing does not move airworthiness responsibility: it stays with the airline. When a contract engineer certifies the aircraft, they sign as a person authorised by the airline."}]},
{h:"Station checks",blocks:[{t:"check",items:[
{name:"Know the scope",x:"Pre-departure checks only, or defect rectification too? Work outside the scope costs extra time and money"},
{name:"Order of contacts",x:"Put the contractor duty line, head-office MCC and station duty officer on one sheet"},
{name:"Authorised staff",x:"Keep the contractor’s list of staff authorised to certify, and update it when people change"}]}]}],
voice:"Contract engineers are colleagues keeping your flights safe too. Dropping into their office once a season makes those midnight phone calls far smoother.",
terms:[["Line maintenance","ライン整備","라인 정비"],["Maintenance contracting","整備の委託","정비 위탁"],["Approved maintenance organisation","整備の事業場の認定","정비조직 인증"],["Consignment stock","委託在庫","위탁 재고"],["Certification authorisation","確認の署名の認可","확인 서명 인가"],["Tow bar","けん引棒","견인봉"]],
quiz:[{q:"When line maintenance is outsourced, who holds airworthiness responsibility?",opts:["The contractor","The airline","The airport company","The authority"],a:1,exp:"Responsibility for keeping the aircraft airworthy stays with the airline."},
{q:"What should you watch for when another airline does your maintenance?",opts:["It always costs more","Their flights may come first","Parts cannot be used","No training is needed"],a:1,exp:"They may have type experience and parts, but their own flights can take priority."},
{q:"What should the station keep from the contractor?",opts:["The list of staff authorised to certify","Passenger lists","Fare tables","In-flight menus"],a:0,exp:"Keep the list of authorised staff and update it when it changes."}],
next:"4-2 Daily Work Between the Station and the Contractor"});
set("4-2",{title:"Daily Work Between the Station and the Contractor: Building the Maintenance Arrangement List",hl:"Maintenance Arrangements",subtitle:"Who does what, the maintenance arrangement list, customs clearance and airside delivery of parts, night work areas, and checking invoices",
lead:["Whether outsourced maintenance runs smoothly depends not only on the engineers’ skill but also on the station’s preparation. A part stuck in customs, no power at the night work stand, an out-of-date phone number: any of these delays a departure.","This lesson sets out how work is shared between station, contractor and head office, and what goes into the station’s maintenance arrangement list."],
sections:[
{h:"Who does what",blocks:[{t:"fig",id:"mnt_roles",cap:"Animated figure: a dot marks whether head-office maintenance (MCC), contract engineers or the station mainly handles each task; rows light up in turn. The split shown is an example."}]},
{h:"The maintenance arrangement list",blocks:[{t:"table",cols:["Item","What to record"],rows:[
["Contractor","Company name, duty phone, hours of cover"],
["People","Engineers authorised to certify and their type qualifications"],
["Tools and equipment","Tow bars, jacks, nitrogen, oil, ground power and air: where they are and who issues them"],
["Parts","Location and contents of consignment stock, bonded warehouse, how urgent parts are received"],
["Order of contacts","When a defect is found: contractor → MCC → station duty officer → dispatch"],
["AOG","Parts ordering contact, customs broker, who decides on hotels and replacement flights (Part 5)"]]},
{t:"point",x:"Review the list at each change of season and whenever contractor staff change. An old phone number can cause a delay in the middle of the night."}]},
{h:"Customs clearance and delivering parts",blocks:[{t:"rows",items:[
{name:"Urgent parts",x:"AOG parts arrive on freighters or in passenger aircraft holds; warn the customs broker so they can be released on arrival"},
{name:"Duties",x:"Many countries exempt aircraft parts from duty or reduce it; agree with the broker how to complete the paperwork ★"},
{name:"Airside delivery",x:"Arrange permits and vehicles to take cleared parts to the aircraft inside the restricted area"},
{name:"Returning removed parts",x:"Failed parts go back for repair with their release documents (2-3)"}]}]},
{h:"Night work and fees",blocks:[{t:"check",items:[
{name:"Work area",x:"Check with the airport that the night-stop stand has lighting, ground power and access for work vehicles"},
{name:"Invoices",x:"Check the base fee per flight, extra labour hours and night surcharges against the work records"},
{name:"Consumables",x:"Oil, nitrogen, cleaning fluids: who supplies and who pays, as the contract says"}]}]}],
voice:"Simply telling the customs broker and the contractor the part’s arrival time at the same moment noticeably shortens an AOG. Pulling the three parties’ communication into one thread is the station’s skill.",
terms:[["Maintenance arrangement list","整備の体制の一覧表","정비 체제 일람표"],["Bonded warehouse","保税の倉庫","보세 창고"],["Customs broker","通関業者","통관업자"],["Night stop","夜間駐機","야간 주기"],["Surcharge","割増し","할증"]],
quiz:[{q:"What does the station mainly handle?",opts:["Certifying the pre-departure check","Deciding whether to use the MEL","Customs clearance and airside delivery of parts","Engine changes"],a:2,exp:"Engineers and MCC make maintenance decisions and certify; the station arranges parts, space and communication."},
{q:"When should the maintenance arrangement list be reviewed?",opts:["Never","At each change of season and when contractor staff change","Once every ten years","Only after an accident"],a:1,exp:"Changed contacts or people can delay communication at night."},
{q:"What should contractor invoices be checked against?",opts:["Work records","Fare tables","Crew rosters","Weather charts"],a:0,exp:"Extra labour hours and night surcharges are checked against the work records."}],
next:"4-3 Contractor Audits and Authority Inspections"});
set("4-3",{title:"Contractor Audits and Authority Inspections: Checking After You Entrust",hl:"Audits and Inspections",subtitle:"Types and steps of audits, findings and corrective action, authority spot checks of aircraft and documents (ramp inspections), and station preparation",
lead:["Choosing a contractor and signing a contract is not the end. The quality department audits contractors at set intervals and keeps checking that work and records meet the standard.","At foreign airports the local authority may also make unannounced checks of the aircraft and its documents. In both cases, a station that has arranged people and places in advance keeps them short."],
sections:[
{h:"How an audit runs",blocks:[{t:"fig",id:"mnt_audit",cap:"Animated figure: plan, on-site check, findings, corrective action, then verification and closure, highlighted in turn. The colours on the right show who mainly handles each step."},
{t:"table",cols:["Type of audit","When"],rows:[
["Initial audit","Before contracting, to decide whether to approve the contractor"],
["Routine audit","At set intervals, for example yearly ★"],
["Special audit","After a serious error, repeat defects or a jump in delays"],
["Desk review","Records and training lists requested and checked remotely"]]}]},
{h:"Authority inspections (ramp inspections)",blocks:[{t:"rows",items:[
{name:"What happens",x:"Before or after a flight, inspectors check the exterior, cabin, flight deck, documents on board and crew licences"},
{name:"Where",x:"Japan, Korea and many others, including European states, inspect foreign airlines ★"},
{name:"Findings",x:"Graded by severity; serious ones must be fixed before departure, and results may be shared with the home authority"},
{name:"Link to operating permits",x:"When a foreign airline applies to fly into a country, it shows its maintenance arrangements (contractor, approvals, contacts) in writing ★"}]},
{t:"point",warn:true,x:"Inspections can start just before departure. A designated person at the station escorts the inspectors, informs the captain and engineers, and gives an outlook for the departure time."}]},
{h:"Station preparation",blocks:[{t:"check",items:[
{name:"Decide who escorts",x:"Decide in advance who meets inspectors and takes them to the aircraft"},
{name:"Documents ready to hand",x:"The maintenance arrangement list, a copy of the maintenance contract and the list of authorised staff"},
{name:"Records",x:"Keep the station’s own record of audit and inspection dates, findings and corrective actions"}]}]}],
voice:"Audit findings are not about blaming the contractor; they are for the safety of the next flight. Thanking the contractor once corrective action is complete makes the next audit go positively too.",
terms:[["Audit","監査","감사"],["Finding","指摘","지적"],["Corrective action","是正の処置","시정 조치"],["Ramp inspection","ランプ・インスペクション","램프 점검"],["Inspector","検査官","검사관"]],
quiz:[{q:"What triggers a special audit?",opts:["New uniforms","A serious error or a jump in delays","A fare change","Seasonal holidays"],a:1,exp:"Special audits follow serious errors, repeat defects or a jump in delays."},
{q:"What does a ramp inspection not check?",opts:["The aircraft exterior","Documents on board","Crew licences","Fare revenue"],a:3,exp:"Inspectors check the aircraft, cabin, documents and crew licences, not revenue."},
{q:"After a finding, what does the contractor provide?",opts:["Causes and corrective actions","New fares","Passenger lists","Weather forecasts"],a:0,exp:"The contractor gives causes and fixes and completes them by the deadline."}],
next:"Part 5 AOG and Disruptions: 5-1 When an AOG Happens"});
})(window.ARTS);
