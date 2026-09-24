/* 航空貨物 入門 — English version (Part 0–1) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("0-1",{title:"How Air Cargo Moves, from Shipper to Consignee",hl:"how air cargo moves",subtitle:"Shipper, forwarder, airline, handler and customs: a relay between five parties",
lead:["Air cargo passes through many hands before it reaches an aircraft: the company sending the goods (the shipper), the company arranging the transport (the forwarder), the airline that carries it, the handling company working the warehouse, and customs.",
"This article follows an export shipment from origin to the consignee at the other end, and sets out what each party does."],
sections:[
{h:"From export to import",blocks:[{t:"ladder",rise:10,steps:[{name:"Shipper",sub:"What is being sent, and on what terms"},{name:"Forwarder",sub:"Booking, documents, collection"},{name:"Cargo warehouse",sub:"Acceptance, weighing, screening"},{name:"Airline",sub:"Loading and carriage"},{name:"Destination",sub:"Unloading, clearance, delivery"}]}]},
{h:"Who does what",blocks:[{t:"table",cols:["Party","Main role"],rows:[
["Shipper","The company sending goods. Decides the commodity, weight, dimensions, destination and deadline"],
["Freight forwarder","Books the airline on the shipper’s behalf, prepares the documents and arranges collection, clearance and delivery"],
["Airline","Carries the cargo. Sells the space and decides the loading"],
["Handling company","Acceptance, weighing, storage and build-up at the airport warehouse"],
["Customs","Export and import permissions, duty and tax, and checking prohibited goods"]]}]},
{h:"Why air cargo is chosen",blocks:[{t:"check",items:[
{name:"Speed",x:"Distances that take weeks by sea take days by air."},
{name:"High value",x:"Semiconductors, electronic components, precision equipment and pharmaceuticals: goods with high value for their weight."},
{name:"Freshness and deadlines",x:"Perishables, live animals, urgent spare parts."},
{name:"Security",x:"Shorter transit means relatively less exposure to damage and theft."}]},
{t:"point",x:"Air cargo work is about not dropping the baton between those five parties. Whichever one you work for, knowing what happens before and after you cuts mistakes."}]}],
voice:"[Interview to be added] What surprised you about cargo, coming from the passenger side.",
terms:[["Shipper","荷主","화주"],["Freight Forwarder","フォワーダー","포워더"],["Cargo Terminal / Warehouse","上屋","상옥(화물 터미널)"],["Customs Clearance","通関","통관"]],
quiz:[{q:"Who books the airline and prepares the documents for the shipper?",opts:["The forwarder","Customs","The airport company","A travel agency"],a:0,exp:"They arrange collection, clearance and delivery too."},
{q:"What suits air cargo?",opts:["Gravel","Precision equipment with high value for its weight","Bulk coal","Timber"],a:1,exp:"Speed and security are what you are paying for."},
{q:"Who handles acceptance, weighing and build-up at the airport?",opts:["The handling company","The shipper","Customs","A bank"],a:0,exp:"They work the warehouse."}],
next:"0-2 Belly hold and freighter"});

set("0-2",{title:"Belly Hold and Freighter",hl:"belly and freighter",subtitle:"The aircraft you put cargo on decides what fits and how fast it goes",
lead:["Air cargo travels either in the hold beneath a passenger cabin (the belly) or on a dedicated freighter. On short routes with many passenger flights, a great deal of cargo moves in the belly.",
"This article covers the characteristics of each, the difference in what fits, and how to choose."],
sections:[
{h:"Belly and freighter compared",blocks:[{t:"table",cols:["","Passenger belly","Freighter"],rows:[
["Frequency","As many as the passenger flights","Fewer"],
["Height that fits","Limited by the cargo door of the hold","Large items fit on the main deck"],
["Weight available","What is left after passengers and baggage","Considerably more"],
["Suits","Small and medium general cargo, urgent consignments","Large machinery, long items, high volumes"],
["Timings","Tied to the passenger schedule","Set by cargo demand"]]}]},
{h:"What decides whether it fits",blocks:[{t:"rows",items:[
{name:"The door",x:"Anything taller or wider than the cargo door simply will not go in, and doors differ by aircraft type."},
{name:"Floor strength",x:"There is a limit per square metre. Heavy items are spread over boards."},
{name:"The ULD",x:"The shape and size of the containers and pallets used (2-2)."},
{name:"Balance",x:"Whether the load stays within the weight and balance plan (4-1)."}]},
{t:"point",warn:true,x:"“The weight was fine but it was a few centimetres too tall” is a common story. For large shipments, confirm the aircraft type and the dimensions with the airline before booking (3-5)."}]},
{h:"Consolidation and direct shipments",blocks:[{t:"check",items:[
{name:"Consolidation",x:"The forwarder combines several shippers’ cargo into one consignment for the airline, bringing the rate down."},
{name:"Direct",x:"One shipper’s cargo travels as a single consignment."},
{name:"Documents",x:"In a consolidation there are two levels: the airline’s master air waybill and the forwarder’s house air waybills (1-2)."}]}]}],
voice:"[Interview to be added] How you moved a shipment that would not fit in the belly.",
terms:[["Belly Hold","ベリー","벨리(하부 화물칸)"],["Freighter","貨物専用機","화물 전용기"],["Main Deck","主甲板","메인 데크"],["Consolidation","混載","혼재"]],
quiz:[{q:"What is hard to carry in a passenger belly?",opts:["Small general cargo","Tall machinery","Documents","Electronic components"],a:1,exp:"The cargo door sets the limit."},
{q:"What is it called when several shippers’ cargo travels together?",opts:["Direct","Consolidation","Return","Storage"],a:1,exp:"It brings the rate down."},
{q:"What must be confirmed before booking large cargo?",opts:["The aircraft type and the dimensions","The weather","Only the rate","The chairman’s name"],a:0,exp:"A few centimetres can stop it loading."}],
next:"0-3 Cargo airports"});

set("0-3",{title:"Cargo Airports",hl:"cargo airports",subtitle:"What makes an airport a cargo hub",
lead:["Japan’s international air cargo is concentrated at Narita, with Kansai next. Elsewhere in Asia, Incheon is one of the world’s major cargo airports. Airports differ in how the cargo terminal is run, whether they operate around the clock, and how they handle transit cargo.",
"This article sets out the characteristics of the main airports and the shape of the traffic. Figures move from year to year, so it describes tendencies."],
sections:[
{h:"The main airports (tendencies)",blocks:[{t:"table",cols:["Airport","Character"],rows:[
["Narita","Japan’s largest international cargo gateway, with many freighters. Night operations are restricted"],
["Kansai","Operates 24 hours. The western Japan gateway, with dedicated pharmaceutical facilities"],
["Haneda","Mostly passenger belly. Close to central Tokyo and strong on urgent consignments"],
["Chubu","Operates 24 hours. Close to the automotive and aerospace industries"],
["Incheon","A major transfer hub for Asia, with large freighter networks"]]},
{t:"note",x:"* Volumes and rankings change each year. Check current statistics. ★"}]},
{h:"What moves on these routes",blocks:[{t:"check",items:[
{name:"Semiconductors and electronics",x:"Semiconductor production equipment, materials and components make up much of the traffic between industrial economies."},
{name:"Transfers",x:"Cargo from Japan often transfers at a regional hub on its way to the rest of Asia, Europe and the Americas."},
{name:"Passenger belly",x:"On routes with many frequencies, belly space is a valuable part of the capacity."},
{name:"E-commerce",x:"Cross-border online shopping keeps adding small consignments."}]}]},
{h:"Choosing an airport",blocks:[{t:"rows",items:[
{name:"Time",x:"The distance from the shipper’s factory, the acceptance deadline, and whether the airport runs 24 hours."},
{name:"Flights",x:"Direct and connecting services to the destination, and the aircraft types and their belly capacity."},
{name:"Facilities",x:"Temperature control, dangerous goods, outsized cargo and pharmaceutical facilities."},
{name:"Cost",x:"Airport charges, the inland trucking and the storage."}]}]}],
voice:"[Interview to be added] The commodities you see growing on these routes.",
terms:[["Cargo Terminal","貨物ターミナル","화물 터미널"],["Transit / Transfer Cargo","乗り継ぎ貨物","환적 화물"],["24-hour Operation","24時間運用","24시간 운용"],["Cross-border E-commerce","越境電子商取引","해외 직구"]],
quiz:[{q:"Which is Japan’s largest international cargo gateway?",opts:["Narita","Naha","New Chitose","Fukuoka"],a:0,exp:"Many freighters serve it."},
{q:"Which commodity is typical of these routes?",opts:["Semiconductor equipment, materials and components","Gravel","Live cattle","Crude oil"],a:0,exp:"The industries are closely linked."},
{q:"Which does NOT matter when choosing an airport?",opts:["The acceptance deadline","Specialist facilities","Cost","The colour of the terminal"],a:3,exp:"Time, flights, facilities and cost."}],
next:"1-1 Booking and the basics of rates"});

set("1-1",{title:"Booking and the Basics of Rates",hl:"booking and rates",subtitle:"The rate follows whichever is greater, the weight or the size",
lead:["Air cargo rates are calculated on whichever is greater: the actual weight, or the weight derived from the dimensions (the volumetric weight). Light, bulky goods are charged on their size.",
"This article covers the booking flow, volumetric weight, what makes up the rate, and the common surcharges. Actual rates differ by carrier, route and season and are not covered."],
sections:[
{h:"The booking flow",blocks:[{t:"ladder",rise:10,steps:[{name:"Enquiry",sub:"Commodity, pieces, weight, dimensions, dates"},{name:"Check the space",sub:"Flight, aircraft type, special handling"},{name:"Confirm",sub:"An air waybill number is allocated"},{name:"Delivery in",sub:"To the warehouse by the cut-off"},{name:"Loading",sub:"Anything offloaded goes on the next flight"}]}]},
{h:"Volumetric weight",blocks:[{t:"rows",items:[
{name:"How it is worked out",x:"Length by width by height in centimetres, divided by a standard divisor, commonly 6,000, giving a weight in kilograms. ★"},
{name:"Compare",x:"The greater of the actual weight and the volumetric weight is the chargeable weight."},
{name:"An example",x:"A box 100 cm by 100 cm by 100 cm weighing 50 kg has a volumetric weight of about 167 kg, and is charged on 167 kg."}]},
{t:"point",x:"Packing a little smaller can lower the rate. Suggesting that to a shipper is part of the craft of cargo work."}]},
{h:"What makes up the rate (example)",blocks:[{t:"table",cols:["Item","What it is"],rows:[
["Base rate","A unit rate by weight break, falling as the weight rises"],
["Fuel surcharge","Linked to fuel prices"],
["Security charge","Covering cargo screening and related costs"],
["Special handling","Dangerous goods, live animals, temperature control, outsized cargo"],
["Airport and warehouse charges","Terminal handling and storage, which rises once the free period ends"]]}]}],
voice:"[Interview to be added] A case where better packing cut the rate sharply.",
terms:[["Volumetric Weight","容積重量","용적 중량"],["Chargeable Weight","チャージャブル・ウェイト","적용 중량"],["Fuel Surcharge","燃油サーチャージ","유류할증료"],["Offload","積み残し","미탑재 화물"]],
quiz:[{q:"Which weight is used for the rate?",opts:["The actual weight only","The greater of actual and volumetric weight","The lesser","The average"],a:1,exp:"That is the chargeable weight."},
{q:"How is a 100 by 100 by 100 cm box weighing 50 kg charged?",opts:["On 50 kg","On the volumetric weight, about 167 kg","Free","It cannot be calculated"],a:1,exp:"Light, bulky goods are charged on size."},
{q:"What should you watch about storage charges?",opts:["They rise once the free period ends","They are always free","The airline always pays","They do not matter"],a:0,exp:"Watch for delays in collection."}],
next:"1-2 Reading an air waybill"});

set("1-2",{title:"Reading an Air Waybill",hl:"the air waybill",subtitle:"The shipment’s passport: number, shipper, consignee, commodity and weight all live here",
lead:["The air waybill (AWB) is the evidence of the contract of carriage between the airline and the shipper, and the receipt for the goods. Cargo is tracked by its air waybill number, and that number is the key in every document and every system.",
"This article covers how the number is built, what the waybill records, and the relationship between master and house waybills."],
sections:[
{h:"The number",blocks:[{t:"rows",items:[
{name:"Eleven digits",x:"The first three identify the airline; the remaining eight are the serial, the last digit being a check digit."},
{name:"The airline prefix",x:"A three-digit number allocated to each airline by IATA."},
{name:"The check digit",x:"A digit that catches keying errors in the number."}]}]},
{h:"What it records",blocks:[{t:"table",cols:["Field","Content"],rows:[
["Shipper","Name and address of the sender"],
["Consignee","Name and address of the receiver"],
["Origin and destination","Airport codes"],
["Pieces, weight and dimensions","Actual weight and chargeable weight"],
["Commodity","Specific: not “parts” but “parts for semiconductor production equipment”"],
["Handling information","Dangerous goods, temperature control, fragile and similar instructions"],
["Charges","Whether prepaid or collect"]]}]},
{h:"Master and house",blocks:[{t:"p",x:"Where a forwarder consolidates, the airline issues a master air waybill and the forwarder issues a house air waybill to each shipper beneath it. To the airline the shipper is the forwarder; to each individual shipper the carrier is the forwarder."},
{t:"point",warn:true,x:"A vague commodity description gets shipments stopped in customs or screening. Avoid “general goods” or “parts”, and write what it actually is."}]}],
voice:"[Interview to be added] Trouble caused by one small error on a waybill.",
terms:[["Air Waybill (AWB)","航空運送状","항공 운송장"],["Consignee","荷受人","수하인"],["Master AWB (MAWB)","マスター運送状","마스터 운송장"],["House AWB (HAWB)","ハウス運送状","하우스 운송장"]],
quiz:[{q:"What do the first three digits of an air waybill number identify?",opts:["The airline","The destination","The weight","The date"],a:0,exp:"A prefix allocated by IATA."},
{q:"What does a forwarder issue to each shipper in a consolidation?",opts:["A master","A house waybill","A passport","An invoice"],a:1,exp:"House waybills sit beneath the master."},
{q:"Which commodity description is good?",opts:["Parts","General goods","Parts for semiconductor production equipment","Miscellaneous"],a:2,exp:"Vague descriptions get stopped in customs and screening."}],
next:"1-3 Electronic waybills and cargo messaging"});

set("1-3",{title:"Electronic Waybills and Cargo Messaging",hl:"cargo messaging",subtitle:"Less paper, and the data now runs ahead of the freight",
lead:["Air cargo increasingly uses the electronic air waybill (e-AWB) instead of paper. Bookings, waybills, loading and status updates all move as standard messages between airline, forwarder, handler and customs.",
"This article covers what going electronic changes, and the main message types and what each does."],
sections:[
{h:"What changes",blocks:[{t:"check",items:[
{name:"Less double entry",x:"The airline can use the data the forwarder entered, so keying errors fall."},
{name:"Checks in advance",x:"Security and customs checks can run on the data before the freight arrives."},
{name:"Tracking",x:"Everyone sees the same status updates: accepted, loaded, arrived, delivered."}]}]},
{h:"The main messages (examples)",blocks:[{t:"table",cols:["Type","What it carries"],rows:[
["Waybill data","The content of the master air waybill"],
["House data","The content of the house waybills in a consolidation"],
["Flight manifest","Which shipments were loaded on which flight"],
["Status updates","Accepted, loaded, arrived, delivered and so on"],
["Booking","Space requests and confirmations"]]},
{t:"note",x:"* The formats are industry standards, in text and XML. Names for them differ between companies."}]},
{h:"Data quality",blocks:[{t:"p",x:"Now that the data arrives ahead of the freight, an error in it — weight, pieces, commodity — turns directly into a delay in customs or screening. Checking that the freight and the data agree matters more than ever on the warehouse floor."}]}],
voice:"[Interview to be added] How going electronic changed the work on the ground.",
terms:[["e-AWB","電子運送状","전자 운송장"],["Flight Manifest","フライト・マニフェスト","적하목록(편별)"],["Status Update","状況の更新","상태 업데이트"],["Data Quality","データ品質","데이터 품질"]],
quiz:[{q:"What is the benefit of the electronic waybill?",opts:["Fewer keying errors","More paper","No checks possible","Heavier freight"],a:0,exp:"The data is reused rather than retyped."},
{q:"What shows which shipments were loaded on a flight?",opts:["The flight manifest","An invoice","An insurance policy","A business card"],a:0,exp:"It is also used to report to customs."},
{q:"What matters more once everything is electronic?",opts:["Checking that the freight and the data agree","Filing paper","Handwriting","Telephoning only"],a:0,exp:"Data errors become delays."}],
next:"1-4 The cargo manifest and customs"});

set("1-4",{title:"The Cargo Manifest and Customs",hl:"manifest and customs",subtitle:"Japan’s import and export cargo runs through NACCS ★",
lead:["In Japan most air cargo import and export formalities go through NACCS, the customs and port information system. Airlines and handlers file the cargo manifest for each flight, and forwarders and customs brokers make the declarations.",
"This article covers the export and import flows, what the manifest does, and the idea of bonded status. For passenger flight formalities see 4-2 of the Launching Flights to Japan series."],
sections:[
{h:"Export (example)",blocks:[{t:"ladder",rise:10,steps:[{name:"Into the bonded warehouse",sub:"The cargo comes under customs control"},{name:"Export declaration",sub:"Filed in NACCS by the customs broker"},{name:"Examination",sub:"Where required"},{name:"Export permission",sub:"The cargo may now be loaded"},{name:"Loading and manifest",sub:"Filed by the carrier side"}]}]},
{h:"Import (example)",blocks:[{t:"ladder",rise:10,steps:[{name:"Manifest filed",sub:"Before arrival"},{name:"Unloading",sub:"Into the bonded warehouse"},{name:"Import declaration",sub:"Duty and consumption tax"},{name:"Permission",sub:"After payment"},{name:"Release",sub:"To the consignee"}]}]},
{h:"Ideas worth holding on to",blocks:[{t:"rows",items:[
{name:"Bonded status",x:"Cargo before export or import permission sits under customs control in a bonded area and cannot simply be moved."},
{name:"An accurate manifest",x:"If it does not match what was actually loaded, customs will require a correction. Reflect offloads and late additions immediately."},
{name:"Advance reporting",x:"For cargo arriving in Japan, the carrier reports the master and house waybill information, including shipper and consignee, to customs through NACCS before arrival, within a deadline set by flight time. Check the current deadlines. ★"},
{name:"Export controls",x:"Some goods, such as semiconductor equipment, need an export licence (3-5)."}]}]}],
voice:"[Interview to be added] A late night spent correcting a manifest.",
terms:[["Cargo Manifest","積荷目録","적하목록"],["Bonded Area","保税地域","보세 구역"],["Export Declaration","輸出申告","수출 신고"],["Customs Broker","通関業者","관세사(통관업자)"]],
quiz:[{q:"Where does cargo sit before export permission?",opts:["In a bonded area","Only in the shipper’s warehouse","In a park outside the airport","At the passenger counter"],a:0,exp:"It is under customs control."},
{q:"What matters about the manifest?",opts:["That it matches what was actually loaded","Its colour","The font","Its length"],a:0,exp:"Reflect loading changes immediately."},
{q:"Which system is used for Japanese import and export formalities?",opts:["NACCS","GDS","BSP","DCS"],a:0,exp:"The customs and port information system."}],
next:"2-1 Acceptance, weighing and storage"});
})(window.ARTS);
