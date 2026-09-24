/* 地上職・旅客運送 入門 — English version (Part 5: イレギュラー対応) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("5-1",{title:"Inadmissible Passengers (INAD)",hl:"inadmissible",subtitle:"When a passenger is refused entry, the airline that carried them normally takes them back",
lead:["A passenger refused entry by immigration at the destination is called an INAD, an inadmissible passenger. Under the international framework (Annex 9 to the Chicago Convention), the airline that carried them is responsible for taking them back to the point of departure.",
"This article covers what the arrival station does, the investigation at the departure station, arranging the return, responding to fines, and how to stop it happening again."],
sections:[
{h:"Common reasons",blocks:[{t:"table",cols:["Reason","Example"],rows:[
["Visa problems","No visa, expired, or the wrong type for the purpose"],
["Passport problems","Not enough validity left, damaged, forged or altered"],
["Entry conditions not met","No return ticket, insufficient funds, no address for the stay"],
["Doubt about the purpose","Stated tourism but judged to be intending to work"],
["Past record","Previous overstay or removal"]]}]},
{h:"At the arrival station (typical example)",blocks:[{t:"ladder",rise:10,steps:[{name:"Notified",sub:"Immigration tells the airline"},{name:"Take charge",sub:"Receive the passenger and the documents"},{name:"Book the return",sub:"Arrange the earliest flight"},{name:"While they wait",sub:"Government facilities, meals"},{name:"Hand over",sub:"Passport to the senior cabin crew, then boarding"},{name:"Report",sub:"Advise the departure station and head office"}]},
{t:"rows",items:[
{name:"The passport",x:"It is usually handed by arrival staff to the senior cabin crew, and passed to the authorities or staff at the departure station."},
{name:"Costs",x:"The return fare and the costs while waiting are normally borne by the carrying airline, which may be able to recover them from the passenger under its conditions of carriage."},
{name:"Treating the passenger",x:"Someone refused entry is under real strain. Explain the facts calmly and treat them with dignity."}]}]},
{h:"Investigation and fines at the departure station",blocks:[{t:"ladder",rise:10,steps:[{name:"Notice received",sub:"An infringement notice"},{name:"Investigate",sub:"Check-in records, the agent’s account"},{name:"Decide",sub:"Was there negligence?"},{name:"If there was",sub:"Corrective action and retraining"},{name:"If there was not",sub:"Submit a representation seeking waiver of the fine"}]},
{t:"point",warn:true,x:"A record showing that the documents were checked at check-in is the basis for asking for a fine to be waived. Keeping that evidence, such as a saved screen from the travel requirements database, protects the company."}]},
{h:"Preventing a repeat",blocks:[{t:"check",items:[
{name:"Check the requirements",x:"Use the database (such as TIMATIC) every time; never rely on memory."},
{name:"Advance passenger information",x:"In some countries the API systems give an indication before boarding of whether entry will be permitted."},
{name:"When something feels wrong",x:"Suspected forgery, or a story that does not add up: consult your supervisor."},
{name:"Share the cases",x:"Share INAD cases between the station and head office and use them in training."}]}]}],
voice:"[Interview to be added] What you were careful about when returning an inadmissible passenger.",
terms:[["Inadmissible Passenger (INAD)","入国拒否者","입국 거부자"],["Removal / Return","送り返し","송환"],["Infringement Notice","違反通知","위반 통지"],["API / APIS","事前旅客情報","사전 승객 정보"],["TIMATIC","渡航条件データベース","입국 조건 데이터베이스"],["Fine / Penalty","罰金","벌금"]],
quiz:[{q:"Who is normally responsible for returning an inadmissible passenger?",opts:["The passenger","The airline that carried them","The destination country","The travel agency"],a:1,exp:"Under the international framework it falls on the carrying airline."},
{q:"What supports a request to waive a fine?",opts:["A letter of apology","A record that documents were checked at check-in","Only the passenger’s word","Nothing"],a:1,exp:"Keeping evidence of the check matters."},
{q:"What usually happens to the passport on the return flight?",opts:["The passenger keeps it","It is given to the senior cabin crew","It is destroyed","It is posted"],a:1,exp:"The crew carry it and hand it over at the departure station."}],
next:"5-2 Check-in errors, duplicates and wrong tags"});

set("5-2",{title:"Check-in Errors, Duplicates and Wrong Tags",hl:"check-in errors",subtitle:"A small keying error becomes a large problem at the other end",
lead:["Checking in the wrong passenger, checking the same passenger in twice, tagging a bag for the wrong destination. All of these happen, and how quickly you react decides how much damage they do."],
sections:[
{h:"Common errors and what to do",blocks:[{t:"table",cols:["Error","What follows","What to do"],rows:[
["Checked in as the wrong person","Counts, manifest and documents do not agree","Correct it to the right passenger and tell everyone concerned"],
["Duplicate check-in","The count comes out high","Cancel the duplicate and collect the boarding pass"],
["Duplicate tag numbers","Two bags carry the same number","Identify the bag and retag it"],
["Wrong destination on the tag","The bag goes to the wrong airport","Retag before loading; after departure, advise the arrival and transit stations"],
["Tag came off","No way to tell whose bag it is","Match from the contents and the records (4-3)"]]}]},
{h:"Habits that prevent errors",blocks:[{t:"check",items:[
{name:"Say it out loud",x:"Confirm the name and destination out loud, with the passenger."},
{name:"Read the tag before attaching it",x:"Look at the airport code printed on the tag first."},
{name:"Report the moment you notice",x:"Never hide a mistake; tell your supervisor and the ramp immediately."}]},
{t:"point",x:"Building an atmosphere where mistakes are reported at once does far more to limit the damage than blaming people does."}]}],
voice:"[Interview to be added] How you built a team where mistakes were reported straight away.",
terms:[["Mis Check-in","チェックインミス","체크인 오류"],["Duplicate Check-in","二重チェックイン","중복 체크인"],["Duplicate Tag","タグの重複","태그 중복"],["Airport Code","空港コード","공항 코드"]],
quiz:[{q:"You notice a wrongly tagged bag after departure. What do you do?",opts:["Nothing","Advise the arrival and transit stations","Leave it to the passenger","Deal with it tomorrow"],a:1,exp:"Early word means the bag can still be rerouted."},
{q:"What limits the damage from mistakes most?",opts:["Hiding them","An atmosphere where they are reported at once","Blaming people","Not recording them"],a:1,exp:"Fast reporting means fast recovery."}],
next:"5-3 Medical emergencies and injuries on board: what the ground does"});

set("5-3",{title:"Medical Emergencies and Injuries on Board: What the Ground Does",hl:"medical emergencies",subtitle:"From the captain’s call to touchdown, line up medical care, immigration and the family",
lead:["A passenger collapses in flight, is scalded, or is injured in turbulence. It happens on board, but preparing for what comes after landing is ground work. From the moment the captain’s message arrives, the time to touchdown is what you have.",
"This article covers what the ground does for each type of case, what to prepare at the arrival station, the principles when a passenger dies on board, and the records and reporting."],
sections:[
{h:"Types of case and the ground response",blocks:[{t:"table",cols:["Case","Main ground response"],rows:[
["Sudden illness","Confirm the symptoms and have the airport medical team or an ambulance standing by; contact quarantine if needed"],
["Scald from a hot drink","Confirm the extent in advance and decide on medical standby; hospital if serious"],
["Item falling from an overhead bin","The same. If overloading by a passenger caused it, offer to accompany them to hospital and mediate between the parties"],
["Turbulence injuries","Injuries can be as serious as spinal fractures, so have an ambulance standing by for immediate transfer"]]}]},
{h:"What to prepare at the arrival station",blocks:[{t:"check",items:[
{name:"Gather the facts",x:"Flight, arrival time, the passenger’s name, nationality, age and seat, the symptoms, who is travelling with them, and what was done on board."},
{name:"Medical standby",x:"Airport clinic, ambulance, paramedics. Arrange with the airport whether they can come to the aircraft."},
{name:"Border formalities",x:"Coordinate with immigration, customs and quarantine so that clearance can be done first, to speed the transfer."},
{name:"Family and companions",x:"Look after companions and contact the family. For foreign nationals, consider contacting the embassy or consulate."},
{name:"Baggage",x:"Prioritise unloading their checked bags and hand them to the passenger or their companion."},
{name:"Order of disembarkation",x:"Agree with the cabin whether the patient leaves first or after the other passengers."}]}]},
{h:"If a passenger dies on board",blocks:[{t:"rows",items:[
{name:"Restrict information",x:"Give information only to the defined recipients and the press officer."},
{name:"The reporting line",x:"Senior cabin crew, captain, operations and the arrival station, the responsible department at head office, then executives and the authorities."},
{name:"On board",x:"Preserve the scene and, if necessary, move other passengers away. After landing, disembarkation may be held until the station manager gives instructions."},
{name:"At the arrival station",x:"Notify the police, quarantine, medical services and customs so the scene can be examined, then arrange transfer to hospital. Speak with the family carefully about arrangements."},
{name:"Documents",x:"Check what is needed for transporting the remains and for the funeral: confirmation of death, the death certificate, embalming documents and so on."}]},
{t:"point",x:"Many airlines will support the family regardless of liability: return tickets, transport of the remains, accommodation locally. Where an infectious disease is suspected, follow the quarantine authority’s instructions."}]},
{h:"Records and reporting",blocks:[{t:"check",items:[
{name:"The captain’s report",x:"The captain files a report, which goes to the authorities through the company’s safety department."},
{name:"The ground record",x:"Log the time you were notified, what you arranged and how things developed after arrival, in order."},
{name:"Costs",x:"Record how medical costs were handled, ready for the rules and any later discussion of compensation, and share it with the departments concerned."}]}]}],
voice:"[Interview to be added] What you did in the 30 minutes between the call and the landing.",
terms:[["Medical Emergency","急病人","응급 환자"],["Turbulence","タービュランス","난기류"],["Ambulance","救急車","구급차"],["Quarantine","検疫","검역"],["Captain’s Report","機長報告書","기장 보고서"],["Human Remains (HUM)","ご遺体の輸送","유해 운송"]],
quiz:[{q:"You are told of injuries from turbulence. What do you do?",opts:["Deal with it after arrival","Have an ambulance standing by in advance","Ask the passenger to walk","Handle it tomorrow"],a:1,exp:"Injuries can be serious, so arrange standby before landing."},
{q:"How is information handled when a passenger dies on board?",opts:["Explain to anyone","Only to the defined recipients and the press officer","Publish it on social media","Tell the other passengers"],a:1,exp:"Information is tightly restricted."},
{q:"What about border formalities for a passenger being taken to hospital?",opts:["They can wait","Coordinate so they can be completed first","They are not needed","The passenger does it alone"],a:1,exp:"Arranged in advance so the transfer is not delayed."}],
next:"5-4 Delays: information, meal vouchers and certificates"});

set("5-4",{title:"Delays: Information, Meal Vouchers and Certificates",hl:"delays",subtitle:"Match the information, the service and the compensation to the length of the delay",
lead:["Every airline has delays. What makes passengers angry is usually not the delay itself but hearing nothing. From the moment a delay is known, the station works through a checklist: telling the people who need to know, informing passengers, and arranging services.","This article covers the first steps, how to inform passengers, services by length of delay, an example of a national compensation standard, and how to explain the reason for a delay."],
sections:[
{h:"When a delay is confirmed (station checklist)",blocks:[{t:"check",items:[
{name:"Talk to operations",x:"Confirm the cause and the expected time, and agree the response."},
{name:"Tell reservations",x:"Advise the delay or cancellation, identify passengers with connections and rebook where needed."},
{name:"Brief the staff",x:"Give everyone the same cause, outlook and options for passengers (hotels, transport)."},
{name:"Tell the agencies",x:"Customs, immigration, quarantine and others."},
{name:"Announce",x:"The cause, the expected departure and what is being done."},
{name:"The rest",x:"Passengers needing assistance, baggage, duty-free, catering and connections."}]}]},
{h:"How passengers are informed (example; differs by airline)",blocks:[{t:"table",cols:["When","How"],rows:[
["Before they reach the airport","Delays over a set length (for example 1–2 hours), cancellations and reroutes are advised by email, SMS or app"],
["At the airport, short delays","The duty manager decides whether and how to announce it"],
["At the airport, longer delays","Give the reason, the new boarding time and the options. If no time is fixed, update at a set interval (for example every 15–30 minutes)"],
["Long delays or likely cancellation","Identify passengers with onward bookings and make arrangements"],
["Regulators","In Korea, airlines must inform passengers as soon as they know of a delay; airlines that failed to, or did so late, have been fined ★"]]}]},
{h:"Services by length of delay (example)",blocks:[{t:"table",cols:["Delay","Typical service"],rows:[
["2 to 4 hours","Drinks and a snack"],
["4 to 6 hours","Drinks, a meal or snack, transport, means of communication"],
["6 hours or more","Drinks, meals, a day-use room, overnight accommodation, means of communication"]]},
{t:"rows",items:[
{name:"Often excluded",x:"Force majeure such as weather, air traffic control or airport conditions; staff travel tickets; onward sectors that are not confirmed."},
{name:"Arranging hotels",x:"One room per passenger as a rule. Contract with hotels at good rates in normal times. Always tell them the expected departure and the pick-up time for the airport."},
{name:"Explaining the cost",x:"Make clear that the hotel or meal voucher is at the airline’s expense, and exactly what it covers."}]}]},
{h:"An example of statutory compensation",blocks:[{t:"table",cols:["Delay caused by the airline","Guideline compensation (international)"],rows:[
["2 to 4 hours","10% of the fare for the delayed sector"],
["4 to 12 hours","20% of the fare for the delayed sector"],
["12 hours or more","30% of the fare for the delayed sector"]]},
{t:"note",x:"* Guide figures from Korea’s consumer dispute resolution standard. The EU and other jurisdictions have their own compensation regimes, and Japan has no single statutory scheme. What applies depends on the country, the airline and the cause. ★"}]},
{h:"Explaining the reason",blocks:[{t:"rows",items:[
{name:"Air traffic control",x:"Explain that it is a necessary measure taken by the airport or the authorities for safe operations."},
{name:"Maintenance",x:"Explain that it is an unavoidable measure taken for safe operations."},
{name:"The principle",x:"Accurate and straightforward, without jargon or words that alarm people. Share the same wording with the crew."}]},
{t:"point",x:"Delay certificates are often needed for insurance or an employer. Make sure staff can explain how to obtain one, at the counter or online."}]}],
voice:"[Interview to be added] How you settled the mood at the counter during a long delay.",
terms:[["Delay","遅延","지연"],["Meal Voucher","食事券","식사 쿠폰"],["Delay Certificate","遅延証明書","지연 증명서"],["Hotel Accommodation","宿泊","숙박"],["Force Majeure","不可抗力","불가항력"],["Air Traffic Control (ATC)","航空管制","항공교통관제"]],
quiz:[{q:"What makes passengers angriest during a delay?",opts:["The delay itself","Being told nothing","The weather","The aircraft type"],a:1,exp:"Lack of information is what drives frustration."},
{q:"What do you do when no departure time can be fixed?",opts:["Nothing","Keep updating at a set interval, such as every 20 minutes","Announce once an hour only","Wait until it is fixed"],a:1,exp:"Keep the updates coming at the promised interval."},
{q:"How do you explain a maintenance delay?",opts:["Describe the fault in detail","Say it is an unavoidable measure for safety","Give no reason","Blame the passengers"],a:1,exp:"Accurate, and without alarming people."}],
next:"5-5 Diversions"});

set("5-5",{title:"Diversions",hl:"diversions",subtitle:"You may land where your airline has no station. The plan you wrote in advance decides how it goes",
lead:["Weather, a medical emergency or a technical problem can mean an aircraft cannot land at its destination and goes to another airport (a diversion), or returns to where it started (a return). Where it lands may well be an airport where your airline has no station.","This article covers the difference between landing at your own station and elsewhere, what happens to the passengers on board, and what each diversion airport’s plan should contain."],
sections:[
{h:"Diversion and return",blocks:[{t:"cards",n:2,items:[
{ic:"🛬",name:"Diversion",tag:"Diversion",x:"Unable to land at the destination, the flight lands at an alternate or intermediate airport."},
{ic:"↩️",name:"Return",tag:"Return",x:"Unable to land at the destination, the flight returns to its point of departure."}]}]},
{h:"It depends where you land",blocks:[{t:"table",cols:["","An airport with your station","An airport without one"],rows:[
["Who leads","That station","The nearest station, or the one the company designates"],
["People on the ground","Station staff","Ask the airport’s handling company; if that is not enough, the senior cabin crew may help"],
["What to share","Onward itineraries, medical cases, VIPs, wheelchair passengers","The same, plus contacting the local agencies"],
["Authorities","The station notifies them and completes the formalities","Arranged through the handling company"]]}]},
{h:"What happens to passengers on board (example)",blocks:[{t:"rows",items:[
{name:"If the wait will exceed two hours",x:"If airport facilities allow, disembark passengers and have them wait in a designated area."},
{name:"Waiting outside",x:"Where local conditions allow, the station manager may let passengers clear immigration and wait outside the airport."},
{name:"Passengers who want to enter here",x:"They may be allowed to clear immigration locally, on condition that their checked bags are delivered at the original destination."},
{name:"Resuming the flight",x:"Crew duty limits may mean the flight cannot continue that day, in which case switch to accommodation and rebooking."}]},
{t:"point",warn:true,x:"In a diversion, passengers, baggage, cargo and crew all move at once. Agree at the outset who decides what, between the station, operations and the handling company."}]},
{h:"The plan to prepare in advance",blocks:[{t:"check",items:[
{name:"Who is responsible",x:"Which station covers each diversion airport, and what the handling company does."},
{name:"Emergency contacts",x:"Staff, handling company, airport and authorities."},
{name:"Procedures",x:"How passengers, baggage and other items are handled."},
{name:"Equipment",x:"Where to get steps, buses, wheelchairs and tugs."},
{name:"Passenger services",x:"Where to get transport, hotels, drinks and meals."}]},
{t:"note",x:"* Stations are often required to write a plan for each alternate airport and file it with head office."}]}],
voice:"[Interview to be added] The first call you made when you heard about a diversion.",
terms:[["Diversion","ダイバート","회항 (다이버트)"],["Return to Origin","リターン","회항 (리턴)"],["Alternate Airport","代替空港","교체 공항"],["Off-line Station","自社の支店がない空港","오프라인 공항"],["Flight Duty Period Limit","乗務員の勤務時間の制限","승무원 근무시간 제한"],["Emergency Contact List","緊急連絡網","비상 연락망"]],
quiz:[{q:"What is it called when a flight goes back to where it started?",opts:["Diversion","Return","Offload","Endorsement"],a:1,exp:"A return; landing at another airport is a diversion."},
{q:"Who works the flight at an airport with no station?",opts:["Nobody","The airport’s handling company, with the senior cabin crew helping if needed","The passengers","The police"],a:1,exp:"The nearest station arranges it."},
{q:"What should be prepared before a diversion happens?",opts:["Nothing","A plan for each alternate airport","A poster","A menu"],a:1,exp:"Contacts, procedures, equipment and service suppliers."}],
next:"5-6 Cancellations: rebooking, endorsement, compensation and claims"});

set("5-6",{title:"Cancellations: Rebooking, Endorsement, Compensation and Claims",hl:"cancellations",subtitle:"Rebuilding hundreds of itineraries with limited time and limited seats",
lead:["When a flight is cancelled, a crowd arrives at the counter at once. Every itinerary has to be rebuilt, hotels and transport arranged, and compensation and complaints taken.","This article covers what happens when a cancellation is confirmed, the rebooking options, connections affected by a late or cancelled inbound, what happens to the catering, and how complaints and redress claims are received."],
sections:[
{h:"When a cancellation is confirmed",blocks:[{t:"ladder",rise:10,steps:[{name:"Confirm the facts",sub:"Cause, alternative flights, when operations resume"},{name:"Brief",sub:"So every member of staff says the same thing"},{name:"Inform",sub:"Announcements and individual contact"},{name:"Rebook",sub:"To an agreed priority"},{name:"Hotels and transport",sub:"For those who need them"},{name:"Baggage",sub:"Return the offloaded bags"}]},
{t:"point",x:"Check first on passengers needing particular care: unaccompanied minors, those who are unwell, wheelchair users, elderly passengers and families with infants."}]},
{h:"Rebooking options",blocks:[{t:"table",cols:["Option","What it means"],rows:[
["Your own next flight","The most common. Allocated by available seats and priority"],
["Endorsement to another airline","Putting the passenger on a carrier you have an agreement with"],
["Rerouting","Reaching the final destination through a different connecting point"],
["Refund","For passengers who abandon the trip. Normally without a fee when the airline cancelled"]]}]},
{h:"Inbound flights and connections",blocks:[{t:"check",items:[
{name:"Check the inbound",x:"Use what the departure station sends and tell passengers the arrival will be late."},
{name:"Passengers who will miss the connection",x:"Rebook them on an alternative flight."},
{name:"If there is nothing that day",x:"Accommodation may be provided at the airline’s expense."}]}]},
{h:"What happens to the catering",blocks:[{t:"rows",items:[
{name:"Before it is loaded",x:"The station manager decides with the caterer whether to load it."},
{name:"After it is loaded",x:"The senior cabin crew makes the final decision on whether it can be served."},
{name:"Example storage times",x:"Refrigerated before loading, hot meals up to 72 hours from production and cold meals up to 48. Once loaded, consumption within about four hours is recommended. Catering that has been offloaded is not reused."}]}]},
{h:"Taking complaints and redress claims",blocks:[{t:"check",items:[
{name:"How to listen",x:"Listen to the end, carefully, and never look indifferent. If you cannot answer now, agree to come back to them promptly."},
{name:"Clear fault on our side",x:"Do not dodge the facts; acknowledge them."},
{name:"How claims are received",x:"In writing or online as a rule. If taken verbally, write it up and have the passenger check and sign it."},
{name:"What you need",x:"Name, address and contacts, the booked and actual itinerary, when and where what happened, the ticket, and evidence of the loss."},
{name:"Processing",x:"Where the airline is liable, calculate the loss, obtain a settlement and receipt and pay. Where it is not, decline in writing with reasons the passenger can follow. Amounts above the station’s authority go to head office."}]},
{t:"point",x:"Some countries require airlines to run a passenger redress desk at the airport for cancellations and delays, lost or damaged baggage, denied boarding and late refunds, with a set processing period and a link to the national consumer agency. Know what applies on your routes. ★"}]}],
voice:"[Interview to be added] The day a cancellation meant rebooking 200 passengers, and how it was run.",
terms:[["Cancellation","欠航","결항"],["Rebooking","振り替え","재예약"],["Endorsement","エンドース","엔도스"],["Refund","払い戻し","환불"],["Passenger Claim","苦情","클레임"],["Consumer Redress","被害救済","피해구제"]],
quiz:[{q:"Whose situation do you check first when a flight is cancelled?",opts:["Only top-tier members","Unaccompanied minors, unwell passengers, wheelchair users and others needing care","Whoever arrives last","Groups"],a:1,exp:"Those needing particular care come first."},
{q:"What happens to catering that has been offloaded?",opts:["Load it again","It is not reused","Hand it to passengers","Use it tomorrow"],a:1,exp:"For hygiene reasons it is not reused."},
{q:"What do you do with a complaint made verbally?",opts:["Do not record it","Write it up and have the passenger check and sign it","Write it from memory later","Just tell your manager"],a:1,exp:"Claims are received in writing as a rule."}],
next:"5-7 Tarmac delays"});

set("5-7",{title:"Tarmac Delays",hl:"tarmac delays",subtitle:"Time spent on the ground with the door closed has legal limits and reporting duties in some countries",
lead:["When the door has closed with passengers on board but the aircraft cannot take off, the wait on the ground is called a tarmac delay. Passengers cannot leave, and anxiety and frustration build quickly. Several countries therefore set limits on the waiting time and duties to keep passengers informed.","This article covers examples of those rules, the criteria for letting passengers off, what the ground provides, and the reporting and records."],
sections:[
{h:"Examples of national rules",blocks:[{t:"table",cols:["Country","Main rule (example)"],rows:[
["Korea","No tarmac delay beyond 3 hours domestic or 4 hours international after the door closes. Update passengers every 30 minutes on the reason and the situation. Report exceedances to the regional aviation office and keep the records for two years"],
["United States","No more than 3 hours domestic or 4 hours international (with safety exceptions). Food and water within 2 hours, working lavatories, and medical attention if needed"],
["EU","No specific tarmac limit, but compensation and assistance rules apply to delays overall"],
["Japan","No single statutory limit; airlines apply their own standards"]]},
{t:"note",x:"* Exceptions apply, for example where the captain judges that staying out is necessary for safety or security, or where the authorities judge that returning to the gate would seriously disrupt airport operations. Check the current rules. ★"}]},
{h:"When passengers are let off (example; differs by country and airline)",blocks:[{t:"table",cols:["Waiting time","What happens"],rows:[
["Up to the airline’s own limit (for example 2–3 hours)","Passengers normally stay on board; some airlines let them move between the aircraft and a waiting area"],
["Before the national limit","Passengers are normally disembarked before the legal limit is reached (some countries set 3 hours domestic and 4 hours international)"]]}]},
{h:"What the ground provides",blocks:[{t:"check",items:[
{name:"Information",x:"Keep in contact with operations and the captain and pass the cause and outlook to the cabin, so updates can continue at the agreed interval."},
{name:"Food and water",x:"If what is on board runs short, send out more water and snacks."},
{name:"Lavatories and air conditioning",x:"Service the lavatories and arrange ground power and an air conditioning unit."},
{name:"Medical",x:"Look after anyone unwell and have medical help standing by."},
{name:"Getting back to a gate",x:"Secure a stand and a bridge, steps or buses, and the staff. Check the immigration and security handling for disembarking."},
{name:"Passengers who get off",x:"Where they wait, how they reboard, and what happens to their bags."}]},
{t:"point",warn:true,x:"Handling a long tarmac delay needs people and equipment. The rules also require you to have the resources to carry out your contingency plan. Decide in advance how you will staff a night or a day of bad weather."}]},
{h:"Reporting and records",blocks:[{t:"rows",items:[
{name:"What to record",x:"Time the door closed, the length of the wait, the cause, what was done for passengers (times of announcements, what was provided, whether they were disembarked), and the outcome."},
{name:"Reporting",x:"Where a limit is exceeded, report to the authority (in Korea the regional aviation office, in the United States the Department of Transportation)."},
{name:"Retention",x:"Keep the records for the required period, for example two years."}]}]}],
voice:"[Interview to be added] Supporting the aircraft from the ground during a long wait on a snowy day.",
terms:[["Tarmac Delay","ターマックディレイ","기내 장시간 대기"],["Movement Area","移動地域","이동지역"],["Ground Power Unit (GPU)","地上電源","지상 전원"],["Pre-conditioned Air (PCA)","空調車","냉난방 차량"],["Contingency Plan","非常計画","비상 계획"],["Regional Office of Aviation","地方航空庁","지방항공청"]],
quiz:[{q:"In Korea, what is the limit for an international tarmac delay (exceptions aside)?",opts:["2 hours","3 hours","4 hours","6 hours"],a:2,exp:"Three hours domestic, four hours international."},
{q:"How often must passengers be updated under that rule?",opts:["Every 5 minutes","Every 30 minutes","Every hour","No updates needed"],a:1,exp:"Every 30 minutes, with the reason and the situation."},
{q:"In the airline example, what happens beyond two hours?",opts:["Passengers are normally disembarked","They normally stay on board","Let them choose","Nothing"],a:0,exp:"Beyond two hours, passengers are normally taken off."}],
next:"5-8 Irregular operations casebook: practising judgment"});
})(window.ARTS);
