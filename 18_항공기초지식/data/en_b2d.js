/* 航空の基礎知識 2-5 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("2-5",{title:"Airways: The Roads in the Sky and How to Read an Enroute Chart",hl:"airways",subtitle:"How departures, airways and arrivals connect, chart symbols, route names and altitude rules, the airspace around Korea and Japan, and routes reshaped by politics",
lead:["Aircraft may seem to fly freely, but they actually follow airways: roads in the sky set by air traffic control. Just as roads have junctions and signs, airways are built by linking points called waypoints, and each has defined heights and widths.","Using the real airways between Seoul (Gimpo) and Jeju, this lesson covers reading an enroute chart, the rules for airway names and how altitudes are separated, then looks at the airspace around Korea and Japan and at routes changed by politics."],
sections:[
{h:"Roads in the sky: every flight has three parts",blocks:[{t:"fig",id:"route_profile",cap:"Moving diagram: Gimpo (RKSS) to Jeju (RKPC). 1 Standard instrument departure (SID): from the runway to the airway entry, 2 the airway (Y711): cruising past each waypoint, 3 standard arrival (STAR) and approach: from the airway exit to the runway. Only some waypoints are shown."},
{t:"table",cols:["Part","What it is"],rows:[
["Departure (SID)","A set path and altitudes from take-off to the airway’s entry waypoint"],
["Airway","A road in the sky linking waypoints or radio beacons (VOR), with a set width (protected airspace either side) and usable altitudes"],
["Arrival (STAR) and approach","A set path from the airway exit to the runway; controllers may also vector aircraft by radar in busy periods or bad weather"]]},
{t:"point",x:"Waypoints carry easy-to-say five-letter names such as BULTI and DOTOL. ICAO manages the names so that none are duplicated worldwide."}]},
{h:"Reading an enroute chart (AIP and Jeppesen style)",blocks:[{t:"fig",id:"enroute_chart",cap:"Moving diagram: an enroute chart of the Gimpo–Jeju airways (educational sketch; north is to the left). The lower heavy line is Y711 (one-way to Jeju), the upper one Y722 (one-way to Gimpo). ▲ = RNAV waypoints; the graduated circle is the compass rose of the Songtan (SOT) VOR; ringed circles are airports. Boxes on the lines give segment distances in nautical miles; 193° and 013° are magnetic courses. Dashed lines link to departure and arrival procedures. Orange aircraft travel the two airways in opposite directions. Coordinates are approximate, from public data, and some waypoints are omitted."},
{t:"table",cols:["Symbol or label","Meaning"],rows:[
["▲ Waypoint","A five-letter point defined by latitude and longitude, flown by satellite-based navigation (RNAV)"],
["Graduated circle (compass rose)","A VOR radio beacon; read magnetic bearings from the scale"],
["Airway name (black box)","Such as Y711; arrows show the one-way direction"],
["Number on the line","Segment distance in nautical miles (1 NM = 1.852 km)"],
["193° and so on","The magnetic course for the segment (from magnetic north, not map north)"],
["MEA, MOCA and similar (on real charts)","The lowest usable altitude on the segment, clear of terrain and obstacles"],
["Purple dash-dot line (on real charts)","A Flight Information Region (FIR) boundary, where the controlling unit changes"]]},
{t:"note",x:"* Official enroute charts appear in the ENR section of each country’s Aeronautical Information Publication (AIP). Airline pilots usually use charts from companies such as Jeppesen. This sketch was drawn by this site following those conventions; it is not a copy of any real chart. ★"},{t:"link",href:"航空路図の練習.html?lang=en&r=gc",x:"Practice page “Route Chart Practice”: step through Y711 and Y722 point by point and try the quiz"}]},
{h:"The “northbound” and “southbound” carriageways of Gimpo–Jeju",blocks:[{t:"rows",items:[
{name:"A one-way pair",x:"Gimpo–Jeju is one of the world’s busiest routes. It used to share one airway (B576), separating directions by altitude; from around 2012 it was split into Y711 to Jeju and Y722 to Gimpo, like the two carriageways of a motorway. ★"},
{name:"Traffic joins from other airports",x:"Flights to Jeju from Cheongju, Wonju, Yangyang and elsewhere join these airways part-way, making them the trunk road of Korean domestic flying."},
{name:"Summer thunderstorms",x:"Military training areas lie either side of the airways, so on some days there is little room to deviate around thunderstorms; this is one reason for summer-afternoon turbulence and delays."}]}]},
{h:"Reading airway names",blocks:[{t:"table",cols:["First letter","Meaning","Example"],rows:[
["A, B, G, R","Regional (international) routes, conventional navigation","B576 (the former Gimpo–Jeju airway)"],
["L, M, N, P","Regional (international) RNAV routes","—"],
["Q, T, Y, Z","Mainly domestic RNAV routes","Y711, Y722, Z50"],
["H, J, V, W","Mainly domestic conventional routes","—"]]},
{t:"note",x:"* Based on ICAO rules (Annex 11). A leading “U” marks an upper-airspace route. Airways are moving from conventional routes linking ground beacons (VOR) to RNAV routes that link any points by satellite navigation."}]},
{h:"Separating by height",blocks:[{t:"check",items:[
{name:"Flight levels (FL)",x:"High altitudes are given as flight levels referenced to 1013.25 hPa; FL350 is about 35,000 ft."},
{name:"Odd eastbound, even westbound",x:"So that opposite-direction traffic never shares a level, eastbound flights normally use FL330, FL350 and so on, and westbound flights FL340, FL360 and so on."},
{name:"1,000 ft separation (RVSM)",x:"Between FL290 and FL410, suitably equipped aircraft may be separated vertically by 1,000 ft, letting more flights use the same airway."},
{name:"Why one-way helps",x:"On one-way airways such as Y711 and Y722 there is no opposing traffic, so more levels can be used."}]}]},
{h:"The airspace around Korea and Japan",blocks:[{t:"fig",id:"fir_chart",cap:"Moving diagram: FIR boundaries around Korea, Japan and China (purple dash-dot lines, approximate): Incheon FIR (RKRR), Fukuoka FIR (RJJJ), Shanghai FIR (ZSHA), Pyongyang FIR (ZKKP) and others. The orange band south of Jeju is the AKARA corridor used until 2021 (AKARA–SADLI–FUE); the red dashed line is longitude 125°E."},
{t:"rows",items:[
{name:"What an FIR is",x:"The sky is divided into FIRs, and each country’s control units manage the airways within them. FIRs differ from national borders (territorial airspace); even the high seas fall within some FIR."},
{name:"The corridor south of Jeju (AKARA)",x:"Set up in 1983, before Korea and China had diplomatic relations, through ICAO mediation for flights between China and Japan, the corridor ran inside Korea’s FIR. About 515 km long and 93 km wide, it was controlled by China west of 125°E and by Japan to the east."},
{name:"Congestion and risk",x:"Traffic grew from about 10 flights a day in 1983 to about 800. In 2018 a cargo aircraft in the corridor climbed without clearance and came dangerously close to a Korean airliner."},
{name:"The 2021 reorganisation",x:"Under a three-country agreement, from 25 March 2021 Korea took over the Japanese-controlled area including the crossing section, and the Korea–Japan link became a dual airway; later phases built new airways within the Incheon FIR."},
{name:"North Korean airspace",x:"Civil aircraft normally avoid the Pyongyang FIR, so flights from Seoul to the north-east (towards Vladivostok, for example) take a longer path."}]}]},
{h:"Routes changed by politics: Europe flights avoiding Russia",blocks:[{t:"fig",id:"polar_routes",cap:"Moving diagram: a map centred on the North Pole. 1 (grey dashes) = the former shortest route over Russia; 2 (blue) = via Alaska, Canada and the Arctic; 3 (green) = the southern route via Central Asia and Turkey. Hatching marks Russia. Routes are schematic, not actual tracks."},
{t:"table",cols:["","Details"],rows:[
["What happened","Since 2022, Japanese and Korean airlines have not used Russian airspace (not banned, but avoided for safety)"],
["A northern example","Japan Airlines’ Tokyo–London flight averaged 12 h 12 min over Russia; flying across the Pacific it now takes over 14 hours"],
["The southern route","Many airlines now fly via Turkey, Central Asia and China; flights to Tokyo and Seoul are roughly 2–4 hours longer than before"],
["Choosing between them","Daily winds, aircraft performance and weight, and overflight charges decide; the same route may use north or south on different days"]]},
{t:"note",x:"* Flight times are approximate, based on published flight data and airline information. ★"}]},
{h:"How this connects to ground work",blocks:[{t:"check",items:[
{name:"Flight time and load",x:"Airways and winds change flight times. Longer routings need more fuel and may reduce the cargo and baggage that can be carried (Course 1, Part 3)."},
{name:"Departure delays",x:"On busy airways, or when there is little room to avoid thunderstorms, flow control may assign a departure time (TSAT, EDCT)."},
{name:"Flight plans",x:"Airlines file a flight plan listing the airways for each flight; stations plan boarding and departure around its times."},
{name:"Explaining to passengers",x:"Why the same route takes different times each way, or why a flight takes a detour, can be explained by winds and airways."}]}]}],
voice:"",
terms:[["Airway / ATS Route","航空路","항공로"],["Waypoint","ウェイポイント","웨이포인트"],["Standard Instrument Departure (SID)","出発方式","표준 출발 절차"],["Standard Terminal Arrival Route (STAR)","到着方式","표준 도착 절차"],["Flight Information Region (FIR)","飛行情報区","비행정보구역"],["Aeronautical Information Publication (AIP)","航空路誌","항공정보간행물"]],
quiz:[{q:"Which airway do flights from Gimpo to Jeju use?",opts:["Y711","Y722","A593","Either"],a:0,exp:"Flights to Gimpo use Y722: a one-way pair."},
{q:"What does an airway name starting with “Y” indicate?",opts:["An international conventional route","A mainly domestic RNAV route","Upper airspace only","A helicopter route"],a:1,exp:"Q, T, Y and Z are mainly domestic RNAV routes."},
{q:"Until 2021, who controlled the AKARA corridor east of 125°E?",opts:["Korea","China","Japan","Taiwan"],a:2,exp:"China controlled the west and Japan the east."}],
next:"2-6 Following Incheon to Narita on an enroute chart"});
})(window.ARTS);
