/* 財務3表の実務 — English version (Part 1) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("1-1",{title:"Revenue and Expenses: Money Earned and Money Used",hl:"Revenue and Expenses",subtitle:"When to count a sale and what counts as an expense: the two rules that build the income statement",
lead:["Strip the income statement down and it has only two parts: money earned (revenue) and money used to earn it (expenses). The difference is profit. But there are rules about when to count each, and without them the numbers mislead.","At the taiyaki stall, the 20,000 yen supplied to the school event is this month’s sale even though payment comes next month. Conversely, a ticket an airline sells today for a flight next month is not yet revenue; it becomes revenue on the day the passenger flies. This rule is called the accrual basis."],
sections:[
{h:"When a sale is counted",blocks:[{t:"table",cols:["Event","Revenue date","Why"],rows:[
["Taiyaki sold for cash","That day","Goods handed over and cash received"],
["Supplied to a school event, paid next month","Delivery date","The obligation to deliver was fulfilled"],
["Ticket sold one month before travel","The day the passenger flies","The obligation to carry has not been met; until then it is unearned revenue (a liability)"],
["Miles awarded","The day the miles are redeemed","A contract liability while the obligation to provide the reward remains"],
["Cargo delivered","Completion date","Even if payment comes two months later, revenue is booked on completion"]]},
{t:"note",x:"* JAL’s earnings release explains that passenger revenue is recognised when the transport service is completed, and that payment is usually received beforehand (year to March 2026). ★"}]},
{h:"What an expense is",blocks:[{t:"rows",items:[
{name:"Money used to generate revenue",x:"Ingredients, wages, rent, fuel, handling fees: the part of spending that relates to this period’s revenue."},
{name:"Paid, but not an expense",x:"The 240,000-yen cart, an aircraft purchase. Long-lived items become assets and are expensed gradually over their useful life (depreciation)."},
{name:"Not paid, but an expense",x:"Depreciation. This month’s part-time wages calculated at month end but paid next month. What was used this month is this month’s expense."},
{name:"Neither expense nor loss",x:"Repaying the principal of a loan. You have returned borrowed money and lost nothing (it appears under financing in the cash flow statement)."}]},
{t:"point",x:"Paying money is not the same as incurring an expense. Whether something is an expense depends on whether it was used to earn this period’s revenue. This is the root of the gap between the income statement and the cash flow statement."}]},
{h:"An airline’s revenue and expenses (Vela Air, year 1)",blocks:[{t:"table",cols:["Revenue (100m yen)","","Expenses (100m yen)",""],rows:[
["International passengers","1,500","Fuel","677"],["Domestic passengers","960","Staff","508"],["Cargo","300","Ground handling","338"],["Ancillaries","120","Maintenance","282"],["Other (mileage partners etc.)","120","Depreciation","254"],["","","Airport charges","197"],["","","Aircraft leases","169"],["","","Distribution","113"],["","","Other","282"],["Total","3,000","Total","2,820"]]},
{t:"note",x:"* Vela Air is fictional. Its cost mix is built from the range seen in real airlines’ published accounts (JAL, ANA, Korean Air, Jeju Air, Skymark, Ryanair)."}]},
{h:"Try it",blocks:[{t:"check",items:[
{name:"Name the revenue date",x:"‘A group tour paid a deposit’, ‘A passenger flew on a free award ticket’, ‘An excess-baggage fee was collected’. When does each become revenue?"},
{name:"Expense or not?",x:"‘We bought a new tug’, ‘We paid the handler for last month’, ‘We repaid a loan’: sort into expense, asset and repayment."}]}]}],
voice:"When your station talks about ‘this month’s sales’, always check whether it means flown or sold. Head office’s income statement is on a flown basis; sales reports are often on a sold basis, and the two differ even for the same month.",
terms:[["Revenue / sales","売上","매출"],["Expense","費用","비용"],["Accrual basis","発生主義","발생주의"],["Unearned revenue / deferred revenue","前受金","선수금"],["Contract liability","契約負債","계약부채"]],
quiz:[{q:"How is the price of a ticket sold a month ago, not yet flown, treated now?",opts:["Unearned revenue (a liability)","Revenue","An expense","A reduction in assets"],a:0,exp:"Until the carriage obligation is met it is a liability; it becomes revenue on the day of travel."},
{q:"Which is true of the 240,000-yen cart purchase?",opts:["It becomes an asset and is expensed gradually through depreciation","It is fully expensed in the month of purchase","It is treated as a reduction in sales","It becomes a liability"],a:0,exp:"Long-lived items are assets, expensed over their useful life."},
{q:"How does repaying 200,000 yen of loan principal appear on the income statement?",opts:["It is neither an expense nor a loss","As an expense","As a reduction in sales","As an extraordinary loss"],a:0,exp:"Borrowed money was simply returned; it appears under financing in the cash flow statement."}]});
set("1-2",{title:"The Five Profits: Which Costs Have Been Deducted",hl:"Five Profits",subtitle:"Gross, operating, ordinary, pre-tax and net profit: each step deducts a different set of costs",
lead:["An income statement shows as many as five ‘profits’. It looks like a lot, but there is only one difference between them: which costs have been deducted so far. The higher steps are closer to the core business; the lower steps approach the company’s final result.","Seen as a waterfall, the taiyaki stall’s month runs from sales of 260,000 yen, minus ingredients to gross profit, minus rent and wages to operating profit, minus interest to ordinary profit, minus tax to net profit. An airline follows exactly the same order."],
sections:[
{h:"The profit waterfall (taiyaki stall)",blocks:[{t:"fig",id:"fin_waterfall",cap:"The five profits differ only in how many costs have been deducted from the same sales. Blue steps are profit, red steps are costs taken away"},
{t:"table",cols:["Profit","Costs deducted","What it shows","Taiyaki stall (yen)"],rows:[
["Gross profit","Cost of sales (ingredients)","The earning power of the product itself","185,000"],
["Operating profit","+ selling and administrative costs (rent, wages, depreciation)","Earning power of the core business","81,000"],
["Ordinary profit (J-GAAP)","+ non-operating items (interest, FX)","Everyday earning power including the weight of borrowing","80,000"],
["Profit before tax","+ extraordinary items (disasters, asset sales: one-offs)","Everything included, before tax","80,000"],
["Net profit","+ corporate tax","The final profit that belongs to shareholders","64,000"]]}]},
{h:"Seen through Vela Air, year 1",blocks:[{t:"table",cols:["Item","100m yen","Calculation"],rows:[
["Revenue","3,000",""],["Operating costs","2,820","Sum of nine items (1-1)"],["Operating profit","180","3,000 − 2,820; operating margin 6.0%"],["Net interest","−52","Interest on loans and leases 58 − interest received 6"],["Profit before tax","128","180 − 52"],["Corporate tax (30%)","−38","128 × 30%"],["Net profit","90","Profit left for shareholders: 3.0% of revenue"]]},
{t:"point",x:"Single-digit operating margins are normal for airlines. Revenue of 300bn yen leaves just 9bn at the end. A 10% rise in fuel would wipe out 6.8bn of it. Keep this scale in mind."}]},
{h:"Where Japanese GAAP and IFRS differ",blocks:[{t:"rows",items:[
{name:"Ordinary profit exists only under J-GAAP",x:"‘Ordinary profit’ is a step in Japanese accounting standards. IFRS and Korea’s K-IFRS do not have it; operating profit leads straight to profit before tax."},
{name:"ANA uses J-GAAP, JAL uses IFRS",x:"ANA Holdings reports ordinary profit; JAL has reported under IFRS since the year to March 2021 and uses EBIT (earnings before interest and taxes) as its own headline measure. ★"},
{name:"Korean Air uses K-IFRS",x:"Korean listed companies use K-IFRS. The income statement splits cost of sales from selling and administrative expenses, and below operating profit come finance and other items, then profit before income tax."},
{name:"Comparing across companies",x:"ANA’s ordinary profit and JAL’s EBIT deduct different ranges of costs. To compare airlines, use operating profit or a measure you have defined consistently yourself."}]},
{t:"note",x:"* Check each company’s earnings release or annual securities report for the standard it applies. ★"}]},
{h:"Try it",blocks:[{t:"check",items:[
{name:"Draw your own waterfall",x:"Redraw the stall’s waterfall with sales of 200,000 yen. Ingredients scale with sales to 58,000; other costs are unchanged. Work out all five profits."},
{name:"Name the step",x:"‘Compensation for flights cancelled by a typhoon’, ‘Gain on selling an aircraft’, ‘Interest on bonds’: at which step is each deducted (or added)?"}]}]}],
voice:"When head office says ‘profit’, get into the habit of asking which one. Hearing an operating-profit figure as if it were net profit puts your conclusions out by the tax and FX lines.",
terms:[["Gross profit","売上総利益","매출총이익"],["Operating profit","営業利益","영업이익"],["Ordinary profit (J-GAAP)","経常利益","경상이익"],["Profit before tax","税引前利益","세전이익"],["Net profit","当期純利益","당기순이익"],["EBIT","EBIT","EBIT"]],
quiz:[{q:"What is deducted (or added) to get from operating profit to ordinary profit?",opts:["Non-operating items such as interest and FX gains or losses","Ingredients","Corporate tax","Selling and administrative costs"],a:0,exp:"Everyday items outside the core business (interest, FX) are non-operating items."},
{q:"Which accounting standard has ‘ordinary profit’?",opts:["Japanese GAAP","IFRS","K-IFRS","US GAAP"],a:0,exp:"Ordinary profit is specific to Japanese standards."},
{q:"What is Vela Air’s operating margin in year 1?",opts:["6.0%","3.0%","9.4%","24%"],a:0,exp:"Operating profit 180 ÷ revenue 3,000 = 6.0%. The net margin is 3.0%."}]});
set("1-3",{title:"Cost of Sales and Overheads: Where the Line Falls Depends on the Industry",hl:"Cost of Sales and Overheads",subtitle:"For a shop it is purchases, for a factory materials and factory labour, and many airlines draw no line at all",
lead:["‘Cost of sales’ is deducted to reach gross profit; ‘selling, general and administrative expenses’ (SG&A) are deducted to reach operating profit. Where the line falls varies greatly by industry. For the taiyaki stall, ingredients are cost of sales; rent and wages are SG&A.","Airlines are unusual: fuel, staff and maintenance are hard to assign to ‘cost of sales’, so many airlines (JAL, ANA) draw no line and simply list costs by item. Others, such as Korean Air under K-IFRS, do split cost of sales from SG&A. ★"],
sections:[
{h:"Cost shapes by industry",blocks:[{t:"fig",id:"fin_cost_types",cap:"Cost structure with sales = 100 (conceptual). Airlines have many cost items and a thin slice of profit"},
{t:"table",cols:["Industry","In cost of sales","In SG&A","Typical gross margin"],rows:[
["Retail and food (taiyaki stall)","Purchases, ingredients","Rent, wages, utilities, advertising","High (60–70%)"],
["Manufacturing","Materials, factory labour, factory depreciation","Sales and head-office staff, logistics, R&D","20–40%"],
["Airline (itemised)","(no split) fuel, staff, maintenance, handling, airport charges, depreciation…","(no split) distribution sits in the same list","Judge by operating margin (often single digits)"],
["Airline (K-IFRS split)","Costs directly tied to flying (fuel, staff, airports, maintenance, depreciation)","Commissions, advertising, head-office administration","Korean Air 2025: gross margin about 15% (consolidated) ★"]]},
{t:"note",x:"* Korean Air 2025 consolidated: revenue 25.2255tn won, cost of sales 21.5503tn, SG&A 2.5616tn, operating profit 1.1136tn (aggregator figures; verify against the annual report). ★"}]},
{h:"Drawing the line at the taiyaki stall",blocks:[{t:"table",cols:["Cost","Which side","Why"],rows:[
["Ingredients 75,000","Cost of sales","Spent on the taiyaki actually sold"],["Rent 50,000","SG&A","A shop cost whether or not anything sells"],["Part-time wages 40,000","SG&A","Sales labour (in a factory it might be cost of sales)"],["Utilities 10,000","SG&A","Running the shop"],["Depreciation 4,000","SG&A","The cart is sales equipment"],["Interest 1,000","Neither","Non-operating expense (1-4)"]]},
{t:"point",x:"The line is a company policy decision, and the same cost can be cost of sales in one industry and SG&A in another. That is why operating profit is a safer basis than gross profit for comparing companies."}]},
{h:"Airline costs as variable and fixed",blocks:[{t:"rows",items:[
{name:"Rises with flying (variable)",x:"Fuel, airport charges, handling fees, part of maintenance, commissions. Scales with seat-km flown or passenger numbers."},
{name:"Incurred whether you fly or not (fixed)",x:"Most staff costs, depreciation, aircraft leases, head office, IT and station offices. Airlines carry heavy fixed costs; a 10% fall in revenue can erase profit."},
{name:"What the front line can influence",x:"Extra handling work, compensation during delays, over-fuelling, use of ground power (GPU). See the practice page for one flight’s cost breakdown."}]},
{t:"link",href:"航空原価計算の練習.html",x:"[Practice page] Airline Cost & Break-even Practice: one flight’s cost breakdown, fixed and variable"}]},
{h:"Try it",blocks:[{t:"check",items:[
{name:"Sort your workplace costs",x:"List ten costs your station incurs and sort each as variable or fixed, cost of sales or SG&A."},
{name:"Explain why gross margins do not compare",x:"Using this lesson, explain why a retailer’s 60% gross margin and an airline’s 6% operating margin should not be set side by side."}]}]}],
voice:"When a cost-cutting instruction arrives, first separate fixed from variable. Variable costs move with flights and passengers, so the aim is to remove waste rather than ‘cut’. Fixed costs only move when contracts or structures change.",
terms:[["Cost of sales","売上原価","매출원가"],["Selling, general and administrative expenses","販売費及び一般管理費","판매비와 관리비"],["Variable cost","変動費","변동비"],["Fixed cost","固定費","고정비"],["Gross margin","売上総利益率","매출총이익률"]],
quiz:[{q:"The stall’s rent of 50,000 yen is…",opts:["SG&A","Cost of sales","A non-operating expense","An extraordinary loss"],a:0,exp:"A running cost incurred whether or not anything sells."},
{q:"Why is operating profit safer than gross profit for comparing companies?",opts:["Because the line between cost of sales and SG&A differs by company","Because operating profit is always larger","Because gross profit is not published","Because operating profit includes tax"],a:0,exp:"The same cost can fall on either side depending on the company."},
{q:"Which airline cost is fixed?",opts:["Depreciation and aircraft leases","Fuel","Airport charges","Commissions"],a:0,exp:"Fixed costs are incurred whether or not you fly."}]});
set("1-4",{title:"Non-operating and Extraordinary Items: What Happened Outside the Core Business",hl:"Outside the Core Business",subtitle:"Interest, FX, asset sales, disasters: kept apart from the core so that earning power stays readable",
lead:["Below operating profit come items only loosely connected to the core business: interest on loans, FX gains and losses on foreign-currency assets and liabilities, dividends on shares held, the gain on selling an aircraft, losses from disasters or accidents. Mix these into the core and you can no longer see whether the business itself is working.","Airlines carry large dollar costs and liabilities, so a weaker or stronger yen produces large FX effects. Some years they book gains on aircraft sales; in others, disaster losses. The habit of reading these apart from operating profit matters."],
sections:[
{h:"Non-operating items: everyday events outside the core",blocks:[{t:"table",cols:["Item","Plus or minus","Airline example"],rows:[
["Interest and dividend income","+","Investing cash on hand, dividends on shares held"],["Interest expense","−","Interest on loans, bonds and lease liabilities; 5.8bn yen a year at Vela Air"],["FX gains and losses","±","Revaluing dollar loans and lease liabilities in yen. A weaker yen inflates liabilities (loss); a stronger yen shrinks them (gain)"],["Share of profit of associates","±","Share of profit in companies owned 20–50%"],["Subsidies and grants","+","Support for regional routes etc. (classification varies by company) ★"]]},
{t:"note",x:"* Skymark’s year to March 2025 showed an FX loss from revaluing foreign-currency assets and liabilities, sharply reducing ordinary profit (Aviation Wire, 16 May 2025). ★"}]},
{h:"Extraordinary items: large one-offs (J-GAAP)",blocks:[{t:"rows",items:[
{name:"Extraordinary gains",x:"Gains on selling aircraft or land, gains on selling subsidiaries, insurance proceeds."},
{name:"Extraordinary losses",x:"Disaster and accident losses, impairment (writing an asset down when its value collapses), exit costs, litigation settlements."},
{name:"Under IFRS",x:"There is no ‘extraordinary’ category. The same items sit under other income and expenses, within or below operating profit. JAL, reporting under IFRS, has no extraordinary section. ★"},
{name:"How to read them",x:"In a year with large extraordinary items, net profit departs from the underlying business. Judge strength on ordinary (or operating) profit and read extraordinary items as ‘this year only’."}]}]},
{h:"Seen through the stall and Vela Air",blocks:[{t:"table",cols:["","Taiyaki stall (yen)","Vela Air year 1 (100m yen)"],rows:[
["Operating profit","81,000","180"],["Non-operating items","−1,000 (loan interest)","−52 (interest 58, interest received 6)"],["Ordinary profit / profit before tax (IFRS)","80,000","128"],["Extraordinary items","None","None (year 2’s loss from high fuel prices is core, not extraordinary)"],["Profit before tax","80,000","128"]]},
{t:"point",x:"A loss caused by fuel prices or weak demand is painful, but it is the result of the core business, not an extraordinary loss. Separating core from one-off is the main purpose of this lesson."}]},
{h:"Try it",blocks:[{t:"check",items:[
{name:"Sort the items",x:"‘Sold an old aircraft for a 3.0bn gain’, ‘FX loss of 2.0bn on dollar lease liabilities’, ‘Handler’s price rise added 1.0bn to costs’: operating, non-operating or extraordinary?"},
{name:"Think through a weaker yen",x:"For an airline paying fuel and leases in dollars, write down what happens on each line of the income statement when the dollar moves from 150 to 160 yen."}]}]}],
voice:"FX gains and losses can appear on the income statement with no cash moving at all (revaluation of liabilities). Before reacting to ‘we made a loss’, check whether it was a cash loss or a valuation loss.",
terms:[["Non-operating income and expenses","営業外損益","영업외손익"],["Extraordinary gains and losses","特別損益","특별손익"],["Foreign exchange gain or loss","為替差損益","환차손익"],["Impairment loss","減損損失","손상차손"],["Equity method","持分法","지분법"]],
quiz:[{q:"When a weaker yen raises the yen value of dollar lease liabilities, the income statement shows…",opts:["An FX loss (non-operating)","Lower operating profit","An extraordinary gain","Lower revenue"],a:0,exp:"A revaluation loss on liabilities, shown among non-operating items."},
{q:"A loss in a year of high fuel prices is…",opts:["A core result (operating loss)","An extraordinary loss","A non-operating loss","Not recorded"],a:0,exp:"Fuel is a core cost, so the effect shows at the operating profit step."},
{q:"Which is true of an IFRS income statement?",opts:["It has no ‘extraordinary items’ category","It has ordinary profit","It has no operating profit","Japanese companies cannot use it"],a:0,exp:"There is no extraordinary category; such items sit under other income and expenses."}]});
set("1-5",{title:"Corporate Tax and Net Profit: The Number Left at the End",hl:"Corporate Tax and Net Profit",subtitle:"Roughly 30% of profit goes in tax. Loss years pay nothing and can be offset against future profits",
lead:["Deduct corporate tax from profit before tax and you have net profit. The effective rate is around 30% for Japanese companies and around 24–27% in Korea including local taxes; the taiyaki stall uses a simple 20%. ★","Net profit belongs to shareholders: dividends are paid out of it and the rest accumulates as retained earnings in equity on the balance sheet (Parts 2 and 4). A loss year pays no tax, and the loss can be carried forward to offset future profits."],
sections:[
{h:"Calculating tax (simplified)",blocks:[{t:"table",cols:["","Taiyaki stall (yen)","Vela Air year 1 (100m yen)","Vela Air year 2 (100m yen)"],rows:[
["Profit before tax","80,000","128","−105 (loss from high fuel prices)"],["Corporate tax","16,000 (20%)","38 (30%)","0 (no tax on a loss)"],["Net profit","64,000","90","−105"],["Later years","—","—","The 105 loss is carried forward and offset against year 3’s profit"]]},
{t:"note",x:"* Actual tax adjusts accounting profit to taxable income. Rates, carry-forward periods and limits vary by country and year. Japan: 10-year carry-forward, large companies may offset up to 50% of income. Korea: 15 years, up to 80% for large companies. ★"}]},
{h:"Deferred tax in one breath",blocks:[{t:"rows",items:[
{name:"Tax paid and tax expensed differ",x:"A loss year creates a right to lower future taxes, recorded as an asset (deferred tax asset), which reduces the tax expense shown on the income statement."},
{name:"When estimates change, profit moves",x:"If the outlook for future profits weakens, the deferred tax asset is written down and that year’s tax expense rises. Skymark’s year to March 2025 saw tax adjustments after a revised profit plan, pulling down net profit (Aviation Wire). ★"},
{name:"When reading",x:"If tax expense is far from 30% of profit before tax, deferred tax adjustments are at work. Read the tax note."}]}]},
{h:"Where net profit goes",blocks:[{t:"ladder",rise:24,steps:[{name:"Net profit",sub:"Vela Air year 1: 9.0bn yen"},{name:"Dividend",sub:"4.0bn paid to shareholders (cash flow statement: financing)"},{name:"To retained earnings",sub:"The remaining 5.0bn accumulates in equity on the balance sheet"},{name:"Seed money for the next investment",sub:"Strength that can fund aircraft purchases or loan repayments"}]},
{t:"point",x:"Net profit is not ‘cash left in hand’ (0-3). With a profit of 9.0bn, cash may have risen more or even fallen. Profit increases equity; cash is tracked separately in the cash flow statement."}]},
{h:"Try it",blocks:[{t:"check",items:[
{name:"Change the tax rate",x:"If the stall’s tax rate were 30%, what would net profit and retained earnings be? Does assets = liabilities + equity still hold?"},
{name:"Think about the loss year",x:"How does Vela Air’s year-2 loss of 10.5bn affect tax on year 3’s profit before tax of 17.0bn? Estimate year 3’s tax."}]}]}],
voice:"Do not leave a loss year at ‘at least we paid no tax’. Loss carry-forwards have time limits and caps, and are worthless unless the company returns to profit. Head-office finance values the deferred tax asset on exactly that outlook.",
terms:[["Corporate income tax","法人税","법인세"],["Effective tax rate","実効税率","실효세율"],["Tax loss carryforward","繰越欠損金","이월결손금"],["Deferred tax asset","繰延税金資産","이연법인세자산"],["Retained earnings","利益剰余金","이익잉여금"],["Dividend","配当","배당"]],
quiz:[{q:"Which is true of corporate tax in a loss year?",opts:["None is paid, and the loss can be offset against future profits","A fixed share of sales is still paid","The same amount as last year is paid","Shareholders pay instead"],a:0,exp:"This is the loss carry-forward system (periods and caps vary by country)."},
{q:"Net profit 9.0bn, dividend 4.0bn: by how much do retained earnings rise?",opts:["5.0bn","9.0bn","4.0bn","13.0bn"],a:0,exp:"What remains after the dividend accumulates in retained earnings."},
{q:"If tax expense is far from 30% of profit before tax, what do you suspect first?",opts:["Deferred tax adjustments","Unrecorded sales","A depreciation error","An FX loss"],a:0,exp:"Changes in estimated future tax move the tax expense."}]});
set("1-6",{title:"Reading a Real Income Statement: JAL and ANA, Year to March 2026",hl:"Real Income Statement",subtitle:"Size → margin → cost mix → year-on-year. Read in this order and every company follows the same procedure",
lead:["With the tools so far, we read real airline income statements: JAL (IFRS) and ANA Holdings (Japanese GAAP) for the year to March 2026 (April 2025 to March 2026). All figures are from each company’s earnings release and results presentation. ★","Read in four steps: ① the size of revenue, ② operating margin (earning power), ③ the cost mix (where the money goes), ④ comparison with the previous year (what changed). The procedure is the same for the taiyaki stall and for Vela Air."],
sections:[
{h:"① Size and ② margin",blocks:[{t:"table",cols:["(100m yen)","JAL (IFRS)","ANA HD (J-GAAP)"],rows:[
["Revenue","20,125","25,392"],["Operating costs","18,340","23,217"],["Operating profit","2,073 (EBIT 2,180)","2,174"],["Operating margin","10.3% (EBIT margin 10.8%)","8.6%"],["Ordinary profit","(no such step)","2,196"],["Profit attributable to owners","1,376","1,690"],["Net margin","6.8%","6.7%"]]},
{t:"note",x:"* JAL: earnings release for the year to March 2026 (IFRS), 30 April 2026. ANA: results presentation, 30 April 2026. JAL’s EBIT adds share of profit of associates and investment income to operating profit. ★"}]},
{h:"③ Cost mix",blocks:[{t:"table",cols:["JAL operating costs (100m yen)","Amount","Share","ANA air transportation costs (100m yen)","Amount","Share"],rows:[
["Staff","3,985","21.7%","Fuel and fuel tax","4,723","22.6%"],["Aircraft fuel","3,955","21.6%","Outsourcing","3,306","15.8%"],["Depreciation etc.","1,662","9.1%","Staff","2,616","12.5%"],["Other operating costs","8,739","47.6%","Maintenance parts and outsourced work","2,602","12.4%"],["","","","Aircraft leases","1,699","8.1%"],["","","","Depreciation","1,619","7.7%"],["","","","Airport charges","1,242","5.9%"],["","","","Distribution","644","3.1%"],["","","","Other","2,457","11.7%"],["Total","18,340","100%","Total","20,912","100%"]]},
{t:"point",x:"Two airlines, two presentations: JAL discloses four cost lines, ANA nine. The content of ‘other’ differs widely, so cost shares can only be compared once the definitions are aligned. This is the real-world version of ‘the line is company-specific’ from 1-3."}]},
{h:"④ Year-on-year",blocks:[{t:"rows",items:[
{name:"JAL: higher revenue, much higher profit",x:"Revenue +9.1%, EBIT +26.4%, net profit +28.6%. International passengers (inbound and Japan-originating business travel) and cargo grew, while fuel cost rose only 4.1%."},
{name:"ANA: record profit",x:"Revenue +12.3%, operating profit +10.6%, net profit +10.5%, helped by consolidating Nippon Cargo Airlines (NCA) and inbound demand."},
{name:"What it tells you",x:"Profit growing faster than revenue (JAL) means cost growth was contained. Profit and revenue growing at similar rates (ANA) means costs rose at the same pace."},
{name:"The year ahead",x:"Both forecast lower profit for the year to March 2027 on higher fuel prices from Middle East tensions (JAL net profit −20.1%, ANA −43.2%). The income statement is the past; read the outlook separately. ★"}]}]},
{h:"Cautions when reading",blocks:[{t:"check",items:[
{name:"Do not compare across standards directly",x:"JAL (IFRS) and ANA (J-GAAP) treat leases, extraordinary items and profit steps differently. Treat margin comparisons as indicative."},
{name:"Consolidated or standalone?",x:"The figures above are consolidated (whole group), not the airline entity alone. ANA’s costs are for the air transportation segment."},
{name:"Separate one-off factors",x:"Where the scope changed, as with NCA’s consolidation, do not read growth rates as underlying strength."},
{name:"Cite source and date",x:"Whenever you use a figure, note which document and which date it came from. The examples in this course will change as documents are updated ★."}]},
{t:"link",href:"航空会社経営ゲーム.html",x:"[Practice page] Airline Management Game: a year of Vela Air in three statements"}]}],
voice:"An earnings release has a summary on its first page or two. Do not try to read it all: practise picking out just four numbers in the ①–④ order every quarter. Within six months you will know the temperature of your own company and its competitors.",
terms:[["Earnings release (kessan tanshin)","決算短信","결산단신(실적 공시)"],["Results presentation","決算説明資料","결산 설명 자료"],["Consolidated","連結","연결"],["Non-consolidated / separate","単体","단체(별도)"],["Higher revenue and higher profit","増収増益","증수증익"],["EBIT margin","EBITマージン","EBIT 마진"]],
quiz:[{q:"In what order does this lesson suggest reading an income statement?",opts:["Size → margin → cost mix → year-on-year","Year-on-year → size → tax → dividend","Costs → sales → tax → profit","Look only at net profit"],a:0,exp:"So that every company can be read by the same procedure."},
{q:"What caution applies when comparing JAL’s and ANA’s operating margins?",opts:["Different accounting standards, so treat it as indicative","JAL is always right","They must never be compared","Compare after tax"],a:0,exp:"IFRS and Japanese GAAP differ in profit steps and treatments."},
{q:"ANA’s largest air transportation cost item in the year to March 2026 was…",opts:["Fuel and fuel tax (22.6%)","Staff","Depreciation","Airport charges"],a:0,exp:"Per the cost breakdown in the results presentation (★)."}]});
})(window.ARTS);
