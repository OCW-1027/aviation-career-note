/* 数字で読む会社 — English version (Part 6) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("6-1",{title:"Profitability and the ROE Breakdown: Margin × Turnover × Leverage",hl:"the ROE Breakdown",subtitle:"Earning power splits into profit on sales, how hard the assets work, and how much is borrowed. The same ROE can hide very different businesses",
lead:["Parts 0 to 5 covered how to read the three statements and the items special to airlines. Part 6 divides one number by another to make ratios. Ratios let you compare companies of different sizes, and the same company from one year to the next.","We start with profitability. Return on equity (ROE) shows how much profit the owners’ money produced, and it splits into margin, turnover and leverage. Worked on the small company that grew out of the taiyaki stall and on Vela Air, the shape of each business shows up directly in the numbers."],
sections:[
{h:"Three margins",blocks:[{t:"fig",id:"fin_margin_steps",cap:"Margins of the small company and Vela Air side by side. With heavy depreciation and interest, the airline falls further behind at each lower level of profit"},
{t:"table",cols:["Measure","Formula","Small company (million yen)","Vela Air year 1 (100m yen)"],rows:[
["Gross margin","Gross profit ÷ sales","190 ÷ 300 = 63.3%","(airlines are read by operating cost items)"],
["Operating margin","Operating profit ÷ sales","30 ÷ 300 = 10.0%","180 ÷ 3,000 = 6.0%"],
["EBITDA margin","(Operating profit + depreciation) ÷ sales","42 ÷ 300 = 14.0%","434 ÷ 3,000 = 14.5%"],
["Net margin","Net profit ÷ sales","20.3 ÷ 300 = 6.8%","90 ÷ 3,000 = 3.0%"]]},
{t:"point",x:"A margin means different things depending on which profit is used (1-2). Operating margin shows the strength of the core business; net margin shows what is left for shareholders. EBITDA adds depreciation back to operating profit, and is used to compare airlines that own their aircraft with those that lease them."}]},
{h:"ROE: how much profit the owners’ money produced",blocks:[{t:"fig",id:"fin_roe_tree",cap:"ROE split into three boxes: the small company above, Vela Air year 1 below"},
{t:"rows",items:[
{name:"ROE = net profit ÷ equity",x:"Small company: 20.3 ÷ 59.65 (the average of opening 52 and closing 67.3) = 34.0%. Vela Air year 1: 90 ÷ 1,945 (the average of 1,920 and 1,970) = 4.6%."},
{name:"The denominator is the average of opening and closing",x:"Profit is earned over the whole year, so equity is averaged over the year too. Some sources divide by closing equity only, which gives 30.2% for the small company. Use the same method when comparing."},
{name:"ROA = net profit ÷ total assets",x:"How much profit all the assets produced, including those bought with borrowed money. Small company 21.9%, Vela Air year 1 1.5%."}]}]},
{h:"Splitting it in three (the DuPont breakdown)",blocks:[{t:"table",cols:["","Net margin","Asset turnover","Leverage","ROE"],rows:[
["Formula","Net profit ÷ sales","Sales ÷ total assets","Total assets ÷ equity","The three multiplied"],
["Small company","6.8%","3.24×","1.55×","34.0%"],
["Vela Air year 1","3.0%","0.50×","3.06×","4.6%"],
["Vela Air year 2 (fuel spike)","−3.3%","0.54×","3.07×","−5.5%"],
["Vela Air year 3","3.8%","0.55×","3.12×","6.7%"]]},
{t:"note",x:"* Total assets and equity are averages of opening and closing balances. Figures are rounded, so the product can differ by 0.1 to 0.2."},
{t:"point",x:"The small company turns its assets into sales more than three times a year. Vela Air takes two years to turn its assets once, but uses loans and leases to hold assets worth three times its equity. An airline’s ROE rests on a thin margin held up by large assets and leverage, which is why a small fall in margin swings ROE negative, as in year 2."}]},
{h:"Checking against real accounts ★",blocks:[{t:"rows",items:[
{name:"Page one of a Japanese earnings release (kessan tanshin)",x:"Companies under Japanese GAAP show return on equity, ordinary profit to total assets, and operating margin. IFRS companies show profit to equity attributable to owners and pre-tax profit to total assets. Note that the ROA numerator is ordinary or pre-tax profit, not net profit."},
{name:"ANA (Japanese GAAP, year to March 2026)",x:"Return on equity 12.9%, ordinary profit to total assets 5.8%, operating margin 8.6%. Broken down: net margin 6.7% × turnover 0.67 × leverage of about 2.9 (earnings release, 30 April 2026). ★"},
{name:"JAL (IFRS, year to March 2026)",x:"Return on equity attributable to owners 12.2%, pre-tax profit to total assets 6.9%, EBIT to revenue 10.8% (earnings release, 30 April 2026). ★"},
{name:"Korean annual reports",x:"There is no fixed ratio line like the Japanese release, so calculate from the consolidated statements. When using figures from brokers or websites, check whether the denominator is an average or a closing balance. ★"}]},
{t:"check",items:[
{name:"Break down Vela Air year 3",x:"Net profit 127, sales 3,300, total assets the average of 5,880 and 6,012, equity the average of 1,865 and 1,942. Work out the three numbers, multiply them, and confirm 6.7%."},
{name:"Which lever raises ROE?",x:"Vela Air could (1) raise fares to lift the margin by one point, (2) fly 5% more ASK with the same fleet, or (3) borrow to buy back shares. Write which part of ROE each one moves and what risk it carries."}]},
{t:"link",href:"財務比率の計算練習.html",x:"[Practice page] Financial Ratio Practice: enter the figures and see the ROE breakdown and each ratio with its formula"}]}],
voice:"When you see a high ROE, split it in three first. Is it the margin, fast-turning assets, or borrowing? A company whose ROE is high only because of the third is the first to struggle when conditions turn.",
terms:[["Return on equity","ROE（自己資本利益率）","ROE(자기자본이익률)"],["Return on assets","ROA（総資産利益率）","ROA(총자산이익률)"],["Asset turnover","総資産回転率","총자산회전율"],["Financial leverage","財務レバレッジ","재무 레버리지"],["EBITDA","EBITDA（償却前営業利益）","EBITDA(상각 전 영업이익)"]],
quiz:[{q:"Which three factors multiply to give ROE?",opts:["Net margin × asset turnover × financial leverage","Operating margin × current ratio × payout ratio","Gross margin × inventory turnover × tax rate","ROA × equity ratio × sales"],a:0,exp:"Net profit ÷ sales, sales ÷ total assets and total assets ÷ equity multiply to net profit ÷ equity."},
{q:"What does the gap between Vela Air’s turnover (0.5) and the small company’s (3.2) show?",opts:["An airline needs large assets relative to its sales","The airline is badly managed","The small company borrows more","The airline holds more inventory"],a:0,exp:"A business that uses expensive assets such as aircraft for many years has low turnover."},
{q:"In a Japanese-GAAP earnings release, what is the numerator of ‘ordinary profit to total assets’?",opts:["Ordinary profit","Net profit","Operating profit","Gross profit"],a:0,exp:"It differs from ROA calculated on net profit. Align the definitions before comparing."}]});
set("6-2",{title:"Financial Safety: How Much Can the Company Withstand?",hl:"How Much Can the Company Withstand?",subtitle:"Payments due within a year, the weight of debt, and the ability to pay interest: three angles on whether the company survives a loss-making year",
lead:["Safety ratios ask whether the company can keep paying its bills. A profitable company still stops if there is no cash on payment day (4-4). Airlines can see demand vanish suddenly, so the cushion they hold in normal times matters all the more.","There are three angles: (1) can it meet payments due within a year, (2) is debt too heavy relative to equity, and (3) do earnings cover the interest. We read Vela Air’s three years to see what worsened in loss-making year 2 and what held."],
sections:[
{h:"1. Short term: can it meet payments due within a year?",blocks:[{t:"rows",items:[
{name:"Current ratio = current assets ÷ current liabilities",x:"Taiyaki stall 159%, Vela Air opening 126% (2-2). Above 100%, assets that turn into cash within a year exceed payments due within a year."},
{name:"Read it again without unearned revenue",x:"Of Vela Air’s 1,370 of current liabilities, 720 is unearned ticket revenue and miles. It disappears when the passenger flies and no cash goes out. Without it: 1,720 ÷ 650 = 265%. Read an airline’s current ratio both ways."},
{name:"Liquidity on hand = cash ÷ monthly sales",x:"Vela Air: 1,044 ÷ 250 = 4.2 months at the end of year 1, 4.8 months at the end of year 2, 4.9 months at the end of year 3. A guide to how many months it could keep paying if sales stopped. Since the pandemic many airlines keep this thick (5-6). ★"}]},
{t:"point",x:"Short-term safety is read from what the liabilities are, not only from the ratio. Liabilities repaid in cash (payables, short-term loans) and liabilities that disappear when the service is delivered (unearned revenue, miles) weigh differently, though both are current liabilities."}]},
{h:"2. Long term: is debt too heavy relative to equity?",blocks:[{t:"fig",id:"fin_safety",cap:"Vela Air’s total assets split into equity, interest-bearing debt and other liabilities"},
{t:"table",cols:["(100m yen)","Opening","End of year 1","End of year 2","End of year 3"],rows:[
["Equity ratio (equity ÷ total assets)","32.0%","33.3%","31.7%","32.3%"],
["Debt ratio (liabilities ÷ equity)","212.5%","200.0%","215.3%","209.6%"],
["Interest-bearing debt (loans + leases)","2,300","2,090","2,080","2,070"],
["D/E ratio (interest-bearing debt ÷ equity)","1.20×","1.06×","1.12×","1.07×"],
["Net debt (interest-bearing debt − cash)","1,100","1,046","824","732"],
["Net D/E ratio","0.57×","0.53×","0.44×","0.38×"]]},
{t:"point",x:"Japan usually talks in terms of the equity ratio and the D/E ratio; Korea in terms of the debt ratio (liabilities to equity). They are the same thing seen from different sides: equity ratio = 1 ÷ (1 + debt ratio). A debt ratio of 200% is an equity ratio of 33.3%. ★"},
{t:"note",x:"* The debt ratio counts all liabilities, including unearned revenue and provisions; the D/E ratio counts only liabilities that bear interest. Whether leases are in liabilities depends on the accounting standard (2-3, 5-2), so align this before comparing companies."}]},
{h:"3. Do earnings cover interest and debt?",blocks:[{t:"fig",id:"fin_coverage",cap:"Vela Air’s three years: how many times green (earnings) covers orange (interest). In year 2 earnings were negative"},
{t:"table",cols:["","Year 1","Year 2 (fuel spike)","Year 3","Reading"],rows:[
["Interest coverage ((operating profit + financial income) ÷ interest expense)","3.2×","−0.8×","3.5×","Below 1×, the core business is not covering interest"],
["EBITDA (operating profit + depreciation)","434","208","501","Earnings with non-cash depreciation added back"],
["Interest-bearing debt ÷ EBITDA","4.8×","10.0×","4.1×","How many years of earnings the debt represents"],
["Net debt ÷ EBITDA","2.4×","4.0×","1.5×","The weight after deducting cash"]]},
{t:"point",x:"In year 2 profit did not cover interest and debt to EBITDA jumped to 10 times. Yet cash rose and net debt fell, because investment was paused and unearned revenue grew (4-5). In a year when the ratios worsen, check whether cash was protected."},
{t:"note",x:"* In Korea the interest coverage ratio is usually operating profit ÷ interest expense (3.1× for Vela Air year 1). The interest coverage ratio shown in a Japanese earnings release is operating cash flow ÷ interest paid (6-5). The same name can hide a different formula. ★"}]},
{h:"Cautions, and try it",blocks:[{t:"rows",items:[
{name:"Benchmarks differ by industry",x:"In asset-heavy industries such as airlines, railways and power, an equity ratio of 30 to 40% is often considered sound; lighter industries usually run higher. Do not judge by the number alone. ★"},
{name:"Promises written into loan agreements (financial covenants)",x:"Bank loans may carry conditions such as ‘keep net assets above a set level’ or ‘no two consecutive years of ordinary loss’. A breach can trigger a demand for immediate repayment, so in a loss-making year this is the first thing to check. ★"},
{name:"Look at the repayment schedule",x:"Beyond the total of interest-bearing debt, check in the notes how much falls due within a year. At Vela Air’s opening, 300 of its 1,800 of loans were short term."}]},
{t:"check",items:[
{name:"If Vela Air borrowed 20bn yen to buy aircraft",x:"Using the end of year 3 (total assets 6,012, equity 1,942, interest-bearing debt 2,070, cash 1,338), calculate how the equity ratio, D/E ratio and net debt change."},
{name:"Explain year 2",x:"Using the words cash, unearned revenue and investment, explain why the company kept going although interest coverage was negative."}]},
{t:"link",href:"財務比率の計算練習.html",x:"[Practice page] Financial Ratio Practice: choose Vela Air’s three years and watch the safety ratios move"}]}],
voice:"When a station or a team is told ‘we are freezing investment this year’ or ‘we are slowing hiring’, the company is protecting the ratios in this lesson. Break a promise to the banks and the next aircraft, and the next route, cannot be financed.",
terms:[["Current ratio","流動比率","유동비율"],["Debt ratio (liabilities to equity)","負債比率","부채비율"],["Debt-to-equity ratio","D/Eレシオ","D/E 비율"],["Interest coverage ratio","インタレスト・カバレッジ・レシオ","이자보상배율"],["Financial covenants","財務制限条項（コベナンツ）","재무 약정(커버넌트)"]],
quiz:[{q:"A company has a debt ratio of 200%. What is its equity ratio?",opts:["About 33%","50%","About 67%","200%"],a:0,exp:"If equity is 1, liabilities are 2 and total assets 3. 1 ÷ 3 = 33.3%."},
{q:"When reading an airline’s current ratio, what is sometimes left out of current liabilities?",opts:["Unearned revenue and miles (liabilities that disappear on carriage)","Trade payables","Short-term loans","Income tax payable"],a:0,exp:"They are not repaid in cash; they turn into revenue when the passenger is carried (2-2)."},
{q:"What does interest coverage below 1× mean?",opts:["Core profit does not cover the interest","Debt has fallen to zero","Cash is increasing","The equity ratio is above 100%"],a:0,exp:"Interest has to be paid from cash on hand or new borrowing, and if it continues funding becomes tight."}]});
set("6-3",{title:"Efficiency: How Many Times Do the Assets Turn?",hl:"How Many Times Do the Assets Turn?",subtitle:"Is the same revenue being earned with fewer assets and in fewer days? Read it through turnover and turnover periods",
lead:["Efficiency asks how well the company uses what it owns. For the same sales, the fewer the assets and the shorter the wait between selling and being paid, the less money the business needs.","There are two yardsticks: turnover, how many times a year the assets turn into sales; and turnover periods, how many days of receivables, inventory and payables are outstanding (2-4). Airlines add one of their own: how hard the aircraft work."],
sections:[
{h:"Turnover: how many times assets become sales",blocks:[{t:"fig",id:"fin_asset_turn",cap:"Total assets and sales as bars. The figure on the right is asset turnover"},
{t:"table",cols:["","Sales","Total assets (average)","Asset turnover","Meaning"],rows:[
["Small company (million yen)","300","92.65","3.24×","Sells more than three times its assets in a year"],
["Vela Air year 1 (100m yen)","3,000","5,955","0.50×","A year’s sales are half the assets"],
["Vela Air year 3 (100m yen)","3,300","5,946","0.55×","Sales up 10% without adding assets"]]},
{t:"point",x:"Low turnover is not bad in itself: this is a business that uses expensive aircraft for twenty years. What matters is the direction. Vela Air moved from 0.50 to 0.54 to 0.55 over three years, earning more sales from the same assets."},
{t:"note",x:"* Under standards where leased aircraft stay off the balance sheet, total assets look smaller and turnover higher (2-3, 5-2). Check the standard before comparing companies. ★"}]},
{h:"Turnover periods: how many days until the cash comes back",blocks:[{t:"fig",id:"fin_ccc",cap:"The small company from purchase to cash back. The red part is the 7 days it funds with its own money"},
{t:"table",cols:["Measure","Formula","Small company","Reading"],rows:[
["Receivable days","Receivables ÷ sales × 365","8 ÷ 300 × 365 = about 10 days","From sale to payment"],
["Inventory days","Inventory ÷ cost of sales × 365","6 ÷ 110 × 365 = about 20 days","From purchase to use"],
["Payable days","Payables ÷ purchases × 365","7 ÷ 112 × 365 = about 23 days","From purchase to payment"],
["Cash conversion cycle (CCC)","Receivable days + inventory days − payable days","10 + 20 − 23 = about 7 days","Days the company funds itself between paying and collecting"]]},
{t:"note",x:"* Purchases 112 = cost of sales 110 + increase in inventory 2."},
{t:"point",x:"The shorter the CCC, the less cash has to sit idle to keep the business running. A growing company whose CCC is lengthening is on the road to insolvency while profitable (4-4). The three sliders in the simulator (collection 10 days, inventory 20 days, payment 23 days) are these three periods."}]},
{h:"Airlines run the other way",blocks:[{t:"rows",items:[
{name:"Paid first: unearned revenue and miles",x:"Vela Air opens with 720 of unearned revenue and miles: 88 days of its 3,000 of annual sales received before flying. By the end of year 3 it is 880, or 97 days of 3,300."},
{name:"Receivables are about 30 days",x:"250 ÷ 3,000 × 365 = 30 days: settlements through travel agents (BSP), card payments in transit, and cargo charges (2-4)."},
{name:"Payables are about 43 days",x:"350 ÷ 3,000 × 365 = 43 days (a guide using sales as the denominator): fuel, handling and airport charges, billed at month end and paid the next month."},
{name:"Working capital is minus 700",x:"250 + 120 − 350 − 600 − 120 = −700 (2-4). The business runs on customers’ and suppliers’ money. While sales grow, cash arrives early; when bookings stop, it flows out all at once."}]},
{t:"point",x:"A business with negative working capital is comfortable while growing and dangerous when it stops. That is why the liquidity on hand in 6-2 is kept thick."}]},
{h:"Efficiency only airlines have: how much the aircraft flew",blocks:[{t:"table",cols:["","Year 1","Year 2","Year 3","Reading"],rows:[
["Fleet","50 aircraft","50 aircraft","51 aircraft","—"],
["ASK (100m seat-km)","200","205","215","Capacity supplied"],
["ASK per aircraft (100m seat-km)","4.00","4.10","4.22","Are the aircraft flying hard?"],
["Load factor","82%","80%","83%","Were the seats flown filled?"],
["Total revenue ÷ ASK (yen)","15.0","15.4","15.4","Earnings per seat-km"]]},
{t:"point",x:"Airline efficiency has three steps: fly each aircraft longer, fill the seats, and sell each seat for more. Keeping turnarounds on time, cutting days lost to maintenance, cutting delays: front-line work feeds straight into ASK per aircraft (5-5)."},
{t:"check",items:[
{name:"If payment stretched to 30 days",x:"The small company’s receivables would be 300 × 30 ÷ 365 = about 25, some 17 more than the present 8, and cash falls by that much. Confirm it in the simulator."},
{name:"Turnaround at your airport",x:"If the turnaround of your flight were 10 minutes shorter, use the timetable to work out how much more that aircraft could fly in a day."}]},
{t:"link",href:"財務諸表の連動シミュレーター.html",x:"[Practice page] Linked Financial Statements Simulator: move the collection, inventory and payment days and watch cash change"}]}],
voice:"Cutting delays and protecting the turnaround are for the passenger, and they are also how an aircraft worth tens of billions of yen flies a little longer each day. Five minutes on the ramp moves the company’s turnover.",
terms:[["Asset turnover","総資産回転率","총자산회전율"],["Days sales outstanding","売上債権回転期間","매출채권 회전기간"],["Days inventory outstanding","棚卸資産回転期間","재고자산 회전기간"],["Cash conversion cycle","キャッシュ・コンバージョン・サイクル（CCC）","현금전환주기(CCC)"],["Aircraft utilisation","機材の稼働","기재 가동"]],
quiz:[{q:"What does an asset turnover of 0.5 mean?",opts:["A year’s sales are half of total assets","The margin is 50%","The assets last half a year","Debt is half of assets"],a:0,exp:"Sales ÷ total assets = 0.5. It is low in asset-heavy businesses."},
{q:"What shortens the cash conversion cycle?",opts:["Collecting receivables sooner","Holding more inventory","Paying suppliers sooner","Selling less"],a:0,exp:"Shorten receivable or inventory days, or lengthen payable days."},
{q:"Why does an airline’s working capital tend to be negative?",opts:["Tickets are paid for before the flight","It holds a lot of inventory","It has large receivables","Depreciation is large"],a:0,exp:"Unearned revenue and miles exceed receivables and inventory (2-4)."}]});
set("6-4",{title:"Growth: Splitting It into Volume and Price",hl:"Volume and Price",subtitle:"Why sales grew matters more than by how much. Whether volume rose or price rose changes how you read the year ahead",
lead:["Growth asks how much bigger the company is than last year. But the percentage alone does not tell you much: sales that grew through higher prices and sales that grew through more customers carry on differently the next year.","This lesson covers growth rates, the compound annual growth rate that smooths several years, splitting revenue growth into volume × price, and the traps in reading profit growth, all on Vela Air’s three years."],
sections:[
{h:"Growth rates and the compound annual rate",blocks:[{t:"table",cols:["(100m yen)","Year 1","Year 2","Year 3"],rows:[
["Sales","3,000","3,160","3,300"],
["Year-on-year","—","+5.3%","+4.4%"],
["Index (year 1 = 100)","100","105.3","110.0"],
["Operating profit","180","−54","231"],
["Change in operating profit","—","−234 (into loss)","+285 (back to profit)"]]},
{t:"rows",items:[
{name:"Growth rate = (this year − last year) ÷ last year",x:"Year 2 sales: (3,160 − 3,000) ÷ 3,000 = +5.3%."},
{name:"Compound annual growth rate (CAGR)",x:"From 3,000 to 3,300 in two years: the square root of (3,300 ÷ 3,000), minus 1 = 4.9% a year. Growth with the ups and downs smoothed out."},
{name:"Do not calculate a growth rate across a loss",x:"A ‘growth rate’ from −54 to 231 means nothing. When the base is negative or close to zero, state the change in amount (+285), not a percentage."}]}]},
{h:"Splitting revenue growth: volume × price",blocks:[{t:"fig",id:"fin_growth_split",cap:"Passenger revenue growth split into volume carried (RPK) and price (yield)"},
{t:"table",cols:["","Year 1","Year 2","Year 3"],rows:[
["Passenger revenue (100m yen)","2,460","2,590 (+5.3%)","2,690 (+3.9%)"],
["Volume: RPK (100m pax-km)","164","164 (±0%)","178.5 (+8.8%)"],
["Price: yield (yen)","15.0","15.8 (+5.3%)","15.1 (−4.5%)"]]},
{t:"point",x:"Year 2’s growth was all price; year 3’s was all volume. In year 2 the fuel spike was passed on through fares and surcharges, yield rose, and no more passengers flew. In year 3 yield came back down and load factor rose. Both are ‘higher revenue’, with opposite contents."}]},
{h:"Which business drove the growth",blocks:[{t:"table",cols:["Increase (100m yen)","Year 1 → 2","Year 2 → 3"],rows:[
["International passenger","+100","+80"],["Domestic passenger","+30","+20"],["Cargo","+20","0"],["Ancillary","+10","+20"],["Other","0","+20"],["Total increase in sales","+160","+140"]]},
{t:"rows",items:[
{name:"Contribution = that business’s increase ÷ last year’s total sales",x:"International passenger in year 2: 100 ÷ 3,000 = +3.3 points. It produced about 60% of the 5.3% growth."},
{name:"Ancillaries are small but growing fast",x:"120 → 130 → 150: up 25% in two years. Seat selection, baggage and in-flight sales, revenue other than the fare (5-6)."}]}]},
{h:"Profit growth, and growth that can be sustained",blocks:[{t:"fig",id:"fin_profit_bridge",cap:"The reasons operating profit moved from year 1 to year 2, stacked in order"},
{t:"rows",items:[
{name:"Sales up, profit down",x:"In year 2 sales rose 160 but fuel rose 323, and non-fuel costs also rose from 2,143 to 2,214 (+71). Costs rose more than sales, and operating profit went from 180 to −54."},
{name:"Read cost growth as ‘fuel’ and ‘everything else’",x:"With year 1 as 100, year 3 is sales 110.0, ASK 107.5, non-fuel costs 106.3, fuel 116.7. If non-fuel costs grow more slowly than capacity (ASK), efficiency has improved."},
{name:"Sustainable growth rate = ROE × (1 − payout ratio)",x:"Only the profit that is kept, not paid out, lets assets grow without changing the share of borrowing. Vela Air year 3: 6.7% × (1 − 50 ÷ 127) = about 4.0%. Growing faster than this for long requires more borrowing or new equity."}]},
{t:"check",items:[
{name:"Split passenger revenue from year 1 to year 3",x:"2,460 → 2,690 (+9.3%). RPK 164 → 178.5 (+8.8%), yield 15.0 → 15.1 (+0.5%). Confirm that over two years almost all the growth was volume."},
{name:"Think about your own route",x:"Find how passenger numbers and average fare on your route changed from last year, and write in one line whether the rise (or fall) in revenue came from volume or price."}]}]}],
voice:"Few people who report ‘105% of last year’ can go on to say how much was passenger numbers and how much was price. Splitting it that way is what starts the discussion of the next move: more flights, or the fare?",
terms:[["Year-on-year growth","前年比（伸び率）","전년 대비(증가율)"],["Compound annual growth rate","年平均成長率（CAGR）","연평균 성장률(CAGR)"],["Contribution to growth","寄与度","기여도"],["Yield","イールド","일드(단위 운임)"],["Sustainable growth rate","持続可能な成長率","지속가능 성장률"]],
quiz:[{q:"What made up Vela Air’s +5.3% passenger revenue in year 2?",opts:["Volume (RPK) flat, price (yield) +5.3%","Volume +5.3%, price flat","Volume and price +2.6% each","Volume down, price +10%"],a:0,exp:"RPK stayed at 164 while yield rose from 15.0 to 15.8 yen."},
{q:"Operating profit went from −54 to 231. How should the change be expressed?",opts:["As a change in amount (+285) or ‘a return to profit’","As +528%","As −428%","As 100% growth"],a:0,exp:"A growth rate on a negative base is meaningless."},
{q:"What does the sustainable growth rate show?",opts:["How fast the company can grow without changing its borrowing share or raising equity","Next year’s sales forecast","Dividend growth","The rise in fuel prices"],a:0,exp:"ROE × (1 − payout ratio): the rate at which retained profit adds to equity."}]});
set("6-5",{title:"Cash Flow Analysis: Earnings Quality and What Is Left After Investment",hl:"Earnings Quality",subtitle:"Is profit backed by cash? Does the cash earned cover investment and repayments? Read three years side by side",
lead:["Part 3 explained why profit and cash differ and how to calculate free cash flow (FCF). This lesson turns that into a tool for analysis. There are two questions. Is profit turning into cash (earnings quality)? And does the cash earned cover investment, repayments and dividends?","Airlines have heavy depreciation and unearned revenue, so operating cash flow is far larger than profit. The point of this lesson is not to be reassured by its size, but to look at what remains after aircraft investment and lease repayments."],
sections:[
{h:"Earnings quality: is profit turning into cash?",blocks:[{t:"table",cols:["","Small company (million yen)","Vela Air year 1 (100m yen)","Year 2","Year 3"],rows:[
["Net profit","20.3","90","−105","127"],
["Operating cash flow","27.3","394","222","442"],
["Operating cash flow ÷ net profit","1.3×","4.4×","(net loss)","3.5×"],
["Operating cash flow margin (÷ sales)","9.1%","13.1%","7.0%","13.4%"]]},
{t:"rows",items:[
{name:"Be wary if it stays well below 1× for years",x:"Profit without cash coming in is a sign that receivables or inventory are swelling (3-2, 4-4). Much improper accounting shows up here too."},
{name:"Why airlines score high",x:"Depreciation (254 for Vela Air in year 1) reduces profit without any cash leaving, and growing unearned revenue brings cash in early. Three to four times is not unusual."},
{name:"Compare years by the margin",x:"Year 2 fell from 13.1% to 7.0%. Operating cash flow stayed positive in a loss-making year, but the power to generate cash halved."}]}]},
{h:"Is investment enough, or too much?",blocks:[{t:"table",cols:["(100m yen)","Year 1","Year 2","Year 3","Three years"],rows:[
["Operating cash flow","+394","+222","+442","+1,058"],
["Capital expenditure (aircraft)","−300","0","−300","−600"],
["Free cash flow","+94","+222","+142","+458"],
["Depreciation","254","262","270","786"],
["Capital expenditure ÷ depreciation","1.18×","0×","1.11×","0.76×"]]},
{t:"point",x:"If capital expenditure stays below depreciation for years, the fleet simply ages. In year 2 investment was paused to protect cash, and the book value of aircraft fell from 2,146 to 1,884. Over three years the ratio is 0.76: Vela Air put off renewing its fleet."}]},
{h:"Deduct lease repayments too",blocks:[{t:"fig",id:"fin_cf_quality",cap:"Net profit, operating cash flow, FCF and FCF after lease payments over three years"},
{t:"table",cols:["(100m yen)","Year 1","Year 2","Year 3","Three years"],rows:[
["Free cash flow","+94","+222","+142","+458"],
["Repayment of lease liabilities","−60","−60","−60","−180"],
["FCF after lease payments","+34","+162","+82","+278"],
["Dividends","−40","0","−50","−90"],
["Change in loans","−150","+50","+50","−50"],
["Change in cash","−156","+212","+82","+138"]]},
{t:"note",x:"* Under IFRS and K-IFRS the principal part of lease payments appears in financing activities, so operating cash flow and FCF look larger. When comparing airlines, the practical standard is FCF after lease repayments (5-2). Under current Japanese GAAP, operating lease payments sit in operating costs, so no adjustment is needed. ★"}]},
{h:"How many years to repay the debt?",blocks:[{t:"fig",id:"fin_cash_use",cap:"Where the 105.8bn yen of operating cash flow over three years went"},
{t:"table",cols:["","Year 1","Year 2","Year 3"],rows:[
["Interest-bearing debt ÷ operating cash flow (years)","5.3","9.4","4.7"],
["Operating cash flow ÷ interest expense (times)","6.8×","3.4×","6.5×"]]},
{t:"rows",items:[
{name:"Two measures printed in Japanese earnings releases",x:"‘Cash flow to interest-bearing debt ratio (years)’ and ‘interest coverage ratio (times)’ appear in the discussion of financial position, with several years of history. They are the same calculations as the two rows above. ★"},
{name:"Where three years of cash went",x:"Operating cash flow 1,058 → aircraft 600, lease repayments 180, dividends 90, net loan repayment 50, leaving 138 as the increase in cash. Nearly 60% of the cash earned went into aircraft."}]},
{t:"check",items:[
{name:"If 500 of aircraft had been bought in year 3",x:"Calculate how FCF, FCF after lease payments and the change in cash would differ. Could it have been done without reducing cash on hand?"},
{name:"Try it on a real company",x:"From JAL’s operating cash flow of 394.9bn yen and purchases of fixed assets of 202.4bn yen (3-4) ★, calculate the operating cash flow margin (revenue 2,012.5bn yen) and investment as a share of operating cash flow."}]},
{t:"link",href:"財務比率の計算練習.html",x:"[Practice page] Financial Ratio Practice: enter operating cash flow, capital expenditure and lease repayments to check FCF and debt capacity"}]}],
voice:"When a results briefing says ‘record operating cash flow’, look next at how much went on aircraft and how much on lease repayments. In an airline, most of the cash earned turns into wings.",
terms:[["Earnings quality","利益の質","이익의 질"],["Operating cash flow margin","営業キャッシュフロー・マージン","영업현금흐름 마진"],["Capital expenditure","設備投資","설비투자(CAPEX)"],["Free cash flow after lease payments","リース返済後のフリーキャッシュフロー","리스 상환 후 잉여현금흐름"],["Debt to operating cash flow","キャッシュ・フロー対有利子負債比率","현금흐름 대 유이자부채 비율"]],
quiz:[{q:"Why is an airline’s operating cash flow often three to four times its net profit?",opts:["Depreciation is large and unearned revenue brings cash in early","Receivables are large","Inventory is large","It pays no tax"],a:0,exp:"Depreciation is a non-cash cost and unearned revenue is cash received in advance (3-2, 5-3)."},
{q:"What happens if capital expenditure stays below depreciation for years?",opts:["The fleet and equipment age","Cash must fall","Profit must rise","Debt must rise"],a:0,exp:"Less is being bought than is being used up."},
{q:"What should be deducted when reading the FCF of an IFRS airline?",opts:["Repayment of lease liabilities","Depreciation","The increase in unearned revenue","Income tax"],a:0,exp:"Lease principal repayments are shown in financing, so FCF looks larger unless they are deducted."}]});
set("6-6",{title:"Comparing Airlines: Operating Metrics and Financial Ratios on One Page",hl:"on One Page",subtitle:"Put load factor and CASK in the same table as margin, equity ratio and cash flow. Three years of history and the gap to other airlines can then be read with their reasons",
lead:["The last five lessons assembled the ratios for profitability, safety, efficiency, growth and cash flow. This lesson puts them on one page alongside the airline operating metrics from 5-5.","Financial ratios are the result; operating metrics are the cause. Did the margin fall because of load factor, price, fuel, or non-fuel costs? On one page, both the three-year story and the difference from other airlines can be read with their reasons."],
sections:[
{h:"Vela Air on one page",blocks:[{t:"table",cols:["","Year 1","Year 2 (fuel spike)","Year 3"],rows:[
["[Operations] ASK (100m seat-km) / load factor","200 / 82%","205 / 80%","215 / 83%"],
["[Operations] Total revenue ÷ ASK / CASK (yen)","15.0 / 14.1","15.4 / 15.7","15.4 / 14.3"],
["[Operations] CASK ex fuel (yen)","10.7","10.8","10.6"],
["[Profitability] Operating margin / ROE","6.0% / 4.6%","−1.7% / −5.5%","7.0% / 6.7%"],
["[Safety] Equity ratio / net debt ÷ EBITDA","33.3% / 2.4×","31.7% / 4.0×","32.3% / 1.5×"],
["[Efficiency] Asset turnover / ASK per aircraft","0.50× / 4.00","0.54× / 4.10","0.55× / 4.22"],
["[Growth] Passenger revenue year-on-year (volume / price)","—","+5.3% (±0% / +5.3%)","+3.9% (+8.8% / −4.5%)"],
["[Cash] Operating cash flow margin / FCF after lease payments","13.1% / +34","7.0% / +162","13.4% / +82"]]},
{t:"point",x:"Year 2 in one sentence: ‘fuel pushed CASK up 1.6 yen; fares were raised to recover it but load factor fell and the result was an operating loss; yet CASK ex fuel was unchanged and cash was protected.’ Joining the operating rows to the financial rows produces a sentence like this."}]},
{h:"Reading over time: index and common size",blocks:[{t:"fig",id:"fin_trend_index",cap:"Vela Air’s three years as an index with year 1 = 100"},
{t:"table",cols:["Year 1 = 100","Year 1","Year 2","Year 3"],rows:[
["Sales","100","105.3","110.0"],["ASK","100","102.5","107.5"],["Fuel","100","147.7","116.7"],["Non-fuel operating costs","100","103.3","106.3"]]},
{t:"fig",id:"fin_common_size",cap:"The make-up of each 100 of sales. Non-fuel costs (grey) get thinner each year"},
{t:"table",cols:["As a share of sales","Year 1","Year 2","Year 3"],rows:[
["Fuel","22.6%","31.6%","23.9%"],["Non-fuel operating costs","71.4%","70.1%","69.1%"],["Operating profit","6.0%","−1.7%","7.0%"]]},
{t:"point",x:"An index shows what grew faster than what; a common-size statement shows how each 100 yen of sales was spent. Non-fuel costs fell from 71.4% to 69.1% of sales. It is hidden behind the fuel swing, but Vela Air’s underlying cost base improved over the three years."}]},
{h:"Comparing with other airlines and other industries",blocks:[{t:"rows",items:[
{name:"Airline against airline",x:"First align the accounting standard, year end, currency and consolidation scope (5-6). Then the shape of the business (full-service or low-cost, the weight of international and cargo). Then line up CASK ex fuel, load factor, operating margin, equity ratio and net debt to EBITDA, in that order."},
{name:"Align the leases",x:"An airline with leases on its balance sheet and one without cannot be compared directly on equity ratio or EBITDA. A common shortcut for the one without is to multiply annual lease rentals by a set multiple (around 7 is often used) and add the result to debt. ★"},
{name:"How other industries differ",x:"Retail has low margins and high turnover. Manufacturing carries heavy inventory and receivables. Airlines turn assets about 0.5 times, run leverage of about 3, and have negative working capital thanks to unearned revenue. What is ‘normal’ differs by industry, so compare within the industry and understand the industry’s traits by their reasons."},
{name:"Do not decide on one year",x:"Airline profits swing with fuel and exchange rates. On year 2 alone Vela Air is a loss-making company; over three years it grew 4.9% a year and cut interest-bearing debt by 230."}]}]},
{h:"Try it",blocks:[{t:"check",items:[
{name:"Build the page for two airlines",x:"Pick two of the six in 5-6 and fill in the rows of this lesson’s table from their earnings releases, annual reports and traffic data. Where a row cannot be filled, write ‘not disclosed’."},
{name:"Write one reason for the gap",x:"In one sentence, say which operating row (load factor, unit revenue, CASK ex fuel) explains the difference in the two airlines’ operating margins."},
{name:"Your own airline’s page",x:"Build the same table for the last three years of your own company (or one you want to join) and mark the row that moved most."}]},
{t:"link",href:"航空会社経営シミュレーション.html",x:"[Practice page] Airline Management Simulation: see the operating metrics and the three statements move together with each situation and response"},
{t:"note",x:"Part 7 uses these ratios to think about what a company is worth: multiples such as PER, PBR and EV/EBITDA, and DCF, which derives value from future cash."}]}],
voice:"Do not stop at ‘their margin is higher than ours’. Go down to the operating rows until you can say ‘their load factor is three points higher’ or ‘their CASK ex fuel is 0.5 yen lower’. That is when you start to see what to change on the front line.",
terms:[["Index (base year = 100)","指数（基準年 ＝ 100）","지수(기준 연도 = 100)"],["Common-size statement","構成比（百分率損益計算書）","구성비(백분율 손익계산서)"],["CASK excluding fuel","燃油を除くCASK","연료 제외 CASK"],["Net debt to EBITDA","純有利子負債 ÷ EBITDA","순차입금 ÷ EBITDA"],["Trend analysis","時系列分析","시계열 분석(추세 분석)"]],
quiz:[{q:"In operating terms, why did Vela Air’s operating margin fall in year 2?",opts:["Fuel raised CASK and load factor fell too","CASK ex fuel rose sharply","ASK was cut sharply","Unit revenue (total revenue ÷ ASK) fell"],a:0,exp:"CASK went from 14.1 to 15.7 yen and load factor from 82% to 80%. CASK ex fuel was almost flat."},
{q:"What is the method of listing costs as a share of sales called?",opts:["A common-size statement","An index","The DuPont breakdown","The CCC"],a:0,exp:"It lets you compare the weight of costs across years or companies of different size."},
{q:"Comparing an airline with leases on the balance sheet to one without, what comes first?",opts:["Align the treatment of leases, then calculate the ratios","Compare equity ratios as they are","Exclude the airline with leases","Compare sales only"],a:0,exp:"With different standards, neither the equity ratio nor EBITDA is comparable (5-2, 5-6)."}]});
})(window.ARTS);
