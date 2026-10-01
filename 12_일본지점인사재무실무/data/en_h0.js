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
next:"Part 1 1-1 Types of employment and stating the terms"});
})(window.ARTS);
