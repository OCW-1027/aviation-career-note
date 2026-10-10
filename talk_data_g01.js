/* ACN 会話練習 追加データ（GPT 作成 talk_data_g01.js を Claude が検収・修正：日本語の不自然な行、確認問題の誤答 2026.10.10）。架空の訓練用会話 */
window.TALK=window.TALK||[];window.TALK.push(
{
 "id": "air-irregular-cancel-2",
 "cat": "work",
 "lv": 3,
 "title": {
  "ja": "当日欠航と振替・払い戻し",
  "ko": "당일 결항과 대체편·환불",
  "en": "Same-day cancellation and options"
 },
 "scene": {
  "ja": "出発便が欠航となり、係員が振替と払い戻しの確認方法を説明する。",
  "ko": "출발편이 결항되어 직원이 대체편과 환불 확인 절차를 안내한다.",
  "en": "A flight has been cancelled, and an agent explains how to check rebooking and refund options."
 },
 "roles": {
  "A": {
   "ja": "空港係員",
   "ko": "공항 직원",
   "en": "Airport agent"
  },
  "B": {
   "ja": "出張中の乗客",
   "ko": "출장 승객",
   "en": "Business traveller"
  }
 },
 "ai": {
  "goal": {
   "ja": "お客様の希望を聞き、適用される条件を確認しながら次の手続きを案内する。",
   "ko": "승객의 희망을 듣고 적용 조건을 확인하면서 다음 절차를 안내한다.",
   "en": "Understand the passenger’s preference and guide the next steps after checking applicable conditions."
  },
  "twist": {
   "ja": "乗客が同じ予約で帰国する同僚のことも相談する。",
   "ko": "승객이 같은 예약에 있는 동료의 귀국편도 함께 문의한다.",
   "en": "The passenger asks about a colleague on the same booking."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "欠航のご案内が遅くなり、申し訳ございません。",
   "jr": "けっこうの ごあんないが おそくなり、もうしわけ ございません。",
   "ko": "결항 안내가 늦어져 죄송합니다.",
   "en": "I’m sorry you’ve had to wait for information about the cancellation.",
   "alt": [
    {
     "ja": "ご案内が遅くなり、申し訳ございません。",
     "jr": "ごあんないが おそくなり、もうしわけ ございません。",
     "ko": "안내가 늦어져 죄송합니다.",
     "en": "I’m sorry the update took so long."
    }
   ]
  },
  {
   "r": "B",
   "ja": "今日中に着きたいのですが、別の便はありますか。",
   "jr": "きょうじゅうに つきたいのですが、べつの びんは ありますか。",
   "ko": "오늘 안에 도착해야 하는데 다른 편이 있나요?",
   "en": "I need to arrive today. Is there another flight?"
  },
  {
   "r": "A",
   "ja": "空席と変更条件を順に調べます。予約番号を伺えますか。",
   "jr": "くうせきと へんこうじょうけんを じゅんに しらべます。よやくばんごうを うかがえますか。",
   "ko": "남은 좌석과 변경 조건을 차례로 확인하겠습니다. 예약번호를 알려 주시겠어요?",
   "en": "I’ll check available seats and the change conditions. May I have your booking reference?"
  },
  {
   "r": "B",
   "ja": "こちらです。出張なので明日の便では間に合いません。",
   "jr": "こちらです。しゅっちょうなので あしたの びんでは まにあいません。",
   "ko": "여기 있습니다. 출장이라 내일 비행기로는 늦습니다.",
   "en": "Here it is. A flight tomorrow would be too late for my business trip."
  },
  {
   "r": "A",
   "ja": "ご希望は本日中の到着ですね。払い戻しについても規定を確認できます。",
   "jr": "ごきぼうは ほんじつじゅうの とうちゃくですね。はらいもどしについても きていを かくにんできます。",
   "ko": "오늘 안에 도착하시는 게 우선이군요. 환불 조건도 함께 확인할 수 있습니다.",
   "en": "Arriving today is your priority. I can also check the refund conditions."
  },
  {
   "r": "B",
   "ja": "別の空港に着く便でも構いません。",
   "jr": "べつの くうこうに つく びんでも かまいません。",
   "ko": "다른 공항에 도착하는 편이라도 괜찮습니다.",
   "en": "I could use a flight to a different airport."
  },
  {
   "r": "A",
   "ja": "候補の便と移動に必要な時間を確認して、ご案内いたします。",
   "jr": "こうほの びんと いどうに ひつような じかんを かくにんして、ごあんない いたします。",
   "ko": "가능한 항공편과 이동에 필요한 시간을 확인해 안내드리겠습니다.",
   "en": "I’ll check the flight options and the onward travel time before advising you.",
   "alt": [
    {
     "ja": "候補の便と移動時間を調べ、改めてお知らせします。",
     "jr": "こうほの びんと いどうじかんを しらべ、あらためて おしらせします。",
     "ko": "가능한 항공편과 이동 시간을 확인하고 다시 알려드리겠습니다.",
     "en": "I’ll check the flight options and travel time, then get back to you."
    }
   ]
  },
  {
   "r": "B",
   "ja": "実は同じ予約に同僚もいます。二人とも変更できますか。",
   "jr": "じつは おなじ よやくに どうりょうも います。ふたりとも へんこうできますか。",
   "ko": "사실 같은 예약에 동료도 있습니다. 두 명 다 변경할 수 있나요?",
   "en": "My colleague is on the same booking. Can we both be rebooked?"
  },
  {
   "r": "A",
   "ja": "お二人の予約内容を確認します。変更を確定する前に必ずお伝えします。",
   "jr": "おふたりの よやくないようを かくにんします。へんこうを かくていする まえに かならず おつたえします。",
   "ko": "두 분의 예약 내용을 확인하겠습니다. 변경을 확정하기 전에 반드시 안내드리겠습니다.",
   "en": "I’ll review both passengers’ bookings and explain the options before confirming anything."
  },
  {
   "r": "B",
   "ja": "同僚は今、別のカウンターにいます。",
   "jr": "どうりょうは いま、べつの カウンターに います。",
   "ko": "동료는 지금 다른 카운터에 있어요.",
   "en": "My colleague is at another counter right now."
  },
  {
   "r": "A",
   "ja": "同僚の方と連絡が取れるまで、ご予約は変更せずに確認を進めます。",
   "jr": "どうりょうの かたと れんらくが とれるまで、ごよやくは へんこうせずに かくにんを すすめます。",
   "ko": "동료분과 연락이 닿을 때까지 예약은 바꾸지 않고 확인을 진행하겠습니다.",
   "en": "Until we can reach your colleague, I’ll keep checking without changing their booking."
  },
  {
   "r": "B",
   "ja": "ありがとうございます。選べる便が分かったら教えてください。",
   "jr": "ありがとうございます。えらべる びんが わかったら おしえてください。",
   "ko": "감사합니다. 선택할 수 있는 편이 확인되면 알려 주세요.",
   "en": "Thank you. Please tell me when you know what flights are available."
  },
  {
   "r": "A",
   "ja": "確認できた便と条件を書面でもお伝えいたします。",
   "jr": "かくにんできた びんと じょうけんを しょめんでも おつたえいたします。",
   "ko": "확인된 항공편과 조건은 서면으로도 안내해 드리겠습니다.",
   "en": "I’ll also give you the confirmed options and conditions in writing.",
   "alt": [
    {
     "ja": "確定した候補と条件は、書面でもご案内します。",
     "jr": "かくていした こうほと じょうけんは、しょめんでも ごあんないします。",
     "ko": "확인된 대안과 조건은 서면으로도 안내드리겠습니다.",
     "en": "I’ll also provide the confirmed options and conditions in writing."
    }
   ]
  },
  {
   "r": "B",
   "ja": "それなら安心して決められます。",
   "jr": "それなら あんしんして きめられます。",
   "ko": "그럼 확인하고 결정할 수 있겠네요.",
   "en": "That will help us decide with confidence."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「今日中に着きたいのですが、別の便はありますか。」と言いました。どう答えますか。",
    "ko": "상대방이 “오늘 안에 도착해야 하는데 다른 편이 있나요?”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “I need to arrive today. Is there another flight?” What is the best reply?"
   },
   "opts": [
    {
     "ja": "こちらは臨時の到着空港です。今後のご案内をいたします。",
     "ko": "여기는 임시 도착 공항입니다. 이후 절차를 안내드리겠습니다.",
     "en": "This is the alternate airport. I’ll explain what we know about the next steps."
    },
    {
     "ja": "空席と変更条件を順に調べます。予約番号を伺えますか。",
     "ko": "남은 좌석과 변경 조건을 차례로 확인하겠습니다. 예약번호를 알려 주시겠어요?",
     "en": "I’ll check available seats and the change conditions. May I have your booking reference?"
    },
    {
     "ja": "お食事券の対象になるかどうか、今回の状況を確認してご案内いたします。",
     "ko": "식사권 대상이 되는지 이번 상황을 확인해서 안내드리겠습니다.",
     "en": "I’ll check whether meal vouchers apply in this situation and let you know."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「実は同じ予約に同僚もいます。二人とも変更できますか。」と言いました。どう答えますか。",
    "ko": "상대방이 “사실 같은 예약에 동료도 있습니다. 두 명 다 변경할 수 있나요?”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “My colleague is on the same booking. Can we both be rebooked?” What is the best reply?"
   },
   "opts": [
    {
     "ja": "今回ご案内している待機理由は、航空管制上の制限です。",
     "ko": "현재 안내드리는 대기 사유는 항공교통관제 제한입니다.",
     "en": "The reason we have been given for this wait is an air traffic control restriction."
    },
    {
     "ja": "手荷物引換証の番号から、現在の追跡状況を確認します。",
     "ko": "수하물표 번호로 현재 추적 상황을 확인하겠습니다.",
     "en": "I will use your baggage tag number to check the current tracking status."
    },
    {
     "ja": "お二人の予約内容を確認します。変更を確定する前に必ずお伝えします。",
     "ko": "두 분의 예약 내용을 확인하겠습니다. 변경을 확정하기 전에 반드시 안내드리겠습니다.",
     "en": "I’ll review both passengers’ bookings and explain the options before confirming anything."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「ありがとうございます。選べる便が分かったら教えてください。」と言いました。どう答えますか。",
    "ko": "상대방이 “감사합니다. 선택할 수 있는 편이 확인되면 알려 주세요.”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “Thank you. Please tell me when you know what flights are available.” What is the best reply?"
   },
   "opts": [
    {
     "ja": "確認できた便と条件を書面でもお伝えいたします。",
     "ko": "확인된 항공편과 조건은 서면으로도 안내해 드리겠습니다.",
     "en": "I’ll also give you the confirmed options and conditions in writing."
    },
    {
     "ja": "必要な介助を伺い、支援担当へすぐ連絡いたします。",
     "ko": "필요한 도움을 여쭤보고 지원 담당자에게 바로 연락하겠습니다.",
     "en": "I’ll ask what help she needs and contact our assistance team immediately."
    },
    {
     "ja": "お食事券の対象になるかどうか、今回の状況を確認してご案内いたします。",
     "ko": "식사권 대상이 되는지 이번 상황을 확인해서 안내드리겠습니다.",
     "en": "I’ll check whether meal vouchers apply in this situation and let you know."
    }
   ],
   "a": 0
  }
 ]
},
{
 "id": "air-irrops-longdelay-1",
 "cat": "work",
 "lv": 2,
 "title": {
  "ja": "長時間遅延と食事の案内",
  "ko": "장시간 지연과 식사 안내",
  "en": "Long delay and meal assistance"
 },
 "scene": {
  "ja": "出発が三時間以上遅れ、食事券の提供条件を尋ねる乗客に対応する。",
  "ko": "출발이 3시간 이상 늦어져 식사권 제공 조건을 묻는 승객을 응대한다.",
  "en": "A passenger asks about meal assistance during a delay of more than three hours."
 },
 "roles": {
  "A": {
   "ja": "搭乗口係員",
   "ko": "탑승구 직원",
   "en": "Gate agent"
  },
  "B": {
   "ja": "待っている乗客",
   "ko": "기다리는 승객",
   "en": "Waiting passenger"
  }
 },
 "ai": {
  "goal": {
   "ja": "遅延の最新情報と支援の確認方法を伝える。",
   "ko": "지연 최신 정보와 지원 여부를 확인하는 방법을 안내한다.",
   "en": "Communicate the latest delay information and explain how assistance can be checked."
  },
  "twist": {
   "ja": "案内の後で新たな出発見込みが発表される。",
   "ko": "안내 도중 새로운 출발 예상 시간이 발표된다.",
   "en": "A revised estimated departure time is announced during the conversation."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "長くお待たせして申し訳ございません。最新の運航情報をお伝えします。",
   "jr": "ながく おまたせして もうしわけ ございません。さいしんの うんこうじょうほうを おつたえします。",
   "ko": "오래 기다리시게 해 죄송합니다. 최신 운항 정보를 안내드리겠습니다.",
   "en": "I’m sorry for the long wait. Let me give you the latest flight update.",
   "alt": [
    {
     "ja": "長時間お待たせし、誠に申し訳ございません。",
     "jr": "ちょうじかん おまたせし、まことに もうしわけ ございません。",
     "ko": "장시간 기다리시게 해 진심으로 죄송합니다.",
     "en": "I’m very sorry you’ve been kept waiting so long."
    }
   ]
  },
  {
   "r": "B",
   "ja": "もう三時間以上待っています。食事券はもらえますか。",
   "jr": "もう さんじかん いじょう まっています。しょくじけんは もらえますか。",
   "ko": "벌써 세 시간 넘게 기다렸습니다. 식사권은 받을 수 있나요?",
   "en": "I’ve been waiting over three hours. Can I get a meal voucher?"
  },
  {
   "r": "A",
   "ja": "お食事券の対象になるかどうか、今回の状況を確認してご案内いたします。",
   "jr": "おしょくじけんの たいしょうに なるか どうか、こんかいの じょうきょうを かくにんして ごあんないいたします。",
   "ko": "식사권 대상이 되는지 이번 상황을 확인해서 안내드리겠습니다.",
   "en": "I’ll check whether meal vouchers apply in this situation and let you know."
  },
  {
   "r": "B",
   "ja": "どこに行けば詳しく聞けますか。",
   "jr": "どこに いけば くわしく きけますか。",
   "ko": "자세한 안내는 어디서 받을 수 있나요?",
   "en": "Where can I get more information?"
  },
  {
   "r": "A",
   "ja": "最新の情報はこの搭乗口でお知らせします。係員にもお気軽にお声がけください。",
   "jr": "さいしんの じょうほうは この とうじょうぐちで おしらせします。かかりいんにも おきがるに おこえがけ ください。",
   "ko": "최신 정보는 이 탑승구에서 알려 드립니다. 직원에게도 편하게 말씀해 주세요.",
   "en": "We’ll give updates here at the gate. Please feel free to ask any of our staff."
  },
  {
   "r": "B",
   "ja": "食事に出たら搭乗を逃しそうで心配です。",
   "jr": "しょくじに でたら とうじょうを のがしそうで しんぱいです。",
   "ko": "식사하러 갔다가 탑승을 놓칠까 걱정돼요.",
   "en": "I’m worried I’ll miss boarding if I leave to eat."
  },
  {
   "r": "A",
   "ja": "次の案内時刻と搭乗口の変更がないか確認いたします。",
   "jr": "つぎの あんないじこくと とうじょうぐちの へんこうが ないか かくにんいたします。",
   "ko": "다음 안내 시간과 탑승구 변경 여부를 확인해 드리겠습니다.",
   "en": "I’ll confirm when the next update is due and whether the gate may change.",
   "alt": [
    {
     "ja": "次の更新時刻と搭乗口の状況を確認いたします。",
     "jr": "つぎの こうしんじこくと とうじょうぐちの じょうきょうを かくにんいたします。",
     "ko": "다음 안내 예정 시간과 탑승구 상황을 확인하겠습니다.",
     "en": "I’ll check the next update time and the status of the gate."
    }
   ]
  },
  {
   "r": "B",
   "ja": "今、画面に新しい時刻が出ました。あれは確定ですか。",
   "jr": "いま、がめんに あたらしい じこくが でました。あれは かくていですか。",
   "ko": "지금 화면에 새 시간이 떴는데 확정인가요?",
   "en": "A new time just appeared on the screen. Is it confirmed?"
  },
  {
   "r": "A",
   "ja": "現時点の見込みです。確定情報は改めてご案内いたします。",
   "jr": "げんじてんの みこみです。かくていじょうほうは あらためて ごあんないいたします。",
   "ko": "현재 예상 시간입니다. 확정되면 다시 안내드리겠습니다.",
   "en": "That’s the current estimate. We’ll announce it again once it’s confirmed."
  },
  {
   "r": "B",
   "ja": "今のうちに飲み物を買っても大丈夫でしょうか。",
   "jr": "いまの うちに のみものを かっても だいじょうぶでしょうか。",
   "ko": "그럼 지금 음료를 사러 가도 될까요?",
   "en": "Would it be all right to buy a drink now?"
  },
  {
   "r": "A",
   "ja": "近くにお出かけの場合も、表示と放送をご確認ください。",
   "jr": "ちかくに おでかけの ばあいも、ひょうじと ほうそうを ごかくにんください。",
   "ko": "근처에 다녀오실 때도 전광판과 방송을 확인해 주세요.",
   "en": "If you step away, please keep an eye on the displays and announcements."
  },
  {
   "r": "B",
   "ja": "次の更新までここで待ちます。",
   "jr": "つぎの こうしんまで ここで まちます。",
   "ko": "다음 안내 때까지 여기서 기다릴게요.",
   "en": "I’ll wait here until the next update."
  },
  {
   "r": "A",
   "ja": "新しい情報が入り次第、こちらからお知らせいたします。",
   "jr": "あたらしい じょうほうが はいりしだい、こちらから おしらせいたします。",
   "ko": "새 정보가 들어오는 대로 이곳에서 안내하겠습니다.",
   "en": "We’ll share any new information here as soon as we receive it.",
   "alt": [
    {
     "ja": "情報が入りましたら、すぐにこちらでご案内します。",
     "jr": "じょうほうが はいりましたら、すぐに こちらで ごあんないします。",
     "ko": "새 소식이 들어오면 이곳에서 즉시 안내하겠습니다.",
     "en": "We’ll announce any new information here promptly."
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
    "ja": "相手が「もう三時間以上待っています。食事券はもらえますか。」と言いました。どう答えますか。",
    "ko": "상대방이 “벌써 세 시간 넘게 기다렸습니다. 식사권은 받을 수 있나요?”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “I’ve been waiting over three hours. Can I get a meal voucher?” What is the best reply?"
   },
   "opts": [
    {
     "ja": "お荷物が見当たらないとのことですね。ご不便をおかけしております。",
     "ko": "짐이 보이지 않는다고 하셨군요. 불편을 드려 죄송합니다.",
     "en": "I understand your bag has not arrived. I am sorry for the inconvenience."
    },
    {
     "ja": "お食事券の対象になるかどうか、今回の状況を確認してご案内いたします。",
     "ko": "식사권 대상이 되는지 이번 상황을 확인해서 안내드리겠습니다.",
     "en": "I’ll check whether meal vouchers apply in this situation and let you know."
    },
    {
     "ja": "ご心配をおかけしました。空席と座席配置を確認いたします。",
     "ko": "걱정을 끼쳐 드려 죄송합니다. 빈자리와 좌석 배치를 확인하겠습니다.",
     "en": "I’m sorry about that. I’ll check the available seats and the new seat map."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「今、画面に新しい時刻が出ました。あれは確定ですか。」と言いました。どう答えますか。",
    "ko": "상대방이 “지금 화면에 새 시간이 떴는데 확정인가요?”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “A new time just appeared on the screen. Is it confirmed?” What is the best reply?"
   },
   "opts": [
    {
     "ja": "ご心配をおかけしました。空席と座席配置を確認いたします。",
     "ko": "걱정을 끼쳐 드려 죄송합니다. 빈자리와 좌석 배치를 확인하겠습니다.",
     "en": "I’m sorry about that. I’ll check the available seats and the new seat map."
    },
    {
     "ja": "この便は途中の空港で臨時に給油する予定です。",
     "ko": "이 항공편은 중간 공항에서 임시로 급유할 예정입니다.",
     "en": "This flight is scheduled to make an unscheduled stop for refuelling."
    },
    {
     "ja": "現時点の見込みです。確定情報は改めてご案内いたします。",
     "ko": "현재 예상 시간입니다. 확정되면 다시 안내드리겠습니다.",
     "en": "That’s the current estimate. We’ll announce it again once it’s confirmed."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「次の更新までここで待ちます。」と言いました。どう答えますか。",
    "ko": "상대방이 “다음 안내 때까지 여기서 기다릴게요.”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “I’ll wait here until the next update.” What is the best reply?"
   },
   "opts": [
    {
     "ja": "再入場に必要な時間と保安検査の手続きをご確認ください。",
     "ko": "재입장 소요 시간과 보안검색 절차를 확인해 주세요.",
     "en": "Please account for the time and security procedures needed to re-enter."
    },
    {
     "ja": "次に利用できる便と空席状況を確認します。",
     "ko": "다음 이용 가능한 항공편과 좌석 상황을 확인하겠습니다.",
     "en": "I will check the next available flight and seat availability."
    },
    {
     "ja": "新しい情報が入り次第、こちらからお知らせいたします。",
     "ko": "새 정보가 들어오는 대로 이곳에서 안내하겠습니다.",
     "en": "We’ll share any new information here as soon as we receive it."
    }
   ],
   "a": 2
  }
 ]
},
{
 "id": "air-irrops-diversion-1",
 "cat": "work",
 "lv": 3,
 "title": {
  "ja": "目的地変更後の地上案内",
  "ko": "회항·대체공항 착륙 후 지상 안내",
  "en": "Ground assistance after a diversion"
 },
 "scene": {
  "ja": "便が予定外の空港に着陸し、乗客が次の移動方法を尋ねる。",
  "ko": "항공편이 예정에 없던 공항에 착륙해 승객이 이후 이동 방법을 묻는다.",
  "en": "A flight lands at an alternate airport and a passenger asks what happens next."
 },
 "roles": {
  "A": {
   "ja": "到着地の支援係員",
   "ko": "도착지 지원 직원",
   "en": "Arrival assistance agent"
  },
  "B": {
   "ja": "乗客",
   "ko": "승객",
   "en": "Passenger"
  }
 },
 "ai": {
  "goal": {
   "ja": "確定した移動情報だけを説明し、個別の配慮事項を把握する。",
   "ko": "확정된 이동 정보만 안내하고 개별 지원 필요사항을 파악한다.",
   "en": "Explain only confirmed onward arrangements and identify individual assistance needs."
  },
  "twist": {
   "ja": "乗客が移動に補助を必要とする家族がいると伝える。",
   "ko": "승객이 이동 지원이 필요한 가족이 있다고 말한다.",
   "en": "The passenger says a family member needs mobility assistance."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "こちらは臨時の到着空港です。今後のご案内をいたします。",
   "jr": "こちらは りんじの とうちゃくくうこうです。こんごの ごあんないを いたします。",
   "ko": "여기는 임시 도착 공항입니다. 이후 절차를 안내드리겠습니다.",
   "en": "This is the alternate airport. I’ll explain what we know about the next steps.",
   "alt": [
    {
     "ja": "予定と異なる空港に到着しました。今後の流れをご説明します。",
     "jr": "よていと ことなる くうこうに とうちゃくしました。こんごの ながれを ごせつめいします。",
     "ko": "예정과 다른 공항에 도착했습니다. 이후 진행 상황을 설명드리겠습니다.",
     "en": "We’ve landed at a different airport. Let me explain what happens next."
    }
   ]
  },
  {
   "r": "B",
   "ja": "目的地までどうやって行くのですか。",
   "jr": "もくてきちまで どうやって いくのですか。",
   "ko": "원래 목적지까지 어떻게 가나요?",
   "en": "How are we supposed to get to our original destination?"
  },
  {
   "r": "A",
   "ja": "地上交通と再出発の可能性を担当部署に確認しています。",
   "jr": "ちじょうこうつうと さいしゅっぱつの かのうせいを たんとうぶしょに かくにんしています。",
   "ko": "육상 교통편과 재출발 가능성을 담당 부서에 확인 중입니다.",
   "en": "The team is checking ground transport and whether the flight can continue."
  },
  {
   "r": "B",
   "ja": "乗り換える場合は荷物も受け取りますか。",
   "jr": "のりかえる ばあいは にもつも うけとりますか。",
   "ko": "다른 교통편으로 이동하면 짐도 찾아야 하나요?",
   "en": "If we transfer, do we collect our bags?"
  },
  {
   "r": "A",
   "ja": "手荷物のお渡し方法も、決まり次第お知らせします。",
   "jr": "てにもつの おわたし ほうほうも、きまりしだい おしらせします。",
   "ko": "수하물 인도 방법도 결정되는 대로 안내드리겠습니다.",
   "en": "We’ll advise you about baggage collection once the arrangements are confirmed."
  },
  {
   "r": "B",
   "ja": "ここで待機するように言われたのですが。",
   "jr": "ここで たいきするように いわれたのですが。",
   "ko": "여기서 대기하라고 들었습니다.",
   "en": "We were told to wait here."
  },
  {
   "r": "A",
   "ja": "はい。安全な待機場所と次の案内時刻をご案内します。",
   "jr": "はい。あんぜんな たいきばしょと つぎの あんないじこくを ごあんないします。",
   "ko": "네. 안전한 대기 장소와 다음 안내 시간을 알려드리겠습니다.",
   "en": "Yes. I’ll point out the waiting area and tell you when the next update is expected.",
   "alt": [
    {
     "ja": "待機場所と次のお知らせの時刻をご案内します。",
     "jr": "たいきばしょと つぎの おしらせの じこくを ごあんないします。",
     "ko": "대기 장소와 다음 안내 시간을 알려드리겠습니다.",
     "en": "I’ll show you where to wait and when to expect the next update."
    }
   ]
  },
  {
   "r": "B",
   "ja": "母は歩くのが難しいです。移動の手伝いを頼めますか。",
   "jr": "ははは あるくのが むずかしいです。いどうの てつだいを たのめますか。",
   "ko": "어머니가 걷기 어려우신데 이동 지원을 받을 수 있나요?",
   "en": "My mother has difficulty walking. Can someone help her move?"
  },
  {
   "r": "A",
   "ja": "必要な介助を伺い、支援担当へすぐ連絡いたします。",
   "jr": "ひつような かいじょを うかがい、しえんたんとうへ すぐ れんらくいたします。",
   "ko": "필요한 도움을 여쭤보고 지원 담당자에게 바로 연락하겠습니다.",
   "en": "I’ll ask what help she needs and contact our assistance team immediately."
  },
  {
   "r": "B",
   "ja": "車いすを使えると助かります。",
   "jr": "くるまいすを つかえると たすかります。",
   "ko": "휠체어가 있으면 도움이 될 것 같습니다.",
   "en": "A wheelchair would be very helpful."
  },
  {
   "r": "A",
   "ja": "手配の状況を確認し、お迎えの場所をお伝えします。",
   "jr": "てはいの じょうきょうを かくにんし、おむかえの ばしょを おつたえします。",
   "ko": "준비 상황을 확인해 휠체어를 어디서 이용할 수 있는지 안내드리겠습니다.",
   "en": "I’ll check availability and tell you where assistance can meet you."
  },
  {
   "r": "B",
   "ja": "母と一緒に待てばいいですね。",
   "jr": "ははと いっしょに まてば いいですね。",
   "ko": "어머니와 함께 기다리면 되겠군요.",
   "en": "So I should wait here with my mother?"
  },
  {
   "r": "A",
   "ja": "はい。移動の案内が確定するまで、この場所でお待ちください。",
   "jr": "はい。いどうの あんないが かくていするまで、この ばしょで おまちください。",
   "ko": "네. 이동 안내가 확정될 때까지 이곳에서 기다려 주세요.",
   "en": "Yes. Please stay here until the onward arrangements are confirmed.",
   "alt": [
    {
     "ja": "移動方法が決まるまで、こちらでお待ちいただけますか。",
     "jr": "いどうほうほうが きまるまで、こちらで おまちいただけますか。",
     "ko": "이동 방법이 정해질 때까지 이곳에서 기다려 주시겠습니까?",
     "en": "Could you wait here until the onward arrangements are confirmed?"
    }
   ]
  },
  {
   "r": "B",
   "ja": "ありがとうございます。安心しました。",
   "jr": "ありがとうございます。あんしんしました。",
   "ko": "감사합니다. 조금 안심이 되네요.",
   "en": "Thank you. That helps."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「目的地までどうやって行くのですか。」と言いました。どう答えますか。",
    "ko": "상대방이 “원래 목적지까지 어떻게 가나요?”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “How are we supposed to get to our original destination?” What is the best reply?"
   },
   "opts": [
    {
     "ja": "地上交通と再出発の可能性を担当部署に確認しています。",
     "ko": "육상 교통편과 재출발 가능성을 담당 부서에 확인 중입니다.",
     "en": "The team is checking ground transport and whether the flight can continue."
    },
    {
     "ja": "空席と変更条件を順に調べます。予約番号を伺えますか。",
     "ko": "남은 좌석과 변경 조건을 차례로 확인하겠습니다. 예약번호를 알려 주시겠어요?",
     "en": "I’ll check available seats and the change conditions. May I have your booking reference?"
    },
    {
     "ja": "ご予約が座席数を上回っています。ご協力は任意です。",
     "ko": "예약 인원이 좌석 수보다 많습니다. 변경은 자발적 선택입니다.",
     "en": "There are more reservations than seats. Volunteering is entirely optional."
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「母は歩くのが難しいです。移動の手伝いを頼めますか。」と言いました。どう答えますか。",
    "ko": "상대방이 “어머니가 걷기 어려우신데 이동 지원을 받을 수 있나요?”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “My mother has difficulty walking. Can someone help her move?” What is the best reply?"
   },
   "opts": [
    {
     "ja": "恐れ入りますが、こちらの通路は現在ご利用いただけません。",
     "ko": "죄송하지만 현재 이 통로는 이용할 수 없습니다.",
     "en": "I am sorry, but this passage is temporarily unavailable."
    },
    {
     "ja": "必要な介助を伺い、支援担当へすぐ連絡いたします。",
     "ko": "필요한 도움을 여쭤보고 지원 담당자에게 바로 연락하겠습니다.",
     "en": "I’ll ask what help she needs and contact our assistance team immediately."
    },
    {
     "ja": "機材の整備確認のため、搭乗開始を見合わせております。",
     "ko": "항공기 정비 확인을 위해 탑승 시작을 보류하고 있습니다.",
     "en": "Boarding is on hold while maintenance checks are carried out."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「母と一緒に待てばいいですね。」と言いました。どう答えますか。",
    "ko": "상대방이 “어머니와 함께 기다리면 되겠군요.”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “So I should wait here with my mother?” What is the best reply?"
   },
   "opts": [
    {
     "ja": "詳細は整備担当が確認中で、現時点ではお答えできません。",
     "ko": "세부 내용은 정비 담당자가 확인 중이라 지금은 답변드리기 어렵습니다.",
     "en": "The maintenance team is still checking the details, so I cannot confirm that yet."
    },
    {
     "ja": "はい。移動の案内が確定するまで、この場所でお待ちください。",
     "ko": "네. 이동 안내가 확정될 때까지 이곳에서 기다려 주세요.",
     "en": "Yes. Please stay here until the onward arrangements are confirmed."
    },
    {
     "ja": "現在の計画では、給油後に当初の目的地へ向かいます。",
     "ko": "현재 계획은 급유 후 원래 목적지로 향하는 것입니다.",
     "en": "The current plan is to continue to the original destination after refuelling."
    }
   ],
   "a": 1
  }
 ]
},
{
 "id": "air-irrops-overbooking-1",
 "cat": "work",
 "lv": 3,
 "title": {
  "ja": "座席不足と協力者の募集",
  "ko": "좌석 부족과 자발적 일정 변경 안내",
  "en": "Oversales and seeking volunteers"
 },
 "scene": {
  "ja": "予約数が座席数を超え、係員が自発的に便を変更できる乗客を募る。",
  "ko": "예약 인원이 좌석 수보다 많아 직원이 자발적 변경 승객을 모집한다.",
  "en": "A flight is oversold and an agent asks for volunteers to take another service."
 },
 "roles": {
  "A": {
   "ja": "搭乗口責任者",
   "ko": "탑승구 책임자",
   "en": "Gate supervisor"
  },
  "B": {
   "ja": "乗客",
   "ko": "승객",
   "en": "Passenger"
  }
 },
 "ai": {
  "goal": {
   "ja": "協力をお願いする条件を明確にし、同意前に確認すべき事項を案内する。",
   "ko": "자발적 변경 조건을 명확히 설명하고 동의 전 확인 사항을 안내한다.",
   "en": "Explain the voluntary offer and what must be checked before the passenger agrees."
  },
  "twist": {
   "ja": "乗客が同行者と別々になる可能性を伝える。",
   "ko": "승객이 동행자와 떨어질 수 있다는 문제를 제기한다.",
   "en": "The passenger says volunteering might separate them from a companion."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "お急ぎのところ恐れ入ります。便の変更にご協力いただける方を探しています。",
   "jr": "おいそぎの ところ おそれいります。びんの へんこうに ごきょうりょくいただける かたを さがしています。",
   "ko": "바쁘신데 죄송합니다. 항공편 변경에 협조하실 분을 찾고 있습니다.",
   "en": "Thank you for your patience. We’re looking for passengers willing to volunteer for a later flight.",
   "alt": [
    {
     "ja": "別の便への変更を希望される方を募集しております。",
     "jr": "べつの びんへの へんこうを きぼうされる かたを ぼしゅうしております。",
     "ko": "다른 항공편으로 변경을 원하시는 분을 모집하고 있습니다.",
     "en": "We’re inviting volunteers who would consider travelling on another flight."
    }
   ]
  },
  {
   "r": "B",
   "ja": "何か問題が起きたのですか。",
   "jr": "なにか もんだいが おきたのですか。",
   "ko": "무슨 문제가 생겼나요?",
   "en": "Has something gone wrong?"
  },
  {
   "r": "A",
   "ja": "ご予約が座席数を上回っています。ご協力は任意です。",
   "jr": "ごよやくが ざせきすうを うわまわっています。ごきょうりょくは にんいです。",
   "ko": "예약 인원이 좌석 수보다 많습니다. 변경은 자발적 선택입니다.",
   "en": "There are more reservations than seats. Volunteering is entirely optional."
  },
  {
   "r": "B",
   "ja": "協力した場合、次の便はいつですか。",
   "jr": "きょうりょくした ばあい、つぎの びんは いつですか。",
   "ko": "협조하면 다음 편은 언제인가요?",
   "en": "When would the alternative flight leave?"
  },
  {
   "r": "A",
   "ja": "候補の便と条件を書面で確認してからご案内します。",
   "jr": "こうほの びんと じょうけんを しょめんで かくにんしてから ごあんないします。",
   "ko": "가능한 항공편과 조건을 서면으로 확인한 뒤 안내하겠습니다.",
   "en": "I’ll confirm the available flight and the terms in writing."
  },
  {
   "r": "B",
   "ja": "支援や補償の内容も教えてください。",
   "jr": "しえんや ほしょうの ないようも おしえてください。",
   "ko": "지원이나 보상 내용도 알려 주세요.",
   "en": "What assistance or compensation would be offered?"
  },
  {
   "r": "A",
   "ja": "ご案内できる条件は会社の規定に基づき確認いたします。",
   "jr": "ごあんないできる じょうけんは かいしゃの きていに もとづき かくにんいたします。",
   "ko": "제공 가능한 조건은 회사 규정에 따라 확인하겠습니다.",
   "en": "I’ll check the precise offer under our airline’s policy.",
   "alt": [
    {
     "ja": "ご協力いただく条件を、規定に沿って確認します。",
     "jr": "ごきょうりょくいただく じょうけんを、きていに そって かくにんします。",
     "ko": "협조하시는 경우의 조건을 규정에 따라 확인하겠습니다.",
     "en": "I’ll check the terms of the offer under our airline’s policy."
    }
   ]
  },
  {
   "r": "B",
   "ja": "同行者がいるのですが、私だけ変更になると困ります。",
   "jr": "どうこうしゃが いるのですが、わたしだけ へんこうに なると こまります。",
   "ko": "동행자가 있는데 저만 바꾸면 곤란합니다.",
   "en": "I’m travelling with someone. I can’t change flights on my own."
  },
  {
   "r": "A",
   "ja": "お二人での変更が可能か、別々になる前に調べます。",
   "jr": "おふたりでの へんこうが かのうか、べつべつに なる まえに しらべます。",
   "ko": "두 분 모두 변경이 가능한지 먼저 확인하겠습니다.",
   "en": "I’ll check whether you can both move before any decision is made."
  },
  {
   "r": "B",
   "ja": "まだ申し込まなくても大丈夫ですか。",
   "jr": "まだ もうしこまなくても だいじょうぶですか。",
   "ko": "아직 신청하지 않아도 되나요?",
   "en": "Can I wait before making a decision?"
  },
  {
   "r": "A",
   "ja": "はい。条件をご覧になり、納得してからお申し出ください。",
   "jr": "はい。じょうけんを ごらんになり、なっとくしてから おもうしでください。",
   "ko": "네. 조건을 충분히 확인하신 뒤 동의하시면 됩니다.",
   "en": "Of course. Please review the conditions before deciding whether to volunteer."
  },
  {
   "r": "B",
   "ja": "条件を見てから判断します。",
   "jr": "じょうけんを みてから はんだんします。",
   "ko": "조건을 보고 결정하겠습니다.",
   "en": "I’ll decide after seeing the offer."
  },
  {
   "r": "A",
   "ja": "ありがとうございます。条件がまとまりましたら、改めてご案内いたします。",
   "jr": "ありがとうございます。じょうけんが まとまりましたら、あらためて ごあんないいたします。",
   "ko": "감사합니다. 조건이 정리되면 다시 안내드리겠습니다.",
   "en": "Thank you. Once the conditions are confirmed, I’ll come back to you.",
   "alt": [
    {
     "ja": "詳しい条件を確認して、改めてご説明いたします。",
     "jr": "くわしい じょうけんを かくにんして、あらためて ごせつめいいたします。",
     "ko": "세부 조건을 확인하고 다시 설명드리겠습니다.",
     "en": "I’ll confirm the details and explain them to you."
    }
   ]
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
    "ja": "相手が「何か問題が起きたのですか。」と言いました。どう答えますか。",
    "ko": "상대방이 “무슨 문제가 생겼나요?”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “Has something gone wrong?” What is the best reply?"
   },
   "opts": [
    {
     "ja": "手荷物の引き継ぎ状況を担当部署に確認します。",
     "ko": "수하물 인계 상황을 담당 부서에 확인하겠습니다.",
     "en": "I will check the baggage transfer status with the handling team."
    },
    {
     "ja": "ご予約が座席数を上回っています。ご協力は任意です。",
     "ko": "예약 인원이 좌석 수보다 많습니다. 변경은 자발적 선택입니다.",
     "en": "There are more reservations than seats. Volunteering is entirely optional."
    },
    {
     "ja": "係員の誘導に従い、指定された検査場へお進みください。",
     "ko": "직원 안내에 따라 지정된 검색장으로 이동해 주세요.",
     "en": "Please follow staff directions to the designated screening checkpoint."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「同行者がいるのですが、私だけ変更になると困ります。」と言いました。どう答えますか。",
    "ko": "상대방이 “동행자가 있는데 저만 바꾸면 곤란합니다.”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “I’m travelling with someone. I can’t change flights on my own.” What is the best reply?"
   },
   "opts": [
    {
     "ja": "雪のため、出発前に機体の除氷作業を行います。",
     "ko": "눈 때문에 출발 전 기체 제빙 작업을 실시합니다.",
     "en": "Because of the snow, the aircraft needs de-icing before departure."
    },
    {
     "ja": "ターミナル間の移動手段と所要時間を確認いたします。",
     "ko": "터미널 간 이동 수단과 소요 시간을 확인하겠습니다.",
     "en": "I will check the transfer options and estimated travel time."
    },
    {
     "ja": "お二人での変更が可能か、別々になる前に調べます。",
     "ko": "두 분 모두 변경이 가능한지 먼저 확인하겠습니다.",
     "en": "I’ll check whether you can both move before any decision is made."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「条件を見てから判断します。」と言いました。どう答えますか。",
    "ko": "상대방이 “조건을 보고 결정하겠습니다.”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “I’ll decide after seeing the offer.” What is the best reply?"
   },
   "opts": [
    {
     "ja": "恐れ入ります。旅券の写真があるページに破損が見られます。",
     "ko": "죄송하지만 여권 사진이 있는 페이지에 훼손이 보입니다.",
     "en": "I am sorry, but the passport photo page appears to be damaged."
    },
    {
     "ja": "同僚の方と連絡が取れるまで、ご予約は変更せずに確認を進めます。",
     "ko": "동료분과 연락이 닿을 때까지 예약은 바꾸지 않고 확인을 진행하겠습니다.",
     "en": "Until we can reach your colleague, I’ll keep checking without changing their booking."
    },
    {
     "ja": "ありがとうございます。条件がまとまりましたら、改めてご案内いたします。",
     "ko": "감사합니다. 조건이 정리되면 다시 안내드리겠습니다.",
     "en": "Thank you. Once the conditions are confirmed, I’ll come back to you."
    }
   ],
   "a": 2
  }
 ]
},
{
 "id": "air-irrops-aircraft-change-1",
 "cat": "work",
 "lv": 2,
 "title": {
  "ja": "機材変更と座席の再案内",
  "ko": "기종 변경으로 인한 좌석 재배정",
  "en": "Aircraft change and seating"
 },
 "scene": {
  "ja": "機材変更によって座席指定が変わり、家族が離れた席になった。",
  "ko": "기종 변경으로 좌석 배정이 바뀌어 가족이 떨어져 앉게 됐다.",
  "en": "An aircraft change has separated family members’ seats."
 },
 "roles": {
  "A": {
   "ja": "カウンター係員",
   "ko": "카운터 직원",
   "en": "Counter agent"
  },
  "B": {
   "ja": "子連れの乗客",
   "ko": "아이 동반 승객",
   "en": "Passenger with a child"
  }
 },
 "ai": {
  "goal": {
   "ja": "変更理由を説明し、座席の調整可能性を安全上の条件とともに確認する。",
   "ko": "변경 이유를 설명하고 안전 조건을 지키면서 좌석 조정 가능성을 확인한다.",
   "en": "Explain the change and check seating options subject to safety requirements."
  },
  "twist": {
   "ja": "子どもが一人で座ることを怖がっていると分かる。",
   "ko": "아이가 혼자 앉는 것을 무서워한다는 사실을 알게 된다.",
   "en": "The child is frightened about sitting alone."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "本日は機材の変更により、座席が変わっております。",
   "jr": "ほんじつは きざいの へんこうにより、ざせきが かわっております。",
   "ko": "오늘은 기종이 변경되어 좌석 배정이 바뀌었습니다.",
   "en": "The aircraft has changed today, so some seat assignments have been altered.",
   "alt": [
    {
     "ja": "使用する航空機が変わり、座席指定が変更されています。",
     "jr": "しようする こうくうきが かわり、ざせきしていが へんこうされています。",
     "ko": "운항 기종이 바뀌면서 좌석 배정이 변경되었습니다.",
     "en": "We’re using a different aircraft, so the seat assignments have changed."
    }
   ]
  },
  {
   "r": "B",
   "ja": "子どもと離れた席になっています。隣にできますか。",
   "jr": "こどもと はなれた せきに なっています。となりに できますか。",
   "ko": "아이와 떨어진 좌석이에요. 옆자리로 바꿀 수 있나요?",
   "en": "My child is seated away from me. Can we sit together?"
  },
  {
   "r": "A",
   "ja": "ご心配をおかけしました。空席と座席配置を確認いたします。",
   "jr": "ごしんぱいを おかけしました。くうせきと ざせきはいちを かくにんいたします。",
   "ko": "걱정을 끼쳐 드려 죄송합니다. 빈자리와 좌석 배치를 확인하겠습니다.",
   "en": "I’m sorry about that. I’ll check the available seats and the new seat map."
  },
  {
   "r": "B",
   "ja": "元の便では隣同士だったんです。",
   "jr": "もとの びんでは となりどうし だったんです。",
   "ko": "원래 항공편에서는 나란히 앉도록 예약했거든요.",
   "en": "We had seats together on the original aircraft."
  },
  {
   "r": "A",
   "ja": "元の座席指定も記録で確認し、調整できるか調べます。",
   "jr": "もとの ざせきしていも きろくで かくにんし、ちょうせいできるか しらべます。",
   "ko": "기존 좌석 배정도 확인하고 조정할 수 있는지 살펴보겠습니다.",
   "en": "I’ll review your original seat selection and see what can be arranged."
  },
  {
   "r": "B",
   "ja": "搭乗までまだ時間はありますか。",
   "jr": "とうじょうまで まだ じかんは ありますか。",
   "ko": "탑승까지 시간이 남아 있나요?",
   "en": "Is there still time before boarding?"
  },
  {
   "r": "A",
   "ja": "搭乗開始の予定を確認して、できるだけ早くお伝えします。",
   "jr": "とうじょうかいしの よていを かくにんして、できるだけ はやく おつたえします。",
   "ko": "탑승 시작 예정 시간을 확인해 최대한 빨리 안내드리겠습니다.",
   "en": "I’ll check the planned boarding time and update you promptly.",
   "alt": [
    {
     "ja": "搭乗開始時刻を確認し、すぐにご連絡いたします。",
     "jr": "とうじょうかいしじこくを かくにんし、すぐに ごれんらくいたします。",
     "ko": "탑승 시작 시간을 확인해 곧바로 알려드리겠습니다.",
     "en": "I’ll confirm the boarding time and let you know shortly."
    }
   ]
  },
  {
   "r": "B",
   "ja": "実は子どもが一人で座るのを怖がっています。",
   "jr": "じつは こどもが ひとりで すわるのを こわがっています。",
   "ko": "사실 아이가 혼자 앉는 걸 무서워해요.",
   "en": "My child is actually scared of sitting alone."
  },
  {
   "r": "A",
   "ja": "承知しました。その点も含めて責任者に相談いたします。",
   "jr": "しょうちしました。その てんも ふくめて せきにんしゃに そうだんいたします。",
   "ko": "알겠습니다. 그 점도 포함해 책임자에게 상의하겠습니다.",
   "en": "I understand. I’ll raise that concern with the supervisor."
  },
  {
   "r": "B",
   "ja": "席を変えられない場合はどうなりますか。",
   "jr": "せきを かえられない ばあいは どうなりますか。",
   "ko": "자리를 못 바꾸면 어떻게 되나요?",
   "en": "What happens if no adjacent seats are available?"
  },
  {
   "r": "A",
   "ja": "確約はできませんが、可能な対応を確認してご説明します。",
   "jr": "かくやくは できませんが、かのうな たいおうを かくにんして ごせつめいします。",
   "ko": "확답드릴 수는 없지만 가능한 방법을 확인해 설명하겠습니다.",
   "en": "I can’t promise a particular seat, but I’ll explain the options available."
  },
  {
   "r": "B",
   "ja": "ありがとうございます。少し待ちます。",
   "jr": "ありがとうございます。すこし まちます。",
   "ko": "감사합니다. 잠시 기다리겠습니다.",
   "en": "Thank you. I’ll wait a moment."
  },
  {
   "r": "A",
   "ja": "確認が終わりましたら、こちらでお声がけいたします。",
   "jr": "かくにんが おわりましたら、こちらで おこえがけいたします。",
   "ko": "확인이 끝나면 여기서 불러 드리겠습니다.",
   "en": "I’ll call you over as soon as the check is complete.",
   "alt": [
    {
     "ja": "調整結果が分かり次第、こちらでお呼びします。",
     "jr": "ちょうせいけっかが わかりしだい、こちらで およびします。",
     "ko": "좌석 조정 결과가 나오는 대로 여기서 불러드리겠습니다.",
     "en": "I’ll call you here as soon as we have the result."
    }
   ]
  },
  {
   "r": "B",
   "ja": "お願いします。",
   "jr": "おねがいします。",
   "ko": "부탁드립니다.",
   "en": "Thank you."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「子どもと離れた席になっています。隣にできますか。」と言いました。どう答えますか。",
    "ko": "상대방이 “아이와 떨어진 좌석이에요. 옆자리로 바꿀 수 있나요?”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “My child is seated away from me. Can we sit together?” What is the best reply?"
   },
   "opts": [
    {
     "ja": "ご心配をおかけしました。空席と座席配置を確認いたします。",
     "ko": "걱정을 끼쳐 드려 죄송합니다. 빈자리와 좌석 배치를 확인하겠습니다.",
     "en": "I’m sorry about that. I’ll check the available seats and the new seat map."
    },
    {
     "ja": "滑走路の一時閉鎖により、出発を見合わせております。",
     "ko": "활주로 일시 폐쇄로 출발을 보류하고 있습니다.",
     "en": "Departures are temporarily suspended due to a runway closure."
    },
    {
     "ja": "お客様の便は出発ターミナルが変更になりました。",
     "ko": "고객님의 항공편 출발 터미널이 변경되었습니다.",
     "en": "Your flight will now depart from a different terminal."
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「実は子どもが一人で座るのを怖がっています。」と言いました。どう答えますか。",
    "ko": "상대방이 “사실 아이가 혼자 앉는 걸 무서워해요.”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “My child is actually scared of sitting alone.” What is the best reply?"
   },
   "opts": [
    {
     "ja": "こちらは臨時の到着空港です。今後のご案内をいたします。",
     "ko": "여기는 임시 도착 공항입니다. 이후 절차를 안내드리겠습니다.",
     "en": "This is the alternate airport. I’ll explain what we know about the next steps."
    },
    {
     "ja": "承知しました。その点も含めて責任者に相談いたします。",
     "ko": "알겠습니다. 그 점도 포함해 책임자에게 상의하겠습니다.",
     "en": "I understand. I’ll raise that concern with the supervisor."
    },
    {
     "ja": "機内で医療上の緊急事態があり、安全を優先しました。",
     "ko": "기내에 의료상 긴급 상황이 발생해 안전을 우선했습니다.",
     "en": "There was a medical emergency on board, and safety came first."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「ありがとうございます。少し待ちます。」と言いました。どう答えますか。",
    "ko": "상대방이 “감사합니다. 잠시 기다리겠습니다.”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “Thank you. I’ll wait a moment.” What is the best reply?"
   },
   "opts": [
    {
     "ja": "恐れ入りますが、こちらの通路は現在ご利用いただけません。",
     "ko": "죄송하지만 현재 이 통로는 이용할 수 없습니다.",
     "en": "I am sorry, but this passage is temporarily unavailable."
    },
    {
     "ja": "確認が終わりましたら、こちらでお声がけいたします。",
     "ko": "확인이 끝나면 여기서 불러 드리겠습니다.",
     "en": "I’ll call you over as soon as the check is complete."
    },
    {
     "ja": "現在の計画では、給油後に当初の目的地へ向かいます。",
     "ko": "현재 계획은 급유 후 원래 목적지로 향하는 것입니다.",
     "en": "The current plan is to continue to the original destination after refuelling."
    }
   ],
   "a": 1
  }
 ]
}
);
