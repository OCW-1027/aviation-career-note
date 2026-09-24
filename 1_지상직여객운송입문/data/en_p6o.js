/* 旅客運送の実務 6-7 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("6-7",{title:"The Ground Handler’s Operations Department: Role and Training",hl:"operations department",subtitle:"The control room that moves people, vehicles and information from one place — how an airline station works with it, and the training to ask for",
lead:["Besides the teams working at the counters and on the ramp, a ground handler has an operations department that runs the whole day: allocating staff and vehicles, monitoring each flight’s progress, adjusting when things run late, and often load control and operational messages. It is where all the information comes together.","This article covers the department’s roles and a typical organisation, its working day, the training each role needs, and what an airline station should check."],
sections:[
{h:"Roles in the operations department (example)",blocks:[{t:"table",cols:["Role","Main work"],rows:[
["Operations control (the desk)","Monitoring each flight, directing front-line teams, handling delays and irregularities, liaising with the airline station"],
["Resource allocation","Rosters, staff and GSE for each flight, reacting to stand changes"],
["Load control","Loading instructions (LIR), producing loadsheets where contracted, handling last minute changes (3-7, 3-8)"],
["Operational messages","Sending MVT, LDM, CPM, PTM and other messages; recording delay codes (see the IATA delay code list)"],
["Quality and training","Quality checks, training plans and records, supporting airline audits"]]},
{t:"note",x:"* How the work is divided depends on the company and airport. In a small operation one person may cover several roles. ★"}]},
{h:"A typical day",blocks:[{t:"ladder",rise:10,steps:[{name:"Day before",sub:"Allocate next day’s flights, staff and equipment"},{name:"Start of shift",sub:"Briefing, confirm the day’s changes"},{name:"Each flight",sub:"Monitor progress, update the target off-block time (TOBT)"},{name:"Delays and changes",sub:"Reallocate staff and equipment, inform the airline"},{name:"End of shift",sub:"Daily report of performance, delay codes and events"}]},
{t:"point",x:"The operations department is usually first to record why a flight was late. Agreeing in advance with the airline station how delay codes are assigned reduces disputes at the monthly meeting (6-2)."}]},
{h:"Training each role needs (example)",blocks:[{t:"table",cols:["Role","Training","Point"],rows:[
["Everyone","Security, safety (SMS and ramp safety), dangerous goods awareness","Initial and recurrent; keep records for three years or more (8-3)"],
["Operations control","Each airline’s procedures, radio use, delay codes, irregular operations","List the procedures that differ by airline"],
["Load control","Load control authorisation by airline and aircraft type, system use","Keep a list of who may issue loadsheets; recurrent training and expiry dates"],
["Resource allocation","Allocation system, working-time rules, types of GSE (3-6)","Match people’s qualifications (driving, load control) with allocations"],
["Messages","Message formats, addressees, how to correct errors","Keep copies of messages sent"]]},
{t:"point",warn:true,x:"For work that airlines require authorisation for, such as load control, the allocation process itself must check that only qualified, in-date people are assigned. Assigning someone whose authorisation has expired is a common audit finding."}]},
{h:"What the airline station should check",blocks:[{t:"check",items:[
{name:"Contact arrangements",x:"Desk phone, radio and chat, the night and holiday duty manager, the escalation order."},
{name:"Authorisation list",x:"Who may do load control and loadsheets for your flights, and their expiry dates."},
{name:"Training records",x:"Records of training in your airline’s procedures (checking the handler’s records, 8-3)."},
{name:"Message accuracy",x:"Track errors in times and figures on MVT, LDM and other messages as a quality indicator."},
{name:"Delay code rules",x:"Agree which code applies in which situation, and review it at the monthly meeting."},
{name:"Contract and SLA",x:"How the department’s work is described in the SGHA and the service level agreement (Station Operations 2-1)."}]}]},
{h:"Building a good working relationship",blocks:[{t:"rows",items:[
{name:"One point of contact",x:"Send the station’s changes and requests to the desk, not directly to individuals on the ramp."},
{name:"Share early",x:"Tell the desk about extra flights, aircraft changes and special passengers as soon as you know."},
{name:"Review together",x:"After a major delay or disruption, put the desk’s log and the station’s log side by side and review them."}]}]}],
voice:"[Interview to be added] Getting through a major disruption together with the handler’s desk.",
terms:[["Operations Department","オペレーション部門","오퍼레이션 부서"],["Operations Control Desk","運営の統括（デスク）","운영 통제(데스크)"],["Resource Allocation","資源の割り当て","자원 배정"],["Load Control","搭載管理","탑재관리"],["Authorisation List","資格の名簿","자격 명단"],["Escalation","エスカレーション","에스컬레이션(상향 보고)"]],
quiz:[{q:"Which is not part of the operations department’s work?",opts:["Allocating staff and GSE","Recording delay codes","Cabin service on board","Sending messages"],a:2,exp:"Cabin service is the cabin crew’s job."},
{q:"What matters most when allocating load control staff?",opts:["Anyone who is free","Only qualified, in-date people","Give it to new starters","No need to check with the airline"],a:1,exp:"Expired authorisations are a common audit finding."},
{q:"Where should the station send changes for the handler?",opts:["Directly to individuals on the ramp","To the desk","Nowhere","In a batch the next day"],a:1,exp:"Keep one point of contact."}],
next:"6-8 Checking invoices and managing station costs"});
})(window.ARTS);
