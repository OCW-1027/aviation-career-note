/* 航空機と整備 Part 1 — English version (1-3〜1-4) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("1-3",{title:"Hydraulics, Landing Gear, Brakes and Tyres: the Systems You Meet Most on the Ground",hl:"Hydraulics and Gear",subtitle:"Three hydraulic systems, the 737’s hydraulic brakes and the 787’s electric brakes, tyre numbers and pressures, brake temperatures, gear pins and towing",
lead:["Moving the flight controls, raising and lowering the gear and stopping the wheels all take great force, produced by hydraulics (fluid under pressure). Airliners split their hydraulics into three systems so they can still fly if one fails.","Landing gear, brakes and tyres are what ramp staff see closest. Tyre pressures, brake heat and gear pins directly affect ground work and departure times."],
sections:[
{h:"Hydraulics and brakes compared",blocks:[{t:"fig",id:"mnt_hyd",cap:"Animated figure: on the 737, three hydraulic systems (about 3,000 psi) move the flight controls, gear and brakes. The 787 has three hydraulic systems (about 5,000 psi) but its brakes are electric."},
{t:"table",cols:["","737 (737-800)","787 (787-9)"],rows:[
["Hydraulic systems","A, B and standby (about 3,000 psi)","Left, centre and right (about 5,000 psi) ★"],
["Brakes","Hydraulic (carbon brakes)","Electric (carbon brakes)"],
["Main and nose gear","Two main legs × 2 wheels, nose gear 2 wheels","Two main legs × 4 wheels, nose gear 2 wheels"],
["Number of tyres","6","10"]]}]},
{h:"What to watch on the ground",blocks:[{t:"rows",items:[
{name:"Tyre pressure",x:"Checked daily and topped up with nitrogen; under-inflation leads to overheating or bursts"},
{name:"Brake temperature",x:"Brakes are hot after landing, especially on short runways or heavy landings. Departure may have to wait until they cool, which affects turnaround time"},
{name:"Brake wear",x:"Judged by the length of the wear pin; near the limit the brake must be changed"},
{name:"Gear lock pins",x:"Pins that stop the gear folding on the ground, with red REMOVE BEFORE FLIGHT streamers; always remove them and count them before departure"},
{name:"Towing",x:"Insert the pin that disconnects nose-wheel steering before towing; exceeding the turning limit damages the nose gear ★"}]},
{t:"point",warn:true,x:"Anyone on the ramp may spot a fluid leak, a cut tyre or a pin left in or forgotten. If you see one, do not judge it yourself: tell maintenance."}]},
{h:"What the station should prepare",blocks:[{t:"check",items:[
{name:"Spare tyres and brakes",x:"If a change is needed at an airport without parts and tools, the aircraft is stuck (AOG). Check with maintenance where spares are kept"},
{name:"Pushback and towing",x:"Check with the handler the drivers’ qualifications and type-specific rules (such as nose-gear angle)"},
{name:"Delay outlook",x:"Brake cooling and tyre changes take predictable time. Ask maintenance how long and use it in announcements"}]}]}],
voice:"The red REMOVE BEFORE FLIGHT streamers are the last thing everyone on the ramp counts with their eyes. Missing one is reason enough to stop, even moments before departure.",
terms:[["Hydraulics","油圧","유압"],["Main gear / nose gear","主脚・前脚","주·앞 착륙장치"],["Brake temperature","ブレーキの温度","브레이크 온도"],["Gear lock pin","脚のロックピン","착륙장치 고정 핀"],["Towing","牽引","견인"],["Nitrogen","窒素","질소"]],
quiz:[{q:"What powers the 787’s brakes?",opts:["Hydraulics","Electricity","Air","Manual effort"],a:1,exp:"The 737’s brakes are hydraulic; the 787’s are electric."},
{q:"How many tyres does a 787-9 have?",opts:["6","8","10","12"],a:2,exp:"Two main legs with four wheels each plus two nose wheels make ten. The 737 has six."},
{q:"What happens to gear pins with red REMOVE BEFORE FLIGHT streamers?",opts:["They stay in during flight","They are always removed and counted before departure","Only engineers look at them","They go in the hold"],a:1,exp:"Gear lock pins are removed before departure and the number removed is checked."}],
next:"1-4 Engines, APU, Fuel and the Documents on Board"});
set("1-4",{title:"Engines, APU, Fuel and the Documents Carried on Board",hl:"Engines and Documents",subtitle:"How a turbofan works, the 737 and 787 engines, the APU, fuel capacity, long-range twin-engine operations (EDTO) and the documents every aircraft must carry",
lead:["Airliner engines are turbofans: a large fan at the front draws in air and sends most of it around the outside as thrust. The 737 and 787 both have two engines, but they differ greatly in size and fuel efficiency.","The second half of this lesson checks the documents that must always travel with the aircraft. If even one is missing, the aircraft cannot depart."],
sections:[
{h:"How the engine works",blocks:[{t:"fig",id:"mnt_eng",cap:"Animated figure: the fan draws air in and most flows around the outside as thrust (bypass); the core air is compressed, burned and drives the turbines."},
{t:"table",cols:["","737","787"],rows:[
["Engines","737-800: CFM56-7B / 737 MAX: LEAP-1B","GEnx-1B or Trent 1000 (airline’s choice)"],
["Bypass ratio","About 5 (CFM56) to about 9 (LEAP) ★","About 9–10 ★"],
["Thrust (per engine)","About 26,000 lb ★","About 70,000 lb or more ★"],
["Fuel capacity (max)","About 26,000 litres ★","About 126,000 litres ★"]]}]},
{h:"APU and fuel",blocks:[{t:"rows",items:[
{name:"APU (auxiliary power unit)",x:"A small gas turbine in the tail. The 737’s supplies air and electricity, the 787’s electricity only. Some airports limit APU running time and require ground power and PCA instead ★"},
{name:"Fuelling",x:"Plans are in weight (kg), uplift in volume (litres); convert with the specific gravity and compare the fuel receipt with the aircraft gauges"},
{name:"Fuel quality",x:"The fuel company tests daily for water and contamination; if in doubt, fuelling stops"},
{name:"Fuel spills",x:"Stop work and call the fire service and the airport. Fuelling while passengers board or disembark has its own rules"}]},
{t:"point",x:"When a twin flies long distances over water and remote areas, the route is planned so it always stays within a set time of a suitable airport on one engine (EDTO/ETOPS). 787s are often approved for long times, and a set maintenance service check is required before departure ★."}]},
{h:"Documents carried on board",blocks:[{t:"table",cols:["Document","What it is"],rows:[
["Certificate of registration","Which state the aircraft is registered in (nationality and registration marks)"],
["Certificate of airworthiness","Certifies the aircraft is fit to fly (some states set a validity period)"],
["Radio station licence","Permission to use the aircraft’s radios"],
["Noise certificate","Shows the aircraft meets noise standards"],
["Journey log / technical log","Flight records, defects and maintenance actions"],
["Operating documents","Extracts from the operations manual, the MEL, insurance certificates, crew licences and so on"]]},
{t:"point",warn:true,x:"At foreign airports the authority may make unannounced checks of the aircraft and its documents (ramp inspections). Missing documents can stop the departure, so the station should know the checking procedure too."}]}],
voice:"The document folder is for maintenance and the captain to check, but a ramp inspection can still catch the station off guard. Decide in advance who escorts the inspectors and in what order things happen.",
terms:[["Turbofan","ターボファン","터보팬"],["Bypass ratio","バイパス比","바이패스비"],["Auxiliary power unit (APU)","補助動力装置","보조동력장치"],["Specific gravity","比重","비중"],["Certificate of registration","登録証明書","등록증명서"],["Ramp inspection","ランプ・インスペクション","램프 점검"]],
quiz:[{q:"What produces most of a turbofan’s thrust?",opts:["Only the hot gas from the core","Air the fan sends around the outside (bypass)","The APU","A propeller"],a:1,exp:"Most of the air drawn in by the fan flows around the outside and provides most of the thrust."},
{q:"What does the 787’s APU produce?",opts:["Air and electricity","Electricity only","Fuel","Hydraulic power only"],a:1,exp:"The 787 does not use bleed air, so its APU produces only electricity; the 737’s produces air and electricity."},
{q:"If one of the required documents is missing…",opts:["The aircraft can depart anyway","The aircraft cannot depart","It can be sent after arrival","The captain writes one by hand"],a:1,exp:"Without documents such as the registration or airworthiness certificate, the aircraft cannot depart."}],
next:"Part 2 Maintenance Programmes: 2-1 Check Levels"});
})(window.ARTS);
