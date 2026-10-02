/* HR, General Affairs and Finance — English version, Part 0 (0-1 to) */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("0-1",{title:"How a Company Works: What HR, General Affairs, Accounting and Finance Do",hl:"how a company works",subtitle:"Start with a map of the four jobs that keep a company’s money and people running",
lead:["Behind the people who sell and make things, every company has work that supports them: HR hires and develops people, general affairs looks after the workplace and contracts, accounting records each day’s transactions, and finance manages the flow of money.","This article covers how the four jobs differ, who does what across the year, and what to watch when a small branch or company combines them. It is also the map for the whole series."],
sections:[
{h:"Four jobs that support money and people",blocks:[{t:"fig",id:"adm_org",cap:"HR looks after people, general affairs the workplace, accounting the records, and finance the flow of cash."},
{t:"p",x:"Large companies split these into departments, but the work is the same whatever the size. Each job comes down to the right person doing a set task at a set time."}]},
{h:"Who does what, and when",blocks:[{t:"table",cols:["Job","Daily","Monthly","Yearly"],rows:[
["HR","Checking attendance","Calculating and paying salaries","Pay reviews and appraisals, year-end tax adjustment (December)"],
["General affairs","Post, visitors, supplies","Checking contracts and payments","Renewing insurance and contracts, fire drills"],
["Accounting","Sorting vouchers and receipts, journal entries","Monthly close, reporting to head office","Annual accounts, tax returns"],
["Finance","Checking receipts, payments and balances","Updating the cash plan","Budget, meetings with the bank"]]},
{t:"note",x:"* Companies split these differently. In many, accounting also runs payroll, or HR and general affairs are one team."}]},
{h:"When a small team combines the roles",blocks:[{t:"check",items:[
{name:"Separate paying from recording and checking",x:"If one person does everything, nobody can catch mistakes or fraud. If that is impossible, have head office or a manager check every month."},
{name:"Put approval limits in a table",x:"Decide who may approve up to what amount, and keep it in writing (7-1)."},
{name:"Use outside professionals",x:"Tax accountants, labour and social security attorneys and judicial scriveners can take the difficult judgments."},
{name:"Write the procedures down",x:"Record the steps and deadlines so work continues when someone is away or leaves."}]}]},
{h:"A map of this series",blocks:[{t:"rows",items:[
{name:"Part 0 Money and People: First Steps",x:"How a company works, accounting basics, payroll, the year in general affairs and HR, and workplace basics."},
{name:"Parts 1–3 HR",x:"Types of employment, working hours and leave, payroll and social insurance, from hiring to leaving."},
{name:"Parts 4–6 Money",x:"Cash management and overseas remittances, tax, monthly closing and budgeting."},
{name:"Part 7 Policies and Records",x:"Company rules and keeping paper and electronic records."}]},
{t:"point",x:"Procedures for setting up a branch or company in Japan (registration, licences, opening accounts) are covered in the series Launching Flights and a Station in Japan. This series focuses on running things month by month and year by year once you are set up."}]}],
voice:"The smaller the branch, the more basic the safeguard: separate the person who pays from the person who records and checks it. If two people are not possible, at least have head office check every month.",
terms:[["Human Resources (HR)","人事","인사"],["General Affairs","総務","총무"],["Accounting","経理","경리"],["Finance / Treasury","財務","재무"],["Internal Control","内部統制","내부 통제"]],
quiz:[{q:"Which job records each day’s transactions and turns them into accounts?",opts:["HR","General affairs","Accounting","Finance"],a:2,exp:"That is accounting."},
{q:"What is the most basic safeguard when a small team combines roles?",opts:["Give everything to one person","Separate paying from recording and checking","Keep no records","Approve verbally"],a:1,exp:"If you cannot separate them, have head office check regularly."},
{q:"When is year-end tax adjustment usually done?",opts:["April","July","December","Every day"],a:2,exp:"The year’s income tax is settled through December’s pay."}],
next:"0-2 First steps in accounting: journal entries"});

set("0-2",{title:"First Steps in Accounting: Recording Transactions as Journal Entries",hl:"journal entries",subtitle:"Every transaction is written on a left and a right side, and every set of books starts there",
lead:["Accounting begins by recording each movement of money in a company, each transaction, in the books in a fixed way. That way is the journal entry. Each transaction is written from two sides, the left (debit) and the right (credit), and the two totals must always match.","This article covers the rules of journal entries, common entries you will meet, and how a receipt becomes a set of accounts."],
sections:[
{h:"Why keep records?",blocks:[{t:"rows",items:[
{name:"Tax returns",x:"Corporate tax, consumption tax and others are calculated from the figures in the books."},
{name:"Reporting to head office and shareholders",x:"Monthly and annual results are reported in a set format (6-1)."},
{name:"Management decisions",x:"The figures show where profit comes from and where money goes."},
{name:"Audits and tax inspections",x:"They show that the evidence for each transaction connects to the books (7-2)."}]}]},
{h:"The rules",blocks:[{t:"fig",id:"adm_jnl",cap:"Split the transaction into left and right; the two totals must always be equal."},
{t:"table",cols:["Category","When it increases","When it decreases"],rows:[
["Assets (cash, deposits, receivables, equipment)","Left (debit)","Right (credit)"],
["Liabilities (loans, amounts payable)","Right (credit)","Left (debit)"],
["Net assets (capital)","Right (credit)","Left (debit)"],
["Expenses (salaries, rent, supplies)","Left (debit)","—"],
["Revenue (sales)","Right (credit)","—"]]}]},
{h:"Common entries",blocks:[{t:"table",cols:["Transaction","Debit (left)","Credit (right)"],rows:[
["Salary of ¥300,000 paid from the bank (deductions ignored)","Salaries 300,000","Bank deposit 300,000"],
["Service worth ¥500,000 provided, to be paid next month","Accounts receivable 500,000","Sales 500,000"],
["Next month the ¥500,000 arrives","Bank deposit 500,000","Accounts receivable 500,000"],
["Office rent of ¥200,000 paid by transfer","Rent 200,000","Bank deposit 200,000"],
["Computer bought for ¥150,000","Equipment 150,000","Bank deposit 150,000"]]},
{t:"note",x:"* Equipment costing ¥100,000 or more is recorded as an asset and expensed over several years (depreciation). Check current tax rules, including special treatment for small companies. ★"}]},
{h:"From receipt to accounts",blocks:[{t:"ladder",rise:10,steps:[{name:"Evidence",sub:"Receipts, invoices, contracts"},{name:"Journal entry",sub:"Recorded left and right"},{name:"General ledger",sub:"Grouped by account"},{name:"Trial balance",sub:"Left and right totals checked"},{name:"Accounts",sub:"P/L and balance sheet (0-3)"}]},
{t:"point",x:"Accounting software now produces everything from entries to accounts automatically. Even so, if you understand what an entry means, you will spot figures that look wrong straight away."}]}],
voice:"Rather than memorising entries, first explain in words where the money came from and where it went. Once you can say it, left and right fall into place.",
terms:[["Journal Entry","仕訳","분개"],["Debit","借方","차변"],["Credit","貸方","대변"],["Account Title","勘定科目","계정과목"],["Trial Balance","試算表","시산표"]],
quiz:[{q:"Stationery is bought with cash. What goes on the debit (left)?",opts:["Cash","Supplies expense","Sales","Loans"],a:1,exp:"An expense increased, so it is a debit; cash decreased, so it is a credit."},
{q:"Which rule always applies?",opts:["Left is larger","Right is larger","Left and right totals are equal","Only one side is written"],a:2,exp:"Every transaction balances."},
{q:"A sale is to be paid next month. Which account goes on the left?",opts:["Accounts receivable","Bank deposit","Accounts payable","Salaries"],a:0,exp:"Money not yet received is an asset called accounts receivable."}],
next:"0-3 The three financial statements"});

set("0-3",{title:"The Three Financial Statements: P/L, Balance Sheet and Cash Flow",hl:"financial statements",subtitle:"Did we earn, what do we hold, and how did cash move: three statements, three questions",
lead:["Journal entries are gathered into the financial statements. At their heart are three: the profit and loss statement for the year’s results, the balance sheet for what the company holds on the closing date, and the cash flow statement for the cash that came in and went out.","This article covers what each statement does and how they connect, how to read the P/L and the balance sheet, and a few figures that show a company’s health."],
sections:[
{h:"The three statements and how they link",blocks:[{t:"fig",id:"adm_fs3",cap:"Profit builds up in net assets on the balance sheet, and year-end cash matches the cash on the balance sheet."}]},
{h:"Reading the P/L from the top",blocks:[{t:"table",cols:["Line","Meaning"],rows:[
["Sales","What was earned from goods and services sold"],
["Cost of sales","What it cost to buy or make what was sold"],
["Gross profit","Sales − cost of sales"],
["Selling, general and administrative expenses","Salaries, rent, advertising and other costs of running the company"],
["Operating profit","Profit earned from the core business"],
["Ordinary profit","Operating profit plus non-core items such as interest"],
["Net profit for the year","What remains after extraordinary items and tax"]]},
{t:"note",x:"* This is the usual Japanese layout. Order and names differ a little by country and accounting standard."}]},
{h:"Reading the balance sheet left and right",blocks:[{t:"rows",items:[
{name:"Left: assets",x:"Current assets (cash, deposits, receivables and other items that become cash within a year) and fixed assets (buildings, equipment and other long-term items)."},
{name:"Top right: liabilities",x:"Current liabilities (due within a year) and long-term liabilities such as long-term loans. Money that must be repaid."},
{name:"Bottom right: net assets",x:"Capital plus accumulated profit (retained earnings). Money that does not have to be repaid."}]},
{t:"point",x:"The left (assets) shows what the money is being used for; the right (liabilities and net assets) shows where it came from. That is why the two sides always balance."}]},
{h:"Figures that show a company’s health",blocks:[{t:"table",cols:["Figure","Calculation","What it shows"],rows:[
["Operating margin","Operating profit ÷ sales","How efficiently the core business earns"],
["Current ratio","Current assets ÷ current liabilities","Whether payments due within a year are covered (100% or more as a guide)"],
["Equity ratio","Net assets ÷ total assets","Whether the company leans too heavily on debt"]]},
{t:"note",x:"* Benchmarks vary widely by industry. Compare with similar companies and with the previous year."}]}],
voice:"When you first look at financial statements, look for what changed most from last year rather than reading every figure. Asking why it changed is where analysis begins.",
terms:[["Profit and Loss Statement (P/L)","損益計算書","손익계산서"],["Balance Sheet (B/S)","貸借対照表","대차대조표(재무상태표)"],["Cash Flow Statement (C/F)","キャッシュ・フロー計算書","현금흐름표"],["Operating Profit","営業利益","영업이익"],["Net Assets","純資産","순자산"]],
quiz:[{q:"Which line shows profit from the core business?",opts:["Sales","Operating profit","Net profit for the year","Cost of sales"],a:1,exp:"Operating profit is gross profit minus SG&A."},
{q:"What does the right side of the balance sheet show?",opts:["What the money is used for","Where the money came from","The year’s profit","Cash in and out"],a:1,exp:"Left is the use; right is the source."},
{q:"Where does the year’s profit build up on the balance sheet?",opts:["Current assets","Long-term liabilities","Net assets (retained earnings)","Receivables"],a:2,exp:"Profit is added to retained earnings in net assets."}],
next:"0-4 Cash management: profit and cash are not the same"});

set("0-4",{title:"Cash Management: Profit and Cash Are Not the Same",hl:"cash management",subtitle:"Using a cash flow forecast to avoid running out of money while making a profit",
lead:["Companies do not only fail because they make losses. Even a profitable company cannot continue if it lacks cash on the day a payment is due. This is sometimes called going bankrupt in the black. Profit is a figure in the books; cash is money actually in the bank, and the two do not move together.","This article covers why profit and cash diverge, how to build a cash flow forecast, daily habits that protect cash, and points specific to the branch of a foreign company."],
sections:[
{h:"Why profit and cash diverge",blocks:[{t:"fig",id:"adm_cash",cap:"Profit (blue) keeps rising, but if customers pay late, cash (green) can briefly go negative."},
{t:"rows",items:[
{name:"Late collection of receivables",x:"Sales are booked, but the money arrives next month or the month after. Salaries and rent have to be paid in the meantime."},
{name:"Buying equipment",x:"The cost is spread over several years as depreciation, but the cash goes out all at once."},
{name:"Repaying loans",x:"Repayment is not an expense, so profit is unchanged, but cash goes down."},
{name:"Large payments falling together",x:"Bonuses, taxes, insurance renewals and annual contracts can land in the same month."}]}]},
{h:"Building a cash flow forecast",blocks:[{t:"table",cols:["Item (¥10k)","Month 2","Month 3","Month 4"],rows:[
["Opening balance","300","180","90"],
["Receipts (customer payments)","200","210","230"],
["Payments (salaries, rent, suppliers)","320","300","340"],
["Closing balance","180","90","−20"]]},
{t:"note",x:"* The same example as the figure. Opening balance + receipts − payments = closing balance. The table exists to spot a negative month several months ahead."},
{t:"point",x:"Forecast at least three months ahead, ideally a full year. As a rule, assume receipts come late and payments go early."}]},
{h:"Daily habits that protect cash",blocks:[{t:"check",items:[
{name:"Look at the balance every day",x:"Compare the bank balance with today’s and this week’s payments."},
{name:"Track collection dates",x:"List receivables by customer and chase anything overdue straight away."},
{name:"Standardise payment terms",x:"Terms such as closing at month end and paying at the end of the next month make planning easier."},
{name:"Enter large payments first",x:"Put bonuses, taxes and insurance renewals into the forecast at the start of the year."},
{name:"Set a cash buffer",x:"Many companies aim, for example, for two to three months of fixed costs."}]}]},
{h:"For the branch of a foreign company",blocks:[{t:"rows",items:[
{name:"Funding from head office",x:"If working capital comes from head office, request it allowing for the days the remittance takes (4-2)."},
{name:"Exchange rates",x:"Movements between head office’s currency and the yen change the yen value of the same budget."},
{name:"Airport income",x:"At an airline station, charges collected and refunds paid at the airport are part of the cash flow too (4-1)."}]},
{t:"point",x:"Opening accounts and preparing funds when setting up in Japan are covered in lesson 2-2 of Launching Flights and a Station in Japan."}]}],
voice:"A cash forecast built on optimism is useless. If you assume money comes in late and goes out early, you can see in advance the month you will really be short.",
terms:[["Bankruptcy Despite Profit","黒字倒産","흑자도산"],["Cash Flow Forecast","資金繰り表","자금 계획표"],["Accounts Receivable","売掛金","매출채권"],["Working Capital","運転資金","운전 자금"],["Cash on Hand","手元資金","보유 현금"]],
quiz:[{q:"What does going bankrupt in the black mean?",opts:["Failing because of losses","Failing for lack of cash despite making a profit","Not paying tax","Having no sales"],a:1,exp:"Profit and cash do not move together."},
{q:"What happens when a loan is repaid?",opts:["Profit and cash both fall","Profit is unchanged but cash falls","Only profit falls","Neither changes"],a:1,exp:"Repayment is not an expense."},
{q:"What is the basic rule for a cash forecast?",opts:["Receipts early, payments late","Receipts late, payments early","Be optimistic about both","Do not make one"],a:1,exp:"A cautious forecast shows shortfalls sooner."}],
next:"0-5 Payroll: from gross pay to take-home pay"});

set("0-5",{title:"Payroll: From Gross Pay to Take-home Pay",hl:"payroll",subtitle:"What is deducted and how much, seen from both the payroll team’s side and the employee’s",
lead:["A payslip lists set items: the time worked (attendance), the amounts paid (earnings), and social insurance and taxes (deductions). Gross pay minus deductions is the take-home pay that actually reaches the bank account.","This article covers the three parts of a payslip, the size of deductions on a ¥300,000 salary, how each deduction is set, and the monthly payroll cycle."],
sections:[
{h:"The three parts of a payslip",blocks:[{t:"rows",items:[
{name:"Attendance",x:"Days worked, overtime hours, holiday work and paid leave taken."},
{name:"Earnings",x:"Base salary, allowances, overtime pay at premium rates and commuting allowance. Commuting allowance is free of income tax up to a limit. ★"},
{name:"Deductions",x:"Social insurance (health, long-term care, employees’ pension, employment insurance) and taxes (income tax and residence tax)."}]}]},
{h:"From gross to take-home",blocks:[{t:"fig",id:"adm_pay",cap:"Around a fifth of gross pay goes in social insurance and taxes."},
{t:"note",x:"* Since April 2026, a child and childcare support levy is also collected with health insurance. The amount is small, but a new line appears on the payslip. ★"}]},
{h:"How deductions are set",blocks:[{t:"table",cols:["Deduction","Based on","When it changes"],rows:[
["Health insurance and pension","Standard monthly remuneration (from average April–June pay)","Usually for a year from September, or mid-year if pay changes a lot"],
["Employment insurance","That month’s gross pay × the rate","Monthly; the rate is reviewed each April"],
["Income tax","That month’s pay after social insurance, and the number of dependants","Monthly; settled for the year in December’s year-end adjustment"],
["Residence tax","Last year’s income","Twelve instalments from June to the following May"]]},
{t:"note",x:"* The employer also pays its own share of social insurance, so the cost of employing someone is usually about 15% more than their salary. ★"}]},
{h:"The monthly payroll cycle",blocks:[{t:"ladder",rise:10,steps:[{name:"Close attendance",sub:"Overtime and leave fixed"},{name:"Calculate",sub:"Earnings and deductions"},{name:"Second check",sub:"Anyone very different from last month"},{name:"Pay",sub:"Bank transfer on payday"},{name:"Payslips",sub:"Paper or electronic"},{name:"Pay over",sub:"Withheld tax by the 10th of next month"}]},
{t:"point",x:"Withheld income tax is normally paid over by the 10th of the month after payday. Companies with fewer than ten employees can apply to pay twice a year instead. Social insurance is debited from the bank at the end of the following month. ★"}]}],
voice:"Payroll mistakes cost trust quickly. Make it a habit for someone other than the person who calculated it to check at least anyone whose pay differs a lot from last month.",
terms:[["Gross Pay","総支給額","총지급액"],["Take-home Pay","手取り","수령액"],["Withholding Tax","源泉徴収","원천징수"],["Standard Monthly Remuneration","標準報酬月額","표준보수월액"],["Residence Tax Deducted from Pay","特別徴収","특별징수"]],
quiz:[{q:"What is residence tax based on?",opts:["This month’s pay","Last year’s income","Next year’s forecast","Company profit"],a:1,exp:"It is based on last year’s income and deducted in twelve instalments from June."},
{q:"What are health insurance and pension contributions based on?",opts:["Standard monthly remuneration","Today’s sales","Age alone","Company size"],a:0,exp:"It is set from April–June pay and normally used for a year from September."},
{q:"What is an effective payroll check?",opts:["No check","Someone else checks anyone very different from last month","Leave it to employees","Once a year"],a:1,exp:"A second check prevents mistakes."}],
next:"0-6 General affairs: contracts, equipment, the office and documents"});

set("0-6",{title:"General Affairs: Contracts, Equipment, the Office and Documents",hl:"general affairs",subtitle:"The groundwork that keeps a company running, done before problems arise",
lead:["General affairs work goes unnoticed while nothing goes wrong. But a forgotten contract renewal or loose control of equipment can lead to large losses and trouble. General affairs looks after the foundations the company relies on every day.","This article covers what general affairs handles, how to manage contracts, Japanese document habits (seals, ringi approvals, revenue stamps), and disaster preparedness and office safety."],
sections:[
{h:"What general affairs handles",blocks:[{t:"table",cols:["Area","What it covers","When to check"],rows:[
["Contracts","Office lease, leasing, maintenance, insurance","One to three months before renewal"],
["Equipment and assets","Computers, mobile phones, keys, company cars","Keep a register and check against the items once a year"],
["The office","Faults, cleaning, visitors, post","Daily"],
["Documents and seals","Keeping contracts and internal records, use of seals","Record each use"],
["Disaster and safety","Evacuation drills, stockpiles, contact lists","Once or twice a year"],
["Welfare and events","Arranging health checks, welcome and farewell events","Put in the annual calendar"]]}]},
{h:"Managing contracts",blocks:[{t:"check",items:[
{name:"Party and subject",x:"Who the contract is with, and what it covers."},
{name:"Term and automatic renewal",x:"When it ends, and whether it renews automatically if nothing is done."},
{name:"Notice deadline",x:"For example, written notice three months before expiry. Miss it and the contract may run for another year."},
{name:"Amount and payment terms",x:"Monthly or annual, and the conditions for price rises."},
{name:"Owner and location",x:"Where the original is and who manages it."}]},
{t:"point",x:"Keep contracts in one list (a contract register) and put the notice deadlines in the calendar. That alone prevents many mistakes."}]},
{h:"Japanese document habits",blocks:[{t:"rows",items:[
{name:"Seals",x:"Keep the registered company seal, the bank seal and the company stamp separately, and record each use."},
{name:"Ringi approvals",x:"Spending or contracts above a set amount are decided only after a written (or electronic) request has passed through the approvers in order."},
{name:"Revenue stamps",x:"Certain contracts and receipts need a revenue stamp according to the amount. Electronic contracts do not. ★"},
{name:"Keeping records",x:"Accounting and tax records must be kept for set periods, usually seven years (7-2)."}]}]},
{h:"Disaster preparedness and office safety",blocks:[{t:"check",items:[
{name:"Contact list",x:"Decide how to confirm staff are safe at night and on holidays."},
{name:"Stockpile",x:"Water, food, blankets. Tokyo’s ordinance asks employers to try to keep three days’ supplies for staff. ★"},
{name:"Drills",x:"Walk the evacuation route and assembly point at least once a year."},
{name:"Office checks",x:"Shelves fixed to walls, fire extinguishers located, emergency exits kept clear."}]},
{t:"point",x:"Disaster preparedness at home is covered in detail in Part 10 of Living in Japan."}]}],
voice:"General affairs work is invisible until something goes wrong. Simply putting renewal dates and notice deadlines in the calendar prevents most of the big mistakes.",
terms:[["General Affairs","総務","총무"],["Approval Request (Ringi)","稟議","품의"],["Company Seal","印鑑","인감"],["Revenue Stamp","収入印紙","수입인지"],["Automatic Renewal","自動更新","자동 갱신"]],
quiz:[{q:"What is most easily missed in managing contracts?",opts:["The colour of the contract","The notice deadline","The typeface of the address","The page count"],a:1,exp:"Miss it and the contract may renew automatically."},
{q:"What is ringi?",opts:["A company event","Deciding spending or contracts after approvals pass in a set order","Payroll","Filing tax"],a:1,exp:"It runs on set thresholds such as amounts."},
{q:"Does an electronic contract need a revenue stamp?",opts:["Always","No","Twice the amount","The other party pays"],a:1,exp:"Stamp duty applies to paper documents, not electronic ones."}],
next:"Part 1 1-1 Types of employment and stating the terms"});
})(window.ARTS);
