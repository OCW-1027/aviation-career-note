/* 航空の基礎知識 4-1 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("4-1",{title:"Smart Airports: Walking Through by Face — Worldwide Trends and What Comes Next",hl:"smart airports",subtitle:"From check-in to boarding with just your face: comparing airports worldwide, how ground work changes, the challenges and the outlook to 2030",
lead:["Airports around the world are moving from showing paper boarding passes and passports again and again to “register once, then walk through with your face”. Bags are tracked by radio tags, departure times are set from shared data by airports, airlines and ATC, and border checks are increasingly automated.","This lesson covers the five areas of a smart airport, a comparison of major airports and systems, how ground work changes, the challenges, and the outlook to 2030."],
sections:[
{h:"Walking through by face",blocks:[{t:"fig",id:"smart_journey",cap:"Moving diagram: the passenger passes 1 to 5 in turn; a green tick appears as each face check succeeds. 1 self check-in, 2 automated bag drop, 3 security, 4 exit immigration, 5 boarding gate."},
{t:"point",x:"The key idea is enrolling once and being recognised by the same face many times. The industry calls this One ID. In April 2026 IATA published results of trials in which passengers travelled across several airlines and countries using facial recognition alone."}]},
{h:"Five areas of a smart airport",blocks:[{t:"table",cols:["Area","Main technologies","Example"],rows:[
["Processing","Facial recognition, self-service kiosks, mobile boarding passes","Passing security and the gate by face"],
["Baggage","Automated bag drop, RFID tags, tracking","Recording each bag’s location at every point"],
["Operations","A-CDM, AI forecasting and stand allocation","Sharing target departure times among all parties (Course 1, delay codes)"],
["Border control","Automated gates, advance data, biometric records","From passport stamps to electronic records"],
["Environment","Electric GSE, energy management, SAF","Electrifying ground vehicles, cutting CO2"]]}]},
{h:"Major developments worldwide",blocks:[{t:"table",cols:["Country or airport","Main initiatives"],rows:[
["Korea — Incheon","Smart Pass: enrol your face and pass the security entrance and boarding gate by face"],
["Japan — Narita and Haneda","Face Express: enrol at check-in, then use your face at bag drop, the security entrance and the gate"],
["Singapore — Changi","Since October 2024, passport-free immigration (face and iris) at all four terminals: residents on arrival and departure, foreign visitors on departure; about 10 seconds per person"],
["UAE — Dubai","Emirates has installed more than 200 cameras in Terminal 3 so passengers can go from check-in through immigration, lounges and boarding by face; the authority’s automated gates handled about 9 million travellers in the first half of 2026"],
["India","DigiYatra: mainly for domestic flights, face-based entry, security and boarding spreading across many airports"],
["Europe (Schengen)","EES: started 12 October 2025, fully operational 10 April 2026. Records non-EU short-stay entries and exits with face and fingerprints, replacing passport stamps. The ETIAS pre-travel authorisation has no confirmed start date (September 2026)"],
["United States","TSA’s Touchless ID facial check at security runs at 65 airports in 2026 (optional, PreCheck members); for international departures, CBP facial comparison at the gate runs at 57 airports"],
["Worldwide","SITA’s 2025 survey found some form of biometric border control at 54% of airports, expected to reach 83% by 2028"]]},
{t:"note",x:"* Which airlines, flights, nationalities and steps are covered varies by airport and over time. Check each airport’s and authority’s current guidance for operational use. ★"}]},
{h:"Airport by airport: which steps work by face",blocks:[{t:"fig",id:"smart_compare",cap:"Moving diagram: 1 check-in and bags, 2 security entrance, 3 boarding gate, 4 exit immigration, 5 entry immigration. Green tick = mainly by face; half circle = with conditions (limited travellers, airlines or flights, or the passport is still used); dash = no face-based process or not confirmed; n/a = the United States has no exit immigration (the gate facial check serves as the exit record). An approximate summary by this site from public information as of September 2026."},
{t:"table",cols:["Airport or country","Steps by face","Who and conditions","Features"],rows:[
["Korea — Incheon (ICN)","Security entrance and some gates (Smart Pass)","Enrol via the app, airport kiosks or partner banking apps; face enrolment valid for 5 years, boarding pass registered per flight","Immigration is separate. Since December 2025 some nationalities, including Japanese, can use automated entry gates (SeS)"],
["Japan — Narita/Haneda (NRT/HND)","Bag drop, security entrance and boarding gate (Face Express)","Enrol passport, face and boarding pass at airport machines on the day (no advance application); some flights excluded","Narita deletes face data within 24 hours. Exit immigration uses facial recognition gates that read the passport"],
["Singapore — Changi (SIN)","Bag drop, exit immigration and boarding","Foreign visitors can clear exit immigration without a passport (entry is mainly for residents)","Immigration by face and iris in about 10 seconds"],
["Dubai (DXB)","Check-in, immigration, lounges and some gates","Emirates enrolees; automated gates depend on nationality, visa and other conditions","Trialling walk-through immigration lanes"],
["United States","Security entrance (some), international boarding gates and entry","Security facial checks are optional (PreCheck members, participating airlines); facial records of non-US travellers can be required at entry and exit","No exit immigration; the gate facial check records departure"],
["Europe (Schengen, EES)","Entry and exit checks (enrolment and records)","Non-EU short-stay travellers enrol face and fingerprints on the first crossing","Aimed at records more than speed; first enrolment can lengthen queues"]]},
{t:"table",cols:["","Japan","Korea"],rows:[
["Airline processes","Face Express (from July 2021): bags, security entrance, boarding","Smart Pass (international from July 2023): security entrance, boarding"],
["Enrolment","On the day at airport machines (smartphone enrolment trialled)","In advance via app or kiosk; valid for 5 years"],
["Exit immigration","Facial recognition gates, open to departing foreign nationals since July 2019 with no pre-registration (Haneda, Narita, Kansai, Fukuoka, Chubu, New Chitose, Naha)","Automated immigration; foreign nationals can use it on departure if they meet the conditions"],
["Entry immigration","Japanese citizens use facial gates; foreign nationals see an officer (fingerprints and photo)","Since December 2025 some nationalities, including Japanese, can use automated gates (SeS) at Incheon"],
["Approach to data","Limited to boarding processes and deleted quickly","One enrolment used for a long time"]]},
{t:"point",x:"In short, Japan enrols on the day and deletes quickly, Korea enrols in advance and keeps it longer, and Singapore and Dubai take faces all the way through national immigration. For ground staff, the key is knowing which steps work by face at your airport and where to direct passengers who cannot use them."},
{t:"note",x:"* Sources: public information from Narita International Airport, Incheon International Airport Corporation, Japan’s Immigration Services Agency, Singapore’s ICA, Dubai’s GDRFA and Emirates, the US TSA and CBP, and the European Commission. Coverage and conditions change; check the latest guidance for operational use. ★"}]},
{h:"How ground work changes",blocks:[{t:"table",cols:["Until now","From now on"],rows:[
["Processing everyone at the counter","Most passengers self-serve; staff focus on guidance and exceptions"],
["Comparing passport and face by eye","System matching, plus handling people the machines cannot verify (children, changed appearance)"],
["Accepting and searching for bags by hand","Supervising bag drops; using RFID records to locate mishandled bags fast"],
["Coordinating each flight by phone","Updating target off-block times from A-CDM data"],
["Relying on personal experience","Running data and systems, and handling personal data correctly, become new tasks"]]}]},
{h:"Challenges",blocks:[{t:"check",items:[
{name:"Privacy and consent",x:"How long face data is kept, for what, and how consent is obtained; always offer an opt-out."},
{name:"People who cannot use it",x:"Children, wheelchair users, people whose appearance has changed, people uneasy with machines: keep a human option."},
{name:"Failures",x:"Procedures and training for switching to manual processing when systems go down (Course 1, Part 5)."},
{name:"Congestion",x:"First-time enrolment can cause queues (EES waiting times were reported in summer 2026)."},
{name:"Cost and standards",x:"Benefits shrink if airports, airlines and countries use incompatible systems."}]}]},
{h:"Looking ahead to 2030",blocks:[{t:"rows",items:[
{name:"Near-seamless travel after advance enrolment",x:"Enrol passport and face on a phone before travel and walk through the airport by face; One ID schemes spreading across borders."},
{name:"Digital travel documents",x:"Trials of carrying passport data on a phone as digital travel credentials."},
{name:"Full baggage tracking",x:"Recording bags at every point to all but eliminate delayed baggage."},
{name:"AI-driven operations",x:"AI forecasting delays, congestion and stand use to deploy staff and GSE in advance."}]},
{t:"point",x:"Even in a smart airport, it is people who help passengers in the end. Noticing who cannot get through, stepping in and judging exceptions will be the most valuable skill in ground work."}]}],
voice:"[Interview to be added] How facial recognition changed work at the counter.",
terms:[["Smart Airport","スマート空港","스마트 공항"],["Biometrics","生体認証","생체 인증"],["One ID","ワンアイディー","원 아이디"],["Entry/Exit System (EES)","出入国システム（EU）","출입국 시스템(EU)"],["ETIAS","欧州渡航情報認証制度","유럽 여행 정보 인증 제도"],["RFID Bag Tag","RFIDタグ","RFID 태그"]],
quiz:[{q:"What does the industry call “enrol once, be recognised by the same face many times”?",opts:["One ID","A-CDM","BSP","NOTAM"],a:0,exp:"A concept promoted by IATA."},
{q:"When did the EU’s EES become fully operational?",opts:["January 2024","12 October 2025","10 April 2026","It has not started"],a:2,exp:"It began in phases on 12 October 2025."},
{q:"Why are people still needed in a smart airport?",opts:["Some passengers and situations need exceptions","The law says so","Machines are expensive","They are not"],a:0,exp:"Children, wheelchair users, system failures and more."}],
next:"4-2 Identity checks and security on domestic and international flights"});
})(window.ARTS);
