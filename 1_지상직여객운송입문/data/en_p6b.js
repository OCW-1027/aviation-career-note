/* 旅客運送の実務 6-8 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("6-8",{title:"Checking Invoices and Managing Station Costs: Reading Airport and Handler Invoices",hl:"checking invoices",subtitle:"An invoice can only be checked against actual activity: have your flight records, contract rates and delay causes ready",
lead:["Every month a station receives many invoices — from the airport company, the ground handler, the fuel supplier, system providers and others. The amounts are large and the line items many; pay them unchecked and miscounted flights, wrong overtime surcharges and charges for extra work you were not responsible for all become your costs.","This article covers the station’s main costs, how to check an invoice, what to compare, and monthly budget control."],
sections:[
{h:"The station’s main costs (example)",blocks:[{t:"table",cols:["Cost","What it covers","How it is set (example)"],rows:[
["Airport charges","Landing, parking, boarding bridge use and so on","Aircraft weight, time, number of uses"],
["Ground handling","Passenger, ramp, load control and other services","Contract base rate plus extra work (overtime, special services)"],
["Facility rent","Counters, offices, stores","Area and period"],
["Systems","Common-use terminals (CUTE/CUPPS), departure control and so on","Flights, terminals or passengers"],
["Fuel","Quantity and price, into-plane service fees","Quantity and contract price"],
["Other","Catering, cleaning, de-icing, communications, staff costs","Contract and actual use"]]},
{t:"note",x:"* Names, rates and tax treatment vary by airport, contract and country. Check your own contracts and tariffs. ★"}]},
{h:"How to check an invoice",blocks:[{t:"ladder",rise:10,steps:[{name:"Keep records",sub:"Flights, aircraft, times, extra work"},{name:"Receive the invoice",sub:"Check due date and addressee"},{name:"Compare with records",sub:"Flights, times, rates"},{name:"Query differences",sub:"With supporting evidence"},{name:"Approve and pay",sub:"Under the approval rules"},{name:"Record and analyse",sub:"Monthly, by cost type"}]},
{t:"point",x:"The starting point is the station’s own records. Without actual times, aircraft and records of what extra work you requested for each flight, you cannot tell whether an invoice is right."}]},
{h:"What to compare",blocks:[{t:"table",cols:["Check","Common error","How to check"],rows:[
["Flights and aircraft","Cancelled flights or aircraft changes not reflected","Compare with operational records (MVT, daily reports)"],
["Overtime and night surcharges","Calculated on scheduled rather than actual times","Check against actual block times"],
["Extra work for delays and cancellations","Charged for work caused by delays that were not your responsibility","Confirm responsibility from delay codes and cause records (see the IATA delay code list)"],
["Rates","Old or non-contract rates","The contract (SGHA annexes) and the latest tariff"],
["Duplicates","The same work charged twice under another item or in another month","Compare with last month and with other invoices for the same flight"],
["Special services","Work you did not request","Request records: who asked, when, for what"]]}]},
{h:"Monthly control",blocks:[{t:"table",cols:["Item","What to record (example)"],rows:[
["Budget vs actual","Budget, actual and variance by cost type"],
["Reasons for variance","More or fewer flights, extra flights, disruption, rate changes"],
["Cost per flight","Total for the cost type ÷ flights operated"],
["Cost per passenger","Total for the cost type ÷ passengers carried"],
["Open queries","Amount, counterparty, deadline, status"]]},
{t:"point",warn:true,x:"Some invoice errors cannot be corrected once the deadline has passed. Put the checking and query deadlines on the station calendar (6-6)."}]},
{h:"Agreements with your handler",blocks:[{t:"check",items:[
{name:"How extra work is requested",x:"Agree who can request chargeable extra work and by what means (verbal requests lead to disputes)."},
{name:"Recording causes",x:"For work during delays or disruption, agree the cause and delay code before invoicing."},
{name:"Invoice format",x:"Ask for detail by flight and by day; checking becomes much faster."},
{name:"Monthly meeting",x:"Put open queries on the monthly meeting agenda and close them by a set date (6-2)."}]}]}],
voice:"[Interview to be added] Finding a major error while checking an invoice.",
terms:[["Invoice","請求書","청구서"],["Landing Fee","着陸料","착륙료"],["Parking Charge","停留料","정류료"],["Overtime Surcharge","時間外の割増","시간외 할증"],["Budget vs Actual","予算と実績","예산과 실적"],["Cost per Flight","1便あたりの費用","편당 비용"]],
quiz:[{q:"What is the starting point for checking an invoice?",opts:["The invoice total","The station’s own activity records","Last year’s invoices","The supplier’s explanation"],a:1,exp:"Without your own records you cannot judge whether it is right."},
{q:"How do you check an overtime surcharge?",opts:["Scheduled times","Actual block times","Ignore it","Leave it to the supplier"],a:1,exp:"Check against actual times."},
{q:"What should you check for extra work during a delay?",opts:["The weather","The cause and responsibility (delay code)","Only passenger numbers","Nothing"],a:1,exp:"Work not caused by you may need to be charged to someone else."}],
next:"6-9 Writing the station’s monthly KPI report"});
})(window.ARTS);
