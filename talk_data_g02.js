/* ACN 会話練習 追加データ（GPT 作成 talk_data_g02.js を Claude が検収・修正：日本語の不自然な行、確認問題の誤答 2026.10.10）。架空の訓練用会話 */
window.TALK=window.TALK||[];window.TALK.push(
{
 "id": "air-irrops-missed-connection-1",
 "cat": "work",
 "lv": 3,
 "title": {
  "ja": "遅延による乗り継ぎ失敗",
  "ko": "지연으로 인한 연결편 놓침",
  "en": "Missed connection after a delay"
 },
 "scene": {
  "ja": "到着便の遅延により乗り継ぎ便に間に合わなかったお客様へ案内する。",
  "ko": "도착편 지연으로 연결편을 놓친 승객에게 안내한다.",
  "en": "An agent assists a passenger who missed a connection because of a delayed arrival."
 },
 "roles": {
  "A": {
   "ja": "乗り継ぎカウンター係員",
   "ko": "환승 카운터 직원",
   "en": "Transfer desk agent"
  },
  "B": {
   "ja": "乗り継ぎ客",
   "ko": "환승 승객",
   "en": "Connecting passenger"
  }
 },
 "ai": {
  "goal": {
   "ja": "予約状況と手荷物の扱いを確認し、確定した代替案だけを説明する。",
   "ko": "예약과 수하물 처리 상태를 확인하고 확정된 대안만 설명한다.",
   "en": "Check the booking and baggage status and communicate only confirmed options."
  },
  "twist": {
   "ja": "乗客が翌朝の重要な会議に出席する必要がある。",
   "ko": "승객이 다음 날 아침 중요한 회의에 참석해야 한다.",
   "en": "The passenger must attend an important meeting the next morning."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "お乗り継ぎのご案内をいたします。",
   "jr": "おのりつぎの ごあんないを いたします。",
   "ko": "연결편에 관해 안내드리겠습니다.",
   "en": "Let me help with your connecting flight.",
   "alt": [
    {
     "ja": "お乗り継ぎについて確認いたします。",
     "jr": "おのりつぎについて かくにんいたします。",
     "ko": "연결편 상황을 확인하겠습니다.",
     "en": "Let me check your connection."
    }
   ]
  },
  {
   "r": "B",
   "ja": "到着が遅れて、次の便に乗れませんでした。",
   "jr": "とうちゃくが おくれて、つぎの びんに のれませんでした。",
   "ko": "도착이 늦어 다음 비행기를 못 탔습니다.",
   "en": "My arrival was delayed, and I missed my next flight."
  },
  {
   "r": "A",
   "ja": "予約番号と最終目的地を確認させてください。",
   "jr": "よやくばんごうと さいしゅうもくてきちを かくにんさせてください。",
   "ko": "예약번호와 최종 목적지를 확인하겠습니다.",
   "en": "May I check your booking reference and final destination?"
  },
  {
   "r": "B",
   "ja": "目的地は福岡です。こちらが予約です。",
   "jr": "もくてきちは ふくおかです。こちらが よやくです。",
   "ko": "목적지는 후쿠오카입니다. 예약 내역은 여기 있습니다.",
   "en": "My destination is Fukuoka. Here is my booking."
  },
  {
   "r": "A",
   "ja": "ご予約の条件と次に利用できる便を確認します。",
   "jr": "ごよやくの じょうけんと つぎに りようできる びんを かくにんします。",
   "ko": "예약 조건과 이용 가능한 다음 항공편을 확인하겠습니다.",
   "en": "I’ll check your booking conditions and the next available flights."
  },
  {
   "r": "B",
   "ja": "預けた荷物はどうなりますか。",
   "jr": "あずけた にもつは どうなりますか。",
   "ko": "위탁 수하물은 어떻게 되나요?",
   "en": "What will happen to my checked bag?"
  },
  {
   "r": "A",
   "ja": "手荷物の引き継ぎ状況を担当部署に確認します。",
   "jr": "てにもつの ひきつぎじょうきょうを たんとうぶしょに かくにんします。",
   "ko": "담당 부서에 수하물 연결 처리 상황을 확인하겠습니다.",
   "en": "I’ll check the baggage transfer status with the relevant team.",
   "alt": [
    {
     "ja": "預けたお荷物の状況を確認いたします。",
     "jr": "あずけた おにもつの じょうきょうを かくにんいたします。",
     "ko": "맡기신 짐의 상태를 확인하겠습니다.",
     "en": "I’ll check the status of your checked baggage."
    }
   ]
  },
  {
   "r": "B",
   "ja": "実は明日の朝、大事な会議があります。",
   "jr": "じつは あしたの あさ、だいじな かいぎが あります。",
   "ko": "사실 내일 아침 중요한 회의가 있습니다.",
   "en": "I have an important meeting tomorrow morning."
  },
  {
   "r": "A",
   "ja": "ご到着の希望時刻も含めて候補を調べます。",
   "jr": "ごとうちゃくの きぼうじこくも ふくめて こうほを しらべます。",
   "ko": "희망 도착 시간까지 고려해 대안을 확인하겠습니다.",
   "en": "I’ll check options against your required arrival time."
  },
  {
   "r": "B",
   "ja": "別の経由地でも構いません。",
   "jr": "べつの けいゆちでも かまいません。",
   "ko": "다른 경유지라도 괜찮습니다.",
   "en": "I’m willing to connect through another airport."
  },
  {
   "r": "A",
   "ja": "経由地が変わる場合の条件も確認します。",
   "jr": "けいゆちが かわる ばあいの じょうけんも かくにんします。",
   "ko": "경유지가 바뀔 때의 조건도 확인하겠습니다.",
   "en": "I’ll check the conditions for any alternative routing."
  },
  {
   "r": "B",
   "ja": "変更する前に内容を見せてもらえますか。",
   "jr": "へんこうする まえに ないようを みせてもらえますか。",
   "ko": "변경 전에 내용을 확인할 수 있나요?",
   "en": "Can I review the details before any change?"
  },
  {
   "r": "A",
   "ja": "はい。便と手荷物の案内を確認してからご説明します。",
   "jr": "はい。びんと てにもつの あんないを かくにんしてから ごせつめいします。",
   "ko": "네. 항공편과 수하물 안내를 확인한 뒤 설명드리겠습니다.",
   "en": "Yes. I’ll explain the flights and baggage arrangements once confirmed.",
   "alt": [
    {
     "ja": "便とお荷物について確認後、詳しくご案内します。",
     "jr": "びんと おにもつについて かくにんご、くわしく ごあんないします。",
     "ko": "항공편과 짐을 확인한 후 자세히 안내하겠습니다.",
     "en": "I’ll explain the flight and baggage options after checking."
    }
   ]
  },
  {
   "r": "B",
   "ja": "分かりました。お待ちします。",
   "jr": "わかりました。おまちします。",
   "ko": "알겠습니다. 기다리겠습니다.",
   "en": "Understood. I’ll wait."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「到着が遅れて、次の便に乗れませんでした。」と言いました。どう答えますか。",
    "ko": "상대방이 “도착이 늦어 다음 비행기를 못 탔습니다.”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “My arrival was delayed, and I missed my next flight.” What is the best reply?"
   },
   "opts": [
    {
     "ja": "予約番号と最終目的地を確認させてください。",
     "ko": "예약번호와 최종 목적지를 확인하겠습니다.",
     "en": "May I check your booking reference and final destination?"
    },
    {
     "ja": "今回ご案内している待機理由は、航空管制上の制限です。",
     "ko": "현재 안내드리는 대기 사유는 항공교통관제 제한입니다.",
     "en": "The reason we have been given for this wait is an air traffic control restriction."
    },
    {
     "ja": "宿泊支援の対象か確認してからご案内します。",
     "ko": "숙박 지원 대상인지 확인한 후 안내하겠습니다.",
     "en": "We will check whether accommodation assistance applies before advising you."
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「実は明日の朝、大事な会議があります。」と言いました。どう答えますか。",
    "ko": "상대방이 “사실 내일 아침 중요한 회의가 있습니다.”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “I have an important meeting tomorrow morning.” What is the best reply?"
   },
   "opts": [
    {
     "ja": "恐れ入ります。旅券の写真があるページに破損が見られます。",
     "ko": "죄송하지만 여권 사진이 있는 페이지에 훼손이 보입니다.",
     "en": "I am sorry, but the passport photo page appears to be damaged."
    },
    {
     "ja": "滑走路の一時閉鎖により、出発を見合わせております。",
     "ko": "활주로 일시 폐쇄로 출발을 보류하고 있습니다.",
     "en": "Departures are temporarily suspended due to a runway closure."
    },
    {
     "ja": "ご到着の希望時刻も含めて候補を調べます。",
     "ko": "희망 도착 시간까지 고려해 대안을 확인하겠습니다.",
     "en": "I’ll check options against your required arrival time."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「変更する前に内容を見せてもらえますか。」と言いました。どう答えますか。",
    "ko": "상대방이 “변경 전에 내용을 확인할 수 있나요?”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “Can I review the details before any change?” What is the best reply?"
   },
   "opts": [
    {
     "ja": "本日は機材の変更により、座席が変わっております。",
     "ko": "오늘은 기종이 변경되어 좌석 배정이 바뀌었습니다.",
     "en": "The aircraft has changed today, so some seat assignments have been altered."
    },
    {
     "ja": "はい。便と手荷物の案内を確認してからご説明します。",
     "ko": "네. 항공편과 수하물 안내를 확인한 뒤 설명드리겠습니다.",
     "en": "Yes. I’ll explain the flights and baggage arrangements once confirmed."
    },
    {
     "ja": "航空管制の指示により、出発を待機しております。",
     "ko": "항공교통관제 지시에 따라 출발 대기 중입니다.",
     "en": "We are waiting to depart under air traffic control instructions."
    }
   ],
   "a": 1
  }
 ]
},
{
 "id": "air-irrops-weather-hold-1",
 "cat": "work",
 "lv": 2,
 "title": {
  "ja": "悪天候による搭乗見合わせ",
  "ko": "악천후로 인한 탑승 보류",
  "en": "Boarding on hold due to weather"
 },
 "scene": {
  "ja": "雷雨の影響で搭乗開始が見合わせとなり、お客様から再開時刻を尋ねられる。",
  "ko": "뇌우로 탑승이 보류되어 승객이 재개 시각을 묻는다.",
  "en": "Boarding is on hold during a thunderstorm and a passenger asks when it will resume."
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
   "en": "Departing passenger"
  }
 },
 "ai": {
  "goal": {
   "ja": "安全確認が優先されることと更新手段を伝え、未確定の時刻は約束しない。",
   "ko": "안전 확인 우선 원칙과 안내 방법을 설명하고 미확정 시간을 약속하지 않는다.",
   "en": "Explain the safety checks and update channels without promising an unconfirmed time."
  },
  "twist": {
   "ja": "乗客が搭乗口から離れて食事に行きたいと言う。",
   "ko": "승객이 식사하러 탑승구에서 떠나고 싶다고 한다.",
   "en": "The passenger wants to leave the gate to get food."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "悪天候のため、現在は搭乗を見合わせております。",
   "jr": "あくてんこうの ため、げんざいは とうじょうを みあわせております。",
   "ko": "악천후로 현재 탑승을 보류하고 있습니다.",
   "en": "Boarding is currently on hold due to severe weather.",
   "alt": [
    {
     "ja": "天候の影響で、搭乗開始を一時的に止めています。",
     "jr": "てんこうの えいきょうで、とうじょうかいしを いちじてきに とめています。",
     "ko": "날씨 영향으로 탑승 시작을 일시 중단했습니다.",
     "en": "Boarding has been temporarily suspended because of the weather."
    }
   ]
  },
  {
   "r": "B",
   "ja": "何時ごろ再開する予定ですか。",
   "jr": "なんじごろ さいかいする よていですか。",
   "ko": "몇 시쯤 다시 탑승하나요?",
   "en": "When do you expect boarding to resume?"
  },
  {
   "r": "A",
   "ja": "安全確認が終わるまで、時刻は確定できません。",
   "jr": "あんぜんかくにんが おわるまで、じこくは かくていできません。",
   "ko": "안전 확인이 끝나기 전에는 시각을 확정할 수 없습니다.",
   "en": "We cannot confirm a time until the safety checks are complete."
  },
  {
   "r": "B",
   "ja": "飛行機に問題があるのですか。",
   "jr": "ひこうきに もんだいが あるのですか。",
   "ko": "항공기에 문제가 있는 건가요?",
   "en": "Is there a problem with the aircraft?"
  },
  {
   "r": "A",
   "ja": "現在確認できているのは、天候による運用上の制限です。",
   "jr": "げんざい かくにんできているのは、てんこうによる うんようじょうの せいげんです。",
   "ko": "현재 확인된 사항은 날씨에 따른 운영 제한입니다.",
   "en": "The confirmed issue is an operational restriction due to the weather."
  },
  {
   "r": "B",
   "ja": "次の案内はどこで聞けますか。",
   "jr": "つぎの あんないは どこで きけますか。",
   "ko": "다음 안내는 어디에서 들을 수 있나요?",
   "en": "Where can I get the next update?"
  },
  {
   "r": "A",
   "ja": "この搭乗口の放送と表示をご確認ください。",
   "jr": "この とうじょうぐちの ほうそうと ひょうじを ごかくにんください。",
   "ko": "이 탑승구의 방송과 전광판을 확인해 주세요.",
   "en": "Please check the announcements and displays at this gate.",
   "alt": [
    {
     "ja": "最新情報は搭乗口の表示と放送でお伝えします。",
     "jr": "さいしんじょうほうは とうじょうぐちの ひょうじと ほうそうで おつたえします。",
     "ko": "최신 정보는 탑승구 전광판과 방송으로 알려드립니다.",
     "en": "Updates will appear on the gate displays and in announcements."
    }
   ]
  },
  {
   "r": "B",
   "ja": "食事を買いに行ってもいいでしょうか。",
   "jr": "しょくじを かいに いっても いいでしょうか。",
   "ko": "식사를 사러 다녀와도 될까요?",
   "en": "May I leave to get something to eat?"
  },
  {
   "r": "A",
   "ja": "再開時刻は未定ですので、離れる際は情報をご確認ください。",
   "jr": "さいかいじこくは みていですので、はなれる さいは じょうほうを ごかくにんください。",
   "ko": "재개 시각이 미정이므로 자리를 비우실 때 안내를 확인해 주세요.",
   "en": "The restart time is uncertain, so please keep checking for updates if you leave."
  },
  {
   "r": "B",
   "ja": "搭乗口が変わる可能性もありますか。",
   "jr": "とうじょうぐちが かわる かのうせいも ありますか。",
   "ko": "탑승구가 바뀔 수도 있나요?",
   "en": "Could the gate change too?"
  },
  {
   "r": "A",
   "ja": "変更が決まった場合は、表示と放送でお知らせします。",
   "jr": "へんこうが きまった ばあいは、ひょうじと ほうそうで おしらせします。",
   "ko": "변경이 결정되면 전광판과 방송으로 안내하겠습니다.",
   "en": "If the gate changes, we’ll announce it on the displays and PA system."
  },
  {
   "r": "B",
   "ja": "分かりました。近くで待っています。",
   "jr": "わかりました。ちかくで まっています。",
   "ko": "알겠습니다. 근처에서 기다리겠습니다.",
   "en": "Understood. I’ll stay nearby."
  },
  {
   "r": "A",
   "ja": "ご不便をおかけしますが、最新情報をご確認ください。",
   "jr": "ごふべんを おかけしますが、さいしんじょうほうを ごかくにんください。",
   "ko": "불편을 드려 죄송합니다. 최신 안내를 확인해 주세요.",
   "en": "I’m sorry for the inconvenience. Please keep checking the latest updates.",
   "alt": [
    {
     "ja": "ご迷惑をおかけしますが、新しい案内をご確認ください。",
     "jr": "ごめいわくを おかけしますが、あたらしい あんないを ごかくにんください。",
     "ko": "불편을 드려 죄송합니다만 새로운 안내를 확인해 주세요.",
     "en": "We apologize for the disruption. Please follow the updates."
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
    "ja": "相手が「何時ごろ再開する予定ですか。」と言いました。どう答えますか。",
    "ko": "상대방이 “몇 시쯤 다시 탑승하나요?”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “When do you expect boarding to resume?” What is the best reply?"
   },
   "opts": [
    {
     "ja": "最新の運航表示を確認し、出発ターミナルをご案内します。",
     "ko": "최신 운항 표시를 확인해 출발 터미널을 안내하겠습니다.",
     "en": "I will verify the latest flight display and confirm the departure terminal."
    },
    {
     "ja": "必要な介助を伺い、支援担当へすぐ連絡いたします。",
     "ko": "필요한 도움을 여쭤보고 지원 담당자에게 바로 연락하겠습니다.",
     "en": "I’ll ask what help she needs and contact our assistance team immediately."
    },
    {
     "ja": "安全確認が終わるまで、時刻は確定できません。",
     "ko": "안전 확인이 끝나기 전에는 시각을 확정할 수 없습니다.",
     "en": "We cannot confirm a time until the safety checks are complete."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「食事を買いに行ってもいいでしょうか。」と言いました。どう答えますか。",
    "ko": "상대방이 “식사를 사러 다녀와도 될까요?”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “May I leave to get something to eat?” What is the best reply?"
   },
   "opts": [
    {
     "ja": "お急ぎなのですね。ただ、必要書類の確認は省略できません。",
     "ko": "급하시군요. 다만 필수 서류 확인을 생략할 수는 없습니다.",
     "en": "I understand it is urgent, but we cannot skip the document checks."
    },
    {
     "ja": "再開時刻は未定ですので、離れる際は情報をご確認ください。",
     "ko": "재개 시각이 미정이므로 자리를 비우실 때 안내를 확인해 주세요.",
     "en": "The restart time is uncertain, so please keep checking for updates if you leave."
    },
    {
     "ja": "最新の運航表示を確認し、出発ターミナルをご案内します。",
     "ko": "최신 운항 표시를 확인해 출발 터미널을 안내하겠습니다.",
     "en": "I will verify the latest flight display and confirm the departure terminal."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「分かりました。近くで待っています。」と言いました。どう答えますか。",
    "ko": "상대방이 “알겠습니다. 근처에서 기다리겠습니다.”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “Understood. I’ll stay nearby.” What is the best reply?"
   },
   "opts": [
    {
     "ja": "詳細は整備担当が確認中で、現時点ではお答えできません。",
     "ko": "세부 내용은 정비 담당자가 확인 중이라 지금은 답변드리기 어렵습니다.",
     "en": "The maintenance team is still checking the details, so I cannot confirm that yet."
    },
    {
     "ja": "ご不便をおかけしますが、最新情報をご確認ください。",
     "ko": "불편을 드려 죄송합니다. 최신 안내를 확인해 주세요.",
     "en": "I’m sorry for the inconvenience. Please keep checking the latest updates."
    },
    {
     "ja": "再入場に必要な時間と保安検査の手続きをご確認ください。",
     "ko": "재입장 소요 시간과 보안검색 절차를 확인해 주세요.",
     "en": "Please account for the time and security procedures needed to re-enter."
    }
   ],
   "a": 1
  }
 ]
},
{
 "id": "air-irrops-crew-timeout-1",
 "cat": "work",
 "lv": 3,
 "title": {
  "ja": "乗務員勤務時間と出発調整",
  "ko": "승무원 근무시간 제한과 출발 조정",
  "en": "Crew duty limits and departure planning"
 },
 "scene": {
  "ja": "長い遅延の後、乗務員の勤務時間に関する確認で出発見込みが変わる。",
  "ko": "장시간 지연 후 승무원 근무시간 관련 확인으로 출발 전망이 바뀐다.",
  "en": "After a lengthy delay, crew duty limitations affect the departure estimate."
 },
 "roles": {
  "A": {
   "ja": "運航案内係員",
   "ko": "운항 안내 직원",
   "en": "Operations service agent"
  },
  "B": {
   "ja": "搭乗待ちの乗客",
   "ko": "탑승 대기 승객",
   "en": "Waiting passenger"
  }
 },
 "ai": {
  "goal": {
   "ja": "専門用語を避けて安全上の確認と次回案内を説明する。",
   "ko": "전문용어를 줄이고 안전 관련 확인과 다음 안내를 설명한다.",
   "en": "Explain safety-related checks and the next update in accessible language."
  },
  "twist": {
   "ja": "乗客が以前の出発予定時刻を根拠に確約を求める。",
   "ko": "승객이 이전 출발 예정 시각을 근거로 확답을 요구한다.",
   "en": "The passenger demands a guarantee based on an earlier departure estimate."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "出発の見込みについて、新しい情報が入りました。",
   "jr": "しゅっぱつの みこみについて、あたらしい じょうほうが はいりました。",
   "ko": "출발 전망에 관한 새 정보가 들어왔습니다.",
   "en": "We have a new update about the departure estimate.",
   "alt": [
    {
     "ja": "出発予定について、情報が更新されました。",
     "jr": "しゅっぱつよていについて、じょうほうが こうしんされました。",
     "ko": "출발 예정에 관한 정보가 갱신됐습니다.",
     "en": "There has been an update to our departure plans."
    }
   ]
  },
  {
   "r": "B",
   "ja": "先ほどの時刻より遅くなるのですか。",
   "jr": "さきほどの じこくより おそくなるのですか。",
   "ko": "아까 안내된 시간보다 늦어지는 건가요?",
   "en": "Will it be later than the time announced earlier?"
  },
  {
   "r": "A",
   "ja": "はい。乗務員の勤務時間を含む確認が必要になりました。",
   "jr": "はい。じょうむいんの きんむじかんを ふくむ かくにんが ひつように なりました。",
   "ko": "네. 승무원 근무시간을 포함한 확인이 필요해졌습니다.",
   "en": "Yes. Further checks are needed, including crew duty time limits."
  },
  {
   "r": "B",
   "ja": "飛行機はもう準備できていますよね。",
   "jr": "ひこうきは もう じゅんびできていますよね。",
   "ko": "비행기는 이미 준비되어 있지 않나요?",
   "en": "But the aircraft is already ready, isn’t it?"
  },
  {
   "r": "A",
   "ja": "機材の準備とは別に、運航に必要な条件を確認しています。",
   "jr": "きざいの じゅんびとは べつに、うんこうに ひつような じょうけんを かくにんしています。",
   "ko": "항공기 준비와 별도로 운항에 필요한 조건을 확인하고 있습니다.",
   "en": "Even if the aircraft is ready, other operating requirements must be checked."
  },
  {
   "r": "B",
   "ja": "乗務員を交代するのですか。",
   "jr": "じょうむいんを こうたいするのですか。",
   "ko": "승무원을 교체하는 건가요?",
   "en": "Will you replace the crew?"
  },
  {
   "r": "A",
   "ja": "交代の必要性も含め、担当部署が確認しています。",
   "jr": "こうたいの ひつようせいも ふくめ、たんとうぶしょが かくにんしています。",
   "ko": "교체 필요성까지 포함해 담당 부서가 확인하고 있습니다.",
   "en": "The operations team is checking that possibility as well.",
   "alt": [
    {
     "ja": "乗務員の交代も含めて、運航担当が調整中です。",
     "jr": "じょうむいんの こうたいも ふくめて、うんこうたんとうが ちょうせいちゅうです。",
     "ko": "승무원 교체도 포함해 운항 담당자가 조정 중입니다.",
     "en": "Operations is reviewing the situation, including a possible crew change."
    }
   ]
  },
  {
   "r": "B",
   "ja": "でも一時間前には出発できると言われました。",
   "jr": "でも いちじかんまえには しゅっぱつできると いわれました。",
   "ko": "그런데 한 시간 전에는 출발할 수 있다고 했어요.",
   "en": "But an hour ago, you said we could depart."
  },
  {
   "r": "A",
   "ja": "先ほどは見込み時刻でした。変更となり申し訳ございません。",
   "jr": "さきほどは みこみじこくでした。へんこうとなり もうしわけございません。",
   "ko": "앞서 안내한 것은 예상 시각이었습니다. 변경되어 죄송합니다.",
   "en": "That was an estimate, and I’m sorry it has changed."
  },
  {
   "r": "B",
   "ja": "今度こそ出発できると約束できますか。",
   "jr": "こんどこそ しゅっぱつできると やくそくできますか。",
   "ko": "이번에는 꼭 출발한다고 약속할 수 있나요?",
   "en": "Can you promise we’ll depart this time?"
  },
  {
   "r": "A",
   "ja": "現段階では確約できません。確認結果をお待ちください。",
   "jr": "げんだんかいでは かくやくできません。かくにんけっかを おまちください。",
   "ko": "현 단계에서는 확답할 수 없습니다. 확인 결과를 기다려 주세요.",
   "en": "I cannot guarantee that yet. We need the result of the checks."
  },
  {
   "r": "B",
   "ja": "次はいつ案内してくれますか。",
   "jr": "つぎは いつ あんないしてくれますか。",
   "ko": "다음 안내는 언제 해 주나요?",
   "en": "When will the next update be?"
  },
  {
   "r": "A",
   "ja": "次の案内時刻を確認し、この搭乗口でお知らせします。",
   "jr": "つぎの あんないじこくを かくにんし、この とうじょうぐちで おしらせします。",
   "ko": "다음 안내 예정 시각을 확인해 이 탑승구에서 알려드리겠습니다.",
   "en": "I’ll confirm the next update time and announce it at this gate.",
   "alt": [
    {
     "ja": "次回の更新予定を確認し、この場所でご案内します。",
     "jr": "じかいの こうしんよていを かくにんし、この ばしょで ごあんないします。",
     "ko": "다음 정보 갱신 예정을 확인해 이곳에서 안내하겠습니다.",
     "en": "I’ll check when the next update is due and share it here."
    }
   ]
  },
  {
   "r": "B",
   "ja": "分かりました。待ちます。",
   "jr": "わかりました。まちます。",
   "ko": "알겠습니다. 기다릴게요.",
   "en": "All right. I’ll wait."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「先ほどの時刻より遅くなるのですか。」と言いました。どう答えますか。",
    "ko": "상대방이 “아까 안내된 시간보다 늦어지는 건가요?”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “Will it be later than the time announced earlier?” What is the best reply?"
   },
   "opts": [
    {
     "ja": "恐れ入りますが、こちらの通路は現在ご利用いただけません。",
     "ko": "죄송하지만 현재 이 통로는 이용할 수 없습니다.",
     "en": "I am sorry, but this passage is temporarily unavailable."
    },
    {
     "ja": "はい。乗務員の勤務時間を含む確認が必要になりました。",
     "ko": "네. 승무원 근무시간을 포함한 확인이 필요해졌습니다.",
     "en": "Yes. Further checks are needed, including crew duty time limits."
    },
    {
     "ja": "ご予約が座席数を上回っています。ご協力は任意です。",
     "ko": "예약 인원이 좌석 수보다 많습니다. 변경은 자발적 선택입니다.",
     "en": "There are more reservations than seats. Volunteering is entirely optional."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「でも一時間前には出発できると言われました。」と言いました。どう答えますか。",
    "ko": "상대방이 “그런데 한 시간 전에는 출발할 수 있다고 했어요.”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “But an hour ago, you said we could depart.” What is the best reply?"
   },
   "opts": [
    {
     "ja": "同僚の方と連絡が取れるまで、ご予約は変更せずに確認を進めます。",
     "ko": "동료분과 연락이 닿을 때까지 예약은 바꾸지 않고 확인을 진행하겠습니다.",
     "en": "Until we can reach your colleague, I’ll keep checking without changing their booking."
    },
    {
     "ja": "手荷物の引き継ぎ状況を担当部署に確認します。",
     "ko": "수하물 인계 상황을 담당 부서에 확인하겠습니다.",
     "en": "I will check the baggage transfer status with the handling team."
    },
    {
     "ja": "先ほどは見込み時刻でした。変更となり申し訳ございません。",
     "ko": "앞서 안내한 것은 예상 시각이었습니다. 변경되어 죄송합니다.",
     "en": "That was an estimate, and I’m sorry it has changed."
    }
   ],
   "a": 2
  },
  {
   "q": {
    "ja": "相手が「次はいつ案内してくれますか。」と言いました。どう答えますか。",
    "ko": "상대방이 “다음 안내는 언제 해 주나요?”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “When will the next update be?” What is the best reply?"
   },
   "opts": [
    {
     "ja": "次の案内時刻を確認し、この搭乗口でお知らせします。",
     "ko": "다음 안내 예정 시각을 확인해 이 탑승구에서 알려드리겠습니다.",
     "en": "I’ll confirm the next update time and announce it at this gate."
    },
    {
     "ja": "まず運航予定の更新を確認し、送迎会社へ変更を相談してください。",
     "ko": "먼저 변경된 운항 예정을 확인한 뒤 픽업 업체에 변경을 문의해 주세요.",
     "en": "Please check the updated flight estimate and contact the transport provider about changes."
    },
    {
     "ja": "乗り継ぎ便に間に合わなかったのですね。予約を確認いたします。",
     "ko": "연결편을 놓치셨군요. 예약을 확인하겠습니다.",
     "en": "You missed the connecting flight. Let me check your booking."
    }
   ],
   "a": 0
  }
 ]
},
{
 "id": "air-irrops-baggage-offload-1",
 "cat": "work",
 "lv": 3,
 "title": {
  "ja": "出発前の手荷物取り下ろし",
  "ko": "출발 전 위탁 수하물 하기",
  "en": "Baggage offload before departure"
 },
 "scene": {
  "ja": "搭乗予定だったお客様が搭乗を取りやめ、預けた手荷物の取り扱いを確認する。",
  "ko": "탑승 예정 승객이 탑승을 포기해 위탁 수하물 처리 절차를 확인한다.",
  "en": "A passenger decides not to travel after checking a bag, and the agent explains the next steps."
 },
 "roles": {
  "A": {
   "ja": "搭乗口責任者",
   "ko": "탑승구 책임자",
   "en": "Gate supervisor"
  },
  "B": {
   "ja": "搭乗を取りやめる乗客",
   "ko": "탑승을 취소하려는 승객",
   "en": "Passenger choosing not to travel"
  }
 },
 "ai": {
  "goal": {
   "ja": "安全手順に沿って搭乗意思と手荷物の所在を確認し、確定する前の移動を避けるよう案内する。",
   "ko": "안전 절차에 따라 탑승 의사와 수하물 소재를 확인하고 확정 전 이동을 삼가도록 안내한다.",
   "en": "Confirm the travel decision and baggage status under safety procedures before giving instructions."
  },
  "twist": {
   "ja": "乗客が急いでいるため、荷物を残して先に帰りたいと言う。",
   "ko": "승객이 급해서 짐을 남기고 먼저 돌아가려 한다.",
   "en": "The passenger is in a hurry and asks to leave before the bag is located."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "搭乗を取りやめたいとのことですね。",
   "jr": "とうじょうを とりやめたいとの ことですね。",
   "ko": "탑승을 취소하고 싶으시다는 말씀이군요.",
   "en": "You would like to withdraw from this flight, correct?",
   "alt": [
    {
     "ja": "今回はご搭乗を見送られるということですね。",
     "jr": "こんかいは ごとうじょうを みおくられるという ことですね。",
     "ko": "이번 항공편은 탑승하지 않으신다는 말씀이군요.",
     "en": "You’ve decided not to board this flight, is that right?"
    }
   ]
  },
  {
   "r": "B",
   "ja": "はい。急用ができて、乗れなくなりました。",
   "jr": "はい。きゅうようが できて、のれなくなりました。",
   "ko": "네. 급한 일이 생겨 탑승할 수 없게 됐습니다.",
   "en": "Yes. Something urgent came up and I cannot travel."
  },
  {
   "r": "A",
   "ja": "まず搭乗の意思と予約情報を確認します。",
   "jr": "まず とうじょうの いしと よやくじょうほうを かくにんします。",
   "ko": "먼저 탑승 의사와 예약 정보를 확인하겠습니다.",
   "en": "First, I’ll confirm your decision and booking information."
  },
  {
   "r": "B",
   "ja": "スーツケースはもう預けています。",
   "jr": "スーツケースは もう あずけています。",
   "ko": "캐리어는 이미 맡겼습니다.",
   "en": "I’ve already checked my suitcase."
  },
  {
   "r": "A",
   "ja": "手荷物の所在と取り扱いを担当者に確認します。",
   "jr": "てにもつの しょざいと とりあつかいを たんとうしゃに かくにんします。",
   "ko": "담당자에게 수하물 위치와 처리 방법을 확인하겠습니다.",
   "en": "I’ll check the location and handling of your bag with the baggage team."
  },
  {
   "r": "B",
   "ja": "荷物をそのままにして帰れませんか。",
   "jr": "にもつを そのままにして かえれませんか。",
   "ko": "짐을 그대로 두고 돌아가면 안 되나요?",
   "en": "Can I leave now and collect the bag later?"
  },
  {
   "r": "A",
   "ja": "安全上の手続きが必要です。確認が終わるまでお待ちください。",
   "jr": "あんぜんじょうの てつづきが ひつようです。かくにんが おわるまで おまちください。",
   "ko": "안전상 절차가 필요하므로 확인이 끝날 때까지 기다려 주세요.",
   "en": "Safety procedures must be completed. Please wait for confirmation.",
   "alt": [
    {
     "ja": "手続きの確認が済むまで、こちらでお待ち願います。",
     "jr": "てつづきの かくにんが すむまで、こちらで おまちねがいます。",
     "ko": "절차 확인이 끝날 때까지 이곳에서 기다려 주세요.",
     "en": "Please remain here until the required checks are complete."
    }
   ]
  },
  {
   "r": "B",
   "ja": "仕事の電話があるので急いでいます。",
   "jr": "しごとの でんわが あるので いそいでいます。",
   "ko": "업무 전화가 있어서 급합니다.",
   "en": "I’m in a hurry because I have a work call."
  },
  {
   "r": "A",
   "ja": "お急ぎの事情は承知しました。状況を確認してご案内します。",
   "jr": "おいそぎの じじょうは しょうちしました。じょうきょうを かくにんして ごあんないします。",
   "ko": "급하신 사정은 알겠습니다. 상황을 확인해 안내드리겠습니다.",
   "en": "I understand the urgency. I’ll check the status and update you."
  },
  {
   "r": "B",
   "ja": "荷物が戻るまでの時間は分かりますか。",
   "jr": "にもつが もどるまでの じかんは わかりますか。",
   "ko": "짐을 돌려받기까지 얼마나 걸리나요?",
   "en": "Do you know how long it will take to retrieve the bag?"
  },
  {
   "r": "A",
   "ja": "作業の進み具合によるため、今は確約できません。",
   "jr": "さぎょうの すすみぐあいに よるため、いまは かくやくできません。",
   "ko": "작업 진행 상황에 따라 달라 지금은 확답할 수 없습니다.",
   "en": "It depends on the operation, so I cannot give a firm time yet."
  },
  {
   "r": "B",
   "ja": "受け取り場所も変わるのでしょうか。",
   "jr": "うけとりばしょも かわるのでしょうか。",
   "ko": "수하물 수령 장소도 달라지나요?",
   "en": "Could the collection point change too?"
  },
  {
   "r": "A",
   "ja": "受け取り方法と場所が決まり次第、お伝えします。",
   "jr": "うけとりほうほうと ばしょが きまりしだい、おつたえします。",
   "ko": "수령 방법과 장소가 결정되면 안내드리겠습니다.",
   "en": "I’ll let you know the collection procedure and location once confirmed.",
   "alt": [
    {
     "ja": "受け取りの場所と方法が確定したらご案内します。",
     "jr": "うけとりの ばしょと ほうほうが かくていしたら ごあんないします。",
     "ko": "수령 장소와 방법이 확정되면 안내하겠습니다.",
     "en": "We’ll explain where and how to collect the bag once confirmed."
    }
   ]
  },
  {
   "r": "B",
   "ja": "分かりました。ここで待ちます。",
   "jr": "わかりました。ここで まちます。",
   "ko": "알겠습니다. 여기서 기다리겠습니다.",
   "en": "Understood. I’ll wait here."
  }
 ],
 "check": [
  {
   "q": {
    "ja": "相手が「はい。急用ができて、乗れなくなりました。」と言いました。どう答えますか。",
    "ko": "상대방이 “네. 급한 일이 생겨 탑승할 수 없게 됐습니다.”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “Yes. Something urgent came up and I cannot travel.” What is the best reply?"
   },
   "opts": [
    {
     "ja": "宿泊支援の対象か確認してからご案内します。",
     "ko": "숙박 지원 대상인지 확인한 후 안내하겠습니다.",
     "en": "We will check whether accommodation assistance applies before advising you."
    },
    {
     "ja": "まず搭乗の意思と予約情報を確認します。",
     "ko": "먼저 탑승 의사와 예약 정보를 확인하겠습니다.",
     "en": "First, I’ll confirm your decision and booking information."
    },
    {
     "ja": "ご予約が座席数を上回っています。ご協力は任意です。",
     "ko": "예약 인원이 좌석 수보다 많습니다. 변경은 자발적 선택입니다.",
     "en": "There are more reservations than seats. Volunteering is entirely optional."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「仕事の電話があるので急いでいます。」と言いました。どう答えますか。",
    "ko": "상대방이 “업무 전화가 있어서 급합니다.”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “I’m in a hurry because I have a work call.” What is the best reply?"
   },
   "opts": [
    {
     "ja": "お急ぎの事情は承知しました。状況を確認してご案内します。",
     "ko": "급하신 사정은 알겠습니다. 상황을 확인해 안내드리겠습니다.",
     "en": "I understand the urgency. I’ll check the status and update you."
    },
    {
     "ja": "本日は機材の変更により、座席が変わっております。",
     "ko": "오늘은 기종이 변경되어 좌석 배정이 바뀌었습니다.",
     "en": "The aircraft has changed today, so some seat assignments have been altered."
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
    "ja": "相手が「受け取り場所も変わるのでしょうか。」と言いました。どう答えますか。",
    "ko": "상대방이 “수하물 수령 장소도 달라지나요?”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “Could the collection point change too?” What is the best reply?"
   },
   "opts": [
    {
     "ja": "受け取り方法と場所が決まり次第、お伝えします。",
     "ko": "수령 방법과 장소가 결정되면 안내드리겠습니다.",
     "en": "I’ll let you know the collection procedure and location once confirmed."
    },
    {
     "ja": "到着後の乗り継ぎ案内について、担当部署へ確認します。",
     "ko": "도착 후 연결편 안내를 담당 부서에 확인하겠습니다.",
     "en": "I will check with the relevant team about connection assistance on arrival."
    },
    {
     "ja": "この便は途中の空港で臨時に給油する予定です。",
     "ko": "이 항공편은 중간 공항에서 임시로 급유할 예정입니다.",
     "en": "This flight is scheduled to make an unscheduled stop for refuelling."
    }
   ],
   "a": 0
  }
 ]
},
{
 "id": "air-irrops-medical-diversion-1",
 "cat": "work",
 "lv": 3,
 "title": {
  "ja": "機内急病人による目的地変更",
  "ko": "기내 응급환자로 인한 목적지 변경",
  "en": "Diversion for a medical emergency"
 },
 "scene": {
  "ja": "機内で急病人が発生し、目的地を変更して着陸した後に乗客へ案内する。",
  "ko": "기내 응급환자 발생으로 대체공항에 착륙한 뒤 승객을 안내한다.",
  "en": "An aircraft diverts because of a medical emergency, and passengers seek onward information."
 },
 "roles": {
  "A": {
   "ja": "到着地の案内係員",
   "ko": "대체공항 안내 직원",
   "en": "Arrival service agent"
  },
  "B": {
   "ja": "予定変更となった乗客",
   "ko": "일정 변경 승객",
   "en": "Affected passenger"
  }
 },
 "ai": {
  "goal": {
   "ja": "個人の医療情報を守りながら、乗客の移動と連絡方法を案内する。",
   "ko": "개인 의료정보를 보호하면서 이동 및 연락 방법을 안내한다.",
   "en": "Protect medical privacy while explaining onward travel and communication options."
  },
  "twist": {
   "ja": "乗客が病人の容体を質問し、急いで家族へ連絡したいと言う。",
   "ko": "승객이 환자 상태를 묻고 가족에게 급히 연락하려 한다.",
   "en": "The passenger asks about the patient’s condition and needs to contact family."
  }
 },
 "lines": [
  {
   "r": "A",
   "ja": "予定と異なる空港に到着しましたことをおわびします。",
   "jr": "よていと ことなる くうこうに とうちゃくしましたことを おわびします。",
   "ko": "예정과 다른 공항에 도착한 점 양해 부탁드립니다.",
   "en": "I’m sorry we had to land at a different airport.",
   "alt": [
    {
     "ja": "当初の目的地とは異なる空港への到着となりました。",
     "jr": "とうしょの もくてきちとは ことなる くうこうへの とうちゃくと なりました。",
     "ko": "당초 목적지가 아닌 다른 공항에 도착했습니다.",
     "en": "We have arrived at an airport other than the planned destination."
    }
   ]
  },
  {
   "r": "B",
   "ja": "どうしてここに着陸したのですか。",
   "jr": "どうして ここに ちゃくりくしたのですか。",
   "ko": "왜 이 공항에 착륙한 건가요?",
   "en": "Why did we land here?"
  },
  {
   "r": "A",
   "ja": "機内で医療上の緊急事態があり、安全を優先しました。",
   "jr": "きないで いりょうじょうの きんきゅうじたいが あり、あんぜんを ゆうせんしました。",
   "ko": "기내에 의료상 긴급 상황이 발생해 안전을 우선했습니다.",
   "en": "There was a medical emergency on board, and safety came first."
  },
  {
   "r": "B",
   "ja": "その方は大丈夫なのでしょうか。",
   "jr": "その かたは だいじょうぶなのでしょうか。",
   "ko": "그분은 괜찮으신가요?",
   "en": "Is the passenger all right?"
  },
  {
   "r": "A",
   "ja": "個人の健康状態についてはご案内できません。",
   "jr": "こじんの けんこうじょうたいについては ごあんないできません。",
   "ko": "개인의 건강 상태는 안내드릴 수 없습니다.",
   "en": "I’m unable to share another person’s medical information."
  },
  {
   "r": "B",
   "ja": "私たちはここからどう移動しますか。",
   "jr": "わたしたちは ここから どう いどうしますか。",
   "ko": "저희는 여기서 어떻게 이동하나요?",
   "en": "How will we continue our journey?"
  },
  {
   "r": "A",
   "ja": "今後の運航と移動方法を担当部署に確認しています。",
   "jr": "こんごの うんこうと いどうほうほうを たんとうぶしょに かくにんしています。",
   "ko": "이후 운항과 이동 방법을 담당 부서에 확인 중입니다.",
   "en": "We’re checking the onward flight and transport arrangements.",
   "alt": [
    {
     "ja": "今後の移動について、運航担当と確認を進めています。",
     "jr": "こんごの いどうについて、うんこうたんとうと かくにんを すすめています。",
     "ko": "이후 이동에 관해 운항 담당 부서와 확인 중입니다.",
     "en": "We’re working with operations to confirm onward arrangements."
    }
   ]
  },
  {
   "r": "B",
   "ja": "家族が元の空港で待っています。",
   "jr": "かぞくが もとの くうこうで まっています。",
   "ko": "가족이 원래 도착 공항에서 기다리고 있습니다.",
   "en": "My family is waiting at the original airport."
  },
  {
   "r": "A",
   "ja": "確定情報をお伝えできるよう、案内窓口を確認します。",
   "jr": "かくていじょうほうを おつたえできるよう、あんないまどぐちを かくにんします。",
   "ko": "확정된 정보를 전달할 수 있도록 안내 창구를 확인하겠습니다.",
   "en": "I’ll identify where you can obtain confirmed information."
  },
  {
   "r": "B",
   "ja": "家族に今の状況を知らせたいのですが。",
   "jr": "かぞくに いまの じょうきょうを しらせたいのですが。",
   "ko": "가족에게 현재 상황을 알리고 싶습니다.",
   "en": "I need to tell my family what is happening."
  },
  {
   "r": "A",
   "ja": "今いる空港と、まだ決まっていない点を分けてお伝えいただくと安心です。",
   "jr": "いま いる くうこうと、まだ きまっていない てんを わけて おつたえ いただくと あんしんです。",
   "ko": "지금 있는 공항과 아직 정해지지 않은 점을 나눠서 전하시면 가족분도 안심하실 거예요.",
   "en": "It helps to tell them where you are now and which plans are still undecided."
  },
  {
   "r": "B",
   "ja": "次の案内を待てばいいですか。",
   "jr": "つぎの あんないを まてば いいですか。",
   "ko": "다음 안내를 기다리면 되나요?",
   "en": "Should I wait for another announcement?"
  },
  {
   "r": "A",
   "ja": "はい。次の案内場所と時刻を確認してお知らせします。",
   "jr": "はい。つぎの あんないばしょと じこくを かくにんして おしらせします。",
   "ko": "네. 다음 안내 장소와 시각을 확인해 알려드리겠습니다.",
   "en": "Yes. I’ll confirm where and when the next update will be given.",
   "alt": [
    {
     "ja": "次の情報をお伝えする場所と予定時刻を確認します。",
     "jr": "つぎの じょうほうを おつたえする ばしょと よていじこくを かくにんします。",
     "ko": "다음 안내 장소와 예정 시각을 확인하겠습니다.",
     "en": "I’ll check the location and expected time of the next update."
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
    "ja": "相手が「どうしてここに着陸したのですか。」と言いました。どう答えますか。",
    "ko": "상대방이 “왜 이 공항에 착륙한 건가요?”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “Why did we land here?” What is the best reply?"
   },
   "opts": [
    {
     "ja": "機内で医療上の緊急事態があり、安全を優先しました。",
     "ko": "기내에 의료상 긴급 상황이 발생해 안전을 우선했습니다.",
     "en": "There was a medical emergency on board, and safety came first."
    },
    {
     "ja": "ただいま搭乗券の読み取り機に不具合が発生しています。",
     "ko": "현재 탑승권 스캐너에 문제가 발생했습니다.",
     "en": "The boarding-pass scanner is currently not working."
    },
    {
     "ja": "ターミナル間の移動手段と所要時間を確認いたします。",
     "ko": "터미널 간 이동 수단과 소요 시간을 확인하겠습니다.",
     "en": "I will check the transfer options and estimated travel time."
    }
   ],
   "a": 0
  },
  {
   "q": {
    "ja": "相手が「家族が元の空港で待っています。」と言いました。どう答えますか。",
    "ko": "상대방이 “가족이 원래 도착 공항에서 기다리고 있습니다.”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “My family is waiting at the original airport.” What is the best reply?"
   },
   "opts": [
    {
     "ja": "ターミナル間の移動手段と所要時間を確認いたします。",
     "ko": "터미널 간 이동 수단과 소요 시간을 확인하겠습니다.",
     "en": "I will check the transfer options and estimated travel time."
    },
    {
     "ja": "確定情報をお伝えできるよう、案内窓口を確認します。",
     "ko": "확정된 정보를 전달할 수 있도록 안내 창구를 확인하겠습니다.",
     "en": "I’ll identify where you can obtain confirmed information."
    },
    {
     "ja": "必要な介助を伺い、支援担当へすぐ連絡いたします。",
     "ko": "필요한 도움을 여쭤보고 지원 담당자에게 바로 연락하겠습니다.",
     "en": "I’ll ask what help she needs and contact our assistance team immediately."
    }
   ],
   "a": 1
  },
  {
   "q": {
    "ja": "相手が「次の案内を待てばいいですか。」と言いました。どう答えますか。",
    "ko": "상대방이 “다음 안내를 기다리면 되나요?”라고 말했습니다. 어떻게 답하나요?",
    "en": "The other person says, “Should I wait for another announcement?” What is the best reply?"
   },
   "opts": [
    {
     "ja": "必要な介助を伺い、支援担当へすぐ連絡いたします。",
     "ko": "필요한 도움을 여쭤보고 지원 담당자에게 바로 연락하겠습니다.",
     "en": "I’ll ask what help she needs and contact our assistance team immediately."
    },
    {
     "ja": "遅延が続き、到着空港の運用時間に影響する可能性があります。",
     "ko": "지연이 계속되어 도착 공항 운용시간에 영향을 줄 수 있습니다.",
     "en": "The continuing delay may affect the destination airport’s operating hours."
    },
    {
     "ja": "はい。次の案内場所と時刻を確認してお知らせします。",
     "ko": "네. 다음 안내 장소와 시각을 확인해 알려드리겠습니다.",
     "en": "Yes. I’ll confirm where and when the next update will be given."
    }
   ],
   "a": 2
  }
 ]
}
);
