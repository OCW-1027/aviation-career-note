/* 航空機と整備 Part 1 — English version (1-1〜1-2) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("1-1",{title:"Airframe Structure and Materials: the Aluminium 737 and the Composite 787",hl:"Structure and Materials",subtitle:"What the fuselage, wings and tail do; aluminium alloy and carbon-fibre composite; fatigue, corrosion, impact damage and lightning",
lead:["An airliner fuselage is like a tube inflated with air. At altitude the cabin pressure is higher than outside, so the fuselage expands and contracts with every flight. How well it withstands that repetition sets its life and what inspections it needs.","The 737 is mainly aluminium alloy, while most of the 787’s fuselage and wings are carbon-fibre composite. Different materials mean different things to watch."],
sections:[
{h:"The two aircraft’s materials",blocks:[{t:"fig",id:"mnt_struct",cap:"Animated figure: the 737 is mainly aluminium alloy; about half of the 787’s weight is carbon-fibre composite. Each material has its own points to watch."},
{t:"table",cols:["","737","787"],rows:[
["Fuselage","Aluminium skin panels joined with rivets","Composite barrels cured in one piece (several sections)"],
["Wings","Aluminium alloy","Composite"],
["What to watch","Metal fatigue and corrosion","Impact damage that is hard to see; checks after lightning"],
["Cabin environment","Cabin altitude up to about 8,000 ft; dry air","Less corrosion risk, so cabin altitude can be kept lower (about 6,000 ft) and humidity higher ★"]]}]},
{h:"What the fuselage, wings and tail do",blocks:[{t:"rows",items:[
{name:"Fuselage",x:"Encloses the cabin and holds and carries the pressurisation loads; door and window surrounds are reinforced"},
{name:"Wings",x:"Produce lift and double as fuel tanks; they carry the engines and main landing gear"},
{name:"Tail",x:"The horizontal tail (elevator and stabiliser) and fin (rudder) keep the nose stable up and down and side to side"},
{name:"Flight control surfaces",x:"Ailerons, elevators, rudder, flaps and spoilers; moving parts are a focus of inspections"}]}]},
{h:"What tends to happen on the ground",blocks:[{t:"check",items:[
{name:"Ground equipment contact",x:"Belt loaders, catering trucks and boarding bridges can touch the aircraft. Composite damage is hard to see from outside, so always tell maintenance, however small (hiding it is the most dangerous thing)"},
{name:"Around the doors",x:"Avoid damaging frames and seals when opening and closing doors"},
{name:"Lightning and birds",x:"Aircraft hit by lightning or birds get set inspections after arrival, which can delay departure"},
{name:"Hold floors",x:"Dropping heavy cargo or exceeding floor strength damages the structure"}]},
{t:"point",warn:true,x:"Even if it was “only a scrape”, the aircraft must not depart until an engineer has looked. A just culture that does not blame people for reporting keeps the aircraft safe."}]}],
voice:"A workplace where someone immediately puts their hand up when something touches the aircraft is a strong one. Station managers should always thank the person who reported it.",
terms:[["Fuselage","胴体","동체"],["Skin","外板","외피"],["Composite","複合材","복합재"],["Metal fatigue","金属疲労","금속 피로"],["Corrosion","腐食","부식"],["Lightning strike","落雷","낙뢰"]],
quiz:[{q:"What is the 787’s fuselage mainly made of?",opts:["Aluminium alloy","Carbon-fibre composite","Steel","Wood"],a:1,exp:"Most of the 787’s fuselage and wings are carbon-fibre composite."},
{q:"If ground equipment touches a composite aircraft, what matters most?",opts:["Don’t report it if nothing shows","Always tell maintenance, however small","Wipe it and fix it yourself","Report it after departure"],a:1,exp:"Composite damage is hard to see from outside, so even small contact must be reported to maintenance."},
{q:"What needs particular attention on an aluminium aircraft?",opts:["Metal fatigue and corrosion","Lightning current cannot flow","It does not float","It is too heavy"],a:0,exp:"Aluminium needs watching for fatigue from repeated flights and for corrosion."}],
next:"1-2 Air and Electricity"});
set("1-2",{title:"Air and Electricity: the Bleed-Air 737 and the More-Electric 787",hl:"Air and Electricity",subtitle:"What powers air conditioning, pressurisation, anti-icing and engine starting; ground power and air units; what happens when the APU is inoperative",
lead:["Air conditioning, pressurisation, wing anti-icing and engine starting all need a lot of power. The 737 pipes hot air tapped from the engines (bleed air), while the 787 runs them on electricity from engine-driven generators.","That difference carries through to the ground power and air units used on the stand, what happens when the APU is unavailable, and where maintenance focuses."],
sections:[
{h:"Different sources of power",blocks:[{t:"fig",id:"mnt_bleed",cap:"Animated figure: on the 737, engine air flows through ducts to air conditioning, pressurisation, wing anti-icing and engine starting; on the 787, electricity from the generators flows through cables to the same places."},
{t:"table",cols:["","737","787"],rows:[
["Air conditioning and pressurisation","Bleed air cooled in packs and fed to the cabin","Electric compressors draw in outside air for the cabin"],
["Wing anti-icing","Hot bleed air to the leading edges","Electric heater mats in the leading edges"],
["Engine starting","Turned by air from the APU or a ground unit","Generators used as motors to start the engines electrically"],
["Generating capacity","One generator per engine (about 90 kVA) ★","Two generators per engine (about 250 kVA each) ★"]]}]},
{h:"Differences on the ground",blocks:[{t:"rows",items:[
{name:"Ground power (GPU)",x:"Both use it. The 787 needs more power, so check the units and number of connections available (otherwise the APU keeps running)"},
{name:"Air start units",x:"A 737 with an inoperative APU needs an air start unit to start its engines; the 787 does not use one (it starts electrically)"},
{name:"Pre-conditioned air (PCA)",x:"Units that cool or heat the cabin on the stand in summer and winter; equipment and charges vary by airport"},
{name:"APU inoperative (MEL)",x:"Ground power, air and PCA must be arranged, and departure preparation can take longer"}]},
{t:"point",x:"When an aircraft arrives with its APU inoperative, some airports do not have enough ground equipment and departures slip. As soon as dispatch and maintenance tell you, book the ground equipment."}]},
{h:"Where maintenance focuses",blocks:[{t:"check",items:[
{name:"737",x:"Ducts, valves and packs; bleed leaks or abnormal temperatures can also cause smells or smoke"},
{name:"787",x:"Electrical systems, batteries and software versions; defect data is recorded and can often be checked from the ground"},
{name:"Both",x:"Complaints about cabin temperature, smells and noise are important clues for maintenance. Pass cabin crew and passenger services reports into the technical log"}]}]}],
voice:"On a summer morning, an aircraft without its APU heats up fast. Stations should know in advance where the PCA units are and how quickly they can arrive.",
terms:[["Bleed air","ブリード","블리드"],["Air-conditioning pack","パック（空調装置）","팩(공조 장치)"],["Ground power unit (GPU)","地上電源装置","지상 전원 장치"],["Air start unit","エアスタート・ユニット","에어 스타트 유닛"],["Pre-conditioned air unit (PCA)","冷暖房車","냉난방 차"],["Auxiliary power unit (APU)","補助動力装置","보조동력장치"]],
quiz:[{q:"What does the 737 use for wing anti-icing?",opts:["Electric heater mats","Engine bleed air","Ground power","Chemical fluid"],a:1,exp:"The 737 sends hot bleed air to the wing leading edges; the 787 uses electric heater mats."},
{q:"How are the 787’s engines started?",opts:["With an air start unit","By using the generators as motors","By hand","They need no starting"],a:1,exp:"The 787 uses its generators as motors to start the engines electrically."},
{q:"An aircraft arrives with its APU inoperative. What should the station do first?",opts:["Nothing","Book ground power, air and PCA","Deplane the passengers","Press maintenance to fix it"],a:1,exp:"Without the APU, ground equipment is needed, so the station arranges it immediately."}],
next:"1-3 Hydraulics, Landing Gear, Brakes and Tyres"});
})(window.ARTS);
