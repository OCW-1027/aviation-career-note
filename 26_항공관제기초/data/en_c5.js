/* 航空管制の基礎 5-1〜5-3・6-1 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("5-1",{title:"Trajectory-Based Operations (TBO), SWIM and the New Flight Plan: Sharing Routes with Times Attached",hl:"TBO",subtitle:"TBO, in which airlines, ATC and airports agree and share a four-dimensional (4D) trajectory of position, altitude and time from before departure to arrival; SWIM, the common information backbone that supports it; FF-ICE, the new flight plan; and automation and the controller’s role",
lead:["Today, ATC works mainly tactically, adjusting separation and sequencing while monitoring aircraft that are already airborne. The industry is now moving towards all parties sharing, before departure, a 4D trajectory that states when, where and at what altitude a flight will pass, and then flying it as planned to reduce holding and detours. This is trajectory-based operations (TBO).","This lesson covers the TBO concept, SWIM (the common framework for exchanging information), the new flight plan FF-ICE, and the controller’s role as automation grows, alongside developments in Korea, Japan, the USA and Europe."],
sections:[
{h:"Sharing a 4D trajectory",blocks:[{t:"fig",id:"atcb_tbo",cap:"Animated figure: airlines, ATC, airports, weather services and foreign ATC providers, connected through SWIM, share a 4D trajectory of position, altitude and time."},
{t:"rows",items:[
{name:"Today",x:"A flight plan is filed once before departure, and everything after that is adjusted tactically through ATC instructions; congestion at the destination often becomes apparent only as the aircraft nears it"},
{name:"In future",x:"From before departure to arrival, all parties look at the same trajectory and agree the optimum times and route, and the aircraft flies so as to cross each point at the agreed time"},
{name:"Benefits",x:"Less holding and fewer detours, reducing fuel burn and CO2 emissions; more accurate estimated arrival times make ground handling easier to prepare"}]}]},
{h:"The new flight plan (FF-ICE) and SWIM",blocks:[{t:"table",cols:["Item","Today’s flight plan","FF-ICE (new flight plan)"],rows:[
["Format","Text in fixed fields (the format in use since 2012)","Machine-readable data that can carry trajectory and aircraft performance data"],
["Exchange","Mainly one-way: the plan is filed and accepted","Negotiated before filing, with updates shared afterwards"],
["Connections","Separate links between organisations","Through SWIM, a common information framework, each party receives the information it needs"]]},
{t:"note",x:"ICAO’s FF-ICE and SWIM provisions have applied since 28 November 2024. The current flight plan format is to be phased out gradually, with withdrawal targeted for around 2034."}]},
{h:"Automation and the controller’s role",blocks:[{t:"rows",items:[
{name:"Support tools",x:"Conflict prediction, arrival sequencing, taxi route suggestions, speech-recognition-assisted input and more"},
{name:"The human role",x:"Final decisions and responsibility rest with the controller; the ability to recover the situation safely when systems do not work properly is vital"},
{name:"Training",x:"Every new system requires controller training and a review of procedures"}]}]},
{h:"Comparing four regions",blocks:[{t:"table",cols:["Item","Korea","Japan","USA","Europe"],rows:[
["Path to TBO","4th Aviation Policy Master Plan (2025–2029): building a system to manage air traffic data in one place","CARATS2040: time-based trajectory management from departure to arrival, enabling optimal trajectories to be chosen","NextGen and the Brand New Air Traffic Control System (BNATCS): expanding time-based management and data link","SESAR and the ATM Master Plan: trajectory-based operations and a Digital European Sky"],
["Information sharing","Integrated air traffic data management","Introducing SWIM","A wide range of information distributed through FAA SWIM","States and the Network Manager share information under common SWIM rules"]]},
{t:"note",x:"The table shows the broad direction of each plan. Check the original plans for exact content and timing."}]},
{h:"What it means for your work",blocks:[{t:"check",items:[
{name:"Dispatch",x:"The flight plan changes from a “document” to “data shared by all parties”, and route and fuel planning will change with it"},
{name:"Airports",x:"More accurate arrival times allow stand, staff and vehicle allocations to be confirmed earlier"},
{name:"Keep learning",x:"Rules and systems are in transition; keep track of revisions to each country’s plans"}]}]},
{h:"References",blocks:[{t:"note",x:"This lesson is this site’s own summary based on publicly available sources and other material. Check the originals for precise details."},
{t:"link",href:"https://www.mlit.go.jp/koku/carats/forum-open/forum2025/2_JCAB木原_航空保安業務の概要と将来の航空交通システムに関する長期ビジョン（CARATS2040）.pdf",x:"JCAB: Overview of air navigation services and CARATS2040 (2025, Japanese)"},
{t:"link",href:"https://www.icao.int/sites/default/files/APAC/Meetings/2024/2024%20APANPIRG-35/3-Working%20Papers/WP22-AI-3.4-FFICE-and-SWIM-Updates-final.pdf",x:"ICAO APAC: FF-ICE and SWIM updates (2024)"}]}],
voice:"TBO may sound like the distant future, but more accurate arrival times make ground work much easier to plan. When you meet a new term, ask yourself what it changes on the ground.",
terms:[["Trajectory-Based Operations (TBO)","軌道ベース運用","궤적 기반 운항"],["System Wide Information Management (SWIM)","システム全体の情報管理","시스템 전반 정보 관리"],["FF-ICE (Flight and Flow Information for a Collaborative Environment)","次世代の飛行計画（協調的環境のための飛行・フロー情報）","차세대 비행계획(협력 환경을 위한 비행·흐름 정보)"],["4D Trajectory","4次元の軌道","4차원 궤적"],["Time-Based Management","時間ベース管理","시간 기반 관리"],["Automation","自動化","자동화"]],
quiz:[{q:"What are the “four dimensions” shared in TBO?",opts:["Length, width, depth and colour","Position (latitude and longitude), altitude and time","Speed, fuel, weight and weather","Callsign, aircraft type, passengers and baggage"],a:1,exp:"Adding time to position and altitude gives the 4D trajectory."},
{q:"What is SWIM?",opts:["A new runway","A common framework for exchanging information","Swimming training","A weather radar"],a:1,exp:"System Wide Information Management, the common information backbone."},
{q:"Even with more automation, who holds the final decision and responsibility?",opts:["The computer","The controller","The airline","The weather service"],a:1,exp:"Tools are only an aid; the final decision and responsibility rest with the controller."}],
next:"5-2 Remote towers, drones and air taxis: a changing sky"});
set("5-2",{title:"Remote Towers, Drones and Air Taxis: A Changing Sky",hl:"Remote towers",subtitle:"Remote (digital) towers that provide control from camera images without a tower at the airport, UTM for managing drones digitally in low-level airspace, and AAM air taxis over cities: progress compared across four regions",
lead:["The way ATC is provided is itself starting to change. Remote towers, where controllers work from camera images in a control room far from the airport instead of in a tower on site, began in Europe and are now spreading.","Meanwhile, drones and air taxis (AAM) are joining the sky as new airspace users. Unlike airliners, each of which is handled individually by a controller, they need systems that can manage large numbers of aircraft digitally. This lesson looks at how the sky is changing."],
sections:[
{h:"Remote towers",blocks:[{t:"fig",id:"atcb_rtwr",cap:"Animated figure: images from airport cameras and sensors are displayed on screens in a control room far from the airport, from which traffic is controlled."},
{t:"table",cols:["Region","Main examples"],rows:[
["Europe","Sweden started the world’s first remote tower operations in 2015; London City Airport has been controlled entirely from a remote centre since 2021"],
["USA","The FAA is testing and evaluating remote towers"],
["Japan","Aerodrome flight information services at regional airports are provided remotely from a central location (known in Japan as remote aerodrome advisory)"],
["Korea","Research and studies under way"]]},
{t:"note",x:"The table shows typical examples. For the latest status, check announcements from each country’s aviation authority."}]},
{h:"Drones and air taxis",blocks:[{t:"fig",id:"atcb_uam",cap:"Animated figure: airliners at higher levels (conventional ATC), air taxi corridors below them, and drones in low-level airspace managed digitally (UTM)."},
{t:"rows",items:[
{name:"UTM (drone traffic management)",x:"Drone flight plans and positions are shared digitally so that flights can be deconflicted, rather than each aircraft being handled individually by a controller"},
{name:"AAM (air taxis)",x:"Electric vertical take-off and landing (eVTOL) aircraft and similar types, used for trips in and around cities along designated corridors and from dedicated vertiports"},
{name:"Relationship with ATC",x:"Near airports and where they share airspace with airliners, operating rules need to be agreed with ATC"}]}]},
{h:"Comparing four regions",blocks:[{t:"table",cols:["Item","Korea","Japan","USA","Europe"],rows:[
["Drones","Government-led trials of a drone traffic management system","“Level 4” flights beyond visual line of sight over people allowed since December 2022","Remote ID required; rules for beyond-visual-line-of-sight flights being developed","EU U-space rules applicable since January 2023"],
["Air taxis","K-UAM trials under way; rules being prepared for commercial service","Demonstration flights at Expo 2025 Osaka, Kansai","Rules for powered-lift (e.g. eVTOL) pilots and operations issued in 2024","EASA developing aircraft and operations rules"]]},
{t:"note",x:"The table shows typical examples. Rules change almost every year, so check the latest announcements from each country’s aviation authority."}]},
{h:"Relevance to your work",blocks:[{t:"check",items:[
{name:"Drones near airports",x:"A drone sighting near an airport can lead to a temporary runway closure and flight delays"},
{name:"New jobs",x:"New roles are emerging, such as drone operations management, UTM operations and remote tower engineering"},
{name:"Regional airports",x:"Remote towers and remote aerodrome flight information services can help keep low-traffic airports open"}]}]},
{h:"References",blocks:[{t:"note",x:"This lesson is this site’s own summary based on publicly available sources. Refer to the original sources for accurate details."},
{t:"link",href:"https://www.easa.europa.eu/en/domains/drones-air-mobility",x:"EASA: Drones & Air Mobility"}]}],
voice:"A drone spotted near an airport can halt runway operations for a while. In future, when passengers ask “Why are we delayed?”, the answer may more often involve drones or air taxis.",
terms:[["Remote / Digital Tower","リモートタワー","원격 관제탑"],["UTM","無人航空機交通管理","드론 교통관리"],["Advanced Air Mobility (AAM)","先進航空モビリティ","미래항공모빌리티"],["Urban Air Mobility (UAM)","都市航空交通","도심항공교통"],["Vertiport","離着陸場","버티포트"],["BVLOS","目視外飛行","비가시권 비행"]],
quiz:[{q:"Which country was the first to operate a remote tower?",opts:["USA","Japan","Sweden","Korea"],a:2,exp:"Operations began in Sweden in 2015."},
{q:"What does UTM manage?",opts:["Airliner airways","Mainly drones in low-level airspace","Airport car parks","Weather"],a:1,exp:"It is a system for sharing drone flight information digitally and deconflicting flights."},
{q:"When did Japan’s “Level 4” drone rules start?",opts:["2015","2019","2022","2025"],a:2,exp:"They started in December 2022."}],
next:"5-3 Long-term plans by region: CARATS2040, Korea, the US and Europe"});
set("5-3",{title:"Future ATM Plans: Japan (CARATS2040), Korea, the US and Europe",hl:"Future plans",subtitle:"Japan’s CARATS2040, Korea’s 4th Aviation Policy Master Plan, the US Brand New Air Traffic Control System (BNATCS) and Europe’s SESAR and European ATM Master Plan compared: goals, timelines, main content and the staffing challenge",
lead:["Growing traffic, environmental pressure, ageing equipment, new airspace users: every country faces similar challenges and is drawing up plans that look 10 to 20 years ahead.","This lesson sets the plans of Japan, Korea, the US and Europe side by side to compare what each aims for and by when. Figures and dates are often revised, so check the publication dates of the original documents too."],
sections:[
{h:"Overview: plans in four regions",blocks:[{t:"fig",id:"atcb_road",cap:"Animated figure: ICAO’s Global Air Navigation Plan and the direction of the plans in Japan, Korea, the US and Europe."}]},
{h:"A closer comparison",blocks:[{t:"table",cols:["Item","Japan","Korea","US","Europe"],rows:[
["Plan","CARATS2040 (long-term vision for future air traffic systems)","4th Aviation Policy Master Plan","Brand New Air Traffic Control System (BNATCS), NextGen","SESAR, European ATM Master Plan"],
["Timing","Roadmap drawn up in June 2025; horizon 2040","2025–2029 (announced December 2025)","Announced in May 2025; completion targeted for end-2028","Aiming for a “Digital European Sky” in the 2040s"],
["Main content","TBO; automation and digitalisation (surface movement guidance, runway incursion detection, speech recognition); CDO; accommodating new airspace users; redundancy in surveillance, satellite navigation and communications","Integrated air traffic data management; airspace restructuring for UAM; preventive safety management using AI and other technologies","Replacing radios, radars, telecommunications networks and facilities; introducing electronic flight strips; a common automation system","Trajectory-based operations; cross-border airspace management; decoupling of data and services; automation"],
["Funding and progress","—","—","An initial $12.5 billion (secured by a July 2025 law). As of April 2026, about half of the copper telecom lines had been moved to fibre and other links, and electronic flight strips were in use at 17 towers","Joint research and deployment by the EU, EUROCONTROL and individual states"]]},
{t:"note",x:"This table summarises public sources; “—” means no figure is given in this table. Plans are revised frequently, so always check the latest version of the original documents."}]},
{h:"A common challenge: staffing",blocks:[{t:"rows",items:[
{name:"Recruiting controllers",x:"With traffic growing and experienced controllers retiring, recruiting and training controllers is a major challenge everywhere"},
{name:"Training",x:"It takes several years to qualify to work unsupervised, and every new system requires additional training"},
{name:"Working patterns",x:"Rosters are needed that reduce the burden of night and shift work and help controllers maintain concentration"}]},
{t:"note",x:"Career paths into air traffic control and other aviation jobs are covered country by country in the Aviation Careers Guide course."},
{t:"link",href:"../27_항공직업가이드/00_シリーズ全体_航空の仕事ガイド.html",x:"Aviation Careers Guide"}]},
{h:"Relevance to your work",blocks:[{t:"check",items:[
{name:"Following developments",x:"Revisions to national plans and roadmap updates affect investment by airports and airlines and the way flights are operated"},
{name:"Differences between countries",x:"Flights between Korea and Japan are affected by both countries’ plans and the differences between them (e.g. data link, airspace design)"},
{name:"Your career",x:"Thinking ahead about what automation will change and which roles will remain with people helps you plan your career"}]}]},
{h:"References",blocks:[{t:"note",x:"This lesson is this site’s own summary based on public sources and other material. Check the original documents for accurate details."},
{t:"link",href:"https://www.mlit.go.jp/koku/carats/forum-open/forum2025/2_JCAB木原_航空保安業務の概要と将来の航空交通システムに関する長期ビジョン（CARATS2040）.pdf",x:"JCAB: Overview of air navigation services and CARATS2040 (2025, Japanese)"},
{t:"link",href:"https://news.tf.co.kr/read/economy/2270973.htm",x:"News report on Korea’s 4th Aviation Policy Master Plan (December 2025, Korean)"},
{t:"link",href:"https://www.hklaw.com/en/insights/publications/2026/04/the-bnatcs-state-of-play",x:"The US BNATCS: state of play (April 2026, English)"}]}],
voice:"Planning documents can look daunting, but every country is tackling the same four issues: safety, congestion, the environment and people. Read just one of your own country’s plans and you will see aviation news differently.",
terms:[["Long-term Vision","長期ビジョン","장기 비전"],["Roadmap","工程表","로드맵"],["Aviation Policy Master Plan","航空政策基本計画","항공정책 기본계획"],["NextGen","次世代航空交通システム","차세대 항공교통시스템"],["SESAR","欧州単一空域ATM研究","유럽 단일 하늘 ATM 연구"],["Staffing","人員の確保","인력 확보"]],
quiz:[{q:"What is Japan’s long-term vision for future air traffic systems called?",opts:["NextGen","SESAR","CARATS2040","K-UAM"],a:2,exp:"CARATS2040. Its roadmap was drawn up in June 2025."},
{q:"How much initial funding was allocated to the new US ATC system?",opts:["$1.25 billion","$12.5 billion","$125 billion","No funding"],a:1,exp:"$12.5 billion was allocated by a law enacted in July 2025."},
{q:"What major challenge do all countries share?",opts:["Too many runways","Recruiting and training controllers","Too few aircraft","Airports that are too new"],a:1,exp:"With traffic growing and experienced staff retiring, recruiting and training controllers is a challenge shared by all countries."}],
next:"Part 6 Try It Yourself — 6-1 Try it in AIRLINE SAGA: ATC"});
set("6-1",{title:"Try It in AIRLINE SAGA: ATC — Put What You Have Learned to the Test at the Controller’s Position and in the Cockpit",hl:"AIRLINE SAGA: ATC",subtitle:"The game “AIRLINE SAGA: ATC” on this site lets you work five controller positions and also fly as a pilot. This lesson shows where each part of the course helps in the game.",
lead:["So far we have looked at what ATC does, airspace and separation, radio communication, systems and navigation, traffic flow management and the latest developments. Finally, let’s put what you have learned into practice.","“AIRLINE SAGA: ATC” on this site is a game in which you play both controller and pilot, handling flights such as those of the fictional airline VELA AIR. This lesson links each part of the course to scenes in the game."],
sections:[
{h:"What you can do in the game",blocks:[{t:"cards",n:3,items:[
{ic:"🗼",name:"Five controller positions",tag:"Controller",x:"Issue clearances and instructions at Delivery, Ground, Tower, Approach and Area control"},
{ic:"✈",name:"Pilot experience",tag:"Pilot",x:"From the cockpit of a VELA AIR 787, listen to ATC instructions, read them back and work through arrival and departure procedures"},
{ic:"🗺",name:"Three airports",tag:"Airports",x:"Two fictional practice airports, plus Haneda recreated from real data"}]}]},
{h:"Where each lesson fits in the game",blocks:[{t:"table",cols:["Course lesson","Where to try it in the game"],rows:[
["0-1 What ATC does, 0-2 One flight","Work through the five positions in turn to see how a single flight is handed off from one position to the next"],
["1-2 IFR, VFR and separation","At Approach and Area control, maintain separation using level, heading and speed instructions"],
["1-3 Wake turbulence and RECAT","At Tower, judge wake turbulence separation for aircraft taking off and landing behind heavy aircraft"],
["2-1 Phraseology and readback","In the pilot experience, listen to instructions and choose the correct readback. You can also make English radio calls using the microphone"],
["3-2 From ILS to PBN","At Approach and in the pilot experience, fly an ILS approach from approach clearance to final approach"],
["4-2 Arrival sequencing","At Approach, sequence arrivals into a single stream"]]},
{t:"note",x:"The game is a learning tool and simplifies some real ATC procedures and figures. For operational use, always check the applicable national regulations and documents."}]},
{h:"Getting started",blocks:[{t:"rows",items:[
{name:"1. Launch the game",x:"Open AIRLINE SAGA from the “Game” menu on the site and choose ATC"},
{name:"2. Start at a practice airport",x:"Starting at Ground or Tower at a fictional practice airport makes the flow easy to follow"},
{name:"3. Listen to radio calls",x:"Turn on the audio and the transcript help to check the meaning of English radio calls as you go"}]},
{t:"link",href:"../1_지상직여객운송입문/AIRLINE_SAGA_ATC.html",x:"Open AIRLINE SAGA: ATC"}]},
{h:"Course summary",blocks:[{t:"check",items:[
{name:"The purpose of ATC",x:"Preventing collisions and keeping traffic flowing, by issuing clearances and instructions and providing information"},
{name:"Airspace and rules",x:"FIRs, airspace classes, IFR and VFR, three kinds of separation, wake turbulence"},
{name:"Phraseology",x:"Standard phraseology and readback, emergency phraseology and codes"},
{name:"Systems and navigation",x:"Radar and ADS-B, PBN, GBAS and SBAS, data link"},
{name:"Traffic flow management and the future",x:"ATFM, AMAN, CDO, TBO and SWIM, remote towers, drones and air taxis, national plans"}]}]}],
voice:"If you only listen, ATC radio can seem fast and difficult. But once you sit in the controller’s seat yourself, you will understand much better why things are said in that order. Give it a go.",
terms:[["Controller Position","管制席","관제석"],["Pilot Experience","パイロット体験","조종사 체험"],["Practice Airport","練習用の空港","연습용 공항"],["Radio Transcript Help","交信の解釈","교신 해석"],["Simulation","シミュレーション","시뮬레이션"],["Review","復習","복습"]],
quiz:[{q:"What can you practise from the pilot’s side in the game?",opts:["Refuelling","Listening to instructions and reading back correctly","In-flight sales","Maintenance records"],a:1,exp:"In the pilot experience you listen to ATC instructions and choose the correct readback."},
{q:"Which is not one of the five controller positions in the game?",opts:["Delivery","Tower","Approach","Flight dispatch"],a:3,exp:"Flight dispatch is an airline function, not a controller position."},
{q:"What is important when applying what you learn in the game to real work?",opts:["Apply it as it is","Some things are simplified, so check each country’s regulations","Avoid using English","Speed it up"],a:1,exp:"Some things are simplified for learning, so always check the regulations for real work."}]});
})(window.ARTS);
