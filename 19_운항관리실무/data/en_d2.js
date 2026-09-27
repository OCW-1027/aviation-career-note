/* 運航管理の実務 Part 2 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("2-1",{title:"Reading Weather Information: METAR, TAF, SIGMET and Charts",hl:"weather information",subtitle:"The weather products dispatchers use every day, reading a METAR group by group, and what counts as a ceiling",
lead:["Weather is the information dispatchers use most: current airport weather (METAR), forecasts (TAF), warnings of hazardous weather (SIGMET), upper winds and temperatures, and significant weather charts, all in a common worldwide format.","This lesson sorts out the products, reads a METAR group by group, and checks how TAF changes are written and what a ceiling is."],
sections:[
{h:"Weather products dispatchers use",blocks:[{t:"table",cols:["Product","Content","Main use"],rows:[
["METAR / SPECI","Airport observations (usually every 30 or 60 minutes; SPECI for sudden changes)","Whether to depart; conditions on arrival"],
["TAF","Airport forecasts (usually 24–30 hours)","Destination and alternate decisions (2-2)"],
["SIGMET","Warnings of hazardous en-route weather (thunderstorms, severe turbulence, icing, volcanic ash)","Re-routing and avoidance"],
["Upper winds and temperatures","World Area Forecast System (WAFS) forecasts","Flight time, fuel, cruising level"],
["Significant weather charts (SIGWX)","Jet streams, turbulence and thunderstorm areas","Choosing routes and levels"],
["Radar, satellite and pilot reports","Movement of cloud and rain; actual turbulence","In-flight monitoring and advice"]]}]},
{h:"Reading a METAR group by group",blocks:[{t:"fig",id:"dsp_metar",cap:"Moving diagram: reading METAR RKSI 270600Z 33015G25KT 4000 -SHRA BR BKN012 OVC030 16/13 Q1009 TEMPO 2000 SHRA one group at a time (practice example). The orange frame marks the group being read; its meaning appears below."},
{t:"table",cols:["Group","Meaning"],rows:[
["RKSI 270600Z","Incheon, day 27, 06:00 UTC"],
["33015G25KT","Wind 330°, 15 kt, gusting 25 kt"],
["4000","Visibility 4,000 m (9999 = 10 km or more)"],
["-SHRA BR","Light rain showers (- = light), mist"],
["BKN012 OVC030","Broken (5–7 oktas) at 1,200 ft, overcast at 3,000 ft (heights in hundreds of feet)"],
["16/13 Q1009","Temperature 16, dew point 13; QNH 1009 hPa"],
["TEMPO 2000 SHRA","Trend for the next two hours: temporarily 2,000 m in rain showers"]]}]},
{h:"How TAF changes are written",blocks:[{t:"table",cols:["Code","Meaning"],rows:[
["FM","From that time the weather changes to what follows"],
["BECMG","Changes during the period and then persists"],
["TEMPO","Temporary fluctuations during the period (each under an hour, in total under half the period)"],
["PROB30 / PROB40","30% or 40% probability (may be combined with TEMPO)"]]},
{t:"point",x:"The ceiling is the lowest BKN (5–7 oktas) or OVC layer, or the vertical visibility (VV) when the sky is obscured. FEW and SCT layers do not count. Decisions compare both visibility and ceiling with the minima."}]},
{h:"How this connects to ground work",blocks:[{t:"check",items:[
{name:"Report local weather",x:"Stations tell dispatchers about sudden thunderstorms, fog or snow before they appear in observations."},
{name:"Times are UTC",x:"Weather times are in UTC; add nine hours for Japan and Korea."}]},
{t:"link",href:"../18_항공기초지식/航空路図の練習.html?lang=en&m=wx",x:"Practice page “Flight Operations Trainer ⑤ Weather & NOTAM”: decide on alternates from a TAF"}]}],
voice:"",
terms:[["METAR","定時の気象実況","정시 기상 실황"],["Terminal Aerodrome Forecast (TAF)","飛行場予報","비행장 예보"],["SIGMET","空域の危険な天気の警報","공역 위험 기상 경보"],["Ceiling","雲底（シーリング）","운고(실링)"],["Vertical Visibility (VV)","鉛直視程","수직 시정"]],
quiz:[{q:"What does “BKN012” mean in a METAR?",opts:["1–2 oktas at 120 ft","5–7 oktas at 1,200 ft","Overcast at 12,000 ft","Visibility 1,200 m"],a:1,exp:"BKN is 5–7 oktas; heights are in hundreds of feet."},
{q:"Which layer does not count as a ceiling?",opts:["BKN","OVC","VV","SCT"],a:3,exp:"FEW and SCT do not count."},
{q:"What does “TEMPO” mean in a TAF?",opts:["Changes and persists from that time","Temporarily","40% probability","Cancelled observation"],a:1,exp:"Temporary fluctuations."}],
next:"2-2 Departure decisions and alternate aerodrome rules"});
set("2-2",{title:"Departure Decisions and Alternate Aerodrome Rules",hl:"alternate rules",subtitle:"Decided on the forecast for the estimated time of use (one hour either side of arrival): how many destination alternates, how to choose them, and take-off alternates, from Korea’s Flight Safety Regulations (March 2026 edition)",
lead:["On days when the weather may turn bad, dispatchers must decide whether a flight may depart, which alternates to plan and how many. National rules set this out in detail.","This lesson works from the original text of Korea’s Flight Safety Regulations for Aeroplanes (MOLIT Notice 2026-154, in force 25 March 2026). Japan applies the same ICAO Annex 6 principles through national standards and airline operations manuals."],
sections:[
{h:"The decision window: one hour either side of arrival",blocks:[{t:"fig",id:"dsp_window",cap:"Moving diagram: look at the forecast groups that fall within one hour either side of the 10:00 ETA (orange). The base forecast is good, but BECMG brings fog with a 600 ft ceiling and TEMPO temporarily brings 600 m visibility and 200 ft vertical visibility. Decide on the worst values within the window."},
{t:"point",x:"The rules judge destination and alternate weather at the “estimated time of use”, taken as one hour before to one hour after arrival (note to 8.1.9.9; ICAO Doc 9976)."}]},
{h:"May the flight depart?",blocks:[{t:"table",cols:["Condition","Rule (8.1.9.9)"],rows:[
["Departure aerodrome","Weather at or above the minima"],
["Destination and alternates","Unless reports or forecasts for the time of use are at or above the minima, the flight must not continue beyond take-off (or the in-flight re-planning point)"],
["Safety margin","Add ceiling and visibility increments to the company minima for alternates"]]}]},
{h:"How many destination alternates",blocks:[{t:"rows",items:[
{name:"Rule: at least one",x:"An IFR flight plan must name at least one destination alternate (8.1.9.10 a)."},
{name:"Exceptions",x:"When approach and landing in VMC are expected at the time of use and separate runways are available (at least one with an instrument approach), or for an isolated aerodrome with a point of no return."},
{name:"At least two",x:"Air operator certificate holders must select at least two destination alternates when destination weather at the time of use is below company minima or no destination weather information is available (8.1.9.10 b)."}]}]},
{h:"Choosing an alternate",blocks:[{t:"table",cols:["Case","Criterion (8.1.9.11)"],rows:[
["Alternate minima published","Forecast at ETA at or above the minima at take-off (or, for operators, the re-planning point)"],
["Not published: precision approach","Ceiling 600 ft (180 m) and visibility 3 km or better"],
["Not published: non-precision approach","Ceiling 800 ft (240 m) and visibility 5 km or better"],
["Operator provision","Alternate minima approved in the operations specifications may be used"]]}]},
{h:"Take-off alternates",blocks:[{t:"table",cols:["","Rule (8.4.4.2)"],rows:[
["When required","Departure weather below the aircraft’s landing minima, or return to the departure aerodrome impossible for other reasons"],
["Distance: twin-engine","Within one hour at one-engine-inoperative cruise speed (still air, ISA, actual take-off weight)"],
["Distance: three or more engines","Within two hours at all-engines cruise speed"],
["Distance: EDTO-approved","Within the approved maximum diversion time"],
["Weather","At or above aerodrome operating minima for the expected time of use"]]},
{t:"link",href:"../18_항공기초지식/航空路図の練習.html?lang=en&m=wx",x:"Practice page “Flight Operations Trainer ⑤ Weather & NOTAM”: decide from a TAF and ETA (simplified)"}]}],
voice:"",
terms:[["Estimated Time of Use","使用予定時間","사용예정시간"],["Destination Alternate Aerodrome","目的地代替飛行場","목적지 교체비행장"],["Take-off Alternate Aerodrome","離陸代替飛行場","이륙 교체비행장"],["Point of No Return (PNR)","引き返し不能点","귀환불능지점"],["Operations Specifications (OpSpecs)","運営基準","운영기준"]],
quiz:[{q:"How is the “estimated time of use” taken?",opts:["30 minutes either side of arrival","One hour either side of arrival","From departure to arrival","From three hours before arrival"],a:1,exp:"Note to 8.1.9.9."},
{q:"How many destination alternates must an operator select when no destination weather is available?",opts:["None","One","At least two","Three or more"],a:2,exp:"8.1.9.10 b."},
{q:"Where alternate minima are not published, what applies to a precision-approach aerodrome?",opts:["400 ft and 1.5 km","600 ft and 3 km","800 ft and 5 km","1,000 ft and 8 km"],a:1,exp:"8.1.9.11 b 1)."}],
next:"2-3 Aerodrome operating minima and hazardous weather"});
set("2-3",{title:"Aerodrome Operating Minima and Hazardous Weather",hl:"operating minima",subtitle:"The aerodrome operating minima airlines set for each airport (with an annex on international standards added in March 2026), and how to think about thunderstorms, turbulence, wind shear and volcanic ash",
lead:["Even at the same airport, the lowest weather in which an aircraft may land depends on its equipment, the crew’s qualifications and the runway facilities. Airlines set aerodrome operating minima for each airport and have their method approved by the state.","This lesson confirms the rules in 8.1.11.6 of Korea’s Flight Safety Regulations and sets out how dispatchers approach hazardous weather."],
sections:[
{h:"What aerodrome operating minima are",blocks:[{t:"check",items:[
{name:"Set for each airport",x:"Air operator certificate holders set operating minima for each aerodrome they use and have the method approved by the Minister or a regional aviation administration (8.1.11.6 a)."},
{name:"Not below the local state’s minima",x:"Unless specifically approved by the state where the aerodrome is, they must not be lower than that state’s minima."},
{name:"The 2026 amendment",x:"The March 2026 amendment (Notice 2026-154) added an annex (Annex 7.1.11.6) setting out the international standards airlines should refer to when setting operating minima."}]}]},
{h:"What must be considered",blocks:[{t:"table",cols:["","Consideration (8.1.11.6 c)"],rows:[
["1","Aircraft type, performance, handling and flight manual conditions and limits"],
["2","Flight crew composition, competence and experience"],
["3","Runway dimensions and characteristics"],
["4","Adequacy and performance of visual and non-visual ground aids"],
["5","Aircraft equipment for approach, landing and missed approach"],
["6","Obstacles in approach and missed-approach areas and obstacle clearance altitudes"],
["7","Means of reporting and determining weather"],
["8","Obstacles in the climb-out area and necessary clearance"],
["9","Conditions set in the operations specifications"],
["10","Minima published by the state where the aerodrome is"]]},
{t:"note",x:"* Operational credit (lower minima based on advanced aircraft capabilities) requires approval and is stated in the operations specifications (8.1.11.6 e)."}]},
{h:"Approaching hazardous weather",blocks:[{t:"rows",items:[
{name:"Thunderstorms (CB)",x:"They bring severe turbulence, hail, lightning and wind shear, so the principle is to avoid them. When they affect departure or arrival times, consider adjusting the ETA, the alternate and extra fuel."},
{name:"Turbulence",x:"Near jet streams, clear air turbulence (CAT) occurs even in clear skies. Use charts and pilot reports to choose levels and routes, and share information with cabin and ground."},
{name:"Wind shear",x:"Sudden wind changes near take-off and landing. With airport alerts or pilot reports, review departure and arrival times."},
{name:"Volcanic ash",x:"It damages engines and instruments; check its extent through volcanic ash advisories, SIGMETs and ASHTAMs, and plan avoiding routes and fuel (Part 3)."},
{name:"Snow and icing",x:"Check de-icing holdover times and runway conditions (Parts 3 and 7)."}]}]},
{h:"How this connects to ground work",blocks:[{t:"check",items:[
{name:"Minima differ by airline",x:"Flights arriving at the same airport at the same time can have different lower limits by airline and aircraft, useful when passengers ask why another airline could land."},
{name:"Share early",x:"When weather is expected to worsen, stations and the OCC share information early because it affects connections, hotels and crew."}]}]}],
voice:"",
terms:[["Aerodrome Operating Minima","飛行場運営最低値","비행장운영최저치"],["Clear Air Turbulence (CAT)","晴天乱気流","청천난류"],["Wind Shear","ウインドシア","윈드시어"],["Volcanic Ash","火山灰","화산재"],["Operational Credit","オペレーショナル・クレジット","운항기준 완화"]],
quiz:[{q:"Which is true of aerodrome operating minima?",opts:["One worldwide value","Set by each airline for each airport, with the method approved","Chosen freely by pilots each time","Set by the airport for all airlines"],a:1,exp:"8.1.11.6 a."},
{q:"How do they relate to the minima of the state where the airport is?",opts:["Not lower, unless specifically approved","May always be lower","No relation","Must be double"],a:0,exp:"8.1.11.6 a."},
{q:"Which turbulence occurs in clear skies?",opts:["Wind shear","Clear air turbulence (CAT)","Thunderstorms","Icing"],a:1,exp:"Common near jet streams."}],
next:"Part 3 NOTAM — 3-1 How NOTAMs work and how to read them"});
})(window.ARTS);
