/* ACN 会話練習 追加データ（GPT 作成 talk_data_g03.js を Claude が検収・修正：日本語の不自然な行、確認問題の誤答 2026.10.10）。架空の訓練用会話 */
window.TALK=window.TALK||[];window.TALK.push(
{
 "id": "air-irrops-airport-closure-1",
 "cat": "work",
 "lv": 3,
 "title": {
  "ja": "空港閉鎖と出発見合わせ",
  "ko": "공항 폐쇄와 출발 보류",
  "en": "Airport closure and suspended departures"
 },
 "scene": {
  "ja": "滑走路の一時閉鎖で出発の見通しが立たず、係員が待機案内をする。",
  "ko": "활주로가 일시 폐쇄되어 출발이 불투명한 상황에서 직원이 대기 절차를 안내한다.",
  "en": "A temporary runway closure leaves departure uncertain and a gate agent provides updates."
 },
 "roles": {
  "A": {
   "ja": "搭乗口係員",
   "ko": "탑승구 직원",
   "en": "Gate agent"
  },
  "B": {
   "ja": "出発を待つ乗客",
   "ko": "출발 대기 승객",
   "en": "Waiting passenger"
  }
 },
 "ai": {
  "goal": {
   "ja": "運航再開が未確定であることを明確に伝え、情報更新の方法を説明する。",
   "ko": "운항 재개가 미확정임을 명확히 알리고 정보 업데이트 방법을 설명한다.",
   "en": "Explain that reopening is not confirmed and how updates will be communicated."
  },
  "twist": {
   "ja": "乗客が空港の外へ出てよいか尋ねる。",
   "ko": "승객이 공항 밖으로 나가도 되는지 묻는다.",
   "en": "The passenger asks whether they can leave the airport."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "滑走路の一時閉鎖により、出発を見合わせております。",
   "jr": "かっそうろの いちじへいさにより、しゅっぱつを みあわせております。",
   "ko": "활주로 일시 폐쇄로 출발을 보류하고 있습니다.",
   "en": "Departures are temporarily suspended due to a runway closure.",
   "alt": [
    {
     "ja": "滑走路が閉鎖されているため、現在出発を停止しています。",
     "jr": "かっそうろが へいさされているため、げんざい しゅっぱつを ていししています。",
     "ko": "활주로 폐쇄로 현재 출발을 중단하고 있습니다.",
     "en": "Departures are on hold while the runway remains closed."
    }
   ]
  },
  {
   "r": "B",
   "ja": "いつ頃出発できそうですか。",
   "jr": "いつごろ しゅっぱつできそうですか。",
   "ko": "언제쯤 출발할 수 있나요?",
   "en": "When do you think we can depart?"
  },
  {
   "r": "A",
   "ja": "再開時刻はまだ決まっておりません。確認でき次第お伝えします。",
   "jr": "さいかいじこくは まだ きまっておりません。かくにんできしだい おつたえします。",
   "ko": "재개 시각은 아직 정해지지 않았습니다. 확인되는 대로 알려드리겠습니다.",
   "en": "There is no confirmed reopening time yet. We will update you when we know more."
  },
  {
   "r": "B",
   "ja": "欠航になる可能性もありますか。",
   "jr": "けっこうに なる かのうせいも ありますか。",
   "ko": "결항될 가능성도 있나요?",
   "en": "Could the flight be cancelled?"
  },
  {
   "r": "A",
   "ja": "運航するかどうかは確認中のため、今の段階では申し上げられません。",
   "jr": "うんこうするか どうかは かくにんちゅうの ため、いまの だんかいでは もうしあげられません。",
   "ko": "운항 여부는 확인 중이라 지금 단계에서는 말씀드리기 어렵습니다.",
   "en": "Whether the flight will operate is still being reviewed, so I can’t say at this stage."
  },
  {
   "r": "B",
   "ja": "次の案内はどこで聞けますか。",
   "jr": "つぎの あんないは どこで きけますか。",
   "ko": "다음 안내는 어디에서 들을 수 있나요?",
   "en": "Where will the next update be given?"
  },
  {
   "r": "A",
   "ja": "この搭乗口と空港の案内表示で最新情報をご確認ください。",
   "jr": "この とうじょうぐちと くうこうの あんないひょうじで さいしんじょうほうを ごかくにんください。",
   "ko": "이 탑승구와 공항 안내 표시에서 최신 정보를 확인해 주세요.",
   "en": "Please check this gate and the airport displays for updates.",
   "alt": [
    {
     "ja": "最新情報は搭乗口の表示と係員の案内をご確認ください。",
     "jr": "さいしんじょうほうは とうじょうぐちの ひょうじと かかりいんの あんないを ごかくにんください。",
     "ko": "최신 정보는 탑승구 표시와 직원 안내를 확인해 주세요.",
     "en": "You can follow updates on the gate display and from our staff."
    }
   ]
  },
  {
   "r": "B",
   "ja": "少し空港の外に出ても大丈夫ですか。",
   "jr": "すこし くうこうの そとに でても だいじょうぶですか。",
   "ko": "잠시 공항 밖으로 나가도 되나요?",
   "en": "May I step outside the airport for a while?"
  },
  {
   "r": "A",
   "ja": "再入場に必要な時間と保安検査の手続きをご確認ください。",
   "jr": "さいにゅうじょうに ひつような じかんと ほあんけんさの てつづきを ごかくにんください。",
   "ko": "재입장 소요 시간과 보안검색 절차를 확인해 주세요.",
   "en": "Please account for the time and security procedures needed to re-enter."
  },
  {
   "r": "B",
   "ja": "その間に搭乗が始まると困ります。",
   "jr": "その あいだに とうじょうが はじまると こまります。",
   "ko": "그사이에 탑승이 시작되면 곤란합니다.",
   "en": "I would hate to miss boarding while I am away."
  },
  {
   "r": "A",
   "ja": "急な変更もあり得るため、近くでお待ちいただくことをお勧めします。",
   "jr": "きゅうな へんこうも ありえるため、ちかくで おまちいただくことを おすすめします。",
   "ko": "갑작스러운 변경이 있을 수 있어 가까이서 기다리시길 권합니다.",
   "en": "Changes may happen quickly, so I recommend staying nearby."
  },
  {
   "r": "B",
   "ja": "分かりました。次の情報はいつ確認すればよいですか。",
   "jr": "わかりました。つぎの じょうほうは いつ かくにんすれば よいですか。",
   "ko": "알겠습니다. 다음 정보는 언제 확인하면 될까요?",
   "en": "Understood. When should I check for another update?"
  },
  {
   "r": "A",
   "ja": "次の案内予定を確認し、分かり次第この場所でお知らせします。",
   "jr": "つぎの あんないよていを かくにんし、わかりしだい この ばしょで おしらせします。",
   "ko": "다음 안내 예정 시점을 확인하고 알게 되는 대로 여기서 알려드리겠습니다.",
   "en": "I will confirm the next update time and announce it here when available.",
   "alt": [
    {
     "ja": "次回の更新時刻を調べて、こちらでご案内いたします。",
     "jr": "じかいの こうしんじこくを しらべて、こちらで ごあんないいたします。",
     "ko": "다음 업데이트 시각을 확인해 여기서 안내하겠습니다.",
     "en": "I will check the next scheduled update and let you know here."
    }
   ]
  },
  {
   "r": "B",
   "ja": "ありがとうございます。こちらで待ちます。",
   "jr": "ありがとうございます。こちらで まちます。",
   "ko": "감사합니다. 여기서 기다리겠습니다.",
   "en": "Thank you. I will wait here."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「いつ頃出発できそうですか。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “언제쯤 출발할 수 있나요?”라고 말했습니다. 가장 적절한 응답은 무엇인가요?",
    "en": "The passenger says, “When do you think we can depart?” Which response is most appropriate?"
   },
   "opts": [
    {
     "ja": "手荷物の引き継ぎ状況を担当部署に確認します。",
     "ko": "담당 부서에 수하물 연결 처리 상황을 확인하겠습니다.",
     "en": "I’ll check the baggage transfer status with the relevant team."
    },
    {
     "ja": "再開時刻はまだ決まっておりません。確認でき次第お伝えします。",
     "ko": "재개 시각은 아직 정해지지 않았습니다. 확인되는 대로 알려드리겠습니다.",
     "en": "There is no confirmed reopening time yet. We will update you when we know more."
    },
    {
     "ja": "元の座席指定も記録で確認し、調整できるか調べます。",
     "ko": "기존 좌석 배정도 확인하고 조정할 수 있는지 살펴보겠습니다.",
     "en": "I’ll review your original seat selection and see what can be arranged."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「少し空港の外に出ても大丈夫ですか。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “잠시 공항 밖으로 나가도 되나요?”라고 말했습니다. 가장 적절한 응답은 무엇인가요?",
    "en": "The passenger says, “May I step outside the airport for a while?” Which response is most appropriate?"
   },
   "opts": [
    {
     "ja": "お荷物が見当たらないとのことですね。ご不便をおかけしております。",
     "ko": "짐이 보이지 않는다고 하셨군요. 불편을 드려 죄송합니다.",
     "en": "I understand your bag has not arrived. I am sorry for the inconvenience."
    },
    {
     "ja": "手荷物の引き継ぎ状況を担当部署に確認します。",
     "ko": "수하물 인계 상황을 담당 부서에 확인하겠습니다.",
     "en": "I will check the baggage transfer status with the handling team."
    },
    {
     "ja": "再入場に必要な時間と保安検査の手続きをご確認ください。",
     "ko": "재입장 소요 시간과 보안검색 절차를 확인해 주세요.",
     "en": "Please account for the time and security procedures needed to re-enter."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「分かりました。次の情報はいつ確認すればよいですか。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “알겠습니다. 다음 정보는 언제 확인하면 될까요?”라고 말했습니다. 가장 적절한 응답은 무엇인가요?",
    "en": "The passenger says, “Understood. When should I check for another update?” Which response is most appropriate?"
   },
   "opts": [
    {
     "ja": "次の案内予定を確認し、分かり次第この場所でお知らせします。",
     "ko": "다음 안내 예정 시점을 확인하고 알게 되는 대로 여기서 알려드리겠습니다.",
     "en": "I will confirm the next update time and announce it here when available."
    },
    {
     "ja": "必要なお薬なのですね。緊急性も含め担当者に伝えます。",
     "ko": "꼭 필요한 약이군요. 긴급성까지 담당자에게 전달하겠습니다.",
     "en": "I understand it is important. I will tell the team that it may be urgent."
    },
    {
     "ja": "現在の計画では、給油後に当初の目的地へ向かいます。",
     "ko": "현재 계획은 급유 후 원래 목적지로 향하는 것입니다.",
     "en": "The current plan is to continue to the original destination after refuelling."
    }
   ],
   "a": 0
  }
 ]
},
{
 "id": "air-irrops-deicing-1",
 "cat": "work",
 "lv": 2,
 "title": {
  "ja": "除氷作業による遅延",
  "ko": "제빙 작업으로 인한 지연",
  "en": "Delay during aircraft de-icing"
 },
 "scene": {
  "ja": "雪の影響で出発前の除氷作業が必要になり、乗客が所要時間を尋ねる。",
  "ko": "눈으로 출발 전 제빙 작업이 필요해져 승객이 소요 시간을 묻는다.",
  "en": "Snow requires de-icing before departure, and a passenger asks how long it will take."
 },
 "roles": {
  "A": {
   "ja": "出発係員",
   "ko": "출발 담당 직원",
   "en": "Departure agent"
  },
  "B": {
   "ja": "搭乗を待つ乗客",
   "ko": "탑승 대기 승객",
   "en": "Waiting passenger"
  }
 },
 "ai": {
  "goal": {
   "ja": "安全上の作業目的と予定時刻の不確実性を説明する。",
   "ko": "안전을 위한 작업 목적과 예상 시간의 불확실성을 설명한다.",
   "en": "Explain the safety purpose of de-icing without promising an exact time."
  },
  "twist": {
   "ja": "乗客が到着後に予約した送迎を心配する。",
   "ko": "승객이 도착 후 예약한 교통편을 걱정한다.",
   "en": "The passenger is worried about pre-booked transport on arrival."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "雪のため、出発前に機体の除氷作業を行います。",
   "jr": "ゆきのため、しゅっぱつまえに きたいの じょひょうさぎょうを おこないます。",
   "ko": "눈 때문에 출발 전 기체 제빙 작업을 실시합니다.",
   "en": "Because of the snow, the aircraft needs de-icing before departure.",
   "alt": [
    {
     "ja": "安全のため、出発前に雪と氷を取り除く必要があります。",
     "jr": "あんぜんのため、しゅっぱつまえに ゆきと こおりを とりのぞく ひつようが あります。",
     "ko": "안전을 위해 출발 전에 눈과 얼음을 제거해야 합니다.",
     "en": "For safety, snow and ice must be removed before departure."
    }
   ]
  },
  {
   "r": "B",
   "ja": "除氷とはどんな作業ですか。",
   "jr": "じょひょうとは どんな さぎょうですか。",
   "ko": "제빙은 어떤 작업인가요?",
   "en": "What does de-icing involve?"
  },
  {
   "r": "A",
   "ja": "機体についた雪や氷を取り除き、安全を確認する作業です。",
   "jr": "きたいについた ゆきや こおりを とりのぞき、あんぜんを かくにんする さぎょうです。",
   "ko": "기체에 쌓인 눈이나 얼음을 제거하고 안전을 확인하는 작업입니다.",
   "en": "It removes snow and ice from the aircraft so it can operate safely."
  },
  {
   "r": "B",
   "ja": "作業は何分ぐらいかかりますか。",
   "jr": "さぎょうは なんぷんぐらい かかりますか。",
   "ko": "작업은 몇 분 정도 걸리나요?",
   "en": "How many minutes will it take?"
  },
  {
   "r": "A",
   "ja": "天候と作業の順番で変わるため、現時点では確約できません。",
   "jr": "てんこうと さぎょうの じゅんばんで かわるため、げんじてんでは かくやくできません。",
   "ko": "날씨와 작업 순서에 따라 달라져 현재 확답드릴 수 없습니다.",
   "en": "It depends on the weather and the queue, so we cannot promise a duration yet."
  },
  {
   "r": "B",
   "ja": "搭乗は予定どおり始まりますか。",
   "jr": "とうじょうは よていどおり はじまりますか。",
   "ko": "탑승은 예정대로 시작하나요?",
   "en": "Will boarding start on schedule?"
  },
  {
   "r": "A",
   "ja": "搭乗開始時刻も確認中です。表示をご確認ください。",
   "jr": "とうじょうかいしじこくも かくにんちゅうです。ひょうじを ごかくにんください。",
   "ko": "탑승 시작 시각도 확인 중입니다. 안내 표시를 확인해 주세요.",
   "en": "The boarding time is also being reviewed. Please check the displays.",
   "alt": [
    {
     "ja": "搭乗の開始予定はまだ調整中です。案内表示をご覧ください。",
     "jr": "とうじょうの かいしよていは まだ ちょうせいちゅうです。あんないひょうじを ごらんください。",
     "ko": "탑승 시작 예정은 아직 조정 중입니다. 안내 표시를 봐 주세요.",
     "en": "Boarding arrangements are still being updated. Please watch the displays."
    }
   ]
  },
  {
   "r": "B",
   "ja": "到着後の送迎を予約しているのですが、どうすればいいですか。",
   "jr": "とうちゃくごの そうげいを よやくしているのですが、どうすれば いいですか。",
   "ko": "도착 후 픽업 차량을 예약했는데 어떻게 해야 하나요?",
   "en": "I booked a pickup after arrival. What should I do?"
  },
  {
   "r": "A",
   "ja": "まず運航予定の更新を確認し、送迎会社へ変更を相談してください。",
   "jr": "まず うんこうよていの こうしんを かくにんし、そうげいがいしゃへ へんこうを そうだんしてください。",
   "ko": "먼저 변경된 운항 예정을 확인한 뒤 픽업 업체에 변경을 문의해 주세요.",
   "en": "Please check the updated flight estimate and contact the transport provider about changes."
  },
  {
   "r": "B",
   "ja": "到着時刻がまた変わることもありますか。",
   "jr": "とうちゃくじこくが また かわることも ありますか。",
   "ko": "도착 시간이 다시 바뀔 수도 있나요?",
   "en": "Could the arrival time change again?"
  },
  {
   "r": "A",
   "ja": "はい。作業状況と天候によって変更される可能性があります。",
   "jr": "はい。さぎょうじょうきょうと てんこうによって へんこうされる かのうせいが あります。",
   "ko": "네. 작업 상황과 날씨에 따라 변경될 가능성이 있습니다.",
   "en": "Yes. The estimate may change depending on the work and weather."
  },
  {
   "r": "B",
   "ja": "最新の情報はどこに出ますか。",
   "jr": "さいしんの じょうほうは どこに でますか。",
   "ko": "최신 정보는 어디에 나오나요?",
   "en": "Where can I see the latest information?"
  },
  {
   "r": "A",
   "ja": "搭乗口の表示と航空会社の案内を随時ご確認ください。",
   "jr": "とうじょうぐちの ひょうじと こうくうがいしゃの あんないを ずいじ ごかくにんください。",
   "ko": "탑승구 표시와 항공사 안내를 수시로 확인해 주세요.",
   "en": "Please monitor the gate display and the airline’s updates.",
   "alt": [
    {
     "ja": "新しい時刻は搭乗口と航空会社からご案内します。",
     "jr": "あたらしい じこくは とうじょうぐちと こうくうがいしゃから ごあんないします。",
     "ko": "새 시각은 탑승구와 항공사 안내로 알려드립니다.",
     "en": "The updated time will be posted at the gate and through the airline."
    }
   ]
  },
  {
   "r": "B",
   "ja": "安全のためなら待ちます。ありがとうございます。",
   "jr": "あんぜんのためなら まちます。ありがとうございます。",
   "ko": "안전을 위한 작업이라면 기다리겠습니다. 감사합니다.",
   "en": "I understand it is for safety. Thank you."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「除氷とはどんな作業ですか。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “제빙은 어떤 작업인가요?”라고 말했습니다. 가장 적절한 응답은 무엇인가요?",
    "en": "The passenger says, “What does de-icing involve?” Which response is most appropriate?"
   },
   "opts": [
    {
     "ja": "必要なお薬なのですね。緊急性も含め担当者に伝えます。",
     "ko": "꼭 필요한 약이군요. 긴급성까지 담당자에게 전달하겠습니다.",
     "en": "I understand it is important. I will tell the team that it may be urgent."
    },
    {
     "ja": "機体についた雪や氷を取り除き、安全を確認する作業です。",
     "ko": "기체에 쌓인 눈이나 얼음을 제거하고 안전을 확인하는 작업입니다.",
     "en": "It removes snow and ice from the aircraft so it can operate safely."
    },
    {
     "ja": "手荷物の所在と取り扱いを担当者に確認します。",
     "ko": "담당자에게 수하물 위치와 처리 방법을 확인하겠습니다.",
     "en": "I’ll check the location and handling of your bag with the baggage team."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「到着後の送迎を予約しているのですが、どうすればいいですか。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “도착 후 픽업 차량을 예약했는데 어떻게 해야 하나요?”라고 말했습니다. 가장 적절한 응답은 무엇인가요?",
    "en": "The passenger says, “I booked a pickup after arrival. What should I do?” Which response is most appropriate?"
   },
   "opts": [
    {
     "ja": "ご心配をおかけしました。空席と座席配置を確認いたします。",
     "ko": "걱정을 끼쳐 드려 죄송합니다. 빈자리와 좌석 배치를 확인하겠습니다.",
     "en": "I’m sorry about that. I’ll check the available seats and the new seat map."
    },
    {
     "ja": "機材の整備確認のため、搭乗開始を見合わせております。",
     "ko": "항공기 정비 확인을 위해 탑승 시작을 보류하고 있습니다.",
     "en": "Boarding is on hold while maintenance checks are carried out."
    },
    {
     "ja": "まず運航予定の更新を確認し、送迎会社へ変更を相談してください。",
     "ko": "먼저 변경된 운항 예정을 확인한 뒤 픽업 업체에 변경을 문의해 주세요.",
     "en": "Please check the updated flight estimate and contact the transport provider about changes."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「最新の情報はどこに出ますか。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “최신 정보는 어디에 나오나요?”라고 말했습니다. 가장 적절한 응답은 무엇인가요?",
    "en": "The passenger says, “Where can I see the latest information?” Which response is most appropriate?"
   },
   "opts": [
    {
     "ja": "同僚の方と連絡が取れるまで、ご予約は変更せずに確認を進めます。",
     "ko": "동료분과 연락이 닿을 때까지 예약은 바꾸지 않고 확인을 진행하겠습니다.",
     "en": "Until we can reach your colleague, I’ll keep checking without changing their booking."
    },
    {
     "ja": "お荷物が見当たらないとのことですね。ご不便をおかけしております。",
     "ko": "짐이 보이지 않는다고 하셨군요. 불편을 드려 죄송합니다.",
     "en": "I understand your bag has not arrived. I am sorry for the inconvenience."
    },
    {
     "ja": "搭乗口の表示と航空会社の案内を随時ご確認ください。",
     "ko": "탑승구 표시와 항공사 안내를 수시로 확인해 주세요.",
     "en": "Please monitor the gate display and the airline’s updates."
    }
   ],
   "a": 2
  }
 ]
},
{
 "id": "air-irrops-crew-replacement-1",
 "cat": "work",
 "lv": 3,
 "title": {
  "ja": "乗務員交代による出発調整",
  "ko": "승무원 교체에 따른 출발 조정",
  "en": "Departure adjustment for crew replacement"
 },
 "scene": {
  "ja": "乗務員の交代手配で出発が遅れ、係員が説明を求められる。",
  "ko": "승무원 교체 준비로 출발이 지연되어 직원이 설명을 요청받는다.",
  "en": "Departure is delayed while a replacement crew is arranged."
 },
 "roles": {
  "A": {
   "ja": "搭乗口責任者",
   "ko": "탑승구 책임자",
   "en": "Gate supervisor"
  },
  "B": {
   "ja": "出張中の乗客",
   "ko": "출장 승객",
   "en": "Business passenger"
  }
 },
 "ai": {
  "goal": {
   "ja": "確認済みの事実と未確定事項を分けて説明し、旅行計画への影響を把握する。",
   "ko": "확인된 사실과 미확정 사항을 구분해 설명하고 승객 일정에 미치는 영향을 파악한다.",
   "en": "Distinguish confirmed facts from estimates and identify the passenger’s travel concerns."
  },
  "twist": {
   "ja": "乗客が別の便への変更を希望する。",
   "ko": "승객이 다른 항공편으로 변경해 달라고 요청한다.",
   "en": "The passenger requests a change to another flight."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "乗務員の交代手配により、出発時刻を調整しております。",
   "jr": "じょうむいんの こうたい てはいにより、しゅっぱつじこくを ちょうせいしております。",
   "ko": "승무원 교체 준비로 출발 시각을 조정하고 있습니다.",
   "en": "Departure is being adjusted while replacement crew arrangements are made.",
   "alt": [
    {
     "ja": "乗務員を交代するため、出発の予定を見直しています。",
     "jr": "じょうむいんを こうたいするため、しゅっぱつの よていを みなおしています。",
     "ko": "승무원 교체를 위해 출발 계획을 재조정하고 있습니다.",
     "en": "We are revising the departure plan to accommodate a crew change."
    }
   ]
  },
  {
   "r": "B",
   "ja": "機体に問題があるのでしょうか。",
   "jr": "きたいに もんだいが あるのでしょうか。",
   "ko": "항공기에 문제가 있는 건가요?",
   "en": "Is there a problem with the aircraft?"
  },
  {
   "r": "A",
   "ja": "現在ご案内している遅延理由は乗務員の交代です。",
   "jr": "げんざい ごあんないしている ちえんりゆうは じょうむいんの こうたいです。",
   "ko": "현재 안내된 지연 사유는 승무원 교체입니다.",
   "en": "The delay reason currently communicated is the crew replacement."
  },
  {
   "r": "B",
   "ja": "新しい乗務員はもう到着していますか。",
   "jr": "あたらしい じょうむいんは もう とうちゃくしていますか。",
   "ko": "새 승무원은 이미 도착했나요?",
   "en": "Has the replacement crew arrived?"
  },
  {
   "r": "A",
   "ja": "手配の進み具合を確認しています。未確認の情報はお伝えできません。",
   "jr": "てはいの すすみぐあいを かくにんしています。みかくにんの じょうほうは おつたえできません。",
   "ko": "진행 상황을 확인 중입니다. 확인되지 않은 정보는 안내할 수 없습니다.",
   "en": "We are checking the arrangements and cannot confirm details that are not yet verified."
  },
  {
   "r": "B",
   "ja": "今日の会議に間に合うか心配です。",
   "jr": "きょうの かいぎに まにあうか しんぱいです。",
   "ko": "오늘 회의에 맞출 수 있을지 걱정됩니다.",
   "en": "I am worried I will miss my meeting today."
  },
  {
   "r": "A",
   "ja": "ご予定への影響を理解しております。到着見込みも確認します。",
   "jr": "ごよていへの えいきょうを りかいしております。とうちゃくみこみも かくにんします。",
   "ko": "일정에 영향이 있는 점 이해합니다. 도착 예상 시간도 확인하겠습니다.",
   "en": "I understand the impact on your plans. I will check the estimated arrival time.",
   "alt": [
    {
     "ja": "ご事情を承知しました。到着時刻の見込みを調べます。",
     "jr": "ごじじょうを しょうちしました。とうちゃくじこくの みこみを しらべます。",
     "ko": "사정을 이해했습니다. 도착 예상 시간을 확인하겠습니다.",
     "en": "I understand your situation and will check the projected arrival."
    }
   ]
  },
  {
   "r": "B",
   "ja": "別の便へ変更できませんか。",
   "jr": "べつの びんへ へんこうできませんか。",
   "ko": "다른 항공편으로 변경할 수 없나요?",
   "en": "Can I change to another flight?"
  },
  {
   "r": "A",
   "ja": "空席と予約条件を確認し、変更可能な選択肢をご案内します。",
   "jr": "くうせきと よやくじょうけんを かくにんし、へんこうかのうな せんたくしを ごあんないします。",
   "ko": "좌석 상황과 예약 조건을 확인한 뒤 변경 가능한 선택지를 안내하겠습니다.",
   "en": "I will check availability and ticket conditions, then explain any possible changes."
  },
  {
   "r": "B",
   "ja": "変更するかどうか、今すぐ決める必要がありますか。",
   "jr": "へんこうするかどうか、いますぐ きめる ひつようが ありますか。",
   "ko": "변경할지 지금 바로 결정해야 하나요?",
   "en": "Do I have to decide right now?"
  },
  {
   "r": "A",
   "ja": "候補と条件を確認してから、ご判断いただけます。",
   "jr": "こうほと じょうけんを かくにんしてから、ごはんだんいただけます。",
   "ko": "대안과 조건을 확인한 뒤 결정하실 수 있습니다.",
   "en": "You can review the alternatives and conditions before deciding."
  },
  {
   "r": "B",
   "ja": "では、変更条件を先に教えてください。",
   "jr": "では、へんこうじょうけんを さきに おしえてください。",
   "ko": "그럼 변경 조건부터 알려 주세요.",
   "en": "Then please explain the change conditions first."
  },
  {
   "r": "A",
   "ja": "予約を確認し、追加費用の有無も含めて説明いたします。",
   "jr": "よやくを かくにんし、ついかひようの うむも ふくめて せつめいいたします。",
   "ko": "예약을 확인하고 추가 비용 발생 여부도 포함해 설명드리겠습니다.",
   "en": "I will review your booking and explain whether any additional charges apply.",
   "alt": [
    {
     "ja": "変更時の条件と費用を予約内容に沿って確認します。",
     "jr": "へんこうじの じょうけんと ひようを よやくないように そって かくにんします。",
     "ko": "변경 조건과 비용을 예약 내용에 따라 확인하겠습니다.",
     "en": "I will check the change terms and costs for your particular booking."
    }
   ]
  },
  {
   "r": "B",
   "ja": "ありがとうございます。条件を聞いてから決めます。",
   "jr": "ありがとうございます。じょうけんを きいてから きめます。",
   "ko": "감사합니다. 조건을 듣고 결정하겠습니다.",
   "en": "Thank you. I will decide after hearing the conditions."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「機体に問題があるのでしょうか。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “항공기에 문제가 있는 건가요?”라고 말했습니다. 가장 적절한 응답은 무엇인가요?",
    "en": "The passenger says, “Is there a problem with the aircraft?” Which response is most appropriate?"
   },
   "opts": [
    {
     "ja": "ただいま搭乗券の読み取り機に不具合が発生しています。",
     "ko": "현재 탑승권 스캐너에 문제가 발생했습니다.",
     "en": "The boarding-pass scanner is currently not working."
    },
    {
     "ja": "現在ご案内している遅延理由は乗務員の交代です。",
     "ko": "현재 안내된 지연 사유는 승무원 교체입니다.",
     "en": "The delay reason currently communicated is the crew replacement."
    },
    {
     "ja": "お急ぎなのですね。ただ、必要書類の確認は省略できません。",
     "ko": "급하시군요. 다만 필수 서류 확인을 생략할 수는 없습니다.",
     "en": "I understand it is urgent, but we cannot skip the document checks."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「別の便へ変更できませんか。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “다른 항공편으로 변경할 수 없나요?”라고 말했습니다. 가장 적절한 응답은 무엇인가요?",
    "en": "The passenger says, “Can I change to another flight?” Which response is most appropriate?"
   },
   "opts": [
    {
     "ja": "空席と予約条件を確認し、変更可能な選択肢をご案内します。",
     "ko": "좌석 상황과 예약 조건을 확인한 뒤 변경 가능한 선택지를 안내하겠습니다.",
     "en": "I will check availability and ticket conditions, then explain any possible changes."
    },
    {
     "ja": "まず運航予定の更新を確認し、送迎会社へ変更を相談してください。",
     "ko": "먼저 변경된 운항 예정을 확인한 뒤 픽업 업체에 변경을 문의해 주세요.",
     "en": "Please check the updated flight estimate and contact the transport provider about changes."
    },
    {
     "ja": "再入場に必要な時間と保安検査の手続きをご確認ください。",
     "ko": "재입장 소요 시간과 보안검색 절차를 확인해 주세요.",
     "en": "Please account for the time and security procedures needed to re-enter."
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「では、変更条件を先に教えてください。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “그럼 변경 조건부터 알려 주세요.”라고 말했습니다. 가장 적절한 응답은 무엇인가요?",
    "en": "The passenger says, “Then please explain the change conditions first.” Which response is most appropriate?"
   },
   "opts": [
    {
     "ja": "恐れ入ります。旅券の写真があるページに破損が見られます。",
     "ko": "죄송하지만 여권 사진이 있는 페이지에 훼손이 보입니다.",
     "en": "I am sorry, but the passport photo page appears to be damaged."
    },
    {
     "ja": "必要なお薬なのですね。緊急性も含め担当者に伝えます。",
     "ko": "꼭 필요한 약이군요. 긴급성까지 담당자에게 전달하겠습니다.",
     "en": "I understand it is important. I will tell the team that it may be urgent."
    },
    {
     "ja": "予約を確認し、追加費用の有無も含めて説明いたします。",
     "ko": "예약을 확인하고 추가 비용 발생 여부도 포함해 설명드리겠습니다.",
     "en": "I will review your booking and explain whether any additional charges apply."
    }
   ],
   "a": 2
  }
 ]
},
{
 "id": "air-irrops-terminal-change-1",
 "cat": "work",
 "lv": 2,
 "title": {
  "ja": "出発ターミナル変更の案内",
  "ko": "출발 터미널 변경 안내",
  "en": "Departure terminal change"
 },
 "scene": {
  "ja": "運航上の都合で出発ターミナルが変更され、係員が移動方法を案内する。",
  "ko": "운항상의 사정으로 출발 터미널이 변경되어 직원이 이동 방법을 안내한다.",
  "en": "A passenger needs guidance after the departure terminal changes."
 },
 "roles": {
  "A": {
   "ja": "案内カウンター係員",
   "ko": "안내 카운터 직원",
   "en": "Information desk agent"
  },
  "B": {
   "ja": "手荷物を預けた乗客",
   "ko": "수하물을 위탁한 승객",
   "en": "Passenger with checked baggage"
  }
 },
 "ai": {
  "goal": {
   "ja": "確定したターミナル情報と移動手続きを説明し、手荷物の不安を確認する。",
   "ko": "확정된 터미널 정보와 이동 절차를 설명하고 위탁 수하물 우려를 확인한다.",
   "en": "Explain the confirmed terminal and transit process while addressing baggage concerns."
  },
  "twist": {
   "ja": "乗客が車いす利用の同行者と移動している。",
   "ko": "승객이 휠체어를 이용하는 동행자와 이동 중이다.",
   "en": "The passenger is travelling with a wheelchair user."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "お客様の便は出発ターミナルが変更になりました。",
   "jr": "おきゃくさまの びんは しゅっぱつターミナルが へんこうに なりました。",
   "ko": "고객님의 항공편 출발 터미널이 변경되었습니다.",
   "en": "Your flight will now depart from a different terminal.",
   "alt": [
    {
     "ja": "出発するターミナルが変わりましたので、ご案内します。",
     "jr": "しゅっぱつする ターミナルが かわりましたので、ごあんないします。",
     "ko": "출발 터미널이 바뀌어 안내드리겠습니다.",
     "en": "The departure terminal has changed, and I will guide you."
    }
   ]
  },
  {
   "r": "B",
   "ja": "どのターミナルへ行けばよいですか。",
   "jr": "どの ターミナルへ いけば よいですか。",
   "ko": "어느 터미널로 가야 하나요?",
   "en": "Which terminal should I go to?"
  },
  {
   "r": "A",
   "ja": "最新の運航表示を確認し、出発ターミナルをご案内します。",
   "jr": "さいしんの うんこうひょうじを かくにんし、しゅっぱつターミナルを ごあんないします。",
   "ko": "최신 운항 표시를 확인해 출발 터미널을 안내하겠습니다.",
   "en": "I will verify the latest flight display and confirm the departure terminal."
  },
  {
   "r": "B",
   "ja": "ここからどうやって移動しますか。",
   "jr": "ここから どうやって いどうしますか。",
   "ko": "여기서 어떻게 이동하나요?",
   "en": "How do I get there from here?"
  },
  {
   "r": "A",
   "ja": "ターミナル間の移動手段と所要時間を確認いたします。",
   "jr": "ターミナルかんの いどうしゅだんと しょようじかんを かくにんいたします。",
   "ko": "터미널 간 이동 수단과 소요 시간을 확인하겠습니다.",
   "en": "I will check the transfer options and estimated travel time."
  },
  {
   "r": "B",
   "ja": "預けた荷物はどうなりますか。",
   "jr": "あずけた にもつは どうなりますか。",
   "ko": "이미 맡긴 짐은 어떻게 되나요?",
   "en": "What will happen to my checked baggage?"
  },
  {
   "r": "A",
   "ja": "手荷物の引き継ぎ状況を担当部署に確認します。",
   "jr": "てにもつの ひきつぎじょうきょうを たんとうぶしょに かくにんします。",
   "ko": "수하물 인계 상황을 담당 부서에 확인하겠습니다.",
   "en": "I will check the baggage transfer status with the handling team.",
   "alt": [
    {
     "ja": "お預かりした手荷物の扱いを確認してまいります。",
     "jr": "おあずかりした てにもつの あつかいを かくにんしてまいります。",
     "ko": "위탁하신 수하물 처리 상황을 확인하겠습니다.",
     "en": "I will check how your checked bags are being handled."
    }
   ]
  },
  {
   "r": "B",
   "ja": "同行者が車いすを使っています。移動の支援はありますか。",
   "jr": "どうこうしゃが くるまいすを つかっています。いどうの しえんは ありますか。",
   "ko": "동행자가 휠체어를 사용합니다. 이동 지원이 있나요?",
   "en": "My companion uses a wheelchair. Is assistance available?"
  },
  {
   "r": "A",
   "ja": "必要な支援を伺い、移動先の担当者と連携いたします。",
   "jr": "ひつような しえんを うかがい、いどうさきの たんとうしゃと れんけいいたします。",
   "ko": "필요한 지원을 여쭤보고 이동할 터미널의 담당자와 협조하겠습니다.",
   "en": "I will ask what assistance is needed and coordinate with the receiving team."
  },
  {
   "r": "B",
   "ja": "時間に余裕がないので心配です。",
   "jr": "じかんに よゆうが ないので しんぱいです。",
   "ko": "시간 여유가 없어 걱정됩니다.",
   "en": "I am worried we do not have much time."
  },
  {
   "r": "A",
   "ja": "搭乗締切の状況も確認し、優先してご案内します。",
   "jr": "とうじょうしめきりの じょうきょうも かくにんし、ゆうせんして ごあんないします。",
   "ko": "탑승 마감 상황도 확인하고 우선 안내하겠습니다.",
   "en": "I will check the boarding cutoff and prioritize helping you."
  },
  {
   "r": "B",
   "ja": "まずどこで待てばよいですか。",
   "jr": "まず どこで まてば よいですか。",
   "ko": "우선 어디에서 기다리면 되나요?",
   "en": "Where should we wait first?"
  },
  {
   "r": "A",
   "ja": "支援担当者の到着場所を確認し、こちらでお伝えします。",
   "jr": "しえんたんとうしゃの とうちゃくばしょを かくにんし、こちらで おつたえします。",
   "ko": "지원 담당자의 도착 장소를 확인해 여기서 알려드리겠습니다.",
   "en": "I will confirm where the assistance staff will meet you and tell you here.",
   "alt": [
    {
     "ja": "担当者との待ち合わせ場所を調べてお知らせします。",
     "jr": "たんとうしゃとの まちあわせばしょを しらべて おしらせします。",
     "ko": "담당자와 만날 장소를 확인해 안내하겠습니다.",
     "en": "I will find out where the staff member will meet you."
    }
   ]
  },
  {
   "r": "B",
   "ja": "助かります。よろしくお願いします。",
   "jr": "たすかります。よろしく おねがいします。",
   "ko": "도움이 됩니다. 부탁드립니다.",
   "en": "That helps. Thank you very much."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「どのターミナルへ行けばよいですか。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “어느 터미널로 가야 하나요?”라고 말했습니다. 가장 적절한 응답은 무엇인가요?",
    "en": "The passenger says, “Which terminal should I go to?” Which response is most appropriate?"
   },
   "opts": [
    {
     "ja": "最新の運航表示を確認し、出発ターミナルをご案内します。",
     "ko": "최신 운항 표시를 확인해 출발 터미널을 안내하겠습니다.",
     "en": "I will verify the latest flight display and confirm the departure terminal."
    },
    {
     "ja": "乗務員の到着が遅れており、出発予定を調整しています。",
     "ko": "승무원 도착이 늦어 출발 일정을 조정 중입니다.",
     "en": "The crew are arriving late, and the departure plan is being adjusted."
    },
    {
     "ja": "必要なお薬なのですね。緊急性も含め担当者に伝えます。",
     "ko": "꼭 필요한 약이군요. 긴급성까지 담당자에게 전달하겠습니다.",
     "en": "I understand it is important. I will tell the team that it may be urgent."
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「同行者が車いすを使っています。移動の支援はありますか。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “동행자가 휠체어를 사용합니다. 이동 지원이 있나요?”라고 말했습니다. 가장 적절한 응답은 무엇인가요?",
    "en": "The passenger says, “My companion uses a wheelchair. Is assistance available?” Which response is most appropriate?"
   },
   "opts": [
    {
     "ja": "再入場に必要な時間と保安検査の手続きをご確認ください。",
     "ko": "재입장 소요 시간과 보안검색 절차를 확인해 주세요.",
     "en": "Please account for the time and security procedures needed to re-enter."
    },
    {
     "ja": "必要な支援を伺い、移動先の担当者と連携いたします。",
     "ko": "필요한 지원을 여쭤보고 이동할 터미널의 담당자와 협조하겠습니다.",
     "en": "I will ask what assistance is needed and coordinate with the receiving team."
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
    "ja": "相手が「まずどこで待てばよいですか。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “우선 어디에서 기다리면 되나요?”라고 말했습니다. 가장 적절한 응답은 무엇인가요?",
    "en": "The passenger says, “Where should we wait first?” Which response is most appropriate?"
   },
   "opts": [
    {
     "ja": "お急ぎなのですね。ただ、必要書類の確認は省略できません。",
     "ko": "급하시군요. 다만 필수 서류 확인을 생략할 수는 없습니다.",
     "en": "I understand it is urgent, but we cannot skip the document checks."
    },
    {
     "ja": "乗務員の到着が遅れており、出発予定を調整しています。",
     "ko": "승무원 도착이 늦어 출발 일정을 조정 중입니다.",
     "en": "The crew are arriving late, and the departure plan is being adjusted."
    },
    {
     "ja": "支援担当者の到着場所を確認し、こちらでお伝えします。",
     "ko": "지원 담당자의 도착 장소를 확인해 여기서 알려드리겠습니다.",
     "en": "I will confirm where the assistance staff will meet you and tell you here."
    }
   ],
   "a": 2
  }
 ]
},
{
 "id": "air-irrops-baggage-misconnect-1",
 "cat": "work",
 "lv": 3,
 "title": {
  "ja": "乗り継ぎ時の手荷物未搭載",
  "ko": "환승 과정의 수하물 미탑재",
  "en": "Baggage not loaded during a connection"
 },
 "scene": {
  "ja": "到着した乗客の預け荷物が乗り継ぎ先の便に搭載されなかった可能性がある。",
  "ko": "도착한 승객의 위탁 수하물이 연결편에 실리지 않았을 가능성이 있다.",
  "en": "A passenger arrives and learns that a checked bag may not have transferred."
 },
 "roles": {
  "A": {
   "ja": "手荷物サービス係員",
   "ko": "수하물 서비스 직원",
   "en": "Baggage services agent"
  },
  "B": {
   "ja": "到着した乗客",
   "ko": "도착 승객",
   "en": "Arriving passenger"
  }
 },
 "ai": {
  "goal": {
   "ja": "手荷物の追跡と申告方法を案内し、確約できない配送時刻を約束しない。",
   "ko": "수하물 추적과 신고 절차를 안내하고 확인되지 않은 배송 시각을 약속하지 않는다.",
   "en": "Guide tracing and reporting without promising an unconfirmed delivery time."
  },
  "twist": {
   "ja": "乗客が翌日の仕事に必要な資料が荷物にあると伝える。",
   "ko": "승객이 수하물 안에 다음 날 사용할 업무 자료가 있다고 말한다.",
   "en": "The passenger says the bag contains materials needed for work tomorrow."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "お荷物が見当たらないとのことですね。ご不便をおかけしております。",
   "jr": "おにもつが みあたらないとのことですね。ごふべんを おかけしております。",
   "ko": "짐이 보이지 않는다고 하셨군요. 불편을 드려 죄송합니다.",
   "en": "I understand your bag has not arrived. I am sorry for the inconvenience.",
   "alt": [
    {
     "ja": "お預かりしたお荷物が届いていないのですね。申し訳ございません。",
     "jr": "おあずかりした おにもつが とどいていないのですね。もうしわけございません。",
     "ko": "위탁하신 수하물이 도착하지 않았군요. 죄송합니다.",
     "en": "Your checked bag has not arrived. I am very sorry."
    }
   ]
  },
  {
   "r": "B",
   "ja": "乗り継ぎ前の空港で預けました。どこにありますか。",
   "jr": "のりつぎまえの くうこうで あずけました。どこに ありますか。",
   "ko": "환승 전 공항에서 맡겼는데 어디에 있나요?",
   "en": "I checked it at the first airport. Where is it now?"
  },
  {
   "r": "A",
   "ja": "手荷物引換証の番号から、現在の追跡状況を確認します。",
   "jr": "てにもつひきかえしょうの ばんごうから、げんざいの ついせきじょうきょうを かくにんします。",
   "ko": "수하물표 번호로 현재 추적 상황을 확인하겠습니다.",
   "en": "I will use your baggage tag number to check the current tracking status."
  },
  {
   "r": "B",
   "ja": "次の便に積まれていない可能性はありますか。",
   "jr": "つぎの びんに つまれていない かのうせいは ありますか。",
   "ko": "연결편에 실리지 않았을 가능성이 있나요?",
   "en": "Is it possible the bag did not make the connecting flight?"
  },
  {
   "r": "A",
   "ja": "その可能性も含め、積み込み記録を照会しております。",
   "jr": "その かのうせいも ふくめ、つみこみきろくを しょうかいしております。",
   "ko": "그 가능성도 포함해 적재 기록을 조회하고 있습니다.",
   "en": "We are reviewing the loading records, including that possibility."
  },
  {
   "r": "B",
   "ja": "紛失の申告は今ここでできますか。",
   "jr": "ふんしつの しんこくは いま ここで できますか。",
   "ko": "지금 여기서 분실 신고를 할 수 있나요?",
   "en": "Can I file a missing baggage report here?"
  },
  {
   "r": "A",
   "ja": "はい。必要な情報を伺い、申告手続きをご案内します。",
   "jr": "はい。ひつような じょうほうを うかがい、しんこくてつづきを ごあんないします。",
   "ko": "네. 필요한 정보를 여쭙고 신고 절차를 안내하겠습니다.",
   "en": "Yes. I will collect the details and guide you through the report.",
   "alt": [
    {
     "ja": "こちらで手荷物の未着申告を受け付けます。",
     "jr": "こちらで てにもつの みちゃくしんこくを うけつけます。",
     "ko": "여기서 수하물 미도착 신고를 접수하겠습니다.",
     "en": "We can open a delayed baggage report for you here."
    }
   ]
  },
  {
   "r": "B",
   "ja": "明日の仕事で使う資料が中にあります。急いでいます。",
   "jr": "あしたの しごとで つかう しりょうが なかに あります。いそいでいます。",
   "ko": "내일 업무에 쓸 자료가 그 안에 있습니다. 급합니다.",
   "en": "I need documents from the bag for work tomorrow. It is urgent."
  },
  {
   "r": "A",
   "ja": "ご事情を記録し、優先的な確認が可能か担当部署へ伝えます。",
   "jr": "ごじじょうを きろくし、ゆうせんてきな かくにんが かのうか たんとうぶしょへ つたえます。",
   "ko": "상황을 기록하고 우선 확인이 가능한지 담당 부서에 전달하겠습니다.",
   "en": "I will record the urgency and ask the team whether it can be prioritized."
  },
  {
   "r": "B",
   "ja": "いつ受け取れるか教えてください。",
   "jr": "いつ うけとれるか おしえてください。",
   "ko": "언제 받을 수 있는지 알려 주세요.",
   "en": "Can you tell me when it will arrive?"
  },
  {
   "r": "A",
   "ja": "現時点では到着時刻を確約できません。分かり次第ご連絡します。",
   "jr": "げんじてんでは とうちゃくじこくを かくやくできません。わかりしだい ごれんらくします。",
   "ko": "지금은 도착 시각을 확답드릴 수 없습니다. 확인되면 연락드리겠습니다.",
   "en": "I cannot promise an arrival time yet. We will contact you when it is confirmed."
  },
  {
   "r": "B",
   "ja": "連絡先はホテルでも大丈夫ですか。",
   "jr": "れんらくさきは ホテルでも だいじょうぶですか。",
   "ko": "연락처를 호텔로 해도 괜찮나요?",
   "en": "Can I give you my hotel as the contact address?"
  },
  {
   "r": "A",
   "ja": "滞在先と連絡可能な電話番号を伺い、記録いたします。",
   "jr": "たいざいさきと れんらくかのうな でんわばんごうを うかがい、きろくいたします。",
   "ko": "체류 장소와 연락 가능한 전화번호를 받아 기록하겠습니다.",
   "en": "I will record your accommodation and a phone number where we can reach you.",
   "alt": [
    {
     "ja": "お泊まりの場所とお電話番号を登録いたします。",
     "jr": "おとまりの ばしょと おでんわばんごうを とうろくいたします。",
     "ko": "숙박 장소와 전화번호를 등록하겠습니다.",
     "en": "I will register your accommodation and contact number."
    }
   ]
  },
  {
   "r": "B",
   "ja": "分かりました。手続きをお願いします。",
   "jr": "わかりました。てつづきを おねがいします。",
   "ko": "알겠습니다. 절차를 진행해 주세요.",
   "en": "Understood. Please help me file the report."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「乗り継ぎ前の空港で預けました。どこにありますか。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “환승 전 공항에서 맡겼는데 어디에 있나요?”라고 말했습니다. 가장 적절한 응답은 무엇인가요?",
    "en": "The passenger says, “I checked it at the first airport. Where is it now?” Which response is most appropriate?"
   },
   "opts": [
    {
     "ja": "ご予約が座席数を上回っています。ご協力は任意です。",
     "ko": "예약 인원이 좌석 수보다 많습니다. 변경은 자발적 선택입니다.",
     "en": "There are more reservations than seats. Volunteering is entirely optional."
    },
    {
     "ja": "必要な介助を伺い、支援担当へすぐ連絡いたします。",
     "ko": "필요한 도움을 여쭤보고 지원 담당자에게 바로 연락하겠습니다.",
     "en": "I’ll ask what help she needs and contact our assistance team immediately."
    },
    {
     "ja": "手荷物引換証の番号から、現在の追跡状況を確認します。",
     "ko": "수하물표 번호로 현재 추적 상황을 확인하겠습니다.",
     "en": "I will use your baggage tag number to check the current tracking status."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「明日の仕事で使う資料が中にあります。急いでいます。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “내일 업무에 쓸 자료가 그 안에 있습니다. 급합니다.”라고 말했습니다. 가장 적절한 응답은 무엇인가요?",
    "en": "The passenger says, “I need documents from the bag for work tomorrow. It is urgent.” Which response is most appropriate?"
   },
   "opts": [
    {
     "ja": "恐れ入りますが、こちらの通路は現在ご利用いただけません。",
     "ko": "죄송하지만 현재 이 통로는 이용할 수 없습니다.",
     "en": "I am sorry, but this passage is temporarily unavailable."
    },
    {
     "ja": "ご事情を記録し、優先的な確認が可能か担当部署へ伝えます。",
     "ko": "상황을 기록하고 우선 확인이 가능한지 담당 부서에 전달하겠습니다.",
     "en": "I will record the urgency and ask the team whether it can be prioritized."
    },
    {
     "ja": "今回ご案内している待機理由は、航空管制上の制限です。",
     "ko": "현재 안내드리는 대기 사유는 항공교통관제 제한입니다.",
     "en": "The reason we have been given for this wait is an air traffic control restriction."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「連絡先はホテルでも大丈夫ですか。」と言いました。最も適切な返答はどれですか。",
    "ko": "상대방이 “연락처를 호텔로 해도 괜찮나요?”라고 말했습니다. 가장 적절한 응답은 무엇인가요?",
    "en": "The passenger says, “Can I give you my hotel as the contact address?” Which response is most appropriate?"
   },
   "opts": [
    {
     "ja": "ご心配をおかけしました。空席と座席配置を確認いたします。",
     "ko": "걱정을 끼쳐 드려 죄송합니다. 빈자리와 좌석 배치를 확인하겠습니다.",
     "en": "I’m sorry about that. I’ll check the available seats and the new seat map."
    },
    {
     "ja": "滞在先と連絡可能な電話番号を伺い、記録いたします。",
     "ko": "체류 장소와 연락 가능한 전화번호를 받아 기록하겠습니다.",
     "en": "I will record your accommodation and a phone number where we can reach you."
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
}
);
