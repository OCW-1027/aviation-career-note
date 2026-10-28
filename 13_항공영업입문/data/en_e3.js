/* 航空営業入門 1-3・2-3・4-3 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("1-3",{title:"Redefining the Market: OTAs Take the Lead, and “Packages” Become Independent Travel",hl:"redefining the market",subtitle:"From agency counters to OTAs, metasearch and apps. Even when it is sold as a “package”, what customers buy is a trip they put together themselves",
lead:["How people buy overseas travel has changed significantly over the past ten years. Customers compare fares on their phones, book with online travel agencies (OTAs) or airline websites, and make changes themselves. In Japan much is still sold under the name “package”, but what is inside is mostly independent travel built from flights and hotels of the customer’s choosing.","This lesson looks at what has changed, the features of the Japanese market, the types of OTA, and how the airline sales role is being redefined."],
sections:[
{h:"What has changed",blocks:[{t:"fig",id:"sls_shift",cap:"Figure: how the market changed (then → now)."},{t:"table",cols:["","Before","Now"],rows:[
["Where people buy","Agency counters and phone","OTAs, airline websites and apps, agencies’ online stores"],
["Product","Escorted tours with fixed itineraries","Flights plus hotels chosen freely (free-plan and dynamic packages)"],
["Comparison","Brochures","Metasearch, reviews, social media"],
["Changes and refunds","At the counter","Online, by the customer"],
["Information","Agency staff","Social media, video, reviews"]]}]},
{h:"Features of the Japanese market",blocks:[{t:"rows",items:[
{name:"Independent travel called a “package”",x:"Agency and OTA products may be called packages, but customers mostly choose their own flights and hotels. To the airline, bookings arrive as many individual customers rather than as groups."},
{name:"Where groups remain",x:"School trips, incentive travel, study tours and escorted tours for older travellers still rely heavily on agencies (3-1)."},
{name:"Short-haul routes",x:"Short routes such as Japan–Korea attract short stays, repeat visits and younger travellers, a natural fit for OTAs, direct sales and LCCs (1-2)."}]}]},
{h:"OTAs and related services (examples)",blocks:[{t:"table",cols:["Type","What it does","Examples"],rows:[
["Japanese OTAs and agencies’ online stores","Sell flights, hotels and dynamic packages","Major agency websites, Rakuten Travel and others"],
["Global OTAs","Sell flights and hotels worldwide","Expedia, Trip.com, Booking.com and others"],
["Metasearch","Compare prices across sites and send customers on to book","Skyscanner, Google Flights and others"],
["Airline direct sales","Own website, app and loyalty programme","Each airline’s official site"]]},
{t:"note",x:"* Examples only, not a ranking or recommendation. ★"}]},
{h:"Redefining the sales role",blocks:[{t:"table",cols:["Sales before","Sales from now on"],rows:[
["Visiting agencies to sell seats","Designing the whole channel mix: direct, OTAs and agencies"],
["Handing out seat blocks","Allocating inventory and fares by channel performance data"],
["Paper brochures","Digital advertising, social media, video, influencers"],
["Chasing sales volume","Tracking revenue, ancillary revenue and customer (member) data"],
["Leaving fares to head office","Feeding market changes (competitors, events, exchange rates) back to head office quickly (4-2)"]]},
{t:"point",x:"Agencies are not obsolete: they still matter for groups, MICE, older travellers and complex itineraries. The key is to rebuild, market by market, which channel sells what to whom."}]},
{h:"What the station does",blocks:[{t:"check",items:[
{name:"Results by channel",x:"Review bookings and revenue by direct, OTA and agency each month (include them in the Course 1 lesson 6-9 monthly report)."},
{name:"How you appear on OTAs",x:"Check that fares, baggage allowances, photos and descriptions display correctly on the main OTAs and metasearch."},
{name:"Strengthening direct sales",x:"Are membership, the app, the Japanese-language site and payment methods right for Japanese customers?"},
{name:"Responding to reviews",x:"Turn common complaints (baggage, delay information) into improvements on the ground."}]}]}],
voice:"Even when it is called a package, the content is often independent travel with flights and hotels chosen separately. Ask agencies who is buying and in what combination.",
terms:[["Online Travel Agency (OTA)","オンライン旅行会社","온라인 여행사"],["Metasearch","メタサーチ","메타서치"],["Dynamic Package","ダイナミックパッケージ","다이내믹 패키지"],["Direct Sales","直販","직판"],["Free Independent Travel (FIT)","個人旅行","개별 여행"],["Distribution Channel","販売チャネル","판매 채널"]],
quiz:[{q:"What is mostly inside products sold as “packages” in Japan today?",opts:["Escorted group tours","Independent trips with flights and hotels chosen freely","Flights only","Hotels only"],a:1,exp:"Free-plan and dynamic packages dominate."},
{q:"Which service compares prices across sites and sends customers on to book?",opts:["GDS","Metasearch","BSP","DCS"],a:1,exp:"Skyscanner, for example."},
{q:"What should sales track from now on?",opts:["Volume only","Revenue, ancillary revenue and customer data","Brochure print runs","Number of visits only"],a:1,exp:"Look at revenue and customers across all channels."}],
next:"2-1 Indirect and direct sales"});
set("2-3",{title:"NDC and APIs: The Technology Changing How Tickets Are Sold",hl:"NDC",subtitle:"From filing fares for the GDS to calculate, to airlines building an offer on the spot and returning it — and what that means for agencies and stations",
lead:["Lesson 2-2 introduced GDS, BSP and NDC as the infrastructure of sales. Here we look at NDC in more depth. NDC is IATA’s standard for connecting airline and seller systems through APIs, so that the airline can deliver not just a fare but seats, bags and bundles as a single offer.","This lesson explains what an API is, how NDC differs from the traditional model, where the industry stands, and the effect on agencies and stations."],
deepLabel:"In depth: NDC in 2026 — Japan and Korea",
deep:[{"h": "The road to offers and orders", "blocks": [{"t": "p", "x": "IATA’s next step after NDC is ‘Offers and Orders’. The aim is to bring the information in the PNR, the e-ticket and the EMD together into a single order record of reference."}, {"t": "table", "cols": ["Period (IATA roadmap)", "What happens"], "rows": [["2024–25", "Set-up"], ["2026–27", "First airlines go live"], ["2028–29", "Mainstream at leading airlines"], ["2030 onwards", "Industrialisation begins"]]}, {"t": "note", "x": "* There is no cut-over date; legacy systems will run alongside for a long time. No year has been fixed for retiring tickets and EMDs (IATA industry deployment roadmap). ★"}, {"t": "rows", "items": [{"name": "NDC certification", "x": "The old Level 1–4 certification has ended, replaced by registration in the Airline Retailing Maturity (ARM) index"}, {"name": "Settlement with Orders (SwO)", "x": "BSP settles on the basis of orders. First live use in April 2020"}]}]}, {"h": "Japan: NDC through the GDSs takes off", "blocks": [{"t": "table", "cols": ["Date", "What happened"], "rows": [["30 October 2025", "ANA launched NDC content through Sabre (SabreMosaic) in more than 40 countries (shopping, booking, changes and more)"], ["18 December 2025", "ANA launched NDC through Travelport in 40 markets, including paid advance seat selection"], ["1 October 2026", "JAL began selling international NDC fares through Amadeus (in Japan; elsewhere from 13 October, covering 26 countries and regions worldwide)"]]}, {"t": "p", "x": "ANA requires sellers using NDC to sign a basic NDC connection agreement (ANA distribution policy). Stations can help agencies work out which route to use (GDS NDC, an aggregator or a direct API) and whether a contract is needed. ★"}]}, {"h": "Korea: the merger and agency connections", "blocks": [{"t": "rows", "items": [{"name": "Korean Air", "x": "Signed a contract to implement NDC on Accelya’s FLX platform in February 2024. Check official announcements for the commercial launch date ★"}, {"name": "Asiana merger", "x": "Absorption merger planned for 17 December 2026 (board approval May 2026). Check separate announcements for the timing of the reservation and ticketing system integration ★"}, {"name": "Travel agencies", "x": "Tourvis (Tidesquare) connected directly to Air France-KLM via NDC in June 2024. Large platforms use NDC and direct APIs to automate refunds"}]}]}, {"h": "Distribution costs differ by channel", "blocks": [{"t": "table", "cols": ["Lufthansa Group example (yen amounts for journeys starting in Japan)", "Charge per ticket"], "rows": [["GDS (legacy)", "3,500–4,300 yen (Amadeus and Infini 3,500; Sabre 4,200; Travelport 4,300)"], ["NDC public model", "1,500 yen"], ["Lufthansa NDC API and own website", "None"]]}, {"t": "note", "x": "* Guideline v7.0, valid from 5 May 2026. The fixed yen amounts apply when the journey’s point of origin is Japan; otherwise the euro amount is converted at issue. Direct sales and bilateral NDC are exempt. Amounts are revised. ★"}, {"t": "p", "x": "Air France-KLM is also raising GDS charges in stages in the French market. American Airlines, by contrast, changed course in 2024, saying it had moved too fast on NDC (it dropped limits on mileage earning by booking channel)."}, {"t": "point", "x": "Charge differences change which channel agencies use. Stations should be able to explain on one page how fares, ancillaries and change procedures differ by channel."}]}, {"h": "The GDS side", "blocks": [{"t": "rows", "items": [{"name": "Amadeus", "x": "35 airlines live with NDC (end of 2025, up from 4 in 2022)"}, {"name": "Sabre", "x": "42 NDC airlines in SabreMosaic (January 2026)"}, {"name": "Share", "x": "NDC expected to stay in the teens as a share of GDS bookings for now (Amadeus executives, March 2025)"}]}, {"t": "note", "x": "* Sources: IATA (industry deployment roadmap presentation; ONE Order and NDC fact sheets 2026-06); JAL (2026-09-24), Sabre (2025-10-30) and Travelport (2025-12-18) releases; ANA distribution policy; Lufthansa Group DCC guideline (v7.0, from 2026-05-05); Amadeus Global Report 2025; trade press. Checked 2026-10-16. ★"}]}],
sections:[
{h:"First, the word API",blocks:[{t:"fig",id:"sls_ndc",cap:"Figure: traditional GDS distribution versus NDC."},{t:"rows",items:[
{name:"API (application programming interface)",x:"A defined doorway through which systems exchange information. NDC lets airlines connect directly with sellers through APIs."},
{name:"Careful: the other API",x:"This is not the API (advance passenger information) used at borders (Course 18, lesson 4-2). In sales and distribution, API almost always means a system interface."}]}]},
{h:"Traditional distribution versus NDC",blocks:[{t:"table",cols:["","Traditional (GDS, EDIFACT)","NDC"],rows:[
["How fares appear","Fares are filed and the GDS calculates and displays them","The airline builds an offer on the spot and returns it via API"],
["Ancillaries","Limited; bags and seats handled separately","Seats, bags, meals and bundles offered together"],
["Display","A list of prices; product differences are hard to see","Photos, descriptions and benefits show what makes products different"],
["Records","Booking record (PNR), e-ticket and EMD","Eventually a single order record (ONE Order)"],
["Connection","Through the GDS","Direct airline APIs, aggregators, or GDS NDC capability"]]}]},
{h:"Where the industry stands (indicative)",blocks:[{t:"table",cols:["When","What"],rows:[
["Around 2012","IATA starts the NDC programme"],
["2015","Lufthansa Group becomes the first to add a charge on GDS bookings; other major carriers follow"],
["2023","About 34 million NDC bookings worldwide, around 2.3% of all tickets (IATA)"],
["2025","One study finds about 88% of indirect sales still on traditional GDS technology: the transition is under way"],
["2030","IATA’s aspiration of “100% Offers and Orders” (meaning full standard capabilities available, not that everything will have moved)"]]},
{t:"note",x:"* Figures are as published and are updated in newer reports. Check each airline’s own announcements for its NDC status and charges. ★"}]},
{h:"Effects on agencies and the station",blocks:[{t:"check",items:[
{name:"Fares and products only on NDC",x:"If bundles or benefits appear only through NDC, GDS-only agencies lose out."},
{name:"GDS booking charges",x:"Some airlines charge for GDS bookings; explain this to agencies early."},
{name:"Agency systems",x:"Using NDC needs an aggregator or GDS NDC capability; the station should be able to point agencies to connection options."},
{name:"Changes and refunds",x:"NDC bookings may be changed or refunded differently; prepare briefings and procedures for agencies."},
{name:"At the airport",x:"NDC and direct bookings may look different on airport screens; share how the systems work with front-line staff."}]}]},
{h:"APIs spreading further",blocks:[{t:"rows",items:[
{name:"OTAs and metasearch",x:"Airlines supply fares and availability directly via API, and sell bags and seats as well."},
{name:"Corporate travel",x:"APIs link to travel management companies (TMCs) and corporate systems, applying corporate fares and policies."},
{name:"Disruption notices",x:"Operational changes are pushed to sellers via API, speeding up customer contact and rebooking (Course 1, lesson 5-8)."}]},
{t:"point",x:"NDC and APIs let the airline decide where, what and how it sells. The station should know how Japanese agencies and OTAs are connected, and help them through the transition."}]}],
voice:"When explaining a move to NDC, start with how the agency’s work will change rather than the technology. Ticketing screens and settlement are their first concern.",
terms:[["New Distribution Capability (NDC)","NDC（新流通規格）","NDC(신유통 표준)"],["Application Programming Interface (API)","アプリケーション・プログラミング・インターフェース","애플리케이션 프로그래밍 인터페이스"],["Offers and Orders","オファーとオーダー","오퍼와 오더"],["ONE Order","ワンオーダー","원 오더"],["Aggregator","アグリゲーター","애그리게이터"],["GDS Surcharge / Distribution Cost Charge","GDSの追加料金","GDS 추가 요금"]],
quiz:[{q:"Which best describes NDC?",opts:["An airport security rule","IATA’s standard for connecting airlines and sellers via API to deliver offers","A way of filing fares only","Border information"],a:1,exp:"It can include ancillaries as well as fares."},
{q:"Who first added a charge on GDS bookings?",opts:["Lufthansa Group (2015)","IATA (2000)","ANA (2020)","No one has"],a:0,exp:"Other major carriers followed."},
{q:"What does “API” usually mean in a sales conversation?",opts:["Advance passenger information","A doorway for systems to exchange information","An airport code","A fare type"],a:1,exp:"Not the border API (advance passenger information)."}],
next:"3-1 Building relationships with agencies, and seat blocks"});
set("4-3",{title:"Types of Fare: Normal, PEX and IT Fares, and Japan’s IT Fares (GV1)",hl:"fare types",subtitle:"Who may sell what, combined with what. Why IT fares in Japanese practice take the form of group fares, and why GV1 is used",
lead:["The same flight and seat can be sold under many fares. Not knowing which fare can be sold by whom, and on what conditions, leads to rule breaches and ADMs (debit memos) in dealings with agencies.","This lesson covers the main categories of international fares, the difference between PEX and IT fares, and a feature of Japanese practice: IT fares set as group fares (GV), with GV1 applying from one passenger."],
sections:[
{h:"Main categories of fare",blocks:[{t:"fig",id:"sls_pexit",cap:"Figure: PEX fares and IT fares."},{t:"table",cols:["Type","What it is","Main sellers"],rows:[
["Normal fare","Highly flexible for changes and refunds","Airlines and agencies"],
["PEX (special) fare","A discounted fare set by the airline, with booking and ticketing deadlines and change/refund conditions; can be sold to individuals as a ticket alone","Airline direct, agencies, OTAs"],
["IT (inclusive tour) fare","Sold by agencies as part of a travel product combined with hotels or other ground arrangements; cannot be sold as a ticket alone","Agencies (packages and dynamic packages)"],
["Group fare","For a minimum number of passengers travelling together","Agencies (groups)"]]}]},
{h:"IT fares in Japanese practice (example)",blocks:[{t:"rows",items:[
{name:"Set as group fares",x:"In Japan, IT fares are often set in the form of group fares (GV: group inclusive tour)."},
{name:"GV1",x:"Group fares normally have a minimum party size, but “GV1”, applicable from one passenger, is widely used — in practice for individual travellers."},
{name:"Same booking classes as individual fares",x:"They often use the same booking classes as individual fares; the seat itself is no different."},
{name:"The difference: ticketing time limit",x:"The main difference is a longer ticketing time limit (TL). Agencies can hold seats, then ticket once hotels are arranged and the customer has paid."}]},
{t:"note",x:"* A general example of practice with Japanese agencies. Fare names, conditions and deadlines differ by airline, route and season; always check each airline’s fare rules. ★"}]},
{h:"PEX versus IT",blocks:[{t:"table",cols:["","PEX fare","IT fare (GV1 etc. in Japan)"],rows:[
["Who sells","Airlines, agencies, OTAs","Agencies (as a travel product)"],
["Combination","Can be sold as a ticket alone","Must be combined with ground arrangements"],
["Price the customer sees","Shown as the ticket price","Included in the package price"],
["Ticketing deadline","Often relatively short","Often longer (flexibility for the agency)"],
["Market","Independent travel via direct sales and OTAs","Independent travel via packages and dynamic packages (1-3)"]]}]},
{h:"Fare rules to watch",blocks:[{t:"check",items:[
{name:"Do not sell IT fares as tickets alone",x:"Selling without ground arrangements breaks the fare rules and is subject to ADMs from the airline (3-2)."},
{name:"Manage ticketing deadlines",x:"Bookings are cancelled automatically when the deadline passes; agree how agencies manage deadlines."},
{name:"Combination rules",x:"Check what may be combined on return and multi-sector journeys."},
{name:"Changes and refunds",x:"Conditions differ by fare; share them so that what customers are told matches what happens at the airport."}]},
{t:"point",x:"A fare is not just a price but a set of rules about who may sell it, with what and by when. Station sales staff sit between Japanese agency practice (GV1, long deadlines) and head office fare rules, making sure the two match."}]}],
voice:"For IT fares, agree clearly with agencies at the outset what must be bundled. Vague conditions later turn into ADMs and disputes.",
terms:[["Published Excursion Fare (PEX)","正規割引運賃（PEX）","PEX 운임"],["Inclusive Tour Fare (IT)","包括旅行運賃","포괄 여행 운임"],["Group Inclusive Tour Fare (GV)","団体包括旅行運賃（GV）","단체 포괄 여행 운임(GV)"],["Ticketing Time Limit (TL)","発券期限","발권 기한"],["Booking Class (RBD)","予約クラス","예약 클래스"],["Fare Rules","運賃規則","운임 규칙"]],
quiz:[{q:"Which fare cannot be sold as a ticket alone?",opts:["Normal fare","PEX fare","IT fare","All can"],a:2,exp:"It must be combined with hotels or other ground arrangements."},
{q:"In Japanese practice, which group-fare form applies from one passenger?",opts:["GV1","GV10","PEX1","IT0"],a:0,exp:"In practice it is used for individual travellers."},
{q:"How do Japanese IT fares (e.g. GV1) mainly differ from individual fares?",opts:["Different seats","Always a different booking class","Often a longer ticketing time limit","Different meals"],a:2,exp:"Agencies can wait for arrangements before ticketing."}],
next:"5-1 Launch publicity and press briefings"});
})(window.ARTS);
