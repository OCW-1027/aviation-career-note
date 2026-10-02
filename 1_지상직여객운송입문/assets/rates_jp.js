/* 日本の給与にかかる社会保険・労働保険の料率（東京・協会けんぽ）。2026.10
   ここの数字を直すと、レッスンの「料率の表」（rates ブロック）と「計算例」（paycalc ブロック）がすべて変わる。
   v：全体の料率（%）。sp:'half' は本人と会社が半分ずつ。e・c は本人・会社の料率（%）。base：std＝健康保険の標準報酬月額、stdp＝厚生年金の標準報酬月額、pay＝その月の給与の総額
   from：いまの料率が始まった月。next：次に確かめる月（この月を過ぎたら公式の資料で確かめ直し、checked の日付を直す）
   確かめた資料：協会けんぽ「令和8年度保険料率」、厚生労働省「令和8年度の雇用保険料率」「労災保険率表」、日本年金機構 */
window.RATES={checked:'2026-10-03',
 area:['東京（協会けんぽ東京支部）、2026年度','도쿄(협회 겐포 도쿄 지부), 2026년도','Tokyo (Japan Health Insurance Association, Tokyo branch), FY2026'],
 it:{
  kenpo:{n:['健康保険（東京）','건강보험(도쿄)','Health insurance (Tokyo)'],v:9.85,sp:'half',base:'std',from:'2026-03',next:'2027-03'},
  kaigo:{n:['介護保険（40〜64歳）','개호보험(40~64세)','Long-term care insurance (ages 40–64)'],v:1.62,sp:'half',base:'std',from:'2026-03',next:'2027-03'},
  shien:{n:['子ども・子育て支援金','어린이·육아 지원금','Child and childcare support levy'],v:0.23,sp:'half',base:'std',from:'2026-04',next:'2027-04'},
  kosei:{n:['厚生年金','후생연금','Employees’ pension'],v:18.3,sp:'half',base:'stdp',from:'2017-09',next:'2027-09'},
  koyo:{n:['雇用保険（一般の事業）','고용보험(일반 사업)','Employment insurance (general businesses)'],v:1.35,e:0.5,c:0.85,base:'pay',from:'2026-04',next:'2027-04'},
  rosai:{n:['労災保険（その他の各種事業）','노재보험(기타 각종 사업)','Workers’ accident insurance (other businesses)'],v:0.3,e:0,c:0.3,base:'pay',from:'2024-04',next:'2027-04'},
  kyoshutsu:{n:['子ども・子育て拠出金','아동·육아 거출금','Child and childcare contribution'],v:0.36,e:0,c:0.36,base:'stdp',from:'2020-04',next:'2027-04'}
 }};
