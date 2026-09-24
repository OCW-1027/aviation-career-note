/* 旅客運送の実務 3-8 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("3-8",{title:"Reading the LIR (Loading Instruction/Report) and the Hold Layout",hl:"LIR",subtitle:"What goes in which hold: one page of instructions and report underpins every figure on the loadsheet",
lead:["The loadsheet figures depend on what was actually loaded where. Load control instructs what goes in each hold, and the ramp loading supervisor writes back what was done, on the LIR: the Loading Instruction/Report.","This article reads an LIR for the same fictional flight as 3-7, then looks at the hold layout, the idea of the centre of gravity and the basic loading rules."],
sections:[
{h:"An example LIR",blocks:[{t:"fig",id:"lir",cap:"The numbers match the table below. Same fictional flight as the 3-7 loadsheet. Formats differ by airline and system."},
{t:"table",cols:["No.","Field","How to read it"],rows:[
["1","Flight and aircraft","Flight, sector, registration, aircraft type, departure time, preparer and edition"],
["2","Holds and limits","Each compartment and the maximum weight it can take"],
["3","Planned load","Weight by destination and type (B bags, C cargo, M mail and so on); the loading supervisor writes what was loaded on the right"],
["4","Special loads","Dangerous goods (for example dry ice UN1845), live animals and so on; must match the NOTOC"],
["5","Instructions","Order and position of loading, items to keep apart (animals and dry ice), items to place by the door"],
["6","Exceptions","Anything not loaded as instructed (for example hold 4 full, some moved to 5)"],
["7","Signature","The loading supervisor’s signature and time; the loadsheet relies on this report"]]},
{t:"point",x:"The hold totals in the example (1: 1500, 3: 2100, 4: 1800, 5: 300) are the same as ‘LOAD IN COMPARTMENTS’ on the 3-7 loadsheet. Always check that the LIR and the loadsheet agree."}]},
{h:"The hold layout",blocks:[{t:"fig",id:"hold_layout",cap:"Top: a narrow-body example; bottom: a wide-body example. Numbers are compartments; see the table for A to D."},
{t:"table",cols:["Mark","Meaning"],rows:[
["A","The allowed centre of gravity range, around the wing. Weight and position of the load must keep the CG inside it"],
["B","Hold doors. Items needed first on arrival (transfer and priority bags) are easiest to place near them"],
["C","Narrow-body example: bags often loaded loose (bulk). Compartment numbering varies by aircraft and airline"],
["D","Wide-body example: loaded in containers and pallets (ULDs), with bulk hold 5 at the rear"]]}]},
{h:"The idea of the centre of gravity",blocks:[{t:"fig",id:"cg_balance",cap:"The centre of gravity shown as a seesaw. See the table for A to E."},
{t:"table",cols:["Mark","Meaning"],rows:[
["A, B","The forward and aft CG limits"],
["C","Within limits: safe to take off and fly"],
["D","Too far forward: nose-heavy, harder to raise the nose on take-off"],
["E","Too far aft: the nose lifts easily and the aircraft is less stable; on the ground the tail may sink (tail tipping)"]]},
{t:"rows",items:[
{name:"How to adjust",x:"Move bags or cargo to another hold; on a light flight, spread passengers forward and aft."},
{name:"Order of loading",x:"Generally load forward holds first and unload aft holds first, following the aircraft’s rules. ★"}]}]},
{h:"Basic loading rules",blocks:[{t:"check",items:[
{name:"Respect limits",x:"Never exceed a hold’s maximum weight or the floor loading limit."},
{name:"Secure the load",x:"Use nets and locks so nothing moves; heavy items at the bottom."},
{name:"Segregate",x:"Keep apart the combinations the rules require, such as dangerous goods and animals (dry ice and animals, for example)."},
{name:"Animals",x:"In a hold with ventilation and temperature control; last on, first off."},
{name:"Transfer and priority",x:"Bags needed quickly on arrival go near the door."},
{name:"Report",x:"If loading differs from the instruction, write it on the LIR and tell load control; the loadsheet must be corrected (last minute change or reissue)."}]},
{t:"link",href:"搭載計算の練習.html?lang=en",x:"On the Load Control Practice page, change hold weights and watch how the balance index moves"}]}],
voice:"[Interview to be added] Finding the LIR and the actual load did not match, and fixing it before departure.",
terms:[["Loading Instruction/Report (LIR)","搭載指示書","탑재 지시서"],["Compartment / Hold","貨物室","화물칸"],["Bulk Loading","バルク搭載","벌크 탑재"],["Floor Loading Limit","床の強度の上限","바닥 강도 한계"],["Segregation","隔離（離して積むこと）","격리 적재"],["Tail Tipping","尻もち","꼬리 내려앉음"]],
quiz:[{q:"What is written to the right of the planned load on the LIR?",opts:["The weather","What was actually loaded","The fare","Crew names"],a:1,exp:"The loading supervisor writes back the result."},
{q:"What can happen on the ground if the CG is too far aft?",opts:["Bird strike","Tail tipping","Diversion","No-show"],a:1,exp:"The tail may sink to the ground."},
{q:"How should animals be loaded?",opts:["First on, last off","Last on, first off","Next to dry ice","Anywhere"],a:1,exp:"Also watch ventilation and temperature."}],
next:"Part 4 Baggage Services — 4-1 Types of baggage irregularity"});
})(window.ARTS);
