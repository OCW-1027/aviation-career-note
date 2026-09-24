/* 航空貨物 入門 — English version (Part 4–5) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("4-1",{title:"The Load Plan and Notification to the Captain",hl:"the load plan",subtitle:"Weight, balance, position and special cargo, all on one sheet for the captain",
lead:["Where cargo is placed bears directly on the aircraft’s weight and balance. The load controller decides the positions from the combined weight of passengers, baggage, cargo and fuel, and tells the captain about any dangerous goods, animals or other special cargo.",
"This article covers how the load plan is built, how positions are decided for special cargo, and what the notification to the captain (NOTOC) does (for passenger load control, see Ground Staff 3-4)."],
sections:[
{h:"How the load plan is built",blocks:[{t:"ladder",rise:10,steps:[{name:"Booking data",sub:"Weights and ULDs"},{name:"Load plan",sub:"Positions and centre of gravity"},{name:"Loading instruction",sub:"To the ramp"},{name:"Actual loading",sub:"Checked against the instruction"},{name:"Final calculation",sub:"The loadsheet"}]}]},
{h:"Positions for special cargo",blocks:[{t:"table",cols:["Cargo","What decides the position"],rows:[
["Dangerous goods","Segregation by class, and a record the captain can read easily"],
["Live animals","A compartment with controlled temperature and ventilation, away from dry ice"],
["Perishables and pharmaceuticals","Temperature control, and a position that comes off quickly"],
["Heavy items","Floor strength and the effect on balance"],
["Transfer cargo","A position that can be unloaded first on arrival"]]}]},
{h:"Notification to the captain (NOTOC)",blocks:[{t:"rows",items:[
{name:"What it contains",x:"The type, quantity, position and UN number of dangerous goods and other special cargo."},
{name:"Acceptance",x:"The captain checks it and signs."},
{name:"Retention",x:"A copy is kept at the departure station for the required period."},
{name:"Changes",x:"If the load changes, the notification is reissued."}]},
{t:"point",warn:true,x:"In a fire or an emergency landing, the notification is how the fire service and the arrival airport learn what is on board and where. Accuracy comes before everything."}]}],
voice:"[Interview to be added] Reissuing the notification after a last-minute load change.",
terms:[["Load Planning","搭載計画","탑재 계획"],["Load Sheet","ロードシート","로드시트"],["NOTOC","機長への通知","기장 통보서"],["Centre of Gravity","重心","무게중심"]],
quiz:[{q:"What goes in the notification to the captain?",opts:["The type, quantity and position of dangerous and special cargo","Passenger names","The rate","The weather"],a:0,exp:"It is the lifeline in an emergency."},
{q:"Where should transfer cargo be loaded?",opts:["Where it can be unloaded first","At the very back","Anywhere","In the cabin"],a:0,exp:"To protect the connection time."},
{q:"What happens if the load changes?",opts:["Leave the notification as it is","Reissue it","Mention it verbally","Do nothing"],a:1,exp:"The document must match what is on board."}],
next:"4-2 Load messages and cargo documents"});

set("4-2",{title:"Load Messages and Cargo Documents",hl:"load messages",subtitle:"Telling the arrival station what is where, before the aircraft gets there",
lead:["Once loading is done, the departure station sends the arrival station the ULD positions and weights, the special cargo and anything offloaded, by message. The arrival station uses it to prepare for unloading and storage.",
"This article covers recording ULD weights, the main messages, the documents carried on board, and what is checked on arrival."],
sections:[
{h:"Recording ULD weights",blocks:[{t:"p",x:"For each ULD built up, record the number, destination, weight and the category of contents. That record — the ULD weight statement — feeds both the load plan and the manifest."}]},
{h:"The main messages (examples)",blocks:[{t:"table",cols:["Type","What it carries"],rows:[
["Load message","Weights and pieces by compartment: passengers, baggage, cargo and mail"],
["ULD positions","Which ULD is in which position"],
["Container pallet message","ULD numbers and destinations"],
["Offload information","Cargo that was planned but did not travel"]]}]},
{h:"Documents on board, and checks on arrival",blocks:[{t:"check",items:[
{name:"Carried on board",x:"The manifest, waybill copies where needed, the notification to the captain and the special cargo documents."},
{name:"Checks on arrival",x:"Reconcile the messages and documents against the actual ULDs, and record any overage, shortage or damage."},
{name:"Tracing offloads",x:"Decide which flight offloaded cargo goes on, and tell the shipper’s side and the arrival station."}]},
{t:"point",x:"The messages exist to give staff at the other end time to prepare. Send them on time, and send a correction immediately if anything changes."}]}],
voice:"[Interview to be added] Confusion at the arrival station caused by an error in a message.",
terms:[["ULD Weight Statement","ULD重量記録","ULD 중량 기록"],["Load Message (LDM)","搭載の電報","탑재 전문"],["Container Pallet Message (CPM)","ULD配置の電報","컨테이너·팔레트 전문"],["Offload","積み残し","미탑재"]],
quiz:[{q:"Why send the load messages?",opts:["To give the arrival station time to prepare","To set the rate","To choose passengers","To report the weather"],a:0,exp:"They are used to prepare unloading and storage."},
{q:"What is checked first on arrival?",opts:["The messages and documents against the actual ULDs","The shops","Only the passenger count","Nothing"],a:0,exp:"Record any overage, shortage or damage."},
{q:"What happens to offloaded cargo?",opts:["Nothing","A flight is chosen and everyone is told","It is destroyed","Only a refund"],a:1,exp:"It is traced through to delivery."}],
next:"4-3 Cargo irregularities"});

set("4-3",{title:"Cargo Irregularities: Damage, Loss and Delay",hl:"cargo irregularities",subtitle:"What you record when you find it decides liability and compensation ★",
lead:["Cargo irregularities include damage, shortages, delay and theft. When one happens, the record of when, where and in what condition it was found becomes the evidence that decides where liability sits and what is paid.",
"This article covers the types and where they are found, how to record them, the time limits for claims, and how to stop them repeating."],
sections:[
{h:"Types, and where they are found",blocks:[{t:"table",cols:["Type","Usually found"],rows:[
["Damage","At acceptance, during build-up, on unloading, at delivery"],
["Shortage","On reconciliation at arrival, or when a shipment arrives split"],
["Delay","Offloads, missed connections, documentation problems"],
["Theft","In storage or in transit, with valuables"],
["Temperature excursion","When the temperature record is checked (3-3)"]]}]},
{h:"How to record it",blocks:[{t:"check",items:[
{name:"Photographs",x:"The packing, the labels, the damage itself and the state of the ULD."},
{name:"Paperwork",x:"The irregularity report, the waybill number, and when, where and by whom it was found."},
{name:"Noted at delivery",x:"Have the consignee write the damage or shortage on the delivery receipt."},
{name:"Telling people",x:"Advise the departure station, the shipper’s side and the forwarder promptly."}]}]},
{h:"Claims and prevention",blocks:[{t:"rows",items:[
{name:"Time limits",x:"International conventions set deadlines for complaints about damage and delay, for example 14 days from receipt for damage. Check the convention and the conditions on the waybill. ★"},
{name:"Limits of liability",x:"The conventions cap liability by weight. For high-value cargo, a declared value or insurance matters."},
{name:"Prevention",x:"Analyse where irregularities cluster — location, process, commodity — and feed it back into procedures, training and packing."}]},
{t:"point",x:"It is not the irregularity that makes things hard to resolve; it is the absence of a record. Make photographing and recording it on the spot a habit."}]}],
voice:"[Interview to be added] A cargo case solved because the record existed.",
terms:[["Cargo Irregularity","貨物事故","화물 사고"],["Damage","破損","파손"],["Time Limit for Claims","請求期限","청구 기한"],["Limit of Liability","補償限度","보상 한도"]],
quiz:[{q:"What is the key evidence for liability and compensation?",opts:["The record made when it was found","The rate","The flight number","The weather"],a:0,exp:"Photographs and paperwork."},
{q:"What should the consignee do at delivery?",opts:["Write the damage or shortage on the receipt","Say nothing","Refuse delivery","Ask for a refund"],a:0,exp:"It supports any later claim."},
{q:"What matters for high-value cargo?",opts:["A declared value or insurance","Cheap packing","No records","Speed alone"],a:0,exp:"Convention liability is capped."}],
next:"5-1 The role of the general sales agent"});

set("5-1",{title:"The Role of the General Sales Agent",hl:"the GSA",subtitle:"The company that sells a foreign airline’s cargo locally",
lead:["Rather than build their own cargo sales organisation in a market, foreign airlines often appoint a general sales agent (GSA). The GSA sells to forwarders, takes bookings, quotes rates and manages the documents on the airline’s behalf.",
"This article covers what a GSA does, how the work splits with the airline, and what to look for when choosing and managing one."],
sections:[
{h:"What a GSA does",blocks:[{t:"check",items:[
{name:"Selling",x:"Calling on forwarders, quoting rates and selling the space."},
{name:"Bookings",x:"Taking bookings, managing the loading outlook, advising offloads."},
{name:"Documents",x:"Holding waybill stock, controlling issuance, reporting sales."},
{name:"Settlement",x:"Invoicing and collecting the freight charges and remitting to the airline."}]}]},
{h:"How the work splits (example)",blocks:[{t:"table",cols:["The airline","The GSA"],rows:[
["Sets the rate policy and the sales targets","Sells within that policy"],
["Makes the final loading decision","Adjusts bookings and advises"],
["Contracts with the handling company","Is the day-to-day contact on the ground"],
["Reviews the GSA’s performance","Reports sales and collections"]]}]},
{h:"Choosing and managing a GSA",blocks:[{t:"rows",items:[
{name:"Track record",x:"Experience on similar routes and sectors, and relationships with forwarders."},
{name:"Financial health",x:"They collect and remit your revenue, so their finances matter."},
{name:"Reporting",x:"How often and how accurately they report sales, bookings and collections."},
{name:"Conflicts of interest",x:"Whether they also represent a competing airline."}]},
{t:"point",x:"The GSA is the airline’s face in that market. A passenger station manager who follows what the GSA is doing finds it easier to use belly space well and to handle enquiries about large shipments."}]}],
voice:"[Interview to be added] A time working with the GSA paid off, seen from the passenger side.",
terms:[["General Sales Agent (GSA)","販売総代理店","판매 총대리점"],["Space / Capacity","スペース","공간(스페이스)"],["Collection","回収","회수"],["Conflict of Interest","利益相反","이해 상충"]],
quiz:[{q:"What does a GSA do for the airline?",opts:["Cargo sales, bookings and settlement","Flying","Maintenance","Inflight service"],a:0,exp:"It runs cargo sales in that market."},
{q:"What matters most when choosing a GSA?",opts:["Financial health and track record","The size of their office","The age of their president","Their logo colour"],a:0,exp:"They collect and remit your money."},
{q:"Who makes the final loading decision in this example?",opts:["The airline","The GSA","The shipper","Customs"],a:0,exp:"The GSA adjusts bookings and advises."}],
next:"5-2 Managing the cargo handling company"});

set("5-2",{title:"Managing the Cargo Handling Company",hl:"managing cargo handling",subtitle:"As with passengers, contracting the work out does not move the responsibility",
lead:["Warehouse work is usually contracted out too. As on the passenger side, quality and safety remain the airline’s responsibility. Monthly meetings, quality checks and invoice verification are the three pillars.",
"This article covers what to check in cargo handling, the monthly meeting and verifying the invoices (for passenger handling, see Ground Staff 6-2)."],
sections:[
{h:"What to check (examples)",blocks:[{t:"check",items:[
{name:"Acceptance",x:"Whether documents are reconciled, cargo weighed and the security status confirmed, as the procedure requires."},
{name:"Dangerous goods",x:"The acceptance checklist, segregation, marking and the training records."},
{name:"Build-up",x:"Weight limits, contour, securing and ULD damage inspections."},
{name:"Storage",x:"Temperature control, bonded control and the valuables area."},
{name:"Documents and messages",x:"The accuracy and timing of manifests and load messages."}]}]},
{h:"The monthly meeting",blocks:[{t:"table",cols:["Agenda","Content"],rows:[
["Performance","Tonnage handled, offloads, irregularity numbers"],
["Quality","Check results, findings and improvements"],
["Special cargo","How dangerous goods, pharmaceuticals and the rest are running"],
["What is coming","Peak seasons, aircraft changes, schedule changes"],
["Other","Staffing, equipment, invoice questions"]]}]},
{h:"Verifying invoices",blocks:[{t:"rows",items:[
{name:"Handling charges",x:"Reconcile against the actual tonnage and shipment counts."},
{name:"Special handling",x:"Whether the surcharges for dangerous goods, temperature control and outsized cargo match the work actually done."},
{name:"Who checks",x:"Cargo handling invoices are sometimes verified by a different department from passenger ones. Make the internal owner clear."}]},
{t:"point",x:"Cargo quality problems reach the passenger side too: late loading becomes a late departure. Keep the passenger and cargo teams sharing information."}]}],
voice:"[Interview to be added] What came up most at meetings with the cargo handler.",
terms:[["Quality Audit","品質点検","품질 점검"],["Monthly Meeting","月例会議","월간 회의"],["Handling Charge","取り扱い料","취급료"],["Offload","積み残し","미탑재"]],
quiz:[{q:"Where does responsibility sit when warehouse work is contracted out?",opts:["With the handler alone","With the airline","With the shipper","With customs"],a:1,exp:"Contracting out does not move it."},
{q:"How does a cargo problem reach passengers?",opts:["Late loading becomes a late departure","The catering changes","More seats appear","The fare falls"],a:0,exp:"Share information between the teams."},
{q:"What do you check on special handling charges?",opts:["Whether they match the work actually done","The colour","The length","The font"],a:0,exp:"Dangerous goods, temperature control and the rest."}],
next:"5-3 Cargo revenue and how rates work"});

set("5-3",{title:"Cargo Revenue and How Rates Work",hl:"cargo revenue",subtitle:"On a passenger flight, belly cargo can be what makes the numbers work",
lead:["Passengers are the core of a passenger flight’s revenue, but belly cargo is not marginal. In weak seasons and on thin routes, cargo revenue can be what keeps a flight viable.",
"This article covers what drives cargo revenue, the types of rate, and how to grow it. Actual amounts and contract terms are not covered."],
sections:[
{h:"What drives the revenue",blocks:[{t:"table",cols:["Driver","What it means"],rows:[
["Volume carried","The chargeable weight actually loaded"],
["Rate level","Set by supply and demand, competition and commodity"],
["Special handling","Surcharges for dangerous goods, temperature control and outsized cargo"],
["Utilisation","How much of the available capacity was used"],
["Costs","Handling, security and airport charges"]]}]},
{h:"Types of rate (examples)",blocks:[{t:"check",items:[
{name:"General cargo rates",x:"Unit rates by weight break."},
{name:"Commodity rates",x:"Rates for particular commodities on particular routes."},
{name:"Contract rates",x:"Term agreements with major forwarders."},
{name:"Spot rates",x:"One-off rates set by the market at that moment."}]}]},
{h:"Growing the revenue",blocks:[{t:"rows",items:[
{name:"Reduce offloads",x:"Narrow the gap between what is booked and what is loaded."},
{name:"Know the belly capacity",x:"Publish the weight and volume available for cargo early, from the passenger and baggage forecast."},
{name:"Go for higher-value commodities",x:"Precision equipment and pharmaceuticals, where special handling earns a premium."},
{name:"Work with the passenger side",x:"The station and the GSA sharing information makes it possible to say yes to outsized or urgent requests."}]}]}],
voice:"[Interview to be added] A time belly cargo carried the flight’s numbers.",
terms:[["Cargo Load Factor","搭載率","탑재율"],["Spot Rate","スポット運賃","스폿 운임"],["Contract Rate","契約運賃","계약 운임"],["Profitability","採算","채산"]],
quiz:[{q:"Which does NOT drive cargo revenue?",opts:["Volume carried","Rate level","Special handling","The colour of the terminal"],a:3,exp:"Volume, rate, surcharges and cost."},
{q:"How do you grow the revenue?",opts:["Reduce offloads","Stop taking bookings","Hide the rates","Do not use the belly"],a:0,exp:"Narrow the gap between booked and loaded."},
{q:"What is a one-off rate set by the market called?",opts:["A spot rate","A contract rate","A general rate","A passenger fare"],a:0,exp:"It moves with the market."}],
next:"5-4 Careers and qualifications in cargo"});

set("5-4",{title:"Careers and Qualifications in Cargo",hl:"cargo careers",subtitle:"Airline, handler, forwarder, GSA — one industry you can move around in",
lead:["Air cargo work spans many companies: airlines, handling companies, forwarders, GSAs and customs brokers. Wherever you gain experience, it carries over to the others, and that is the character of this industry.",
"This article closes the series with the main jobs, useful qualifications and training, the career paths, and how cargo differs from the passenger side."],
sections:[
{h:"The main jobs",blocks:[{t:"table",cols:["Job","What it involves"],rows:[
["Warehouse staff","Acceptance, weighing, build-up and storage"],
["Load control","The load plan, the documents and the messages"],
["Dangerous goods acceptance","Checking and accepting dangerous goods"],
["Forwarder sales and operations","Proposals to shippers, bookings, documents, arranging clearance"],
["Customs specialist","Declarations to customs (a licensed qualification)"],
["Airline or GSA cargo sales","Selling the space, rates and managing customers"]]}]},
{h:"Useful qualifications and training (examples)",blocks:[{t:"check",items:[
{name:"Dangerous goods training",x:"Training for your role, renewed at intervals."},
{name:"Customs specialist licence",x:"A national qualification in Japan, required for customs brokerage work. ★"},
{name:"Trade knowledge",x:"Incoterms, invoices and the basics of insurance."},
{name:"Languages",x:"English is essential for documents and messages, and a further language is a real advantage on the routes you serve."},
{name:"Equipment skills",x:"Some warehouse work requires certified training, for example on forklifts."}]}]},
{h:"Career paths, and closing the series",blocks:[{t:"rows",items:[
{name:"From the floor to management",x:"Warehouse work, then load control, then quality and safety, then management."},
{name:"Moving between employers",x:"Handling company, then forwarder, then airline or GSA cargo sales."},
{name:"How cargo differs",x:"Your customers are companies: shippers and forwarders. Accuracy in documents, data and rules counts for even more."},
{name:"This series",x:"The whole picture (Part 0), documents (Part 1), the warehouse (Part 2), special cargo (Part 3), loading (Part 4), sales and organisation (Part 5)."}]},
{t:"point",x:"Air cargo is the invisible infrastructure beneath modern industry and daily life. Knowing it alongside the passenger side is what lets you see how an airport really works."}]}],
voice:"[Interview to be added] What you felt having worked both passenger and cargo.",
terms:[["Licensed Customs Specialist","通関士","관세사"],["Incoterms","インコタームズ","인코텀즈"],["Load Control","ロードコントロール","탑재관리"],["Career Path","キャリアパス","커리어 경로"]],
quiz:[{q:"Which licensed qualification covers customs declarations?",opts:["Customs specialist","Dispatcher","Cabin crew","Engineer"],a:0,exp:"It is required for customs brokerage work."},
{q:"What counts for more in cargo?",opts:["Accuracy in documents, data and rules","Smiling alone","The uniform","A loud voice"],a:0,exp:"Your customers are companies."},
{q:"What characterises the cargo industry?",opts:["Experience carries between employers","You cannot move","No qualifications needed","No English needed"],a:0,exp:"The companies are closely connected."}],
next:""});
})(window.ARTS);
