/* 地上職・旅客運送 入門 — English version (Part 3: シップサイド・ランプ) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("3-1",{title:"Aircraft Doors: The Basics",hl:"aircraft doors",subtitle:"Never open without the signal. An inadvertent slide deployment means damage and delay",
lead:["Passenger aircraft doors carry an escape slide that inflates automatically when the door is opened, so that people can evacuate quickly. In flight and while taxiing the slide is armed, and opening the door from outside in that state sends the slide out with great force.",
"This article covers the types and numbering of doors, who opens and closes them, the procedure for opening and closing, and how to keep a slide from deploying by mistake."],
sections:[
{h:"Types of door and how they are numbered",blocks:[{t:"rows",items:[
{name:"Cabin doors",x:"Numbered from the front: 1L and 1R, 2L and 2R and so on. The L (left) side is normally used for passengers."},
{name:"Cargo doors",x:"One for each hold: forward, aft and bulk. The number and position differ by aircraft type."},
{name:"Service doors",x:"Catering and cleaning mainly use the doors on the right (R) side."}]},
{t:"point",x:"Change the aircraft and the doors move. Check for each type which door the boarding bridge or steps should serve (1-9)."}]},
{h:"Who operates the door (example; differs by airline and type)",blocks:[{t:"table",cols:["Situation","Who operates it"],rows:[
["Opening on arrival for disembarkation","Ground staff from outside, including handling company staff"],
["Opening from inside the cabin","Cabin crew or an engineer"],
["Airports where opening from outside is difficult","The senior cabin crew member"],
["Test or training flights","An engineer"],
["Early flights or after a long time parked","An engineer, before the crew arrives"],
["Closing before departure","Cabin crew, from inside"]]}]},
{h:"Opening the door, step by step",blocks:[{t:"ladder",rise:10,steps:[{name:"Check the equipment",sub:"Bridge or steps correctly in position"},{name:"Check around",sub:"Nothing obstructing the door"},{name:"The signal",sub:"Thumbs up through the window with the cabin crew"},{name:"Open",sub:"Using the external handle in the set direction"},{name:"Confirm it is locked open",sub:"Fully open and secured"}]},
{t:"point",warn:true,x:"The signal confirms that the slide has been disarmed. If there is no signal, or you cannot see the cabin crew through the window, never open the door."}]},
{h:"Closing the door",blocks:[{t:"check",items:[
{name:"Cabin crew close it",x:"They close it from inside and arm the slide."},
{name:"Ground staff check from outside",x:"Confirm visually that the door is fully closed. Do not knock or signal (follow your airline’s procedure)."},
{name:"If it must be opened again",x:"For a forgotten item or similar, open it following exactly the same procedure, including the signal."}]}]},
{h:"Preventing inadvertent deployment",blocks:[{t:"rows",items:[
{name:"Why it matters",x:"Replacing or repacking a slide takes time, delaying or cancelling the flight, and people nearby can be injured."},
{name:"Common causes",x:"Skipping the signal, assuming rather than checking when rushed, and not confirming the door mode."},
{name:"Habits that prevent it",x:"Make “no signal, no opening” a rule for everyone, and let new staff learn the procedure physically on a real aircraft in training."}]}]}],
voice:"[Interview to be added] What experienced staff always check before opening a door.",
terms:[["Escape Slide","脱出用スライド","탈출 슬라이드"],["Armed","作動状態","작동 상태"],["Disarmed","解除状態","해제 상태"],["Cabin Door","客室のドア","객실 도어"],["Cargo Door","貨物室のドア","화물칸 도어"],["Passenger Boarding Bridge (PBB)","搭乗橋","탑승교"]],
quiz:[{q:"What is needed before opening a door from outside?",opts:["A knock","The signal from the cabin crew","Only the captain’s permission","Nothing"],a:1,exp:"The signal confirms the slide has been disarmed."},
{q:"Who closes the door before departure in this example?",opts:["Ground staff","Cabin crew","A passenger","Only an engineer"],a:1,exp:"Cabin crew close it from inside; ground staff confirm from outside."},
{q:"What happens if a door is opened while the slide is armed?",opts:["Nothing","The slide deploys","The door will not move","Only an alarm sounds"],a:1,exp:"It leads to delays, cancellations and possible injury."}],
next:"3-2 Arrival and departure duties"});

set("3-2",{title:"Arrival and Departure Duties",hl:"arrival and departure",subtitle:"Arrival is preparing to receive; departure is confirming before you send them off. Both run on checklists",
lead:["The station manager is responsible for the whole of the daily departure operation up to pushback. Arrival and departure duties follow a set order by time, and the person in charge checks that each step has happened as it should.",
"This article covers preparing to receive an arrival (gate, baggage, operations), what to confirm on a departure (before boarding, during boarding, before pushback and after departure), ordering catering, and handling border documents and passenger information."],
sections:[
{h:"Preparing to receive an arrival",blocks:[{t:"table",cols:["Who","What they check"],rows:[
["Gate","Estimated arrival time, gate changes, arrival displays, VIPs, passengers needing assistance and unaccompanied minors, wheelchairs ready, buses if the aircraft parks on a remote stand"],
["Baggage","Baggage claim ready, any fault on the belt, how much baggage is loaded (from the CPM), requests to unload VIP bags first, passengers whose bags missed the connection, irregularity forms and rush tags ready"],
["Operations","Any defect on the inbound aircraft (APU failure, inflight entertainment and so on), special requests from passengers, connecting passengers"]]},
{t:"point",x:"If you identify passengers whose bags missed the connection before the flight lands, you can meet them and explain on arrival. That causes far less frustration than letting them wait at the belt first."}]},
{h:"What to confirm on a departure",blocks:[{t:"table",cols:["When","What to confirm"],rows:[
["Before boarding","Catering and cabin supplies loaded, cleaning finished, maintenance checks complete, cabin crew ready"],
["During boarding","That passengers, documents, baggage and cargo are correctly boarded and loaded; special loads (diplomatic mail, dangerous goods, valuables); fragile baggage; the manifest against the actual count"],
["Before pushback","Border documents on board, the exact boarded count, the door confirmed closed, ground equipment clear"],
["After departure","Operational messages sent, anything notable passed to the arrival and transit stations, care with confidential information in messages"]]}]},
{h:"Ordering catering (example)",blocks:[{t:"table",cols:["Stage","Timing","Content"],rows:[
["Advance order","24 hours before departure","Numbers by cabin, crew meals, special meals"],
["Final order","6 hours before departure","Adjusted for changes in bookings"],
["Additional order","1 hour before departure","Whatever is still needed before check-in closes"]]},
{t:"check",items:[
{name:"Check the loading",x:"How the loaders handle it, the quantity and where it is stowed, and the handover to the cabin crew."},
{name:"Report problems",x:"If catering looks like being late or short, report it to the responsible department at head office."}]}]},
{h:"Border documents and passenger information",blocks:[{t:"rows",items:[
{name:"General Declaration (GD)",x:"Aircraft operator, destination, flight number, crew list and so on. Used for the arrival and departure declaration."},
{name:"Passenger manifest (PM)",x:"The final list of passengers who boarded. Retained for a set period (for example, one year)."},
{name:"Cargo manifest",x:"The number and weight of cargo loaded. Needed for customs clearance."},
{name:"Electronic filing",x:"Many countries let you file arrival and departure reports to several agencies in a single electronic submission. In Japan this goes through NACCS to customs and others."}]},
{t:"point",warn:true,x:"As a rule, never tell a third party, family included, whether someone travelled. The exceptions are narrow: a formal request from law enforcement or a court, or a representative with the passenger’s written consent and identification."}]},
{h:"Watch it on video",blocks:[{t:"video",title:"Ground handling: pushback and marshalling",ch:"Channel being confirmed",url:"https://www.youtube.com/watch?v=iSszQPAdZPA"}]}],
voice:"[Interview to be added] What you always checked at the gate before an arrival.",
terms:[["Estimated Time of Arrival (ETA)","到着予定時刻","도착 예정 시각"],["Scheduled / Estimated Time of Departure","出発予定時刻","출발 예정 시각"],["Container / Pallet Message (CPM)","コンテナ・パレット電報","컨테이너·팔레트 전문"],["Passenger Manifest (PM)","乗客名簿","승객 명단"],["General Declaration (GD)","出入国の申告書","입출항 신고서"],["Final Meal Order","機内食の最終発注","기내식 최종 주문"]],
quiz:[{q:"Why identify passengers whose bags missed the connection in advance?",opts:["No particular reason","So you can meet them on arrival and explain first","To charge them","To dispose of the bags"],a:1,exp:"It saves them waiting at the belt before they learn anything."},
{q:"Which is NOT part of the checks before pushback?",opts:["Documents on board","The exact boarded count","Ground equipment clear","Ordering catering"],a:3,exp:"Catering is ordered in stages from the previous day."},
{q:"A passenger’s family asks whether they were on board. What do you do?",opts:["Tell them","As a rule, do not tell them","Show them the manifest","Read it out over the phone"],a:1,exp:"Family members are third parties too."}],
next:"3-3 Turnaround: what happens between arrival and departure"});

set("3-3",{title:"Turnaround: What Happens Between Arrival and Departure",hl:"turnaround",subtitle:"Some tasks run in parallel; others must follow each other. Delays come from the second kind",
lead:["The ground work between an aircraft arriving and leaving again as the next flight is called the turnaround. Disembarking, unloading and loading, fuelling, cleaning, catering, maintenance, boarding: much of it happens at the same time.",
"Airlines set a standard turnaround for each aircraft type and route. This article covers the whole picture, the critical path (the tasks whose delay goes straight into the departure time), how to read a turnaround chart, and how to keep delays from building."],
sections:[
{h:"The main tasks",blocks:[{t:"table",cols:["Task","What it involves"],rows:[
["Ramp in","Stopping, engines off, chocks in place, ground power or the APU started"],
["Disembarking","From the first passenger leaving the aircraft to the last"],
["Unloading and loading","From opening the cargo doors, through unloading and loading, to closing them again"],
["Fuelling","Starts right after disembarking and finishes before boarding (fuelling with passengers on board needs a special procedure)"],
["Cleaning","Starts right after disembarking and finishes before boarding"],
["Catering","Offloading and loading start right after disembarking and finish before boarding"],
["Maintenance","From arrival until just before departure"],
["Security check","Carried out once the crew are on board, finishing before boarding"],
["Boarding","From the first passenger passing the gate to everyone seated and the door closed"],
["Departure preparation","Ground equipment removed, chocks out, pushback"]]}]},
{h:"What the critical path means",blocks:[{t:"p",x:"Tasks that run in parallel, such as fuelling, cleaning and catering, take as long as the longest of them. A chain that has to run in order — disembarking, then the security check, then boarding — is different: if one link is late, the departure is late. That chain is the critical path."},
{t:"ladder",rise:10,steps:[{name:"Disembarking",sub:"Critical"},{name:"Cleaning, catering, fuelling",sub:"In parallel"},{name:"Security check",sub:"After the crew board"},{name:"Boarding",sub:"Critical"},{name:"Door close",sub:"About 5 minutes before departure (example)"}]}]},
{h:"Standard ground times (example, medium wide-body)",blocks:[{t:"table",cols:["Type of flight","Ground time (example)","Boarding call (example)"],rows:[
["Domestic","40–60 minutes","25–30 minutes before departure"],
["International, short haul","60–75 minutes","30–40 minutes before departure"],
["International, long haul","90–120 minutes","35–45 minutes before departure"],
["Routes needing extra security measures, etc.","120 minutes or more","40–50 minutes before departure"]]},
{t:"note",x:"* Guide figures drawn from several airlines; they vary with aircraft, airport and bridge or bus boarding. Ground time covers disembarking, ground work and boarding. Flights that change from domestic to international may use the international figure. ★"}]},
{h:"Reading the chart (70-minute international short haul)",blocks:[{t:"table",cols:["Time to departure","Main activity"],rows:[
["-70 to -68 min","Arrival, doors open, unloading starts"],
["-60 min","Disembarking complete; cleaning, catering and fuelling start"],
["Around -50 min","Crew board; check-in closes"],
["-36 min","Cleaning and catering complete"],
["-35 min","Boarding starts"],
["-15 to -10 min","Final boarding call; boarding closes"],
["-10 to -5 min","Head count reconciled; maintenance checks and documents complete; pushback ready"],
["About -5 min","Door closed"],
["0 min","Departure"]]}]},
{h:"Keeping delays from building",blocks:[{t:"check",items:[
{name:"Protect the critical path",x:"Hold the start times for disembarking and boarding above everything else."},
{name:"Share early",x:"The moment a task looks like running late, tell operations, the gate and the cabin."},
{name:"Remove waiting",x:"Position the cleaning team and the catering truck before the aircraft arrives so they are not waiting beside it."},
{name:"Record with delay codes",x:"Record the cause using the IATA delay codes so the same cause can be reduced next time."}]},
{t:"point",x:"On-time performance is the station’s report card. Record which task lost how many minutes and go through it at the monthly meeting with the handling company (6-2)."}]},
{h:"Watch it on video",blocks:[{t:"video",title:"A day of ground handling, filmed from the staff’s point of view",ch:"Channel being confirmed",url:"https://www.youtube.com/watch?v=EfLr1yPew1k"}]}],
voice:"[Interview to be added] What the team did to shorten the turnaround.",
terms:[["Turnaround","ターンアラウンド","턴어라운드"],["Ground Time","地上時間","지상 체류 시간"],["Critical Path","クリティカルパス","크리티컬 패스"],["Chocks","車輪止め","고임목"],["APU","補助動力装置","보조 동력 장치"],["IATA Delay Code","遅延コード","지연 코드"]],
quiz:[{q:"What is the critical path?",opts:["Tasks that run in parallel","The chain of tasks that must run in order, where a delay goes straight into the departure","The cheapest task","Maintenance only"],a:1,exp:"For example disembarking, the security check and boarding."},
{q:"How do you count the time for fuelling, cleaning and catering?",opts:["Add them up","Take the longest of them","Take the shortest","Do not count it"],a:1,exp:"They run in parallel."},
{q:"What is used to record the cause of a delay?",opts:["A weather chart","IATA delay codes","A seat map","A fare table"],a:1,exp:"They are used to analyse causes and prevent repeats."}],
next:"3-4 Load control: weight and balance"});

set("3-4",{title:"Load Control: Weight and Balance",hl:"load control",subtitle:"Not too heavy, not out of balance — protecting safety and fuel burn at the same time",
lead:["An aircraft cannot fly safely if it exceeds its weight limits or if its centre of gravity falls outside the permitted range. Load control is the work of calculating how much of the passengers, baggage, cargo and fuel goes where, and telling the captain.","A well-placed centre of gravity also saves fuel. This article covers the weight definitions and how they relate, how fuel is planned, standard passenger weights, the loading instruction and the loadsheet, last minute changes, and how a load controller’s day runs."],
sections:[
{h:"Two purposes",blocks:[{t:"cards",n:2,items:[
{ic:"🛡️",name:"Safe operation",x:"Weight: keep the aircraft from being overloaded. Balance: place passengers, baggage and cargo so the centre of gravity stays within limits."},
{ic:"⛽",name:"Economic operation",x:"A well-placed centre of gravity saves fuel, and thoughtful distribution uses the available space fully."}]}]},
{h:"The weights and how they relate",blocks:[{t:"ladder",rise:10,steps:[{name:"Empty weight",sub:"The aircraft itself (MEW / BEW)"},{name:"Dry operating weight (DOW)",sub:"Plus crew, catering and service items"},{name:"Zero fuel weight (ZFW)",sub:"Plus passengers, baggage and cargo"},{name:"Take-off weight (TOW)",sub:"Plus fuel at take-off"},{name:"Landing weight (LDW)",sub:"Minus the fuel burned in flight"}]},
{t:"table",cols:["Limit","What it means"],rows:[
["Maximum zero fuel weight (MZFW)","The limit excluding fuel, set by the loads on the wing root"],
["Maximum take-off weight (MTOW)","The limit at the start of the take-off roll"],
["Maximum landing weight (MLDW)","The limit the structure can absorb on landing"],
["Allowable take-off weight (AGTOW)","The lowest of the three limits above and the runway conditions, calculated for each flight"]]},
{t:"point",x:"The payload available for passengers, baggage and cargo is: allowable take-off weight minus dry operating weight minus take-off fuel."}]},
{h:"How fuel is planned",blocks:[{t:"table",cols:["Fuel","What it covers"],rows:[
["Trip fuel","Flying from the departure airport to the destination"],
["Contingency fuel","Delays and holding for weather (for example, 3% of the flight time)"],
["Alternate fuel","Flying on to the alternate airport"],
["Holding fuel","Holding over the alternate (for example, 30 minutes)"],
["Taxi fuel","From the stand to take-off"],
["Extra fuel","Added by company decision: price differences between stations, or a margin for late weight or a route change"]]}]},
{h:"Standard passenger weights (one regulator’s example)",blocks:[{t:"table",cols:["","Winter","Summer"],rows:[
["Adult","77 kg","75 kg"],
["Child","37 kg","36 kg"],
["Infant","Not counted","Not counted"]]},
{t:"note",x:"* These are the seasonal figures in Korea’s weight and balance standard. Elsewhere, airlines may use survey-based figures approved by their regulator, split adults by sex, or include hand baggage (some standards use figures in the 80s of kilograms per adult). Infants are usually not counted, and checked baggage uses actual weights. Crew also have standard weights including their baggage, set by each company. ★"}]},
{h:"The loading instruction and the loadsheet",blocks:[{t:"rows",items:[
{name:"Loading instruction report (LIR)",x:"The load controller’s instruction to the handling company’s load supervisor on what goes where. The supervisor signs it back once loading is done. Retention is set by company rules — typically a few months to about a year, longer where dangerous goods are involved. ★"},
{name:"Loading order",x:"Cargo, then mail, then baggage, so that baggage comes off first at the destination."},
{name:"Loadsheet",x:"The document bringing together the aircraft, fuel, cargo and baggage, passengers and crew weights and the centre of gravity. The captain checks and accepts it, sometimes electronically."},
{name:"Notification to captain (NOTOC)",x:"The document telling the captain that dangerous goods or other special loads are on board."}]}]},
{h:"Last minute changes (LMC)",blocks:[{t:"p",x:"Passenger numbers or the weight of baggage and cargo can change after the loadsheet has been handed over. Within set limits the change can be written on rather than the sheet redone (the limits on passengers, weight and centre-of-gravity movement are set by each company and aircraft type). Beyond that, a new loadsheet is produced. ★"},
{t:"point",warn:true,x:"When the loadsheet is handed over, always give the captain the actual boarded count. Reconciling the numbers at the gate (2-7) is what keeps load control accurate."}]},
{h:"How the load controller’s day runs (example)",blocks:[{t:"table",cols:["When","Task"],rows:[
["7 days before","Work out how many baggage containers are needed from the bookings"],
["3 hours 30 minutes before","Check the flight details, fuel, bookings, payload and a provisional centre of gravity"],
["70 minutes before","Cargo input closes"],
["60 minutes before","Check-in closes; enter the actual container numbers; send the loading instruction"],
["15 minutes before","Loading closes"],
["7 minutes before","Confirm last minute changes and send the loadsheet"],
["30 minutes after departure","Send the load messages (LDM, CPM and so on)"]]}]}],
voice:"[Interview to be added] The figure on a loadsheet that ground staff should look at first.",
terms:[["Weight & Balance / Load Control","重量・重心管理","중량·평형 관리"],["Dry Operating Weight (DOW)","運航重量","운항 중량"],["Zero Fuel Weight (ZFW)","無燃料重量","무연료 중량"],["Loading Instruction Report (LIR)","搭載指示書","탑재 지시서"],["Last Minute Change (LMC)","最後の変更","최종 변경"],["NOTOC","機長への危険物通知","기장 통보서"]],
quiz:[{q:"How is the available payload calculated?",opts:["Maximum take-off weight plus fuel","Allowable take-off weight minus dry operating weight minus take-off fuel","Passengers times 100","Fuel minus dry operating weight"],a:1,exp:"AGTOW minus DOW minus take-off fuel."},
{q:"Why is baggage loaded last?",opts:["It is light","So it comes off first at the destination","It is cheap","There is no rule"],a:1,exp:"It keeps passengers from waiting."},
{q:"What must always be given to the captain with the loadsheet?",opts:["The weather","The actual boarded count","The revenue","The seat colours"],a:1,exp:"An accurate count is the basis of the whole calculation."}],
next:"3-5 Ramp safety basics"});

set("3-5",{title:"Ramp Safety Basics",hl:"ramp safety",subtitle:"Engines, vehicles, noise, weather. The ramp is the most dangerous workplace at an airport",
lead:["On the ramp, people work beside moving aircraft, a stream of ground vehicles, and engines and propellers that are turning. Ground staff go out there too, to operate doors, meet arrivals or check baggage.","This article covers the main hazards, the rules everyone follows, the systems that keep safety in place (safety reporting, inspections and management of change), and how to oversee a handling company’s safety."],
sections:[
{h:"The main hazards",blocks:[{t:"table",cols:["Hazard","What it means"],rows:[
["Engine ingestion and blast","In front of a running engine you can be drawn in; behind it, blown away"],
["Vehicle contact","Tugs, belt loaders, buses, fuel trucks"],
["Contact with the aircraft","Ground equipment striking the aircraft can affect operations even when the damage is invisible"],
["Foreign object debris (FOD)","A bolt, a part or rubbish ingested by an engine causes serious damage"],
["Noise","Long exposure damages hearing"],
["Weather","Lightning, strong wind, ice, extreme heat"],
["Fuelling","Spills and ignition"]]}]},
{h:"Rules everyone follows",blocks:[{t:"check",items:[
{name:"Dress",x:"High-visibility vest, hearing protection, safety shoes. Airport ID pass visible."},
{name:"Where you may walk",x:"Use the marked walkways; never cut under an aircraft or between vehicles."},
{name:"Engines",x:"Stay away from an aircraft with its anti-collision beacon on: the engines are running or about to."},
{name:"Pick up debris",x:"Pick up anything lying on the ramp, and hold regular FOD walks with the whole team."},
{name:"Lightning",x:"Stop outdoor work to the agreed criteria when lightning approaches."},
{name:"Mobile phones",x:"Follow the rules for use on the ramp, especially near an aircraft being fuelled."}]}]},
{h:"The safety management system (SMS)",blocks:[{t:"p",x:"Airlines are required to run a safety management system: rather than reacting after an accident, it finds hazards, assesses them and reduces them."},
{t:"ladder",rise:10,steps:[{name:"Find the hazard",sub:"Reports, inspections, analysis"},{name:"Assess",sub:"Likelihood x severity"},{name:"Act",sub:"Procedures, equipment, training"},{name:"Monitor",sub:"Track the safety indicators"},{name:"Improve",sub:"On to the next measure"}]},
{t:"rows",items:[
{name:"Safety reports",x:"Report near misses and mistakes too. Not punishing the person who reports (except for deliberate acts or gross negligence) is what makes the information flow."},
{name:"Safety inspections",x:"Managers walk the ramp regularly to look for unsafe conditions."},
{name:"Management of change",x:"New equipment, a new airport, a new handling company: identify the hazards before the change, not after."},
{name:"Safety indicators",x:"Track ground damage to aircraft, baggage irregularity numbers and similar measures against targets."}]}]},
{h:"Overseeing the handling company’s safety",blocks:[{t:"check",items:[
{name:"Observe and assess",x:"Watch the work regularly and judge whether the procedures are being followed."},
{name:"Safety audits",x:"Audit at set intervals and ask for a corrective action plan for every finding."},
{name:"A safety owner on their side",x:"Ask the handling company to name someone responsible for safety."},
{name:"Reporting lines",x:"Make sure accidents and near misses at the handling company reach the airline too."},
{name:"Training",x:"Train the handling company’s staff in your airline’s procedures (6-2, 7-3)."}]},
{t:"point",warn:true,x:"“We were in a hurry” is the most common explanation after a ramp accident. On-time departure matters, but never more than safety."}]},
{h:"Watch it on video",blocks:[{t:"video",title:"Inside a national ground handling competition",ch:"Channel being confirmed",url:"https://www.youtube.com/watch?v=wm461oh5nCs"}]}],
voice:"[Interview to be added] A near miss on the ramp, and what changed afterwards.",
terms:[["Ramp / Apron","駐機場","주기장"],["Foreign Object Debris (FOD)","異物","이물질"],["Anti-collision Beacon","衝突防止灯","충돌 방지등"],["Safety Management System (SMS)","安全管理システム","안전관리시스템"],["Safety Report","安全報告","안전 보고"],["Near Miss","ヒヤリハット","아차 사고"]],
quiz:[{q:"What does an anti-collision beacon mean?",opts:["You may approach","The engines are running or about to start, so stay away","Maintenance in progress","Nothing in particular"],a:1,exp:"There is a risk of ingestion and jet blast."},
{q:"Why is the person who files a safety report not punished?",opts:["To be lenient","So information flows and hazards can be found","There is no rule","Punishment costs money"],a:1,exp:"A reporting culture is the foundation of safety, deliberate acts and gross negligence aside."},
{q:"What do you do with debris on the ramp?",opts:["Ignore it","Pick it up","Just photograph it","Report it tomorrow"],a:1,exp:"Debris causes serious engine damage."}],
next:"3-6 Ramp vehicles and equipment (GSE): what, where and why"});
})(window.ARTS);
