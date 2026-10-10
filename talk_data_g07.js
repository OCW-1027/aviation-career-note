/* ACN 会話練習 追加データ talk_data_g07.js（GPT 2次修正本 talk_data_g07r.js を Claude が検収・修正：会話の流れ、ほかの言い方、確認問題 2026.10.10）。架空の練習用会話。日時・料金は例 */
window.TALK=window.TALK||[];window.TALK.push(
{
 "id": "travel-pharmacy-medicine-1",
 "cat": "travel",
 "lv": 2,
 "title": {
  "ja": "薬局で症状と薬を相談",
  "ko": "약국에서 증상과 약 상담",
  "en": "Asking at a pharmacy"
 },
 "scene": {
  "ja": "旅行先の薬局で薬剤師に相談する。",
  "ko": "여행지 약국에서 약사에게 문의한다.",
  "en": "A traveller consults a pharmacist abroad."
 },
 "roles": {
  "A": {
   "ja": "薬剤師",
   "ko": "약사",
   "en": "Pharmacist"
  },
  "B": {
   "ja": "旅行者",
   "ko": "여행자",
   "en": "Traveller"
  }
 },
 "ai": {
  "goal": {
   "ja": "症状と服薬状況を確認し、安全な相談先を案内する。",
   "ko": "증상과 복용 약을 확인하고 안전한 상담 방법을 안내한다.",
   "en": "Ask about symptoms and current medicines, then advise on safe next steps."
  },
  "twist": {
   "ja": "旅行者が別の薬を服用中だと伝える。",
   "ko": "여행자가 다른 약을 복용 중이라고 말한다.",
   "en": "The traveller mentions an existing medicine."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "いらっしゃいませ。どのようなご相談ですか。",
   "jr": "いらっしゃいませ。どのような ごそうだんですか。",
   "ko": "어서 오세요. 어떤 상담이 필요하신가요?",
   "en": "Welcome. How can I help?"
  },
  {
   "r": "B",
   "ja": "昨日から喉が痛いです。",
   "jr": "きのうから のどが いたいです。",
   "ko": "어제부터 목이 아파요.",
   "en": "My throat has been sore since yesterday."
  },
  {
   "r": "A",
   "ja": "熱やせきはありますか。",
   "jr": "ねつや せきは ありますか。",
   "ko": "열이나 기침도 있나요?",
   "en": "Do you have a fever or a cough?",
   "alt": [
    {
     "ja": "熱はありますか。せきは出ますか。",
     "jr": "ねつは ありますか。せきは でますか。",
     "ko": "열이 있나요? 기침은 나나요?",
     "en": "Do you have a fever? Are you coughing?"
    }
   ]
  },
  {
   "r": "B",
   "ja": "少しせきが出ます。",
   "jr": "すこし せきが でます。",
   "ko": "기침이 조금 나요.",
   "en": "I have a slight cough."
  },
  {
   "r": "A",
   "ja": "熱は測りましたか。",
   "jr": "ねつは はかりましたか。",
   "ko": "열은 재 보셨나요?",
   "en": "Have you taken your temperature?"
  },
  {
   "r": "B",
   "ja": "はい、昨夜は三十七度二分でした。",
   "jr": "はい、ゆうべは さんじゅうななど にぶでした。",
   "ko": "네, 어젯밤에 37.2도였어요.",
   "en": "Yes, it was 37.2°C last night."
  },
  {
   "r": "A",
   "ja": "現在、服用している薬はありますか。",
   "jr": "げんざい、ふくようしている くすりは ありますか。",
   "ko": "현재 복용 중인 약이 있나요?",
   "en": "Are you taking any medicines now?"
  },
  {
   "r": "B",
   "ja": "毎日飲んでいる薬があります。",
   "jr": "まいにち のんでいる くすりが あります。",
   "ko": "매일 먹는 약이 있습니다.",
   "en": "I take a medicine every day."
  },
  {
   "r": "A",
   "ja": "飲み合わせを見るため、いつもの薬の名前を教えてください。",
   "jr": "のみあわせを みるため、いつもの くすりの なまえを おしえてください。",
   "ko": "약물 상호작용을 확인하게 평소 드시는 약 이름을 알려 주세요.",
   "en": "Please tell me the name of your regular medicine so I can check interactions.",
   "alt": [
    {
     "ja": "飲み合わせを確認したいので、いつも飲んでいる薬の名前を教えてください。",
     "jr": "のみあわせを かくにん したいので、いつも のんで いる くすりの なまえを おしえて ください。",
     "ko": "같이 먹어도 되는지 확인하고 싶으니 평소 드시는 약 이름을 알려 주세요.",
     "en": "I’d like to check for interactions, so could you tell me the name of the medicine you take every day?"
    }
   ]
  },
  {
   "r": "B",
   "ja": "薬の名前を見せてもいいですか。",
   "jr": "くすりの なまえを みせても いいですか。",
   "ko": "약 이름을 보여드릴까요?",
   "en": "May I show you the medicine name?"
  },
  {
   "r": "A",
   "ja": "はい。箱かお薬手帳があれば、こちらで一緒に見ましょう。",
   "jr": "はい。はこか おくすりてちょうが あれば、こちらで いっしょに みましょう。",
   "ko": "네. 약 상자나 약 수첩이 있으면 함께 확인하겠습니다.",
   "en": "Yes. If you have the box or medicine record, let us review it together."
  },
  {
   "r": "B",
   "ja": "病院に行ったほうがいいですか。",
   "jr": "びょういんに いったほうが いいですか。",
   "ko": "병원에 가는 게 좋을까요?",
   "en": "Should I see a doctor?"
  },
  {
   "r": "A",
   "ja": "息苦しさや高い熱が出たら、早めに医療機関へ相談してください。",
   "jr": "いきぐるしさや たかい ねつが でたら、はやめに いりょうきかんへ そうだんしてください。",
   "ko": "호흡 곤란이나 고열이 생기면 신속하게 의료기관에 상담하세요.",
   "en": "If you develop breathing trouble or a high fever, seek medical advice promptly.",
   "alt": [
    {
     "ja": "息が苦しくなったり、熱が高くなったりしたら、早めに病院で診てもらってください。",
     "jr": "いきが くるしく なったり、ねつが たかく なったり したら、はやめに びょういんで みて もらって ください。",
     "ko": "숨쉬기 힘들어지거나 열이 높아지면 빨리 병원에서 진찰을 받으세요.",
     "en": "If you have trouble breathing or your fever goes up, please see a doctor soon."
    }
   ]
  },
  {
   "r": "B",
   "ja": "分かりました。ありがとうございます。",
   "jr": "わかりました。ありがとうございます。",
   "ko": "알겠습니다. 감사합니다.",
   "en": "Understood. Thank you."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「昨日から喉が痛いです。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “어제부터 목이 아파요.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “My throat has been sore since yesterday.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "異臭や異音はありませんか。",
     "ko": "이상한 냄새나 소리는 없나요?",
     "en": "Have you noticed any unusual smells or noises?"
    },
    {
     "ja": "熱やせきはありますか。",
     "ko": "열이나 기침도 있나요?",
     "en": "Do you have a fever or a cough?"
    },
    {
     "ja": "明日の夕方は配達できますか。",
     "ko": "내일 저녁에 배송이 가능할까요?",
     "en": "Could you deliver tomorrow evening?"
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「毎日飲んでいる薬があります。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “매일 먹는 약이 있습니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “I take a medicine every day.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "お調べします。搭乗券を見せていただけますか。",
     "ko": "확인해 드리겠습니다. 탑승권을 보여 주시겠어요?",
     "en": "Let me check for you. May I see your boarding pass?"
    },
    {
     "ja": "今日中に回答をいただけますか。",
     "ko": "오늘 안에 답변받을 수 있나요?",
     "en": "Can you give me an answer today?"
    },
    {
     "ja": "飲み合わせを見るため、いつもの薬の名前を教えてください。",
     "ko": "약물 상호작용을 확인하게 평소 드시는 약 이름을 알려 주세요.",
     "en": "Please tell me the name of your regular medicine so I can check interactions."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「病院に行ったほうがいいですか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “병원에 가는 게 좋을까요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Should I see a doctor?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "息苦しさや高い熱が出たら、早めに医療機関へ相談してください。",
     "ko": "호흡 곤란이나 고열이 생기면 신속하게 의료기관에 상담하세요.",
     "en": "If you develop breathing trouble or a high fever, seek medical advice promptly."
    },
    {
     "ja": "毎月の通信料金を見直したいです。",
     "ko": "매달 통신요금을 줄이고 싶습니다.",
     "en": "I want to review my monthly mobile costs."
    },
    {
     "ja": "海外でも手続きできますか。",
     "ko": "해외에서도 신청할 수 있나요?",
     "en": "Can I do that while abroad?"
    }
   ],
   "a": 0
  }
 ]
},
{
 "id": "life-neighbor-noise-1",
 "cat": "life",
 "lv": 2,
 "title": {
  "ja": "隣室の騒音について相談",
  "ko": "옆집 소음 상담",
  "en": "Discussing noise with a neighbour"
 },
 "scene": {
  "ja": "集合住宅で騒音の相談をする。",
  "ko": "공동주택에서 소음 문제를 상담한다.",
  "en": "A resident discusses recurring noise."
 },
 "roles": {
  "A": {
   "ja": "管理担当者",
   "ko": "관리 담당자",
   "en": "Building manager"
  },
  "B": {
   "ja": "住人",
   "ko": "거주자",
   "en": "Resident"
  }
 },
 "ai": {
  "goal": {
   "ja": "状況と時間帯を確認して対応方法を説明する。",
   "ko": "상황과 시간대를 확인하고 대응 방법을 설명한다.",
   "en": "Clarify when the noise occurs and explain the process."
  },
  "twist": {
   "ja": "住人が直接相手に連絡したくないと言う。",
   "ko": "거주자가 직접 이웃에게 연락하고 싶지 않다고 한다.",
   "en": "The resident does not want to contact the neighbour directly."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "本日はどのようなご用件でしょうか。",
   "jr": "ほんじつは どのような ごようけんでしょうか。",
   "ko": "오늘은 어떤 일로 오셨나요?",
   "en": "How can I help you today?"
  },
  {
   "r": "B",
   "ja": "夜になると隣の部屋が騒がしいんです。",
   "jr": "よるに なると となりの へやが さわがしいんです。",
   "ko": "밤이 되면 옆집이 시끄럽습니다.",
   "en": "The apartment next door gets noisy at night."
  },
  {
   "r": "A",
   "ja": "何時ごろから音がしますか。",
   "jr": "なんじごろから おとが しますか。",
   "ko": "몇 시쯤부터 소음이 나나요?",
   "en": "Around what time does it start?",
   "alt": [
    {
     "ja": "音がするのは、何時ごろからですか。",
     "jr": "おとが するのは、なんじ ごろからですか。",
     "ko": "소리가 나는 건 몇 시쯤부터인가요?",
     "en": "Around what time does the noise start?"
    }
   ]
  },
  {
   "r": "B",
   "ja": "昨日は十一時を過ぎても続いていました。",
   "jr": "きのうは じゅういちじを すぎても つづいていました。",
   "ko": "어제는 11시가 넘어도 계속됐습니다.",
   "en": "It continued past eleven last night."
  },
  {
   "r": "A",
   "ja": "ご不便をおかけして申し訳ありません。",
   "jr": "ごふべんを おかけして もうしわけ ありません。",
   "ko": "불편을 드려 죄송합니다.",
   "en": "I am sorry for the disturbance."
  },
  {
   "r": "B",
   "ja": "直接注意したほうがいいでしょうか。",
   "jr": "ちょくせつ ちゅういしたほうが いいでしょうか。",
   "ko": "직접 주의를 줘야 하나요?",
   "en": "Should I speak to them directly?"
  },
  {
   "r": "A",
   "ja": "直接お話ししなくても大丈夫です。こちらから全室向けに注意文を出せます。",
   "jr": "ちょくせつ おはなししなくても だいじょうぶです。こちらから ぜんしつむけに ちゅういぶんを だせます。",
   "ko": "직접 말씀하지 않으셔도 됩니다. 저희가 전체 세대에 안내문을 보낼 수 있습니다.",
   "en": "You do not have to confront them. We can send a general notice to residents.",
   "alt": [
    {
     "ja": "直接言わなくても大丈夫ですよ。管理会社から全戸に注意のお知らせを出せます。",
     "jr": "ちょくせつ いわなくても だいじょうぶですよ。かんりがいしゃから ぜんこに ちゅういの おしらせを だせます。",
     "ko": "직접 말씀하지 않으셔도 괜찮아요. 관리회사에서 모든 세대에 주의 안내문을 보낼 수 있습니다.",
     "en": "You don’t need to speak to them yourself. We can send a notice to all residents."
    }
   ]
  },
  {
   "r": "B",
   "ja": "できれば私の名前を出さないでください。",
   "jr": "できれば わたしの なまえを ださないでください。",
   "ko": "가능하면 제 이름은 밝히지 말아 주세요.",
   "en": "Please do not mention my name if possible."
  },
  {
   "r": "A",
   "ja": "お名前は出しませんので、ご安心ください。",
   "jr": "おなまえは だしませんので、ごあんしん ください。",
   "ko": "성함은 밝히지 않을 테니 안심하세요.",
   "en": "We won’t mention your name, so don’t worry."
  },
  {
   "r": "B",
   "ja": "記録を残したほうがいいですか。",
   "jr": "きろくを のこしたほうが いいですか。",
   "ko": "기록을 남기는 것이 좋을까요?",
   "en": "Would it help to keep a record?"
  },
  {
   "r": "A",
   "ja": "日時と内容を控えていただけると助かります。",
   "jr": "にちじと ないようを ひかえていただけると たすかります。",
   "ko": "일시와 내용을 기록해 주시면 도움이 됩니다.",
   "en": "A record of dates and details would help.",
   "alt": [
    {
     "ja": "何日の何時ごろ、どんな音だったかをメモしておいてください。",
     "jr": "なんにちの なんじ ごろ、どんな おと だったかを メモ して おいて ください。",
     "ko": "며칠 몇 시쯤 어떤 소리였는지 메모해 두세요.",
     "en": "Please note down the date, time and what kind of noise it was."
    }
   ]
  },
  {
   "r": "B",
   "ja": "今夜も続いたら連絡します。",
   "jr": "こんやも つづいたら れんらくします。",
   "ko": "오늘 밤에도 계속되면 연락하겠습니다.",
   "en": "I will contact you if it happens again tonight."
  },
  {
   "r": "A",
   "ja": "夜間は、この用紙の下にある緊急窓口へお電話ください。通常の受付は朝九時からです。",
   "jr": "やかんは、この ようしの したに ある きんきゅう まどぐちへ おでんわ ください。つうじょうの うけつけは あさ くじからです。",
   "ko": "야간에는 이 안내문 아래에 있는 긴급 창구로 전화해 주세요. 일반 접수는 아침 9시부터입니다.",
   "en": "At night, please call the emergency number at the bottom of this sheet. Our regular desk opens at 9 a.m."
  },
  {
   "r": "B",
   "ja": "よろしくお願いします。",
   "jr": "よろしく おねがいします。",
   "ko": "잘 부탁드립니다.",
   "en": "Thank you for your help."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「夜になると隣の部屋が騒がしいんです。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “밤이 되면 옆집이 시끄럽습니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “The apartment next door gets noisy at night.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "来週の木曜日なら可能です。",
     "ko": "다음 주 목요일이면 가능합니다.",
     "en": "I am available next Thursday."
    },
    {
     "ja": "空港からはタクシーで向かいます。",
     "ko": "공항에서 택시로 이동합니다.",
     "en": "I will take a taxi from the airport."
    },
    {
     "ja": "何時ごろから音がしますか。",
     "ko": "몇 시쯤부터 소음이 나나요?",
     "en": "Around what time does it start?"
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「できれば私の名前を出さないでください。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “가능하면 제 이름은 밝히지 말아 주세요.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Please do not mention my name if possible.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "最後に使った場所は覚えていますか。",
     "ko": "마지막으로 사용한 장소를 기억하시나요?",
     "en": "Do you remember where you last used it?"
    },
    {
     "ja": "お名前は出しませんので、ご安心ください。",
     "ko": "성함은 밝히지 않을 테니 안심하세요.",
     "en": "We won’t mention your name, so don’t worry."
    },
    {
     "ja": "承認は誰にお願いすればいいですか。",
     "ko": "승인은 누구에게 받아야 하나요?",
     "en": "Who needs to approve the claim?"
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「今夜も続いたら連絡します。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “오늘 밤에도 계속되면 연락하겠습니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “I will contact you if it happens again tonight.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "念のため、お荷物の特徴を詳しく伺えますか。",
     "ko": "확인을 위해 수하물 특징을 자세히 여쭤봐도 될까요?",
     "en": "Could you describe your bag in more detail, just to be sure?"
    },
    {
     "ja": "夜間は、この用紙の下にある緊急窓口へお電話ください。通常の受付は朝九時からです。",
     "ko": "야간에는 이 안내문 아래에 있는 긴급 창구로 전화해 주세요. 일반 접수는 아침 9시부터입니다.",
     "en": "At night, please call the emergency number at the bottom of this sheet. Our regular desk opens at 9 a.m."
    },
    {
     "ja": "事故のときはまず何をすればいいですか。",
     "ko": "사고가 나면 먼저 무엇을 해야 하나요?",
     "en": "What should I do first if there is an accident?"
    }
   ],
   "a": 1
  }
 ]
},
{
 "id": "life-clinic-appointment-1",
 "cat": "life",
 "lv": 2,
 "title": {
  "ja": "クリニックの予約変更",
  "ko": "병원 예약 변경",
  "en": "Rescheduling a clinic appointment"
 },
 "scene": {
  "ja": "診療予約を変更するため受付に電話する。",
  "ko": "진료 예약을 변경하려고 접수처에 전화한다.",
  "en": "A patient calls to reschedule a medical appointment."
 },
 "roles": {
  "A": {
   "ja": "受付担当",
   "ko": "접수 담당자",
   "en": "Receptionist"
  },
  "B": {
   "ja": "患者",
   "ko": "환자",
   "en": "Patient"
  }
 },
 "ai": {
  "goal": {
   "ja": "本人確認と変更可能な時間を案内する。",
   "ko": "본인 확인 후 변경 가능한 시간을 안내한다.",
   "en": "Verify the appointment and explain available times."
  },
  "twist": {
   "ja": "患者が通訳の手配について相談する。",
   "ko": "환자가 통역 지원을 문의한다.",
   "en": "The patient asks about interpretation support."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "お電話ありがとうございます。受付です。",
   "jr": "おでんわ ありがとうございます。うけつけです。",
   "ko": "전화 감사합니다. 접수처입니다.",
   "en": "Thank you for calling reception."
  },
  {
   "r": "B",
   "ja": "明日の予約を変更したいです。",
   "jr": "あしたの よやくを へんこうしたいです。",
   "ko": "내일 예약을 변경하고 싶어요.",
   "en": "I need to change tomorrow's appointment."
  },
  {
   "r": "A",
   "ja": "予約のお名前を伺えますか。",
   "jr": "よやくの おなまえを うかがえますか。",
   "ko": "예약자 성함을 알려주시겠어요?",
   "en": "May I have the name on the booking?",
   "alt": [
    {
     "ja": "ご予約のお名前をお願いします。",
     "jr": "ごよやくの おなまえを おねがい します。",
     "ko": "예약하신 분 성함을 알려 주세요.",
     "en": "May I have the name for the appointment?"
    }
   ]
  },
  {
   "r": "B",
   "ja": "パクと申します。",
   "jr": "パクと もうします。",
   "ko": "박이라고 합니다.",
   "en": "My name is Park."
  },
  {
   "r": "A",
   "ja": "明日十時のご予約ですね。午後への変更をご希望ですか。",
   "jr": "あした じゅうじの ごよやくですね。ごごへの へんこうを ごきぼうですか。",
   "ko": "내일 오전 10시 예약이시군요. 오후로 변경하시겠어요?",
   "en": "You are booked for ten tomorrow. Would you prefer the afternoon?"
  },
  {
   "r": "B",
   "ja": "午後の時間は空いていますか。",
   "jr": "ごごの じかんは あいていますか。",
   "ko": "오후 시간에 빈자리가 있나요?",
   "en": "Is there an afternoon time available?"
  },
  {
   "r": "A",
   "ja": "明日の午後は埋まっておりまして、木曜日でしたら十四時半か十六時が空いています。",
   "jr": "あしたの ごごは うまって おりまして、もくようび でしたら じゅうよじはんか じゅうろくじが あいて います。",
   "ko": "내일 오후는 예약이 다 찼고, 목요일이면 14시 30분이나 16시가 비어 있습니다.",
   "en": "Tomorrow afternoon is fully booked, but on Thursday we have 2:30 or 4:00 p.m."
  },
  {
   "r": "B",
   "ja": "では、木曜の十四時半でお願いします。あと、日本語が不安なので、通訳は頼めますか。",
   "jr": "では、もくようの じゅうよじはんで おねがい します。あと、にほんごが ふあん なので、つうやくは たのめますか。",
   "ko": "그럼 목요일 14시 30분으로 부탁드려요. 그리고 일본어가 서툴러서 그런데 통역을 부탁할 수 있을까요?",
   "en": "Then Thursday at 2:30, please. Also, I’m not confident in Japanese—can I request an interpreter?"
  },
  {
   "r": "A",
   "ja": "通訳は予約制です。必要な言語を伺って手配できるか調べます。",
   "jr": "つうやくは よやくせいです。ひつような げんごを うかがって てはいできるか しらべます。",
   "ko": "통역은 예약제입니다. 필요한 언어를 여쭙고 배정 가능한지 확인하겠습니다.",
   "en": "Interpretation requires booking. Tell me the language and I will check availability.",
   "alt": [
    {
     "ja": "通訳は予約が必要です。何語がご希望か伺って、手配できるか確認しますね。",
     "jr": "つうやくは よやくが ひつようです。なにごが ごきぼうか うかがって、てはい できるか かくにん しますね。",
     "ko": "통역은 예약이 필요합니다. 어느 언어를 원하시는지 여쭤보고 준비할 수 있는지 확인할게요.",
     "en": "Interpreters need to be booked in advance. Let me ask which language you need and check if we can arrange one."
    }
   ]
  },
  {
   "r": "B",
   "ja": "予約時間はメールでも届きますか。",
   "jr": "よやくじかんは メールでも とどきますか。",
   "ko": "예약 시간이 이메일로도 오나요?",
   "en": "Will I receive the appointment time by email?"
  },
  {
   "r": "A",
   "ja": "はい。ご登録のメールアドレスへ変更内容を送ります。",
   "jr": "はい。ごとうろくの メールアドレスへ へんこうないようを おくります。",
   "ko": "네, 등록된 이메일로 변경 내용을 보내드립니다.",
   "en": "Yes, we will email the change to your registered address.",
   "alt": [
    {
     "ja": "はい。登録されているメールアドレスに、変更後の日時をお送りします。",
     "jr": "はい。とうろく されて いる メールアドレスに、へんこうごの にちじを おおくり します。",
     "ko": "네. 등록하신 이메일 주소로 변경된 일시를 보내 드립니다.",
     "en": "Yes. We’ll send the new date and time to your registered email address."
    }
   ]
  },
  {
   "r": "B",
   "ja": "必要な持ち物はありますか。",
   "jr": "ひつような もちものは ありますか。",
   "ko": "필요한 준비물이 있나요?",
   "en": "What should I bring?"
  },
  {
   "r": "A",
   "ja": "保険証と、お薬手帳があればお持ちください。",
   "jr": "ほけんしょうと、おくすり てちょうが あれば おもち ください。",
   "ko": "보험증과, 약 수첩이 있으면 가져와 주세요.",
   "en": "Please bring your health insurance card, and your medication record book if you have one."
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
    "ja": "相手が「明日の予約を変更したいです。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “내일 예약을 변경하고 싶어요.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “I need to change tomorrow's appointment.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "予約のお名前を伺えますか。",
     "ko": "예약자 성함을 알려주시겠어요?",
     "en": "May I have the name on the booking?"
    },
    {
     "ja": "夜中でもチェックインできますか。",
     "ko": "한밤중에도 체크인할 수 있나요?",
     "en": "Can I check in after midnight?"
    },
    {
     "ja": "昨日から喉が痛いです。",
     "ko": "어제부터 목이 아파요.",
     "en": "My throat has been sore since yesterday."
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「では、木曜の十四時半でお願いします。あと、日本語が不安なので、通訳は頼めますか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “그럼 목요일 14시 30분으로 부탁드려요. 그리고 일본어가 서툴러서 그런데 통역을 부탁할 수 있을까요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Then Thursday at 2:30, please. Also, I’m not confident in Japanese—can I request an interpreter?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "海外の参加者には、現地時刻を併記して候補を送りましょう。",
     "ko": "해외 참가자에게는 현지 시각을 함께 적어 후보 일정을 보내죠.",
     "en": "Let us include the local time for the overseas participant."
    },
    {
     "ja": "通訳は予約制です。必要な言語を伺って手配できるか調べます。",
     "ko": "통역은 예약제입니다. 필요한 언어를 여쭙고 배정 가능한지 확인하겠습니다.",
     "en": "Interpretation requires booking. Tell me the language and I will check availability."
    },
    {
     "ja": "共有フォルダーの「引き継ぎ」内に、案件別の資料があります。",
     "ko": "공유 폴더의 ‘인수인계’ 안에 건별 자료가 있습니다.",
     "en": "Each case has a file in the shared folder under “Handover.”"
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「必要な持ち物はありますか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “필요한 준비물이 있나요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “What should I bring?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "病院に行ったほうがいいですか。",
     "ko": "병원에 가는 게 좋을까요?",
     "en": "Should I see a doctor?"
    },
    {
     "ja": "保険証と、お薬手帳があればお持ちください。",
     "ko": "보험증과, 약 수첩이 있으면 가져와 주세요.",
     "en": "Please bring your health insurance card, and your medication record book if you have one."
    },
    {
     "ja": "責任者からも説明してほしいです。",
     "ko": "책임자의 설명도 듣고 싶습니다.",
     "en": "I would like an explanation from a manager too."
    }
   ],
   "a": 1
  }
 ]
},
{
 "id": "life-parcel-redelivery-1",
 "cat": "life",
 "lv": 1,
 "title": {
  "ja": "荷物の再配達を依頼",
  "ko": "택배 재배송 요청",
  "en": "Arranging parcel redelivery"
 },
 "scene": {
  "ja": "不在票を見た住人が再配達を依頼する。",
  "ko": "부재중 안내문을 본 거주자가 재배송을 요청한다.",
  "en": "A resident requests redelivery of a missed parcel."
 },
 "roles": {
  "A": {
   "ja": "配送会社担当",
   "ko": "배송사 직원",
   "en": "Delivery agent"
  },
  "B": {
   "ja": "受取人",
   "ko": "수취인",
   "en": "Recipient"
  }
 },
 "ai": {
  "goal": {
   "ja": "伝票番号と受取可能な日時を確認する。",
   "ko": "운송장 번호와 수령 가능한 시간을 확인한다.",
   "en": "Confirm the parcel reference and available delivery window."
  },
  "twist": {
   "ja": "受取人が宅配ボックスを希望する。",
   "ko": "수취인이 택배 보관함 수령을 원한다.",
   "en": "The recipient asks about parcel lockers."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "再配達の受付でございます。",
   "jr": "さいはいたつの うけつけで ございます。",
   "ko": "재배송 접수처입니다.",
   "en": "You have reached redelivery services."
  },
  {
   "r": "B",
   "ja": "不在票が入っていたので電話しました。",
   "jr": "ふざいひょうが はいっていたので でんわしました。",
   "ko": "부재중 안내문이 있어서 전화했습니다.",
   "en": "I received a missed-delivery notice."
  },
  {
   "r": "A",
   "ja": "伝票番号を教えてください。",
   "jr": "でんぴょうばんごうを おしえてください。",
   "ko": "운송장 번호를 알려 주세요.",
   "en": "Please tell me the tracking number.",
   "alt": [
    {
     "ja": "不在票に書いてある伝票番号をお願いします。",
     "jr": "ふざいひょうに かいて ある でんぴょう ばんごうを おねがい します。",
     "ko": "부재 안내표에 적힌 송장 번호를 알려 주세요.",
     "en": "Could you tell me the tracking number on the delivery notice?"
    }
   ]
  },
  {
   "r": "B",
   "ja": "こちらの番号です。",
   "jr": "こちらの ばんごうです。",
   "ko": "여기 적힌 번호입니다.",
   "en": "Here is the number."
  },
  {
   "r": "A",
   "ja": "はい、こちらは冷蔵でお届けするクール便ですね。",
   "jr": "はい、こちらは れいぞうで おとどけする クールびんですね。",
   "ko": "네, 이 택배는 냉장 배송하는 쿨택배입니다.",
   "en": "I see. This is a refrigerated parcel."
  },
  {
   "r": "B",
   "ja": "明日の夕方は配達できますか。",
   "jr": "あしたの ゆうがたは はいたつできますか。",
   "ko": "내일 저녁에 배송이 가능할까요?",
   "en": "Could you deliver tomorrow evening?"
  },
  {
   "r": "A",
   "ja": "明日なら十八時から二十時、十九時から二十一時の枠があります。",
   "jr": "あしたなら じゅうはちじから にじゅうじ、じゅうくじから にじゅういちじの わくが あります。",
   "ko": "내일은 18~20시 또는 19~21시 시간대가 있습니다.",
   "en": "Tomorrow we have 6–8 p.m. or 7–9 p.m. delivery windows.",
   "alt": [
    {
     "ja": "明日でしたら、十八時から二十時か、十九時から二十一時のどちらかになります。",
     "jr": "あした でしたら、じゅうはちじから にじゅうじか、じゅうくじから にじゅういちじの どちらかに なります。",
     "ko": "내일이라면 18시~20시, 또는 19시~21시 중 하나입니다.",
     "en": "Tomorrow, we can deliver between 6 and 8 p.m. or between 7 and 9 p.m."
    }
   ]
  },
  {
   "r": "B",
   "ja": "宅配ボックスに入れてもらえますか。",
   "jr": "たくはいボックスに いれてもらえますか。",
   "ko": "택배 보관함에 넣어주실 수 있나요?",
   "en": "Could you use the parcel locker?"
  },
  {
   "r": "A",
   "ja": "申し訳ありません。冷蔵品なので宅配ボックスには入れられないんです。",
   "jr": "もうしわけありません。れいぞうひんなので たくはいボックスには いれられないんです。",
   "ko": "죄송하지만 냉장품이라 택배함에 넣을 수 없습니다.",
   "en": "Sorry, refrigerated parcels cannot be left in the parcel locker.",
   "alt": [
    {
     "ja": "すみません、冷蔵の荷物は宅配ボックスに入れられない決まりなんです。",
     "jr": "すみません、れいぞうの にもつは たくはい ボックスに いれられない きまり なんです。",
     "ko": "죄송해요, 냉장 화물은 택배 보관함에 넣을 수 없게 되어 있어요.",
     "en": "Sorry, refrigerated parcels can’t be left in delivery lockers."
    }
   ]
  },
  {
   "r": "B",
   "ja": "受け取りに署名は必要ですか。",
   "jr": "うけとりに しょめいは ひつようですか。",
   "ko": "수령할 때 서명이 필요한가요?",
   "en": "Is a signature required?"
  },
  {
   "r": "A",
   "ja": "署名はいりませんが、冷蔵品なので、直接お受け取りいただく形になります。",
   "jr": "しょめいは いりませんが、れいぞうひん なので、ちょくせつ おうけとり いただく かたちに なります。",
   "ko": "서명은 필요 없지만 냉장품이라 직접 받으셔야 합니다.",
   "en": "No signature is needed, but because it’s refrigerated, you’ll need to receive it in person."
  },
  {
   "r": "B",
   "ja": "変更する場合はどうすればいいですか。",
   "jr": "へんこうする ばあいは どうすれば いいですか。",
   "ko": "변경하려면 어떻게 해야 하나요?",
   "en": "How can I change the request later?"
  },
  {
   "r": "A",
   "ja": "変更は不在票の二次元コードからできます。配達前にお手続きください。",
   "jr": "へんこうは ふざいひょうの にじげんコードから できます。はいたつまえに おてつづきください。",
   "ko": "변경은 부재중 안내문의 QR코드로 할 수 있습니다. 배송 전에 신청해 주세요.",
   "en": "You can change it using the QR code on the notice before delivery."
  },
  {
   "r": "B",
   "ja": "助かりました。",
   "jr": "たすかりました。",
   "ko": "도움이 됐습니다.",
   "en": "That was helpful."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「不在票が入っていたので電話しました。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “부재중 안내문이 있어서 전화했습니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “I received a missed-delivery notice.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "車内で地図を見ていました。",
     "ko": "차 안에서 지도를 보고 있었습니다.",
     "en": "I was looking at a map on the train."
    },
    {
     "ja": "伝票番号を教えてください。",
     "ko": "운송장 번호를 알려 주세요.",
     "en": "Please tell me the tracking number."
    },
    {
     "ja": "チェックイン時は、ご予約のお名前と身分証明書をお願いします。",
     "ko": "체크인할 때 예약자 이름과 신분증을 알려 주세요.",
     "en": "Please provide the booking name and identification at check-in."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「宅配ボックスに入れてもらえますか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “택배 보관함에 넣어주실 수 있나요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Could you use the parcel locker?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "申し訳ありません。冷蔵品なので宅配ボックスには入れられないんです。",
     "ko": "죄송하지만 냉장품이라 택배함에 넣을 수 없습니다.",
     "en": "Sorry, refrigerated parcels cannot be left in the parcel locker."
    },
    {
     "ja": "現在、服用している薬はありますか。",
     "ko": "현재 복용 중인 약이 있나요?",
     "en": "Are you taking any medicines now?"
    },
    {
     "ja": "早朝の返却は可能です。営業所の裏に返却専用の駐車枠があります。",
     "ko": "이른 아침 반납이 가능합니다. 영업소 뒤편에 반납 전용 주차구역이 있습니다.",
     "en": "Early returns are possible. There is a designated return bay behind our office."
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「変更する場合はどうすればいいですか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “변경하려면 어떻게 해야 하나요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “How can I change the request later?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "変更は不在票の二次元コードからできます。配達前にお手続きください。",
     "ko": "변경은 부재중 안내문의 QR코드로 할 수 있습니다. 배송 전에 신청해 주세요.",
     "en": "You can change it using the QR code on the notice before delivery."
    },
    {
     "ja": "履歴書と職務経歴書を前日までにメールで送ってください。",
     "ko": "이력서와 경력기술서를 전날까지 이메일로 보내 주세요.",
     "en": "Please email your résumé and work history by the day before."
    },
    {
     "ja": "引き継ぎ後の質問は、社内チャットで私と上司をタグ付けしてください。",
     "ko": "인수인계 후 질문은 사내 채팅에서 저와 상사를 태그해 주세요.",
     "en": "After handover, tag me and our manager in the work chat."
    }
   ],
   "a": 0
  }
 ]
},
{
 "id": "life-bank-card-freeze-1",
 "cat": "life",
 "lv": 3,
 "title": {
  "ja": "カード紛失と利用停止",
  "ko": "카드 분실과 이용 정지",
  "en": "Reporting a missing bank card"
 },
 "scene": {
  "ja": "カードを紛失した利用者が銀行に連絡する。",
  "ko": "카드를 잃어버린 고객이 은행에 연락한다.",
  "en": "A customer reports a missing debit card."
 },
 "roles": {
  "A": {
   "ja": "銀行担当者",
   "ko": "은행 직원",
   "en": "Bank representative"
  },
  "B": {
   "ja": "利用者",
   "ko": "고객",
   "en": "Customer"
  }
 },
 "ai": {
  "goal": {
   "ja": "本人確認と停止手続きを説明する。",
   "ko": "본인 확인 및 이용 정지 절차를 설명한다.",
   "en": "Explain identity checks and card-blocking steps."
  },
  "twist": {
   "ja": "利用者が海外で不審な利用通知を受け取った。",
   "ko": "고객이 해외에서 수상한 결제 알림을 받았다.",
   "en": "The customer has received an unfamiliar overseas transaction alert."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "カードに関するお問い合わせですね。",
   "jr": "カードに かんする おといあわせですね。",
   "ko": "카드 관련 문의시군요.",
   "en": "You are calling about your card, correct?"
  },
  {
   "r": "B",
   "ja": "財布をなくしてしまいました。",
   "jr": "さいふを なくしてしまいました。",
   "ko": "지갑을 잃어버렸습니다.",
   "en": "I have lost my wallet."
  },
  {
   "r": "A",
   "ja": "カードの利用停止をご希望ですか。",
   "jr": "カードの りようていしを ごきぼうですか。",
   "ko": "카드 이용 정지를 원하시나요?",
   "en": "Would you like the card blocked?",
   "alt": [
    {
     "ja": "カードを止めたほうがよろしいですか。",
     "jr": "カードを とめた ほうが よろしいですか。",
     "ko": "카드를 정지하시겠어요?",
     "en": "Would you like us to block the card?"
    }
   ]
  },
  {
   "r": "B",
   "ja": "はい。すぐに止めたいです。",
   "jr": "はい。すぐに とめたいです。",
   "ko": "네. 바로 정지하고 싶습니다.",
   "en": "Yes, immediately."
  },
  {
   "r": "A",
   "ja": "すぐにお止めします。ご本人確認のため、お名前と生年月日をお願いします。",
   "jr": "すぐに おとめ します。ごほんにん かくにんの ため、おなまえと せいねんがっぴを おねがい します。",
   "ko": "바로 정지해 드리겠습니다. 본인 확인을 위해 성함과 생년월일을 알려 주세요.",
   "en": "I’ll stop it right away. To confirm your identity, may I have your name and date of birth?"
  },
  {
   "r": "B",
   "ja": "海外で見覚えのない利用通知も来ました。",
   "jr": "かいがいで みおぼえの ない りようつうちも きました。",
   "ko": "해외에서 모르는 결제 알림도 왔습니다.",
   "en": "I also received an unfamiliar overseas transaction alert."
  },
  {
   "r": "A",
   "ja": "心当たりのない請求は、日時と金額を控えておいてください。",
   "jr": "こころあたりの ない せいきゅうは、にちじと きんがくを ひかえておいてください。",
   "ko": "모르는 결제는 날짜와 금액을 기록해 두세요.",
   "en": "Please note the dates and amounts of the unfamiliar transactions.",
   "alt": [
    {
     "ja": "身に覚えのない利用は、日時と金額をメモしておいてください。",
     "jr": "みに おぼえの ない りようは、にちじと きんがくを メモ して おいて ください。",
     "ko": "기억에 없는 사용 내역은 일시와 금액을 메모해 두세요.",
     "en": "Please note the date and amount of any charges you don’t recognize."
    }
   ]
  },
  {
   "r": "B",
   "ja": "払い戻しは受けられますか。",
   "jr": "はらいもどしは うけられますか。",
   "ko": "환급받을 수 있나요?",
   "en": "Can I get that money back?"
  },
  {
   "r": "A",
   "ja": "補償の対象かどうかは調査後に決まります。受付番号をお伝えします。",
   "jr": "ほしょうの たいしょうかどうかは ちょうさごに きまります。うけつけばんごうを おつたえします。",
   "ko": "보상 가능 여부는 조사 후 결정됩니다. 접수번호를 알려드리겠습니다.",
   "en": "Eligibility for reimbursement depends on the investigation. Here is your case number.",
   "alt": [
    {
     "ja": "補償になるかどうかは、調査のあとに決まります。受付番号をお伝えしますね。",
     "jr": "ほしょうに なるか どうかは、ちょうさの あとに きまります。うけつけ ばんごうを おつたえ しますね。",
     "ko": "보상이 되는지는 조사 후에 결정됩니다. 접수 번호를 알려 드릴게요.",
     "en": "Whether it’s covered will be decided after an investigation. Let me give you a reference number."
    }
   ]
  },
  {
   "r": "B",
   "ja": "新しいカードはどうなりますか。",
   "jr": "あたらしい カードは どうなりますか。",
   "ko": "새 카드는 어떻게 받나요?",
   "en": "How do I get a new card?"
  },
  {
   "r": "A",
   "ja": "再発行は可能です。送付先の登録住所が今の滞在先と違う場合はご相談ください。",
   "jr": "さいはっこうは かのうです。そうふさきの とうろくじゅうしょが いまの たいざいさきと ちがう ばあいは ごそうだんください。",
   "ko": "재발급은 가능합니다. 등록 주소가 현재 체류지와 다르면 상담해 주세요.",
   "en": "We can issue a replacement. Let us know if your current address differs from the registered one."
  },
  {
   "r": "B",
   "ja": "海外でも手続きできますか。",
   "jr": "かいがいでも てつづきできますか。",
   "ko": "해외에서도 신청할 수 있나요?",
   "en": "Can I do that while abroad?"
  },
  {
   "r": "A",
   "ja": "はい。海外からは、こちらの専用番号にお電話いただければ手続きできます。",
   "jr": "はい。かいがいからは、こちらの せんよう ばんごうに おでんわ いただければ てつづき できます。",
   "ko": "네. 해외에서는 이 전용 번호로 전화 주시면 절차를 진행할 수 있습니다.",
   "en": "Yes. From abroad, you can call this dedicated number to complete the process."
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
    "ja": "相手が「財布をなくしてしまいました。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “지갑을 잃어버렸습니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “I have lost my wallet.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "車内で地図を見ていました。",
     "ko": "차 안에서 지도를 보고 있었습니다.",
     "en": "I was looking at a map on the train."
    },
    {
     "ja": "カードの利用停止をご希望ですか。",
     "ko": "카드 이용 정지를 원하시나요?",
     "en": "Would you like the card blocked?"
    },
    {
     "ja": "鍋やお玉を共用している可能性もあるので、調理担当に聞きます。",
     "ko": "냄비나 국자를 함께 사용할 수 있어서 조리 담당자에게 확인하겠습니다.",
     "en": "Pots and ladles may be shared, so I will check with the cook."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「払い戻しは受けられますか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “환급받을 수 있나요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Can I get that money back?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "補償の対象かどうかは調査後に決まります。受付番号をお伝えします。",
     "ko": "보상 가능 여부는 조사 후 결정됩니다. 접수번호를 알려드리겠습니다.",
     "en": "Eligibility for reimbursement depends on the investigation. Here is your case number."
    },
    {
     "ja": "何か変更がありましたか。",
     "ko": "변경 사항이 있나요?",
     "en": "Has something changed?"
    },
    {
     "ja": "申請期限は今週末でしょうか。",
     "ko": "신청 기한이 이번 주 말인가요?",
     "en": "Is the deadline this weekend?"
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「海外でも手続きできますか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “해외에서도 신청할 수 있나요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Can I do that while abroad?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "はい。海外からは、こちらの専用番号にお電話いただければ手続きできます。",
     "ko": "네. 해외에서는 이 전용 번호로 전화 주시면 절차를 진행할 수 있습니다.",
     "en": "Yes. From abroad, you can call this dedicated number to complete the process."
    },
    {
     "ja": "面接の日程について伺いたいです。",
     "ko": "면접 일정에 대해 문의하고 싶습니다.",
     "en": "I would like to ask about the interview schedule."
    },
    {
     "ja": "お待たせしました。今回は修正できました。新しい予約内容をご確認ください。",
     "ko": "기다리게 해 드렸습니다. 이번에는 수정이 가능했습니다. 새 예약 내용을 확인해 주세요.",
     "en": "Thank you for waiting. We were able to correct it this time. Please check the updated booking."
    }
   ],
   "a": 0
  }
 ]
}
);
