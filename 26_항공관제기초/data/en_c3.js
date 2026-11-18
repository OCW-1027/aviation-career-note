/* 航空管制の基礎 3-1〜3-4 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("3-1",{title:"Radar and ADS-B: How ATC Knows Where Aircraft Are",hl:"Radar",subtitle:"Primary radar that sees reflections, secondary radar that asks and gets answers, ADS-B where aircraft broadcast their own position, and space-based ADS-B over the oceans, plus surface surveillance and alerts",
lead:["The aircraft positions on a controller’s screen are gathered in several ways. Alongside traditional radar, ADS-B, where aircraft broadcast the position they know from GPS, has spread worldwide, and satellites now receive it so that even aircraft over the ocean can be seen.","This lesson covers the four surveillance methods, surface surveillance and on-screen alerts, and compares how Korea, Japan, the US and Europe have introduced them."],
sections:[
{h:"Four surveillance methods",blocks:[{t:"fig",id:"atcb_surv",cap:"Animated figure: primary radar (reflection), secondary radar (interrogation and reply), ADS-B (self-broadcast) and space-based ADS-B (oceans and polar regions)."},
{t:"table",cols:["Method","What it gives","Strengths","Weaknesses"],rows:[
["Primary radar (PSR)","Position","Sees aircraft with no equipment","No altitude or identity; large installation"],
["Secondary radar (SSR, Mode S)","Position, altitude, code, identity","The ATC workhorse; Mode S can interrogate aircraft individually","Needs a transponder"],
["ADS-B","GPS position, altitude, speed, identity","Fast updates, small ground stations; other aircraft can receive it","Unusable if GPS is disrupted"],
["Multilateration (WAM)","Position","Computes position from time differences at several receivers; used in mountains and at airports","Needs many receivers"]]}]},
{h:"Radar basics",blocks:[{t:"fig",id:"aid_radar",cap:"Animated figure: terminal surveillance radar around airports and long-range en-route radar, with different ranges and update rates."}]},
{h:"Surface surveillance and on-screen alerts",blocks:[{t:"rows",items:[
{name:"Airport surface",x:"Surface movement radar (ASDE) and multilateration track aircraft and vehicles on taxiways and runways, for guidance and incursion alerts (A-SMGCS)"},
{name:"Conflict alert",x:"The screen warns when two aircraft are predicted to get too close (short-term conflict alert, STCA)"},
{name:"Low-altitude alert",x:"Warns when an aircraft is too close to terrain or obstacles (minimum safe altitude warning, MSAW)"},
{name:"On board",x:"The last line of defence is the aircraft’s collision avoidance system (TCAS, lesson 1-2)"}]}]},
{h:"Comparing four regions",blocks:[{t:"table",cols:["Item","Korea","Japan","USA","Europe"],rows:[
["ADS-B","Ground stations used alongside radar","Ground stations, plus multilateration at Haneda, Narita and elsewhere","ADS-B Out required in most controlled airspace since January 2020","Mode S and ADS-B Out required for aircraft above a certain size"],
["Oceanic surveillance","—","Pacific oceanic airspace relies mainly on ADS-C and data link","ADS-C and data link, with space-based ADS-B also used","Space-based ADS-B over the North Atlantic since 2019, allowing reduced spacing"],
["Airport surface","A-SMGCS at Incheon and elsewhere","Surface surveillance and incursion alerts being expanded at major airports","ASDE-X and Surface Awareness displays being expanded","A-SMGCS at major airports"]]},
{t:"note",x:"These are typical examples; “—” means no general example is given here. Check each country’s AIP and aviation authority for scope and dates."}]},
{h:"Links to your work",blocks:[{t:"check",items:[
{name:"Transponders",x:"Moving an aircraft on the ground with its transponder on during maintenance can show up on ATC screens; follow the rules"},
{name:"Vehicle positions",x:"At some airports, vehicles carry position transmitters so ATC can see ground movements"},
{name:"Flight-tracking websites",x:"Most public flight trackers display received ADS-B signals; it is not the same as ATC’s data"}]}]},
{h:"References",blocks:[{t:"note",x:"This lesson is this site’s own summary of public sources and others. Check the originals for accurate details."},
{t:"link",href:"https://www.faa.gov/air_traffic/technology/adsb",x:"FAA: ADS-B"}]}],
voice:"Passengers sometimes say “the tracking app says it has already landed”. Apps are handy but can lag or lose aircraft on the ground. Use your airline’s own operational information when advising passengers.",
terms:[["Primary Surveillance Radar (PSR)","一次レーダー","1차 레이더"],["Secondary Surveillance Radar (SSR)","二次レーダー","2차 레이더"],["ADS-B","放送型自動従属監視","방송형 자동종속감시"],["Multilateration (MLAT/WAM)","マルチラテレーション","다변측정 감시"],["ASDE","空港面探知レーダー","공항면 탐지 레이더"],["STCA","短期衝突警報","단기 충돌 경보"]],
quiz:[{q:"Which method has the aircraft broadcast its own GPS position?",opts:["Primary radar","Secondary radar","ADS-B","Weather radar"],a:2,exp:"With ADS-B the aircraft broadcasts its own position."},
{q:"Which can see aircraft with no equipment on board?",opts:["Primary radar","Secondary radar","ADS-B","CPDLC"],a:0,exp:"Primary radar works on reflections, so it needs nothing from the aircraft."},
{q:"When did ADS-B Out become required in most US controlled airspace?",opts:["2010","2015","2020","2025"],a:2,exp:"From 1 January 2020."}],
next:"3-2 From ILS to PBN: from ground beams to navigation by satellite and aircraft performance"});
set("3-2",{title:"From ILS to PBN: From Ground Beams to Navigation by Satellite and Aircraft Performance",hl:"PBN",subtitle:"From following ground radio aids to flying routes defined by GNSS and aircraft navigation performance: performance-based navigation (PBN). RNAV and RNP, curved RNP AR approaches, and ILS categories",
lead:["Airways used to be lines joining ground radio aids such as VORs and NDBs. Today, performance-based navigation (PBN), which draws more flexible routes based on satellites (GNSS) and the performance of aircraft navigation systems, has become the norm.","This lesson covers ground-based navigation and the ILS, RNAV and RNP, RNP AR approaches that curve around terrain and noise-sensitive areas, and how each region is moving to PBN."],
sections:[
{h:"Ground-based navigation and the ILS",blocks:[{t:"fig",id:"aid_ils",cap:"Animated figure: the instrument landing system. The localizer gives left-right guidance and the glide path up-down guidance by radio beams."},
{t:"fig",id:"aid_cat",cap:"Animated figure: ILS categories. As decision height and runway visual range (RVR) minima tighten from CAT I to II and III, aircraft can land in thicker fog."}]},
{h:"RNAV and RNP",blocks:[{t:"fig",id:"nav_rnav",cap:"Animated figure: RNAV. Aircraft can fly direct between waypoints instead of passing over ground aids."},
{t:"fig",id:"nav_rnp",cap:"Animated figure: RNP. The aircraft monitors its ability to stay within a set width (e.g. 1 NM) and alerts the crew if it may not."},
{t:"table",cols:["Navigation specification","Typical use"],rows:[
["RNAV 10, RNP 4","Oceanic routes (allowing reduced spacing)"],
["RNAV 5, RNAV 1","Continental routes, departures and arrivals (SIDs, STARs)"],
["RNP 1, RNP 2","Departures, arrivals and routes, with on-board monitoring"],
["RNP APCH","GNSS approaches (LNAV, LNAV/VNAV, LPV)"],
["RNP AR APCH","Approaches needing special authorisation; narrow, and may include curved (RF) segments"]]}]},
{h:"Curved RNP AR approaches",blocks:[{t:"fig",id:"atcb_pbn",cap:"Animated figure: an ILS needs a long straight; an RNP AR approach can curve around terrain and built-up areas to the runway."}]},
{h:"Comparing four regions",blocks:[{t:"table",cols:["Item","Korea","Japan","USA","Europe"],rows:[
["Policy","A PBN implementation plan moving routes, departures, arrivals and approaches to PBN","Expanding PBN under CARATS, including RNP AR approaches","GPS approaches (RNAV (GPS)) widely used; VORs reduced to a minimum operational network (VOR MON)","EU rules require PBN approaches and a move to PBN departures and arrivals"],
["Global target","ICAO Assembly (2010): PBN approaches at every instrument runway end","Same","Same","Same"]]},
{t:"note",x:"Which procedures exist at each airport and runway is shown on the approach charts in each country’s AIP (AD 2). The table shows broad policy."}]},
{h:"Links to your work",blocks:[{t:"check",items:[
{name:"Approvals",x:"RNP AR and similar need approval per aircraft and airline; aircraft without it use other procedures"},
{name:"Weather and cancellations",x:"PBN approaches can lower weather minima at runways without an ILS, reducing cancellations and diversions"},
{name:"Noise",x:"Because PBN routes can be drawn precisely, they are used to design arrivals that avoid built-up areas"}]}]},
{h:"References",blocks:[{t:"note",x:"This lesson is this site’s own summary of public sources and others. Check the originals for accurate details."},
{t:"link",href:"https://www.icao.int/airnavigation/pbn",x:"ICAO: Performance-based Navigation"}]}],
voice:"When you see “RNP AR” on an operational document, remember that the aircraft and crew need special approval. Swapping to a different aircraft can mean the procedure is no longer available.",
terms:[["Performance-based Navigation (PBN)","性能準拠型航法","성능기반항행"],["RNAV","広域航法","지역항법"],["RNP","航法性能要件","항법성능요구"],["RNP AR","特別承認が要るRNP","특별인가 RNP"],["ILS","計器着陸装置","계기착륙시설"],["Runway Visual Range (RVR)","滑走路視距離","활주로 가시거리"]],
quiz:[{q:"How does RNP differ from RNAV?",opts:["It uses only ground beams","The aircraft monitors navigation performance and alerts if it may go outside limits","It cannot be used over the ocean","It cannot be used for landing"],a:1,exp:"RNP includes on-board performance monitoring and alerting."},
{q:"What does “AR” in RNP AR stand for?",opts:["Auto Return","Authorization Required","Arrival Route","Area Range"],a:1,exp:"Authorization Required: special approval is needed."},
{q:"Which ILS category allows landing in the lowest visibility?",opts:["CAT I","CAT II","CAT III","All the same"],a:2,exp:"CAT III can be used in the most demanding weather."}],
next:"3-3 Precision landings by satellite: GBAS and SBAS"});
set("3-3",{title:"Precision Landings by Satellite: GBAS and SBAS",hl:"GBAS and SBAS",subtitle:"GBAS corrects GPS errors at an airport ground station; SBAS broadcasts corrections nationwide from geostationary satellites. Comparing Haneda’s GBAS, Korea’s KASS, Japan’s MSAS, the US WAAS and Europe’s EGNOS, and preparing for interference",
lead:["On their own, signals from satellites such as GPS have errors too large for precise approaches such as landings. Augmentation systems correct the errors and check integrity.","This lesson explains how airport-based GBAS and satellite-based SBAS work, compares Korea, Japan, the US and Europe, and looks at preparing for the jamming and spoofing that have recently become a concern."],
sections:[
{h:"How satellite navigation works",blocks:[{t:"fig",id:"nav_gnss",cap:"Animated figure: GNSS (GPS and others) fixes position from distances to four or more satellites. Without augmentation, accuracy and integrity are not enough for approaches."}]},
{h:"GBAS and SBAS",blocks:[{t:"fig",id:"atcb_gbas",cap:"Animated figure: one GBAS ground station serves several runways and approaches; SBAS broadcasts corrections over a whole country from geostationary satellites."},
{t:"table",cols:["Item","ILS","GBAS (GLS)","SBAS (LPV etc.)"],rows:[
["How it works","Ground radio beams for each runway","An airport ground station corrects and transmits GPS errors","Geostationary satellites broadcast corrections over a wide area"],
["Equipment","One set per runway end","One set at the airport for several approaches","National reference stations and geostationary satellites"],
["Typical precision","CAT I to III","CAT I (research on extending to CAT II/III)","Vertical guidance close to CAT I (LPV)"],
["Best suited to","Main runways at large airports","Large airports with many runways","The whole country, including regional airports without ILS"]]}]},
{h:"Comparing four regions",blocks:[{t:"table",cols:["Item","Korea","Japan","USA","Europe"],rows:[
["SBAS","KASS: operational from 28 December 2023 (the world’s fifth); first used at Muan and Ulsan airports","MSAS: provided via the Michibiki (QZSS) satellites since 2020","WAAS: available for aviation since 2003","EGNOS: safety-of-life service for aviation since 2011"],
["GBAS","Research and testing","Full operation at Haneda in 2025 (Asia’s first)","In use at Newark, Houston and others","In use at Frankfurt, Bremen, Zurich and others"]]},
{t:"note",x:"Airports and dates are typical examples. Check announcements by each aviation authority and the AIP for the current situation."}]},
{h:"Preparing for interference",blocks:[{t:"rows",items:[
{name:"What is happening",x:"In some regions, GPS jamming and spoofing (false signals that shift the position) have been reported"},
{name:"Preparation",x:"Keep a minimum network of ground aids such as VOR and DME, keep ILS, and use multiple satellite systems (GPS, Galileo and others) and frequencies"},
{name:"Crews and ATC",x:"Report interference when noticed; ATC switches to radar vectors or other procedures"}]},
{t:"point",warn:true,x:"Satellite navigation is convenient, but redundancy (backup) that does not depend on it alone is essential. Japan’s CARATS2040 also makes multiple layers of surveillance, satellite navigation and communication one of its pillars."}]},
{h:"Links to your work",blocks:[{t:"check",items:[
{name:"Regional airports",x:"SBAS approaches lower weather minima at airports without ILS"},
{name:"Aircraft",x:"GLS (GBAS) and LPV (SBAS) need on-board equipment and approval"},
{name:"NOTAMs",x:"GPS interference or satellite tests may be announced by NOTAM; check operational documents"}]}]},
{h:"References",blocks:[{t:"note",x:"This lesson is this site’s own summary of public sources and others. Check the originals for accurate details."},
{t:"link",href:"https://newsseoul.co.kr/news/view/1065595218953381",x:"Report on the start of Korea’s KASS service (Korean)"},
{t:"link",href:"https://news.livedoor.com/article/detail/28278472/",x:"NEC’s GBAS enters full operation at Haneda (Japanese)"}]}],
voice:"“Landing by satellite” sounds futuristic, but it is already part of everyday operations at regional airports. Knowing what each airport offers explains decisions made on bad-weather days.",
terms:[["GNSS","全地球航法衛星システム","위성항법시스템"],["GBAS","地上型衛星航法補強システム","지상기반 보강시스템"],["SBAS","静止衛星型衛星航法補強システム","위성기반 보강시스템"],["GLS","GBASによる着陸方式","GBAS 착륙 방식"],["LPV","垂直誘導つき進入","수직 유도 접근"],["Jamming / Spoofing","電波妨害","전파 방해"]],
quiz:[{q:"Which can serve approaches to several runways from one airport ground station?",opts:["ILS","GBAS","VOR","NDB"],a:1,exp:"One GBAS installation can serve several approaches."},
{q:"What is Korea’s SBAS called?",opts:["MSAS","WAAS","KASS","EGNOS"],a:2,exp:"Korea’s is KASS, Japan’s MSAS, the US WAAS and Europe’s EGNOS."},
{q:"What matters most in preparing for interference?",opts:["Rely only on satellites","Keep ground aids and other methods for redundancy","Remove all ILS","Stop using radio"],a:1,exp:"Keeping ground aids and multiple systems is essential."}],
next:"3-4 Data link and electronic strips: from voice to text, from paper to screen"});
set("3-4",{title:"Data Link and Electronic Strips: From Voice to Text, From Paper to Screen",hl:"Data link",subtitle:"Departure clearances by text (DCL), controller-pilot data link (CPDLC), automatic position reports (ADS-C), and the move from paper flight strips to electronic ones, compared across four regions",
lead:["Voice radio remains the basis of ATC, but text data link is spreading to reduce mishearing on busy frequencies and the difficulty of communicating over the ocean.","On controllers’ desks too, the paper flight progress strips that hold each flight’s details are being replaced by electronic strips on screen. This lesson covers the types of data link and what changes with digitalisation."],
sections:[
{h:"Voice and data link",blocks:[{t:"fig",id:"atcb_cpdlc",cap:"Animated figure: on voice, you wait when the frequency is busy and mishearing can occur. With CPDLC, set messages are sent on screen and answered with a button."}]},
{h:"Types of data link",blocks:[{t:"table",cols:["Name","What it does","Where"],rows:[
["DCL / PDC (departure clearance)","The departure clearance is received as text and acknowledged","Departures at busy airports"],
["CPDLC","Controllers and pilots exchange set messages (level changes, frequency changes and so on)","Oceanic and en-route airspace"],
["ADS-C","The aircraft automatically reports its position and intentions at set times or points","Oceanic airspace without radar"],
["D-ATIS","Airport information (ATIS) received as text","Many airports"]]}]},
{h:"From paper strips to electronic strips",blocks:[{t:"rows",items:[
{name:"Flight progress strips",x:"Long paper slips with each flight’s callsign, type, route and level. Controllers have long re-ordered them and written instructions on them to manage the flow"},
{name:"Electronic strips",x:"Do the same on screen, pass automatically to the next position and link with radar and data link"},
{name:"Growing support",x:"Connect with arrival sequencing (AMAN), taxi route suggestions and speech recognition input (Parts 4 and 5)"}]}]},
{h:"Comparing four regions",blocks:[{t:"table",cols:["Item","Korea","Japan","USA","Europe"],rows:[
["Text departure clearances","Data link departure clearances at major airports","Data link departure clearances at major airports","Data Comm: towers at more than 60 airports send departure clearances by text","Data link departure clearances at many airports"],
["En-route CPDLC","Oceanic and some en-route airspace","Used over the ocean, with plans to extend to domestic airways","CPDLC introduced at en-route centres in turn from 2019","Data link equipment and use required at high levels (above FL285)"]]},
{t:"note",x:"These are typical examples. Check each country’s AIP and aviation authority for exact scope and dates."}]},
{h:"Links to your work",blocks:[{t:"check",items:[
{name:"Departure preparation",x:"A quick data link clearance smooths preparation before door closure; if the equipment is unusable, the clearance comes by voice"},
{name:"Dispatch",x:"Over the ocean, re-routes may come by CPDLC; dispatchers re-check fuel and routing"},
{name:"MEL",x:"Data link equipment faults may have dispatch conditions in the MEL (course “Aircraft and Maintenance”)"}]}]},
{h:"References",blocks:[{t:"note",x:"This lesson is this site’s own summary of public sources and others. Check the originals for accurate details."},
{t:"link",href:"https://www.faa.gov/air_traffic/technology/data_comm",x:"FAA: Data Communications"}]}],
voice:"Data link is convenient, but in the end safety rests on people checking with each other. Even a clearance received on screen is read aloud and cross-checked by the crew, just like double checks in ground work.",
terms:[["CPDLC","管制官パイロット間データリンク通信","관제사-조종사 데이터링크 통신"],["DCL / PDC","データリンクによる出発承認","데이터링크 출발 허가"],["ADS-C","契約型自動従属監視","계약형 자동종속감시"],["D-ATIS","デジタルATIS","디지털 ATIS"],["Flight Progress Strip","運航票","비행진행기록지"],["Electronic Flight Strip","電子ストリップ","전자 스트립"]],
quiz:[{q:"Over the ocean, which system has the aircraft report its position automatically at set times?",opts:["ADS-B","ADS-C","D-ATIS","DCL"],a:1,exp:"ADS-C reports position and intentions automatically under a contract."},
{q:"Which CPDLC button means “will comply”?",opts:["ROGER","WILCO","STANDBY","UNABLE"],a:1,exp:"WILCO means understood and will comply."},
{q:"What is the advantage of electronic strips?",opts:["Only that no paper is needed","They pass automatically to the next position and link with other systems","Voice is no longer needed","Controllers are no longer needed"],a:1,exp:"Linking information to the next position and support tools is the main benefit."}],
next:"Part 4 Traffic Flow — 4-1 Air traffic flow management (ATFM) and departure times"});
})(window.ARTS);
