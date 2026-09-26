/* 優れたステーションのつくり方 1-7 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("1-7",{title:"A-CDM and TSAT: New Rules That Raise Punctuality Across the Whole Airport",hl:"TSAT",subtitle:"Declare honestly when you will be ready; the airport decides when you move. Stations and handlers shape punctuality through how they enter and update TOBT",
lead:["Departures used to request pushback as soon as they were ready, and sometimes queued at the runway with engines running. Airport Collaborative Decision Making (A-CDM) and the Target Start-up Approval Time (TSAT) let airlines, ground handlers, the airport and air traffic control share the same timing information and set each flight’s start-up time for the airport as a whole.","In Japan, Narita began TSAT operations in October 2023; in Europe it is standard at many major airports. This lesson uses moving diagrams to cover the time terms, how TSAT is calculated, Narita’s rules, global developments, and what stations and handlers need to do."],
sections:[
{h:"What A-CDM is",blocks:[{t:"table",cols:["Partner","Information and role"],rows:[
["Airline and ground handler","The time the flight will be ready (TOBT), updated if it will be late"],
["Airport operator","Stand allocation and the state of facilities"],
["ATC and ramp control","Sets the runway sequence, issues TSAT and manages start-up"],
["Air traffic flow management","Departure time allocations (EDCT and similar)"]]},
{t:"point",x:"Information sharing is the heart of A-CDM. One flight’s accurate TOBT improves other flights’ sequence, runway use and the airport’s overall flow."}]},
{h:"Time terms",blocks:[{t:"table",cols:["Term","Meaning"],rows:[
["STD / SOBT","Scheduled departure (scheduled off-block time)"],
["EOBT","Estimated off-block time in the flight plan"],
["TOBT","Target off-block time: doors closed and able to move as soon as cleared. Provided by the airline or handler"],
["PTOT","Possible take-off time: TOBT plus pushback and taxi time"],
["CTOT / TTOT","The take-off time actually allocated (terms vary by airport)"],
["TSAT","Target start-up approval time: when to request start-up"],
["AOBT / ATOT","Actual off-block time and actual take-off time"],
["EDCT","Expected departure clearance time set by flow management (Japan)"]]},
{t:"note",x:"* Terms and abbreviations vary slightly by airport and region; check local documents. ★"}]},
{h:"How TSAT is set",blocks:[{t:"fig",id:"acdm_calc",cap:"Moving diagram: ① the airline provides TOBT ② pushback (PB) and taxi times are added to give the possible take-off time PTOT ③ the runway sequence, arrivals and departure allocations (EDCT) set the actual take-off time CTOT ④ subtracting taxi and pushback times from CTOT gives TSAT."},
{t:"rows",items:[
{name:"The airport sets the order",x:"Take-off times follow the most efficient runway sequence, not the order in which flights become ready. TSAT is the start-up time worked back from that."},
{name:"Where you wait changes",x:"Aircraft wait on stand with engines off until TSAT, instead of queuing at the runway with engines running."}]}]},
{h:"Narita’s rules (example)",blocks:[{t:"fig",id:"acdm_narita",cap:"Moving diagram: a time scale with EOBT as zero. ① enter TOBT by 25 minutes before EOBT ② TSAT is fixed 20 minutes before EOBT ③ TOBT may be set from 15 minutes before to 30 minutes after EOBT ④ be ready to move within 5 minutes either side of TOBT ⑤ request start-up at TSAT (from 3 minutes before TSAT if ready)."},
{t:"table",cols:["Rule","Details"],rows:[
["Entering TOBT","In the CDM system by 25 minutes before EOBT; otherwise the flight plan EOBT is treated as the TOBT"],
["Allowed range","No earlier than 15 minutes before EOBT and no later than 30 minutes after it"],
["Readiness","Be able to move within 5 minutes of TOBT; if not, re-enter TOBT each time"],
["TSAT fixed","20 minutes before EOBT"],
["Start-up request","After receiving the ATC clearance, call ramp control at TSAT; if ready, from 3 minutes before TSAT"],
["Delay messages","Entering TOBT does not replace the required delay notification"],
["TOBT priority","① TOBT entered in the CDM system ② stand plan in the flight plan ③ flight plan EOBT"]]},
{t:"note",x:"* As at the start of operations on 5 October 2023. Trials displaying TSAT on the stand guidance system (VDGS) have also been run. Check Narita’s current AIP and notices. ★"}]},
{h:"Global developments",blocks:[{t:"table",cols:["Region","Main points"],rows:[
["Europe","EUROCONTROL published its A-CDM Specification in January 2025. Linked to EU regulation, A-CDM is standard at major airports, and airport TOBT/TSAT data feed Europe-wide flow management"],
["A European airport example","TOBT may be changed at most three times after TSAT is issued; if start-up is not requested within the TSAT window, TOBT is deleted and the flight suspended (Munich)"],
["Japan","Narita began TSAT operations in October 2023; A-CDM is being considered and prepared at other major airports"],
["Asia and elsewhere","Adoption is spreading at major international airports"]]},
{t:"note",x:"* An assessment of fully implemented European airports found taxi-out times fell by about three minutes per flight on average (as reported from a EUROCONTROL assessment). ★"}]},
{h:"Before and after",blocks:[{t:"fig",id:"acdm_queue",cap:"Moving diagram: left (before), flights leave as soon as ready and queue at the runway with engines running; right (TSAT), flights wait on stand with engines off, move in sequence and take off with little waiting."},
{t:"check",items:[
{name:"Fuel and CO2",x:"Less time waiting with engines running."},
{name:"Predictability",x:"Take-off times become predictable, helping destinations and onward flights plan."},
{name:"Congestion and bad weather",x:"Keeps the sequence fair and speeds recovery during snow, runway clearing and bad weather."}]}]},
{h:"What stations and handlers do",blocks:[{t:"table",cols:["Situation","Action"],rows:[
["Owning TOBT","Decide who enters and updates it, and when (station, ramp coordinator or handler), including late-night and early flights"],
["Triggers to update","Update TOBT as soon as you know of late crew, late boarding, baggage offloads, or delays to cargo, catering, cleaning or fuelling"],
["Honest TOBT","Do not enter an early time to jump the queue; missing TSAT because you are not ready pushes you further back"],
["Sharing TSAT","Tell cabin, ramp and pushback staff, and align boarding close and door close with TSAT"],
["Pushback readiness","Make sure the tug and crew are in place at TSAT"],
["De-icing days","Confirm in advance with the airport and ATC how de-icing location and sequence relate to TSAT"]]},
{t:"point",warn:true,x:"A delay spent waiting for TSAT is coded differently depending on whether you were ready and waited for the airport/ATC sequence, or were late with your own preparation. Keep a record of TOBT entries and actual readiness times so delay causes can be allocated correctly (1-2, 1-3)."}]},
{h:"Reading punctuality differently",blocks:[{t:"rows",items:[
{name:"Waiting even when on schedule",x:"Even if you are ready on time, the runway sequence may give a later TSAT. Separate time spent waiting for TSAT from delay you caused when reviewing punctuality figures."},
{name:"TOBT accuracy as a measure",x:"Some airports and airlines track how often TOBT was changed and whether start-up happened within 5 minutes of TOBT, as measures for stations and handlers."},
{name:"Review in the monthly meeting",x:"Review flights that missed TSAT or updated TOBT late in the monthly handler meeting and fix the procedure (2-3)."}]}]}],
voice:"",
terms:[["Airport Collaborative Decision Making (A-CDM)","空港の協調的意思決定（A-CDM）","공항 협력적 의사결정(A-CDM)"],["Target Off-Block Time (TOBT)","目標オフブロック時刻（TOBT）","목표 오프블록 시각(TOBT)"],["Target Start-up Approval Time (TSAT)","目標スタートアップ承認時刻（TSAT）","목표 시동 승인 시각(TSAT)"],["Possible Take-Off Time (PTOT)","離陸可能時刻（PTOT）","이륙 가능 시각(PTOT)"],["Estimated Off-Block Time (EOBT)","出発予定時刻（EOBT）","출발 예정 시각(EOBT)"],["Taxi Time","地上走行の時間","지상 주행 시간"]],
quiz:[{q:"How is TSAT calculated?",opts:["TOBT + 30 minutes","CTOT − taxi time − pushback time","STD − 10 minutes","EOBT + TOBT"],a:1,exp:"It works back from the take-off time to when you may start moving."},
{q:"At Narita, when must TOBT be entered?",opts:["5 minutes before EOBT","By 25 minutes before EOBT","The day before","There is no deadline"],a:1,exp:"Without it, the flight plan EOBT is treated as the TOBT."},
{q:"What is the right approach to TOBT?",opts:["Enter an early time to get ahead","Enter an honest ready time and update it as soon as you know of a delay","Never change it once entered","It need not be entered"],a:1,exp:"An inaccurate TOBT hurts both your airline and the whole airport."}],
next:"Part 2 Getting the Best from Your Handler — 2-1 What the SGHA and the SLA settle"});
})(window.ARTS);
