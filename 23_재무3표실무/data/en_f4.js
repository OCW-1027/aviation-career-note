/* 数字で読む会社 — English version (Part 4) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("4-1",{title:"Profit Flows into Equity: Where the Income Statement Meets the Balance Sheet",hl:"Profit Flows into Equity",subtitle:"Net profit − dividends = the increase in retained earnings. One line joins the report card to the photograph",
lead:["The three statements join at three points. ① Net profit accumulates in retained earnings (income statement → balance sheet). ② Closing cash becomes the cash on the balance sheet (cash flow statement → balance sheet). ③ Depreciation appears in all three. This lesson covers ①.","The taiyaki stall’s first month: profit of 64,000 yen becomes retained earnings of 64,000. Vela Air, year 1: profit of 9.0bn less a 4.0bn dividend leaves 5.0bn, taking retained earnings from 102.0bn to 107.0bn. The last line of the income statement flows into the bottom right of the balance sheet."],
sections:[
{h:"The three joins",blocks:[{t:"fig",id:"fin_links_vela",cap:"Vela Air, year 1. ① Profit → retained earnings, ② closing cash → cash, ③ depreciation → aircraft book value. The arrows light up in turn"},
{t:"table",cols:["Join","From → to","Formula","Vela Air year 1"],rows:[
["① Profit","Income statement → balance sheet (equity)","Opening retained earnings + net profit − dividends = closing retained earnings","1,020 + 90 − 40 = 1,070"],
["② Cash","Cash flow statement → balance sheet (assets)","Opening cash + operating + investing + financing = closing cash","1,200 + 394 − 300 − 250 = 1,044"],
["③ Depreciation","A cost on the income statement = a fall in assets on the balance sheet = an add-back on the cash flow statement","Opening aircraft + purchases − depreciation = closing aircraft","2,100 + 300 − 254 = 2,146"]]}]},
{h:"① The retained earnings roll-forward",blocks:[{t:"table",cols:["(100m yen)","Year 1","Year 2","Year 3"],rows:[
["Opening retained earnings","1,020","1,070","965"],["+ Net profit","+90","−105","+127"],["− Dividends","−40","0 (none in a loss year)","−50"],["Closing retained earnings","1,070","965","1,042"],["Total equity (adding capital 500 + surplus 400)","1,970","1,865","1,942"],["Equity ratio","33.3%","31.7%","32.3%"]]},
{t:"point",x:"Retained earnings are the sum of every bottom line the company has ever reported, less every dividend ever paid. One glance at the balance sheet tells you how much a company has earned since it was founded and how much it has returned to shareholders."}]},
{h:"What happens in a loss year",blocks:[{t:"rows",items:[
{name:"Equity shrinks",x:"Year 2’s loss of 10.5bn cuts retained earnings by 10.5bn. Share capital is unchanged, so total equity falls and the equity ratio drops (33.3% → 31.7%)."},
{name:"Dividends stop",x:"Dividends can only be paid out of retained earnings (the distributable amount). Repeated losses that exhaust retained earnings make dividends impossible. Vela Air paid none in year 2."},
{name:"The road to negative equity",x:"If accumulated losses push retained earnings below zero and eat into capital and surplus, equity turns negative (2-1). Many airlines had to recapitalise during the pandemic. ★"}]},
{t:"note",x:"* JAL, 31 March 2026: retained earnings 508.3bn yen. The year’s increase is profit of 137.6bn less dividends of 40.1bn and treasury-share and other adjustments. ★"}]},
{h:"Try it",blocks:[{t:"check",items:[
{name:"Write a roll-forward",x:"If the stall earns 30,000 yen in month 2 and pays the owner a 10,000 dividend, what are retained earnings at month end (starting from 64,000)?"},
{name:"Check a join",x:"Vela Air aircraft: 2,146 at end of year 1 → 1,884 at end of year 2 → 1,914 at end of year 3. Explain each year with purchases and depreciation (1-1, 3-4)."}]}]}],
voice:"When accounts arrive, first compare the bottom line of the income statement with the change in retained earnings. If dividends and buybacks explain the difference, all is well; if not, that is your cue to read the notes on valuation differences or changes in accounting policy.",
terms:[["Retained earnings roll-forward","利益剰余金のロールフォワード","이익잉여금 롤포워드(연결 계산)"],["Distributable amount","分配可能額","배당 가능 이익"],["No dividend","無配","무배당"],["Recapitalisation","資本増強","자본 확충"]],
quiz:[{q:"Opening retained earnings 1,020, net profit 90, dividend 40: closing retained earnings?",opts:["1,070","1,110","1,030","980"],a:0,exp:"1,020 + 90 − 40 = 1,070."},
{q:"In a loss year, equity…",opts:["Falls as retained earnings fall","Falls through share capital","Is unchanged","Falls through liabilities"],a:0,exp:"A loss reduces retained earnings directly."},
{q:"What sets the ceiling on dividends?",opts:["Retained earnings (the distributable amount)","Sales","Cash balance","Borrowings"],a:0,exp:"Cash alone is not enough; without retained earnings no dividend can be paid."}]});
set("4-2",{title:"Closing Cash Goes to the Balance Sheet: Where the Bankbook Meets the Photograph",hl:"Closing Cash Goes to the Balance Sheet",subtitle:"The last line of the cash flow statement is the first line of the balance sheet. From two balance sheets you can rebuild the cash flow statement",
lead:["The ‘closing cash’ at the bottom of the cash flow statement equals ‘cash and cash equivalents’ at the top of the balance sheet. Not a coincidence: the cash flow statement exists to explain why the balance-sheet cash moved.","More than that, a cash flow statement can be built from two balance sheets and an income statement, because each balance-sheet movement becomes a line of the cash flow statement. Here we rebuild Vela Air’s year-1 cash flow statement from balance-sheet changes."],
sections:[
{h:"Balance-sheet changes → cash flow statement",blocks:[{t:"table",cols:["Balance-sheet item (100m yen)","Opening","Closing","Change","Cash flow line","Effect on cash"],rows:[
["Receivables","250","265","+15","Operating: increase in receivables","−15"],["Inventory","120","125","+5","Operating: increase in inventory","−5"],["Payables","350","370","+20","Operating: increase in payables","+20"],["Unearned revenue","600","640","+40","Operating: increase in unearned revenue","+40"],["Mileage liability","120","130","+10","Operating: increase in mileage liability","+10"],["Aircraft (book value)","2,100","2,146","+46","Investing: purchases −300 / operating: depreciation +254","−300 + 254"],["Long-term borrowings","1,500","1,350","−150","Financing: repayment","−150"],["Lease liabilities","500","440","−60","Financing: lease payments","−60"],["Retained earnings","1,020","1,070","+50","Operating: net profit +90 / financing: dividend −40","+90 − 40"],["Cash","1,200","1,044","−156","= the sum of everything above","−156"]]},
{t:"point",x:"When assets rise, cash falls; when liabilities or equity rise, cash rises. Remember the direction and two balance sheets side by side will tell you what moved the cash."}]},
{h:"Sorted into the three groups",blocks:[{t:"table",cols:["Group","Lines","100m yen"],rows:[
["Operating","Net profit 90 + depreciation 254 − receivables 15 − inventory 5 + payables 20 + unearned revenue 40 + miles 10","+394"],["Investing","Aircraft purchases","−300"],["Financing","Loan repayment −150, lease payments −60, dividend −40","−250"],["Total","Opening 1,200 → closing 1,044","−156"]]},
{t:"note",x:"* Real companies add adjustments for disposal gains, FX differences and the timing of tax payments, but the skeleton is the same. JAL’s table in 3-3 can be reconciled to its balance sheet the same way."}]},
{h:"When things do not match",blocks:[{t:"rows",items:[
{name:"Closing cash ≠ balance-sheet cash",x:"A misreading, or a different definition of cash equivalents (whether deposits over three months are included). Check the note."},
{name:"Change in retained earnings ≠ profit − dividends",x:"Treasury-share disposals, opening adjustments for changes in accounting policy, transfers from other comprehensive income (4-1)."},
{name:"Change in assets ≠ purchases − depreciation",x:"Disposals, write-offs, impairment, new right-of-use assets, currency translation. For airlines, aircraft sales and sale-and-leasebacks move these a lot."}]},
{t:"point",x:"When the three statements do not reconcile, there is always a transaction somewhere that moved no cash or bypassed profit. Finding it is the reader’s job."}]},
{h:"Try it",blocks:[{t:"check",items:[
{name:"Rebuild year 2",x:"Vela Air year 2: receivables 265→280, inventory 125→130, payables 370→395, unearned revenue 640→690, miles 130→140, aircraft 2,146→1,884, long-term debt 1,350→1,400, leases 440→380, retained earnings 1,070→965. Build operating, investing and financing and reconcile cash 1,044→1,256."},
{name:"Work backwards at the stall",x:"From the balance sheet in 0-3 (all opening balances zero), rebuild the three groups of the cash flow statement."}]}]}],
voice:"Once you have built a cash flow statement yourself, you read other companies’ accounts faster. Do it once: reconcile Vela Air’s year 2 by hand.",
terms:[["Cash equivalents","現金同等物","현금성 자산"],["Movement analysis","増減分析","증감 분석"],["Write-off / retirement","除却","제각"],["Sale and leaseback","セール・アンド・リースバック","세일 앤드 리스백"]],
quiz:[{q:"Closing cash on the cash flow statement equals…",opts:["Cash and cash equivalents on the balance sheet","Net profit","Retained earnings","Operating profit"],a:0,exp:"The cash flow statement explains the change in balance-sheet cash."},
{q:"When receivables rise on the balance sheet, the effect on cash is…",opts:["Negative","Positive","None","Higher liabilities"],a:0,exp:"Rising assets reduce cash."},
{q:"Long-term borrowings fell from 1,500 to 1,350. On the cash flow statement?",opts:["Financing −150 (repayment)","Operating +150","Investing −150","Financing +150"],a:0,exp:"A fall in debt is a repayment: a financing outflow."}]});
set("4-3",{title:"How One Transaction Moves the Three Statements",hl:"One Transaction, Three Statements",subtitle:"Write the stall’s ten events into all three statements at once and learn which parts move and which stay still",
lead:["We have seen that the three statements are the same money photographed from different angles. This lesson works the other way round: when a transaction happens, which statements move and which do not?","The stall’s ten first-month events are written into three columns, income statement, balance sheet and cash flow statement, at the same time. In every case the two sides of the balance sheet match, and the cash column adds up to the closing cash of the cash flow statement."],
sections:[
{h:"Ten events × three statements",blocks:[{t:"table",cols:["Event (yen)","Income statement","Balance sheet (left / right)","Cash flow statement"],rows:[
["Capital invested 300,000","—","Cash +300,000 / capital +300,000","Financing +300,000"],
["Loan 200,000","—","Cash +200,000 / loan +200,000","Financing +200,000"],
["Buy the cart 240,000","—","Cash −240,000, cart +240,000 / —","Investing −240,000"],
["Buy ingredients 90,000","—","Cash −90,000, ingredients +90,000 / —","Operating −90,000"],
["Sell for cash 240,000","Sales +240,000","Cash +240,000 / retained earnings +240,000","Operating +240,000"],
["Sell on credit 20,000","Sales +20,000","Receivable +20,000 / retained earnings +20,000","— (no cash moves)"],
["Pay rent etc. 100,000","Cost −100,000","Cash −100,000 / retained earnings −100,000","Operating −100,000"],
["Pay interest 1,000","Cost −1,000","Cash −1,000 / retained earnings −1,000","Operating −1,000"],
["Depreciation 4,000","Cost −4,000","Cart −4,000 / retained earnings −4,000","— (no cash moves)"],
["Use ingredients 75,000","Cost −75,000","Ingredients −75,000 / retained earnings −75,000","— (already recorded at purchase)"],
["Accrue tax 16,000","Cost −16,000","— / tax payable +16,000, retained earnings −16,000","— (paid next month)"],
["Total","Profit 64,000","Assets 580,000 = liabilities 216,000 + equity 364,000","Cash +309,000"]]},
{t:"point",x:"Some transactions move all three statements (selling for cash), some move two (selling on credit, depreciation), some move one (buying the cart: a swap within the balance sheet plus an investing cash flow). The goal is to be able to say which statement does not move."}]},
{h:"Four patterns of moving and not moving",blocks:[{t:"table",cols:["Pattern","Profit","Cash","Examples"],rows:[
["Both move","Yes","Yes","Cash sale, paying rent, paying for fuel"],["Only profit moves","Yes","No","Credit sale, depreciation, accrued expenses, recognising a provision"],["Only cash moves","No","Yes","Borrowing and repaying, buying aircraft, dividends, receiving advance payments"],["Neither moves","No","No","Re-labelling stock, internal transfers; only the balance sheet changes (e.g. refinancing short-term debt into long-term)"]]},
{t:"note",x:"* The two middle patterns, ‘only profit’ and ‘only cash’, are the whole story of why profit and cash differ (3-2)."}]},
{h:"Practice with airline transactions",blocks:[{t:"rows",items:[
{name:"A ticket sold a month in advance (10,000 yen)",x:"Profit: no. Balance sheet: cash +10,000 / unearned revenue +10,000. Cash flow: operating +10,000. → Only cash moves."},
{name:"That passenger flies",x:"Profit: sales +10,000. Balance sheet: unearned revenue −10,000 / retained earnings +10,000. Cash flow: no. → Only profit moves."},
{name:"An aircraft bought for 15.0bn (10.0bn loan + 5.0bn cash)",x:"Profit: no. Balance sheet: aircraft +150, cash −50 / loan +100. Cash flow: investing −150, financing +100."},
{name:"A year’s depreciation on it (0.7bn)",x:"Profit: cost −7. Balance sheet: aircraft −7 / retained earnings −7. Cash flow: added back +7 in operating (since it starts from profit)."},
{name:"A 2.0bn provision for future heavy maintenance",x:"Profit: cost −20. Balance sheet: — / maintenance provision +20, retained earnings −20. Cash flow: no."}]}]},
{h:"Try it",blocks:[{t:"check",items:[
{name:"Write three columns yourself",x:"‘Paid the handler 5m yen for last month (accrued last month)’, ‘A passenger flew on redeemed miles’, ‘Sold an old aircraft with a book value of 3.0bn for 3.5bn’."},
{name:"Name the pattern",x:"Which of the four patterns does each of the three belong to?"}]},{t:"link",href:"どの表が動くか練習.html",x:"[Practice page] Which Statement Moves? Transaction Card Practice: practise “which statement moves” at Beginner, Applied and Airline levels"}]}],
voice:"When a station report says ‘a cost was incurred’, adding one word, whether it was paid this month, accrued, or drawn from a provision, changes how head-office finance reads it.",
terms:[["Transaction","取引","거래"],["Accrued expenses","未払費用","미지급비용"],["Recognising a provision","引当金の計上","충당금 설정"],["Reclassification / transfer","振替","대체"]],
quiz:[{q:"‘Selling on credit’ moves which statements?",opts:["Income statement and balance sheet (not cash)","All three","Only the cash flow statement","Only the balance sheet"],a:0,exp:"A sale and a receivable are recorded; no cash moves."},
{q:"‘A ticket sold a month in advance’ moves which statements?",opts:["Balance sheet and cash flow statement (not profit)","Only the income statement","All three","None"],a:0,exp:"Cash and unearned revenue rise; revenue comes on the day of travel."},
{q:"‘Buying the cart for cash’ is…",opts:["A swap within the balance sheet plus an investing cash flow","A cost on the income statement","A reduction in sales","An increase in liabilities"],a:0,exp:"One asset replaces another, and the cash outflow appears under investing."}]});
set("4-4",{title:"Insolvency While Profitable: The Day a Company Stops Despite Making Money",hl:"Insolvency While Profitable",subtitle:"The stall’s second month: a record profit, and not enough cash on the day the loan falls due",
lead:["Companies do not stop when they make a loss. They stop when there is no cash on the day a payment is due. Even with a profit, cash can be asleep in receivables and inventory, and when the repayment date comes the money is not there. That is insolvency while profitable.","We recreate it in the stall’s second month. A large order comes in; sales reach 640,000 yen and profit is a record. But the order is paid 60 days later, ingredients were bought for cash up front, and the 200,000-yen loan falls due at month end. Set profit and cash side by side and watch what happens."],
sections:[
{h:"The second month’s events",blocks:[{t:"table",cols:["Event","Amount (yen)","Profit","Cash"],rows:[
["Cash sales at the stall","240,000","Sales +240,000","+240,000"],["Large corporate order (paid in 60 days)","400,000","Sales +400,000","0 (receivable +400,000)"],["Bulk ingredients bought for cash (180,000 used)","250,000","Cost −180,000","−250,000 (inventory +70,000)"],["Rent, wages, utilities + extra part-time help","160,000","Cost −160,000","−160,000"],["Depreciation and interest","5,000","Cost −5,000","−1,000"],["Last month’s receivable collected","20,000","—","+20,000"],["Last month’s tax paid","16,000","—","−16,000"],["Loan of 200,000 falls due (short-term)","200,000","—","−200,000"],["This month’s tax (paid next month)","59,000","Cost −59,000","0"],["Total","","Net profit 236,000","Opening 309,000 → closing −58,000"]]},
{t:"point",x:"Profit of 236,000 yen, a record. Yet cash at month end is minus 58,000: 58,000 short on repayment day. If the bank will not wait, the stall is unable to pay while profitable."}]},
{h:"Why: decomposed by the five reasons",blocks:[{t:"table",cols:["Reason (3-2)","Amount","Effect on cash"],rows:[
["① Receivables up (large order uncollected)","+400,000 −20,000 (last month’s collected)","−380,000"],["② Inventory up (ingredients bought ahead)","+70,000","−70,000"],["③ Depreciation (no cash)","4,000","+4,000"],["④ Tax payable (this month +59,000, last month paid −16,000)","+43,000","+43,000"],["⑤ Outside profit (loan repayment)","200,000","−200,000"],["Profit → cash","236,000 − 380,000 − 70,000 + 4,000 + 43,000 − 200,000","= −367,000 (change in cash)"]]},
{t:"note",x:"* Against a profit of 236,000, cash fell 367,000. The biggest causes are the 380,000 of receivables and the 200,000 repayment, neither of which appears on the income statement."}]},
{h:"Could it have been avoided?",blocks:[{t:"rows",items:[
{name:"Negotiate payment terms",x:"Part of the order paid in advance and the rest in 30 days rather than 60. Smaller receivables mean more cash."},
{name:"Do not buy inventory ahead",x:"Buy only what is needed. 70,000 of inventory is cash left sleeping."},
{name:"Refinance into long-term debt",x:"Turning the 200,000 short-term loan into three-year repayments means about 6,000 a month. Banks are usually willing for a profitable business."},
{name:"Keep a cash forecast",x:"Write down next month’s and the month after’s cash in and out before they happen. Hold a cash plan separately from the profit plan (budget). This is the table an airline treasury looks at every week."}]},
{t:"point",x:"2020 was this picture on a vast scale for airlines. Refunds of tickets paid in advance kept flowing out (a fall in unearned revenue rather than a rise in receivables), income was near zero, and fixed costs and repayments continued. Cash would have run out before profit; airlines prevented it with loans, share issues and government support. ★"}]},
{h:"Try it",blocks:[{t:"check",items:[
{name:"Change the terms",x:"If 200,000 of the order had been paid in advance, what is month-end cash? What if the loan had been refinanced to 6,000 a month?"},
{name:"Write a cash forecast",x:"Forecast month 3’s cash movements (the 400,000 arrives after 60 days, 59,000 of tax is paid, and so on). Is cash positive again at the end of month 3?"}]},{t:"link",href:"財務諸表の連動シミュレーター.html",x:"[Practice page] Linked Financial Statements Simulator: recreate insolvency while profitable with “More credit sales” and “Sales jump”"}]}],
voice:"A station can report ‘sales are strong’ while its account is nearly empty. Add ‘how much is still uncollected’ to every sales report. Insolvency while profitable starts in the front-line numbers, not at head office.",
terms:[["Insolvency while profitable","黒字倒産","흑자 도산"],["Cash flow forecast / cash budget","資金繰り表","자금 수지표(자금 계획표)"],["Inability to pay","支払い不能","지급 불능"],["Refinancing","借り換え","차환"],["Advance payment","前金","선금"]],
quiz:[{q:"The direct cause of insolvency while profitable is…",opts:["No cash on the day a payment is due","A loss","Falling sales","High taxes"],a:0,exp:"Profit cannot pay a bill; only cash can."},
{q:"What drained the stall’s cash most in month 2?",opts:["Higher receivables and the loan repayment","Rent","Depreciation","Tax"],a:0,exp:"−380,000 and −200,000, neither visible on the income statement."},
{q:"The tool for preventing it is…",opts:["A cash forecast (a plan for cash)","The income statement","A sales target","Advertising"],a:0,exp:"A table of cash in and out, kept separately from the profit plan."}]});
set("4-5",{title:"Reading Vela Air’s Three Years Across All Three Statements",hl:"Three Years Together",subtitle:"Good year → fuel-price loss → recovery. Three years side by side show strength and judgment that one year cannot",
lead:["To close Parts 0 to 4, we read Vela Air’s three years across the three statements. Year 1 was sound (6.0% operating margin); in year 2 fuel jumped from 85 to 130 dollars a barrel and the airline lost money; in year 3 fuel eased and it recovered. How did profit, cash and equity move over the three years?","The reading order is unchanged: ① earning power on the income statement, ② the cash behind it on the cash flow statement, ③ strength on the balance sheet, checking the joins between them as we go."],
sections:[
{h:"① Income statement: earning power",blocks:[{t:"table",cols:["(100m yen)","Year 1","Year 2 (fuel spike)","Year 3 (recovery)"],rows:[
["Revenue","3,000","3,160","3,300"],["of which fuel","677 (22.6%)","1,000 (31.6%)","790 (23.9%)"],["Total operating costs","2,820","3,214","3,069"],["Operating profit (margin)","180 (6.0%)","−54 (−1.7%)","231 (7.0%)"],["Net profit","90","−105","127"],["Load factor / break-even load factor","82% / 77.1%","80% / 81.4%","83% / 77.2%"]]},
{t:"point",x:"Year 2 lost money although revenue grew 5%: fuel rose by 32.3bn, far more than the 16.0bn gain in revenue. The break-even load factor (81.4%) rose above the actual load factor (80%)."}]},
{h:"② Cash flow statement: the cash behind it",blocks:[{t:"table",cols:["(100m yen)","Year 1","Year 2","Year 3"],rows:[
["Operating","+394","+222","+442"],["Investing (aircraft)","−300","0 (investment paused)","−300"],["Financing","−250 (repayment 150, leases 60, dividend 40)","−10 (borrowing 50, leases 60)","−60 (borrowing 50, leases 60, dividend 50)"],["Change in cash","−156","+212","+82"],["Closing cash","1,044","1,256","1,338"],["Free cash flow","+94","+222","+142"]]},
{t:"point",x:"Cash rose most in the loss-making year 2 (3-2): depreciation of 262 took no cash, unearned revenue rose by 50 and aircraft investment was paused. In loss years, companies move to protect cash."}]},
{h:"③ Balance sheet: strength",blocks:[{t:"table",cols:["(100m yen)","Opening","End year 1","End year 2","End year 3"],rows:[
["Cash","1,200","1,044","1,256","1,338"],["Aircraft (book value)","2,100","2,146","1,884","1,914"],["Total assets","6,000","5,910","5,880","6,012"],["Interest-bearing debt (loans + leases)","2,300","2,090","2,080","2,070"],["Unearned revenue + miles","720","770","830","880"],["Retained earnings","1,020","1,070","965","1,042"],["Equity","1,920","1,970","1,865","1,942"],["Equity ratio","32.0%","33.3%","31.7%","32.3%"]]},
{t:"point",x:"Over three years, interest-bearing debt fell by 23.0bn, cash rose by 13.8bn and equity returned almost to where it started: year 3 recovered year 2’s loss. Rising unearned revenue each year shows that ‘money received in advance’ grows with sales."}]},
{h:"Checking the joins",blocks:[{t:"check",items:[
{name:"Profit → retained earnings",x:"1,020 + 90 − 40 = 1,070 / 1,070 − 105 − 0 = 965 / 965 + 127 − 50 = 1,042. All match."},
{name:"Closing cash → cash",x:"1,044, 1,256 and 1,338 agree with the balance sheet."},
{name:"Aircraft = opening + purchases − depreciation",x:"2,100 + 300 − 254 = 2,146 / 2,146 + 0 − 262 = 1,884 / 1,884 + 300 − 270 = 1,914."},
{name:"Assets = liabilities + equity",x:"Matches at every year end (5,910, 5,880, 6,012)."}]},
{t:"link",href:"航空会社経営シミュレーション.html",x:"[Practice page] Airline Management Simulation: run a year of Vela Air on your own decisions and watch the three statements change"}]},
{h:"On to Part 5",blocks:[{t:"note",x:"You now know how to read the three statements and how they connect. Part 5 turns to what is specific to airlines: fuel and hedging, owning versus leasing aircraft, unearned revenue and miles, maintenance provisions, and per-seat-kilometre measures (RASK and CASK), using real airlines’ figures."}]}],
voice:"Three years side by side reveal management’s judgment: investment and dividends paused in year 2 to protect cash, then resumed in year 3. One year’s accounts are a result; three years are a way of thinking.",
terms:[["Three-year comparison","3期比較","3개년 비교"],["Break-even load factor","損益分岐利用率","손익분기 탑승률"],["Interest-bearing debt","有利子負債","유이자부채(이자부 부채)"],["Financial strength","体力","체력(재무 건전성)"]],
quiz:[{q:"Why did Vela Air lose money in year 2?",opts:["Fuel rose by 32.3bn, more than the revenue gain","Revenue fell","Staff costs doubled","It sold aircraft"],a:0,exp:"Fuel went from 85 to 130 dollars; the break-even load factor rose above the actual one."},
{q:"Which is NOT a reason cash rose most in loss-making year 2?",opts:["It made a profit","Depreciation takes no cash","Unearned revenue rose","Aircraft investment was paused"],a:0,exp:"Year 2 was a loss (−10.5bn)."},
{q:"How did interest-bearing debt move over the three years?",opts:["Fell from 2,300 to 2,070","Rose","Unchanged","Reached zero"],a:0,exp:"Repayments exceeded new borrowing every year, a 23.0bn reduction."}]});
})(window.ARTS);
