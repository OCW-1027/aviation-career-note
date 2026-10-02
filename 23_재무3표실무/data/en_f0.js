/* 財務3表の実務 — English version (Part 0) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("0-1",{title:"Where a Company’s Money Comes From, and Where It Goes",hl:"Comes From",subtitle:"Money raised from owners and lenders becomes assets, earns sales, pays costs and is left over as profit",
lead:["However large the company, its money moves in one loop. Money collected from somebody buys the tools of the trade, earns sales, pays costs, and whatever profit is left is either handed back or kept in the business. Once you can walk round this loop, you already understand half of the three statements.","An airline is no different. Money from shareholders and banks buys aircraft, passengers pay fares, fuel, wages and airport charges are paid, and what remains is profit. The figures run to hundreds of billions of yen, but the shape is the same as a taiyaki stall."],
sections:[
{h:"Walking round the money loop",blocks:[{t:"fig",id:"fin_flow",cap:"Money raised from owners and lenders becomes assets → sales → costs → profit, then is handed back or kept. The yellow dot is the money moving"},
{t:"ladder",rise:22,steps:[{name:"Raise",sub:"Owners’ capital and bank loans"},{name:"Spend",sub:"Buy equipment, facilities, stock: the tools of the trade"},{name:"Earn",sub:"Sell to customers and book sales"},{name:"Pay",sub:"Pay for materials, wages, rent and other costs"},{name:"Keep",sub:"Hand profit back (dividends, repayments) or keep it in the business"}]}]},
{h:"Which part of the loop each statement looks at",blocks:[{t:"table",cols:["Statement","Where it looks","The question it answers"],rows:[
["Income statement (P/L)","Earn → Pay → Keep","How much did we earn this period, and how much was left?"],
["Balance sheet (B/S)","Raise → Spend","Where does the money come from right now, and what form has it taken?"],
["Cash flow statement (C/F)","The whole loop, cash only","What made cash rise and fall this period?"]]},
{t:"point",x:"The three statements are not separate documents. They are the same loop photographed from three angles, which is why their numbers connect (we check this in 0-3)."}]},
{h:"Applied to an airline",blocks:[{t:"rows",items:[
{name:"Raise",x:"Shareholders’ capital and borrowing from banks and bond markets. Aircraft are expensive, so many are leased rather than bought."},
{name:"Spend",x:"Aircraft, spare engines, maintenance facilities, airport counters and systems. Aircraft alone can be around 30% of total assets (★ see the real examples in Part 1)."},
{name:"Earn",x:"Passenger fares, cargo, ancillaries such as excess baggage and seat selection, and partner revenue from mileage programmes."},
{name:"Pay",x:"Fuel, staff, ground handling, maintenance, airport charges, aircraft leases and depreciation, distribution costs."},
{name:"Keep",x:"Pay corporate tax out of profit, pay dividends, and keep the rest as the seed money for the next aircraft."}]}]},
{h:"Try it",blocks:[{t:"check",items:[
{name:"Draw your own station’s loop",x:"Money coming into the station (head-office budget, airport sales) and going out (handling fees, airport charges, wages), drawn as this loop."},
{name:"Think about a shop you know",x:"For your usual convenience store or café, write one line each for raise, spend, earn, pay and keep."},
{name:"Look at the tool",x:"In Airline Cost & Break-even Practice, see how the ‘pay’ step of one flight breaks down."}]},
{t:"link",href:"航空原価計算の練習.html",x:"[Practice page] Airline Cost & Break-even Practice: what one flight costs"}]}],
voice:"If numbers are not your thing, do not start with the statements. First be able to say in your own words where the money comes from and where it goes. Read the statements afterwards and they are simply a record.",
terms:[["Income statement (P/L)","損益計算書","손익계산서"],["Balance sheet (B/S)","貸借対照表","재무상태표"],["Cash flow statement (C/F)","キャッシュフロー計算書","현금흐름표"],["Equity investment","出資","출자"],["Borrowing","借入","차입"]],
quiz:[{q:"In the money loop, which is the ‘spend’ step?",opts:["Buying aircraft or equipment","Receiving fares","Paying a dividend","Taking a loan"],a:0,exp:"Raised money is spent on the tools of the trade (assets)."},
{q:"Which statement answers ‘how much did we earn this period and how much was left’?",opts:["Income statement","Balance sheet","Cash flow statement","Shareholder register"],a:0,exp:"The income statement reports performance over a period."},
{q:"Which describes the relationship between the three statements?",opts:["The same flow of money seen from three angles","Three unrelated documents","Only the income statement is official","Only large companies prepare a cash flow statement"],a:0,exp:"They photograph the same loop from different angles, so the numbers connect."}]});
set("0-2",{title:"The Three Statements: Report Card, Photograph, Bankbook",hl:"Report Card, Photograph, Bankbook",subtitle:"Two statements cover a period; one captures a moment. Knowing which is which prevents most misreadings",
lead:["The names sound technical, but the roles are familiar. The income statement is a year’s report card, the balance sheet a photograph taken on closing day, and the cash flow statement a year’s bankbook.","The most important difference is period versus point in time. The report card and the bankbook collect everything that happened from 1 April to 31 March; the photograph shows only the instant of 31 March. Mix them up and you cannot make sense of statements like ‘sales rose but cash fell’."],
sections:[
{h:"Three analogies",blocks:[{t:"fig",id:"fin_three",cap:"Report card (period), photograph (point in time), bankbook (period). Remember the formula under each"},
{t:"cards",n:3,items:[{ic:"📄",name:"Income statement = report card",tag:"Period",x:"Sales minus costs gives profit: the score for how well the business traded."},{ic:"📷",name:"Balance sheet = photograph",tag:"Point in time",x:"On closing day: what we own (assets), what we owe (liabilities) and what is ours (equity)."},{ic:"📒",name:"Cash flow statement = bankbook",tag:"Period",x:"Cash in and cash out, sorted into operating, investing and financing."}]}]},
{h:"Do not confuse period and point in time",blocks:[{t:"table",cols:["Question","Statement","Why"],rows:[
["Did we make money this year?","Income statement","It collects a year’s sales and costs"],
["How much debt do we have now?","Balance sheet","It shows balances on the closing date"],
["Why did cash fall this year?","Cash flow statement","It sorts a year’s cash movements by cause"],
["How much are the aircraft carried at?","Balance sheet","Asset balances (book value) are point-in-time figures"]]},
{t:"note",x:"* Most Japanese companies use April to March as their year; most Korean companies use January to December. Airlines follow suit: JAL and ANA close in March, Korean Air in December. ★"}]},
{h:"What goes wrong if you read only one statement",blocks:[{t:"rows",items:[
{name:"Only the report card",x:"You miss a profitable company running out of cash and failing to pay its bills (4-4)."},
{name:"Only the photograph",x:"Plenty of cash on hand may be a loan due next month, and the photo says nothing about earning power."},
{name:"Only the bankbook",x:"A rising cash total cannot tell you whether the cash came from trading or from borrowing. That is why it is split into operating, investing and financing."}]},
{t:"point",x:"A good reading order: report card (P/L) for earning power → bankbook (C/F) for the cash behind it → photograph (B/S) for strength. Read this way, the company comes into focus."}]},
{h:"Try it",blocks:[{t:"check",items:[
{name:"Write the three for your household",x:"This month’s income and spending (report card), today’s bank balance and loans (photograph), this month’s bank movements (bankbook). The same three statements a company has."},
{name:"Sort the questions",x:"‘How many staff do we have?’, ‘What were last year’s sales?’, ‘What did we spend the cash on?’, ‘Has the loan gone down?’: which are about a period and which about a point in time?"}]}]}],
voice:"‘Is there budget for it?’ is a photograph question; ‘Are we in the red this month?’ is a report-card question. Simply noticing which one is being asked makes meetings run more smoothly.",
terms:[["Period","期間","기간"],["Point in time","時点","시점"],["Closing date","決算日","결산일"],["Book value","簿価","장부가"],["Insolvency while profitable","黒字倒産","흑자 도산"]],
quiz:[{q:"What does the balance sheet show?",opts:["The position at the closing date","A year’s sales and costs","A year’s cash movements","Next year’s plan"],a:0,exp:"The balance sheet is a photograph of one specific day."},
{q:"Which statement answers ‘why did cash fall this year’?",opts:["Cash flow statement","Balance sheet","Income statement","Minutes of the shareholders’ meeting"],a:0,exp:"It sorts cash movements into operating, investing and financing."},
{q:"A profitable company that runs out of cash is said to suffer…",opts:["Insolvency while profitable","A loss-making year","Negative equity","An unrealised gain"],a:0,exp:"A danger the report card alone cannot show (4-4)."}]});
set("0-3",{title:"Building the Three Statements from a Taiyaki Stall’s First Month",hl:"Taiyaki Stall’s First Month",subtitle:"Write down ten events and the income statement, balance sheet and cash flow statement build themselves",
lead:["From here we practise on a fictional taiyaki stall. The owner puts in 300,000 yen of her own money, borrows 200,000, buys a 240,000-yen cart and trades for a month. Note down what happened in order and the three statements appear by themselves.","The numbers are small, but what happens is exactly what happens in an airline. The statements built here are the reference we return to throughout Parts 1 to 4."],
sections:[
{h:"Ten things that happened in the month",blocks:[{t:"table",cols:["Day","Event","Yen","Where it goes"],rows:[
["1st","Owner puts her own money into the business","300,000","B/S: cash +, capital + / C/F: financing +"],
["1st","Borrows from the bank","200,000","B/S: cash +, loan + / C/F: financing +"],
["2nd","Buys the cart (to last 5 years)","240,000","B/S: cash −, cart + / C/F: investing −"],
["Daily","Buys ingredients for cash","90,000","B/S: cash −, ingredients (stock) +"],
["Daily","Sales for cash","240,000","P/L: sales + / B/S: cash + / C/F: operating +"],
["20th","Supplies a school event, paid next month","20,000","P/L: sales + / B/S: receivable + (no cash yet)"],
["Month end","Pays rent, part-time wages, utilities","100,000","P/L: costs / B/S: cash − / C/F: operating −"],
["Month end","Pays interest on the loan","1,000","P/L: interest / B/S: cash −"],
["Month end","Records one month’s wear on the cart","4,000","P/L: depreciation / B/S: cart − (240,000 ÷ 60 months)"],
["Month end","Counts the ingredients left","15,000","Ingredients used = 90,000 − 15,000 = 75,000"]]},
{t:"note",x:"* Tax is taken as 20% of profit and paid next month, so it sits in ‘tax payable’. Real tax rates and rules differ by company and country. ★"}]},
{h:"The three statements that result",blocks:[{t:"fig",id:"fin_taiyaki",cap:"One set of events produces three statements. Profit of 64,000 yen lands in equity; closing cash of 309,000 yen lands in assets: the same numbers appear in two statements"},
{t:"table",cols:["Income statement (1 month)","Yen","Balance sheet (month end)","Yen"],rows:[
["Sales","260,000","Cash","309,000"],
["Ingredients","−75,000","Receivable","20,000"],
["Gross profit","185,000","Ingredients (stock)","15,000"],
["Rent, wages, utilities","−100,000","Cart (net of depreciation)","236,000"],
["Depreciation","−4,000","Total assets","580,000"],
["Operating profit","81,000","Loan","200,000"],
["Interest","−1,000","Tax payable","16,000"],
["Tax (20%)","−16,000","Capital","300,000"],
["Net profit","64,000","Retained earnings","64,000"]]},
{t:"table",cols:["Cash flow statement (1 month)","Yen","Made up of"],rows:[
["Operating","+49,000","Cash sales 240,000 − ingredients 90,000 − rent etc. 100,000 − interest 1,000"],
["Investing","−240,000","Purchase of the cart"],
["Financing","+500,000","Capital 300,000 + loan 200,000"],
["Change in cash","+309,000","Opening 0 → closing 309,000"]]}]},
{h:"Three things to notice",blocks:[{t:"rows",items:[
{name:"Profit of 64,000 and cash of 309,000 are different things",x:"Cash rose so much not because of trading but because capital and the loan came in. The cash the business itself generated is the 49,000 under operating."},
{name:"A sale that is not cash",x:"The 20,000 for the school event counts as a sale, but the cash has not arrived (receivable). This is the most basic form of the gap between profit and cash."},
{name:"A cost with no payment",x:"No cash left the business for the 4,000 of depreciation this month. The 240,000 paid on the 2nd is spread over 60 months as a cost."}]},
{t:"point",x:"Total assets 580,000 = liabilities 216,000 + equity 364,000. Profit 64,000 sits inside equity; closing cash 309,000 sits inside assets. If this equality breaks, a record is wrong somewhere."}]},
{h:"Try it",blocks:[{t:"check",items:[
{name:"Change a number and check",x:"If sales had been 200,000 yen, what would profit, cash and equity be? Does assets = liabilities + equity still hold?"},
{name:"Explain it in your own words",x:"If the owner asks ‘Did we make money this month? Do we have more cash?’, answer in two sentences."}]},
{t:"note",x:"* These figures are used again and again in Parts 1 to 4. Keep a note of them."},{t:"link",href:"どの表が動くか練習.html",x:"[Practice page] Which Statement Moves? Transaction Card Practice: which statement moves for each of these 11 transactions?"}]}],
voice:"The only statements whose numbers you truly trust are the ones you have built yourself. Rewrite the stall’s ten lines by hand. An airline’s accounts do the same thing, just with more lines.",
terms:[["Accounts receivable","売掛金","매출채권(외상)"],["Inventory","在庫","재고"],["Depreciation","減価償却費","감가상각비"],["Tax payable","未払税金","미지급 세금"],["Retained earnings","利益剰余金","이익잉여금"]],
quiz:[{q:"How is the 20,000 yen supplied to the school event (paid next month) treated this month?",opts:["Counted as a sale and shown as a receivable in assets","Not counted as a sale until the cash arrives","Treated as a cost","Counted as next month’s sale"],a:0,exp:"Sales are recognised on delivery; with no cash yet, it becomes a receivable."},
{q:"Which is true of the 4,000 yen depreciation?",opts:["No cash was paid this month, but it is a cost","4,000 yen was paid in cash this month","The cart’s value does not change","It is a loan repayment"],a:0,exp:"The 240,000 yen cart is spread over 60 months as a cost."},
{q:"Total assets are 580,000 yen. What do liabilities plus equity add up to?",opts:["580,000 yen","516,000 yen","364,000 yen","309,000 yen"],a:0,exp:"Assets = liabilities (216,000) + equity (364,000) always holds."}]});
})(window.ARTS);
