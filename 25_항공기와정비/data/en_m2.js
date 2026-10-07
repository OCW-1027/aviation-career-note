/* 航空機と整備 Part 2 — English version (2-1〜2-3) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("2-1",{title:"Check Levels: from the Pre-flight Check to C Checks and Heavy Maintenance",hl:"Check Levels",subtitle:"Intervals set by flight hours, cycles and calendar time; what pre-flight, daily, A, C and heavy checks involve and how long they take; fitting them into the flying programme",
lead:["Aircraft checks range from a 30-minute look before every flight to month-long visits to the hangar every few years.","Which check is due when is set by flight hours, cycles or calendar days, whichever comes first. A checks and above take the aircraft out of service, so they are planned together with the flying programme."],
sections:[
{h:"Check levels",blocks:[{t:"fig",id:"mnt_chk",cap:"Animated figure: the interval of pre-flight, daily, A, C and heavy checks, and how long each takes (bar length), highlighted in turn."},
{t:"table",cols:["Check","Main content"],rows:[
["Pre-flight","External visual check, tyres and brakes, fluid levels, technical log review"],
["Daily","More detailed than the pre-flight check, including cabin emergency equipment and lighting"],
["A check","System checks, filters and lubrication, function tests; completed overnight"],
["C check","Panels opened to inspect structure, wiring and pipes; cabin parts are often changed or upgraded at the same time"],
["Heavy check","In-depth inspection of structural fatigue and corrosion; paint may be stripped"]]}]},
{h:"How intervals are counted",blocks:[{t:"rows",items:[
{name:"Flight hours (FH)",x:"Match wear on engines and systems; important for long-haul B787s"},
{name:"Flight cycles (FC)",x:"Match repeated take-offs, landings and pressurisation; important for B737s flying many short sectors"},
{name:"Calendar time",x:"Matches deterioration that happens even when idle (rubber, corrosion, batteries)"},
{name:"Whichever comes first",x:"Many checks are set as, for example, “600 hours or 100 days, whichever is sooner” ★"}]},
{t:"point",x:"A checks are often done overnight at the home base, so where each aircraft spends the night (night stops) is built into the flying programme."}]},
{h:"Where the station comes in",blocks:[{t:"check",items:[
{name:"Night stops",x:"For aircraft overnighting at an overseas airport, the contractor may do the daily check; confirm the location, time, lighting and power"},
{name:"Aircraft swaps",x:"When an aircraft goes in for a C check, others cover its flying, so aircraft type or seat numbers may change, affecting bookings and announcements"},
{name:"Check overruns",x:"If a check finds a major defect, the aircraft returns late and the plan breaks down; share this with head office early"}]}]}],
voice:"When you hear of an aircraft change, ask whether the reason is a check overrun. It makes the next few days much easier to plan.",
terms:[["Pre-flight check","飛行前点検","비행 전 점검"],["A check","Aチェック","A 체크"],["C check","Cチェック","C 체크"],["Flight hours","飛行時間","비행시간"],["Flight cycles","飛行回数","비행 횟수"],["Night stop","夜間駐機","야간 주기"]],
quiz:[{q:"What sets check intervals?",opts:["Flight hours only","Flight hours, cycles or calendar time, whichever comes first","Passenger numbers","The season only"],a:1,exp:"Many checks are due at flight hours, cycles or calendar days, whichever comes first."},
{q:"Which measure matters most for B737s flying many short sectors?",opts:["Flight cycles","Fuel quantity","Crew numbers","Seat count"],a:0,exp:"With many take-offs, landings and pressurisations, cycle-driven checks stand out."},
{q:"Which check, every few years, opens panels in the hangar to inspect structure and wiring?",opts:["Pre-flight","Daily","A check","C check"],a:3,exp:"C checks take place every 1.5–3 years and last 1–4 weeks in the hangar ★."}],
next:"2-2 Maintenance Programmes, ADs and SBs"});
set("2-2",{title:"Maintenance Programmes, ADs and SBs: Deciding What Is Checked and When",hl:"Maintenance Programmes",subtitle:"The manufacturer’s maintenance planning data (MPD), the airline’s programme, three ways of managing parts, life-limited parts, and the difference between ADs and SBs",
lead:["What is checked and when is based on the manufacturer’s maintenance planning data (MPD). The airline adapts it to how it flies into its own maintenance programme, which the authority approves.","Problems found in service then arrive as manufacturer service bulletins (SBs) or authority airworthiness directives (ADs) and are built into maintenance work."],
sections:[
{h:"How ADs and SBs become work",blocks:[{t:"fig",id:"mnt_ad",cap:"Animated figure: SBs (recommended) and ADs (mandatory) move through engineering review, task cards, check scheduling, the work itself, and tracking of records and deadlines."},
{t:"table",cols:["","SB (service bulletin)","AD (airworthiness directive)"],rows:[
["Issued by","Manufacturer","Authority (state of design, state of registry)"],
["Nature","Recommended","Mandatory (the aircraft cannot fly without it)"],
["Deadline","Decided by the airline","Fixed (flight hours, cycles or date)"],
["Examples","Improved parts, better working methods","Safety-related inspections, replacements and modifications"]]}]},
{h:"Where the programme comes from",blocks:[{t:"rows",items:[
{name:"MPD (maintenance planning data)",x:"The manufacturer’s document setting out task items and intervals from design analysis (the MSG-3 method)"},
{name:"Airline maintenance programme",x:"Built from the MPD to suit the airline’s operation (sector length, climate, fleet age) and approved by the authority"},
{name:"Three ways to manage parts",x:"Replace at a set time (hard time), inspect and decide (on condition), or watch with data (condition monitoring)"},
{name:"Life-limited parts (LLPs)",x:"Parts such as engine rotating parts and landing gear with a set cycle limit; always replaced before it"},
{name:"Software",x:"Much of the B787 runs on software, so managing versions is part of maintenance"}]},
{t:"point",warn:true,x:"An aircraft close to an AD deadline comes out of service if a place and time for the work cannot be found. If an aircraft change is due to an AD, plan on the basis that the deadline cannot move."}]}],
voice:"An AD is a promise that the aircraft will not fly without the work. When the station asks why an aircraft has changed, whether it is an AD makes a big difference to the outlook.",
terms:[["Service bulletin (SB)","技術通報","기술통보"],["Airworthiness directive (AD)","耐空性改善通報","감항성개선지시"],["Maintenance planning data (MPD)","整備計画の資料","정비 계획 자료"],["Aircraft maintenance programme","整備プログラム","정비 프로그램"],["Life-limited part (LLP)","寿命のある部品","수명 제한 부품"],["Hard time","ハードタイム","하드 타임"]],
quiz:[{q:"Which is correct about ADs and SBs?",opts:["ADs are recommended, SBs mandatory","ADs are mandatory from the authority; SBs are recommendations from the manufacturer","Both are recommendations","Both are issued by the airline"],a:1,exp:"ADs come from the authority and are mandatory; SBs come from the manufacturer and are recommended."},
{q:"Which manufacturer document is the basis of the airline’s maintenance programme?",opts:["MEL","MPD","Load sheet","NOTAM"],a:1,exp:"The airline builds its maintenance programme from the MPD."},
{q:"What are parts with a fixed cycle limit called?",opts:["Consumables","Life-limited parts (LLPs)","Cabin equipment","Spares"],a:1,exp:"Engine rotating parts and landing gear are life-limited parts, always replaced before the limit."}],
next:"2-3 Maintenance Records and Reliability"});
set("2-3",{title:"Maintenance Records and Reliability: Data That Changes Maintenance",hl:"Records and Reliability",subtitle:"Why records prove airworthiness, the reliability loop, technical delay rates, the B787’s in-flight data, and accurate delay coding",
lead:["Maintenance work only counts once it is recorded: who did what, when, and with which parts. An aircraft with missing records may not fly even if the work was done.","Records and data reveal repeat defects and change how maintenance is done. The delay codes stations assign are an important part of that material."],
sections:[
{h:"The reliability loop",blocks:[{t:"fig",id:"mnt_rel",cap:"Animated figure: defect reports, data collection, analysis and programme revision form a loop that reduces repeat defects."},
{t:"table",cols:["Measure","Meaning"],rows:[
["Technical delay and cancellation rate","For example, flights per 100 delayed 15 minutes or more or cancelled for technical reasons ★"],
["Pilot reports","Defects reported by crews, by system"],
["Repeat defects","The same defect on the same aircraft or system several times in a short period"],
["Unscheduled removals","Parts removed before their planned time"]]}]},
{h:"What the records contain",blocks:[{t:"rows",items:[
{name:"Work records",x:"Task cards, signatures of the person who did the work and the person who certified it, and dates"},
{name:"Component history",x:"Part and serial numbers, which aircraft they were fitted to, and remaining life"},
{name:"AD records",x:"Which ADs were done, when and how; always examined when aircraft are sold or returned from lease"},
{name:"B787 data",x:"In-flight defect data can be sent to the ground, so parts and engineers can sometimes be ready before arrival"}]},
{t:"point",x:"If the station’s delay codes (technical, weather, passenger and so on) are wrong, reliability analysis goes astray. If unsure whether a delay is technical, check with maintenance before coding it."}]},
{h:"Where the station comes in",blocks:[{t:"check",items:[
{name:"Delay codes",x:"Classify reasons correctly; separate waiting for maintenance from waiting for parts to arrive"},
{name:"Returning removed parts",x:"Failed parts are sent back for repair; check customs and paperwork (release certificates) with maintenance"},
{name:"Cabin defects",x:"Record defects in seats, lighting, toilets and so on, linking cabin crew and passenger services reports"}]}]}],
voice:"The monthly delay figures are not just maintenance’s report card. When the station records reasons accurately, they become clues for cutting next month’s delays.",
terms:[["Reliability programme","信頼性管理","신뢰성 관리"],["Technical delay rate","整備による遅れの率","정비 지연율"],["Repeat defect","くり返す不具合","반복 결함"],["Unscheduled removal","予定外の取り外し","비계획 탈착"],["Component history","部品の履歴","부품 이력"],["Task card","作業の指示書","작업지시서"]],
quiz:[{q:"When does maintenance work count as done?",opts:["When the work finishes","When it is recorded and signed","When the captain is told","When the next flight departs"],a:1,exp:"Maintenance only counts once records and signatures are complete."},
{q:"Which station action distorts reliability analysis?",opts:["Coding delays accurately","Checking with maintenance when unsure","Coding delays without checking the reason","Reporting cabin defects"],a:2,exp:"Incorrect delay codes distort the figures for technical causes."},
{q:"Which is true of the B787?",opts:["It keeps no data","It can send in-flight defect data to the ground","Its records are paper only","It does not report defects"],a:1,exp:"The B787 can send in-flight data to the ground, so preparation can sometimes start before arrival."}],
next:"Part 3 MEL and CDL: 3-1 What the MEL Is"});
})(window.ARTS);
