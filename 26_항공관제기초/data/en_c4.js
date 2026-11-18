/* 航空管制の基礎 4-1・4-2 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("4-1",{title:"Air Traffic Flow Management and Departure Times: Wait on the Ground, Not in the Air",hl:"ATFM",subtitle:"When destination congestion or bad weather pushes demand beyond airport or airspace capacity, ATFM holds flights on the ground with assigned departure times and A-CDM lets airport partners share operational times. This lesson compares both across Korea, Japan, the US and Europe",
lead:["When thunderstorms develop around an airport during the busy evening peak, the number of aircraft that can land (capacity) drops sharply. If flights keep departing as planned, many will end up holding over the destination, wasting fuel and time.","Air traffic flow management (ATFM) instead holds flights on the ground before departure, matching arrivals to capacity. This lesson covers how it works, the names used for assigned departure times in each region, and A-CDM, where airport partners share target times."],
sections:[
{h:"Wait on the ground, not in the air",blocks:[{t:"fig",id:"atcb_atfm",cap:"Animated figure: flights scheduled in hours when demand exceeds capacity are given departure times that move the excess into later hours, reducing airborne holding, fuel burn and delay."},
{t:"p",x:"ATFM balances demand against capacity. Demand is the number of flights wanting to operate, known from flight plans; capacity is the number a runway or airspace can safely accept. When weather, equipment status or controller staffing reduces capacity, departure times are adjusted to spread demand."}]},
{h:"Key terms",blocks:[{t:"table",cols:["Term","Meaning"],rows:[
["Capacity","The number of aircraft that can safely be accepted per hour (per runway or airspace)"],
["EDCT","Expect departure clearance time (Japan, the US and others): the assigned time on which a flight’s departure is based"],
["CTOT","Calculated take-off time (Europe and others): the aircraft must take off within a set tolerance window (e.g. −5 to +10 minutes)"],
["Ground delay programme (GDP)","When destination capacity drops, flights are delayed individually at their departure airports (US)"],
["Ground stop","Departures to a particular destination are temporarily halted (US)"]]}]},
{h:"Airport Collaborative Decision Making (A-CDM)",blocks:[{t:"rows",items:[
{name:"What A-CDM is",x:"Airlines, ground handlers, the airport operator and ATC share the same target times to set the departure order (Airport Collaborative Decision Making)"},
{name:"TOBT",x:"Target off-block time, set by the airline: the time at which the aircraft will be ready, with doors closed and ready for pushback"},
{name:"TSAT",x:"Target start-up approval time, set by ATC and others: the time at which start-up and pushback are expected to be approved, reducing taxiway queues"},
{name:"Benefits",x:"Shorter taxiway queues, less fuel and emissions, and earlier awareness of destination congestion"}]},
{t:"point",x:"Meeting the TOBT depends on teamwork on the ground. If boarding, cargo loading or fuelling runs late, the TOBT changes, and so do the TSAT and the departure sequence."}]},
{h:"Comparing four regions",blocks:[{t:"table",cols:["Item","Korea","Japan","US","Europe"],rows:[
["Flow management unit","Air Traffic Flow Management Center","Air Traffic Management Center (Fukuoka)","FAA Air Traffic Control System Command Center (ATCSCC)","EUROCONTROL Network Manager"],
["Term for assigned departure times","Assigned departure times","EDCT","EDCT (GDP and others)","CTOT (slot)"],
["Airport collaboration","A-CDM at Incheon and elsewhere","A-CDM being introduced at major airports","Surface traffic flow management (e.g. TFDM)","A-CDM at more than 30 airports"],
["Cross-border coordination","Harmonising North-East Asian ATFM with Japan, China and others","Harmonising North-East Asian ATFM with Korea, China and others","Coordination with Canada, Mexico and others","The Network Manager covers the whole of Europe"]]},
{t:"note",x:"These are typical examples. Check each country’s AIP (ENR 1.9 Air Traffic Flow Management) and aviation authority notices for exact names and scope."}]},
{h:"ATFM times versus airport slots",blocks:[{t:"rows",items:[
{name:"Airport slots",x:"Seasonally allocated permission to use an airport at a given time (see the “Aviation Fundamentals” course, lesson 2-1)"},
{name:"ATFM times",x:"Departure or take-off times set on the day according to weather and congestion"},
{name:"Both apply",x:"Even when a flight is planned to its slot time, it can still be delayed on the day by an ATFM time"}]}]},
{h:"In practice",blocks:[{t:"check",items:[
{name:"Informing passengers",x:"Knowing that the delay is an assigned departure time caused by congestion or weather at the destination makes it easier to tell passengers how long they can expect to wait"},
{name:"Boarding times",x:"When an EDCT or CTOT is issued, adjust the boarding start and door-close times accordingly"},
{name:"Crew duty time",x:"Long delays may take crew beyond flight duty period limits; consult flight dispatch early"}]}]},
{h:"References",blocks:[{t:"note",x:"This lesson is this site’s own summary based on publicly available sources. Check the original sources for accurate details."},
{t:"link",href:"https://www.fly.faa.gov/",x:"FAA: National Airspace System Status (same-day US traffic flow information)"}]}],
voice:"An assigned departure time is a promise that you will not be kept waiting in the air. Waiting on the ground is far safer and cheaper than holding aloft, and explaining this to passengers usually helps them accept the delay.",
terms:[["Air Traffic Flow Management (ATFM)","交通流管理","교통흐름관리"],["Capacity","容量","수용량"],["EDCT","指定出発時刻","지정 출발 시각"],["CTOT","計算離陸時刻","계산된 이륙 시각"],["A-CDM","空港協調的意思決定","공항 협력적 의사결정"],["TOBT","出発準備完了目標時刻","출발 준비 완료 목표 시각"]],
quiz:[{q:"Where does ATFM hold flights?",opts:["Over the destination","On the ground at the departure airport","Over the ocean","On the runway"],a:1,exp:"Waiting on the ground before departure is safer and cheaper than waiting in the air."},
{q:"What is the “calculated take-off time” used in Europe called?",opts:["EDCT","CTOT","TOBT","ETA"],a:1,exp:"CTOT. Japan and the US generally use EDCT."},
{q:"Who sets the TOBT in A-CDM?",opts:["ATC","The airline","The weather office","Airport security"],a:1,exp:"It is the time the aircraft will be ready, so the airline sets it."}],
next:"4-2 Arrival sequencing and descent: AMAN, DMAN and continuous descent operations (CDO)"});
set("4-2",{title:"Arrival and Departure Sequencing and Continuous Descent: AMAN, DMAN and CDO",hl:"Arrival sequencing",subtitle:"AMAN, which calculates arrival times from far out to build the sequence; DMAN, which organises departures; holding; and CDO, a continuous descent at reduced thrust",
lead:["At a busy airport, arrivals from every direction must be merged into a single stream on final approach. In the past this was usually done by holding aircraft near the airport; today it is increasingly done by calculating arrival times while aircraft are still far out and adjusting their speeds.","This lesson covers arrival and departure sequencing, how holding works, and continuous descent operations (CDO), which reduce fuel and noise."],
sections:[
{h:"Arrival sequencing and continuous descent",blocks:[{t:"fig",id:"atcb_cdo",cap:"Animated figure: Top: a traditional step-down descent (grey) and a continuous descent at reduced thrust (blue). Bottom: AMAN calculating arrival times to build the sequence."}]},
{h:"Holding",blocks:[{t:"fig",id:"atc_hold",cap:"Animated figure: a holding pattern (racetrack). During congestion or bad weather, aircraft fly the pattern over a set point while waiting their turn."},
{t:"note",x:"Holding is safe but burns fuel and adds noise, so the aim is to reduce it by adjusting speed as far out as possible or by holding aircraft on the ground (ATFM, lesson 4-1)."}]},
{h:"Sequencing tools and techniques",blocks:[{t:"table",cols:["Tool or technique","What it does"],rows:[
["AMAN (arrival manager)","Calculates arrival times from far out and shows controllers how many minutes each flight should gain or lose; an extended form (XMAN) works across borders, starting further out"],
["DMAN (departure manager)","Sets the departure order and take-off times based on wake turbulence separation, departure routes and A-CDM times"],
["Point Merge","Arrivals fly along arc-shaped legs and are turned one by one towards a single merge point, reducing radar vectoring"],
["CDO (continuous descent)","Descent from cruising level to final approach with as little level flight as possible, cutting fuel burn, CO2 and noise"],
["CCO (continuous climb)","Climb from take-off to cruising level with as little level flight as possible"]]}]},
{h:"Comparing four regions",blocks:[{t:"table",cols:["Item","Korea","Japan","USA","Europe"],rows:[
["Arrival time management","Arrival management systems at busy airports; coordination from further out being developed","Under CARATS, data-link-based time management and CDO being promoted","Time-Based Flow Management (TBFM) sets arrival times from far out","AMAN and cross-border XMAN"],
["CDO","At some airports and times","At some airports and times, with plans to expand","Optimised profile descents (OPD) at many airports","Being expanded by individual states under the CCO/CDO Action Plan"]]},
{t:"note",x:"These are typical examples. Check each country’s AIP and aviation authority announcements for the exact scope."}]},
{h:"Relevance to your work",blocks:[{t:"check",items:[
{name:"Arrival times",x:"Holding at the destination delays the estimated arrival time; review connections and ground staff and equipment deployment early"},
{name:"Fuel",x:"On flights to airports where holding is expected, the flight dispatcher decides whether to load extra fuel"},
{name:"Noise and communities",x:"CDO and new arrival routes are introduced as noise-abatement measures, together with engagement with local communities"}]}]},
{h:"References",blocks:[{t:"note",x:"This lesson is this site’s own summary based on publicly available sources and other material. Check the original sources for accurate details."},
{t:"link",href:"https://www.eurocontrol.int/concept/point-merge",x:"EUROCONTROL: Point Merge"}]}],
voice:"When holding delays an arrival, ground staff are already looking after connecting passengers. Understanding how the arrival sequence is built makes it much easier to estimate roughly how many more minutes it will be.",
terms:[["Arrival Manager (AMAN)","到着管理システム","도착관리시스템"],["Departure Manager (DMAN)","出発管理システム","출발관리시스템"],["Holding","待機","체공 대기"],["Continuous Descent Operations (CDO)","継続降下運航","연속강하운항"],["Continuous Climb Operations (CCO)","継続上昇運航","연속상승운항"],["Point Merge","ポイントマージ","포인트 머지"]],
quiz:[{q:"What is a benefit of CDO?",opts:["More holding","Lower fuel burn, CO2 and noise","Higher speed","More runways"],a:1,exp:"Level flight is minimised and the descent is flown at reduced thrust."},
{q:"What does AMAN do?",opts:["Sets only the departure order","Calculates arrival times far out and shows how much to gain or lose","Forecasts weather","Assigns stands"],a:1,exp:"It organises the arrival order and times from far out."},
{q:"What is the drawback of holding?",opts:["It is dangerous","It burns fuel and adds noise","ATC cannot control it","Many airports cannot use it"],a:1,exp:"It is safe, but costly in fuel and noise."}],
next:"Part 5 Latest Developments — 5-1 Trajectory-based operations (TBO), SWIM and the new flight plan"});
})(window.ARTS);
