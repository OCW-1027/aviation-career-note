/* CIQの役割 — English version (Part 5 Airline and Station Practice, lessons 5-1 to 5-5) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("5-1",{title:"Reducing Document Errors: Building the Station’s System",hl:"Document Errors",subtitle:"Do not rely on one person’s attention. Build a flow in which misses are hard to make",
lead:["Carrying a passenger without the right visa or travel authorisation is one of the failures a station most wants to avoid. The passenger is sent back from the destination, and the company bears the penalty and the costs.","These misses do not come only from an individual’s carelessness. Somewhere in the flow there is a gap: in the information given at booking, in the check-in procedure, or in how changes to requirements are passed on."],
sections:[
{h:"Why it happens",blocks:[{t:"fig",id:"ciq_fine",cap:"Figure: when a fine notice arrives."},{t:"table",cols:["Cause","Example"],rows:[
["Transit point not checked","Only the final destination was looked up; there was a separately bought ticket"],
["A change in requirements was not known","A visa became necessary last month; a travel authorisation was introduced"],
["The passenger’s explanation was accepted","“I go there all the time”; “I checked with the embassy”"],
["Something on the passport was missed","Remaining validity, damage, the spelling of the name"],
["Pressed for time","Just before closing; a long queue"]]}]},
{h:"A system that reduces misses",blocks:[{t:"rows",items:[
{name:"Information at booking and before departure",x:"For each destination, include visas, travel authorisations and arrival cards in the booking confirmation and in the message sent a few days before departure."},
{name:"The automatic check, and human eyes",x:"Even after the automatic check passes, ask about connections and separate tickets."},
{name:"Someone to ask when unsure",x:"Decide who that is, and record the question and the answer."},
{name:"Tell everyone about changes",x:"When a requirement changes, say so in that morning’s briefing. A notice on the wall is not enough."},
{name:"Teach with cases",x:"Use misses from your own station as teaching material, with names removed."}]}]},
{h:"When a penalty notice arrives",blocks:[{t:"ladder",steps:[
{name:"Receive the notice",sub:"From the destination authority or the destination station"},
{name:"Gather the facts",sub:"The check-in record, the saved result of what was looked up, the agent’s account"},
{name:"Report to head office",sub:"In the incident report format of lesson 3-4 (Airport Station Management)"},
{name:"Decide whether to appeal",sub:"The documents were correct; a forgery could not have been detected. There is a deadline ★"},
{name:"Prevent a repeat",sub:"Choose one measure that fits the cause and tell everyone"}]},
{t:"note",x:"* How to appeal and the deadline differ by country."}]},
{h:"Look at the numbers",blocks:[{t:"check",items:[
{name:"Look at the rate, not the count",x:"How many per 10,000 passengers carried. More flights naturally mean more cases."},
{name:"Break it down by cause",x:"Transit points, passport validity, travel authorisations. Start with the commonest."},
{name:"Break it down by route",x:"Is it concentrated on certain destinations?"},
{name:"Share with the handling company",x:"Where check-in is outsourced, review the numbers and measures together."}]},
{t:"point",x:"“Let’s be careful” is not a measure. Decide which step of the procedure changes, and how."}]}],
voice:{h:"A Reported Case",x:"In March 2026 it was reported that a Dutch appeal court upheld a EUR 4,000 fine on KLM for carrying a passenger without a visa from Curaçao to Amsterdam. KLM argued that the documents had been checked by staff of an outside handling company; the court rejected this, holding that such staff act on the airline’s behalf. Handing the check to a handler does not hand over the responsibility. (Source: Curaçao Chronicle, March 2026)"},
terms:[["Improperly Documented Passenger","書類の不備の旅客","서류 미비 승객"],["Appeal","異議の申し立て","이의 신청"],["Prevention of Recurrence","再発の防止","재발 방지"],["Check Record","確認の記録","확인 기록"]],
quiz:[{q:"What works best in reducing document errors?",opts:["Building a flow in which misses are hard to make","Reprimanding agents strongly","Stopping checks","Leaving it to passengers"],a:0,exp:"Do not rely on one person’s attention."},
{q:"What should you watch when looking at the number of cases?",opts:["Look at the rate per passengers carried","Look only at the count","Do not look","Look only at busy months"],a:0,exp:"More flights naturally mean more cases."},
{q:"What comes first when a penalty notice arrives?",opts:["Gather the facts, such as the check-in record","Pay at once","Discipline the agent","Do nothing"],a:0,exp:"An appeal may be possible."}],
next:"5-2 Extra and charter flights and CIQ"});
set("5-2",{title:"Extra and Charter Flights and CIQ",hl:"Extra Flights",subtitle:"CIQ staffs for the regular schedule. A flight outside it will not be handled unless they are told first",
lead:["Scheduled flights arrive at the same time every day, and CIQ assigns officers to match. So what happens when an extra flight operates at an unusual time, or a charter flies to an airport with no international service?","The answer is simple: tell them first and confirm that they can handle it. Otherwise the aircraft arrives and nobody can get off."],
sections:[
{h:"How it differs from a scheduled flight",blocks:[{t:"fig",id:"ciq_extra",cap:"Figure: extra and charter flights: who to tell."},{t:"rows",items:[
{name:"Staffing",x:"CIQ officers are assigned according to the airport’s flight times."},
{name:"Regional airports",x:"At airports with few international flights there may normally be no officers. They come from a nearby office only when there is a flight."},
{name:"Facilities",x:"Check that the inspection area, baggage screening equipment and quarantine facilities can be used at that time."}]}]},
{h:"Whom to tell, and what",blocks:[{t:"table",cols:["Whom","What"],rows:[
["Customs","Flight, aircraft, time, passenger numbers, handling of catering and duty-free goods"],
["Immigration","Flight, time, passenger numbers and nationalities, crew numbers and changes"],
["Quarantine (human)","Origin, passenger numbers"],
["Animal and plant quarantine","Origin (whether it is a higher-risk area for disease or pests), handling of catering waste"],
["The airport operator","Time of use, stand, facilities"]]},
{t:"note",x:"* Application forms and deadlines differ by country and airport."}]},
{h:"When and how to proceed",blocks:[{t:"rows",items:[
{name:"Sound them out at the planning stage",x:"Consult while the flight is still under consideration, not after it is decided. You learn early which times cannot be handled."},
{name:"Tell them at once when something changes",x:"Time, aircraft, passenger numbers: pass on each change."},
{name:"Keep a list of contacts",x:"The responsible sections and out-of-hours numbers, on one page for the station."},
{name:"Afterwards, thank them and review",x:"It builds the relationship for the next extra flight."}]}]},
{h:"Commonly missed",blocks:[{t:"check",items:[
{name:"The return flight",x:"Departure immigration and customs are needed as well as arrival."},
{name:"Flights without passengers",x:"Even on a ferry flight, the aircraft, crew and stores are subject to CIQ."},
{name:"Crew changes",x:"The immigration status of crew who change over and stay (1-6)."},
{name:"Delays",x:"If the flight is later than notified, the officers may have gone (5-3)."}]},
{t:"point",x:"Whether an extra flight can operate is sometimes decided, before any traffic rights, by whether CIQ and the airport can accept it."}]}],
voice:{h:"A Reported Case",x:"When Miyako Airport in Okinawa received Asiana Airlines charter flights from Incheon, it had no international facilities, so customs and immigration were carried out in a partitioned section of the domestic area. Because the space was cramped, the prefecture decided to build CIQ facilities, with use planned from March 2016 (Source: Ryukyu Shimpo). For a charter to an airport without permanent CIQ facilities, both the space and the people have to be agreed with the agencies long before the flight."},
terms:[["Extra Flight","臨時便","임시편"],["Charter Flight","チャーター便","전세편"],["Prior Coordination","事前の協議","사전 협의"],["Ferry Flight","回送の便","공수편(페리편)"]],
quiz:[{q:"What comes first for CIQ when operating an extra flight?",opts:["Tell them in advance and confirm they can handle it","Tell them after arrival","Nothing","Tell only the airport company"],a:0,exp:"CIQ staffs for the regular schedule."},
{q:"What applies to a ferry flight with no passengers?",opts:["The aircraft, crew and stores are subject to CIQ","It has nothing to do with CIQ","Only customs is involved","Only quarantine is involved"],a:0,exp:"They are covered even without passengers."},
{q:"When is a good time to consult CIQ?",opts:["While the plan is under consideration","The day before departure","After arrival","There is no need"],a:0,exp:"You learn early which times cannot be handled."}],
next:"5-3 CIQ hours and delayed flights"});
set("5-3",{title:"CIQ Hours and Delayed Flights",hl:"CIQ Hours",subtitle:"When a delay may run past CIQ hours: the earlier you tell them, the more options there are",
lead:["CIQ at large airports stays open late. At regional airports the officers go home once the last flight has arrived. What happens when a delayed flight then turns up?","CIQ hours are separate from the airport’s operating hours and from the airline’s own shifts. When a delay appears, CIQ is among the first to check with."],
sections:[
{h:"CIQ has opening hours too",blocks:[{t:"fig",id:"ciq_late",cap:"Figure: when a delay may run past CIQ hours."},{t:"rows",items:[
{name:"They differ by airport",x:"Busy airports are open for long hours. Airports with few flights open only around flight times."},
{name:"They differ between the three agencies",x:"Customs, immigration and quarantine do not necessarily keep the same hours."},
{name:"They are separate from airport operating hours",x:"Even while the runway is available, international passengers cannot disembark without CIQ."}]}]},
{h:"When a delay may run past the hours",blocks:[{t:"ladder",steps:[
{name:"A delay appears",sub:"At the origin, on the previous sector, or because of weather"},
{name:"Get the new arrival time",sub:"The most reliable estimate, from operations"},
{name:"Tell CIQ and the airport at once",sub:"All three agencies and the airport operator"},
{name:"Get an answer on whether they can handle it",sub:"Whether hours can be extended"},
{name:"If they cannot",sub:"Decide with operations whether to divert or hold the departure"},
{name:"Tell passengers",sub:"What has been decided and when the next update will be"}]}]},
{h:"Who tells whom",blocks:[{t:"table",cols:["Who","Whom","What"],rows:[
["The station","Customs, immigration, quarantine and the airport operator","New arrival time, passenger numbers, request for extension"],
["The station","Head office operations","The answers from CIQ and the airport"],
["The handling company","Its own staff and equipment","Extension of shifts"]]},
{t:"note",x:"* Whether a fee is charged for extending hours differs by country and airport."}]},
{h:"Being prepared",blocks:[{t:"check",items:[
{name:"A list of hours and contacts",x:"Put each agency’s normal hours and out-of-hours contacts on the duty roster."},
{name:"Decide how much delay triggers a call",x:"Set a threshold for the station so that nobody hesitates."},
{name:"Early, and with a reliable time",x:"A time that keeps changing is a burden on the other side. Say how firm it is."},
{name:"Records",x:"When, to whom, what was said and what the answer was."}]},
{t:"point",x:"Whether hours are extended depends not only on rules but on the everyday relationship. Do not be the station that appears only when it wants something."}]}],
voice:{h:"A Reported Case",x:"In September 2018, when a typhoon put Kansai Airport out of action, the Japanese government decided that Itami would take up to 20 and Kobe up to 15 international and domestic flights a day in its place. Kobe extended its operating hours from 7:00–22:00 to 6:00–23:00, and the ministry said the individual flights would be set in coordination with the airport company, the airlines and the CIQ agencies (Source: Ministry of Land, Infrastructure, Transport and Tourism, 13 September 2018). Airport hours and CIQ staffing have to move together (Lessons from the Field 1-1)."},
terms:[["Operating Hours","開庁の時間","개청 시간"],["Extension of Hours","時間の延長","시간 연장"],["Diversion","ダイバート（目的地変更）","목적지 변경(회항)"],["Airport Operating Hours","運用の時間","운용 시간"]],
quiz:[{q:"What comes first when a delay may run past CIQ hours?",opts:["Tell CIQ and the airport the new arrival time at once","Discuss it after arrival","Nothing","Tell only the passengers"],a:0,exp:"The earlier, the more options there are."},
{q:"Which statement about CIQ hours is right?",opts:["They are separate from airport operating hours and may differ between agencies","Every airport is open 24 hours","They always match airport operating hours","The airline sets them"],a:0,exp:"Customs, immigration and quarantine may differ."},
{q:"What happens if CIQ cannot handle the flight?",opts:["Decide whether to divert or hold the departure","Land and let passengers off anyway","Let passengers decide","The airport company inspects them"],a:0,exp:"The decision is made with operations."}],
next:"5-4 Landing at an unplanned airport"});
set("5-4",{title:"Landing at an Unplanned Airport",hl:"Unplanned Airports",subtitle:"International passengers have not yet entered the country. Nobody and nothing leaves the aircraft without the authorities’ instructions",
lead:["Weather, a medical emergency or a technical fault can bring an international flight down at an airport that was not planned. There may be no CIQ there; it may be a domestic-only airport.","It is tempting to think that opening the door and letting passengers off would make things easier. But international passengers have not yet entered any country. Whether they may leave the aircraft is for the authorities to decide."],
sections:[
{h:"Why it is difficult",blocks:[{t:"fig",id:"ciq_divert",cap:"The order of thinking when an international flight arrives at an unplanned airport."},{t:"rows",items:[
{name:"Passengers have not yet entered",x:"They have not passed immigration, customs or quarantine. Leaving without permission would be unlawful entry."},
{name:"Some airports have no CIQ",x:"A domestic-only airport has neither officers nor an inspection area."},
{name:"The same goes for goods",x:"Bags, catering, duty-free goods and waste cannot be unloaded without instructions from customs or quarantine (2-4, 3-5)."}]}]},
{h:"Three situations",blocks:[{t:"table",cols:["Situation","What to do"],rows:[
["Landed at an airport with CIQ","Contact the authorities and follow their instructions. Decide whether passengers enter and disembark, or wait on board and continue"],
["Landed at an airport without CIQ","In principle, wait on board. Contact the authorities and decide whether officers will come or the flight will go on to an airport with CIQ"],
["A medical emergency","Life comes first. Call the emergency services and inform the authorities at the same time. Obtain emergency landing permission"]]}]},
{h:"The legal terms in Japan and Korea",blocks:[{t:"table",cols:["","Japan","Korea"],rows:[
["Urgent disembarkation for illness and the like","Emergency landing permission (Immigration Control and Refugee Recognition Act, Article 17)","Emergency landing permission (Immigration Act, Article 15)"],
["In distress","Landing permission due to distress (Immigration Control and Refugee Recognition Act, Article 18)","Landing permission due to disaster (Immigration Act, Article 16)"]]},
{t:"note",x:"* These are set out in Japan’s Immigration Control and Refugee Recognition Act and Korea’s Immigration Act (confirmed in October 2026). Check your company’s rules and the authorities’ guidance for the procedures."}]},
{h:"What the station does",blocks:[{t:"check",items:[
{name:"First, contact the authorities and the airport",x:"Customs, immigration, quarantine and the airport operator. Be able to find the contacts even for an unplanned airport."},
{name:"Doors and disembarkation wait for instructions",x:"Nothing moves until the captain and the authorities have agreed."},
{name:"Keep the cabin habitable",x:"Air conditioning, water, food and toilets matter more the longer the wait."},
{name:"Update at set intervals",x:"Even with nothing new, say, “The next update will be in so many minutes.”"},
{name:"If it drags on",x:"Enter and stay overnight, or continue within the crew’s duty time? Decide with operations."},
{name:"Records",x:"Times, who was contacted, what was instructed. You will be asked later."}]},
{t:"point",x:"Do not act on the wish to let people off. The order is: contact, instruction, then disembarkation."}]}],
voice:{h:"A Reported Case",x:"In June 2023 Air India flight 173 from Delhi to San Francisco diverted to Magadan in Russia’s far east with an engine problem, carrying 216 passengers and 16 crew. The airline had no staff in Russia; passengers were housed in makeshift accommodation including a school, and a replacement aircraft took them on about 39 hours later (Sources: NBC News, Tribune India and others). At an unplanned airport, entry, accommodation and permission for a replacement flight all depend on the local authorities and the airport."},
terms:[["Diversion","ダイバート（目的地変更）","목적지 변경(회항)"],["Emergency Landing Permission","緊急の上陸","긴급 상륙"],["Holding on Board","機内での待機","기내 대기"],["Continuation Flight","再出発","재출발"]],
quiz:[{q:"An international flight lands at an unplanned airport. When may passengers disembark?",opts:["After the authorities give instructions","As soon as it arrives","As soon as the captain decides","If the airport company allows it"],a:0,exp:"The passengers have not yet entered the country."},
{q:"What is the principle at an airport without CIQ?",opts:["Wait on board, contact the authorities and follow their instructions","Let everyone off","Send passengers out through the domestic exit","Unload the bags only"],a:0,exp:"Decide whether officers will come or the flight will go to an airport with CIQ."},
{q:"What applies in a medical emergency?",opts:["Life comes first: call the emergency services and inform the authorities at the same time","Wait for the authorities before calling an ambulance","Wait until the flight continues","Do nothing"],a:0,exp:"Emergency landing permission is obtained."}],
next:"5-5 Informing passengers: at booking, at the gate, on board"});
set("5-5",{title:"Informing Passengers: At Booking, at the Gate, on Board",hl:"Informing Passengers",subtitle:"The cheapest and surest way to reduce the number of passengers stopped on arrival",
lead:["As the earlier lessons showed, most passengers stopped at CIQ simply did not know. They had no travel authorisation. They were carrying food containing meat. They had an e-cigarette in their bag.","An airline cannot change the rules. But it can tell people. There are three chances: at booking, at the gate, and on board."],
sections:[
{h:"Three chances to inform",blocks:[{t:"fig",id:"ciq_guide",cap:"Figure: three chances to inform passengers."},{t:"table",cols:["When","What to say","Why then"],rows:[
["At booking and a few days before departure","Visas, travel authorisations, arrival cards, what cannot be brought in","Anything that takes days to prepare can only be dealt with here"],
["At the gate","Food, tobacco, and not taking items served on board off the aircraft","They can still leave things behind"],
["On board before arrival","How to declare, and what must not be taken off","The last chance. Those who declare are not penalised"]]}]},
{h:"A line for each destination (samples)",blocks:[{t:"table",cols:["Destination","What to say"],rows:[
["Japan","Meat products, fruit and vegetables cannot be brought in. Everyone submits a customs declaration"],
["Korea","Meat products, dairy products and fruit cannot be brought in. If you have any, please declare them at quarantine"],
["United States and Canada","Please declare all food. Please do not take with you any fruit served on board"],
["Australia and New Zealand","You must declare food, plants, animal products and shoes with soil on them"],
["Taiwan","Meat products, e-cigarettes and heated tobacco cannot be brought in"],
["Thailand and Singapore","Bringing in or using e-cigarettes is prohibited"],
["The Middle East","There are rules on bringing in alcohol, pork products and medicines. Please check the guidance of the authorities at your destination"]]},
{t:"note",x:"* These are samples. Write the actual wording to match the latest guidance from the destination’s authorities."}]},
{h:"A pre-arrival announcement (sample)",blocks:[{t:"p",x:"“We will be landing shortly. In this country, bringing in meat products, fruit and vegetables is restricted by law. Please do not take with you any fruit or meals served on board. If you have any such items, please declare them at the quarantine counter after arrival. If you declare them, you will not be penalised.”"},
{t:"rows",items:[
{name:"Keep it short",x:"Long announcements are not listened to. Limit it to the one or two commonest violations at that destination."},
{name:"Say what to do",x:"Do not stop at “it is prohibited”. Say “please declare it” or “please leave it on board”."},
{name:"In the passengers’ languages",x:"Choose languages to match the nationalities on board."}]}]},
{h:"Writing and revising the wording",blocks:[{t:"check",items:[
{name:"Follow the authorities’ wording",x:"Do not rephrase according to your own interpretation."},
{name:"Never say “that will be fine”",x:"What you can say is “please declare it”."},
{name:"Revise as soon as something changes",x:"Decide who revises which text. Out-of-date information is the most dangerous."},
{name:"Check whether it worked",x:"After a change, ask the destination station whether fewer passengers are being stopped."}]},
{t:"point",x:"The airline does not make the rules at the border. But it is the only party standing between the passenger and those rules that is in a position to tell them."}]}],
voice:{h:"A Reported Case",x:"In April 2018 a passenger on a Delta flight from Paris to Minneapolis kept an apple handed out by the cabin crew, meaning to eat it on her connecting flight. US customs found it, and she was reported to have been fined USD 500 and to have lost her Global Entry status for not declaring it (Sources: AP, BBC and others). Food handed out on board is covered by the import rules too, which is why the pre-arrival announcement should ask passengers not to take fruit from the flight off the aircraft."},
terms:[["Pre-travel Information","事前の案内","사전 안내"],["Cabin Announcement","機内の放送","기내 방송"],["Declaration","申告","신고"],["Gate Announcement","搭乗口の案内","탑승구 안내"]],
quiz:[{q:"When should passengers be told about things that take days to prepare, such as visas and travel authorisations?",opts:["At booking and a few days before departure","At the gate","On board before arrival","Never"],a:0,exp:"That is the only time it can still be dealt with."},
{q:"What matters in a pre-arrival announcement?",opts:["Keep it short and say what to do","Speak for as long as possible","Read out every prohibited item","Say “that will be fine”"],a:0,exp:"Say what to do: “please declare it”."},
{q:"What is the most dangerous kind of passenger information?",opts:["Information that is out of date","Short information","Information in a foreign language","Information that encourages declaring"],a:0,exp:"Revise as soon as something changes."}],
next:"6-1 At the departure counter: thinking in situations"});
})(window.ARTS);
