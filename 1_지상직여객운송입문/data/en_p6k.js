/* 旅客運送の実務 6-9 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("6-9",{title:"Writing the Station’s Monthly KPI Report: Figures, Reasons and Actions on One Page",hl:"monthly KPI report",subtitle:"Punctuality, baggage, safety, customers and cost. Laid out the same way every month, the report shows how the station is changing",
lead:["The monthly report goes to head office, but it is also the station’s own check-up. Put the same indicators in the same format every month and you can see what is improving, what is slipping and where to act.","This article covers the report’s structure, how the main indicators are calculated, a worked example with fictional figures, and how to write a report people actually read."],
sections:[
{h:"Structure of the report (example)",blocks:[{t:"table",cols:["Section","Main content"],rows:[
["1 Operations","Flights operated, cancellations and extra flights, aircraft changes"],
["2 Punctuality","Departure and arrival on-time rates (D0, D15); ground-caused delays and the main delay codes"],
["3 Passengers","Passengers and load factor, no-shows, denied boarding (overbooking)"],
["4 Baggage","Mishandled baggage count and rate (delayed, damaged)"],
["5 Safety and security","Safety reports, loading errors, dangerous goods events, ramp incidents"],
["6 Customer feedback","Complaints and compliments, with the main themes"],
["7 Cost","Budget versus actual, cost per flight (6-8)"],
["8 Training and audits","Staff with expired training, progress on audit findings"],
["9 Next month","Extra flights, seasonal peaks, events and priorities"]]},
{t:"point",x:"Put a three-line conclusion on the first page — what went well, the issues, next month’s actions — with tables and charts after it. Busy readers get the message."}]},
{h:"How the main indicators are calculated (example)",blocks:[{t:"table",cols:["Indicator","Calculation","What to look at"],rows:[
["Departure on-time rate (D15)","Flights departing within 15 minutes of schedule ÷ flights operated","Look at D0 (on the minute) as well (Station Operations 1-2)"],
["Ground-caused delays","Delays caused by the station or handler","Delay codes 11–19, 31–39 and so on; the top three causes"],
["Load factor","Passengers ÷ seats offered","Differences by route and weekday"],
["Mishandled baggage rate","Cases ÷ passengers × 1,000","Separate delayed and damaged bags"],
["Complaint rate","Complaints ÷ passengers × 10,000","Group by theme: information, waiting, baggage"],
["Cost per flight","Total cost ÷ flights operated","Variance from budget and why"]]},
{t:"note",x:"* Definitions, denominators and targets differ by airline. Follow your head office’s definitions. ★"}]},
{h:"Worked example (fictional station, fictional figures)",blocks:[{t:"table",cols:["Item","This month","Last month","Comment"],rows:[
["Flights operated","60 (62 planned; 2 cancelled for a typhoon)","62","Both cancelled flights re-operated next day"],
["Departure on-time rate (D15)","91.7% (55/60)","95.2%","Of 5 late flights, 2 ground-caused (15: boarding, 18: baggage)"],
["Passengers and load factor","9,840 / 82%","9,120 / 78%","Up for the holiday period"],
["Mishandled baggage rate","0.91 (9: 6 delayed, 3 damaged)","0.66","The 6 delayed bags missed transfer connections; cause under review with head office"],
["Safety reports","5 (4 near misses, 1 other)","3","No vehicle contacts; more reporting is a good sign"],
["Complaints and compliments","4 complaints, 3 compliments","2 and 1","3 complaints about slow information during the cancellation"],
["Cost vs budget","+3.2%","−0.8%","Extra work for the typhoon cancellations and re-operation"],
["Expired training","0","0","3 staff due recurrent training next month"]]},
{t:"rows",items:[
{name:"This month’s conclusion (example)",x:"Went well: the holiday peak ran without major delays. Issues: slow information during the typhoon cancellation; delayed transfer bags. Next month: reassign responsibility and wording for cancellation notices (5-8); review transfer connection times with head office."}]}]},
{h:"Writing a report people read",blocks:[{t:"check",items:[
{name:"Figure → reason → action",x:"Never list figures alone; always add the reason and next month’s action."},
{name:"Compare",x:"Against last month, the same month last year and the target; one month’s figure alone says little."},
{name:"Include good news",x:"Record and share good work by staff and the handler."},
{name:"Keep the format",x:"Do not change indicators or layout month to month; if you must, say why."},
{name:"Keep the sources",x:"Save where each figure came from (daily reports, delay codes, incident records) so you can show it when asked."}]}]},
{h:"Using the report",blocks:[{t:"rows",items:[
{name:"To head office",x:"Submit by the set deadline (month-end on the calendar, 6-6)."},
{name:"With the handler",x:"Use the same punctuality, baggage and safety pages as the monthly meeting pack (6-2)."},
{name:"Within the station",x:"Share results and actions with staff at briefings or on the notice board."}]}]}],
voice:"[Interview to be added] Spotting a trend in the monthly figures and acting early.",
terms:[["Monthly Report","月報","월간 보고"],["Key Performance Indicator (KPI)","重要業績評価指標","핵심성과지표"],["On-time Performance (OTP)","定時率","정시율"],["Mishandled Baggage Rate","手荷物事故率","수하물 사고율"],["Complaint Rate","苦情率","불만율"],["Year-on-year","前年同月比","전년 동월 대비"]],
quiz:[{q:"How is the mishandled baggage rate calculated (example)?",opts:["Cases ÷ passengers × 1,000","Cases ÷ flights","Passengers ÷ cases","Cases × 100"],a:0,exp:"Cases per 1,000 passengers."},
{q:"What belongs on the first page?",opts:["All the raw data","This month’s conclusion: what went well, issues, actions","The staff list","Last year’s report"],a:1,exp:"It gets the message across to busy readers."},
{q:"What matters most when presenting figures?",opts:["Figures alone","Figures with reasons and actions","Only good figures","A new format each month"],a:1,exp:"Reasons and actions turn figures into decisions."}],
next:"7-1 Working in ground operations in Japan: hiring routes and visas"});
})(window.ARTS);
