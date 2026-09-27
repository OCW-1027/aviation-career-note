/* 運航管理の実務 Part 7 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("7-1",{title:"Ground Icing and De-/Anti-icing: Korean and Japanese Rules",hl:"de-/anti-icing",subtitle:"Never take off with ice, frost or snow adhering. De-icing versus anti-icing, one- and two-step procedures, fluid types, and when the dispatcher must not release a flight",
lead:["Even a thin layer of frost on the wing reduces lift and raises the stall speed. Korea and Japan therefore both require that no aircraft take off with ice, frost or snow adhering to it: the clean aircraft concept.","In winter operations, contamination is removed (de-icing) and prevented from re-forming until take-off (anti-icing) under approved procedures. This lesson covers the rules in both countries, the basics of the work and the dispatcher’s role."],
sections:[
{h:"Korean and Japanese rules",blocks:[{t:"table",cols:["Item","Korea (Flight Safety Regulations)","Japan (detailed rules for operations manuals, etc.)"],rows:[
["Taking off contaminated","8.1.11.3 b: no take-off with frost, ice or snow on wings, control surfaces, propellers, engine inlets or other critical surfaces that affects performance or control","11-2(2): the operations manual must state that no take-off may be made with ice, frost or snow adhering that affects flight performance"],
["Procedures","8.1.11.3 c: where adherence is expected, no take-off unless ground de-/anti-icing is carried out under procedures approved by the Minister","12-1: aircraft-type procedures must include pre-flight de-/anti-icing"],
["Programme approval","9.1.18.14: anti-icing equipment, crew training and an approved ground de-/anti-icing programme (details in Annex 9.1.18.14)","15-2-5 and 15-3(5): de-/anti-icing work and training follow the separate de-/anti-icing review guideline"],
["When a flight must not be released","8.4.10.8: (1) when icing is expected that the approved equipment cannot handle, or (2) when facilities for the approved ground procedures are not available at the departure airport and adherence is expected, the AOC holder must not release the flight","Set out by each company in its operations and de-icing manuals (the dispatcher checks at release)"]]},
{t:"note",x:"* Korean provisions: Notice 2026-154 (effective 25 March 2026). Japanese provisions are cited by paragraph number. Detailed procedures follow each company’s approved programme. ★"}]},
{h:"De-icing and anti-icing",blocks:[{t:"cards",n:2,items:[
{ic:"🧹",name:"De-icing",x:"Removing snow, ice and frost, usually with heated fluid."},
{ic:"🛡️",name:"Anti-icing",x:"Protecting the clean surface with thickened fluid so that nothing re-forms before take-off."}]},
{t:"table",cols:["Procedure","What it is","Typical use"],rows:[
["One-step","De-icing and anti-icing in a single application","Light frost and other light contamination"],
["Two-step","(1) De-ice with heated fluid, then (2) immediately apply anti-icing fluid","Falling snow, freezing rain and similar"]]},
{t:"table",cols:["Fluid type","Typical characteristics"],rows:[
["TYPE I","Thin fluid, used heated, mainly for de-icing; short protection time"],
["TYPE II and III","Thickened anti-icing fluids; Type III for aircraft with lower rotation speeds"],
["TYPE IV","Highly thickened anti-icing fluid with long protection time"]]},
{t:"note",x:"* Colour, concentration and use depend on the product and company rules. In Japan, dyed fluids that make coverage easier to see have spread since the 2024 winter schedule (see the Itami and New Chitose lessons in the airport guide). ★"}]},
{h:"Who does what",blocks:[{t:"rows",items:[
{name:"Captain",x:"Makes the final judgement that the aircraft is clean, and receives the application report (fluid type, concentration, start time of the final application)."},
{name:"De-icing crew (handling company, etc.)",x:"Works to approved procedures and reports to the captain; training and qualification records are required."},
{name:"Dispatcher",x:"Anticipates de-icing needs and times from the forecast and plans for the effect on delays, fuel and duty time; does not release the flight when icing cannot be handled or facilities are unavailable (Korea 8.4.10.8)."},
{name:"Station and duty manager",x:"Collects sequence and waiting-time information for departure estimates and passenger announcements."}]},
{t:"point",warn:true,x:"There is no “just a little”. Contamination is a hazard that performance calculations do not account for. When in doubt, de-ice."}]}],
voice:"",
terms:[["Ground De-/Anti-icing","防除雪氷（地上）","지상 제빙·방빙"],["De-icing","除氷","제빙"],["Anti-icing","防氷","방빙"],["Clean Aircraft Concept","クリーン・エアクラフト","클린 에어크래프트(깨끗한 기체)"],["Two-step Procedure","2段階の作業","2단계 작업"],["De-/Anti-icing Fluid","防除雪氷剤","제빙·방빙액"]],
quiz:[{q:"Under Korea’s FSR, if the departure airport lacks facilities for approved ground procedures and adherence is expected, the AOC holder…",opts:["Departs at the captain’s discretion","Must not release the flight","May depart after anti-icing only","De-ices at the destination"],a:1,exp:"FSR 8.4.10.8."},
{q:"What is the difference between de-icing and anti-icing?",opts:["None","De-icing removes contamination; anti-icing prevents it re-forming","Anti-icing is done after take-off","De-icing is done in the cabin"],a:1,exp:"In a two-step procedure, anti-icing fluid follows de-icing immediately."},
{q:"Under Japan’s detailed rules, de-icing work and training follow…",opts:["Airport notices","The de-/anti-icing review guideline","IATA guidance only","Nothing"],a:1,exp:"Detailed rules 15-2-5 and 15-3(5)."}],
next:"7-2 Holdover time"});
set("7-2",{title:"Holdover Time: How Long Anti-icing Fluid Protects",hl:"holdover time",subtitle:"Counted from the start of the final application; it changes with fluid, concentration, temperature and the type and intensity of precipitation. When it runs out, check or re-treat under company procedures",
lead:["Anti-icing fluid does not protect indefinitely. As snow keeps falling, the fluid dilutes until snow starts to accumulate. The time the fluid is expected to protect is the holdover time (the “duration” defined in Korea’s FSR).","For dispatchers and stations, the task is to link the de-icing sequence, taxi and take-off order so that the aircraft departs within that time. This lesson covers how the time is counted, what changes it, and a practice example."],
sections:[
{h:"Definition and start time",blocks:[{t:"table",cols:["","Korea","Japan"],rows:[
["Basis","FSR 9.1.1 definition 12)","Detailed rules 11-2(2)"],
["Content","The expected time fluid prevents frost and ice forming and snow accumulating on critical surfaces","Where anti-icing fluid is used, its holdover time for the weather conditions is set together with its method of use"],
["Start","From the start of the final application until the fluid loses effect","Company procedures (generally from the start of the final application)"]]},
{t:"point",x:"The clock starts when the final application begins, not when it ends. In a two-step procedure, that is the start of step two (anti-icing)."}]},
{h:"What changes the time",blocks:[{t:"check",items:[
{name:"Fluid type and concentration",x:"Type IV is long, Type I short; dilution changes it too."},
{name:"Outside air temperature",x:"Colder often means shorter; tables are divided by temperature band."},
{name:"Type of precipitation",x:"Frost, freezing fog, snow, freezing drizzle and freezing rain differ greatly."},
{name:"Intensity",x:"Light and moderate snow give very different times; heavier means shorter."},
{name:"Wind, jet blast and sun",x:"Table values are guides; exhaust from other aircraft and strong wind shorten them."}]}]},
{h:"Practice: a morning at New Chitose",blocks:[{t:"table",cols:["Conditions (practice)","Detail"],rows:[
["Flight","New Chitose → Haneda, STD 07:40"],
["Weather","Moderate snow, OAT −3 °C"],
["Treatment","Two-step; step two Type IV (neat) started 07:10"],
["Practice table value","Moderate snow, −3 °C, Type IV: 25–45 min (fictitious)"]]},
{t:"table",cols:["Question","Answer"],rows:[
["Time window","07:10 + 25 = 07:35 to 07:10 + 45 = 07:55"],
["Expected take-off","15 min taxi from stand to runway, 8 min queue → off stand 07:33 means take-off about 07:56"],
["Decision","Even the upper limit (07:55) is likely to be exceeded: move the treatment closer to departure, shorten the taxi, or plan re-treatment or a check under company procedures"]]},
{t:"note",x:"* The table values are fictitious practice figures. Real values come from the official tables published each year and product-specific tables for the fluid used. The lower value applies to heavier precipitation, the upper to lighter. ★"}]},
{h:"Planning to stay within the time",blocks:[{t:"rows",items:[
{name:"1 Anticipate",x:"From the timing and intensity of snow or freezing rain, estimate which flights need treatment and how long it takes, the day before"},
{name:"2 Sequence",x:"Match the treatment order to departure order and avoid treating too early (it wastes holdover time)"},
{name:"3 Shorten the taxi",x:"Share the time from the treatment location (stand or pad) to the runway, and the take-off order, with ATC and the airport"},
{name:"4 Add fuel and time",x:"Add taxi fuel for long taxi and waits (Part 5) and check duty-time extensions (Part 6)"},
{name:"5 When it runs out",x:"Follow company procedures: pre-takeoff contamination check or re-treatment. Never force a departure"}]}]}],
voice:"",
terms:[["Holdover Time (HOT)","ホールドオーバータイム（持続時間）","지속시간(홀드오버 타임)"],["Start of Final Fluid Application","最後の散布の開始","마지막 살포 시작"],["Freezing Rain","着氷性の雨","어는 비"],["Pre-takeoff Contamination Check","離陸前の汚染の確認","이륙 전 오염 점검"],["De-icing Sequence","作業の順番","작업 순서"]],
quiz:[{q:"When does holdover time start?",opts:["When treatment ends","When the final application begins","At STD","At pushback"],a:1,exp:"Korea’s definition also counts from the start of the final application."},
{q:"With a 25–45 min range, when does the lower value apply?",opts:["Heavier precipitation","Lighter precipitation","Clear skies","Only at night"],a:0,exp:"Heavier precipitation shortens the time."},
{q:"If long taxi or de-icing queues are expected, what does the dispatcher plan for?",opts:["Nothing","Extra taxi fuel and duty-time checks","Destination weather only","Fare changes"],a:1,exp:"This links to Part 5 (fuel) and Part 6 (crew scheduling)."}],
next:"7-3 Runway condition and winter operations (GRF)"});
set("7-3",{title:"Runway Condition and Winter Operations: Reading GRF and SNOWTAM",hl:"runway condition",subtitle:"The worldwide format (GRF) that reports each third of the runway as a code from 0 to 6; reading a SNOWTAM, pilot braking reports, and what dispatchers check",
lead:["On runways covered with snow or ice, stopping distances grow dramatically. Countries and airports once reported slipperiness in different ways; ICAO applied a worldwide Global Reporting Format (GRF) from 4 November 2021.","This lesson covers the runway condition code (RWYCC), reading a SNOWTAM, how practice changed in Japan, and what the dispatcher checks before departure."],
sections:[
{h:"Runway condition codes (RWYCC)",blocks:[{t:"table",cols:["RWYCC","Runway condition (main examples)","Braking action"],rows:[
["6","Dry","—"],
["5","Frost; wet (3 mm water or less); 3 mm or less of snow or slush","GOOD"],
["4","Compacted snow (OAT −15 °C or colder)","GOOD TO MEDIUM"],
["3","Slippery wet; more than 3 mm dry or wet snow; compacted snow (warmer than −15 °C)","MEDIUM"],
["2","More than 3 mm standing water or slush","MEDIUM TO POOR"],
["1","Ice","POOR"],
["0","Wet ice; water on compacted snow; snow on ice","LESS THAN POOR"]]},
{t:"note",x:"* Summary of ICAO’s Runway Condition Assessment Matrix (RCAM); airports may upgrade or downgrade codes under set procedures. Many companies do not permit operations on code 0 (company rules apply)."}]},
{h:"Reading a SNOWTAM (practice)",blocks:[{t:"table",cols:["Item","Example","Meaning"],rows:[
["Location and time","RJCC 01132230","New Chitose, observed 13 January 22:30 UTC"],
["Runway","01L","Runway 01L (reported for the lower designator)"],
["RWYCC (thirds)","3/3/3","A code for each third of the runway"],
["Coverage","100/100/100","Percentage of each third covered"],
["Depth (mm)","05/05/05","Depth of contaminant; NR if not measured or not required"],
["Condition","DRY SNOW/DRY SNOW/DRY SNOW","Condition of each third"]]},
{t:"note",x:"* Fictitious practice example showing only part of the fields. A SNOWTAM is valid for 8 hours; a new one is issued within 8 hours even if nothing changes. ★"}]},
{h:"Practice in Korea and Japan",blocks:[{t:"table",cols:["","Korea","Japan"],rows:[
["Before take-off","FSR 8.1.11.2: the captain analyses available information to confirm the runway condition allows a safe take-off","Set in the operations manual (detailed rules 11-2(1): operating limits and take-off/landing weight limits on snow- and ice-covered runways, by performance)"],
["Performance","8.1.10.2 d: runway condition (water, slush, snow, ice) must be considered in performance calculations","As above (type limitations)"],
["Friction coefficient (μ)","—","After GRF began, μ values were reported alongside RWYCC for a period; an ATC rule change ending runway friction measurement applied from 2 November 2023 ★"],
["Pilot reports","—","Detailed rules 3-6: on landing, if braking is worse than reported, report it using the terms matching RWYCC (GOOD to LESS THAN POOR)"]]}]},
{h:"What the dispatcher checks",blocks:[{t:"check",items:[
{name:"SNOWTAM and NOTAM",x:"Latest SNOWTAMs for departure, destination and alternates; planned runway closures for snow clearance by NOTAM."},
{name:"Performance",x:"RWYCC and head- or tailwind change take-off and landing weight limits, and therefore payload."},
{name:"Alternates",x:"An airport in the same snowstorm as the destination is a weak alternate; choose one under a different weather system."},
{name:"Fuel",x:"Runway closures for clearance mean holding; add fuel for the expected wait (Part 5)."},
{name:"Collecting reports",x:"Pilot braking reports inform the next flights; share them between station and dispatch."}]},
{t:"point",x:"Winter decisions look not only at whether you can depart, but whether you can land and whether you can come back."}]}],
voice:"",
terms:[["Global Reporting Format (GRF)","世界共通の報告の方式","세계 공통 보고 방식"],["Runway Condition Code (RWYCC)","滑走路状態コード","활주로 상태 코드"],["Runway Condition Assessment Matrix (RCAM)","滑走路状態評価マトリクス","활주로 상태 평가표"],["SNOWTAM","スノータム","스노탐"],["Braking Action Report","ブレーキングの報告","제동 상태 보고"],["Compacted Snow","圧雪","다져진 눈"]],
quiz:[{q:"Which runway condition corresponds to RWYCC 1?",opts:["Dry","Wet","Ice","3 mm or less of snow"],a:2,exp:"1 = ice (POOR); 0 = wet ice and similar (LESS THAN POOR)."},
{q:"How long is a SNOWTAM valid?",opts:["1 hour","8 hours","24 hours","1 week"],a:1,exp:"Eight hours under GRF."},
{q:"How should a winter alternate be chosen?",opts:["The nearest to the destination","One under a different weather system","One with a short runway","Any will do"],a:1,exp:"Airports in the same snowstorm can close at the same time."}],
next:"8-1 Diversions and turn-backs"});
})(window.ARTS);
