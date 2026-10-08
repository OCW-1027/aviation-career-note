/* 航空営業 Part 7 — English version (7-5〜7-8) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("7-5",{title:"Networks and Bid Prices: Connecting Passengers and Multi-night Guests",hl:"bid prices",subtitle:"Some bookings look good on one leg but lose money across the network. Using each leg’s seat value, the bid price, to accept or reject",
lead:["Lesson 7-3 looked at one flight. In reality, a passenger flying Fukuoka–Seoul–Bangkok competes for the same seat as one flying only Seoul–Bangkok. In a hotel, a one-night Saturday guest competes with a Friday-to-Sunday guest for the same Saturday room.","This lesson covers network-wide acceptance decisions, the bid price that expresses each leg’s seat value, and why a station’s market knowledge improves these decisions."],
sections:[
{h:"Leg-based versus origin–destination control",blocks:[{t:"table",cols:["","Leg-based","Origin–destination (O&D)"],rows:[
["Looks at","Fare classes on one flight","The fare for the whole itinerary"],
["Strength","Simple","Raises revenue for carriers with many connections"],
["Weakness","High-value long itineraries can be displaced by short local traffic","Harder forecasting and data management"],
["Suits","Mainly point-to-point carriers","Large hub-and-spoke networks"]]}]},
{h:"Deciding with bid prices",blocks:[{t:"p",x:"A bid price is the revenue expected to be lost by selling the last seat on a leg. Accept a booking if its fare is at least the sum of the bid prices of the legs it uses; otherwise reject it."},
{t:"table",cols:["Leg (practice)","Bid price"],rows:[["Fukuoka → Seoul","¥18,000"],["Seoul → Bangkok","¥45,000 (busy)"]]},
{t:"table",cols:["Booking","Fare","Sum of bid prices","Decision"],rows:[
["Seoul → Bangkok only","¥48,000","¥45,000","Accept (48,000 ≥ 45,000)"],
["Fukuoka → Seoul → Bangkok","¥55,000","¥63,000","Reject (a higher fare, but it uses the busy leg too cheaply)"],
["Fukuoka → Seoul → Bangkok","¥70,000","¥63,000","Accept"],
["Fukuoka → Seoul only","¥20,000","¥18,000","Accept"]]},
{t:"point",x:"A connecting booking can look attractive on total fare yet use a seat on a busy leg too cheaply. The bid price turns this displacement cost into a number."}]},
{h:"Hotel lengths of stay",blocks:[{t:"table",cols:["Night (practice)","Bid price"],rows:[["Friday","¥8,000"],["Saturday (nearly full)","¥30,000"],["Sunday","¥5,000"]]},
{t:"table",cols:["Request","Price","Sum of bid prices","Decision"],rows:[
["Fri–Sun, 3 nights at ¥12,000","¥36,000","¥43,000","Reject (or offer different conditions)"],
["Fri–Sat, 2 nights at ¥20,000","¥40,000","¥38,000","Accept"],
["Saturday only","¥32,000","¥30,000","Accept"]]},
{t:"note",x:"* Instead of rejecting the three-night stay, a hotel can set conditions such as “minimum two nights including Saturday, from ¥X” (length-of-stay rules)."}]},
{h:"Market differences",blocks:[{t:"check",items:[
{name:"Point of sale",x:"Japan-originating and Korea-originating demand peak at different times and pay different fares; manage fares and inventory by point of sale."},
{name:"Currency",x:"Yen–won movements change where it pays to sell."},
{name:"Travel agency groups",x:"Large groups use many seats on busy legs; compare with bid prices first (group quotes, 7-6)."},
{name:"The station’s role",x:"Reporting Japanese holidays, events and competitor moves (4-2) early makes forecasts and bid prices more accurate."}]}]}],
voice:"Bookings for passengers flying from Japan via Seoul to third countries can be squeezed out by Seoul-only bookings. Passing that connecting demand from the station to head office RM can change how the seats are sold.",
terms:[["Bid Price","入札価格（ビッドプライス）","입찰 가격(비드 프라이스)"],["Origin and Destination (O&D)","出発地〜目的地","출발지~목적지"],["Displacement","押し出し","밀어내기(대체 손실)"],["Point of Sale (POS)","販売地","판매지"],["Minimum Length of Stay","最低の連泊","최소 숙박일"]],
quiz:[{q:"A ¥55,000 booking arrives for an itinerary whose bid prices sum to ¥63,000. You…",opts:["Accept","Reject","Must accept","Accept without raising the fare"],a:1,exp:"Accept only if the fare is at least the sum of the itinerary’s bid prices. ¥55,000 < ¥63,000, so accepting would give up expected future revenue worth ¥63,000: reject."},
{q:"What is a bid price?",opts:["Revenue expected to be lost by selling the last seat","The highest fare","Tax","A fee"],a:0,exp:"A bid price is the future revenue expected to be lost by selling the last seat on a leg now — the seat’s value. Sell if the fare exceeds it; refuse if not. It is not the maximum fare or a tax."},
{q:"How can station sales help bid-price accuracy?",opts:["Report local holidays, events and competitor moves early","Arrange meals","Clean the airport","Nothing"],a:0,exp:"Bid prices come from demand forecasts, so the sooner stations report local holidays, events and competitor moves, the more accurate the forecast and the bid price. Local knowledge the head-office system lacks is exactly what stations can add."}],
next:"7-6 Dynamic pricing and new ways to sell"});
set("7-6",{title:"Dynamic Pricing and New Ways to Sell: From Opening Classes to Moving Prices",hl:"dynamic pricing",subtitle:"From fixed fare ladders to prices that move continuously with demand: NDC offers, ancillary bundles, group quotes, and the rules and trust around price display",
lead:["Traditional RM managed revenue by opening and closing steps on a fixed fare ladder (booking classes). With NDC (2-3), airlines can now build and present their own offers, and prices themselves are moving more finely.","But if customers feel moving prices are unfair, brands lose trust. This lesson covers new pricing approaches, group quotes and the Korean and Japanese rules on price display."],
sections:[
{h:"How pricing is changing",blocks:[{t:"table",cols:["","Traditional","Emerging"],rows:[
["Fares","Choose from fixed steps (classes)","Fine-grained prices that move with demand (continuous pricing)"],
["Distribution","GDS shows fare tables and availability separately","Airlines build and present offers through NDC"],
["Content","Fare, then ancillaries","Fare families, ancillaries and seats bundled (4-1, 4-2)"],
["By customer","Mostly the same","Offers vary by membership or trip purpose (beware of going too far)"]]}]},
{h:"Japanese examples",blocks:[{t:"table",cols:["Case","What changed","Aim"],rows:[
["JAL domestic (flights from 12 April 2023)","Nine fares merged into three: flexible until the day, until the day before, and 28 days ahead, with prices varying by demand","Simplicity and demand-based prices"],
["Tokyo Disney Resort (from 20 March 2021)","Variable ticket prices by date","Evening out crowding"]]},
{t:"point",x:"Moving prices is not only about charging more. Shifting customers from busy days to quiet ones smooths crowding and can raise both satisfaction and revenue."}]},
{h:"Group quotes",blocks:[{t:"rows",items:[
{name:"Compare displacement",x:"Accepting a group reduces seats for individuals. Check that the group fare exceeds the displaced individual revenue (bid prices, 7-5)."},
{name:"Final numbers",x:"Groups shrink and cancel; estimate final numbers from past results."},
{name:"Release dates",x:"Set release dates and utilisation commitments for travel agency blocks (3-1) so unused seats return to sale."},
{name:"Ancillary revenue",x:"Include the group’s baggage, seat and on-board sales in the decision."}]}]},
{h:"Price display and trust",blocks:[{t:"table",cols:["","Korea","Japan"],rows:[
["Total price","Aviation Business Act Art. 62(5): airlines, GSAs and travel agencies must clearly provide the total the customer actually pays, including fares and charges; the ministry inspects and publishes results","Consumption tax total-price display: prices shown to consumers must include tax (mandatory from 1 April 2021)"],
["Misleading display","(Act on Fair Labeling and Advertising, etc.)","Act against Unjustifiable Premiums and Misleading Representations: bans representations that mislead customers into thinking terms are much better than they are, and unfair reference-price displays"]]},
{t:"check",items:[
{name:"The first price shown",x:"Show the amount to be paid, including fuel surcharges, airport charges and fees, from the start."},
{name:"Explaining variation",x:"Explain simply why prices differ by date (crowding, booking time)."},
{name:"Disasters and emergencies",x:"Raising prices during disasters or major disruption draws strong criticism; set caps or freeze policies in advance."},
{name:"Personalised prices",x:"Take particular care with personal data and fairness when prices vary by individual."}]},
{t:"note",x:"* Which display rules apply depends on the product and sales method. Check current laws and regulator guidance for real advertising and sales. ★"}]}],
voice:"When quoting for groups, the fare can change depending on when the quote goes out, so always give agencies a written validity date. Explaining carefully why prices move is the best way to keep their trust.",
terms:[["Dynamic Pricing","ダイナミックプライシング","다이내믹 프라이싱"],["Continuous Pricing","連続的な価格","연속 가격"],["Offer (NDC)","オファー","오퍼"],["All-inclusive Price Display","総額表示","총액 표시"],["Reference Price Display","二重価格表示","이중 가격 표시"]],
quiz:[{q:"What aim was given for Tokyo Disney Resort’s variable pricing?",opts:["Evening out crowding","Reducing visitors","Returning to paper tickets","Adding hotels"],a:0,exp:"Tokyo Disney Resort explained its variable pricing as evening out crowding: higher prices on busy days and lower ones on quiet days spread visits — the same idea as airline RM."},
{q:"What should a group quote compare?",opts:["The group fare and displaced individual revenue","Staff numbers","Airport size","Weather only"],a:0,exp:"A group quote compares the group’s total fare with the individual revenue displaced by giving it those seats (the bid-price sum). If the group fare is lower, a peak-period group should be declined or its terms revisited."},
{q:"What does Korea’s Aviation Business Act Art. 62(5) require?",opts:["Clearly provide the total the customer actually pays","Change fares daily","Keep fares secret","Sell for cash only"],a:0,exp:"Korea’s Aviation Business Act Art. 62(5) requires airlines, GSAs and travel agencies to present clearly the total the customer actually pays (fare plus fuel surcharges and taxes). Even with changing prices, the displayed price is the total."}],
next:"7-7 By the numbers: metrics and RM meetings"});
set("7-7",{title:"By the Numbers: Airline and Hotel Metrics and the RM Meeting",hl:"RM metrics",subtitle:"Load factor, yield and RASK; hotel ADR, RevPAR and GOPPAR; and what a weekly RM meeting looks at and decides",
lead:["RM results cannot be judged by load factor alone or by price alone. The key measure multiplies the two: revenue per unit of capacity offered, RASK for airlines and RevPAR for hotels.","This lesson calculates the main airline and hotel metrics with practice figures and sets out what RM and sales teams review and decide each week."],
sections:[
{h:"Airline metrics (practice: 180 seats, 1,000 km)",blocks:[{t:"table",cols:["Metric","Formula","Calculation","Result"],rows:[
["Load factor (LF)","Passengers ÷ seats","153 ÷ 180","85%"],
["Yield","Passenger revenue ÷ RPK","¥4,590,000 ÷ (153 × 1,000 km)","¥30 per RPK"],
["RASK","Revenue ÷ ASK","¥4,590,000 ÷ (180 × 1,000 km)","¥25.5"],
["CASK","Cost ÷ ASK","¥4,140,000 ÷ 180,000","¥23"],
["Break-even load factor","CASK ÷ yield","23 ÷ 30","About 77%"]]},
{t:"point",x:"RASK = yield × load factor (30 × 0.85 = 25.5). Raising load factor by discounting does not raise RASK if yield falls. RM is about making this product larger."}]},
{h:"Hotel metrics (practice: a 200-room hotel for one day)",blocks:[{t:"table",cols:["Metric","Formula","Calculation","Result"],rows:[
["Occupancy (Occ)","Rooms sold ÷ rooms available","170 ÷ 200","85%"],
["ADR","Room revenue ÷ rooms sold","¥3,400,000 ÷ 170","¥20,000"],
["RevPAR","Room revenue ÷ rooms available (= ADR × Occ)","3,400,000 ÷ 200","¥17,000"],
["TRevPAR","Total revenue (rooms, F&B, etc.) ÷ rooms available","4,500,000 ÷ 200","¥22,500"],
["GOPPAR","Gross operating profit ÷ rooms available","1,400,000 ÷ 200","¥7,000"]]},
{t:"note",x:"* Practice figures. GOPPAR reflects commissions and labour costs, so relying on high-commission OTA channels can lower GOPPAR even at the same RevPAR."}]},
{h:"The weekly RM meeting",blocks:[{t:"table",cols:["Review","Content","Decisions (examples)"],rows:[
["Booking pace","Booking curves against last year and budget (7-4)","Close or open cheaper classes"],
["Pickup outlook","Seats expected to sell before departure","Review overbooking levels"],
["Competition","Rivals’ fares, campaigns and capacity","Match or not"],
["Groups","Enquiries, block utilisation and releases","Accept, reject or propose terms"],
["Events and holidays","Station intelligence","Adjust forecasts"],
["Post-departure review","RASK and spilled demand on flown flights","Refine rules and forecasts"]]},
{t:"check",items:[
{name:"What station sales should bring",x:"Travel agency sales trends, group prospects, Japanese events, competitor discounts, and the story behind the numbers."},
{name:"After the meeting",x:"Turn decisions into travel agency notices, campaigns and booking practices."}]}]}],
voice:"Reporting only load factor at the weekly meeting tends to get little reaction from head office. Showing revenue per seat side by side with the previous year makes the discussion far more concrete.",
terms:[["Load Factor (LF)","搭乗率","탑승률"],["RASK (Revenue per Available Seat Kilometre)","座席キロあたりの収入","좌석킬로미터당 수입"],["ADR (Average Daily Rate)","平均客室単価","객실 평균 단가"],["RevPAR","販売可能客室あたりの売上","판매 가능 객실당 매출"],["GOPPAR","販売可能客室あたりの営業総利益","판매 가능 객실당 영업총이익"]],
quiz:[{q:"With yield ¥30 and load factor 85%, RASK is…",opts:["¥25.5","¥30","¥35.3","¥85"],a:0,exp:"RASK (passenger revenue per available seat-km) = yield × load factor = ¥30 × 0.85 = ¥25.5; empty seats make it lower than the yield. ¥85 comes from multiplying by the percentage as a whole number."},
{q:"With ADR ¥20,000 and occupancy 85%, RevPAR is…",opts:["¥17,000","¥20,000","¥23,529","¥85,000"],a:0,exp:"RevPAR (revenue per available room) = ADR × occupancy = ¥20,000 × 0.85 = ¥17,000 — the hotel equivalent of RASK, lower than ADR by the empty rooms. ¥23,529 comes from dividing instead of multiplying."},
{q:"The break-even load factor formula is…",opts:["CASK ÷ yield","Yield ÷ CASK","RASK × CASK","Seats ÷ passengers"],a:0,exp:"Break-even load factor = CASK ÷ yield: the share of seats that must be filled for passenger revenue to cover costs. For example, CASK ¥23 and yield ¥30 give 23 ÷ 30 ≈ 77%."}],
next:"7-8 Applying RM to any business"});
set("7-8",{title:"Applying RM to Any Business: Hotels, Travel Agencies, Others, and Investment Reviews",hl:"applying RM",subtitle:"Six questions for applying airline-born RM to hotels, travel agencies, restaurants, cargo and more, and the questions that reveal how much RM could add when reviewing a business or investment",
lead:["RM is not an airline specialism but a way of thinking for any business with fixed capacity, perishable inventory and fluctuating demand. The first step is to put into words what your inventory is and how customers can be segmented.","This lesson gives six questions for applying RM anywhere, how hotels, travel agencies and other businesses use it, and what to check from an RM perspective when reviewing a business or investment."],
sections:[
{h:"Six questions for applying RM",blocks:[{t:"rows",items:[
{name:"1 What is the inventory?",x:"Seats × flights, rooms × nights, tables × time slots, cars × days: what you sell and in what unit."},
{name:"2 When does it perish?",x:"Departure, the day itself, the end of a booking window."},
{name:"3 How can it be segmented?",x:"Booking time, flexibility, party size, channel, membership: conditions reflecting willingness to pay (7-2)."},
{name:"4 How will demand be forecast?",x:"Past booking patterns, day and season, events; if there are no records, start recording (7-4)."},
{name:"5 What can be adjusted?",x:"Price, sales limits, conditions (minimum stay or party size), overbooking."},
{name:"6 How will it be measured?",x:"Revenue per unit of capacity (RASK, RevPAR) and profit-based measures (GOPPAR) (7-7)."}]}]},
{h:"Hotels",blocks:[{t:"check",items:[
{name:"Channel mix",x:"Own website, OTAs, travel agencies, corporate; on high-demand days favour lower-commission channels."},
{name:"Rate plans and conditions",x:"Use non-refundable, early-booking and length-of-stay rules (7-5) to bridge strong and weak days."},
{name:"Groups and meetings",x:"Weigh displaced individual bookings against banqueting and meeting-room revenue."},
{name:"Overbooking",x:"Set procedures and costs for walking guests to other hotels when overbooked."}]}]},
{h:"Travel agencies",blocks:[{t:"check",items:[
{name:"Contracted inventory",x:"Holding airline blocks (3-1) or hotel rooms carries the risk of unsold stock; plan to sell out before release dates."},
{name:"Early and late pricing",x:"Lock in demand with early-booking discounts, then reprice close in according to remaining stock."},
{name:"Package pricing",x:"For dynamic packages of flights and hotels, set the total price from the value of each component."},
{name:"Utilisation",x:"Check block utilisation weekly and release early to keep airline trust."}]}]},
{h:"Other businesses",blocks:[{t:"table",cols:["Business","Inventory","How RM is used (examples)"],rows:[
["Restaurants","Tables × time slots","Set menus and fixed seatings at peak times, discounts off-peak"],
["Air cargo","Weight and volume × flights","Balancing long-term allotments and spot sales; managing both weight and volume"],
["Parking and meeting rooms","Slots × time","Time and day pricing, advance-booking discounts"],
["Sport and concerts","Seats × events","Seat categories, date-based prices, resale considerations"],
["Car rental","Cars × days","Car type and rental length combinations, return locations"]]}]},
{h:"Questions when reviewing a business or investment",blocks:[{t:"table",cols:["Check","Example questions","What it reveals"],rows:[
["Cost structure","Share of fixed costs? Cost of selling one more unit?","The larger the fixed costs and the smaller the marginal cost, the greater RM’s effect"],
["Demand swings","Differences by day and season? Highest and lowest occupancy?","Larger swings leave more room for price and inventory management"],
["Pricing process","Who sets prices, based on what, and how often?","Gut-feel pricing leaves room for systematic gains"],
["Data","Are booking patterns and turned-away demand recorded?","Whether a forecasting foundation exists"],
["Channels","Share of direct versus OTA or agency sales, commissions","The source of profit differences (GOPPAR, etc.)"],
["Metric trends","Three to five years of RASK, RevPAR and ADR, compared with competitors","Whether growth comes from price or volume"]]},
{t:"point",x:"Splitting revenue growth into price and volume (utilisation) shows a business’s strengths and how much RM could add. This works for any capacity-based business, not just airlines and hotels."}]}],
voice:"When you look at hotels or investment targets outside the airline world, start by asking what the business’s inventory is. Asking how they cut empty rooms or seats tells you a lot about the strength of the management.",
terms:[["Allotment","アロットメント（割り当て枠）","할당(얼롯먼트)"],["Dynamic Packaging","ダイナミックパッケージ","다이내믹 패키지"],["Walk (Hotel)","送客（ウォーク）","다른 호텔 안내(워크)"],["Utilisation Rate","消化率","소화율"],["Fixed Cost","固定費","고정비"]],
quiz:[{q:"What should be put into words first when applying RM?",opts:["What the inventory is and its unit","Staff numbers","Company history","Advertising colours"],a:0,exp:"First put into words what the inventory is and its unit: seats per leg for an airline, room-nights for a hotel, tee-time slots for a golf course. Without the unit, neither forecasting nor allocation is possible."},
{q:"Where does RM tend to have the greatest effect?",opts:["High fixed costs and low marginal cost","High marginal cost","Inventory that can be carried over","Steady demand"],a:0,exp:"The higher the fixed costs and the lower the cost of selling one more unit (marginal cost), the more each filled unit adds straight to profit, so RM has more effect. Businesses that can carry inventory over or have steady demand gain less."},
{q:"What should travel agencies watch with block inventory?",opts:["A plan to sell out before release dates and utilisation tracking","Never releasing","Never repricing","Not contacting the airline"],a:0,exp:"Travel agencies holding block seats should plan to sell out before the release date and track utilisation. Releasing unsold seats early lets the airline sell them elsewhere and builds trust; holding on means empty seats for the airline and losses for the agency."}],
next:"8-1 What sales staff need to know about the airport"});
})(window.ARTS);
