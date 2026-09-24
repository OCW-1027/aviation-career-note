/* 外国航空会社の日本就航・支店開設ガイド — English version (Part 4: システムとCIQ) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("4-1",{title:"Shared Airport Systems and Printer Testing",hl:"shared systems",subtitle:"Connecting your own reservation and check-in system to the airport’s shared terminals",
lead:["At most airports the terminals at the counters and gates are shared between airlines. A foreign carrier has to connect its own passenger service and departure control system to those shared terminals and lines so that boarding passes and bag tags can be printed.",
"This article covers how the shared systems work, the applications needed to connect, what to test before launch, preparing for operational messaging, and what to have ready when something fails."],
sections:[
{h:"How the shared systems work",blocks:[{t:"table",cols:["Element","What it is"],rows:[
["Shared terminals","Counter and gate terminals shared between airlines (CUTE and CUPPS)"],
["Lines","The connection from the shared terminal to your own passenger system"],
["Printers","Boarding pass printers (BPP) and bag tag printers (BTP)"],
["Boarding pass readers","The gate readers (BGR)"],
["Messaging","The system that sends and receives operational messages such as movement and load messages"]]}]},
{h:"Preparing the connection",blocks:[{t:"check",items:[
{name:"Lines and IDs",x:"Apply to the shared system provider and the airport for lines, IDs and logical units. It takes time."},
{name:"Your own system",x:"Ask head office IT to configure the airport code, the counter and gate settings and the print formats."},
{name:"Message addresses",x:"Agree the addresses for the station, the handling company, head office operations control and the departure station, and who receives what."},
{name:"Office connectivity",x:"Internet at the airport office (whether a fixed IP is needed) and the connection to head office systems."}]}]},
{h:"What to test before launch",blocks:[{t:"table",cols:["Test","What you are checking"],rows:[
["Boarding pass printing","Position of the text, the barcode, premium cabin indicators"],
["Bag tag printing","Numbers, destination, transfers, priority marking"],
["Readers","Reading a pass, and the warning displays for duplicate boarding or the wrong flight"],
["Manifest output","The final manifest and the format used for documents"],
["Messages","Sending and receiving movement and load messages"],
["Test flight","Create a test flight and bookings in the system and run check-in through to boarding"]]}]},
{h:"Being ready for failures",blocks:[{t:"rows",items:[
{name:"Manual fallback",x:"Keep what manual working needs — a passenger list, a seat map, handwritten boarding passes and tags — and practise at least once a year (Ground Staff 2-7)."},
{name:"Contacts",x:"Keep a list for the shared system provider, head office IT and the handling company’s contact."},
{name:"Account management",x:"Tidy the accounts whenever staff change. Never write passwords in a shared document."}]},
{t:"point",warn:true,x:"System connections take far longer from application to service than people expect. Once a launch is decided, apply alongside the airport formalities, as a priority."}]}],
voice:"[Interview to be added] A problem found in the printer tests before launch.",
terms:[["CUTE / CUPPS","共用端末","공용 단말"],["Passenger Service System / DCS","旅客システム","여객 시스템"],["Boarding Pass Printer (BPP)","搭乗券プリンター","탑승권 프린터"],["Bag Tag Printer (BTP)","手荷物タグプリンター","수하물 태그 프린터"],["Boarding Gate Reader (BGR)","搭乗券読み取り機","탑승권 리더기"],["Operational Messages (MVT / LDM)","運航の電報","운항 전문"]],
quiz:[{q:"What does the pre-launch test flight check?",opts:["The whole flow from check-in to boarding","Staff uniforms","The airport shops","The weather"],a:0,exp:"A test flight in the system, run end to end."},
{q:"What must you watch with shared system connections?",opts:["Applying the day before launch is fine","Application to service takes time","No application is needed","The handler does all of it"],a:1,exp:"Apply as a priority."},
{q:"How do you prepare for a system failure?",opts:["Do nothing","Keep the manual materials and practise","Just ask passengers to wait","Cancel the flight"],a:1,exp:"Prepare manual working."}],
next:"4-2 NACCS and arrival and departure formalities"});

set("4-2",{title:"NACCS and Arrival and Departure Formalities",hl:"NACCS",subtitle:"Arrival and departure reports, passenger lists and cargo manifests, filed electronically ★",
lead:["In Japan most of the formalities for an aircraft’s arrival and departure are filed electronically to customs and other agencies through NACCS, the customs and port information system. On passenger flights that covers crew and passenger lists, the arrival and departure report and the cargo manifest.",
"This article covers the main filings, who inputs them, applying to use the system, and what to settle before launch. Confirm the detail with customs and the system operator."],
sections:[
{h:"The main filings (passenger flight example)",blocks:[{t:"table",cols:["Filing","What it is","Who inputs it (example)"],rows:[
["Arrival and departure report","Flight, aircraft, arrival and departure times","The passenger handling company"],
["Crew and passenger lists","Crew and passenger details","The passenger handling company"],
["General declaration (G/D)","The declaration for arrival and departure, in NACCS or on paper","The passenger handling company"],
["Cargo manifest","Details of the cargo","The cargo handling company, for imports and exports"]]},
{t:"note",x:"* An example of the division of work at launch; who enters what depends on the contract between the airline and its handlers. ★"}]},
{h:"What to settle with customs before launch",blocks:[{t:"check",items:[
{name:"Company details",x:"The legal name, the office address and contacts, and where enquiries about passenger information and items left on board should go."},
{name:"Operational details",x:"Start date, days of operation, aircraft type, the two- and three-letter codes, flight numbers and times for arrival and departure, and the terminal."},
{name:"Fares and cargo",x:"Whether there is a tariff, and whether cargo is carried."},
{name:"Who files",x:"Which company inputs the passenger list, the cargo manifest and the general declaration, and their contacts."},
{name:"Handling",x:"The companies covering passenger, ramp, cargo, maintenance, fuelling, cleaning and security."},
{name:"International tourist tax",x:"How the tax is paid: as a domestic business, or as a foreign business with a tax agent."}]}]},
{h:"Applying to use the system",blocks:[{t:"rows",items:[
{name:"The airline applies",x:"The airline applies to use NACCS and commonly leaves the input to the handling company."},
{name:"Customs registration",x:"A corporate application may be needed for access to the customs area, together with an undertaking, rules for managing ID cards, and notification of the work and the people who will handle it."},
{name:"Pre-launch briefing",x:"Customs will ask for a set of confirmations before a new service starts."}]}]},
{h:"Running it",blocks:[{t:"check",items:[
{name:"Accurate numbers",x:"The passenger list must match the actual boarded count (Ground Staff 2-7)."},
{name:"Irregular operations",x:"Correcting or cancelling filings after a cancellation, delay or diversion."},
{name:"Aircraft changes",x:"Entering a change of aircraft registration."},
{name:"Cargo items",x:"Arranging clearance where goods need it, for example urgent maintenance parts."}]},
{t:"point",x:"Even when the handling company does the input, the responsibility is the airline’s. Write who inputs what and when into the SOP, and review it at the monthly meeting."}]}],
voice:"[Interview to be added] What you agreed with customs before the new service started.",
terms:[["NACCS","輸出入・港湾関連情報処理システム","일본 통관·항만 정보 시스템"],["Arrival / Departure Report","入出港届","입출항 신고"],["Passenger List (P/L)","乗客名簿","승객 명단"],["Cargo Manifest (C/L)","積荷目録","적하목록"],["General Declaration (G/D)","一般申告書","입출항 신고서"],["Tax Agent","納税管理人","납세 관리인"]],
quiz:[{q:"Which is filed through NACCS?",opts:["Passenger lists and cargo manifests","Staff salaries","Travel agency contracts","The catering menu"],a:0,exp:"Arrival and departure formalities are filed electronically."},
{q:"Where does responsibility lie when the handler does the input?",opts:["With the handler alone","With the airline","With customs","With nobody"],a:1,exp:"Write who inputs what into the SOP."},
{q:"Which is NOT settled with customs before launch?",opts:["Aircraft type and flight numbers","Who files the arrival and departure reports","The handling companies","Where staff are from"],a:3,exp:"Operational details, responsibilities and handling arrangements."}],
next:"4-3 Advance passenger information and interactive systems"});

set("4-3",{title:"Advance Passenger Information and Interactive Systems",hl:"advance passenger information",subtitle:"Send the passenger’s details before they fly — and in some countries get a board or no-board answer back ★",
lead:["On international flights to and from Japan, airlines must send passport details (advance passenger information, API) and booking details (PNR) to immigration and customs. Beyond that, interactive systems that return a board or no-board answer to each transmission (iAPI) are spreading.",
"This article covers the difference between API and PNR, how the interactive systems work, examples of national schemes, the pre-launch transmission tests, and what happens at check-in. Timing and scope change, so always check current guidance."],
sections:[
{h:"API and PNR",blocks:[{t:"cards",n:2,items:[
{ic:"🛂",name:"Advance passenger information (API)",x:"Passport details — name, date of birth, nationality, passport number — and the flight, built from the check-in data."},
{ic:"📇",name:"Booking data (PNR)",x:"The booking record: contacts, payment, itinerary. Sent when the authorities require it."}]},
{t:"note",x:"* Flights to and from Japan are required to send both, according to airlines’ published information."}]},
{h:"How interactive systems work",blocks:[{t:"ladder",rise:10,steps:[{name:"Check-in",sub:"Passport details entered"},{name:"Transmit",sub:"Sent to the authorities per passenger"},{name:"Check",sub:"The authorities run their checks"},{name:"Answer",sub:"Board, no-board or refer"},{name:"Act",sub:"No boarding pass where the answer is no-board"}]},
{t:"rows",items:[
{name:"Countries already using it",x:"Korea, for example, runs a pre-departure passenger checking scheme, so flights to Korea act on the answer at the departure station."},
{name:"Japan",x:"The Immigration Services Agency has issued connection guidance for airlines (the PAXLST and CUSRES message definitions and how errors are handled) and is moving towards an interactive system. Check the current timing and scope. ★"}]}]},
{h:"Pre-launch transmission tests",blocks:[{t:"check",items:[
{name:"Tests towards the destination country",x:"Test API and any pre-departure checking scheme for flights to that country."},
{name:"Tests towards Japan",x:"Test API and PNR transmission to the Japanese authorities."},
{name:"Error handling",x:"Agree the procedure when no answer comes back or the message errors."},
{name:"Operating guidance",x:"Share the scheme’s guidance for airlines with the station and the handling company."}]},
{t:"point",warn:true,x:"Testing involves head office IT, the system provider and the authorities in both countries, so scheduling takes time. Plan it months before launch."}]},
{h:"At check-in",blocks:[{t:"rows",items:[
{name:"Accurate entry",x:"Use the passport reader to avoid keying errors."},
{name:"A no-board answer",x:"Do not issue a boarding pass; contact the authorities through the agreed procedure. Never guess at the reason in front of the passenger."},
{name:"A refer answer",x:"Report it to your supervisor and wait for the authorities’ instruction."},
{name:"Records",x:"Record the answer and what was done. It also reduces the number of passengers refused entry on arrival (Ground Staff 5-1)."}]}]}],
voice:"[Interview to be added] Handling a no-board answer at the counter.",
terms:[["Advance Passenger Information (API)","事前旅客情報","사전 승객 정보"],["Passenger Name Record (PNR)","予約記録","예약 기록"],["Interactive API (iAPI)","インタラクティブ型API","대화형 API"],["Pre-departure Passenger Checking","搭乗者事前確認制度","탑승자 사전확인제도"],["Board / No-board","搭乗可・不可","탑승 가·불가"],["PAXLST / CUSRES","メッセージ形式","메시지 형식"]],
quiz:[{q:"What makes an interactive API system different?",opts:["It only sends data","The authorities send back a board or no-board answer","It is filed on paper","It is sent after arrival"],a:1,exp:"An answer comes back for each passenger."},
{q:"What do you do on a no-board answer?",opts:["Issue the boarding pass","Withhold it and contact the authorities as agreed","Guess at the reason for the passenger","Ignore it"],a:1,exp:"Follow the agreed procedure."},
{q:"Which is true of pre-departure checking schemes?",opts:["They do not exist yet","Some countries already run them","Only Japan has one","Cargo only"],a:1,exp:"Korea, for example, already operates one."}],
next:"4-4 Customs, quarantine and the changing tax-free scheme"});

set("4-4",{title:"Customs, Quarantine and the Changing Tax-free Scheme",hl:"customs and quarantine",subtitle:"Quarantine announcements, digital entry procedures, and the tax-free change from November 2026 ★",
lead:["Supporting the customs and quarantine process is part of an airline’s job: playing the quarantine announcement before arrival, explaining the entry procedure, checking what is subject to animal and plant quarantine. On top of that, Japan’s consumption tax exemption for visitors changes to a refund method from November 2026.",
"This article covers cooperation with quarantine, digital entry procedures, animal and plant quarantine, the tax-free change and its effect at airports, and what to settle with customs and quarantine before launch."],
sections:[
{h:"Cooperation with quarantine",blocks:[{t:"check",items:[
{name:"The in-flight announcement",x:"The quarantine service provides scripts and recordings for the announcement before arrival, in several languages and in full and short versions. Share them with the cabin crew."},
{name:"During an outbreak",x:"You may be asked to distribute questionnaires, collect health declarations and report symptomatic passengers."},
{name:"Illness on board",x:"Where an infectious disease is suspected, contact quarantine before arrival and follow their instructions (Ground Staff 5-3)."}]}]},
{h:"Digital entry procedures",blocks:[{t:"rows",items:[
{name:"Online pre-registration",x:"Immigration and customs declaration details can be registered online in advance (Visit Japan Web and similar). Agree how it is explained on board and at the counter."},
{name:"Paper forms",x:"How paper arrival cards and customs declarations are held and handed out when needed."},
{name:"Electronic travel authorization (JESTA)",x:"A 2026 amendment to the immigration law provides for it. Visa-exempt short-term visitors will need authorization online before departure, and airlines will be required not to board anyone without it. Introduction is targeted for fiscal 2028. Check-in procedures and systems will have to be prepared. ★"}]}]},
{h:"Animal and plant quarantine",blocks:[{t:"check",items:[
{name:"Pets",x:"The import conditions for dogs and cats: microchip, rabies vaccination, antibody test, waiting period and advance notification (Ground Staff 1-8)."},
{name:"Plants and food",x:"Explaining which meat products and fruit cannot be brought in. Breaches carry penalties."},
{name:"In-flight announcements",x:"Animal and plant quarantine information is also sometimes announced before arrival."}]}]},
{h:"The tax-free change (refund method)",blocks:[{t:"table",cols:["","Until now","From 1 November 2026"],rows:[
["At the point of sale","Sold free of consumption tax at a duty-free shop","Sold with consumption tax included"],
["On departure","Customs check the goods and the purchase record","Customs confirm the goods are being taken out"],
["Refund","—","After confirmation, the shop refunds the tax"],
["Categories","General goods and consumables, purchase limits, sealed packaging","Categories, consumable limits and sealed packaging abolished"]]},
{t:"rows",items:[
{name:"Effect at the airport",x:"Travellers must present their passport at a terminal on departure, within 90 days of purchase, for customs confirmation. Work is under way to keep queues down, and the departure flow and the time it takes may change."},
{name:"For the airline",x:"Tell passengers that departure formalities may take longer, and confirm how duty-free goods are handled when a departure is cancelled (Ground Staff 2-6)."}]},
{t:"note",x:"* From the government’s explanatory material on the tax reform outline. Check the tax agency and customs for the detail. ★"}]},
{h:"What to settle before launch",blocks:[{t:"check",items:[
{name:"Customs",x:"The new service confirmations (4-2), the corporate application, and access procedures for staff."},
{name:"Quarantine",x:"The announcement material and the contact structure during an outbreak."},
{name:"Animal and plant quarantine",x:"The flow when a pet arrives, and the contacts."},
{name:"Immigration",x:"The procedure for escorting and guarding passengers refused entry, and undertakings on things such as door codes (Part 5)."}]}]}],
voice:"[Interview to be added] How you supported quarantine during a period of heightened screening.",
terms:[["Quarantine Station","検疫所","검역소"],["Animal Quarantine","動物検疫","동물 검역"],["Plant Protection","植物防疫","식물 검역"],["Tax-free Program (Consumption Tax)","免税制度","면세 제도"],["Refund Method","リファンド方式","환급 방식"],["Electronic Travel Authorization","電子渡航認証","전자여행허가"]],
quiz:[{q:"When does Japan’s visitor tax-free scheme move to a refund method?",opts:["April 2025","1 November 2026","April 2027","It is not changing"],a:1,exp:"It applies from 1 November 2026."},
{q:"How does a sale work under the refund method?",opts:["Sold tax-free","Sold with tax, refunded after departure is confirmed","Sold only at the airport","Not sold"],a:1,exp:"The refund follows confirmation that the goods are leaving."},
{q:"Who provides the in-flight quarantine announcement material?",opts:["A travel agency","The quarantine service","An airport shop","The handling company"],a:1,exp:"Scripts and recordings are provided in several languages."}],
next:"5-1 The aviation security programme and training plan"});
})(window.ARTS);
