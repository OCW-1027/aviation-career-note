/* 航空管制の基礎 5-1〜5-3・6-1 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("5-1",{title:"Trajectory-Based Operations (TBO), SWIM and the New Flight Plan: Sharing a Route with Times",hl:"TBO",subtitle:"TBO, where airlines, ATC and airports share and agree a four-dimensional trajectory of position, altitude and time from before departure to arrival; SWIM, the common information backbone; FF-ICE, the new flight plan; and automation and the controller’s role",
lead:["Today, ATC mainly adjusts spacing and order tactically while watching aircraft that are already airborne. The direction now is to share, before departure, a four-dimensional trajectory saying when, where and at what height a flight will pass, and to fly it as planned, reducing holding and detours. This is trajectory-based operations (TBO).","This lesson covers the TBO concept, SWIM (the common framework for exchanging information), the new flight plan FF-ICE, and the controller’s role as automation grows, with developments in four regions."],
sections:[
{h:"Sharing a 4D trajectory",blocks:[{t:"fig",id:"atcb_tbo",cap:"Animated figure: airlines, ATC, airports, weather and other ATC units connected through SWIM, sharing a 4D trajectory of position, altitude and time."},
{t:"rows",items:[
{name:"Today",x:"A flight plan is filed once before departure, and the rest is adjusted tactically by ATC instructions; destination congestion often only becomes clear on approach"},
{name:"Tomorrow",x:"From before departure to arrival, all parties look at the same trajectory and agree the best times and route; the aircraft flies to cross points at the agreed times"},
{name:"Benefits",x:"Less holding and fewer detours, less fuel and CO2, more accurate arrival times and easier ground preparation"}]}]},
{h:"The new flight plan (FF-ICE) and SWIM",blocks:[{t:"table",cols:["Item","Today’s flight plan","FF-ICE (new flight plan)"],rows:[
["Format","Text in fixed fields (the 2012 format)","Machine-readable data that can carry the trajectory and aircraft performance"],
["Exchange","Mainly one way: file and be accepted","Negotiate before filing and share updates afterwards"],
["Connections","Separate links between organisations","SWIM, a common information framework, delivers what each party needs"]]},
{t:"note",x:"ICAO’s FF-ICE and SWIM provisions have applied since 28 November 2024. Today’s flight plan format is to be phased out gradually, with around 2034 as the target."}]},
{h:"Automation and the controller’s role",blocks:[{t:"rows",items:[
{name:"Support tools",x:"Conflict prediction, arrival sequencing, taxi route suggestions, speech recognition input and more"},
{name:"The human role",x:"The final decision and responsibility rest with the controller; the ability to recover safely when tools fail is vital"},
{name:"Training",x:"Every new tool means controller training and revised procedures"}]}]},
{h:"Comparing four regions",blocks:[{t:"table",cols:["Item","Korea","Japan","USA","Europe"],rows:[
["Path to TBO","4th Aviation Policy Master Plan (2025–2029): a system to manage air traffic data in one place","CARATS2040: manage trajectories by time from departure to arrival and allow optimal trajectories","NextGen and the Brand New Air Traffic Control System (BNATCS): expanding time-based management and data link","SESAR and the ATM Master Plan: trajectory-based operations and a Digital European Sky"],
["Information sharing","Integrated air traffic data management","Introducing SWIM","Wide information distribution through FAA SWIM","States and the Network Manager share information under common SWIM rules"]]},
{t:"note",x:"The table shows the broad direction of each plan. Check the original plans for exact content and timing."}]},
{h:"Links to your work",blocks:[{t:"check",items:[
{name:"Dispatch",x:"The flight plan changes from a “document” to “data everyone uses”, and route and fuel planning will change with it"},
{name:"Airports",x:"More accurate arrival times allow stands, staff and vehicles to be confirmed earlier"},
{name:"Keep learning",x:"Rules and systems are changing; keep an eye on updates to each country’s plans"}]}]},
{h:"References",blocks:[{t:"note",x:"This lesson is this site’s own summary of public sources and others. Check the originals for accurate details."},
{t:"link",href:"https://www.mlit.go.jp/koku/carats/forum-open/forum2025/2_JCAB木原_航空保安業務の概要と将来の航空交通システムに関する長期ビジョン（CARATS2040）.pdf",x:"JCAB: Overview of air navigation services and CARATS2040 (2025, Japanese)"},
{t:"link",href:"https://www.icao.int/sites/default/files/APAC/Meetings/2024/2024%20APANPIRG-35/3-Working%20Papers/WP22-AI-3.4-FFICE-and-SWIM-Updates-final.pdf",x:"ICAO APAC: FF-ICE and SWIM updates (2024)"}]}],
voice:"TBO may sound far off, but more accurate arrival times make ground work much easier to plan. When you meet a new term, ask yourself what it changes on the ground.",
terms:[["Trajectory-Based Operations (TBO)","軌道ベース運用","궤적 기반 운항"],["SWIM","システム全体の情報管理","시스템 전반 정보관리"],["FF-ICE","新しい飛行計画の情報環境","미래 비행정보 교환 환경"],["4D Trajectory","4次元の軌道","4차원 궤적"],["Time-Based Management","到着時刻の管理","도착 시각 관리"],["Automation","自動化","자동화"]],
quiz:[{q:"What are the “four dimensions” shared in TBO?",opts:["Length, width, depth and colour","Position (two), altitude and time","Speed, fuel, weight and weather","Callsign, type, passengers and bags"],a:1,exp:"Position and altitude plus time make the 4D trajectory."},
{q:"What is SWIM?",opts:["A new runway","A common framework for exchanging information","Swimming training","A weather radar"],a:1,exp:"System Wide Information Management, the common information backbone."},
{q:"Even with more automation, who holds final decision and responsibility?",opts:["The computer","The controller","The airline","The weather office"],a:1,exp:"Tools support; the controller decides and is responsible."}],
next:"5-2 Remote towers, drones and air taxis: new shapes in the sky"});
set("5-2",{title:"Remote Towers, Drones and Air Taxis: New Shapes in the Sky",hl:"Remote towers",subtitle:"Remote (digital) towers that control from camera images with no tower at the airport, UTM to manage drones in low airspace digitally, and AAM air taxis over cities, compared across four regions",
lead:["The shape of ATC itself is starting to change. Remote towers, where controllers work from camera images in a distant room instead of a tower at the airport, have spread from Europe.","Meanwhile, drones and air taxis (AAM) are new users of the sky. Unlike airliners, each handled by a human controller, they need systems that manage many aircraft digitally. This lesson looks at these new shapes in the sky."],
sections:[
{h:"Remote towers",blocks:[{t:"fig",id:"atcb_rtwr",cap:"Animated figure: images from airport cameras and sensors are shown on screens in a distant control room."},
{t:"table",cols:["Region","Main examples"],rows:[
["Europe","Sweden began the world’s first remote tower operation in 2015; London City Airport has been controlled entirely from a remote centre since 2021"],
["USA","The FAA is testing and evaluating remote towers"],
["Japan","Aerodrome flight information at regional airports is provided remotely from a central location (remote aerodrome advisory service)"],
["Korea","Research and study under way"]]},
{t:"note",x:"These are typical examples. Check each aviation authority for the latest."}]},
{h:"Drones and air taxis",blocks:[{t:"fig",id:"atcb_uam",cap:"Animated figure: airliners above (conventional ATC), air taxi corridors below, and drones managed digitally in low airspace (UTM)."},
{t:"rows",items:[
{name:"UTM (drone traffic management)",x:"Drone flight plans and positions are shared digitally and deconflicted; not each aircraft handled by a human controller"},
{name:"AAM (air taxis)",x:"Electric vertical take-off and landing aircraft and others, for trips in and around cities, using set corridors and vertiports"},
{name:"Relationship with ATC",x:"Rules with ATC are needed near airports and where they meet airliner airspace"}]}]},
{h:"Comparing four regions",blocks:[{t:"table",cols:["Item","Korea","Japan","USA","Europe"],rows:[
["Drones","National drone traffic management trials","“Level 4” flights beyond visual line of sight over people allowed since December 2022","Remote ID required; rules for beyond-visual-line-of-sight flights being developed","EU U-space rules applicable since January 2023"],
["Air taxis","K-UAM trials and rules for commercial service","Demonstration flights at Expo 2025 Osaka, Kansai","Rules for powered-lift pilots and operations (2024)","EASA developing aircraft and operations rules"]]},
{t:"note",x:"These are typical examples. Rules change almost every year, so check each aviation authority’s latest announcements."}]},
{h:"Links to your work",blocks:[{t:"check",items:[
{name:"Drones near airports",x:"A drone sighting near an airport can close a runway temporarily and cause delays"},
{name:"New jobs",x:"Drone operations management, UTM operations and remote tower engineering are new kinds of work"},
{name:"Regional airports",x:"Remote towers and remote information services can help keep low-traffic airports running"}]}]},
{h:"References",blocks:[{t:"note",x:"This lesson is this site’s own summary of public sources and others. Check the originals for accurate details."},
{t:"link",href:"https://www.easa.europa.eu/en/domains/drones-air-mobility",x:"EASA: Drones & Air Mobility"}]}],
voice:"A drone spotted near an airport can stop the runway for a while. In future, the answer to “why are we delayed?” may involve drones or air taxis more often.",
terms:[["Remote / Digital Tower","リモートタワー","원격 관제탑"],["UTM","無人航空機交通管理","무인기 교통관리"],["Advanced Air Mobility (AAM)","先進航空モビリティ","미래항공모빌리티"],["Urban Air Mobility (UAM)","都市航空交通","도심항공교통"],["Vertiport","離着陸場","버티포트"],["BVLOS","目視外飛行","비가시권 비행"]],
quiz:[{q:"Which country first operated a remote tower?",opts:["USA","Japan","Sweden","Korea"],a:2,exp:"Operations began in Sweden in 2015."},
{q:"What does UTM manage?",opts:["Airliner airways","Mainly drones in low airspace","Airport car parks","Weather"],a:1,exp:"It shares and deconflicts drone flights digitally."},
{q:"When did Japan’s “Level 4” drone rules start?",opts:["2015","2019","2022","2025"],a:2,exp:"In December 2022."}],
next:"5-3 Future plans by region: CARATS2040, Korea, the US and Europe"});
set("5-3",{title:"Future Plans by Region: CARATS2040, Korea, the US and Europe",hl:"Future plans",subtitle:"Japan’s CARATS2040, Korea’s 4th Aviation Policy Master Plan, the US Brand New Air Traffic Control System (BNATCS), and Europe’s SESAR and ATM Master Plan: goals, timelines and content, and the people challenge",
lead:["Growing traffic, environmental pressure, ageing equipment, new airspace users: every country faces similar challenges and makes plans looking 10 to 20 years ahead.","This lesson sets the plans of Japan, Korea, the US and Europe side by side to compare what each aims for and by when. Figures and dates are often revised, so check the dates of the originals too."],
sections:[
{h:"Plans in four regions",blocks:[{t:"fig",id:"atcb_road",cap:"Animated figure: ICAO’s Global Air Navigation Plan and the direction of plans in Japan, Korea, the US and Europe."}]},
{h:"A closer comparison",blocks:[{t:"table",cols:["Item","Japan","Korea","USA","Europe"],rows:[
["Plan","CARATS2040 (long-term vision for future air traffic systems)","4th Aviation Policy Master Plan","Brand New Air Traffic Control System (BNATCS), NextGen","SESAR, European ATM Master Plan"],
["Timing","Roadmap set in June 2025, looking to 2040","2025–2029 (announced December 2025)","Announced May 2025; target completion end of 2028","A “Digital European Sky” towards the 2040s"],
["Main content","TBO; automation and digitalisation (surface guidance, incursion detection, speech recognition); CDO; new airspace users; multiple layers of surveillance, satellite navigation and communication","Integrated air traffic data management, airspace restructuring for UAM, preventive safety using AI and more","Replacing radios, radars, telecom lines and facilities; electronic strips; a common automation system","Trajectory-based operations, cross-border airspace, separating data and services, automation"],
["Funding and progress","—","—","An initial $12.5 billion (July 2025 law). By April 2026, about half of copper lines moved to fibre and other links, and 17 towers on electronic strips","Joint research and deployment by the EU, EUROCONTROL and states"]]},
{t:"note",x:"This is a summary based on public sources; “—” means no figure is given here. Plans are revised, so always check the latest originals."}]},
{h:"A common challenge: people",blocks:[{t:"rows",items:[
{name:"Recruiting controllers",x:"With traffic growing and experienced staff retiring, recruiting and training controllers is a major challenge everywhere"},
{name:"Training",x:"It takes years to become fully qualified, and every new system needs training"},
{name:"Working patterns",x:"Rosters that reduce the burden of night and shift work and help maintain concentration are needed"}]},
{t:"note",x:"Routes into ATC and other aviation jobs, country by country, are covered in the Aviation Careers Guide."},
{t:"link",href:"../27_항공직업가이드/00_シリーズ全体_航空の仕事ガイド.html",x:"Aviation Careers Guide"}]},
{h:"Links to your work",blocks:[{t:"check",items:[
{name:"Following developments",x:"Revisions to plans and roadmaps affect airport and airline investment and how flights operate"},
{name:"Differences between countries",x:"Flights between Korea and Japan are affected by both countries’ plans (data link, airspace design)"},
{name:"Your own job",x:"Thinking about what automation will change and what will remain for people helps you prepare your career"}]}]},
{h:"References",blocks:[{t:"note",x:"This lesson is this site’s own summary of public sources and others. Check the originals for accurate details."},
{t:"link",href:"https://www.mlit.go.jp/koku/carats/forum-open/forum2025/2_JCAB木原_航空保安業務の概要と将来の航空交通システムに関する長期ビジョン（CARATS2040）.pdf",x:"JCAB: Overview of air navigation services and CARATS2040 (2025, Japanese)"},
{t:"link",href:"https://news.tf.co.kr/read/economy/2270973.htm",x:"Report on Korea’s 4th Aviation Policy Master Plan (December 2025, Korean)"},
{t:"link",href:"https://www.hklaw.com/en/insights/publications/2026/04/the-bnatcs-state-of-play",x:"The state of play of the US BNATCS (April 2026)"}]}],
voice:"Plan documents look daunting, but every country is dealing with the same four things: safety, congestion, the environment and people. Reading your own country’s plan once changes how you see the news.",
terms:[["Long-term Vision","長期ビジョン","장기 비전"],["Roadmap","工程表","로드맵"],["Aviation Policy Master Plan","航空政策基本計画","항공정책 기본계획"],["NextGen","次世代航空交通システム","차세대 항공교통시스템"],["SESAR","単一欧州空域ATM研究","유럽 단일하늘 ATM 연구"],["Staffing","人員の確保","인력 확보"]],
quiz:[{q:"What is Japan’s long-term vision for future air traffic systems called?",opts:["NextGen","SESAR","CARATS2040","K-UAM"],a:2,exp:"CARATS2040; its roadmap was set in June 2025."},
{q:"What was the initial funding for the new US ATC system?",opts:["$1.25 billion","$12.5 billion","$125 billion","None"],a:1,exp:"$12.5 billion, in a July 2025 law."},
{q:"What challenge is common to every country?",opts:["Too many runways","Recruiting and training controllers","Too few aircraft","Airports that are too new"],a:1,exp:"With traffic growth and retirements, staffing and training are common challenges."}],
next:"Part 6 Try It Yourself — 6-1 Try it in AIRLINE SAGA: ATC"});
set("6-1",{title:"Try It in AIRLINE SAGA: ATC — Test What You Learned in the Tower and the Cockpit",hl:"AIRLINE SAGA ATC",subtitle:"This site’s game “AIRLINE SAGA: ATC” offers five controller positions and a pilot’s-eye experience. Which lessons help where in the game",
lead:["So far we have looked at what ATC does, airspace and separation, communication, systems and navigation, traffic flow and the latest developments. Finally, let’s put it into practice.","“AIRLINE SAGA: ATC” on this site is a game in which you experience both the controller’s and the pilot’s side, handling flights including those of the fictional airline VELA AIR. This lesson links the course to scenes in the game."],
sections:[
{h:"What you can do in the game",blocks:[{t:"cards",n:3,items:[
{ic:"🗼",name:"Five controller positions",tag:"Controller",x:"Issue clearances and instructions at Delivery, Ground, Tower, Approach and Area control"},
{ic:"✈",name:"Pilot experience",tag:"Pilot",x:"From the cockpit of a VELA AIR 787, listen to ATC, read back and work through arrival and departure procedures"},
{ic:"🗺",name:"Three airports",tag:"Airports",x:"Two fictional practice airports and Haneda, based on real data"}]}]},
{h:"Course and game",blocks:[{t:"table",cols:["Course lesson","Where to try it in the game"],rows:[
["0-1 What ATC does, 0-2 One flight","Work through the five positions in turn to see how one flight is handed from position to position"],
["1-2 IFR, VFR and separation","At Approach and Area control, keep aircraft apart with level, heading and speed instructions"],
["1-3 Wake turbulence and RECAT","At Tower, think about spacing behind heavy aircraft"],
["2-1 Phraseology and readback","In the pilot experience, choose the correct readback; you can also speak English into the microphone"],
["3-2 From ILS to PBN","At Approach and in the pilot experience, experience ILS approach clearances and final approach"],
["4-2 Arrival sequencing","At Approach, merge arrivals into one line"]]},
{t:"note",x:"The game is for learning and simplifies some real procedures and figures. For real work, always check each country’s rules and documents."}]},
{h:"Getting started",blocks:[{t:"rows",items:[
{name:"1. The game entrance",x:"Open AIRLINE SAGA from “Game” on the site and choose ATC"},
{name:"2. Start at a practice airport",x:"Starting at Ground or Tower at a fictional practice airport makes the flow easy to follow"},
{name:"3. Listen to the radio",x:"Use the voice and transcript help to check the meaning of English radio calls as you go"}]},
{t:"link",href:"../1_지상직여객운송입문/AIRLINE_SAGA_ATC.html",x:"Open AIRLINE SAGA: ATC"}]},
{h:"Course summary",blocks:[{t:"check",items:[
{name:"The purpose of ATC",x:"Keep aircraft apart and keep them moving, by issuing clearances, instructions and information"},
{name:"Sky and rules",x:"FIRs, airspace classes, IFR and VFR, three kinds of separation, wake turbulence"},
{name:"Words",x:"Standard phraseology and readback, emergency words and codes"},
{name:"Systems",x:"Radar and ADS-B, PBN, GBAS and SBAS, data link"},
{name:"Flow and the future",x:"ATFM, AMAN, CDO, TBO and SWIM, remote towers, drones and air taxis, national plans"}]}]}],
voice:"Just listening, ATC radio feels fast and hard. But once you sit in a controller’s seat yourself, you understand much better why things are said in that order. Give it a try.",
terms:[["Controller Position","管制席","관제석"],["Pilot Experience","パイロット体験","조종사 체험"],["Practice Airport","練習用の空港","연습용 공항"],["Radio Transcript Help","交信の解釈","교신 해석"],["Simulation","シミュレーション","시뮬레이션"],["Review","復習","복습"]],
quiz:[{q:"What can you practise from the pilot’s side in the game?",opts:["Refuelling","Listening to instructions and reading back correctly","In-flight sales","Maintenance records"],a:1,exp:"In the pilot experience you listen to ATC and choose the readback."},
{q:"Which is not one of the five controller positions?",opts:["Delivery","Tower","Approach","Flight dispatch"],a:3,exp:"Dispatch is an airline function, not a controller position."},
{q:"What matters when applying the game to real work?",opts:["Use it as is","It simplifies some things, so check each country’s rules","Don’t use English","Speed it up"],a:1,exp:"Some things are simplified for learning, so always check the rules for real work."}]});
})(window.ARTS);
