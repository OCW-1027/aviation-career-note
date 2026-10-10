/* ACN 会話練習 追加データ（GPT 作成 talk_data_g04.js を Claude が検収・修正：日本語の不自然な行、確認問題の誤答 2026.10.10）。架空の訓練用会話 */
window.TALK=window.TALK||[];window.TALK.push(
{
 "id": "air-irrops-atc-slot-1",
 "cat": "work",
 "lv": 3,
 "title": {
  "ja": "航空管制による出発制限",
  "ko": "항공교통관제에 따른 출발 제한",
  "en": "Departure slot restriction"
 },
 "scene": {
  "ja": "航空管制の出発制限で搭乗後も離陸時刻が定まらず、乗客が案内を求める。",
  "ko": "항공교통관제 출발 제한으로 탑승 후에도 이륙 시각이 정해지지 않아 승객이 안내를 요청한다.",
  "en": "An air traffic control restriction delays departure after boarding."
 },
 "roles": {
  "A": {
   "ja": "客室乗務員",
   "ko": "객실승무원",
   "en": "Cabin crew member"
  },
  "B": {
   "ja": "乗客",
   "ko": "승객",
   "en": "Passenger"
  }
 },
 "ai": {
  "goal": {
   "ja": "未確定の出発時刻を約束せず、最新情報と安全上の指示を明確に伝える。",
   "ko": "확정되지 않은 출발 시각을 약속하지 않고 최신 정보와 안전 지시를 명확히 전달한다.",
   "en": "Share verified updates without promising an unconfirmed departure time."
  },
  "twist": {
   "ja": "乗客が乗り継ぎ便への影響を相談する。",
   "ko": "승객이 연결편에 미칠 영향을 문의한다.",
   "en": "The passenger asks about a connecting flight."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "航空管制の指示により、出発を待機しております。",
   "jr": "こうくうかんせいの しじにより、しゅっぱつを たいきしております。",
   "ko": "항공교통관제 지시에 따라 출발 대기 중입니다.",
   "en": "We are waiting to depart under air traffic control instructions.",
   "alt": [
    {
     "ja": "航空管制の調整により、ただいま出発を見合わせています。",
     "jr": "こうくうかんせいの ちょうせいにより、ただいま しゅっぱつを みあわせています。",
     "ko": "항공교통관제 조정으로 현재 출발을 보류하고 있습니다.",
     "en": "Departure is currently on hold due to air traffic control coordination."
    }
   ]
  },
  {
   "r": "B",
   "ja": "もう搭乗しましたが、いつ離陸できますか。",
   "jr": "もう とうじょうしましたが、いつ りりくできますか。",
   "ko": "이미 탑승했는데 언제 이륙할 수 있나요?",
   "en": "We have boarded already. When can we take off?"
  },
  {
   "r": "A",
   "ja": "現在のところ、出発時刻はまだ確定しておりません。",
   "jr": "げんざいの ところ、しゅっぱつじこくは まだ かくていしておりません。",
   "ko": "현재 출발 시각은 아직 확정되지 않았습니다.",
   "en": "The departure time has not yet been confirmed."
  },
  {
   "r": "B",
   "ja": "機材に問題があるわけではないのですね。",
   "jr": "きざいに もんだいが あるわけでは ないのですね。",
   "ko": "항공기 자체에 문제가 있는 건 아니군요?",
   "en": "So this is not an aircraft problem?"
  },
  {
   "r": "A",
   "ja": "今回ご案内している待機理由は、航空管制上の制限です。",
   "jr": "こんかい ごあんないしている たいきりゆうは、こうくうかんせいじょうの せいげんです。",
   "ko": "현재 안내드리는 대기 사유는 항공교통관제 제한입니다.",
   "en": "The reason we have been given for this wait is an air traffic control restriction."
  },
  {
   "r": "B",
   "ja": "次の案内はいつごろになりますか。",
   "jr": "つぎの あんないは いつごろに なりますか。",
   "ko": "다음 안내는 언제쯤인가요?",
   "en": "When should we expect the next update?"
  },
  {
   "r": "A",
   "ja": "新しい情報を受け取り次第、機内で放送いたします。",
   "jr": "あたらしい じょうほうを うけとりしだい、きないで ほうそういたします。",
   "ko": "새 정보가 들어오는 즉시 기내 방송으로 안내하겠습니다.",
   "en": "We will make an announcement as soon as we receive new information.",
   "alt": [
    {
     "ja": "続報が入りましたら、すぐに機内放送でお伝えします。",
     "jr": "ぞくほうが はいりましたら、すぐに きないほうそうで おつたえします。",
     "ko": "추가 정보가 들어오면 즉시 기내 방송으로 전하겠습니다.",
     "en": "We will announce any further updates on board promptly."
    }
   ]
  },
  {
   "r": "B",
   "ja": "この遅れで乗り継ぎに間に合わないかもしれません。",
   "jr": "この おくれで のりつぎに まにあわないかもしれません。",
   "ko": "이번 지연으로 연결편을 놓칠 수도 있습니다.",
   "en": "I might miss my connection because of this delay."
  },
  {
   "r": "A",
   "ja": "到着後の乗り継ぎ案内について、担当部署へ確認します。",
   "jr": "とうちゃくごの のりつぎあんないについて、たんとうぶしょへ かくにんします。",
   "ko": "도착 후 연결편 안내를 담당 부서에 확인하겠습니다.",
   "en": "I will check with the relevant team about connection assistance on arrival."
  },
  {
   "r": "B",
   "ja": "今ここで別の便に変更できますか。",
   "jr": "いま ここで べつの びんに へんこうできますか。",
   "ko": "지금 여기서 다른 항공편으로 바꿀 수 있나요?",
   "en": "Can I change to another flight from here?"
  },
  {
   "r": "A",
   "ja": "変更の可否は予約条件と運航状況の確認が必要です。",
   "jr": "へんこうの かひは よやくじょうけんと うんこうじょうきょうの かくにんが ひつようです。",
   "ko": "변경 가능 여부는 예약 조건과 운항 상황 확인이 필요합니다.",
   "en": "Any change depends on your booking conditions and the operating situation."
  },
  {
   "r": "B",
   "ja": "それでは最新情報を待ちます。",
   "jr": "それでは さいしんじょうほうを まちます。",
   "ko": "그럼 최신 안내를 기다리겠습니다.",
   "en": "Then I will wait for the latest update."
  },
  {
   "r": "A",
   "ja": "ご不便をおかけします。安全上のご案内にもご協力ください。",
   "jr": "ごふべんを おかけします。あんぜんじょうの ごあんないにも ごきょうりょくください。",
   "ko": "불편을 드려 죄송합니다. 안전 안내에도 협조 부탁드립니다.",
   "en": "We apologize for the inconvenience. Please continue to follow the safety instructions.",
   "alt": [
    {
     "ja": "お待たせして申し訳ありません。引き続き安全に関する指示をお守りください。",
     "jr": "おまたせして もうしわけありません。ひきつづき あんぜんに かんする しじを おまもりください。",
     "ko": "기다리시게 해 죄송합니다. 계속 안전 지시에 따라주세요.",
     "en": "We are sorry for the wait. Please continue to follow the safety directions."
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
    "ja": "相手が「もう搭乗しましたが、いつ離陸できますか。」と言いました。適切な返答はどれですか。",
    "ko": "상대방이 “이미 탑승했는데 언제 이륙할 수 있나요?”라고 했습니다. 적절한 답변은 무엇인가요?",
    "en": "The other person says, “We have boarded already. When can we take off?” Which reply fits best?"
   },
   "opts": [
    {
     "ja": "手荷物の所在と取り扱いを担当者に確認します。",
     "ko": "담당자에게 수하물 위치와 처리 방법을 확인하겠습니다.",
     "en": "I’ll check the location and handling of your bag with the baggage team."
    },
    {
     "ja": "現在のところ、出発時刻はまだ確定しておりません。",
     "ko": "현재 출발 시각은 아직 확정되지 않았습니다.",
     "en": "The departure time has not yet been confirmed."
    },
    {
     "ja": "手荷物の引き継ぎ状況を担当部署に確認します。",
     "ko": "담당 부서에 수하물 연결 처리 상황을 확인하겠습니다.",
     "en": "I’ll check the baggage transfer status with the relevant team."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「この遅れで乗り継ぎに間に合わないかもしれません。」と言いました。適切な返答はどれですか。",
    "ko": "상대방이 “이번 지연으로 연결편을 놓칠 수도 있습니다.”라고 했습니다. 적절한 답변은 무엇인가요?",
    "en": "The other person says, “I might miss my connection because of this delay.” Which reply fits best?"
   },
   "opts": [
    {
     "ja": "機内で医療上の緊急事態があり、安全を優先しました。",
     "ko": "기내에 의료상 긴급 상황이 발생해 안전을 우선했습니다.",
     "en": "There was a medical emergency on board, and safety came first."
    },
    {
     "ja": "手荷物の所在と取り扱いを担当者に確認します。",
     "ko": "담당자에게 수하물 위치와 처리 방법을 확인하겠습니다.",
     "en": "I’ll check the location and handling of your bag with the baggage team."
    },
    {
     "ja": "到着後の乗り継ぎ案内について、担当部署へ確認します。",
     "ko": "도착 후 연결편 안내를 담당 부서에 확인하겠습니다.",
     "en": "I will check with the relevant team about connection assistance on arrival."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「それでは最新情報を待ちます。」と言いました。適切な返答はどれですか。",
    "ko": "상대방이 “그럼 최신 안내를 기다리겠습니다.”라고 했습니다. 적절한 답변은 무엇인가요?",
    "en": "The other person says, “Then I will wait for the latest update.” Which reply fits best?"
   },
   "opts": [
    {
     "ja": "予約番号と最終目的地を確認させてください。",
     "ko": "예약번호와 최종 목적지를 확인하겠습니다.",
     "en": "May I check your booking reference and final destination?"
    },
    {
     "ja": "元の座席指定も記録で確認し、調整できるか調べます。",
     "ko": "기존 좌석 배정도 확인하고 조정할 수 있는지 살펴보겠습니다.",
     "en": "I’ll review your original seat selection and see what can be arranged."
    },
    {
     "ja": "ご不便をおかけします。安全上のご案内にもご協力ください。",
     "ko": "불편을 드려 죄송합니다. 안전 안내에도 협조 부탁드립니다.",
     "en": "We apologize for the inconvenience. Please continue to follow the safety instructions."
    }
   ],
   "a": 2
  }
 ]
},
{
 "id": "air-irrops-security-rescreen-1",
 "cat": "work",
 "lv": 3,
 "title": {
  "ja": "保安区域の再検査",
  "ko": "보안구역 재검색 안내",
  "en": "Security re-screening"
 },
 "scene": {
  "ja": "保安区域の一部が閉鎖され、乗客が再度保安検査を受ける必要がある。",
  "ko": "보안구역 일부가 폐쇄되어 승객이 다시 보안검색을 받아야 한다.",
  "en": "A section of the secure area is closed and passengers are directed to re-screening."
 },
 "roles": {
  "A": {
   "ja": "空港案内係員",
   "ko": "공항 안내 직원",
   "en": "Airport information agent"
  },
  "B": {
   "ja": "乗客",
   "ko": "승객",
   "en": "Passenger"
  }
 },
 "ai": {
  "goal": {
   "ja": "保安上の理由を推測せず、確定した再検査動線を案内する。",
   "ko": "보안상 이유를 추측하지 않고 확인된 재검색 동선을 안내한다.",
   "en": "Give confirmed re-screening directions without speculating about the security incident."
  },
  "twist": {
   "ja": "乗客が搭乗締切に間に合うか不安を示す。",
   "ko": "승객이 탑승 마감 시간에 늦을까 걱정한다.",
   "en": "The passenger worries about the boarding deadline."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "恐れ入りますが、こちらの通路は現在ご利用いただけません。",
   "jr": "おそれいりますが、こちらの つうろは げんざい ごりよういただけません。",
   "ko": "죄송하지만 현재 이 통로는 이용할 수 없습니다.",
   "en": "I am sorry, but this passage is temporarily unavailable.",
   "alt": [
    {
     "ja": "申し訳ありませんが、この通路は一時的に閉鎖されています。",
     "jr": "もうしわけ ありませんが、この つうろは いちじてきに へいさされています。",
     "ko": "죄송하지만 이 통로는 일시적으로 폐쇄되었습니다.",
     "en": "Sorry, this passage is temporarily closed."
    }
   ]
  },
  {
   "r": "B",
   "ja": "搭乗口へ向かっているところです。どうすればいいですか。",
   "jr": "とうじょうぐちへ むかっている ところです。どうすれば いいですか。",
   "ko": "탑승구로 가는 중인데 어떻게 해야 하나요?",
   "en": "I am on my way to the gate. What should I do?"
  },
  {
   "r": "A",
   "ja": "係員の誘導に従い、指定された検査場へお進みください。",
   "jr": "かかりいんの ゆうどうに したがい、していされた けんさじょうへ おすすみください。",
   "ko": "직원 안내에 따라 지정된 검색장으로 이동해 주세요.",
   "en": "Please follow staff directions to the designated screening checkpoint."
  },
  {
   "r": "B",
   "ja": "もう一度、保安検査を受けるのですか。",
   "jr": "もういちど、ほあんけんさを うけるのですか。",
   "ko": "보안검색을 다시 받아야 하나요?",
   "en": "Do I need to go through security again?"
  },
  {
   "r": "A",
   "ja": "はい。対象のお客様には再検査をお願いしております。",
   "jr": "はい。たいしょうの おきゃくさまには さいけんさを おねがいしております。",
   "ko": "네. 해당 승객께는 재검색을 요청드리고 있습니다.",
   "en": "Yes. Passengers in the affected area are being asked to undergo screening again."
  },
  {
   "r": "B",
   "ja": "何が起きたのか教えてもらえますか。",
   "jr": "なにが おきたのか おしえてもらえますか。",
   "ko": "무슨 일이 있었는지 알려주실 수 있나요?",
   "en": "Can you tell me what happened?"
  },
  {
   "r": "A",
   "ja": "詳しい原因は確認中です。未確認の情報はご案内できません。",
   "jr": "くわしい げんいんは かくにんちゅうです。みかくにんの じょうほうは ごあんないできません。",
   "ko": "자세한 원인은 확인 중이며 미확인 정보는 안내할 수 없습니다.",
   "en": "The details are still being checked, so I cannot share unverified information.",
   "alt": [
    {
     "ja": "原因については調査中のため、現時点でご説明できる情報はありません。",
     "jr": "げんいんについては ちょうさちゅうの ため、げんじてんで ごせつめいできる じょうほうは ありません。",
     "ko": "원인은 조사 중이므로 현재 설명드릴 수 있는 정보가 없습니다.",
     "en": "The cause is being investigated and we have no verified details to share yet."
    }
   ]
  },
  {
   "r": "B",
   "ja": "搭乗締切に間に合うか心配です。",
   "jr": "とうじょうしめきりに まにあうか しんぱいです。",
   "ko": "탑승 마감 시간에 늦을까 걱정됩니다.",
   "en": "I am worried I will miss the boarding cutoff."
  },
  {
   "r": "A",
   "ja": "ご利用便を伺い、運航会社へ状況を連絡いたします。",
   "jr": "ごりようびんを うかがい、うんこうがいしゃへ じょうきょうを れんらくいたします。",
   "ko": "이용 항공편을 확인해 항공사에 상황을 전달하겠습니다.",
   "en": "I will note your flight and inform the airline of the situation."
  },
  {
   "r": "B",
   "ja": "便名はこちらの搭乗券にあります。",
   "jr": "びんめいは こちらの とうじょうけんに あります。",
   "ko": "편명은 이 탑승권에 나와 있습니다.",
   "en": "The flight number is on this boarding pass."
  },
  {
   "r": "A",
   "ja": "ありがとうございます。再検査後の経路はこちらです。",
   "jr": "ありがとうございます。さいけんさごの けいろは こちらです。",
   "ko": "감사합니다. 재검색 후 이동 경로는 이쪽입니다.",
   "en": "Thank you. This is the route to take after re-screening."
  },
  {
   "r": "B",
   "ja": "この先の案内表示を見ればいいですね。",
   "jr": "この さきの あんないひょうじを みれば いいですね。",
   "ko": "이후 안내 표지판을 확인하면 되겠군요.",
   "en": "So I should follow the signs ahead?"
  },
  {
   "r": "A",
   "ja": "はい。不明な点は途中の係員にお尋ねください。",
   "jr": "はい。ふめいな てんは とちゅうの かかりいんに おたずねください。",
   "ko": "네. 궁금한 점은 중간에 있는 직원에게 문의해 주세요.",
   "en": "Yes. Please ask staff along the way if anything is unclear.",
   "alt": [
    {
     "ja": "はい。途中で迷われた場合は、係員にお声がけください。",
     "jr": "はい。とちゅうで まよわれた ばあいは、かかりいんに おこえがけください。",
     "ko": "네. 가다가 길을 모르시면 직원에게 문의해 주세요.",
     "en": "Yes. If you lose your way, please speak to a staff member."
    }
   ]
  },
  {
   "r": "B",
   "ja": "分かりました。案内ありがとうございます。",
   "jr": "わかりました。あんない ありがとうございます。",
   "ko": "알겠습니다. 안내 감사합니다.",
   "en": "Understood. Thank you for the guidance."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「搭乗口へ向かっているところです。どうすればいいですか。」と言いました。適切な返答はどれですか。",
    "ko": "상대방이 “탑승구로 가는 중인데 어떻게 해야 하나요?”라고 했습니다. 적절한 답변은 무엇인가요?",
    "en": "The other person says, “I am on my way to the gate. What should I do?” Which reply fits best?"
   },
   "opts": [
    {
     "ja": "係員の誘導に従い、指定された検査場へお進みください。",
     "ko": "직원 안내에 따라 지정된 검색장으로 이동해 주세요.",
     "en": "Please follow staff directions to the designated screening checkpoint."
    },
    {
     "ja": "手荷物の所在と取り扱いを担当者に確認します。",
     "ko": "담당자에게 수하물 위치와 처리 방법을 확인하겠습니다.",
     "en": "I’ll check the location and handling of your bag with the baggage team."
    },
    {
     "ja": "現在ご案内している遅延理由は乗務員の交代です。",
     "ko": "현재 안내된 지연 사유는 승무원 교체입니다.",
     "en": "The delay reason currently communicated is the crew replacement."
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「搭乗締切に間に合うか心配です。」と言いました。適切な返答はどれですか。",
    "ko": "상대방이 “탑승 마감 시간에 늦을까 걱정됩니다.”라고 했습니다. 적절한 답변은 무엇인가요?",
    "en": "The other person says, “I am worried I will miss the boarding cutoff.” Which reply fits best?"
   },
   "opts": [
    {
     "ja": "ご予約が座席数を上回っています。ご協力は任意です。",
     "ko": "예약 인원이 좌석 수보다 많습니다. 변경은 자발적 선택입니다.",
     "en": "There are more reservations than seats. Volunteering is entirely optional."
    },
    {
     "ja": "手荷物の所在と取り扱いを担当者に確認します。",
     "ko": "담당자에게 수하물 위치와 처리 방법을 확인하겠습니다.",
     "en": "I’ll check the location and handling of your bag with the baggage team."
    },
    {
     "ja": "ご利用便を伺い、運航会社へ状況を連絡いたします。",
     "ko": "이용 항공편을 확인해 항공사에 상황을 전달하겠습니다.",
     "en": "I will note your flight and inform the airline of the situation."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「この先の案内表示を見ればいいですね。」と言いました。適切な返答はどれですか。",
    "ko": "상대방이 “이후 안내 표지판을 확인하면 되겠군요.”라고 했습니다. 적절한 답변은 무엇인가요?",
    "en": "The other person says, “So I should follow the signs ahead?” Which reply fits best?"
   },
   "opts": [
    {
     "ja": "空席と変更条件を順に調べます。予約番号を伺えますか。",
     "ko": "남은 좌석과 변경 조건을 차례로 확인하겠습니다. 예약번호를 알려 주시겠어요?",
     "en": "I’ll check available seats and the change conditions. May I have your booking reference?"
    },
    {
     "ja": "はい。不明な点は途中の係員にお尋ねください。",
     "ko": "네. 궁금한 점은 중간에 있는 직원에게 문의해 주세요.",
     "en": "Yes. Please ask staff along the way if anything is unclear."
    },
    {
     "ja": "ご予約が座席数を上回っています。ご協力は任意です。",
     "ko": "예약 인원이 좌석 수보다 많습니다. 변경은 자발적 선택입니다.",
     "en": "There are more reservations than seats. Volunteering is entirely optional."
    }
   ],
   "a": 1
  }
 ]
},
{
 "id": "air-irrops-maintenance-check-1",
 "cat": "work",
 "lv": 2,
 "title": {
  "ja": "整備確認による出発待機",
  "ko": "정비 확인에 따른 출발 대기",
  "en": "Departure delayed for maintenance checks"
 },
 "scene": {
  "ja": "出発前の整備確認が長引き、乗客が安全性と出発見込みを尋ねる。",
  "ko": "출발 전 정비 확인이 길어져 승객이 안전성과 출발 예정을 묻는다.",
  "en": "A pre-departure maintenance inspection takes longer than expected."
 },
 "roles": {
  "A": {
   "ja": "搭乗口係員",
   "ko": "탑승구 직원",
   "en": "Gate agent"
  },
  "B": {
   "ja": "乗客",
   "ko": "승객",
   "en": "Passenger"
  }
 },
 "ai": {
  "goal": {
   "ja": "技術的な判断を代弁せず、確認中の状態と今後の案内を伝える。",
   "ko": "기술 판단을 대신하지 않고 점검 상태와 추후 안내를 전한다.",
   "en": "Explain the inspection status and updates without making technical safety assurances."
  },
  "twist": {
   "ja": "乗客が搭乗口を離れてよいか尋ねる。",
   "ko": "승객이 탑승구를 떠나도 되는지 묻는다.",
   "en": "The passenger asks whether they may leave the gate."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "機材の整備確認のため、搭乗開始を見合わせております。",
   "jr": "きざいの せいびかくにんの ため、とうじょうかいしを みあわせております。",
   "ko": "항공기 정비 확인을 위해 탑승 시작을 보류하고 있습니다.",
   "en": "Boarding is on hold while maintenance checks are carried out.",
   "alt": [
    {
     "ja": "整備点検が続いているため、搭乗はまだ始められません。",
     "jr": "せいびてんけんが つづいているため、とうじょうは まだ はじめられません。",
     "ko": "정비 점검이 계속되어 아직 탑승을 시작할 수 없습니다.",
     "en": "Boarding cannot start yet because the maintenance inspection is ongoing."
    }
   ]
  },
  {
   "r": "B",
   "ja": "何か故障が見つかったのですか。",
   "jr": "なにか こしょうが みつかったのですか。",
   "ko": "어떤 고장이 발견된 건가요?",
   "en": "Has a fault been found?"
  },
  {
   "r": "A",
   "ja": "詳細は整備担当が確認中で、現時点ではお答えできません。",
   "jr": "しょうさいは せいびたんとうが かくにんちゅうで、げんじてんでは おこたえできません。",
   "ko": "세부 내용은 정비 담당자가 확인 중이라 지금은 답변드리기 어렵습니다.",
   "en": "The maintenance team is still checking the details, so I cannot confirm that yet."
  },
  {
   "r": "B",
   "ja": "飛行機は安全に飛べるのでしょうか。",
   "jr": "ひこうきは あんぜんに とべるのでしょうか。",
   "ko": "항공기가 안전하게 비행할 수 있을까요?",
   "en": "Will the aircraft be safe to fly?"
  },
  {
   "r": "A",
   "ja": "運航の可否は所定の確認が終わってから判断されます。",
   "jr": "うんこうの かひは しょていの かくにんが おわってから はんだんされます。",
   "ko": "운항 가능 여부는 정해진 확인 절차가 끝난 뒤 판단됩니다.",
   "en": "A decision on operation will be made after the required checks are complete."
  },
  {
   "r": "B",
   "ja": "出発時刻はもう決まりましたか。",
   "jr": "しゅっぱつじこくは もう きまりましたか。",
   "ko": "출발 시각은 결정됐나요?",
   "en": "Has the departure time been set?"
  },
  {
   "r": "A",
   "ja": "まだ確定しておりません。更新があり次第お知らせします。",
   "jr": "まだ かくていしておりません。こうしんが ありしだい おしらせします。",
   "ko": "아직 확정되지 않았습니다. 변경 사항이 생기면 안내하겠습니다.",
   "en": "Not yet. We will share an update when it becomes available.",
   "alt": [
    {
     "ja": "出発の見込みが分かりましたら、改めてお知らせします。",
     "jr": "しゅっぱつの みこみが わかりましたら、あらためて おしらせします。",
     "ko": "출발 예상 시간이 확인되면 다시 알려드리겠습니다.",
     "en": "We will provide another update once we have an estimated departure time."
    }
   ]
  },
  {
   "r": "B",
   "ja": "少し買い物に行っても大丈夫ですか。",
   "jr": "すこし かいものに いっても だいじょうぶですか。",
   "ko": "잠깐 쇼핑하러 가도 괜찮을까요?",
   "en": "May I go shopping for a while?"
  },
  {
   "r": "A",
   "ja": "放送が聞こえる範囲でお待ちいただけますと助かります。",
   "jr": "ほうそうが きこえる はんいで おまち いただけますと たすかります。",
   "ko": "안내 방송이 들리는 곳에서 기다려 주시면 감사하겠습니다.",
   "en": "It would help if you could wait where you can hear the announcements."
  },
  {
   "r": "B",
   "ja": "搭乗口の変更もありますか。",
   "jr": "とうじょうぐちの へんこうも ありますか。",
   "ko": "탑승구도 변경될 수 있나요?",
   "en": "Could the gate change as well?"
  },
  {
   "r": "A",
   "ja": "変更が決まった場合は表示と放送でご案内します。",
   "jr": "へんこうが きまった ばあいは ひょうじと ほうそうで ごあんないします。",
   "ko": "변경이 결정되면 전광판과 방송으로 안내하겠습니다.",
   "en": "Any confirmed change will be announced and shown on the displays."
  },
  {
   "r": "B",
   "ja": "では、こちらで待つことにします。",
   "jr": "では、こちらで まつことに します。",
   "ko": "그럼 여기서 기다리겠습니다.",
   "en": "Then I will wait here."
  },
  {
   "r": "A",
   "ja": "ご不便をおかけし、申し訳ございません。",
   "jr": "ごふべんを おかけし、もうしわけ ございません。",
   "ko": "불편을 드려 죄송합니다.",
   "en": "We apologize for the inconvenience.",
   "alt": [
    {
     "ja": "ご迷惑をおかけしておりますことをおわび申し上げます。",
     "jr": "ごめいわくを おかけしておりますことを おわびもうしあげます。",
     "ko": "불편을 끼쳐 드린 점 사과드립니다.",
     "en": "Please accept our apologies for the disruption."
    }
   ]
  },
  {
   "r": "B",
   "ja": "状況が分かったら教えてください。",
   "jr": "じょうきょうが わかったら おしえてください。",
   "ko": "상황이 확인되면 알려 주세요.",
   "en": "Please let us know when you have more information."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「何か故障が見つかったのですか。」と言いました。適切な返答はどれですか。",
    "ko": "상대방이 “어떤 고장이 발견된 건가요?”라고 했습니다. 적절한 답변은 무엇인가요?",
    "en": "The other person says, “Has a fault been found?” Which reply fits best?"
   },
   "opts": [
    {
     "ja": "詳細は整備担当が確認中で、現時点ではお答えできません。",
     "ko": "세부 내용은 정비 담당자가 확인 중이라 지금은 답변드리기 어렵습니다.",
     "en": "The maintenance team is still checking the details, so I cannot confirm that yet."
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
  },
  {
   "q": {
    "ja": "相手が「少し買い物に行っても大丈夫ですか。」と言いました。適切な返答はどれですか。",
    "ko": "상대방이 “잠깐 쇼핑하러 가도 괜찮을까요?”라고 했습니다. 적절한 답변은 무엇인가요?",
    "en": "The other person says, “May I go shopping for a while?” Which reply fits best?"
   },
   "opts": [
    {
     "ja": "最新の運航表示を確認し、出発ターミナルをご案内します。",
     "ko": "최신 운항 표시를 확인해 출발 터미널을 안내하겠습니다.",
     "en": "I will verify the latest flight display and confirm the departure terminal."
    },
    {
     "ja": "放送が聞こえる範囲でお待ちいただけますと助かります。",
     "ko": "안내 방송이 들리는 곳에서 기다려 주시면 감사하겠습니다.",
     "en": "It would help if you could wait where you can hear the announcements."
    },
    {
     "ja": "空席と予約条件を確認し、変更可能な選択肢をご案内します。",
     "ko": "좌석 상황과 예약 조건을 확인한 뒤 변경 가능한 선택지를 안내하겠습니다.",
     "en": "I will check availability and ticket conditions, then explain any possible changes."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「では、こちらで待つことにします。」と言いました。適切な返答はどれですか。",
    "ko": "상대방이 “그럼 여기서 기다리겠습니다.”라고 했습니다. 적절한 답변은 무엇인가요?",
    "en": "The other person says, “Then I will wait here.” Which reply fits best?"
   },
   "opts": [
    {
     "ja": "到着後の乗り継ぎ案内について、担当部署へ確認します。",
     "ko": "도착 후 연결편 안내를 담당 부서에 확인하겠습니다.",
     "en": "I will check with the relevant team about connection assistance on arrival."
    },
    {
     "ja": "手荷物引換証の番号から、現在の追跡状況を確認します。",
     "ko": "수하물표 번호로 현재 추적 상황을 확인하겠습니다.",
     "en": "I will use your baggage tag number to check the current tracking status."
    },
    {
     "ja": "ご不便をおかけし、申し訳ございません。",
     "ko": "불편을 드려 죄송합니다.",
     "en": "We apologize for the inconvenience."
    }
   ],
   "a": 2
  }
 ]
},
{
 "id": "air-irrops-curfew-1",
 "cat": "work",
 "lv": 3,
 "title": {
  "ja": "空港運用時間と翌朝便",
  "ko": "공항 운용시간 제한과 익일편",
  "en": "Airport operating-hours restriction"
 },
 "scene": {
  "ja": "遅延が続き、目的地空港の運用時間内に到着できない可能性が生じる。",
  "ko": "지연이 이어지면서 목적지 공항 운용시간 내 도착하지 못할 가능성이 생긴다.",
  "en": "A continued delay raises the possibility of missing the destination airport operating window."
 },
 "roles": {
  "A": {
   "ja": "カウンター責任者",
   "ko": "카운터 책임자",
   "en": "Counter supervisor"
  },
  "B": {
   "ja": "乗客",
   "ko": "승객",
   "en": "Passenger"
  }
 },
 "ai": {
  "goal": {
   "ja": "運用時間の制約と代替案の確認状況を説明し、未確定の支援を約束しない。",
   "ko": "운용시간 제약과 대안을 확인하는 상황을 설명하고 미확정 지원을 약속하지 않는다.",
   "en": "Explain the operating-hours restriction and pending alternatives without promising assistance."
  },
  "twist": {
   "ja": "乗客が翌朝の重要な予定を伝える。",
   "ko": "승객이 다음 날 아침 중요한 일정이 있다고 알린다.",
   "en": "The passenger has an important appointment the next morning."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "遅延が続き、到着空港の運用時間に影響する可能性があります。",
   "jr": "ちえんが つづき、とうちゃくくうこうの うんようじかんに えいきょうする かのうせいが あります。",
   "ko": "지연이 계속되어 도착 공항 운용시간에 영향을 줄 수 있습니다.",
   "en": "The continuing delay may affect the destination airport’s operating hours.",
   "alt": [
    {
     "ja": "到着地の空港が利用できる時間帯に影響が出るおそれがあります。",
     "jr": "とうちゃくちの くうこうが りようできる じかんたいに えいきょうが でる おそれが あります。",
     "ko": "도착 공항 이용 가능 시간대에 영향이 생길 우려가 있습니다.",
     "en": "The delay may affect the permitted arrival window at our destination."
    }
   ]
  },
  {
   "r": "B",
   "ja": "今日はもう飛ばないということですか。",
   "jr": "きょうは もう とばないという ことですか。",
   "ko": "그럼 오늘은 더 이상 운항하지 않는 건가요?",
   "en": "Does that mean the flight will not depart today?"
  },
  {
   "r": "A",
   "ja": "運航については現在調整中で、まだ決定しておりません。",
   "jr": "うんこうについては げんざい ちょうせいちゅうで、まだ けっていしておりません。",
   "ko": "운항 여부는 현재 조정 중이며 아직 결정되지 않았습니다.",
   "en": "The operating plan is still being reviewed. No decision has been made yet."
  },
  {
   "r": "B",
   "ja": "到着が深夜になっても着陸できませんか。",
   "jr": "とうちゃくが しんやに なっても ちゃくりくできませんか。",
   "ko": "심야에 도착해도 착륙할 수 없나요?",
   "en": "Could we still land late at night?"
  },
  {
   "r": "A",
   "ja": "空港の運用条件や許可の有無を確認する必要があります。",
   "jr": "くうこうの うんようじょうけんや きょかの うむを かくにんする ひつようが あります。",
   "ko": "공항 운용 조건과 허가 여부를 확인해야 합니다.",
   "en": "That depends on airport operating conditions and any required approvals."
  },
  {
   "r": "B",
   "ja": "明日の朝、大切な会議があるんです。",
   "jr": "あしたの あさ、たいせつな かいぎが あるんです。",
   "ko": "내일 아침 중요한 회의가 있습니다.",
   "en": "I have an important meeting tomorrow morning."
  },
  {
   "r": "A",
   "ja": "ご事情を承りました。代替便の候補も確認いたします。",
   "jr": "ごじじょうを うけたまわりました。だいたいびんの こうほも かくにんいたします。",
   "ko": "사정을 알겠습니다. 대체 항공편 후보도 확인하겠습니다.",
   "en": "I understand. I will also check possible alternative flights.",
   "alt": [
    {
     "ja": "事情は承知しました。別の便を利用できるか調べます。",
     "jr": "じじょうは しょうちしました。べつの びんを りようできるか しらべます。",
     "ko": "사정을 알겠습니다. 다른 편을 이용할 수 있는지 확인하겠습니다.",
     "en": "I understand your circumstances and will look into other flight options."
    }
   ]
  },
  {
   "r": "B",
   "ja": "もし明日になったら、宿泊はどうなりますか。",
   "jr": "もし あしたに なったら、しゅくはくは どうなりますか。",
   "ko": "만약 내일로 미뤄지면 숙박은 어떻게 되나요?",
   "en": "If we have to travel tomorrow, what about accommodation?"
  },
  {
   "r": "A",
   "ja": "宿泊などの支援は適用条件を確認してご案内します。",
   "jr": "しゅくはくなどの しえんは てきようじょうけんを かくにんして ごあんないします。",
   "ko": "숙박 등 지원은 적용 조건을 확인한 후 안내하겠습니다.",
   "en": "We will check the applicable conditions before advising on accommodation assistance."
  },
  {
   "r": "B",
   "ja": "今のうちに自分でホテルを取るべきですか。",
   "jr": "いまの うちに じぶんで ホテルを とるべきですか。",
   "ko": "지금 직접 호텔을 예약해야 할까요?",
   "en": "Should I book a hotel myself now?"
  },
  {
   "r": "A",
   "ja": "申し訳ございません。費用の扱いはまだ確認中のため、今はお約束できません。",
   "jr": "もうしわけ ございません。ひようの あつかいは まだ かくにんちゅうの ため、いまは おやくそく できません。",
   "ko": "죄송합니다. 비용 처리는 아직 확인 중이라 지금은 약속드릴 수 없습니다.",
   "en": "I’m sorry. How costs are handled is still being checked, so I can’t promise anything yet."
  },
  {
   "r": "B",
   "ja": "分かりました。正式な発表を待ちます。",
   "jr": "わかりました。せいしきな はっぴょうを まちます。",
   "ko": "알겠습니다. 공식 발표를 기다리겠습니다.",
   "en": "Understood. I will wait for the official announcement."
  },
  {
   "r": "A",
   "ja": "運航方針が決まり次第、こちらでご案内いたします。",
   "jr": "うんこうほうしんが きまりしだい、こちらで ごあんないいたします。",
   "ko": "운항 방침이 결정되는 대로 여기서 안내하겠습니다.",
   "en": "We will update you here once the operating decision is confirmed.",
   "alt": [
    {
     "ja": "運航についての正式な決定が出ましたら、ご説明いたします。",
     "jr": "うんこうについての せいしきな けっていが でましたら、ごせつめいいたします。",
     "ko": "운항에 관한 공식 결정이 나오면 설명드리겠습니다.",
     "en": "We will explain the decision once the operating plan is officially confirmed."
    }
   ]
  },
  {
   "r": "B",
   "ja": "よろしくお願いします。",
   "jr": "よろしく おねがいします。",
   "ko": "부탁드립니다.",
   "en": "Thank you for your help."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「今日はもう飛ばないということですか。」と言いました。適切な返答はどれですか。",
    "ko": "상대방이 “그럼 오늘은 더 이상 운항하지 않는 건가요?”라고 했습니다. 적절한 답변은 무엇인가요?",
    "en": "The other person says, “Does that mean the flight will not depart today?” Which reply fits best?"
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
     "ja": "運航については現在調整中で、まだ決定しておりません。",
     "ko": "운항 여부는 현재 조정 중이며 아직 결정되지 않았습니다.",
     "en": "The operating plan is still being reviewed. No decision has been made yet."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「もし明日になったら、宿泊はどうなりますか。」と言いました。適切な返答はどれですか。",
    "ko": "상대방이 “만약 내일로 미뤄지면 숙박은 어떻게 되나요?”라고 했습니다. 적절한 답변은 무엇인가요?",
    "en": "The other person says, “If we have to travel tomorrow, what about accommodation?” Which reply fits best?"
   },
   "opts": [
    {
     "ja": "ご希望は本日中の到着ですね。払い戻しについても規定を確認できます。",
     "ko": "오늘 안에 도착하시는 게 우선이군요. 환불 조건도 함께 확인할 수 있습니다.",
     "en": "Arriving today is your priority. I can also check the refund conditions."
    },
    {
     "ja": "宿泊などの支援は適用条件を確認してご案内します。",
     "ko": "숙박 등 지원은 적용 조건을 확인한 후 안내하겠습니다.",
     "en": "We will check the applicable conditions before advising on accommodation assistance."
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
    "ja": "相手が「分かりました。正式な発表を待ちます。」と言いました。適切な返答はどれですか。",
    "ko": "상대방이 “알겠습니다. 공식 발표를 기다리겠습니다.”라고 했습니다. 적절한 답변은 무엇인가요?",
    "en": "The other person says, “Understood. I will wait for the official announcement.” Which reply fits best?"
   },
   "opts": [
    {
     "ja": "運航方針が決まり次第、こちらでご案内いたします。",
     "ko": "운항 방침이 결정되는 대로 여기서 안내하겠습니다.",
     "en": "We will update you here once the operating decision is confirmed."
    },
    {
     "ja": "恐れ入ります。旅券の写真があるページに破損が見られます。",
     "ko": "죄송하지만 여권 사진이 있는 페이지에 훼손이 보입니다.",
     "en": "I am sorry, but the passport photo page appears to be damaged."
    },
    {
     "ja": "ご希望は本日中の到着ですね。払い戻しについても規定を確認できます。",
     "ko": "오늘 안에 도착하시는 게 우선이군요. 환불 조건도 함께 확인할 수 있습니다.",
     "en": "Arriving today is your priority. I can also check the refund conditions."
    }
   ],
   "a": 0
  }
 ]
},
{
 "id": "air-irrops-fuel-stop-1",
 "cat": "work",
 "lv": 3,
 "title": {
  "ja": "臨時給油と到着後の予定",
  "ko": "임시 급유와 도착 후 일정",
  "en": "Unscheduled refuelling stop"
 },
 "scene": {
  "ja": "飛行中に臨時の給油寄港が決まり、乗客が機内待機と到着時刻を確認する。",
  "ko": "비행 중 임시 급유 기항이 결정되어 승객이 기내 대기와 도착 시각을 확인한다.",
  "en": "An unscheduled fuel stop is announced and a passenger asks about waiting and arrival."
 },
 "roles": {
  "A": {
   "ja": "客室乗務員",
   "ko": "객실승무원",
   "en": "Cabin crew member"
  },
  "B": {
   "ja": "乗客",
   "ko": "승객",
   "en": "Passenger"
  }
 },
 "ai": {
  "goal": {
   "ja": "確認済みの寄港予定と現地の指示を伝え、降機の可否を断定しない。",
   "ko": "확인된 기항 계획과 현지 지시를 알리고 하기 가능 여부를 단정하지 않는다.",
   "en": "Explain the confirmed stop and local instructions without assuming disembarkation is allowed."
  },
  "twist": {
   "ja": "乗客が現地で家族へ連絡したいと申し出る。",
   "ko": "승객이 현지에서 가족에게 연락하고 싶다고 요청한다.",
   "en": "The passenger wants to contact family during the stop."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "この便は途中の空港で臨時に給油する予定です。",
   "jr": "この びんは とちゅうの くうこうで りんじに きゅうゆする よていです。",
   "ko": "이 항공편은 중간 공항에서 임시로 급유할 예정입니다.",
   "en": "This flight is scheduled to make an unscheduled stop for refuelling.",
   "alt": [
    {
     "ja": "途中で給油のため、予定外の空港に立ち寄ります。",
     "jr": "とちゅうで きゅうゆの ため、よていがいの くうこうに たちよります。",
     "ko": "도중에 급유를 위해 예정에 없던 공항에 들릅니다.",
     "en": "We will make an additional stop at another airport to refuel."
    }
   ]
  },
  {
   "r": "B",
   "ja": "目的地が変更になったのですか。",
   "jr": "もくてきちが へんこうに なったのですか。",
   "ko": "목적지가 변경된 건가요?",
   "en": "Has our destination changed?"
  },
  {
   "r": "A",
   "ja": "現在の計画では、給油後に当初の目的地へ向かいます。",
   "jr": "げんざいの けいかくでは、きゅうゆごに とうしょの もくてきちへ むかいます。",
   "ko": "현재 계획은 급유 후 원래 목적지로 향하는 것입니다.",
   "en": "The current plan is to continue to the original destination after refuelling."
  },
  {
   "r": "B",
   "ja": "着陸したら機外に出られますか。",
   "jr": "ちゃくりくしたら きがいに でられますか。",
   "ko": "착륙하면 기내에서 내릴 수 있나요?",
   "en": "Will we be able to leave the aircraft after landing?"
  },
  {
   "r": "A",
   "ja": "降機の可否は到着地の条件を確認してからご案内します。",
   "jr": "こうきの かひは とうちゃくちの じょうけんを かくにんしてから ごあんないします。",
   "ko": "하기 가능 여부는 도착지 조건을 확인한 후 안내하겠습니다.",
   "en": "We will confirm local requirements before advising whether disembarkation is possible."
  },
  {
   "r": "B",
   "ja": "給油にはどれくらい時間がかかりますか。",
   "jr": "きゅうゆには どれくらい じかんが かかりますか。",
   "ko": "급유에 시간이 얼마나 걸리나요?",
   "en": "How long will refuelling take?"
  },
  {
   "r": "A",
   "ja": "現時点では所要時間が確定しておりません。",
   "jr": "げんじてんでは しょようじかんが かくていしておりません。",
   "ko": "현재 소요 시간은 확정되지 않았습니다.",
   "en": "The duration has not yet been confirmed.",
   "alt": [
    {
     "ja": "必要な時間はまだ分かりません。情報が入り次第お伝えします。",
     "jr": "ひつような じかんは まだ わかりません。じょうほうが はいりしだい おつたえします。",
     "ko": "필요한 시간은 아직 알 수 없으며 확인되는 대로 안내하겠습니다.",
     "en": "We do not yet know how long it will take, but will update you when we do."
    }
   ]
  },
  {
   "r": "B",
   "ja": "家族が到着空港で待っています。連絡したいです。",
   "jr": "かぞくが とうちゃくくうこうで まっています。れんらくしたいです。",
   "ko": "가족이 도착 공항에서 기다리고 있어 연락하고 싶습니다.",
   "en": "My family is waiting at the destination airport. I need to contact them."
  },
  {
   "r": "A",
   "ja": "通信機器の使用については機内のご案内に従ってください。",
   "jr": "つうしんききの しようについては きないの ごあんないに したがってください。",
   "ko": "통신기기 사용은 기내 안내에 따라 주시기 바랍니다.",
   "en": "Please follow the onboard instructions about using communication devices."
  },
  {
   "r": "B",
   "ja": "到着予定は後で更新されますか。",
   "jr": "とうちゃくよていは あとで こうしんされますか。",
   "ko": "도착 예정 시각은 나중에 갱신되나요?",
   "en": "Will the estimated arrival time be updated later?"
  },
  {
   "r": "A",
   "ja": "確認でき次第、機内放送でお伝えいたします。",
   "jr": "かくにんできしだい、きないほうそうで おつたえいたします。",
   "ko": "확인되는 대로 기내 방송으로 알려드리겠습니다.",
   "en": "We will announce an updated estimate once it is available."
  },
  {
   "r": "B",
   "ja": "分かりました。案内を待ちます。",
   "jr": "わかりました。あんないを まちます。",
   "ko": "알겠습니다. 안내를 기다리겠습니다.",
   "en": "Understood. I will wait for the announcement."
  },
  {
   "r": "A",
   "ja": "お急ぎのところ、ご迷惑をおかけし申し訳ございません。",
   "jr": "おいそぎの ところ、ごめいわくを おかけし もうしわけございません。",
   "ko": "바쁘신데 불편을 드려 죄송합니다.",
   "en": "We are sorry for the inconvenience to your journey.",
   "alt": [
    {
     "ja": "ご予定に影響が出てしまい、申し訳ございません。",
     "jr": "ごよていに えいきょうが でてしまい、もうしわけございません。",
     "ko": "일정에 영향을 드려 죄송합니다.",
     "en": "We apologize for the disruption to your plans."
    }
   ]
  },
  {
   "r": "B",
   "ja": "安全に到着できるようお願いします。",
   "jr": "あんぜんに とうちゃくできるよう おねがいします。",
   "ko": "안전하게 도착할 수 있도록 부탁드립니다.",
   "en": "Please help us get there safely."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「目的地が変更になったのですか。」と言いました。適切な返答はどれですか。",
    "ko": "상대방이 “목적지가 변경된 건가요?”라고 했습니다. 적절한 답변은 무엇인가요?",
    "en": "The other person says, “Has our destination changed?” Which reply fits best?"
   },
   "opts": [
    {
     "ja": "現在ご案内している遅延理由は乗務員の交代です。",
     "ko": "현재 안내된 지연 사유는 승무원 교체입니다.",
     "en": "The delay reason currently communicated is the crew replacement."
    },
    {
     "ja": "手荷物引換証の番号から、現在の追跡状況を確認します。",
     "ko": "수하물표 번호로 현재 추적 상황을 확인하겠습니다.",
     "en": "I will use your baggage tag number to check the current tracking status."
    },
    {
     "ja": "現在の計画では、給油後に当初の目的地へ向かいます。",
     "ko": "현재 계획은 급유 후 원래 목적지로 향하는 것입니다.",
     "en": "The current plan is to continue to the original destination after refuelling."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「家族が到着空港で待っています。連絡したいです。」と言いました。適切な返答はどれですか。",
    "ko": "상대방이 “가족이 도착 공항에서 기다리고 있어 연락하고 싶습니다.”라고 했습니다. 적절한 답변은 무엇인가요?",
    "en": "The other person says, “My family is waiting at the destination airport. I need to contact them.” Which reply fits best?"
   },
   "opts": [
    {
     "ja": "通信機器の使用については機内のご案内に従ってください。",
     "ko": "통신기기 사용은 기내 안내에 따라 주시기 바랍니다.",
     "en": "Please follow the onboard instructions about using communication devices."
    },
    {
     "ja": "手荷物引換証の番号から、現在の追跡状況を確認します。",
     "ko": "수하물표 번호로 현재 추적 상황을 확인하겠습니다.",
     "en": "I will use your baggage tag number to check the current tracking status."
    },
    {
     "ja": "詳細は整備担当が確認中で、現時点ではお答えできません。",
     "ko": "세부 내용은 정비 담당자가 확인 중이라 지금은 답변드리기 어렵습니다.",
     "en": "The maintenance team is still checking the details, so I cannot confirm that yet."
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「分かりました。案内を待ちます。」と言いました。適切な返答はどれですか。",
    "ko": "상대방이 “알겠습니다. 안내를 기다리겠습니다.”라고 했습니다. 적절한 답변은 무엇인가요?",
    "en": "The other person says, “Understood. I will wait for the announcement.” Which reply fits best?"
   },
   "opts": [
    {
     "ja": "詳細は整備担当が確認中で、現時点ではお答えできません。",
     "ko": "세부 내용은 정비 담당자가 확인 중이라 지금은 답변드리기 어렵습니다.",
     "en": "The maintenance team is still checking the details, so I cannot confirm that yet."
    },
    {
     "ja": "お急ぎのところ、ご迷惑をおかけし申し訳ございません。",
     "ko": "바쁘신데 불편을 드려 죄송합니다.",
     "en": "We are sorry for the inconvenience to your journey."
    },
    {
     "ja": "乗り継ぎ便に間に合わなかったのですね。予約を確認いたします。",
     "ko": "연결편을 놓치셨군요. 예약을 확인하겠습니다.",
     "en": "You missed the connecting flight. Let me check your booking."
    }
   ],
   "a": 1
  }
 ]
}
);
