/* ACN 会話練習 追加データ talk_data_g08.js（GPT 2次修正本 talk_data_g08r.js を Claude が検収・修正：会話の流れ、ほかの言い方、確認問題 2026.10.10）。架空の練習用会話。日時・料金は例 */
window.TALK=window.TALK||[];window.TALK.push(
{
 "id": "life-school-absence-1",
 "cat": "life",
 "lv": 2,
 "title": {
  "ja": "学校への欠席連絡",
  "ko": "학교 결석 연락",
  "en": "Reporting a school absence"
 },
 "scene": {
  "ja": "保護者が学校に子どもの欠席を連絡する。",
  "ko": "보호자가 학교에 아이 결석을 알린다.",
  "en": "A parent informs a school of an absence."
 },
 "roles": {
  "A": {
   "ja": "学校事務員",
   "ko": "학교 직원",
   "en": "School administrator"
  },
  "B": {
   "ja": "保護者",
   "ko": "보호자",
   "en": "Parent"
  }
 },
 "ai": {
  "goal": {
   "ja": "欠席予定と連絡方法を確認する。",
   "ko": "결석 예정과 연락 방법을 확인한다.",
   "en": "Confirm the absence and the communication process."
  },
  "twist": {
   "ja": "保護者が翌日の行事への参加も確認する。",
   "ko": "보호자가 다음 날 행사 참가 가능 여부도 묻는다.",
   "en": "The parent asks about an event tomorrow."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "学校事務室です。",
   "jr": "がっこうじむしつです。",
   "ko": "학교 행정실입니다.",
   "en": "School office speaking."
  },
  {
   "r": "B",
   "ja": "子どもの欠席を連絡したいです。",
   "jr": "こどもの けっせきを れんらくしたいです。",
   "ko": "아이 결석을 알리고 싶습니다.",
   "en": "I would like to report my child's absence."
  },
  {
   "r": "A",
   "ja": "お子様のお名前と学年を教えてください。",
   "jr": "おこさまの おなまえと がくねんを おしえてください。",
   "ko": "아이 이름과 학년을 알려 주세요.",
   "en": "Please provide the child's name and grade.",
   "alt": [
    {
     "ja": "お子さんのお名前と、何年生か教えてください。",
     "jr": "おこさんの おなまえと、なんねんせいか おしえて ください。",
     "ko": "자녀분 이름과 몇 학년인지 알려 주세요.",
     "en": "Could you tell me your child’s name and year?"
    }
   ]
  },
  {
   "r": "B",
   "ja": "三年生のイです。",
   "jr": "さんねんせいの イです。",
   "ko": "3학년 이입니다.",
   "en": "Lee, in third grade."
  },
  {
   "r": "A",
   "ja": "イさんですね。本日の欠席を担任の先生に伝えます。",
   "jr": "イさんですね。ほんじつの けっせきを たんにんの せんせいに つたえます。",
   "ko": "이 학생이군요. 오늘 결석을 담임 선생님께 전달하겠습니다.",
   "en": "Thank you. I will inform the homeroom teacher of today’s absence."
  },
  {
   "r": "B",
   "ja": "明日も休む場合は連絡が必要ですか。",
   "jr": "あしたも やすむ ばあいは れんらくが ひつようですか。",
   "ko": "내일도 쉬면 연락해야 하나요?",
   "en": "Should I contact you again if my child is absent tomorrow?"
  },
  {
   "r": "A",
   "ja": "はい。明日もお休みなら、朝八時半までに連絡アプリからお願いします。",
   "jr": "はい。あしたも おやすみなら、あさ はちじはんまでに れんらくアプリから おねがいします。",
   "ko": "네. 내일도 결석하면 오전 8시 30분까지 연락 앱으로 알려 주세요.",
   "en": "Yes. If your child is absent tomorrow, please use the school app by 8:30 a.m.",
   "alt": [
    {
     "ja": "明日もお休みでしたら、朝八時半までに連絡アプリで送ってください。",
     "jr": "あしたも おやすみ でしたら、あさ はちじはん までに れんらく アプリで おくって ください。",
     "ko": "내일도 쉬면 아침 8시 30분까지 연락 앱으로 보내 주세요.",
     "en": "If your child will be absent tomorrow too, please send a message through the school app by 8:30 a.m."
    }
   ]
  },
  {
   "r": "B",
   "ja": "明日の行事に参加できるか心配です。",
   "jr": "あしたの ぎょうじに さんかできるか しんぱいです。",
   "ko": "내일 행사에 참여할 수 있을지 걱정됩니다.",
   "en": "I am concerned about tomorrow's school event."
  },
  {
   "r": "A",
   "ja": "参加条件について先生に確認します。",
   "jr": "さんかじょうけんについて せんせいに かくにんします。",
   "ko": "참가 조건을 선생님께 확인하겠습니다.",
   "en": "I will ask the teacher about participation requirements."
  },
  {
   "r": "B",
   "ja": "配布物はどう受け取れますか。",
   "jr": "はいふぶつは どう うけとれますか。",
   "ko": "가정통신문은 어떻게 받나요?",
   "en": "How can we collect any handouts?"
  },
  {
   "r": "A",
   "ja": "配布物は後日お渡しできます。急ぎの資料はアプリに掲載します。",
   "jr": "はいふぶつは ごじつ おわたしできます。いそぎの しりょうは アプリに けいさいします。",
   "ko": "배포물은 나중에 받을 수 있고, 급한 자료는 앱에 올립니다.",
   "en": "Handouts can be collected later; urgent notices are posted in the app.",
   "alt": [
    {
     "ja": "配布物は、後日お子さんに渡します。急ぎのものはアプリにも載せます。",
     "jr": "はいふぶつは、ごじつ おこさんに わたします。いそぎの ものは アプリにも のせます。",
     "ko": "배부물은 나중에 자녀분께 전달하고, 급한 것은 앱에도 올리겠습니다.",
     "en": "We’ll give the handouts to your child later, and post anything urgent on the app."
    }
   ]
  },
  {
   "r": "B",
   "ja": "先生に伝言をお願いできますか。",
   "jr": "せんせいに でんごんを おねがいできますか。",
   "ko": "선생님께 전달 부탁드려도 될까요?",
   "en": "Could you pass a message to the teacher?"
  },
  {
   "r": "A",
   "ja": "もちろんです。先生にはどのようにお伝えしましょうか。",
   "jr": "もちろんです。せんせいには どのように おつたえしましょうか。",
   "ko": "물론입니다. 선생님께 어떤 말씀을 전할까요?",
   "en": "Of course. What would you like me to tell the teacher?"
  },
  {
   "r": "B",
   "ja": "明日の朝、様子を見てまた連絡すると伝えてください。",
   "jr": "あしたの あさ、ようすを みて また れんらく すると つたえて ください。",
   "ko": "내일 아침에 상태를 보고 다시 연락드린다고 전해 주세요.",
   "en": "Please tell them I’ll check how my child is tomorrow morning and get in touch again."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「子どもの欠席を連絡したいです。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “아이 결석을 알리고 싶습니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “I would like to report my child's absence.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "発注番号、不足数、次の連絡予定をメールにまとめて送ります。",
     "ko": "발주번호·부족 수량·다음 연락 예정 시간을 이메일로 정리해 보내겠습니다.",
     "en": "I will email the order number, missing quantities and next update time."
    },
    {
     "ja": "早朝の返却は可能です。営業所の裏に返却専用の駐車枠があります。",
     "ko": "이른 아침 반납이 가능합니다. 영업소 뒤편에 반납 전용 주차구역이 있습니다.",
     "en": "Early returns are possible. There is a designated return bay behind our office."
    },
    {
     "ja": "お子様のお名前と学年を教えてください。",
     "ko": "아이 이름과 학년을 알려 주세요.",
     "en": "Please provide the child's name and grade."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「明日の行事に参加できるか心配です。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “내일 행사에 참여할 수 있을지 걱정됩니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “I am concerned about tomorrow's school event.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "参加条件について先生に確認します。",
     "ko": "참가 조건을 선생님께 확인하겠습니다.",
     "en": "I will ask the teacher about participation requirements."
    },
    {
     "ja": "承認は誰にお願いすればいいですか。",
     "ko": "승인은 누구에게 받아야 하나요?",
     "en": "Who needs to approve the claim?"
    },
    {
     "ja": "いらっしゃいませ。ご注文はお決まりですか。",
     "ko": "어서 오세요. 주문 정하셨나요?",
     "en": "Welcome. Are you ready to order?"
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「先生に伝言をお願いできますか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “선생님께 전달 부탁드려도 될까요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Could you pass a message to the teacher?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "海外の参加者には、現地時刻を併記して候補を送りましょう。",
     "ko": "해외 참가자에게는 현지 시각을 함께 적어 후보 일정을 보내죠.",
     "en": "Let us include the local time for the overseas participant."
    },
    {
     "ja": "もちろんです。先生にはどのようにお伝えしましょうか。",
     "ko": "물론입니다. 선생님께 어떤 말씀을 전할까요?",
     "en": "Of course. What would you like me to tell the teacher?"
    },
    {
     "ja": "レストランは十時で閉まりますが、ロビーに軽食の自動販売機があります。",
     "ko": "식당은 10시에 닫지만 로비에 간식 자판기가 있습니다.",
     "en": "The restaurant closes at ten, but there is a snack machine in the lobby."
    }
   ],
   "a": 1
  }
 ]
},
{
 "id": "life-utility-bill-1",
 "cat": "life",
 "lv": 2,
 "title": {
  "ja": "公共料金の請求確認",
  "ko": "공공요금 청구서 확인",
  "en": "Querying a utility bill"
 },
 "scene": {
  "ja": "住人が水道料金の請求内容を確認する。",
  "ko": "거주자가 수도요금 청구 내역을 확인한다.",
  "en": "A resident asks about a water bill."
 },
 "roles": {
  "A": {
   "ja": "窓口担当者",
   "ko": "창구 담당자",
   "en": "Billing agent"
  },
  "B": {
   "ja": "契約者",
   "ko": "계약자",
   "en": "Account holder"
  }
 },
 "ai": {
  "goal": {
   "ja": "請求期間と検針記録の確認手順を説明する。",
   "ko": "청구 기간과 검침 기록 확인 절차를 설명한다.",
   "en": "Explain how to review billing periods and meter readings."
  },
  "twist": {
   "ja": "契約者が最近引っ越したと伝える。",
   "ko": "계약자가 최근 이사했다고 밝힌다.",
   "en": "The customer recently moved home."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "料金のお問い合わせを承ります。",
   "jr": "りょうきんの おといあわせを うけたまわります。",
   "ko": "요금 문의를 받겠습니다.",
   "en": "How can I help with your bill?"
  },
  {
   "r": "B",
   "ja": "今月の水道料金が高くなっています。",
   "jr": "こんげつの すいどうりょうきんが たかくなっています。",
   "ko": "이번 달 수도요금이 높게 나왔습니다.",
   "en": "This month's water bill is unusually high."
  },
  {
   "r": "A",
   "ja": "今月の請求書は、六月十日から七月九日までの分です。",
   "jr": "こんげつの せいきゅうしょは、ろくがつ とおかから しちがつ ここのかまでの ぶんです。",
   "ko": "이번 청구서는 6월 10일부터 7월 9일까지의 요금입니다.",
   "en": "This bill covers June 10 through July 9.",
   "alt": [
    {
     "ja": "今月の請求は、六月十日から七月九日までの使用分です。",
     "jr": "こんげつの せいきゅうは、ろくがつ とおかから しちがつ ここのか までの しようぶんです。",
     "ko": "이번 달 청구는 6월 10일부터 7월 9일까지 사용분입니다.",
     "en": "This month’s bill covers June 10 to July 9."
    }
   ]
  },
  {
   "r": "B",
   "ja": "前の月と比べて、どのくらい使っていますか。",
   "jr": "まえの つきと くらべて、どのくらい つかって いますか。",
   "ko": "지난달과 비교해서 얼마나 쓴 건가요?",
   "en": "How much did I use compared with last month?"
  },
  {
   "r": "A",
   "ja": "前回のメーターが百二十、今回が百四十五で、二十五立方メートルのご使用です。",
   "jr": "ぜんかいの メーターが ひゃくにじゅう、こんかいが ひゃくよんじゅうごで、にじゅうご りっぽう メートルの ごしようです。",
   "ko": "지난번 계량기가 120, 이번이 145로, 25세제곱미터를 사용하셨습니다.",
   "en": "The meter read 120 last time and 145 this time, so you used 25 cubic meters."
  },
  {
   "r": "B",
   "ja": "実は先月引っ越してきました。",
   "jr": "じつは せんげつ ひっこしてきました。",
   "ko": "사실 지난달에 이사 왔습니다.",
   "en": "I moved in last month."
  },
  {
   "r": "A",
   "ja": "転入された日付と契約開始日を照らし合わせましょう。",
   "jr": "てんにゅうされた ひづけと けいやくかいしびを てらしあわせましょう。",
   "ko": "전입일과 계약 시작일을 대조해 보겠습니다.",
   "en": "Let us compare your move-in date with the contract start date.",
   "alt": [
    {
     "ja": "引っ越された日と、契約が始まった日を確認してみましょう。",
     "jr": "ひっこされた ひと、けいやくが はじまった ひを かくにん して みましょう。",
     "ko": "이사 오신 날과 계약 시작일을 확인해 보죠.",
     "en": "Let’s compare the day you moved in with the contract start date."
    }
   ]
  },
  {
   "r": "B",
   "ja": "前の住人の分が含まれていませんか。",
   "jr": "まえの じゅうにんの ぶんが ふくまれていませんか。",
   "ko": "전 거주자 요금이 포함된 건 아닌가요?",
   "en": "Could charges from the previous tenant be included?"
  },
  {
   "r": "A",
   "ja": "前の方の使用分が含まれていないか、開始時の指針値を調べます。",
   "jr": "まえの かたの しようぶんが ふくまれていないか、かいしじの ししんちを しらべます。",
   "ko": "전 거주자의 사용량이 포함됐는지 계약 시작 시 검침 수치를 확인하겠습니다.",
   "en": "I will check the opening meter reading for any prior tenant’s usage."
  },
  {
   "r": "B",
   "ja": "支払期限は変えられますか。",
   "jr": "しはらいきげんは かえられますか。",
   "ko": "납부 기한을 변경할 수 있나요?",
   "en": "Can the payment deadline be changed?"
  },
  {
   "r": "A",
   "ja": "変更できる条件があるか確認します。",
   "jr": "へんこうできる じょうけんが あるか かくにんします。",
   "ko": "변경 가능한 조건이 있는지 확인하겠습니다.",
   "en": "I will check whether an extension is possible."
  },
  {
   "r": "B",
   "ja": "確認結果はメールで届きますか。",
   "jr": "かくにんけっかは メールで とどきますか。",
   "ko": "확인 결과를 이메일로 받을 수 있나요?",
   "en": "Can you email me the results?"
  },
  {
   "r": "A",
   "ja": "調査結果はご登録のメールにお送りします。",
   "jr": "ちょうさけっかは ごとうろくの メールに おおくりします。",
   "ko": "조사 결과는 등록된 이메일로 보내드리겠습니다.",
   "en": "We will send the findings to your registered email.",
   "alt": [
    {
     "ja": "調べた結果は、登録のメールアドレスにお送りします。",
     "jr": "しらべた けっかは、とうろくの メールアドレスに おおくり します。",
     "ko": "조사 결과는 등록된 이메일 주소로 보내 드리겠습니다.",
     "en": "We’ll email the results to your registered address."
    }
   ]
  },
  {
   "r": "B",
   "ja": "よろしくお願いします。",
   "jr": "よろしく おねがいします。",
   "ko": "잘 부탁드립니다.",
   "en": "Thank you for looking into it."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「今月の水道料金が高くなっています。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “이번 달 수도요금이 높게 나왔습니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “This month's water bill is unusually high.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "今月の請求書は、六月十日から七月九日までの分です。",
     "ko": "이번 청구서는 6월 10일부터 7월 9일까지의 요금입니다.",
     "en": "This bill covers June 10 through July 9."
    },
    {
     "ja": "来週の打ち合わせについて相談があります。",
     "ko": "다음 주 미팅에 관해 상의할 일이 있습니다.",
     "en": "I need to discuss next week's meeting."
    },
    {
     "ja": "少量でも反応することがあります。",
     "ko": "소량에도 반응할 수 있습니다.",
     "en": "Even a small amount can cause a reaction."
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「前の住人の分が含まれていませんか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “전 거주자 요금이 포함된 건 아닌가요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Could charges from the previous tenant be included?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "同じ器具で調理していますか。",
     "ko": "같은 도구로 조리하나요?",
     "en": "Is the same equipment used to prepare other dishes?"
    },
    {
     "ja": "前の方の使用分が含まれていないか、開始時の指針値を調べます。",
     "ko": "전 거주자의 사용량이 포함됐는지 계약 시작 시 검침 수치를 확인하겠습니다.",
     "en": "I will check the opening meter reading for any prior tenant’s usage."
    },
    {
     "ja": "空港からはタクシーで向かいます。",
     "ko": "공항에서 택시로 이동합니다.",
     "en": "I will take a taxi from the airport."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「確認結果はメールで届きますか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “확인 결과를 이메일로 받을 수 있나요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Can you email me the results?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "子どもがいるので食事が心配です。",
     "ko": "아이가 있어서 식사가 걱정됩니다.",
     "en": "I am worried about food for my child."
    },
    {
     "ja": "出発の四十分前にこの案内所へお越しください。係員がお迎えします。",
     "ko": "출발 40분 전에 이 안내소로 와 주세요. 직원이 모시겠습니다.",
     "en": "Please return to this desk forty minutes before departure. An agent will meet you."
    },
    {
     "ja": "調査結果はご登録のメールにお送りします。",
     "ko": "조사 결과는 등록된 이메일로 보내드리겠습니다.",
     "en": "We will send the findings to your registered email."
    }
   ],
   "a": 2
  }
 ]
},
{
 "id": "life-apartment-repair-1",
 "cat": "life",
 "lv": 2,
 "title": {
  "ja": "住宅設備の修理依頼",
  "ko": "주택 설비 수리 요청",
  "en": "Requesting apartment repairs"
 },
 "scene": {
  "ja": "入居者が給湯器の不具合を管理会社に報告する。",
  "ko": "입주자가 온수기 고장을 관리회사에 알린다.",
  "en": "A tenant reports a faulty water heater."
 },
 "roles": {
  "A": {
   "ja": "管理会社担当",
   "ko": "관리회사 직원",
   "en": "Property manager"
  },
  "B": {
   "ja": "入居者",
   "ko": "입주자",
   "en": "Tenant"
  }
 },
 "ai": {
  "goal": {
   "ja": "安全確認と修理手配の手順を案内する。",
   "ko": "안전 확인 및 수리 접수 절차를 안내한다.",
   "en": "Explain safety precautions and the repair process."
  },
  "twist": {
   "ja": "入居者が小さな子どもと暮らしている。",
   "ko": "입주자가 어린아이와 함께 살고 있다.",
   "en": "The tenant has a young child at home."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "管理会社でございます。給湯器の不具合でしょうか。",
   "jr": "かんりがいしゃで ございます。きゅうとうきの ふぐあいでしょうか。",
   "ko": "관리회사입니다. 온수기 문제인가요?",
   "en": "This is the property management office. Is it a water-heater issue?"
  },
  {
   "r": "B",
   "ja": "お湯が急に出なくなりました。",
   "jr": "おゆが きゅうに でなくなりました。",
   "ko": "갑자기 온수가 나오지 않습니다.",
   "en": "The hot water suddenly stopped working."
  },
  {
   "r": "A",
   "ja": "いつから使えなくなりましたか。",
   "jr": "いつから つかえなくなりましたか。",
   "ko": "언제부터 사용이 안 됐나요?",
   "en": "When did the problem start?",
   "alt": [
    {
     "ja": "いつからお湯が出なくなりましたか。",
     "jr": "いつから おゆが でなく なりましたか。",
     "ko": "언제부터 온수가 안 나왔나요?",
     "en": "Since when has there been no hot water?"
    }
   ]
  },
  {
   "r": "B",
   "ja": "今朝からです。",
   "jr": "けさから です。",
   "ko": "오늘 아침부터입니다.",
   "en": "Since this morning."
  },
  {
   "r": "A",
   "ja": "異臭や異音はありませんか。",
   "jr": "いしゅうや いおんは ありませんか。",
   "ko": "이상한 냄새나 소리는 없나요?",
   "en": "Have you noticed any unusual smells or noises?"
  },
  {
   "r": "B",
   "ja": "今のところありません。",
   "jr": "いまの ところ ありません。",
   "ko": "현재까지는 없습니다.",
   "en": "Not so far."
  },
  {
   "r": "A",
   "ja": "安全のため無理に操作しないでください。",
   "jr": "あんぜんの ため むりに そうさしないでください。",
   "ko": "안전을 위해 무리하게 조작하지 마세요.",
   "en": "Please avoid forcing the unit to operate.",
   "alt": [
    {
     "ja": "危ないので、無理に操作しないでくださいね。",
     "jr": "あぶないので、むりに そうさ しないで くださいね。",
     "ko": "위험하니 무리하게 조작하지 마세요.",
     "en": "For safety, please don’t try to fix it yourself."
    }
   ]
  },
  {
   "r": "B",
   "ja": "小さな子どもがいるので急いでいます。",
   "jr": "ちいさな こどもが いるので いそいでいます。",
   "ko": "어린아이가 있어 급합니다.",
   "en": "I have a young child and need help quickly."
  },
  {
   "r": "A",
   "ja": "お子様がいらっしゃるんですね。修理担当に急ぎの案件として伝えます。",
   "jr": "おこさまが いらっしゃるんですね。しゅうりたんとうに いそぎの あんけんとして つたえます。",
   "ko": "아이가 있으시군요. 수리 담당자에게 긴급 건으로 전달하겠습니다.",
   "en": "I understand you have a child. I will flag this as urgent to the repair team."
  },
  {
   "r": "B",
   "ja": "立ち会いは必要でしょうか。",
   "jr": "たちあいは ひつようでしょうか。",
   "ko": "수리할 때 집에 있어야 하나요?",
   "en": "Do I need to be home for the visit?"
  },
  {
   "r": "A",
   "ja": "点検は室内で行うので立ち会いをお願いします。候補は明日の午前中です。",
   "jr": "てんけんは しつないで おこなうので たちあいを おねがいします。こうほは あしたの ごぜんちゅうです。",
   "ko": "실내 점검이므로 입회가 필요합니다. 내일 오전이 가능한 시간대입니다.",
   "en": "You will need to be home for the indoor inspection. Tomorrow morning is a possible slot."
  },
  {
   "r": "B",
   "ja": "連絡は電話でお願いします。",
   "jr": "れんらくは でんわで おねがいします。",
   "ko": "전화로 연락 부탁드립니다.",
   "en": "Please contact me by phone."
  },
  {
   "r": "A",
   "ja": "承知しました。訪問時間が決まり次第、電話でご連絡します。",
   "jr": "しょうちしました。ほうもんじかんが きまりしだい、でんわで ごれんらくします。",
   "ko": "알겠습니다. 방문 시간이 정해지면 전화드리겠습니다.",
   "en": "Understood. We will call once the visit time is confirmed.",
   "alt": [
    {
     "ja": "かしこまりました。訪問の時間が決まりましたら、お電話します。",
     "jr": "かしこまりました。ほうもんの じかんが きまりましたら、おでんわ します。",
     "ko": "알겠습니다. 방문 시간이 정해지면 전화드리겠습니다.",
     "en": "Certainly. We’ll call you once the visit time is set."
    }
   ]
  },
  {
   "r": "B",
   "ja": "ありがとうございます。",
   "jr": "ありがとうございます。",
   "ko": "감사합니다.",
   "en": "Thank you."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「お湯が急に出なくなりました。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “갑자기 온수가 나오지 않습니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “The hot water suddenly stopped working.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "いつから使えなくなりましたか。",
     "ko": "언제부터 사용이 안 됐나요?",
     "en": "When did the problem start?"
    },
    {
     "ja": "来週の木曜日なら可能です。",
     "ko": "다음 주 목요일이면 가능합니다.",
     "en": "I am available next Thursday."
    },
    {
     "ja": "引き継ぎ後の質問は、社内チャットで私と上司をタグ付けしてください。",
     "ko": "인수인계 후 질문은 사내 채팅에서 저와 상사를 태그해 주세요.",
     "en": "After handover, tag me and our manager in the work chat."
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「小さな子どもがいるので急いでいます。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “어린아이가 있어 급합니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “I have a young child and need help quickly.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "届いた商品が発注内容と違います。",
     "ko": "도착한 상품이 주문 내용과 다릅니다.",
     "en": "The delivered items do not match our order."
    },
    {
     "ja": "お子様がいらっしゃるんですね。修理担当に急ぎの案件として伝えます。",
     "ko": "아이가 있으시군요. 수리 담당자에게 긴급 건으로 전달하겠습니다.",
     "en": "I understand you have a child. I will flag this as urgent to the repair team."
    },
    {
     "ja": "申請前に確認していただけますか。",
     "ko": "신청 전에 확인해 주실 수 있나요?",
     "en": "Could you review it before I submit?"
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「連絡は電話でお願いします。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “전화로 연락 부탁드립니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Please contact me by phone.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "夜中でもチェックインできますか。",
     "ko": "한밤중에도 체크인할 수 있나요?",
     "en": "Can I check in after midnight?"
    },
    {
     "ja": "承知しました。訪問時間が決まり次第、電話でご連絡します。",
     "ko": "알겠습니다. 방문 시간이 정해지면 전화드리겠습니다.",
     "en": "Understood. We will call once the visit time is confirmed."
    },
    {
     "ja": "では、この椅子でお待ちください。確認したらお呼びします。",
     "ko": "그럼 이 의자에서 기다려 주세요. 확인되면 부르겠습니다.",
     "en": "Please take a seat here. I will call you when I hear back."
    }
   ],
   "a": 1
  }
 ]
},
{
 "id": "life-train-delay-certificate-1",
 "cat": "life",
 "lv": 1,
 "title": {
  "ja": "電車遅延と遅延証明書",
  "ko": "전철 지연과 지연증명서",
  "en": "Requesting a train delay certificate"
 },
 "scene": {
  "ja": "通勤者が遅延証明書の発行方法を確認する。",
  "ko": "통근자가 지연증명서 발급 방법을 문의한다.",
  "en": "A commuter asks how to obtain proof of a train delay."
 },
 "roles": {
  "A": {
   "ja": "駅係員",
   "ko": "역 직원",
   "en": "Station staff"
  },
  "B": {
   "ja": "通勤者",
   "ko": "통근자",
   "en": "Commuter"
  }
 },
 "ai": {
  "goal": {
   "ja": "証明書の入手方法と確認先を案内する。",
   "ko": "증명서 발급 방법 및 확인처를 안내한다.",
   "en": "Explain where and how to obtain a delay certificate."
  },
  "twist": {
   "ja": "通勤者が途中で別の路線に乗り換えた。",
   "ko": "통근자가 중간에 다른 노선으로 갈아탔다.",
   "en": "The commuter transferred to another railway line."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "何かお困りでしょうか。",
   "jr": "なにか おこまりでしょうか。",
   "ko": "무엇을 도와드릴까요?",
   "en": "How can I help?"
  },
  {
   "r": "B",
   "ja": "電車が遅れて会社に間に合いません。",
   "jr": "でんしゃが おくれて かいしゃに まにあいません。",
   "ko": "전철이 늦어 회사에 지각할 것 같습니다.",
   "en": "The train is delayed and I will be late for work."
  },
  {
   "r": "A",
   "ja": "現在、上り電車は約二十分遅れています。",
   "jr": "げんざい、のぼりでんしゃは やく にじゅっぷん おくれています。",
   "ko": "현재 상행 전철은 약 20분 지연되고 있습니다.",
   "en": "Inbound trains are currently running about twenty minutes late.",
   "alt": [
    {
     "ja": "ただいま、上りの電車が二十分ほど遅れています。",
     "jr": "ただいま、のぼりの でんしゃが にじゅっぷん ほど おくれて います。",
     "ko": "지금 상행 전철이 20분 정도 늦어지고 있습니다.",
     "en": "Inbound trains are currently running about 20 minutes late."
    }
   ]
  },
  {
   "r": "B",
   "ja": "遅延証明書はもらえますか。",
   "jr": "ちえんしょうめいしょは もらえますか。",
   "ko": "지연증명서를 받을 수 있나요?",
   "en": "Can I get a delay certificate?"
  },
  {
   "r": "A",
   "ja": "遅延証明書は改札横の窓口でお渡ししています。",
   "jr": "ちえんしょうめいしょは かいさつよこの まどぐちで おわたししています。",
   "ko": "지연증명서는 개찰구 옆 창구에서 드립니다.",
   "en": "Delay certificates are available at the desk next to the ticket gates.",
   "alt": [
    {
     "ja": "遅延証明書は、改札横の窓口でお受け取りください。",
     "jr": "ちえん しょうめいしょは、かいさつ よこの まどぐちで おうけとり ください。",
     "ko": "지연증명서는 개찰구 옆 창구에서 받아 가세요.",
     "en": "You can pick up a delay certificate at the window next to the gates."
    }
   ]
  },
  {
   "r": "B",
   "ja": "途中で別の路線に乗り換えました。",
   "jr": "とちゅうで べつの ろせんに のりかえました。",
   "ko": "중간에 다른 노선으로 갈아탔습니다.",
   "en": "I transferred to a different line."
  },
  {
   "r": "A",
   "ja": "ご利用の路線を教えてください。",
   "jr": "ごりようの ろせんを おしえてください。",
   "ko": "이용하신 노선을 알려 주세요.",
   "en": "Which lines did you use?"
  },
  {
   "r": "B",
   "ja": "最初は、みどり線でした。",
   "jr": "さいしょは、みどりせん でした。",
   "ko": "처음에는 미도리선이었어요.",
   "en": "I started on the Midori Line."
  },
  {
   "r": "A",
   "ja": "みどり線の分は、あちらの改札でお渡ししています。",
   "jr": "みどりせんの ぶんは、あちらの かいさつで おわたし して います。",
   "ko": "미도리선 것은 저쪽 개찰구에서 드리고 있습니다.",
   "en": "For the Midori Line, you can get one at the gates over there."
  },
  {
   "r": "B",
   "ja": "スマートフォンでも取得できますか。",
   "jr": "スマートフォンでも しゅとくできますか。",
   "ko": "휴대전화로도 발급받을 수 있나요?",
   "en": "Can I get it on my phone?"
  },
  {
   "r": "A",
   "ja": "はい。公式サイトから表示して保存できますよ。",
   "jr": "はい。こうしきサイトから ひょうじして ほぞんできますよ。",
   "ko": "네. 공식 사이트에서 표시하고 저장할 수 있습니다.",
   "en": "Yes. You can open and save it on the official website.",
   "alt": [
    {
     "ja": "はい。公式サイトから画面で出して、保存できますよ。",
     "jr": "はい。こうしき サイトから がめんで だして、ほぞん できますよ。",
     "ko": "네. 공식 사이트에서 화면으로 띄워서 저장할 수 있어요.",
     "en": "Yes. You can display it on the official website and save it."
    }
   ]
  },
  {
   "r": "B",
   "ja": "今日の日付で発行されますか。",
   "jr": "きょうの ひづけで はっこうされますか。",
   "ko": "오늘 날짜로 발급되나요?",
   "en": "Will it show today's date?"
  },
  {
   "r": "A",
   "ja": "はい、対象となる日付と時間帯が記載されます。",
   "jr": "はい、たいしょうとなる ひづけと じかんたいが きさいされます。",
   "ko": "네. 해당 날짜와 시간대가 기재됩니다.",
   "en": "Yes, it shows the relevant date and time period."
  },
  {
   "r": "B",
   "ja": "助かりました。",
   "jr": "たすかりました。",
   "ko": "도움이 됐습니다.",
   "en": "That helps a lot."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「電車が遅れて会社に間に合いません。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “전철이 늦어 회사에 지각할 것 같습니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “The train is delayed and I will be late for work.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "補償の範囲について質問があります。",
     "ko": "보장 범위에 대해 질문이 있습니다.",
     "en": "I have a question about the insurance coverage."
    },
    {
     "ja": "まず今日中に対応が必要な二件から説明します。",
     "ko": "우선 오늘 안에 처리할 두 건부터 설명하겠습니다.",
     "en": "Let us start with the two items due today."
    },
    {
     "ja": "現在、上り電車は約二十分遅れています。",
     "ko": "현재 상행 전철은 약 20분 지연되고 있습니다.",
     "en": "Inbound trains are currently running about twenty minutes late."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「最初は、みどり線でした。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “처음에는 미도리선이었어요.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “I started on the Midori Line.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "みどり線の分は、あちらの改札でお渡ししています。",
     "ko": "미도리선 것은 저쪽 개찰구에서 드리고 있습니다.",
     "en": "For the Midori Line, you can get one at the gates over there."
    },
    {
     "ja": "連絡先は友人の番号でもいいですか。",
     "ko": "연락처를 친구 번호로 해도 되나요?",
     "en": "May I leave my friend’s number as a contact?"
    },
    {
     "ja": "不足している数量をリストにして、倉庫担当へ緊急で共有します。",
     "ko": "부족한 수량을 목록으로 작성해 창고 담당에 긴급 전달하겠습니다.",
     "en": "I will list the missing quantities and escalate them urgently to the warehouse."
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「今日の日付で発行されますか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “오늘 날짜로 발급되나요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Will it show today's date?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "到着予定が変わればご連絡ください。",
     "ko": "도착 예정이 바뀌면 연락해 주세요.",
     "en": "Please let us know if your arrival time changes."
    },
    {
     "ja": "はい、対象となる日付と時間帯が記載されます。",
     "ko": "네. 해당 날짜와 시간대가 기재됩니다.",
     "en": "Yes, it shows the relevant date and time period."
    },
    {
     "ja": "承認は誰にお願いすればいいですか。",
     "ko": "승인은 누구에게 받아야 하나요?",
     "en": "Who needs to approve the claim?"
    }
   ],
   "a": 1
  }
 ]
},
{
 "id": "life-mobile-plan-change-1",
 "cat": "life",
 "lv": 2,
 "title": {
  "ja": "携帯料金プランの変更",
  "ko": "휴대전화 요금제 변경",
  "en": "Changing a mobile phone plan"
 },
 "scene": {
  "ja": "利用者が通信会社に料金プラン変更を相談する。",
  "ko": "이용자가 통신사에 요금제 변경을 문의한다.",
  "en": "A subscriber asks about changing a mobile plan."
 },
 "roles": {
  "A": {
   "ja": "通信会社スタッフ",
   "ko": "통신사 직원",
   "en": "Mobile service agent"
  },
  "B": {
   "ja": "契約者",
   "ko": "계약자",
   "en": "Subscriber"
  }
 },
 "ai": {
  "goal": {
   "ja": "料金と適用開始日、契約条件を説明する。",
   "ko": "요금과 적용일, 계약 조건을 설명한다.",
   "en": "Clarify cost, effective dates and contractual conditions."
  },
  "twist": {
   "ja": "契約者が海外出張中にも利用する。",
   "ko": "계약자가 해외 출장 중에도 휴대전화를 사용한다.",
   "en": "The subscriber uses the phone on business trips abroad."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "プラン変更のご相談ですね。",
   "jr": "プランへんこうの ごそうだんですね。",
   "ko": "요금제 변경 문의시군요.",
   "en": "You would like to change your plan, correct?"
  },
  {
   "r": "B",
   "ja": "毎月の通信料金を見直したいです。",
   "jr": "まいつきの つうしんりょうきんを みなおしたいです。",
   "ko": "매달 통신요금을 줄이고 싶습니다.",
   "en": "I want to review my monthly mobile costs."
  },
  {
   "r": "A",
   "ja": "直近三か月では、毎月二ギガほどご利用ですね。",
   "jr": "ちょっきん さんかげつでは、まいつき にギガほど ごりようですね。",
   "ko": "최근 3개월은 매달 약 2GB를 사용하셨네요.",
   "en": "You have used around 2 GB per month over the last three months.",
   "alt": [
    {
     "ja": "この三か月ですと、毎月だいたい二ギガのご利用ですね。",
     "jr": "この さんかげつ ですと、まいつき だいたい にギガの ごりよう ですね。",
     "ko": "최근 3개월을 보면 매달 2기가 정도 쓰셨네요.",
     "en": "Over the last three months, you’ve used about 2 GB a month."
    }
   ]
  },
  {
   "r": "B",
   "ja": "データ通信はあまり使いません。",
   "jr": "データつうしんは あまり つかいません。",
   "ko": "데이터는 많이 사용하지 않습니다.",
   "en": "I do not use much mobile data."
  },
  {
   "r": "A",
   "ja": "こちらの三ギガプランなら月額二千円です。",
   "jr": "こちらの さんギガプランなら げつがく にせんえんです。",
   "ko": "이 3GB 요금제는 월 2,000엔입니다.",
   "en": "This 3 GB plan costs 2,000 yen per month.",
   "alt": [
    {
     "ja": "三ギガのプランでしたら、月二千円になります。",
     "jr": "さんギガの プラン でしたら、つき にせんえんに なります。",
     "ko": "3기가 요금제라면 월 2,000엔입니다.",
     "en": "The 3 GB plan would be 2,000 yen a month."
    }
   ]
  },
  {
   "r": "B",
   "ja": "変更はいつから適用されますか。",
   "jr": "へんこうは いつから てきようされますか。",
   "ko": "변경은 언제부터 적용되나요?",
   "en": "When would the change take effect?"
  },
  {
   "r": "A",
   "ja": "来月一日から適用できます。今月分は現在の料金です。",
   "jr": "らいげつ ついたちから てきようできます。こんげつぶんは げんざいの りょうきんです。",
   "ko": "다음 달 1일부터 적용 가능하며 이번 달은 기존 요금입니다.",
   "en": "It can start on the first of next month. This month’s rate stays the same.",
   "alt": [
    {
     "ja": "来月の一日から変わります。今月は今の料金のままです。",
     "jr": "らいげつの ついたちから かわります。こんげつは いまの りょうきんの ままです。",
     "ko": "다음 달 1일부터 바뀝니다. 이번 달은 지금 요금 그대로입니다.",
     "en": "It changes from the first of next month. This month stays at the current rate."
    }
   ]
  },
  {
   "r": "B",
   "ja": "海外出張でも使えるプランがいいです。",
   "jr": "かいがいしゅっちょうでも つかえる プランが いいです。",
   "ko": "해외 출장에서도 쓸 수 있는 요금제가 좋겠습니다.",
   "en": "I also need service when travelling abroad for work."
  },
  {
   "r": "A",
   "ja": "海外では別料金になります。渡航先によって料金が異なります。",
   "jr": "かいがいでは べつりょうきんに なります。とこうさきに よって りょうきんが ことなります。",
   "ko": "해외 이용은 별도 요금이며 방문 국가에 따라 달라집니다.",
   "en": "Roaming costs extra and varies by destination."
  },
  {
   "r": "B",
   "ja": "追加費用は発生しますか。",
   "jr": "ついかひようは はっせいしますか。",
   "ko": "추가 비용이 발생하나요?",
   "en": "Could there be extra charges?"
  },
  {
   "r": "A",
   "ja": "たとえば一日単位の海外パックがあります。料金は渡航先を伺ってご案内します。",
   "jr": "たとえば いちにちたんいの かいがいパックが あります。りょうきんは とこうさきを うかがって ごあんないします。",
   "ko": "예를 들면 일 단위 해외 이용 패키지가 있습니다. 방문 국가를 알려주시면 요금을 안내하겠습니다.",
   "en": "For example, we offer daily roaming passes. Tell me the country for pricing."
  },
  {
   "r": "B",
   "ja": "今日すぐに決めなくてもいいですか。",
   "jr": "きょう すぐに きめなくても いいですか。",
   "ko": "오늘 바로 결정하지 않아도 되나요?",
   "en": "Can I decide later?"
  },
  {
   "r": "A",
   "ja": "はい。比較してからお決めください。",
   "jr": "はい。ひかくしてから おきめください。",
   "ko": "네. 비교하신 후 결정하세요.",
   "en": "Of course. Please compare the options first."
  },
  {
   "r": "B",
   "ja": "ありがとうございます。",
   "jr": "ありがとうございます。",
   "ko": "감사합니다.",
   "en": "Thank you."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「毎月の通信料金を見直したいです。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “매달 통신요금을 줄이고 싶습니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “I want to review my monthly mobile costs.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "ご迷惑をおかけして申し訳ございません。",
     "ko": "불편을 드려 죄송합니다.",
     "en": "I apologise for the inconvenience."
    },
    {
     "ja": "まず直属の上司が承認し、その後に経理へ回ります。",
     "ko": "먼저 직속 상사가 승인하고 그다음 경리로 넘어갑니다.",
     "en": "Your direct manager approves it first, then it goes to finance."
    },
    {
     "ja": "直近三か月では、毎月二ギガほどご利用ですね。",
     "ko": "최근 3개월은 매달 약 2GB를 사용하셨네요.",
     "en": "You have used around 2 GB per month over the last three months."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「海外出張でも使えるプランがいいです。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “해외 출장에서도 쓸 수 있는 요금제가 좋겠습니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “I also need service when travelling abroad for work.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "名前が合っています。ありがとうございます。搭乗口はどちらですか。",
     "ko": "이름이 맞습니다. 감사합니다. 탑승구는 어디인가요?",
     "en": "The name is correct. Thank you. Where is the boarding gate?"
    },
    {
     "ja": "海外では別料金になります。渡航先によって料金が異なります。",
     "ko": "해외 이용은 별도 요금이며 방문 국가에 따라 달라집니다.",
     "en": "Roaming costs extra and varies by destination."
    },
    {
     "ja": "確定したらメールをいただけますか。",
     "ko": "확정되면 이메일로 알려주실 수 있나요?",
     "en": "Could you email me once it is confirmed?"
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「今日すぐに決めなくてもいいですか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “오늘 바로 결정하지 않아도 되나요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Can I decide later?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "出発の四十分前にこの案内所へお越しください。係員がお迎えします。",
     "ko": "출발 40분 전에 이 안내소로 와 주세요. 직원이 모시겠습니다.",
     "en": "Please return to this desk forty minutes before departure. An agent will meet you."
    },
    {
     "ja": "はい。比較してからお決めください。",
     "ko": "네. 비교하신 후 결정하세요.",
     "en": "Of course. Please compare the options first."
    },
    {
     "ja": "こちらの受付番号で追跡できます。配送の時刻は到着後にご連絡します。",
     "ko": "이 접수번호로 추적할 수 있습니다. 배송 시간은 도착 후 연락드리겠습니다.",
     "en": "You can track it using this reference number. We will update you on delivery timing after it arrives."
    }
   ],
   "a": 1
  }
 ]
}
);
