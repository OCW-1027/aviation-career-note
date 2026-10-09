/* 数字で読む会社 — English version (Part 2) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("2-1",{title:"Assets, Liabilities and Equity: Why the Two Sides Always Match",hl:"Always Match",subtitle:"The right side says where the money came from, the left what it has become. Two views of the same money are always equal",
lead:["The balance sheet lists what the company holds at the closing instant (assets) on the left, and where that money came from (liabilities and equity) on the right. The two sides always add up to the same amount. There is nothing mysterious about it: they are the same money seen from two directions, where it came from and what it became.","At the taiyaki stall’s month end, the left shows cash of 309,000 yen, a receivable, ingredients and the cart; the right shows the loan, tax payable, capital and retained earnings. Both total 580,000 yen. If they ever differ, a record is wrong somewhere."],
sections:[
{h:"The two sides as blocks",blocks:[{t:"fig",id:"fin_bs_blocks",cap:"The stall’s month-end balance sheet. Both sides are the same height. The top of the right side (liabilities) must be repaid; the bottom (equity) need not be"},
{t:"table",cols:["Category","Meaning","Taiyaki stall"],rows:[
["Assets","What the company holds that will produce money in future","Cash 309,000, receivable 20,000, ingredients 15,000, cart 236,000"],
["Liabilities","What is held on behalf of others and must one day be repaid","Loan 200,000, tax payable 16,000"],
["Equity","What belongs to the shareholders (the owner); no obligation to repay","Capital 300,000, retained earnings 64,000"]]},
{t:"point",x:"Equity = assets − liabilities: what is left after deducting every obligation from everything held. When equity turns negative, the company could not repay its debts even by selling everything."}]},
{h:"Why they always match: follow each transaction",blocks:[{t:"table",cols:["Transaction","Left (assets)","Right (liabilities and equity)","Match"],rows:[
["Owner invests 300,000","Cash +300,000","Capital +300,000","Yes"],
["Borrows 200,000 from the bank","Cash +200,000","Loan +200,000","Yes"],
["Buys the cart for 240,000","Cash −240,000, cart +240,000","(no change)","Yes (a swap within the left)"],
["Sells 240,000 for cash","Cash +240,000","Retained earnings +240,000 (sales)","Yes"],
["Uses 75,000 of ingredients","Ingredients −75,000","Retained earnings −75,000 (cost)","Yes"],
["Pays 50,000 rent","Cash −50,000","Retained earnings −50,000 (cost)","Yes"]]},
{t:"note",x:"* During the month, sales and costs enter the right side as movements in retained earnings. The income statement is simply those movements pulled out into a separate statement (more in Part 4)."}]},
{h:"An airline balance sheet (Vela Air, start of year 1)",blocks:[{t:"table",cols:["Assets (100m yen)","","Liabilities and equity (100m yen)",""],rows:[
["Cash","1,200","Unflown ticket revenue","600"],["Receivables","250","Mileage contract liability","120"],["Inventory (spare parts)","120","Payables","350"],["Other current assets","150","Short-term borrowings","300"],["Aircraft","2,100","Long-term borrowings","1,500"],["Buildings and ground equipment","600","Lease liabilities","500"],["Investments and deposits","800","Maintenance provision","180"],["Deferred tax assets","130","Retirement benefit provision","300"],["Other","650","Other liabilities","230"],["","","Equity (capital 500 + capital surplus 400 + retained earnings 1,020)","1,920"],["Total assets","6,000","Total liabilities and equity","6,000"]]},
{t:"note",x:"* Typically airline items: aircraft (35% of assets), unflown tickets and miles (obligations to passengers not yet carried), maintenance provision (a liability for future maintenance). Part 5 covers these in detail."}]},
{h:"Try it",blocks:[{t:"check",items:[
{name:"Write your own balance sheet",x:"Savings, car and home on the left, loans on the right; the difference is your equity."},
{name:"Add a transaction",x:"If the stall buys 30,000 yen of ingredients on credit at month end, how do the two sides move? Do they still match?"}]}]}],
voice:"When you read a balance sheet, start on the right: whose money is this? An aircraft bought with borrowed money and one bought with earned money are the same asset, but the company behind them has very different strength.",
terms:[["Assets","資産","자산"],["Liabilities","負債","부채"],["Equity (net assets)","純資産","자본(순자산)"],["Negative equity","債務超過","자본 잠식(채무 초과)"],["Balance (assets = liabilities + equity)","貸借一致","대차 일치"]],
quiz:[{q:"What is equity?",opts:["Assets minus liabilities: what belongs to shareholders","Total cash","Total borrowings","Total sales"],a:0,exp:"The net share with no obligation to repay."},
{q:"When the cart is bought for cash, the balance sheet…",opts:["Swaps cash for the cart within assets; the total is unchanged","Grows on both sides","Shows lower equity","Shows lower liabilities"],a:0,exp:"A swap within the left side does not change the total."},
{q:"Can equity equal total assets?",opts:["Yes, if the company has no liabilities","Never","Only when equity is zero","Only in negative equity"],a:0,exp:"With no borrowing, assets = equity. The opposite case, negative equity, is when equity falls below zero."}]});
set("2-2",{title:"Current and Non-current: Will It Turn into Cash within a Year?",hl:"Current and Non-current",subtitle:"Draw the line at one year and the company’s ability to pay soon becomes visible. For airlines, unflown tickets pile up in current liabilities",
lead:["Both assets and liabilities are split into current and non-current by whether they turn into cash (or fall due) within a year. Current assets: cash, receivables, inventory. Non-current: aircraft, buildings, long-term investments. Current liabilities: payables, short-term borrowings, loans due within a year. Non-current: long-term borrowings, lease liabilities.","The split shows whether obligations due within a year (current liabilities) can be met from what becomes cash within a year (current assets). Airlines are unusual in carrying large unflown ticket revenue among current liabilities."],
sections:[
{h:"Drawing the one-year line",blocks:[{t:"fig",id:"fn_curr",cap:"Figure: current and non-current."},{t:"table",cols:["","Current (within one year)","Non-current (beyond one year)"],rows:[
["Assets","Cash, receivables, inventory (parts, materials), prepaid expenses","Aircraft, buildings and equipment, software, investments, deposits, deferred tax assets"],
["Liabilities","Payables, accrued expenses, short-term borrowings, current portion of long-term debt, unflown ticket revenue, tax payable","Long-term borrowings, bonds, lease liabilities, retirement provisions, long-term maintenance provisions"],
["Taiyaki stall","Cash 309,000, receivable 20,000, ingredients 15,000 / loan 200,000 (treated as short-term), tax payable 16,000","Cart 236,000 / none"]]},
{t:"note",x:"* One year is the rule; industries with an operating cycle longer than a year may use the cycle instead. For airlines the one-year rule is fine."}]},
{h:"Comparing current items: the current ratio",blocks:[{t:"rows",items:[
{name:"Current ratio = current assets ÷ current liabilities",x:"Taiyaki stall: 344,000 ÷ 216,000 = 159%. Payments due within a year are covered 1.6 times over."},
{name:"Vela Air, opening",x:"Current assets 1,720 (cash 1,200, receivables 250, inventory 120, other 150) ÷ current liabilities 1,370 (unflown tickets 600, miles 120, payables 350, short-term debt 300) = 126%."},
{name:"Airlines can run on a lower ratio",x:"Unflown ticket revenue is not repaid; it disappears when the flight is flown. No cash leaves, so airlines often operate below 100% without strain. Discount that item when reading."},
{name:"JAL, 31 March 2026",x:"Current assets 1,445.5bn yen, current liabilities 1,002.7bn → current ratio 144%. Contract liabilities (unflown tickets and miles) make up 484.5bn of the current liabilities. ★"}]},
{t:"point",x:"What counts as a normal current ratio differs by industry: lower in retail, higher in manufacturing. For airlines, read it knowing how unflown ticket revenue behaves."}]},
{h:"What non-current assets contain (airlines)",blocks:[{t:"table",cols:["Item","Content","Reading point"],rows:[
["Aircraft","Owned aircraft at cost less depreciation","JAL 1,041.7bn yen, 32.6% of total assets (31 March 2026) ★. Leased aircraft appear differently depending on the standard (2-3, 5-3)"],
["Prepayments for aircraft","Advance payments on aircraft not yet delivered","JAL 115.6bn. Shows the size of the order book ★"],
["Buildings and ground equipment","Hangars, maintenance shops, offices, airport equipment","Terminal buildings belong to airport companies; airlines mostly rent"],
["Software and goodwill","Reservation and operations systems; premium paid on acquisitions","Grows with heavy IT investment"],
["Investments and deposits","Shares in partners, deposits with airports and lessors","Hard to turn into cash; exclude when judging liquidity"]]}]},
{h:"Try it",blocks:[{t:"check",items:[
{name:"Recalculate the current ratio",x:"If the stall buys a second cart (240,000) with a one-year loan, what is the new current ratio?"},
{name:"Think about unflown tickets",x:"Explain, from the way tickets are sold, why the 60.0bn of unflown ticket revenue is a liability that does not drain cash."}]}]}],
voice:"A station budget works the same way. Put next month’s invoices (current liabilities) beside next month’s incoming budget (current assets) and the question ‘can we pay this month?’ answers itself faster.",
terms:[["Current assets","流動資産","유동자산"],["Non-current assets","固定資産（非流動資産）","비유동자산"],["Current liabilities","流動負債","유동부채"],["Non-current liabilities","固定負債（非流動負債）","비유동부채"],["Current ratio","流動比率","유동비율"],["Construction in progress / prepayments for aircraft","建設仮勘定","건설중인자산"]],
quiz:[{q:"The basic test for current versus non-current is…",opts:["Whether it turns into cash (or falls due) within one year","Whether the amount is large","Company policy","The tax office’s instructions"],a:0,exp:"The one-year rule."},
{q:"Unflown ticket revenue is…",opts:["A current liability","A non-current asset","Equity","A current asset"],a:0,exp:"An obligation to carry passengers within a year."},
{q:"The stall’s current ratio (current assets 344,000, current liabilities 216,000) is…",opts:["About 159%","About 63%","About 100%","About 216%"],a:0,exp:"344,000 ÷ 216,000 = 1.59."}]});
set("2-3",{title:"Depreciation: Spreading the Price of Expensive Things over Their Life",hl:"Depreciation",subtitle:"All the cash leaves on purchase day; the cost is spread over the years. How an airline writes down its aircraft changes its profit",
lead:["If the 240,000-yen cart were expensed on the day it was bought, that month would show a huge loss and the cart would be used for free from then on. Months could not be compared. So the cost is spread over the period of use (5 years = 60 months), 4,000 yen a month. That is depreciation.","For airlines, aircraft are the largest item depreciated. How many years, and what residual value, an airline assumes for aircraft costing over 10bn yen each changes annual profit by billions. That is why each company’s accounting policy must be read."],
sections:[
{h:"Depreciation seen through the cart",blocks:[{t:"fig",id:"fin_depreciation",cap:"Book value falls by 4,000 yen a month and the same 4,000 becomes a cost each month. Cash moves only on the purchase day"},
{t:"table",cols:["Point in time","Cash movement","Cost (income statement)","Cart’s book value (balance sheet)"],rows:[
["Purchase day","−240,000","0","240,000"],["End of month 1","0","4,000","236,000"],["End of month 12","0","4,000 (cumulative 48,000)","192,000"],["End of month 60","0","4,000 (cumulative 240,000)","0 (or residual value)"]]},
{t:"point",x:"Depreciation is a cost with no cash leaving. That is why the cash flow statement adds it back to profit to arrive at operating cash flow (3-3)."}]},
{h:"Three choices that set the calculation",blocks:[{t:"rows",items:[
{name:"① Useful life",x:"How many years of use. Five for the cart; airlines estimate for each fleet. Japanese airlines mostly use around 15–20 years for airframes. ★ Tax law has its own statutory lives (up to 10 years for aircraft in Japan)."},
{name:"② Residual value",x:"Value at the end of use. Aircraft have a second-hand market, so 5–10% of cost is often retained. ★"},
{name:"③ Method",x:"Straight-line: the same amount each year (the cart). Declining balance: more at first, less later. Straight-line is standard for aircraft."},
{name:"Example: one aircraft at 15.0bn, 20 years, 5% residual",x:"(15.0 − 0.75) ÷ 20 = 0.71bn a year. Vela Air (aircraft 210bn, most of the 25.4bn depreciation) implies an average write-off period of 8–9 years, consistent with a young fleet."}]},
{t:"note",x:"* Useful lives, residual values and methods are stated under ‘significant accounting policies’ in each company’s annual securities report, and differ between companies even for the same type. ★"}]},
{h:"How leased aircraft appear",blocks:[{t:"table",cols:["Standard","Treatment","Effect"],rows:[
["Japanese GAAP (current)","Operating leases appear neither as assets nor liabilities; lease rentals are expensed each period","Assets and liabilities look smaller and the equity ratio higher. ANA and Skymark expense aircraft rentals ★"],
["IFRS 16 / K-IFRS 1116","Leased aircraft are recognised as right-of-use assets, future rentals as lease liabilities, and the asset is depreciated","Assets and liabilities grow; the cost splits into depreciation plus interest. JAL, Korean Air, Jeju Air ★"],
["Japan’s new lease standard","From fiscal years beginning on or after April 2027, lessees under Japanese GAAP are expected to bring essentially all leases on balance sheet ★","Balance sheets of J-GAAP airlines such as ANA are expected to change markedly"]]},
{t:"point",x:"Two airlines flying 100 aircraft each can show completely different balance sheets depending on how many are owned, how many leased, and which standard applies. Check how leases are treated before comparing."}]},
{h:"Try it",blocks:[{t:"check",items:[
{name:"Calculate depreciation",x:"An aircraft costing 12.0bn depreciated straight-line over 18 years with 10% residual: how much a year? How does annual profit change if the life is 15 years instead?"},
{name:"Read a policy",x:"Find the useful life of aircraft in your own or a nearby airline’s annual report and note it."}]}]}],
voice:"When the front line calls an aircraft ‘old’ or ‘new’, remember that in the books a new aircraft carries heavy depreciation and an old one almost none. A fully depreciated aircraft flies for almost nothing on paper, which changes how route profitability looks.",
terms:[["Depreciation","減価償却","감가상각"],["Useful life","耐用年数","내용연수"],["Residual value","残存価額","잔존가치"],["Straight-line method","定額法","정액법"],["Declining-balance method","定率法","정률법"],["Right-of-use asset","使用権資産","사용권자산"]],
quiz:[{q:"Which is true of depreciation?",opts:["A cost with no cash leaving","A cost paid in cash every month","A cost proportional to sales","A repayment of debt"],a:0,exp:"Cash leaves on purchase day; the cost follows in instalments."},
{q:"Shortening the useful life…",opts:["Raises annual depreciation and lowers profit","Lowers annual depreciation and raises profit","Increases cash","Increases liabilities"],a:0,exp:"The same cost is divided by fewer years."},
{q:"Under IFRS 16, a leased aircraft…",opts:["Appears as a right-of-use asset and a lease liability","Does not appear","Appears in revenue","Appears in equity"],a:0,exp:"Lessees bring leases on balance sheet; Japanese GAAP is moving the same way ★."}]});
set("2-4",{title:"Receivables, Inventory and Payables: Three Items That Tie Up Cash",hl:"Tie Up Cash",subtitle:"Money from sales not yet received, money for purchases not yet paid, money sleeping in the storeroom. Working capital",
lead:["Profitable, yet short of cash. Much of the reason lies in three items: receivables (sold but not yet collected), inventory (bought but not yet used or sold) and payables (bought but not yet paid). The first two tie up cash; the third helps it.","For airlines the shape differs. Passengers pay before flying, so receivables are small and unearned ticket revenue helps cash instead. Inventory is spare parts: not for sale, yet large. This lesson brings the pieces together as working capital."],
sections:[
{h:"The three items and cash",blocks:[{t:"fig",id:"fn_wc",cap:"Figure: items that tie up cash, and items that help."},{t:"table",cols:["Item","What it is","Effect on cash","Taiyaki stall"],rows:[
["Receivables","Sold, not yet collected","A rise reduces cash (a sale with no cash yet)","School event 20,000"],
["Inventory","Bought, not yet used or sold","A rise reduces cash (paid for, not yet a cost)","Ingredients 15,000"],
["Payables","Bought, not yet paid","A rise increases cash (a cost with no cash out yet)","None (cash purchases)"]]},
{t:"point",x:"Working capital = receivables + inventory − payables: the cash tied up simply to keep trading. As sales grow, working capital grows too, which is how ‘selling well but short of cash’ happens."}]},
{h:"Airline working capital runs the other way",blocks:[{t:"rows",items:[
{name:"Receivables are small",x:"Fares arrive before the flight. Receivables arise from travel agency settlements (BSP), cargo, card companies and mileage partners. JAL: 254.6bn yen, 13% of revenue ★."},
{name:"Unearned revenue helps cash",x:"Tickets paid before travel and miles not yet used. JAL: 484.5bn ★. The more sales grow, the more unearned revenue grows and the earlier cash arrives. This is why airline working capital is often negative."},
{name:"Inventory is spare parts",x:"Engine parts, consumables, cabin supplies: not for sale, but held so that maintenance never stops. JAL: 60.6bn ★. Changes appear in operating cash flow."},
{name:"Payables are fuel, handling and airport charges",x:"Amounts owed to suppliers, typically settled the month after, so one to two months of costs."}]},
{t:"note",x:"* Funding that relies on unearned revenue reverses when demand stops suddenly, as in 2020: refunds of tickets already paid for drained cash at many airlines."}]},
{h:"Reading through turnover periods",blocks:[{t:"table",cols:["Indicator","Formula","Meaning","Taiyaki stall (one month)"],rows:[
["Receivable days","Receivables ÷ sales × days","Days from sale to collection","20,000 ÷ 260,000 × 30 = 2.3 days"],
["Inventory days","Inventory ÷ cost of sales × days","Days from purchase to use","15,000 ÷ 75,000 × 30 = 6 days"],
["Payable days","Payables ÷ purchases × days","Days from purchase to payment","0 days (cash)"]]},
{t:"point",x:"Lengthening periods signal slow collection (receivables) or unsold goods and excess parts (inventory). When they grow year on year, find out why (treated as analysis in Part 6)."}]},
{h:"Try it",blocks:[{t:"check",items:[
{name:"Calculate working capital",x:"Vela Air opening: receivables 250 + inventory 120 − payables 350 − unflown tickets 600 − miles 120 = ? Explain what a negative figure means."},
{name:"List your station’s receivables",x:"Write down the money your station has ‘sold but not yet received’: invoices to travel agencies, card payments for excess baggage and so on."}]}]}],
voice:"The dangerous station receivables are invoices to travel agencies that were never raised, and amounts held back over complaints. Looking at an ‘invoiced but unpaid’ list at month end protects head office’s working capital.",
terms:[["Accounts receivable","売掛金","매출채권"],["Inventory","棚卸資産（在庫）","재고자산"],["Accounts payable","買掛金","매입채무"],["Working capital","運転資本","운전자본"],["Turnover period (days)","回転期間","회전기간"],["Unearned revenue","前受金","선수금"]],
quiz:[{q:"When receivables rise, cash…",opts:["Falls (a sale not yet collected)","Rises","Is unchanged","Becomes a liability"],a:0,exp:"The sale is counted but the cash has not arrived."},
{q:"Why is airline working capital often negative?",opts:["Large unearned revenue received before travel","Large receivables","No inventory","Heavy borrowing"],a:0,exp:"Cash arrives before the revenue is earned."},
{q:"Inventory days lengthened year on year. A likely cause?",opts:["Unsold goods or excess parts","Faster collection","Higher sales","More cash"],a:0,exp:"Cash is sleeping longer in inventory."}]});
set("2-5",{title:"Inside Equity: Money Invested and Money Earned and Kept",hl:"Inside Equity",subtitle:"Share capital, capital surplus, retained earnings, treasury shares, other comprehensive income. The equity ratio measures strength",
lead:["Equity belongs to shareholders as a whole, but inside it is split by origin: money shareholders paid in (share capital and capital surplus), money the company earned and kept (retained earnings), shares bought back (treasury shares, negative), and valuation differences not yet taken through profit (accumulated other comprehensive income).","The most basic measure of an airline’s strength is the equity ratio: equity divided by total assets. JAL 40.3%, ANA 37.7% at 31 March 2026 ★, both recovering from the pandemic through accumulated profit and capital raising."],
sections:[
{h:"The parts of equity",blocks:[{t:"fig",id:"fn_eq",cap:"Figure: what equity is made of (Vela Air opening)."},{t:"table",cols:["Part","Content","Taiyaki stall","Vela Air opening"],rows:[
["Share capital","Shareholders’ payments designated as capital","300,000","50.0bn yen"],
["Capital surplus","Payments not designated as share capital","—","40.0bn"],
["Retained earnings","Accumulated profits less dividends","64,000","102.0bn"],
["Treasury shares","Own shares bought back (negative)","—","—"],
["Accumulated other comprehensive income","Valuation differences on shareholdings, hedges and currency translation not yet taken through profit","—","—"],
["Total equity","","364,000","192.0bn"]]},
{t:"note",x:"* JAL, 31 March 2026: share capital 273.2bn yen, capital surplus 270.5bn, retained earnings 508.3bn, treasury shares −21.2bn, accumulated other comprehensive income 81.2bn (including 31.7bn of cash flow hedges), other equity instruments 177.7bn, non-controlling interests 45.1bn → total equity 1,334.8bn. ★"}]},
{h:"The equity ratio: a measure of strength",blocks:[{t:"rows",items:[
{name:"Equity ratio = equity attributable to owners ÷ total assets",x:"Taiyaki stall 364,000 ÷ 580,000 = 62.8%. Vela Air 1,920 ÷ 6,000 = 32.0%. JAL 40.3%, ANA 37.7% (31 March 2026) ★."},
{name:"Higher is safer, but",x:"Less borrowing means more resilience to losses. Yet borrowing lifts the shareholders’ return (ROE) on the same profit (Part 6). Airlines at 30–40% are usually regarded as sound. ★"},
{name:"The pandemic lesson",x:"ANA’s equity ratio fell to 25.6% at the end of FY2022 and recovered to 37.7% at the end of FY2025 (ANA results presentation). Airline equity shrinks fast when demand stops, so it is built up in good times. ★"},
{name:"Equity-like funding",x:"In April 2025 JAL issued perpetual subordinated bonds (other equity instruments, 177.7bn) recorded in equity, and resolved to issue 200bn of bond-type preferred shares: funding counted as equity rather than debt, preserving the equity ratio while raising money for aircraft. ★"}]},
{t:"point",x:"There are only two ways to raise equity: earn and keep profit (retained earnings) or raise new money from shareholders. If equity has risen by neither route, look for valuation differences or hybrid capital."}]},
{h:"Dividends and treasury shares",blocks:[{t:"table",cols:["Item","What happens","Balance sheet","Cash flow"],rows:[
["Dividend","Part of profit paid to shareholders","Retained earnings −, cash −","Financing − (JAL, year to March 2026: 40.1bn) ★"],
["Share buyback","Own shares bought on the market; fewer shares, higher value per share","Treasury shares (negative) rise, cash −","Financing − (JAL: 20.0bn) ★"],
["Share issue","New shares issued to raise money","Share capital and surplus +, cash +","Financing +"],
["Payout ratio","Dividends ÷ net profit","—","JAL 31.3%, ANA about 20% (FY2025) ★"]]}]},
{h:"Try it",blocks:[{t:"check",items:[
{name:"Move the equity ratio",x:"If Vela Air raised 20.0bn in new shares, what is its equity ratio? If it borrowed 20.0bn? If it earned 20.0bn of profit?"},
{name:"Think about a dividend",x:"If the stall, with retained earnings of 64,000, paid the owner a 30,000 dividend, what happens to equity and cash?"}]}]}],
voice:"For a station, the equity ratio is the number that says how long the company can hold out when times are hard. How well head office can protect aircraft and people when demand falls is decided by this cushion.",
terms:[["Share capital","資本金","자본금"],["Capital surplus","資本剰余金","자본잉여금"],["Retained earnings","利益剰余金","이익잉여금"],["Treasury shares","自己株式","자기주식"],["Accumulated other comprehensive income","その他の包括利益累計額","기타포괄손익누계액"],["Equity ratio","自己資本比率","자기자본비율"],["Payout ratio","配当性向","배당성향"]],
quiz:[{q:"What are retained earnings?",opts:["Accumulated profits less dividends","Money paid in by shareholders","Total borrowings","This year’s sales"],a:0,exp:"Money earned and kept in the company."},
{q:"Which raises the equity ratio?",opts:["Earning and keeping profit, or issuing shares","Borrowing more","Paying higher dividends","Buying back shares"],a:0,exp:"Actions that increase equity or its share of total assets."},
{q:"A share buyback…",opts:["Reduces equity and cash","Increases equity","Reduces liabilities","Increases sales"],a:0,exp:"Treasury shares are a negative item within equity."}]});
set("2-6",{title:"Reading a Real Balance Sheet: JAL at 31 March 2026",hl:"Real Balance Sheet",subtitle:"Size → equity ratio → what the assets are → airline-specific liabilities. Read in this order",
lead:["As with the income statement, decide a reading order for the balance sheet and you will not get lost: ① total assets, ② equity ratio (strength), ③ what the assets consist of, ④ airline-specific liabilities (unflown tickets, miles, leases, provisions). We practise on JAL’s consolidated balance sheet at 31 March 2026 (earnings release, 30 April 2026). ★","Figures are rounded to 100m yen. The source is in millions and uses finer line items; here we work with large blocks to practise reading."],
sections:[
{h:"① Size and ② strength",blocks:[{t:"fig",id:"fn_jalbs",cap:"Figure: JAL balance sheet (end of March 2026)."},{t:"table",cols:["(100m yen)","31 Mar 2025","31 Mar 2026","Change"],rows:[
["Total assets","27,949","31,988","+4,038 (mainly cash)"],["Total liabilities","17,782","18,640","+857 (contract liabilities etc.)"],["Total equity","10,167","13,348","+3,180 (perpetual bonds + profit)"],["Equity ratio (owners of parent)","34.9%","40.3%","+5.4 points"]]},
{t:"point",x:"Total assets rose by 400bn, mostly cash. Liabilities barely moved while equity grew by 318bn: profit of 137.6bn plus 177.7bn of perpetual subordinated bonds recorded as equity (2-5)."}]},
{h:"③ What the assets are",blocks:[{t:"table",cols:["Assets (100m yen)","31 Mar 2026","% of total","Reading"],rows:[
["Cash and equivalents","10,102","31.6%","About half a year’s revenue. Airlines hold deep cash against demand shocks"],
["Trade receivables","2,546","8.0%","Awaiting payment from agencies, card companies, cargo customers and mileage partners"],
["Inventories","606","1.9%","Spare parts etc."],
["Aircraft","10,417","32.6%","Owned aircraft at book value; under IFRS 16 this includes right-of-use assets for leased aircraft ★"],
["Prepayments for aircraft","1,156","3.6%","Advance payments on ordered aircraft (A350 etc.)"],
["Other property and equipment","1,022","3.2%","Buildings and ground equipment"],
["Goodwill and intangibles","1,117","3.5%","Systems and acquisition premiums"],
["Other financial assets and investments","2,497","7.8%","Partner shareholdings, deposits, associates"],
["Deferred tax assets","1,099","3.4%","Future tax reductions (1-5); down from 190.3bn a year earlier"],
["Retirement benefit assets and other","1,426","4.5%",""]]},
{t:"note",x:"* Cash and aircraft make up 64% of total assets. The size of these two items alone tells you most of an airline’s character. ★"}]},
{h:"④ Airline-specific liabilities",blocks:[{t:"table",cols:["Liabilities (100m yen)","31 Mar 2026","% of total","Content"],rows:[
["Contract liabilities","4,845","15.1%","Unflown ticket revenue and unused miles (2-4)"],
["Interest-bearing debt (short + long)","8,759","27.4%","Loans, bonds and lease liabilities; down from 896.0bn a year earlier"],
["Trade and other payables","2,087","6.5%","Fuel, handling, airport charges not yet paid"],
["Retirement benefit liabilities","823","2.6%","Shortfall in funding future retirement payments"],
["Provisions","336","1.1%","Set aside for future outlays such as maintenance"],
["Other","1,790","5.6%","Tax payable, other financial liabilities"],
["Total liabilities","18,640","58.3%",""]]},
{t:"point",x:"The 484.5bn of contract liabilities is not repaid; it disappears as flights are flown. Against 875.9bn of interest-bearing debt, JAL holds 1,010.2bn of cash: effectively net cash. This is the hallmark of JAL’s finances. ★"}]},
{h:"Cautions when reading",blocks:[{t:"check",items:[
{name:"Different standards",x:"JAL applies IFRS 16, so aircraft include right-of-use assets. Do not compare the aircraft figure directly with ANA under Japanese GAAP (2-3)."},
{name:"A point-in-time figure",x:"The balance sheet is a photograph of 31 March. Airline cash swings with the season, so take care comparing with December or September figures."},
{name:"Consolidation scope",x:"Subsidiaries (ZIPAIR, JALUX and others) are included; aircraft include subsidiaries’ fleets."},
{name:"Source and date",x:"Figures are from the earnings release of 30 April 2026. The annual securities report (June) adds detailed notes. ★"}]},
{t:"link",href:"航空会社経営シミュレーション.html",x:"[Practice page] Airline Management Simulation: watch the balance sheet move quarter by quarter"}]}],
voice:"Pick two numbers to look at first and you will read a balance sheet quickly. We suggest cash and interest-bearing debt. The difference between them, net cash, tells you how well the company can withstand the next downturn.",
terms:[["Total assets","総資産","총자산"],["Contract liabilities","契約負債","계약부채"],["Interest-bearing debt","有利子負債","유이자부채(이자부 부채)"],["Net cash","ネット・キャッシュ","순현금"],["Deferred tax assets","繰延税金資産","이연법인세자산"],["Provisions","引当金","충당금"]],
quiz:[{q:"Aircraft as a share of JAL’s total assets at 31 March 2026?",opts:["About 33%","About 10%","About 50%","About 5%"],a:0,exp:"1,041.7bn ÷ 3,198.8bn = 32.6% ★."},
{q:"Which describes contract liabilities (unflown tickets and miles)?",opts:["A liability that disappears as flights are flown, with no cash repayment","A loan repaid in cash within a year","Unpaid dividends","Unpaid aircraft purchase prices"],a:0,exp:"The obligation is settled by providing the service."},
{q:"Cash 1,010.2bn, interest-bearing debt 875.9bn. This position is called…",opts:["Net cash (effectively debt-free)","Negative equity","Insolvency while profitable","A falling equity ratio"],a:0,exp:"Cash exceeds interest-bearing debt."}]});
})(window.ARTS);
