/* 航空貨物 Part 6 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("6-1",{title:"The Export Timeline and How Much Cargo Fits: Working Back from Departure",hl:"export timeline",subtitle:"Booking confirmation, acceptance, documents, weighing, delivery to the aircraft and the document pouch; a timeline counted back from departure, and the cargo capacity of a passenger flight (ACL − passengers − baggage)",
lead:["Cargo on a passenger flight moves in a fixed order towards departure: confirm the booking, receive it at the warehouse, accept the documents, build and weigh the ULDs, take them to the aircraft and finally hand the document pouch on board. If any step slips, cargo is offloaded or the flight is delayed.","Just as important is how much cargo the flight can take. On passenger flights, passengers and baggage come first and cargo gets what is left. This lesson checks the timeline and the capacity calculation with example figures."],
sections:[
{h:"A timeline counted back from departure (example)",blocks:[{t:"table",cols:["Task","Deadline (before departure)","Purpose"],rows:[
["Booking confirmation","24 hours","Fix the load and start warehouse and ramp preparation"],
["Acceptance cut-off (general cargo)","240 minutes","Time for acceptance, screening and build-up"],
["Acceptance cut-off (express)","180 minutes","Shorter only for urgent cargo"],
["Documents","90 minutes","Complete AWBs and manifests and file with customs"],
["ULD weighing","70–100 minutes","Confirm weights for load control"],
["On dollies, ready for pick-up","90 minutes","Ready for the ramp team"],
["Delivery to the aircraft","40 minutes","In loading sequence"],
["Document pouch on board","20 minutes","Manifests to the senior cabin crew"],
["Transfer (intact ULD)","90 minutes before the connection","No rebuild needed"],
["Transfer (rebuild)","180–240 minutes before the connection","Time to break down and rebuild"]]},
{t:"note",x:"* Figures are one airline’s passenger-flight example; they vary by airport, aircraft and handling contract (SLA, 7-5). Always check your own SOP."}]},
{h:"Cargo capacity",blocks:[{t:"p",x:"On a passenger flight, cargo capacity is the allowable cabin load (ACL) minus passenger and baggage weights. The ACL is set by operations for each route and adjusted with actual data (dispatch course Part 5; load control 3-7)."},
{t:"table",cols:["Item","Calculation (example)","Result"],rows:[
["ACL","From route analysis","38,000 kg"],
["Passengers","290 × standard weight 80 kg","23,200 kg"],
["Baggage","290 × 16 kg per passenger (monthly baggage analysis)","4,640 kg"],
["Available for cargo","38,000 − 23,200 − 4,640","10,160 kg"],
["Bags","290 × 1.1 per passenger","319"],
["Baggage containers","319 ÷ 40 per container","7.98 → 8 (AKE)"]]},
{t:"point",x:"Space is limited as well as weight. Pick the aircraft configuration that fits the baggage containers; the remaining pallet and container positions are cargo’s share. Check the expected baggage count with passenger services the day before."}]},
{h:"Reporting weights to dispatch",blocks:[{t:"table",cols:["When (example)","What to report"],rows:[
["6 hours before departure","Estimated cargo weight (including ULDs and materials)"],
["In between","Any change of about 900 kg (2,000 lb) or more, immediately"],
["50 minutes before departure","Final cargo weight (final payload)"]]},
{t:"note",x:"* Dispatchers use these weights to check fuel and the flight plan (dispatch course Parts 4–5). Late or large changes cause delays or refuelling."}]},
{h:"Publishing which special cargo you accept",blocks:[{t:"table",cols:["Code","Cargo","Accepted (example)"],rows:[
["DGR","Dangerous goods","Yes (prior approval)"],["AVI","Live animals","Yes"],["PER","Perishables","Yes"],["WET","Wet cargo","Yes"],["HUM","Human remains","Yes"],["VAL","Valuables","No"],["DIP","Diplomatic cargo","No"],["CAR","Vehicles","No"]]},
{t:"note",x:"* Set embargoes and restrictions by airport facilities, aircraft and company policy, and tell agents and forwarders in advance."}]}],
voice:"On busy peak-season flights, the weight available for cargo sometimes came out lower than forecast at booking. Once we rechecked the cargo allowance against the previous day’s passenger bookings and told forwarders early, offloads on the day fell.",
terms:[["Allowable Cabin Load (ACL)","許容搭載量","허용탑재중량"],["Confirmed Booking Acceptance (CBA)","予約の確定","예약 확정"],["Payload","ペイロード","페이로드"],["Cargo Acceptance Cut-off","搬入の締め切り","반입 마감"],["Embargo","エンバーゴ（取り扱い制限）","엠바고(취급 제한)"]],
quiz:[{q:"How is cargo capacity on a passenger flight calculated?",opts:["ACL − passenger weight − baggage weight","ACL + passenger weight","Seats × 80 kg","Fuel load"],a:0,exp:"Cargo gets what passengers and baggage leave."},
{q:"Why is the express acceptance cut-off (example) shorter?",opts:["To accept urgent cargo with higher priority","No screening needed","It is lighter","No customs"],a:0,exp:"Work is prioritised."},
{q:"If cargo weight changes significantly after the final figure is sent…",opts:["Tell dispatch immediately","Depart anyway","Fix it on the next flight","Reduce passengers"],a:0,exp:"It affects fuel and the flight plan."}],
next:"6-2 From acceptance to build-up and weighing"});
set("6-2",{title:"From Acceptance to Build-up and Weighing: Floor Limits and the 1% UWS Check",hl:"build-up",subtitle:"What to check at acceptance, spreading weight to suit floor strength, the steps of ULD build-up, checking weight differences on the UWS, the document pouch and corrections (CCA)",
lead:["Most cargo incidents can be prevented at acceptance and build-up. Spotting damaged packaging or hidden dangerous goods at acceptance prevents incidents in flight. Failing to spread heavy items to suit floor strength damages the aircraft.","This lesson covers acceptance checks, floor-loading calculations, build-up steps and the UWS weight check, with example figures."],
sections:[
{h:"What to check at acceptance",blocks:[{t:"check",items:[
{name:"Booking",x:"Do not accept unbooked cargo without checking with sales."},
{name:"Weight and volume",x:"Weigh and measure; compare actual and volume weight with the AWB and record differences."},
{name:"Packaging",x:"Check for damage, leaks or wetness; record and have the shipper confirm. Refuse if severe."},
{name:"Size",x:"Within aircraft and company limits (e.g. up to 160 cm high)."},
{name:"Prohibited items",x:"Items banned by origin, transit and destination states and the airline."},
{name:"Hidden dangerous goods",x:"Check anything suspicious from its description, labels or weight (7-3)."},
{name:"Safety data sheets (SDS/MSDS)",x:"Confirm chemicals are not dangerous goods with a valid sheet (e.g. within 3 years); open and check if in doubt."},
{name:"Magnetized material",x:"Check the gauss report against the rules (7-3)."}]}]},
{h:"Floor strength and spreading weight",blocks:[{t:"p",x:"Hold floors have a maximum load per square metre. Heavy items with small bases are placed on boards (shoring) to spread the load."},
{t:"table",cols:["Step","Calculation (example)"],rows:[
["Item","2,400 kg, base 1.2 m × 1.0 m = 1.2 m²"],
["Load on the base","2,400 ÷ 1.2 = 2,000 kg/m²"],
["Floor limit (example)","800 kg/m²"],
["Area needed","2,400 ÷ 800 = 3.0 m²"],
["Instruction","Spread on boards to, say, 2.0 m × 1.5 m"]]},
{t:"note",x:"* Limits vary by aircraft, position and ULD. Items above company thresholds (e.g. over 2,300 kg per piece or over size limits) need a supervisor’s check and spreading instructions."}]},
{h:"Building up a ULD",blocks:[{t:"rows",items:[
{name:"1 Inspect",x:"Check the ULD for damage and place it on a dolly or stand, never directly on the floor."},
{name:"2 Sheet",x:"Lay a working sheet."},
{name:"3 Heavy first",x:"Heavy, sturdy items at the bottom and as central as possible."},
{name:"4 Light and small items",x:"Light items on top; small items in gaps or the centre to avoid loss."},
{name:"5 Secure",x:"Spread heavy items on boards and tie down with ropes and straps."},
{name:"6 Cover",x:"Fold up and tape the base sheet and cover the top; add another sheet in rain or snow."}]}]},
{h:"Checking weight differences (UWS)",blocks:[{t:"p",x:"Weigh each built ULD and compare manifest and actual weights on the ULD weight statement (UWS). Record the weight of every material: ULD, boards, sheets and ropes."},
{t:"table",cols:["Item","Example"],rows:[
["Manifest cargo weight (including materials)","3,050 kg"],
["Weighed","3,120 kg"],
["Difference","70 kg (about 2.3%)"],
["Decision (e.g. over 1%)","Do not load until the cause is found: wrong weights, unrecorded materials or unmanifested cargo"]]},
{t:"point",warn:true,x:"Weight differences go straight to balance and safety. Do not load on a “close enough” basis; find the cause, then update the load sheet (load control 3-7)."}]},
{h:"Documents and corrections",blocks:[{t:"rows",items:[
{name:"Customs",x:"Confirm export permission or declaration at origin (NACCS in Japan, 1-4)."},
{name:"Document pouch",x:"Manifests to the senior cabin crew by, for example, 20 minutes before departure."},
{name:"Instructions to destination",x:"Send special-handling and priority instructions ahead (6-3)."},
{name:"Corrections (CCA)",x:"If shipper, consignee, description or weight in FWB or FHL data is wrong, origin resends correct data; errors cause customs holds at destination."}]}]}],
voice:"When we opened a ULD with a large weight discrepancy, we found cargo whose weight differed from the declaration. Since then we have agreed with the handling agent that anything over the threshold is explained before it is loaded.",
terms:[["Cargo Acceptance","受付","접수"],["Floor Loading Limit","床の強さ","바닥 하중 제한"],["Shoring","板で分散する作業","쇼어링"],["ULD Weight Statement (UWS)","ULD重量表","ULD 중량표"],["Cargo Correction Advice (CCA)","貨物の訂正通知","화물 정정 통지"]],
quiz:[{q:"A 2,400 kg item on a 1.2 m² base with an 800 kg/m² floor limit needs…",opts:["1.2 m²","2.0 m²","3.0 m²","8.0 m²"],a:2,exp:"2,400 ÷ 800 = 3.0 m²."},
{q:"If the UWS shows a large difference…",opts:["Do not load until the cause is found","Load it anyway","Change the figures","Just move it to the next flight"],a:0,exp:"It affects balance and safety."},
{q:"What is a CCA?",opts:["Origin correcting and resending wrong electronic data","Cargo insurance","ULD repair","DG declaration"],a:0,exp:"It prevents customs holds at destination."}],
next:"6-3 Import cargo: from preparation to delivery"});
set("6-3",{title:"Import Cargo: From Pre-arrival Preparation to Delivery",hl:"import cargo",subtitle:"Prepare special cargo from origin messages and pre-alerts; on arrival check documents and ULDs; notify, store, verify identity and deliver. Plus the flow of status messages",
lead:["Import work starts before the aircraft lands. Messages and pre-alerts from origin reveal chilled cargo, live animals or dangerous goods, so space and staff can be prepared.","On arrival, collect the documents, check the ULDs and record anything wrong. Then notify the consignee, verify identity and deliver. This lesson covers the flow, time standards and status messages."],
sections:[
{h:"Before arrival",blocks:[{t:"check",items:[
{name:"Read the messages",x:"Pick out special cargo from origin’s CPM (container and pallet positions), LDM (load) and FFM (cargo manifest)."},
{name:"Work orders and pre-alerts",x:"Check handling instructions and priorities from origin and shipper requests."},
{name:"Storage",x:"Prepare space and staff for chilled or frozen goods, live animals, dangerous goods and valuables."},
{name:"Quarantine documents",x:"Confirm required plant, animal and food documents have come from origin."}]}]},
{h:"On arrival",blocks:[{t:"rows",items:[
{name:"Documents",x:"Collect the pouch from the senior cabin crew or ground staff immediately; never leave it unattended."},
{name:"ULD condition",x:"Check ULDs on the ramp for damage, wetness and loose nets."},
{name:"Irregularity reports (IRR)",x:"Record damage, shortages, overages and label errors found during breakdown and report to the airline (4-3)."},
{name:"Storage",x:"Store in the designated bonded area, with special cargo kept appropriately against damage or theft; report damaged cargo to customs and hold it."}]}]},
{h:"Time to delivery (example)",blocks:[{t:"table",cols:["Task","Time after arrival (example)"],rows:[
["Arrival notice to the consignee","Within 60 minutes"],
["Available for release (express, perishables, intact ULDs)","120 minutes"],
["Available for release (general, loose)","240 minutes"],
["Transfer handover (intact ULD)","120 minutes"],
["Flight close in the system","180 minutes"]]},
{t:"note",x:"* Times are examples from a handling SLA (7-5)."}]},
{h:"Delivery",blocks:[{t:"check",items:[
{name:"Temperature-controlled cargo",x:"Confirm storage needs with the shipper; without a reply, judge from the cargo, AWB, FFM and pre-alert."},
{name:"Identity",x:"Verify the collector’s identity and obtain a signature."},
{name:"Charges",x:"Calculate and collect charges-collect amounts."},
{name:"Uncollected cargo",x:"After a set period (e.g. 30 days), update the status and contact the shipper or agent."}]}]},
{h:"Status messages (examples)",blocks:[{t:"table",cols:["Code","Meaning","Where"],rows:[
["RCS","Received from shipper","Origin warehouse"],["MAN","Manifested","Before departure"],["DEP","Departed","Origin"],["ARR","Arrived","Destination"],["RCF","Received from flight","Destination warehouse"],["NFD","Consignee notified","Destination"],["DLV","Delivered","Destination"]]},
{t:"note",x:"* Status is sent in FSU messages so shippers and forwarders can track shipments."}]}],
voice:"On days when perishables arrived, we checked the quantities from the origin’s messages and secured cold storage and staff the day before. Notifying consignees of arrival earlier cut the quality problems caused by late collection.",
terms:[["Pre-alert","事前連絡","사전 통지"],["Irregularity Report (IRR)","異常の報告","이상 보고"],["Arrival Notice (NFD)","到着の通知","도착 통지"],["Freight Status Update (FSU)","状態のメッセージ","상태 메시지"],["Delivery (DLV)","引き渡し","인도"]],
quiz:[{q:"Which messages reveal special cargo before arrival?",opts:["CPM, LDM, FFM","NOTAM","METAR","PNL"],a:0,exp:"Position, load and manifest messages."},
{q:"What must always be done at delivery?",opts:["Verify the collector’s identity and get a signature","Only take photos","Tell them verbally","Nothing"],a:0,exp:"It prevents wrong deliveries."},
{q:"Which status code means the consignee has been notified?",opts:["RCS","DEP","NFD","MAN"],a:2,exp:"Notified for delivery."}],
next:"6-4 Transfer cargo"});
set("6-4",{title:"Transfer Cargo: Intact ULD or Rebuild?",hl:"transfer cargo",subtitle:"To or from other airlines’ flights: connecting times, checks on receipt, unbooked cargo and dangerous goods, security records and re-screening",
lead:["Transfer cargo links two flights in a short time. Delays miss connections; skipped checks carry security or dangerous-goods problems straight onto the next flight.","This lesson covers the two forms, intact ULD or rebuild, checks when receiving from other airlines, and security records and re-screening under Korean and Japanese rules."],
sections:[
{h:"Two forms",blocks:[{t:"table",cols:["Form","What happens","Time (example)"],rows:[
["Intact ULD (thru)","The ULD built at origin goes straight to the connection","90 minutes before the connection"],
["Rebuild","The ULD is broken down and rebuilt for the connection","180–240 minutes before the connection"],
["Loose handover","Pieces handed individually to another airline","As agreed with the other airline"]]},
{t:"note",x:"* Where terminals differ, hand over cargo and documents quickly to suit the other airline’s schedule."}]},
{h:"Checks on receipt",blocks:[{t:"check",items:[
{name:"Booking",x:"Unbooked interline cargo is normally refused, except company-defined urgent items such as AOG parts, organs or blood."},
{name:"Condition",x:"Check every piece for damage and labels; refuse damage that cannot be fixed and accept after repair."},
{name:"Data",x:"Confirm FWB and FHL data has been received."},
{name:"Documents",x:"Check whether security or quarantine documents are needed for the destination or cargo type."},
{name:"Dangerous goods",x:"Transfer DG is usually refused without company approval (with some exceptions, e.g. certain lithium batteries) (7-3)."}]}]},
{h:"Security records and re-screening",blocks:[{t:"table",cols:["","Korea","Japan"],rows:[
["Basis","Aviation Security Act Art. 17-4(3): even cargo screened by a known consignor must be screened by the carrier when moved from a freighter to a passenger aircraft, among other cases","Transfer cargo from other countries is limited to cargo whose security at origin or transit is confirmed by written or electronic records (aviation security standards)"],
["Company add-on (example)","X-ray re-screening of all transfer cargo","Re-screen if records cannot be confirmed"]]},
{t:"point",x:"Transfer security depends on an unbroken record of checks at the previous airport. If the record breaks, re-check before loading (7-1)."}]}],
voice:"For transfer cargo with a short connection, we shared the position of the inbound ULDs with the handling agent in advance. Deciding beforehand whether a ULD would go through intact or be rebuilt meant we almost never missed a connection.",
terms:[["Transfer Cargo","環積（乗り継ぎ）の貨物","환적 화물"],["Thru Unit (Intact BUP)","ULDのまま","스루(ULD 그대로)"],["Minimum Connecting Time (MCT)","最小の乗り継ぎ時間","최소 연결 시간"],["Aircraft on Ground (AOG)","緊急の部品","긴급 부품"],["Interline","他社との連帯の輸送","인터라인"]],
quiz:[{q:"Which needs more time before the connection?",opts:["Intact ULD","Rebuild","The same","Neither"],a:1,exp:"Breaking down and rebuilding takes time."},
{q:"Under Korea’s Aviation Security Act, when must the carrier screen known-consignor cargo?",opts:["When moved from a freighter to a passenger aircraft","On rainy days","On night flights","For light cargo"],a:0,exp:"Art. 17-4(3)5."},
{q:"Unbooked interline transfer cargo is…",opts:["Normally refused (urgent items excepted)","Always accepted","Always refused","Charged double"],a:0,exp:"The company defines exceptions."}],
next:"7-1 Cargo security in Korea and Japan: KS/RA and known consignors"});
})(window.ARTS);
