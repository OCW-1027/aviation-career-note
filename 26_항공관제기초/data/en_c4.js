/* 航空管制の基礎 4-1・4-2 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("4-1",{title:"Air Traffic Flow Management and Departure Times: Wait on the Ground, Not in the Air",hl:"ATFM",subtitle:"When demand exceeds airport or airspace capacity because of congestion or bad weather: ATFM, which holds flights on the ground with assigned departure times, and A-CDM, where airport partners share times, compared across four regions",
lead:["When thunderstorms arrive at a busy evening peak, the number of aircraft that can land (capacity) drops sharply. If flights keep departing as planned, many will hold over the destination, wasting fuel and time.","Air traffic flow management (ATFM) instead holds flights on the ground before departure, matching arrivals to capacity. This lesson covers how it works, the names used for departure times, and A-CDM, where airport partners share target times."],
sections:[
{h:"Wait on the ground, not in the air",blocks:[{t:"fig",id:"atcb_atfm",cap:"Animated figure: flights in hours over capacity are given departure times that move the excess to later hours, reducing airborne holding, fuel burn and delay."},
{t:"p",x:"ATFM compares demand with capacity. Demand is the number of flights wanting to operate, known from flight plans; capacity is the number a runway or airspace can safely accept. When weather, equipment or controller numbers reduce capacity, departure times are adjusted to smooth demand."}]},
{h:"Key terms",blocks:[{t:"table",cols:["Term","Meaning"],rows:[
["Capacity","The number of aircraft that can safely be accepted per hour (per runway or airspace)"],
["EDCT","Expect departure clearance time (Japan, the US and others): the target time to leave the gate"],
["CTOT","Calculated take-off time (Europe and others): take off within a set window (e.g. −5 to +10 minutes)"],
["Ground delay programme (GDP)","When destination capacity drops, flights are delayed individually at their departure airports (US)"],
["Ground stop","Departures to a particular destination are temporarily halted (US)"]]}]},
{h:"Airport partners sharing times (A-CDM)",blocks:[{t:"rows",items:[
{name:"What A-CDM is",x:"Airlines, ground handlers, the airport and ATC share the same target times to set the departure order (Airport Collaborative Decision Making)"},
{name:"TOBT",x:"Target off-block time, set by the airline: when the aircraft will be ready, doors closed and ready for pushback"},
{name:"TSAT",x:"Target start-up approval time, set by ATC and others: when start-up and pushback will be approved, reducing taxiway queues"},
{name:"Benefits",x:"Shorter taxiway queues, less fuel and emissions, and earlier awareness of destination congestion"}]},
{t:"point",x:"Keeping to the TOBT is teamwork on the ground. If boarding, cargo or fuelling runs late, the TOBT changes, and so do the TSAT and the order."}]},
{h:"Comparing four regions",blocks:[{t:"table",cols:["Item","Korea","Japan","USA","Europe"],rows:[
["Flow management unit","Air Traffic Flow Management Center","Air Traffic Management Center (Fukuoka)","Air Traffic Control System Command Center (ATCSCC)","EUROCONTROL Network Manager"],
["Name for departure times","Assigned departure times","EDCT","EDCT (GDP and others)","CTOT (slot)"],
["Airport collaboration","A-CDM at Incheon and elsewhere","A-CDM being introduced at major airports","Surface flow management (TFDM and others)","A-CDM at more than 30 airports"],
["Cross-border coordination","Harmonising North-East Asian ATFM with Japan, China and others","Same","Coordination with Canada, Mexico and others","The Network Manager covers the whole of Europe"]]},
{t:"note",x:"These are typical examples. Check each country’s AIP (ENR 1.9, air traffic flow management) and aviation authority for exact names and scope."}]},
{h:"How this differs from slots",blocks:[{t:"rows",items:[
{name:"Airport slots",x:"Seasonal permissions to use an airport at a given time (course “Aviation Fundamentals” 2-1)"},
{name:"ATFM times",x:"Departure or take-off times set on the day according to weather and congestion"},
{name:"Both apply",x:"Even if planned to the slot, a flight can still be delayed on the day by an ATFM time"}]}]},
{h:"Links to your work",blocks:[{t:"check",items:[
{name:"Informing passengers",x:"Knowing it is “an assigned departure time due to congestion or weather at the destination” makes it easier to explain the expected wait"},
{name:"Boarding times",x:"When an EDCT or CTOT is issued, adjust boarding start and door-close times"},
{name:"Crew duty time",x:"Long delays can hit crew duty limits; talk to dispatch early"}]}]},
{h:"References",blocks:[{t:"note",x:"This lesson is this site’s own summary of public sources and others. Check the originals for accurate details."},
{t:"link",href:"https://www.fly.faa.gov/",x:"FAA: National Airspace System Status (US flow information on the day)"}]}],
voice:"An assigned departure time is a promise not to keep you waiting in the air. Waiting on the ground is far safer and cheaper than holding aloft, and explaining that usually helps passengers accept the delay.",
terms:[["Air Traffic Flow Management (ATFM)","交通流管理","교통흐름관리"],["Capacity","容量","수용량"],["EDCT","指定出発時刻","지정 출발 시각"],["CTOT","計算離陸時刻","계산 이륙 시각"],["A-CDM","空港協調的意思決定","공항 협력적 의사결정"],["TOBT","出発準備完了目標時刻","출발 준비 완료 목표 시각"]],
quiz:[{q:"Where does ATFM hold flights?",opts:["Over the destination","On the ground at the departure airport","Over the ocean","On the runway"],a:1,exp:"Waiting on the ground before departure is safer and cheaper than waiting in the air."},
{q:"What is the European “calculated take-off time” called?",opts:["EDCT","CTOT","TOBT","ETA"],a:1,exp:"CTOT; Japan and the US usually use EDCT."},
{q:"Who sets the TOBT in A-CDM?",opts:["ATC","The airline","The weather office","Airport security"],a:1,exp:"It is the time the aircraft will be ready, so the airline sets it."}],
next:"4-2 Arrival sequencing and descent: AMAN, DMAN and continuous descent"});
set("4-2",{title:"Arrival Sequencing and Descent: AMAN, DMAN and Continuous Descent",hl:"Arrival sequencing",subtitle:"AMAN, which builds the arrival order from far out; DMAN, which organises departures; holding; and CDO, a continuous descent at low thrust",
lead:["At a busy airport, arrivals from every direction must be merged neatly into a single line on final approach. Holding near the airport used to be the normal way to do this; now calculating arrival times far out and adjusting speeds is spreading.","This lesson covers arrival and departure sequencing, how holding works, and continuous descent operations (CDO), which reduce fuel and noise."],
sections:[
{h:"Arrival sequencing and continuous descent",blocks:[{t:"fig",id:"atcb_cdo",cap:"Animated figure: top, a traditional step-down descent (grey) and a continuous descent at low thrust (blue). Bottom, AMAN calculating arrival times to build the sequence."}]},
{h:"Holding",blocks:[{t:"fig",id:"atc_hold",cap:"Animated figure: a holding pattern (racetrack shape). In congestion or bad weather, aircraft circle at a set point while waiting their turn."},
{t:"note",x:"Holding is safe but burns fuel and adds noise, so the aim is to reduce it by adjusting speed far out or waiting on the ground (ATFM, lesson 4-1)."}]},
{h:"Tools that help sequencing",blocks:[{t:"table",cols:["Tool","What it does"],rows:[
["AMAN (arrival manager)","Calculates arrival times from far out and shows controllers how many minutes to gain or lose; extended forms work across borders (XMAN)"],
["DMAN (departure manager)","Sets the departure order and take-off times using wake spacing, departure routes and A-CDM times"],
["Point Merge","Arrivals fly an arc and are turned in turn towards a single point, reducing radar vectoring"],
["CDO (continuous descent)","Descend from cruise to final approach with as little level flight as possible, cutting fuel, CO2 and noise"],
["CCO (continuous climb)","Climb after departure to cruising level with as little level flight as possible"]]}]},
{h:"Comparing four regions",blocks:[{t:"table",cols:["Item","Korea","Japan","USA","Europe"],rows:[
["Arrival time management","Arrival management at busy airports, with coordination from further out","Under CARATS, time management using data link, and CDO","Time-Based Flow Management (TBFM) sets arrival times from far out","AMAN and cross-border XMAN"],
["CDO","At some airports and times","At some airports and times, with plans to expand","Optimised profile descents (OPD) at many airports","Expanded by states under the CCO/CDO action plan"]]},
{t:"note",x:"These are typical examples. Check each country’s AIP and aviation authority for exact scope."}]},
{h:"Links to your work",blocks:[{t:"check",items:[
{name:"Arrival times",x:"Holding at the destination delays arrival; review connections and ground staffing early"},
{name:"Fuel",x:"Where holding is expected, dispatch may decide to load extra fuel"},
{name:"Noise and communities",x:"CDO and new arrival routes are introduced together with explanations to local communities as noise measures"}]}]},
{h:"References",blocks:[{t:"note",x:"This lesson is this site’s own summary of public sources and others. Check the originals for accurate details."},
{t:"link",href:"https://www.eurocontrol.int/concept/point-merge",x:"EUROCONTROL: Point Merge"}]}],
voice:"When holding delays an arrival, ground staff are already helping connecting passengers. Understanding how sequencing works makes it easier to estimate “about how many more minutes”.",
terms:[["Arrival Manager (AMAN)","到着管理システム","도착관리시스템"],["Departure Manager (DMAN)","出発管理システム","출발관리시스템"],["Holding","待機","체공 대기"],["Continuous Descent Operations (CDO)","継続降下運航","연속강하운항"],["Continuous Climb Operations (CCO)","継続上昇運航","연속상승운항"],["Point Merge","ポイントマージ","포인트 머지"]],
quiz:[{q:"What does CDO improve?",opts:["More holding","Less fuel, CO2 and noise","Higher speed","More runways"],a:1,exp:"Because level flight is reduced and the descent is flown at low thrust."},
{q:"What does AMAN do?",opts:["Sets only the departure order","Calculates arrival times far out and shows how much to gain or lose","Forecasts weather","Assigns stands"],a:1,exp:"It organises the arrival order and times from far out."},
{q:"What is the drawback of holding?",opts:["It is dangerous","It burns fuel and adds noise","ATC cannot control it","Many airports cannot use it"],a:1,exp:"It is safe, but costly in fuel and noise."}],
next:"Part 5 What’s New — 5-1 Trajectory-based operations (TBO), SWIM and the new flight plan"});
})(window.ARTS);
