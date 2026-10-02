/* Reading a Company Through Its Numbers — Part 7 Investment Review in Practice (7-1 to 7-6), English / 2026.10
   Not investment advice: a general explanation of methods. Vela Air’s share price and share count, and Minato Ground Services, are fictional. */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("7-1",{title:"PER, PBR and EV/EBITDA: Pricing a Company with Multiples",hl:"Pricing a Company with Multiples",subtitle:"A company’s price is measured as a multiple of its profit or net assets. The starting point is to separate the price to shareholders from the price of the whole business",
lead:["Part 6 used ratios to read a company’s strength and earning power. Part 7 asks what price that company carries. The tools are the same whether you are reviewing an investment or trying to see how the market views your own employer.","The quickest method is the multiple: how many times profit, net assets or EBITDA a company trades at, compared with similar companies. Here we treat Vela Air as a listed company with 100 million shares at 1,500 yen each."],
sections:[
{h:"The price to shareholders and the price of the whole business",blocks:[{t:"fig",id:"fin_ev_bridge",cap:"Add net debt to the owners’ price (market cap) and you get the price of the business (enterprise value)"},
{t:"rows",items:[
{name:"Market capitalisation = share price × shares in issue",x:"1,500 yen × 100 million shares = 150bn yen (1,500 in units of 100m yen). The price of everything the shareholders own."},
{name:"Enterprise value (EV) = market cap + net debt",x:"1,500 + (interest-bearing debt 2,070 − cash 1,338) = 2,232. What it would cost to buy the company together with its debt: the price of the business itself."},
{name:"Why separate them?",x:"The same business is worth different amounts to shareholders depending on how much it has borrowed. Use EV to compare businesses, market cap to compare what shareholders hold."}]},
{t:"note",x:"* This part is not investment advice; it explains general methods. Vela Air’s share price and share count are fictional figures set for the calculation."}]},
{h:"The multiples in common use",blocks:[{t:"fig",id:"fin_multiples",cap:"The three multiples as lengths. The red dotted line is 1×"},
{t:"table",cols:["Multiple","Formula","Vela Air year 3","What it shows"],rows:[
["PER (price-to-earnings)","Share price ÷ earnings per share","1,500 ÷ 127 = 11.8×","How many years of profit the price represents"],
["PBR (price-to-book)","Share price ÷ net assets per share","1,500 ÷ 1,942 = 0.77×","Dear or cheap against net assets; 1× is the rough break-up value"],
["EV/EBITDA","Enterprise value ÷ EBITDA","2,232 ÷ 501 = 4.5×","The price of the business, evened out for debt and depreciation"],
["Dividend yield","Dividend per share ÷ share price","50 ÷ 1,500 = 3.3%","The dividend as a share of the price"]]},
{t:"point",x:"PBR = PER × ROE. 11.8 × 6.5% (ROE on closing equity) = 0.77. A PBR below 1× is a sign that the market thinks ROE falls short of the return investors want."}]},
{h:"When multiples fail or mislead",blocks:[{t:"rows",items:[
{name:"No PER in a loss year",x:"Vela Air made a net loss in year 2, so PER cannot be calculated. EV/EBITDA on the same EV jumps to 2,232 ÷ 208 = 10.7×. Use a normal year’s profit, not a temporarily depressed one."},
{name:"Aligning leases: EV/EBITDAR",x:"A company that rents its aircraft shows a smaller EBITDA and smaller debt. Adding rent back (EBITDAR 501 + 175 = 676) and adding seven times rent to debt (EV 2,232 + 1,225 = 3,457) gives 5.1×. This is a common way to compare airlines. ★"},
{name:"Accounting standards and year-ends",x:"Net profit and EBITDA mean different things under IFRS and Japanese GAAP (5-6). Align the basis before lining multiples up."},
{name:"The cycle",x:"Airline profits swing widely, so PER looks low in a good year and high in a bad one. Check against a multi-year average or next year’s forecast."}]}]},
{h:"Comparing with similar companies (comparable company analysis)",blocks:[{t:"ladder",steps:[
{name:"Choose comparables",sub:"A few listed companies close in business, region and size"},
{name:"Calculate the multiples",sub:"PER, PBR and EV/EBITDA at the same date, on the same definitions"},
{name:"Look at the range",sub:"Not only the average: minimum, maximum and median"},
{name:"Apply to your company",sub:"Multiply your EBITDA or profit by the multiple"},
{name:"Explain the differences",sub:"Why higher or lower: growth, margin, debt"}]},
{t:"check",items:[
{name:"If the share price were 2,000 yen",x:"Recalculate Vela Air’s PER, PBR and EV/EBITDA (market cap 2,000, EV 2,732)."},
{name:"Try it on real airlines",x:"Look up the share price, earnings per share and net assets per share of JAL and ANA on a financial site or in their earnings releases and calculate PER and PBR. Add a line noting that their accounting standards differ."}]}]}],
voice:"If your own company’s PBR is below 1×, the market is saying it does not create as much value as the assets it holds. Raising efficiency on the front line, and with it ROE, is directly the work of raising the company’s price.",
terms:[["Price-to-earnings ratio","PER（株価収益率）","PER(주가수익비율)"],["Price-to-book ratio","PBR（株価純資産倍率）","PBR(주가순자산비율)"],["Enterprise value","企業価値（EV）","기업가치(EV)"],["Market capitalisation","株式時価総額","시가총액"],["Comparable company analysis","類似会社比較法","유사회사 비교법"]],
quiz:[{q:"Which is the correct calculation of enterprise value (EV)?",opts:["Market capitalisation + net debt","Market capitalisation − net assets","Net assets + cash","Sales × margin"],a:0,exp:"It is the price of buying the company together with its debt."},
{q:"What does a PBR below 1× tell you?",opts:["The share price is below net assets per share","The company is loss-making","It has no debt","It pays no dividend"],a:0,exp:"PBR = share price ÷ net assets per share. A low ROE tends to push it below 1×."},
{q:"How should you price a company with multiples in a loss year?",opts:["Use a normal year’s profit, or EV/EBITDA and PBR","Use the negative PER as it is","Give up: multiples cannot be used","Decide on sales alone"],a:0,exp:"Look at normal earnings, not a temporarily depressed figure."}]});
set("7-2",{title:"DCF Basics: Turning Future Cash into Today’s Value",hl:"Turning Future Cash into Today’s Value",subtitle:"A company is worth the cash it will generate from now on. But 100 yen next year weighs less than 100 yen today. Learn how to discount, and how much depends on the assumptions",
lead:["Multiples price a company from what similar companies cost. Discounted cash flow (DCF) values it from the cash it will generate itself. The idea is simple: restate future free cash flow in today’s money and add it up.","The hard part is not the arithmetic but the assumptions: how many years, how much cash, discounted at what rate. A small change moves the answer a long way. We work it once by hand on Vela Air to get the feel."],
sections:[
{h:"100 yen today and 100 yen next year",blocks:[{t:"table",cols:["When received","Formula (5% discount rate)","Value today"],rows:[
["100 in one year","100 ÷ 1.05","95.2"],["100 in five years","100 ÷ 1.05 to the power 5","78.4"],["100 in ten years","100 ÷ 1.05 to the power 10","61.4"]]},
{t:"rows",items:[
{name:"What the discount rate is",x:"The return the money could have earned elsewhere; the higher the risk, the higher the rate. For a company, use the weighted average cost of capital (WACC): the returns that shareholders and lenders require, weighted by their shares of the funding."},
{name:"Vela Air’s WACC",x:"Shareholders’ required return 9.3% (risk-free rate 1.5% + beta 1.3 × 6.0%) and the cost of debt 2.7% × (1 − 30% tax) = 1.9%. Weighted at market values (equity 42%, debt 58%) this gives 5.0%. Interest rates and beta change over time. ★"}]}]},
{h:"Discounting five years of cash",blocks:[{t:"fig",id:"fin_discount",cap:"White is the cash in that year, blue its value today. The gap widens the further out you go"},
{t:"table",cols:["(100m yen)","Year 4","Year 5","Year 6","Year 7","Year 8","Total"],rows:[
["Free cash flow (forecast)","110","115","120","125","130","600"],
["Discount factor (5%)","0.952","0.907","0.864","0.823","0.784","—"],
["Present value","104.8","104.3","103.7","102.8","101.9","517"]]},
{t:"rows",items:[
{name:"Free cash flow as used here",x:"Operating profit × (1 − tax rate) + depreciation − capital expenditure − increase in working capital: the cash the whole company generates before paying interest. Year 4 is 240 × 0.7 + 275 − 350 + 17 = 110 (unearned revenue grows, so working capital falls by 17 and is added). The forecast assumes capital expenditure rises to 350 to catch up on the fleet renewal that was deferred (6-5)."}]},
{t:"point",x:"A forecast is not a wish. Build it from numbers you can explain from the record: the growth in 6-4, the cost structure in 6-6."}]},
{h:"Beyond the forecast: terminal value",blocks:[{t:"fig",id:"fin_dcf_value",cap:"Five years of present value plus terminal value give enterprise value; deduct net debt to reach equity value"},
{t:"rows",items:[
{name:"Terminal value = final-year FCF × (1 + growth) ÷ (discount rate − growth)",x:"130 × 1.005 ÷ (0.05 − 0.005) = 2,903: the value of cash growing 0.5% a year from year 9 onwards. Brought back to today, 2,903 × 0.784 = 2,275."},
{name:"Enterprise value and equity value",x:"517 + 2,275 = 2,792 is the enterprise value. Deducting net debt of 732 leaves equity value of 2,060, or 2,060 yen a share: higher than the market price of 1,500 yen."},
{name:"How to read the gap",x:"Before calling it cheap, question the assumptions. The market may be building another loss year like year 2, and swings in fuel and currency, into its discount rate or its forecasts."}]}]},
{h:"Moving the assumptions (sensitivity analysis)",blocks:[{t:"table",cols:["Equity value (100m yen)","Growth 0%","Growth 0.5%","Growth 1.0%"],rows:[
["Discount rate 4.5%","2,111","2,414","2,803"],["Discount rate 5.0%","1,823","2,060","2,357"],["Discount rate 5.5%","1,587","1,777","2,011"]]},
{t:"point",x:"Half a point on the discount rate and half a point on growth move equity value from 1,587 to 2,803. A DCF answer is a range, not a single number. Take particular care over the growth assumption behind the terminal value, which makes up four-fifths of the total."},
{t:"check",items:[
{name:"Recalculate at a 6% discount rate",x:"The discount factors are 0.943, 0.890, 0.840, 0.792 and 0.747. Work out the present value of the five years and the terminal value at 0.5% growth, then enterprise value and equity value."},
{name:"Compare with the multiple",x:"The DCF enterprise value of 2,792 is what multiple of EBITDA 501? (5.6×.) In one line, say which assumption creates the gap from the 4.5× in 7-1."}]},
{t:"link",href:"企業価値の計算練習.html",x:"[Practice page] Company Valuation Practice: move the discount and growth rates and watch the DCF answer change"}]}],
voice:"When someone shows you a DCF, look first not at the answer but at how much of it is terminal value, and at the growth and discount rates. If those are optimistic, no amount of detail in the forecast matters.",
terms:[["Discounted cash flow","DCF（割引キャッシュフロー法）","DCF(현금흐름할인법)"],["Discount rate","割引率","할인율"],["Weighted average cost of capital","加重平均資本コスト（WACC）","가중평균자본비용(WACC)"],["Terminal value","継続価値（ターミナルバリュー）","영구가치(터미널 밸류)"],["Sensitivity analysis","感度分析","민감도 분석"]],
quiz:[{q:"At a 5% discount rate, what is 100 received in one year worth today?",opts:["About 95","100","105","About 90"],a:0,exp:"100 ÷ 1.05 = 95.2."},
{q:"In Vela Air’s DCF, how much of enterprise value is terminal value?",opts:["About four-fifths","About one-fifth","About half","Almost none"],a:0,exp:"2,275 ÷ 2,792 = about 81%. That is why the terminal value assumptions decide the answer."},
{q:"How do you get from DCF enterprise value to equity value?",opts:["Deduct net debt","Add net debt","Deduct depreciation","Multiply by sales"],a:0,exp:"Enterprise value − net debt = equity value."}]});
set("7-3",{title:"Reading an Unlisted Company’s Numbers: Restating the Accounts to Normal",hl:"Restating the Accounts to Normal",subtitle:"The accounts of an owner-managed company are shaped by tax and by the family’s affairs. For an investment, redraw them as the company will look after it is bought",
lead:["From here we look at companies that are not listed. Their accounts are mostly prepared for the tax return and are not audited. The owner’s pay and insurance, and money moving between the company and the owner personally, are commonly mixed in.","Our example is a fictional company, Minato Ground Services: ground handling at regional airports, sales of 2.4bn yen, about 300 staff, wholly owned by the founding family. We restate its reported profit to the normal earnings that will continue after a purchase."],
sections:[
{h:"The company as reported",blocks:[{t:"fig",id:"fin_bs_check",cap:"Minato Ground Services’ balance sheet. The red items are checked in 7-4"},
{t:"table",cols:["Income (million yen)","Amount","Balance sheet (million yen)","Amount"],rows:[
["Sales","2,400","Cash","300"],["Operating profit","96 (4.0%)","Receivables","400"],["Depreciation","84","Vehicles and equipment (GSE)","500"],["EBITDA","180 (7.5%)","Insurance reserve assets","120"],["","","Loan to the owner","60"],["","","Other assets","120"],["","","Total assets","1,500"],["","","Borrowings","600"],["","","Payables and accruals","400"],["","","Net assets","500"]]},
{t:"point",x:"Read as it stands, this is a company with a 4% operating margin and EBITDA of 180 million yen. But the figures include the owner family’s affairs and events that happened only this year."}]},
{h:"Restating to normalised earnings",blocks:[{t:"fig",id:"fin_normalize",cap:"From reported EBITDA of 180 to the 229 that will continue after the purchase"},
{t:"table",cols:["Adjustment","Amount (million yen)","Reason"],rows:[
["Directors’ pay","+40","The owner and family are paid above the level for a company of this size; replace with the pay of the post-purchase management"],
["Tax-driven insurance premiums","+20","Insurance the business does not need; cancel it and the cost disappears"],
["Private expenses","+10","The owner’s personal car, entertainment and other spending unrelated to the business"],
["Unpaid overtime","−15","A staff cost that recurs every year once paid properly; profit falls"],
["One-off repairs","+12","A large repair this year only; it will not recur next year"],
["One-off subsidy","−18","A subsidy received this year only; it will not come in next year"],
["Normalised earnings (adjusted EBITDA)","229 (9.5%)","180 + 40 + 20 + 10 − 15 + 12 − 18"]]},
{t:"point",x:"Adjustments do not only add. Material prepared by a seller tends to be heavy on additions. Finding the deductions (unpaid overtime, one-off gains, repairs or staff that are short) is the buyer’s job."}]},
{h:"Accounts to look at with suspicion",blocks:[{t:"rows",items:[
{name:"Loans to directors and suspense payments",x:"Money that went from the company to the owner personally. Will it come back? If not, do not count it as an asset."},
{name:"The age of receivables",x:"400 is 61 days of sales. With month-end invoicing and payment the following month, 45 to 60 days is normal, so check by customer for old balances or disputed invoices."},
{name:"Insurance reserves and investment securities",x:"The book amount differs from what they would fetch today (surrender value, market value)."},
{name:"Off-balance-sheet obligations",x:"Unfunded retirement benefits, unpaid overtime, leases, guarantees. The less something appears in the accounts, the more you need to ask."},
{name:"Customer concentration",x:"The largest airline customer is 45% of sales, on a contract renewed yearly. Calculate separately what the company looks like without it."}]}]},
{h:"Why it differs from a listed company, and try it",blocks:[{t:"cards",n:3,items:[
{ic:"🧾",name:"Accounts prepared for tax",tag:"Purpose",x:"Treatments tend to make profit look smaller. A listed company’s accounts, by contrast, are prepared to show investors"},
{ic:"👪",name:"Company and household are close",tag:"Owner",x:"Pay, insurance, cars, property, loans: business costs and family costs mix"},
{ic:"🔍",name:"No audit",tag:"Reliability",x:"Many are not checked by an accountant. Verify the basis of each number yourself"}]},
{t:"check",items:[
{name:"Add one more adjustment",x:"You learn that vehicle (GSE) replacement has been deferred for three years and that in a normal year repairs would cost 10 more. What are normalised earnings now?"},
{name:"Apply a multiple",x:"At 5.5× EBITDA, how much does enterprise value differ between the reported 180 and the adjusted 229? See how much a single adjustment weighs."}]}]}],
voice:"Asking an owner-managed company ‘what is this cost?’ is not rude. Only by separating business costs from family costs can you value what the company really earns. A company that can explain at once tends to run well after the purchase too.",
terms:[["Normalised earnings","正常収益力","정상 수익력"],["Adjusted EBITDA","調整後EBITDA","조정 EBITDA"],["Loans to directors","役員貸付金","임원 대여금"],["Off-balance-sheet liabilities","簿外債務","부외부채"],["Owner-managed business","オーナー経営","오너 경영"]],
quiz:[{q:"When calculating normalised earnings, what is added back to profit?",opts:["Owner-family costs the business does not need","Staff costs that recur every year","Discounts to customers","All of depreciation"],a:0,exp:"Add back costs that will not arise after the purchase. Costs that recur every year stay."},
{q:"Unpaid overtime is discovered. What happens to normalised earnings?",opts:["They fall (it is a recurring cost once paid properly)","They rise","No change","Sales increase"],a:0,exp:"It is a deduction. The unpaid amount for past years is also counted separately as a liability (7-4)."},
{q:"What is the basic stance when reading an unlisted company’s accounts?",opts:["Verify the basis of each number yourself","Trust the accounts as they are","Look only at sales","Ask the tax office"],a:0,exp:"The accounts are prepared for tax and are usually unaudited."}]});
set("7-4",{title:"Financial Due Diligence: Four Things to Check Before Buying",hl:"Four Things to Check Before Buying",subtitle:"Normal earnings, real net assets, true debt and working capital. Whatever you find is absorbed through the price, the contract or a condition",
lead:["Due diligence (DD) is the investigation carried out before an investment or acquisition. Financial DD does not audit whether the accounts are correct; it establishes how much it is right to pay for the company and what could happen after buying it.","There are four things to establish: (1) normalised earnings (7-3), (2) real net assets, (3) net debt, including items treated as debt, and (4) working capital. We go through them on Minato Ground Services."],
sections:[
{h:"2. Real net assets: restating book net assets to current value",blocks:[{t:"fig",id:"fin_net_assets",cap:"From book net assets of 500, deducting assets that will not come back and liabilities not recorded leaves 340"},
{t:"table",cols:["Item","Amount (million yen)","Reason"],rows:[
["Book net assets","500","As reported"],["Loan to the owner","−60","No prospect of repayment"],["Uncollectable receivables and old inventory","−20","No movement for over a year"],["Unfunded retirement benefits","−80","Short of the amount calculated under the company’s rules"],["Unpaid overtime (past two years)","−30","An obligation to pay retrospectively"],["Unrealised gain on insurance","+30","Surrender value 150 − book value 120"],["Real net assets","340","500 − 60 − 20 − 80 − 30 + 30"]]},
{t:"point",x:"Net assets were 340, not 500. The gap of 160 cannot be seen from the accounts alone. It appears only after requesting documents, questioning the staff, and matching the rules against the payroll records."}]},
{h:"3. Net debt: what counts as borrowing?",blocks:[{t:"fig",id:"fin_net_debt",cap:"Start from bank borrowings of 600, add the items treated as debt, deduct cash"},
{t:"table",cols:["Item","Amount (million yen)","Thinking"],rows:[
["Borrowings","600","Bank loans"],["Lease obligations (not on the books)","+50","Vehicle leases: the obligation to pay is the same as a loan"],["Unfunded retirement benefits","+80","Will be paid in cash one day; treated as debt"],["Unpaid overtime","+30","Likewise an obligation to pay"],["Cash","−300","Deduct cash on hand"],["Net debt (as defined in the DD)","460","600 + 50 + 80 + 30 − 300"]]},
{t:"rows",items:[
{name:"Why it matters",x:"Price of the shares = enterprise value − net debt (7-1). Every 30 added to the items treated as debt takes 30 off the share price. What goes in is the negotiation between seller and buyer."},
{name:"4. Working capital",x:"Receivables less payables and accruals. Look at one to two years of monthly movement and settle on a normal level. Check that payments were not delayed just at the year-end to make cash look larger."}]},
{t:"note",x:"* Retirement benefits and overtime appear in both real net assets and net debt, but they are not deducted twice. One is used when pricing from net assets, the other when pricing from enterprise value."}]},
{h:"How it runs",blocks:[{t:"ladder",steps:[
{name:"Request documents",sub:"Three to five years of accounts and tax returns, monthly trial balances, sales by customer, a schedule of borrowings, payroll records, contracts"},
{name:"Analyse the numbers",sub:"Monthly trends, profitability by customer and site, ageing of receivables"},
{name:"Question management and staff",sub:"The reasons behind the numbers; commitments and disputes not in the accounts"},
{name:"Write the report",sub:"Normalised earnings, real net assets, net debt, working capital and the findings"},
{name:"Reflect it in price and contract",sub:"Adjust the price, protect through the contract, set conditions"}]}]},
{h:"How to absorb what you find",blocks:[{t:"table",cols:["Finding","How to absorb it","Example"],rows:[
["A problem with a known amount","Reflect it in the price","Include the 30 of unpaid overtime in net debt"],["A problem that may or may not arise","Protect through the contract (warranties and indemnities)","If past tax returns prove wrong, the seller bears the cost"],["A problem that can be fixed before buying","Make it a condition of completion","The loan to the owner is repaid by the completion date"],["A problem that cannot be absorbed","Walk away","No prospect that the contract with the largest customer will continue"]]},
{t:"check",items:[
{name:"Classify these yourself",x:"‘The labour standards office has issued a correction notice in the past’, ‘the main vehicles are old and must all be replaced next year’, ‘key staff may leave if the owner steps down’: which of the four routes above would you use for each?"},
{name:"Effect on price",x:"A further 40 of lease obligations is found. If enterprise value is unchanged, by how much does the price of the shares fall?"}]}]}],
voice:"What matters in DD is less finding problems than putting a price on them. A report that ends ‘there is a risk’ is no use. Only when it says how large the problem is, and whether price, contract or condition will absorb it, does it become material for a decision.",
terms:[["Financial due diligence","財務デューデリジェンス","재무 실사"],["Adjusted net assets","実態純資産","실질 순자산"],["Debt-like items","借入とみなす項目（デット・ライク・アイテム）","부채성 항목"],["Representations and warranties","表明保証","진술 및 보장"],["Conditions precedent","実行の前提条件","거래 종결의 선행 조건"]],
quiz:[{q:"Unfunded retirement benefits of 80 are found. With enterprise value unchanged, what happens to the share price?",opts:["It falls by 80 (the item goes into net debt)","No change","It rises by 80","Sales fall by 80"],a:0,exp:"It will be paid in cash one day, so it is treated as debt and deducted from enterprise value."},
{q:"How do you absorb a problem that may or may not arise, such as errors in past tax returns?",opts:["Through warranties and indemnities in the contract","Always deduct it from the price","Ignore it","Have the bank pay"],a:0,exp:"Where the amount is not fixed, the contract makes the seller bear it if it arises."},
{q:"Which is closest to the purpose of financial DD?",opts:["To establish how much to pay and what could happen after buying","To give an audit opinion on the accounts","To calculate tax","To appraise the staff"],a:0,exp:"It is not an audit: it serves the investment decision, the price and the contract."}]});
set("7-5",{title:"Writing an Investment Memo: Conclusion First, Backed by Numbers",hl:"Conclusion First, Backed by Numbers",subtitle:"The reader wants to know whether to invest, at what price, and what could go wrong. Not a record of what you looked at, but the material for a decision in one line of argument",
lead:["The findings go into a report for the people who decide on the investment. The common mistake is to write everything in the order it was investigated. The reader wants to know whether to invest, at what price, on what terms and what the dangers are. Nothing more.","This lesson sets out the skeleton of the report, the order to write it in, and the rules for presenting numbers. Formats differ between companies and funds, but the skeleton is nearly always the same."],
sections:[
{h:"The skeleton: seven boxes",blocks:[{t:"fig",id:"fin_report_map",cap:"The seven boxes of an investment memo: read from the top, written from box 3"},
{t:"table",cols:["Box","What to write","Rough length"],rows:[
["1. Conclusion","Invest or not, at what price, on what terms; three reasons","1 page"],
["2. Business","What it earns from, who pays and why it lasts; market and competition","2–3 pages"],
["3. Numbers","Three to five years of history, normalised earnings, real net assets, net debt","2–3 pages"],
["4. Value","Multiples and DCF, the price range, the price proposed and its basis","1–2 pages"],
["5. Risks and responses","The three to five largest; price, contract or condition for each","1–2 pages"],
["6. Structure and exit","Equity and debt, the plan after buying, the exit and expected return","1–2 pages"],
["7. Next steps","Further checks, the timetable, approvals sought","Half a page"]]}]},
{h:"Write in the reverse of the reading order",blocks:[{t:"ladder",steps:[
{name:"3. Firm up the numbers",sub:"Nothing can be written until normalised earnings and net debt are settled"},
{name:"4. Work out the value",sub:"A range from multiples and DCF, then the price to propose"},
{name:"5. Set out the risks",sub:"Each DD finding with an amount and a way of absorbing it"},
{name:"2 and 6. Write the business and the plan",sub:"Explain the numbers in the language of the business"},
{name:"1. Write the conclusion last",sub:"Once everything is settled, reduce it to one page"}]},
{t:"point",x:"Write so that the decision can be made from the conclusion page alone. Busy people read only page one. The remaining pages are there to show the basis when questions are asked."}]},
{h:"Rules for presenting numbers",blocks:[{t:"fig",id:"fin_memo_page",cap:"A sample conclusion page: the unit, the basis and the largest risk all on one page"},
{t:"rows",items:[
{name:"Always state the unit and the date",x:"Million yen or 100 million yen, as of when, reported or adjusted. State it on every table."},
{name:"State the source",x:"Distinguish ‘the accounts’, ‘monthly data received from the company’ and ‘our estimate’. Give the assumptions behind an estimate."},
{name:"Separate fact from opinion",x:"‘45% of sales come from one customer’ is fact; ‘dependence is high’ is opinion. Fact first, opinion after."},
{name:"Show a range",x:"Value is a range, not a single number (7-2). Set out upside, base and downside cases side by side."},
{name:"Bad news up front",x:"Do not hide the risks at the back. Put the largest one in a single line on the conclusion page."}]}]},
{h:"Common mistakes, and try it",blocks:[{t:"table",cols:["Mistake","Fix"],rows:[
["Writing everything in the order investigated","Only what the conclusion needs in the body; the rest in an appendix"],["Using the seller’s numbers as they are","Write with your own adjusted figure (normalised earnings)"],["Only listing risks","Give the amount, and whether price, contract or condition absorbs it"],["One basis for the price","Check with both multiples and DCF and explain the gap"],["No plan for after the purchase","Write what happens in the first 100 days and where the company is in five years"]]},
{t:"check",items:[
{name:"Write the conclusion in three lines",x:"For Minato Ground Services, write three lines: invest or not, the price, and the largest risk with how it is absorbed (figures from 7-3 and 7-4; the price is tested in 7-6)."},
{name:"Separate fact from opinion",x:"Take a paragraph from a report or approval paper you wrote recently and mark the sentences of fact and of opinion in different colours."}]},
{t:"link",href:"投資検討報告書の下書き.html",x:"[Practice page] Investment Memo Draft: fill in the seven boxes and the tool calculates the numbers and assembles the memo"}]}],
voice:"When the report is finished, have someone else read only page one. If they ask ‘so are we doing it, and at what price?’, the conclusion has not been written yet.",
terms:[["Investment memorandum","投資検討報告書","투자 검토 보고서"],["Investment committee","投資委員会","투자위원회"],["Exit","出口（エグジット）","회수(엑시트)"],["Scenarios (upside, base, downside)","シナリオ（良い・基本・悪い）","시나리오(낙관·기본·비관)"],["Internal approval (ringi)","稟議","품의"]],
quiz:[{q:"What goes on page one of the report?",opts:["The conclusion: invest or not, at what price, on what terms","The company’s history","Market statistics","A glossary"],a:0,exp:"The reader decides from page one."},
{q:"Is ‘45% of sales come from one customer’ fact or opinion?",opts:["Fact","Opinion","Neither","A forecast"],a:0,exp:"‘Dependence is dangerously high’ is the opinion. State the fact first."},
{q:"Which is the right way to write up a risk?",opts:["Give the amount and whether price, contract or condition absorbs it","List as many as possible","Gather them in small print on the last page","Leave it out"],a:0,exp:"Only with the response does it become material for a decision."}]});
set("7-6",{title:"Worked Case: Reviewing Minato Ground Services from the Start",hl:"Reviewing Minato Ground Services from the Start",subtitle:"From normalised earnings to a value range, a price, the risks absorbed and the return checked: the tools of Part 7 used in one sequence",
lead:["Lesson 7-3 gave normalised earnings (229); 7-4 gave real net assets (340) and net debt (460). Here we turn those into a value range, set a price, and check whether the investment stands up.","All the figures are fictional and exist to teach the sequence of judgement. A real review adds commercial investigation (market, competition, contracts, people) and legal and tax investigation."],
sections:[
{h:"Working out the value range",blocks:[{t:"fig",id:"fin_value_range",cap:"With multiples, DCF and real net assets on one scale, the position of the proposed price becomes visible"},
{t:"table",cols:["Method","Calculation","Enterprise value","Equity value"],rows:[
["Multiples (low)","Normalised earnings 229 × 5","1,145","685"],["Multiples (high)","229 × 6","1,374","914"],["DCF (10% discount rate)","FCF 110 ÷ (0.10 − 0.01)","1,222","762"],["DCF (8% discount rate)","110 ÷ (0.08 − 0.01)","1,571","1,111"],["Real net assets","7-4","—","340"]]},
{t:"note",x:"* Equity value = enterprise value − net debt of 460. FCF 110 = normalised earnings 229 − tax 44 − capital expenditure 70 − increase in working capital 5. The 5–6× multiple and the 8–10% discount rate are assumptions chosen for a small unlisted company. ★"}]},
{h:"Setting the price",blocks:[{t:"rows",items:[
{name:"Proposed price: 800 for the shares (enterprise value 1,260)",x:"5.5 times normalised earnings: mid-range on multiples and towards the low end of the DCF range. Divided by the reported EBITDA of 180 it is 7.0×, a price that cannot be paid unless the adjustments are accepted."},
{name:"Goodwill of 460",x:"800 − real net assets of 340. This part is not backed by assets; it is paid for future earning power. If the earnings do not continue, this 460 is the loss."},
{name:"The weight of debt",x:"Net debt 460 ÷ normalised earnings 229 = 2.0×. If borrowing is added to fund the purchase, check how far this multiple rises (6-2)."}]}]},
{h:"Absorbing the risks",blocks:[{t:"table",cols:["Risk","Size","How it is absorbed"],rows:[
["The largest customer (45% of sales) is on a one-year contract","Losing it removes nearly half of normalised earnings","Make confirmation of the customer’s intention to continue a condition of completion"],
["Unpaid overtime and labour management","30 for the past; 15 a year going forward","The past amount is in the price (included in net debt); the future amount is already in normalised earnings"],
["Key staff leave when the owner steps down","With fewer people, flights cannot be handled","A contract keeping the owner for two years and commitments on terms for key staff"],
["Labour shortage and rising wages","Staff costs assumed to rise 2–3% a year","Check the price-revision clauses with the airlines and build them into the plan"],
["Errors in past tax or social insurance filings","Amount unknown","Protect through warranties and indemnities in the contract"]]}]},
{h:"Does it stand up as an investment?",blocks:[{t:"fig",id:"fin_return_bridge",cap:"Why 800 becomes 1,340, split into earnings growth and debt repayment"},
{t:"table",cols:["","At purchase","In five years (plan)"],rows:[
["EBITDA","229","280 (4.1% growth a year)"],["Enterprise value (5.5×)","1,260","1,540"],["Net debt","460","200 (260 repaid from cash earned)"],["Equity value","800","1,340"]]},
{t:"rows",items:[
{name:"The return",x:"800 becomes 1,340 in five years: 1.7 times, or 10.9% a year. That is the figure if the plan is met."},
{name:"Work out the downside too",x:"If EBITDA stays at 229 and the company sells for only 4.5×, enterprise value is 1,031 − net debt 200 = 831: barely the money back. Lose the largest customer and the investment falls below cost."}]},
{t:"check",items:[
{name:"Write your own conclusion",x:"Would you invest in this company at 800? Choose ‘yes’, ‘no’ or ‘yes, with conditions’, and give three reasons plus the largest risk and how you would absorb it."},
{name:"Move the price",x:"Change the proposed price to 700 and to 900 and calculate how the return changes if equity is worth 1,340 in five years."}]},
{t:"note",x:"Part 8 covers the differences between Japanese and Korean accounting and how to find accounts and filings. The same company takes a different shape under a different standard."},
{t:"link",href:"企業価値の計算練習.html",x:"[Practice page] Company Valuation Practice: work the Minato Ground Services example yourself, changing the value range, the price and the return"}]}],
voice:"Price is never settled by arithmetic alone. But without the arithmetic you cannot say whether the other side’s number is high or low. If you can explain normalised earnings, net debt and the multiple in your own words, you can sit at the negotiating table.",
terms:[["Goodwill","のれん","영업권"],["Multiple on invested capital","投資倍率（MOIC）","투자 배수(MOIC)"],["Internal rate of return","内部収益率（IRR）","내부수익률(IRR)"],["Key-person clause","キーマン条項","핵심 인력 조항"],["Football field chart","価値の幅の図（フットボール・フィールド）","가치 범위 그림(풋볼 필드)"]],
quiz:[{q:"The shares are bought for 800 and real net assets are 340. What is the goodwill?",opts:["460","340","800","1,140"],a:0,exp:"800 − 340 = 460: the part paid for future earning power."},
{q:"The proposed price (enterprise value 1,260) is what multiple of the reported EBITDA of 180?",opts:["7.0×","5.5×","4.5×","10×"],a:0,exp:"5.5× on normalised earnings of 229; 7.0× on the unadjusted 180. The adjustments decide the price."},
{q:"It is unclear whether the largest customer’s contract will continue. What is the right response?",opts:["Make confirmation of its intention to continue a condition of completion","Do nothing","Raise the price","Leave it out of the report"],a:0,exp:"A problem that can be checked before buying becomes a condition of completion (7-4)."}]});
})(ARTS);
