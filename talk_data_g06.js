/* ACN 会話練習 追加データ talk_data_g06.js（GPT 2次修正本 talk_data_g06r.js を Claude が検収・修正：会話の流れ、ほかの言い方、確認問題 2026.10.10）。架空の練習用会話。日時・料金は例 */
window.TALK=window.TALK||[];window.TALK.push(
{
 "id": "travel-rail-lasttrain-1",
 "cat": "travel",
 "lv": 2,
 "title": {
  "ja": "終電を逃したときの移動相談",
  "ko": "막차를 놓쳤을 때 이동 상담",
  "en": "Finding transport after the last train"
 },
 "scene": {
  "ja": "空港への到着が遅くなり、旅行者が市内への移動手段を尋ねる。",
  "ko": "공항 도착이 늦어 여행자가 시내 이동 방법을 묻는다.",
  "en": "A late-arriving traveller asks how to reach the city."
 },
 "roles": {
  "A": {
   "ja": "案内係",
   "ko": "안내 직원",
   "en": "Information agent"
  },
  "B": {
   "ja": "旅行者",
   "ko": "여행자",
   "en": "Traveller"
  }
 },
 "ai": {
  "goal": {
   "ja": "利用可能な交通手段と確認先を説明する。",
   "ko": "이용 가능한 교통수단과 확인 방법을 설명한다.",
   "en": "Explain transport options and where to confirm availability."
  },
  "twist": {
   "ja": "旅行者が車いす対応の車両を必要とする。",
   "ko": "여행자가 휠체어 대응 차량이 필요하다고 말한다.",
   "en": "The traveller needs a wheelchair-accessible vehicle."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "最終電車の時刻を過ぎています。",
   "jr": "さいしゅうでんしゃの じこくを すぎています。",
   "ko": "막차 시간이 지났습니다.",
   "en": "The last train has already left."
  },
  {
   "r": "B",
   "ja": "市内までどうやって行けばいいですか。",
   "jr": "しないまで どうやって いけば いいですか。",
   "ko": "시내까지 어떻게 가야 하나요?",
   "en": "How can I get into the city?"
  },
  {
   "r": "A",
   "ja": "深夜バスなら、零時半発が一本あります。",
   "jr": "しんやバスなら、れいじはんはつが いっぽん あります。",
   "ko": "심야버스는 0시 30분에 한 편 있습니다.",
   "en": "There is one night bus departing at 12:30 a.m.",
   "alt": [
    {
     "ja": "深夜バスなら、零時半に一本出ています。",
     "jr": "しんやバスなら、れいじはんに いっぽん でて います。",
     "ko": "심야버스라면 0시 반에 한 대 있습니다.",
     "en": "There’s one night bus, leaving at half past midnight."
    }
   ]
  },
  {
   "r": "B",
   "ja": "その深夜バスは、どこから乗れますか。",
   "jr": "その しんやバスは、どこから のれますか。",
   "ko": "그 심야버스는 어디서 탈 수 있나요?",
   "en": "Where can I catch that night bus?"
  },
  {
   "r": "A",
   "ja": "一階の六番乗り場から出ます。",
   "jr": "いっかいの ろくばんのりばから でます。",
   "ko": "1층 6번 승차장에서 출발합니다.",
   "en": "It leaves from stop six on the ground floor."
  },
  {
   "r": "B",
   "ja": "料金も知りたいです。",
   "jr": "りょうきんも しりたいです。",
   "ko": "요금도 알고 싶습니다.",
   "en": "I would also like to know the fare."
  },
  {
   "r": "A",
   "ja": "運賃は千二百円です。券売機は乗り場の横にあります。",
   "jr": "うんちんは せんにひゃくえんです。けんばいきは のりばの よこに あります。",
   "ko": "요금은 1,200엔이고 발매기는 승차장 옆에 있습니다.",
   "en": "The fare is 1,200 yen, and the ticket machine is next to the stop.",
   "alt": [
    {
     "ja": "千二百円です。乗り場の横の券売機でお買い求めください。",
     "jr": "せんにひゃくえんです。のりばの よこの けんばいきで おかいもとめ ください。",
     "ko": "1,200엔입니다. 승차장 옆 발권기에서 구입해 주세요.",
     "en": "It’s 1,200 yen. You can buy a ticket from the machine next to the stop."
    }
   ]
  },
  {
   "r": "B",
   "ja": "車いすで乗れる車両はありますか。",
   "jr": "くるまいすで のれる しゃりょうは ありますか。",
   "ko": "휠체어로 탈 수 있는 차량이 있나요?",
   "en": "Is there a wheelchair-accessible vehicle?"
  },
  {
   "r": "A",
   "ja": "低床バスですが、車いすスペースの空きは運転手に確認します。",
   "jr": "ていしょうバスですが、くるまいすスペースの あきは うんてんしゅに かくにんします。",
   "ko": "저상버스지만 휠체어 공간은 기사에게 확인하겠습니다.",
   "en": "It is a low-floor bus, but I need to ask the driver about wheelchair space."
  },
  {
   "r": "B",
   "ja": "予約は必要でしょうか。",
   "jr": "よやくは ひつようでしょうか。",
   "ko": "예약이 필요한가요?",
   "en": "Would I need a reservation?"
  },
  {
   "r": "A",
   "ja": "バスは予約できませんが、車いすで乗れるタクシーなら、ここから電話で手配できます。",
   "jr": "バスは よやく できませんが、くるまいすで のれる タクシーなら、ここから でんわで てはい できます。",
   "ko": "버스는 예약이 안 되지만, 휠체어로 탈 수 있는 택시라면 여기서 전화로 불러 드릴 수 있습니다.",
   "en": "You can’t book the bus, but I can call a wheelchair-accessible taxi for you from here."
  },
  {
   "r": "B",
   "ja": "どこで待てばいいですか。",
   "jr": "どこで まてば いいですか。",
   "ko": "어디서 기다리면 되나요?",
   "en": "Where should I wait?"
  },
  {
   "r": "A",
   "ja": "では、この椅子でお待ちください。確認したらお呼びします。",
   "jr": "では、この いすで おまちください。かくにんしたら およびします。",
   "ko": "그럼 이 의자에서 기다려 주세요. 확인되면 부르겠습니다.",
   "en": "Please take a seat here. I will call you when I hear back.",
   "alt": [
    {
     "ja": "こちらにおかけになってお待ちください。分かりしだいお声がけします。",
     "jr": "こちらに おかけに なって おまち ください。わかりしだい おこえがけ します。",
     "ko": "여기 앉아서 기다려 주세요. 확인되는 대로 말씀드리겠습니다.",
     "en": "Please have a seat here. I’ll let you know as soon as I hear back."
    }
   ]
  },
  {
   "r": "B",
   "ja": "助かります。ありがとうございます。",
   "jr": "たすかります。ありがとうございます。",
   "ko": "도움이 되네요. 감사합니다.",
   "en": "That helps. Thank you."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「市内までどうやって行けばいいですか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “시내까지 어떻게 가야 하나요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “How can I get into the city?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "姓は同じですが、名のアルファベットが一文字違います。",
     "ko": "성은 같지만 이름의 알파벳 한 글자가 다릅니다.",
     "en": "The family name matches, but one letter in the given name differs."
    },
    {
     "ja": "もし搭乗橋が使えなかったら、どうなりますか。",
     "ko": "만약 탑승교를 쓸 수 없으면 어떻게 되나요?",
     "en": "What happens if the bridge can’t be used?"
    },
    {
     "ja": "深夜バスなら、零時半発が一本あります。",
     "ko": "심야버스는 0시 30분에 한 편 있습니다.",
     "en": "There is one night bus departing at 12:30 a.m."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「車いすで乗れる車両はありますか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “휠체어로 탈 수 있는 차량이 있나요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Is there a wheelchair-accessible vehicle?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "領収書はそろっていますか。",
     "ko": "영수증은 모두 있으신가요?",
     "en": "Do you have all the receipts?"
    },
    {
     "ja": "低床バスですが、車いすスペースの空きは運転手に確認します。",
     "ko": "저상버스지만 휠체어 공간은 기사에게 확인하겠습니다.",
     "en": "It is a low-floor bus, but I need to ask the driver about wheelchair space."
    },
    {
     "ja": "不足している数量をリストにして、倉庫担当へ緊急で共有します。",
     "ko": "부족한 수량을 목록으로 작성해 창고 담당에 긴급 전달하겠습니다.",
     "en": "I will list the missing quantities and escalate them urgently to the warehouse."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「どこで待てばいいですか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “어디서 기다리면 되나요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Where should I wait?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "海外出張でも使えるプランがいいです。",
     "ko": "해외 출장에서도 쓸 수 있는 요금제가 좋겠습니다.",
     "en": "I also need service when travelling abroad for work."
    },
    {
     "ja": "では、この椅子でお待ちください。確認したらお呼びします。",
     "ko": "그럼 이 의자에서 기다려 주세요. 확인되면 부르겠습니다.",
     "en": "Please take a seat here. I will call you when I hear back."
    },
    {
     "ja": "件名に日程変更と入れ、日時と時差を本文に書いてください。",
     "ko": "제목에 일정 변경을 넣고 본문에 날짜·시간·시차를 적어 주세요.",
     "en": "Put “Meeting reschedule” in the subject and include both time zones."
    }
   ],
   "a": 1
  }
 ]
},
{
 "id": "travel-hotel-latecheckin-1",
 "cat": "travel",
 "lv": 2,
 "title": {
  "ja": "到着遅れとホテルのチェックイン",
  "ko": "늦은 도착과 호텔 체크인",
  "en": "Late hotel check-in"
 },
 "scene": {
  "ja": "便の遅れで宿泊先への到着が遅くなり、旅行者がホテルに連絡する。",
  "ko": "항공편 지연으로 호텔 도착이 늦어져 여행자가 연락한다.",
  "en": "A traveller calls a hotel after a flight delay."
 },
 "roles": {
  "A": {
   "ja": "ホテルスタッフ",
   "ko": "호텔 직원",
   "en": "Hotel receptionist"
  },
  "B": {
   "ja": "宿泊客",
   "ko": "투숙객",
   "en": "Guest"
  }
 },
 "ai": {
  "goal": {
   "ja": "予約を確認し、深夜到着時の手順を案内する。",
   "ko": "예약을 확인하고 심야 도착 절차를 안내한다.",
   "en": "Confirm the reservation and explain late arrival procedures."
  },
  "twist": {
   "ja": "宿泊客が子どもの夕食を心配している。",
   "ko": "투숙객이 아이 저녁 식사를 걱정한다.",
   "en": "The guest asks about food for a child."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "お電話ありがとうございます。フロントでございます。",
   "jr": "おでんわ ありがとうございます。フロントで ございます。",
   "ko": "전화 주셔서 감사합니다. 프런트입니다.",
   "en": "Thank you for calling the front desk."
  },
  {
   "r": "B",
   "ja": "飛行機が遅れて到着が深夜になります。",
   "jr": "ひこうきが おくれて とうちゃくが しんやに なります。",
   "ko": "비행기가 지연돼 밤늦게 도착합니다.",
   "en": "My flight is delayed and I will arrive late tonight."
  },
  {
   "r": "A",
   "ja": "ご連絡ありがとうございます。お名前を伺えますか。",
   "jr": "ごれんらく ありがとうございます。おなまえを うかがえますか。",
   "ko": "연락 감사합니다. 성함을 알려주시겠어요?",
   "en": "Thank you for letting us know. May I have your name?",
   "alt": [
    {
     "ja": "お知らせいただきありがとうございます。ご予約のお名前をお願いできますか。",
     "jr": "おしらせ いただき ありがとう ございます。ごよやくの おなまえを おねがい できますか。",
     "ko": "알려 주셔서 감사합니다. 예약하신 분 성함을 알려 주시겠어요?",
     "en": "Thank you for letting us know. May I have the name on the booking?"
    }
   ]
  },
  {
   "r": "B",
   "ja": "予約はキムの名前で入っています。",
   "jr": "よやくは キムの なまえで はいっています。",
   "ko": "김 이름으로 예약했습니다.",
   "en": "The booking is under Kim."
  },
  {
   "r": "A",
   "ja": "キム様ですね。一泊二名様のご予約が見つかりました。",
   "jr": "キムさまですね。いっぱく にめいさまの ごよやくが みつかりました。",
   "ko": "김 님, 1박 2명 예약이 확인됐습니다.",
   "en": "I found your booking for two guests for one night."
  },
  {
   "r": "B",
   "ja": "夜中でもチェックインできますか。",
   "jr": "よなかでも チェックインできますか。",
   "ko": "한밤중에도 체크인할 수 있나요?",
   "en": "Can I check in after midnight?"
  },
  {
   "r": "A",
   "ja": "はい。深夜一時以降は正面玄関が閉まりますので、横のインターホンを押してください。",
   "jr": "はい。しんや いちじ いこうは しょうめん げんかんが しまりますので、よこの インターホンを おして ください。",
   "ko": "네. 새벽 1시 이후에는 정문이 닫히니 옆에 있는 인터폰을 눌러 주세요.",
   "en": "Yes. The main entrance locks after 1 a.m., so please press the intercom beside it."
  },
  {
   "r": "B",
   "ja": "子どもがいるので食事が心配です。",
   "jr": "こどもが いるので しょくじが しんぱいです。",
   "ko": "아이가 있어서 식사가 걱정됩니다.",
   "en": "I am worried about food for my child."
  },
  {
   "r": "A",
   "ja": "レストランは十時で閉まりますが、ロビーに軽食の自動販売機があります。",
   "jr": "レストランは じゅうじで しまりますが、ロビーに けいしょくの じどうはんばいきが あります。",
   "ko": "식당은 10시에 닫지만 로비에 간식 자판기가 있습니다.",
   "en": "The restaurant closes at ten, but there is a snack machine in the lobby.",
   "alt": [
    {
     "ja": "レストランは十時までですが、ロビーに軽食の自動販売機がございます。",
     "jr": "レストランは じゅうじ までですが、ロビーに けいしょくの じどう はんばいきが ございます。",
     "ko": "레스토랑은 10시까지지만 로비에 간단한 음식 자판기가 있습니다.",
     "en": "The restaurant closes at ten, but there’s a snack vending machine in the lobby."
    }
   ]
  },
  {
   "r": "B",
   "ja": "空港からはタクシーで向かいます。",
   "jr": "くうこうからは タクシーで むかいます。",
   "ko": "공항에서 택시로 이동합니다.",
   "en": "I will take a taxi from the airport."
  },
  {
   "r": "A",
   "ja": "到着予定が変わればご連絡ください。",
   "jr": "とうちゃくよていが かわれば ごれんらくください。",
   "ko": "도착 예정이 바뀌면 연락해 주세요.",
   "en": "Please let us know if your arrival time changes."
  },
  {
   "r": "B",
   "ja": "必要な書類はありますか。",
   "jr": "ひつような しょるいは ありますか。",
   "ko": "필요한 서류가 있나요?",
   "en": "Do I need any documents?"
  },
  {
   "r": "A",
   "ja": "チェックイン時は、ご予約のお名前と身分証明書をお願いします。",
   "jr": "チェックインじは、ごよやくの おなまえと みぶんしょうめいしょを おねがいします。",
   "ko": "체크인할 때 예약자 이름과 신분증을 알려 주세요.",
   "en": "Please provide the booking name and identification at check-in.",
   "alt": [
    {
     "ja": "チェックインの際に、パスポートなど身分証明書をお見せください。",
     "jr": "チェックインの さいに、パスポートなど みぶん しょうめいしょを おみせ ください。",
     "ko": "체크인하실 때 여권 등 신분증을 보여 주세요.",
     "en": "Please show your passport or other ID when you check in."
    }
   ]
  },
  {
   "r": "B",
   "ja": "分かりました。よろしくお願いします。",
   "jr": "わかりました。よろしく おねがいします。",
   "ko": "알겠습니다. 부탁드립니다.",
   "en": "Understood. Thank you."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「飛行機が遅れて到着が深夜になります。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “비행기가 지연돼 밤늦게 도착합니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “My flight is delayed and I will arrive late tonight.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "ご連絡ありがとうございます。お名前を伺えますか。",
     "ko": "연락 감사합니다. 성함을 알려주시겠어요?",
     "en": "Thank you for letting us know. May I have your name?"
    },
    {
     "ja": "プラン変更のご相談ですね。",
     "ko": "요금제 변경 문의시군요.",
     "en": "You would like to change your plan, correct?"
    },
    {
     "ja": "今は海外に滞在しています。",
     "ko": "현재 해외에 머무르고 있습니다.",
     "en": "I am currently staying overseas."
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「子どもがいるので食事が心配です。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “아이가 있어서 식사가 걱정됩니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “I am worried about food for my child.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "今は海外に滞在しています。",
     "ko": "현재 해외에 머무르고 있습니다.",
     "en": "I am currently staying overseas."
    },
    {
     "ja": "レストランは十時で閉まりますが、ロビーに軽食の自動販売機があります。",
     "ko": "식당은 10시에 닫지만 로비에 간식 자판기가 있습니다.",
     "en": "The restaurant closes at ten, but there is a snack machine in the lobby."
    },
    {
     "ja": "前回のメーターが百二十、今回が百四十五で、二十五立方メートルのご使用です。",
     "ko": "지난번 계량기가 120, 이번이 145로, 25세제곱미터를 사용하셨습니다.",
     "en": "The meter read 120 last time and 145 this time, so you used 25 cubic meters."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「必要な書類はありますか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “필요한 서류가 있나요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Do I need any documents?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "前回のメーターが百二十、今回が百四十五で、二十五立方メートルのご使用です。",
     "ko": "지난번 계량기가 120, 이번이 145로, 25세제곱미터를 사용하셨습니다.",
     "en": "The meter read 120 last time and 145 this time, so you used 25 cubic meters."
    },
    {
     "ja": "不足している数量をリストにして、倉庫担当へ緊急で共有します。",
     "ko": "부족한 수량을 목록으로 작성해 창고 담당에 긴급 전달하겠습니다.",
     "en": "I will list the missing quantities and escalate them urgently to the warehouse."
    },
    {
     "ja": "チェックイン時は、ご予約のお名前と身分証明書をお願いします。",
     "ko": "체크인할 때 예약자 이름과 신분증을 알려 주세요.",
     "en": "Please provide the booking name and identification at check-in."
    }
   ],
   "a": 2
  }
 ]
},
{
 "id": "travel-lost-phone-1",
 "cat": "travel",
 "lv": 2,
 "title": {
  "ja": "旅行中に携帯電話をなくした",
  "ko": "여행 중 휴대전화 분실",
  "en": "Lost phone during a trip"
 },
 "scene": {
  "ja": "旅行者が駅で携帯電話を紛失し、案内所に相談する。",
  "ko": "여행자가 역에서 휴대전화를 잃어버려 안내소에 문의한다.",
  "en": "A traveller reports a missing phone at a station."
 },
 "roles": {
  "A": {
   "ja": "駅の案内係",
   "ko": "역 안내 직원",
   "en": "Station information agent"
  },
  "B": {
   "ja": "旅行者",
   "ko": "여행자",
   "en": "Traveller"
  }
 },
 "ai": {
  "goal": {
   "ja": "紛失場所と連絡方法を確認して届出先を案内する。",
   "ko": "분실 위치와 연락 방법을 확인하고 신고처를 안내한다.",
   "en": "Ask about the location and contact method, then explain lost-property reporting."
  },
  "twist": {
   "ja": "旅行者は携帯電話で宿泊先の住所を管理していた。",
   "ko": "여행자가 휴대전화에 호텔 주소를 저장해 두었다.",
   "en": "The hotel address was stored on the lost phone."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "何かお困りでしょうか。",
   "jr": "なにか おこまりでしょうか。",
   "ko": "무엇을 도와드릴까요?",
   "en": "How can I help you?"
  },
  {
   "r": "B",
   "ja": "電車を降りてから携帯が見当たりません。",
   "jr": "でんしゃを おりてから けいたいが みあたりません。",
   "ko": "전철에서 내린 후 휴대전화가 안 보입니다.",
   "en": "I cannot find my phone since getting off the train."
  },
  {
   "r": "A",
   "ja": "最後に使った場所は覚えていますか。",
   "jr": "さいごに つかった ばしょは おぼえていますか。",
   "ko": "마지막으로 사용한 장소를 기억하시나요?",
   "en": "Do you remember where you last used it?",
   "alt": [
    {
     "ja": "最後に携帯を使ったのは、どこでしたか。",
     "jr": "さいごに けいたいを つかったのは、どこでしたか。",
     "ko": "마지막으로 휴대폰을 쓴 곳이 어디였나요?",
     "en": "Where did you last use your phone?"
    }
   ]
  },
  {
   "r": "B",
   "ja": "車内で地図を見ていました。",
   "jr": "しゃないで ちずを みていました。",
   "ko": "차 안에서 지도를 보고 있었습니다.",
   "en": "I was looking at a map on the train."
  },
  {
   "r": "A",
   "ja": "ご乗車の路線と時刻を教えてください。",
   "jr": "ごじょうしゃの ろせんと じこくを おしえてください。",
   "ko": "탑승 노선과 시간을 알려 주세요.",
   "en": "Which line were you on, and at what time?"
  },
  {
   "r": "B",
   "ja": "青い電車で十分ほど前です。",
   "jr": "あおい でんしゃで じゅっぷんほど まえです。",
   "ko": "파란 전철이었고 약 10분 전입니다.",
   "en": "It was a blue train, about ten minutes ago."
  },
  {
   "r": "A",
   "ja": "忘れ物の受付は、改札を出て右の窓口です。",
   "jr": "わすれものの うけつけは、かいさつを でて みぎの まどぐちです。",
   "ko": "분실물 접수처는 개찰구를 나가 오른쪽 창구입니다.",
   "en": "The lost-property counter is on the right after the ticket gates.",
   "alt": [
    {
     "ja": "忘れ物の窓口は、改札を出てすぐ右手にあります。",
     "jr": "わすれものの まどぐちは、かいさつを でて すぐ みぎてに あります。",
     "ko": "분실물 창구는 개찰구를 나와서 바로 오른쪽에 있습니다.",
     "en": "The lost-property office is just to the right after you go through the ticket gates."
    }
   ]
  },
  {
   "r": "B",
   "ja": "ホテルの住所も電話に入っています。",
   "jr": "ホテルの じゅうしょも でんわに はいっています。",
   "ko": "호텔 주소도 휴대전화에 있습니다.",
   "en": "My hotel address is stored on the phone too."
  },
  {
   "r": "A",
   "ja": "予約確認メールなどはお持ちですか。",
   "jr": "よやくかくにんメールなどは おもちですか。",
   "ko": "예약 확인 메일 등이 있으신가요?",
   "en": "Do you have a booking confirmation email?"
  },
  {
   "r": "B",
   "ja": "紙の控えはありません。",
   "jr": "かみの ひかえは ありません。",
   "ko": "종이로 된 확인서는 없습니다.",
   "en": "I do not have a paper copy."
  },
  {
   "r": "A",
   "ja": "ホテル名が分かれば、案内所の地図で場所をお探ししますよ。",
   "jr": "ホテルめいが わかれば、あんないじょの ちずで ばしょを おさがししますよ。",
   "ko": "호텔 이름을 알면 안내소 지도에서 위치를 찾아드릴게요.",
   "en": "If you know the hotel name, I can locate it on our map.",
   "alt": [
    {
     "ja": "ホテルの名前を覚えていれば、こちらの地図で場所を調べられますよ。",
     "jr": "ホテルの なまえを おぼえて いれば、こちらの ちずで ばしょを しらべられますよ。",
     "ko": "호텔 이름을 기억하시면 여기 지도로 위치를 찾아볼 수 있어요.",
     "en": "If you remember the hotel’s name, we can look it up on this map."
    }
   ]
  },
  {
   "r": "B",
   "ja": "連絡先は友人の番号でもいいですか。",
   "jr": "れんらくさきは ゆうじんの ばんごうでも いいですか。",
   "ko": "연락처를 친구 번호로 해도 되나요?",
   "en": "May I leave my friend’s number as a contact?"
  },
  {
   "r": "A",
   "ja": "はい、ご友人の了承を得て、その番号を連絡先に書いてください。",
   "jr": "はい、ごゆうじんの りょうしょうを えて、その ばんごうを れんらくさきに かいてください。",
   "ko": "네, 친구분의 동의를 받고 그 번호를 연락처로 적어 주세요.",
   "en": "Yes, with your friend’s permission, write their number as the contact."
  },
  {
   "r": "B",
   "ja": "ありがとうございます。お願いします。",
   "jr": "ありがとうございます。おねがいします。",
   "ko": "감사합니다. 부탁드립니다.",
   "en": "Thank you very much."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「電車を降りてから携帯が見当たりません。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “전철에서 내린 후 휴대전화가 안 보입니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “I cannot find my phone since getting off the train.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "カード明細と利用日のメモを添付して申請してください。受理できるかは審査します。",
     "ko": "카드 명세와 사용일 메모를 첨부해 신청하세요. 인정 여부는 심사합니다.",
     "en": "Attach the card statement and a note of the date. Acceptance is subject to review."
    },
    {
     "ja": "面接の日程について伺いたいです。",
     "ko": "면접 일정에 대해 문의하고 싶습니다.",
     "en": "I would like to ask about the interview schedule."
    },
    {
     "ja": "最後に使った場所は覚えていますか。",
     "ko": "마지막으로 사용한 장소를 기억하시나요?",
     "en": "Do you remember where you last used it?"
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「ホテルの住所も電話に入っています。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “호텔 주소도 휴대전화에 있습니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “My hotel address is stored on the phone too.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "スマートフォンでも取得できますか。",
     "ko": "휴대전화로도 발급받을 수 있나요?",
     "en": "Can I get it on my phone?"
    },
    {
     "ja": "予約確認メールなどはお持ちですか。",
     "ko": "예약 확인 메일 등이 있으신가요?",
     "en": "Do you have a booking confirmation email?"
    },
    {
     "ja": "カード明細と利用日のメモを添付して申請してください。受理できるかは審査します。",
     "ko": "카드 명세와 사용일 메모를 첨부해 신청하세요. 인정 여부는 심사합니다.",
     "en": "Attach the card statement and a note of the date. Acceptance is subject to review."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「連絡先は友人の番号でもいいですか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “연락처를 친구 번호로 해도 되나요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “May I leave my friend’s number as a contact?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "もし搭乗橋が使えなかったら、どうなりますか。",
     "ko": "만약 탑승교를 쓸 수 없으면 어떻게 되나요?",
     "en": "What happens if the bridge can’t be used?"
    },
    {
     "ja": "はい、ご友人の了承を得て、その番号を連絡先に書いてください。",
     "ko": "네, 친구분의 동의를 받고 그 번호를 연락처로 적어 주세요.",
     "en": "Yes, with your friend’s permission, write their number as the contact."
    },
    {
     "ja": "署名はいりませんが、冷蔵品なので、直接お受け取りいただく形になります。",
     "ko": "서명은 필요 없지만 냉장품이라 직접 받으셔야 합니다.",
     "en": "No signature is needed, but because it’s refrigerated, you’ll need to receive it in person."
    }
   ],
   "a": 1
  }
 ]
},
{
 "id": "travel-restaurant-allergy-1",
 "cat": "travel",
 "lv": 2,
 "title": {
  "ja": "食物アレルギーの確認",
  "ko": "음식 알레르기 확인",
  "en": "Checking food allergies"
 },
 "scene": {
  "ja": "旅行者がレストランで料理の原材料と調理方法を確認する。",
  "ko": "여행자가 식당에서 재료와 조리 방식을 확인한다.",
  "en": "A traveller asks a restaurant about ingredients and preparation."
 },
 "roles": {
  "A": {
   "ja": "レストランスタッフ",
   "ko": "식당 직원",
   "en": "Restaurant server"
  },
  "B": {
   "ja": "旅行者",
   "ko": "여행자",
   "en": "Traveller"
  }
 },
 "ai": {
  "goal": {
   "ja": "原材料と交差接触の可能性を厨房へ確認する。",
   "ko": "재료 및 교차접촉 가능성을 주방에 확인한다.",
   "en": "Check ingredients and cross-contact risks with the kitchen."
  },
  "twist": {
   "ja": "旅行者が調理器具の共用についても質問する。",
   "ko": "여행자가 조리도구 공용 여부도 질문한다.",
   "en": "The traveller asks whether cooking utensils are shared."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "いらっしゃいませ。ご注文はお決まりですか。",
   "jr": "いらっしゃいませ。ごちゅうもんは おきまりですか。",
   "ko": "어서 오세요. 주문 정하셨나요?",
   "en": "Welcome. Are you ready to order?"
  },
  {
   "r": "B",
   "ja": "食物アレルギーがあるので確認したいです。",
   "jr": "しょくもつアレルギーが あるので かくにんしたいです。",
   "ko": "음식 알레르기가 있어 확인하고 싶습니다.",
   "en": "I have a food allergy and need to check something."
  },
  {
   "r": "A",
   "ja": "どの食材にアレルギーがありますか。",
   "jr": "どの しょくざいに アレルギーが ありますか。",
   "ko": "어떤 식재료에 알레르기가 있으신가요?",
   "en": "Which ingredients are you allergic to?",
   "alt": [
    {
     "ja": "何のアレルギーがおありですか。",
     "jr": "なんの アレルギーが おありですか。",
     "ko": "어떤 알레르기가 있으신가요?",
     "en": "What are you allergic to?"
    }
   ]
  },
  {
   "r": "B",
   "ja": "えびとカニです。",
   "jr": "えびと カニです。",
   "ko": "새우와 게입니다.",
   "en": "Shrimp and crab."
  },
  {
   "r": "A",
   "ja": "承知しました。気になるお料理はどれですか。",
   "jr": "しょうち しました。きに なる おりょうりは どれですか。",
   "ko": "알겠습니다. 신경 쓰이는 요리가 어떤 건가요?",
   "en": "Certainly. Which dish are you wondering about?"
  },
  {
   "r": "B",
   "ja": "このスープには入っていますか。",
   "jr": "この スープには はいっていますか。",
   "ko": "이 수프에 들어 있나요?",
   "en": "Does this soup contain either of those?"
  },
  {
   "r": "A",
   "ja": "材料表ではえびは使っていませんが、カニのだしを使っているか厨房に聞いてきます。",
   "jr": "ざいりょうひょうでは えびは つかって いませんが、カニの だしを つかって いるか ちゅうぼうに きいて きます。",
   "ko": "재료표상으로는 새우는 안 쓰지만, 게 육수를 쓰는지 주방에 물어보고 오겠습니다.",
   "en": "The ingredient list shows no shrimp, but I’ll ask the kitchen whether the stock uses crab."
  },
  {
   "r": "B",
   "ja": "同じ器具で調理していますか。",
   "jr": "おなじ きぐで ちょうりしていますか。",
   "ko": "같은 도구로 조리하나요?",
   "en": "Is the same equipment used to prepare other dishes?"
  },
  {
   "r": "A",
   "ja": "鍋やお玉を共用している可能性もあるので、調理担当に聞きます。",
   "jr": "なべや おたまを きょうようしている かのうせいも あるので、ちょうりたんとうに ききます。",
   "ko": "냄비나 국자를 함께 사용할 수 있어서 조리 담당자에게 확인하겠습니다.",
   "en": "Pots and ladles may be shared, so I will check with the cook.",
   "alt": [
    {
     "ja": "鍋やお玉を一緒に使っているかもしれないので、調理担当に確かめます。",
     "jr": "なべや おたまを いっしょに つかって いるかも しれないので、ちょうり たんとうに たしかめます。",
     "ko": "냄비나 국자를 같이 쓰고 있을 수도 있으니 조리 담당에게 확인하겠습니다.",
     "en": "We might share pots and ladles, so I’ll check with the cook."
    }
   ]
  },
  {
   "r": "B",
   "ja": "少量でも反応することがあります。",
   "jr": "しょうりょうでも はんのうすることが あります。",
   "ko": "소량에도 반응할 수 있습니다.",
   "en": "Even a small amount can cause a reaction."
  },
  {
   "r": "A",
   "ja": "承知しました。少しでも入っている可能性があれば、正直にお伝えします。",
   "jr": "しょうち しました。すこしでも はいって いる かのうせいが あれば、しょうじきに おつたえ します。",
   "ko": "알겠습니다. 조금이라도 들어 있을 가능성이 있으면 솔직하게 말씀드리겠습니다.",
   "en": "I understand. If there’s any chance it’s in there, I’ll tell you honestly."
  },
  {
   "r": "B",
   "ja": "確認できなければ別の料理にします。",
   "jr": "かくにんできなければ べつの りょうりに します。",
   "ko": "확인할 수 없으면 다른 메뉴로 하겠습니다.",
   "en": "If you cannot confirm, I will choose something else."
  },
  {
   "r": "A",
   "ja": "調理器具を分けられるかは、お約束できないんです。念のため、別のお料理も一緒に選びましょうか。",
   "jr": "ちょうり きぐを わけられるかは、おやくそく できないんです。ねんのため、べつの おりょうりも いっしょに えらびましょうか。",
   "ko": "조리 도구를 따로 쓸 수 있을지는 약속드리기 어렵습니다. 혹시 모르니 다른 요리도 같이 골라 볼까요?",
   "en": "I can’t promise we can use separate utensils. Just in case, shall we choose another dish as well?",
   "alt": [
    {
     "ja": "器具を完全に分けられるとは言い切れません。ほかのお料理もご案内しますね。",
     "jr": "きぐを かんぜんに わけられるとは いいきれません。ほかの おりょうりも ごあんない しますね。",
     "ko": "도구를 완전히 분리할 수 있다고는 단언하기 어렵습니다. 다른 요리도 안내해 드릴게요.",
     "en": "I can’t say for sure we can keep the utensils separate. Let me suggest some other dishes too."
    }
   ]
  },
  {
   "r": "B",
   "ja": "ありがとうございます。待っています。",
   "jr": "ありがとうございます。まっています。",
   "ko": "감사합니다. 기다리겠습니다.",
   "en": "Thank you. I will wait."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「食物アレルギーがあるので確認したいです。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “음식 알레르기가 있어 확인하고 싶습니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “I have a food allergy and need to check something.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "どの食材にアレルギーがありますか。",
     "ko": "어떤 식재료에 알레르기가 있으신가요?",
     "en": "Which ingredients are you allergic to?"
    },
    {
     "ja": "配布物は後日お渡しできます。急ぎの資料はアプリに掲載します。",
     "ko": "배포물은 나중에 받을 수 있고, 급한 자료는 앱에 올립니다.",
     "en": "Handouts can be collected later; urgent notices are posted in the app."
    },
    {
     "ja": "顧客との連絡履歴もありますか。",
     "ko": "고객 연락 이력도 있나요?",
     "en": "Are past client communications available?"
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「同じ器具で調理していますか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “같은 도구로 조리하나요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Is the same equipment used to prepare other dishes?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "本日はどのようなご用件でしょうか。",
     "ko": "오늘은 어떤 일로 오셨나요?",
     "en": "How can I help you today?"
    },
    {
     "ja": "鍋やお玉を共用している可能性もあるので、調理担当に聞きます。",
     "ko": "냄비나 국자를 함께 사용할 수 있어서 조리 담당자에게 확인하겠습니다.",
     "en": "Pots and ladles may be shared, so I will check with the cook."
    },
    {
     "ja": "こちらの三ギガプランなら月額二千円です。",
     "ko": "이 3GB 요금제는 월 2,000엔입니다.",
     "en": "This 3 GB plan costs 2,000 yen per month."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「確認できなければ別の料理にします。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “확인할 수 없으면 다른 메뉴로 하겠습니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “If you cannot confirm, I will choose something else.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "おはようございます。パスポートを拝見してもよろしいですか。",
     "ko": "안녕하세요. 여권 좀 확인해도 될까요?",
     "en": "Good morning. May I see your passport, please?"
    },
    {
     "ja": "調理器具を分けられるかは、お約束できないんです。念のため、別のお料理も一緒に選びましょうか。",
     "ko": "조리 도구를 따로 쓸 수 있을지는 약속드리기 어렵습니다. 혹시 모르니 다른 요리도 같이 골라 볼까요?",
     "en": "I can’t promise we can use separate utensils. Just in case, shall we choose another dish as well?"
    },
    {
     "ja": "前の方の使用分が含まれていないか、開始時の指針値を調べます。",
     "ko": "전 거주자의 사용량이 포함됐는지 계약 시작 시 검침 수치를 확인하겠습니다.",
     "en": "I will check the opening meter reading for any prior tenant’s usage."
    }
   ],
   "a": 1
  }
 ]
},
{
 "id": "travel-rentalcar-insurance-1",
 "cat": "travel",
 "lv": 2,
 "title": {
  "ja": "レンタカーの補償条件の確認",
  "ko": "렌터카 보장 조건 확인",
  "en": "Clarifying rental car coverage"
 },
 "scene": {
  "ja": "旅行者がレンタカーの受取時に補償範囲と返却方法を確認する。",
  "ko": "여행자가 렌터카 인수 시 보장 범위와 반납 방법을 확인한다.",
  "en": "A traveller asks about rental coverage and return procedures."
 },
 "roles": {
  "A": {
   "ja": "レンタカー係員",
   "ko": "렌터카 직원",
   "en": "Rental desk agent"
  },
  "B": {
   "ja": "利用者",
   "ko": "이용자",
   "en": "Customer"
  }
 },
 "ai": {
  "goal": {
   "ja": "契約書の条件と事故時の連絡先を確認する。",
   "ko": "계약 조건과 사고 발생 시 연락처를 확인한다.",
   "en": "Clarify contract terms and how to report an incident."
  },
  "twist": {
   "ja": "利用者が早朝の営業時間外に返却したいと言う。",
   "ko": "고객이 이른 아침 영업시간 외에 반납하고 싶다고 말한다.",
   "en": "The customer wants to return the vehicle before opening hours."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "ご予約ありがとうございます。ご契約内容を確認します。",
   "jr": "ごよやく ありがとうございます。ごけいやくないようを かくにんします。",
   "ko": "예약 감사합니다. 계약 내용을 확인하겠습니다.",
   "en": "Thank you for your reservation. Let us review the rental agreement."
  },
  {
   "r": "B",
   "ja": "補償の範囲について質問があります。",
   "jr": "ほしょうの はんいについて しつもんが あります。",
   "ko": "보장 범위에 대해 질문이 있습니다.",
   "en": "I have a question about the insurance coverage."
  },
  {
   "r": "A",
   "ja": "どの項目についてでしょうか。",
   "jr": "どの こうもくについてでしょうか。",
   "ko": "어떤 항목에 대한 질문인가요?",
   "en": "Which part would you like to clarify?",
   "alt": [
    {
     "ja": "どの点が気になりますか。",
     "jr": "どの てんが きに なりますか。",
     "ko": "어떤 점이 궁금하세요?",
     "en": "Which part would you like to ask about?"
    }
   ]
  },
  {
   "r": "B",
   "ja": "小さな傷も対象になりますか。",
   "jr": "ちいさな きずも たいしょうに なりますか。",
   "ko": "작은 흠집도 보장되나요?",
   "en": "Are minor scratches covered?"
  },
  {
   "r": "A",
   "ja": "小さな傷も対象です。お客様のご負担額は、補償プランによって変わります。こちらをご覧ください。",
   "jr": "ちいさな きずも たいしょうです。おきゃくさまの ごふたんがくは、ほしょう プランに よって かわります。こちらを ごらん ください。",
   "ko": "작은 흠집도 대상입니다. 고객님 부담액은 보상 플랜에 따라 달라집니다. 이쪽을 봐 주세요.",
   "en": "Small scratches are covered too. How much you pay depends on your protection plan—please take a look here."
  },
  {
   "r": "B",
   "ja": "事故のときはまず何をすればいいですか。",
   "jr": "じこの ときは まず なにを すれば いいですか。",
   "ko": "사고가 나면 먼저 무엇을 해야 하나요?",
   "en": "What should I do first if there is an accident?"
  },
  {
   "r": "A",
   "ja": "まず安全な場所に停車し、けが人がいれば救急へ。その後、警察と当社へご連絡ください。",
   "jr": "まず あんぜんな ばしょに ていしゃし、けがにんが いれば きゅうきゅうへ。そのあと、けいさつと とうしゃへ ごれんらくください。",
   "ko": "먼저 안전한 곳에 정차하고 부상자가 있으면 구급대에 연락하세요. 그다음 경찰과 당사에 연락해 주세요.",
   "en": "Stop somewhere safe, call emergency services if anyone is hurt, then contact the police and us."
  },
  {
   "r": "B",
   "ja": "朝早く空港へ返却したいです。",
   "jr": "あさ はやく くうこうへ へんきゃくしたいです。",
   "ko": "아침 일찍 공항에 반납하고 싶습니다.",
   "en": "I want to return the car at the airport early in the morning."
  },
  {
   "r": "A",
   "ja": "早朝の返却は可能です。営業所の裏に返却専用の駐車枠があります。",
   "jr": "そうちょうの へんきゃくは かのうです。えいぎょうしょの うらに へんきゃくせんようの ちゅうしゃわくが あります。",
   "ko": "이른 아침 반납이 가능합니다. 영업소 뒤편에 반납 전용 주차구역이 있습니다.",
   "en": "Early returns are possible. There is a designated return bay behind our office.",
   "alt": [
    {
     "ja": "早朝でも返却できます。営業所の裏にある返却用の駐車スペースに止めてください。",
     "jr": "そうちょうでも へんきゃく できます。えいぎょうしょの うらに ある へんきゃくようの ちゅうしゃ スペースに とめて ください。",
     "ko": "이른 아침에도 반납 가능합니다. 영업소 뒤편 반납 전용 주차 공간에 세워 주세요.",
     "en": "You can return it early in the morning. Please park in the return spaces behind the office."
    }
   ]
  },
  {
   "r": "B",
   "ja": "鍵はどこに返すのでしょうか。",
   "jr": "かぎは どこに かえすのでしょうか。",
   "ko": "열쇠는 어디에 반납하나요?",
   "en": "Where should I leave the keys?"
  },
  {
   "r": "A",
   "ja": "鍵は入口横の返却ボックスへ。車内の忘れ物もご確認ください。",
   "jr": "かぎは いりぐちよこの へんきゃくボックスへ。しゃないの わすれものも ごかくにんください。",
   "ko": "열쇠는 입구 옆 반납함에 넣고 차량 내 분실물이 없는지도 확인해 주세요.",
   "en": "Put the key in the return box by the entrance, and check for belongings.",
   "alt": [
    {
     "ja": "鍵は入口の横にある返却ボックスに入れてください。お忘れ物にもご注意ください。",
     "jr": "かぎは いりぐちの よこに ある へんきゃく ボックスに いれて ください。おわすれものにも ごちゅうい ください。",
     "ko": "열쇠는 입구 옆 반납함에 넣어 주세요. 두고 가시는 물건 없도록 주의해 주세요.",
     "en": "Please put the key in the drop box by the entrance, and don’t forget your belongings."
    }
   ]
  },
  {
   "r": "B",
   "ja": "追加料金が発生する場合はありますか。",
   "jr": "ついかりょうきんが はっせいする ばあいは ありますか。",
   "ko": "추가 요금이 발생할 수도 있나요?",
   "en": "Could there be any additional charges?"
  },
  {
   "r": "A",
   "ja": "ガソリンを満タンにせずに返された場合や、返却時間を過ぎた場合にかかります。",
   "jr": "ガソリンを まんタンに せずに かえされた ばあいや、へんきゃく じかんを すぎた ばあいに かかります。",
   "ko": "기름을 가득 채우지 않고 반납하시거나, 반납 시간을 넘기셨을 때 발생합니다.",
   "en": "There are extra charges if you return the car without a full tank or after the return time."
  },
  {
   "r": "B",
   "ja": "分かりました。満タンにして返します。",
   "jr": "わかりました。まんタンに して かえします。",
   "ko": "알겠습니다. 기름 가득 채워서 반납할게요.",
   "en": "Got it. I’ll bring it back with a full tank."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「補償の範囲について質問があります。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “보장 범위에 대해 질문이 있습니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “I have a question about the insurance coverage.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "昨日は十一時を過ぎても続いていました。",
     "ko": "어제는 11시가 넘어도 계속됐습니다.",
     "en": "It continued past eleven last night."
    },
    {
     "ja": "受け取りに署名は必要ですか。",
     "ko": "수령할 때 서명이 필요한가요?",
     "en": "Is a signature required?"
    },
    {
     "ja": "どの項目についてでしょうか。",
     "ko": "어떤 항목에 대한 질문인가요?",
     "en": "Which part would you like to clarify?"
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「朝早く空港へ返却したいです。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “아침 일찍 공항에 반납하고 싶습니다.”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “I want to return the car at the airport early in the morning.” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "変更はいつから適用されますか。",
     "ko": "변경은 언제부터 적용되나요?",
     "en": "When would the change take effect?"
    },
    {
     "ja": "早朝の返却は可能です。営業所の裏に返却専用の駐車枠があります。",
     "ko": "이른 아침 반납이 가능합니다. 영업소 뒤편에 반납 전용 주차구역이 있습니다.",
     "en": "Early returns are possible. There is a designated return bay behind our office."
    },
    {
     "ja": "申請期限は今週末でしょうか。",
     "ko": "신청 기한이 이번 주 말인가요?",
     "en": "Is the deadline this weekend?"
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「追加料金が発生する場合はありますか。」と言いました。次の返答として適切なのはどれですか。",
    "ko": "상대가 “추가 요금이 발생할 수도 있나요?”라고 했습니다. 다음 답변으로 적절한 것은?",
    "en": "The other person says, “Could there be any additional charges?” Which reply fits the conversation?"
   },
   "opts": [
    {
     "ja": "ガソリンを満タンにせずに返された場合や、返却時間を過ぎた場合にかかります。",
     "ko": "기름을 가득 채우지 않고 반납하시거나, 반납 시간을 넘기셨을 때 발생합니다.",
     "en": "There are extra charges if you return the car without a full tank or after the return time."
    },
    {
     "ja": "黒くて、取っ手に赤いリボンがついています。",
     "ko": "검은색이고 손잡이에 빨간 리본이 달려 있습니다.",
     "en": "It is black and has a red ribbon on the handle."
    },
    {
     "ja": "通訳は予約制です。必要な言語を伺って手配できるか調べます。",
     "ko": "통역은 예약제입니다. 필요한 언어를 여쭙고 배정 가능한지 확인하겠습니다.",
     "en": "Interpretation requires booking. Tell me the language and I will check availability."
    }
   ],
   "a": 0
  }
 ]
}
);
