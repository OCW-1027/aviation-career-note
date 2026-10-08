/* 航空機と整備 追加のレッスン 4-4・5-4 — English version (2026.10) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("4-4",{title:"De-icing, Anti-icing and Winter Readiness at the Station: Never Fly with Snow, Frost or Ice",hl:"De-icing and Anti-icing",subtitle:"The clean aircraft concept, fluid types I to IV, one-step and two-step treatment, holdover times, the anti-icing code, and what contractors and stations settle before winter",
lead:["Even a thin layer of frost or snow on the wings reduces lift and badly degrades take-off performance. International rules (ICAO Annex 6) therefore say that when icing conditions exist or are expected, an aircraft must be inspected and, if necessary, de-iced and anti-iced before take-off, and that snow, frost and ice must be removed beforehand. Japan’s Civil Aviation Bureau requires operators to write this into their operations manuals; in Korea it is covered by the Operations Standards for fixed-wing aircraft issued by MOLIT.","At many airports the work is done by a contracted ground handler. The captain and maintenance own the decisions and the final check, but the station has plenty to settle before winter: fluid stocks, where and in what order aircraft are treated, expected delays and how costs are billed. This lesson covers how it works and how the station prepares."],
sections:[
{h:"The sequence",blocks:[{t:"fig",id:"mnt_deice",cap:"Figure: the de-icing and anti-icing sequence (check, de-ice, anti-ice, report, take off)."},
{t:"p",x:"Removing contamination is de-icing; preventing new build-up is anti-icing. The principle of taking off only with surfaces free of snow, frost and ice is called the clean aircraft concept."}]},
{h:"Fluid types and one-step or two-step treatment",blocks:[{t:"table",cols:["Type","Characteristics","Main use"],rows:[
["Type I","Thin, applied heated; protects only briefly","De-icing (first step)"],
["Type II","Thickened; shears off in the airflow as the aircraft accelerates","Anti-icing"],
["Type III","Between Types II and IV; suits aircraft with lower rotation speeds","Anti-icing (mainly smaller aircraft)"],
["Type IV","Strongly thickened; longest protection","Anti-icing"]]},
{t:"table",cols:["Method","What happens"],rows:[
["One-step","Heated fluid removes contamination and protects in a single application"],
["Two-step","Heated fluid removes contamination first, then a second fluid protects; common in heavier snowfall"]]},
{t:"note",x:"* Colours, products and permitted concentrations vary by product. Which fluids and methods may be used is set by each airline’s de-icing programme and the manufacturer’s instructions. ★"}]},
{h:"Holdover time (HOT)",blocks:[{t:"rows",items:[
{name:"What it is",x:"The estimated time anti-icing fluid will protect the aircraft from falling precipitation, counted from the start of the final application."},
{name:"What changes it",x:"Fluid type and concentration, outside air temperature, and the type and intensity of precipitation (snow, drizzle, freezing rain)."},
{name:"Where the tables come from",x:"The US FAA and Transport Canada publish new winter tables every summer (the FAA’s 2026–2027 edition comes with Notice N 8900.784). Airlines build their own procedures on them. ★"},
{name:"When it expires",x:"As a rule, do not take off. Check the aircraft or treat it again as the company procedure requires."}]},
{t:"point",x:"After treatment the crew is given the anti-icing code: fluid type, product name, mix ratio, start time of the final step and confirmation that the aircraft was checked (JCAB review guidance)."}]},
{h:"What the station settles before winter",blocks:[{t:"check",items:[
{name:"Who does the work",x:"Agree in the contract who treats aircraft, where (stand or pad) and in what order."},
{name:"Fluids and equipment",x:"Confirm fluid types and stocks, resupply if they run short, and the number of de-icing vehicles."},
{name:"Training",x:"Obtain the contractor’s annual training records for operators and inspectors. ★"},
{name:"Expected delays",x:"Estimate how long treatment and queuing will delay departures, and use it for dispatch, the airport and passenger information."},
{name:"Protect the holdover time",x:"Treat after boarding is complete and keep the taxi from treatment to take-off short, so protection is not wasted."},
{name:"Costs and records",x:"Billing is often by fluid volume and number of treatments. Keep treatment records and copies of the anti-icing codes. ★"}]},
{t:"point",warn:true,x:"The captain makes the final decision to take off. The station must never press for a quick departure that shortens treatment or checks."}]}],
voice:"On heavy-snow mornings, queues at the pad delay departures badly. Check the forecast the night before and agree the treatment order with the contractor early; the morning becomes far calmer.",
terms:[["De-icing/anti-icing","防除雪氷","제빙·방빙"],["De-icing","除氷","제빙"],["Anti-icing","防氷","방빙"],["Holdover time (HOT)","ホールドオーバータイム","홀드오버 타임"],["Clean aircraft concept","クリーン・エアクラフト・コンセプト","클린 에어크래프트 콘셉트"],["Anti-icing code","アンチアイス・コード","방빙 코드"]],
quiz:[{q:"When does holdover time start?",opts:["Start of boarding","Start of the final application","Engine start","When snow begins"],a:1,exp:"It runs from the start of the final application."},
{q:"Which fluid protects longest?",opts:["Type I","Type II","Type III","Type IV"],a:3,exp:"Type IV is the most thickened and protects longest."},
{q:"Which is not part of the anti-icing code?",opts:["Fluid type","Mix ratio","Start time of the final step","Number of passengers"],a:3,exp:"The code gives fluid type, product, mix ratio, start time and the check result."}],
next:"Part 5 AOG and Disruptions: 5-1 When an AOG Happens"});
set("5-4",{title:"Unscheduled Inspections: After Lightning, Bird Strikes and Hard Landings",hl:"Unscheduled Inspections",subtitle:"Inspections triggered by an event rather than a set interval: where to look, how often it happens, the path from the captain’s report to departure, and the station’s role",
lead:["Besides inspections at set intervals (2-1), maintenance includes inspections triggered by events: lightning strikes, bird strikes, landings that were too hard, landings above maximum landing weight and severe turbulence. Maintenance manuals usually gather these in Chapter 05, Time Limits and Maintenance Checks (the ATA chapter structure).","Until the inspection is complete, the aircraft cannot depart on its next flight. If nothing is found it can go at once; if damage is found, the path leads to the MEL (3-1), repair or an AOG (5-1). This lesson covers the thinking behind each inspection and what the station starts in parallel."],
sections:[
{h:"What happened, and where to look",blocks:[{t:"fig",id:"mnt_cond",cap:"Figure: where unscheduled inspections look (example)."},
{t:"note",x:"* The actual scope, method and pass criteria come from the manufacturer’s manuals and each airline’s maintenance programme. The figure shows the idea only. ★"}]},
{h:"By the numbers",blocks:[{t:"table",cols:["Event","How often (public sources)"],rows:[
["Lightning","About once a year per airliner; estimated at roughly once per 1,000 flight hours (FAA material, SKYbrary)"],
["Bird strikes (Japan)","1,687 in 2024 and 1,729 in 2025 (preliminary); Haneda had the most of any airport (MLIT) ★"],
["How bird strikes are counted","Counted when the captain judges from an impact or noise that a bird was hit, even if no remains or marks are found (MLIT)"]]},
{t:"p",x:"Aircraft are built and certified to withstand lightning (FAA AC 20-136B and others). Even so, small burn marks can remain where the current entered and left, and inspections check for them."}]},
{h:"From the captain’s report to departure",blocks:[{t:"rows",items:[
{name:"1 Report",x:"The captain writes it in the technical log and tells maintenance at the destination, often by radio before arrival."},
{name:"2 Contact",x:"The contractor’s engineer calls the airline’s maintenance control (MCC) to set the scope and the people and tools needed."},
{name:"3 Inspect",x:"First the defined areas, such as the exterior; if anything is found, the scope widens (phased inspection)."},
{name:"4 Share the outlook",x:"Share how long the inspection will take with dispatch and the station, and decide departure time, crew and passenger information."},
{name:"5 Conclude",x:"Nothing found: sign the log and depart. Damage found: check whether the MEL allows departure; if not, move to repair and AOG handling (5-1 to 5-3)."}]}]},
{h:"What the station prepares",blocks:[{t:"check",items:[
{name:"Information path",x:"Decide who receives the captain’s report and who passes it to the contractor and head-office maintenance."},
{name:"Bird remains",x:"Work with the airport to collect remains from the runway or aircraft and identify the species; it helps the airport’s wildlife control."},
{name:"Photos and records",x:"Keep photos, inspection times and results at the station as well as in the maintenance records."},
{name:"Explaining to passengers",x:"Say briefly that it is a safety inspection and give the expected time; do not promise times you do not know."},
{name:"Reporting duties",x:"Depending on severity, a report to the authority may be required. Always inform the company safety department. ★"}]},
{t:"point",warn:true,x:"Departure preparations may go ahead, but the doors must not close until the inspection is complete and maintenance has signed."}]}],
voice:"To passengers, lightning and bird strikes sound dramatic. Calmly explaining that this is a standard safety inspection makes the wait far less worrying.",
terms:[["Unscheduled (conditional) inspection","臨時の点検","비정기 점검"],["Lightning strike","落雷","낙뢰"],["Bird strike","鳥衝突","조류 충돌"],["Hard landing","ハードランディング","하드 랜딩"],["Overweight landing","過重量着陸","과중량 착륙"],["Static wick","放電索","정전기 방전기"]],
quiz:[{q:"Until the unscheduled inspection is complete, the aircraft…",opts:["cannot depart on its next flight","may depart with passengers","may depart without maintenance","moves to another airport"],a:0,exp:"It cannot depart until the inspection is complete and maintenance has signed."},
{q:"Roughly how often is an airliner struck by lightning?",opts:["About once a year","Once in ten years","Every day","Almost never"],a:0,exp:"Estimates put it at about once per 1,000 flight hours, or about once a year."},
{q:"If damage is found, what is checked next?",opts:["The fare table","Whether the MEL allows departure","The number of meals","Only the weather forecast"],a:1,exp:"Check whether the MEL allows departure; if not, move to repair and AOG handling."}],
next:"Part 6 Licences and Careers: 6-1 Engineer Licences"});
})(window.ARTS);
