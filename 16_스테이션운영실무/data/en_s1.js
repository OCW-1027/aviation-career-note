/* 優れたステーションのつくり方 — English version (Part 1) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("1-1",{title:"What a Station Is Measured On",hl:"measured on",subtitle:"Punctuality, safety, baggage and customers. Head office sees your station through numbers",
lead:["Getting every flight away safely each day does not, on its own, make a good station. Airline head offices compare their stations on punctuality, safety, baggage, customer feedback and more, and review them monthly or once a year.","If you want to become a duty manager, start by knowing what your station is measured on. The evaluation items tell you what the company expects from the front line. Many companies score stations on two axes: results (performance) and the way the work is done (capability)."],
sections:[
{h:"Typical station performance measures (example)",blocks:[{t:"table",cols:["Area","Typical measures","Who produces the number"],rows:[
["Punctuality","On-time departure rate (D0, D15), number of ground-caused delays","Everyone at the counter, gate, ramp and load control"],
["Safety","Ground incidents and aircraft damage, number of safety reports, self-audit results","The ramp and the ground handler"],
["Baggage","Mishandled baggage rate (per 1,000 passengers): delayed, damaged, lost","Check-in, the ramp and transfers"],
["Customers","Complaints and compliments, service check results","The counter and the gate"],
["Security and compliance","Security breaches, audit findings and corrections, dangerous goods","Everyone"],
["Training","Course completion, tracking of licence and certificate expiry","The duty manager and the handler"],
["Cost","Handling charges, disruption costs (hotels, compensation)","The station"]]},
{t:"note",x:"* Items, definitions and weightings differ from airline to airline. Always check your own company’s scorecard. ★"}]},
{h:"Two axes: performance and capability (example)",blocks:[{t:"table",cols:["Axis","Item","What it covers"],rows:[
["Performance (results)","Punctuality","Delays caused by passenger services or handling, or the on-time rate"],
["Performance (results)","Automation","Use of online check-in and kiosks (1-6)"],
["Performance (results)","Ancillary revenue","Revenue per flight from upgrades, excess baggage, paid seats and so on (1-6)"],
["Capability (process)","Cooperation and compliance","Breaches of official rules, failing to follow manuals or head office instructions, attendance, customer-handling problems, missed training (points deducted per case; compliments add points)"],
["Capability (process)","Quality management","Holding the monthly handler meeting and quality audits, repeated identical corrective actions, load control errors, undeclared or misdeclared dangerous goods (1-5)"],
["Capability (process)","Baggage management","Mishandled baggage rate (MBR) and its change from the previous period (1-4)"]]},
{t:"note",x:"* A general example drawn from the way several airlines evaluate their stations. ★"}]},
{h:"How the scoring works (example)",blocks:[{t:"rows",items:[
{name:"Target = B",x:"Each item’s target sits at grade B; exceeding it earns A or S, falling short C or D."},
{name:"Weighted by priority",x:"For example, punctuality carries the most weight (40–50% of the total) and the rest is split among the other items. Capability items are ranked the same way."},
{name:"The evaluator’s overall judgment",x:"The score is the basis, but the evaluator may move the grade up or down by one."},
{name:"Reviewed every year",x:"Targets are reset for each station from the previous period, and priorities shift with the business plan."},
{name:"Recognition and improvement",x:"The top station is recognised; low or sharply declining stations may face a special quality audit."}]}]},
{h:"How companies differ (examples)",blocks:[{t:"table",cols:["","Form of evaluation","Cycle"],rows:[
["Company A","Two axes, performance and capability; five grades S–D with the target at B","Every six months"],
["Company B","A 100-point scorecard adding up punctuality, baggage, complaints and safety, with stations ranked","Collected monthly, ranked quarterly"],
["Company C","Built around head office quality audit results, with key indicators added","Once a year"]]},
{t:"note",x:"* Illustrative examples to show the thinking, not the system of any real company."}]},
{h:"How to read the numbers",blocks:[{t:"check",items:[
{name:"Look at trends",x:"Do not react to a single month. Compare with the same month last year and a three-month average."},
{name:"Break them down",x:"Not “punctuality fell”, but which flight, which process and which cause."},
{name:"Share the numbers with your handler",x:"If only the station holds the figures, nothing changes on the ground. Look at the same table in the monthly meeting."},
{name:"Look behind good numbers",x:"Are safety steps being skipped to stay on time? The better the numbers, the more closely you check the front line."}]},
{t:"point",x:"A scorecard is a statement of what the company values. Learn its items and use them as the yardstick for your decisions every day."}]}],
voice:"[Interview to be added] What had changed on the ground when the station reached the top of the rankings.",
terms:[["On-Time Performance (OTP)","定時性","정시성"],["Station Performance Review","支店評価","지점 평가"],["Mishandled Baggage Rate","手荷物事故率","수하물 사고율"],["Station Self-Audit","自己安全評価","자체 안전평가"]],
quiz:[{q:"Which is the right way to read station performance figures?",opts:["Look at trends and break them down by cause","Judge from one month alone","Keep the figures within the station","Stop checking when numbers are good"],a:0,exp:"Compare with last year and averages, and break down by flight, process and cause."},
{q:"Who produces the punctuality number?",opts:["Everyone at the counter, gate, ramp and load control","Only the ramp","Only head office","Only the airport company"],a:0,exp:"A flight leaves on time only when every process comes together."},
{q:"What should you watch most when the numbers look good?",opts:["Whether safety steps are being skipped","Nothing","Throw away the scorecard","Cut training"],a:0,exp:"Check on the ground that nobody is cutting corners to stay on time."}],
next:"1-2 Reading on-time performance: D0, D15 and delay codes"});

set("1-2",{title:"Reading On-Time Performance: D0, D15 and Delay Codes",hl:"on-time performance",subtitle:"Why a flight was late matters more than how late. Delay codes are a map for improvement",
lead:["Punctuality is the face of a station’s performance. But the same “on-time rate” can differ widely depending on how many minutes count as on time and which moment counts as departure.","This article covers how punctuality is defined and calculated, and how to read the delay codes used to classify causes."],
sections:[
{h:"Definitions",blocks:[{t:"table",cols:["Term","Meaning"],rows:[
["When departure is measured","Usually the moment the aircraft starts to move off its stand (off-block)"],
["D0","Share of flights leaving at or before the scheduled time of departure (STD). Often used as an internal target"],
["D15","Share of flights leaving within 15 minutes of STD. The on-time departure rate published by Japan’s transport ministry follows the same idea ★"],
["Example","51 of 60 flights in a month leave within 15 minutes → D15 of 85%"]]}]},
{h:"Delay codes (IATA standard two-digit codes)",blocks:[{t:"table",cols:["Codes","Group","Examples close to the station"],rows:[
["11–19","Passenger and baggage","Late acceptance after deadline, check-in error, boarding (searching for missing passengers, offloading their bags), baggage processing"],
["21–29","Cargo and mail","Late documents or build-up"],
["31–39","Aircraft and ramp handling","Late loadsheet, loading and unloading, equipment shortage, cleaning, fuelling, catering"],
["41–49","Technical","Maintenance and spares"],
["61–69","Flight operations and crew","Late crew, flight planning"],
["71–79","Weather","Weather at origin or destination, snow removal and de-icing"],
["81–89","Air traffic, airport and authorities","ATC restrictions, airport facilities, CIQ"],
["91–96","Reactionary","Late inbound aircraft (rotation), waiting for crew or connecting passengers"]]},
{t:"note",x:"* Check detailed definitions and in-house practice against your company’s rules and the latest IATA material. ★"}]},
{h:"Using delay codes",blocks:[{t:"check",items:[
{name:"Delays the station can control",x:"Many codes in the 10s and 30s come from ground processes. They feed straight into your score, and they can be fixed."},
{name:"Code honestly",x:"Choosing a convenient code hides the cause and misleads head office’s analysis."},
{name:"One primary cause",x:"If there are several causes, make the one that lost the most time primary and record the rest."},
{name:"Which delays count against you",x:"Many companies count only delays caused by passenger services or handling that exceed a set time (for example three or five minutes, depending on the company). Airport facilities or handler staff shortages may be only partly counted after review. Some companies use their own letter codes alongside IATA’s numeric ones. ★"},
{name:"Chase reactionary delays",x:"If 90s codes are frequent, trace the cause at the previous station, usually the other end of the route, and share it."}]},
{t:"point",x:"Delay codes are not about whose fault it was. They are a map of what to fix."}]}],
voice:"[Interview to be added] A debate with head office over how a delay should be coded.",
terms:[["On-Time Departure Rate","定時出発率","정시 출발률"],["Off-Block Time","オフブロック","오프블록"],["Delay Code","遅延コード","지연 코드"],["Reactionary Delay","玉突き遅延","연결 지연"]],
quiz:[{q:"What is D15?",opts:["Share of flights leaving within 15 minutes of STD","Delays per 15 flights","Flights leaving 15 minutes early","Arrival delay"],a:0,exp:"Japan’s published on-time departure rate uses the same 15-minute idea. ★"},
{q:"Which delay codes can a station mostly control?",opts:["The 10s and 30s","The 70s (weather)","The 80s (ATC)","The 40s (technical)"],a:0,exp:"Passenger, baggage and ramp handling are ground processes."},
{q:"What is the rule when assigning a delay code?",opts:["Code it honestly, to the facts","Pick one that protects the score","Leave it blank","Always blame the weather"],a:0,exp:"If the cause is hidden, it cannot be fixed."}],
next:"1-3 Cutting ground-caused delays"});

set("1-3",{title:"Cutting Ground-Caused Delays",hl:"ground-caused delays",subtitle:"Delays are minutes that add up. Protect the critical path and bring work forward",
lead:["Most big delays are really a string of small ones. Boarding starts three minutes late, five minutes go on searching for the last passenger, four more on finalising the loadsheet. None is large on its own; together they cost you the on-time departure.","This article covers the critical path to departure, the common ground-caused delays and how to prevent them, and what to do once a delay has happened."],
sections:[
{h:"The critical path to departure (example)",blocks:[{t:"ladder",rise:10,steps:[{name:"Arrival and block-in",sub:"The inbound time sets the clock"},{name:"Disembarking and unloading",sub:"Passengers and bags"},{name:"Cleaning, catering, fuel",sub:"Run in parallel"},{name:"Loading and loadsheet",sub:"Final figures deadline"},{name:"Boarding and door close",sub:"Headcount reconciled"},{name:"Pushback",sub:"Off-block"}]},
{t:"note",x:"* The order and timing of each process are set by the aircraft type, the airport and your company’s standard turnaround. ★"}]},
{h:"Common ground-caused delays and how to prevent them",blocks:[{t:"table",cols:["Cause","Prevention"],rows:[
["Passengers who do not come to the gate","Enforce the boarding cut-off, page early, and agree in advance when to offload their bags"],
["Late loadsheet","Make sure everyone involved knows the deadline for final passenger, baggage and cargo figures"],
["Slow loading or unloading","Position staff and equipment in advance, prepare ULDs and bulk, check the load message before arrival"],
["Passengers needing wheelchairs or other help","Arrange it beforehand and fix a pre-boarding time"],
["Seat and booking problems","Check bookings and seats the day before and prepare for oversales"],
["Gate changes","Allow for walking time and bring announcements forward"]]}]},
{h:"After a delay",blocks:[{t:"check",items:[
{name:"Record the facts in times",x:"Log the start and end of each process so it is clear where the minutes were lost."},
{name:"Code and cause",x:"Separate the primary delay code, the direct cause and the underlying cause (ask why, and why again)."},
{name:"Prevent a repeat",x:"Who changes what, by when — agreed with the handler too."},
{name:"Deadline",x:"Report to head office the same day or the next, as your company requires."}]},
{t:"point",x:"Aim for D0 and D15 will follow. Protecting the first flight of the morning and the short turnarounds protects the whole day."}]}],
voice:"[Interview to be added] What was fixed in place every morning to get the first flight out on time.",
terms:[["Critical Path","クリティカルパス","크리티컬 패스"],["Block-In","ブロックイン","블록인"],["Load Message (LDM)","ロードメッセージ","탑재 메시지"],["Standard Turnaround Schedule","標準作業工程","표준 작업 공정"]],
quiz:[{q:"What are most big delays made of?",opts:["Small delays of a few minutes adding up","Only weather","Only maintenance","Chance"],a:0,exp:"Small losses in each process combine to cost the on-time departure."},
{q:"How do you prevent a late loadsheet?",opts:["Share the deadline for final figures with everyone","Postpone the calculation","Leave it to the captain","Do nothing"],a:0,exp:"Set and share the cut-off for passenger, baggage and cargo figures."},
{q:"Which flights matter most for the day’s punctuality?",opts:["The first flight of the morning and short turnarounds","Only the last flight","Only freighters","All the same"],a:0,exp:"It stops the first delay spreading down the line."}],
next:"1-4 Baggage, customer and safety measures"});

set("1-4",{title:"Baggage, Customer and Safety Measures",hl:"baggage, customer and safety",subtitle:"Punctuality alone does not make a good station. Three numbers that are easy to overlook",
lead:["A station with a high on-time rate still scores badly if bags are left behind, complaints pile up or there are incidents on the ramp. In fact, rushing to stay on time can be what drives these numbers down.","This article covers how to read the baggage, customer and safety measures, and how to go about improving them."],
sections:[
{h:"Reading the three measures",blocks:[{t:"table",cols:["Measure","What it covers","Common causes"],rows:[
["Mishandled baggage","Delayed (left behind), damaged and lost bags, often compared per 1,000 passengers","Bags checked in near the deadline, short transfer connections, wrong tags"],
["Customer feedback","Number and type of complaints, compliments, days taken to reply","Waiting times, poor information, how rules are explained"],
["Safety","Ground incidents and aircraft damage, safety reports, self-audit and audit results","Skipped steps, poor equipment checks, time pressure"]]}]},
{h:"Cautions when reading the numbers",blocks:[{t:"check",items:[
{name:"Fewer safety reports is not better",x:"Many small reports are the sign of a healthy operation. An atmosphere where people hesitate to report is the real danger."},
{name:"Trace baggage to the process",x:"Separate check-in, sorting, loading and transfers."},
{name:"Count compliments too",x:"Finding and sharing good service raises the standard on the floor."},
{name:"How MBR is counted",x:"Mishandled bags per 1,000 passengers. Targets vary widely with the company, the route and how many passengers connect. Companies also set their own rules on what counts — for instance whether cases that became complaints through poor follow-up are added. ★"},
{name:"Station self-audit",x:"At set intervals — often once a year — check the operation against a checklist, including the handler’s work. ★"}]}]},
{h:"How to improve",blocks:[{t:"ladder",rise:10,steps:[{name:"Break down the numbers",sub:"Flight, process, cause"},{name:"Go and see",sub:"Watch that process"},{name:"Settle the cause",sub:"Direct and underlying"},{name:"Actions and owners",sub:"Agreed with the handler"},{name:"Check next month",sub:"See the effect in numbers"}]},
{t:"point",x:"Punctuality, baggage, customers and safety are connected. Forcing flights out on time creates incidents and complaints. A duty manager needs the balance to watch all four at once."}]}],
voice:"[Interview to be added] How the cause was found during a run of baggage incidents.",
terms:[["Property Irregularity Report (PIR)","手荷物事故報告","수하물 사고 보고서"],["Short-Shipped Baggage","積み残し","미탑재"],["Safety Report","安全報告","안전 보고"],["Corrective Action","是正措置","시정 조치"]],
quiz:[{q:"What is true about the number of safety reports?",opts:["Many small reports show a healthy operation","Fewer is always better","They need not be counted","Reporting is discouraged"],a:0,exp:"A culture where people hesitate to report is the real danger."},
{q:"When analysing mishandled baggage, what do you separate?",opts:["Which process it happened in","The weather","Only the day of the week","Staff preferences"],a:0,exp:"Separate check-in, sorting, loading and transfers."},
{q:"How are the four measures related?",opts:["Forcing punctuality creates incidents and complaints","Only punctuality matters","They are unrelated","Safety is not scored"],a:0,exp:"You need the balance to watch all four together."}],
next:"1-5 Reading safety performance indicators (SPIs)"});

set("1-5",{title:"Reading Safety Performance Indicators (SPIs)",hl:"safety performance indicators",subtitle:"How do you manage something that has not happened? Targets, alert levels and leading indicators",
lead:["An airline’s safety management system (SMS) tracks the warning signs before an accident in numbers. Those numbers are safety performance indicators, or SPIs. In passenger operations the most common are load control errors and undeclared or misdeclared dangerous goods.","This article covers what an SPI definition sheet contains, how alert levels are set, and the leading indicators a duty manager can move every day."],
sections:[
{h:"Does every airline have SPIs?",blocks:[{t:"table",cols:["Item","Common?","Explanation"],rows:[
["SMS and SPIs as a system","Common","Under ICAO Annex 19 and national law, airlines required to have a safety management system (commercial operators such as international carriers) monitor safety performance with SPIs and targets (SPTs)"],
["Which indicators and formulas","Differ by airline","Each airline decides what to measure, how to count it and what to divide by, based on its own risks, and has it accepted by the authority. There is no single worldwide list"],
["Targets and alert levels","Differ by airline","Set by each airline from past performance and the size of its operation"],
["Ground handlers","Depends on the country","The scope of SMS obligations varies by state; handlers are often asked for indicator data through the airline’s SMS, the service contract or ISAGO"]]},
{t:"note",x:"* The definition sheet, formula and alert levels in this article are general examples to explain the idea. Check your own airline’s definitions with its safety department. ★"}]},
{h:"An SPI definition sheet (example: load control errors)",blocks:[{t:"table",cols:["Item","Content"],rows:[
["Definition","The actual load does not match the loading instruction (LIR); the actual passengers, baggage, cargo or fuel do not match the loadsheet"],
["Data sources","Load control system, safety reports, flight records, quality audits, station reports"],
["Formula","Occurrences ÷ flights operated (per 1,000 departures, per 10,000 flight cycles, etc.)"],
["Target (SPT)","Zero occurrences"],
["Alert levels","Set in three stages — caution, warning, critical — using the past average and its spread (standard deviation)"],
["Potential outcome","An aviation safety occurrence (incorrect weight distribution)"]]},
{t:"note",x:"* An example based on the way SMS indicators are commonly set up. Formulas, targets and alert levels are set in each company’s SMS. ★"}]},
{h:"Hazards, precursors and leading indicators",blocks:[{t:"table",cols:["Type","Examples"],rows:[
["Hazards (why it happens)","Carelessness, weak supervision by the station or handler, staff shortages, gaps in training and knowledge, miscommunication"],
["Precursors (warning signs)","Regular meetings not held, procedures skipped such as missing signatures or cross-checks, reports or changes not passed on"],
["Leading indicators (actions taken first)","Stronger job training, quality audits, holding and following up monthly meetings, load monitoring, sharing other stations’ cases"]]}]},
{h:"What a duty manager can do every day",blocks:[{t:"check",items:[
{name:"Remove the precursors",x:"Check on the ground that signatures and double checks are not being skipped."},
{name:"Know where the numbers come from",x:"Know which indicator your reports feed, and write them accurately."},
{name:"Make other stations’ cases your own",x:"Pass shared cases on at the morning briefing."},
{name:"Dangerous goods work the same way",x:"Do not miss the signs of undeclared or misdeclared items, such as screening questions skipped at the counter."}]},
{t:"point",x:"Counting accidents after they happen is a lagging indicator. What a duty manager can move every day are the leading indicators and the precursors."}]}],
voice:"[Interview to be added] What was checked at your own station when another station’s load control error was shared.",
terms:[["Safety Performance Indicator (SPI)","安全成果指標","안전성과지표"],["Safety Performance Target (SPT)","安全成果目標","안전성과목표"],["Loading Instruction Report (LIR)","搭載計画書","탑재 계획서"],["Leading Indicator","先行指標","선행지표"]],
quiz:[{q:"What is an example formula for the load control error SPI?",opts:["Occurrences ÷ 10,000 flight cycles","Occurrences ÷ staff numbers","Total delay minutes","Passenger numbers"],a:0,exp:"It is compared per number of flights operated."},
{q:"Which is a precursor (warning sign)?",opts:["Regular meetings not held, missing signatures","Good weather","Many flights","Many compliments"],a:0,exp:"Skipped procedures and unshared changes are signs of an accident waiting to happen."},
{q:"What can a duty manager move every day?",opts:["Leading indicators and precursors","Only the accident count","Head office figures","Nothing"],a:0,exp:"The accident count is an outcome — a lagging indicator."}],
next:"1-6 Automation and ancillary revenue"});

set("1-6",{title:"Automation and Ancillary Revenue",hl:"automation and ancillary revenue",subtitle:"Passenger operations contribute to efficiency and revenue too",
lead:["Station scorecards can include online check-in rates and ancillary revenue earned at the airport, not just safety and punctuality. Shorter counter queues help punctuality, and charging correctly under the rules is also a matter of fairness.","This article covers the automation and ancillary revenue measures, and what a duty manager can do on the ground."],
sections:[
{h:"The two measures (example)",blocks:[{t:"table",cols:["Measure","How it is measured","Example target"],rows:[
["Automation","Share of boarded passengers who used online check-in or a kiosk (charter flights excluded)","Anywhere from 30% to 70%, depending on the route and airport facilities; growth over the previous quarter is also scored"],
["Ancillary revenue","Revenue per flight from upgrades, excess baggage, paid seats such as front rows or exit rows, and oversize baggage charges","Above the station’s average for the previous period (the margin varies by company)"]]},
{t:"note",x:"* Definitions and targets differ by company. ★"}]},
{h:"Raising automation",blocks:[{t:"check",items:[
{name:"Tell passengers early",x:"Promote online check-in in booking confirmations and pre-departure messages, working with sales and head office."},
{name:"Direct people before the counter",x:"Put an agent at the head of the queue to help passengers who can check in on their phones. QR code signs help."},
{name:"Bag-drop-only counters",x:"Open a dedicated position just for passengers who have already checked in."},
{name:"Measure the effect",x:"Record the usage rate alongside counter waiting times and staffing."}]}]},
{h:"How to think about ancillary revenue",blocks:[{t:"rows",items:[
{name:"Charge by the rules",x:"Letting excess baggage through is unfair to passengers who paid. Keep everyone to the same standard."},
{name:"No hard selling",x:"Offer upgrades naturally, with agreed wording. Pushy selling turns into complaints."},
{name:"Exit rows: safety first",x:"Even when paid for, always check the passenger meets the conditions to assist (age, language and so on)."},
{name:"Record and settle",x:"Record revenue by flight and settle it the same day."}]},
{t:"point",x:"Automation and ancillary revenue are the numbers that show passenger operations is not just a cost centre but a department that contributes to the company."}]}],
voice:"[Interview to be added] What was changed in the lobby to raise online check-in use.",
terms:[["Online Check-in","オンラインチェックイン","온라인 체크인"],["Ancillary Revenue","付帯収入","부대수익"],["Excess Baggage Charge","超過手荷物料金","초과 수하물 요금"],["Bag Drop Counter","手荷物専用カウンター","수하물 전용 카운터"]],
quiz:[{q:"Which is an automation measure?",opts:["Online check-in and kiosk usage rate","Number of staff","Fare levels","The weather"],a:0,exp:"It is measured as a share of boarded passengers."},
{q:"What is right about excess baggage charges?",opts:["Charging by the rules is fair","Letting it go is good service","Staff decide as they like","Never charge"],a:0,exp:"It is about fairness to passengers who paid."},
{q:"What must always be checked for a paid exit-row seat?",opts:["That the passenger meets the conditions to assist","Only the fee","The seat colour","Nothing"],a:0,exp:"Safety comes first."}],
next:"Part 2 Getting the Best from Your Handler — 2-1 What the SGHA and the SLA settle"});
})(window.ARTS);
