/* ACN 会話練習 追加データ talk_data_g09.js（GPT 2次修正本 talk_data_g09r.js を Claude が検収・修正：会話の流れ、ほかの言い方、確認問題 2026.10.10）。架空の練習用会話。日時・料金は例 */
window.TALK=window.TALK||[];window.TALK.push(
{
 "id": "office-meeting-reschedule-1",
 "cat": "office",
 "lv": 2,
 "title": {
  "ja": "取引先との会議日程変更",
  "ko": "거래처 회의 일정 변경",
  "en": "Rescheduling a client meeting"
 },
 "scene": {
  "ja": "取引先との会議日程を調整する。",
  "ko": "거래처와 회의 일정을 조정한다.",
  "en": "Colleagues coordinate a client meeting."
 },
 "roles": {
  "A": {
   "ja": "営業担当",
   "ko": "영업 담당자",
   "en": "Sales representative"
  },
  "B": {
   "ja": "同僚",
   "ko": "동료",
   "en": "Colleague"
  }
 },
 "ai": {
  "goal": {
   "ja": "変更理由を簡潔に伝え、代替日程を確認する。",
   "ko": "변경 사유를 간단히 전달하고 대체 일정을 확인한다.",
   "en": "Explain the reason and check alternative dates."
  },
  "twist": {
   "ja": "取引先が海外拠点から参加する。",
   "ko": "해외 지사 담당자가 회의에 참여한다.",
   "en": "A client participant is joining from another time zone."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "来週の打ち合わせについて相談があります。",
   "jr": "らいしゅうの うちあわせについて そうだんが あります。",
   "ko": "다음 주 미팅에 관해 상의할 일이 있습니다.",
   "en": "I need to discuss next week's meeting."
  },
  {
   "r": "B",
   "ja": "何か変更がありましたか。",
   "jr": "なにか へんこうが ありましたか。",
   "ko": "변경 사항이 있나요?",
   "en": "Has something changed?"
  },
  {
   "r": "A",
   "ja": "担当者の予定が重なってしまいました。",
   "jr": "たんとうしゃの よていが かさなってしまいました。",
   "ko": "담당자의 일정이 겹쳤습니다.",
   "en": "Our representative has a scheduling conflict.",
   "alt": [
    {
     "ja": "担当者のスケジュールが重なってしまいまして。",
     "jr": "たんとうしゃの スケジュールが かさなって しまいまして。",
     "ko": "담당자 일정이 겹쳐 버려서요.",
     "en": "The person in charge has a scheduling conflict."
    }
   ]
  },
  {
   "r": "B",
   "ja": "先方にはもう連絡しましたか。",
   "jr": "せんぽうには もう れんらくしましたか。",
   "ko": "거래처에는 이미 연락했나요?",
   "en": "Have you informed the client?"
  },
  {
   "r": "A",
   "ja": "まだです。候補日を整理したいです。",
   "jr": "まだです。こうほびを せいりしたいです。",
   "ko": "아직입니다. 후보 날짜부터 정리하고 싶습니다.",
   "en": "Not yet. I want to prepare alternative dates first."
  },
  {
   "r": "B",
   "ja": "水曜日の午後はいかがでしょうか。",
   "jr": "すいようびの ごごは いかがでしょうか。",
   "ko": "수요일 오후는 어떨까요?",
   "en": "How about Wednesday afternoon?"
  },
  {
   "r": "A",
   "ja": "社内では水曜の十五時から十六時が空いています。",
   "jr": "しゃないでは すいようの じゅうごじから じゅうろくじが あいています。",
   "ko": "사내에서는 수요일 15~16시가 비어 있습니다.",
   "en": "Our team is free Wednesday from 3 to 4 p.m.",
   "alt": [
    {
     "ja": "社内の都合でしたら、水曜の十五時から十六時が空いています。",
     "jr": "しゃないの つごう でしたら、すいようの じゅうごじから じゅうろくじが あいて います。",
     "ko": "사내 일정으로는 수요일 15시부터 16시가 비어 있습니다.",
     "en": "On our side, Wednesday from 3 to 4 p.m. is free."
    }
   ]
  },
  {
   "r": "B",
   "ja": "海外拠点の方も参加予定です。",
   "jr": "かいがいきょてんの かたも さんかよていです。",
   "ko": "해외 지사에서도 참여할 예정입니다.",
   "en": "Someone from an overseas office will attend."
  },
  {
   "r": "A",
   "ja": "海外の参加者には、現地時刻を併記して候補を送りましょう。",
   "jr": "かいがいの さんかしゃには、げんちじこくを へいきして こうほを おくりましょう。",
   "ko": "해외 참가자에게는 현지 시각을 함께 적어 후보 일정을 보내죠.",
   "en": "Let us include the local time for the overseas participant."
  },
  {
   "r": "B",
   "ja": "先方への説明はどうしましょうか。",
   "jr": "せんぽうへの せつめいは どうしましょうか。",
   "ko": "거래처에는 어떻게 설명할까요?",
   "en": "How should we explain the change?"
  },
  {
   "r": "A",
   "ja": "担当者の予定が重なったと説明し、二つの候補をおわびとともに伝えます。",
   "jr": "たんとうしゃの よていが かさなったと せつめいし、ふたつの こうほを おわびとともに つたえます。",
   "ko": "담당자 일정이 겹쳤다고 설명하고 사과와 함께 두 후보를 전달하겠습니다.",
   "en": "We will apologise for the conflict and offer two alternative slots."
  },
  {
   "r": "B",
   "ja": "確認できたらメールを送ります。",
   "jr": "かくにんできたら メールを おくります。",
   "ko": "확인되면 이메일을 보내겠습니다.",
   "en": "I will email them once we confirm."
  },
  {
   "r": "A",
   "ja": "件名に日程変更と入れ、日時と時差を本文に書いてください。",
   "jr": "けんめいに にっていへんこうと いれ、にちじと じさを ほんぶんに かいてください。",
   "ko": "제목에 일정 변경을 넣고 본문에 날짜·시간·시차를 적어 주세요.",
   "en": "Put “Meeting reschedule” in the subject and include both time zones.",
   "alt": [
    {
     "ja": "件名に「日程変更」と入れて、日時と時差を本文に書いておいてください。",
     "jr": "けんめいに「にってい へんこう」と いれて、にちじと じさを ほんぶんに かいて おいて ください。",
     "ko": "제목에 ‘일정 변경’이라고 넣고 일시와 시차를 본문에 써 주세요.",
     "en": "Put “Schedule change” in the subject line, and write the date, time and time difference in the body."
    }
   ]
  },
  {
   "r": "B",
   "ja": "お願いします。",
   "jr": "おねがいします。",
   "ko": "부탁합니다.",
   "en": "Thank you."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「何か変更がありましたか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “변경 사항이 있나요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Has something changed?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "空港からはタクシーで向かいます。",
     "ko": "공항에서 택시로 이동합니다.",
     "en": "I will take a taxi from the airport."
    },
    {
     "ja": "担当者の予定が重なってしまいました。",
     "ko": "담당자의 일정이 겹쳤습니다.",
     "en": "Our representative has a scheduling conflict."
    },
    {
     "ja": "前の方の使用分が含まれていないか、開始時の指針値を調べます。",
     "ko": "전 거주자의 사용량이 포함됐는지 계약 시작 시 검침 수치를 확인하겠습니다.",
     "en": "I will check the opening meter reading for any prior tenant’s usage."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「海外拠点の方も参加予定です。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “해외 지사에서도 참여할 예정입니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Someone from an overseas office will attend.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "出発の四十分前にこの案内所へお越しください。係員がお迎えします。",
     "ko": "출발 40분 전에 이 안내소로 와 주세요. 직원이 모시겠습니다.",
     "en": "Please return to this desk forty minutes before departure. An agent will meet you."
    },
    {
     "ja": "財布をなくしてしまいました。",
     "ko": "지갑을 잃어버렸습니다.",
     "en": "I have lost my wallet."
    },
    {
     "ja": "海外の参加者には、現地時刻を併記して候補を送りましょう。",
     "ko": "해외 참가자에게는 현지 시각을 함께 적어 후보 일정을 보내죠.",
     "en": "Let us include the local time for the overseas participant."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「確認できたらメールを送ります。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “확인되면 이메일을 보내겠습니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “I will email them once we confirm.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "件名に日程変更と入れ、日時と時差を本文に書いてください。",
     "ko": "제목에 일정 변경을 넣고 본문에 날짜·시간·시차를 적어 주세요.",
     "en": "Put “Meeting reschedule” in the subject and include both time zones."
    },
    {
     "ja": "追加費用は発生しますか。",
     "ko": "추가 비용이 발생하나요?",
     "en": "Could there be extra charges?"
    },
    {
     "ja": "お名前は出しませんので、ご安心ください。",
     "ko": "성함은 밝히지 않을 테니 안심하세요.",
     "en": "We won’t mention your name, so don’t worry."
    }
   ],
   "a": 0
  }
 ]
},
{
 "id": "office-expense-report-1",
 "cat": "office",
 "lv": 2,
 "title": {
  "ja": "出張経費の精算確認",
  "ko": "출장 경비 정산 확인",
  "en": "Clarifying travel expenses"
 },
 "scene": {
  "ja": "社員が出張経費の精算方法を確認する。",
  "ko": "직원이 출장비 정산 방법을 문의한다.",
  "en": "An employee asks about travel expense reimbursement."
 },
 "roles": {
  "A": {
   "ja": "経理担当",
   "ko": "경리 담당자",
   "en": "Finance officer"
  },
  "B": {
   "ja": "社員",
   "ko": "직원",
   "en": "Employee"
  }
 },
 "ai": {
  "goal": {
   "ja": "必要書類と社内の申請手順を案内する。",
   "ko": "필요 서류와 사내 신청 절차를 안내한다.",
   "en": "Explain supporting documents and the expense approval process."
  },
  "twist": {
   "ja": "社員が領収書を一枚紛失した。",
   "ko": "직원이 영수증 한 장을 분실했다.",
   "en": "The employee has lost one receipt."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "出張費の精算についてですね。",
   "jr": "しゅっちょうひの せいさんについてですね。",
   "ko": "출장비 정산 문의시군요.",
   "en": "You have a question about travel expenses, correct?"
  },
  {
   "r": "B",
   "ja": "交通費と宿泊費を申請したいです。",
   "jr": "こうつうひと しゅくはくひを しんせいしたいです。",
   "ko": "교통비와 숙박비를 신청하고 싶습니다.",
   "en": "I would like to claim transport and hotel expenses."
  },
  {
   "r": "A",
   "ja": "領収書はそろっていますか。",
   "jr": "りょうしゅうしょは そろっていますか。",
   "ko": "영수증은 모두 있으신가요?",
   "en": "Do you have all the receipts?",
   "alt": [
    {
     "ja": "領収書は全部ありますか。",
     "jr": "りょうしゅうしょは ぜんぶ ありますか。",
     "ko": "영수증은 다 있나요?",
     "en": "Do you have all the receipts?"
    }
   ]
  },
  {
   "r": "B",
   "ja": "一枚だけ見つかりません。",
   "jr": "いちまいだけ みつかりません。",
   "ko": "한 장만 찾지 못했습니다.",
   "en": "I cannot find one of them."
  },
  {
   "r": "A",
   "ja": "領収書がない場合は代替資料が必要です。社内規定を一緒に確認しましょう。",
   "jr": "りょうしゅうしょが ない ばあいは だいたいしりょうが ひつようです。しゃないきていを いっしょに かくにんしましょう。",
   "ko": "영수증이 없으면 대체 자료가 필요합니다. 사내 규정을 함께 보겠습니다.",
   "en": "If a receipt is missing, alternative evidence may be needed. Let us check the policy."
  },
  {
   "r": "B",
   "ja": "カードの利用明細ならあります。",
   "jr": "カードの りようめいさいなら あります。",
   "ko": "카드 이용 명세서는 있습니다.",
   "en": "I do have the card statement."
  },
  {
   "r": "A",
   "ja": "カード明細と利用日のメモを添付して申請してください。受理できるかは審査します。",
   "jr": "カードめいさいと りようびの メモを てんぷして しんせいしてください。じゅりできるかは しんさします。",
   "ko": "카드 명세와 사용일 메모를 첨부해 신청하세요. 인정 여부는 심사합니다.",
   "en": "Attach the card statement and a note of the date. Acceptance is subject to review.",
   "alt": [
    {
     "ja": "カードの明細に、使った日のメモを付けて申請してください。認められるかは審査になります。",
     "jr": "カードの めいさいに、つかった ひの メモを つけて しんせい して ください。みとめられるかは しんさに なります。",
     "ko": "카드 명세서에 사용한 날의 메모를 붙여서 신청해 주세요. 인정될지는 심사하게 됩니다.",
     "en": "Please submit the card statement with a note of the date you used it. Whether it’s accepted will be reviewed."
    }
   ]
  },
  {
   "r": "B",
   "ja": "申請期限は今週末でしょうか。",
   "jr": "しんせいきげんは こんしゅうまつでしょうか。",
   "ko": "신청 기한이 이번 주 말인가요?",
   "en": "Is the deadline this weekend?"
  },
  {
   "r": "A",
   "ja": "通常は翌月五日締めですが、今回は月末までに出してください。",
   "jr": "つうじょうは よくげつ いつかじめですが、こんかいは げつまつまでに だしてください。",
   "ko": "보통 다음 달 5일 마감이지만 이번에는 월말까지 제출해 주세요.",
   "en": "The usual deadline is the fifth of the next month, but please submit by month-end this time."
  },
  {
   "r": "B",
   "ja": "承認は誰にお願いすればいいですか。",
   "jr": "しょうにんは だれに おねがいすれば いいですか。",
   "ko": "승인은 누구에게 받아야 하나요?",
   "en": "Who needs to approve the claim?"
  },
  {
   "r": "A",
   "ja": "まず直属の上司が承認し、その後に経理へ回ります。",
   "jr": "まず ちょくぞくの じょうしが しょうにんし、そのあとに けいりへ まわります。",
   "ko": "먼저 직속 상사가 승인하고 그다음 경리로 넘어갑니다.",
   "en": "Your direct manager approves it first, then it goes to finance.",
   "alt": [
    {
     "ja": "まず直属の上司に承認してもらってから、経理に回ります。",
     "jr": "まず ちょくぞくの じょうしに しょうにん して もらってから、けいりに まわります。",
     "ko": "먼저 직속 상사의 승인을 받은 다음 경리팀으로 넘어옵니다.",
     "en": "Your direct manager approves it first, and then it comes to accounting."
    }
   ]
  },
  {
   "r": "B",
   "ja": "申請前に確認していただけますか。",
   "jr": "しんせいまえに かくにんしていただけますか。",
   "ko": "신청 전에 확인해 주실 수 있나요?",
   "en": "Could you review it before I submit?"
  },
  {
   "r": "A",
   "ja": "はい。明細と出張日程表を送っていただければ、記入漏れを見ます。",
   "jr": "はい。めいさいと しゅっちょうにっていひょうを おくっていただければ、きにゅうもれを みます。",
   "ko": "네. 명세서와 출장 일정표를 보내주시면 기입 누락을 봐드리겠습니다.",
   "en": "Yes. Send me the expense sheet and trip itinerary, and I will check for missing entries."
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
    "ja": "相手が「交通費と宿泊費を申請したいです。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “교통비와 숙박비를 신청하고 싶습니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “I would like to claim transport and hotel expenses.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "レストランは十時で閉まりますが、ロビーに軽食の自動販売機があります。",
     "ko": "식당은 10시에 닫지만 로비에 간식 자판기가 있습니다.",
     "en": "The restaurant closes at ten, but there is a snack machine in the lobby."
    },
    {
     "ja": "領収書はそろっていますか。",
     "ko": "영수증은 모두 있으신가요?",
     "en": "Do you have all the receipts?"
    },
    {
     "ja": "えっ、本当ですか。今日の便に乗れないんですか。",
     "ko": "네? 정말요? 오늘 비행기 못 타는 거예요?",
     "en": "Really? Does that mean I can’t take today’s flight?"
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「申請期限は今週末でしょうか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “신청 기한이 이번 주 말인가요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Is the deadline this weekend?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "通常は翌月五日締めですが、今回は月末までに出してください。",
     "ko": "보통 다음 달 5일 마감이지만 이번에는 월말까지 제출해 주세요.",
     "en": "The usual deadline is the fifth of the next month, but please submit by month-end this time."
    },
    {
     "ja": "念のため、お荷物の特徴を詳しく伺えますか。",
     "ko": "확인을 위해 수하물 특징을 자세히 여쭤봐도 될까요?",
     "en": "Could you describe your bag in more detail, just to be sure?"
    },
    {
     "ja": "点検は室内で行うので立ち会いをお願いします。候補は明日の午前中です。",
     "ko": "실내 점검이므로 입회가 필요합니다. 내일 오전이 가능한 시간대입니다.",
     "en": "You will need to be home for the indoor inspection. Tomorrow morning is a possible slot."
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「申請前に確認していただけますか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “신청 전에 확인해 주실 수 있나요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Could you review it before I submit?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "プラン変更のご相談ですね。",
     "ko": "요금제 변경 문의시군요.",
     "en": "You would like to change your plan, correct?"
    },
    {
     "ja": "補償の対象かどうかは調査後に決まります。受付番号をお伝えします。",
     "ko": "보상 가능 여부는 조사 후 결정됩니다. 접수번호를 알려드리겠습니다.",
     "en": "Eligibility for reimbursement depends on the investigation. Here is your case number."
    },
    {
     "ja": "はい。明細と出張日程表を送っていただければ、記入漏れを見ます。",
     "ko": "네. 명세서와 출장 일정표를 보내주시면 기입 누락을 봐드리겠습니다.",
     "en": "Yes. Send me the expense sheet and trip itinerary, and I will check for missing entries."
    }
   ],
   "a": 2
  }
 ]
},
{
 "id": "office-client-complaint-1",
 "cat": "office",
 "lv": 3,
 "title": {
  "ja": "取引先からの苦情への初期対応",
  "ko": "거래처 불만 초기 대응",
  "en": "Responding to a client complaint"
 },
 "scene": {
  "ja": "納品に関する取引先の苦情を担当者が受ける。",
  "ko": "납품 관련 거래처의 불만을 담당자가 접수한다.",
  "en": "A staff member handles a client complaint about a delivery."
 },
 "roles": {
  "A": {
   "ja": "担当者",
   "ko": "담당자",
   "en": "Account representative"
  },
  "B": {
   "ja": "取引先担当",
   "ko": "거래처 담당자",
   "en": "Client representative"
  }
 },
 "ai": {
  "goal": {
   "ja": "事実関係を確認し、対応期限を安易に約束しない。",
   "ko": "사실관계를 확인하고 무리하게 처리 기한을 약속하지 않는다.",
   "en": "Clarify the issue without promising an unverified resolution date."
  },
  "twist": {
   "ja": "相手が今日中の回答を強く求める。",
   "ko": "상대가 오늘 안에 답변하라고 강하게 요구한다.",
   "en": "The client insists on an answer today."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "本日はどのようなご用件でしょうか。",
   "jr": "ほんじつは どのような ごようけんでしょうか。",
   "ko": "오늘 어떤 문의이신가요?",
   "en": "How can I help you today?"
  },
  {
   "r": "B",
   "ja": "届いた商品が発注内容と違います。",
   "jr": "とどいた しょうひんが はっちゅうないようと ちがいます。",
   "ko": "도착한 상품이 주문 내용과 다릅니다.",
   "en": "The delivered items do not match our order."
  },
  {
   "r": "A",
   "ja": "ご迷惑をおかけして申し訳ございません。",
   "jr": "ごめいわくを おかけして もうしわけ ございません。",
   "ko": "불편을 드려 죄송합니다.",
   "en": "I apologise for the inconvenience.",
   "alt": [
    {
     "ja": "大変ご迷惑をおかけし、申し訳ございません。",
     "jr": "たいへん ごめいわくを おかけし、もうしわけ ございません。",
     "ko": "큰 불편을 드려 정말 죄송합니다.",
     "en": "We sincerely apologize for the trouble."
    }
   ]
  },
  {
   "r": "B",
   "ja": "数量も一部足りません。",
   "jr": "すうりょうも いちぶ たりません。",
   "ko": "수량도 일부 부족합니다.",
   "en": "Some items are also missing."
  },
  {
   "r": "A",
   "ja": "まず注文番号と納品書の番号を教えていただけますか。",
   "jr": "まず ちゅうもんばんごうと のうひんしょの ばんごうを おしえていただけますか。",
   "ko": "먼저 주문번호와 납품서 번호를 알려주시겠어요?",
   "en": "First, could you give me the order and delivery-note numbers?",
   "alt": [
    {
     "ja": "恐れ入りますが、注文番号と納品書の番号をお願いできますか。",
     "jr": "おそれいりますが、ちゅうもん ばんごうと のうひんしょの ばんごうを おねがい できますか。",
     "ko": "죄송하지만 주문 번호와 납품서 번호를 알려 주시겠어요?",
     "en": "Could I please have the order number and the delivery note number?"
    }
   ]
  },
  {
   "r": "B",
   "ja": "現場の作業が止まっているんです。",
   "jr": "げんばの さぎょうが とまっているんです。",
   "ko": "현장 작업이 중단된 상태입니다.",
   "en": "This has stopped our work on site."
  },
  {
   "r": "A",
   "ja": "不足している数量をリストにして、倉庫担当へ緊急で共有します。",
   "jr": "ふそくしている すうりょうを リストにして、そうこたんとうへ きんきゅうで きょうゆうします。",
   "ko": "부족한 수량을 목록으로 작성해 창고 담당에 긴급 전달하겠습니다.",
   "en": "I will list the missing quantities and escalate them urgently to the warehouse."
  },
  {
   "r": "B",
   "ja": "今日中に回答をいただけますか。",
   "jr": "きょうじゅうに かいとうを いただけますか。",
   "ko": "오늘 안에 답변받을 수 있나요?",
   "en": "Can you give me an answer today?"
  },
  {
   "r": "A",
   "ja": "本日十五時までに調査の進捗をご連絡します。解決時刻はまだ確約できません。",
   "jr": "ほんじつ じゅうごじまでに ちょうさの しんちょくを ごれんらくします。かいけつじこくは まだ かくやくできません。",
   "ko": "오늘 15시까지 조사 진행 상황을 연락드리겠습니다. 해결 시각은 아직 확약할 수 없습니다.",
   "en": "I will update you by 3 p.m. today, though I cannot promise a resolution time.",
   "alt": [
    {
     "ja": "本日十五時までに、調査の状況をご連絡します。いつ解決できるかは、まだお約束できません。",
     "jr": "ほんじつ じゅうごじ までに、ちょうさの じょうきょうを ごれんらく します。いつ かいけつ できるかは、まだ おやくそく できません。",
     "ko": "오늘 15시까지 조사 상황을 연락드리겠습니다. 언제 해결될지는 아직 약속드릴 수 없습니다.",
     "en": "We’ll update you on the investigation by 3 p.m. today. We can’t yet promise when it will be resolved."
    }
   ]
  },
  {
   "r": "B",
   "ja": "責任者からも説明してほしいです。",
   "jr": "せきにんしゃからも せつめいしてほしいです。",
   "ko": "책임자의 설명도 듣고 싶습니다.",
   "en": "I would like an explanation from a manager too."
  },
  {
   "r": "A",
   "ja": "責任者にも報告し、本日中に折り返せるか調整します。",
   "jr": "せきにんしゃにも ほうこくし、ほんじつじゅうに おりかえせるか ちょうせいします。",
   "ko": "책임자에게도 보고하고 오늘 중 회신 가능한지 조율하겠습니다.",
   "en": "I will brief the manager and arrange a call back if possible today."
  },
  {
   "r": "B",
   "ja": "記録をメールで残してください。",
   "jr": "きろくを メールで のこしてください。",
   "ko": "기록을 이메일로 남겨 주세요.",
   "en": "Please document this by email."
  },
  {
   "r": "A",
   "ja": "発注番号、不足数、次の連絡予定をメールにまとめて送ります。",
   "jr": "はっちゅうばんごう、ふそくすう、つぎの れんらくよていを メールに まとめて おくります。",
   "ko": "발주번호·부족 수량·다음 연락 예정 시간을 이메일로 정리해 보내겠습니다.",
   "en": "I will email the order number, missing quantities and next update time."
  },
  {
   "r": "B",
   "ja": "よろしくお願いします。",
   "jr": "よろしく おねがいします。",
   "ko": "부탁드립니다.",
   "en": "Thank you."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「届いた商品が発注内容と違います。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “도착한 상품이 주문 내용과 다릅니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “The delivered items do not match our order.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "名前のどの部分が違っていますか。",
     "ko": "이름의 어느 부분이 다른가요?",
     "en": "Which part of the name is different?"
    },
    {
     "ja": "ご迷惑をおかけして申し訳ございません。",
     "ko": "불편을 드려 죄송합니다.",
     "en": "I apologise for the inconvenience."
    },
    {
     "ja": "お調べします。搭乗券を見せていただけますか。",
     "ko": "확인해 드리겠습니다. 탑승권을 보여 주시겠어요?",
     "en": "Let me check for you. May I see your boarding pass?"
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「今日中に回答をいただけますか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “오늘 안에 답변받을 수 있나요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Can you give me an answer today?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "本日十五時までに調査の進捗をご連絡します。解決時刻はまだ確約できません。",
     "ko": "오늘 15시까지 조사 진행 상황을 연락드리겠습니다. 해결 시각은 아직 확약할 수 없습니다.",
     "en": "I will update you by 3 p.m. today, though I cannot promise a resolution time."
    },
    {
     "ja": "ご乗車の路線と時刻を教えてください。",
     "ko": "탑승 노선과 시간을 알려 주세요.",
     "en": "Which line were you on, and at what time?"
    },
    {
     "ja": "どの食材にアレルギーがありますか。",
     "ko": "어떤 식재료에 알레르기가 있으신가요?",
     "en": "Which ingredients are you allergic to?"
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「記録をメールで残してください。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “기록을 이메일로 남겨 주세요.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Please document this by email.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "発注番号、不足数、次の連絡予定をメールにまとめて送ります。",
     "ko": "발주번호·부족 수량·다음 연락 예정 시간을 이메일로 정리해 보내겠습니다.",
     "en": "I will email the order number, missing quantities and next update time."
    },
    {
     "ja": "朝早く空港へ返却したいです。",
     "ko": "아침 일찍 공항에 반납하고 싶습니다.",
     "en": "I want to return the car at the airport early in the morning."
    },
    {
     "ja": "現在、服用している薬はありますか。",
     "ko": "현재 복용 중인 약이 있나요?",
     "en": "Are you taking any medicines now?"
    }
   ],
   "a": 0
  }
 ]
},
{
 "id": "office-handover-1",
 "cat": "office",
 "lv": 3,
 "title": {
  "ja": "担当業務の引き継ぎ",
  "ko": "담당 업무 인수인계",
  "en": "Handing over responsibilities"
 },
 "scene": {
  "ja": "異動する社員が後任者に業務を引き継ぐ。",
  "ko": "이동하는 직원이 후임자에게 업무를 인계한다.",
  "en": "An employee hands over work to a successor."
 },
 "roles": {
  "A": {
   "ja": "前任担当",
   "ko": "전임 담당자",
   "en": "Outgoing employee"
  },
  "B": {
   "ja": "後任担当",
   "ko": "후임 담당자",
   "en": "Incoming employee"
  }
 },
 "ai": {
  "goal": {
   "ja": "優先業務と未処理事項を整理して共有する。",
   "ko": "우선 업무와 미처리 항목을 정리해 공유한다.",
   "en": "Review priority tasks and open items."
  },
  "twist": {
   "ja": "後任者が共有資料へのアクセス権を持っていない。",
   "ko": "후임자의 공유 자료 접근 권한이 없다.",
   "en": "The incoming employee lacks access to shared documents."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "本日から引き継ぎを始めましょう。",
   "jr": "ほんじつから ひきつぎを はじめましょう。",
   "ko": "오늘부터 인수인계를 시작합시다.",
   "en": "Let us start the handover today."
  },
  {
   "r": "B",
   "ja": "まず何を確認すればいいですか。",
   "jr": "まず なにを かくにんすれば いいですか。",
   "ko": "먼저 무엇을 확인하면 될까요?",
   "en": "What should I review first?"
  },
  {
   "r": "A",
   "ja": "まず今日中に対応が必要な二件から説明します。",
   "jr": "まず きょうじゅうに たいおうが ひつような にけんから せつめいします。",
   "ko": "우선 오늘 안에 처리할 두 건부터 설명하겠습니다.",
   "en": "Let us start with the two items due today.",
   "alt": [
    {
     "ja": "まずは、今日中に対応しないといけない二件から説明しますね。",
     "jr": "まずは、きょうじゅうに たいおう しないと いけない にけんから せつめい しますね。",
     "ko": "먼저 오늘 안에 처리해야 하는 두 건부터 설명할게요.",
     "en": "Let me start with the two items that need handling today."
    }
   ]
  },
  {
   "r": "B",
   "ja": "未処理の案件はありますか。",
   "jr": "みしょりの あんけんは ありますか。",
   "ko": "미처리된 안건이 있나요?",
   "en": "Are there any outstanding tasks?"
  },
  {
   "r": "A",
   "ja": "未処理は三件です。担当者と期限をこの一覧に書いてあります。",
   "jr": "みしょりは さんけんです。たんとうしゃと きげんを この いちらんに かいてあります。",
   "ko": "미처리는 세 건이며 담당자와 기한을 목록에 적어 두었습니다.",
   "en": "Three items are outstanding; the owners and deadlines are in this tracker."
  },
  {
   "r": "B",
   "ja": "資料はどこに保存されていますか。",
   "jr": "しりょうは どこに ほぞんされていますか。",
   "ko": "자료는 어디에 저장되어 있나요?",
   "en": "Where are the documents stored?"
  },
  {
   "r": "A",
   "ja": "共有フォルダーの「引き継ぎ」内に、案件別の資料があります。",
   "jr": "きょうゆうフォルダーの「ひきつぎ」ないに、あんけんべつの しりょうが あります。",
   "ko": "공유 폴더의 ‘인수인계’ 안에 건별 자료가 있습니다.",
   "en": "Each case has a file in the shared folder under “Handover.”",
   "alt": [
    {
     "ja": "共有フォルダーの「引き継ぎ」に、案件ごとに資料をまとめてあります。",
     "jr": "きょうゆう フォルダーの「ひきつぎ」に、あんけん ごとに しりょうを まとめて あります。",
     "ko": "공유 폴더의 ‘인수인계’에 건별로 자료를 정리해 두었어요.",
     "en": "The materials are organized by case in the “Handover” shared folder."
    }
   ]
  },
  {
   "r": "B",
   "ja": "そのフォルダーを開けないようです。",
   "jr": "その フォルダーを ひらけないようです。",
   "ko": "그 폴더가 열리지 않는 것 같습니다.",
   "en": "It seems I cannot open that folder."
  },
  {
   "r": "A",
   "ja": "アクセス権は情報システム担当に申請してください。私からも連絡します。",
   "jr": "アクセスけんは じょうほうシステムたんとうに しんせいしてください。わたしからも れんらくします。",
   "ko": "접근 권한은 정보시스템 담당에게 신청해 주세요. 저도 연락하겠습니다.",
   "en": "Please request access from IT. I will contact them too.",
   "alt": [
    {
     "ja": "アクセス権は情報システム担当に申請してください。私からも一言伝えておきます。",
     "jr": "アクセスけんは じょうほう システム たんとうに しんせい して ください。わたしからも ひとこと つたえて おきます。",
     "ko": "접근 권한은 정보시스템 담당에게 신청해 주세요. 저도 한마디 해 둘게요.",
     "en": "Please request access from IT. I’ll mention it to them as well."
    }
   ]
  },
  {
   "r": "B",
   "ja": "顧客との連絡履歴もありますか。",
   "jr": "こきゃくとの れんらくりれきも ありますか。",
   "ko": "고객 연락 이력도 있나요?",
   "en": "Are past client communications available?"
  },
  {
   "r": "A",
   "ja": "閲覧可能な範囲で共有します。",
   "jr": "えつらんかのうな はんいで きょうゆうします。",
   "ko": "열람 가능한 범위에서 공유하겠습니다.",
   "en": "I will share what you are authorised to access."
  },
  {
   "r": "B",
   "ja": "引き継ぎ後も質問できますか。",
   "jr": "ひきつぎごも しつもんできますか。",
   "ko": "인수인계 후에도 질문해도 될까요?",
   "en": "Can I ask questions after the handover?"
  },
  {
   "r": "A",
   "ja": "引き継ぎ後の質問は、社内チャットで私と上司をタグ付けしてください。",
   "jr": "ひきつぎごの しつもんは、しゃないチャットで わたしと じょうしを タグづけしてください。",
   "ko": "인수인계 후 질문은 사내 채팅에서 저와 상사를 태그해 주세요.",
   "en": "After handover, tag me and our manager in the work chat."
  },
  {
   "r": "B",
   "ja": "よろしくお願いします。",
   "jr": "よろしく おねがいします。",
   "ko": "잘 부탁드립니다.",
   "en": "Thank you."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「まず何を確認すればいいですか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “먼저 무엇을 확인하면 될까요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “What should I review first?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "まず今日中に対応が必要な二件から説明します。",
     "ko": "우선 오늘 안에 처리할 두 건부터 설명하겠습니다.",
     "en": "Let us start with the two items due today."
    },
    {
     "ja": "いらっしゃいませ。ご注文はお決まりですか。",
     "ko": "어서 오세요. 주문 정하셨나요?",
     "en": "Welcome. Are you ready to order?"
    },
    {
     "ja": "先生に伝言をお願いできますか。",
     "ko": "선생님께 전달 부탁드려도 될까요?",
     "en": "Could you pass a message to the teacher?"
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「そのフォルダーを開けないようです。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “그 폴더가 열리지 않는 것 같습니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “It seems I cannot open that folder.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "みどり線の分は、あちらの改札でお渡ししています。",
     "ko": "미도리선 것은 저쪽 개찰구에서 드리고 있습니다.",
     "en": "For the Midori Line, you can get one at the gates over there."
    },
    {
     "ja": "いらっしゃいませ。ご注文はお決まりですか。",
     "ko": "어서 오세요. 주문 정하셨나요?",
     "en": "Welcome. Are you ready to order?"
    },
    {
     "ja": "アクセス権は情報システム担当に申請してください。私からも連絡します。",
     "ko": "접근 권한은 정보시스템 담당에게 신청해 주세요. 저도 연락하겠습니다.",
     "en": "Please request access from IT. I will contact them too."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「引き継ぎ後も質問できますか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “인수인계 후에도 질문해도 될까요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Can I ask questions after the handover?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "一階の六番乗り場から出ます。",
     "ko": "1층 6번 승차장에서 출발합니다.",
     "en": "It leaves from stop six on the ground floor."
    },
    {
     "ja": "保険証と、お薬手帳があればお持ちください。",
     "ko": "보험증과, 약 수첩이 있으면 가져와 주세요.",
     "en": "Please bring your health insurance card, and your medication record book if you have one."
    },
    {
     "ja": "引き継ぎ後の質問は、社内チャットで私と上司をタグ付けしてください。",
     "ko": "인수인계 후 질문은 사내 채팅에서 저와 상사를 태그해 주세요.",
     "en": "After handover, tag me and our manager in the work chat."
    }
   ],
   "a": 2
  }
 ]
},
{
 "id": "office-recruitment-interview-1",
 "cat": "office",
 "lv": 2,
 "title": {
  "ja": "採用面接の日程調整",
  "ko": "채용 면접 일정 조정",
  "en": "Coordinating an interview"
 },
 "scene": {
  "ja": "採用担当者が応募者との面接時間を調整する。",
  "ko": "채용 담당자가 지원자와 면접 시간을 조율한다.",
  "en": "A recruiter coordinates an interview with a candidate."
 },
 "roles": {
  "A": {
   "ja": "採用担当",
   "ko": "채용 담당자",
   "en": "Recruiter"
  },
  "B": {
   "ja": "応募者",
   "ko": "지원자",
   "en": "Candidate"
  }
 },
 "ai": {
  "goal": {
   "ja": "候補日時と面接形式を確認する。",
   "ko": "후보 일정과 면접 방식을 확인한다.",
   "en": "Confirm available times and the interview format."
  },
  "twist": {
   "ja": "応募者がオンライン面接と時差の確認を希望する。",
   "ko": "지원자가 온라인 면접과 시차 확인을 요청한다.",
   "en": "The candidate requests a video interview and time-zone clarification."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "ご応募いただきありがとうございます。",
   "jr": "ごおうぼいただき ありがとうございます。",
   "ko": "지원해 주셔서 감사합니다.",
   "en": "Thank you for your application."
  },
  {
   "r": "B",
   "ja": "面接の日程について伺いたいです。",
   "jr": "めんせつの にっていについて うかがいたいです。",
   "ko": "면접 일정에 대해 문의하고 싶습니다.",
   "en": "I would like to ask about the interview schedule."
  },
  {
   "r": "A",
   "ja": "ご都合のよい日時はありますか。",
   "jr": "ごつごうの よい にちじは ありますか。",
   "ko": "편하신 날짜와 시간이 있나요?",
   "en": "What dates and times work for you?",
   "alt": [
    {
     "ja": "ご希望の日時はありますか。",
     "jr": "ごきぼうの にちじは ありますか。",
     "ko": "희망하시는 일시가 있나요?",
     "en": "Do you have a preferred date and time?"
    }
   ]
  },
  {
   "r": "B",
   "ja": "来週の木曜日なら可能です。",
   "jr": "らいしゅうの もくようびなら かのうです。",
   "ko": "다음 주 목요일이면 가능합니다.",
   "en": "I am available next Thursday."
  },
  {
   "r": "A",
   "ja": "木曜日なら午後三時の枠が空いています。",
   "jr": "もくようびなら ごご さんじの わくが あいています。",
   "ko": "목요일이면 오후 3시 시간이 비어 있습니다.",
   "en": "We have a slot at 3 p.m. on Thursday.",
   "alt": [
    {
     "ja": "木曜日でしたら、午後三時が空いております。",
     "jr": "もくようび でしたら、ごご さんじが あいて おります。",
     "ko": "목요일이라면 오후 3시가 비어 있습니다.",
     "en": "On Thursday, 3 p.m. is available."
    }
   ]
  },
  {
   "r": "B",
   "ja": "オンラインで受けることはできますか。",
   "jr": "オンラインで うけることは できますか。",
   "ko": "온라인으로 면접을 볼 수 있나요?",
   "en": "Would a video interview be possible?"
  },
  {
   "r": "A",
   "ja": "オンライン面接もできます。参加用のリンクはメールでお送りします。",
   "jr": "オンラインめんせつも できます。さんかようの リンクは メールで おおくりします。",
   "ko": "온라인 면접도 가능합니다. 참가 링크는 이메일로 보내드립니다.",
   "en": "An online interview is possible. We will email you the meeting link."
  },
  {
   "r": "B",
   "ja": "今は海外に滞在しています。",
   "jr": "いまは かいがいに たいざいしています。",
   "ko": "현재 해외에 머무르고 있습니다.",
   "en": "I am currently staying overseas."
  },
  {
   "r": "A",
   "ja": "日本時間の午後三時です。現地の時差を確認してご案内します。",
   "jr": "にほんじかんの ごご さんじです。げんちの じさを かくにんして ごあんないします。",
   "ko": "일본 시간 오후 3시입니다. 현지 시차를 확인해 안내하겠습니다.",
   "en": "That is 3 p.m. Japan time. We will confirm your local time zone."
  },
  {
   "r": "B",
   "ja": "準備する資料はありますか。",
   "jr": "じゅんびする しりょうは ありますか。",
   "ko": "준비할 자료가 있나요?",
   "en": "Should I prepare any documents?"
  },
  {
   "r": "A",
   "ja": "履歴書と職務経歴書を前日までにメールで送ってください。",
   "jr": "りれきしょと しょくむけいれきしょを ぜんじつまでに メールで おくってください。",
   "ko": "이력서와 경력기술서를 전날까지 이메일로 보내 주세요.",
   "en": "Please email your résumé and work history by the day before.",
   "alt": [
    {
     "ja": "履歴書と職務経歴書を、前日までにメールでお送りください。",
     "jr": "りれきしょと しょくむ けいれきしょを、ぜんじつ までに メールで おおくり ください。",
     "ko": "이력서와 경력기술서를 전날까지 이메일로 보내 주세요.",
     "en": "Please email your résumé and work history by the day before."
    }
   ]
  },
  {
   "r": "B",
   "ja": "確定したらメールをいただけますか。",
   "jr": "かくていしたら メールを いただけますか。",
   "ko": "확정되면 이메일로 알려주실 수 있나요?",
   "en": "Could you email me once it is confirmed?"
  },
  {
   "r": "A",
   "ja": "はい。面接時刻と参加リンクをまとめてお送りします。",
   "jr": "はい。めんせつじこくと さんかリンクを まとめて おおくりします。",
   "ko": "네. 면접 시각과 참가 링크를 함께 보내드립니다.",
   "en": "Yes. We will send the interview time and joining link together."
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
    "ja": "相手が「面接の日程について伺いたいです。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “면접 일정에 대해 문의하고 싶습니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “I would like to ask about the interview schedule.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "ご都合のよい日時はありますか。",
     "ko": "편하신 날짜와 시간이 있나요?",
     "en": "What dates and times work for you?"
    },
    {
     "ja": "今夜も続いたら連絡します。",
     "ko": "오늘 밤에도 계속되면 연락하겠습니다.",
     "en": "I will contact you if it happens again tonight."
    },
    {
     "ja": "どの食材にアレルギーがありますか。",
     "ko": "어떤 식재료에 알레르기가 있으신가요?",
     "en": "Which ingredients are you allergic to?"
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「今は海外に滞在しています。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “현재 해외에 머무르고 있습니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “I am currently staying overseas.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "今日の日付で発行されますか。",
     "ko": "오늘 날짜로 발급되나요?",
     "en": "Will it show today's date?"
    },
    {
     "ja": "日本時間の午後三時です。現地の時差を確認してご案内します。",
     "ko": "일본 시간 오후 3시입니다. 현지 시차를 확인해 안내하겠습니다.",
     "en": "That is 3 p.m. Japan time. We will confirm your local time zone."
    },
    {
     "ja": "イさんですね。本日の欠席を担任の先生に伝えます。",
     "ko": "이 학생이군요. 오늘 결석을 담임 선생님께 전달하겠습니다.",
     "en": "Thank you. I will inform the homeroom teacher of today’s absence."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「確定したらメールをいただけますか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “확정되면 이메일로 알려주실 수 있나요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Could you email me once it is confirmed?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "青い電車で十分ほど前です。",
     "ko": "파란 전철이었고 약 10분 전입니다.",
     "en": "It was a blue train, about ten minutes ago."
    },
    {
     "ja": "この便は搭乗橋を使う予定なので、階段はありません。",
     "ko": "이 편은 탑승교를 이용할 예정이라 계단은 없습니다.",
     "en": "This flight is scheduled to use a boarding bridge, so there are no stairs."
    },
    {
     "ja": "はい。面接時刻と参加リンクをまとめてお送りします。",
     "ko": "네. 면접 시각과 참가 링크를 함께 보내드립니다.",
     "en": "Yes. We will send the interview time and joining link together."
    }
   ],
   "a": 2
  }
 ]
}
);
