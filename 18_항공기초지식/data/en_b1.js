/* 航空の基礎知識 1-3 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("1-3",{title:"Reading the Airport Forecast (TAF): TEMPO, BECMG and FM",hl:"TAF",subtitle:"The line people miss most is TEMPO. Understand the change groups and you can start ground preparations earlier",
lead:["Airport weather is reported as current observations (METAR) and forecasts (TAF). Operational decisions belong to dispatch and the captain, but ground work changes with the weather too: lightning stops ramp work, snow means de-icing, and a typhoon starts cancellation and rebooking plans.","This lesson reads a TAF using a numbered example, shows the differences between the FM, BECMG, TEMPO and PROB change groups on a timeline, and looks at how stations and handlers use the TAF."],
sections:[
{h:"METAR and TAF",blocks:[{t:"table",cols:["","METAR (routine observation)","TAF (aerodrome forecast)"],rows:[
["Content","Weather observed now","Weather expected"],
["Issued","Usually every 30–60 minutes (SPECI for sudden changes)","Usually every 6 hours; valid for 9–30 hours"],
["Area","The airport","About 8 km (5 NM) around the airport"],
["Amendments","—","AMD (amended), COR (corrected), CNL (cancelled)"]]},
{t:"point",x:"All times are UTC (the Z at the end). Japan and Korea are UTC+9: 0500Z is 14:00 local time."}]},
{h:"Reading an example TAF by number",blocks:[{t:"fig",id:"taf_example",cap:"A fictional TAF for Haneda (RJTT). Numbers match the table below."},
{t:"table",cols:["No.","Part","Meaning"],rows:[
["1","TAF RJTT","An aerodrome forecast for the ICAO airport RJTT (Haneda)"],
["2","250500Z","Issued on the 25th at 05:00 UTC (14:00 in Japan)"],
["3","2506/2612","Valid from 06:00 UTC on the 25th to 12:00 UTC on the 26th: 30 hours"],
["4","18012KT 9999 FEW020 SCT040","Base forecast: wind from 180° at 12 knots, visibility 10 km or more, few clouds at 2,000 ft, scattered at 4,000 ft"],
["5","BECMG 2509/2511 22018G30KT","Changing gradually between 09 and 11 UTC on the 25th, then wind from 220° at 18 knots gusting 30"],
["6","TEMPO 2512/2518 4000 SHRA BKN015","Between 12 and 18 UTC, temporary rain showers with visibility 4 km and broken cloud at 1,500 ft"],
["7","PROB30 TEMPO 2518/2521 1500 TSRA BKN010CB","Between 18 and 21 UTC, a 30% chance of temporary thunderstorms, visibility 1.5 km, cumulonimbus"],
["8","FM260300 34010KT 9999 FEW030","From 03:00 UTC on the 26th, conditions change to northerly winds of 10 knots and fine weather"]]}]},
{h:"The change groups (the most important part)",blocks:[{t:"fig",id:"taf_timeline",cap:"The example laid out on a timeline. Numbers match the table above."},
{t:"table",cols:["Group","Meaning","Reading tip"],rows:[
["FM (from)","A rapid, complete change from that time","Read everything after FM as a new forecast; nothing carries over"],
["BECMG (becoming)","A gradual change during the period","After the period, the new conditions persist"],
["TEMPO (temporary)","Temporary fluctuations, each under an hour and together under half the period","The base forecast still applies; this is the line most often missed"],
["PROB30 / PROB40","A 30% or 40% chance","PROB40 is not used in the first six hours; often combined with TEMPO"]]},
{t:"point",warn:true,x:"The base forecast may look fine, but if a TEMPO line shows thunderstorms or heavy snow, work may stop or run late in that window. Always read a TAF to the last line."}]},
{h:"Common codes",blocks:[{t:"table",cols:["Code","Meaning","Code","Meaning"],rows:[
["RA, SHRA","Rain, rain showers","TS, TSRA","Thunder, thunderstorm with rain"],
["SN, SHSN","Snow, snow showers","FZRA","Freezing rain"],
["FG, BR","Fog, mist","HZ","Haze"],
["+, −","Heavy, light (e.g. +RA)","VC","In the vicinity (e.g. VCTS)"],
["FEW, SCT","Few, scattered cloud","BKN, OVC","Broken, overcast"],
["CB, TCU","Cumulonimbus, towering cumulus","CAVOK","Visibility, cloud and weather all OK"],
["9999","Visibility 10 km or more","NSW","No significant weather"],
["G (e.g. 18G30KT)","Gusts (maximum speed)","VRB","Variable wind direction"]]}]},
{h:"Using the TAF on the ground",blocks:[{t:"check",items:[
{name:"Lightning",x:"If TEMPO or PROB lines show TS or CB, check staffing and timings in case ramp work stops under airport or company rules."},
{name:"Snow and ice",x:"With SN, FZRA or low temperatures, arrange de-icing and share expected delays early."},
{name:"Strong winds",x:"Strong gusts limit boarding bridges, steps and cargo work."},
{name:"Fog and low cloud",x:"Poor visibility raises the risk of delays and diversions; think about receiving inbound flights and diversion stations."},
{name:"Typhoons",x:"Follow forecasts days ahead and prepare cancellations, rebooking and early passenger notices (5-8 in Course 1)."}]},
{t:"point",x:"Dispatch and the captain decide. Stations and handlers read the TAF so they can start preparing early, protecting passengers and safety on the ramp."}]}],
voice:"[Interview to be added] Spotting a TEMPO line and preparing early for lightning.",
terms:[["Terminal Aerodrome Forecast (TAF)","運航用飛行場予報","공항 예보(TAF)"],["METAR","定時飛行場実況気象","정시 관측(METAR)"],["TEMPO","一時的な変動","일시적 변동"],["BECMG","徐々に変わる","서서히 변화"],["Gust","突風","돌풍"],["Visibility","視程","시정"]],
quiz:[{q:"What does TEMPO mean?",opts:["A complete change from that time","Temporary fluctuations, each under an hour and together under half the period","A 30% probability","An observation"],a:1,exp:"The base forecast still applies; it is the line most often missed."},
{q:"How do you read what follows FM?",opts:["Add it to the previous forecast","As a completely new forecast","Ignore it","As a probability"],a:1,exp:"Nothing carries over after FM."},
{q:"What is 0500Z in Japan?",opts:["05:00","14:00","20:00","23:00"],a:1,exp:"UTC plus nine hours."}],
next:"Part 2 Airports and the Rules of the Sky — 2-1 How airport slots work"});
})(window.ARTS);
