/* 運航管理の実務 Part 8 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("8-1",{title:"Diversions and Turn-backs: From the Decision to Ground Arrangements",hl:"diversion",subtitle:"When the destination is out of reach, where do you land? The captain decides, the dispatcher assembles the information, and the station supports the flight where it lands",
lead:["Sudden weather, a technical fault, a medical emergency, a closed runway: flights that cannot reach their destination as planned happen somewhere every day. The flight then either returns to its departure airport or heads for another (a diversion).","The captain makes the final decision, but the dispatcher assembles weather, runway, fuel and handling information for the candidate airports, and the station looks after passengers and aircraft wherever it lands. This lesson covers the decision factors and the flow from the event to the next departure."],
sections:[
{h:"Three forms",blocks:[{t:"table",cols:["Form","What it is","Common reasons"],rows:[
["Turn-back","Returning to the departure airport, including a ramp return during taxi","Technical faults, medical cases, passenger issues, security incidents"],
["Diversion","Changing destination and landing elsewhere","Destination weather, runway closure or airport curfew, fuel, medical cases"],
["Emergency landing","Landing without delay at the nearest suitable airport","Fire, rapid decompression, serious failures"]]}]},
{h:"Korean and Japanese rules",blocks:[{t:"table",cols:["","Korea","Japan"],rows:[
["When a fault occurs","FSR 8.1.4.1 c: if a mechanical, electrical or structural unairworthy condition arises, the flight is discontinued by the quickest practicable means","Detailed rules 10-1: actions of flight crew, cabin crew and dispatchers are set for engine failure, decompression and other failures, emergency landings, fire, crew incapacitation, hijacking, bomb threats and more"],
["When altitude cannot be held","—","Detailed rules 9: if the required altitude cannot be maintained, turn back or land at the nearest suitable aerodrome without delay"],
["Fuel","FSR 8.1.9.13: risk of landing below final reserve → MINIMUM FUEL and MAYDAY FUEL (Part 5, 5-3)","AIP ENR 1.5 and ATC procedures (same)"]]}]},
{h:"What the dispatcher checks",blocks:[{t:"check",items:[
{name:"Candidate airports",x:"Weather (forecast and actual), NOTAMs, runway length and condition, operating hours and night restrictions."},
{name:"Fuel",x:"Can the aircraft reach the airport and land with final reserve intact, allowing for holding?"},
{name:"Handling",x:"Are handling, fuel and ground power available? For international flights, can CIQ (customs, immigration, quarantine) accept the flight?"},
{name:"Working with the captain",x:"Pass information by company radio or datalink to support the captain’s decision, and record it."},
{name:"Afterwards",x:"A new flight plan and release for the onward flight, duty-time limits (Part 6), and whether aircraft or crew must be changed."}]}]},
{h:"From event to next departure (example)",blocks:[{t:"timeline",lanes:["Dispatch and captain","Station and ground"],marks:[
{time:"Decision",a:"Compare candidates; the captain chooses the diversion airport",b:"First notice to the station and handler there"},
{time:"Before landing",a:"New arrival time, fuel, outlook after landing",b:"Stand, ground power, fuel, CIQ and buses arranged"},
{time:"After landing",a:"Decide to continue or cancel from weather recovery and duty time",b:"Passenger information (stay on board or disembark), meals and water"},
{time:"Departure",a:"New flight plan and release",b:"Boarding, baggage and documents; if cancelled, hotels, rebooking and baggage return"}]},
{t:"point",x:"A diversion sets dispatch, station, handler, airport and CIQ moving all at once. Deciding who does what in the first 30 minutes greatly reduces confusion later (see also Course 1, Part 5 on irregular operations)."}]}],
voice:"",
terms:[["Diversion","ダイバート（目的地変更）","회항(목적지 변경)"],["Turn-back / Air Return","引き返し","되돌아가기(턴백)"],["Ramp Return","ランプリターン","램프 리턴"],["Emergency Landing","緊急着陸","비상 착륙"],["Diversion Airport","ダイバート先","다이버트 공항"]],
quiz:[{q:"Who makes the final decision on the diversion airport?",opts:["The station manager","The captain","The handling company","The airport operator"],a:1,exp:"The dispatcher supplies the information that supports the captain’s decision."},
{q:"When an international flight diverts, what must the station check in particular?",opts:["Duty-free hours","Whether CIQ can accept the flight","Shop crowds","Parking fees"],a:1,exp:"Without customs, immigration and quarantine, passengers may be unable to disembark."},
{q:"Under Korea’s FSR 8.1.4.1 c, what happens if an unairworthy condition arises?",opts:["Continue to destination","Discontinue the flight by the quickest practicable means","Report the next day","Leave it to the cabin crew"],a:1,exp:"The flight must be brought to an end promptly."}],
next:"8-2 EDTO"});
set("8-2",{title:"EDTO (Extended Diversion Time Operations): Korean and Japanese Standards",hl:"EDTO",subtitle:"Fly only routes where, with one engine out, an airport can be reached within a set time: threshold times, approval, and weather minima for en-route alternates",
lead:["Over oceans or remote areas, the distance to an airport where the aircraft could land becomes critical. If one engine of a twin fails, how far can it fly on the other? Operations based on this idea are EDTO, Extended Diversion Time Operations. They were formerly called ETOPS, a name Japan’s standard still uses.","This lesson sets Korean and Japanese definitions, threshold times, approval and en-route alternate selection side by side."],
sections:[
{h:"Key terms (Korea FSR 8.1.2)",blocks:[{t:"table",cols:["Term","Meaning"],rows:[
["EDTO","Operation where the diversion time to an en-route alternate exceeds the threshold time set by the State of the Operator"],
["Threshold time","The time beyond which EDTO approval is required"],
["Maximum diversion time","The maximum allowable distance, expressed in time, from a point on the route to an en-route alternate"],
["EDTO critical fuel","Fuel needed to reach an en-route alternate after the most limiting system failure at the most critical point"],
["EDTO-significant system","A system important to safe flight and landing during a diversion"],
["Point of no return (PNR)","The last point from which both the en-route alternate and the destination can be reached"]]}]},
{h:"Threshold times",blocks:[{t:"table",cols:["","Korea","Japan"],rows:[
["Basis","Aviation Safety Act Art. 74, Enforcement Rules Art. 215, FSR 8.4.4.3","Twin-engine long-range operations approval standard"],
["Twins","One hour at one-engine-inoperative cruise speed (60 min in the FSR)","ETOPS: routes with a point more than 60 min from an adequate airport at one-engine-inoperative cruise speed in still air"],
["Three or more engines","Three hours (180 min) at all-engines cruise speed; all-cargo aircraft with three or more engines excluded","(Standard covers twins)"],
["Exceptions","Charter twins with fewer than 20 seats and MTOW below 45,360 kg: three hours","Non-scheduled twins of MTOW 45,500 kg or less need no approval up to 180 min"]]}]},
{h:"Approval",blocks:[{t:"table",cols:["","Korea (Enforcement Rules Art. 215)","Japan"],rows:[
["Scope","By aircraft type (registration), route and maximum diversion time","Approval under the standard; operations beyond 180 min under a separate standard"],
["Deadline","In-service experience method (12+ months’ continuous operation of the type): 20 days before start / accelerated method (under 12 months or none): 180 days","Per the standard"],
["Dispatch requirements","FSR 8.4.4.4–8.4.4.5; Annexes 8.4.4.4 and 8.4.4.5","Beyond 180 min: the dispatcher notifies the crew that the flight departs under the standard and what to consider; capability and alternates are re-evaluated on entering the ETOPS area"]]}]},
{h:"En-route alternate weather (Korea 8.4.4.5)",blocks:[{t:"p",x:"From one hour before the earliest possible landing time to one hour after the latest, based on the planned departure time, the forecast must be at or above the following (or minima approved in the operations specifications)."},
{t:"table",cols:["Approaches available","Minimum (whichever is higher)"],rows:[
["One precision approach","Ceiling 600 ft and visibility 3,200 m, or the lowest minima plus 400 ft and 1,600 m"],
["Two or more precision approaches","Ceiling 400 ft and visibility 1,600 m, or the lowest minima plus 200 ft and 800 m"],
["Non-precision only","Ceiling 800 ft and visibility 3,200 m, or the lowest minima plus 400 ft and 1,600 m"]]}]},
{h:"Take-off alternates",blocks:[{t:"table",cols:["","Korea (8.4.4.2)","Japan (detailed rules 2-5(1)a①)"],rows:[
["When required","Departure weather below landing minima, or no return to the departure airport possible for other reasons","Same"],
["Distance (twins)","Within one hour at one-engine-inoperative cruise speed","Within one hour at one-engine-inoperative cruise speed"],
["Distance (three or more engines)","Within two hours at all-engines cruise speed","Within two hours"],
["EDTO-approved aircraft","Within the approved maximum diversion time at actual take-off weight","—"]]}]}],
voice:"",
terms:[["Extended Diversion Time Operations (EDTO)","回航時間延長運航","회항시간 연장운항"],["ETOPS","双発機による長距離進出運航","쌍발기 장거리 진출 운항"],["Threshold Time","基準の時間","기준시간"],["Maximum Diversion Time","最大回航時間","최대회항시간"],["EDTO Critical Fuel","EDTO臨界燃料","회항시간 연장운항 임계연료"],["Point of No Return (PNR)","帰還不能地点","귀환불능지점"]],
quiz:[{q:"Under Korea’s Enforcement Rules Art. 215, what is the threshold time for twins?",opts:["30 minutes","1 hour","2 hours","3 hours"],a:1,exp:"One hour at one-engine-inoperative cruise speed (with an exception for small charter aircraft)."},
{q:"In Korea, when must an EDTO application under the in-service experience method be filed?",opts:["20 days before operations start","90 days before","180 days before","One year before"],a:0,exp:"The accelerated method requires 180 days."},
{q:"Over what window is en-route alternate weather checked (Korea 8.4.4.5)?",opts:["At the planned landing time only","From 1 h before the earliest to 1 h after the latest possible landing","1 h either side of departure","24 hours"],a:1,exp:"The window covers a diversion at any point."}],
next:"8-3 Reading an EDTO flight plan (practice)"});
set("8-3",{title:"Reading an EDTO Flight Plan (Practice): Entry Point, Equal Time Point and Critical Fuel",hl:"EDTO flight plan",subtitle:"Where the EDTO area begins, where the alternate changes, and whether there is fuel to land whatever happens there, checked on a fictitious oceanic route",
lead:["An EDTO flight plan adds one question to the normal fuel calculation: if a failure occurs at the worst point on the way, can the aircraft still reach an alternate? The key points are the entry into the EDTO area and the equal time point (ETP), where the times to the two alternates are the same.","This lesson follows a fictitious oceanic route to show where to look in the flight plan and what to check."],
sections:[
{h:"The practice route (fictitious)",blocks:[{t:"table",cols:["Item","Detail"],rows:[
["Flight and aircraft","Fictitious oceanic route, twin-engine aircraft, 180-min maximum diversion time approved"],
["One-engine-inoperative cruise speed","400 kt (still air) → alternates required within a 1,200 NM circle (180 min)"],
["En-route alternates","ALT-A (two precision approaches), ALT-B (one precision approach)"],
["Elapsed time from departure","Entry point (EEP) 2:05, equal time point (ETP) 3:10, exit point (EXP) 4:40"]]},
{t:"note",x:"* Route, airports and figures are all fictitious practice values. Real calculations use the company’s approved methods and flight-planning system."}]},
{h:"Where to look",blocks:[{t:"rows",items:[
{name:"1 Entry and exit points",x:"Where the route passes beyond 60 min (one-engine-inoperative cruise) from an adequate airport and where it returns; between them is the EDTO area."},
{name:"2 Equal time point (ETP)",x:"The point equidistant in time from ALT-A and ALT-B; before it, divert to ALT-A, after it, to ALT-B."},
{name:"3 Diversion time",x:"Every point in the area must be within 180 min of one of the alternates (inside the 1,200 NM circle)."},
{name:"4 Critical fuel",x:"At the ETP, assume the most limiting case, such as decompression (descent to a lower level) combined with engine failure; the fuel to reach an alternate and land must not exceed the fuel planned on board at that point."},
{name:"5 Alternate weather window",x:"For each alternate, from 1 h before the earliest to 1 h after the latest possible arrival, at or above minima (table in 8-2)."}]}]},
{h:"Checking the numbers (practice)",blocks:[{t:"table",cols:["Check","Planned value (fictitious)","Decision"],rows:[
["Critical fuel at the ETP","26,500 kg (decompression + engine failure, to ALT-B)","—"],
["Fuel planned on board at the ETP","31,200 kg","26,500 < 31,200 → no extra fuel needed"],
["ALT-A weather window","Possible arrival 04:20–05:40 → 03:20–06:40 UTC","Forecast at least ceiling 400 ft and visibility 1,600 m?"],
["ALT-B weather window","Possible arrival 05:10–06:50 → 04:10–07:50 UTC","Forecast at least ceiling 600 ft and visibility 3,200 m?"]]},
{t:"point",x:"If critical fuel exceeds the planned fuel, the difference is carried as additional fuel (Korea FSR 8.1.9.15, Part 5). The fuel categories and the EDTO calculation are linked within the same flight plan."}]},
{h:"The dispatcher’s work",blocks:[{t:"check",items:[
{name:"Before departure",x:"Status of EDTO-significant systems (dispatchable under the MEL?), alternate NOTAMs, weather and fire cover, critical fuel."},
{name:"Before entering the area",x:"Check the latest alternate weather and NOTAMs and inform the captain of changes. In Japanese operations beyond 180 min, capability and alternates are re-evaluated on entry."},
{name:"In flight",x:"If an alternate becomes unusable, select another and recalculate diversion time and fuel."},
{name:"Notification",x:"In Japanese operations beyond 180 min, the dispatcher notifies the crew that the flight departs under the standard and what to consider."}]}]}],
voice:"",
terms:[["EDTO Entry Point (EEP)","EDTOの区域への進入点","EDTO 진입점"],["Equal Time Point (ETP)","等時点","등시점"],["EDTO Exit Point (EXP)","退出点","이탈점"],["One-engine-inoperative Cruise Speed","1発動機不作動の巡航速度","1발 부작동 순항속도"],["Rapid Decompression","急減圧","급감압"]],
quiz:[{q:"What is the equal time point (ETP)?",opts:["Halfway between origin and destination","The point where times to the two alternates are equal","Where half the fuel is used","The highest altitude"],a:1,exp:"The diversion alternate changes at this point."},
{q:"If critical fuel at the ETP exceeds the fuel planned on board there…",opts:["Depart anyway","Carry the difference as additional fuel","Drop an alternate","Fly faster"],a:1,exp:"It is planned as additional fuel."},
{q:"With a 180-min maximum diversion time and 400 kt one-engine-inoperative speed, alternates must lie within…",opts:["600 NM","1,000 NM","1,200 NM","1,800 NM"],a:2,exp:"400 kt × 3 h = 1,200 NM."}],
next:"9-1 Flight monitoring and communications"});
})(window.ARTS);
