/* 航空の基礎知識 2-6 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("2-6",{title:"Following Incheon to Narita: Reading One Flight Plan on an Enroute Chart",hl:"following a route",subtitle:"Reading a flight-plan route, the ATC hand-off at the FIR boundary, the climb–cruise–descent profile, and why the way there differs from the way back: an 800 km international flight traced on the map from departure to arrival",
lead:["In 2-5 we learned chart symbols on a short domestic route (Gimpo–Jeju). This lesson follows a longer international flight: Incheon to Narita. It takes only about two and a half hours, yet it includes almost every element of an enroute chart: a departure procedure, Korean airways, the hand-off between controllers at the FIR boundary, Japanese airways and an arrival procedure.","Incheon–Narita is one of the world’s international routes with the most seats, and probably the most familiar route for anyone working at a Korean airline’s Japan station. Using an example from public flight-plan data, we trace one flight from departure to arrival."],
sections:[
{h:"Reading the flight-plan route",blocks:[{t:"point",x:"Example route from a flight plan: RKSI EGOBA Y697 LANAT Y51 SAMON Y517 LANAI Y301 SHELY Y30 MELON RJAA (cruising at FL350). It lists point, airway, point in turn, starting and ending with the airports’ four-letter codes."},
{t:"table",cols:["Segment","Via","Distance","Magnetic course (approx.)","Talking to (typical)"],rows:[
["RKSI → EGOBA","Departure (SID)","44 NM","096°","Incheon Departure"],
["EGOBA → LANAT","Y697","205 NM","116°","Korean area control (Incheon FIR)"],
["LANAT → SAMON","Y51","149 NM","100°","Japanese control just past LANAT (Fukuoka FIR)"],
["SAMON → LANAI","Y517","291 NM","086°","Japanese area control"],
["LANAI → SHELY","Y301","19 NM","138°","Japanese area control"],
["SHELY → MELON","Y30","63 NM","183°","Tokyo Approach"],
["MELON → RJAA","Arrival and approach","24 NM","266°","Narita Tower"]]},
{t:"note",x:"* About 795 NM (about 1,470 km) in total; a straight line between the airports is about 700 NM, so the actual route is slightly longer. Magnetic courses assume a variation of about 8°W. Routes and levels change with each day’s winds, traffic and ATC instructions. ★"}]},
{h:"The whole route on the chart",blocks:[{t:"fig",id:"icn_nrt_chart",cap:"Moving diagram: enroute chart from Incheon (RKSI) to Narita (RJAA) (educational sketch, north up). Navy solid line = outbound (eastbound); green dashed line = return (westbound). Boxes give the airway name and segment distance (NM). The purple dash-dot line is the FIR boundary (approximate); purple circles mark where Korean and Japanese controllers hand the flight over (LANAT outbound, SAPRA on return). As the orange aircraft moves, “NOW TALKING TO” at top right switches to the controller in charge. Insets: A = Incheon departure, B = Narita arrival (SEL and CUN are VORs). Some points are omitted."},
{t:"check",items:[
{name:"Look at both ends first",x:"Departures (inset A) and arrivals (inset B) are crowded, so real charts show them in separate insets or airport departure and arrival charts."},
{name:"Then airway names and distances",x:"“Y697 205” in a box means 205 NM along airway Y697. The longer the segment, the more upper winds matter."},
{name:"Finally, the boundary",x:"The purple line (FIR boundary) and the points on it (LANAT, SAPRA) are where control is handed over."}]},{t:"link",href:"航空路図の練習.html?lang=en&r=in",x:"Practice page “Route Chart Practice”: step through this flight point by point and try the quiz"}]},
{h:"What happens at the FIR boundary",blocks:[{t:"table",cols:["Step","What happens"],rows:[
["1 Coordination in advance","Korean and Japanese control units exchange each flight’s estimated boundary time and level by message or dedicated line"],
["2 Frequency change","Shortly before the boundary, Korean control tells the crew to contact Japanese control on a new frequency"],
["3 First call","The pilots report the flight number and level on the new frequency, and Japanese control confirms them on radar"],
["4 Hand-off complete","From here, Japanese control issues the instructions; the return flight does the same in reverse near SAPRA"]]},
{t:"point",x:"Because holding at the boundary is undesirable, in busy periods the controllers agree spacing at the boundary and adjust take-off times at the departure airport. When a departure clearance is late on the ground, the cause is often in airspace far away."}]},
{h:"Climb, cruise and descent profile",blocks:[{t:"fig",id:"icn_nrt_profile",cap:"Moving diagram: vertical profile (vertical scale exaggerated). The horizontal axis is distance from Incheon (NM). TOC = top of climb; TOD = top of descent. Cruise at FL350 (odd, as the flight is eastbound). Blue background = Incheon FIR; orange = Fukuoka FIR; the purple line is the FIR boundary (LANAT). Triangles are points passed. TOC and TOD positions are typical."},
{t:"rows",items:[
{name:"Climb (to about 140 NM)",x:"Climbing on the departure procedure while heading east; past EGOBA, the aircraft reaches cruising level over Korea."},
{name:"Cruise (FL350)",x:"Eastbound flights use odd levels (FL330, FL350 and so on); westbound return flights use even levels (FL340, FL360 and so on)."},
{name:"Descent (from before LANAI)",x:"Descent starts about 110 NM before Narita, joining the arrival procedure. In busy periods, crews may hold or adjust speed on the way down."},
{name:"Wind",x:"Strong westerlies (the jet stream) blow over Japan in winter. Eastbound flights get a tailwind and are shorter; westbound flights face a headwind and tend to be longer. Timetables often show the return flight 10–20 minutes longer. ★"}]}]},
{h:"The way there differs from the way back",blocks:[{t:"table",cols:["","Outbound (Incheon → Narita)","Return (Narita → Incheon)"],rows:[
["Example route","EGOBA Y697 LANAT Y51 SAMON Y517 LANAI Y301 SHELY Y30 MELON","CHINO Y16 SAPRA G585 CUN"],
["Where it goes","Central Korea → Sea of Japan / East Sea → over Niigata and Fukushima → off Ibaraki into Narita","West from Narita → the southern Sea of Japan / East Sea → south-east Korea (near Cheongju) into Incheon"],
["FIR boundary","LANAT","SAPRA"],
["Distance (example)","About 795 NM","About 699 NM"],
["Example cruising level","FL350 (odd)","Even levels"]]},
{t:"point",x:"Separating the outbound and return routes keeps opposite-direction traffic off the same airway and makes control simpler: the same idea as Y711 and Y722 between Gimpo and Jeju (2-5), on an international scale."}]},
{h:"How this connects to ground work",blocks:[{t:"check",items:[
{name:"Flight time, fuel and load",x:"On strong-headwind days more fuel is needed, which can reduce the cargo and baggage that can be carried (Course 1, Part 3)."},
{name:"Causes of departure delays",x:"When flow restrictions apply at the boundary or the arrival airport because of traffic or weather, a departure time is assigned (TSAT, EDCT)."},
{name:"Turbulence and cabin service",x:"The jet stream makes the area over the Sea of Japan / East Sea bumpy in winter; cabin and ground share information on seat-belt signs and service timing."},
{name:"Explaining to passengers",x:"“Why does the return take longer?” or “Why are we landing a little late today?” can be explained by winds, airways and ATC flow management."}]}]}],
voice:"",
terms:[["Flight Plan","飛行計画","비행계획"],["Hand-off","管制の引き継ぎ","관제 이양"],["Top of Climb (TOC)","上昇の終わり（TOC）","상승 종료점(TOC)"],["Top of Descent (TOD)","降下の始まり（TOD）","강하 시작점(TOD)"],["Cruising Level","巡航高度","순항 고도"],["Jet Stream","ジェット気流","제트기류"]],
quiz:[{q:"In this example, where is the outbound flight handed from Korean to Japanese control?",opts:["EGOBA","LANAT","LANAI","MELON"],a:1,exp:"The FIR boundary lies just past LANAT; on the return it is SAPRA."},
{q:"Which is a suitable cruising level for the eastbound outbound flight?",opts:["FL340","FL350","FL360","FL380"],a:1,exp:"Eastbound flights normally use odd levels (FL330, FL350 and so on)."},
{q:"What is the main reason for separate outbound and return routes?",opts:["To change the scenery","To keep opposite-direction traffic apart and simplify control","To burn more fuel","There is no reason"],a:1,exp:"The same idea as Y711 and Y722 between Gimpo and Jeju."}],
next:"Part 3 Aviation History — 3-1 A timeline of aviation history"});
})(window.ARTS);
