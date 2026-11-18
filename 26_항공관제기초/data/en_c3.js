/* 航空管制の基礎 3-1〜3-4 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("3-1",{title:"Radar and ADS-B: How ATC Knows Where Aircraft Are",hl:"Radar",subtitle:"Primary radar, which detects reflected signals; secondary radar, which interrogates aircraft and receives replies; ADS-B, in which aircraft broadcast their own position; and space-based ADS-B over the oceans, plus surface surveillance and controller alerts",
lead:["The aircraft positions shown on a controller’s screen come from several sources. Alongside traditional radar, ADS-B, in which aircraft broadcast their own GPS-derived position, is now used worldwide, and because satellites can now receive these signals, even aircraft over the oceans can be monitored.","This lesson covers the four surveillance methods, surface surveillance and on-screen alerts, and compares how they have been introduced in Korea, Japan, the US and Europe."],
sections:[
{h:"Four surveillance methods",blocks:[{t:"fig",id:"atcb_surv",cap:"Animated figure: primary radar (reflection), secondary radar (interrogation and reply), ADS-B (self-broadcast) and space-based ADS-B (oceans and polar regions)."},
{t:"table",cols:["Method","Information provided","Strengths","Weaknesses"],rows:[
["Primary radar (PSR)","Position","Detects aircraft without on-board equipment","No altitude or identity; large installation"],
["Secondary radar (SSR, Mode S)","Position, altitude, code, identity","The main ATC surveillance tool; Mode S allows selective interrogation of individual aircraft","Aircraft must carry a transponder"],
["ADS-B","GPS position, altitude, speed, identity","Fast updates, small ground stations; other aircraft can receive it","Unusable if GPS is disrupted"],
["Multilateration (WAM)","Position","Calculates position from differences in signal arrival time at several receivers; used in mountainous areas and at airports","Requires many receiver sites"]]}]},
{h:"Radar basics",blocks:[{t:"fig",id:"aid_radar",cap:"Animated figure: terminal surveillance radar around airports and long-range en-route radar, with different ranges and update rates."}]},
{h:"Surface surveillance and on-screen alerts",blocks:[{t:"rows",items:[
{name:"Surface surveillance",x:"Surface movement radar (ASDE) and multilateration track aircraft and vehicles on taxiways and runways; they are used for surface guidance and runway incursion alerts (A-SMGCS)"},
{name:"Conflict alert",x:"The display alerts the controller when two aircraft are predicted to come too close to each other (short-term conflict alert, STCA)"},
{name:"Low-altitude alert",x:"Alerts the controller when an aircraft is flying dangerously low relative to terrain or obstacles (minimum safe altitude warning, MSAW)"},
{name:"Airborne systems",x:"The last line of defence is the aircraft’s own airborne collision avoidance system (TCAS; see lesson 1-2)"}]}]},
{h:"Korea, Japan, the US and Europe compared",blocks:[{t:"table",cols:["Item","Korea","Japan","US","Europe"],rows:[
["ADS-B","Ground stations used alongside radar","Ground stations, plus multilateration at Haneda, Narita and elsewhere","ADS-B Out required in most controlled airspace since January 2020","Mode S and ADS-B Out required for aircraft above a certain size"],
["Oceanic surveillance","—","Pacific oceanic airspace relies mainly on ADS-C and data link communications","Oceanic airspace relies mainly on ADS-C and data link communications; space-based ADS-B also used","Space-based ADS-B over the North Atlantic since 2019, allowing reduced separation minima"],
["Airport surface","A-SMGCS at Incheon and elsewhere","Surface surveillance and runway incursion alerts being expanded at major airports","ASDE-X and Surface Awareness displays being expanded","A-SMGCS at major airports"]]},
{t:"note",x:"The table shows typical examples; “—” means that no specific example is given here. Check each State’s AIP and aviation authority announcements for the exact scope and dates of implementation."}]},
{h:"What this means for your work",blocks:[{t:"check",items:[
{name:"Transponders",x:"If an aircraft is moved on the ground during maintenance with its transponder on, it may appear on ATC displays; follow the relevant procedures"},
{name:"Vehicle positions",x:"At some airports, vehicles are fitted with position transmitters so that ATC can monitor ground movements"},
{name:"Flight-tracking websites",x:"Most public flight-tracking websites display data from received ADS-B signals; this is not the same information that ATC uses"}]}]},
{h:"References",blocks:[{t:"note",x:"This lesson is this site’s own summary based on publicly available sources and other material. Refer to the original sources for exact details."},
{t:"link",href:"https://www.faa.gov/air_traffic/technology/adsb",x:"FAA: ADS-B"}]}],
voice:"Passengers sometimes say “the tracking app says it has already landed”. These apps are useful, but positions may be shown with a delay, and aircraft can disappear from them on the ground. When giving information to passengers, use your airline’s own operational information.",
terms:[["Primary Surveillance Radar (PSR)","一次レーダー","1차 레이더"],["Secondary Surveillance Radar (SSR)","二次レーダー","2차 레이더"],["ADS-B","放送型自動従属監視","방송형 자동종속감시"],["Multilateration (MLAT/WAM)","マルチラテレーション","다변측정 감시"],["ASDE","空港面探知レーダー","공항면 탐지 레이더"],["STCA","短期衝突警報","단기 충돌 경보"]],
quiz:[{q:"In which method does the aircraft broadcast its own GPS-derived position?",opts:["Primary radar","Secondary radar","ADS-B","Weather radar"],a:2,exp:"With ADS-B the aircraft broadcasts its own position."},
{q:"Which method can detect aircraft that carry no on-board equipment?",opts:["Primary radar","Secondary radar","ADS-B","CPDLC"],a:0,exp:"Primary radar works on reflections, so it requires no equipment on the aircraft."},
{q:"When did ADS-B Out become mandatory in most US controlled airspace?",opts:["2010","2015","2020","2025"],a:2,exp:"From 1 January 2020."}],
next:"3-2 From ILS to PBN: from ground-based navigation aids to satellite- and performance-based navigation"});
set("3-2",{title:"From ILS to PBN: From Ground-Based Radio Aids to Performance-Based Navigation",hl:"PBN",subtitle:"Navigation is moving away from following signals from ground radio aids towards performance-based navigation (PBN), with routes defined by GNSS and aircraft navigation performance. We look at RNAV and RNP, curved RNP AR approaches and ILS categories.",
lead:["Airways used to be lines joining ground radio aids such as VORs and NDBs. Today, performance-based navigation (PBN), which allows more flexible routes based on satellite navigation (GNSS) and the performance of aircraft navigation systems, has become the norm.","This lesson first looks at ground-based navigation and the ILS, then RNAV and RNP, and RNP AR approaches that follow curved paths around terrain and noise-sensitive areas. Finally, it compares how different countries and regions are implementing PBN."],
sections:[
{h:"Ground-based navigation and the ILS",blocks:[{t:"fig",id:"aid_ils",cap:"Animated figure: the instrument landing system. The localiser provides lateral guidance and the glide path vertical guidance, using radio beams."},
{t:"fig",id:"aid_cat",cap:"Animated figure: ILS categories. As decision height and runway visual range (RVR) minima become lower from CAT I to CAT II and CAT III, aircraft can land in thicker fog."}]},
{h:"RNAV and RNP",blocks:[{t:"fig",id:"nav_rnav",cap:"Animated figure: RNAV. Aircraft can fly direct between waypoints without having to overfly ground aids."},
{t:"fig",id:"nav_rnp",cap:"Animated figure: RNP. The aircraft monitors whether it is staying within a defined width (e.g. 1 NM) and alerts the flight crew if it may not be."},
{t:"table",cols:["Navigation specification","Typical use"],rows:[
["RNAV 10, RNP 4","Oceanic routes (allowing reduced separation minima)"],
["RNAV 5, RNAV 1","Continental routes, departures and arrivals (SIDs, STARs)"],
["RNP 1, RNP 2","Departures, arrivals and routes, with on-board performance monitoring"],
["RNP APCH","GNSS approaches (LNAV, LNAV/VNAV, LPV)"],
["RNP AR APCH","Approaches requiring special authorisation; narrow lateral limits and possible curved (RF) segments"]]}]},
{h:"Curved RNP AR approaches",blocks:[{t:"fig",id:"atcb_pbn",cap:"Animated figure: an ILS needs a long straight-in final approach; an RNP AR approach can follow a curved path around terrain and built-up areas to the runway."}]},
{h:"Korea, Japan, the USA and Europe compared",blocks:[{t:"table",cols:["Item","Korea","Japan","USA","Europe"],rows:[
["Policy","Routes, departures, arrivals and approaches moving to PBN under a PBN implementation plan","Expanding PBN under CARATS, including RNP AR approaches","GPS approaches (RNAV (GPS)) widely used; VORs reduced to a minimum operational network (VOR MON)","EU rules require PBN approaches and a move to PBN departures and arrivals"],
["Global target","ICAO Assembly (2010): PBN approaches at every instrument runway end","Same","Same","Same"]]},
{t:"note",x:"Check the instrument approach charts in each country’s AIP (AD 2) for the procedures available at each airport and runway. The table shows only the broad policy direction."}]},
{h:"Practical points",blocks:[{t:"check",items:[
{name:"Aircraft approvals",x:"RNP AR and similar procedures require approval for each aircraft type and operator; aircraft without approval must use other approach procedures"},
{name:"Weather and cancellations",x:"PBN approaches can lower weather minima at runways without an ILS, which can reduce cancellations and diversions"},
{name:"Noise",x:"PBN allows routes to be designed precisely, so it is used for arrival procedures that avoid flying over built-up areas"}]}]},
{h:"References",blocks:[{t:"note",x:"This lesson is this site’s own summary based on publicly available sources. Check the original sources for exact details."},
{t:"link",href:"https://www.icao.int/airnavigation/pbn",x:"ICAO: Performance-based Navigation"}]}],
voice:"When you see an approach marked “RNP AR” in operational documents, remember that both the aircraft and the flight crew need special approval. An aircraft swap can mean the procedure is no longer available.",
terms:[["Performance-based Navigation (PBN)","性能準拠型航法","성능기반항행"],["Area Navigation (RNAV)","広域航法","지역항법"],["Required Navigation Performance (RNP)","航法性能要件","항법성능요구"],["RNP AR","特別承認が要るRNP","특별인가 RNP"],["Instrument Landing System (ILS)","計器着陸装置","계기착륙시설"],["Runway Visual Range (RVR)","滑走路視距離","활주로 가시거리"]],
quiz:[{q:"How does RNP differ from RNAV?",opts:["It relies only on ground-based radio aids","The aircraft monitors navigation performance and alerts the crew if it may exceed limits","It cannot be used over the ocean","It cannot be used for approaches"],a:1,exp:"RNP includes on-board performance monitoring and alerting."},
{q:"What does “AR” in RNP AR stand for?",opts:["Auto Return","Authorization Required","Arrival Route","Area Range"],a:1,exp:"Authorization Required: special approval is needed."},
{q:"Which ILS category allows landing in the lowest visibility?",opts:["CAT I","CAT II","CAT III","All the same"],a:2,exp:"CAT III can be used in the poorest visibility."}],
next:"3-3 Satellite-based precision approaches: GBAS and SBAS"});
set("3-3",{title:"Precision Landings by Satellite: GBAS and SBAS",hl:"GBAS and SBAS",subtitle:"GBAS corrects GPS errors at an airport ground station; SBAS broadcasts corrections nationwide from geostationary satellites. We compare Haneda’s GBAS with Korea’s KASS, Japan’s MSAS, the US WAAS and Europe’s EGNOS, and look at how to counter interference",
lead:["On their own, signals from satellite systems such as GPS contain errors too large for the precision approaches used for landing. Augmentation systems are therefore used to correct these errors and monitor integrity.","This lesson explains how airport-based GBAS and satellite-based SBAS work, compares their deployment in Korea, Japan, the US and Europe, and looks at how to counter the jamming and spoofing that have recently become a concern."],
sections:[
{h:"How satellite navigation works",blocks:[{t:"fig",id:"nav_gnss",cap:"Animated figure: GNSS (GPS and other systems) determines position from ranges to four or more satellites. Without augmentation, accuracy and integrity are insufficient for landing approaches."}]},
{h:"GBAS and SBAS",blocks:[{t:"fig",id:"atcb_gbas",cap:"Animated figure: a single GBAS ground station supports approaches to several runways; SBAS broadcasts corrections over a whole country from geostationary satellites."},
{t:"table",cols:["Item","ILS","GBAS (GLS)","SBAS (LPV etc.)"],rows:[
["How it works","Ground radio beams for each runway","An airport ground station transmits GPS error corrections","Geostationary satellites broadcast corrections over a wide area"],
["Equipment","One set per runway end","One set per airport serves several approaches","Nationwide ground reference stations and geostationary satellites"],
["Typical precision","CAT I to III","CAT I (CAT II/III under research)","Vertical guidance comparable to CAT I (LPV)"],
["Best suited to","Main runways at large airports","Large airports with many runways","The whole country, including regional airports without ILS"]]}]},
{h:"Deployment in four regions",blocks:[{t:"table",cols:["Item","Korea","Japan","USA","Europe"],rows:[
["SBAS","KASS: operational from 28 December 2023 (the world’s fifth SBAS); first applied at Muan and Ulsan airports","MSAS: provided via the Michibiki (QZSS) satellites since 2020","WAAS: available for aviation since 2003","EGNOS: safety-of-life service for aviation since 2011"],
["GBAS","Under research and testing","Entered full operation at Haneda in 2025 (a first in Asia)","In use at Newark, Houston and others","In use at Frankfurt, Bremen, Zurich and others"]]},
{t:"note",x:"The airports and dates shown are representative examples only. For the latest status, check announcements by national aviation authorities and the AIP."}]},
{h:"Countering interference",blocks:[{t:"rows",items:[
{name:"Current situation",x:"In some regions, GPS jamming (signal blocking) and spoofing (false signals that falsify the position) have been reported"},
{name:"Countermeasures",x:"Retain a minimum operational network of ground aids such as VOR and DME, retain ILS, and use multiple constellations (GPS, Galileo and others) and multiple frequencies"},
{name:"Flight crew and ATC",x:"Flight crew report interference immediately; controllers switch to radar vectors or alternative approaches"}]},
{t:"point",warn:true,x:"Satellite navigation is convenient, but it is essential not to rely on it alone and to build in redundancy (backup means). Japan’s CARATS2040 also lists redundancy in surveillance, satellite navigation and communication as one of its key pillars."}]},
{h:"Practical points",blocks:[{t:"check",items:[
{name:"Regional airports",x:"SBAS approaches lower landing minima at airports without ILS, so landings are possible in poor weather more often"},
{name:"Aircraft",x:"Flying GLS (GBAS) or LPV (SBAS) approaches requires suitable on-board equipment and operational approval"},
{name:"NOTAMs",x:"GPS interference and satellite testing may be promulgated by NOTAM; always check the briefing package"}]}]},
{h:"References",blocks:[{t:"note",x:"This lesson is the site’s own summary based on publicly available sources and other material. Check the original sources for precise details."},
{t:"link",href:"https://newsseoul.co.kr/news/view/1065595218953381",x:"MOLIT announces the start of Korea’s KASS service: news report (Korean)"},
{t:"link",href:"https://news.livedoor.com/article/detail/28278472/",x:"NEC’s GBAS enters full operation at Haneda (Japanese)"}]}],
voice:"“Landing by satellite” sounds futuristic, but it is already part of everyday operations at regional airports. Knowing which approaches are available at each airport helps you understand the decisions made on days of bad weather.",
terms:[["GNSS","全地球航法衛星システム","위성항법시스템"],["GBAS","地上型衛星航法補強システム","지상기반 보강시스템"],["SBAS","静止衛星型衛星航法補強システム","위성기반 보강시스템"],["GLS","GBAS着陸システム","GBAS 착륙 시스템"],["LPV","垂直誘導付き進入","수직 유도 접근"],["Jamming / Spoofing","電波妨害","전파 방해"]],
quiz:[{q:"Which system can support approaches to several runways from a single airport ground station?",opts:["ILS","GBAS","VOR","NDB"],a:1,exp:"A single GBAS ground station can support several approaches."},
{q:"What is Korea’s SBAS called?",opts:["MSAS","WAAS","KASS","EGNOS"],a:2,exp:"Korea’s is KASS, Japan’s MSAS, the US WAAS and Europe’s EGNOS."},
{q:"What is important in preparing for interference?",opts:["Rely only on satellites","Keep ground aids and other methods for redundancy","Remove all ILS","Stop using radio"],a:1,exp:"Retaining ground aids and multiple satellite systems as backups is essential."}],
next:"3-4 Data link and electronic strips: from voice to text, from paper to screen"});
set("3-4",{title:"Data Link and Electronic Strips: From Voice to Text, From Paper to Screen",hl:"Data link",subtitle:"Text-based departure clearances (DCL), controller–pilot data link communications (CPDLC), automatic position reporting (ADS-C) and the move from paper flight progress strips to electronic ones, with a comparison of four regions",
lead:["Voice radio remains the foundation of ATC, but text-based data link is spreading to reduce mishearing on congested frequencies and to overcome the limitations of oceanic communication.","At controller working positions, too, the paper flight progress strips that hold each flight’s details are being replaced by on-screen electronic flight strips. This lesson covers the types of data link and what digitalisation changes."],
sections:[
{h:"Voice and data link",blocks:[{t:"fig",id:"atcb_cpdlc",cap:"Animated figure: with voice, pilots must wait when the frequency is busy, and messages can be misheard. With CPDLC, standard messages are sent on screen and answered at the press of a button."}]},
{h:"Types of data link",blocks:[{t:"table",cols:["System","What it does","Main use"],rows:[
["DCL / PDC (departure clearance)","The departure clearance is received as text and acknowledged","Departures at busy airports"],
["CPDLC","Controllers and pilots exchange standard messages (level changes, frequency changes and so on)","Oceanic and en-route airspace"],
["ADS-C","The aircraft automatically reports its position and intent at predetermined times or points","Oceanic airspace beyond radar coverage"],
["D-ATIS","Airport information (ATIS) received as text","Many airports"]]}]},
{h:"From paper strips to electronic strips",blocks:[{t:"rows",items:[
{name:"Flight progress strips",x:"Long paper strips showing each flight’s callsign, aircraft type, route, level and so on. Controllers have traditionally arranged them in order and annotated them with instructions to manage the traffic flow"},
{name:"Electronic flight strips",x:"Perform the same role on screen, are handed over automatically to the next position and share data with radar and data link systems"},
{name:"Expanding support tools",x:"Link with arrival manager (AMAN) sequencing, taxi route suggestions and speech-recognition input support (Parts 4 and 5)"}]}]},
{h:"Comparing four regions",blocks:[{t:"table",cols:["Item","Korea","Japan","USA","Europe"],rows:[
["Text-based departure clearances","Data link departure clearances at major airports","Data link departure clearances at major airports","Data Comm: towers at more than 60 airports issue departure clearances by text","Data link departure clearances at many airports"],
["En-route CPDLC","Oceanic and some en-route airspace","Used in oceanic airspace, with plans to extend it to domestic routes","CPDLC introduced progressively at en-route centres from 2019","Data link carriage and use mandatory above FL285"]]},
{t:"note",x:"These are typical examples. Check each country’s AIP and aviation authority announcements for the exact scope and dates."}]},
{h:"Relevance to your work",blocks:[{t:"check",items:[
{name:"Departure preparation",x:"Receiving the clearance early by data link makes preparation before door closure smoother; if the aircraft equipment is unusable, the clearance is obtained by voice"},
{name:"Dispatch",x:"In oceanic airspace, re-route clearances may be received by CPDLC; dispatchers then review fuel and routing"},
{name:"MEL",x:"The MEL may set dispatch conditions for data link equipment defects (see the course “Aircraft and Maintenance”)"}]}]},
{h:"References",blocks:[{t:"note",x:"This lesson is this site’s own summary based on publicly available sources. Check the original sources for accurate details."},
{t:"link",href:"https://www.faa.gov/air_traffic/technology/data_comm",x:"FAA: Data Communications"}]}],
voice:"Data link is convenient, but ultimately safety depends on people checking with each other. Even a clearance received on screen is read aloud and cross-checked by the flight crew – the same habit as the double checks used in ground operations.",
terms:[["CPDLC","管制官パイロット間データリンク通信","관제사-조종사 데이터링크 통신"],["DCL / PDC","データリンクによる出発承認","데이터링크 출발 허가"],["ADS-C","契約型自動従属監視","계약형 자동종속감시"],["D-ATIS","デジタルATIS","디지털 ATIS"],["Flight Progress Strip","運航票","비행진행기록지"],["Electronic Flight Strip","電子ストリップ","전자 스트립"]],
quiz:[{q:"In oceanic airspace, which system automatically reports the aircraft’s position at set times?",opts:["ADS-B","ADS-C","D-ATIS","DCL"],a:1,exp:"ADS-C automatically reports the aircraft’s position and intent according to the terms of a contract."},
{q:"Which CPDLC button means “will comply”?",opts:["ROGER","WILCO","STANDBY","UNABLE"],a:1,exp:"WILCO means “understood, will comply”."},
{q:"What is a key advantage of electronic flight strips?",opts:["Only that no paper is needed","They are handed over automatically to the next position and linked with other systems","Voice is no longer needed","Controllers are no longer needed"],a:1,exp:"A major benefit is that information passes to the next position and is linked with support tools."}],
next:"Part 4 Traffic Flow — 4-1 Air traffic flow management (ATFM) and departure times"});
})(window.ARTS);
