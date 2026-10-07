/* 航空機と整備 Part 5 — English version (5-1〜5-3) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("5-1",{title:"When an AOG Happens: Decisions in the First Hour",hl:"AOG",subtitle:"Can it depart under the MEL, can it be fixed on the spot, is there another aircraft? Who decides, what the station prepares in parallel, and how long you can wait",
lead:["AOG (aircraft on ground) means an aircraft that cannot fly because of a defect. It may be found on the pre-departure check or only after arrival.","What is decided and started in the first hour largely determines the delay and cost that follow. Maintenance and dispatch make the decisions, but the station starts preparing in parallel so that it is ready whichever path is taken."],
sections:[
{h:"The decision flow",blocks:[{t:"fig",id:"mnt_aog",cap:"Animated figure: three questions light up in turn: can it depart under the MEL, can it be fixed at this airport, is another aircraft or another carrier’s flight available? “Yes” leads to the result on the right; “No” to the next question, ending in cancellation."}]},
{h:"What to establish in the first hour",blocks:[{t:"table",cols:["What to find out","Who to ask"],rows:[
["The defect and the MEL item","Contract engineer, MCC"],
["Repair time and where the part is","MCC"],
["Crew duty limits","Dispatch, crew scheduling"],
["Airport operating hours and night restrictions","Airport, dispatch"],
["Replacement aircraft, seats on other carriers","Dispatch, head-office reservations"]]},
{t:"point",warn:true,x:"Pushing back the estimate again and again makes passengers angrier. If you do not know when the repair will finish, promise when the next update will be (“next update at …”)."}]},
{h:"What the station prepares in parallel",blocks:[{t:"check",items:[
{name:"Gate and announcements",x:"If boarding has not started, hold it and make the first announcement; if passengers are on board, agree with the captain whether to disembark them"},
{name:"Receiving parts",x:"If a part is coming, alert the customs broker and arrange airside delivery (4-2)"},
{name:"Preparing for cancellation",x:"Provisionally hold hotel rooms, buses and seats on next-day flights (5-3)"},
{name:"Records",x:"Log times and decisions in order, for later reports and compensation decisions"}]}]}],
voice:"When the first AOG call comes, ask three things: when it might be fixed, the crew’s duty limit and when the airport closes. Those three mostly decide whether it flies tonight.",
terms:[["Aircraft on Ground (AOG)","AOG（飛べない機体）","AOG(운항 불가 기체)"],["Aircraft swap","機材の交換","기재 교체"],["Rebooking","振り替え","대체 수송"],["Flight duty limit","勤務時間の上限","근무시간 상한"],["Cancellation","欠航","결항"]],
quiz:[{q:"What is the first question in an AOG decision?",opts:["Whether to book hotels","Whether it can depart under the MEL","Whether to refund fares","Whether to change crew"],a:1,exp:"First check whether it can depart under the MEL; if not, ask whether it can be fixed on the spot or replaced."},
{q:"What sets the limit on how long you can wait?",opts:["Number of passengers","Crew duty limits and airport operating hours","Weather alone","Fares"],a:1,exp:"Crew duty limits and airport operating hours (such as night restrictions) set the limit."},
{q:"What should you announce if the repair time is unknown?",opts:["Nothing","A guessed time","When the next update will be","Cancellation at once"],a:2,exp:"Rather than repeatedly moving the estimate, promise when you will update passengers next."}],
next:"5-2 Sending Parts and People"});
set("5-2",{title:"Sending Parts and People: Ordering, Transport, Customs and Go-teams",hl:"Parts and People",subtitle:"Where parts come from, how long they take, urgent transport options, customs, and preparing to send engineers and tools",
lead:["When an AOG cannot be fixed locally, where parts and people come from and how they travel decide how soon the aircraft flies again.","Head-office maintenance (MCC and the parts department) orders the parts, but getting them from arrival onto the aircraft is the station’s job."],
sections:[
{h:"How long parts take",blocks:[{t:"fig",id:"mnt_parts",cap:"Animated figure: bars grow to show typical times for parts from consignment stock, own stock at a nearby airport, another airline, the next own flight from base, and the manufacturer’s parts centre. Times are examples."}]},
{h:"Where parts come from and how they travel",blocks:[{t:"rows",items:[
{name:"Borrowing",x:"Borrow from another airline flying the type, then return or buy the part"},
{name:"Pools",x:"Parts-sharing schemes between airlines, or a parts company’s stock"},
{name:"Own flights",x:"In the hold of the next own flight, or hand-carried by staff; often the fastest"},
{name:"Urgent freight",x:"Other carriers’ passenger holds or international express, marked AOG for priority handling"},
{name:"Large parts",x:"Engines and landing gear need freighters, dedicated flights or road transport"}]}]},
{h:"Sending people and tools",blocks:[{t:"check",items:[
{name:"Entry requirements",x:"Check visa and stay conditions for engineers to work; they may apply even for short stays ★"},
{name:"Bringing in tools",x:"Check customs procedures for special tools (temporary import documents and so on) with the broker ★"},
{name:"Airside access",x:"Temporary passes and escorts for the restricted area"},
{name:"Accommodation and transport",x:"Hotels and cars to the airport; relief staff for all-night work"}]},
{t:"point",x:"Tell the customs broker, contractor and handler the part’s flight, arrival time and air waybill number at the same moment. If any one of them does not know, the part stops there."}]}],
voice:"AOG parts often lose time on the “last kilometre” from arrival to the aircraft. Walk the route from customs to the aircraft side once in advance and you will not get lost on the night.",
terms:[["Parts borrowing","部品の融通","부품 융통"],["Parts pool","共同の在庫","공동 재고"],["Hand carry","手で運ぶ","핸드 캐리"],["Temporary import","一時輸入","일시 수입"],["Maintenance go-team","出張整備","출장 정비"]],
quiz:[{q:"What is often the fastest source?",opts:["Express from the manufacturer’s parts centre","Consignment stock at the airport","Sea freight","Post"],a:1,exp:"If the part is in consignment stock at the airport, it can be used straight away."},
{q:"What must be checked when sending engineers abroad?",opts:["Visa and stay conditions and bringing in tools","Fare tables","In-flight meals","Seat colours"],a:0,exp:"Check entry conditions for working and the customs procedure for tools."},
{q:"Who should be told the part’s flight and arrival time?",opts:["Only the customs broker","The broker, contractor and handler at the same time","Only passengers","Nobody"],a:1,exp:"Unless everyone involved hears at once, the part stalls with whoever did not know."}],
next:"5-3 Passengers and Rebooking"});
set("5-3",{title:"Passengers and Rebooking: Long Delays and the Night of a Cancellation",hl:"Passengers and Rebooking",subtitle:"A night-time AOG hour by hour, when to cancel, hotels, rebooking and compensation, and reporting to head office",
lead:["As an AOG drags on, a maintenance problem becomes a passenger problem. When to decide what, how to inform passengers, where they will stay and which flights they will take: from here on, this is the station’s biggest job.","Using a night-time AOG as an example, this lesson sets out the timeline and the rules for looking after passengers."],
sections:[
{h:"A night-time AOG (example)",blocks:[{t:"fig",id:"mnt_aogday",cap:"Animated figure: from a defect found at 18:30, through the cancellation decision, the part arriving and being fitted next morning, to departure as an extra flight and the report. A hypothetical example."}]},
{h:"When to cancel",blocks:[{t:"rows",items:[
{name:"Repair estimate",x:"No estimate, or it runs past the airport’s closing time"},
{name:"Crew",x:"Duty limits would be exceeded and no replacement crew can come"},
{name:"Passengers",x:"Waiting on board or at the gate would be too long; connections are badly affected"},
{name:"Next day",x:"If the next day’s aircraft plan falls apart, decide early and rebuild the whole plan"}]}]},
{h:"Looking after passengers",blocks:[{t:"table",cols:["","What to do"],rows:[
["Information","The reason (aircraft maintenance), the next update time, and choices (wait, rebook, refund)"],
["Food and drink","Meal vouchers and the like according to waiting time (company rules)"],
["Hotels and transport","Arranged under company rules when cancelled; book early as rooms are scarce at night"],
["Rebooking","Next-day own flights or other carriers; passengers with connections first"],
["Compensation","Technical delays are usually treated as the airline’s responsibility, unlike weather. Korea sets guidelines for compensating international delays (a share of the fare and so on) ★; Japan follows the conditions of carriage ★"]]},
{t:"point",warn:true,x:"Saying it is “for maintenance” matters, but do not describe or guess at the fault. State plainly that the flight is not departing for safety reasons."}]},
{h:"Afterwards",blocks:[{t:"check",items:[
{name:"Timeline report",x:"Report the times of discovery, decisions, announcements and arrangements to head office"},
{name:"Costs",x:"Total hotels, meals, rebooking and parts transport, and split them with maintenance"},
{name:"Review",x:"Feed improvements in parts stock, contact order or contractor arrangements into the maintenance arrangement list (4-2)"}]}]}],
voice:"On a cancellation night, what matters most is that passengers know what happens next. Even when nothing is decided, saying “we will update you at …” makes the wait much easier to bear.",
terms:[["Cancellation","欠航","결항"],["Rebooking","振り替え","대체 수송"],["Refund","払い戻し","환불"],["Conditions of carriage","運送約款","운송약관"],["Extra flight","臨時の便","임시편"]],
quiz:[{q:"When is it better to cancel early?",opts:["When the next day’s aircraft plan would fall apart","When the weather is good","When there are few passengers","When fares are high"],a:0,exp:"If the next day’s plan would collapse too, deciding early and rebuilding the plan limits the impact."},
{q:"What should you not tell passengers?",opts:["That the delay is for maintenance","The next update time","Guesses about the fault","Their choices"],a:2,exp:"Give the reason and the next update, but do not speculate about the fault."},
{q:"Who should be rebooked first?",opts:["Passengers with connections","Whoever queued last","Passengers with most bags","Only families with children"],a:0,exp:"Passengers whose connections are badly affected are rebooked first."}],
next:"Part 6 Licences and Careers: 6-1 Engineer Licences"});
})(window.ARTS);
