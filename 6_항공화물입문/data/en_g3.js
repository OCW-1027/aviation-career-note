/* 航空貨物 入門 — English version (Part 3: 特殊な貨物) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("3-1",{title:"Dangerous Goods: What Can and Cannot Fly",hl:"dangerous goods",subtitle:"Classification, packing, marking and documents. All four, or it does not fly ★",
lead:["Lithium batteries, paint, aerosols, dry ice, chemicals. Many everyday goods count as dangerous goods in air transport. Under the international rules — ICAO’s technical instructions and the IATA dangerous goods regulations — they divide into goods that can fly, goods that can fly under conditions, and goods that cannot.",
"This article covers the classes, the four conditions for carriage, what acceptance checks, and the notification to the captain. The rules are revised every year, so always use the current edition."],
sections:[
{h:"The nine classes",blocks:[{t:"table",cols:["Class","Examples"],rows:[
["1 Explosives","Fireworks, ammunition"],
["2 Gases","Aerosols, fire extinguishers, oxygen cylinders"],
["3 Flammable liquids","Paint, alcohol, fuel"],
["4 Flammable solids","Matches, some metal powders"],
["5 Oxidisers and organic peroxides","Some bleaches"],
["6 Toxic and infectious substances","Pesticides, diagnostic specimens"],
["7 Radioactive material","Medical isotopes"],
["8 Corrosives","Battery acid, acids"],
["9 Miscellaneous","Lithium batteries, dry ice, magnetised material"]]}]},
{h:"The four conditions",blocks:[{t:"ladder",rise:10,steps:[{name:"Classify",sub:"The proper shipping name and UN number"},{name:"Pack",sub:"Approved packaging and quantities"},{name:"Mark and label",sub:"Labels and markings"},{name:"Document",sub:"The shipper’s declaration"}]},
{t:"point",warn:true,x:"Shipping dangerous goods without declaring them causes serious accidents and breaks the law. Where the commodity description is vague, check what is inside."}]},
{h:"Acceptance and loading",blocks:[{t:"check",items:[
{name:"Acceptance checklist",x:"Check documents, packing and marking against the set items, and refuse anything deficient."},
{name:"Segregation",x:"Keep apart combinations of classes that cannot travel together."},
{name:"Not on passenger aircraft",x:"Some dangerous goods may travel only on freighters."},
{name:"Notification to the captain",x:"Tell the captain what dangerous goods are loaded, in what quantity and where (4-1)."},
{name:"Training",x:"Anyone handling dangerous goods takes recurrent training for their role."}]}]}],
voice:"[Interview to be added] Undeclared dangerous goods you found at acceptance.",
terms:[["Dangerous Goods Regulations (DGR)","危険物規則","위험물 규정"],["UN Number","国連番号","UN 번호"],["Shipper’s Declaration","荷主の申告書","화주 신고서"],["Undeclared Dangerous Goods","隠れ危険物","미신고 위험물"]],
quiz:[{q:"What are the four conditions for carrying dangerous goods?",opts:["Classification, packing, marking and documents","Colour, shape, weight and price","Shipper, rate, flight and weather","None"],a:0,exp:"All four must be in place."},
{q:"Which class covers lithium batteries?",opts:["1","3","9","7"],a:2,exp:"Class 9, miscellaneous dangerous goods."},
{q:"Who is told what dangerous goods are on board?",opts:["The captain","A travel agency","Only the consignee","Passengers"],a:0,exp:"Type, quantity and position."}],
next:"3-2 Live animals"});

set("3-2",{title:"Live Animals",hl:"live animals",subtitle:"The animal’s welfare, its safety, and the destination’s quarantine, all at once",
lead:["Pets, ornamental fish, laboratory animals, livestock, racehorses. Aircraft carry a great many live animals. An animal is a living thing before it is cargo: temperature, ventilation, water and stress all have to be managed, and the destination’s quarantine requirements met.",
"This article covers the basics of carrying animals, the container requirements, loading, and quarantine on arrival (for pets as passenger baggage, see Ground Staff 1-8)."],
sections:[
{h:"The basics",blocks:[{t:"check",items:[
{name:"International rules",x:"Follow IATA’s live animals regulations and the container and condition requirements for each species."},
{name:"Check at booking",x:"Which animals and how many can travel depends on the flight and aircraft, and there may be restrictions in hot or cold weather."},
{name:"Documents",x:"Health certificates, import and export permits where required, and the shipper’s certification."},
{name:"Protected species",x:"Animals under international trade controls need the relevant permits."}]}]},
{h:"Container and loading",blocks:[{t:"table",cols:["Item","What matters"],rows:[
["Container","Big enough to stand and turn around in, ventilated, escape-proof, with access for food and water"],
["Marking","The live animals label and orientation markings"],
["Where it is loaded","A hold compartment with controlled temperature and ventilation"],
["What cannot travel with it","Dry ice (carbon dioxide), some dangerous goods, foodstuffs"],
["Notification","The captain is told that live animals are on board"]]}]},
{h:"Arrival and quarantine",blocks:[{t:"rows",items:[
{name:"Quarantine at destination",x:"Dogs, cats and birds arriving in Japan are inspected by the animal quarantine service. Failing the conditions can mean a long period in quarantine."},
{name:"Unload first",x:"Unload them as a priority on arrival and move them somewhere temperature controlled."},
{name:"Report anything wrong",x:"If an animal looks unwell, record and report it at once."}]},
{t:"point",x:"With animals, the condition of the animal comes before the schedule. If there is a delay or an offload, think first about water and temperature."}]}],
voice:"[Interview to be added] The most anxious moment you had carrying live animals.",
terms:[["Live Animals (AVI)","生きた動物","생동물"],["Health Certificate","健康証明書","건강 증명서"],["Animal Quarantine","動物検疫","동물 검역"],["Container / Crate","輸送容器","운송 용기"]],
quiz:[{q:"What does a live animal container need?",opts:["To be as small as possible","Room to stand and turn, with ventilation","To be sealed","No water access"],a:1,exp:"It must also be escape-proof."},
{q:"What cannot be loaded with live animals?",opts:["Dry ice","Documents","Clothing","Books"],a:0,exp:"Carbon dioxide affects them."},
{q:"What do you think about first if there is a delay?",opts:["The rate","Water and temperature","The colour of the paperwork","The next booking"],a:1,exp:"The animal’s condition comes first."}],
next:"3-3 Perishables and pharmaceuticals: the cold chain"});

set("3-3",{title:"Perishables and Pharmaceuticals: The Cold Chain",hl:"the cold chain",subtitle:"Never let the temperature break. Half an hour on the ramp can ruin the product",
lead:["Seafood, fruit, flowers, and pharmaceuticals and vaccines. Temperature-controlled cargo has to stay within a set range from origin to destination. That unbroken control is the cold chain.",
"This article covers the temperature bands, where the chain breaks most easily, the quality standards for pharmaceutical transport, and what the front line does about it."],
sections:[
{h:"Temperature bands (examples)",blocks:[{t:"table",cols:["Band","Examples"],rows:[
["Frozen (-15°C or below)","Frozen seafood"],
["Chilled (2 to 8°C)","Vaccines, pharmaceuticals, perishables"],
["Controlled room temperature (15 to 25°C)","Some pharmaceuticals"],
["Ambient","General cargo"]]},
{t:"note",x:"* The range is set by the shipper’s instructions and the commodity."}]},
{h:"Where the chain breaks",blocks:[{t:"check",items:[
{name:"Waiting on the ramp",x:"Time spent waiting to load in summer heat or winter wind."},
{name:"Transfers",x:"Being transferred at a connecting airport."},
{name:"Waiting for clearance",x:"Where it is stored while import permission is pending."},
{name:"Delays and offloads",x:"When a flight runs late and the journey takes longer than planned."}]}]},
{h:"Pharmaceuticals, and what the front line does",blocks:[{t:"rows",items:[
{name:"Quality standards",x:"Pharmaceutical transport calls for industry certification, such as IATA’s pharmaceutical handling certification, and management in line with good distribution practice. ★"},
{name:"Temperature records",x:"A logger records the temperature through the journey and is checked on arrival."},
{name:"Dedicated equipment",x:"Temperature-controlled containers, temperature-controlled warehouses, refrigerated vehicles."},
{name:"Priority handling",x:"Bring it out of the warehouse just before loading so it waits on the ramp as little as possible."}]},
{t:"point",x:"In the cold chain, the record of what temperature was held is the proof of quality. Keep the temperature records and the times of each handover."}]}],
voice:"[Interview to be added] What you did to protect pharmaceuticals on the ramp in midsummer.",
terms:[["Cold Chain","コールドチェーン","콜드체인"],["Temperature Logger","温度ロガー","온도 기록계"],["Controlled Room Temperature","定温","정온"],["Pharmaceutical Logistics","医薬品輸送","의약품 운송"]],
quiz:[{q:"What is the cold chain?",opts:["Unbroken temperature control","Cheap transport","Cargo insurance","Passenger baggage"],a:0,exp:"The point is that it never breaks."},
{q:"Where does temperature control break most easily?",opts:["Waiting on the ramp or for clearance","In the warehouse’s cold room","Inside a temperature-controlled container","Inside a refrigerated truck"],a:0,exp:"Watch the waiting time."},
{q:"What proves the quality?",opts:["The temperature record","The colour of the cargo","The rate","The shipper’s name"],a:0,exp:"Keep the logger data."}],
next:"3-4 Valuables, heavy and outsized cargo"});

set("3-4",{title:"Valuables, Heavy and Outsized Cargo",hl:"valuables and heavy cargo",subtitle:"Controls that prevent theft, and loading that does not damage the aircraft",
lead:["Cash, precious metals and high-value electronics need tight controls against theft. Heavy machinery and outsized cargo need care to load safely within the limits of the floor and the doors.",
"This article covers handling valuables, handling heavy and outsized cargo, and what to confirm at the booking stage."],
sections:[
{h:"Valuables",blocks:[{t:"check",items:[
{name:"What counts",x:"Cash, precious metals, jewellery, securities, high-value electronic components, as your company defines them."},
{name:"Storage",x:"A locked area or a safe, with a named witness."},
{name:"Handover",x:"Signed for at every handover."},
{name:"Information",x:"Do not tell more people than necessary what the cargo is, or which flight and time it moves."}]}]},
{h:"Heavy and outsized cargo",blocks:[{t:"table",cols:["Check","What it means"],rows:[
["Floor loading","The limit per square metre. Spread the weight with skids"],
["Door dimensions","Height, width and diagonal, and the geometry if it has to be tilted in"],
["Securing","Strapped and fixed to the aircraft so nothing moves in flight"],
["Balance","Its effect on the load plan (4-1)"],
["Special equipment","Forklifts, high loaders and similar"]]}]},
{h:"What to confirm at booking",blocks:[{t:"rows",items:[
{name:"Dimensional drawings",x:"Get the packed dimensions, weight and centre of gravity on a drawing."},
{name:"Aircraft type",x:"Whether it fits the planned aircraft. If not, consider a freighter."},
{name:"Both ends",x:"Whether the equipment to unload it exists at the destination as well as the origin."}]},
{t:"point",x:"With outsized cargo it is easy to think about loading and forget unloading. Confirm the destination’s equipment before you confirm the booking."}]}],
voice:"[Interview to be added] A clever solution to loading a heavy shipment.",
terms:[["Valuable Cargo (VAL)","貴重品","귀중품"],["Heavy Cargo (HEA)","重量物","중량물"],["Outsized Cargo","大型貨物","대형 화물"],["Floor Loading Limit","床荷重","바닥 하중"]],
quiz:[{q:"What matters in handing over valuables?",opts:["Signing for them","A verbal handover","Anyone may receive them","No record"],a:0,exp:"Every handover is recorded."},
{q:"How do you spread the weight of a heavy shipment?",opts:["Use skids","Put a net over it","Add a label","Lower the temperature"],a:0,exp:"To stay within the floor loading limit."},
{q:"What is easiest to forget with outsized cargo?",opts:["Whether it can be unloaded at the destination","The weather at origin","The shipper’s name","The currency of the rate"],a:0,exp:"Check the unloading equipment."}],
next:"3-5 Semiconductor and precision equipment"});

set("3-5",{title:"Semiconductor and Precision Equipment",hl:"precision equipment",subtitle:"Vibration, shock, humidity, temperature — and export control. The more valuable the machine, the longer the preparation ★",
lead:["Semiconductor production and inspection equipment can be worth hundreds of thousands or millions per unit. Slight vibration, shock or humidity throws the performance out, so packing, transport and installation need consistent control. Such equipment may also contain technology with military applications, which brings export control into the picture.",
"This article follows the air transport of semiconductor-related equipment and covers the preparation, the packing, the journey and the arrival."],
sections:[
{h:"Preparation",blocks:[{t:"check",items:[
{name:"Export control",x:"Confirm with the manufacturer and shipper whether the equipment or parts require an export licence. Obtaining one takes time. ★"},
{name:"Dimensions and weight",x:"Confirm the packed dimensions, weight and centre of gravity from a drawing. Will it fit a passenger belly, or is a freighter needed (0-2, 3-4)?"},
{name:"Insurance",x:"For high-value shipments, confirm the cover and the limits."},
{name:"Schedule",x:"Work back from the installation date to leave time for transport, clearance and inland delivery."}]}]},
{h:"Packing and transport",blocks:[{t:"table",cols:["Risk","Typical measure"],rows:[
["Vibration and shock","Anti-vibration packing, shock indicators, air-ride trucks"],
["Tilting","Tilt indicators and orientation labels"],
["Humidity and condensation","Moisture barrier packing, desiccant, avoiding sudden temperature changes"],
["Temperature","Keeping ramp waiting time short in extreme heat or cold"],
["Handling","Marking the forklift pockets and the lifting points"]]}]},
{h:"Arrival and handover",blocks:[{t:"rows",items:[
{name:"Checks on arrival",x:"Read the shock and tilt indicators, inspect the packing and photograph it."},
{name:"Customs",x:"Agree the tariff classification and the documents — invoice, packing list, specifications — with the broker in advance."},
{name:"Inland delivery",x:"Air-ride trucks to the plant, with the door size and floor strength confirmed beforehand."},
{name:"If something shows",x:"If an indicator has triggered, tell everyone concerned before unpacking and keep the record for the insurance claim."}]},
{t:"point",x:"Moving precision equipment is a team job: the manufacturer, the shipper, the forwarder, the airline and the installation engineers. Agree in advance who checks what, and when."}]}],
voice:"[Interview to be added] The first thing you checked when semiconductor equipment arrived.",
terms:[["Semiconductor Equipment","半導体製造装置","반도체 제조 장비"],["Export Classification","該非判定","해당·비해당 판정"],["Shock Indicator","衝撃センサー","충격 센서"],["Air-ride Truck","空気ばね車","에어 서스펜션 차량"]],
quiz:[{q:"What must be checked when exporting semiconductor equipment?",opts:["Export control classification","Passenger seating","Catering","Airport shops"],a:0,exp:"A licence, where required, takes time."},
{q:"How is vibration and shock addressed?",opts:["Anti-vibration packing and air-ride trucks","No packing","Hard braking","Stacking"],a:0,exp:"Shock indicators record what happened."},
{q:"A shock indicator has triggered on arrival. What do you do?",opts:["Unpack it anyway","Tell everyone concerned before unpacking and keep the record","Dispose of it","Hide it"],a:1,exp:"It also supports the insurance claim."}],
next:"4-1 The load plan and notification to the captain"});
})(window.ARTS);
