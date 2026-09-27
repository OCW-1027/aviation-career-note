/* 運航管理の実務 Part 3 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("3-1",{title:"How NOTAMs Work and How to Read Them",hl:"NOTAMs",subtitle:"NOTAMs report current changes to airports, routes and navaids: the Q-line codes, validity, new, replacement and cancellation NOTAMs, and Korea’s NOTAM series",
lead:["Charts and the AIP are amended only on fixed cycles. Works, failures, closures and restricted areas that arise in between are announced by NOTAM. Dispatchers check every NOTAM affecting the departure, destination and alternate aerodromes and the route before building a plan.","This lesson reads a NOTAM item by item and confirms how Korea divides its NOTAM series (AIP, September 2026)."],
sections:[
{h:"Reading a NOTAM item by item",blocks:[{t:"fig",id:"dsp_notam",cap:"Moving diagram: reading a practice NOTAM (part of Y711 closed between FL200 and FL300) item by item. The orange frame marks the current item; its meaning appears below."},
{t:"table",cols:["Item","Meaning"],rows:[
["Number and type","D1234/26 NOTAMN: series and number/year. N = new, R = replacement, C = cancellation"],
["Q) line","FIR / NOTAM code (Q + two-letter subject + two-letter condition) / traffic (I, V) / purpose / scope (A = aerodrome, E = en route, W = navigation warning) / lower and upper limits / centre coordinates and radius"],
["A)","Location (four-letter location indicator of the aerodrome or FIR)"],
["B) C)","Start and end of validity (year, month, day, time, UTC). EST if the end is estimated; PERM if permanent"],
["D)","Schedule (e.g. valid only at set times each day)"],
["E)","Text (abbreviated English)"],
["F) G)","Lower and upper limits (e.g. airspace restrictions)"]]}]},
{h:"Reading NOTAM codes",blocks:[{t:"table",cols:["Code","Subject","Condition","Meaning"],rows:[
["QARLC","AR = ATS route","LC = closed","Route closed"],
["QMRLC","MR = runway","LC = closed","Runway closed"],
["QICAS","IC = ILS","AS = unserviceable","ILS unserviceable"],
["QNVAS","NV = VOR","AS = unserviceable","VOR unserviceable"],
["QRTCA","RT = temporary restricted area","CA = activated","Temporary restricted area active"]]},
{t:"link",href:"../18_항공기초지식/航空路図の練習.html?lang=en&m=wx",x:"Practice page “Flight Operations Trainer ⑤ Weather & NOTAM”: read five NOTAMs and judge their effect and the response"}]},
{h:"Korea’s NOTAM series",blocks:[{t:"table",cols:["Series","Content (Korea AIP GEN 3.1)"],rows:[
["A","International airports (including navigation and communication facilities)"],
["C","Domestic airports (including navigation and communication facilities)"],
["D","Airspace (except temporary restricted areas)"],
["E","Temporary restricted areas"],
["G","Predicted GPS receiver autonomous integrity monitoring (RAIM) outages at aerodromes"],
["Z","General flight rules, trigger NOTAMs, flow control, fireworks, missile and laser activity, and others"],
["SNOWTAM","Movement area conditions due to snow, ice or slush (separate serial numbers for each aerodrome; 3-2)"]]},
{t:"note",x:"* Korean NOTAMs are issued by the NOTAM office of the Air Traffic Management Office (Daegu), which also publishes a monthly checklist of valid NOTAMs. Series differ by country."}]},
{h:"How dispatchers check NOTAMs",blocks:[{t:"check",items:[
{name:"Use the pre-flight information bulletin (PIB)",x:"Check every NOTAM for the departure, destination and alternates and the FIRs on the route."},
{name:"Overlay times and levels",x:"Compare validity (B, C, D) with the flight’s times, and the limits with the cruising level."},
{name:"Judge the effect",x:"For closures or unserviceable facilities, consider changed minima, route or level changes, extra fuel and a different alternate."},
{name:"Share with stations",x:"Share NOTAMs affecting ground work, such as airport works or gate and stand restrictions."}]}]}],
voice:"",
terms:[["Notice to Airmen (NOTAM)","航空情報（ノータム）","항공고시보(NOTAM)"],["NOTAM Code (Q-code)","NOTAMコード","NOTAM 부호"],["Pre-flight Information Bulletin (PIB)","飛行前情報","비행 전 정보"],["Trigger NOTAM","トリガーNOTAM","트리거 NOTAM"],["EST (estimated)","見込み（終了時刻）","예상(종료 시각)"]],
quiz:[{q:"What does “NOTAMR” mean?",opts:["New","Replacement","Cancellation","Practice"],a:1,exp:"N = new, R = replacement, C = cancellation."},
{q:"What does the code “QMRLC” mean?",opts:["Route closed","Runway closed","VOR unserviceable","ILS unserviceable"],a:1,exp:"MR = runway, LC = closed."},
{q:"Which Korean series covers temporary restricted areas?",opts:["A","C","D","E"],a:3,exp:"Korea AIP GEN 3.1: series E."}],
next:"3-2 SNOWTAM and runway condition reporting (GRF)"});
set("3-2",{title:"SNOWTAM and Runway Condition Reporting (GRF)",hl:"GRF",subtitle:"The Global Reporting Format used worldwide since November 2021: the runway is split into thirds, each given a runway condition code (RWYCC) from 0 to 6",
lead:["On runways made slippery by snow, ice or standing water, the distance needed to land grows sharply. Reporting methods once varied by country; since 4 November 2021 ICAO has applied a common Global Reporting Format (GRF).","This lesson explains the GRF approach, what each runway condition code (RWYCC) means, and what a SNOWTAM tells you."],
sections:[
{h:"Assessing the runway in thirds",blocks:[{t:"fig",id:"dsp_rwycc",cap:"Moving diagram: the runway is divided into touchdown, midpoint and stop-end thirds, each given a code, worsening from 5/5/5 (wet) to 5/3/2 and 3/2/1. Above: expected braking for each code (6 = dry, 0 = nil braking)."},
{t:"point",x:"Aerodrome staff set the codes using a standard matrix (RCAM) based on contaminant type, depth and coverage. Friction coefficients are no longer reported, and contaminants are written in plain language such as WET SNOW."}]},
{h:"What each RWYCC means",blocks:[{t:"table",cols:["Code","Runway condition (main examples)","Braking"],rows:[
["6","Dry","—"],
["5","Wet (water 3 mm or less), frost, 3 mm or less of slush, dry snow or wet snow","Good"],
["4","Compacted snow (OAT −15°C or colder)","Good to medium"],
["3","Slippery wet; more than 3 mm of dry or wet snow; snow on compacted snow; compacted snow (warmer than −15°C)","Medium"],
["2","More than 3 mm of standing water or slush","Medium to poor"],
["1","Ice","Poor"],
["0","Wet ice, water on compacted snow, snow on ice","Less than poor (runway closure considered)"]]},
{t:"note",x:"* Based on the ICAO RCAM. Codes may be DOWNGRADED on observations or pilot reports, or UPGRADED within limits after treatment."}]},
{h:"What a SNOWTAM tells you",blocks:[{t:"table",cols:["Section","Main content"],rows:[
["Aeroplane performance section","Aerodrome, time of observation, runway, RWYCC for each third, coverage, depth, condition description, width to which codes apply"],
["Situational awareness section","Reduced runway length, drifting snow, taxiway and apron conditions, snowbanks and more"]]},
{t:"point",x:"Practice example: RKSS 11200600 14R 5/3/2 100/100/50 NR/06/04 WET/WET SNOW/SLUSH — runway 14R, codes 5, 3 and 2 by third, coverage, depth (NR = not reported) and condition."}]},
{h:"Work for dispatchers and stations",blocks:[{t:"check",items:[
{name:"Landing distance",x:"Use the RWYCC with each aircraft’s performance data to check landing and take-off distances and weight limits."},
{name:"Alternates and fuel",x:"With low codes or a possible closure, also check alternate weather and runway conditions and consider holding fuel."},
{name:"Snow clearance and delays",x:"Temporary runway closures for clearing or de-icing delay departures; stations share clearance plans with the OCC (Part 7)."}]}]}],
voice:"",
terms:[["Global Reporting Format (GRF)","グローバル・レポーティング・フォーマット","글로벌 리포팅 포맷"],["Runway Condition Code (RWYCC)","滑走路状態コード","활주로 상태 코드"],["Runway Condition Assessment Matrix (RCAM)","滑走路状態評価表","활주로 상태 평가표"],["Runway Condition Report (RCR)","滑走路状態報告","활주로 상태 보고"],["Slush","雪泥","슬러시"]],
quiz:[{q:"When was the GRF applied worldwide?",opts:["2011","2019","November 2021","March 2026"],a:2,exp:"From 4 November 2021."},
{q:"What runway condition does RWYCC 1 indicate?",opts:["Dry","Wet","Ice","Compacted snow (−15°C or colder)"],a:2,exp:"Ice is 1; wet ice is 0."},
{q:"How is the RWYCC reported?",opts:["One for the whole runway","For each third of the runway","Every metre","For each taxiway"],a:1,exp:"Touchdown, midpoint and stop-end thirds."}],
next:"3-3 ASHTAM and volcanic ash"});
set("3-3",{title:"ASHTAM and Volcanic Ash",hl:"volcanic ash",subtitle:"ASHTAMs on volcanic activity, the aviation colour code (green, yellow, orange, red), Volcanic Ash Advisory Centre (VAAC) information and dispatch decisions",
lead:["Volcanic ash can cause engine flame-out and damage instruments and windscreens, making it extremely dangerous to aircraft. Japan has many active volcanoes, so ash information matters on flights between Korea and Japan too.","This lesson sets out the kinds of volcanic ash information and how dispatchers decide."],
sections:[
{h:"Volcanic ash information",blocks:[{t:"table",cols:["Product","Content"],rows:[
["ASHTAM","A special NOTAM on changes in volcanic activity (volcano name and position, colour code, ash cloud height and extent)"],
["Volcanic ash advisory","Extent and forecast of ash from a Volcanic Ash Advisory Centre (VAAC)"],
["Volcanic ash SIGMET","Warning of the hazardous area from the meteorological office serving the airspace"],
["Airport observations (METAR)","Reports of ash fall (VA)"]]},
{t:"note",x:"* The world is divided among nine VAACs; much of East Asia, including Japan and Korea, is covered by the Tokyo VAAC (Japan Meteorological Agency)."}]},
{h:"The aviation colour code",blocks:[{t:"table",cols:["Colour","Meaning (ICAO aviation colour code)"],rows:[
["Green","Normal, non-eruptive state"],
["Yellow","Elevated unrest"],
["Orange","Heightened unrest with increased likelihood of eruption, or an eruption with little or no ash"],
["Red","Eruption imminent or under way with significant ash in the atmosphere"]]}]},
{h:"Dispatch decisions",blocks:[{t:"check",items:[
{name:"Overlay area and height",x:"Compare VAAC and SIGMET areas and heights with the route, cruising level and time."},
{name:"Plan to avoid",x:"Change route or level to avoid the ash and add fuel for the extra distance."},
{name:"Airport effects",x:"Ash fall can close airports; consider possible closures of the destination and alternates and other options."},
{name:"After ash fall",x:"Aircraft parked under ash need maintenance checks; stations work with maintenance and give the OCC an expected departure time."}]}]}],
voice:"",
terms:[["ASHTAM","火山灰の特別なNOTAM","화산재 특별 NOTAM"],["Volcanic Ash Advisory Centre (VAAC)","火山灰情報センター","화산재정보센터"],["Aviation Colour Code","航空用カラーコード","항공용 색 경보"],["Volcanic Ash Fall","降灰","강회"]],
quiz:[{q:"Which VAAC covers much of East Asia, including Japan and Korea?",opts:["Washington","Tokyo","Darwin","London"],a:1,exp:"Tokyo VAAC (Japan Meteorological Agency)."},
{q:"Which colour means an eruption is imminent or under way?",opts:["Green","Yellow","Orange","Red"],a:3,exp:"Red."},
{q:"When the route crosses an ash area, what comes first?",opts:["Fly as planned","A route or level that avoids it, and the fuel for it","Reduce fuel","Think about it after arrival"],a:1,exp:"Plan to avoid and review fuel."}],
next:""});
})(window.ARTS);
