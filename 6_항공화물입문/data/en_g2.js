/* 航空貨物 入門 — English version (Part 2: 上屋の業務) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("2-1",{title:"Acceptance, Weighing and Storage",hl:"acceptance",subtitle:"At the warehouse door, confirm that the paperwork and the freight are the same thing",
lead:["When cargo reaches the airport warehouse, the first step is acceptance: checking that the documents and the freight agree, the pieces, weight and dimensions, the condition of the packing and the labels, and querying anything wrong on the spot.",
"This article covers what acceptance checks, how weight and dimensions are taken, the storage categories, and the problems that come up most."],
sections:[
{h:"What acceptance checks",blocks:[{t:"check",items:[
{name:"Documents against freight",x:"The waybill number, the number of pieces and the commodity."},
{name:"Weight and dimensions",x:"Measure them. If they differ from what was declared, correct it — it affects the rate."},
{name:"Packing",x:"Whether it is intact and fit for air transport. Leaks and odours."},
{name:"Labels",x:"The waybill number label, handling labels (do not stack, this side up) and dangerous goods labels."},
{name:"Security",x:"Whether the shipment is already secure or needs screening (2-3)."}]}]},
{h:"Storage categories (example)",blocks:[{t:"table",cols:["Category","What goes there"],rows:[
["General","Ordinary cargo"],
["Temperature controlled, chilled, frozen","Perishables and pharmaceuticals"],
["Dangerous goods","Segregated by class"],
["Valuables","A locked area"],
["Live animals","A dedicated area"],
["Outsized","Cargo with unusual size or weight"]]}]},
{h:"Common problems",blocks:[{t:"rows",items:[
{name:"Piece count differences",x:"Fewer or more than the documents say, and managing shipments that arrive split."},
{name:"Damage",x:"Where damage is found at acceptance, photograph it, record it on the paperwork and tell the shipper’s side."},
{name:"Late delivery in",x:"It rolls to the next flight. Tell the shipper’s side early."}]},
{t:"point",x:"Acceptance is where everything downstream starts. A discrepancy missed here becomes a large problem at loading, at customs or at the destination."}]}],
voice:"[Interview to be added] A serious problem caught at acceptance.",
terms:[["Acceptance","受け付け","접수(수탁)"],["This Side Up","天地無用","상하 주의"],["Temperature-controlled Storage","定温保管","정온 보관"],["Damage","破損","파손"]],
quiz:[{q:"The weight differs from the declaration. What do you do?",opts:["Leave it","Correct it to the actual figure","Return the shipment","Ignore it"],a:1,exp:"It affects the rate."},
{q:"You find damage at acceptance. What do you do?",opts:["Accept it quietly","Photograph and record it, and tell the shipper’s side","Dispose of it","Hide it"],a:1,exp:"It decides where liability sits later."},
{q:"Where are pharmaceuticals stored?",opts:["General","Temperature controlled or chilled","Dangerous goods","Live animals"],a:1,exp:"They need temperature control."}],
next:"2-2 ULDs and build-up"});

set("2-2",{title:"ULDs and Build-up",hl:"ULDs and build-up",subtitle:"The craft of stacking cargo into the shape of an aircraft",
lead:["Cargo is loaded onto an aircraft in unit load devices (ULDs): containers and pallets. Stacking the cargo onto them is called build-up.",
"This article covers the types of ULD, the basics of build-up, why the load must follow the aircraft’s contour, and how ULDs are managed."],
sections:[
{h:"Types of ULD (examples)",blocks:[{t:"table",cols:["Type","Character"],rows:[
["Container","Box-shaped. Common in passenger bellies for baggage and smaller consignments"],
["Pallet","A flat base. Cargo is stacked on it and secured with a net, for larger or irregular items"],
["Temperature-controlled container","With cooling or heating, for pharmaceuticals and similar"],
["Special ULDs","For live animals, vehicles, long items and so on"]]},
{t:"note",x:"* ULD types are standardised by IATA, and which types fit depends on the aircraft."}]},
{h:"The basics of build-up",blocks:[{t:"check",items:[
{name:"Heavy at the bottom",x:"Heavy and sturdy items low, light and fragile items on top."},
{name:"Follow the contour",x:"Stay within the profile that matches the curve of the fuselage. Anything proud of it cannot be loaded."},
{name:"Weight limits",x:"Respect the maximum weight per ULD and the floor loading limits."},
{name:"Secure it",x:"Nets and straps so nothing moves."},
{name:"Segregate",x:"Keep apart what cannot travel together: incompatible dangerous goods, perishables and chemicals (3-1)."}]}]},
{h:"Managing ULDs",blocks:[{t:"rows",items:[
{name:"Stock control",x:"ULDs are airline assets. Track how many are at each station and move them to where they are short."},
{name:"Damage checks",x:"A damaged ULD cannot be used. Inspect and arrange repair."},
{name:"Tags",x:"Attach the tag showing the ULD number, destination and weight."}]},
{t:"point",x:"Build-up is a puzzle of weight, shape, safety and efficiency. Good build-up puts more cargo on each flight, and that goes straight to the airline’s revenue."}]}],
voice:"[Interview to be added] What the best build-up people did differently.",
terms:[["Unit Load Device (ULD)","ULD","ULD(단위 탑재 용기)"],["Build-up","ビルドアップ","빌드업"],["Contour","輪郭","윤곽(컨투어)"],["Pallet","パレット","팔레트"]],
quiz:[{q:"What is stacking cargo onto a ULD called?",opts:["Build-up","Check-in","Clearance","Weighing"],a:0,exp:"It follows the shape of the aircraft."},
{q:"What is the basic rule of build-up?",opts:["Light items at the bottom","Heavy at the bottom, fragile on top","Shape does not matter","Do not secure it"],a:1,exp:"Contour and weight limits apply too."},
{q:"What happens if a ULD is proud of the contour?",opts:["Nothing","It cannot be loaded","The rate falls","It arrives sooner"],a:1,exp:"It must fit the curve of the fuselage."}],
next:"2-3 Cargo security"});

set("2-3",{title:"Cargo Security",hl:"cargo security",subtitle:"Known consignors and regulated agents form an unbroken chain ★",
lead:["Cargo, like passenger baggage, has to be secured against explosives reaching an aircraft. Screening every shipment at the airport is not practical, so most countries rely on a chain: shippers and transport companies whose security arrangements have been approved keep the cargo secure without a break.",
"This article covers the thinking behind cargo security, an outline of the scheme in Japan, and what to watch on the warehouse floor. It does not describe the security procedures themselves."],
sections:[
{h:"The thinking",blocks:[{t:"ladder",rise:10,steps:[{name:"Shipper",sub:"A shipper whose security is approved"},{name:"Transport",sub:"An approved company stores and carries it"},{name:"Warehouse",sub:"Screening where the chain breaks"},{name:"Loading",sub:"Only secure cargo is loaded"}]},
{t:"p",x:"If the cargo stays secure from shipper to loading without a break, screening at the airport can be reduced or omitted. Where the chain breaks, as with cargo from an unapproved shipper, it is screened at the airport or elsewhere."}]},
{h:"The scheme in Japan",blocks:[{t:"rows",items:[
{name:"Known shippers and regulated agents",x:"Under the national standards, approved shippers and approved transport companies keep the cargo secure. ★"},
{name:"Other countries",x:"Destinations such as the EU and the United States apply their own security requirements."},
{name:"Screening methods",x:"X-ray, explosive trace detection and others, depending on the type of cargo."}]},
{t:"note",x:"* Scheme names and requirements change. Check current official guidance. ★"}]},
{h:"On the floor",blocks:[{t:"check",items:[
{name:"Check the security status",x:"At acceptance, establish whether the shipment is already secure or needs screening."},
{name:"Tamper evidence",x:"Whether the seals and labels on secure cargo are intact."},
{name:"Access control",x:"Keep unauthorised people out of the secure area."},
{name:"Records",x:"Who handled which cargo, and when."}]}]}],
voice:"[Interview to be added] How the cargo security regime changed the flow of work.",
terms:[["Known Consignor","特定荷主","특정 화주"],["Regulated Agent","特定航空貨物利用運送事業者","규제 대리인"],["Secure Supply Chain","保安の連鎖","보안 사슬"],["Tamper Evidence","改ざん防止","변조 방지"]],
quiz:[{q:"What happens when the security chain is broken?",opts:["It loads anyway","It is screened at the airport or elsewhere","Return only","Storage only"],a:1,exp:"An unbroken chain lets screening be reduced or omitted."},
{q:"What do you check on the floor?",opts:["The security status and the seals","The colour of the cargo","The shipper’s hobbies","The weather"],a:0,exp:"Tamper evidence matters too."},
{q:"What may the destination country require?",opts:["Its own security requirements","Particular music","Particular meals","Nothing"],a:0,exp:"The EU and the United States are examples."}],
next:"2-4 Running a bonded warehouse"});

set("2-4",{title:"Running a Bonded Warehouse",hl:"the bonded warehouse",subtitle:"A warehouse under customs control: always able to say what is where, and since when",
lead:["Most airport cargo warehouses are bonded areas licensed by customs. Because they hold cargo before export or import permission, movements and storage must be recorded precisely and be explainable to customs at any moment.",
"This article covers what that control requires, the daily work, the relationship with customs, and the pitfalls."],
sections:[
{h:"What the control requires",blocks:[{t:"table",cols:["Control","What it means"],rows:[
["Receiving and release records","What came in when, and what went out when"],
["Stock position","Which cargo sits in which area, and since when"],
["Segregation","Separating export, import, transfer, cleared and uncleared"],
["Long-stay cargo","Checking and reporting anything held beyond a set period"],
["Access","Controlling who may enter"]]}]},
{h:"The daily work",blocks:[{t:"check",items:[
{name:"Checking arrivals",x:"Reconcile the manifest against the actual cargo and record any overage, shortage or damage."},
{name:"Release",x:"Confirm import permission before releasing to the consignee or the customs broker."},
{name:"Transfer cargo",x:"Move it to the next flight while it stays bonded."},
{name:"Supporting inspections",x:"Bring cargo selected for examination to the designated place."}]}]},
{h:"Pitfalls",blocks:[{t:"rows",items:[
{name:"Releasing before permission",x:"Releasing cargo before import permission is a serious matter. Build a double check into the procedure."},
{name:"Reporting discrepancies",x:"Overages and shortages against the manifest are reported within the set deadline."},
{name:"Keeping records",x:"Retain the records for the required period."}]},
{t:"point",warn:true,x:"Mistakes in bonded control can put the warehouse licence itself at risk. Reconcile the system records against the physical cargo regularly."}]}],
voice:"[Interview to be added] Something in your bonded control that customs praised.",
terms:[["Bonded Warehouse","保税上屋","보세 상옥"],["Receiving / Release","搬入・搬出","반입·반출"],["Overage / Shortage","過不足","과부족"],["Transfer Cargo","乗り継ぎ貨物","환적 화물"]],
quiz:[{q:"What is a serious problem in a bonded warehouse?",opts:["Releasing cargo before import permission","Keeping records","Checking stock","Segregating cargo"],a:0,exp:"Build in a double check."},
{q:"What do you do about a discrepancy against the manifest?",opts:["Ignore it","Report it within the deadline","Hide it","Report it next year"],a:1,exp:"Customs must be told."},
{q:"How is transfer cargo handled?",opts:["Import it then re-export","Keep it bonded and move it to the next flight","Destroy it","Return it"],a:1,exp:"It stays under bond."}],
next:"3-1 Dangerous goods"});
})(window.ARTS);
