/* Reading a Company Through Its Numbers — Part 8 Accounting in Japan and Korea (8-1 to 8-6), English / 2026.10
   Rules change. Checked as of October 2026: the new Japanese lease standard (ASBJ Statement No. 34, for years beginning on or after 1 April 2027),
   the end of statutory quarterly reports in Japan (April 2024), the Korean statutory audit thresholds, and K-IFRS 1118 (for years beginning on or after 1 January 2027). Items that may change are marked ★ */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("8-1",{title:"Accounting Standards in Japan and Korea: Which Companies Use Which",hl:"Which Companies Use Which",subtitle:"Before reading a set of accounts, check which standard it was prepared under. Japanese companies can choose; listed Korean companies must use K-IFRS",
lead:["Up to Part 7 we read the numbers, compared them and put a price on a company. This last Part deals with differences between countries and standards. The same words, “operating profit”, can contain different things under different standards. When your job is to read Japanese and Korean companies side by side, the standard is the first thing to check.","Listed Japanese companies can choose from four sets of standards: most use Japanese GAAP, and many large ones use IFRS. Listed Korean companies have had to use K-IFRS (Korean IFRS) since 2011. Unlisted companies use different standards in both countries."],
sections:[
{h:"A map of the standards",blocks:[{t:"fig",id:"fin_gaap_map",cap:"Accounting standards used in Japan and Korea, by type of company"},
{t:"table",cols:["Type of company","Japan","Korea"],rows:[
["Listed companies","Choose from Japanese GAAP, IFRS (optional), US GAAP and JMIS","K-IFRS, mandatory since 2011"],
["Unlisted but audited","Japanese GAAP (accounts under the Companies Act)","Korean GAAP for non-listed companies; K-IFRS may be chosen"],
["Small companies","Guidelines for SME accounting","Accounting standard for SMEs"]]},
{t:"note",x:"* In Japan, IFRS can be chosen for the consolidated statements of companies that meet certain conditions. The parent-only accounts are prepared under Japanese GAAP. ★"}]},
{h:"Where to find the standard",blocks:[{t:"fig",id:"fin_std_where",cap:"Where the standard is stated in three documents. The yellow box shows the actual wording."},{t:"rows",items:[
{name:"Japanese earnings release",x:"It is in the title on the cover, in brackets: 〔IFRS〕 or 〔日本基準〕 (Japanese GAAP)."},
{name:"Japanese annual securities report",x:"The opening of the financial section (経理の状況) states the standard used for the consolidated statements."},
{name:"Korean annual report and audit report",x:"The note on the basis of preparation (재무제표 작성기준) says whether the accounts follow K-IFRS (한국채택국제회계기준) or Korean GAAP (일반기업회계기준)."},
{name:"Airline examples",x:"JAL uses IFRS, ANA uses Japanese GAAP, and Korean Air and Jeju Air use K-IFRS (5-6). Even the two Japanese airlines are on different standards. ★"}]}]},
{h:"What changes with the standard",blocks:[{t:"table",cols:["Item","Japanese GAAP","IFRS and K-IFRS"],rows:[
["Goodwill","Amortised systematically over 20 years or less","Not amortised; tested for impairment every year"],
["Leases (lessee)","Operating leases stay off the balance sheet (on it for years beginning on or after April 2027)","In principle all leases are on the balance sheet (since 2019)"],
["Steps on the income statement","Operating profit → ordinary profit → extraordinary items → net profit","No ordinary profit and no extraordinary items"]]},
{t:"point",x:"A difference in standards is not about which one is right. It is about how the same event is written down. Once you know the differences, you can restate the numbers and put them side by side (8-6)."}]},
{h:"Consolidated and separate, year-end, and practice",blocks:[{t:"rows",items:[
{name:"Consolidated and separate",x:"Japan uses 連結 (consolidated) and 単体 or 個別 (parent-only); Korea uses 연결 and 별도. Use the consolidated statements to see the whole group. In Korea, 별도재무제표 are the separate statements of a company that has subsidiaries, and 개별재무제표 are the statements of a company that has none."},
{name:"Year-end",x:"Many Japanese companies close their year in March; almost all Korean companies close in December. The same “fiscal 2025” is three months apart."}]},
{t:"check",items:[
{name:"Check the standard",x:"Open the cover of the latest earnings releases of JAL and ANA and find the standard in the title."},
{name:"For a Korean company",x:"Open Korean Air’s annual business report and find the note on the basis of preparation (how to find the report: 8-5)."}]}]}],
voice:"When you put a Japanese and a Korean company on one table, make “standard” and “year-end” the top two rows. That alone stops most misreadings before they happen.",
terms:[["Japanese GAAP","日本基準（J-GAAP）","일본 회계기준(J-GAAP)"],["IFRS","IFRS（国際財務報告基準）","IFRS(국제회계기준)"],["K-IFRS","K-IFRS（韓国採択国際会計基準）","K-IFRS(한국채택국제회계기준)"],["Korean GAAP for non-listed companies","一般企業会計基準（韓国）","일반기업회계기준"],["Consolidated and separate","連結・単体","연결·별도"]],
quiz:[{q:"Which standard do listed Korean companies use?",opts:["K-IFRS","Japanese GAAP","US GAAP","The SME standard"],a:0,exp:"It has been mandatory since 2011."},
{q:"How is goodwill treated under Japanese GAAP?",opts:["Amortised over 20 years or less","Not amortised","Expensed in full in one year","Not recorded as an asset"],a:0,exp:"Under IFRS and K-IFRS it is not amortised but tested for impairment."},
{q:"Where does a Japanese earnings release show its accounting standard?",opts:["In the title on the cover, in brackets","In the company logo","In the share price column","In the dividend column"],a:0,exp:"The brackets in the title give the standard."}]});

set("8-2",{title:"Differences in the Income Statement: Reading Ordinary Profit and Operating Profit",hl:"Reading Ordinary Profit and Operating Profit",subtitle:"Japanese GAAP has ordinary profit and extraordinary items. IFRS and K-IFRS do not. And “operating profit” contains different things under each standard",
lead:["Japanese newspapers report a company’s results by ordinary profit (経常利益); Korean newspapers use operating profit (영업이익). The same company in the same year looks different depending on which profit is quoted.","This lesson lines up the steps of profit under each standard to see what is the same and what is not. Operating profit needs particular care, because the name is shared but the contents are not. In Korea, the very definition of operating profit changes from 2027."],
sections:[
{h:"The steps of profit, side by side",blocks:[{t:"fig",id:"fin_pl_compare",cap:"Steps of profit under Japanese GAAP, IFRS and K-IFRS. Only Japanese GAAP has ordinary profit"},
{t:"table",cols:["Step","Japanese GAAP","IFRS (Japanese companies)","K-IFRS (current)"],rows:[
["Sales","Net sales (売上高)","Revenue (売上収益)","Revenue (매출액)"],
["Profit from the main business","Operating profit","Operating profit (the company decides how to present it)","Operating profit (presentation is required)"],
["Profit including items outside the main business","Ordinary profit","—","—"],
["Before tax","Profit before income taxes (after extraordinary items)","Profit before tax","Profit before tax"],
["Bottom line","Profit attributable to owners of parent","Profit attributable to owners of parent","Profit attributable to owners of parent"]]}]},
{h:"Ordinary profit and extraordinary items (Japanese GAAP)",blocks:[{t:"rows",items:[
{name:"Ordinary profit = operating profit + non-operating income − non-operating expenses",x:"It adds interest and dividends received, interest paid, foreign exchange gains and losses, and equity-method results: the profit from activities that repeat every year (1-4)."},
{name:"Extraordinary gains and losses",x:"One-off items such as gains or losses on selling fixed assets, impairment losses and disaster losses. They come after ordinary profit."},
{name:"Under IFRS and K-IFRS",x:"There is no extraordinary category. At Japanese companies using IFRS, impairment losses and gains or losses on asset sales often sit inside operating profit as “other operating income and expenses”. The same event moves operating profit under one standard and not under another."}]}]},
{h:"“Operating profit” is not one thing",blocks:[{t:"table",cols:["Item","Japanese GAAP operating profit","IFRS (many Japanese companies)","K-IFRS (current)"],rows:[
["Impairment losses","Excluded (extraordinary loss)","Included","Excluded (non-operating)"],
["Gains and losses on selling fixed assets","Excluded (extraordinary or non-operating)","Included","Excluded (non-operating)"],
["Goodwill amortisation","Included (in selling and administrative expenses)","No amortisation","No amortisation"],
["Equity-method results","Excluded (non-operating)","Depends on the company","Depends on the company ★"]]},
{t:"point",x:"In Korea, a new standard (K-IFRS 1118) changes the idea of operating profit for years beginning on or after 1 January 2027. Everything that is not investing, financing and so on falls into operating, so gains and losses on disposing of fixed assets and impairment losses move into operating profit. Operating profit under the present definition will be given in the notes. ★"},
{t:"note",x:"* The underlying IFRS 18 also takes effect in 2027 and defines operating profit in IFRS for the first time. The Japanese GAAP steps of operating and ordinary profit do not change. ★"}]},
{h:"How to restate, and practice",blocks:[{t:"fig",id:"fin_op_bridge",cap:"An example of putting a Japanese GAAP company and an IFRS company on the same footing."},{t:"ladder",steps:[
{name:"Decide which profit to compare",sub:"Operating profit for the main business; profit before tax to include borrowing and currency"},
{name:"Check what is inside operating profit",sub:"Notes and results presentations show how impairment and disposals are treated"},
{name:"Take out one-off items",sub:"Build your own profit excluding impairment, disposals and disasters"},
{name:"Line up EBITDA as well",sub:"It evens out goodwill amortisation and lease differences (6-1, 7-1)"}]},
{t:"check",items:[
{name:"JAL and ANA",x:"JAL (IFRS) reports EBIT; ANA (Japanese GAAP) reports operating profit and ordinary profit (5-6). Write three things you must align before comparing the two companies’ profit from the main business."},
{name:"Read a Korean article",x:"Using impairment losses as the example, explain whether operating profit (영업이익) in a Korean results article covers the same ground as operating profit under Japanese GAAP."}]}]}],
voice:"A Japanese head office asks for ordinary profit; a Korean head office asks for operating profit. Work for both and you will meet this difference. Asking “which profit do you mean?” before you send a number is the quickest route.",
terms:[["Ordinary profit","経常利益","경상이익"],["Extraordinary items","特別損益","특별손익"],["Non-operating income and expenses","営業外収益・費用","영업외수익·비용"],["Profit before tax","税引前利益","법인세비용차감전순이익"],["IFRS 18 (K-IFRS 1118)","IFRS第18号（K-IFRS第1118号）","IFRS 제18호(K-IFRS 제1118호)"]],
quiz:[{q:"Which step of profit exists under Japanese GAAP but not under IFRS or K-IFRS?",opts:["Ordinary profit","Operating profit","Gross profit","Net profit"],a:0,exp:"It is operating profit plus non-operating income and expenses."},
{q:"Under Japanese GAAP, where does an impairment loss on fixed assets go?",opts:["Extraordinary loss (outside operating profit)","Cost of sales","Selling and administrative expenses","Non-operating income"],a:0,exp:"At Japanese companies using IFRS it often sits inside operating profit."},
{q:"When does the new Korean standard that changes operating profit take effect?",opts:["Years beginning on or after 1 January 2027","2011","2019","Not yet decided"],a:0,exp:"It is K-IFRS 1118. Operating profit under the present definition goes into the notes."}]});

set("8-3",{title:"Differences in the Balance Sheet: Leases and Goodwill Change the Assets",hl:"Leases and Goodwill Change the Assets",subtitle:"The same leased aircraft appears in assets and liabilities under one standard and not under another. Check this before comparing equity ratios or debt-to-equity",
lead:["After the income statement comes the balance sheet. The biggest differences between standards are leases and goodwill. Airlines lease many aircraft, so the treatment of leases changes the size of assets and liabilities completely.","Japanese GAAP is in the middle of changing. For years beginning on or after April 2027, all leases come onto the balance sheet under Japanese GAAP too. Until then, take particular care when comparing companies on different standards."],
sections:[
{h:"Leases: on the balance sheet or off it",blocks:[{t:"fig",id:"fin_lease_timeline",cap:"When leases came onto the balance sheet. Japanese GAAP follows for years beginning on or after April 2027"},
{t:"rows",items:[
{name:"IFRS and K-IFRS (since 2019)",x:"A leased aircraft is a right-of-use asset and the promise to pay is a lease liability. In principle all leases are on the balance sheet (2-3, 5-2)."},
{name:"Japanese GAAP (now)",x:"Finance leases are on the balance sheet. Operating leases are not; the future lease payments are given in a note."},
{name:"Japanese GAAP (new standard)",x:"ASBJ Statement No. 34 (issued September 2024) puts all leases on the balance sheet. It applies to years beginning on or after 1 April 2027, with early adoption allowed from April 2025. For a March year-end company, that means the year ending March 2028. ★"}]},
{t:"point",x:"Put a Japanese GAAP airline beside an IFRS or K-IFRS airline and the second shows larger assets and liabilities and a lower equity ratio. To compare, add the future operating lease payments in the Japanese GAAP company’s notes to its liabilities."}]},
{h:"Goodwill: amortise or not",blocks:[{t:"fig",id:"fin_goodwill",cap:"How the same goodwill of 100 changes over ten years under each standard. Red marks the impairment year."},{t:"table",cols:["","Japanese GAAP","IFRS and K-IFRS"],rows:[
["Treatment","Amortised over 20 years or less; an expense every year","Not amortised; impaired when the value falls"],
["Effect on profit","Lowers operating profit a little every year","Nothing in normal years; a large loss at once when impaired"],
["Balance sheet","Goodwill shrinks each year","Goodwill stays"]]},
{t:"rows",items:[
{name:"Comparing acquisitive companies",x:"A Japanese GAAP company shows a smaller operating profit by the amount of goodwill amortisation. Compare on profit before goodwill amortisation, or on EBITDA, to even this out."}]}]},
{h:"Differences in presentation",blocks:[{t:"table",cols:["Item","Japanese GAAP","IFRS and K-IFRS"],rows:[
["Name of the statement","Balance sheet (貸借対照表)","Statement of financial position (재무상태표)"],
["Order","Usually current first, then non-current","The company chooses; some start with non-current items"],
["Equity section","Shareholders’ equity, accumulated other comprehensive income, non-controlling interests","Equity: share capital, surplus, other components of equity, non-controlling interests"],
["Interest and dividends (cash flow statement)","Many companies show interest and dividends received and interest paid under operating activities","The company chooses; some show interest paid under financing activities ★"]]}]},
{h:"Effect on ratios, and practice",blocks:[{t:"table",cols:["Ratio","When leases are on the balance sheet","When goodwill is not amortised"],rows:[
["Equity ratio","Falls (total assets grow)","Tends to look higher (goodwill stays in assets)"],
["Debt-to-equity","Rises (lease liabilities count as debt)","No change"],
["EBITDA","Rises (rent becomes depreciation and interest)","No change"],
["Operating cash flow","Rises (repayments move to financing activities)","No change"]]},
{t:"check",items:[
{name:"Read ANA’s notes",x:"In ANA’s annual securities report (Japanese GAAP), find the note on future operating lease payments. Think about how the equity ratio changes if you add them to liabilities. ★"},
{name:"Predict the year to March 2028",x:"When the new lease standard starts, which way will EBITDA and interest-bearing debt move at a Japanese GAAP airline? Write the reason."}]}]}],
voice:"A company that pays lease rent but shows little debt may simply be on a different standard. The offices and vehicles your branch rents will also come onto the balance sheet under the new standard. Keep a list of the contracts and you can answer head office at once.",
terms:[["Right-of-use asset","使用権資産","사용권자산"],["Lease liability","リース負債","리스부채"],["Operating lease","オペレーティング・リース","운용리스"],["Goodwill","のれん","영업권"],["Statement of financial position","財政状態計算書","재무상태표"]],
quiz:[{q:"From when does Japan’s new lease standard apply, in principle?",opts:["Years beginning on or after 1 April 2027","From 2019","From 2011","Not yet decided"],a:0,exp:"ASBJ Statement No. 34. Early adoption is allowed from April 2025."},
{q:"How is goodwill treated under IFRS and K-IFRS?",opts:["Not amortised; tested for impairment","Amortised over 20 years","Amortised over 5 years","Not recorded as an asset"],a:0,exp:"Japanese GAAP amortises it over 20 years or less."},
{q:"When leases come onto the balance sheet, what happens to the equity ratio?",opts:["It falls","It rises","It does not change","It cannot be calculated"],a:0,exp:"Assets and liabilities grow together, so total assets are larger."}]});

set("8-4",{title:"Finding Japanese Financial Reports: Earnings Releases, Securities Reports and Public Notices",hl:"Earnings Releases, Securities Reports and Public Notices",subtitle:"The earnings release is fast; the annual securities report is detailed. For unlisted companies, very few numbers are public",
lead:["Once the standards are clear, the next step is getting the documents. After its year-end, a listed Japanese company publishes a quick earnings release (決算短信) and then a detailed annual securities report (有価証券報告書). Both are free for anyone to read.","Unlisted companies are a different matter. Very few numbers are visible from outside, so when you consider an investment or a deal you will be asking the company for its documents directly (7-3)."],
sections:[
{h:"A listed company’s year",blocks:[{t:"fig",id:"fin_jp_disclosure",cap:"The financial reports a listed company with a March year-end publishes during the year"},
{t:"table",cols:["Document","When","Where","Contents"],rows:[
["Earnings release (full year)","Within about 45 days of the year-end","The company’s investor relations page; TDnet (timely disclosure service)","Fast: summary of results, financial statements, forecast for the next year"],
["Annual securities report","Within three months of the year-end","EDINET (Financial Services Agency); the company’s investor relations page","Detailed: business, risks, notes, facilities, shareholders"],
["Quarterly earnings release (Q1 and Q3)","Within about 45 days of each quarter-end","TDnet; the company’s investor relations page","Quarterly results and financial statements"],
["Half-year report","After the first half ★","EDINET","Half-year financial statements and state of the business"]]},
{t:"note",x:"* For quarters beginning on or after 1 April 2024, the statutory quarterly report was abolished and Q1 and Q3 reporting was unified into the stock exchange’s quarterly earnings release. A half-year report is filed for the second quarter. ★"}]},
{h:"Choose the document by what you want to know",blocks:[{t:"fig",id:"fin_doc_pick",cap:"What you want to know, and the document to open. Orange is the earnings release, blue the annual securities report, green EDINET."},{t:"rows",items:[
{name:"This year’s figures and next year’s forecast",x:"The first page of the earnings release. Carrying the company’s own forecast is a feature of the Japanese earnings release."},
{name:"Segments, routes, fleet",x:"The business and facilities sections of the annual securities report, and the results presentation."},
{name:"Leases, debt repayment schedule, pensions",x:"The notes in the annual securities report."},
{name:"Major shareholders, directors, employees, average pay",x:"The section on the reporting company in the annual securities report."},
{name:"Past documents in one place",x:"Search EDINET by company name or securities code. Searching and reading are free."}]}]},
{h:"Unlisted companies",blocks:[{t:"table",cols:["Source","What it tells you","Limits"],rows:[
["Public notice of accounts (official gazette, newspaper, web)","A summary balance sheet; large companies also a summary income statement","Required by the Companies Act, but many companies do not publish it"],
["Credit research reports","Sales and profit trends, customers, a credit score","Paid; some figures come from interviews"],
["Accounts and tax returns from the company","Down to the breakdown of each account","Only if the company provides them; often unaudited (7-3)"],
["Certificate of registered matters","Directors, capital, head office, date of incorporation","No financial figures"]]},
{t:"point",x:"Unlisted Japanese companies show very few numbers to the outside. In Korea the audit reports of unlisted companies above a certain size are public (8-5), so anyone who starts with the Korean habit will be surprised."},
{t:"note",x:"* A large company is a stock company with capital of 500 million yen or more, or liabilities of 20 billion yen or more (Companies Act). ★"}]},
{h:"Where to look first, and practice",blocks:[{t:"ladder",steps:[
{name:"The company’s investor relations page",sub:"Earnings releases, presentations and links to the securities report"},
{name:"TDnet",sub:"The latest timely disclosures; about one month is shown ★"},
{name:"EDINET",sub:"Annual securities reports and half-year reports, including past years"},
{name:"If unlisted",sub:"Public notice → credit research → ask the company"}]},
{t:"check",items:[
{name:"Open ANA’s annual securities report",x:"Search EDINET for ANA Holdings and find the book value and number of aircraft in the latest annual securities report."},
{name:"Look up an unlisted company",x:"Choose one unlisted business partner and check its website and the official gazette for a public notice of accounts."}]}]}],
voice:"An earnings release usually comes out in the afternoon of the announcement day, and the numbers are gathered on page one. On results day, read sales, operating profit and the forecast on page one, and check the details once the securities report is out. That order is enough.",
terms:[["Earnings release (kessan tanshin)","決算短信","결산단신"],["Annual securities report","有価証券報告書","유가증권보고서"],["EDINET","EDINET","EDINET"],["Timely disclosure (TDnet)","適時開示（TDnet）","적시공시(TDnet)"],["Public notice of accounts","決算公告","결산공고"]],
quiz:[{q:"Which document comes out first after a listed Japanese company’s year-end?",opts:["The earnings release","The annual securities report","The public notice of accounts","The certificate of registered matters"],a:0,exp:"It is a quick report. The details follow in the annual securities report."},
{q:"Where can you search and read annual securities reports for free?",opts:["EDINET","The registry office","The tax office","The Bank of Japan"],a:0,exp:"It is the Financial Services Agency’s electronic disclosure system."},
{q:"What happened to Q1 and Q3 reporting from April 2024?",opts:["It was unified into the quarterly earnings release","Only the quarterly report remained","Reporting stopped","It became annual"],a:0,exp:"The statutory quarterly report was abolished."}]});

set("8-5",{title:"Finding Korean Financial Reports: DART, Annual Reports and Audit Reports",hl:"DART, Annual Reports and Audit Reports",subtitle:"Korean disclosure is gathered almost entirely on DART, the electronic disclosure system. Even an unlisted company’s audit report is public once it passes a certain size",
lead:["The way into a Korean company is DART, the electronic disclosure system run by the Financial Supervisory Service. A listed company’s annual business report, quarterly reports and audit report can all be read on one site, free.","The biggest difference from Japan is unlisted companies. In Korea, a company above a certain size must have a statutory external audit, and its audit report is published on DART."],
sections:[
{h:"A listed company’s year",blocks:[{t:"fig",id:"fin_kr_disclosure",cap:"The periodic reports a listed company with a December year-end files during the year"},
{t:"table",cols:["Document","When","Contents"],rows:[
["Annual business report (사업보고서)","Within 90 days of the year-end","The equivalent of Japan’s annual securities report: business, financial statements and notes, directors, shareholders"],
["Quarterly report (분기보고서)","Within 45 days of the end of Q1 and Q3","Quarterly financial statements and state of the business"],
["Half-year report (반기보고서)","Within 45 days of the end of the first half","Half-year financial statements and state of the business"],
["Audit report (감사보고서)","Before the annual general meeting","The auditor’s opinion with the financial statements and notes"],
["Material event reports and ad hoc disclosure","As they occur","Share issues, mergers, large contracts, preliminary results (영업(잠정)실적) and so on"]]},
{t:"note",x:"* For a December year-end company the deadlines fall at the end of March for the annual report, mid-May for Q1, mid-August for the half-year and mid-November for Q3. ★"}]},
{h:"How to use DART",blocks:[{t:"ladder",steps:[
{name:"Open dart.fss.or.kr",sub:"The Financial Supervisory Service’s system: free, no registration"},
{name:"Search by company name",sub:"The Korean name or the six-digit stock code"},
{name:"Choose the report",sub:"Under 정기공시: 사업보고서, 분기보고서, 반기보고서"},
{name:"Open from the contents",sub:"Financial statements and notes are under 재무에 관한 사항"},
{name:"Take the numbers out",sub:"Financial statements can also be downloaded as files ★"}]},
{t:"rows",items:[
{name:"English version",x:"englishdart.fss.or.kr has English pages, and some companies file English disclosures. ★"},
{name:"Exchange disclosure",x:"The Korea Exchange’s KIND site also gathers listed companies’ disclosures."}]}]},
{h:"Unlisted companies are visible too",blocks:[{t:"fig",id:"fin_kr_audit",cap:"Check from the top. One “yes” is enough for the audit report to be on DART."},{t:"table",cols:["Stock companies subject to statutory audit","Threshold"],rows:[
["Large companies","Total assets or sales of 50 billion won or more in the previous year"],
["Companies meeting two or more of four tests","Total assets of 12 billion won or more, total liabilities of 7 billion won or more, sales of 10 billion won or more, 100 or more employees"],
["Listed companies and companies preparing to list","Covered regardless of size"]]},
{t:"rows",items:[
{name:"What you can see",x:"A company subject to statutory audit has its audit report, with financial statements and notes, published on DART. Far more numbers are visible than for an unlisted Japanese company."},
{name:"What you cannot see",x:"Small companies below the thresholds. Limited companies have slightly different tests. Thresholds are amended from time to time, so check the law at the time you look. ★"}]}]},
{h:"Compared with Japan, and practice",blocks:[{t:"table",cols:["","Japan","Korea"],rows:[
["Annual report","Annual securities report (within three months)","Annual business report (within 90 days)"],
["Quick report","Earnings release (with the company’s forecast)","Preliminary results disclosure; a forecast is not required"],
["Quarterly","Quarterly earnings release (Q1, Q3) and half-year report","Quarterly and half-year reports (within 45 days)"],
["Where","EDINET (statutory) and TDnet (exchange)","DART (statutory) and KIND (exchange)"],
["Unlisted companies","Little beyond the public notice of accounts","The audit report is public if the company is subject to statutory audit"]]},
{t:"check",items:[
{name:"Open Korean Air",x:"Search DART for 대한항공 and find revenue (매출액) and operating profit (영업이익) in the consolidated statements (연결재무제표) of the latest annual business report."},
{name:"Look for an unlisted company",x:"Choose one unlisted Korean business partner or competitor and check whether DART carries its audit report."}]}]}],
voice:"When you look into an unlisted Korean company, search DART for its name first. If an audit report is there, you will know its sales, profit, borrowing and main transactions before you ask the company anything. The preparation time is nothing like that for a Japanese company.",
terms:[["DART (electronic disclosure system)","DART（電子公示システム）","DART(전자공시시스템)"],["Annual business report","事業報告書","사업보고서"],["Quarterly and half-year reports","分期報告書・半期報告書","분기보고서·반기보고서"],["Audit report","監査報告書","감사보고서"],["Subject to statutory external audit","外部監査の対象","외부감사 대상"]],
quiz:[{q:"Which site gathers Korea’s statutory disclosure documents?",opts:["DART","EDINET","TDnet","The official gazette"],a:0,exp:"It is the Financial Supervisory Service’s electronic disclosure system."},
{q:"What is the deadline for a Korean annual business report?",opts:["Within 90 days of the year-end","Within 45 days","Within six months","Within one year"],a:0,exp:"Quarterly and half-year reports are due within 45 days."},
{q:"Which is one condition that makes an unlisted Korean stock company subject to statutory audit?",opts:["Total assets or sales of 50 billion won or more in the previous year","Capital of 100 million won or more","Three years or more since incorporation","Having a foreign shareholder"],a:0,exp:"A company is also covered if it meets two or more of: assets of 12 billion won, liabilities of 7 billion won, sales of 10 billion won, 100 employees."}]});

set("8-6",{title:"Reading Japanese and Korean Companies Side by Side: Matching Terms and Four Things to Align",hl:"Matching Terms and Four Things to Align",subtitle:"Standard, year-end, currency, and leases and goodwill. Align these four and a Japanese and a Korean company fit on one table",
lead:["This is the last lesson of the course. Using the differences in standards (8-1 to 8-3) and the ways of finding documents (8-4, 8-5), we put a Japanese and a Korean company on one table.","There are only four things to align first. After that, match the terms correctly and the ratios of Part 6 and the multiples of Part 7 work across the border."],
sections:[
{h:"Four things to align",blocks:[{t:"fig",id:"fin_align",cap:"Four things to align before comparing"},
{t:"rows",items:[
{name:"1. Accounting standard",x:"Japanese GAAP, IFRS or K-IFRS. Check what is inside operating profit and how leases and goodwill are treated (8-2, 8-3)."},
{name:"2. Year-end",x:"March and December year-ends are three months apart. For airlines, where the seasons matter, quarterly figures are sometimes added up again to cover the same twelve months."},
{name:"3. Currency and units",x:"Yen comes in millions and hundreds of millions; won in millions, hundreds of millions and trillions. As a rule, translate the income statement at the average rate for the period and the balance sheet at the closing rate."},
{name:"4. Leases and goodwill",x:"Even them out with EBITDA, EBITDAR and interest-bearing debt including lease liabilities (6-1, 7-1)."}]}]},
{h:"A table of matching terms",blocks:[{t:"table",cols:["Japanese","Korean","English","Note"],rows:[
["売上高・売上収益","매출액","Revenue","Japanese companies on IFRS use 売上収益"],
["売上総利益","매출총이익","Gross profit",""],
["販売費及び一般管理費","판매비와관리비","Selling and administrative expenses",""],
["営業利益","영업이익","Operating profit","Contents differ by standard"],
["経常利益","(no matching step)","Ordinary profit","Japanese GAAP only"],
["当期純利益","당기순이익","Net profit","Check whether it is the parent’s share or the total"],
["貸借対照表","재무상태표","Balance sheet","Statement of financial position under IFRS"],
["純資産","자본","Equity","Japan says “net assets”; Korea says “capital”"],
["有利子負債","차입금","Interest-bearing debt","Check whether lease liabilities are included"],
["自己資本比率","자기자본비율","Equity ratio","Korea often uses the debt ratio (부채비율)"],
["減価償却費","감가상각비","Depreciation",""],
["前受金・契約負債","선수금·계약부채","Unearned revenue",""]]}]},
{h:"Put the assumptions on one page",blocks:[{t:"fig",id:"fin_period",cap:"Orange is Korea’s December year-end, blue Japan’s March year-end. The yellow months are the nine that overlap."},{t:"table",cols:["","JAL","ANA","Korean Air"],rows:[
["Accounting standard","IFRS","Japanese GAAP","K-IFRS"],["Year-end","March","March","December"],["Currency","Yen","Yen","Won"],["Name of the main profit","EBIT","Operating profit","Operating profit (영업이익)"],["Leases (lessee)","On the balance sheet","Operating leases in the notes (on the balance sheet from the year to March 2028)","On the balance sheet"],["Annual report","Annual securities report","Annual securities report","Annual business report"]]},
{t:"point",x:"The trick is to put assumptions, not numbers, at the top of the table. The reader then knows which figures can be compared as they are and which need care, before looking at a single number."},
{t:"note",x:"* Each company’s standard and presentation are as shown in published documents available in October 2026. They can change, so check the latest earnings release or annual report when you use them. ★"}]},
{h:"The course in summary, and practice",blocks:[{t:"rows",items:[
{name:"From three statements to comparison",x:"Parts 0 to 4 read the three statements, Part 5 covered airline items, Part 6 turned them into ratios, Part 7 put a price on a company, and Part 8 aligned the differences between countries and standards."},
{name:"From here",x:"Keep reading the earnings release and annual report of one company you care about, every period. After three periods, the company’s decisions start to show in the movement of the numbers."}]},
{t:"check",items:[
{name:"Make a one-page table",x:"Choose one Japanese and one Korean company and make a table with four rows for standard, year-end, currency and leases, and four rows for sales, operating profit, EBITDA and net debt."},
{name:"Translate the terms",x:"Choose one results article in Japanese or Korean and convert its accounting terms with the table above. Add three terms that are not in the table."}]},
{t:"link",href:"財務比率の計算練習.html",x:"[Practice page] Financial Ratio Practice: enter the aligned figures and compare the two companies’ ratios"}]}],
voice:"Not many people can read both Japanese and Korean accounts. If you can read the words and explain three differences between the standards, both head offices will rely on you. Numbers are the most dependable language between the two countries.",
terms:[["Fiscal year-end","決算期","결산기"],["Average rate for the period","期中平均レート","기중 평균환율"],["Closing rate","期末レート","기말환율"],["Debt ratio (liabilities to equity)","負債比率（韓国）","부채비율"],["Comparability","比較可能性","비교가능성"]],
quiz:[{q:"Which is NOT something to align before comparing a Japanese and a Korean company?",opts:["The colour of the company logo","Accounting standard","Year-end","Currency and units"],a:0,exp:"The four are standard, year-end, currency and units, and leases and goodwill."},
{q:"Which Korean word matches the Japanese 純資産 (net assets)?",opts:["자본","부채","자산","매출"],a:0,exp:"부채 is liabilities, 자산 is assets and 매출 is sales."},
{q:"Which rate is the basis for translating income statement figures into another currency?",opts:["The average rate for the period","The closing rate","The opening rate","The rate ten years ago"],a:0,exp:"Balance sheet figures are translated at the closing rate as a rule."}]});
})(ARTS);
