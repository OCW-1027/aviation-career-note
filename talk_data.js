/* 会話練習（日本語・韓国語・英語）の会話データ　2026.10
   ページ：会話練習_日韓英.html（公開サイトでは talk.html）
   作り方の詳しい説明（韓国語）：00_회화데이터_작성규칙.md

   ■ 形（1つの会話＝1つの { } ）
   {id:'air-checkin-1',            // 半角英小文字・数字・- だけ。分類の頭（air / trv / life / off）-話題-番号。一度公開したら変えない（練習の記録と「私のフレーズ」がこの id で残る）
    cat:'work',                    // 'work' 空港・機内の仕事 / 'travel' 旅行 / 'life' 毎日の暮らし / 'office' 職場の会話
    lv:1,                          // 難しさ 1〜3（1 やさしい・2 ふつう・3 むずかしい）
    title:{ja:'',ko:'',en:''},     // 会話の名前（短く）
    scene:{ja:'',ko:'',en:''},     // どんな場面か（1文）
    roles:{A:{ja:'',ko:'',en:''}, B:{ja:'',ko:'',en:''}},   // 役の名前
    lines:[                        // せりふ 6〜10行。A と B が交互に話すのが基本
      {r:'A',                      // 話す役 'A' か 'B'
       ja:'', jr:'',               // jr＝日本語の読み（漢字をひらがなに。カタカナの言葉はそのまま。文節の間に半角スペース）
       ko:'', en:'',
       alt:[{ja:'',jr:'',ko:'',en:''}],   // （なくてもよい）同じ意味の別の言い方。大事な行に1〜2個
       note:{ja:'',ko:'',en:''}}          // （なくてもよい）ポイントの説明（1〜2文）
    ],
    check:[                        // 確認問題 2〜3問。「この場面で何と言いますか」
      {q:{ja:'',ko:'',en:''},      // 問い（画面ではヒントの言語で出す）
       opts:[{ja:'',ko:'',en:''},{…},{…}],   // 選択肢 3つ（画面では練習する言語で出す。並びは画面で入れ替える）
       a:0}                        // 正しい選択肢の番号（0から数える）
    ],
    ai:{goal:{ja:'',ko:'',en:''},  // （なくてもよい）「AIと話す」で使う。会話の目標（どちらの役にも通じる書き方で1文）
        twist:{ja:'',ko:'',en:''}} // （なくてもよい）途中で起きること（ひとひねり）。AI が会話の途中で起こす。1文
   }
   ※ ai は id・cat・lv のすぐ下の行に書いてもよい（いまの20の会話はそうしている）

   ■ 増やし方
   ・このファイルの最後の ); の前に { … }, を足す。
   ・別のファイルにするときは talk_data2.js などを作り、中身を
       window.TALK=window.TALK||[];window.TALK.push({…},{…});
     の形にして、会話練習_日韓英.html の <script src="talk_data.js"></script> の次の行に読み込みを1行足す。
   ・同じ id が2つあるときは、先に読んだ方を使う。
   ・なくてもよいもの：alt・note・check・scene・ai。足りない言語があるときは、日本語→英語→韓国語の順に代わりを出す。
*/
window.TALK=window.TALK||[];
window.TALK.push(

/* ───────── 空港・機内の仕事（work） ───────── */
{id:'air-checkin-1',cat:'work',lv:2,
 ai:{goal:{ja:'名前のちがいを確かめて直し、チェックインを最後まで終える。',ko:'이름 차이를 확인해서 고치고 체크인을 끝까지 마친다.',en:'Confirm and correct the name, then finish check-in.'},
    twist:{ja:'スーツケースが、重さの上限を3キロこえている。',ko:'캐리어가 무게 제한을 3킬로 넘는다.',en:'The suitcase is 3 kg over the weight limit.'}},
 title:{ja:'チェックイン：名前のつづりがちがう',ko:'체크인: 이름 철자가 다를 때',en:'Check-in: a name that doesn’t match'},
 scene:{ja:'カウンターで、予約の名前とパスポートの名前のつづりが1文字ちがうことに気づきます。',ko:'카운터에서 예약 이름과 여권 이름의 철자가 한 글자 다른 것을 알게 됩니다.',en:'At the counter, you notice the booking name is one letter different from the passport.'},
 roles:{A:{ja:'カウンターの係員',ko:'카운터 직원',en:'Check-in agent'},B:{ja:'乗客',ko:'승객',en:'Passenger'}},
 lines:[
  {r:'A',ja:'おはようございます。パスポートを拝見してもよろしいですか。',jr:'おはよう ございます。パスポートを はいけん しても よろしいですか。',ko:'안녕하세요. 여권 좀 확인해도 될까요?',en:'Good morning. May I see your passport, please?',
   alt:[{ja:'おはようございます。パスポートをお願いします。',jr:'おはよう ございます。パスポートを おねがい します。',ko:'안녕하세요. 여권 부탁드립니다.',en:'Good morning. Your passport, please.'}]},
  {r:'B',ja:'はい、どうぞ。',jr:'はい、どうぞ。',ko:'네, 여기 있어요.',en:'Sure, here you are.'},
  {r:'A',ja:'ありがとうございます。ご予約のお名前と、パスポートのお名前のつづりが1文字ちがっているようです。',jr:'ありがとう ございます。ごよやくの おなまえと、パスポートの おなまえの つづりが ひともじ ちがって いるようです。',ko:'감사합니다. 예약하신 성함과 여권에 있는 성함의 철자가 한 글자 다른 것 같습니다.',en:'Thank you. It looks like the name on your booking is spelled one letter differently from your passport.',
   note:{ja:'航空券の名前はパスポートと同じつづりが必要です。まず、わかった事実を落ち着いて伝えます。',ko:'항공권 이름은 여권과 철자가 같아야 합니다. 먼저 확인한 사실을 차분하게 전합니다.',en:'The ticket name must match the passport exactly. Start by calmly stating what you found.'}},
  {r:'B',ja:'えっ、本当ですか。今日の便に乗れないんですか。',jr:'えっ、ほんとう ですか。きょうの びんに のれないん ですか。',ko:'네? 정말요? 오늘 비행기 못 타는 거예요?',en:'Really? Does that mean I can’t take today’s flight?'},
  {r:'A',ja:'お名前の直し方を確認いたします。直せるかどうかは運賃や予約の条件によりますので、少々お待ちください。',jr:'おなまえの なおしかたを かくにん いたします。なおせるか どうかは うんちんや よやくの じょうけんに よりますので、しょうしょう おまち ください。',ko:'성함을 고치는 방법을 확인해 드리겠습니다. 고칠 수 있는지는 운임과 예약 조건에 따라 다르니 잠시만 기다려 주세요.',en:'Let me check how we can correct the name. Whether it can be changed depends on your fare and booking conditions, so one moment, please.',
   alt:[{ja:'担当の者に確認いたします。直せるかどうかは条件によりますので、少しお時間をください。',jr:'たんとうの ものに かくにん いたします。なおせるか どうかは じょうけんに よりますので、すこし おじかんを ください。',ko:'담당자에게 확인해 보겠습니다. 고칠 수 있는지는 조건에 따라 다르니 잠시 시간을 주세요.',en:'I’ll check with the person in charge. It depends on the conditions, so please give me a moment.'}],
   note:{ja:'「乗れません」と先に言わず、できることを伝えてから確認します。',ko:'“못 탑니다”라고 먼저 말하지 말고, 할 수 있는 일을 알려 준 뒤 확인합니다.',en:'Don’t lead with “you can’t fly.” Say what you can do, then check.'}},
  {r:'A',ja:'お待たせいたしました。ご予約のお名前を直しました。こちらにご署名をお願いします。',jr:'おまたせ いたしました。ごよやくの おなまえを なおしました。こちらに ごしょめいを おねがい します。',ko:'기다려 주셔서 감사합니다. 예약 성함을 수정했습니다. 여기에 서명 부탁드립니다.',en:'Thank you for waiting. I’ve corrected the name on your booking. Could you sign here, please?'},
  {r:'B',ja:'よかった。ありがとうございます。次からは気をつけます。',jr:'よかった。ありがとう ございます。つぎからは きを つけます。',ko:'다행이다. 감사합니다. 다음부터는 조심할게요.',en:'What a relief. Thank you. I’ll be more careful next time.'},
  {r:'A',ja:'こちらが搭乗券です。搭乗口は12番、ご搭乗の開始は10時20分です。いってらっしゃいませ。',jr:'こちらが とうじょうけん です。とうじょうぐちは じゅうにばん、ごとうじょうの かいしは じゅうじ にじゅっぷん です。いってらっしゃいませ。',ko:'탑승권 여기 있습니다. 탑승구는 12번, 탑승 시작은 10시 20분입니다. 즐거운 여행 되세요.',en:'Here’s your boarding pass. Your gate is 12, and boarding starts at 10:20. Have a good trip.',
   alt:[{ja:'搭乗券をお返しします。12番の搭乗口で、10時20分からご案内します。',jr:'とうじょうけんを おかえし します。じゅうにばんの とうじょうぐちで、じゅうじ にじゅっぷんから ごあんない します。',ko:'탑승권 드리겠습니다. 12번 탑승구에서 10시 20분부터 안내해 드립니다.',en:'Here’s your boarding pass. Boarding begins at gate 12 at 10:20.'}]}
 ],
 check:[
  {q:{ja:'予約とパスポートの名前のつづりがちがうと気づきました。お客様に最初に何と言いますか。',ko:'예약과 여권의 이름 철자가 다르다는 것을 알았습니다. 손님에게 먼저 뭐라고 말합니까?',en:'You notice the booking name doesn’t match the passport. What do you say to the passenger first?'},
   opts:[{ja:'ご予約のお名前とパスポートのつづりが1文字ちがっているようです。',ko:'예약하신 성함과 여권 철자가 한 글자 다른 것 같습니다.',en:'It looks like your booking name is one letter different from your passport.'},
    {ja:'この航空券では乗れません。',ko:'이 항공권으로는 탈 수 없습니다.',en:'You can’t fly with this ticket.'},
    {ja:'パスポートを作り直してください。',ko:'여권을 다시 만드세요.',en:'Please get a new passport.'}],a:0},
  {q:{ja:'お客様が「今日の便に乗れないんですか」と心配しています。どう答えますか。',ko:'손님이 “오늘 비행기 못 타는 거예요?” 하고 걱정합니다. 어떻게 대답합니까?',en:'The passenger worries: “Does that mean I can’t fly today?” How do you answer?'},
   opts:[{ja:'わかりません。',ko:'모르겠습니다.',en:'I don’t know.'},
    {ja:'ご安心ください。確認しますので、少々お待ちください。',ko:'걱정하지 마세요. 확인해 드릴 테니 잠시만 기다려 주세요.',en:'Please don’t worry. Let me check — one moment, please.'},
    {ja:'次の便にしてください。',ko:'다음 비행기로 바꾸세요.',en:'Please take the next flight.'}],a:1}
 ]},

{id:'air-gate-delay-1',cat:'work',lv:2,
 ai:{goal:{ja:'遅れの理由と、出発の見通しを伝えて、乗客の心配に答える。',ko:'지연 이유와 출발 예정을 알리고 승객의 걱정에 답한다.',en:'Explain the reason for the delay and the expected departure, and answer the passenger’s worries.'},
    twist:{ja:'乗客は到着地で乗り継ぎがあり、間に合うかをとても心配している。',ko:'승객은 도착지에서 환승이 있어서 늦지 않을지 매우 걱정한다.',en:'The passenger has a connection at the destination and is very worried about missing it.'}},
 title:{ja:'搭乗口：出発が遅れる説明',ko:'탑승구: 출발 지연 안내',en:'At the gate: explaining a delay'},
 scene:{ja:'機体の点検で出発が遅れます。搭乗口で乗客に聞かれます。',ko:'기체 점검으로 출발이 늦어집니다. 탑승구에서 승객이 물어봅니다.',en:'The flight is delayed for an aircraft check. A passenger asks you at the gate.'},
 roles:{A:{ja:'乗客',ko:'승객',en:'Passenger'},B:{ja:'搭乗口の係員',ko:'탑승구 직원',en:'Gate agent'}},
 lines:[
  {r:'A',ja:'すみません。出発の時間を過ぎていますが、どうなっていますか。',jr:'すみません。しゅっぱつの じかんを すぎて いますが、どう なって いますか。',ko:'저기요, 출발 시간이 지났는데 어떻게 된 거예요?',en:'Excuse me. It’s past the departure time. What’s going on?'},
  {r:'B',ja:'お待たせしてしまい、申し訳ございません。機体の点検に時間がかかっております。',jr:'おまたせ して しまい、もうしわけ ございません。きたいの てんけんに じかんが かかって おります。',ko:'기다리시게 해서 정말 죄송합니다. 기체 점검에 시간이 걸리고 있습니다.',en:'I’m very sorry to keep you waiting. The aircraft check is taking longer than expected.',
   alt:[{ja:'大変お待たせしております。いま、飛行機の点検をしているところです。',jr:'たいへん おまたせ して おります。いま、ひこうきの てんけんを して いる ところです。',ko:'오래 기다리시게 해서 죄송합니다. 지금 비행기를 점검하고 있습니다.',en:'Thank you for your patience. The aircraft is being checked right now.'}],
   note:{ja:'まずおわび、次に理由。理由は短く、わかる言葉で伝えます。',ko:'먼저 사과, 다음에 이유. 이유는 짧고 알기 쉬운 말로 전합니다.',en:'Apologize first, then give the reason — briefly and in plain words.'}},
  {r:'A',ja:'どのくらい遅れそうですか。',jr:'どのくらい おくれ そうですか。',ko:'얼마나 늦어질 것 같아요?',en:'How long will the delay be?'},
  {r:'B',ja:'いまのところ、出発は11時半の予定です。また新しいことがわかりましたら、すぐにお知らせします。',jr:'いまの ところ、しゅっぱつは じゅういちじ はんの よてい です。また あたらしい ことが わかりましたら、すぐに おしらせ します。',ko:'현재로서는 11시 반에 출발할 예정입니다. 새로운 소식이 있으면 바로 알려 드리겠습니다.',en:'For now, departure is planned for 11:30. We’ll let you know right away if anything changes.',
   note:{ja:'決まっていないことは「予定」「いまのところ」と言い、次の案内をいつするかも伝えます。',ko:'확정되지 않은 것은 “예정”, “현재로서는”이라고 말하고, 다음 안내를 언제 할지도 알려 줍니다.',en:'For anything not yet certain, say “planned” or “for now,” and tell them when the next update will come.'}},
  {r:'A',ja:'乗り継ぎの便があるんです。間に合いますか。',jr:'のりつぎの びんが あるんです。まにあい ますか。',ko:'환승 비행기가 있는데요. 시간 안에 탈 수 있을까요?',en:'I have a connecting flight. Will I make it?'},
  {r:'B',ja:'お調べします。搭乗券を見せていただけますか。',jr:'おしらべ します。とうじょうけんを みせて いただけ ますか。',ko:'확인해 드리겠습니다. 탑승권을 보여 주시겠어요?',en:'Let me check for you. May I see your boarding pass?'},
  {r:'B',ja:'乗り継ぎの時間は1時間あります。到着したら係員がご案内しますので、ご安心ください。',jr:'のりつぎの じかんは いちじかん あります。とうちゃく したら かかりいんが ごあんない しますので、ごあんしん ください。',ko:'환승 시간은 1시간 있습니다. 도착하시면 직원이 안내해 드리니 안심하세요.',en:'You’ll have an hour to connect. A staff member will meet you on arrival, so please don’t worry.',
   alt:[{ja:'1時間ありますので間に合う見込みです。着いたら係員がお連れします。',jr:'いちじかん ありますので まにあう みこみ です。ついたら かかりいんが おつれ します。',ko:'1시간이 있어서 탈 수 있을 것 같습니다. 도착하면 직원이 모셔다 드립니다.',en:'You have an hour, so you should make it. Someone will take you there when we land.'}]},
  {r:'A',ja:'わかりました。ありがとうございます。',jr:'わかりました。ありがとう ございます。',ko:'알겠습니다. 감사합니다.',en:'All right. Thank you.'}
 ],
 check:[
  {q:{ja:'乗客に遅れの理由を聞かれました。最初に言うのは？',ko:'승객이 지연 이유를 물었습니다. 가장 먼저 할 말은?',en:'A passenger asks why the flight is late. What do you say first?'},
   opts:[{ja:'お待たせしてしまい、申し訳ございません。',ko:'기다리시게 해서 정말 죄송합니다.',en:'I’m very sorry to keep you waiting.'},
    {ja:'わたしのせいではありません。',ko:'제 탓이 아닙니다.',en:'It’s not my fault.'},
    {ja:'あとで聞いてください。',ko:'나중에 물어보세요.',en:'Please ask later.'}],a:0},
  {q:{ja:'新しい出発時刻はまだ決まっていません。どう伝えますか。',ko:'새 출발 시각은 아직 확정되지 않았습니다. 어떻게 전합니까?',en:'The new departure time is not final yet. How do you say it?'},
   opts:[{ja:'11時半に必ず出発します。',ko:'11시 반에 반드시 출발합니다.',en:'We will definitely leave at 11:30.'},
    {ja:'いまのところ11時半の予定です。わかりしだいお知らせします。',ko:'현재로서는 11시 반 예정입니다. 확인되는 대로 알려 드리겠습니다.',en:'For now it’s planned for 11:30. We’ll update you as soon as we know.'},
    {ja:'いつになるかわかりません。',ko:'언제 될지 모릅니다.',en:'No idea when.'}],a:1}
 ]},

{id:'air-baggage-1',cat:'work',lv:2,
 ai:{goal:{ja:'荷物の形や色、連絡先を聞いて、届けを作る。',ko:'짐의 모양과 색, 연락처를 묻고 분실 신고를 접수한다.',en:'Find out what the bag looks like and how to contact the passenger, and file a report.'},
    twist:{ja:'乗客は、荷物を預けたときにもらった控えをなくしてしまった。',ko:'승객은 짐을 맡길 때 받은 수하물표를 잃어버렸다.',en:'The passenger has lost the baggage claim tag they were given at check-in.'}},
 title:{ja:'手荷物が出てこない',ko:'수하물이 나오지 않을 때',en:'A bag that didn’t arrive'},
 scene:{ja:'到着した乗客の荷物が出てきません。手荷物のカウンターで話を聞きます。',ko:'도착한 승객의 짐이 나오지 않았습니다. 수하물 카운터에서 이야기를 듣습니다.',en:'An arriving passenger’s bag hasn’t come out. You talk to them at the baggage service counter.'},
 roles:{A:{ja:'手荷物カウンターの係員',ko:'수하물 카운터 직원',en:'Baggage service agent'},B:{ja:'乗客',ko:'승객',en:'Passenger'}},
 lines:[
  {r:'B',ja:'すみません。荷物が出てこないんですが。',jr:'すみません。にもつが でて こないん ですが。',ko:'저기요, 짐이 안 나와요.',en:'Excuse me. My bag hasn’t come out.'},
  {r:'A',ja:'ご不便をおかけして申し訳ございません。お調べしますので、手荷物の引換証を見せていただけますか。',jr:'ごふべんを おかけ して もうしわけ ございません。おしらべ します ので、てにもつの ひきかえしょうを みせて いただけ ますか。',ko:'불편을 드려 죄송합니다. 확인해 드릴 테니 수하물 표를 보여 주시겠어요?',en:'I’m sorry for the trouble. Let me look into it. May I see your baggage claim tag?',
   note:{ja:'引換証（荷札の控え）の番号で、荷物がいまどこにあるかを調べます。',ko:'수하물 표(태그 영수증)의 번호로 짐이 지금 어디 있는지 조회합니다.',en:'The number on the claim tag lets you trace where the bag is now.'}},
  {r:'B',ja:'はい、これです。黒いスーツケースです。',jr:'はい、これ です。くろい スーツケース です。',ko:'네, 여기요. 검은색 캐리어예요.',en:'Here it is. It’s a black suitcase.'},
  {r:'A',ja:'ありがとうございます。……お荷物は乗り継ぎの空港に残っているようです。次の便で届く予定です。',jr:'ありがとう ございます。……おにもつは のりつぎの くうこうに のこって いる よう です。つぎの びんで とどく よてい です。',ko:'감사합니다. ……짐이 환승 공항에 남아 있는 것 같습니다. 다음 비행기로 도착할 예정입니다.',en:'Thank you. … It looks like your bag is still at the connecting airport. It should come on the next flight.',
   alt:[{ja:'お荷物の場所がわかりました。乗り継ぎの空港にあり、次の便で運ばれます。',jr:'おにもつの ばしょが わかりました。のりつぎの くうこうに あり、つぎの びんで はこばれ ます。',ko:'짐 위치를 확인했습니다. 환승 공항에 있고, 다음 비행기로 옵니다.',en:'We’ve found your bag. It’s at the connecting airport and will come on the next flight.'}]},
  {r:'B',ja:'そうですか。今夜はホテルに泊まるんですが、どうすればいいですか。',jr:'そう ですか。こんやは ホテルに とまるん ですが、どう すれば いい ですか。',ko:'그래요? 오늘 밤은 호텔에서 묵는데, 어떻게 하면 돼요?',en:'I see. I’m staying at a hotel tonight. What should I do?'},
  {r:'A',ja:'届きましたら、ホテルまでお届けします。こちらの用紙に、ホテルの名前と電話番号を書いていただけますか。',jr:'とどき ましたら、ホテル まで おとどけ します。こちらの ようしに、ホテルの なまえと でんわ ばんごうを かいて いただけ ますか。',ko:'도착하면 호텔까지 가져다 드리겠습니다. 이 서류에 호텔 이름과 전화번호를 적어 주시겠어요?',en:'Once it arrives, we’ll deliver it to your hotel. Could you write the hotel name and phone number on this form?',
   alt:[{ja:'お荷物はホテルへお送りします。連絡先をこちらにお願いします。',jr:'おにもつは ホテルへ おおくり します。れんらくさきを こちらに おねがい します。',ko:'짐은 호텔로 보내 드리겠습니다. 연락처를 여기에 적어 주세요.',en:'We’ll send the bag to your hotel. Please write your contact details here.'}]},
  {r:'B',ja:'わかりました。でも、今夜使う物がなくて困ります。',jr:'わかりました。でも、こんや つかう ものが なくて こまり ます。',ko:'알겠어요. 그런데 오늘 밤 쓸 물건이 없어서 곤란해요.',en:'All right. But I don’t have anything for tonight.'},
  {r:'A',ja:'歯ブラシなど、身の回りの品をお渡しします。こちらが受付番号ですので、何かあればいつでもご連絡ください。',jr:'はブラシ など、みの まわりの しなを おわたし します。こちらが うけつけ ばんごう です ので、なにか あれば いつでも ごれんらく ください。',ko:'칫솔 같은 세면도구를 드리겠습니다. 이게 접수 번호이니 무슨 일이 있으면 언제든지 연락 주세요.',en:'Here are some toiletries, like a toothbrush. This is your reference number — please contact us any time.',
   note:{ja:'用紙を書いてもらったら、受付番号と連絡先を必ず渡します。',ko:'서류를 받은 뒤에는 접수 번호와 연락처를 꼭 건넵니다.',en:'After the report is made, always hand over the reference number and how to reach you.'}}
 ],
 check:[
  {q:{ja:'お客様が「荷物が出てこない」と言っています。最初に何と言いますか。',ko:'손님이 “짐이 안 나와요”라고 합니다. 먼저 뭐라고 말합니까?',en:'A passenger says, “My bag hasn’t come out.” What do you say first?'},
   opts:[{ja:'ご不便をおかけして申し訳ございません。引換証を見せていただけますか。',ko:'불편을 드려 죄송합니다. 수하물 표를 보여 주시겠어요?',en:'I’m sorry for the trouble. May I see your claim tag?'},
    {ja:'もう少し待ってください。たぶん出てきます。',ko:'조금 더 기다려 보세요. 아마 나올 거예요.',en:'Just wait a bit longer. It’ll probably come out.'},
    {ja:'ここではわかりません。',ko:'여기서는 모릅니다.',en:'We can’t tell you here.'}],a:0},
  {q:{ja:'荷物は次の便で届きます。お客様は今夜ホテルに泊まります。どう伝えますか。',ko:'짐은 다음 비행기로 옵니다. 손님은 오늘 밤 호텔에 묵습니다. 어떻게 전합니까?',en:'The bag will come on the next flight. The passenger is staying at a hotel tonight. What do you say?'},
   opts:[{ja:'空港まで取りに来てください。',ko:'공항까지 가지러 오세요.',en:'Please come back to the airport to collect it.'},
    {ja:'届きましたら、ホテルまでお届けします。',ko:'도착하면 호텔까지 가져다 드리겠습니다.',en:'Once it arrives, we’ll deliver it to your hotel.'},
    {ja:'いつ届くかはわかりません。',ko:'언제 도착할지는 모릅니다.',en:'We don’t know when it will arrive.'}],a:1}
 ]},

{id:'air-wheelchair-1',cat:'work',lv:1,
 ai:{goal:{ja:'どんな手伝いが必要かを聞いて、搭乗口までの手配を決める。',ko:'어떤 도움이 필요한지 묻고 탑승구까지의 안내를 정한다.',en:'Find out what help is needed and arrange assistance to the gate.'},
    twist:{ja:'乗客は自分の車いすを持っていて、預けるか機内の入口まで使うか迷っている。',ko:'승객은 자기 휠체어를 가지고 있고, 맡길지 기내 입구까지 쓸지 고민한다.',en:'The passenger has their own wheelchair and can’t decide whether to check it in or use it up to the aircraft door.'}},
 title:{ja:'車いすの手伝いを頼まれる',ko:'휠체어 도움 요청',en:'Helping with a wheelchair request'},
 scene:{ja:'チェックインのとき、長く歩くのがむずかしい乗客から手伝いを頼まれます。',ko:'체크인할 때 오래 걷기 힘든 승객이 도움을 요청합니다.',en:'At check-in, a passenger who finds it hard to walk far asks for help.'},
 roles:{A:{ja:'係員',ko:'직원',en:'Agent'},B:{ja:'乗客',ko:'승객',en:'Passenger'}},
 lines:[
  {r:'B',ja:'すみません。長く歩くのがむずかしいので、搭乗口まで手伝っていただけますか。',jr:'すみません。ながく あるくのが むずかしい ので、とうじょうぐち まで てつだって いただけ ますか。',ko:'저기요, 오래 걷기가 힘들어서 그러는데 탑승구까지 도와주실 수 있나요?',en:'Excuse me. It’s hard for me to walk long distances. Could you help me get to the gate?'},
  {r:'A',ja:'はい、もちろんです。車いすをご用意しましょうか。',jr:'はい、もちろん です。くるまいすを ごようい しましょうか。',ko:'네, 물론이죠. 휠체어를 준비해 드릴까요?',en:'Of course. Shall I arrange a wheelchair for you?',
   alt:[{ja:'はい、お手伝いします。車いすをお使いになりますか。',jr:'はい、おてつだい します。くるまいすを おつかいに なり ますか。',ko:'네, 도와드리겠습니다. 휠체어를 쓰시겠어요?',en:'Certainly, I’ll help. Would you like to use a wheelchair?'}]},
  {r:'B',ja:'はい、お願いします。少しなら歩けます。',jr:'はい、おねがい します。すこし なら あるけ ます。',ko:'네, 부탁드려요. 조금은 걸을 수 있어요.',en:'Yes, please. I can walk a little.'},
  {r:'A',ja:'承知しました。飛行機の座席までは、ご自分で歩けますか。',jr:'しょうち しました。ひこうきの ざせき までは、ごじぶんで あるけ ますか。',ko:'알겠습니다. 비행기 좌석까지는 혼자 걸어가실 수 있나요?',en:'Certainly. Can you walk to your seat on the plane by yourself?',
   note:{ja:'どのくらい歩けるか、階段が使えるかを聞くと、必要な手伝いの種類が決まります。体のくわしい事情は聞きません。',ko:'얼마나 걸을 수 있는지, 계단을 쓸 수 있는지 물으면 필요한 도움의 종류가 정해집니다. 몸 상태를 자세히 캐묻지 않습니다.',en:'Asking how far they can walk and whether they can manage stairs tells you what help is needed. Don’t ask for medical details.'}},
  {r:'B',ja:'はい、座席までなら大丈夫です。でも、階段はむずかしいです。',jr:'はい、ざせき まで なら だいじょうぶ です。でも、かいだんは むずかしい です。',ko:'네, 좌석까지는 괜찮아요. 그런데 계단은 힘들어요.',en:'Yes, I can manage to my seat. But stairs are difficult.'},
  {r:'A',ja:'わかりました。係の者が車いすでお連れします。出発の40分前に、こちらでお待ちください。',jr:'わかりました。かかりの ものが くるまいすで おつれ します。しゅっぱつの よんじゅっぷん まえに、こちらで おまち ください。',ko:'알겠습니다. 담당 직원이 휠체어로 모셔다 드리겠습니다. 출발 40분 전에 여기서 기다려 주세요.',en:'All right. A staff member will take you in a wheelchair. Please wait here 40 minutes before departure.'},
  {r:'B',ja:'ありがとうございます。助かります。',jr:'ありがとう ございます。たすかり ます。',ko:'감사합니다. 정말 큰 도움이 돼요.',en:'Thank you. That’s a big help.'},
  {r:'A',ja:'到着の空港でも、係の者がお待ちしています。ほかに何かあれば、遠慮なくおっしゃってください。',jr:'とうちゃくの くうこう でも、かかりの ものが おまち して います。ほかに なにか あれば、えんりょ なく おっしゃって ください。',ko:'도착 공항에서도 담당 직원이 기다리고 있을 거예요. 그 밖에 필요한 게 있으면 편하게 말씀해 주세요.',en:'Someone will be waiting for you at the arrival airport too. If you need anything else, please just let us know.',
   alt:[{ja:'着いた空港にも連絡しておきます。何でもお気軽にどうぞ。',jr:'ついた くうこう にも れんらく して おき ます。なんでも おきがるに どうぞ。',ko:'도착 공항에도 연락해 두겠습니다. 뭐든지 편하게 말씀하세요.',en:'I’ll let the arrival airport know as well. Feel free to ask for anything.'}]}
 ],
 check:[
  {q:{ja:'お客様が「長く歩くのがむずかしい」と言いました。最初の返事は？',ko:'손님이 “오래 걷기가 힘들어요”라고 했습니다. 첫 대답은?',en:'A passenger says walking far is hard for them. What is your first reply?'},
   opts:[{ja:'もちろんです。車いすをご用意しましょうか。',ko:'물론이죠. 휠체어를 준비해 드릴까요?',en:'Of course. Shall I arrange a wheelchair?'},
    {ja:'がんばって歩いてください。',ko:'힘내서 걸어가세요.',en:'Please try your best to walk.'},
    {ja:'予約がないので、できません。',ko:'예약이 없어서 안 됩니다.',en:'You didn’t book it, so we can’t.'}],a:0},
  {q:{ja:'どこまで手伝いが必要かを知りたいです。何と聞きますか。',ko:'어디까지 도움이 필요한지 알고 싶습니다. 뭐라고 묻습니까?',en:'You want to know how much help is needed. What do you ask?'},
   opts:[{ja:'どこが悪いんですか。',ko:'어디가 아프세요?',en:'What’s wrong with you?'},
    {ja:'飛行機の座席までは、ご自分で歩けますか。',ko:'비행기 좌석까지는 혼자 걸어가실 수 있나요?',en:'Can you walk to your seat on the plane by yourself?'},
    {ja:'何歳ですか。',ko:'몇 살이세요?',en:'How old are you?'}],a:1}
 ]},

{id:'air-transfer-1',cat:'work',lv:2,
 ai:{goal:{ja:'次の便の乗り場と時間、手続きの順番をわかりやすく伝える。',ko:'다음 편 탑승 장소와 시간, 절차 순서를 알기 쉽게 알려 준다.',en:'Explain clearly where and when the next flight leaves and what to do, in order.'},
    twist:{ja:'次の便の出発まで50分しかなく、乗客は急いでいる。',ko:'다음 편 출발까지 50분밖에 없어서 승객이 서두른다.',en:'There are only 50 minutes until the next flight, and the passenger is in a hurry.'}},
 title:{ja:'乗り継ぎの案内',ko:'환승 안내',en:'Guiding a transfer passenger'},
 scene:{ja:'到着したばかりの乗客が、次の便への乗り継ぎ方を聞いてきます。',ko:'막 도착한 승객이 다음 비행기로 환승하는 방법을 묻습니다.',en:'A passenger who just landed asks how to make their connection.'},
 roles:{A:{ja:'乗り継ぎ案内の係員',ko:'환승 안내 직원',en:'Transfer desk agent'},B:{ja:'乗客',ko:'승객',en:'Passenger'}},
 lines:[
  {r:'B',ja:'すみません。ソウル行きに乗り継ぎたいんですが、どこへ行けばいいですか。',jr:'すみません。ソウルゆきに のりつぎ たいん ですが、どこへ いけば いい ですか。',ko:'저기요, 서울행으로 환승하려고 하는데 어디로 가면 되나요?',en:'Excuse me. I’m connecting to Seoul. Where should I go?'},
  {r:'A',ja:'次の便の搭乗券をお持ちですか。拝見します。',jr:'つぎの びんの とうじょうけんを おもち ですか。はいけん します。',ko:'다음 비행기 탑승권을 갖고 계세요? 확인해 보겠습니다.',en:'Do you have the boarding pass for your next flight? Let me take a look.'},
  {r:'B',ja:'はい、これです。でも、預けた荷物はどうなりますか。',jr:'はい、これ です。でも、あずけた にもつは どう なり ますか。',ko:'네, 여기요. 그런데 부친 짐은 어떻게 되나요?',en:'Here it is. But what happens to my checked bag?'},
  {r:'A',ja:'お荷物は最後の行き先まで預かっていますので、受け取る必要はありません。',jr:'おにもつは さいごの いきさき まで あずかって います ので、うけとる ひつようは ありません。',ko:'짐은 최종 목적지까지 연결되어 있으니 찾으실 필요 없습니다.',en:'Your bag is checked through to your final destination, so you don’t need to collect it.',
   note:{ja:'荷物が最後の行き先まで通しで預かりになっているかで、案内が大きく変わります。荷札の行き先を確かめます。',ko:'짐이 최종 목적지까지 연결 수속되었는지에 따라 안내가 크게 달라집니다. 태그의 목적지를 확인합니다.',en:'Whether the bag is checked through changes the whole explanation. Check the destination on the tag.'}},
  {r:'A',ja:'この先の「乗り継ぎ」の案内に沿って進み、保安検査を受けてください。搭乗口は62番です。',jr:'この さきの「のりつぎ」の あんないに そって すすみ、ほあん けんさを うけて ください。とうじょうぐちは ろくじゅうにばん です。',ko:'앞쪽의 ‘환승’ 표지판을 따라가서 보안 검색을 받으세요. 탑승구는 62번입니다.',en:'Follow the “Transfer” signs ahead and go through security. Your gate is 62.',
   alt:[{ja:'まっすぐ進むと「乗り継ぎ」の表示があります。検査のあと、62番の搭乗口へどうぞ。',jr:'まっすぐ すすむと「のりつぎ」の ひょうじが あり ます。けんさの あと、ろくじゅうにばんの とうじょうぐちへ どうぞ。',ko:'쭉 가시면 ‘환승’ 표시가 있습니다. 검색을 받으신 뒤 62번 탑승구로 가세요.',en:'Go straight and you’ll see the “Transfer” sign. After security, head to gate 62.'}]},
  {r:'B',ja:'時間は間に合いますか。',jr:'じかんは まにあい ますか。',ko:'시간은 충분할까요?',en:'Will I have enough time?'},
  {r:'A',ja:'搭乗の開始まで50分ありますので、間に合います。歩いて10分ほどです。',jr:'とうじょうの かいし まで ごじゅっぷん あります ので、まにあい ます。あるいて じゅっぷん ほど です。',ko:'탑승 시작까지 50분 있으니 충분합니다. 걸어서 10분 정도예요.',en:'Boarding starts in 50 minutes, so you’ll make it. It’s about a ten-minute walk.'},
  {r:'B',ja:'よかった。ありがとうございます。',jr:'よかった。ありがとう ございます。',ko:'다행이네요. 감사합니다.',en:'Great. Thank you.'}
 ],
 check:[
  {q:{ja:'乗客に「預けた荷物はどうなりますか」と聞かれました。荷物は最後の行き先まで預かっています。',ko:'승객이 “부친 짐은 어떻게 되나요?”라고 묻습니다. 짐은 최종 목적지까지 연결되어 있습니다.',en:'The passenger asks about their checked bag. It is checked through to the final destination.'},
   opts:[{ja:'最後の行き先まで預かっていますので、受け取る必要はありません。',ko:'최종 목적지까지 연결되어 있으니 찾으실 필요 없습니다.',en:'It’s checked through to your final destination, so you don’t need to collect it.'},
    {ja:'荷物を受け取って、もう一度預けてください。',ko:'짐을 찾아서 다시 부치세요.',en:'Please collect it and check it in again.'},
    {ja:'荷物のことはわかりません。',ko:'짐은 잘 모르겠습니다.',en:'I don’t know about bags.'}],a:0},
  {q:{ja:'乗り継ぎの道順を伝えます。どの言い方がよいですか。',ko:'환승 길을 안내합니다. 어떤 말이 좋습니까?',en:'You explain the way to the connecting flight. Which is best?'},
   opts:[{ja:'あっちです。',ko:'저쪽이에요.',en:'Over there.'},
    {ja:'「乗り継ぎ」の案内に沿って進み、保安検査を受けてください。搭乗口は62番です。',ko:'‘환승’ 표지판을 따라가서 보안 검색을 받으세요. 탑승구는 62번입니다.',en:'Follow the “Transfer” signs and go through security. Your gate is 62.'},
    {ja:'自分で探してください。',ko:'직접 찾아보세요.',en:'Please find it yourself.'}],a:1}
 ]},

{id:'air-complaint-1',cat:'work',lv:3,
 ai:{goal:{ja:'乗客の気持ちを受け止めて、席の解決の案を出し、落ち着いてもらう。',ko:'승객의 마음을 받아 주고 좌석 해결 방안을 제시해 진정시킨다.',en:'Acknowledge the passenger’s feelings, offer a seating solution and calm things down.'},
    twist:{ja:'便は満席で、家族全員をすぐに並べるのはむずかしい。',ko:'항공편이 만석이라 가족 모두를 바로 나란히 앉히기 어렵다.',en:'The flight is full, so seating the whole family together right away is difficult.'}},
 title:{ja:'苦情にていねいに対応する',ko:'불만에 정중하게 대응하기',en:'Handling a complaint politely'},
 scene:{ja:'家族の席が離れてしまい、乗客が怒ってカウンターに来ました。',ko:'가족 좌석이 떨어져 배정되어 승객이 화가 나서 카운터에 왔습니다.',en:'A passenger comes to the counter, upset that their family has been seated apart.'},
 roles:{A:{ja:'乗客',ko:'승객',en:'Passenger'},B:{ja:'カウンターの係員',ko:'카운터 직원',en:'Counter agent'}},
 lines:[
  {r:'A',ja:'ちょっと、どういうことですか。家族と席がばらばらになっているんですけど。',jr:'ちょっと、どういう こと ですか。かぞくと せきが ばらばらに なって いるん ですけど。',ko:'이게 무슨 일이에요? 가족이랑 좌석이 다 따로따로잖아요.',en:'Excuse me, what is this? My family’s seats are all split up.'},
  {r:'B',ja:'ご不快な思いをさせてしまい、申し訳ございません。くわしくお聞かせいただけますか。',jr:'ごふかいな おもいを させて しまい、もうしわけ ございません。くわしく おきかせ いただけ ますか。',ko:'불편을 끼쳐 드려 정말 죄송합니다. 자세히 말씀해 주시겠어요?',en:'I’m very sorry for the trouble this has caused. Could you tell me more?',
   note:{ja:'まず気持ちを受け止めておわびし、話を最後まで聞きます。言い訳から始めません。',ko:'먼저 감정을 받아들이고 사과한 뒤 끝까지 이야기를 듣습니다. 변명부터 하지 않습니다.',en:'First acknowledge the feeling and apologise, then listen to the end. Don’t start with excuses.'}},
  {r:'A',ja:'予約のときに、子どもと並びの席をお願いしたんです。5歳の子が一人で座るなんて無理です。',jr:'よやくの ときに、こどもと ならびの せきを おねがい したん です。ごさいの こが ひとりで すわる なんて むり です。',ko:'예약할 때 아이랑 나란히 앉게 해 달라고 부탁했어요. 다섯 살짜리가 혼자 앉는 건 말도 안 돼요.',en:'When I booked, I asked for seats next to my child. A five-year-old can’t sit alone.'},
  {r:'B',ja:'おっしゃるとおりです。小さなお子様がお一人にならないよう、すぐに席をお調べします。',jr:'おっしゃる とおり です。ちいさな おこさまが おひとりに ならない よう、すぐに せきを おしらべ します。',ko:'맞는 말씀입니다. 어린 자녀분이 혼자 앉지 않도록 바로 좌석을 확인하겠습니다.',en:'You’re absolutely right. I’ll check the seats right away so your child won’t be on their own.',
   alt:[{ja:'ごもっともです。お子様のお隣になるよう、いますぐお席を直します。',jr:'ごもっとも です。おこさまの おとなりに なる よう、いますぐ おせきを なおし ます。',ko:'당연한 말씀입니다. 자녀분 옆자리가 되도록 지금 바로 좌석을 바꿔 드리겠습니다.',en:'That’s completely understandable. I’ll change the seats now so you’re next to your child.'}]},
  {r:'A',ja:'早くしてください。もう何度も説明しているんですよ。',jr:'はやく して ください。もう なんども せつめい して いるん ですよ。',ko:'빨리 좀 해 주세요. 벌써 몇 번이나 설명했다고요.',en:'Please hurry. I’ve already explained this several times.'},
  {r:'B',ja:'何度もご説明いただき、申し訳ございません。……お待たせしました。3人並びのお席をご用意できました。',jr:'なんども ごせつめい いただき、もうしわけ ございません。……おまたせ しました。さんにん ならびの おせきを ごようい できました。',ko:'여러 번 설명하시게 해서 죄송합니다. ……오래 기다리셨습니다. 세 분이 나란히 앉으실 좌석을 마련했습니다.',en:'I’m sorry you’ve had to explain it so many times. … Thank you for waiting. I’ve found three seats together for you.'},
  {r:'A',ja:'それならいいです。最初からそうしてほしかったです。',jr:'それ なら いい です。さいしょ から そう して ほしかった です。',ko:'그럼 됐어요. 처음부터 그렇게 해 줬으면 좋았을 텐데요.',en:'Fine. I wish it had been done right from the start.'},
  {r:'B',ja:'ご期待にそえず、大変申し訳ございませんでした。いただいたご意見は、担当の部署に必ず伝えます。',jr:'ごきたいに そえず、たいへん もうしわけ ございません でした。いただいた ごいけんは、たんとうの ぶしょに かならず つたえ ます。',ko:'기대에 부응하지 못해 정말 죄송합니다. 주신 의견은 담당 부서에 꼭 전달하겠습니다.',en:'I’m truly sorry we let you down. I’ll make sure your feedback reaches the team responsible.',
   note:{ja:'解決したあとも、もう一度おわびし、意見をどう生かすかを伝えると、気持ちがおさまりやすくなります。',ko:'해결한 뒤에도 다시 한번 사과하고, 의견을 어떻게 반영할지 알려 주면 마음이 풀리기 쉽습니다.',en:'After fixing the problem, apologise once more and say what you’ll do with the feedback. It helps the person settle.'}}
 ],
 check:[
  {q:{ja:'怒っているお客様への、最初のひと言は？',ko:'화가 난 손님에게 할 첫 마디는?',en:'What is the first thing to say to an upset passenger?'},
   opts:[{ja:'予約の仕組みのせいです。',ko:'예약 시스템 탓입니다.',en:'It’s the booking system’s fault.'},
    {ja:'ご不快な思いをさせてしまい、申し訳ございません。',ko:'불편을 끼쳐 드려 정말 죄송합니다.',en:'I’m very sorry for the trouble this has caused.'},
    {ja:'落ち着いてください。',ko:'진정하세요.',en:'Calm down, please.'}],a:1},
  {q:{ja:'お客様が「もう何度も説明している」と言いました。よい返事は？',ko:'손님이 “벌써 몇 번이나 설명했다”고 합니다. 좋은 대답은?',en:'The passenger says, “I’ve explained this several times.” What is a good reply?'},
   opts:[{ja:'何度もご説明いただき、申し訳ございません。',ko:'여러 번 설명하시게 해서 죄송합니다.',en:'I’m sorry you’ve had to explain it so many times.'},
    {ja:'聞いていませんでした。',ko:'못 들었습니다.',en:'I wasn’t told.'},
    {ja:'それはわたしの担当ではありません。',ko:'그건 제 담당이 아닙니다.',en:'That’s not my job.'}],a:0},
  {q:{ja:'問題が解決したあと、最後に言うのは？',ko:'문제가 해결된 뒤 마지막으로 할 말은?',en:'The problem is solved. What do you say at the end?'},
   opts:[{ja:'これで終わりです。',ko:'이제 끝났습니다.',en:'We’re done here.'},
    {ja:'次からは気をつけてください。',ko:'다음부터는 조심하세요.',en:'Please be careful next time.'},
    {ja:'ご期待にそえず申し訳ございませんでした。ご意見は担当の部署に伝えます。',ko:'기대에 부응하지 못해 죄송합니다. 의견은 담당 부서에 전달하겠습니다.',en:'I’m sorry we let you down. I’ll pass your feedback on to the team responsible.'}],a:2}
 ]},

/* ───────── 旅行（travel） ───────── */
{id:'trv-immigration-1',cat:'travel',lv:1,
 ai:{goal:{ja:'旅行の目的・日数・泊まる所を答えて、入国する。',ko:'여행 목적, 기간, 숙소를 대답하고 입국한다.',en:'Answer questions about the purpose of your trip, how long you are staying and where, and get through.'},
    twist:{ja:'友達の家に泊まるので、住所をすぐに言えない。',ko:'친구 집에 묵어서 주소를 바로 말하지 못한다.',en:'You are staying at a friend’s place and can’t give the address straight away.'}},
 title:{ja:'入国審査で答える',ko:'입국 심사에서 대답하기',en:'Answering at immigration'},
 scene:{ja:'旅行先の空港に着きました。入国審査でいくつか質問されます。',ko:'여행지 공항에 도착했습니다. 입국 심사에서 몇 가지 질문을 받습니다.',en:'You’ve landed abroad. The immigration officer asks you a few questions.'},
 roles:{A:{ja:'入国審査官',ko:'입국 심사관',en:'Immigration officer'},B:{ja:'旅行者',ko:'여행자',en:'Traveller'}},
 lines:[
  {r:'A',ja:'パスポートを見せてください。',jr:'パスポートを みせて ください。',ko:'여권 보여 주세요.',en:'Your passport, please.'},
  {r:'B',ja:'はい、どうぞ。',jr:'はい、どうぞ。',ko:'네, 여기 있습니다.',en:'Here you are.'},
  {r:'A',ja:'旅行の目的は何ですか。',jr:'りょこうの もくてきは なん ですか。',ko:'방문 목적이 무엇입니까?',en:'What’s the purpose of your visit?',
   alt:[{ja:'今回は、どのようなご用件でいらっしゃいましたか。',jr:'こんかいは、どのような ごようけんで いらっしゃい ましたか。',ko:'이번에는 어떤 일로 오셨습니까?',en:'What brings you here this time?'}]},
  {r:'B',ja:'観光です。友達に会うのも楽しみにしています。',jr:'かんこう です。ともだちに あうのも たのしみに して います。',ko:'관광이요. 친구도 만날 생각이에요.',en:'Sightseeing. I’m also looking forward to seeing a friend.',
   alt:[{ja:'仕事です。会議に出ます。',jr:'しごと です。かいぎに でます。',ko:'업무입니다. 회의에 참석합니다.',en:'Business. I’m attending a meeting.'}],
   note:{ja:'目的は短く、はっきり答えます。',ko:'목적은 짧고 분명하게 대답합니다.',en:'Answer the purpose briefly and clearly.'}},
  {r:'A',ja:'何日間、滞在しますか。',jr:'なんにちかん、たいざい しますか。',ko:'며칠 동안 머무르십니까?',en:'How long will you be staying?'},
  {r:'B',ja:'5日間です。金曜日に帰ります。',jr:'いつかかん です。きんようびに かえり ます。',ko:'5일이요. 금요일에 돌아가요.',en:'Five days. I’m going back on Friday.'},
  {r:'A',ja:'どこに泊まりますか。',jr:'どこに とまり ますか。',ko:'어디에서 묵으십니까?',en:'Where are you staying?'},
  {r:'B',ja:'駅の近くのホテルです。予約の確認書もあります。',jr:'えきの ちかくの ホテル です。よやくの かくにんしょも あり ます。',ko:'역 근처 호텔이에요. 예약 확인서도 있어요.',en:'At a hotel near the station. I have the booking confirmation too.'},
  {r:'A',ja:'わかりました。どうぞ、よいご旅行を。',jr:'わかりました。どうぞ、よい ごりょこうを。',ko:'알겠습니다. 즐거운 여행 되십시오.',en:'All right. Enjoy your trip.'}
 ],
 check:[
  {q:{ja:'「旅行の目的は何ですか」と聞かれました。答えは？',ko:'“방문 목적이 무엇입니까?”라는 질문을 받았습니다. 대답은?',en:'You’re asked, “What’s the purpose of your visit?” Your answer?'},
   opts:[{ja:'観光です。',ko:'관광이요.',en:'Sightseeing.'},{ja:'5日間です。',ko:'5일이요.',en:'Five days.'},{ja:'駅の近くのホテルです。',ko:'역 근처 호텔이에요.',en:'A hotel near the station.'}],a:0},
  {q:{ja:'「何日間、滞在しますか」と聞かれました。答えは？',ko:'“며칠 동안 머무르십니까?”라는 질문을 받았습니다. 대답은?',en:'You’re asked, “How long will you be staying?” Your answer?'},
   opts:[{ja:'金曜日に来ました。',ko:'금요일에 왔어요.',en:'I came on Friday.'},{ja:'5日間です。',ko:'5일이요.',en:'Five days.'},{ja:'友達と来ました。',ko:'친구랑 왔어요.',en:'I came with a friend.'}],a:1}
 ]},

{id:'trv-hotel-1',cat:'travel',lv:1,
 ai:{goal:{ja:'手続きを終えて、朝食の時間と、出る日の時間を確かめる。',ko:'체크인을 마치고 조식 시간과 체크아웃 시간을 확인한다.',en:'Finish checking in and confirm breakfast times and check-out time.'},
    twist:{ja:'予約が1泊少なく入っている。',ko:'예약이 1박 적게 되어 있다.',en:'The booking is one night shorter than you planned.'}},
 title:{ja:'ホテルのチェックイン',ko:'호텔 체크인',en:'Checking in at a hotel'},
 scene:{ja:'予約したホテルに着き、フロントで手続きをします。',ko:'예약한 호텔에 도착해 프런트에서 수속을 합니다.',en:'You arrive at the hotel you booked and check in at the front desk.'},
 roles:{A:{ja:'フロントの係',ko:'프런트 직원',en:'Front desk clerk'},B:{ja:'宿泊客',ko:'투숙객',en:'Guest'}},
 lines:[
  {r:'B',ja:'こんにちは。今日から2泊で予約している、キム・ミナです。',jr:'こんにちは。きょう から にはくで よやく して いる、キム・ミナ です。',ko:'안녕하세요. 오늘부터 2박으로 예약한 김민아입니다.',en:'Hello. I have a reservation for two nights from today. My name is Kim Mina.',
   note:{ja:'名前と泊まる日数を先に言うと、手続きが早く進みます。',ko:'이름과 숙박 일수를 먼저 말하면 수속이 빨리 진행됩니다.',en:'Giving your name and number of nights first speeds things up.'}},
  {r:'A',ja:'いらっしゃいませ。キム様ですね。パスポートをお願いできますか。',jr:'いらっしゃいませ。キムさま ですね。パスポートを おねがい できますか。',ko:'어서 오세요. 김민아 님이시죠. 여권 부탁드려도 될까요?',en:'Welcome, Ms Kim. May I have your passport, please?'},
  {r:'A',ja:'ありがとうございます。お部屋は8階の805号室です。朝食は7時から10時まで、2階でご用意しています。',jr:'ありがとう ございます。おへやは はちかいの はちまる ごごうしつ です。ちょうしょくは しちじ から じゅうじ まで、にかいで ごようい して います。',ko:'감사합니다. 객실은 8층 805호입니다. 조식은 7시부터 10시까지 2층에서 드실 수 있습니다.',en:'Thank you. You’re in room 805 on the eighth floor. Breakfast is served on the second floor from 7 to 10.'},
  {r:'B',ja:'部屋を出るのは何時までですか。',jr:'へやを でるのは なんじ まで ですか。',ko:'체크아웃은 몇 시까지예요?',en:'What time is check-out?',
   alt:[{ja:'チェックアウトは何時ですか。',jr:'チェックアウトは なんじ ですか。',ko:'체크아웃 시간이 언제예요?',en:'When do I need to check out?'}]},
  {r:'A',ja:'11時までです。お荷物は、そのあともフロントでお預かりできます。',jr:'じゅういちじ まで です。おにもつは、その あとも フロントで おあずかり できます。',ko:'11시까지입니다. 짐은 그 후에도 프런트에서 맡아 드릴 수 있습니다.',en:'By 11. We can also keep your luggage at the front desk after that.'},
  {r:'B',ja:'助かります。それから、近くに夜遅くまで開いている店はありますか。',jr:'たすかり ます。それから、ちかくに よる おそく まで あいて いる みせは あり ますか。',ko:'다행이네요. 그리고 근처에 밤늦게까지 여는 가게가 있나요?',en:'That’s helpful. Also, is there a shop nearby that’s open late?'},
  {r:'A',ja:'ホテルを出て右に2分ほど歩くと、24時間開いているコンビニがあります。',jr:'ホテルを でて みぎに にふん ほど あるくと、にじゅうよ じかん あいて いる コンビニが あり ます。',ko:'호텔에서 나가 오른쪽으로 2분쯤 걸으면 24시간 편의점이 있어요.',en:'Turn right out of the hotel and walk about two minutes. There’s a 24-hour convenience store.'},
  {r:'B',ja:'ありがとうございます。',jr:'ありがとう ございます。',ko:'감사합니다.',en:'Thank you.'},
  {r:'A',ja:'こちらがお部屋の鍵です。どうぞごゆっくりお過ごしください。',jr:'こちらが おへやの かぎ です。どうぞ ごゆっくり おすごし ください。',ko:'객실 키 여기 있습니다. 편히 쉬십시오.',en:'Here is your room key. Enjoy your stay.',
   alt:[{ja:'鍵をお渡しします。何かありましたら、いつでもフロントへどうぞ。',jr:'かぎを おわたし します。なにか ありましたら、いつでも フロントへ どうぞ。',ko:'키를 드리겠습니다. 필요한 게 있으시면 언제든지 프런트로 연락 주세요.',en:'Here’s your key. If you need anything, just call the front desk.'}]}
 ],
 check:[
  {q:{ja:'ホテルのフロントに着きました。最初に何と言いますか。',ko:'호텔 프런트에 도착했습니다. 먼저 뭐라고 말합니까?',en:'You reach the front desk. What do you say first?'},
   opts:[{ja:'今日から2泊で予約している、キム・ミナです。',ko:'오늘부터 2박으로 예약한 김민아입니다.',en:'I have a reservation for two nights from today. I’m Kim Mina.'},{ja:'部屋はどこですか。',ko:'방은 어디예요?',en:'Where’s my room?'},{ja:'朝ごはんは何ですか。',ko:'아침은 뭐예요?',en:'What’s for breakfast?'}],a:0},
  {q:{ja:'部屋を出る時間を知りたいです。何と聞きますか。',ko:'체크아웃 시간을 알고 싶습니다. 뭐라고 묻습니까?',en:'You want to know the check-out time. What do you ask?'},
   opts:[{ja:'鍵をください。',ko:'키 주세요.',en:'Key, please.'},{ja:'何階ですか。',ko:'몇 층이에요?',en:'Which floor is it?'},{ja:'部屋を出るのは何時までですか。',ko:'체크아웃은 몇 시까지예요?',en:'What time is check-out?'}],a:2}
 ]},

{id:'trv-taxi-1',cat:'travel',lv:1,
 ai:{goal:{ja:'行き先を伝え、降りる場所を指示して、料金を払う。',ko:'목적지를 말하고 내릴 곳을 알려 준 뒤 요금을 낸다.',en:'Tell the driver where to go, say where to stop and pay the fare.'},
    twist:{ja:'この車ではカードが使えず、現金が少ししかない。',ko:'이 차에서는 카드를 쓸 수 없고 현금이 조금밖에 없다.',en:'The taxi doesn’t take cards, and you only have a little cash.'}},
 title:{ja:'タクシーに乗る',ko:'택시 타기',en:'Taking a taxi'},
 scene:{ja:'タクシーで行き先を伝え、降りる場所を指示して、料金を払います。',ko:'택시에서 목적지를 말하고, 내릴 곳을 알려 주고, 요금을 냅니다.',en:'You tell the taxi driver where to go, say where to stop, and pay.'},
 roles:{A:{ja:'運転手',ko:'택시 기사',en:'Driver'},B:{ja:'乗客',ko:'승객',en:'Passenger'}},
 lines:[
  {r:'A',ja:'どちらまでですか。',jr:'どちら まで ですか。',ko:'어디로 모실까요?',en:'Where to?'},
  {r:'B',ja:'この住所までお願いします。',jr:'この じゅうしょ まで おねがい します。',ko:'이 주소로 가 주세요.',en:'To this address, please.',
   alt:[{ja:'市立美術館までお願いします。',jr:'しりつ びじゅつかん まで おねがい します。',ko:'시립 미술관까지 가 주세요.',en:'To the City Art Museum, please.'}]},
  {r:'A',ja:'わかりました。高速道路を使いますか。少し早く着きますが、料金がかかります。',jr:'わかりました。こうそく どうろを つかい ますか。すこし はやく つき ますが、りょうきんが かかり ます。',ko:'알겠습니다. 고속도로로 갈까요? 조금 빨리 도착하지만 통행료가 들어요.',en:'Sure. Shall I take the expressway? It’s a bit faster, but there’s a toll.'},
  {r:'B',ja:'いいえ、下の道でお願いします。どのくらいかかりますか。',jr:'いいえ、したの みちで おねがい します。どのくらい かかり ますか。',ko:'아니요, 일반 도로로 가 주세요. 얼마나 걸려요?',en:'No, regular roads, please. How long will it take?',
   note:{ja:'「下の道」は、高速道路ではないふつうの道のことです。',ko:'‘시타노 미치(下の道)’는 고속도로가 아닌 일반 도로를 말합니다.',en:'In Japanese, “shita no michi” means ordinary roads rather than the expressway.'}},
  {r:'A',ja:'道がすいていれば、20分くらいです。',jr:'みちが すいて いれば、にじゅっぷん くらい です。',ko:'길이 안 막히면 20분 정도예요.',en:'About 20 minutes if the traffic is light.'},
  {r:'B',ja:'あ、次の信号の手前で止めてください。',jr:'あ、つぎの しんごうの てまえで とめて ください。',ko:'아, 다음 신호등 앞에서 세워 주세요.',en:'Oh, please stop just before the next traffic light.',
   alt:[{ja:'あの白い建物の前で降ります。',jr:'あの しろい たてものの まえで おり ます。',ko:'저 하얀 건물 앞에서 내릴게요.',en:'I’ll get out in front of that white building.'}]},
  {r:'A',ja:'はい、着きました。1,850円です。',jr:'はい、つきました。せん はっぴゃく ごじゅう えん です。',ko:'네, 도착했습니다. 1,850엔입니다.',en:'Here we are. That’s 1,850 yen.'},
  {r:'B',ja:'カードでお願いします。領収書もください。',jr:'カードで おねがい します。りょうしゅうしょも ください。',ko:'카드로 할게요. 영수증도 주세요.',en:'By card, please. And could I have a receipt?'},
  {r:'A',ja:'ありがとうございました。お忘れ物のないよう、お気をつけて。',jr:'ありがとう ございました。おわすれものの ない よう、おきを つけて。',ko:'감사합니다. 두고 내리시는 물건 없도록 조심히 가세요.',en:'Thank you. Please make sure you have all your belongings.'}
 ],
 check:[
  {q:{ja:'運転手に「どちらまでですか」と聞かれました。',ko:'기사님이 “어디로 모실까요?”라고 물었습니다.',en:'The driver asks, “Where to?”'},
   opts:[{ja:'20分くらいです。',ko:'20분 정도예요.',en:'About 20 minutes.'},{ja:'この住所までお願いします。',ko:'이 주소로 가 주세요.',en:'To this address, please.'},{ja:'カードでお願いします。',ko:'카드로 할게요.',en:'By card, please.'}],a:1},
  {q:{ja:'降りたい場所の少し前で止めてほしいです。',ko:'내리고 싶은 곳 조금 앞에서 세워 달라고 하고 싶습니다.',en:'You want the taxi to stop just before a certain spot.'},
   opts:[{ja:'次の信号の手前で止めてください。',ko:'다음 신호등 앞에서 세워 주세요.',en:'Please stop just before the next traffic light.'},{ja:'高速道路を使ってください。',ko:'고속도로로 가 주세요.',en:'Please take the expressway.'},{ja:'領収書をください。',ko:'영수증 주세요.',en:'A receipt, please.'}],a:0}
 ]},

{id:'trv-way-1',cat:'travel',lv:1,
 ai:{goal:{ja:'駅までの道順を聞いて、わかったことを確かめる。',ko:'역까지 가는 길을 묻고 들은 내용을 확인한다.',en:'Ask the way to the station and check that you have understood.'},
    twist:{ja:'近くに名前の似た駅が2つあり、どちらの駅かを確かめる必要がある。',ko:'근처에 이름이 비슷한 역이 두 개 있어서 어느 역인지 확인해야 한다.',en:'There are two stations with similar names nearby, so you need to check which one.'}},
 title:{ja:'道をたずねる',ko:'길 묻기',en:'Asking the way'},
 scene:{ja:'駅へ行く道がわからなくなり、通りがかりの人にたずねます。',ko:'역으로 가는 길을 잃어서 지나가는 사람에게 묻습니다.',en:'You’re not sure how to get to the station, so you ask someone passing by.'},
 roles:{A:{ja:'旅行者',ko:'여행자',en:'Traveller'},B:{ja:'通りがかりの人',ko:'지나가던 사람',en:'Passer-by'}},
 lines:[
  {r:'A',ja:'すみません、ちょっとよろしいですか。',jr:'すみません、ちょっと よろしい ですか。',ko:'실례합니다, 잠깐 괜찮으세요?',en:'Excuse me, do you have a moment?'},
  {r:'B',ja:'はい、どうしましたか。',jr:'はい、どう しましたか。',ko:'네, 무슨 일이세요?',en:'Sure, what is it?'},
  {r:'A',ja:'中央駅へ行きたいんですが、この道で合っていますか。',jr:'ちゅうおう えきへ いきたいん ですが、この みちで あって いますか。',ko:'중앙역에 가려고 하는데, 이 길이 맞나요?',en:'I’m trying to get to Central Station. Am I going the right way?',
   alt:[{ja:'中央駅へは、どう行けばいいですか。',jr:'ちゅうおう えきへは、どう いけば いい ですか。',ko:'중앙역은 어떻게 가면 돼요?',en:'How do I get to Central Station?'}]},
  {r:'B',ja:'ああ、反対ですね。この道をもどって、二つ目の角を左に曲がってください。',jr:'ああ、はんたい ですね。この みちを もどって、ふたつめの かどを ひだりに まがって ください。',ko:'아, 반대 방향이에요. 이 길로 되돌아가서 두 번째 모퉁이에서 왼쪽으로 도세요.',en:'Ah, it’s the other way. Go back along this street and turn left at the second corner.'},
  {r:'A',ja:'二つ目の角を左ですね。',jr:'ふたつめの かどを ひだり ですね。',ko:'두 번째 모퉁이에서 왼쪽이요?',en:'Left at the second corner, right?',
   note:{ja:'聞いた道順をくり返すと、まちがいが防げます。',ko:'들은 길을 다시 말해 보면 실수를 막을 수 있습니다.',en:'Repeating the directions back helps you avoid mistakes.'}},
  {r:'B',ja:'そうです。そのまままっすぐ行くと、右側に駅が見えます。歩いて10分くらいです。',jr:'そう です。その まま まっすぐ いくと、みぎがわに えきが みえ ます。あるいて じゅっぷん くらい です。',ko:'네. 그대로 쭉 가시면 오른쪽에 역이 보여요. 걸어서 10분쯤이에요.',en:'That’s right. Keep going straight and you’ll see the station on your right. It’s about a ten-minute walk.'},
  {r:'A',ja:'よくわかりました。ご親切にありがとうございます。',jr:'よく わかりました。ごしんせつに ありがとう ございます。',ko:'잘 알겠습니다. 친절하게 알려 주셔서 감사합니다.',en:'That’s very clear. Thank you for your kindness.',
   alt:[{ja:'助かりました。ありがとうございます。',jr:'たすかり ました。ありがとう ございます。',ko:'덕분에 살았어요. 감사합니다.',en:'That really helps. Thank you.'}]},
  {r:'B',ja:'いいえ。気をつけて。',jr:'いいえ。きを つけて。',ko:'별말씀을요. 조심히 가세요.',en:'No problem. Take care.'}
 ],
 check:[
  {q:{ja:'知らない人に道を聞きます。最初のひと言は？',ko:'모르는 사람에게 길을 묻습니다. 첫 마디는?',en:'You’re about to ask a stranger for directions. What do you say first?'},
   opts:[{ja:'駅はどこ？',ko:'역 어디야?',en:'Where’s the station?'},{ja:'すみません、ちょっとよろしいですか。',ko:'실례합니다, 잠깐 괜찮으세요?',en:'Excuse me, do you have a moment?'},{ja:'教えて。',ko:'알려 줘.',en:'Tell me.'}],a:1},
  {q:{ja:'道順を聞いたあと、合っているか確かめたいです。',ko:'길을 들은 뒤 맞는지 확인하고 싶습니다.',en:'After hearing the directions, you want to check you got it right.'},
   opts:[{ja:'二つ目の角を左ですね。',ko:'두 번째 모퉁이에서 왼쪽이요?',en:'Left at the second corner, right?'},{ja:'もう帰ります。',ko:'이제 갈게요.',en:'I’m going home now.'},{ja:'10分ですか、長いですね。',ko:'10분이요? 기네요.',en:'Ten minutes? That’s long.'}],a:0}
 ]},

/* ───────── 毎日の暮らし（life） ───────── */
{id:'life-konbini-1',cat:'life',lv:1,
 ai:{goal:{ja:'ほしい物を伝えて、支払いを済ませる。',ko:'원하는 것을 말하고 계산을 마친다.',en:'Ask for what you need and pay.'},
    twist:{ja:'支払いのときに、ポイントカードを作るかと聞かれる。',ko:'계산할 때 포인트 카드를 만들겠냐는 질문을 받는다.',en:'At the till, you are asked if you want to sign up for a points card.'}},
 title:{ja:'コンビニで買い物',ko:'편의점에서 장보기',en:'At the convenience store'},
 scene:{ja:'コンビニのレジで、お弁当と飲み物を買います。',ko:'편의점 계산대에서 도시락과 음료를 삽니다.',en:'You buy a boxed lunch and a drink at a convenience store checkout.'},
 roles:{A:{ja:'店員',ko:'점원',en:'Clerk'},B:{ja:'お客',ko:'손님',en:'Customer'}},
 lines:[
  {r:'A',ja:'いらっしゃいませ。お弁当、温めますか。',jr:'いらっしゃいませ。おべんとう、あたため ますか。',ko:'어서 오세요. 도시락 데워 드릴까요?',en:'Hello. Would you like your lunch heated up?',
   note:{ja:'日本のコンビニでよく聞く質問です。',ko:'일본 편의점에서 자주 듣는 질문입니다.',en:'You will hear this question at almost every convenience store in Japan.'}},
  {r:'B',ja:'はい、お願いします。',jr:'はい、おねがい します。',ko:'네, 부탁드려요.',en:'Yes, please.',
   alt:[{ja:'いえ、そのままで大丈夫です。',jr:'いえ、その ままで だいじょうぶ です。',ko:'아니요, 그냥 주셔도 돼요.',en:'No, it’s fine as it is.'}]},
  {r:'A',ja:'袋はご利用ですか。',jr:'ふくろは ごりよう ですか。',ko:'봉투 필요하세요?',en:'Do you need a bag?'},
  {r:'B',ja:'いいえ、けっこうです。',jr:'いいえ、けっこう です。',ko:'아니요, 괜찮아요.',en:'No, thank you.',
   alt:[{ja:'はい、1つください。',jr:'はい、ひとつ ください。',ko:'네, 하나 주세요.',en:'Yes, one please.'}]},
  {r:'A',ja:'お箸は何膳おつけしますか。',jr:'おはしは なんぜん おつけ しますか。',ko:'젓가락은 몇 개 넣어 드릴까요?',en:'How many pairs of chopsticks would you like?'},
  {r:'B',ja:'1つお願いします。',jr:'ひとつ おねがい します。',ko:'하나 주세요.',en:'Just one, please.'},
  {r:'A',ja:'お会計、780円です。',jr:'おかいけい、ななひゃく はちじゅう えん です。',ko:'모두 780엔입니다.',en:'That will be 780 yen.'},
  {r:'B',ja:'カードで払えますか。',jr:'カードで はらえ ますか。',ko:'카드로 계산할 수 있어요?',en:'Can I pay by card?'},
  {r:'A',ja:'はい、こちらにかざしてください。ありがとうございました。',jr:'はい、こちらに かざして ください。ありがとう ございました。',ko:'네, 여기에 대 주세요. 감사합니다.',en:'Yes, please tap it here. Thank you very much.'}
 ],
 check:[
  {q:{ja:'「お弁当、温めますか」と聞かれました。温めてほしいときは？',ko:'“도시락 데워 드릴까요?”라고 물었습니다. 데워 달라고 할 때는?',en:'The clerk asks, “Would you like it heated?” You want it warm. What do you say?'},
   opts:[{ja:'はい、お願いします。',ko:'네, 부탁드려요.',en:'Yes, please.'},
    {ja:'いいえ、けっこうです。',ko:'아니요, 괜찮아요.',en:'No, thank you.'},
    {ja:'カードで払えますか。',ko:'카드로 계산할 수 있어요?',en:'Can I pay by card?'}],a:0},
  {q:{ja:'袋はいりません。何と言いますか。',ko:'봉투는 필요 없습니다. 뭐라고 말합니까?',en:'You don’t need a bag. What do you say?'},
   opts:[{ja:'1つお願いします。',ko:'하나 주세요.',en:'One, please.'},
    {ja:'いいえ、けっこうです。',ko:'아니요, 괜찮아요.',en:'No, thank you.'},
    {ja:'温めてください。',ko:'데워 주세요.',en:'Please heat it up.'}],a:1}
 ]},

{id:'life-restaurant-1',cat:'life',lv:1,
 ai:{goal:{ja:'おすすめを聞いて、卵の入っていない料理を選んで注文する。',ko:'추천 메뉴를 묻고 달걀이 들어가지 않은 요리를 골라 주문한다.',en:'Ask for recommendations and order a dish without egg.'},
    twist:{ja:'おすすめの料理にも、卵が少し入っている。',ko:'추천 요리에도 달걀이 조금 들어간다.',en:'The recommended dish also contains a little egg.'}},
 title:{ja:'食堂で注文する',ko:'식당에서 주문하기',en:'Ordering at a restaurant'},
 scene:{ja:'友達と食堂に入り、おすすめを聞いて注文します。友達は卵が食べられません。',ko:'친구와 식당에 들어가 추천 메뉴를 묻고 주문합니다. 친구는 달걀을 못 먹습니다.',en:'You go into a restaurant with a friend, ask for a recommendation and order. Your friend can’t eat eggs.'},
 roles:{A:{ja:'店員',ko:'점원',en:'Server'},B:{ja:'お客',ko:'손님',en:'Customer'}},
 lines:[
  {r:'A',ja:'いらっしゃいませ。何名様ですか。',jr:'いらっしゃいませ。なんめいさま ですか。',ko:'어서 오세요. 몇 분이세요?',en:'Welcome. How many people?'},
  {r:'B',ja:'2人です。窓側の席は空いていますか。',jr:'ふたり です。まどがわの せきは あいて いますか。',ko:'두 명이요. 창가 자리 비어 있나요?',en:'Two. Is there a table by the window?'},
  {r:'A',ja:'はい、こちらへどうぞ。ご注文がお決まりになりましたら、お呼びください。',jr:'はい、こちらへ どうぞ。ごちゅうもんが おきまりに なりましたら、および ください。',ko:'네, 이쪽으로 오세요. 주문 정하시면 불러 주세요.',en:'Yes, this way, please. Call me when you’re ready to order.'},
  {r:'B',ja:'すみません。おすすめは何ですか。',jr:'すみません。おすすめは なん ですか。',ko:'저기요, 추천 메뉴가 뭐예요?',en:'Excuse me. What do you recommend?',
   alt:[{ja:'この店でいちばん人気の料理はどれですか。',jr:'この みせで いちばん にんきの りょうりは どれ ですか。',ko:'이 가게에서 제일 인기 있는 요리가 뭐예요?',en:'What’s the most popular dish here?'}]},
  {r:'A',ja:'本日の魚の定食がおすすめです。焼き魚に、ご飯とみそ汁がつきます。',jr:'ほんじつの さかなの ていしょくが おすすめ です。やきざかなに、ごはんと みそしるが つき ます。',ko:'오늘의 생선 정식을 추천해 드려요. 생선구이에 밥과 된장국이 같이 나와요.',en:'I’d recommend today’s fish set meal. It’s grilled fish with rice and miso soup.'},
  {r:'B',ja:'じゃあ、それを一つと……卵を使っていない料理はありますか。連れが卵を食べられないんです。',jr:'じゃあ、それを ひとつと……たまごを つかって いない りょうりは あり ますか。つれが たまごを たべられないん です。',ko:'그럼 그거 하나랑…… 달걀이 안 들어간 요리 있어요? 일행이 달걀을 못 먹어서요.',en:'Then one of those, and… is there anything without egg? My friend can’t eat eggs.',
   note:{ja:'食べられない物は、理由といっしょに早めに伝えると安心です。',ko:'못 먹는 음식은 이유와 함께 미리 말하면 안심입니다.',en:'Mention food someone can’t eat early, together with the reason.'}},
  {r:'A',ja:'確認してまいります。……こちらのうどんでしたら、卵は使っていません。',jr:'かくにん して まいり ます。……こちらの うどん でしたら、たまごは つかって いません。',ko:'확인하고 오겠습니다. ……이 우동이라면 달걀이 들어가지 않습니다.',en:'Let me check. … This udon doesn’t contain any egg.'},
  {r:'B',ja:'では、それをお願いします。',jr:'では、それを おねがい します。',ko:'그럼 그걸로 주세요.',en:'Then we’ll have that, please.',
   alt:[{ja:'それにします。お水も二つください。',jr:'それに します。おみずも ふたつ ください。',ko:'그걸로 할게요. 물도 두 잔 주세요.',en:'We’ll take that. And two glasses of water, please.'}]},
  {r:'B',ja:'お会計をお願いします。別々に払えますか。',jr:'おかいけいを おねがい します。べつべつに はらえ ますか。',ko:'계산해 주세요. 따로 계산할 수 있어요?',en:'Could we have the bill, please? Can we pay separately?'},
  {r:'A',ja:'はい、大丈夫です。入り口の近くで、お一人ずつお支払いください。',jr:'はい、だいじょうぶ です。いりぐちの ちかくで、おひとり ずつ おしはらい ください。',ko:'네, 됩니다. 입구 쪽에서 한 분씩 계산해 주세요.',en:'Yes, that’s fine. Please pay one at a time near the entrance.'}
 ],
 check:[
  {q:{ja:'何を頼めばいいか、店の人に聞きたいです。',ko:'무엇을 시킬지 점원에게 묻고 싶습니다.',en:'You want to ask the server what to order.'},
   opts:[{ja:'これはいくらですか。',ko:'이거 얼마예요?',en:'How much is this?'},{ja:'お会計をお願いします。',ko:'계산해 주세요.',en:'The bill, please.'},{ja:'おすすめは何ですか。',ko:'추천 메뉴가 뭐예요?',en:'What do you recommend?'}],a:2},
  {q:{ja:'友達は卵が食べられません。何と聞きますか。',ko:'친구가 달걀을 못 먹습니다. 뭐라고 묻습니까?',en:'Your friend can’t eat eggs. What do you ask?'},
   opts:[{ja:'卵を使っていない料理はありますか。',ko:'달걀이 안 들어간 요리 있어요?',en:'Is there anything without egg?'},{ja:'卵料理を二つください。',ko:'달걀 요리 두 개 주세요.',en:'Two egg dishes, please.'},{ja:'何名様ですか。',ko:'몇 분이세요?',en:'How many people?'}],a:0}
 ]},

{id:'life-clinic-1',cat:'life',lv:2,
 ai:{goal:{ja:'具合と、いつからかを伝えて、受付を済ませる。',ko:'증상과 언제부터인지 말하고 접수를 마친다.',en:'Describe your symptoms and when they started, and finish registering.'},
    twist:{ja:'保険証を家に忘れてきた。',ko:'건강보험증을 집에 두고 왔다.',en:'You have left your health insurance card at home.'}},
 title:{ja:'医院の受付',ko:'병원 접수',en:'At the clinic reception'},
 scene:{ja:'熱が出たので、近くの医院に初めて行きます。受付で具合を伝えます。',ko:'열이 나서 근처 병원에 처음 갑니다. 접수처에서 증상을 말합니다.',en:'You have a fever and visit a local clinic for the first time. You explain your symptoms at reception.'},
 roles:{A:{ja:'受付の係',ko:'접수 직원',en:'Receptionist'},B:{ja:'患者',ko:'환자',en:'Patient'}},
 lines:[
  {r:'B',ja:'すみません。初めてなんですが、診てもらえますか。',jr:'すみません。はじめて なん ですが、みて もらえ ますか。',ko:'저기요, 처음 왔는데 진료받을 수 있을까요?',en:'Excuse me, it’s my first time here. Could I see a doctor?'},
  {r:'A',ja:'はい。保険証をお持ちですか。',jr:'はい。ほけんしょうを おもち ですか。',ko:'네. 건강보험증 갖고 계세요?',en:'Yes. Do you have your health insurance card?',
   note:{ja:'日本の医院では、受付で健康保険の証明を見せるのがふつうです。',ko:'일본 병원에서는 접수할 때 건강보험 증명을 보여 주는 것이 보통입니다.',en:'In Japan you usually show proof of health insurance at reception.'}},
  {r:'B',ja:'はい、これです。',jr:'はい、これ です。',ko:'네, 여기요.',en:'Yes, here it is.'},
  {r:'A',ja:'ありがとうございます。こちらの問診票に、今日の具合を書いてください。',jr:'ありがとう ございます。こちらの もんしんひょうに、きょうの ぐあいを かいて ください。',ko:'감사합니다. 이 문진표에 오늘 증상을 적어 주세요.',en:'Thank you. Please fill in this form about how you’re feeling today.'},
  {r:'B',ja:'書き方がよくわからないので、口で説明してもいいですか。',jr:'かきかたが よく わからない ので、くちで せつめい しても いい ですか。',ko:'어떻게 쓰는지 잘 몰라서 그러는데, 말로 설명해도 될까요?',en:'I’m not sure how to fill this in. May I just tell you?'},
  {r:'A',ja:'もちろんです。どうされましたか。',jr:'もちろん です。どう されましたか。',ko:'물론이죠. 어디가 불편하세요?',en:'Of course. What seems to be the problem?'},
  {r:'B',ja:'きのうの夜から熱があって、のどが痛いです。熱は38度ありました。',jr:'きのうの よる から ねつが あって、のどが いたい です。ねつは さんじゅうはち ど ありました。',ko:'어젯밤부터 열이 나고 목이 아파요. 열은 38도였어요.',en:'I’ve had a fever since last night and a sore throat. My temperature was 38 degrees.',
   alt:[{ja:'おとといから、せきが止まりません。',jr:'おととい から、せきが とまり ません。',ko:'그저께부터 기침이 멈추지 않아요.',en:'I’ve had a cough that won’t stop since the day before yesterday.'}],
   note:{ja:'「いつから」「どこが」「どのくらい」の三つを言うと、よく伝わります。',ko:'“언제부터”, “어디가”, “얼마나” 세 가지를 말하면 잘 전달됩니다.',en:'Say when it started, where it hurts and how bad it is.'}},
  {r:'A',ja:'わかりました。飲んでいる薬や、アレルギーはありますか。',jr:'わかりました。のんで いる くすりや、アレルギーは あり ますか。',ko:'알겠습니다. 드시는 약이나 알레르기가 있으세요?',en:'I see. Are you taking any medicine, or do you have any allergies?'},
  {r:'B',ja:'薬は飲んでいません。アレルギーもありません。',jr:'くすりは のんで いません。アレルギーも あり ません。',ko:'먹는 약은 없어요. 알레르기도 없어요.',en:'I’m not taking anything, and I have no allergies.'},
  {r:'A',ja:'では、お名前を呼ぶまで、あちらでお待ちください。',jr:'では、おなまえを よぶ まで、あちらで おまち ください。',ko:'그럼 이름을 부를 때까지 저쪽에서 기다려 주세요.',en:'Then please wait over there until we call your name.'}
 ],
 check:[
  {q:{ja:'具合を伝えます。いちばんよく伝わる言い方は？',ko:'증상을 말합니다. 가장 잘 전달되는 말은?',en:'You describe how you feel. Which is clearest?'},
   opts:[{ja:'具合が悪いです。',ko:'몸이 안 좋아요.',en:'I feel bad.'},{ja:'きのうの夜から熱があって、のどが痛いです。',ko:'어젯밤부터 열이 나고 목이 아파요.',en:'I’ve had a fever since last night and a sore throat.'},{ja:'薬をください。',ko:'약 주세요.',en:'Give me medicine.'}],a:1},
  {q:{ja:'「アレルギーはありますか」と聞かれました。ないときは？',ko:'“알레르기 있으세요?”라는 질문을 받았습니다. 없을 때는?',en:'You’re asked about allergies. You don’t have any. What do you say?'},
   opts:[{ja:'アレルギーはありません。',ko:'알레르기는 없어요.',en:'I don’t have any allergies.'},{ja:'はい、熱があります。',ko:'네, 열이 있어요.',en:'Yes, I have a fever.'},{ja:'保険証です。',ko:'보험증이요.',en:'Here’s my insurance card.'}],a:0}
 ]},

{id:'life-phone-booking-1',cat:'life',lv:2,
 ai:{goal:{ja:'日時・人数・名前を伝えて、予約を取る。',ko:'날짜와 시간, 인원, 이름을 말하고 예약한다.',en:'Give the date, time, number of people and your name, and make the booking.'},
    twist:{ja:'7時は満席で、6時か8時半なら空いている。',ko:'7시는 만석이고, 6시나 8시 반이면 자리가 있다.',en:'7 o’clock is fully booked, but 6 or 8:30 is free.'}},
 title:{ja:'電話で店を予約する',ko:'전화로 가게 예약하기',en:'Booking a table by phone'},
 scene:{ja:'土曜日の夜、4人で食事をするために、電話で店を予約します。',ko:'토요일 저녁 네 명이 식사하려고 전화로 가게를 예약합니다.',en:'You phone a restaurant to book dinner for four on Saturday.'},
 roles:{A:{ja:'店の人',ko:'가게 직원',en:'Restaurant staff'},B:{ja:'電話をかける人',ko:'전화 거는 사람',en:'Caller'}},
 lines:[
  {r:'A',ja:'お電話ありがとうございます。さくら食堂でございます。',jr:'おでんわ ありがとう ございます。さくら しょくどう で ございます。',ko:'전화 감사합니다. 사쿠라 식당입니다.',en:'Thank you for calling. Sakura Diner speaking.'},
  {r:'B',ja:'もしもし、今週の土曜日に予約をしたいんですが。',jr:'もしもし、こんしゅうの どようびに よやくを したいん ですが。',ko:'여보세요, 이번 주 토요일에 예약하고 싶은데요.',en:'Hello, I’d like to make a reservation for this Saturday.',
   alt:[{ja:'土曜日の夜、席は空いていますか。',jr:'どようびの よる、せきは あいて いますか。',ko:'토요일 저녁에 자리 있나요?',en:'Do you have a table on Saturday evening?'}]},
  {r:'A',ja:'ありがとうございます。何時に、何名様でしょうか。',jr:'ありがとう ございます。なんじに、なんめいさま でしょうか。',ko:'감사합니다. 몇 시에 몇 분이신가요?',en:'Thank you. For what time, and how many people?'},
  {r:'B',ja:'夜7時に、4人でお願いします。',jr:'よる しちじに、よにんで おねがい します。',ko:'저녁 7시에 네 명이요.',en:'Seven in the evening, for four people.'},
  {r:'A',ja:'申し訳ございません。7時は満席でして、7時半でしたらご用意できます。',jr:'もうしわけ ございません。しちじは まんせき でして、しちじ はん でしたら ごようい できます。',ko:'죄송합니다. 7시는 자리가 다 찼고, 7시 반이라면 가능합니다.',en:'I’m sorry, we’re fully booked at seven, but we can seat you at half past.'},
  {r:'B',ja:'では、7時半でお願いします。',jr:'では、しちじ はんで おねがい します。',ko:'그럼 7시 반으로 해 주세요.',en:'Then half past seven, please.',
   alt:[{ja:'それなら、6時は空いていますか。',jr:'それ なら、ろくじは あいて いますか。',ko:'그럼 6시는 비어 있나요?',en:'In that case, is six o’clock available?'}]},
  {r:'A',ja:'かしこまりました。お名前とお電話番号をお願いします。',jr:'かしこまり ました。おなまえと おでんわ ばんごうを おねがい します。',ko:'알겠습니다. 성함과 전화번호를 알려 주세요.',en:'Certainly. May I have your name and phone number?'},
  {r:'B',ja:'パクです。番号は、090の1234の5678です。',jr:'パク です。ばんごうは、ぜろきゅうぜろの いちにさんよんの ごろくななはち です。',ko:'박이라고 합니다. 번호는 090-1234-5678이에요.',en:'It’s Park. My number is 090-1234-5678.',
   note:{ja:'電話では、数字を区切ってゆっくり言うと、聞きまちがいが減ります。',ko:'전화로는 숫자를 끊어서 천천히 말하면 잘못 듣는 일이 줄어듭니다.',en:'On the phone, say numbers slowly in groups to avoid mistakes.'}},
  {r:'A',ja:'土曜日の夜7時半、4名様、パク様ですね。お待ちしております。',jr:'どようびの よる しちじ はん、よんめいさま、パクさま ですね。おまち して おり ます。',ko:'토요일 저녁 7시 반, 네 분, 박 님 맞으시죠? 기다리겠습니다.',en:'Saturday at 7:30 p.m., four people, under Park. We look forward to seeing you.'}
 ],
 check:[
  {q:{ja:'電話で予約をはじめます。最初に何と言いますか。',ko:'전화로 예약을 시작합니다. 먼저 뭐라고 말합니까?',en:'You start booking on the phone. What do you say first?'},
   opts:[{ja:'何名様ですか。',ko:'몇 분이세요?',en:'How many people?'},{ja:'今週の土曜日に予約をしたいんですが。',ko:'이번 주 토요일에 예약하고 싶은데요.',en:'I’d like to make a reservation for this Saturday.'},{ja:'お待ちしております。',ko:'기다리겠습니다.',en:'We look forward to seeing you.'}],a:1},
  {q:{ja:'7時は満席と言われました。別の時間を聞くには？',ko:'7시는 만석이라고 합니다. 다른 시간을 물으려면?',en:'Seven is fully booked. How do you ask about another time?'},
   opts:[{ja:'それなら、6時は空いていますか。',ko:'그럼 6시는 비어 있나요?',en:'In that case, is six o’clock available?'},{ja:'じゃあ、行きません。',ko:'그럼 안 갈게요.',en:'Then we won’t come.'},{ja:'7時にしてください。',ko:'7시로 해 주세요.',en:'Make it seven anyway.'}],a:0}
 ]},

{id:'life-ward-office-1',cat:'life',lv:2,
 ai:{goal:{ja:'必要な書類を出して、住所の届けを済ませる。',ko:'필요한 서류를 내고 전입 신고를 마친다.',en:'Hand in the right documents and complete your change of address.'},
    twist:{ja:'前に住んでいた町の役所でもらう書類を、持ってきていない。',ko:'전에 살던 곳의 관공서에서 받아야 하는 서류를 가져오지 않았다.',en:'You haven’t brought the document you were supposed to get from your previous town office.'}},
 title:{ja:'区役所で住所の届けを出す',ko:'구청에서 전입 신고하기',en:'Registering your address at the ward office'},
 scene:{ja:'引っ越してきたので、区役所の窓口で新しい住所の届けを出します。',ko:'이사를 와서 구청 창구에서 새 주소를 신고합니다.',en:'You’ve just moved, so you register your new address at the ward office counter.'},
 roles:{A:{ja:'区役所の窓口の係',ko:'구청 창구 직원',en:'Ward office clerk'},B:{ja:'住民',ko:'주민',en:'Resident'}},
 lines:[
  {r:'B',ja:'すみません。引っ越してきたので、住所の届けを出したいんですが。',jr:'すみません。ひっこして きた ので、じゅうしょの とどけを だしたいん ですが。',ko:'저기요, 이사를 와서 주소 신고를 하고 싶은데요.',en:'Excuse me. I’ve just moved here, and I’d like to register my new address.'},
  {r:'A',ja:'転入の届けですね。前に住んでいた市から、転出の証明書をもらってきましたか。',jr:'てんにゅうの とどけ ですね。まえに すんで いた しから、てんしゅつの しょうめいしょを もらって きましたか。',ko:'전입 신고시군요. 전에 살던 시에서 전출 증명서를 받아 오셨나요?',en:'A moving-in notice, then. Did you get a moving-out certificate from your previous city?',
   note:{ja:'日本では、前の市区町村で「転出」、新しいところで「転入」の届けを出します。',ko:'일본에서는 전에 살던 시구정촌에 ‘전출’, 새로 사는 곳에 ‘전입’ 신고를 합니다.',en:'In Japan you file a moving-out notice at your old city office and a moving-in notice at the new one.'}},
  {r:'B',ja:'はい、これです。在留カードもあります。',jr:'はい、これ です。ざいりゅう カードも あり ます。',ko:'네, 여기 있어요. 재류카드도 있어요.',en:'Yes, here it is. I have my residence card too.'},
  {r:'A',ja:'ありがとうございます。では、こちらの用紙に、新しい住所と引っ越した日を書いてください。',jr:'ありがとう ございます。では、こちらの ようしに、あたらしい じゅうしょと ひっこした ひを かいて ください。',ko:'감사합니다. 그럼 이 서류에 새 주소와 이사한 날짜를 적어 주세요.',en:'Thank you. Please write your new address and the date you moved on this form.'},
  {r:'B',ja:'わからないところがあります。ここは何を書けばいいですか。',jr:'わからない ところが あり ます。ここは なにを かけば いい ですか。',ko:'모르는 부분이 있어요. 여기는 뭘 쓰면 되나요?',en:'There’s a part I don’t understand. What should I write here?',
   alt:[{ja:'すみません、この欄の意味を教えていただけますか。',jr:'すみません、この らんの いみを おしえて いただけ ますか。',ko:'죄송한데 이 칸이 무슨 뜻인지 알려 주실 수 있나요?',en:'Sorry, could you tell me what this box means?'}]},
  {r:'A',ja:'そこは「世帯主」、つまり家の代表の方の名前です。お一人でお住まいなら、ご自分の名前を書いてください。',jr:'そこは「せたいぬし」、つまり いえの だいひょうの かたの なまえ です。おひとりで おすまい なら、ごじぶんの なまえを かいて ください。',ko:'거기는 ‘세대주’, 즉 가구 대표의 이름입니다. 혼자 사시면 본인 이름을 쓰세요.',en:'That’s the “head of household” — the main person in your home. If you live alone, write your own name.'},
  {r:'B',ja:'わかりました。……これで大丈夫ですか。',jr:'わかりました。……これで だいじょうぶ ですか。',ko:'알겠습니다. ……이렇게 하면 될까요?',en:'I see. … Is this all right?'},
  {r:'A',ja:'はい、大丈夫です。番号札を取って、呼ばれるまでお待ちください。15分ほどかかります。',jr:'はい、だいじょうぶ です。ばんごうふだを とって、よばれる まで おまち ください。じゅうごふん ほど かかり ます。',ko:'네, 됐습니다. 번호표를 뽑고 호출될 때까지 기다려 주세요. 15분 정도 걸립니다.',en:'Yes, that’s fine. Please take a number and wait until you’re called. It takes about fifteen minutes.'}
 ],
 check:[
  {q:{ja:'区役所の窓口で、何をしに来たかを伝えます。',ko:'구청 창구에서 무슨 일로 왔는지 말합니다.',en:'At the ward office counter, you explain why you’ve come.'},
   opts:[{ja:'番号札をください。',ko:'번호표 주세요.',en:'Give me a number.'},{ja:'ここは何階ですか。',ko:'여기 몇 층이에요?',en:'Which floor is this?'},{ja:'引っ越してきたので、住所の届けを出したいんですが。',ko:'이사를 와서 주소 신고를 하고 싶은데요.',en:'I’ve just moved here and I’d like to register my address.'}],a:2},
  {q:{ja:'用紙の書き方がわからないところがあります。',ko:'서류에 쓰는 법을 모르는 부분이 있습니다.',en:'There’s a part of the form you don’t understand.'},
   opts:[{ja:'ここは何を書けばいいですか。',ko:'여기는 뭘 쓰면 되나요?',en:'What should I write here?'},{ja:'もう帰ってもいいですか。',ko:'이제 가도 돼요?',en:'Can I go home now?'},{ja:'これは要りません。',ko:'이건 필요 없어요.',en:'I don’t need this.'}],a:0}
 ]},

{id:'life-neighbor-1',cat:'life',lv:1,
 ai:{goal:{ja:'あいさつをして、ごみの日など暮らしのことを1つ聞く。',ko:'인사를 하고 쓰레기 버리는 날 같은 생활 정보를 하나 묻는다.',en:'Say hello and ask one thing about daily life, such as rubbish days.'},
    twist:{ja:'となりの人が、夜の物音を少し気にしていると話す。',ko:'옆집 사람이 밤에 나는 소리가 조금 신경 쓰인다고 말한다.',en:'Your neighbour mentions that noise at night bothers them a little.'}},
 title:{ja:'となりの人にあいさつ',ko:'옆집에 이사 인사하기',en:'Saying hello to a new neighbour'},
 scene:{ja:'引っ越した次の日、となりの部屋の人にあいさつに行きます。',ko:'이사한 다음 날, 옆집 사람에게 인사하러 갑니다.',en:'The day after moving in, you go next door to say hello.'},
 roles:{A:{ja:'引っ越してきた人',ko:'이사 온 사람',en:'New resident'},B:{ja:'となりの人',ko:'옆집 사람',en:'Next-door neighbour'}},
 lines:[
  {r:'A',ja:'こんにちは。きのう、となりの302号室に引っ越してきた、イ・ジュンです。',jr:'こんにちは。きのう、となりの さんまる にごうしつに ひっこして きた、イ・ジュン です。',ko:'안녕하세요. 어제 옆집 302호로 이사 온 이준이라고 합니다.',en:'Hello. I’m Lee Jun. I moved into number 302 next door yesterday.'},
  {r:'B',ja:'あら、こんにちは。山田です。よろしくお願いします。',jr:'あら、こんにちは。やまだ です。よろしく おねがい します。',ko:'어머, 안녕하세요. 야마다예요. 잘 부탁해요.',en:'Oh, hello. I’m Yamada. Nice to meet you.'},
  {r:'A',ja:'これ、つまらない物ですが、よろしければどうぞ。',jr:'これ、つまらない もの ですが、よろしければ どうぞ。',ko:'이거 별건 아니지만, 괜찮으시면 받아 주세요.',en:'This is just a little something — please accept it.',
   alt:[{ja:'ほんの気持ちですが、受け取ってください。',jr:'ほんの きもち ですが、うけとって ください。',ko:'작은 성의지만 받아 주세요.',en:'It’s only a small token, but please take it.'}],
   note:{ja:'日本では引っ越しのあいさつに、タオルやお菓子など小さな品を渡すことがあります。',ko:'일본에서는 이사 인사로 수건이나 과자 같은 작은 선물을 건네기도 합니다.',en:'In Japan people often bring a small gift, such as a towel or sweets, when greeting neighbours after a move.'}},
  {r:'B',ja:'まあ、ご丁寧にありがとうございます。お一人ですか。',jr:'まあ、ごていねいに ありがとう ございます。おひとり ですか。',ko:'어머, 이렇게까지 고마워요. 혼자 사세요?',en:'Oh, how kind of you. Are you living on your own?'},
  {r:'A',ja:'はい。仕事の都合で、こちらに来ました。わからないことが多いので、いろいろ教えてください。',jr:'はい。しごとの つごうで、こちらに きました。わからない ことが おおい ので、いろいろ おしえて ください。',ko:'네. 일 때문에 이쪽으로 왔어요. 모르는 게 많으니 이것저것 알려 주세요.',en:'Yes. I moved here for work. There’s a lot I don’t know yet, so I’d be grateful for any tips.'},
  {r:'B',ja:'ええ、もちろん。ごみの日はもう知っていますか。燃えるごみは、月曜と木曜の朝ですよ。',jr:'ええ、もちろん。ごみの ひは もう しって いますか。もえる ごみは、げつようと もくようの あさ ですよ。',ko:'그럼요. 쓰레기 버리는 날은 아세요? 타는 쓰레기는 월요일이랑 목요일 아침이에요.',en:'Of course. Do you know the rubbish days yet? Burnable rubbish goes out on Monday and Thursday mornings.'},
  {r:'A',ja:'そうなんですね。助かります。夜はなるべく静かにしますので。',jr:'そう なん ですね。たすかり ます。よるは なるべく しずかに します ので。',ko:'그렇군요. 도움이 돼요. 밤에는 되도록 조용히 지낼게요.',en:'I see. That’s really helpful. I’ll try to keep things quiet at night.'},
  {r:'B',ja:'ありがとう。何かあったら、いつでも声をかけてくださいね。',jr:'ありがとう。なにか あったら、いつでも こえを かけて くださいね。',ko:'고마워요. 무슨 일 있으면 언제든지 말해 주세요.',en:'Thank you. If you need anything, just knock any time.',
   alt:[{ja:'困ったときは、遠慮しないでね。',jr:'こまった ときは、えんりょ しないでね。',ko:'곤란할 때는 사양하지 말고요.',en:'Don’t hesitate if you’re ever stuck.'}]}
 ],
 check:[
  {q:{ja:'となりの人に、初めてあいさつします。',ko:'옆집 사람에게 처음 인사합니다.',en:'You greet your neighbour for the first time.'},
   opts:[{ja:'となりの302号室に引っ越してきた、イ・ジュンです。',ko:'옆집 302호로 이사 온 이준이라고 합니다.',en:'I’m Lee Jun. I moved into 302 next door.'},{ja:'ごみの日はいつですか。',ko:'쓰레기 버리는 날이 언제예요?',en:'When is rubbish day?'},{ja:'静かにしてください。',ko:'조용히 해 주세요.',en:'Please be quiet.'}],a:0},
  {q:{ja:'小さな品を渡すときのひと言は？',ko:'작은 선물을 건넬 때 하는 말은?',en:'What do you say when handing over a small gift?'},
   opts:[{ja:'これ、高かったんです。',ko:'이거 비싼 거예요.',en:'This was expensive.'},{ja:'つまらない物ですが、よろしければどうぞ。',ko:'별건 아니지만, 괜찮으시면 받아 주세요.',en:'It’s just a little something — please accept it.'},{ja:'あとで返してください。',ko:'나중에 돌려주세요.',en:'Please give it back later.'}],a:1}
 ]},

/* ───────── 職場の会話（office） ───────── */
{id:'off-intro-1',cat:'office',lv:1,
 ai:{goal:{ja:'名前・前の仕事・ひとことを伝えて、よい印象を残す。',ko:'이름, 전에 하던 일, 한마디 인사를 하고 좋은 인상을 남긴다.',en:'Give your name, your previous job and a short greeting, and make a good impression.'},
    twist:{ja:'課長が、みんなの前で「趣味は何ですか」と聞く。',ko:'과장이 모두 앞에서 “취미가 뭐예요?”라고 묻는다.',en:'Your manager asks “What are your hobbies?” in front of everyone.'}},
 title:{ja:'初日の自己紹介',ko:'첫 출근 자기소개',en:'Introducing yourself on day one'},
 scene:{ja:'新しい職場の初日。課長が部署のみんなに紹介してくれます。',ko:'새 직장 첫날. 과장님이 부서 사람들에게 소개해 줍니다.',en:'Your first day at a new job. The manager introduces you to the team.'},
 roles:{A:{ja:'新しく入った人',ko:'새로 온 직원',en:'New employee'},B:{ja:'課長',ko:'과장',en:'Manager'}},
 lines:[
  {r:'B',ja:'みなさん、ちょっといいですか。今日から営業部に入ったキムさんです。',jr:'みなさん、ちょっと いい ですか。きょう から えいぎょうぶに はいった キムさん です。',ko:'여러분, 잠깐 주목해 주세요. 오늘부터 영업부에 합류한 김소연 씨입니다.',en:'Everyone, may I have your attention? This is Ms Kim, who joins the sales team today.'},
  {r:'A',ja:'はじめまして。キム・ソヨンと申します。前は旅行会社で、団体旅行の手配をしていました。',jr:'はじめまして。キム・ソヨンと もうし ます。まえは りょこう がいしゃで、だんたい りょこうの てはいを して いました。',ko:'처음 뵙겠습니다. 김소연이라고 합니다. 전에는 여행사에서 단체 여행 수배 업무를 했습니다.',en:'Nice to meet you all. I’m Kim Soyeon. I used to arrange group tours at a travel agency.',
   note:{ja:'名前・前の仕事・ひと言の意気込み、の順に短くまとめると聞きやすくなります。',ko:'이름, 이전 업무, 한마디 각오 순으로 짧게 정리하면 듣기 편합니다.',en:'Keep it short: your name, what you did before, and one line about what you hope to do.'}},
  {r:'A',ja:'わからないことが多く、ご迷惑をおかけするかもしれませんが、早く仕事を覚えたいと思います。どうぞよろしくお願いいたします。',jr:'わからない ことが おおく、ごめいわくを おかけ するかも しれません が、はやく しごとを おぼえたいと おもい ます。どうぞ よろしく おねがい いたし ます。',ko:'모르는 것이 많아 폐를 끼칠 수도 있지만, 빨리 업무를 익히겠습니다. 잘 부탁드립니다.',en:'There’s a lot I still need to learn, and I may need your help at first, but I’ll do my best to pick things up quickly. I look forward to working with you.',
   alt:[{ja:'一日も早くお役に立てるよう、がんばります。よろしくお願いします。',jr:'いちにちも はやく おやくに たてる よう、がんばり ます。よろしく おねがい します。',ko:'하루라도 빨리 도움이 될 수 있도록 열심히 하겠습니다. 잘 부탁드립니다.',en:'I’ll work hard to be useful as soon as I can. I look forward to working with you.'}]},
  {r:'B',ja:'キムさんの席は、佐藤さんのとなりです。佐藤さん、いろいろ教えてあげてください。',jr:'キムさんの せきは、さとうさんの となり です。さとうさん、いろいろ おしえて あげて ください。',ko:'김소연 씨 자리는 사토 씨 옆입니다. 사토 씨, 이것저것 알려 주세요.',en:'Ms Kim, you’ll sit next to Mr Sato. Mr Sato, please show her how things work.'},
  {r:'A',ja:'佐藤さん、これからお世話になります。',jr:'さとうさん、これから おせわに なり ます。',ko:'사토 씨, 앞으로 잘 부탁드립니다.',en:'Mr Sato, thank you in advance for all your help.'},
  {r:'B',ja:'キムさん、お昼はみんなで食べに行くことが多いので、よかったらいっしょにどうですか。',jr:'キムさん、おひるは みんなで たべに いく ことが おおい ので、よかったら いっしょに どう ですか。',ko:'김소연 씨, 점심은 다 같이 먹으러 가는 경우가 많은데, 괜찮으면 같이 갈래요?',en:'Ms Kim, we often go out for lunch together. Would you like to join us?'},
  {r:'A',ja:'ありがとうございます。ぜひごいっしょさせてください。',jr:'ありがとう ございます。ぜひ ごいっしょ させて ください。',ko:'감사합니다. 꼭 같이 가고 싶어요.',en:'Thank you. I’d love to join you.'}
 ],
 check:[
  {q:{ja:'初日のあいさつで名前を言います。ていねいな言い方は？',ko:'첫날 인사에서 이름을 말합니다. 정중한 말은?',en:'You give your name on day one. Which is polite?'},
   opts:[{ja:'キムだよ。',ko:'김이야.',en:'I’m Kim, yeah.'},{ja:'キム・ソヨンと申します。',ko:'김소연이라고 합니다.',en:'My name is Kim Soyeon.'},{ja:'名前はあとで言います。',ko:'이름은 나중에 말할게요.',en:'I’ll tell you my name later.'}],a:1},
  {q:{ja:'あいさつの終わりに言うのは？',ko:'인사 마지막에 하는 말은?',en:'What do you say to end your introduction?'},
   opts:[{ja:'どうぞよろしくお願いいたします。',ko:'잘 부탁드립니다.',en:'I look forward to working with you.'},{ja:'以上です。',ko:'이상입니다.',en:'That’s all.'},{ja:'早く帰りたいです。',ko:'빨리 집에 가고 싶어요.',en:'I want to go home early.'}],a:0}
 ]},

{id:'off-meeting-phone-1',cat:'office',lv:2,
 ai:{goal:{ja:'打ち合わせの日時と場所を決めて、確かめてから電話を終える。',ko:'회의 날짜와 장소를 정하고 확인한 뒤 전화를 끊는다.',en:'Agree on the date, time and place for the meeting, confirm them and end the call.'},
    twist:{ja:'相手が言った日には、こちらに別の予定がある。',ko:'상대가 말한 날에는 나에게 다른 일정이 있다.',en:'You already have something else on the day they suggest.'}},
 title:{ja:'電話で打ち合わせの日を決める',ko:'전화로 미팅 날짜 정하기',en:'Setting up a meeting by phone'},
 scene:{ja:'取引先に電話をかけて、来週の打ち合わせの日時と場所を決めます。',ko:'거래처에 전화해서 다음 주 미팅 일시와 장소를 정합니다.',en:'You call a business partner to set the date, time and place for next week’s meeting.'},
 roles:{A:{ja:'電話をかける人（青空商事）',ko:'전화 거는 사람(아오조라상사)',en:'Caller (Aozora Trading)'},B:{ja:'取引先の人（みどり物流）',ko:'거래처 직원(미도리물류)',en:'Partner (Midori Logistics)'}},
 lines:[
  {r:'B',ja:'はい、みどり物流、営業部の森でございます。',jr:'はい、みどり ぶつりゅう、えいぎょうぶの もり で ございます。',ko:'네, 미도리물류 영업부 모리입니다.',en:'Midori Logistics, sales department, Mori speaking.'},
  {r:'A',ja:'お世話になっております。青空商事のパクです。来週の打ち合わせの件でお電話しました。',jr:'おせわに なって おり ます。あおぞら しょうじの パク です。らいしゅうの うちあわせの けんで おでんわ しました。',ko:'늘 신세 많습니다. 아오조라상사의 박입니다. 다음 주 미팅 건으로 전화드렸습니다.',en:'Hello, this is Park from Aozora Trading. I’m calling about our meeting next week.',
   note:{ja:'「お世話になっております」は、取引先への電話のはじめに使う決まったあいさつです。',ko:'‘오세와니 낫테 오리마스’는 일본에서 거래처에 전화할 때 처음에 쓰는 정해진 인사입니다. 한국어로는 “늘 신세 많습니다”, “안녕하세요” 정도입니다.',en:'“Osewa ni natte orimasu” is the set greeting at the start of a business call in Japanese. In English, a simple “Hello, this is…” is enough.'}},
  {r:'B',ja:'パクさん、いつもお世話になっております。日にちを決めましょうか。',jr:'パクさん、いつも おせわに なって おり ます。ひにちを きめ ましょうか。',ko:'아, 박 님, 안녕하세요. 날짜를 정해 볼까요?',en:'Ah, Mr Park, good to hear from you. Shall we set a date?'},
  {r:'A',ja:'はい。来週の火曜日か水曜日の午後は、ご都合いかがでしょうか。',jr:'はい。らいしゅうの かようびか すいようびの ごごは、ごつごう いかが でしょうか。',ko:'네. 다음 주 화요일이나 수요일 오후는 어떠세요?',en:'Yes. Would Tuesday or Wednesday afternoon next week suit you?',
   alt:[{ja:'来週の火曜日の午後、お時間をいただけますか。',jr:'らいしゅうの かようびの ごご、おじかんを いただけ ますか。',ko:'다음 주 화요일 오후에 시간 괜찮으실까요?',en:'Could you spare some time on Tuesday afternoon next week?'}],
   note:{ja:'候補を二つ出すと、相手が選びやすくなります。',ko:'후보를 두 개 제시하면 상대가 고르기 쉽습니다.',en:'Offering two options makes it easy for the other person to choose.'}},
  {r:'B',ja:'火曜日は予定が入っておりまして……。水曜日の2時からでしたら大丈夫です。',jr:'かようびは よていが はいって おりまして……。すいようびの にじ から でしたら だいじょうぶ です。',ko:'화요일은 일정이 있어서요……. 수요일 2시부터라면 괜찮습니다.',en:'Tuesday is difficult, I’m afraid… but Wednesday from two would be fine.'},
  {r:'A',ja:'では、水曜日の2時から、1時間ほどでお願いします。場所は御社でよろしいですか。',jr:'では、すいようびの にじ から、いちじかん ほどで おねがい します。ばしょは おんしゃで よろしい ですか。',ko:'그럼 수요일 2시부터 1시간 정도로 부탁드립니다. 장소는 귀사로 하면 될까요?',en:'Then Wednesday from two, for about an hour. Shall we meet at your office?'},
  {r:'B',ja:'はい、こちらでお待ちしております。受付で私の名前をおっしゃってください。',jr:'はい、こちらで おまち して おり ます。うけつけで わたしの なまえを おっしゃって ください。',ko:'네, 저희 회사에서 기다리겠습니다. 안내 데스크에서 제 이름을 말씀해 주세요.',en:'Yes, we’ll expect you here. Please give my name at reception.'},
  {r:'A',ja:'承知しました。念のため、あとで内容をメールでもお送りします。',jr:'しょうち しました。ねんの ため、あとで ないようを メールでも おおくり します。',ko:'알겠습니다. 확인차 나중에 내용을 메일로도 보내 드리겠습니다.',en:'Understood. Just to be sure, I’ll send the details by email afterwards.',
   note:{ja:'電話で決めたことは、文字でも残すとまちがいが防げます。',ko:'전화로 정한 내용은 글로도 남겨 두면 실수를 막을 수 있습니다.',en:'Put what you agreed on the phone in writing as well.'}},
  {r:'B',ja:'ありがとうございます。では、水曜日によろしくお願いいたします。',jr:'ありがとう ございます。では、すいようびに よろしく おねがい いたし ます。',ko:'감사합니다. 그럼 수요일에 뵙겠습니다.',en:'Thank you. See you on Wednesday, then.'}
 ],
 check:[
  {q:{ja:'取引先に電話をかけて名乗るときは？',ko:'거래처에 전화해서 자신을 밝힐 때는?',en:'You call a business partner. How do you introduce yourself?'},
   opts:[{ja:'もしもし、パクだけど。',ko:'여보세요, 나 박인데.',en:'Hey, it’s Park.'},{ja:'どなたですか。',ko:'누구세요?',en:'Who is this?'},{ja:'お世話になっております。青空商事のパクです。',ko:'늘 신세 많습니다. 아오조라상사의 박입니다.',en:'Hello, this is Park from Aozora Trading.'}],a:2},
  {q:{ja:'打ち合わせの日を、相手に選んでもらいたいです。',ko:'미팅 날짜를 상대가 고르게 하고 싶습니다.',en:'You want the other person to choose the meeting day.'},
   opts:[{ja:'来週の火曜日か水曜日の午後は、ご都合いかがでしょうか。',ko:'다음 주 화요일이나 수요일 오후는 어떠세요?',en:'Would Tuesday or Wednesday afternoon next week suit you?'},{ja:'火曜日に来てください。',ko:'화요일에 오세요.',en:'Come on Tuesday.'},{ja:'いつでもいいです。',ko:'아무 때나 괜찮아요.',en:'Any time is fine.'}],a:0},
  {q:{ja:'電話で決めたことを、まちがえないようにしたいです。',ko:'전화로 정한 내용을 틀리지 않게 하고 싶습니다.',en:'You want to make sure nothing agreed on the call gets mixed up.'},
   opts:[{ja:'覚えておいてくださいね。',ko:'기억해 두세요.',en:'Please remember it.'},{ja:'念のため、あとで内容をメールでもお送りします。',ko:'확인차 나중에 내용을 메일로도 보내 드리겠습니다.',en:'Just to be sure, I’ll send the details by email afterwards.'},{ja:'それでは、また。',ko:'그럼 또 연락드릴게요.',en:'Bye, then.'}],a:1}
 ]},

{id:'off-help-1',cat:'office',lv:2,
 ai:{goal:{ja:'経費の精算のやり方を教えてもらい、お礼を言う。',ko:'경비 정산 방법을 배우고 고맙다고 말한다.',en:'Learn how to submit an expense claim and thank your colleague.'},
    twist:{ja:'領収書を1枚なくしてしまっている。',ko:'영수증을 한 장 잃어버렸다.',en:'You have lost one of the receipts.'}},
 title:{ja:'同僚に手伝いを頼む',ko:'동료에게 도움 부탁하기',en:'Asking a colleague for help'},
 scene:{ja:'経費の精算のやり方がわからず、先輩の同僚に聞きます。',ko:'경비 정산 방법을 몰라서 선배 동료에게 물어봅니다.',en:'You don’t know how to file an expense claim, so you ask a more experienced colleague.'},
 roles:{A:{ja:'自分',ko:'나',en:'You'},B:{ja:'先輩の同僚',ko:'선배 동료',en:'Senior colleague'}},
 lines:[
  {r:'A',ja:'中村さん、いま少しよろしいですか。',jr:'なかむらさん、いま すこし よろしい ですか。',ko:'나카무라 씨, 지금 잠깐 괜찮으세요?',en:'Ms Nakamura, do you have a moment?',
   alt:[{ja:'お忙しいところすみません。5分ほどいただけますか。',jr:'おいそがしい ところ すみません。ごふん ほど いただけ ますか。',ko:'바쁘신데 죄송해요. 5분 정도 시간 괜찮으세요?',en:'Sorry to bother you while you’re busy. Could I have five minutes?'}],
   note:{ja:'頼む前に、相手の都合を聞きます。',ko:'부탁하기 전에 상대의 상황을 먼저 묻습니다.',en:'Before asking for help, check it’s a good time.'}},
  {r:'B',ja:'うん、いいよ。どうしたの。',jr:'うん、いいよ。どう したの。',ko:'응, 괜찮아. 무슨 일이야?',en:'Sure. What’s up?',
   note:{ja:'親しい先輩は、くだけた言い方で答えることがあります。自分はていねいな言い方のままで大丈夫です。',ko:'친한 선배는 반말로 대답하기도 합니다. 나는 계속 존댓말을 써도 괜찮습니다.',en:'A friendly senior may answer casually. You can stay polite.'}},
  {r:'A',ja:'経費の精算のやり方がわからなくて……。一度見ていただけませんか。',jr:'けいひの せいさんの やりかたが わからなくて……。いちど みて いただけ ませんか。',ko:'경비 정산하는 방법을 몰라서요……. 한번 봐 주실 수 있을까요?',en:'I can’t work out how to do expense claims… Could you take a look with me?'},
  {r:'B',ja:'ああ、最初はわかりにくいよね。領収書はある？',jr:'ああ、さいしょは わかり にくいよね。りょうしゅうしょは ある？',ko:'아, 처음엔 헷갈리지. 영수증 있어?',en:'Ah, it’s confusing at first. Do you have the receipts?'},
  {r:'A',ja:'はい、ここにあります。どの欄に何を書けばいいかが、わからないんです。',jr:'はい、ここに あり ます。どの らんに なにを かけば いいかが、わからないん です。',ko:'네, 여기 있어요. 어느 칸에 뭘 써야 하는지 모르겠어요.',en:'Yes, here they are. I’m not sure what goes in which box.'},
  {r:'B',ja:'日付と金額を入れて、目的のところに「お客様との打ち合わせ」って書けば大丈夫。',jr:'ひづけと きんがくを いれて、もくてきの ところに「おきゃくさまとの うちあわせ」って かけば だいじょうぶ。',ko:'날짜랑 금액 넣고, 목적 칸에 ‘고객 미팅’이라고 쓰면 돼.',en:'Put in the date and amount, and under “purpose” just write “client meeting.” That’ll do.'},
  {r:'A',ja:'なるほど、よくわかりました。お忙しいのに、ありがとうございました。',jr:'なるほど、よく わかりました。おいそがしい のに、ありがとう ございました。',ko:'아, 이제 잘 알겠어요. 바쁘신데 감사합니다.',en:'I see, that makes sense now. Thank you for taking the time when you’re busy.',
   alt:[{ja:'助かりました。次からは自分でやってみます。',jr:'たすかり ました。つぎ からは じぶんで やって みます。',ko:'덕분에 살았어요. 다음부터는 혼자 해 볼게요.',en:'That helped a lot. I’ll try it on my own next time.'}]},
  {r:'B',ja:'いいよ、いつでも聞いて。',jr:'いいよ、いつでも きいて。',ko:'별거 아니야, 언제든 물어봐.',en:'No problem — ask any time.'}
 ],
 check:[
  {q:{ja:'忙しそうな先輩に質問したいです。最初のひと言は？',ko:'바빠 보이는 선배에게 질문하고 싶습니다. 첫 마디는?',en:'You want to ask a busy colleague something. What do you say first?'},
   opts:[{ja:'ちょっと、これ教えて。',ko:'저기, 이거 좀 알려 줘.',en:'Hey, tell me this.'},{ja:'中村さん、いま少しよろしいですか。',ko:'나카무라 씨, 지금 잠깐 괜찮으세요?',en:'Ms Nakamura, do you have a moment?'},{ja:'早く来てください。',ko:'빨리 와 주세요.',en:'Come here quickly.'}],a:1},
  {q:{ja:'手伝ってもらったあとのお礼は？',ko:'도움을 받은 뒤 감사 인사는?',en:'How do you thank them afterwards?'},
   opts:[{ja:'お忙しいのに、ありがとうございました。',ko:'바쁘신데 감사합니다.',en:'Thank you for taking the time when you’re busy.'},{ja:'これで終わりですか。',ko:'이게 끝이에요?',en:'Is that it?'},{ja:'最初から言ってくださいよ。',ko:'처음부터 말해 주지 그랬어요.',en:'You should have told me at the start.'}],a:0}
 ]},

{id:'off-smalltalk-1',cat:'office',lv:1,
 ai:{goal:{ja:'週末の話をして、相手にも質問を返す。',ko:'주말 이야기를 하고 상대에게도 질문을 돌려준다.',en:'Talk about your weekend and ask about theirs.'},
    twist:{ja:'同僚が、今度いっしょに行こうと誘ってくる。',ko:'동료가 다음에 같이 가자고 한다.',en:'Your colleague suggests going together next time.'}},
 title:{ja:'月曜の朝の雑談',ko:'월요일 아침 잡담',en:'Monday-morning small talk'},
 scene:{ja:'月曜の朝、同僚と週末の話をします。',ko:'월요일 아침, 동료와 주말 이야기를 합니다.',en:'On Monday morning, you chat with a colleague about the weekend.'},
 roles:{A:{ja:'同僚',ko:'동료',en:'Colleague'},B:{ja:'自分',ko:'나',en:'You'}},
 lines:[
  {r:'A',ja:'おはようございます。週末はどうでしたか。',jr:'おはよう ございます。しゅうまつは どう でしたか。',ko:'좋은 아침이에요. 주말 잘 보냈어요?',en:'Morning! How was your weekend?'},
  {r:'B',ja:'おはようございます。天気がよかったので、家族と海へ行ってきました。',jr:'おはよう ございます。てんきが よかった ので、かぞくと うみへ いって きました。',ko:'좋은 아침이에요. 날씨가 좋아서 가족이랑 바다에 다녀왔어요.',en:'Morning! The weather was nice, so I went to the seaside with my family.',
   alt:[{ja:'家でゆっくり休んでいました。',jr:'いえで ゆっくり やすんで いました。',ko:'집에서 푹 쉬었어요.',en:'I just relaxed at home.'}]},
  {r:'A',ja:'いいですね。どこの海ですか。',jr:'いい ですね。どこの うみ ですか。',ko:'좋네요. 어느 바다요?',en:'Nice! Where did you go?'},
  {r:'B',ja:'電車で1時間くらいの、小さな港町です。魚がとてもおいしかったです。',jr:'でんしゃで いちじかん くらいの、ちいさな みなとまち です。さかなが とても おいしかった です。',ko:'전철로 1시간쯤 걸리는 작은 항구 마을이에요. 생선이 정말 맛있었어요.',en:'A little harbour town about an hour away by train. The fish was really good.',
   note:{ja:'答えに一つ話題を足すと、会話が続きやすくなります。',ko:'대답에 화제를 하나 덧붙이면 대화가 이어지기 쉽습니다.',en:'Adding one extra detail to your answer keeps the conversation going.'}},
  {r:'A',ja:'へえ、今度行ってみたいです。あとで場所を教えてください。',jr:'へえ、こんど いって みたい です。あとで ばしょを おしえて ください。',ko:'와, 저도 다음에 가 보고 싶네요. 나중에 어딘지 알려 주세요.',en:'Oh, I’d like to go sometime. Tell me where it is later.'},
  {r:'B',ja:'ええ、ぜひ。小林さんは、週末どうでしたか。',jr:'ええ、ぜひ。こばやしさんは、しゅうまつ どう でしたか。',ko:'네, 꼭이요. 고바야시 씨는 주말 어땠어요?',en:'Sure! How about you, Mr Kobayashi? How was your weekend?',
   note:{ja:'聞かれたら、同じ質問を返すのが自然です。',ko:'질문을 받으면 같은 질문을 되돌려 주는 것이 자연스럽습니다.',en:'When someone asks you, it’s natural to ask the same question back.'}},
  {r:'A',ja:'子どものサッカーの試合で、一日中外にいました。',jr:'こどもの サッカーの しあいで、いちにちじゅう そとに いました。',ko:'아이 축구 시합이 있어서 하루 종일 밖에 있었어요.',en:'My kid had a football match, so I was outside all day.'},
  {r:'B',ja:'それはおつかれさまでした。さあ、今週もがんばりましょう。',jr:'それは おつかれさま でした。さあ、こんしゅうも がんばり ましょう。',ko:'고생 많으셨네요. 자, 이번 주도 힘내요.',en:'That sounds tiring! Well, here’s to a good week.',
   alt:[{ja:'よく日に焼けましたね。今週もよろしくお願いします。',jr:'よく ひに やけ ましたね。こんしゅうも よろしく おねがい します。',ko:'많이 타셨네요. 이번 주도 잘 부탁해요.',en:'You’ve caught some sun! Let’s have a good week.'}]}
 ],
 check:[
  {q:{ja:'「週末はどうでしたか」と聞かれました。会話が続く答えは？',ko:'“주말 잘 보냈어요?”라는 질문을 받았습니다. 대화가 이어지는 대답은?',en:'You’re asked, “How was your weekend?” Which answer keeps the chat going?'},
   opts:[{ja:'別に。',ko:'별로요.',en:'Nothing much.'},{ja:'仕事の話をしましょう。',ko:'일 얘기나 해요.',en:'Let’s talk about work.'},{ja:'家族と海へ行ってきました。魚がとてもおいしかったです。',ko:'가족이랑 바다에 다녀왔어요. 생선이 정말 맛있었어요.',en:'I went to the seaside with my family. The fish was really good.'}],a:2},
  {q:{ja:'自分が答えたあと、相手にも聞き返すには？',ko:'내가 대답한 뒤 상대에게도 되물으려면?',en:'After answering, how do you ask them back?'},
   opts:[{ja:'小林さんは、週末どうでしたか。',ko:'고바야시 씨는 주말 어땠어요?',en:'How about you? How was your weekend?'},{ja:'もう行きます。',ko:'이제 갈게요.',en:'I have to go.'},{ja:'そうですか。',ko:'그래요?',en:'Is that so?'}],a:0}
 ]}

);
