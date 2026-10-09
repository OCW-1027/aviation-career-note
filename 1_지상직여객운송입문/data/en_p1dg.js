/* 旅客運送の実務 1-12・1-13 — English version (2026.09 revision) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("1-12",{title:"Dangerous Goods Basics: What to Watch in Passenger Baggage",hl:"Dangerous goods",subtitle:"Cabin only, checked only, or neither: typical items, and the irregularities that often arise",
lead:["Japan’s Civil Aeronautics Act defines as dangerous goods anything that may explode, burn easily, harm people or damage other property, and restricts their carriage by air. Some everyday items may still be carried in the cabin or checked under set conditions.","Things that are safe on the ground face pressure and temperature changes and vibration in flight. This article follows the typical examples published by Japan’s Civil Aviation Bureau, item by item, and the irregularities that most often arise at the counter and gate."],
sections:[
{h:"Why they are dangerous in flight",blocks:[{t:"cards",n:3,items:[
{ic:"🌡️",name:"Pressure and temperature",x:"Lower pressure makes contents expand, leak or burst."},
{ic:"📳",name:"Vibration and impact",x:"Switches turn on, batteries short-circuit, containers break."},
{ic:"🔥",name:"Nowhere to go",x:"A fire in the cabin or hold cannot be escaped or put out as easily as on the ground."}]}]},
{h:"The nine classes",blocks:[{t:"table",cols:["Class","Examples"],rows:[
["1 Explosives","Fireworks, party poppers, ammunition"],["2 Gases","Aerosols, camping gas, extinguishers, oxygen cylinders"],["3 Flammable liquids","Lighter fuel, paint, thinner, some perfumes"],["4 Flammable solids","Matches, charcoal"],["5 Oxidisers","Bleach, peroxides"],["6 Toxic and infectious substances","Insecticides, pesticides, infectious substances"],["7 Radioactive material","Medical and industrial radioactive material"],["8 Corrosives","Mercury, acids, spillable batteries"],["9 Miscellaneous","Lithium batteries, dry ice, strongly magnetic items"]]}]},
{h:"Treatment in passenger baggage (typical examples)",blocks:[{t:"fig",id:"gnd_dgbag",cap:"Animated figure: typical items light up in turn, with ○ or × for the cabin and checked baggage. See the table for conditions."},{t:"table",cols:["Item","Cabin","Checked","Conditions"],rows:[
["Smoking lighter or matches","Yes","No","One small item per person, carried on the person. Torch lighters differ by airline and country"],
["E-cigarettes, heated tobacco","Yes","No","Not used or charged on board; spare batteries in the cabin"],
["Toiletry and medicinal aerosols (hairspray etc.)","Yes","Yes","Up to 0.5 L (kg) per container and 2 L (kg) per person in total"],
["Household and sports aerosols (flammable gas)","No","No","Lubricants, paint, waterproofing, ski wax"],
["Alcohol up to 24%","Yes","Yes","Cabin carriage follows the liquids rules on international flights"],
["Alcohol over 24% and up to 70%","Yes","Yes","Up to 5 L per person, in retail packaging"],
["Alcohol over 70%","No","No","High-strength spirits"],
["Dry ice","Yes","Yes","Up to 2.5 kg per person, packed so gas can escape; many airlines require marking when checked"],
["Fireworks, party poppers","No","No","Explosives"],
["Camping gas, gas canisters, fuel","No","No","Even empty fuel containers usually need cleaning and proof"],
["Medical oxygen, portable oxygen concentrators","Approval","Approval","Advance request and airline approval"],
["Lithium batteries and power banks","—","—","See the next article (1-13)"]]},
{t:"note",x:"* General treatment based on the Civil Aviation Bureau’s examples and ICAO/IATA rules. Some countries and airlines are stricter; check doubtful items with your dangerous goods team and your regulations. ★"}]},
{h:"Irregularities that often arise",blocks:[{t:"table",cols:["Situation","What happens","Response"],rows:[
["Smart baggage (suitcases or bags with built-in batteries)","If the battery cannot be removed, the bag can in principle be neither carried on nor checked (except for very small batteries)","If removable, take the battery into the cabin and check the bag. If not, explain that it cannot travel and discuss alternatives"],
["Power bank in a checked bag","Found by X-ray; the passenger is paged to attend a re-inspection","Ask at check-in. If found, move it to the cabin; manage time so paging does not delay departure"],
["Bags checked at the gate","Batteries and e-cigarettes go into the hold inside a cabin bag","Always say “please take out any batteries or e-cigarettes” before tagging"],
["Batteries with no rating shown","Neither Wh nor mAh is known","Carriage may be refused unless the rating can be confirmed from the manufacturer"],
["E-scooters and hoverboards","Large lithium batteries; many airlines refuse them","Tell passengers in advance; if found at the airport, explain they cannot be carried"],
["Portable oxygen concentrators, CPAP and other medical devices","No advance request; battery numbers and ratings unknown","Check for approval; check spare batteries against flight time"],
["Undeclared aerosols and camping items","Found at security; items abandoned, flight delayed","Ask at check-in and use signs"],
["Smoke or fire on board","Smoke from a power bank or device","Handled by the crew; on the ground, support reporting, aircraft checks and passenger interviews"]]},
{t:"point",warn:true,x:"Accidents and serious incidents involving dangerous goods must be reported to the authorities. Record and report dangerous goods found in checked baggage under your company procedure. ★"}]},
{h:"Checks at the counter and gate",blocks:[{t:"check",items:[
{name:"Ask specifically",x:"“Do you have any power banks, e-cigarettes, lighters or aerosols?”"},
{name:"Point to the sign",x:"Pointing at the dangerous goods sign helps passengers who do not share your language."},
{name:"Spot smart baggage",x:"A suitcase with a USB port or charge indicator: check whether it has a battery and whether it can be removed."},
{name:"If you find something",x:"Have it removed from the checked bag. Items not allowed in the cabin either are surrendered or sent separately under your procedure, and recorded."}]},
{t:"point",x:"The Civil Aviation Bureau publishes lists of examples, posters and detailed guidance on powered wheelchairs, hair irons and power banks. Display them and use them as the basis for your explanations."}]}],
voice:"Dangerous goods found at the counter are mostly everyday items: aerosols, lighters, batteries. Asking specifically whether the bag contains such things works best.",
terms:[["Dangerous Goods (DG)","危険物","위험물"],["Smart Baggage","スマート手荷物","스마트 수하물"],["Dry Ice","ドライアイス","드라이아이스"],["Portable Oxygen Concentrator (POC)","携帯型酸素濃縮器","휴대용 산소농축기"],["Safety Data Sheet (SDS)","安全データシート","안전보건자료"]],
quiz:[{q:"What is the limit on toiletry and medicinal aerosols?",opts:["No limit","0.5 L per container and 2 L per person","One per person","Checked only"],a:1,exp:"Up to 2 L per person in total."},
{q:"Smart baggage whose battery cannot be removed…",opts:["can be checked","can go in the cabin","can be neither carried on nor checked","can be checked if switched off"],a:2,exp:"If removable, the battery goes in the cabin and the bag is checked."},
{q:"Alcohol over 70%…",opts:["up to 5 L","cabin only","not allowed at all","checked only"],a:2,exp:"Over 24% and up to 70% is limited to 5 L per person."}],
next:"1-13 Lithium batteries and power banks: the latest rules in Japan and Korea"});

set("1-13",{"title":"Lithium Batteries and Power Banks: the Latest Rules in Japan and Korea","hl":"Power banks","subtitle":"Tightened again and again since 2025. The basics: do not check them, carry two at most, do not use them, keep them on you",
"lead":["After a series of power bank fires on board, authorities and airlines in many countries have tightened the rules repeatedly since 2025. In Japan, standards such as a limit of two power banks of up to 160 Wh per person in the cabin have applied since 24 April 2026. Check Korean and individual airline requirements separately.","This lesson sets out how the rules developed in Japan and Korea, how to calculate capacity (Wh), what is and is not covered, how to explain the rules at the counter and gate, and what to do when one is found. The rules change at short intervals, so always compare with the latest notices. Airlines are also advising that, under changes to IATA rules, the capacity allowed may be limited to 100 Wh or less from January 2027 (as of September 2026). ★"],
"sections":[
{"h":"How the rules have tightened","blocks":[{"t":"table","cols":["When","Main developments"],"rows":[["January 2025","Fire on an aircraft before departure at a Korean airport (a power bank was named as the cause)"],["March 2025","Korea: strict ban on checking them, terminals insulated, not stored in overhead bins, charging on board restricted"],["January 2026","Five airlines in a major Korean group: using power banks on board banned completely"],["April 2026","Japan: from 24 April, power banks up to 160 Wh limited to two per person, with no charging or powering devices from them on board. Check Korean and airline standards individually"]]}]},
{"h":"At a glance (per person)","blocks":[{"t":"fig","id":"gnd_wh","cap":"Animated figure: an arrow moves along the Wh scale, showing the 100 Wh and 160 Wh limits. The white circle marks a 10,000 mAh (37 Wh) power bank."},{"t":"table","cols":["Type","100 Wh or less","Over 100 Wh up to 160 Wh","Over 160 Wh"],"rows":[["Batteries installed in devices (phones, laptops, cameras and so on)","Cabin ○ / checked ○ (switched off and protected)","Cabin ○ / checked ○ (airline approval may be needed)","×"],["Power banks","Cabin ○ (up to two per person) / checked ×","Cabin ○ (up to two per person) / checked ×","×"],["Spare batteries (removed from devices, e.g. camera batteries)","Cabin ○ / checked ×","Cabin ○ (up to two per person; airline approval required) / checked ×","×"],["Batteries in smart luggage","Removed and carried in the cabin (subject to the capacity conditions)","Check the conditions for each airline and battery specification","×"],["Powered wheelchair batteries","Separate rules (1-7). Lithium-ion up to 300 Wh","",""]]},
{"t":"note","x":"* General handling under Japan’s rules from 24 April 2026 and ICAO and IATA rules. Some airlines are stricter. ★"}]},
{"h":"Japan’s new rules (from 24 April 2026)","blocks":[{"t":"table","cols":["Item","Rule"],"rows":[["Checked baggage","Must not be packed in it (unchanged)"],["Capacity","160 Wh or less only"],["Number","Up to two per person in the cabin (new)"],["Charging on board","Charging the power bank itself is banned (new)"],["Powering on board","Using a power bank to charge other devices is also banned (new)"],["Storage","Kept on the passenger, not in overhead bins, with terminals insulated"]]},
{"t":"point","warn":true,"x":"Carrying more than allowed or over the capacity, or charging on board, can be subject to penalties under the Civil Aeronautics Act. Some airlines set stricter rules, so check each airline’s notices too."}]},
{"h":"Calculating capacity (Wh)","blocks":[{"t":"p","x":"If the Wh rating is not marked on the unit, calculate it from the mAh and voltage (V). The formula is “Wh = mAh × V ÷ 1000”. Most power banks are 3.6–3.7 V."},
{"t":"table","cols":["Marking (example)","Calculation","Result"],"rows":[["10,000 mAh, 3.7 V","10,000 × 3.7 ÷ 1000","37 Wh (allowed in the cabin if other conditions are met)"],["20,000 mAh, 3.7 V","20,000 × 3.7 ÷ 1000","74 Wh (allowed in the cabin if other conditions are met)"],["30,000 mAh, 3.7 V","30,000 × 3.7 ÷ 1000","111 Wh (airline approval may be needed)"],["50,000 mAh, 3.7 V","50,000 × 3.7 ÷ 1000","185 Wh (not allowed)"]]},
{"t":"point","x":"Many airlines do not allow batteries whose markings are worn off or unreadable, because the capacity cannot be checked."}]},
{"h":"What is and is not covered","blocks":[{"t":"rows","items":[
{"name":"Covered","x":"Power banks with built-in lithium-ion batteries, used to charge other electronic devices."},
{"name":"Not counted in the number limit","x":"Spare batteries removed from cameras and other devices (capacity limits still apply)."},
{"name":"Not allowed","x":"Power banks with sodium-ion batteries are not allowed in Japan, in the cabin or checked."},
{"name":"Batteries installed in devices","x":"Batteries inside phones, laptops and other devices are normally carried in the cabin. If checked, the device must be switched off and protected against accidental activation."}]}]},
{"h":"What to tell passengers at the counter and gate","blocks":[{"t":"check","items":[
{"name":"Ask at the counter","x":"“How many power banks do you have with you? Are there any in the bags you are checking?”"},
{"name":"Check the capacity","x":"Look at the marking on the unit together with the passenger (Wh, or mAh and voltage)."},
{"name":"How to insulate","x":"Tape over the terminals, or put each one in its own plastic bag or pouch."},
{"name":"Using them on board","x":"Explain that charging them and charging other devices from them are both banned, and that they must be kept on the passenger, not in the overhead bin."},
{"name":"Bags checked at the gate","x":"Make sure passengers take them out of bags being checked at the gate too (lesson 2-2)."}]}]},
{"h":"When one is found","blocks":[{"t":"table","cols":["Situation","Action"],"rows":[["Found in checked baggage","Check the capacity, number and condition of the battery taken out, and let the passenger carry it in the cabin only if it meets the conditions (open-bag inspection, lesson 2-3)"],["Carrying three or more","Items over two are surrendered or handed to someone seeing the passenger off"],["Over 160 Wh or unmarked","Explain that it cannot be carried and advise surrendering it, for example"],["Used on board","Cabin crew stop it; the ground is informed by a report after arrival"]]},
{"t":"point","warn":true,"x":"How surrendered items are stored or disposed of is set by the airport or airline. Explain what will happen in front of the passenger and keep a record."}]}],
"voice":"The day new battery rules start, both passengers and staff are confused. Before it begins, put the wording and decision criteria on one page so everyone says the same thing.",
"terms":[["Power Bank","モバイルバッテリー","보조배터리"],["Lithium-ion Battery","リチウムイオン電池","리튬이온 배터리"],["Watt-hour (Wh)","ワット時定格量","와트시 정격용량"],["Terminal Protection","端子の絶縁","단자 절연"],["Sodium-ion Battery","ナトリウムイオン電池","나트륨이온 배터리"],["Abandon","放棄","포기"]],
"quiz":[{"q":"What is the rating of a 20,000 mAh, 3.7 V power bank?","opts":["About 20 Wh","About 37 Wh","About 74 Wh","About 185 Wh"],"a":2,"exp":"20,000 × 3.7 ÷ 1000 = 74 Wh."},
{"q":"Under Japan’s new rules, how many power banks may be carried in the cabin?","opts":["No limit","Up to two per person","Up to one per person","Up to five per person"],"a":1,"exp":"Up to two per person from 24 April 2026."},
{"q":"How should power banks be handled on board?","opts":["Put in the overhead bin","Kept on the passenger, not charged and not used to charge","Packed in checked baggage","Charged under the seat"],"a":1,"exp":"The basics are to keep them on you and not use them."}],
"next":"Part 2 The Gate — 2-1 Preparing for gate duty"});
})(window.ARTS);
