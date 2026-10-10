/* GPT 2次修正本（talk_data_g06r〜g09r：旅行・生活・職場20場面、talk_data_legacy4_r：既存の空港4場面）を、Claude の検収に合わせて直して出力する（2026.10.10）
   1) 会話の流れが崩れている行を直す（ja・jr・ko・en）
   2) 「ほかの言い方（alt）」：GPT 版は「こちらについては、」を前に付けただけ・「はい→ええ」だけだったので、全部入れ替える（1場面3つ）
   3) 確認問題：全問が同じ6つの誤答（「必ず無料で対応します」など）だったので、別の分類の場面の具体的なせりふに入れ替え、問題文も直した行に合わせる
   4) 出力：talk_data_g06.js〜g09.js（新規）。既存4場面は talk_data.js の中の同じ id の { } を置き換える（重複して読み込まない）
   使い方：node _build/tools/fix_talk_batch2.js <2次修正本フォルダ> */
const fs = require('fs'), path = require('path'), vm = require('vm');
const SRC = process.argv[2], ROOT = path.resolve(__dirname, '..', '..');
function load(f) { const c = { window: { TALK: [] } }; vm.runInNewContext(fs.readFileSync(f, 'utf8'), c); return c.window.TALK; }
const FILES = ['g06r', 'g07r', 'g08r', 'g09r'];
const batches = FILES.map(n => load(path.join(SRC, 'talk_data_' + n + '.js')));
const legacy = load(path.join(SRC, 'talk_data_legacy4_r.js'));
const ALL = [].concat(...batches, legacy), BY = {}; ALL.forEach(s => BY[s.id] = s);
const ORIGTXT = {}; ALL.forEach(s => s.lines.forEach((l, i) => { ORIGTXT[s.id + '|' + l.ja] = i; }));
const L = (ja, jr, ko, en) => ({ ja, jr, ko, en });

/* ── 1) 行の直し ── */
const FIX = {
 'travel-rail-lasttrain-1': {
  3: L('その深夜バスは、どこから乗れますか。', 'その しんやバスは、どこから のれますか。', '그 심야버스는 어디서 탈 수 있나요?', 'Where can I catch that night bus?'),
  10: L('バスは予約できませんが、車いすで乗れるタクシーなら、ここから電話で手配できます。', 'バスは よやく できませんが、くるまいすで のれる タクシーなら、ここから でんわで てはい できます。', '버스는 예약이 안 되지만, 휠체어로 탈 수 있는 택시라면 여기서 전화로 불러 드릴 수 있습니다.', 'You can’t book the bus, but I can call a wheelchair-accessible taxi for you from here.') },
 'travel-hotel-latecheckin-1': {
  6: L('はい。深夜一時以降は正面玄関が閉まりますので、横のインターホンを押してください。', 'はい。しんや いちじ いこうは しょうめん げんかんが しまりますので、よこの インターホンを おして ください。', '네. 새벽 1시 이후에는 정문이 닫히니 옆에 있는 인터폰을 눌러 주세요.', 'Yes. The main entrance locks after 1 a.m., so please press the intercom beside it.') },
 'travel-restaurant-allergy-1': {
  4: L('承知しました。気になるお料理はどれですか。', 'しょうち しました。きに なる おりょうりは どれですか。', '알겠습니다. 신경 쓰이는 요리가 어떤 건가요?', 'Certainly. Which dish are you wondering about?'),
  6: L('材料表ではえびは使っていませんが、カニのだしを使っているか厨房に聞いてきます。', 'ざいりょうひょうでは えびは つかって いませんが、カニの だしを つかって いるか ちゅうぼうに きいて きます。', '재료표상으로는 새우는 안 쓰지만, 게 육수를 쓰는지 주방에 물어보고 오겠습니다.', 'The ingredient list shows no shrimp, but I’ll ask the kitchen whether the stock uses crab.'),
  10: L('承知しました。少しでも入っている可能性があれば、正直にお伝えします。', 'しょうち しました。すこしでも はいって いる かのうせいが あれば、しょうじきに おつたえ します。', '알겠습니다. 조금이라도 들어 있을 가능성이 있으면 솔직하게 말씀드리겠습니다.', 'I understand. If there’s any chance it’s in there, I’ll tell you honestly.'),
  12: L('調理器具を分けられるかは、お約束できないんです。念のため、別のお料理も一緒に選びましょうか。', 'ちょうり きぐを わけられるかは、おやくそく できないんです。ねんのため、べつの おりょうりも いっしょに えらびましょうか。', '조리 도구를 따로 쓸 수 있을지는 약속드리기 어렵습니다. 혹시 모르니 다른 요리도 같이 골라 볼까요?', 'I can’t promise we can use separate utensils. Just in case, shall we choose another dish as well?') },
 'travel-rentalcar-insurance-1': {
  4: L('小さな傷も対象です。お客様のご負担額は、補償プランによって変わります。こちらをご覧ください。', 'ちいさな きずも たいしょうです。おきゃくさまの ごふたんがくは、ほしょう プランに よって かわります。こちらを ごらん ください。', '작은 흠집도 대상입니다. 고객님 부담액은 보상 플랜에 따라 달라집니다. 이쪽을 봐 주세요.', 'Small scratches are covered too. How much you pay depends on your protection plan—please take a look here.'),
  12: L('ガソリンを満タンにせずに返された場合や、返却時間を過ぎた場合にかかります。', 'ガソリンを まんタンに せずに かえされた ばあいや、へんきゃく じかんを すぎた ばあいに かかります。', '기름을 가득 채우지 않고 반납하시거나, 반납 시간을 넘기셨을 때 발생합니다.', 'There are extra charges if you return the car without a full tank or after the return time.'),
  13: L('分かりました。満タンにして返します。', 'わかりました。まんタンに して かえします。', '알겠습니다. 기름 가득 채워서 반납할게요.', 'Got it. I’ll bring it back with a full tank.') },
 'travel-pharmacy-medicine-1': {
  4: L('熱は測りましたか。', 'ねつは はかりましたか。', '열은 재 보셨나요?', 'Have you taken your temperature?'),
  5: L('はい、昨夜は三十七度二分でした。', 'はい、ゆうべは さんじゅうななど にぶでした。', '네, 어젯밤에 37.2도였어요.', 'Yes, it was 37.2°C last night.') },
 'life-neighbor-noise-1': {
  8: L('お名前は出しませんので、ご安心ください。', 'おなまえは だしませんので、ごあんしん ください。', '성함은 밝히지 않을 테니 안심하세요.', 'We won’t mention your name, so don’t worry.'),
  12: L('夜間は、この用紙の下にある緊急窓口へお電話ください。通常の受付は朝九時からです。', 'やかんは、この ようしの したに ある きんきゅう まどぐちへ おでんわ ください。つうじょうの うけつけは あさ くじからです。', '야간에는 이 안내문 아래에 있는 긴급 창구로 전화해 주세요. 일반 접수는 아침 9시부터입니다.', 'At night, please call the emergency number at the bottom of this sheet. Our regular desk opens at 9 a.m.') },
 'life-clinic-appointment-1': {
  6: L('明日の午後は埋まっておりまして、木曜日でしたら十四時半か十六時が空いています。', 'あしたの ごごは うまって おりまして、もくようび でしたら じゅうよじはんか じゅうろくじが あいて います。', '내일 오후는 예약이 다 찼고, 목요일이면 14시 30분이나 16시가 비어 있습니다.', 'Tomorrow afternoon is fully booked, but on Thursday we have 2:30 or 4:00 p.m.'),
  7: L('では、木曜の十四時半でお願いします。あと、日本語が不安なので、通訳は頼めますか。', 'では、もくようの じゅうよじはんで おねがい します。あと、にほんごが ふあん なので、つうやくは たのめますか。', '그럼 목요일 14시 30분으로 부탁드려요. 그리고 일본어가 서툴러서 그런데 통역을 부탁할 수 있을까요?', 'Then Thursday at 2:30, please. Also, I’m not confident in Japanese—can I request an interpreter?'),
  12: L('保険証と、お薬手帳があればお持ちください。', 'ほけんしょうと、おくすり てちょうが あれば おもち ください。', '보험증과, 약 수첩이 있으면 가져와 주세요.', 'Please bring your health insurance card, and your medication record book if you have one.') },
 'life-parcel-redelivery-1': {
  10: L('署名はいりませんが、冷蔵品なので、直接お受け取りいただく形になります。', 'しょめいは いりませんが、れいぞうひん なので、ちょくせつ おうけとり いただく かたちに なります。', '서명은 필요 없지만 냉장품이라 직접 받으셔야 합니다.', 'No signature is needed, but because it’s refrigerated, you’ll need to receive it in person.') },
 'life-bank-card-freeze-1': {
  4: L('すぐにお止めします。ご本人確認のため、お名前と生年月日をお願いします。', 'すぐに おとめ します。ごほんにん かくにんの ため、おなまえと せいねんがっぴを おねがい します。', '바로 정지해 드리겠습니다. 본인 확인을 위해 성함과 생년월일을 알려 주세요.', 'I’ll stop it right away. To confirm your identity, may I have your name and date of birth?'),
  12: L('はい。海外からは、こちらの専用番号にお電話いただければ手続きできます。', 'はい。かいがいからは、こちらの せんよう ばんごうに おでんわ いただければ てつづき できます。', '네. 해외에서는 이 전용 번호로 전화 주시면 절차를 진행할 수 있습니다.', 'Yes. From abroad, you can call this dedicated number to complete the process.') },
 'life-school-absence-1': {
  13: L('明日の朝、様子を見てまた連絡すると伝えてください。', 'あしたの あさ、ようすを みて また れんらく すると つたえて ください。', '내일 아침에 상태를 보고 다시 연락드린다고 전해 주세요.', 'Please tell them I’ll check how my child is tomorrow morning and get in touch again.') },
 'life-utility-bill-1': {
  3: L('前の月と比べて、どのくらい使っていますか。', 'まえの つきと くらべて、どのくらい つかって いますか。', '지난달과 비교해서 얼마나 쓴 건가요?', 'How much did I use compared with last month?'),
  4: L('前回のメーターが百二十、今回が百四十五で、二十五立方メートルのご使用です。', 'ぜんかいの メーターが ひゃくにじゅう、こんかいが ひゃくよんじゅうごで、にじゅうご りっぽう メートルの ごしようです。', '지난번 계량기가 120, 이번이 145로, 25세제곱미터를 사용하셨습니다.', 'The meter read 120 last time and 145 this time, so you used 25 cubic meters.') },
 'life-train-delay-certificate-1': {
  7: L('最初は、みどり線でした。', 'さいしょは、みどりせん でした。', '처음에는 미도리선이었어요.', 'I started on the Midori Line.'),
  8: L('みどり線の分は、あちらの改札でお渡ししています。', 'みどりせんの ぶんは、あちらの かいさつで おわたし して います。', '미도리선 것은 저쪽 개찰구에서 드리고 있습니다.', 'For the Midori Line, you can get one at the gates over there.') },
 'air-checkin-1': {
  9: L('名前が違っていても、今日は乗れるんでしょうか。', 'なまえが ちがって いても、きょうは のれるんでしょうか。', '이름이 달라도 오늘 탈 수 있을까요?', 'Will I still be able to fly today even with the name mismatch?'),
  10: L('直せるかどうかは運賃の条件によります。担当部署に確認しますので、少々お待ちください。', 'なおせるか どうかは うんちんの じょうけんに よります。たんとう ぶしょに かくにん しますので、しょうしょう おまち ください。', '고칠 수 있는지는 운임 조건에 따라 다릅니다. 담당 부서에 확인할 테니 잠시만 기다려 주세요.', 'Whether we can correct it depends on your fare conditions. I’ll check with the relevant team, so please wait a moment.'),
  11: L('わかりました。よろしくお願いします。', 'わかりました。よろしく おねがい します。', '알겠습니다. 잘 부탁드립니다.', 'All right. Thank you.') },
 'air-wheelchair-1': {
  5: L('承知しました。搭乗口までは、空港の車いすでご案内します。', 'しょうち しました。とうじょうぐち までは、くうこうの くるまいすで ごあんない します。', '알겠습니다. 탑승구까지는 공항 휠체어로 안내해 드리겠습니다.', 'Certainly. We’ll take you to the gate in an airport wheelchair.'),
  6: L('ありがとうございます。飛行機の入口に階段はありますか。', 'ありがとう ございます。ひこうきの いりぐちに かいだんは ありますか。', '감사합니다. 비행기 입구에 계단이 있나요?', 'Thank you. Are there stairs at the aircraft door?'),
  7: L('この便は搭乗橋を使う予定なので、階段はありません。', 'この びんは とうじょうきょうを つかう よてい なので、かいだんは ありません。', '이 편은 탑승교를 이용할 예정이라 계단은 없습니다.', 'This flight is scheduled to use a boarding bridge, so there are no stairs.'),
  8: L('もし搭乗橋が使えなかったら、どうなりますか。', 'もし とうじょうきょうが つかえなかったら、どう なりますか。', '만약 탑승교를 쓸 수 없으면 어떻게 되나요?', 'What happens if the bridge can’t be used?'),
  9: L('その場合は、リフト付きの車を手配しますので、ご安心ください。', 'その ばあいは、リフトつきの くるまを てはい しますので、ごあんしん ください。', '그럴 때는 리프트가 달린 차량을 준비하니 안심하세요.', 'In that case, we’ll arrange a vehicle with a lift, so don’t worry.') },
};

/* ── 2) ほかの言い方（行番号: 言い換え） ── */
const ALT = {
 'travel-rail-lasttrain-1': {
  2: L('深夜バスなら、零時半に一本出ています。', 'しんやバスなら、れいじはんに いっぽん でて います。', '심야버스라면 0시 반에 한 대 있습니다.', 'There’s one night bus, leaving at half past midnight.'),
  6: L('千二百円です。乗り場の横の券売機でお買い求めください。', 'せんにひゃくえんです。のりばの よこの けんばいきで おかいもとめ ください。', '1,200엔입니다. 승차장 옆 발권기에서 구입해 주세요.', 'It’s 1,200 yen. You can buy a ticket from the machine next to the stop.'),
  12: L('こちらにおかけになってお待ちください。分かりしだいお声がけします。', 'こちらに おかけに なって おまち ください。わかりしだい おこえがけ します。', '여기 앉아서 기다려 주세요. 확인되는 대로 말씀드리겠습니다.', 'Please have a seat here. I’ll let you know as soon as I hear back.') },
 'travel-hotel-latecheckin-1': {
  2: L('お知らせいただきありがとうございます。ご予約のお名前をお願いできますか。', 'おしらせ いただき ありがとう ございます。ごよやくの おなまえを おねがい できますか。', '알려 주셔서 감사합니다. 예약하신 분 성함을 알려 주시겠어요?', 'Thank you for letting us know. May I have the name on the booking?'),
  8: L('レストランは十時までですが、ロビーに軽食の自動販売機がございます。', 'レストランは じゅうじ までですが、ロビーに けいしょくの じどう はんばいきが ございます。', '레스토랑은 10시까지지만 로비에 간단한 음식 자판기가 있습니다.', 'The restaurant closes at ten, but there’s a snack vending machine in the lobby.'),
  12: L('チェックインの際に、パスポートなど身分証明書をお見せください。', 'チェックインの さいに、パスポートなど みぶん しょうめいしょを おみせ ください。', '체크인하실 때 여권 등 신분증을 보여 주세요.', 'Please show your passport or other ID when you check in.') },
 'travel-lost-phone-1': {
  2: L('最後に携帯を使ったのは、どこでしたか。', 'さいごに けいたいを つかったのは、どこでしたか。', '마지막으로 휴대폰을 쓴 곳이 어디였나요?', 'Where did you last use your phone?'),
  6: L('忘れ物の窓口は、改札を出てすぐ右手にあります。', 'わすれものの まどぐちは、かいさつを でて すぐ みぎてに あります。', '분실물 창구는 개찰구를 나와서 바로 오른쪽에 있습니다.', 'The lost-property office is just to the right after you go through the ticket gates.'),
  10: L('ホテルの名前を覚えていれば、こちらの地図で場所を調べられますよ。', 'ホテルの なまえを おぼえて いれば、こちらの ちずで ばしょを しらべられますよ。', '호텔 이름을 기억하시면 여기 지도로 위치를 찾아볼 수 있어요.', 'If you remember the hotel’s name, we can look it up on this map.') },
 'travel-restaurant-allergy-1': {
  2: L('何のアレルギーがおありですか。', 'なんの アレルギーが おありですか。', '어떤 알레르기가 있으신가요?', 'What are you allergic to?'),
  8: L('鍋やお玉を一緒に使っているかもしれないので、調理担当に確かめます。', 'なべや おたまを いっしょに つかって いるかも しれないので、ちょうり たんとうに たしかめます。', '냄비나 국자를 같이 쓰고 있을 수도 있으니 조리 담당에게 확인하겠습니다.', 'We might share pots and ladles, so I’ll check with the cook.'),
  12: L('器具を完全に分けられるとは言い切れません。ほかのお料理もご案内しますね。', 'きぐを かんぜんに わけられるとは いいきれません。ほかの おりょうりも ごあんない しますね。', '도구를 완전히 분리할 수 있다고는 단언하기 어렵습니다. 다른 요리도 안내해 드릴게요.', 'I can’t say for sure we can keep the utensils separate. Let me suggest some other dishes too.') },
 'travel-rentalcar-insurance-1': {
  2: L('どの点が気になりますか。', 'どの てんが きに なりますか。', '어떤 점이 궁금하세요?', 'Which part would you like to ask about?'),
  8: L('早朝でも返却できます。営業所の裏にある返却用の駐車スペースに止めてください。', 'そうちょうでも へんきゃく できます。えいぎょうしょの うらに ある へんきゃくようの ちゅうしゃ スペースに とめて ください。', '이른 아침에도 반납 가능합니다. 영업소 뒤편 반납 전용 주차 공간에 세워 주세요.', 'You can return it early in the morning. Please park in the return spaces behind the office.'),
  10: L('鍵は入口の横にある返却ボックスに入れてください。お忘れ物にもご注意ください。', 'かぎは いりぐちの よこに ある へんきゃく ボックスに いれて ください。おわすれものにも ごちゅうい ください。', '열쇠는 입구 옆 반납함에 넣어 주세요. 두고 가시는 물건 없도록 주의해 주세요.', 'Please put the key in the drop box by the entrance, and don’t forget your belongings.') },
 'travel-pharmacy-medicine-1': {
  2: L('熱はありますか。せきは出ますか。', 'ねつは ありますか。せきは でますか。', '열이 있나요? 기침은 나나요?', 'Do you have a fever? Are you coughing?'),
  8: L('飲み合わせを確認したいので、いつも飲んでいる薬の名前を教えてください。', 'のみあわせを かくにん したいので、いつも のんで いる くすりの なまえを おしえて ください。', '같이 먹어도 되는지 확인하고 싶으니 평소 드시는 약 이름을 알려 주세요.', 'I’d like to check for interactions, so could you tell me the name of the medicine you take every day?'),
  12: L('息が苦しくなったり、熱が高くなったりしたら、早めに病院で診てもらってください。', 'いきが くるしく なったり、ねつが たかく なったり したら、はやめに びょういんで みて もらって ください。', '숨쉬기 힘들어지거나 열이 높아지면 빨리 병원에서 진찰을 받으세요.', 'If you have trouble breathing or your fever goes up, please see a doctor soon.') },
 'life-neighbor-noise-1': {
  2: L('音がするのは、何時ごろからですか。', 'おとが するのは、なんじ ごろからですか。', '소리가 나는 건 몇 시쯤부터인가요?', 'Around what time does the noise start?'),
  6: L('直接言わなくても大丈夫ですよ。管理会社から全戸に注意のお知らせを出せます。', 'ちょくせつ いわなくても だいじょうぶですよ。かんりがいしゃから ぜんこに ちゅういの おしらせを だせます。', '직접 말씀하지 않으셔도 괜찮아요. 관리회사에서 모든 세대에 주의 안내문을 보낼 수 있습니다.', 'You don’t need to speak to them yourself. We can send a notice to all residents.'),
  10: L('何日の何時ごろ、どんな音だったかをメモしておいてください。', 'なんにちの なんじ ごろ、どんな おと だったかを メモ して おいて ください。', '며칠 몇 시쯤 어떤 소리였는지 메모해 두세요.', 'Please note down the date, time and what kind of noise it was.') },
 'life-clinic-appointment-1': {
  2: L('ご予約のお名前をお願いします。', 'ごよやくの おなまえを おねがい します。', '예약하신 분 성함을 알려 주세요.', 'May I have the name for the appointment?'),
  8: L('通訳は予約が必要です。何語がご希望か伺って、手配できるか確認しますね。', 'つうやくは よやくが ひつようです。なにごが ごきぼうか うかがって、てはい できるか かくにん しますね。', '통역은 예약이 필요합니다. 어느 언어를 원하시는지 여쭤보고 준비할 수 있는지 확인할게요.', 'Interpreters need to be booked in advance. Let me ask which language you need and check if we can arrange one.'),
  10: L('はい。登録されているメールアドレスに、変更後の日時をお送りします。', 'はい。とうろく されて いる メールアドレスに、へんこうごの にちじを おおくり します。', '네. 등록하신 이메일 주소로 변경된 일시를 보내 드립니다.', 'Yes. We’ll send the new date and time to your registered email address.') },
 'life-parcel-redelivery-1': {
  2: L('不在票に書いてある伝票番号をお願いします。', 'ふざいひょうに かいて ある でんぴょう ばんごうを おねがい します。', '부재 안내표에 적힌 송장 번호를 알려 주세요.', 'Could you tell me the tracking number on the delivery notice?'),
  6: L('明日でしたら、十八時から二十時か、十九時から二十一時のどちらかになります。', 'あした でしたら、じゅうはちじから にじゅうじか、じゅうくじから にじゅういちじの どちらかに なります。', '내일이라면 18시~20시, 또는 19시~21시 중 하나입니다.', 'Tomorrow, we can deliver between 6 and 8 p.m. or between 7 and 9 p.m.'),
  8: L('すみません、冷蔵の荷物は宅配ボックスに入れられない決まりなんです。', 'すみません、れいぞうの にもつは たくはい ボックスに いれられない きまり なんです。', '죄송해요, 냉장 화물은 택배 보관함에 넣을 수 없게 되어 있어요.', 'Sorry, refrigerated parcels can’t be left in delivery lockers.') },
 'life-bank-card-freeze-1': {
  2: L('カードを止めたほうがよろしいですか。', 'カードを とめた ほうが よろしいですか。', '카드를 정지하시겠어요?', 'Would you like us to block the card?'),
  6: L('身に覚えのない利用は、日時と金額をメモしておいてください。', 'みに おぼえの ない りようは、にちじと きんがくを メモ して おいて ください。', '기억에 없는 사용 내역은 일시와 금액을 메모해 두세요.', 'Please note the date and amount of any charges you don’t recognize.'),
  8: L('補償になるかどうかは、調査のあとに決まります。受付番号をお伝えしますね。', 'ほしょうに なるか どうかは、ちょうさの あとに きまります。うけつけ ばんごうを おつたえ しますね。', '보상이 되는지는 조사 후에 결정됩니다. 접수 번호를 알려 드릴게요.', 'Whether it’s covered will be decided after an investigation. Let me give you a reference number.') },
 'life-school-absence-1': {
  2: L('お子さんのお名前と、何年生か教えてください。', 'おこさんの おなまえと、なんねんせいか おしえて ください。', '자녀분 이름과 몇 학년인지 알려 주세요.', 'Could you tell me your child’s name and year?'),
  6: L('明日もお休みでしたら、朝八時半までに連絡アプリで送ってください。', 'あしたも おやすみ でしたら、あさ はちじはん までに れんらく アプリで おくって ください。', '내일도 쉬면 아침 8시 30분까지 연락 앱으로 보내 주세요.', 'If your child will be absent tomorrow too, please send a message through the school app by 8:30 a.m.'),
  10: L('配布物は、後日お子さんに渡します。急ぎのものはアプリにも載せます。', 'はいふぶつは、ごじつ おこさんに わたします。いそぎの ものは アプリにも のせます。', '배부물은 나중에 자녀분께 전달하고, 급한 것은 앱에도 올리겠습니다.', 'We’ll give the handouts to your child later, and post anything urgent on the app.') },
 'life-utility-bill-1': {
  2: L('今月の請求は、六月十日から七月九日までの使用分です。', 'こんげつの せいきゅうは、ろくがつ とおかから しちがつ ここのか までの しようぶんです。', '이번 달 청구는 6월 10일부터 7월 9일까지 사용분입니다.', 'This month’s bill covers June 10 to July 9.'),
  6: L('引っ越された日と、契約が始まった日を確認してみましょう。', 'ひっこされた ひと、けいやくが はじまった ひを かくにん して みましょう。', '이사 오신 날과 계약 시작일을 확인해 보죠.', 'Let’s compare the day you moved in with the contract start date.'),
  12: L('調べた結果は、登録のメールアドレスにお送りします。', 'しらべた けっかは、とうろくの メールアドレスに おおくり します。', '조사 결과는 등록된 이메일 주소로 보내 드리겠습니다.', 'We’ll email the results to your registered address.') },
 'life-apartment-repair-1': {
  2: L('いつからお湯が出なくなりましたか。', 'いつから おゆが でなく なりましたか。', '언제부터 온수가 안 나왔나요?', 'Since when has there been no hot water?'),
  6: L('危ないので、無理に操作しないでくださいね。', 'あぶないので、むりに そうさ しないで くださいね。', '위험하니 무리하게 조작하지 마세요.', 'For safety, please don’t try to fix it yourself.'),
  12: L('かしこまりました。訪問の時間が決まりましたら、お電話します。', 'かしこまりました。ほうもんの じかんが きまりましたら、おでんわ します。', '알겠습니다. 방문 시간이 정해지면 전화드리겠습니다.', 'Certainly. We’ll call you once the visit time is set.') },
 'life-train-delay-certificate-1': {
  2: L('ただいま、上りの電車が二十分ほど遅れています。', 'ただいま、のぼりの でんしゃが にじゅっぷん ほど おくれて います。', '지금 상행 전철이 20분 정도 늦어지고 있습니다.', 'Inbound trains are currently running about 20 minutes late.'),
  4: L('遅延証明書は、改札横の窓口でお受け取りください。', 'ちえん しょうめいしょは、かいさつ よこの まどぐちで おうけとり ください。', '지연증명서는 개찰구 옆 창구에서 받아 가세요.', 'You can pick up a delay certificate at the window next to the gates.'),
  10: L('はい。公式サイトから画面で出して、保存できますよ。', 'はい。こうしき サイトから がめんで だして、ほぞん できますよ。', '네. 공식 사이트에서 화면으로 띄워서 저장할 수 있어요.', 'Yes. You can display it on the official website and save it.') },
 'life-mobile-plan-change-1': {
  2: L('この三か月ですと、毎月だいたい二ギガのご利用ですね。', 'この さんかげつ ですと、まいつき だいたい にギガの ごりよう ですね。', '최근 3개월을 보면 매달 2기가 정도 쓰셨네요.', 'Over the last three months, you’ve used about 2 GB a month.'),
  4: L('三ギガのプランでしたら、月二千円になります。', 'さんギガの プラン でしたら、つき にせんえんに なります。', '3기가 요금제라면 월 2,000엔입니다.', 'The 3 GB plan would be 2,000 yen a month.'),
  6: L('来月の一日から変わります。今月は今の料金のままです。', 'らいげつの ついたちから かわります。こんげつは いまの りょうきんの ままです。', '다음 달 1일부터 바뀝니다. 이번 달은 지금 요금 그대로입니다.', 'It changes from the first of next month. This month stays at the current rate.') },
 'office-meeting-reschedule-1': {
  2: L('担当者のスケジュールが重なってしまいまして。', 'たんとうしゃの スケジュールが かさなって しまいまして。', '담당자 일정이 겹쳐 버려서요.', 'The person in charge has a scheduling conflict.'),
  6: L('社内の都合でしたら、水曜の十五時から十六時が空いています。', 'しゃないの つごう でしたら、すいようの じゅうごじから じゅうろくじが あいて います。', '사내 일정으로는 수요일 15시부터 16시가 비어 있습니다.', 'On our side, Wednesday from 3 to 4 p.m. is free.'),
  12: L('件名に「日程変更」と入れて、日時と時差を本文に書いておいてください。', 'けんめいに「にってい へんこう」と いれて、にちじと じさを ほんぶんに かいて おいて ください。', '제목에 ‘일정 변경’이라고 넣고 일시와 시차를 본문에 써 주세요.', 'Put “Schedule change” in the subject line, and write the date, time and time difference in the body.') },
 'office-expense-report-1': {
  2: L('領収書は全部ありますか。', 'りょうしゅうしょは ぜんぶ ありますか。', '영수증은 다 있나요?', 'Do you have all the receipts?'),
  6: L('カードの明細に、使った日のメモを付けて申請してください。認められるかは審査になります。', 'カードの めいさいに、つかった ひの メモを つけて しんせい して ください。みとめられるかは しんさに なります。', '카드 명세서에 사용한 날의 메모를 붙여서 신청해 주세요. 인정될지는 심사하게 됩니다.', 'Please submit the card statement with a note of the date you used it. Whether it’s accepted will be reviewed.'),
  10: L('まず直属の上司に承認してもらってから、経理に回ります。', 'まず ちょくぞくの じょうしに しょうにん して もらってから、けいりに まわります。', '먼저 직속 상사의 승인을 받은 다음 경리팀으로 넘어옵니다.', 'Your direct manager approves it first, and then it comes to accounting.') },
 'office-client-complaint-1': {
  2: L('大変ご迷惑をおかけし、申し訳ございません。', 'たいへん ごめいわくを おかけし、もうしわけ ございません。', '큰 불편을 드려 정말 죄송합니다.', 'We sincerely apologize for the trouble.'),
  4: L('恐れ入りますが、注文番号と納品書の番号をお願いできますか。', 'おそれいりますが、ちゅうもん ばんごうと のうひんしょの ばんごうを おねがい できますか。', '죄송하지만 주문 번호와 납품서 번호를 알려 주시겠어요?', 'Could I please have the order number and the delivery note number?'),
  8: L('本日十五時までに、調査の状況をご連絡します。いつ解決できるかは、まだお約束できません。', 'ほんじつ じゅうごじ までに、ちょうさの じょうきょうを ごれんらく します。いつ かいけつ できるかは、まだ おやくそく できません。', '오늘 15시까지 조사 상황을 연락드리겠습니다. 언제 해결될지는 아직 약속드릴 수 없습니다.', 'We’ll update you on the investigation by 3 p.m. today. We can’t yet promise when it will be resolved.') },
 'office-handover-1': {
  2: L('まずは、今日中に対応しないといけない二件から説明しますね。', 'まずは、きょうじゅうに たいおう しないと いけない にけんから せつめい しますね。', '먼저 오늘 안에 처리해야 하는 두 건부터 설명할게요.', 'Let me start with the two items that need handling today.'),
  6: L('共有フォルダーの「引き継ぎ」に、案件ごとに資料をまとめてあります。', 'きょうゆう フォルダーの「ひきつぎ」に、あんけん ごとに しりょうを まとめて あります。', '공유 폴더의 ‘인수인계’에 건별로 자료를 정리해 두었어요.', 'The materials are organized by case in the “Handover” shared folder.'),
  8: L('アクセス権は情報システム担当に申請してください。私からも一言伝えておきます。', 'アクセスけんは じょうほう システム たんとうに しんせい して ください。わたしからも ひとこと つたえて おきます。', '접근 권한은 정보시스템 담당에게 신청해 주세요. 저도 한마디 해 둘게요.', 'Please request access from IT. I’ll mention it to them as well.') },
 'office-recruitment-interview-1': {
  2: L('ご希望の日時はありますか。', 'ごきぼうの にちじは ありますか。', '희망하시는 일시가 있나요?', 'Do you have a preferred date and time?'),
  4: L('木曜日でしたら、午後三時が空いております。', 'もくようび でしたら、ごご さんじが あいて おります。', '목요일이라면 오후 3시가 비어 있습니다.', 'On Thursday, 3 p.m. is available.'),
  10: L('履歴書と職務経歴書を、前日までにメールでお送りください。', 'りれきしょと しょくむ けいれきしょを、ぜんじつ までに メールで おおくり ください。', '이력서와 경력기술서를 전날까지 이메일로 보내 주세요.', 'Please email your résumé and work history by the day before.') },
 'air-checkin-1': {
  0: L('おはようございます。パスポートをお願いします。', 'おはよう ございます。パスポートを おねがい します。', '안녕하세요. 여권 부탁드립니다.', 'Good morning. Your passport, please.'),
  10: L('担当の者に確認いたします。直せるかどうかは条件によりますので、少しお時間をください。', 'たんとうの ものに かくにん いたします。なおせるか どうかは じょうけんに よりますので、すこし おじかんを ください。', '담당자에게 확인해 보겠습니다. 고칠 수 있는지는 조건에 따라 다르니 잠시 시간을 주세요.', 'I’ll check with the person in charge. It depends on the conditions, so please give me a moment.'),
  12: L('お待たせいたしました。お名前を直しました。新しい予約内容をご確認ください。', 'おまたせ いたしました。おなまえを なおしました。あたらしい よやく ないようを ごかくにん ください。', '오래 기다리셨습니다. 성함을 수정했습니다. 새 예약 내용을 확인해 주세요.', 'Thank you for waiting. I’ve corrected your name—please check the updated booking.') },
 'air-gate-delay-1': {
  1: L('大変お待たせしております。機体の点検に時間がかかっております。', 'たいへん おまたせ して おります。きたいの てんけんに じかんが かかって おります。', '오래 기다리시게 해서 죄송합니다. 기체 점검에 시간이 걸리고 있습니다.', 'We’re very sorry for the wait. The aircraft inspection is taking longer than expected.'),
  3: L('今のところ、十一時半の出発を予定しております。新しい情報が入り次第お知らせします。', 'いまの ところ、じゅういちじはんの しゅっぱつを よてい して おります。あたらしい じょうほうが はいり しだい おしらせ します。', '현재로서는 11시 반 출발 예정입니다. 새로운 정보가 들어오는 대로 알려 드리겠습니다.', 'For now, departure is scheduled for 11:30. We’ll let you know as soon as we have new information.'),
  13: L('確認が取れましたら、すぐにお知らせします。到着後のご案内も手配しておきます。', 'かくにんが とれましたら、すぐに おしらせ します。とうちゃくごの ごあんないも てはい して おきます。', '확인되면 바로 알려 드리겠습니다. 도착 후 안내도 준비해 두겠습니다.', 'I’ll let you know as soon as I’ve confirmed it, and I’ll arrange assistance on arrival.') },
 'air-baggage-1': {
  1: L('ご不便をおかけしております。手荷物の引換証を拝見できますか。', 'ごふべんを おかけ して おります。てにもつの ひきかえしょうを はいけん できますか。', '불편을 드려 죄송합니다. 수하물 표를 볼 수 있을까요?', 'I’m sorry for the inconvenience. May I see your baggage claim tag?'),
  3: L('お荷物は乗り継ぎの空港にあるようです。次の便で運ぶよう手配しています。', 'おにもつは のりつぎの くうこうに ある ようです。つぎの びんで はこぶ よう てはい して います。', '짐은 환승 공항에 있는 것 같습니다. 다음 편으로 보내도록 조치하고 있습니다.', 'Your bag seems to be at the connecting airport. We’re arranging for it to come on the next flight.'),
  13: L('とりあえず、洗面用具のセットをお渡しします。購入された物の費用は、規定を確認してご案内します。', 'とりあえず、せんめん ようぐの セットを おわたし します。こうにゅう された ものの ひようは、きていを かくにん して ごあんない します。', '우선 세면도구 세트를 드리겠습니다. 구입하신 물품 비용은 규정을 확인해서 안내드리겠습니다.', 'For now, here’s a toiletry kit. We’ll check the rules on reimbursing anything you buy and let you know.') },
 'air-wheelchair-1': {
  1: L('かしこまりました。車いすをお持ちしましょうか。', 'かしこまりました。くるまいすを おもち しましょうか。', '알겠습니다. 휠체어를 가져다 드릴까요?', 'Of course. Shall I bring a wheelchair?'),
  11: L('出発の四十分前に、こちらの案内所へお越しください。係の者がお迎えに参ります。', 'しゅっぱつの よんじゅっぷん まえに、こちらの あんないじょへ おこし ください。かかりの ものが おむかえに まいります。', '출발 40분 전에 이 안내소로 와 주세요. 담당 직원이 마중 나가겠습니다.', 'Please come to this information desk 40 minutes before departure. A staff member will meet you.'),
  13: L('はい。到着地の空港にも、お手伝いのご希望をお伝えしておきます。', 'はい。とうちゃくちの くうこうにも、おてつだいの ごきぼうを おつたえ して おきます。', '네. 도착지 공항에도 도움 요청을 전달해 두겠습니다.', 'Yes. We’ll pass your request for assistance on to the arrival airport.') },
};

/* 適用 */
let nFix = 0, nAlt = 0;
for (const [id, m] of Object.entries(FIX)) { const s = BY[id]; if (!s) throw new Error('no ' + id); for (const [i, v] of Object.entries(m)) { Object.assign(s.lines[+i], v); nFix++; } }
ALL.forEach(s => s.lines.forEach(l => { delete l.alt; }));
for (const [id, m] of Object.entries(ALT)) { const s = BY[id]; for (const [i, v] of Object.entries(m)) { s.lines[+i].alt = [v]; nAlt++; } }

/* ── 3) 確認問題の作り直し ── */
const CW = t => (String(t).match(/[一-鿿]{2,}|[゠-ヿ]{3,}/g) || []);
const POOL = [];
ALL.forEach(s => s.lines.forEach(l => { const j = l.ja || ''; if (j.length < 10 || j.length > 40 || /^(はい|ええ|承知|かしこま|ありがと|わかり|分かり|よろしく|お願い|すみません)/.test(j)) return; const w = CW(j); if (!w.length) return; POOL.push({ ja: l.ja, ko: l.ko, en: l.en, w, cat: s.cat, from: s.id }); }));
function hash(str) { let h = 2166136261; for (const c of str) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function requote(q, langText) { // 問題文の「…」“…” の中を、今の行の文に入れ替える
  return { ja: q.ja.replace(/「[^」]*」/, '「' + langText.ja + '」'), ko: q.ko.replace(/“[^”]*”/, '“' + langText.ko + '”'), en: q.en.replace(/“[^”]*”/, '“' + langText.en + '”') };
}
const report = [];
ALL.forEach(s => {
  const txt = s.lines.map(l => l.ja).join(' ') + s.title.ja + s.scene.ja, words = new Set(CW(txt));
  s.check.forEach((c, qi) => {
    const m = /「(.+)」と言いました/.exec(c.q.ja); let qi0 = m ? ORIGTXT[s.id + '|' + m[1]] : undefined;
    if (qi0 == null) { const ai = ORIGTXT[s.id + '|' + c.opts[c.a].ja]; if (ai != null) qi0 = ai - 1; }
    if (qi0 == null || qi0 < 0 || qi0 >= s.lines.length - 1) throw new Error('cannot locate ' + s.id + ' Q' + qi);
    const prev = s.lines[qi0], ans = s.lines[qi0 + 1];
    c.q = requote(c.q, prev);
    const P = POOL.filter(p => p.from !== s.id && p.cat !== s.cat && !p.w.some(w => words.has(w)));
    const h = hash(s.id + '#' + qi), used = new Set(), ds = [];
    for (let k = 0; ds.length < 2 && k < P.length * 3; k++) { const p = P[(h + k * 7919) % P.length]; if (used.has(p.from) || ds.some(d => d.ja === p.ja)) continue; used.add(p.from); ds.push(p); }
    const pos = h % 3, opts = [ds[0], ds[1]]; opts.splice(pos, 0, { ja: ans.ja, ko: ans.ko, en: ans.en });
    c.opts = opts.map(o => ({ ja: o.ja, ko: o.ko, en: o.en })); c.a = pos;
    report.push(s.id + ' Q' + qi + ' 「' + prev.ja + '」 → ' + c.opts.map((o, j) => (j === pos ? '○' : '×') + o.ja).join(' / '));
  });
});

/* ── 4) 出力 ── */
const head = n => '/* ACN 会話練習 追加データ ' + n + '（GPT 2次修正本 ' + n.replace('.js', 'r.js') + ' を Claude が検収・修正：会話の流れ、ほかの言い方、確認問題 2026.10.10）。架空の練習用会話。日時・料金は例 */\nwindow.TALK=window.TALK||[];window.TALK.push(\n';
batches.forEach((b, i) => { const n = 'talk_data_g0' + (i + 6) + '.js'; fs.writeFileSync(path.join(ROOT, n), head(n) + b.map(s => JSON.stringify(s, null, 1)).join(',\n') + '\n);\n'); });
// 既存4場面：talk_data.js の { } を id で置き換え
let td = fs.readFileSync(path.join(ROOT, 'talk_data.js'), 'utf8');
for (const s of legacy) {
  const start = td.indexOf("\n{id:'" + s.id + "',"); if (start < 0) throw new Error('not found in talk_data.js: ' + s.id);
  const next = td.indexOf("\n{id:'", start + 5); if (next < 0) throw new Error('no next object after ' + s.id);
  const body = '\n/* ' + s.id + '：14行に広げた版（GPT 2次修正本＋Claude 検収 2026.10.10） */\n' + JSON.stringify(s) + ',\n';
  td = td.slice(0, start) + body + td.slice(next);
}
fs.writeFileSync(path.join(ROOT, 'talk_data.js'), td);
fs.writeFileSync(path.join(__dirname, '..', '..', '..', 'fix2_report.txt'), report.join('\n'));
console.log('fixed lines', nFix, 'alts', nAlt, 'checks', report.length);
