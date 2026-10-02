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
lead:["A payslip lists set items: the time worked (attendance), the amounts paid (earnings), and social insurance and taxes (deductions). Gross pay minus deductions is the take-home pay that actually reaches the bank account.","This article covers the three parts of a payslip, the size of deductions on a ¥300,000 salary in Japan and a ₩3,000,000 salary in Korea, how each deduction is set, and the monthly payroll cycle."],
sections:[
{h:"The three parts of a payslip",blocks:[{t:"region",jp:[{t:"rows",items:[
{name:"Attendance",x:"Days worked, overtime hours, holiday work and paid leave taken."},
{name:"Earnings",x:"Base salary, allowances, overtime pay at premium rates and commuting allowance. Commuting allowance is free of income tax up to a limit. ★"},
{name:"Deductions",x:"Social insurance (health, long-term care, employees’ pension, employment insurance) and taxes (income tax and residence tax)."}]}],
kr:[{t:"rows",items:[
{name:"Attendance",x:"Days worked, overtime hours, holiday work and annual leave taken."},
{name:"Earnings",x:"Base salary, allowances and overtime pay with a 50% premium on ordinary wages. Meal allowance is free of income tax up to ₩200,000 a month. ★"},
{name:"Deductions",x:"The four social insurances (national pension, health, long-term care, employment) and taxes (income tax and local income tax)."}]}]}]},
{h:"From gross to take-home",blocks:[{t:"region",jp:[{t:"fig",id:"adm_pay",cap:"Around a fifth of gross pay goes in social insurance and taxes."},
{t:"note",x:"* Since April 2026, a child and childcare support levy is also collected with health insurance. The amount is small, but a new line appears on the payslip. ★"}],
kr:[{t:"fig",id:"adm_paykr",cap:"Around 13% of gross pay goes in social insurance and taxes."},
{t:"note",x:"* The national pension rate rises by 0.5 points a year from 2026, reaching 13% in 2033. ★"}]}]},
{h:"How deductions are set",blocks:[{t:"region",jp:[{t:"table",cols:["Deduction","Based on","When it changes"],rows:[
["Health insurance and pension","Standard monthly remuneration (from average April–June pay)","Usually for a year from September, or mid-year if pay changes a lot"],
["Employment insurance","That month’s gross pay × the rate","Monthly; the rate is reviewed each April"],
["Income tax","That month’s pay after social insurance, and the number of dependants","Monthly; settled for the year in December’s year-end adjustment"],
["Residence tax","Last year’s income","Twelve instalments from June to the following May"]]},
{t:"note",x:"* The employer also pays its own share of social insurance, so the cost of employing someone is usually about 15% more than their salary. ★"}],
kr:[{t:"table",cols:["Deduction","Based on","When it changes"],rows:[
["National pension","Standard monthly income (from last year’s income)","Reset every July"],
["Health and long-term care","Monthly remuneration","Monthly; last year is settled the following April"],
["Employment insurance","That month’s pay × the rate","Monthly"],
["Income tax","Simplified tax table (pay and dependants)","Monthly; settled in the year-end settlement in February’s pay"],
["Local income tax","10% of income tax","With income tax"]]},
{t:"note",x:"* The employer also pays its share of the four insurances plus industrial accident insurance, so employment costs are usually around 10% more than salary. ★"}]}]},
{h:"The monthly payroll cycle",blocks:[{t:"ladder",rise:10,steps:[{name:"Close attendance",sub:"Overtime and leave fixed"},{name:"Calculate",sub:"Earnings and deductions"},{name:"Second check",sub:"Anyone very different from last month"},{name:"Pay",sub:"Bank transfer on payday"},{name:"Payslips",sub:"Paper or electronic"},{name:"Pay over",sub:"Withheld tax by the 10th of next month"}]},
{t:"region",jp:[{t:"point",x:"Withheld income tax is normally paid over by the 10th of the month after payday. Companies with fewer than ten employees can apply to pay twice a year instead. Social insurance is debited from the bank at the end of the following month. ★"}],
kr:[{t:"point",x:"Withheld income tax and local income tax are filed and paid by the 10th of the month after payday. Companies with 20 or fewer regular employees in the previous year can apply to pay half-yearly. Social insurance premiums are also due on the 10th of the following month. ★"}]}]}],
voice:"Payroll mistakes cost trust quickly. Make it a habit for someone other than the person who calculated it to check at least anyone whose pay differs a lot from last month.",
terms:[["Gross Pay","総支給額","총지급액"],["Take-home Pay","手取り","수령액"],["Withholding Tax","源泉徴収","원천징수"],["Standard Monthly Remuneration","標準報酬月額","표준보수월액"],["Residence Tax Deducted from Pay","特別徴収","특별징수"]],
quiz:[{q:"(Japan) What is residence tax based on?",opts:["This month’s pay","Last year’s income","Next year’s forecast","Company profit"],a:1,exp:"It is based on last year’s income and deducted in twelve instalments from June."},
{q:"(Japan) What are health insurance and pension contributions based on?",opts:["Standard monthly remuneration","Today’s sales","Age alone","Company size"],a:0,exp:"It is set from April–June pay and normally used for a year from September."},
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
{h:"Documents, seals and stamps",blocks:[{t:"region",jp:[{t:"rows",items:[
{name:"Seals",x:"Keep the registered company seal, the bank seal and the company stamp separately, and record each use."},
{name:"Ringi approvals",x:"Spending or contracts above a set amount are decided only after a written (or electronic) request has passed through the approvers in order."},
{name:"Revenue stamps",x:"Certain contracts and receipts need a revenue stamp according to the amount. Electronic contracts do not. ★"},
{name:"Keeping records",x:"Accounting and tax records must be kept for set periods, usually seven years (7-2)."}]}],
kr:[{"t":"rows","items":[{"name":"Seals","x":"Keep the corporate seal registered with the court registry (proved by a seal certificate) separate from the day-to-day seal used for contracts, which is linked to it by a usage declaration."},{"name":"Approvals","x":"Spending or contracts above a set amount usually go through electronic approval in a set order."},{"name":"Stamp duty","x":"Applies only to specified documents such as property transfers, loans from financial institutions and construction contracts, at ₩20,000 to ₩350,000 depending on the amount. Electronic documents are taxed too, using electronic revenue stamps. Ordinary supply contracts and leases are not taxed. ★"},{"name":"Keeping records","x":"Tax books and evidence for five years, employment contracts and wage ledgers for three, commercial books for ten. ★"}]}]}]},
{h:"Disaster preparedness and office safety",blocks:[{t:"region",jp:[{t:"check",items:[
{name:"Contact list",x:"Decide how to confirm staff are safe at night and on holidays."},
{name:"Stockpile",x:"Water, food, blankets. Tokyo’s ordinance asks employers to try to keep three days’ supplies for staff. ★"},
{name:"Drills",x:"Walk the evacuation route and assembly point at least once a year."},
{name:"Office checks",x:"Shelves fixed to walls, fire extinguishers located, emergency exits kept clear."}]},
{t:"point",x:"Disaster preparedness at home is covered in detail in Part 10 of Living in Japan."}],
kr:[{"t":"check","items":[{"name":"Contact list","x":"Decide how to confirm staff are safe at night and on holidays."},{"name":"Stockpile","x":"Not a legal duty, but keeping a few days of water and food is reassuring."},{"name":"Drills","x":"Take part in fire drills under the building’s fire safety plan, at least once a year. ★"},{"name":"Office checks","x":"Shelves fixed to walls, fire extinguishers located, emergency exits kept clear."}]}]}]}],
voice:"General affairs work is invisible until something goes wrong. Simply putting renewal dates and notice deadlines in the calendar prevents most of the big mistakes.",
terms:[["General Affairs","総務","총무"],["Approval Request (Ringi)","稟議","품의"],["Company Seal","印鑑","인감"],["Revenue Stamp","収入印紙","수입인지"],["Automatic Renewal","自動更新","자동 갱신"]],
quiz:[{q:"What is most easily missed in managing contracts?",opts:["The colour of the contract","The notice deadline","The typeface of the address","The page count"],a:1,exp:"Miss it and the contract may renew automatically."},
{q:"What is ringi?",opts:["A company event","Deciding spending or contracts after approvals pass in a set order","Payroll","Filing tax"],a:1,exp:"It runs on set thresholds such as amounts."},
{q:"(Japan) Does an electronic contract need a revenue stamp?",opts:["Always","No","Twice the amount","The other party pays"],a:1,exp:"Stamp duty applies to paper documents, not electronic ones."}],
next:"0-7 A year in HR: from hiring to year-end adjustment"});

set("0-7",{title:"A Year in HR: From Hiring to Year-end Adjustment",hl:"a year in HR",subtitle:"The same tasks return in the same months each year. With a map of the year, nothing catches you out",
lead:["HR and payroll work has procedures that come round at fixed times every year: April starters, insurance procedures in June and July, year-end tax adjustment in December. Each has a deadline, and being late causes trouble for staff and the company.","This article covers the annual cycle of HR and payroll work, the steps from hiring to the first day, appraisal and pay rises, and the procedures when someone leaves."],
sections:[
{h:"The HR and payroll year",blocks:[{t:"region",jp:[{t:"fig",id:"adm_hrcal",cap:"Colours show the type of work: purple for pay and tax, blue for hiring and training, orange for social and labour insurance."}],
kr:[{"t":"fig","id":"adm_hrcalkr","cap":"Colours show the type of work: purple for pay and tax, blue for hiring and HR, orange for the four social insurances."}]}]},
{h:"From hiring to the first day",blocks:[{t:"ladder",rise:10,steps:[{name:"Hiring plan",sub:"Numbers, timing, budget"},{name:"Recruiting and interviews",sub:"Advertising and selection"},{name:"Offer",sub:"Written terms of employment"},{name:"Joining procedures",sub:"Insurance enrolment"},{name:"Training",sub:"The job and the rules"}]},
{t:"region",jp:[{t:"note",x:"* Enrolment in health insurance and pension is normally due within five days of joining; employment insurance by the 10th of the following month. ★"}],
kr:[{"t":"note","x":"* Insurance enrolment is normally due within 14 days for health insurance, and by the 15th of the following month for national pension, employment and industrial accident insurance. A written employment contract must be given to the employee. ★"}]}]},
{h:"Appraisal and pay rises",blocks:[{t:"rows",items:[
{name:"Start of year: set goals",x:"Manager and employee agree what will be done, and to what level, over the year."},
{name:"Mid-year: review meeting",x:"Check progress and hear about any difficulties."},
{name:"End of year: appraisal",x:"Assess against the agreed goals and explain the reasons to the employee."},
{name:"Apply the result",x:"Reflect it in pay rises or bonuses, and confirm in writing when the change takes effect."}]},
{t:"point",x:"Sharing the appraisal criteria at the start of the year makes the year-end result much easier to accept."}]},
{h:"When someone leaves",blocks:[{t:"region",jp:[{t:"check",items:[
{name:"Fix the leaving date",x:"Receive the resignation and confirm the last working day and remaining paid leave."},
{name:"Insurance procedures",x:"Notify loss of health insurance and pension cover (within five days) and issue the employment insurance separation notice (within ten days). ★"},
{name:"Tax documents",x:"Give the withholding tax slip within a month of leaving, and settle how the remaining residence tax is handled. ★"},
{name:"Returns and handover",x:"Collect the ID card, building pass, computer and keys, and hand over the work."}]}],
kr:[{"t":"check","items":[{"name":"Fix the leaving date","x":"Receive the resignation and confirm the last working day and remaining annual leave (and pay for unused leave)."},{"name":"Insurance procedures","x":"Notify loss of the four insurances (health within 14 days; pension, employment and accident insurance by the 15th of the following month) and issue the employment insurance separation certificate. ★"},{"name":"Severance and wages","x":"Pay severance and any outstanding wages within 14 days of leaving, and give the retirement income withholding slip. ★"},{"name":"Returns and handover","x":"Collect the ID card, building pass, computer and keys, and hand over the work."}]}]}]}],
voice:"The HR year brings the same tasks back in the same months. Leave a note of what you did this year against each month, and next year’s you, and your successor, will thank you.",
terms:[["Year-end Tax Adjustment","年末調整","연말정산"],["Annual Social Insurance Base Report","算定基礎届","산정기초신고"],["Annual Labour Insurance Renewal","労働保険の年度更新","노동보험 연도 갱신"],["Insurance Enrolment Notification","資格取得届","자격취득신고"],["Separation Notice (for Unemployment Benefits)","離職票","이직표"]],
quiz:[{q:"(Japan) In which month is year-end tax adjustment done?",opts:["April","July","December","Every month"],a:2,exp:"The year’s income tax is settled through December’s pay."},
{q:"(Japan) What is the deadline for the social insurance base report?",opts:["31 January","10 July","25 December","There is none"],a:1,exp:"It is based on April–June pay and normally due by 10 July."},
{q:"How do you make appraisals easier to accept?",opts:["Share the criteria at the start of the year","Decide suddenly at year end","Say nothing","Judge on pay alone"],a:0,exp:"Knowing the criteria in advance makes the result easier to accept."}],
next:"0-8 Reporting, informing, consulting and work emails"});

set("0-8",{title:"Reporting, Informing, Consulting and Work Emails",hl:"reporting and email",subtitle:"Lead with the conclusion, and share bad news early. Communication that speeds work up",
lead:["No job in a company is finished alone. Work moves when you tell your manager, colleagues, head office and partners what they need, when they need it. Japanese companies call this hō-ren-sō: report, inform, consult. It is one of the first things a new employee is taught.","This article covers what each part means, how to report starting from the conclusion, how to structure a work email, and points to watch when working across countries, such as between a Korean head office and a Japanese branch."],
sections:[
{h:"Report, inform, consult",blocks:[{t:"rows",items:[
{name:"Report",x:"Tell the person who gave you the task how it went or how it is progressing."},
{name:"Inform",x:"Share decisions and facts with those concerned, without adding your own opinion."},
{name:"Consult",x:"When unsure, ask for views before deciding. Do not carry it alone."}]}]},
{h:"Report the conclusion first",blocks:[{t:"ladder",rise:10,steps:[{name:"Conclusion",sub:"What happened, what the outcome is"},{name:"Reason",sub:"Why it happened"},{name:"Details",sub:"Figures and facts"},{name:"Next step",sub:"What you will do, what you need decided"}]},
{t:"point",x:"The worse the news, the sooner you share it. A first report need not be complete: say what you know now and when you will report next."}]},
{h:"Structuring a work email",blocks:[{t:"table",cols:["Part","How to write it","Example"],rows:[
["Subject","Make the content and deadline clear at a glance","[Please check] October travel expense claim (by 10 Oct)"],
["To and CC","To for those who must act, CC for those who should know","To: the person in charge; CC: their manager"],
["Greeting","Japanese emails open with a set greeting","いつもお世話になっております。"],
["Conclusion and request","In the first three lines","Please review the October expense claim."],
["Details","Short points","Amounts, dates, what is attached"],
["Signature","Name, team, contact details","Company, phone, email"]]}]},
{h:"Working across countries",blocks:[{t:"check",items:[
{name:"Be precise with dates and figures",x:"Write dates starting with the year, such as 2026-10-02, and state the currency (yen or won)."},
{name:"Holidays differ",x:"Check the other side’s holidays first: Lunar New Year and Chuseok in Korea, Golden Week and Obon in Japan."},
{name:"Put decisions in writing",x:"Send a short summary email the same day for anything decided by phone or in a meeting."},
{name:"Key points in both languages",x:"Where a misunderstanding would be costly, write in both Japanese and Korean, or show it in figures and tables."}]}]}],
voice:"The key to a report is that the reader knows straight away what they need to do. Simply putting the conclusion and your request in the first line makes work move much faster.",
terms:[["Report, Inform, Consult","報連相","보고·연락·상담"],["Subject Line","件名","제목"],["CC (Carbon Copy)","CC","참조"],["Bottom Line Up Front","結論から","결론부터"],["Escalation","エスカレーション","에스컬레이션"]],
quiz:[{q:"What comes first in a report?",opts:["A long greeting","The conclusion","Excuses","The weather"],a:1,exp:"Conclusion, reason, details, next step."},
{q:"What should you do with bad news?",opts:["Wait until you know everything","Share it as early as possible","Keep it to yourself","Save it for the weekend"],a:1,exp:"A first report does not need to be complete."},
{q:"What about something decided by phone?",opts:["Remember it","Email a summary the same day","Raise it at the next meeting","Do nothing"],a:1,exp:"Putting it in writing prevents misunderstandings."}],
next:"0-9 Spreadsheet basics"});

set("0-9",{title:"Spreadsheet Basics: Features Used Every Day at Work",hl:"spreadsheet basics",subtitle:"Table layout before functions: building tables that are easy to total and hard to get wrong",
lead:["Payroll totals, expense lists, cash forecasts, sales tracking: much of a company’s number work is done in spreadsheets such as Excel. Before learning clever functions, it matters more to know the table layout that makes totals easy later.","This article covers the principles of building a table, the functions you will use most, how to total and check, and habits that prevent mistakes."],
sections:[
{h:"Principles of a good table",blocks:[{t:"check",items:[
{name:"One record per row",x:"One transaction or one employee per row."},
{name:"One header row",x:"Put the field names along the top row; avoid two-level headers."},
{name:"No merged cells",x:"Merged cells get in the way of sorting and totalling."},
{name:"Enter numbers as numbers",x:"Type 12000, not ¥12,000, and put the unit in the header."},
{name:"Separate input from totals",x:"Keep the sheet you type into separate from the sheet that totals."}]}]},
{h:"Functions you will use most",blocks:[{t:"fig",id:"adm_xl",cap:"Examples of a total (SUM), a conditional total (SUMIF) and a conditional display (IF)."},
{t:"table",cols:["Function","What it does","Typical use"],rows:[
["SUM / AVERAGE","Total / average","Total monthly expenses"],
["ROUND","Rounds a number","Fractions in tax and premiums"],
["IF","Changes the result by condition","Show Check above a limit"],
["SUMIF / COUNTIF","Adds / counts only matching rows","Expenses by item, headcount by team"],
["XLOOKUP (VLOOKUP)","Finds and returns a value from a table","Name from an employee number"],
["EOMONTH","Returns the last day of a month","Calculating payment due dates"]]}]},
{h:"Totalling and checking",blocks:[{t:"rows",items:[
{name:"Pivot tables",x:"Summarise totals by item and month without writing functions."},
{name:"Filter and sort",x:"Show only matching rows; order from largest to smallest."},
{name:"Conditional formatting",x:"Colour negatives or overdue items so they stand out."},
{name:"Cross-check",x:"Check that the column totals and row totals agree."}]}]},
{h:"Habits that prevent mistakes",blocks:[{t:"check",items:[
{name:"Absolute references ($)",x:"Fix cells that must not move when a formula is copied, as in $A$1."},
{name:"Colour formula cells",x:"Separate input cells from formula cells by colour so formulas are not overwritten."},
{name:"Numbers stored as text",x:"Left-aligned numbers may have been entered as text and will be left out of totals."},
{name:"Keep the original",x:"Save a copy before major changes and put the date in the file name."},
{name:"Personal information",x:"Password-protect payroll and address files and limit who can open them."}]},
{t:"point",x:"When you rework figures from accounting or payroll software in a spreadsheet, finish by checking that your totals still match the source software."}]}],
voice:"In spreadsheets, layout comes before functions. Build tables with one record per row and no merged cells, and any total you need later becomes easy.",
terms:[["Function","関数","함수"],["Absolute Reference","絶対参照","절대 참조"],["Pivot Table","ピボットテーブル","피벗 테이블"],["Conditional Formatting","条件付き書式","조건부 서식"],["Cross-check","検算","검산"]],
quiz:[{q:"Which is a principle of an easy-to-total table?",opts:["Merge cells","One record per row","Three header rows","Type units with the numbers"],a:1,exp:"One record per row, one header row, no merged cells."},
{q:"Which function adds only the rows where the item is Travel?",opts:["SUM","SUMIF","ROUND","EOMONTH"],a:1,exp:"It adds only rows that meet the condition."},
{q:"How do you stop a cell reference moving when copying a formula?",opts:["Fix it as $A$1","Colour it","Delete it","Merge it"],a:0,exp:"Use an absolute reference."}],
next:"0-10 Rules of employment, payslips and paid leave from the employee’s side"});

set("0-10",{title:"Rules of Employment, Payslips and Paid Leave from the Employee’s Side",hl:"the employee’s side",subtitle:"Read the agreement between you and the company once, when you join",
lead:["So far we have looked at HR and money from the company’s side. This article looks from the other side, the employee’s: the documents you receive on joining, what to read first in the rules of employment, the rules on paid leave, and what to check on your monthly payslip.","Knowing your rights and duties is the foundation for working well with a company for a long time."],
sections:[
{h:"Documents you receive on joining",blocks:[{t:"region",jp:[{t:"rows",items:[
{name:"Statement of employment terms",x:"Your pay, working hours, days off and contract period (1-1)."},
{name:"Rules of employment",x:"The company-wide rules. Companies with ten or more employees must draw them up and file them, and staff can see them at any time. ★"},
{name:"Pay regulations",x:"How pay is calculated, allowances and the rules for pay rises."},
{name:"Article 36 agreement",x:"The agreement between the company and staff representatives that allows overtime and holiday work, including the overtime limits."}]}],
kr:[{"t":"rows","items":[{"name":"Employment contract","x":"Pay, hours, days off, annual leave and other terms must be set out in writing and given to the employee. ★"},{"name":"Rules of employment","x":"Companies with ten or more regular employees must draw them up and file them."},{"name":"Wage statement","x":"Each payday, a statement showing the items and how they were calculated must be given."},{"name":"Overtime limit","x":"Up to 12 hours a week by agreement (a 52-hour week)."}]}]}]},
{h:"What to read first in the rules",blocks:[{t:"check",items:[
{name:"Hours, breaks and days off",x:"Start and finish times, break times and company holidays."},
{name:"Overtime and premiums",x:"How to apply for overtime and the premium rates."},
{name:"Leave",x:"Paid leave and special leave for weddings, funerals and similar."},
{name:"Payday",x:"Which day each month you are paid, and for which period."},
{name:"Leaving",x:"How much notice to give, for example one month, and the procedure."}]}]},
{h:"The rules on paid leave",blocks:[{t:"region",jp:[{t:"table",cols:["Length of service","Days per year"],rows:[
["6 months","10"],["1 year 6 months","11"],["2 years 6 months","12"],["3 years 6 months","14"],["4 years 6 months","16"],["5 years 6 months","18"],["6 years 6 months or more","20"]]},
{t:"note",x:"* You must have attended at least 80% of working days. Employers must make sure anyone entitled to ten or more days takes at least five a year. Unused days expire after two years. Part-timers receive fewer days in proportion to the days they work. ★"}],
kr:[{"t":"table","cols":["Length of service","Annual leave"],"rows":[["Under 1 year","1 day per month of full attendance (up to 11)"],["1 year (80% attendance)","15 days"],["3 years","16 days"],["5 years","17 days"],["21 years or more","25 days (the maximum)"]]},
{"t":"note","x":"* From the third year, one day is added every two years, up to 25. Workplaces with fewer than five regular employees are exempt. Unused leave is normally paid out, unless the employer used the formal procedure to encourage it to be taken. ★"},
{"t":"rows","items":[{"name":"Weekly paid holiday","x":"Anyone working 15 hours or more a week who attends every scheduled day gets one paid day off a week."},{"name":"Severance pay","x":"Anyone employed for a year or more at 15 hours or more a week receives 30 days’ average wages per year of service, paid within 14 days of leaving."}]}]}]},
{h:"What to check on your payslip",blocks:[{t:"region",jp:[{t:"check",items:[
{name:"Attendance figures",x:"Do days worked and overtime hours match your own record?"},
{name:"Overtime pay",x:"Has premium pay been paid for the overtime hours?"},
{name:"The month premiums change",x:"Social insurance changes to the new amount in September’s (or October’s) pay."},
{name:"The month residence tax changes",x:"The new residence tax amount starts with June’s pay."},
{name:"Year-end adjustment result",x:"December’s or January’s pay includes any income tax refund (or extra charge)."}]},
{t:"point",x:"How to read each line of a payslip in detail is also covered in lesson 6-1 of Living in Japan."}],
kr:[{"t":"check","items":[{"name":"Attendance figures","x":"Do days worked and overtime hours match your own record?"},{"name":"Overtime pay","x":"Has at least a 50% premium on ordinary wages been paid?"},{"name":"The months premiums change","x":"National pension changes in July; health insurance is settled in April."},{"name":"Year-end settlement result","x":"February’s pay includes any income tax refund (or extra charge)."}]}]}]}],
voice:"The rules of employment are the agreement between you and the company. Read them once when you join, and you will not be caught off guard at important moments such as taking leave or resigning.",
terms:[["Rules of Employment","就業規則","취업규칙"],["Statement of Employment Terms","労働条件通知書","근로조건통지서"],["Annual Paid Leave","年次有給休暇","연차 유급휴가"],["Article 36 Overtime Agreement","36協定","36협정"],["Employer-designated Leave Dates","時季指定","시기 지정"]],
quiz:[{q:"(Japan) After six months with 80% attendance, how many days of paid leave do you get?",opts:["5","10","15","20"],a:1,exp:"It starts at ten days and rises with length of service."},
{q:"(Japan) What happens to unused paid leave?",opts:["It lasts for ever","It expires after two years","It expires next month","It is always paid out"],a:1,exp:"The limitation period is two years."},
{q:"(Japan) Around which month do social insurance deductions usually change?",opts:["January","April","September–October","December"],a:2,exp:"Based on the base report, they change from September."}],
next:"Part 1 1-1 Types of employment and stating the terms"});
})(window.ARTS);
