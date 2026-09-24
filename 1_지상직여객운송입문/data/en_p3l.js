/* 旅客運送の実務 3-7 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("3-7",{title:"Reading a Loadsheet: Checking a Flight’s Weight and Balance on One Page",hl:"Loadsheet",subtitle:"Read it in numbered order and you know where to look and what to check — including how to verify the sums and write a last minute change",
lead:["The loadsheet shows that every weight and the centre of gravity for the flight are within limits. Load control prepares it and the captain checks and signs (approves) it. If a single figure is wrong, the basis for a safe flight is gone.","This article walks through a fictional loadsheet in a commonly used format, in numbered order. Once you understand how the figures relate, you can spot mistakes on the spot."],
sections:[
{h:"An example loadsheet",blocks:[{t:"fig",id:"loadsheet",cap:"The numbers match the table below. All figures are fictional. Formats differ by airline and system."},
{t:"table",cols:["No.","Field","How to read it"],rows:[
["1","Flight details","From/to, flight number/date, registration, cabin version (C12Y162 = 12 business and 162 economy seats), crew (2 flight deck / 6 cabin), time prepared"],
["2","Prepared, approved, edition","Who checked it, who approved it, and the edition number (EDNO), which changes when it is reissued"],
["3","Load in compartments","Bags, cargo and mail by hold (1 to 5 and so on); the total is on the left"],
["4","Passengers and cabin bags","Passenger weight (standard weights) and numbers: 150/4/1 = 150 adults, 4 children, 1 infant (infants do not occupy seats)"],
["5","Dry operating weight (DOW)","The aircraft, crew and cabin equipment — fixed for the flight"],
["6","Zero fuel weight (ZFW)","DOW plus traffic load; must not exceed the MAX. The L marks the limit that governs the allowed load"],
["7","Take-off fuel and weight (TOW)","ZFW plus take-off fuel; must not exceed the MAX"],
["8","Trip fuel and landing weight (LAW)","TOW minus trip fuel; must not exceed the MAX"],
["9","Underload","How much more can be loaded; last minute changes must fit within it"],
["10","Balance (index and MAC)","DOI and DLI (dry operating and loaded index), the indices and %MAC at each weight — check they are within limits. STAB is the take-off stabiliser setting"],
["11","Seating","Passengers by cabin zone (A, B, C), used for the balance calculation"],
["12","Last minute changes","Where changes after closing are written in (LMC)"],
["13","Signature","The preparer’s signature, kept on record with the captain’s approval"]]}]},
{h:"Checking how the figures relate (using the example)",blocks:[{t:"table",cols:["Check","Calculation","Example"],rows:[
["Total traffic load","Compartments + passengers","5700 + 11390 = 17090"],
["Zero fuel weight","DOW + traffic load","43600 + 17090 = 60690 (max 62700)"],
["Take-off weight","ZFW + take-off fuel","60690 + 12600 = 73290 (max 79000)"],
["Landing weight","TOW − trip fuel","73290 − 10300 = 62990 (max 66300)"],
["Allowed take-off weight","The lowest of: 1) max ZFW + TOF = 75300, 2) max TOW = 79000, 3) max LAW + trip = 76600","75300 (zero fuel weight limits it, hence the L on the ZFW line)"],
["Underload","Allowed TOW − actual TOW","75300 − 73290 = 2010"]]},
{t:"point",x:"You do not need to redo every calculation. Check that the additions and subtractions agree, that none of the three maximums is exceeded, and that the underload is not negative — that catches most errors."},
{t:"link",href:"搭載計算の練習.html?lang=en",x:"Try the Load Control Practice page: change passengers and fuel, or solve practice questions"}]},
{h:"Checks before handing it to the captain",blocks:[{t:"check",items:[
{name:"Passengers",x:"The final gate count, the adult/child/infant split and the numbers by zone match the loadsheet."},
{name:"Bags and cargo",x:"Weights and holds match the loading instruction (LIR) and the loading report."},
{name:"Fuel",x:"Take-off and trip fuel match the figures from operations control."},
{name:"Special loads",x:"Dangerous goods, live animals and so on match the notice to the captain (NOTOC)."},
{name:"Balance",x:"Indices and %MAC are within limits; if close to the edge, reconsider where the load goes."}]}]},
{h:"Writing a last minute change (LMC)",blocks:[{t:"p",x:"If passengers or bags change slightly after the loadsheet is handed over, within set limits the change is written on as a last minute change instead of reissuing. The limits are set for each airline and aircraft type."},
{t:"table",cols:["Example","How it might be written","What to check"],rows:[
["Two more adult passengers","DEST BKK / PAX / 0C / +2 / +150","Within the underload (2010) and only a small balance change"],
["One bag offloaded","DEST BKK / BAG / CPT4 / − / −20","Reconcile the offloaded bag (2-5)"]]},
{t:"point",warn:true,x:"Changes beyond the limits, or that move the balance significantly, mean a new loadsheet with a new edition number. When in doubt, reissue."}]}],
voice:"[Interview to be added] Catching an error on the loadsheet just before departure.",
terms:[["Loadsheet","ロードシート","로드시트"],["Dry Operating Weight (DOW)","乾燥運航重量","건조 운항 중량"],["Zero Fuel Weight (ZFW)","無燃料重量","무연료 중량"],["Underload","余裕（許容搭載量の残り）","여유 중량"],["Mean Aerodynamic Chord (MAC)","平均空力翼弦","평균 공력 시위"],["Last Minute Change (LMC)","最後の変更","최종 변경"]],
quiz:[{q:"How is zero fuel weight (ZFW) calculated?",opts:["DOW + traffic load","TOW − trip fuel","DOW + fuel","Traffic load + fuel"],a:0,exp:"The dry operating weight plus passengers, bags and cargo."},
{q:"In the example, which limit makes the underload 2010 kg?",opts:["Max zero fuel weight","Max take-off weight","Max landing weight","Seat count"],a:0,exp:"Max zero fuel weight + take-off fuel = 75300 is the lowest, hence the L on the ZFW line."},
{q:"What if a change goes beyond the limits?",opts:["Correct it by hand","Issue a new loadsheet","Depart anyway","Just tell the captain"],a:1,exp:"Reissue with a new edition number."}],
next:"3-8 Reading the LIR and the hold layout"});
})(window.ARTS);
