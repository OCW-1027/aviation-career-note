/* 航空機と整備 Part 3 — English version (3-1〜3-3) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("3-1",{title:"What the MEL Is: the List of What May Stay Unfixed for Departure",hl:"MEL",subtitle:"From MMEL to MEL, how to read one MEL line, maintenance (M) and operations (O) procedures, and what happens when an item is not on the MEL",
lead:["Airliners carry many systems in duplicate or triplicate, and some can be out of action while the aircraft still flies safely. The MEL (minimum equipment list) sets out which items may be inoperative, how many, and under what conditions.","The MEL is not permission to fly broken aircraft. It is a way to keep safety margins while fixing defects within set time limits. For stations it also directly affects aircraft restrictions, seats and cargo loading."],
sections:[
{h:"Reading one MEL line",blocks:[{t:"fig",id:"mnt_mel",cap:"Animated figure: the item, repair category, number installed, number required for dispatch and remarks columns light up in turn, matched to the explanations below. A generic example."},
{t:"table",cols:["Column","Meaning"],rows:[
["Item","Equipment by ATA chapter (21 = air conditioning, 33 = lights, 34 = navigation and so on)"],
["Repair category","A, B, C or D: how soon it must be fixed (3-2)"],
["Installed / required","How many are fitted, and the minimum needed for dispatch"],
["Remarks / exceptions","(M) maintenance procedure, (O) operations procedure, conditions such as altitude, route or weather"]]}]},
{h:"From MMEL to MEL",blocks:[{t:"rows",items:[
{name:"MMEL",x:"The master list written by the manufacturer for each type and approved by the state of design (the US FAA publishes them)"},
{name:"MEL",x:"Written by the airline from the MMEL to match its fleet’s equipment and operation, and approved by its own authority; it may be stricter than the MMEL but never more lenient"},
{name:"Procedures",x:"Detailed (M) and (O) procedures are in the manufacturer’s guide (the dispatch deviation guide for the B737 and B787) and company manuals"},
{name:"Items not on the MEL",x:"As a rule, if an item not on the MEL fails, the aircraft cannot depart. Some airlines handle cabin items unrelated to airworthiness under separate rules ★"}]},
{t:"point",x:"The MEL is used before departure, on the ground. Failures in flight are handled with non-normal procedures and checklists, and the MEL decision is made after landing. The captain makes the final decision to accept the aircraft."}]},
{h:"Where the station comes in",blocks:[{t:"check",items:[
{name:"MEL notification",x:"Receive notice from dispatch or maintenance of a departure under the MEL (item and restrictions)"},
{name:"Applying restrictions",x:"Reflect unusable seat rows, hold restrictions and so on in check-in and load planning (3-3)"},
{name:"Explaining to passengers",x:"Say that maintenance standards confirm the aircraft is safe to depart; do not guess at details of the fault"}]}]}],
voice:"When you hear an MEL number, make a habit of asking maintenance straight away whether it affects seats, cargo or ground equipment. It puts your preparation one step ahead.",
terms:[["Minimum equipment list (MEL)","運用許容基準","최소 장비 목록"],["Master minimum equipment list (MMEL)","MMEL","기본 최소 장비 목록"],["Repair interval category","修理の期限の区分","수리 기한 범주"],["Maintenance procedure (M)","整備の手順","정비 절차"],["Operations procedure (O)","乗員の手順","운항 절차"],["Inoperative (INOP)","作動しない","작동 불가"]],
quiz:[{q:"How do the MEL and MMEL relate?",opts:["The MEL can be more lenient than the MMEL","The airline builds the MEL from the MMEL; it can be stricter but not more lenient","The airline writes the MMEL","They are two names for the same thing"],a:1,exp:"The manufacturer writes the MMEL and the state of design approves it; the airline builds the MEL from it and its own authority approves it."},
{q:"What does (O) in the MEL remarks mean?",opts:["Maintenance work is needed","A crew operations procedure is needed","The aircraft cannot depart","A part must be ordered"],a:1,exp:"(M) is a maintenance procedure; (O) is an operations procedure for the crew."},
{q:"When is the MEL used?",opts:["In flight","Before departure, on the ground","Just before landing","At any time"],a:1,exp:"The MEL is used before departure; in-flight failures are handled with non-normal procedures."}],
next:"3-2 Repair Intervals and Managing Deferrals"});
set("3-2",{title:"Repair Intervals and Managing Deferrals: Categories A–D and Japan’s Aviation Act Articles 60 and 61",hl:"Repair Intervals",subtitle:"Categories and how days are counted, recording and placarding deferrals, extensions, routing aircraft to bases with parts, and approvals in Japan",
lead:["A defect dispatched under the MEL must be fixed within a set time. Limits fall into four categories by severity, and the day of discovery is not counted.","Meeting them requires maintenance control (MCC) to keep a list of which aircraft has which deferral and when and where it will be fixed, and to match it with the flying programme."],
sections:[
{h:"Repair categories",blocks:[{t:"fig",id:"mnt_cat",cap:"Animated figure: counting from the day after discovery, category B allows 3 days, C 10 days and D 120 days; A is set item by item. A red line moves along the days."},
{t:"table",cols:["Category","Limit","Example"],rows:[
["A","Set per item (flights, hours or days)","Equipment with strict conditions for each departure"],
["B","3 days (excluding the day of discovery)","One of a pair of duplicated systems"],
["C","10 days (excluding the day of discovery)","Cabin, lighting and other items with alternatives"],
["D","120 days (excluding the day of discovery)","Items not directly related to safety"]]}]},
{h:"Managing deferrals",blocks:[{t:"rows",items:[
{name:"Recording",x:"The defect and MEL item are entered in the technical log and signed by the certifying engineer"},
{name:"Placarding",x:"An INOP placard is fitted to the unusable item so crew and engineers can see it"},
{name:"Deferred defect list",x:"MCC lists every deferral across the fleet and manages limits, parts supply and where the fix will be done"},
{name:"Extensions",x:"Some airlines may extend B and C items once under an authority-approved scheme; A items cannot be extended ★"},
{name:"Repeat deferrals",x:"If the same item keeps being deferred, it is investigated as a reliability issue (2-3)"}]},
{t:"point",warn:true,x:"If an aircraft with a deferral close to its limit night-stops at an overseas airport without the part, it may not be able to depart the next morning. The flying programme should route it to a base that has the part."}]},
{h:"Operating in Japan: Articles 60 and 61",blocks:[{t:"rows",items:[
{name:"Prescribed equipment",x:"Japan’s Civil Aeronautics Act prescribes equipment aircraft must carry (Article 60) and flight data and cockpit voice recorders and similar (Article 61)"},
{name:"Flying with them inoperative",x:"Operating under the MEL with such equipment inoperative requires permission from the transport minister. Airlines compile the relevant MEL items and obtain blanket approval in advance ★"},
{name:"Foreign airlines",x:"Foreign airlines serving Japan apply for the same approval for their operations in Japan, with procedures for annual review and each MEL revision ★"}]},
{t:"point",x:"When departing a Japanese airport under the MEL with an item covered by the approval, maintenance and dispatch confirm it is within its scope. Stations may handle compiling the application papers and liaising with the authority."}]}],
voice:"The deferred defect list belongs to maintenance, but if the station also knows which defects are near their limits, it can foresee morning delays on night-stopping aircraft.",
terms:[["Deferral","持ち越し","이월"],["Deferred defect list","持ち越しの一覧","이월 결함 목록"],["Placard","表示（プラカード）","표지"],["Rectification interval extension","期限の延長","기한 연장"],["Blanket approval","包括的な許可","포괄 허가"],["Flight data recorder","飛行記録装置","비행기록장치"]],
quiz:[{q:"What is the category C limit?",opts:["3 days","10 days","120 days","Set per item"],a:1,exp:"C is 10 days excluding the day of discovery; B is 3, D is 120, and A is set per item."},
{q:"How are the days counted?",opts:["The day of discovery is day 1","The day of discovery is not counted","Only flying days count","Weekends are not counted"],a:1,exp:"The day of discovery is not counted; counting starts the next day ★."},
{q:"What is fitted to an unusable item?",opts:["An INOP placard","A boarding pass","A load sheet","A bag tag"],a:0,exp:"An INOP placard shows crew and engineers that the item is inoperative."}],
next:"3-3 The CDL and Effects on Passenger Services and Loading"});
set("3-3",{title:"The CDL and Effects on Passenger Services and Loading: How MEL Restrictions Change the Station’s Work",hl:"CDL and Effects",subtitle:"Flying without external parts under the CDL and its performance penalties, and how MEL items affect seats, cargo, ground equipment and passenger information",
lead:["If the MEL covers equipment inside, the CDL (configuration deviation list) covers parts outside. For panels, fairings and similar parts the aircraft can safely fly without, it sets conditions such as weight or fuel penalties.","On flights departing under the MEL or CDL, restrictions show up directly in the station’s work: seats that cannot be sold, holds that cannot be loaded, ground equipment that is needed. Knowing which item affects what speeds up preparation."],
sections:[
{h:"The CDL",blocks:[{t:"fig",id:"mnt_cdl",cap:"Animated figure: on a B737, a flap track fairing, a wingtip static discharger, the APU access door and an engine pylon panel light up in turn. Parts and conditions are examples."},
{t:"table",cols:["","MEL","CDL"],rows:[
["Covers","Equipment inside (instruments, systems, cabin equipment and so on)","External parts (panels, fairings, dischargers and so on)"],
["Main conditions","Time limits, maintenance and crew procedures, operating restrictions","Reduced take-off and landing weights, extra fuel"],
["Recording and placards","Technical log, INOP placard","Technical log, flight deck placard"]]}]},
{h:"MEL items and the station’s work",blocks:[{t:"table",cols:["Inoperative item (example)","Effect on the station"],rows:[
["Cabin oxygen or seats","Do not sell or use seats in that row (seat block)"],
["Doors or escape slides","Fewer passengers may be carried; reduce bookings and prepare re-accommodation"],
["Cargo fire suppression or detection","That hold cannot be loaded, or what can be loaded is limited"],
["Toilets","Long flights may need rethinking; inform passengers"],
["APU","Arrange ground power, air and PCA (1-2)"],
["Thrust reversers","On wet runways take-off and landing weights fall, reducing payload"],
["Weather radar or anti-icing systems","Departure may not be possible if thunderstorms or icing are forecast"]]},
{t:"point",warn:true,x:"If seat blocks and hold restrictions are not reflected quickly in check-in and loading instructions, passengers may be left behind and cargo offloaded on the day. When you receive an MEL notice, first check whether anything is affected."}]},
{h:"Station checklist",blocks:[{t:"check",items:[
{name:"Receive",x:"Get the MEL/CDL item and restrictions from dispatch or maintenance in writing, not just verbally"},
{name:"Apply",x:"Put seat blocks, loading restrictions and weight reductions into check-in and load control"},
{name:"Pass on",x:"Tell cabin crew, the handler and cargo staff"},
{name:"Inform",x:"Tell passengers that safety standards are met and what changes for them (such as seat moves)"}]}]}],
voice:"When an MEL notice arrives, simply checking four things in turn (seats, cargo, ground equipment, passenger information) prevents most of the confusion on the day.",
terms:[["Configuration deviation list (CDL)","外形変更リスト","외형 변경 목록"],["Performance penalty","性能の割増し","성능 할증"],["Seat block","座席のブロック","좌석 블록"],["Thrust reverser","逆推力装置","역추력장치"],["Static discharger","静電気放出棒","정전기 방출봉"],["Cargo fire suppression","貨物室の火災の消火","화물칸 소화"]],
quiz:[{q:"What does the CDL cover?",opts:["Cabin seats","External parts (panels, fairings and so on)","Crew duty hours","Fuel prices"],a:1,exp:"The CDL sets conditions for flying without external parts; equipment inside is covered by the MEL."},
{q:"If cabin oxygen is unusable for one row, what does the station do?",opts:["Nothing","Block the seats in that row","Reduce cargo","Always cancel the flight"],a:1,exp:"The seats in that row are blocked so they are not sold or used."},
{q:"What happens if a hold’s fire suppression is inoperative?",opts:["That hold cannot be loaded, or what can be loaded is limited","More seats become available","Fuel burn falls","No effect"],a:0,exp:"A hold without working fire suppression cannot be loaded, or what can be loaded is restricted."}],
next:"Part 4 Outsourced Line Maintenance: 4-1 Outsourcing Line Maintenance"});
})(window.ARTS);
