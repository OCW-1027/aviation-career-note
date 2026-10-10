/* ACN 会話練習 追加データ（GPT 作成 talk_data_g05.js を Claude が検収・修正：日本語の不自然な行、確認問題の誤答 2026.10.10）。架空の訓練用会話 */
window.TALK=window.TALK||[];window.TALK.push(
{
 "id": "air-irrops-baggage-offload-2",
 "cat": "work",
 "lv": 3,
 "title": {
  "ja": "出発前の手荷物積み下ろし",
  "ko": "출발 전 수하물 하기 요청",
  "en": "Baggage offload before departure"
 },
 "scene": {
  "ja": "乗客が搭乗を取りやめ、受託手荷物の取り扱いを確認する。",
  "ko": "승객이 탑승을 포기하고 위탁 수하물 처리를 문의한다.",
  "en": "A passenger chooses not to board and asks about checked baggage."
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
   "ja": "乗客の意向と安全上の手続きを確認し、手荷物の引き渡しを確約しない。",
   "ko": "승객 의사와 안전 절차를 확인하고 수하물 반환을 확약하지 않는다.",
   "en": "Confirm the passenger’s wishes and explain that baggage removal is subject to operational checks."
  },
  "twist": {
   "ja": "乗客が預けた薬をすぐに受け取りたいと言う。",
   "ko": "승객이 위탁한 약을 즉시 돌려받고 싶다고 말한다.",
   "en": "The passenger urgently needs medication packed in the checked bag."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "搭乗を取りやめたいとのことですね。ご事情を伺えますか。",
   "jr": "とうじょうを とりやめたいとの ことですね。ごじじょうを うかがえますか。",
   "ko": "탑승을 취소하고 싶으시군요. 사정을 여쭤봐도 될까요?",
   "en": "You would like not to board. May I ask what has happened?",
   "alt": [
    {
     "ja": "ご搭乗を見送られるのですね。差し支えなければ理由を教えてください。",
     "jr": "ごとうじょうを みおくられるのですね。さしつかえなければ りゆうを おしえてください。",
     "ko": "탑승하지 않으시려는군요. 괜찮으시면 이유를 알려 주세요.",
     "en": "You have decided not to travel. May I ask why?"
    }
   ]
  },
  {
   "r": "B",
   "ja": "体調が悪くなり、今日は飛べそうにありません。",
   "jr": "たいちょうが わるくなり、きょうは とべそうに ありません。",
   "ko": "몸이 안 좋아져 오늘은 비행하기 어려울 것 같습니다.",
   "en": "I feel unwell and do not think I can travel today."
  },
  {
   "r": "A",
   "ja": "承知しました。まずお体の状態を確認させてください。",
   "jr": "しょうちしました。まず おからだの じょうたいを かくにんさせてください。",
   "ko": "알겠습니다. 우선 몸 상태부터 확인하겠습니다.",
   "en": "I understand. First, may I check how you are feeling?"
  },
  {
   "r": "B",
   "ja": "座って休めば大丈夫です。預けた荷物はどうなりますか。",
   "jr": "すわって やすめば だいじょうぶです。あずけた にもつは どうなりますか。",
   "ko": "앉아서 쉬면 괜찮습니다. 맡긴 짐은 어떻게 되나요?",
   "en": "I should be all right after resting. What happens to my checked bag?"
  },
  {
   "r": "A",
   "ja": "搭載状況を調べ、担当部署と取り扱いを調整します。",
   "jr": "とうさいじょうきょうを しらべ、たんとうぶしょと とりあつかいを ちょうせいします。",
   "ko": "탑재 상태를 확인하고 담당 부서와 처리 방안을 조정하겠습니다.",
   "en": "We will check its loading status and coordinate the handling with the relevant team."
  },
  {
   "r": "B",
   "ja": "荷物を降ろすのに時間がかかりますか。",
   "jr": "にもつを おろすのに じかんが かかりますか。",
   "ko": "수하물을 내리는 데 시간이 걸리나요?",
   "en": "Will it take long to remove the bag?"
  },
  {
   "r": "A",
   "ja": "作業時間はまだ分かりません。確認後にご案内します。",
   "jr": "さぎょうじかんは まだ わかりません。かくにんごに ごあんないします。",
   "ko": "작업 소요 시간은 아직 알 수 없습니다. 확인 후 안내하겠습니다.",
   "en": "We cannot confirm the timing yet. We will update you after checking.",
   "alt": [
    {
     "ja": "作業の見込みは確認中です。分かり次第ご説明します。",
     "jr": "さぎょうの みこみは かくにんちゅうです。わかりしだい ごせつめいします。",
     "ko": "작업 예상 시간을 확인 중입니다. 알게 되면 설명드리겠습니다.",
     "en": "We are checking the expected handling time and will explain once known."
    }
   ]
  },
  {
   "r": "B",
   "ja": "実は薬をその荷物に入れてしまいました。",
   "jr": "じつは くすりを その にもつに いれてしまいました。",
   "ko": "사실 약을 그 수하물에 넣어 버렸습니다.",
   "en": "My medication is actually inside that bag."
  },
  {
   "r": "A",
   "ja": "必要なお薬なのですね。緊急性も含め担当者に伝えます。",
   "jr": "ひつような おくすりなのですね。きんきゅうせいも ふくめ たんとうしゃに つたえます。",
   "ko": "꼭 필요한 약이군요. 긴급성까지 담당자에게 전달하겠습니다.",
   "en": "I understand it is important. I will tell the team that it may be urgent."
  },
  {
   "r": "B",
   "ja": "ここで待てば返してもらえますか。",
   "jr": "ここで まてば かえしてもらえますか。",
   "ko": "여기서 기다리면 돌려받을 수 있나요?",
   "en": "Can I wait here to have it returned?"
  },
  {
   "r": "A",
   "ja": "お渡し場所と方法は確認中です。係員の案内をお待ちください。",
   "jr": "おわたしばしょと ほうほうは かくにんちゅうです。かかりいんの あんないを おまちください。",
   "ko": "반환 장소와 방법을 확인 중입니다. 직원 안내를 기다려 주세요.",
   "en": "The handover location and procedure are being checked. Please wait for instructions."
  },
  {
   "r": "B",
   "ja": "変更や払い戻しも後で相談できますか。",
   "jr": "へんこうや はらいもどしも あとで そうだんできますか。",
   "ko": "변경이나 환불도 나중에 상담할 수 있나요?",
   "en": "Can I ask about changing or refunding my ticket later?"
  },
  {
   "r": "A",
   "ja": "はい。予約条件を確認のうえ、窓口をご案内します。",
   "jr": "はい。よやくじょうけんを かくにんの うえ、まどぐちを ごあんないします。",
   "ko": "네. 예약 조건을 확인한 뒤 담당 창구를 안내하겠습니다.",
   "en": "Yes. We will check your fare conditions and direct you to the appropriate desk.",
   "alt": [
    {
     "ja": "運賃の条件を調べて、手続き先をお伝えします。",
     "jr": "うんちんの じょうけんを しらべて、てつづきさきを おつたえします。",
     "ko": "운임 조건을 확인해 절차를 진행할 곳을 안내하겠습니다.",
     "en": "I will review the fare rules and tell you where to proceed."
    }
   ]
  },
  {
   "r": "B",
   "ja": "分かりました。まず荷物の確認をお願いします。",
   "jr": "わかりました。まず にもつの かくにんを おねがいします。",
   "ko": "알겠습니다. 먼저 수하물 확인 부탁드립니다.",
   "en": "Understood. Please check the bag first."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「体調が悪くなり、今日は飛べそうにありません。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “몸이 안 좋아져 오늘은 비행하기 어려울 것 같습니다.”라고 말했습니다. 가장 적절한 답변은 무엇인가요?",
    "en": "The other person says, “I feel unwell and do not think I can travel today.” Which reply is most appropriate?"
   },
   "opts": [
    {
     "ja": "宿泊などの支援は適用条件を確認してご案内します。",
     "ko": "숙박 등 지원은 적용 조건을 확인한 후 안내하겠습니다.",
     "en": "We will check the applicable conditions before advising on accommodation assistance."
    },
    {
     "ja": "承知しました。まずお体の状態を確認させてください。",
     "ko": "알겠습니다. 우선 몸 상태부터 확인하겠습니다.",
     "en": "I understand. First, may I check how you are feeling?"
    },
    {
     "ja": "ただいま搭乗券の読み取り機に不具合が発生しています。",
     "ko": "현재 탑승권 스캐너에 문제가 발생했습니다.",
     "en": "The boarding-pass scanner is currently not working."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「実は薬をその荷物に入れてしまいました。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “사실 약을 그 수하물에 넣어 버렸습니다.”라고 말했습니다. 가장 적절한 답변은 무엇인가요?",
    "en": "The other person says, “My medication is actually inside that bag.” Which reply is most appropriate?"
   },
   "opts": [
    {
     "ja": "ターミナル間の移動手段と所要時間を確認いたします。",
     "ko": "터미널 간 이동 수단과 소요 시간을 확인하겠습니다.",
     "en": "I will check the transfer options and estimated travel time."
    },
    {
     "ja": "機材の整備確認のため、搭乗開始を見合わせております。",
     "ko": "항공기 정비 확인을 위해 탑승 시작을 보류하고 있습니다.",
     "en": "Boarding is on hold while maintenance checks are carried out."
    },
    {
     "ja": "必要なお薬なのですね。緊急性も含め担当者に伝えます。",
     "ko": "꼭 필요한 약이군요. 긴급성까지 담당자에게 전달하겠습니다.",
     "en": "I understand it is important. I will tell the team that it may be urgent."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「変更や払い戻しも後で相談できますか。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “변경이나 환불도 나중에 상담할 수 있나요?”라고 말했습니다. 가장 적절한 답변은 무엇인가요?",
    "en": "The other person says, “Can I ask about changing or refunding my ticket later?” Which reply is most appropriate?"
   },
   "opts": [
    {
     "ja": "はい。予約条件を確認のうえ、窓口をご案内します。",
     "ko": "네. 예약 조건을 확인한 뒤 담당 창구를 안내하겠습니다.",
     "en": "Yes. We will check your fare conditions and direct you to the appropriate desk."
    },
    {
     "ja": "再入場に必要な時間と保安検査の手続きをご確認ください。",
     "ko": "재입장 소요 시간과 보안검색 절차를 확인해 주세요.",
     "en": "Please account for the time and security procedures needed to re-enter."
    },
    {
     "ja": "空席と予約条件を確認し、変更可能な選択肢をご案内します。",
     "ko": "좌석 상황과 예약 조건을 확인한 뒤 변경 가능한 선택지를 안내하겠습니다.",
     "en": "I will check availability and ticket conditions, then explain any possible changes."
    }
   ],
   "a": 0
  }
 ]
},
{
 "id": "air-irrops-crew-connection-1",
 "cat": "work",
 "lv": 3,
 "title": {
  "ja": "乗務員の到着遅れと運航調整",
  "ko": "승무원 도착 지연과 운항 조정",
  "en": "Late arriving crew and schedule adjustment"
 },
 "scene": {
  "ja": "前便の遅延で乗務員の到着が遅れ、出発便の予定が見直される。",
  "ko": "전편 지연으로 승무원 도착이 늦어져 출발편 일정이 재조정된다.",
  "en": "An inbound delay affects crew arrival and the next flight schedule."
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
   "ja": "乗務員配置の確認状況と案内方法を説明し、不確かな出発時刻を示さない。",
   "ko": "승무원 배치 확인 상황과 안내 방식을 설명하고 미확정 출발 시각을 제시하지 않는다.",
   "en": "Explain that crew assignment is being reviewed without promising a departure time."
  },
  "twist": {
   "ja": "乗客が終電に間に合わない可能性を伝える。",
   "ko": "승객이 막차를 놓칠 가능성이 있다고 말한다.",
   "en": "The passenger may miss the last train at the destination."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "乗務員の到着が遅れており、出発予定を調整しています。",
   "jr": "じょうむいんの とうちゃくが おくれており、しゅっぱつよていを ちょうせいしています。",
   "ko": "승무원 도착이 늦어 출발 일정을 조정 중입니다.",
   "en": "The crew are arriving late, and the departure plan is being adjusted.",
   "alt": [
    {
     "ja": "乗務員の到着に遅れがあり、出発時刻を見直しています。",
     "jr": "じょうむいんの とうちゃくに おくれが あり、しゅっぱつじこくを みなおしています。",
     "ko": "승무원이 늦게 도착해 출발 시간을 재검토하고 있습니다.",
     "en": "We are reviewing the departure time due to a late-arriving crew."
    }
   ]
  },
  {
   "r": "B",
   "ja": "飛行機はもう到着していますよね。",
   "jr": "ひこうきは もう とうちゃくしていますよね。",
   "ko": "항공기는 이미 도착했잖아요?",
   "en": "But the aircraft is already here, is it not?"
  },
  {
   "r": "A",
   "ja": "はい。ただ、運航には乗務員がそろっていることの確認が必要です。",
   "jr": "はい。ただ、うんこうには じょうむいんが そろっている ことの かくにんが ひつようです。",
   "ko": "네. 다만 운항하려면 승무원이 모두 갖춰졌는지 확인이 필요합니다.",
   "en": "Yes, but we also need to confirm that the full crew is available."
  },
  {
   "r": "B",
   "ja": "ほかの乗務員に交代することはできますか。",
   "jr": "ほかの じょうむいんに こうたいすることは できますか。",
   "ko": "다른 승무원으로 교체할 수는 없나요?",
   "en": "Could another crew take over?"
  },
  {
   "r": "A",
   "ja": "代替の手配も含め、運航担当が確認しています。",
   "jr": "だいたいの てはいも ふくめ、うんこうたんとうが かくにんしています。",
   "ko": "대체 인력 준비를 포함해 운항 담당자가 확인 중입니다.",
   "en": "The operations team is checking options, including a replacement crew."
  },
  {
   "r": "B",
   "ja": "出発できるかどうかはいつ分かりますか。",
   "jr": "しゅっぱつできるか どうかは いつ わかりますか。",
   "ko": "출발 가능 여부는 언제 알 수 있나요?",
   "en": "When will we know whether we can depart?"
  },
  {
   "r": "A",
   "ja": "確定した情報が入り次第、こちらでご案内します。",
   "jr": "かくていした じょうほうが はいりしだい、こちらで ごあんないします。",
   "ko": "확정된 정보가 들어오는 대로 이곳에서 안내하겠습니다.",
   "en": "We will share confirmed information at this gate as soon as it is available.",
   "alt": [
    {
     "ja": "正式な情報が確認できましたら、搭乗口でお知らせします。",
     "jr": "せいしきな じょうほうが かくにんできましたら、とうじょうぐちで おしらせします。",
     "ko": "공식 정보를 확인하면 탑승구에서 알려드리겠습니다.",
     "en": "We will announce an update at the gate once it is confirmed."
    }
   ]
  },
  {
   "r": "B",
   "ja": "このままだと到着後の終電に間に合いません。",
   "jr": "このままだと とうちゃくごの しゅうでんに まにあいません。",
   "ko": "이대로라면 도착 후 막차를 놓칩니다.",
   "en": "At this rate, I will miss the last train after arrival."
  },
  {
   "r": "A",
   "ja": "ご不安ですね。到着後の交通情報について確認します。",
   "jr": "ごふあんですね。とうちゃくごの こうつうじょうほうについて かくにんします。",
   "ko": "걱정되시겠네요. 도착 후 교통편 정보를 확인하겠습니다.",
   "en": "I understand your concern. I will check the onward transport information."
  },
  {
   "r": "B",
   "ja": "タクシー代は航空会社に請求できますか。",
   "jr": "タクシーだいは こうくうがいしゃに せいきゅうできますか。",
   "ko": "택시비를 항공사에 청구할 수 있나요?",
   "en": "Can I claim the taxi fare from the airline?"
  },
  {
   "r": "A",
   "ja": "費用の扱いは条件を確認する必要があり、今はお約束できません。",
   "jr": "ひようの あつかいは じょうけんを かくにんする ひつようが あり、いまは おやくそくできません。",
   "ko": "비용 처리에는 조건 확인이 필요해 지금은 확답드릴 수 없습니다.",
   "en": "We must check the applicable conditions, so I cannot promise reimbursement now."
  },
  {
   "r": "B",
   "ja": "まずは運航が決まるのを待ちます。",
   "jr": "まずは うんこうが きまるのを まちます。",
   "ko": "우선 운항 여부가 결정되길 기다리겠습니다.",
   "en": "I will wait for the operating decision first."
  },
  {
   "r": "A",
   "ja": "ありがとうございます。表示と放送を引き続きご確認ください。",
   "jr": "ありがとうございます。ひょうじと ほうそうを ひきつづき ごかくにんください。",
   "ko": "감사합니다. 계속 전광판과 방송을 확인해 주세요.",
   "en": "Thank you. Please continue to check the displays and announcements.",
   "alt": [
    {
     "ja": "ご協力ありがとうございます。引き続き放送にご注意ください。",
     "jr": "ごきょうりょく ありがとうございます。ひきつづき ほうそうに ごちゅういください。",
     "ko": "협조해 주셔서 감사합니다. 계속 안내방송에 주의해 주세요.",
     "en": "Thank you for your cooperation. Please listen for further announcements."
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
    "ja": "相手が「飛行機はもう到着していますよね。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “항공기는 이미 도착했잖아요?”라고 말했습니다. 가장 적절한 답변은 무엇인가요?",
    "en": "The other person says, “But the aircraft is already here, is it not?” Which reply is most appropriate?"
   },
   "opts": [
    {
     "ja": "はい。ただ、運航には乗務員がそろっていることの確認が必要です。",
     "ko": "네. 다만 운항하려면 승무원이 모두 갖춰졌는지 확인이 필요합니다.",
     "en": "Yes, but we also need to confirm that the full crew is available."
    },
    {
     "ja": "恐れ入りますが、こちらの通路は現在ご利用いただけません。",
     "ko": "죄송하지만 현재 이 통로는 이용할 수 없습니다.",
     "en": "I am sorry, but this passage is temporarily unavailable."
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
    "ja": "相手が「このままだと到着後の終電に間に合いません。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “이대로라면 도착 후 막차를 놓칩니다.”라고 말했습니다. 가장 적절한 답변은 무엇인가요?",
    "en": "The other person says, “At this rate, I will miss the last train after arrival.” Which reply is most appropriate?"
   },
   "opts": [
    {
     "ja": "手荷物の引き継ぎ状況を担当部署に確認します。",
     "ko": "담당 부서에 수하물 연결 처리 상황을 확인하겠습니다.",
     "en": "I’ll check the baggage transfer status with the relevant team."
    },
    {
     "ja": "宿泊などの支援は適用条件を確認してご案内します。",
     "ko": "숙박 등 지원은 적용 조건을 확인한 후 안내하겠습니다.",
     "en": "We will check the applicable conditions before advising on accommodation assistance."
    },
    {
     "ja": "ご不安ですね。到着後の交通情報について確認します。",
     "ko": "걱정되시겠네요. 도착 후 교통편 정보를 확인하겠습니다.",
     "en": "I understand your concern. I will check the onward transport information."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「まずは運航が決まるのを待ちます。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “우선 운항 여부가 결정되길 기다리겠습니다.”라고 말했습니다. 가장 적절한 답변은 무엇인가요?",
    "en": "The other person says, “I will wait for the operating decision first.” Which reply is most appropriate?"
   },
   "opts": [
    {
     "ja": "ただいま搭乗券の読み取り機に不具合が発生しています。",
     "ko": "현재 탑승권 스캐너에 문제가 발생했습니다.",
     "en": "The boarding-pass scanner is currently not working."
    },
    {
     "ja": "ありがとうございます。表示と放送を引き続きご確認ください。",
     "ko": "감사합니다. 계속 전광판과 방송을 확인해 주세요.",
     "en": "Thank you. Please continue to check the displays and announcements."
    },
    {
     "ja": "雪のため、出発前に機体の除氷作業を行います。",
     "ko": "눈 때문에 출발 전 기체 제빙 작업을 실시합니다.",
     "en": "Because of the snow, the aircraft needs de-icing before departure."
    }
   ],
   "a": 1
  }
 ]
},
{
 "id": "air-irrops-passport-damage-1",
 "cat": "work",
 "lv": 3,
 "title": {
  "ja": "渡航書類の破損と搭乗可否",
  "ko": "여권 훼손과 탑승 가능 여부",
  "en": "Damaged passport and travel eligibility"
 },
 "scene": {
  "ja": "搭乗前に旅券の破損が見つかり、係員が関係部署への確認を行う。",
  "ko": "탑승 전 여권 훼손이 발견되어 직원이 관련 부서에 확인한다.",
  "en": "Damage to a passport is noticed before boarding, requiring eligibility checks."
 },
 "roles": {
  "A": {
   "ja": "チェックイン責任者",
   "ko": "체크인 책임자",
   "en": "Check-in supervisor"
  },
  "B": {
   "ja": "乗客",
   "ko": "승객",
   "en": "Passenger"
  }
 },
 "ai": {
  "goal": {
   "ja": "書類の状態を記録し、入国要件や運送条件の確認前に搭乗可否を断定しない。",
   "ko": "서류 상태를 기록하고 입국 요건과 운송 조건 확인 전에 탑승 가능 여부를 단정하지 않는다.",
   "en": "Record the document condition and check requirements without guaranteeing carriage."
  },
  "twist": {
   "ja": "乗客が現地で重要な会議があると伝える。",
   "ko": "승객이 현지에서 중요한 회의가 있다고 말한다.",
   "en": "The passenger has an important meeting abroad."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "恐れ入ります。旅券の写真があるページに破損が見られます。",
   "jr": "おそれいります。りょけんの しゃしんが ある ページに はそんが みられます。",
   "ko": "죄송하지만 여권 사진이 있는 페이지에 훼손이 보입니다.",
   "en": "I am sorry, but the passport photo page appears to be damaged.",
   "alt": [
    {
     "ja": "申し訳ございません。旅券の顔写真のページが傷んでいるようです。",
     "jr": "もうしわけございません。りょけんの かおじゃしんの ページが いたんでいるようです。",
     "ko": "죄송합니다. 여권 사진 페이지가 손상된 것 같습니다.",
     "en": "I am sorry, but your passport’s photo page seems damaged."
    }
   ]
  },
  {
   "r": "B",
   "ja": "少し破れていますが、名前は読めます。",
   "jr": "すこし やぶれていますが、なまえは よめます。",
   "ko": "조금 찢어졌지만 이름은 읽을 수 있습니다.",
   "en": "It is slightly torn, but you can still read my name."
  },
  {
   "r": "A",
   "ja": "渡航先の要件などを確認する必要があります。",
   "jr": "とこうさきの ようけんなどを かくにんする ひつようが あります。",
   "ko": "도착 국가의 요건 등을 확인해야 합니다.",
   "en": "We need to check the requirements for your destination."
  },
  {
   "r": "B",
   "ja": "このまま搭乗できないのでしょうか。",
   "jr": "このまま とうじょうできないのでしょうか。",
   "ko": "이 상태로 탑승할 수 없는 건가요?",
   "en": "Does that mean I cannot board?"
  },
  {
   "r": "A",
   "ja": "現時点では判断できません。担当部署へ照会いたします。",
   "jr": "げんじてんでは はんだんできません。たんとうぶしょへ しょうかいいたします。",
   "ko": "현재로서는 판단할 수 없습니다. 담당 부서에 조회하겠습니다.",
   "en": "I cannot confirm that yet. I will consult the responsible team."
  },
  {
   "r": "B",
   "ja": "新しい旅券を取る時間はありません。",
   "jr": "あたらしい りょけんを とる じかんは ありません。",
   "ko": "새 여권을 발급받을 시간은 없습니다.",
   "en": "I do not have time to get a new passport."
  },
  {
   "r": "A",
   "ja": "ご事情は承知しました。必要な確認を進めます。",
   "jr": "ごじじょうは しょうちしました。ひつような かくにんを すすめます。",
   "ko": "사정은 알겠습니다. 필요한 확인 절차를 진행하겠습니다.",
   "en": "I understand. We will proceed with the necessary checks.",
   "alt": [
    {
     "ja": "状況は理解しました。所定の照会を続けます。",
     "jr": "じょうきょうは りかいしました。しょていの しょうかいを つづけます。",
     "ko": "상황을 이해했습니다. 정해진 확인을 계속하겠습니다.",
     "en": "I understand the situation and will continue the required checks."
    }
   ]
  },
  {
   "r": "B",
   "ja": "明日の朝、現地で大切な会議があるんです。",
   "jr": "あしたの あさ、げんちで たいせつな かいぎが あるんです。",
   "ko": "내일 아침 현지에서 중요한 회의가 있습니다.",
   "en": "I have an important meeting there tomorrow morning."
  },
  {
   "r": "A",
   "ja": "お急ぎなのですね。ただ、必要書類の確認は省略できません。",
   "jr": "おいそぎなのですね。ただ、ひつようしょるいの かくにんは しょうりゃくできません。",
   "ko": "급하시군요. 다만 필수 서류 확인을 생략할 수는 없습니다.",
   "en": "I understand it is urgent, but we cannot skip the document checks."
  },
  {
   "r": "B",
   "ja": "確認の結果はどこで聞けますか。",
   "jr": "かくにんの けっかは どこで きけますか。",
   "ko": "확인 결과는 어디서 들을 수 있나요?",
   "en": "Where should I wait for the decision?"
  },
  {
   "r": "A",
   "ja": "こちらのカウンターでお待ちください。結果をお伝えします。",
   "jr": "こちらの カウンターで おまちください。けっかを おつたえします。",
   "ko": "이 카운터에서 기다려 주세요. 결과를 안내하겠습니다.",
   "en": "Please wait at this counter. We will inform you of the result."
  },
  {
   "r": "B",
   "ja": "必要なら別の書類も見せられます。",
   "jr": "ひつようなら べつの しょるいも みせられます。",
   "ko": "필요하다면 다른 서류도 보여드릴 수 있습니다.",
   "en": "I can show other documents if needed."
  },
  {
   "r": "A",
   "ja": "ありがとうございます。必要になりましたら、こちらからお願いいたします。",
   "jr": "ありがとうございます。ひつように なりましたら、こちらから おねがいいたします。",
   "ko": "감사합니다. 필요하게 되면 저희가 말씀드리겠습니다.",
   "en": "Thank you. If we need them, we’ll let you know.",
   "alt": [
    {
     "ja": "ご協力ありがとうございます。追加の書類が必要な際はお伝えします。",
     "jr": "ごきょうりょく ありがとうございます。ついかの しょるいが ひつような さいは おつたえします。",
     "ko": "협조해 주셔서 감사합니다. 추가 서류가 필요하면 알려드리겠습니다.",
     "en": "Thank you for your cooperation. We will advise if additional documents are required."
    }
   ]
  },
  {
   "r": "B",
   "ja": "分かりました。ここで待ちます。",
   "jr": "わかりました。ここで まちます。",
   "ko": "알겠습니다. 여기서 기다리겠습니다.",
   "en": "Understood. I will wait here."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「少し破れていますが、名前は読めます。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “조금 찢어졌지만 이름은 읽을 수 있습니다.”라고 말했습니다. 가장 적절한 답변은 무엇인가요?",
    "en": "The other person says, “It is slightly torn, but you can still read my name.” Which reply is most appropriate?"
   },
   "opts": [
    {
     "ja": "お荷物が見当たらないとのことですね。ご不便をおかけしております。",
     "ko": "짐이 보이지 않는다고 하셨군요. 불편을 드려 죄송합니다.",
     "en": "I understand your bag has not arrived. I am sorry for the inconvenience."
    },
    {
     "ja": "渡航先の要件などを確認する必要があります。",
     "ko": "도착 국가의 요건 등을 확인해야 합니다.",
     "en": "We need to check the requirements for your destination."
    },
    {
     "ja": "手荷物の引き継ぎ状況を担当部署に確認します。",
     "ko": "수하물 인계 상황을 담당 부서에 확인하겠습니다.",
     "en": "I will check the baggage transfer status with the handling team."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「明日の朝、現地で大切な会議があるんです。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “내일 아침 현지에서 중요한 회의가 있습니다.”라고 말했습니다. 가장 적절한 답변은 무엇인가요?",
    "en": "The other person says, “I have an important meeting there tomorrow morning.” Which reply is most appropriate?"
   },
   "opts": [
    {
     "ja": "お急ぎなのですね。ただ、必要書類の確認は省略できません。",
     "ko": "급하시군요. 다만 필수 서류 확인을 생략할 수는 없습니다.",
     "en": "I understand it is urgent, but we cannot skip the document checks."
    },
    {
     "ja": "機内で医療上の緊急事態があり、安全を優先しました。",
     "ko": "기내에 의료상 긴급 상황이 발생해 안전을 우선했습니다.",
     "en": "There was a medical emergency on board, and safety came first."
    },
    {
     "ja": "手荷物の所在と取り扱いを担当者に確認します。",
     "ko": "담당자에게 수하물 위치와 처리 방법을 확인하겠습니다.",
     "en": "I’ll check the location and handling of your bag with the baggage team."
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「必要なら別の書類も見せられます。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “필요하다면 다른 서류도 보여드릴 수 있습니다.”라고 말했습니다. 가장 적절한 답변은 무엇인가요?",
    "en": "The other person says, “I can show other documents if needed.” Which reply is most appropriate?"
   },
   "opts": [
    {
     "ja": "同僚の方と連絡が取れるまで、ご予約は変更せずに確認を進めます。",
     "ko": "동료분과 연락이 닿을 때까지 예약은 바꾸지 않고 확인을 진행하겠습니다.",
     "en": "Until we can reach your colleague, I’ll keep checking without changing their booking."
    },
    {
     "ja": "手荷物の保管状況と受け取り方法も確認します。",
     "ko": "수하물 보관 상황과 수령 방법도 확인하겠습니다.",
     "en": "I will check where the bags are and how they can be collected."
    },
    {
     "ja": "ありがとうございます。必要になりましたら、こちらからお願いいたします。",
     "ko": "감사합니다. 필요하게 되면 저희가 말씀드리겠습니다.",
     "en": "Thank you. If we need them, we’ll let you know."
    }
   ],
   "a": 2
  }
 ]
},
{
 "id": "air-irrops-gate-system-1",
 "cat": "work",
 "lv": 2,
 "title": {
  "ja": "搭乗システム障害と案内",
  "ko": "탑승 시스템 장애와 안내",
  "en": "Boarding system outage"
 },
 "scene": {
  "ja": "搭乗券の読み取り端末が使用できなくなり、搭乗口で確認方法を切り替える。",
  "ko": "탑승권 스캔 단말기가 작동하지 않아 탑승구에서 확인 방법을 변경한다.",
  "en": "Boarding scanners stop working and gate staff switch to an approved verification procedure."
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
   "ja": "確認済みの案内だけを伝え、個人情報を不用意に集めずに順番を管理する。",
   "ko": "확인된 내용만 안내하고 개인정보를 불필요하게 수집하지 않으며 탑승 순서를 관리한다.",
   "en": "Provide approved instructions, protect personal information, and manage the queue."
  },
  "twist": {
   "ja": "乗客のスマートフォンの電池が切れ、搭乗券を表示できなくなる。",
   "ko": "승객이 휴대전화 배터리가 없어 탑승권을 보여줄 수 없다고 말한다.",
   "en": "The passenger’s phone battery dies, leaving no mobile boarding pass visible."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "ただいま搭乗券の読み取り機に不具合が発生しています。",
   "jr": "ただいま とうじょうけんの よみとりきに ふぐあいが はっせいしています。",
   "ko": "현재 탑승권 스캐너에 문제가 발생했습니다.",
   "en": "The boarding-pass scanner is currently not working.",
   "alt": [
    {
     "ja": "搭乗券を読み取る機器が現在使えない状態です。",
     "jr": "とうじょうけんを よみとる ききが げんざい つかえない じょうたいです。",
     "ko": "현재 탑승권을 읽는 기기를 사용할 수 없습니다.",
     "en": "The equipment used to scan boarding passes is temporarily unavailable."
    }
   ]
  },
  {
   "r": "B",
   "ja": "搭乗は中止になったのですか。",
   "jr": "とうじょうは ちゅうしに なったのですか。",
   "ko": "탑승이 취소된 건가요?",
   "en": "Has boarding been cancelled?"
  },
  {
   "r": "A",
   "ja": "いいえ。別の確認方法を準備しております。",
   "jr": "いいえ。べつの かくにんほうほうを じゅんびしております。",
   "ko": "아닙니다. 다른 확인 방법을 준비하고 있습니다.",
   "en": "No. We are preparing another approved way to verify boarding passes."
  },
  {
   "r": "B",
   "ja": "列はこのままでいいですか。",
   "jr": "れつは このままで いいですか。",
   "ko": "줄은 그대로 서 있으면 되나요?",
   "en": "Should we stay in this queue?"
  },
  {
   "r": "A",
   "ja": "はい。係員がご案内するまで順番にお待ちください。",
   "jr": "はい。かかりいんが ごあんないするまで じゅんばんに おまちください。",
   "ko": "네. 직원이 안내할 때까지 순서대로 기다려 주세요.",
   "en": "Yes. Please stay in line until staff give further instructions."
  },
  {
   "r": "B",
   "ja": "出発時刻にも影響しますか。",
   "jr": "しゅっぱつじこくにも えいきょうしますか。",
   "ko": "출발 시간에도 영향이 있나요?",
   "en": "Will this affect the departure time?"
  },
  {
   "r": "A",
   "ja": "運航への影響は確認中です。決まり次第お知らせします。",
   "jr": "うんこうへの えいきょうは かくにんちゅうです。きまりしだい おしらせします。",
   "ko": "운항 영향은 확인 중입니다. 결정되는 대로 안내하겠습니다.",
   "en": "We are checking any impact on departure and will update you when confirmed.",
   "alt": [
    {
     "ja": "出発への影響は調査中です。情報があれば改めてご案内します。",
     "jr": "しゅっぱつへの えいきょうは ちょうさちゅうです。じょうほうが あれば あらためて ごあんないします。",
     "ko": "출발에 미치는 영향은 확인 중이며 새 소식이 있으면 안내하겠습니다.",
     "en": "We are reviewing the departure impact and will share new information."
    }
   ]
  },
  {
   "r": "B",
   "ja": "携帯電話の電池が切れて、搭乗券を表示できません。",
   "jr": "けいたいでんわの でんちが きれて、とうじょうけんを ひょうじできません。",
   "ko": "휴대전화 배터리가 없어 탑승권을 띄울 수 없습니다.",
   "en": "My phone battery has died, so I cannot show my mobile boarding pass."
  },
  {
   "r": "A",
   "ja": "承知しました。係員が別の確認方法をご案内します。",
   "jr": "しょうちしました。かかりいんが べつの かくにんほうほうを ごあんないします。",
   "ko": "알겠습니다. 직원이 다른 확인 방법을 안내하겠습니다.",
   "en": "Understood. A member of staff will explain another verification option."
  },
  {
   "r": "B",
   "ja": "予約番号を声に出して言えばいいですか。",
   "jr": "よやくばんごうを こえに だして いえば いいですか。",
   "ko": "예약번호를 큰 소리로 말하면 되나요?",
   "en": "Should I say my booking reference aloud?"
  },
  {
   "r": "A",
   "ja": "個人情報は周囲に聞こえない方法で確認いたします。",
   "jr": "こじんじょうほうは しゅういに きこえない ほうほうで かくにんいたします。",
   "ko": "개인정보는 주변에 들리지 않는 방식으로 확인하겠습니다.",
   "en": "We will verify personal details without asking you to announce them publicly."
  },
  {
   "r": "B",
   "ja": "それなら安心です。どちらへ行けばいいですか。",
   "jr": "それなら あんしんです。どちらへ いけば いいですか。",
   "ko": "그렇다면 안심입니다. 어디로 가면 될까요?",
   "en": "That is reassuring. Where should I go?"
  },
  {
   "r": "A",
   "ja": "こちらの係員が順番にご案内しますので、お待ちください。",
   "jr": "こちらの かかりいんが じゅんばんに ごあんないしますので、おまちください。",
   "ko": "이쪽 직원이 순서대로 안내하니 기다려 주세요.",
   "en": "Please wait here. This agent will help each passenger in turn.",
   "alt": [
    {
     "ja": "順番に確認しますので、こちらでお待ちいただけますか。",
     "jr": "じゅんばんに かくにんしますので、こちらで おまちいただけますか。",
     "ko": "차례대로 확인하니 이곳에서 기다려 주시겠습니까?",
     "en": "Could you wait here while we assist passengers in order?"
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
    "ja": "相手が「搭乗は中止になったのですか。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “탑승이 취소된 건가요?”라고 말했습니다. 가장 적절한 답변은 무엇인가요?",
    "en": "The other person says, “Has boarding been cancelled?” Which reply is most appropriate?"
   },
   "opts": [
    {
     "ja": "いいえ。別の確認方法を準備しております。",
     "ko": "아닙니다. 다른 확인 방법을 준비하고 있습니다.",
     "en": "No. We are preparing another approved way to verify boarding passes."
    },
    {
     "ja": "恐れ入りますが、こちらの通路は現在ご利用いただけません。",
     "ko": "죄송하지만 현재 이 통로는 이용할 수 없습니다.",
     "en": "I am sorry, but this passage is temporarily unavailable."
    },
    {
     "ja": "本日は機材の変更により、座席が変わっております。",
     "ko": "오늘은 기종이 변경되어 좌석 배정이 바뀌었습니다.",
     "en": "The aircraft has changed today, so some seat assignments have been altered."
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「携帯電話の電池が切れて、搭乗券を表示できません。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “휴대전화 배터리가 없어 탑승권을 띄울 수 없습니다.”라고 말했습니다. 가장 적절한 답변은 무엇인가요?",
    "en": "The other person says, “My phone battery has died, so I cannot show my mobile boarding pass.” Which reply is most appropriate?"
   },
   "opts": [
    {
     "ja": "お食事券の対象になるかどうか、今回の状況を確認してご案内いたします。",
     "ko": "식사권 대상이 되는지 이번 상황을 확인해서 안내드리겠습니다.",
     "en": "I’ll check whether meal vouchers apply in this situation and let you know."
    },
    {
     "ja": "承知しました。係員が別の確認方法をご案内します。",
     "ko": "알겠습니다. 직원이 다른 확인 방법을 안내하겠습니다.",
     "en": "Understood. A member of staff will explain another verification option."
    },
    {
     "ja": "手荷物の引き継ぎ状況を担当部署に確認します。",
     "ko": "수하물 인계 상황을 담당 부서에 확인하겠습니다.",
     "en": "I will check the baggage transfer status with the handling team."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「それなら安心です。どちらへ行けばいいですか。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “그렇다면 안심입니다. 어디로 가면 될까요?”라고 말했습니다. 가장 적절한 답변은 무엇인가요?",
    "en": "The other person says, “That is reassuring. Where should I go?” Which reply is most appropriate?"
   },
   "opts": [
    {
     "ja": "現在ご案内している遅延理由は乗務員の交代です。",
     "ko": "현재 안내된 지연 사유는 승무원 교체입니다.",
     "en": "The delay reason currently communicated is the crew replacement."
    },
    {
     "ja": "乗り継ぎ便に間に合わなかったのですね。予約を確認いたします。",
     "ko": "연결편을 놓치셨군요. 예약을 확인하겠습니다.",
     "en": "You missed the connecting flight. Let me check your booking."
    },
    {
     "ja": "こちらの係員が順番にご案内しますので、お待ちください。",
     "ko": "이쪽 직원이 순서대로 안내하니 기다려 주세요.",
     "en": "Please wait here. This agent will help each passenger in turn."
    }
   ],
   "a": 2
  }
 ]
},
{
 "id": "air-irrops-misconnect-hotel-1",
 "cat": "work",
 "lv": 3,
 "title": {
  "ja": "乗り継ぎ失敗後の宿泊相談",
  "ko": "연결편 실패 후 숙박 상담",
  "en": "Overnight stay after missed connection"
 },
 "scene": {
  "ja": "到着が遅れて最終乗り継ぎ便に間に合わず、翌朝までの案内が必要になる。",
  "ko": "도착 지연으로 마지막 연결편을 놓쳐 다음 날 아침까지의 안내가 필요하다.",
  "en": "A passenger misses the last onward flight and asks about overnight arrangements."
 },
 "roles": {
  "A": {
   "ja": "乗り継ぎ案内係員",
   "ko": "환승 안내 직원",
   "en": "Transfer service agent"
  },
  "B": {
   "ja": "乗客",
   "ko": "승객",
   "en": "Passenger"
  }
 },
 "ai": {
  "goal": {
   "ja": "予約条件と実際の代替便を確認し、支援の適用前に宿泊を約束しない。",
   "ko": "예약 조건과 실제 대체편을 확인하고 지원 대상 여부가 불명확한 상태에서 숙박을 약속하지 않는다.",
   "en": "Check the itinerary and assistance eligibility without promising a hotel."
  },
  "twist": {
   "ja": "乗客が幼い子どもを連れ、手荷物を最終目的地まで預けたと話す。",
   "ko": "승객이 어린 자녀와 함께하며 수하물이 최종 목적지로 위탁됐다고 설명한다.",
   "en": "The passenger is travelling with a young child and the checked bags were tagged to the final destination."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "乗り継ぎ便に間に合わなかったのですね。予約を確認いたします。",
   "jr": "のりつぎびんに まにあわなかったのですね。よやくを かくにんいたします。",
   "ko": "연결편을 놓치셨군요. 예약을 확인하겠습니다.",
   "en": "You missed the connecting flight. Let me check your booking.",
   "alt": [
    {
     "ja": "お乗り継ぎに間に合わなかったのですね。ご予約をお調べします。",
     "jr": "おのりつぎに まにあわなかったのですね。ごよやくを おしらべします。",
     "ko": "환승편을 놓치셨군요. 예약을 조회하겠습니다.",
     "en": "You missed your connection. I will look up your itinerary."
    }
   ]
  },
  {
   "r": "B",
   "ja": "最後の便が出てしまいました。今夜はどうなりますか。",
   "jr": "さいごの びんが でてしまいました。こんやは どうなりますか。",
   "ko": "마지막 편이 출발했어요. 오늘 밤은 어떻게 하나요?",
   "en": "The last flight has left. What should I do tonight?"
  },
  {
   "r": "A",
   "ja": "次に利用できる便と空席状況を確認します。",
   "jr": "つぎに りようできる びんと くうせきじょうきょうを かくにんします。",
   "ko": "다음 이용 가능한 항공편과 좌석 상황을 확인하겠습니다.",
   "en": "I will check the next available flight and seat availability."
  },
  {
   "r": "B",
   "ja": "明日の朝、一番早い便に乗りたいです。",
   "jr": "あしたの あさ、いちばん はやい びんに のりたいです。",
   "ko": "내일 아침 가장 빠른 편에 타고 싶습니다.",
   "en": "I would like the earliest flight tomorrow morning."
  },
  {
   "r": "A",
   "ja": "ご希望を承りました。変更条件も併せて調べます。",
   "jr": "ごきぼうを うけたまわりました。へんこうじょうけんも あわせて しらべます。",
   "ko": "희망 사항을 알겠습니다. 변경 조건도 함께 확인하겠습니다.",
   "en": "I understand. I will check the change conditions as well."
  },
  {
   "r": "B",
   "ja": "今夜のホテルは手配してもらえますか。",
   "jr": "こんやの ホテルは てはいしてもらえますか。",
   "ko": "오늘 밤 호텔을 준비해 주시나요?",
   "en": "Can the airline arrange a hotel for tonight?"
  },
  {
   "r": "A",
   "ja": "宿泊支援の対象か確認してからご案内します。",
   "jr": "しゅくはくしえんの たいしょうか かくにんしてから ごあんないします。",
   "ko": "숙박 지원 대상인지 확인한 후 안내하겠습니다.",
   "en": "We will check whether accommodation assistance applies before advising you.",
   "alt": [
    {
     "ja": "宿泊の手配が可能か、適用条件を確認してご説明します。",
     "jr": "しゅくはくの てはいが かのうか、てきようじょうけんを かくにんして ごせつめいします。",
     "ko": "숙박 준비가 가능한지 적용 조건을 확인해 설명하겠습니다.",
     "en": "I will check the relevant conditions before advising whether lodging can be arranged."
    }
   ]
  },
  {
   "r": "B",
   "ja": "小さい子どもと一緒なので、長く待てません。",
   "jr": "ちいさい こどもと いっしょなので、ながく まてません。",
   "ko": "어린아이와 함께라 오래 기다릴 수 없습니다.",
   "en": "I have a young child with me and cannot wait too long."
  },
  {
   "r": "A",
   "ja": "承知しました。お子様連れであることも担当者に伝えます。",
   "jr": "しょうちしました。おこさまづれで あることも たんとうしゃに つたえます。",
   "ko": "알겠습니다. 어린아이 동반 사실도 담당자에게 전달하겠습니다.",
   "en": "Understood. I will also let the team know you are travelling with a child."
  },
  {
   "r": "B",
   "ja": "荷物は最終目的地まで預けています。",
   "jr": "にもつは さいしゅうもくてきちまで あずけています。",
   "ko": "수하물은 최종 목적지까지 위탁했습니다.",
   "en": "My bags are checked through to my final destination."
  },
  {
   "r": "A",
   "ja": "手荷物の保管状況と受け取り方法も確認します。",
   "jr": "てにもつの ほかんじょうきょうと うけとりほうほうも かくにんします。",
   "ko": "수하물 보관 상황과 수령 방법도 확인하겠습니다.",
   "en": "I will check where the bags are and how they can be collected."
  },
  {
   "r": "B",
   "ja": "次の手続きはどこでできますか。",
   "jr": "つぎの てつづきは どこで できますか。",
   "ko": "다음 절차는 어디서 진행할 수 있나요?",
   "en": "Where should I go for the next steps?"
  },
  {
   "r": "A",
   "ja": "確認できた内容をまとめて、こちらでご説明いたします。",
   "jr": "かくにんできた ないようを まとめて、こちらで ごせつめいいたします。",
   "ko": "확인된 내용을 정리해 이곳에서 설명하겠습니다.",
   "en": "I will bring the confirmed details together and explain them here.",
   "alt": [
    {
     "ja": "調べた結果を整理して、こちらの窓口でお伝えします。",
     "jr": "しらべた けっかを せいりして、こちらの まどぐちで おつたえします。",
     "ko": "조회 결과를 정리해 이 창구에서 알려드리겠습니다.",
     "en": "I will summarize what we have confirmed and explain it at this desk."
    }
   ]
  },
  {
   "r": "B",
   "ja": "ありがとうございます。子どもとここで待ちます。",
   "jr": "ありがとうございます。こどもと ここで まちます。",
   "ko": "감사합니다. 아이와 함께 여기서 기다리겠습니다.",
   "en": "Thank you. I will wait here with my child."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「最後の便が出てしまいました。今夜はどうなりますか。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “마지막 편이 출발했어요. 오늘 밤은 어떻게 하나요?”라고 말했습니다. 가장 적절한 답변은 무엇인가요?",
    "en": "The other person says, “The last flight has left. What should I do tonight?” Which reply is most appropriate?"
   },
   "opts": [
    {
     "ja": "次に利用できる便と空席状況を確認します。",
     "ko": "다음 이용 가능한 항공편과 좌석 상황을 확인하겠습니다.",
     "en": "I will check the next available flight and seat availability."
    },
    {
     "ja": "必要なお薬なのですね。緊急性も含め担当者に伝えます。",
     "ko": "꼭 필요한 약이군요. 긴급성까지 담당자에게 전달하겠습니다.",
     "en": "I understand it is important. I will tell the team that it may be urgent."
    },
    {
     "ja": "雪のため、出発前に機体の除氷作業を行います。",
     "ko": "눈 때문에 출발 전 기체 제빙 작업을 실시합니다.",
     "en": "Because of the snow, the aircraft needs de-icing before departure."
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「小さい子どもと一緒なので、長く待てません。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “어린아이와 함께라 오래 기다릴 수 없습니다.”라고 말했습니다. 가장 적절한 답변은 무엇인가요?",
    "en": "The other person says, “I have a young child with me and cannot wait too long.” Which reply is most appropriate?"
   },
   "opts": [
    {
     "ja": "まず運航予定の更新を確認し、送迎会社へ変更を相談してください。",
     "ko": "먼저 변경된 운항 예정을 확인한 뒤 픽업 업체에 변경을 문의해 주세요.",
     "en": "Please check the updated flight estimate and contact the transport provider about changes."
    },
    {
     "ja": "現在の計画では、給油後に当初の目的地へ向かいます。",
     "ko": "현재 계획은 급유 후 원래 목적지로 향하는 것입니다.",
     "en": "The current plan is to continue to the original destination after refuelling."
    },
    {
     "ja": "承知しました。お子様連れであることも担当者に伝えます。",
     "ko": "알겠습니다. 어린아이 동반 사실도 담당자에게 전달하겠습니다.",
     "en": "Understood. I will also let the team know you are travelling with a child."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「次の手続きはどこでできますか。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “다음 절차는 어디서 진행할 수 있나요?”라고 말했습니다. 가장 적절한 답변은 무엇인가요?",
    "en": "The other person says, “Where should I go for the next steps?” Which reply is most appropriate?"
   },
   "opts": [
    {
     "ja": "乗務員の到着が遅れており、出発予定を調整しています。",
     "ko": "승무원 도착이 늦어 출발 일정을 조정 중입니다.",
     "en": "The crew are arriving late, and the departure plan is being adjusted."
    },
    {
     "ja": "確認できた内容をまとめて、こちらでご説明いたします。",
     "ko": "확인된 내용을 정리해 이곳에서 설명하겠습니다.",
     "en": "I will bring the confirmed details together and explain them here."
    },
    {
     "ja": "機体についた雪や氷を取り除き、安全を確認する作業です。",
     "ko": "기체에 쌓인 눈이나 얼음을 제거하고 안전을 확인하는 작업입니다.",
     "en": "It removes snow and ice from the aircraft so it can operate safely."
    }
   ],
   "a": 1
  }
 ]
}
);
