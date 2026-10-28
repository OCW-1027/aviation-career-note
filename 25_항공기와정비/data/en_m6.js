/* 航空機と整備 Part 6 — English version (6-1〜6-3) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("6-1",{title:"Engineer Licences: The Rules in Japan and Korea",hl:"Engineer Licences",subtitle:"Three layers (national licence, type rating, company authorisation), Japan’s licence categories, Korea’s aircraft maintenance engineer licence and its limitations, and other countries",
lead:["For an engineer to certify that an aircraft may fly, three layers must be in place: a national licence, a rating for the type, and the company’s authorisation of that person.","When the station receives a contractor’s list of engineers (4-1), these are the three things to look for. This lesson compares the licence systems in Japan and Korea."],
deepLabel:"In depth: maintenance organisation approvals",
deep:[{"h": "Personal licences and organisation approvals", "blocks": [{"t": "p", "x": "This lesson looked at the licences of individual engineers. In practice, which organisation you work for matters as well. Many countries approve the organisations that do maintenance, and within them the people the company has authorised sign the release."}, {"t": "table", "cols": ["", "Organisation approval", "Personal licence"], "rows": [["EU (EASA)", "Part-145; maintenance management under Part-CAMO", "Part-66"], ["US (FAA)", "Part 145 repair stations", "Part 65 (mechanics and others)"], ["Japan", "Approved maintenance organisation (Civil Aeronautics Act Art. 20); the certifying person is the certifying supervisor (確認主任者)", "Aircraft maintenance engineers and others"], ["Korea", "Maintenance organisation certification (Aviation Safety Act Art. 97)", "Aircraft maintenance engineer (Art. 35)"]]}]}, {"h": "The European model: separate the doing from the managing", "blocks": [{"t": "rows", "items": [{"name": "Part-145", "x": "The organisation that carries out the work and issues the certificate of release to service (CRS). It is approved once it has the facilities, tools, data, qualified staff and quality system"}, {"name": "Part-CAMO", "x": "The organisation responsible for what is done when: managing the maintenance programme, deciding how ADs apply, running reliability monitoring. It applied from 24 March 2020, with a transition period that ended on 24 March 2022"}, {"name": "Part-147", "x": "Training organisations that teach and examine technicians"}]}, {"t": "point", "x": "When a foreign airline chooses a contractor, it checks that the contractor holds the approval required by the authority of the State where the aircraft is registered (for example EASA Part-145 for a European-registered aircraft) (4-1)."}]}, {"h": "Having maintenance done in another country", "blocks": [{"t": "rows", "items": [{"name": "The State of Registry's rules travel with the aircraft", "x": "Which approvals the maintenance organisation and the certifying staff need is set by the rules of the State where the aircraft is registered. Work done in Japan on a Korean-registered aircraft is measured against Korean rules"}, {"name": "Local rules apply too", "x": "Work safety at the airport, vehicles and access, and dangerous goods handling follow the rules of the country where the work is done"}, {"name": "Mutual recognition", "x": "Where two countries have an agreement recognising each other's maintenance approvals, the process is simpler. Scope varies from agreement to agreement ★"}]}, {"t": "check", "items": [{"name": "The contractor's approval", "x": "Is the authority, approval number, scope and expiry date recorded in the station maintenance readiness sheet (4-2)?"}, {"name": "Certifying staff authority", "x": "Does the authorisation of the person signing the release cover our aircraft type?"}]}, {"t": "note", "x": "Sources (public): EU rules (Regulation (EU) No 1321/2014 Annexes II, III and IV; Regulations (EU) 2019/1383 and 2021/700), US 14 CFR Parts 65 and 145 and FAA AC 120-16G, Japan's Civil Aeronautics Act Art. 20 and its Enforcement Regulation Art. 32, Korea's Aviation Safety Act Arts. 35 and 97."}]}],
sections:[
{h:"The path to certifying",blocks:[{t:"fig",id:"mnt_lic",cap:"Animated figure: learning, gaining experience, the national licence, the type rating and company authorisation light up in turn. The right side shows who is mainly involved."}]},
{h:"Licences in Japan and Korea",blocks:[{t:"table",cols:["","Japan","Korea"],rows:[
["Law","Civil Aeronautics Act (aviation personnel licences)","Aviation Safety Act (aviation personnel licences)"],
["Licence names","First- and second-class aircraft maintenance engineer, first- and second-class line maintenance engineer, aircraft overhaul engineer","Aircraft maintenance engineer"],
["How they are divided","By the size of aircraft and the scope of work; line maintenance engineers mainly certify after minor maintenance ★","Limited by aircraft category (aeroplane, rotorcraft, etc.) and maintenance field ★"],
["Types","Large aircraft need a type rating for each type","Handled type by type through company training and authorisation ★"],
["Company authorisation","An approved organisation authorises who may certify","Under the maintenance organisation approval, the company decides who certifies ★"]]},
{t:"point",x:"A national licence alone does not allow someone to certify that company’s aircraft. Only after company-procedure and type training, and the company’s authorisation, can they sign."}]},
{h:"Licences elsewhere",blocks:[{t:"rows",items:[
{name:"International standard",x:"ICAO Annex 1 sets minimum requirements for engineer licences, and each state builds on it"},
{name:"Europe",x:"Licences are split by field, such as mechanical (B1) and avionics (B2) ★"},
{name:"United States",x:"The combined Airframe and Powerplant licence is well known ★"},
{name:"Foreign-registered aircraft",x:"Maintaining an aircraft registered in another state may also require that state’s approval (4-1) ★"}]}]}],
voice:"When you check a contractor’s list, make sure each name shows which types and until when the person may certify. Someone whose authorisation has lapsed turning up on a night shift is a real possibility.",
terms:[["Aircraft maintenance engineer","航空整備士","항공정비사"],["Line maintenance engineer (Japan)","航空運航整備士","항공운항정비사(일본)"],["Type rating","型式限定","기종 한정"],["Certificate of release to service","整備後の運航復帰証明（CRS）","정비 후 운항복귀 증명(CRS)"],["Aviation personnel","航空従事者","항공종사자"]],
quiz:[{q:"Which is not one of the three layers needed to certify?",opts:["National licence","Type rating","Company authorisation","Fare licence"],a:3,exp:"The three layers are the national licence, the type rating and company authorisation."},
{q:"Which Japanese licence mainly certifies after minor maintenance?",opts:["First-class aircraft maintenance engineer","Line maintenance engineer","Aircraft overhaul engineer","Dispatcher"],a:1,exp:"Line maintenance engineers mainly certify after minor maintenance."},
{q:"Can a national licence holder certify any company’s aircraft?",opts:["Yes","Company training and authorisation are needed","Yes, if the captain agrees","Yes, if the airport agrees"],a:1,exp:"They must complete company-procedure and type training and be authorised by the company."}],
next:"6-2 A Map of Maintenance Jobs"});
set("6-2",{title:"A Map of Maintenance Jobs: Eight Roles Hands-on and in the Office",hl:"Maintenance Jobs",subtitle:"Line, base, component shop, MCC, engineering, planning, quality and parts; types of employer; how careers progress",
lead:["“Maintenance” brings to mind someone with tools beside an aircraft. In reality, maintenance only works because people in offices watch the fleet, plan checks and line up parts.","This lesson maps maintenance work into eight roles and sets out the kinds of company you can work for."],
sections:[
{h:"The map of maintenance jobs",blocks:[{t:"fig",id:"mnt_jobs",cap:"Animated figure: hands-on roles on the left, office roles on the right; the eight roles light up in turn."}]},
{h:"Types of employer",blocks:[{t:"table",cols:["Employer","Main work"],rows:[
["Airline maintenance department","Line maintenance, planning, engineering and quality for its own fleet"],
["Maintenance provider (MRO)","Line and base maintenance for many airlines"],
["Engine and component companies","Overhaul and repair of engines and parts; parts leasing"],
["Manufacturer","Field representatives based with airlines to give technical support"],
["Authority","Audits and inspections of maintenance organisations and airlines (4-3)"]]}]},
{h:"How careers progress",blocks:[{t:"rows",items:[
{name:"Start hands-on",x:"Many start in line or base maintenance and gain licences and type ratings"},
{name:"Into the office",x:"With experience, many move into MCC, engineering, planning or quality"},
{name:"Working patterns",x:"Line maintenance and MCC run 24-hour shifts; work peaks at night"},
{name:"English",x:"English is the standard for manuals, ADs, SBs and contact with manufacturers"}]},
{t:"point",x:"Station experience of coordinating AOGs, managing contractors and handling authority inspections carries straight over to MCC and planning roles."}]}],
voice:"When reporting a defect to maintenance control (MCC), start with the aircraft registration, symptoms and scheduled departure time. Adding an update on preparations at the station helps everyone share the situation and discuss the next steps.",
terms:[["Base maintenance","重整備","중정비"],["Component shop","装備品工場","부품 정비 공장"],["Maintenance engineering","整備技術","정비 기술"],["Maintenance planning","整備計画","정비 계획"],["MRO provider","整備専門会社","정비 전문 회사(MRO)"]],
quiz:[{q:"Which role decides on ADs, SBs and reliability?",opts:["Line maintenance","Maintenance engineering","Parts and purchasing","The station"],a:1,exp:"The engineering department decides on ADs, SBs, reliability and modifications."},
{q:"Which roles usually work 24-hour shifts?",opts:["Line maintenance and MCC","Quality only","Component shop only","Manufacturers only"],a:0,exp:"Line maintenance and MCC run around the clock to match operations."},
{q:"What language is standard for manuals and dealing with manufacturers?",opts:["English","Japanese only","Korean only","No standard"],a:0,exp:"English is the standard for manuals, ADs, SBs and contact with manufacturers."}],
next:"6-3 How Station Staff Get Stronger in Maintenance"});
set("6-3",{title:"How Station Staff Get Stronger in Maintenance: From Vocabulary to Running an AOG",hl:"Getting Stronger in Maintenance",subtitle:"Learning in stages, reading manuals by ATA chapter, type familiarisation courses, and a summary of this course",
lead:["Station and ground staff do not need to become engineers. But people who know the vocabulary, can read the MEL and can be trusted to run the arrangements for an AOG are relied on at every airport.","This final lesson sets out stages for getting stronger in maintenance, tools you can use straight away, and a summary of the course."],
sections:[
{h:"Learning in stages",blocks:[{t:"fig",id:"mnt_path",cap:"Animated figure: learn the words, read the MEL and CDL, be there for AOGs, help coordinate station maintenance, choose the next step. Timings are a guide."}]},
{h:"Reading by ATA chapter",blocks:[{t:"fig",id:"mnt_ata",cap:"Animated figure: on a side view of the B737, the rough location of each ATA chapter lights up in turn, along with the list below. Locations are approximate."},
{t:"table",cols:["Chapter","System","Where the station meets it"],rows:[
["21","Air conditioning and pressurisation","Cabin too hot or cold; APU or ground air (1-2)"],
["24","Electrical power","Ground power failures, departure delays"],
["29","Hydraulics","Hydraulic leaks, MEL items (1-3)"],
["32","Landing gear and brakes","Tyre changes, waiting for brakes to cool (1-3)"],
["49","APU","Ground power and air when the APU is unavailable (3-1)"],
["52","Doors","Cabin and cargo door defects"]]},
{t:"point",x:"Maintenance manuals, the MEL and defect records are all organised by these chapter numbers. Learn them and you will know at once where an engineer’s explanation is heading."}]},
{h:"Same chapter, different preparation on the B737 and B787",blocks:[{t:"table",cols:["Chapter","B737","B787"],rows:[
["21 Air conditioning","Bleed air from the engines or APU; on the ground, APU air, an air unit or PCA","No bleed air; electric compressors. On the ground, APU electricity or ground power, or PCA ★"],
["24 Electrical power","One generator per engine","Two generators per engine; several ground power receptacles and much higher electrical demand ★"],
["29 Hydraulics","A, B and standby (about 3,000 psi)","Left, centre and right (about 5,000 psi)"],
["32 Landing gear","Hydraulic brakes, six tyres","Electric brakes (units easier to change), ten tyres"],
["49 APU","Supplies air and electricity","Supplies electricity only"],
["52 Doors","Door warnings and slide defects are often found just before departure","Same as the B737"]]},
{t:"point",warn:true,x:"Without its APU, a B787 relies on electricity for both air conditioning and engine starting. Check in advance with the airport and handler that there are enough ground power units of the right capacity, and PCA ★."}]},
{h:"Places to learn",blocks:[{t:"rows",items:[
{name:"Type familiarisation",x:"Courses by manufacturers or the company that explain the type to non-engineers"},
{name:"In-house courses",x:"MEL, dangerous goods, weight and balance and other station-related topics"},
{name:"Go and see",x:"With permission, watch night checks or AOG work"},
{name:"This course",x:"Reread Parts 0–6 after you have handled a real AOG"}]}]},
{h:"Course summary",blocks:[{t:"check",items:[
{name:"Airworthiness",x:"The airline is responsible for keeping aircraft airworthy, even when work is outsourced"},
{name:"MEL and CDL",x:"The station can read what may be inoperative and what restrictions then apply"},
{name:"AOG",x:"In the first hour, maintenance, dispatch and the station act at the same time"},
{name:"People and arrangements",x:"Keeping licences, authorisations, contractors and the readiness sheet in order shortens night-time delays"}]}]}],
voice:"When a station talks to maintenance, what helps most is being able to talk in maintenance terms. It does not have to be perfect: start with one ATA chapter number or one line of the MEL.",
terms:[["ATA chapter","ATAの章番号","ATA 장 번호"],["Type familiarisation course","機種概要教育","기종 개요 교육"],["Air conditioning and pressurisation","空調・与圧","공조·여압"],["Electrical power","電源","전원"],["Landing gear","降着装置（ランディングギア）","착륙장치"]],
quiz:[{q:"Which ATA chapter covers hydraulics?",opts:["21","29","32","49"],a:1,exp:"Chapter 29 is hydraulics; 21 is air conditioning, 32 landing gear and 49 the APU."},
{q:"When the APU is unavailable, what does the station often arrange?",opts:["Ground power and air","In-flight meals","New fares","Crew uniforms"],a:0,exp:"Ground power and air units or facilities replace the APU."},
{q:"Which is a correct summary of this course?",opts:["Outsourcing moves airworthiness responsibility too","The station does nothing during an AOG","Only engineers need to read the MEL","The airline is responsible for keeping aircraft airworthy"],a:3,exp:"Even when work is outsourced, airworthiness responsibility stays with the airline."}],
next:""});
})(window.ARTS);
