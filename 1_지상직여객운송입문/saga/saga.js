/* AIRLINE SAGA — 항공커리어노트 교육용 공항 업무 게임 (Stage 01 체크인). 소스: 게임개발\AIRLINE_SAGA_GAME\src */
window.ASSETS = {"checkin_bg_01": {"src": "saga/img/checkin_bg_01.webp", "w": 1600, "h": 900, "px": 0.5, "py": 0.5, "flip": true, "cat": "backgrounds"}, "checkin_bg_02": {"src": "saga/img/checkin_bg_02.webp", "w": 1600, "h": 900, "px": 0.5, "py": 0.5, "flip": true, "cat": "backgrounds"}, "koradon_greet_01": {"src": "saga/img/koradon_greet_01.webp", "w": 290, "h": 520, "px": 0.5283, "py": 0.995, "flip": false, "cat": "mascots"}, "koradon_idle_01": {"src": "saga/img/koradon_idle_01.webp", "w": 260, "h": 520, "px": 0.5, "py": 0.995, "flip": false, "cat": "mascots"}, "korarin_greet_01": {"src": "saga/img/korarin_greet_01.webp", "w": 297, "h": 520, "px": 0.5513, "py": 0.9948, "flip": false, "cat": "mascots"}, "korarin_idle_01": {"src": "saga/img/korarin_idle_01.webp", "w": 257, "h": 520, "px": 0.4965, "py": 0.9948, "flip": false, "cat": "mascots"}, "passenger_female_01": {"src": "saga/img/passenger_female_01.webp", "w": 432, "h": 900, "px": 0.5188, "py": 0.996, "flip": true, "cat": "passengers"}, "passenger_female_02": {"src": "saga/img/passenger_female_02.webp", "w": 409, "h": 900, "px": 0.5897, "py": 0.996, "flip": true, "cat": "passengers"}, "passenger_female_03": {"src": "saga/img/passenger_female_03.webp", "w": 382, "h": 900, "px": 0.5057, "py": 0.9959, "flip": true, "cat": "passengers"}, "passenger_male_01": {"src": "saga/img/passenger_male_01.webp", "w": 379, "h": 900, "px": 0.5159, "py": 0.996, "flip": true, "cat": "passengers"}, "passenger_male_02": {"src": "saga/img/passenger_male_02.webp", "w": 353, "h": 900, "px": 0.5334, "py": 0.996, "flip": true, "cat": "passengers"}, "passenger_male_03": {"src": "saga/img/passenger_male_03.webp", "w": 355, "h": 900, "px": 0.5474, "py": 0.996, "flip": true, "cat": "passengers"}, "prop_boarding_pass_01": {"src": "saga/img/prop_boarding_pass_01.webp", "w": 520, "h": 242, "px": 0.5, "py": 0.9914, "flip": true, "cat": "props"}, "prop_counter_01": {"src": "saga/img/prop_counter_01.webp", "w": 520, "h": 210, "px": 0.4869, "py": 0.9898, "flip": true, "cat": "props"}, "prop_luggage_01": {"src": "saga/img/prop_luggage_01.webp", "w": 331, "h": 520, "px": 0.429, "py": 0.9947, "flip": true, "cat": "props"}, "prop_monitor_01": {"src": "saga/img/prop_monitor_01.webp", "w": 520, "h": 491, "px": 0.4915, "py": 0.9936, "flip": true, "cat": "props"}, "prop_passport_01": {"src": "saga/img/prop_passport_01.webp", "w": 488, "h": 520, "px": 0.5, "py": 0.9944, "flip": true, "cat": "props"}, "prop_scale_01": {"src": "saga/img/prop_scale_01.webp", "w": 520, "h": 458, "px": 0.5703, "py": 0.9938, "flip": true, "cat": "props"}, "prop_travel_documents_01": {"src": "saga/img/prop_travel_documents_01.webp", "w": 520, "h": 362, "px": 0.5, "py": 0.9936, "flip": true, "cat": "props"}, "staff_checkin_check_01": {"src": "saga/img/staff_checkin_check_01.webp", "w": 414, "h": 900, "px": 0.5678, "py": 0.9959, "flip": true, "cat": "staff"}, "staff_checkin_explain_01": {"src": "saga/img/staff_checkin_explain_01.webp", "w": 506, "h": 900, "px": 0.4916, "py": 0.996, "flip": true, "cat": "staff"}, "staff_checkin_greet_01": {"src": "saga/img/staff_checkin_greet_01.webp", "w": 421, "h": 900, "px": 0.5799, "py": 0.996, "flip": true, "cat": "staff"}, "staff_checkin_idle_01": {"src": "saga/img/staff_checkin_idle_01.webp", "w": 421, "h": 900, "px": 0.6026, "py": 0.996, "flip": true, "cat": "staff"}, "passport_female_01_front_01": {"src": "saga/img/passport_female_01_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits", "for": "passenger_female_01"}, "passport_female_02_front_01": {"src": "saga/img/passport_female_02_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits", "for": "passenger_female_02"}, "passport_female_03_front_01": {"src": "saga/img/passport_female_03_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits", "for": "passenger_female_03"}, "passport_male_01_front_01": {"src": "saga/img/passport_male_01_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits", "for": "passenger_male_01"}, "passport_male_02_front_01": {"src": "saga/img/passport_male_02_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits", "for": "passenger_male_02"}, "passport_male_03_front_01": {"src": "saga/img/passport_male_03_front_01.webp", "w": 312, "h": 416, "px": 0.5, "py": 0.5, "flip": false, "cat": "portraits", "for": "passenger_male_03"}};
/* rules.js */
/* 규칙 모듈 — core(공통 원리) / country(JP·KR) / airline(Vela Air, 교육용) / airport
   각 항목: basis = lesson(강좌 근거) | edu(교육용 가상값). 화면 언어와 업무 국가는 별개 */
window.RULES = {
  core: {
    /* passenger/1-3 반드시 확인하는 4항목 */
    docs4: ['validity', 'photo', 'entry', 'ticketName'],
    /* passenger/1-1 위탁 수하물 보안 질문 3가지 */
    dgQ: ['stranger', 'unattended', 'dangerous'],
    /* passenger/1-5 비상구 좌석: 15세 미만·소아/유아 동반 불가 등 */
    exitMinAge: 15,
    /* passenger/1-5 유아는 같은 열(좌우 블록)에 몰리지 않게 — 예비 산소마스크 수 */
    infantPerBlock: 1,
    /* passenger/1-13 Wh = mAh × V ÷ 1000, 100Wh·160Wh 구분, 보조배터리 위탁 금지 */
    wh: function (mAh, v) { return Math.round(mAh * v / 1000 * 10) / 10; },
    pbChecked: false,
    whNoApproval: 100, whMax: 160,
    basis: { docs4: 'passenger/1-3', dgQ: 'passenger/1-1', exit: 'passenger/1-5', lithium: 'passenger/1-13', bags: 'passenger/1-10' }
  },
  country: {
    JP: {
      code: 'JP',
      authority: { ja: '国土交通省 航空局', ko: '국토교통성 항공국', en: 'Civil Aviation Bureau (MLIT)' },
      /* passenger/1-13: 2026-04-24 이후 일본 — 160Wh 이하 1인 2개, 기내 충전·급전 금지 */
      pb: { maxCarry: 2, basis: 'lesson', ref: 'passenger/1-13', since: '2026-04-24',
            note: { ja: '日本（2026年4月24日〜）：モバイルバッテリーは160Wh以下・1人2個まで。機内で充電・給電はしない。頭上の棚に入れず手元で保管し、端子は絶縁。',
                    ko: '일본(2026년 4월 24일~): 보조배터리는 160Wh 이하·1인 2개까지. 기내에서 충전·급전 금지. 머리 위 선반에 넣지 않고 몸에 지니며, 단자는 절연.',
                    en: 'Japan (from 24 Apr 2026): power banks up to 160Wh, max 2 per person. No charging or powering devices on board. Keep them with you, not in the overhead bin; insulate the terminals.' } }
    },
    KR: {
      code: 'KR',
      authority: { ja: '韓国 国土交通部', ko: '국토교통부', en: 'Ministry of Land, Infrastructure and Transport (Korea)' },
      /* 국토교통부 발표: 2026-04-20 시행 — 160Wh 이하 1인 2개까지 기내 반입, 기내에서 보조배터리 충전·다른 기기 충전 금지.
         2025-03 시행분(위탁 금지 철저·단자 절연·머리 위 선반 보관 금지)은 계속 적용. 국가 기준과 Vela Air 회사 기준(100Wh 초과 미승인)은 분리 */
      pb: { maxCarry: 2, basis: 'official', ref: 'passenger/1-13', since: '2026-04-20',
            note: { ja: '韓国（2026年4月20日〜）：モバイルバッテリーは160Wh以下・1人2個まで。機内でバッテリー自体の充電も、ほかの機器への充電もしない。受託禁止・端子の絶縁・頭上の棚に入れないこと（2025年3月〜）も続く。',
                    ko: '한국(2026년 4월 20일~): 보조배터리는 160Wh 이하·1인 2개까지. 기내에서 보조배터리 충전과 다른 기기 충전 모두 금지. 위탁 금지·단자 절연·머리 위 선반 보관 금지(2025년 3월~)도 계속 적용.',
                    en: 'Korea (from 20 Apr 2026): power banks up to 160Wh, max 2 per person. No charging the power bank or other devices on board. The March 2025 rules (never in checked bags, insulate terminals, not in the overhead bin) still apply.' } }
    }
  },
  /* Vela Air 규정 — 전부 교육용 가상값 (passenger/1-10의 일반 예시 범위 안에서 설정) */
  airline: {
    VELA: {
      name: 'Vela Air', code: 'VELA', /* 4글자: IATA(2자)·ICAO(3자) 어느 형식과도 겹치지 않음 */
      basis: 'edu',
      freeBag: { Y: { pcs: 1, kg: 23 } }, pieceMaxKg: 32, cabinMaxKg: 10,
      excessWeight: { JP: { amt: 12000, cur: 'JPY' }, KR: { amt: 110000, cur: 'KRW' } },
      /* 이름 정정: 철자 오류 3글자 이내는 예약부서 확인 후 정정 가능 (교육용) */
      nameFix: 3,
      /* 100Wh 초과 보조배터리는 카운터에서 승인하지 않음 (Vela Air 회사 기준·교육용 — 국가 기준 160Wh와 별개) */
      pbOver100: false,
      closeMin: 60, boardMin: 35
    }
  },
  airport: {
    NRT: { name: { ja: '成田国際空港', ko: '나리타국제공항', en: 'Narita International' }, country: 'JP', counter: 'K 12', gate: '62', tz: 'JST' },
    ICN: { name: { ja: '仁川国際空港', ko: '인천국제공항', en: 'Incheon International' }, country: 'KR', counter: 'H 12', gate: '27', tz: 'KST' }
  },
  /* 渡航条件 DB — 教育用データ (실제 조건은 Timatic·공적 정보로 확인: passenger/1-3, ciq/1-2) */
  entryDB: {
    KR: { JPN: 'free', KOR: 'citizen', LUM: 'visa' },
    JP: { KOR: 'free', JPN: 'citizen', LUM: 'visa' }
  }
};

/* mission_ci01.js */
/* 미션 pax.ci.01 「はじめてのチェックイン」 — 모든 승객·편·서류는 교육용 가상 데이터
   station JP: VELA 301 NRT→ICN / station KR: VELA 302 ICN→NRT
   관련 레슨: passenger/1-1, 1-3, 1-5, 1-10, 1-12, 1-13, ciq/1-1, ciq/1-2 */
(function () {
  var L = function (ja, ko, en) { return { ja: ja, ko: ko, en: en }; };
  var common = {
    hello: L('おはようございます。仁川までお願いします。', '안녕하세요. 인천까지 부탁드립니다.', 'Good morning. To Incheon, please.'),
    helloJP: L('こんにちは。成田までお願いします。', '안녕하세요. 나리타까지 부탁드립니다.', 'Hello. To Narita, please.'),
    dgNone: L('はい、自分で詰めました。ずっと持っていましたし、そういう物は入っていません。', '네, 제가 직접 쌌어요. 계속 갖고 있었고 그런 물건은 없어요.', 'Yes, I packed it myself. It has been with me the whole time, and there is nothing like that inside.'),
    thanks: L('ありがとうございました！', '감사합니다!', 'Thank you!'),
    waitLong: L('…まだかかりますか？', '…아직 멀었나요?', '…Will this take much longer?'),
    seatOk: L('はい、大丈夫です。ありがとうございます。', '네, 괜찮아요. 감사합니다.', 'Yes, that is fine. Thank you.'),
    seatMeh: L('あ…希望とは違いますけど、大丈夫です。', '아… 희망한 자리는 아니지만 괜찮아요.', 'Oh… not what I asked for, but that is fine.'),
    exitYes: L('はい、大丈夫です。お手伝いします。', '네, 괜찮아요. 도와드릴게요.', 'Yes, no problem. I can help.')
  };
  /* 모든 승객 공통 응답(목소리는 승객별) */
  function withCommon(list) { list.forEach(function (p) { p.say.seatOk = p.say.seatOk || common.seatOk; p.say.seatMeh = p.say.seatMeh || common.seatMeh; p.say.exitYes = p.say.exitYes || common.exitYes; }); return list; }
  function paxJP() {
    return withCommon([
      { id: 'p1', art: 'passenger_female_01', issue: 'tutorial', look: { skin: '#f6d7bf', hair: '#3b2a22', style: 'bob', outfit: '#e9a3a3', g: 'f' },
        pp: { sur: 'SATO', given: 'MISAKI', nat: 'JPN', no: 'XS4825107', dob: '1998-04-12', sex: 'F', exp: '2031-05-12' },
        pnr: { rloc: 'K7QX2M', sur: 'SATO', given: 'MISAKI', title: 'MS', cls: 'Y', ssr: [], req: 'window' },
        bags: [{ kg: 18.4 }], carry: 6.0, dg: 'none',
        say: { hello: common.hello, seat: L('窓側の席だとうれしいです。', '창가 자리면 좋겠어요.', 'A window seat would be great.'), dg: common.dgNone, thanks: common.thanks } },
      { id: 'p2', art: 'passenger_male_02', issue: 'name', look: { skin: '#f3d3b5', hair: '#1f1f24', style: 'short', outfit: '#5a7bb5', g: 'm' },
        pp: { sur: 'KIM', given: 'MINJUN', nat: 'KOR', no: 'M48217730', dob: '1991-11-02', sex: 'M', exp: '2030-02-20' },
        pnr: { rloc: 'P3LW8D', sur: 'KIM', given: 'MINJIN', title: 'MR', cls: 'Y', ssr: [], req: null },
        bags: [{ kg: 21.0 }], carry: 7.5, dg: 'none',
        say: { hello: L('ソウルに帰ります。予約は会社の人がしてくれました。', '서울로 돌아갑니다. 예약은 회사 사람이 해 줬어요.', "I'm heading home to Seoul. Someone at my company booked it."),
               seat: L('どこでも大丈夫です。', '아무 데나 괜찮아요.', 'Anywhere is fine.'), dg: common.dgNone, thanks: common.thanks,
               fix: L('え、名前が違っていましたか？ 直してもらえて助かります。', '어, 이름이 틀렸었나요? 고쳐 주셔서 다행이에요.', 'Oh, was my name wrong? Thanks for fixing it.'),
               rebook: L('えっ、予約を取り直すんですか…。わかりました。', '네? 예약을 다시 해야 하나요…. 알겠습니다.', 'What, I have to book again…? All right.') } },
      { id: 'p3', art: 'passenger_female_03', issue: 'infantExit', look: { skin: '#f7dcc6', hair: '#5a3a28', style: 'long', outfit: '#8cc5a8', g: 'f', baby: true },
        pp: { sur: 'TANAKA', given: 'HARUKA', nat: 'JPN', no: 'XT1093384', dob: '1961-07-30', sex: 'F', exp: '2029-09-01' },
        inf: { sur: 'TANAKA', given: 'SORA', dob: '2025-12-04', no: 'XT5520918', exp: '2030-12-01' },
        pnr: { rloc: 'H9NB4C', sur: 'TANAKA', given: 'HARUKA', title: 'MRS', cls: 'Y', ssr: ['INFT TANAKA/SORA 04DEC25'], req: 'exit' },
        bags: [{ kg: 22.0 }, { kg: 6.5, stroller: true }], carry: 5.0, dg: 'none',
        say: { hello: L('まだ赤ちゃんの孫と一緒です。足元の広い非常口の席にしてもらえますか？', '아기 손주와 함께 왔어요. 다리 공간이 넓은 비상구 좌석으로 해 주실 수 있나요?', "I'm travelling with my baby grandchild. Could I have an exit row seat for the legroom?"),
               seat: L('足元の広い非常口の席は、空いていますか？', '다리 공간이 넓은 비상구 좌석이 비어 있나요?', 'Is an exit row seat with more legroom available?'),
               exitNoReply: L('そうなんですね。じゃあ、前の方の通路側でお願いします。', '그렇군요. 그럼 앞쪽 통로 쪽으로 부탁해요.', 'I see. Then a seat near the front on the aisle, please.'),
               dg: common.dgNone, thanks: common.thanks } },
      { id: 'p4', art: 'passenger_male_03', issue: 'battery', look: { skin: '#efcfb2', hair: '#2b2b2b', style: 'short', outfit: '#3d4e63', g: 'm', tie: true },
        pp: { sur: 'ITO', given: 'KENJI', nat: 'JPN', no: 'XR7731150', dob: '1962-02-18', sex: 'M', exp: '2032-03-03' },
        pnr: { rloc: 'B2ZT6R', sur: 'ITO', given: 'KENJI', title: 'MR', cls: 'Y', ssr: [], req: 'aisle' },
        bags: [{ kg: 16.8 }], carry: 7.0, dg: 'pb', pb: [{ mAh: 10000, v: 3.7 }, { mAh: 20000, v: 3.7 }, { mAh: 30000, v: 3.7 }],
        say: { hello: L('出張です。通路側でお願いします。', '출장입니다. 통로 쪽으로 부탁합니다.', "I'm on a business trip. An aisle seat, please."),
               seat: L('通路側で。', '통로 쪽으로요.', 'Aisle, please.'),
               dg: L('はい、自分で詰めて、ずっと持っていました。あ、電池…モバイルバッテリーなら、スーツケースに3つ入れています。', '네, 직접 쌌고 계속 갖고 있었어요. 아, 배터리… 보조배터리라면 캐리어에 3개 넣었어요.', 'Yes, I packed it and it has been with me. Oh, batteries… I have three power banks in my suitcase.'),
               pbShip: L('わかりました。送れるかどうか、案内された窓口で確認します。', '알겠습니다. 안내받은 창구에서 배송 가능한지 확인할게요.', "All right. I'll check at the counter you mentioned whether it can be shipped."),
               pbDiscard: L('そうですか…。では、指定の手順で処分をお願いします。', '그렇군요…. 그럼 지정된 절차에 따라 처리해 주세요.', 'I see… Then please dispose of it under the proper procedure.'),
               thanks: common.thanks } },
      { id: 'p5', art: 'passenger_male_01', issue: 'overweight', look: { skin: '#f2d2b6', hair: '#6b4a2b', style: 'short', outfit: '#d8b45a', g: 'm' },
        pp: { sur: 'NAKAMURA', given: 'YUTO', nat: 'JPN', no: 'XS6602841', dob: '2001-09-09', sex: 'M', exp: '2033-01-15' },
        pnr: { rloc: 'Z5MC1K', sur: 'NAKAMURA', given: 'YUTO', title: 'MR', cls: 'Y', ssr: [], req: null },
        bags: [{ kg: 27.6 }], carry: 5.0, dg: 'none',
        say: { hello: L('留学先に戻ります。荷物が多くて…', '유학 가는 곳으로 돌아가요. 짐이 많아서…', "I'm going back to my university. I have a lot of luggage…"),
               seat: L('どこでもいいです。', '아무 데나 좋아요.', 'Anywhere.'), dg: common.dgNone, thanks: common.thanks,
               pay: L('わかりました、払います。', '알겠습니다, 낼게요.', 'OK, I\'ll pay.'),
               move: L('手荷物に移します。ちょっと待ってください。', '기내 가방으로 옮길게요. 잠깐만요.', "I'll move some into my carry-on. Just a moment.") } },
      { id: 'p6', art: 'passenger_female_02', issue: 'visa', look: { skin: '#e6b893', hair: '#b07a3a', style: 'long', outfit: '#7b6fb0', g: 'f' },
        pp: { sur: 'ARDEN', given: 'LISA', nat: 'LUM', no: 'LM0284471', dob: '1995-06-21', sex: 'F', exp: '2031-08-30' },
        visa: { dest: 'KR', type: 'C-3', until: '2026-10-08' },
        pnr: { rloc: 'Q8RD3V', sur: 'ARDEN', given: 'LISA', title: 'MS', cls: 'Y', ssr: [], req: null },
        bags: [{ kg: 19.2 }], carry: 6.0, dg: 'none',
        say: { hello: L('ソウルの友だちに会いに行きます。', '서울에 있는 친구를 만나러 가요.', "I'm visiting a friend in Seoul."),
               seat: L('どこでも。', '아무 데나요.', 'Anywhere.'), dg: common.dgNone, thanks: common.thanks,
               plea: L('2日過ぎただけです…何とかなりませんか？', '이틀 지났을 뿐인데… 어떻게 안 될까요?', "It's only two days over… isn't there anything you can do?"),
               denyOk: L('…わかりました。お話を聞きます。', '…알겠습니다. 설명을 들을게요.', '…All right. I will listen.') } }
    ]);
  }
  /* 한국 근무지: 같은 구조, 국적·목적지·통화가 바뀜 */
  function paxKR() {
    var P = paxJP();
    var map = {
      p1: { pp: { sur: 'PARK', given: 'JIYEON', nat: 'KOR', no: 'M20481577' }, pnr: { sur: 'PARK', given: 'JIYEON' }, look: { hair: '#2a1f1a' } },
      p2: { pp: { sur: 'SATO', given: 'TAKUMI', nat: 'JPN', no: 'XS3301926', sex: 'M' }, pnr: { sur: 'SATOU', given: 'TAKUMI' } },
      p3: { pp: { sur: 'LEE', given: 'SEOYEON', nat: 'KOR', no: 'M77310452' }, inf: { sur: 'LEE', given: 'DOYUN', no: 'M90122774' }, pnr: { sur: 'LEE', given: 'SEOYEON', ssr: ['INFT LEE/DOYUN 04DEC25'] } },
      p4: { pp: { sur: 'CHOI', given: 'HYUNWOO', nat: 'KOR', no: 'M51188206' }, pnr: { sur: 'CHOI', given: 'HYUNWOO' } },
      p5: { pp: { sur: 'JUNG', given: 'MINHO', nat: 'KOR', no: 'M66040139' }, pnr: { sur: 'JUNG', given: 'MINHO' } },
      p6: { visa: { dest: 'JP', type: 'SHORT-TERM', until: '2026-10-08' } }
    };
    P.forEach(function (p) {
      var m = map[p.id]; if (!m) return;
      ['pp', 'pnr', 'look', 'inf'].forEach(function (k) { if (m[k]) p[k] = Object.assign({}, p[k] || {}, m[k]); });
      if (m.visa) p.visa = m.visa;
      if (p.say.hello === common.hello) p.say.hello = common.helloJP;
    });
    P[1].say.hello = L('東京の家に帰ります。予約は旅行会社です。', '도쿄 집으로 돌아갑니다. 예약은 여행사에서 했어요.', "I'm going home to Tokyo. A travel agency made the booking.");
    P[3].say.hello = L('出張です。通路側でお願いします。', '출장입니다. 통로 쪽으로 부탁합니다.', "I'm on a business trip. An aisle seat, please.");
    P[4].say.hello = L('日本の大学に戻ります。荷物が多くて…', '일본 대학으로 돌아가요. 짐이 많아서…', "I'm going back to my university in Japan. Lots of luggage…");
    P[5].say.hello = L('東京の友だちに会いに行きます。', '도쿄 친구를 만나러 가요.', "I'm visiting a friend in Tokyo.");
    return P;
  }
  window.MISSION_CI01 = {
    id: 'pax.ci.01', module: 'checkin', level: 'agent',
    lessons: ['passenger/1-1', 'passenger/1-3', 'passenger/1-5', 'passenger/1-10', 'passenger/1-13', 'ciq/1-1', 'ciq/1-2'],
    date: '2026-10-10',
    variants: {
      JP: { flight: 'VELA 301', from: 'NRT', to: 'ICN', std: '10:30', start: '08:40', close: '09:30', board: '09:55', destC: 'KR', pax: paxJP },
      KR: { flight: 'VELA 302', from: 'ICN', to: 'NRT', std: '13:30', start: '11:40', close: '12:30', board: '12:55', destC: 'JP', pax: paxKR }
    },
    aircraft: { type: 'B737-800', rows: 30, cols: 'ABCDEF', exitRows: [14, 15], inop: ['22C'],
                /* 사전 배정 좌석(교육용): 8열 ABC 블록에 유아 동반 승객 1명 */
                taken: ['1A', '1B', '1C', '2D', '2E', '3A', '4F', '5C', '5D', '6A', '6B', '7E', '8A', '8B', '9F', '10C', '10D', '11A', '12B', '12E', '13F', '16A', '16B', '17C', '18D', '19A', '19F', '20B', '21E', '23A', '24C', '24D', '25F', '26A', '27B', '28E', '29C', '30D'],
                infantSeats: ['8B'] },
    /* 행동별 소요 시간(게임 내 분) */
    cost: { greet: 0.3, pnr: 0.5, passport: 0.6, entry: 0.5, seat: 0.5, weigh: 0.5, tag: 0.3, dg: 0.4, bp: 0.4 }
  };
})();

/* dialog.js */
/* AIRLINE SAGA — 직원 대사(카운터 접객 일본어) + 음성 배역
   승객 대사는 mission_ci01.js의 p.say. 음성은 일본어(ja) 문장 그대로를 열쇠로 찾음 → 문장을 고치면 음성도 다시 만들어야 함 */
(function () {
  var L = function (ja, ko, en) { return { ja: ja, ko: ko, en: en }; };
  window.DIALOG = {
    staff: {
      greet: L('おはようございます。航空券とパスポートをお願いいたします。', '안녕하세요. 항공권과 여권을 부탁드립니다.', 'Good morning. May I see your ticket and passport, please?'),
      pnrOk: L('ご予約を確認いたしました。', '예약을 확인했습니다.', 'I have found your booking.'),
      ppTake: L('パスポートをお預かりいたします。', '여권을 잠시 받겠습니다.', 'Let me take your passport for a moment.'),
      nameDiff: L('恐れ入ります。ご予約のお名前とパスポートのお名前が一部異なりますので、確認させていただきます。', '죄송합니다. 예약하신 이름과 여권의 이름이 일부 달라서 확인하겠습니다.', 'Excuse me. The name on your booking differs slightly from your passport, so let me check.'),
      visaNg: L('申し訳ございません。ビザの有効期限が過ぎておりますので、このままではご搭乗いただけません。', '죄송합니다. 비자 유효기간이 지나서 이대로는 탑승하실 수 없습니다.', 'I am very sorry. Your visa has expired, so we cannot accept you for this flight as it is.'),
      seatAsk: L('お席のご希望はございますか？', '원하시는 좌석이 있으신가요?', 'Do you have a seat preference?'),
      seatConfirm: L('こちらのお席でよろしいでしょうか。', '이 좌석으로 배정해 드려도 괜찮으실까요?', 'Would this seat be all right for you?'),
      exitExplain: L('非常口座席は、緊急の際に乗務員のお手伝いをお願いするお席です。ご協力いただけますか？', '비상구 좌석은 비상시 승무원을 도와주시는 자리입니다. 협조해 주실 수 있나요?', 'Exit row passengers are asked to help the crew in an emergency. Would you be willing to assist?'),
      exitNo: L('申し訳ございません。乳幼児をお連れのお客様には、非常口座席をご案内できません。前方の通路側のお席はいかがでしょうか。', '죄송합니다. 유아를 동반하신 고객님께는 비상구 좌석을 배정해 드릴 수 없습니다. 앞쪽 통로 좌석은 어떠실까요?', 'I am sorry, we cannot offer an exit row seat to passengers travelling with an infant. How about an aisle seat near the front?'),
      weigh: L('お預けのお荷物を、こちらにお載せください。', '맡기실 짐을 이쪽에 올려 주세요.', 'Please place the bag you are checking in here.'),
      dg: L('お荷物はご自身でお詰めになりましたか。お荷物から目を離されたことはございませんか。他の方からお預かりになった物や、ライター、予備電池、スプレーなどは入っていませんか。', '짐은 직접 꾸리셨나요? 짐에서 눈을 떼거나 자리를 비우신 적이 있으신가요? 다른 분에게 받은 물건이나 라이터, 여분 배터리, 스프레이 등이 들어 있나요?', 'Did you pack your bags yourself? Have they been out of your sight at any time? Is there anything from someone else, or any lighters, spare batteries or sprays inside?'),
      pbOut: L('モバイルバッテリーはお預けいただけませんので、一度お出しいただけますか。', '보조배터리는 맡기실 수 없으니 한번 꺼내 주시겠어요?', 'Power banks cannot be checked in. Could you take them out, please?'),
      over: L('無料でお預かりできる23キロを超えております。超過料金をお支払いいただくか、機内持ち込みの制限内で、お荷物の一部を手荷物にお移しいただけます。', '무료 위탁 허용량인 23kg을 초과했습니다. 초과 요금을 내시거나, 기내 반입 제한 범위 안에서 일부 물품을 기내 가방으로 옮기실 수 있습니다.', 'Your bag is over the free 23 kg. You can pay the excess fee, or move some items to your carry-on within the cabin limits.'),
      bpIssue: L('お待たせいたしました。こちらが搭乗券です。', '기다려 주셔서 감사합니다. 탑승권입니다.', 'Thank you for waiting. Here is your boarding pass.'),
      deny: L('ご搭乗のご案内ができず、申し訳ございません。担当者から詳しくご説明いたします。', '탑승을 도와드리지 못해 죄송합니다. 담당자가 자세히 설명해 드리겠습니다.', 'I am sorry we cannot accept you for this flight. A supervisor will explain the details.'),
      bye: function (gate, board) { return L('搭乗口は' + gate + '番、搭乗開始は' + board + 'です。いってらっしゃいませ。', '탑승구는 ' + gate + '번, 탑승 시작은 ' + board + '입니다. 즐거운 여행 되세요.', 'Gate ' + gate + ', boarding starts at ' + board + '. Have a good flight.'); }
    },
    /* 음성 배역 (Style-Bert-VITS2) — 승객 그림(art)별로 고정, 한국 근무지도 같은 목소리 */
    cast: {
      staff: { voice: 'ami' },
      passenger_female_01: { voice: 'tsukuyomi' },
      passenger_male_02: { voice: 'M1' },
      passenger_female_03: { voice: 'F2', pitch: 0.96, length: 1.06 },
      passenger_male_03: { voice: 'M2', pitch: 0.95, length: 1.05 },
      passenger_male_01: { voice: 'M1', pitch: 1.07, length: 0.97, style: 'Happy', sw: 0.6 },
      passenger_female_02: { voice: 'lux' }
    }
  };
})();

/* lessons.js */
window.LESSONS={"passenger/1-1":{"ja":"カウンターオープン前の準備とレイアウト","ko":"카운터 오픈 전 준비와 레이아웃","en":"Getting the Counter Ready, and How to Lay It Out"},"passenger/1-3":{"ja":"チェックインの流れとパスポート・ビザ確認","ko":"체크인 흐름과 여권·비자 확인","en":"The Check-in Flow and Checking Passports and Visas"},"passenger/1-5":{"ja":"座席指定・アップグレードと非常口座席","ko":"좌석 배정·업그레이드와 비상구 열 좌석","en":"Seat Assignment, Upgrades and Exit Row Seats"},"passenger/1-10":{"ja":"手荷物規定① 受託・機内持ち込み・超過","ko":"수하물 규정 ① 위탁·기내·초과","en":"Baggage Rules 1: Checked, Carry-on and Excess"},"passenger/1-12":{"ja":"危険物の基礎 ― お客様の手荷物で気をつけるもの","ko":"위험물 기초 — 승객 수하물에서 주의할 것","en":"Dangerous Goods Basics: What to Watch in Passenger Baggage"},"passenger/1-13":{"ja":"リチウム電池とモバイルバッテリー ― 日韓の最新ルール","ko":"리튬 배터리와 보조배터리 — 한일 최신 규정","en":"Lithium Batteries and Power Banks: the Latest Rules in Japan and Korea"},"passenger/2-3":{"ja":"開披検査への対応","ko":"개방 검사 대응","en":"Handling a Bag Search with the Passenger"},"ciq/1-1":{"ja":"旅券と査証 ― カウンターで何を確認するか","ko":"여권과 비자 — 카운터에서 무엇을 확인하나","en":"Passports and Visas: What to Check at the Counter"},"ciq/1-2":{"ja":"TIMATIC ― 渡航条件を確認するためのデータベース","ko":"TIMATIC — 입국 조건을 찾는 도구","en":"TIMATIC: The Tool for Looking Up Entry Requirements"},"ciq/0-4":{"ja":"事前に送る旅客の情報（API・PNR）と電子渡航認証","ko":"미리 보내는 승객 정보(API·PNR)와 전자여행허가","en":"Passenger Data Sent in Advance (API, PNR) and Electronic Travel Authorisations"},"ciq/1-4":{"ja":"入国拒否と送還の実際","ko":"입국 거부와 송환의 실제","en":"Refusal of Entry and Removal in Practice"}};

/* scene.js */
/* 2.5D 카운터 장면 + SD(2.5등신) 인물 — 캐릭터는 교체 가능한 레이어(SPEC: 영상과 공용 규격으로 확장 예정)
   window.SPRITES.sd(o) : 발끝 중앙 (0,0) 기준 SVG 문자열 */
(function () {
  var S = window.SPRITES = {};
  function shade(hex, k) { var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    r = Math.max(0, Math.min(255, Math.round(r * k))); g = Math.max(0, Math.min(255, Math.round(g * k))); b = Math.max(0, Math.min(255, Math.round(b * k)));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1); }
  S.shade = shade;
  /* o: skin hair style(bob|short|long|bun) outfit g tie baby expr(happy|neutral|worried|upset) flip uniform(bool) scale */
  S.sd = function (o) {
    o = o || {}; var sk = o.skin || '#f6d7bf', hr = o.hair || '#3b2a22', of = o.outfit || '#5a7bb5', ex = o.expr || 'neutral';
    var s = '';
    s += '<ellipse cx="0" cy="0" rx="22" ry="5" fill="rgba(24,50,61,.16)"/>';
    /* 다리 */
    s += '<rect x="-11" y="-26" width="9" height="24" rx="4" fill="' + (o.uniform ? '#1d3a46' : shade(of, .55)) + '"/><rect x="2" y="-26" width="9" height="24" rx="4" fill="' + (o.uniform ? '#1d3a46' : shade(of, .55)) + '"/>';
    s += '<rect x="-13" y="-5" width="12" height="6" rx="3" fill="#2c2c33"/><rect x="1" y="-5" width="12" height="6" rx="3" fill="#2c2c33"/>';
    /* 몸 */
    s += '<path d="M-17 -24 Q-18 -54 0 -56 Q18 -54 17 -24 Z" fill="' + of + '"/>';
    if (o.uniform) s += '<path d="M-6 -56 L0 -44 L6 -56" fill="#fff"/><path d="M-7 -54 Q0 -46 7 -54 L4 -50 Q0 -44 -4 -50 Z" fill="#e3a73b"/><circle cx="9" cy="-44" r="2.4" fill="#e3a73b"/>';
    if (o.tie) s += '<path d="M0 -55 l-3 5 l3 13 l3 -13 z" fill="#b83b3b"/>';
    /* 팔 */
    s += '<rect x="-23" y="-52" width="8" height="24" rx="4" fill="' + shade(of, .9) + '"/><rect x="15" y="-52" width="8" height="24" rx="4" fill="' + shade(of, .9) + '"/>';
    s += '<circle cx="-19" cy="-27" r="4.5" fill="' + sk + '"/><circle cx="19" cy="-27" r="4.5" fill="' + sk + '"/>';
    if (o.baby) s += '<g transform="translate(-4 -40)"><ellipse rx="12" ry="9" fill="#fff4d6" stroke="#e7d39b" stroke-width="1.5"/><circle cx="-4" cy="-3" r="7" fill="' + sk + '"/><path d="M-10 -6 q6 -8 12 0" fill="#c9a77a"/><circle cx="-6" cy="-3" r="1" fill="#333"/><circle cx="-2" cy="-3" r="1" fill="#333"/></g>';
    /* 머리 (큰 머리 = SD) */
    var hy = -82;
    if (o.style === 'long') s += '<path d="M-27 ' + (hy - 2) + ' Q-30 ' + (hy + 30) + ' -18 ' + (hy + 34) + ' L18 ' + (hy + 34) + ' Q30 ' + (hy + 30) + ' 27 ' + (hy - 2) + ' Z" fill="' + hr + '"/>';
    if (o.style === 'bun') s += '<circle cx="-2" cy="' + (hy - 30) + '" r="10" fill="' + hr + '"/>';
    s += '<circle cx="0" cy="' + hy + '" r="27" fill="' + sk + '"/>';
    /* 앞머리 */
    var top = hy - 27;
    if (o.style === 'short') s += '<path d="M-27 ' + (hy - 2) + ' Q-26 ' + (top - 4) + ' 0 ' + (top - 3) + ' Q26 ' + (top - 4) + ' 27 ' + (hy - 2) + ' Q18 ' + (hy - 14) + ' 4 ' + (hy - 12) + ' Q-12 ' + (hy - 16) + ' -27 ' + (hy - 2) + ' Z" fill="' + hr + '"/>';
    else s += '<path d="M-28 ' + (hy + 6) + ' Q-30 ' + (top - 6) + ' 0 ' + (top - 4) + ' Q30 ' + (top - 6) + ' 28 ' + (hy + 6) + ' Q20 ' + (hy - 10) + ' 2 ' + (hy - 14) + ' Q-16 ' + (hy - 8) + ' -28 ' + (hy + 6) + ' Z" fill="' + hr + '"/>';
    /* 얼굴 */
    var ey = hy + 4;
    if (ex === 'happy') s += '<path d="M-12 ' + ey + ' q4 -5 8 0 M4 ' + ey + ' q4 -5 8 0" stroke="#2b2b33" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    else s += '<ellipse cx="-8" cy="' + ey + '" rx="3.3" ry="4.4" fill="#2b2b33"/><ellipse cx="8" cy="' + ey + '" rx="3.3" ry="4.4" fill="#2b2b33"/><circle cx="-7" cy="' + (ey - 1.6) + '" r="1.2" fill="#fff"/><circle cx="9" cy="' + (ey - 1.6) + '" r="1.2" fill="#fff"/>';
    if (ex === 'worried' || ex === 'upset') s += '<path d="M-13 ' + (ey - 9) + ' l8 ' + (ex === 'upset' ? 3 : -2) + ' M13 ' + (ey - 9) + ' l-8 ' + (ex === 'upset' ? 3 : -2) + '" stroke="#2b2b33" stroke-width="2" stroke-linecap="round"/>';
    s += '<ellipse cx="-15" cy="' + (ey + 8) + '" rx="4.5" ry="2.6" fill="#f3a9a0" opacity=".6"/><ellipse cx="15" cy="' + (ey + 8) + '" rx="4.5" ry="2.6" fill="#f3a9a0" opacity=".6"/>';
    var my = ey + 11;
    if (ex === 'happy') s += '<path d="M-5 ' + my + ' q5 6 10 0 z" fill="#b5524b"/>';
    else if (ex === 'upset') s += '<path d="M-5 ' + (my + 3) + ' q5 -5 10 0" stroke="#7a3b3b" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    else if (ex === 'worried') s += '<path d="M-4 ' + (my + 1) + ' h8" stroke="#7a3b3b" stroke-width="2.2" stroke-linecap="round"/>';
    else s += '<path d="M-4 ' + my + ' q4 3 8 0" stroke="#7a3b3b" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    if (o.uniform && o.style === 'bun') s += '<rect x="-14" y="' + (top + 2) + '" width="28" height="5" rx="2.5" fill="#e3a73b" opacity=".9"/>';
    var tr = 'translate(' + (o.x || 0) + ' ' + (o.y || 0) + ') scale(' + ((o.flip ? -1 : 1) * (o.scale || 1)) + ' ' + (o.scale || 1) + ')';
    return '<g transform="' + tr + '">' + s + '</g>';
  };
  S.logo = function (x, y, r, c1, c2) { /* Vela Air: 돛(sail) + 별 — 가상 브랜드 */
    return '<g transform="translate(' + x + ' ' + y + ')"><circle r="' + r + '" fill="' + c1 + '"/><path d="M' + (-r * .45) + ' ' + (r * .45) + ' L' + (r * .05) + ' ' + (-r * .62) + ' L' + (r * .1) + ' ' + (r * .45) + ' Z" fill="#fff"/><path d="M' + (r * .22) + ' ' + (r * .35) + ' L' + (r * .22) + ' ' + (-r * .25) + ' Q' + (r * .6) + ' ' + (r * .1) + ' ' + (r * .52) + ' ' + (r * .35) + ' Z" fill="#fff" opacity=".85"/><circle cx="' + (r * .42) + '" cy="' + (-r * .45) + '" r="' + (r * .14) + '" fill="' + c2 + '"/></g>';
  };
  function bag(x, y, kg, c) { var h = 20 + Math.min(18, kg); return '<g transform="translate(' + x + ' ' + y + ')"><rect x="-13" y="' + (-h) + '" width="26" height="' + h + '" rx="5" fill="' + c + '"/><rect x="-4" y="' + (-h - 7) + '" width="8" height="8" rx="2" fill="none" stroke="#4a4f57" stroke-width="2.4"/><rect x="-13" y="' + (-h / 2) + '" width="26" height="3" fill="rgba(0,0,0,.15)"/></g>'; }
  S.bag = bag;
  /* 장면 기본 틀 (한 번만 그림) */
  S.scene = function (fids) {
    var w = '';
    w += '<defs><linearGradient id="sk" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#bfe0f2"/><stop offset="1" stop-color="#eaf5fb"/></linearGradient>' +
         '<linearGradient id="fl" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#e9eef1"/><stop offset="1" stop-color="#d3dde2"/></linearGradient></defs>';
    w += '<rect width="400" height="235" fill="#eef3f6"/>';
    /* 창과 바깥 */
    w += '<rect x="0" y="0" width="400" height="104" fill="url(#sk)"/>';
    w += '<g opacity=".9"><path d="M250 74 h120 q14 0 20 8 l-6 3 h-140 z" fill="#ffffff"/><path d="M352 74 l14 -22 h10 l-6 22 z" fill="#0f5e6e"/>' + S.logo(366, 62, 6, '#0f5e6e', '#e3a73b') + '<rect x="262" y="77" width="70" height="3" fill="#c7d6de"/></g>';
    for (var i = 0; i < 9; i++) w += '<rect x="' + (i * 46) + '" y="0" width="4" height="104" fill="#9fb6c2"/>';
    w += '<rect x="0" y="100" width="400" height="6" fill="#9fb6c2"/>';
    /* 바닥 (원근 타일) */
    w += '<path d="M0 106 H400 V235 H0 Z" fill="url(#fl)"/>';
    for (var j = 0; j < 7; j++) w += '<line x1="' + (-120 + j * 110) + '" y1="235" x2="' + (60 + j * 50) + '" y2="106" stroke="#c9d4da" stroke-width="1"/>';
    for (var k = 0; k < 5; k++) w += '<line x1="0" y1="' + (120 + k * k * 6 + k * 10) + '" x2="400" y2="' + (120 + k * k * 6 + k * 10) + '" stroke="#c9d4da" stroke-width="1"/>';
    /* FIDS·카운터 번호 */
    w += '<g transform="translate(18 14)"><rect width="150" height="40" rx="6" fill="#132c36"/><text x="10" y="17" font-family="IBM Plex Mono,monospace" font-size="11" fill="#ffcf6b" id="fids1">' + fids[0] + '</text><text x="10" y="32" font-family="IBM Plex Mono,monospace" font-size="10" fill="#7be0b2" id="fids2">' + fids[1] + '</text></g>';
    w += '<g transform="translate(182 14)"><rect width="46" height="26" rx="6" fill="#0f5e6e"/><text x="23" y="18" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="12" font-weight="700" fill="#fff" id="ctrno">' + fids[2] + '</text></g>';
    /* 줄 서는 곳: 차단봉 */
    w += '<g id="queue"></g>';
    w += '<g stroke="#8aa0ab" stroke-width="2"><line x1="250" y1="150" x2="390" y2="150"/></g>';
    for (var q = 0; q < 4; q++) w += '<rect x="' + (250 + q * 46) + '" y="138" width="4" height="22" rx="2" fill="#8aa0ab"/>';
    /* 직원 (뒤) */
    w += '<g id="agent">' + S.sd({ x: 78, y: 182, skin: '#f6d7bf', hair: '#2f2420', style: 'bun', outfit: '#0f5e6e', uniform: true, expr: 'happy', scale: .95 }) + '</g>';
    /* 카운터 (2.5D: 윗면 + 앞면) */
    w += '<path d="M20 150 L176 150 L196 166 L40 166 Z" fill="#cbd7de"/>';
    w += '<path d="M40 166 L196 166 L196 222 L40 222 Z" fill="#e8eef1"/><path d="M176 150 L196 166 L196 222 L176 206 Z" fill="#b7c6ce"/>';
    w += S.logo(118, 192, 14, '#0f5e6e', '#e3a73b') + '<text x="138" y="197" font-family="M PLUS Rounded 1c,sans-serif" font-weight="800" font-size="12" fill="#0f5e6e">Vela Air</text>';
    w += '<rect x="44" y="132" width="38" height="24" rx="3" fill="#33435a"/><rect x="47" y="135" width="32" height="17" rx="2" fill="#7fd1c7"/><rect x="60" y="156" width="6" height="4" fill="#33435a"/>';
    /* 저울 (손님 쪽) */
    w += '<path d="M198 210 L240 210 L250 218 L208 218 Z" fill="#9fb3be"/><rect x="200" y="196" width="22" height="12" rx="3" fill="#0a2b1f"/><text x="211" y="205" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="7.5" fill="#8ef0b5" id="scalelcd">0.0</text>';
    w += '<g id="scalebag"></g>';
    /* 손님 자리 */
    w += '<g id="paxwrap" style="transition:transform .7s ease"><g id="pax"></g></g>';
    return '<svg viewBox="0 0 400 235" role="img" aria-label="check-in counter">' + w + '</svg>';
  };
})();

/* stage.js */
/* AIRLINE SAGA — 체크인 장면 레이어 (GPT 제작 PNG/WebP 에셋)
   이미지 = 배경·직원·승객·카운터·모니터·저울·캐리어·마스코트
   HTML   = 말풍선·FIDS 글자·무게 표시·여권·예약·좌석도·탑승권·판단창 (게임 로직이 갱신)
   배치 단위: 장면 폭/높이에 대한 %. x = 기준점(발 중앙) 가로 위치, b = 발 위치(아래에서), h = 보이는 높이
   에셋을 불러오지 못하면 기존 SVG 인물(window.SPRITES)로 대체 — 임시용 */
(function () {
  var A = window.ASSETS || {}, SP = window.SPRITES;
  var AR = 16 / 9; /* 배경 1600×900 */
  var STG = window.STG = {};
  function box(id, x, b, h, flip) {
    var a = A[id]; if (!a) return '';
    var w = h * (a.w / a.h) / AR;
    var left = x - (flip ? (1 - a.px) : a.px) * w;
    var bottom = b - (1 - a.py) * h;
    return 'left:' + left.toFixed(2) + '%;bottom:' + bottom.toFixed(2) + '%;height:' + h + '%;width:' + w.toFixed(2) + '%;' + (flip ? 'transform:scaleX(-1);' : '');
  }
  function img(id, cls, x, b, h, flip, extra) {
    var a = A[id];
    if (!a) return '';
    return '<img class="sp ' + (cls || '') + '" src="' + a.src + '" alt="" draggable="false" data-asset="' + id + '" style="' + box(id, x, b, h, flip) + (extra || '') + '" onerror="STG.fail(this)">';
  }
  STG.has = function (id) { return !!A[id]; };
  STG.src = function (id) { return A[id] ? A[id].src : ''; };
  STG.img = img;
  /* 로드 실패 시 SVG 임시 인물로 바꿈 */
  STG.fail = function (el) {
    var id = el.getAttribute('data-asset') || '';
    var look = el.getAttribute('data-look');
    if (!SP || !/^(passenger|staff)/.test(id)) { el.style.visibility = 'hidden'; return; }
    var o = look ? JSON.parse(look) : { uniform: /^staff/.test(id), style: 'bun', outfit: '#24346b' };
    var s = document.createElement('div'); s.className = 'sp fb'; s.setAttribute('style', el.getAttribute('style'));
    s.innerHTML = '<svg viewBox="-40 -120 80 122" preserveAspectRatio="xMidYMax meet" style="width:100%;height:100%">' + SP.sd(Object.assign({}, o, { x: 0, y: 0, scale: 1 })) + '</svg>';
    el.replaceWith(s);
  };
  /* 사진(여권)·얼굴 아이콘: 승객 PNG의 머리·어깨 부분 */
  STG.face = function (id, cls) {
    var a = A[id]; if (!a) return '';
    return '<span class="face ' + (cls || '') + '" style="background-image:url(\'' + a.src + '\');background-position:' + (a.px * 100).toFixed(0) + '% ' + (cls === 'ppface' ? 1 : 3) + '%"></span>';
  };
  /* 여권 사진: 정면 증명사진(AIRLINE_SAGA_PORTRAITS). 사진 인물 키(p.photo)는 장면 인물(p.art)과 따로 지정 가능 — 사진 불일치 미션용 */
  STG.photoKey = function (p) { var k = p.photo || p.art; return 'passport_' + String(k).replace('passenger_', '') + '_front_01'; };
  STG.portrait = function (p, size) {
    var id = STG.photoKey(p);
    if (A[id]) return '<img class="as-passport-photo' + (size ? ' as-passport-photo--' + size : '') + '" src="' + A[id].src + '" alt="">';
    return STG.face(p.photo || p.art, 'ppface');
  };
  STG.mini = function (p) { /* 판단창 등의 둥근 얼굴 아이콘 */
    var id = STG.photoKey(p);
    if (A[id]) return '<span class="face mface pt" style="background-image:url(\'' + A[id].src + '\')"></span>';
    return STG.face(p.art, 'mface');
  };
  STG.mascot = function (who, pose, cls) {
    var id = who + '_' + (pose || 'idle') + '_01';
    return A[id] ? '<img class="mascot ' + (cls || '') + '" src="' + A[id].src + '" alt="' + (who === 'koradon' ? 'コラドン' : 'コラリン') + '" draggable="false">' : '';
  };
  /* 장면 */
  STG.html = function (o) {
    var h = '<div class="stage" id="stage">';
    h += '<img class="bg" src="' + STG.src(o.evening ? 'checkin_bg_02' : 'checkin_bg_01') + '" alt="" draggable="false">';
    /* 배경 안내판(빈 칸)에 글자를 얹음 */
    h += '<div class="sign s1"><b id="fids1">' + o.flight + '</b><span id="fids2">' + o.to + ' ' + o.std + '</span></div>';
    h += '<div class="sign s2"><b id="ctrno">' + o.counter + '</b></div>';
    h += '<div id="queue" class="lay"></div>';
    h += '<div id="agentwrap" class="lay">' + img('staff_checkin_greet_01', 'agent', 21, -14, 78, false, '') + '</div>';
    h += '<div class="lay">' + img('prop_counter_01', 'counter', 22, -2, 30) + img('prop_monitor_01', 'monitor', 36, 23, 19) + '</div>';
    h += '<div class="lay">' + img('prop_scale_01', 'scale', 54, 2, 25) + '<div id="scalebag" class="lay"></div><div class="lcdpill" id="lcdpill"><span id="scalelcd">0.0</span> kg</div></div>';
    h += '<div id="paxwrap" class="lay"><div id="pax" class="lay"></div></div>';
    h += '</div>';
    return h;
  };
  /* 대기줄: 다음 승객 2~3명을 작게, 뒤쪽 바닥에 */
  STG.queue = function (list) {
    var pos = [[88, 33, 40], [95, 35, 37], [101, 36.5, 35]], h = '';
    list.slice(0, 3).forEach(function (p, i) { h = img(p.art, 'q', pos[i][0], pos[i][1], pos[i][2], false, 'z-index:' + (5 - i) + ';') .replace('<img', '<img data-look=\'' + JSON.stringify(p.look) + '\'') + h; });
    var q = document.getElementById('queue'); if (q) q.innerHTML = h;
  };
  /* 현재 승객 + 만족도·유아 표시 */
  STG.pax = function (p, mood) {
    var el = document.getElementById('pax'); if (!el) return;
    if (!p) { el.innerHTML = ''; return; }
    var cur = el.querySelector('img,.fb');
    var m = mood >= 75 ? 'happy' : mood >= 50 ? 'neutral' : mood >= 30 ? 'worried' : 'upset';
    var pips = Math.max(1, Math.round(mood / 20));
    var meter = '<div class="mood m-' + m + '"><i style="width:' + Math.round(mood) + '%"></i></div>';
    if (cur && cur.getAttribute('data-asset') === p.art && el.dataset.pid === p.id) {
      var mm = el.querySelector('.mood'); if (mm) mm.outerHTML = meter;
      var prev = +el.dataset.mood; el.dataset.mood = mood;
      if (mood < prev - 2) { el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); }
      if (mood > prev + 2) { el.classList.remove('hop'); void el.offsetWidth; el.classList.add('hop'); }
      return;
    }
    el.dataset.pid = p.id; el.dataset.mood = mood;
    el.innerHTML = img(p.art, 'paxi', 73, 1, 81, false).replace('<img', '<img data-look=\'' + JSON.stringify(p.look) + '\'') + meter + (p.inf ? '<div class="infb">INF</div>' : '');
  };
  /* 직원 포즈: idle | greet | check | explain (짧은 페이드) */
  var curPose = 'greet', poseT = null;
  STG.pose = function (pose, back) {
    var el = document.querySelector('#agentwrap img'); if (!el) return;
    clearTimeout(poseT);
    if (pose !== curPose) {
      var id = 'staff_checkin_' + pose + '_01';
      if (!A[id]) return;
      curPose = pose; el.style.opacity = .35;
      setTimeout(function () { el.setAttribute('style', box(id, 21, -14, 78, false)); el.src = A[id].src; el.setAttribute('data-asset', id); }, 90);
    }
    if (back) poseT = setTimeout(function () { STG.pose('idle'); }, back);
  };
  /* 저울 위 짐 */
  STG.bag = function (kind) {
    var el = document.getElementById('scalebag'); if (!el) return;
    var pill = document.getElementById('lcdpill');
    if (!kind) { el.innerHTML = ''; if (pill) pill.classList.remove('on'); return; }
    if (kind === 'stroller') el.innerHTML = '<svg class="sp drop" viewBox="190 150 64 52" style="left:46.5%;bottom:7%;height:18%;width:12%">' + SP.bag(222, 197, 6.5, '#9aa5ad') + '</svg>';
    else el.innerHTML = img('prop_luggage_01', 'drop', 52, 8.5, 25, false);
    if (pill) pill.classList.add('on');
  };
  /* 미리 불러오기 */
  STG.preload = function () { Object.keys(A).forEach(function (k) { var i = new Image(); i.src = A[k].src; }); };
})();

/* voice.js */
/* AIRLINE SAGA — 일본어 대사 음성 (미리 합성한 MP3, window.VOICES에 base64로 내장)
   열쇠 = FNV-1a(배역 + '|' + 일본어 문장). 순서대로 하나씩 재생(겹치지 않음). WebAudio로 재생 → 첫 터치 후 휴대폰에서도 동작 */
(function () {
  var VO = window.VO = { on: true };
  var V = window.VOICES || {}, ctx = null, q = [], playing = null, buf = {}, gen = 0;
  function fnv(s) { var h = 0x811c9dc5; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0; } return ('0000000' + h.toString(16)).slice(-8); }
  VO.key = function (cast, ja) { return fnv(cast + '|' + ja); };
  VO.has = function (cast, ja) { return !!V[VO.key(cast, ja)]; };
  VO.unlock = function () {
    try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === 'suspended') ctx.resume(); } catch (e) {}
  };
  function decode(k, cb) {
    if (buf[k]) return cb(buf[k]);
    try {
      var b64 = V[k], bin = atob(b64), u = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
      ctx.decodeAudioData(u.buffer, function (ab) { buf[k] = ab; cb(ab); }, function () { cb(null); });
    } catch (e) { cb(null); }
  }
  function pump() {
    if (playing || !q.length || !ctx) return;
    var it = q.shift(), my = gen;
    playing = it;
    decode(it.k, function (ab) {
      if (my !== gen) return;
      if (!ab) { playing = null; return pump(); }
      var src = ctx.createBufferSource(), g = ctx.createGain(); g.gain.value = 1;
      src.buffer = ab; src.connect(g); g.connect(ctx.destination);
      var done = false, fin = function () { if (done || my !== gen) return; done = true; clearTimeout(it.guard); playing = null; setTimeout(pump, 160); };
      src.onended = fin;
      /* 안전장치: 기기가 소리를 내지 못해 끝 신호가 오지 않아도 대사 길이만큼 지나면 다음으로 */
      it.guard = setTimeout(fin, ab.duration * 1000 + 700);
      it.src = src; src.start();
      if (it.onstart) it.onstart();
    });
  }
  VO.say = function (cast, ja) {
    if (!VO.on || !ja) return false;
    var k = VO.key(cast, ja); if (!V[k]) return false;
    VO.unlock(); if (!ctx) return false;
    q.push({ k: k });
    while (q.length > 2) q.shift(); /* 빠르게 조작해도 음성이 화면보다 너무 늦지 않게: 대기는 최근 2줄까지 */
    pump(); return true;
  };
  VO.stop = function () { gen++; q = []; if (playing) clearTimeout(playing.guard); if (playing && playing.src) { try { playing.src.stop(); } catch (e) {} } playing = null; };
  /* 재생 중인 대사가 모두 끝나면 cb (최대 maxMs 기다림) */
  VO.whenIdle = function (cb, maxMs) {
    var t0 = Date.now();
    (function chk() { if ((!playing && !q.length) || !VO.on || Date.now() - t0 > (maxMs || 10000)) return cb(); setTimeout(chk, 150); })();
  };
  VO._st = function () { return { state: ctx && ctx.state, t: ctx && ctx.currentTime, playing: !!playing, q: q.length }; };
  VO.busy = function () { return !!playing || q.length > 0; };
  VO.count = function () { return Object.keys(V).length; };
})();

/* game.js */
/* AIRLINE SAGA — 게임 본체 (Stage 01 체크인) (상태·화면·판정·리플레이)
   저장 키: acn-saga-v1 (사이트의 다른 기록과 분리) */
(function () {
  'use strict';
  var R = window.RULES, M = window.MISSION_CI01, SP = window.SPRITES, LS = window.LESSONS, STG = window.STG, D = window.DIALOG.staff, VO = window.VO;
  var $ = function (s) { return document.querySelector(s); };
  var L = function (ja, ko, en) { return { ja: ja, ko: ko, en: en }; };
  var G = { lang: 'ja', country: 'JP', sound: true, hints: true, voice: true, screen: 'title' };
  function tx(o) { if (o == null) return ''; if (typeof o === 'string') return o; return o[G.lang] || o.ja || ''; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function save() { try { localStorage.setItem('acn-saga-v1', JSON.stringify({ lang: G.lang, country: G.country, sound: G.sound, hints: G.hints, voice: G.voice, best: G.best || {} })); } catch (e) {} }
  function load() { try { var d = JSON.parse(localStorage.getItem('acn-saga-v1') || '{}'); ['lang', 'country', 'sound', 'hints', 'voice', 'best'].forEach(function (k) { if (d[k] != null) G[k] = d[k]; }); } catch (e) {} }
  /* ---------- 소리 ---------- */
  var AC = null;
  function beep(f, d, type) { if (!G.sound) return; try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); var o = AC.createOscillator(), g = AC.createGain(); o.type = type || 'sine'; o.frequency.value = f; g.gain.value = .06; o.connect(g); g.connect(AC.destination); o.start(); g.gain.exponentialRampToValueAtTime(.0001, AC.currentTime + (d || .12)); o.stop(AC.currentTime + (d || .12)); } catch (e) {} }
  var sfx = { ok: function () { beep(880, .09); setTimeout(function () { beep(1320, .1); }, 90); }, ng: function () { beep(220, .25, 'square'); }, tap: function () { beep(660, .05); }, print: function () { for (var i = 0; i < 5; i++) setTimeout(function () { beep(300 + Math.random() * 80, .03, 'square'); }, i * 60); } };

  /* ---------- 공통 문구 ---------- */
  var T = {
    brandSub: L('Vela Air グランドスタッフ ― 教育用シミュレーション', 'Vela Air 그라운드 스태프 — 교육용 시뮬레이션', 'Vela Air ground staff — a training simulation'),
    lang: L('表示言語', '표시 언어', 'Language'), station: L('勤務地（業務ルール）', '근무지(업무 규칙)', 'Station (rules applied)'),
    jp: L('日本・成田（NRT）', '일본·나리타(NRT)', 'Japan · Narita (NRT)'), kr: L('韓国・仁川（ICN）', '한국·인천(ICN)', 'Korea · Incheon (ICN)'),
    stationNote: L('画面の言語と、適用する国の業務ルールは別々に選べます。', '화면 언어와 적용할 나라의 업무 규칙은 따로 고를 수 있습니다.', 'The screen language and the country whose rules apply are chosen separately.'),
    stages: L('ステージ ― 1便を動かす全部の仕事', '스테이지 — 한 편을 움직이는 모든 업무', 'Stages — every job behind one flight'),
    start: L('出勤する ― チェックインを始める', '출근하기 — 체크인 시작', 'Clock in — start check-in'),
    hints: L('コラドンのヒントを表示', '코라돈 힌트 표시', 'Show Koradon\'s tips'),
    sound: L('効果音', '효과음', 'Sound'),
    voice: L('音声（日本語）', '음성(일본어)', 'Voice (Japanese)'),
    credit: L('音声：Style-Bert-VITS2 ― 小春音アミ（あみたろの声素材工房 https://amitaro.net/）、つくよみちゃん（つくよみちゃんコーパス CV.夢前黎）、Lux（CC BY 4.0）、JVNV F2・M1・M2（JVNVコーパス CC BY-SA 4.0）', '음성: Style-Bert-VITS2 — 小春音アミ(あみたろの声素材工房 https://amitaro.net/), つくよみちゃん(つくよみちゃんコーパス CV.夢前黎), Lux(CC BY 4.0), JVNV F2·M1·M2(JVNV 코퍼스 CC BY-SA 4.0)', 'Voices: Style-Bert-VITS2 — Koharune Ami (Amitaro voice materials, https://amitaro.net/), Tsukuyomi-chan (Tsukuyomi-chan corpus, CV. Rei Yumesaki), Lux (CC BY 4.0), JVNV F2/M1/M2 (JVNV corpus, CC BY-SA 4.0)'),
    edu: L('登場する航空会社・便・お客様・規定の数値は教育用の架空のものです。実際の規定は自社マニュアルと公的情報で確認してください。', '등장하는 항공사·항공편·승객·규정 수치는 교육용 가상 데이터입니다. 실제 규정은 자사 매뉴얼과 공적 정보로 확인하세요.', 'The airline, flights, passengers and rule values are fictional, for training. Always check real rules in your company manual and official sources.'),
    flight: L('便', '편', 'Flight'), now: L('現在', '현재', 'Now'), close: L('締切まで', '마감까지', 'To close'), queue: L('待ち', '대기', 'Queue'), served: L('完了', '완료', 'Done'),
    min: L('分', '분', 'min'), next: L('次のお客様どうぞ', '다음 손님 오세요', 'Next, please'),
    tabs: { pnr: L('予約', '예약', 'Booking'), pp: L('旅券', '여권', 'Passport'), entry: L('渡航条件', '입국 조건', 'Entry'), seat: L('座席', '좌석', 'Seat'), bag: L('手荷物', '수하물', 'Bags'), bp: L('搭乗券', '탑승권', 'Boarding pass') },
    you: L('あなた', '나', 'You'), mentor: L('コラドン', '코라돈', 'Koradon'), rule: L('コラリンのルール', '코라린의 규칙', 'Korarin\'s rule'),
    eduData: L('教育用データ ― 実務では Timatic や公的情報で照合します', '교육용 데이터 — 실무에서는 Timatic과 공적 정보로 확인합니다', 'Training data — in real work, check Timatic and official sources'),
    ok: L('OK', '이상 없음', 'OK'), ng: L('問題あり', '문제 있음', 'Problem')
  };

  /* ---------- 스테이지 (모든 업무 영역, ★ = 계산 실습 스테이지) ---------- */
  var STAGES = [
    { n: '01', nm: L('チェックイン', '체크인', 'Check-in'), st: 'play', d: 'D01' },
    { n: '02', nm: L('ゲート・搭乗', '게이트·탑승', 'Gate & boarding'), d: 'D01' },
    { n: '03', nm: L('ロードコントロール（W&B）', '탑재관리(W&B)', 'Load control (W&B)'), key: 1, d: 'D03' },
    { n: '04', nm: L('ランプ・ターンアラウンド', '램프·턴어라운드', 'Ramp & turnaround'), d: 'D04' },
    { n: '05', nm: L('運航管理（ディスパッチ）', '운항관리(디스패치)', 'Flight dispatch'), key: 1, d: 'D06' },
    { n: '06', nm: L('イレギュラー対応', '비정상 운항 대응', 'Irregular operations'), d: 'D02' },
    { n: '07', nm: L('CIQ・出入国', 'CIQ·출입국', 'CIQ & borders'), d: 'D08' },
    { n: '08', nm: L('航空貨物', '항공화물', 'Air cargo'), d: 'D05' },
    { n: '09', nm: L('整備・MEL・AOG', '정비·MEL·AOG', 'Maintenance, MEL, AOG'), d: 'D07' },
    { n: '10', nm: L('営業・販売', '영업·판매', 'Sales'), d: 'D09' },
    { n: '11', nm: L('収益管理・運賃', '수익관리·운임', 'Revenue & fares'), d: 'D10' },
    { n: '12', nm: L('精算・財務', '정산·재무', 'Settlement & finance'), d: 'D11' },
    { n: '13', nm: L('人事・総務', '인사·총무', 'HR & admin'), d: 'D12' },
    { n: '14', nm: L('契約・ハンドリング会社管理', '계약·조업사 관리', 'Contracts & handling agents'), d: 'D13' },
    { n: '15', nm: L('安全・保安・監査', '안전·보안·감사', 'Safety, security, audits'), d: 'D14' },
    { n: '16', nm: L('当局対応・許認可', '당국 대응·인허가', 'Authorities & permits'), d: 'D16' },
    { n: '17', nm: L('支店経営（月次・年次）', '지점 경영(월간·연간)', 'Running the station'), d: 'D15' },
    { n: '18', nm: L('新規就航プロジェクト', '신규 취항 프로젝트', 'Launching a new route'), d: 'D15' }
  ];

  /* ---------- 미션 상태 ---------- */
  var V, S;
  function hm(t) { var h = Math.floor(t / 60), m = Math.floor(t % 60); return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m; }
  function pm(s) { var p = s.split(':'); return +p[0] * 60 + +p[1]; }
  function newMission() {
    V = M.variants[G.country];
    S = { clock: pm(V.start), close: pm(V.close), bgQueue: 9, list: V.pax(), idx: -1, cur: null, results: [], revenue: [], seats: M.aircraft.taken.slice(), infantSeats: M.aircraft.infantSeats.slice(), strikes: 0, seq: 41 };
  }
  function addTime(m) {
    S.clock += m; S.bgQueue = Math.max(2, S.bgQueue + (Math.random() < m / 4 ? 1 : 0) - (Math.random() < m / 5 ? 1 : 0));
    if (S.cur) S.cur.mins += m;
    updateBar();
  }
  function note(type, text, lesson) { S.cur.notes.push({ t: type, x: text, l: lesson }); }
  function noteText(n) { return typeof n.x === 'function' ? n.x() : n.x; }
  function mood(d) { S.cur.mood = Math.max(0, Math.min(100, S.cur.mood + d)); drawPax(); }

  /* ---------- 화면: 타이틀 ---------- */
  function renderTitle() {
    G.screen = 'title'; document.body.classList.remove('busy');
    var hero = '<div class="herostage"><img class="bg" src="' + STG.src('checkin_bg_01') + '" alt="">' +
      STG.img('staff_checkin_greet_01', '', 50, 2, 86) + STG.img('passenger_female_01', '', 76, 2, 66) + STG.img('passenger_male_02', '', 88, 4, 62) +
      STG.img('koradon_greet_01', 'mas', 15, 3, 44) + STG.img('korarin_greet_01', 'mas', 30, 3, 42) + '</div>';
    var st = STAGES.map(function (s) {
      var cls = s.st === 'play' ? 'play' : 'lock' + (s.key ? ' key' : '');
      var lab = s.st === 'play' ? L('プレイできます', '플레이 가능', 'Playable') : (s.key ? L('★ 計算の実習ステージ・準備中', '★ 계산 실습 스테이지·준비 중', '★ Hands-on calculation stage · coming') : L('準備中', '준비 중', 'Coming'));
      return '<button class="stg ' + cls + '" ' + (s.st === 'play' ? 'data-go="1"' : 'disabled') + '><span class="n">STAGE ' + s.n + '</span><span class="nm">' + esc(tx(s.nm)) + '</span><span class="st">' + esc(tx(lab)) + '</span></button>';
    }).join('');
    $('#app').innerHTML =
      '<div class="title"><div class="hero">' + hero + '<div class="tt"><h1>AIRLINE SAGA</h1><div class="sub">' + esc(tx(T.brandSub)) + '</div></div></div>' +
      '<div class="panel"><h2 class="langh">' + esc(tx(T.lang)) + '</h2><div class="seg" id="seglang">' + ['ja', 'ko', 'en'].map(function (l) { return '<button data-l="' + l + '" class="' + (G.lang === l ? 'on' : '') + '">' + { ja: '日本語', ko: '한국어', en: 'English' }[l] + '</button>'; }).join('') + '</div>' +
      '<h2 class="stah">' + esc(tx(T.station)) + '</h2><div class="seg" id="segc"><button data-c="JP" class="' + (G.country === 'JP' ? 'on' : '') + '">' + esc(tx(T.jp)) + '</button><button data-c="KR" class="' + (G.country === 'KR' ? 'on' : '') + '">' + esc(tx(T.kr)) + '</button></div>' +
      '<p style="font-size:13px;color:var(--sub);margin:8px 0 0">' + esc(tx(T.stationNote)) + '</p>' +
      '<div class="seg" style="margin-top:10px"><button id="tg-h" class="' + (G.hints ? 'on' : '') + '">' + esc(tx(T.hints)) + '</button><button id="tg-s" class="' + (G.sound ? 'on' : '') + '">' + esc(tx(T.sound)) + '</button><button id="tg-v" class="' + (G.voice ? 'on' : '') + '">' + esc(tx(T.voice)) + '</button></div></div>' +
      '<button class="start" id="go">' + esc(tx(T.start)) + ' · ' + (G.country === 'JP' ? 'VELA 301 NRT→ICN' : 'VELA 302 ICN→NRT') + '</button>' +
      '<div class="panel"><h2>' + esc(tx(T.stages)) + '</h2><div class="stages">' + st + '</div></div>' +
      '<p style="font-size:12px;color:var(--sub)">' + esc(tx(T.edu)) + '</p><p style="font-size:11px;color:var(--sub);margin-top:-6px">' + esc(tx(T.credit)) + '</p></div>';
    $('#seglang').onclick = function (e) { var b = e.target.closest('button'); if (!b) return; setLang(b.dataset.l); };
    $('#segc').onclick = function (e) { var b = e.target.closest('button'); if (!b) return; G.country = b.dataset.c; save(); renderTitle(); };
    $('#tg-h').onclick = function () { G.hints = !G.hints; save(); renderTitle(); };
    $('#tg-s').onclick = function () { G.sound = !G.sound; save(); renderTitle(); };
    $('#tg-v').onclick = function () { G.voice = !G.voice; VO.on = G.voice; save(); renderTitle(); };
    $('#go').onclick = startMission;
    document.querySelectorAll('[data-go]').forEach(function (b) { b.onclick = startMission; });
  }

  /* ---------- 화면: 근무 ---------- */
  function barInner() {
    return '<div class="brand">' + '<svg viewBox="-16 -16 32 32">' + SP.logo(0, 0, 15, '#24346b', '#f0a030') + '</svg>AIRLINE SAGA</div>' +
      '<div class="fl"><b>' + V.flight + '</b> ' + V.from + '→' + V.to + ' STD ' + V.std + '</div>' +
      '<div class="stats"><span class="stat">' + esc(tx(T.now)) + ' <b id="clk"></b></span><span class="stat" id="stclose">' + esc(tx(T.close)) + ' <b id="cls"></b></span><span class="stat">' + esc(tx(T.queue)) + ' <b id="que"></b></span><span class="stat">' + esc(tx(T.served)) + ' <b id="done"></b></span>' +
      '</div><button class="iconbtn' + (G.voice ? ' von' : '') + '" id="vo" aria-label="voice">' + esc(tx(L('音声', '음성', 'Voice'))) + '</button><button class="iconbtn" id="quit" aria-label="quit">✕</button>';
  }
  function bindBar() {
    $('#quit').onclick = function () { VO.stop(); renderTitle(); };
    $('#vo').onclick = function () { G.voice = !G.voice; VO.on = G.voice; if (!G.voice) VO.stop(); this.classList.toggle('von', G.voice); save(); };
  }
  function startMission() {
    newMission(); document.body.classList.remove('busy'); G.screen = 'play'; sfx.tap(); VO.on = G.voice; VO.unlock(); VO.stop();
    var ap = R.airport[V.from];
    $('#app').innerHTML =
      '<div class="bar" id="gbar">' + barInner() + '</div>' +
      '<div class="main"><div class="left"><div class="scenebox" id="scenebox">' + STG.html({ flight: V.flight, to: V.to, std: V.std, counter: ap.counter }) +
      '<div class="bubbles"><div class="bubble me hide" id="bme"></div><div class="bubble pax hide" id="bpx"></div></div></div><div class="guide hide" id="guide"></div></div>' +
      '<div class="term"><div class="tabs" id="tabs"></div><div class="screen" id="scr"></div></div></div>' +
      '<div id="modal"></div>';
    bindBar();
    updateBar(); drawQueue(); nextPax();
  }
  function updateBar() {
    if (!$('#clk')) return;
    $('#clk').textContent = hm(S.clock);
    var left = S.close - S.clock; $('#cls').textContent = (left >= 0 ? left.toFixed(0) : 0) + tx(T.min);
    $('#stclose').classList.toggle('alert', left < 10);
    $('#que').textContent = S.bgQueue + Math.max(0, S.list.length - S.idx - 1);
    $('#done').textContent = S.results.length + '/' + S.list.length;
  }
  function drawQueue() { STG.queue(S.list.slice(S.idx + 1)); }
  function exprOf(m) { return m >= 75 ? 'happy' : m >= 50 ? 'neutral' : m >= 30 ? 'worried' : 'upset'; }
  function drawPax() { STG.pax(S.cur ? S.cur.p : null, S.cur ? S.cur.mood : 0); }
  function say(who, text, silent) {
    var el = who === 'me' ? $('#bme') : $('#bpx');
    if (!el || !S || !S.cur) return;
    S.bub = S.bub || {}; S.bub[who] = text || null;
    if (!text) { el.classList.add('hide'); return; }
    el.innerHTML = '<span class="who">' + esc(who === 'me' ? tx(T.you) : (S.cur.p.pp.sur + ' ' + S.cur.p.pp.given)) + '</span>' + esc(tx(text)) + (G.lang !== 'ja' && G.voice && text.ja ? '<span class="jsub">' + esc(text.ja) + '</span>' : '');
    if (!silent && G.voice && text.ja) VO.say(who === 'me' ? 'staff' : S.cur.p.art, text.ja);
    el.classList.remove('hide');
  }
  function guide(text) { var g = $('#guide'); if (!g) return; if (S) S.guideL = text || null; if (typeof text === 'object' && text) text = tx(text); if (!G.hints || !text) { g.classList.add('hide'); return; } g.innerHTML = STG.mascot('koradon', 'idle', 'gm') + '<div><b>' + esc(tx(T.mentor)) + '</b><span>' + text + '</span></div><button class="gx" aria-label="close">✕</button>'; g.classList.remove('open'); g.onclick = function (e) { if (e.target.closest('.gx')) { g.classList.add('hide'); return; } g.classList.toggle('open'); }; g.classList.remove('hide'); }

  function nextPax() {
    if (S.cur) S.results.push(S.cur);
    S.idx++; VO.stop();
    if (S.idx >= S.list.length || S.clock >= S.close) { finish(); return; }
    var p = S.list[S.idx];
    var wait = S.idx * 3 + Math.max(0, S.clock - pm(V.start) - S.idx * 6);
    S.cur = { p: p, mood: Math.max(50, 90 - wait * .4), mins: 0, tab: 'pnr', notes: [], chk: {}, seat: null, bags: p.bags.map(function () { return { w: null, tag: null }; }), dg: false, pnr: false, pp: false, entryQ: false, bp: false, flags: {} };
    $('#paxwrap').style.transition = 'none'; $('#paxwrap').style.transform = 'translateX(30%)'; $('#paxwrap').style.opacity = 0; void $('#paxwrap').offsetWidth; $('#paxwrap').style.transition = '';
    drawQueue(); drawPax(); STG.bag(null); $('#scalelcd').textContent = '0.0';
    requestAnimationFrame(function () { requestAnimationFrame(function () { var pw = $('#paxwrap'); if (!pw) return; pw.style.transform = 'translateX(0)'; pw.style.opacity = 1; }); });
    say('me', D.greet);
    var me0 = S.cur; setTimeout(function () { if (S.cur === me0 && G.screen === 'play') say('pax', p.say.hello); }, 650);
    addTime(M.cost.greet); updateBar();
    if (p.issue === 'tutorial') guide(L('まずは<b>「予約」</b>でお客様の予約を呼び出しましょう。次に<b>「旅券」</b>の4項目、<b>「渡航条件」</b>、<b>「座席」</b>、<b>「手荷物」</b>（保安質問も）、最後に<b>「搭乗券」</b>です。順番は自由ですが、確認を飛ばすと後で問題が起きます。',
      '먼저 <b>「예약」</b>에서 승객의 예약을 불러오세요. 다음은 <b>「여권」</b> 4항목, <b>「입국 조건」</b>, <b>「좌석」</b>, <b>「수하물」</b>(보안 질문 포함), 마지막으로 <b>「탑승권」</b>입니다. 순서는 자유지만 확인을 건너뛰면 나중에 문제가 생깁니다.',
      'Start with <b>Booking</b> to pull up the reservation. Then the four <b>Passport</b> checks, <b>Entry</b>, <b>Seat</b>, <b>Bags</b> (with the security questions), and finally the <b>Boarding pass</b>. Any order works, but skipped checks come back to bite you.'));
    else guide('');
    renderTabs(); showTab('pnr'); STG.pose('greet', 2200);
  }

  /* ---------- 단말 탭 ---------- */
  function tabState(k) {
    var c = S.cur;
    if (k === 'pnr') return c.pnr ? 'ok' : '';
    if (k === 'pp') { var v = ['validity', 'photo', 'ticketName'].map(function (x) { return c.chk[x]; }); if (v.some(function (x) { return x === 'ng'; })) return 'ng'; return v.every(Boolean) ? 'ok' : (c.pp ? 'wait' : ''); }
    if (k === 'entry') return c.chk.entry === 'ng' ? 'ng' : c.chk.entry ? 'ok' : (c.entryQ ? 'wait' : '');
    if (k === 'seat') return c.seat ? 'ok' : '';
    if (k === 'bag') return c.bags.every(function (b) { return b.tag; }) ? 'ok' : (c.bags.some(function (b) { return b.w; }) ? 'wait' : '');
    if (k === 'bp') return c.bp ? 'ok' : '';
  }
  function renderTabs() {
    $('#tabs').innerHTML = ['pnr', 'pp', 'entry', 'seat', 'bag', 'bp'].map(function (k) { return '<button class="tab' + (S.cur.tab === k ? ' on' : '') + '" data-k="' + k + '"><i class="' + (tabState(k) || '') + '"></i>' + esc(tx(T.tabs[k])) + '</button>'; }).join('');
    $('#tabs').onclick = function (e) { var b = e.target.closest('button'); if (!b) return; sfx.tap(); showTab(b.dataset.k); };
  }
  function showTab(k) { S.cur.tab = k; renderTabs(); STG.pose({ pnr: 'check', pp: 'check', entry: 'check', seat: 'explain', bag: 'explain', bp: 'idle' }[k] || 'idle'); ({ pnr: tabPNR, pp: tabPP, entry: tabEntry, seat: tabSeat, bag: tabBag, bp: tabBP })[k](); }
  function scr(h) { $('#scr').innerHTML = h; }

  /* 예약 */
  function tabPNR() {
    var c = S.cur, p = c.p;
    if (!c.pnr) {
      scr('<div class="h3">' + esc(tx(L('予約を呼び出す', '예약 불러오기', 'Retrieve booking'))) + '</div><p class="small">' + esc(tx(L('お客様の航空券（eチケット控え）にある予約番号で検索します。', '승객의 항공권(e티켓 사본)에 있는 예약번호로 검색합니다.', 'Search with the booking reference on the passenger\'s e-ticket receipt.'))) + '</p>' +
        '<div class="row mono" style="margin:10px 0">&gt; RT <span style="color:var(--termwarn)">' + p.pnr.rloc + '</span></div><div class="btns"><button class="btn pri" id="doPnr">' + esc(tx(L('検索する', '검색', 'Search'))) + '</button></div>');
      $('#doPnr').onclick = function () { c.pnr = true; addTime(M.cost.pnr); sfx.ok(); say('me', D.pnrOk); tabPNR(); renderTabs(); };
      return;
    }
    var req = { window: L('窓側', '창가', 'Window'), aisle: L('通路側', '통로', 'Aisle'), exit: L('非常口座席', '비상구 좌석', 'Exit row') }[p.pnr.req];
    scr('<div class="h3">PNR ' + p.pnr.rloc + '</div><dl class="kv">' +
      '<dt>' + esc(tx(L('氏名', '이름', 'Name'))) + '</dt><dd>' + p.pnr.sur + '/' + p.pnr.given + ' ' + p.pnr.title + (c.flags.nameWas ? '<br><span class="small">' + esc(tx(c.flags.rebooked ? L('新しい予約（旧：', '새 예약(이전: ', 'New booking (was ') : L('訂正済み（旧：', '정정 완료(이전: ', 'Corrected (was '))) + c.flags.nameWas + ')</span>' : '') + '</dd>' +
      '<dt>' + esc(tx(T.flight)) + '</dt><dd>' + V.flight + ' ' + M.date.slice(8) + 'OCT ' + V.from + V.to + ' ' + V.std.replace(':', '') + '</dd>' +
      '<dt>' + esc(tx(L('クラス', '클래스', 'Class'))) + '</dt><dd>Y</dd>' +
      '<dt>SSR</dt><dd class="' + (p.pnr.ssr.length ? 'hl' : '') + '">' + (p.pnr.ssr.join('<br>') || '—') + '</dd>' +
      '<dt>' + esc(tx(L('座席の希望', '좌석 희망', 'Seat request'))) + '</dt><dd>' + (req ? esc(tx(req)) : '—') + '</dd>' +
      '<dt>' + esc(tx(L('無料手荷物', '무료 수하물', 'Free bags'))) + '</dt><dd>1PC 23KG <span class="small">(Vela Air)</span></dd>' +
      '<dt>' + esc(tx(L('ステータス', '상태', 'Status'))) + '</dt><dd>HK1 · ' + (c.bp ? 'CKIN' : 'NOT CHECKED-IN') + '</dd></dl>' +
      '<div class="btns"><button class="btn" data-t="pp">' + esc(tx(T.tabs.pp)) + ' →</button></div>');
    $('#scr').querySelector('[data-t]').onclick = function () { showTab('pp'); };
  }

  /* 여권 */
  function truth(k) { var p = S.cur.p; if (k === 'ticketName') return p.issue === 'name' && !S.cur.flags.nameFixed ? 'ng' : 'ok'; if (k === 'entry') return p.issue === 'visa' ? 'ng' : 'ok'; return 'ok'; }
  function tabPP() {
    var c = S.cur, p = c.p;
    if (!c.pp) {
      scr('<div class="h3">' + esc(tx(L('旅券を受け取る', '여권 받기', 'Take the passport'))) + '</div><p class="small">' + esc(tx(L('写真と本人、有効期限、航空券の名前を必ず照合します。', '사진과 본인, 유효기간, 항공권 이름을 반드시 대조합니다.', 'Always match the photo to the person, the expiry date and the name on the ticket.'))) + '</p><div class="btns"><button class="btn pri" id="getpp">' + esc(tx(L('旅券を開く', '여권 펼치기', 'Open passport'))) + '</button></div>');
      $('#getpp').onclick = function () { c.pp = true; addTime(M.cost.passport); sfx.tap(); say('me', D.ppTake); tabPP(); renderTabs(); };
      return;
    }
    var face = STG.has(p.art) ? STG.portrait(p) : '<svg viewBox="-40 -120 80 120" width="80" height="104">' + SP.sd(Object.assign({}, p.look, { baby: false, expr: 'neutral', scale: 1 })) + '</svg>';
    var natName = { JPN: L('日本', '일본', 'Japan'), KOR: L('大韓民国', '대한민국', 'Republic of Korea'), LUM: L('ルメリア共和国（架空）', '루메리아 공화국(가상)', 'Republic of Lumeria (fictional)') }[p.pp.nat];
    var html = '<div class="pp"><div class="t">PASSPORT · ' + esc(tx(natName)) + '</div><div class="ph">' + face + '</div><div>' +
      'Surname<br><b>' + p.pp.sur + '</b><br>Given names<br><b>' + p.pp.given + '</b><br>Nationality ' + p.pp.nat + ' · Sex ' + p.pp.sex + '<br>Date of birth ' + p.pp.dob + '<br>Date of expiry <b>' + p.pp.exp + '</b><br>No. ' + p.pp.no + '</div>' +
      '<div class="mrz">P&lt;' + p.pp.nat + p.pp.sur + '&lt;&lt;' + p.pp.given + '&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br>' + p.pp.no + '&lt;' + p.pp.nat + p.pp.dob.replace(/-/g, '').slice(2) + '</div></div>';
    if (p.visa) html += '<div class="pp" style="margin-top:8px;grid-template-columns:1fr"><div class="t">VISA · ' + (p.visa.dest === 'KR' ? 'REPUBLIC OF KOREA' : 'JAPAN') + ' <span style="font-weight:400">(' + esc(tx(L('教育用', '교육용', 'training'))) + ')</span></div><div>Type ' + p.visa.type + ' · Single entry<br>Valid until <b>' + p.visa.until + '</b><br>Name ' + p.pp.sur + ' ' + p.pp.given + '</div></div>';
    if (p.inf) html += '<p class="small" style="margin-top:6px">INF: ' + p.inf.sur + ' ' + p.inf.given + ' · ' + p.inf.dob + ' · exp ' + p.inf.exp + '</p>';
    var items = [['validity', L('有効期限・残存期間', '유효기간·잔여기간', 'Validity and remaining time')], ['photo', L('写真と本人の一致', '사진과 본인 일치', 'Photo matches the person')], ['ticketName', L('航空券（予約）の名前', '항공권(예약) 이름', 'Name on the ticket (booking)')]];
    html += '<div class="chk">' + items.map(function (it) {
      var v = c.chk[it[0]];
      return '<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap"><span style="flex:1;min-width:140px">' + esc(tx(it[1])) + (it[0] === 'ticketName' ? ' <span class="small mono">PNR: ' + p.pnr.sur + '/' + p.pnr.given + '</span>' : '') + '</span>' +
        (v ? '<span class="pill ' + (v === 'ok' ? 'ok' : 'ng') + '">' + esc(tx(v === 'ok' ? T.ok : T.ng)) + '</span>' :
          '<button class="btn" style="padding:6px 10px" data-ck="' + it[0] + '" data-v="ok">' + esc(tx(T.ok)) + '</button><button class="btn warnb" style="padding:6px 10px" data-ck="' + it[0] + '" data-v="ng">' + esc(tx(T.ng)) + '</button>') + '</div>';
    }).join('') + '</div><p class="small" style="margin-top:8px">' + esc(tx(L('入国・通過の条件は「渡航条件」タブで確認します。', '입국·경유 조건은 「입국 조건」 탭에서 확인합니다.', 'Entry and transit rules are checked on the Entry tab.'))) + '</p>';
    scr(html);
    $('#scr').querySelectorAll('[data-ck]').forEach(function (b) { b.onclick = function () { judgeCheck(b.dataset.ck, b.dataset.v); }; });
  }
  function judgeCheck(k, v) {
    var c = S.cur, t = truth(k);
    addTime(.2);
    if (v === 'ok' && t === 'ok') { c.chk[k] = 'ok'; sfx.tap(); }
    else if (v === 'ng' && t === 'ng') { sfx.ng(); if (k === 'ticketName') return decideName(); if (k === 'entry') return decideVisa(); }
    else if (v === 'ng' && t === 'ok') { c.chk[k] = 'ok'; mood(-8); addTime(1.5); sfx.ng(); note('bad', function () { return tx(L('問題のない項目を「問題あり」にして、お客様を待たせました。', '문제없는 항목을 「문제 있음」으로 해서 승객을 기다리게 했습니다.', 'You flagged an item that was fine and kept the passenger waiting.')); }, 'passenger/1-3'); }
    else { c.chk[k] = 'ok'; c.flags['missed_' + k] = true; sfx.tap(); } /* 놓침 → 나중에 결과로 나타남 */
    if (c.tab === 'pp') tabPP(); else tabEntry(); renderTabs();
  }
  /* 이름 정정: 예약(PNR)의 이름을 여권과 같게 고침. rebook=새 예약(예약번호도 바뀜) */
  function fixName(c, rebook) {
    var p = c.p; c.flags.nameFixed = true; c.flags.nameWas = c.flags.nameWas || (p.pnr.sur + '/' + p.pnr.given);
    p.pnr.sur = p.pp.sur; p.pnr.given = p.pp.given;
    if (rebook) { p.pnr.rloc = p.pnr.rloc.slice(0, 4) + 'R' + p.pnr.rloc.slice(5); c.flags.rebooked = true; }
  }
  function decideName() {
    var c = S.cur, p = c.p, ap = R.airline.VELA; say('me', D.nameDiff);
    modal(L('予約と旅券の名前が違います', '예약과 여권의 이름이 다릅니다', 'The booking and passport names differ'),
      tx(L('旅券：', '여권: ', 'Passport: ')) + p.pp.sur + '/' + p.pp.given + '　PNR：' + p.pnr.sur + '/' + p.pnr.given,
      L('名前が一致しないまま搭乗券を出すと、事前旅客情報（API）の不一致で到着地の入国審査で止められることがあります。', '이름이 일치하지 않은 채 탑승권을 발행하면 사전 승객 정보(API) 불일치로 도착지 입국심사에서 막힐 수 있습니다.', 'If you issue a boarding pass with mismatched names, the API data will not match and the passenger may be stopped at arrival immigration.'),
      [{ id: 'resv', t: L('予約部門に連絡し、規定にそって綴りを訂正してもらう', '예약 부서에 연락해 규정에 따라 철자를 정정한다', 'Call reservations and have the spelling corrected under the rules'), s: L('Vela Air 規定（教育用）：3文字以内の綴り違いは確認のうえ訂正できる ／ 約4分', 'Vela Air 규정(교육용): 3글자 이내 철자 오류는 확인 후 정정 가능 / 약 4분', 'Vela Air rule (training): spelling errors of up to 3 letters can be corrected after checks / ~4 min'),
        run: function () { addTime(4); mood(-3); fixName(c); c.chk.ticketName = 'ok'; say('pax', p.say.fix); note('good', function () { return tx(L('名前の不一致に気づき、規定どおり訂正してから手続きしました。', '이름 불일치를 알아차리고 규정대로 정정한 뒤 수속했습니다.', 'You caught the name mismatch and had it corrected by the book before continuing.')); }, 'ciq/0-4'); } },
       { id: 'sv', t: L('スーパーバイザー（SV）に相談する', '수퍼바이저(SV)에게 상담한다', 'Ask your supervisor (SV)'), s: L('SVが予約部門と調整 ／ 約2分、SVの時間を使う', 'SV가 예약 부서와 조정 / 약 2분, SV의 시간을 씀', 'The SV sorts it out with reservations / ~2 min, uses the SV\'s time'),
        run: function () { addTime(2); mood(-2); fixName(c); c.chk.ticketName = 'ok'; say('pax', p.say.fix); note('good', function () { return tx(L('名前の不一致に気づき、SVと一緒に訂正しました。', '이름 불일치를 알아차리고 SV와 함께 정정했습니다.', 'You caught the name mismatch and fixed it with your supervisor.')); }, 'passenger/1-3'); } },
       { id: 'rebook', t: L('お客様に予約を取り直してもらう', '승객에게 예약을 다시 하라고 한다', 'Tell the passenger to make a new booking'), s: L('規定上は可能だが、お客様の負担が大きい', '규정상 가능하지만 승객 부담이 큼', 'Allowed, but a heavy burden on the passenger'),
        run: function () { addTime(1); mood(-30); fixName(c, true); c.chk.ticketName = 'ok'; say('pax', p.say.rebook); note('bad', function () { return tx(L('訂正できる綴り違いだったのに、予約の取り直しを求めました。', '정정할 수 있는 철자 오류였는데 예약을 다시 하게 했습니다.', 'It was a correctable typo, but you made the passenger rebook.')); }, 'passenger/1-3'); } },
       { id: 'issue', t: L('このまま搭乗券を出す', '그대로 탑승권을 발행한다', 'Issue the boarding pass as is'), lock: L('できません：旅券と予約の名前が一致しないまま発券しない（API・入国審査）', '할 수 없음: 여권과 예약 이름이 다른 채로 발권하지 않음(API·입국심사)', 'Not allowed: never issue with mismatched names (API, immigration)') }],
      'ciq/0-4', function () { tabPP(); renderTabs(); });
  }

  /* 입국 조건 */
  function tabEntry() {
    var c = S.cur, p = c.p, dest = V.destC;
    var html = '<div class="h3">' + esc(tx(L('渡航条件の照会', '입국 조건 조회', 'Entry requirement lookup'))) + '</div>' +
      '<div class="mono small">&gt; TI ' + p.pp.nat + ' / DEST ' + (dest === 'KR' ? 'KR' : 'JP') + ' / ' + esc(tx(L('短期滞在', '단기 체류', 'short stay'))) + '</div>';
    if (!c.entryQ) {
      html += '<div class="btns"><button class="btn pri" id="q">' + esc(tx(L('照会する', '조회', 'Look up'))) + '</button></div>';
    } else {
      var r = R.entryDB[dest][p.pp.nat];
      var lab = { free: L('査証免除（短期滞在）', '비자 면제(단기 체류)', 'Visa-free (short stay)'), citizen: L('自国民（入国条件なし）', '자국민(입국 조건 없음)', 'Citizen (no entry requirement)'), visa: L('査証（ビザ）が必要 ― 有効な査証を確認すること', '비자 필요 — 유효한 비자를 확인할 것', 'Visa required — check for a valid visa') }[r];
      html += '<div style="margin-top:10px"><span class="pill ' + (r === 'visa' ? 'warn' : 'ok') + '">' + esc(tx(lab)) + '</span></div>';
      if (p.visa) html += '<p class="small" style="margin-top:8px">' + esc(tx(L('旅券の査証欄を「旅券」タブで確認できます。今日の日付は', '여권의 비자 면은 「여권」 탭에서 볼 수 있습니다. 오늘 날짜는', 'You can see the visa page on the Passport tab. Today is'))) + ' <b class="mono">' + M.date + '</b></p>';
      var v = c.chk.entry;
      html += '<div class="chk"><div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap"><span style="flex:1;min-width:140px">' + esc(tx(L('入国・通過の条件を満たしている', '입국·경유 조건을 충족한다', 'Meets the entry and transit requirements'))) + '</span>' +
        (v ? '<span class="pill ' + (v === 'ok' ? 'ok' : 'ng') + '">' + esc(tx(v === 'ok' ? T.ok : T.ng)) + '</span>' : '<button class="btn" style="padding:6px 10px" data-ck="entry" data-v="ok">' + esc(tx(T.ok)) + '</button><button class="btn warnb" style="padding:6px 10px" data-ck="entry" data-v="ng">' + esc(tx(T.ng)) + '</button>') + '</div></div>';
    }
    html += '<div class="edu">' + esc(tx(T.eduData)) + '</div>';
    scr(html);
    if ($('#q')) $('#q').onclick = function () { c.entryQ = true; addTime(M.cost.entry); sfx.tap(); tabEntry(); renderTabs(); };
    $('#scr').querySelectorAll('[data-ck]').forEach(function (b) { b.onclick = function () { judgeCheck(b.dataset.ck, b.dataset.v); }; });
  }
  function decideVisa() {
    var c = S.cur, p = c.p;
    say('me', D.visaNg); say('pax', p.say.plea);
    modal(L('査証の有効期限が切れています', '비자 유효기간이 지났습니다', 'The visa has expired'),
      'Valid until ' + p.visa.until + ' / Today ' + M.date,
      L('有効な書類がないお客様は運べません。到着地で入国を拒否されると、送還の費用と違反通知の対象になります。現場で例外は作りません。', '유효한 서류가 없는 승객은 운송할 수 없습니다. 도착지에서 입국이 거부되면 송환 비용과 위반 통지의 대상이 됩니다. 현장에서 예외를 만들지 않습니다.', 'You cannot carry a passenger without valid documents. A refusal at arrival means removal costs and an infringement notice. No exceptions at the counter.'),
      [{ id: 'sv', t: L('理由を説明し、SVに引き継いで判断と経緯を記録する', '이유를 설명하고 SV에게 인계해 판단과 경위를 기록한다', 'Explain why, hand over to the SV and record the decision'), s: L('規定を確認 → 説明 → 上席へ → 記録 ／ 約4分', '규정 확인 → 설명 → 상급자 → 기록 / 약 4분', 'Check the rule → explain → escalate → record / ~4 min'),
        run: function () { addTime(4); mood(-15); c.chk.entry = 'ng'; c.flags.denied = true; c.flags.handover = true; note('good', function () { return tx(L('期限切れの査証に気づき、搭乗をお断りしてSVに引き継ぎ、記録を残しました。', '기한이 지난 비자를 알아차리고 탑승을 거절한 뒤 SV에게 인계하고 기록을 남겼습니다.', 'You spotted the expired visa, refused boarding, handed over to the SV and kept a record.')); }, 'passenger/1-3'); } },
       { id: 'self', t: L('自分で搭乗できないと伝え、帰っていただく', '직접 탑승 불가를 전하고 돌려보낸다', 'Tell the passenger yourself and send them away'), s: L('判断は正しいが、上席への引き継ぎと記録がない', '판단은 맞지만 상급자 인계와 기록이 없음', 'Right call, but no escalation or record'),
        run: function () { addTime(2); mood(-30); c.chk.entry = 'ng'; c.flags.denied = true; note('bad', function () { return tx(L('搭乗をお断りした判断は正しいものの、SVへの引き継ぎと記録がありませんでした。', '탑승 거절 판단은 맞았지만 SV 인계와 기록이 없었습니다.', 'Refusing was right, but you skipped the handover to the SV and the record.')); }, 'passenger/1-3'); } },
       { id: 'issue', t: L('2日だけなので搭乗券を出す', '이틀뿐이니 탑승권을 발행한다', 'It is only two days — issue the boarding pass'), lock: L('できません：有効な査証がないお客様は運送しない（入国拒否・送還・違反通知）', '할 수 없음: 유효한 비자가 없는 승객은 운송하지 않음(입국 거부·송환·위반 통지)', 'Not allowed: no valid visa, no carriage (refusal, removal, infringement notice)') }],
      'ciq/1-4', function () { if (c.flags.denied) { endPax(true); } else { tabEntry(); renderTabs(); } });
  }

  /* 좌석 */
  function tabSeat() {
    var c = S.cur, p = c.p, ac = M.aircraft;
    var html = '<div class="h3">' + esc(tx(L('座席を選ぶ', '좌석 선택', 'Choose a seat'))) + ' <span class="small">B737-800 · Y</span></div><div class="seatwrap"><div class="seatmap">';
    for (var r = 1; r <= ac.rows; r++) {
      if (r === 13) { /* 13 skip none */ }
      html += '<div class="rn">' + r + '</div>';
      for (var i = 0; i < 6; i++) {
        if (i === 3) html += '<div></div>';
        var id = r + ac.cols[i], cls = 'seat', dis = '';
        if (ac.inop.indexOf(id) >= 0) { cls += ' inop'; dis = 'disabled'; }
        else if (S.seats.indexOf(id) >= 0 && c.seat !== id) { cls += ' taken'; dis = 'disabled'; }
        if (ac.exitRows.indexOf(r) >= 0) cls += ' exit';
        if (S.infantSeats.indexOf(id) >= 0) cls += ' inf';
        if (c.seat === id) cls += ' sel';
        html += '<button class="' + cls + '" data-seat="' + id + '" ' + dis + ' aria-label="' + id + '">' + ac.cols[i] + '</button>';
      }
    }
    html += '</div></div><div class="legend"><span><em style="background:#2b5f6b"></em>' + esc(tx(L('空席', '빈 좌석', 'Free'))) + '</span><span><em style="background:#33434a"></em>' + esc(tx(L('指定済み', '배정됨', 'Taken'))) + '</span><span><em style="background:#2b5f6b;box-shadow:inset 0 -4px 0 #ffcf6b"></em>' + esc(tx(L('非常口座席', '비상구 좌석', 'Exit row'))) + '</span><span><em style="background:#2b5f6b;outline:2px solid #a78bfa"></em>' + esc(tx(L('幼児連れ', '유아 동반', 'With infant'))) + '</span><span><em style="background:repeating-linear-gradient(45deg,#4a1e1c 0 4px,#33434a 4px 8px)"></em>INOP</span></div>';
    if (p.pnr.req) html += '<p class="small" style="margin-top:6px">' + esc(tx(L('お客様の希望', '승객 희망', 'Request'))) + ': ' + esc(tx({ window: L('窓側', '창가', 'window'), aisle: L('通路側', '통로', 'aisle'), exit: L('非常口座席', '비상구 좌석', 'exit row') }[p.pnr.req])) + '</p>';
    scr(html);
    if (!c.seatAsked) { c.seatAsked = true; say('me', D.seatAsk); say('pax', p.say.seat); }
    $('#scr').querySelectorAll('[data-seat]').forEach(function (b) { b.onclick = function () { pickSeat(b.dataset.seat); }; });
  }
  function pickSeat(id) {
    var c = S.cur, p = c.p, ac = M.aircraft, row = parseInt(id, 10), col = id.slice(-1);
    var block = 'ABC'.indexOf(col) >= 0 ? 'L' : 'R';
    if (ac.exitRows.indexOf(row) >= 0) {
      if (p.inf) {
        sfx.ng(); c.exitTried = true; say('me', D.exitNo);
        return modal(L('非常口座席には座れません', '비상구 좌석에 앉을 수 없습니다', 'Not allowed in an exit row'), id,
          L('非常口座席のお客様は、緊急時に乗務員を手伝う役割があります。幼児・小児連れのお客様、15歳未満の方などは座れません。', '비상구 좌석 승객은 비상시 승무원을 돕는 역할을 합니다. 유아·소아 동반 승객, 15세 미만 등은 앉을 수 없습니다.', 'Exit row passengers may have to help the crew in an emergency. Passengers with infants or children, under-15s and others may not sit there.'),
          [{ id: 'ex', t: L('理由を説明して、ほかの座席を案内する', '이유를 설명하고 다른 좌석을 안내한다', 'Explain why and offer another seat'), s: L('前方の通路側など、希望に近い席を探す', '앞쪽 통로 등 희망에 가까운 자리를 찾는다', 'Look for something close to the request, like a front aisle seat'),
            run: function () { mood(-4); say('pax', p.say.exitNoReply || p.say.seatOk); note('good', function () { return tx(L('幼児連れのお客様に非常口座席を割り当てず、理由を説明しました。', '유아 동반 승객에게 비상구 좌석을 배정하지 않고 이유를 설명했습니다.', 'You did not give the exit row to a passenger with an infant, and explained why.')); }, 'passenger/1-5'); } },
           { id: 'force', t: L('ご希望どおり非常口座席にする', '희망대로 비상구 좌석으로 한다', 'Give them the exit row as asked'), lock: L('できません：幼児連れのお客様は非常口座席に座れない', '할 수 없음: 유아 동반 승객은 비상구 좌석에 앉을 수 없음', 'Not allowed: passengers with infants cannot sit in exit rows') }],
          'passenger/1-5', function () { tabSeat(); });
      }
      say('me', D.exitExplain);
      return modal(L('非常口座席の条件確認', '비상구 좌석 조건 확인', 'Exit row check'), id,
        L('非常口座席は、条件（15歳以上、脱出を手伝える体力、乗務員の指示を理解できる等）を口頭で確認し、同意を得てから割り当てます。', '비상구 좌석은 조건(15세 이상, 탈출을 도울 체력, 승무원 지시 이해 등)을 구두로 확인하고 동의를 받은 뒤 배정합니다.', 'Confirm the conditions out loud (15 or older, able to help with the evacuation, can understand crew instructions) and get consent before assigning.'),
        [{ id: 'cf', t: L('条件を説明し、同意を得てから割り当てる', '조건을 설명하고 동의를 받은 뒤 배정한다', 'Explain the conditions, get consent, then assign'), s: L('約1分', '약 1분', '~1 min'), run: function () { addTime(1); say('pax', p.say.exitYes); setSeat(id, true); c.flags.exitOK = true; note('good', function () { return tx(L('非常口座席の条件を確認し、同意を得て割り当てました。', '비상구 좌석 조건을 확인하고 동의를 받아 배정했습니다.', 'You checked the exit row conditions and got consent.')); }, 'passenger/1-5'); } },
         { id: 'skip', t: L('確認せずに割り当てる', '확인 없이 배정한다', 'Assign without checking'), lock: L('できません：条件の確認と同意なしに非常口座席を割り当てない', '할 수 없음: 조건 확인과 동의 없이 비상구 좌석을 배정하지 않음', 'Not allowed: never assign an exit row without the check and consent') },
         { id: 'no', t: L('やめて別の席にする', '그만두고 다른 자리로', 'Cancel and pick another seat'), run: function () {} }],
        'passenger/1-5', function () { tabSeat(); renderTabs(); });
    }
    if (p.inf) {
      var clash = S.infantSeats.some(function (s) { var r2 = parseInt(s, 10), b2 = 'ABC'.indexOf(s.slice(-1)) >= 0 ? 'L' : 'R'; return r2 === row && b2 === block; });
      if (clash) {
        sfx.ng();
        return modal(L('同じ列の幼児連れが重なります', '같은 열에 유아 동반이 겹칩니다', 'Two infants in the same block'), id,
          L('列ごとに予備の酸素マスクの数が決まっているため、幼児連れのお客様は同じ列（左右のブロック）に集めず分散させます。', '열마다 예비 산소마스크 수가 정해져 있어, 유아 동반 승객은 같은 열(좌우 블록)에 모으지 않고 분산합니다.', 'Each row block has a fixed number of spare oxygen masks, so passengers with infants are spread out, not put in the same block.'),
          [{ id: 'ok', t: L('別の列にする', '다른 열로 한다', 'Choose another row'), run: function () { note('info', function () { return tx(L('幼児連れのお客様を分散させました。', '유아 동반 승객을 분산했습니다.', 'You spread out the passengers with infants.')); }, 'passenger/1-5'); } }],
          'passenger/1-5', function () { tabSeat(); });
      }
    }
    setSeat(id);
  }
  function setSeat(id, quiet) {
    var c = S.cur, p = c.p, col = id.slice(-1), row = parseInt(id, 10);
    if (c.seat) { S.seats.splice(S.seats.indexOf(c.seat), 1); if (p.inf) S.infantSeats.splice(S.infantSeats.indexOf(c.seat), 1); }
    c.seat = id; S.seats.push(id); if (p.inf) S.infantSeats.push(id);
    addTime(M.cost.seat); sfx.tap();
    var want = p.pnr.req, good = (want === 'window' && /[AF]/.test(col)) || (want === 'aisle' && /[CD]/.test(col)) || (want === 'exit' && p.inf && /[CD]/.test(col) && row <= 7) || (want === 'exit' && !p.inf && M.aircraft.exitRows.indexOf(row) >= 0) || !want;
    if (good) mood(+4); else mood(-4);
    c.seatGood = good;
    if (!quiet) { say('me', D.seatConfirm); say('pax', good ? p.say.seatOk : p.say.seatMeh); }
    tabSeat(); renderTabs();
  }

  /* 수하물 */
  function tabBag() {
    var c = S.cur, p = c.p, ap = R.airline.VELA;
    if (!c.bagSaid) { c.bagSaid = true; say('me', D.weigh); }
    var html = '<div class="h3">' + esc(tx(L('手荷物', '수하물', 'Bags'))) + ' <span class="small">' + esc(tx(L('無料：1個 23kg ／ 1個の上限 32kg（Vela Air 教育用）', '무료: 1개 23kg / 1개 상한 32kg (Vela Air 교육용)', 'Free: 1 piece 23kg / max 32kg per piece (Vela Air, training)'))) + '</span></div>';
    /* 보안 질문 */
    html += '<div class="panel" style="background:#0d2b35;border-color:#23444e;padding:10px;margin-bottom:10px"><div class="small" style="margin-bottom:6px">' + esc(tx(L('預ける荷物の保安質問', '위탁 수하물 보안 질문', 'Security questions for checked bags'))) + '</div>';
    if (!c.dg) html += '<button class="btn" id="dgq">' + esc(tx(L('3つの質問をする（自分で詰めたか・目を離したか・預かり物や危険物）', '세 가지 질문하기(직접 쌌는지·눈을 뗐는지·받은 물건이나 위험물)', 'Ask the 3 questions (packed it yourself, left unattended, items from others or dangerous goods)'))) + '</button>';
    else html += '<span class="pill ' + (p.dg === 'pb' ? 'warn' : 'ok') + '">' + esc(tx(p.dg === 'pb' ? L('モバイルバッテリーあり → 対応済み', '보조배터리 있음 → 처리 완료', 'Power banks found → handled') : L('該当なし', '해당 없음', 'Nothing to declare'))) + '</span>';
    html += '<div class="small" style="margin-top:6px">' + esc(tx(L('ライター・電池・スプレーなどは一律禁止ではなく、種類・容量・梱包によって「機内へ」「預け可」「運べない」が分かれます。見つかったら中身を確認します。', '라이터·배터리·스프레이 등은 일률적으로 금지가 아니라 종류·용량·포장에 따라 「기내로」「위탁 가능」「운송 불가」가 나뉩니다. 발견되면 내용을 확인합니다.', 'Lighters, batteries and sprays are not all banned: type, capacity and packing decide whether they go in the cabin, in the hold, or not at all. If found, check what they are.'))) + '</div>';
    html += '</div>';
    c.bags.forEach(function (b, i) {
      var bag = p.bags[i];
      html += '<div class="scale" style="margin-bottom:10px">' + (bag.stroller ? '' : '<img class="bagthumb" src="' + STG.src('prop_luggage_01') + '" alt="">') + '<div><div class="small">' + esc(tx(bag.stroller ? L('ベビーカー', '유모차', 'Stroller') : L('スーツケース', '캐리어', 'Suitcase'))) + ' ' + (i + 1) + '</div><div class="lcd">' + (b.w != null ? b.w.toFixed(1) : '--.-') + ' kg</div></div>' +
        (b.tag ? '<div class="tag"><span>VELA<br>' + V.to + '</span><b>' + V.to + '</b><span>' + b.tag + (bag.stroller ? '<br>INF·FREE' : '') + '</span></div>' :
          (b.w == null ? '<button class="btn pri" data-w="' + i + '">' + esc(tx(L('はかりに載せる', '저울에 올리기', 'Put on the scale'))) + '</button>' : '<button class="btn pri" data-tg="' + i + '">' + esc(tx(L('タグを発行する', '태그 발행', 'Print the bag tag'))) + '</button>')) + '</div>';
    });
    html += '<p class="small">' + esc(tx(L('機内持ち込み', '기내 반입', 'Carry-on'))) + ': ' + p.carry.toFixed(1) + ' kg / ' + ap.cabinMaxKg + ' kg</p>';
    scr(html);
    if ($('#dgq')) $('#dgq').onclick = askDG;
    $('#scr').querySelectorAll('[data-w]').forEach(function (b) { b.onclick = function () { weigh(+b.dataset.w); }; });
    $('#scr').querySelectorAll('[data-tg]').forEach(function (b) { b.onclick = function () { tagBag(+b.dataset.tg); }; });
  }
  function weigh(i) {
    var c = S.cur, p = c.p, kg = p.bags[i].kg; addTime(M.cost.weigh);
    STG.bag(p.bags[i].stroller ? 'stroller' : 'case');
    var t0 = performance.now(); (function anim(t) { var el = $('#scalelcd'); if (!el) return; var k = Math.min(1, (t - t0) / 500); el.textContent = (kg * k).toFixed(1); if (k < 1) requestAnimationFrame(anim); })(t0);
    c.bags[i].w = kg; sfx.tap();
    if (!p.bags[i].stroller && kg > R.airline.VELA.pieceMaxKg) { tabBag(); renderTabs(); return decideHeavy(i); }
    if (!p.bags[i].stroller && kg > R.airline.VELA.freeBag.Y.kg) { tabBag(); renderTabs(); return decideOverweight(i); }
    tabBag(); renderTabs();
  }
  /* 1個の上限(32kg, Vela Air 교육용)을 넘는 짐: 그대로는 받지 않음 → 2개로 나눔(2개째는 초과 요금) */
  function decideHeavy(i) {
    var c = S.cur, p = c.p, ap = R.airline.VELA, kg = c.bags[i].w, n = Math.ceil(kg / ap.pieceMaxKg), fee = ap.excessWeight[G.country];
    var opts = [];
    if (n <= 3) opts.push({ id: 'split', t: L('荷物を' + n + '個に分けてもらう（増えた' + (n - 1) + '個は追加料金・1個' + ap.pieceMaxKg + 'kg以下）', '짐을 ' + n + '개로 나누게 한다(늘어난 ' + (n - 1) + '개는 추가 요금·1개 ' + ap.pieceMaxKg + 'kg 이하)', 'Have it split into ' + n + ' pieces (' + (n - 1) + ' extra charged; each up to ' + ap.pieceMaxKg + 'kg)'), s: L('約5分', '약 5분', '~5 min'),
      run: function () {
        addTime(5); mood(-8);
        var each = Math.floor(kg / n * 10) / 10, rest = Math.round((kg - each * (n - 1)) * 10) / 10;
        p.bags[i].kg = rest; c.bags[i].w = rest;
        for (var k = 1; k < n; k++) { p.bags.push({ kg: each, extra: true }); c.bags.push({ w: null, tag: null }); S.revenue.push({ pax: p.pp.sur, amt: fee.amt, cur: fee.cur, what: 'EXTRA PIECE' }); }
        note('good', function () { return tx(L('1個の上限を超える荷物を分けてもらい、増えた分の料金を案内しました。', '1개 상한을 넘는 짐을 나누게 하고 늘어난 개수의 요금을 안내했습니다.', 'You had the over-limit bag split and charged the extra pieces.')); }, 'passenger/1-10');
      } });
    else opts.push({ id: 'cargo', t: L('手荷物としては運べないことを説明し、貨物での発送を案内する', '수하물로는 운송할 수 없음을 설명하고 화물 발송을 안내한다', 'Explain it cannot travel as baggage and suggest sending it as cargo'), s: L('約4分', '약 4분', '~4 min'),
      run: function () { addTime(4); mood(-12); p.bags.splice(i, 1); c.bags.splice(i, 1); STG.bag(null); note('good', function () { return tx(L('手荷物の範囲を超える重さのため、貨物での発送を案内しました。', '수하물 범위를 넘는 무게라서 화물 발송을 안내했습니다.', 'Too heavy for baggage, so you suggested cargo.')); }, 'passenger/1-10'); } });
    opts.push({ id: 'take', t: L('料金を取ってそのまま預かる', '요금을 받고 그대로 맡는다', 'Charge a fee and accept it as is'), lock: L('できません：1個の上限を超える荷物は、料金を払ってもそのまま預からない（作業者の安全）', '할 수 없음: 1개 상한을 넘는 짐은 요금을 내도 그대로 받지 않음(작업자 안전)', 'Not allowed: an over-limit piece is never accepted as is, even for a fee (handler safety)') });
    modal(L('1個の上限を超えています', '1개 상한을 넘었습니다', 'Over the per-piece limit'), kg.toFixed(1) + ' kg > ' + ap.pieceMaxKg + ' kg',
      L('1個の重さには上限があります（Vela Air 教育用：32kg）。作業する人の安全のため、上限を超える荷物は料金を払ってもそのままではお預かりしません。分けても上限を超える分は手荷物として運べません。', '1개의 무게에는 상한이 있습니다(Vela Air 교육용: 32kg). 작업자 안전을 위해 상한을 넘는 짐은 요금을 내도 그대로는 받지 않습니다. 나눠도 상한을 넘으면 수하물로 운송할 수 없습니다.', 'Each piece has a weight limit (Vela Air, training: 32kg). For handlers\' safety, a heavier piece is not accepted as is, even for a fee.'),
      opts, 'passenger/1-10', function () { tabBag(); renderTabs(); });
  }
  function tagBag(i) {
    var c = S.cur, p = c.p;
    if (!p.bags[i].stroller && c.bags[i].w > R.airline.VELA.pieceMaxKg) { return decideHeavy(i); } /* 태그 직전 공통 상한 검사: 요금·추가 짐으로 우회 불가 */
    if (!p.bags[i].stroller && c.bags[i].w > R.airline.VELA.freeBag.Y.kg && !c.bags[i].ex) { return decideOverweight(i); }
    addTime(M.cost.tag); sfx.print();
    c.bags[i].tag = 'VL' + (100000 + Math.floor(Math.random() * 899999));
    if (!c.dg && p.bags.length) c.flags.tagNoDG = true;
    if (p.dg === 'pb' && !c.dg) c.flags.pbInHold = true;
    tabBag(); renderTabs();
  }
  function askDG() {
    var c = S.cur, p = c.p; c.dg = true; addTime(M.cost.dg);
    say('me', D.dg);

    var alive = function () { return G.screen === 'play' && S.cur === c; };
    setTimeout(function () { if (alive()) say('pax', p.say.dg); }, 500);
    if (p.dg === 'pb') { if (c.bags.some(function (b) { return b.tag; })) c.flags.pbTaggedFirst = true; setTimeout(function () { if (alive()) decideBattery(); }, 900); }
    else { note('good', function () { return tx(L('預ける荷物の保安質問をしました。', '위탁 수하물 보안 질문을 했습니다.', 'You asked the security questions for the checked bag.')); }, 'passenger/1-1'); tabBag(); renderTabs(); }
  }
  function decideOverweight(i) {
    var c = S.cur, p = c.p, ap = R.airline.VELA, kg = c.bags[i].w, over = Math.round((kg - ap.freeBag.Y.kg) * 10) / 10, fee = ap.excessWeight[G.country];
    var feeTxt = (fee.cur === 'JPY' ? '¥' : '₩') + fee.amt.toLocaleString();
    var canMove = p.carry + over <= ap.cabinMaxKg; say('me', D.over);
    modal(L('重さの超過', '무게 초과', 'Overweight bag'), kg.toFixed(1) + ' kg − 23.0 kg = ' + over.toFixed(1) + ' kg',
      L('許容量と超過分を具体的に示し、「支払う」「荷物を減らす（機内に移す）」などの選択肢をお客様に選んでもらいます。機内に移せるのは、持ち込みの重さ・大きさ・個数と品目の制限に収まる物だけです。', '허용량과 초과분을 구체적으로 보여 주고 「요금 지불」「짐 줄이기(기내로 옮기기)」 같은 선택지를 승객이 고르게 합니다. 기내로 옮길 수 있는 것은 반입 무게·크기·개수와 품목 제한에 맞는 물건뿐입니다.', 'Show the allowance and the excess clearly, and let the passenger choose: pay, or lighten the bag (move items to the carry-on). Only items within the cabin weight, size, number and item limits can be moved.'),
      [{ id: 'pay', t: L('超過料金を案内する', '초과 요금을 안내한다', 'Explain the excess fee'), s: feeTxt + tx(L('（教育用）／ 約3分', '(교육용) / 약 3분', ' (training) / ~3 min')),
        run: function () { addTime(3); mood(-6); c.flags.excessDone = true; c.bags[i].ex = true; S.revenue.push({ pax: p.pp.sur, amt: fee.amt, cur: fee.cur, what: 'EXCESS BAG' }); say('pax', p.say.pay); note('good', function () { return tx(L('超過分を示して料金を案内し、収納しました。', '초과분을 보여 주고 요금을 안내해 받았습니다.', 'You showed the excess, explained the fee and collected it.')); }, 'passenger/1-10'); } },
       { id: 'move', t: L('機内持ち込みの制限（重さ・大きさ・個数・品目）の範囲で、一部を手荷物に移してもらう', '기내 반입 제한(무게·크기·개수·품목) 범위에서 일부를 기내 가방으로 옮기게 한다', 'Move some items to the carry-on, within the cabin limits (weight, size, number, items)'), s: tx(L('機内持ち込み ', '기내 반입 ', 'Carry-on ')) + p.carry.toFixed(1) + ' + ' + over.toFixed(1) + ' = ' + (p.carry + over).toFixed(1) + ' kg（' + tx(L('上限', '상한', 'max')) + ' 10 kg）',
        lock: canMove ? null : L('できません：機内持ち込みの上限を超える', '할 수 없음: 기내 반입 상한 초과', 'Not possible: carry-on would exceed the limit'),
        run: function () { addTime(4); mood(-1); c.flags.excessDone = true; c.bags[i].ex = true; c.bags[i].w = ap.freeBag.Y.kg; p.carry = Math.round((p.carry + over) * 10) / 10; $('#scalelcd').textContent = c.bags[i].w.toFixed(1); say('pax', p.say.move); note('good', function () { return tx(L('機内持ち込みの上限内で荷物を移してもらい、許容量に収めました。', '기내 반입 상한 안에서 짐을 옮기게 해 허용량에 맞췄습니다.', 'You had the passenger move items within the carry-on limit to fit the allowance.')); }, 'passenger/1-10'); } },
       { id: 'waive', t: L('今回は無料にしておく', '이번에는 무료로 해 준다', 'Let it go free this time'), lock: L('できません：担当者の判断で規定外の免除はしない（公平性・収入）', '할 수 없음: 담당자 판단으로 규정 밖 면제를 하지 않음(공평성·수입)', 'Not allowed: agents do not waive fees outside the rules (fairness, revenue)') }],
      'passenger/1-10', function () { tabBag(); renderTabs(); });
  }
  function decideBattery() {
    var c = S.cur, p = c.p, cr = R.country[G.country], core = R.core; say('me', D.pbOut);
    var rows = p.pb.map(function (b, i) { return { i: i, mAh: b.mAh, v: b.v, wh: core.wh(b.mAh, b.v), ans: null }; });
    function body() {
      return '<p>' + esc(tx(L('モバイルバッテリーは受託手荷物に入れられません。まず取り出してもらい、1個ずつ容量（Wh）を確認します。', '보조배터리는 위탁 수하물에 넣을 수 없습니다. 먼저 꺼내게 하고 하나씩 용량(Wh)을 확인합니다.', 'Power banks cannot go in checked bags. Have them taken out first, then check the capacity (Wh) of each one.'))) + '</p>' +
        '<p class="mono" style="font-size:13px">Wh = mAh × V ÷ 1000</p>' +
        rows.map(function (r) {
          return '<div class="opt" style="cursor:default"><b class="mono">#' + (r.i + 1) + ' ' + r.mAh.toLocaleString() + ' mAh · ' + r.v + ' V</b>' +
            (r.ans ? '<small>' + r.wh + ' Wh → ' + esc(tx(cat(r.wh))) + (r.ans === catKey(r.wh) ? ' ✓' : ' ✗') + '</small>' :
              '<div class="btns" style="margin-top:6px">' + ['le100', 'le160', 'gt160'].map(function (k) { return '<button class="btn ghost pbb" data-b="' + r.i + '" data-c="' + k + '">' + esc(tx(catLab(k))) + '</button>'; }).join('') + '</div>') + '</div>';
        }).join('');
    }
    function catKey(wh) { return wh <= 100 ? 'le100' : wh <= 160 ? 'le160' : 'gt160'; }
    function catLab(k) { return { le100: L('100Wh以下', '100Wh 이하', '≤100Wh'), le160: L('100Wh超〜160Wh以下', '100Wh 초과~160Wh 이하', '>100Wh to 160Wh'), gt160: L('160Wh超', '160Wh 초과', '>160Wh') }[k]; }
    function cat(wh) { return catLab(catKey(wh)); }
    var card;
    function render() {
      card = openModalShell(L('モバイルバッテリーが3個、スーツケースに入っています', '보조배터리 3개가 캐리어에 들어 있습니다', 'Three power banks in the suitcase'), body());
      S.modalRedraw = render;
      card.addEventListener('click', onPick);
    }
    render();
    function onPick(e) {
      var b = e.target.closest('[data-b]'); if (!b) return;
      var r = rows[+b.dataset.b]; r.ans = b.dataset.c; addTime(.5);
      if (r.ans === catKey(r.wh)) sfx.ok(); else { sfx.ng(); note('bad', function () { return tx(L('容量の区分を間違えました：', '용량 구분을 틀렸습니다: ', 'Wrong capacity band: ')) + r.mAh + 'mAh = ' + r.wh + 'Wh'; }, 'passenger/1-13'); }
      card.querySelector('.cbody').innerHTML = body();
      if (rows.every(function (x) { return x.ans; })) setTimeout(function () { if (G.screen === 'play' && S.cur === c) step2(); }, 500);
    }
    function step2() {
      closeModal();
      var cr0 = R.country[G.country].pb;
      modal(L('どれを機内に持ち込めますか', '어느 것을 기내에 들고 갈 수 있나요', 'Which can go in the cabin?'), '37Wh · 74Wh · 111Wh',
        L('国の基準：160Wh以下・1人' + cr0.maxCarry + '個まで、受託不可。Vela Air（教育用）：100Whを超えるものはカウンターで承認しません。', '국가 기준: 160Wh 이하·1인 ' + cr0.maxCarry + '개까지, 위탁 불가. Vela Air(교육용): 100Wh를 넘는 것은 카운터에서 승인하지 않습니다.', 'National rule: up to 160Wh, max ' + cr0.maxCarry + ' per person, never in checked bags. Vela Air (training): nothing over 100Wh is approved at the counter.'),
        [{ id: 'ship', t: L('37Wh・74Whは手荷物へ。111Whは空港の宅配カウンターで送れるか確認してもらう（送れなければ放棄の手順へ）', '37Wh·74Wh는 기내로. 111Wh는 공항 택배 창구에서 보낼 수 있는지 확인하게 한다(안 되면 포기 절차로)', '37Wh and 74Wh in the cabin bag; the 111Wh one: check at the airport delivery counter whether it can be shipped (if not, surrender procedure)'), s: L('リチウム電池は宅配でも送れない場合がある ― 可否は窓口が判断 ／ 約5分', '리튬 배터리는 택배로도 못 보낼 수 있음 — 가능 여부는 창구가 판단 / 약 5분', 'Lithium batteries may not be accepted for shipping either; the counter decides / ~5 min'),
          run: function () { addTime(5); mood(-6); done('ship'); } },
         { id: 'discard', t: L('37Wh・74Whは手荷物へ。111Whは空港の所定の手順で放棄していただく', '37Wh·74Wh는 기내로. 111Wh는 공항의 정해진 절차로 포기하게 한다', '37Wh and 74Wh in the cabin; the 111Wh one is surrendered under the airport procedure'), s: L('選択肢と取扱いを説明し、記録 ／ 約2分', '선택지와 처리를 설명하고 기록 / 약 2분', 'Explain the options and handling, and record it / ~2 min'),
          run: function () { addTime(2); mood(-14); done('discard'); } },
         { id: 'all', t: L('3個とも機内に持ち込ませる', '3개 모두 기내에 들고 가게 한다', 'Let all three go in the cabin'), lock: L('できません：国の基準で1人' + cr0.maxCarry + '個まで ／ Vela Air（教育用）は100Wh超を承認しない', '할 수 없음: 국가 기준 1인 ' + cr0.maxCarry + '개까지 / Vela Air(교육용)는 100Wh 초과를 승인하지 않음', 'Not allowed: national rule max ' + cr0.maxCarry + ' per person / Vela Air (training) does not approve over 100Wh') },
         { id: 'hold', t: L('預けたままにする', '맡긴 채로 둔다', 'Leave them in the checked bag'), lock: L('できません：モバイルバッテリーは受託手荷物に入れない', '할 수 없음: 보조배터리는 위탁 수하물에 넣지 않음', 'Not allowed: power banks never go in checked baggage') }],
        'passenger/1-13', function () { tabBag(); renderTabs(); });
    }
    function done(how) {
      say('pax', how === 'discard' ? p.say.pbDiscard : p.say.pbShip);
      note('good', function () { return tx(L('保安質問でモバイルバッテリーを見つけ、受託から取り出して容量と個数を確認しました。', '보안 질문으로 보조배터리를 찾아 위탁에서 꺼내고 용량과 개수를 확인했습니다.', 'Your security questions found the power banks; you took them out of the checked bag and checked capacity and count.')); }, 'passenger/1-13');
      note('info', function () { return tx(cr.pb.note); }, 'passenger/1-13');
      if (c.flags.pbTaggedFirst) { addTime(4); note('bad', function () { return tx(L('タグを付けた後で質問したため、荷物をBHSから戻す手間がかかりました。質問はタグの前に。', '태그를 단 뒤에 질문해서 짐을 BHS에서 되돌리는 수고가 들었습니다. 질문은 태그 전에.', 'You asked after tagging, so the bag had to come back from the BHS. Ask before tagging.')); }, 'passenger/1-1'); }
      c.flags.pbHandled = true;
    }
  }

  /* 탑승권 */
  function tabBP() {
    var c = S.cur, p = c.p;
    var need = [];
    if (!c.pnr) need.push(L('予約の呼び出し', '예약 불러오기', 'Retrieve the booking'));
    if (!c.pp) need.push(L('旅券の受け取り', '여권 받기', 'Take the passport'));
    if (!c.seat) need.push(L('座席', '좌석', 'Seat'));
    if (c.bags.some(function (b) { return !b.tag; })) need.push(L('手荷物タグ', '수하물 태그', 'Bag tags'));
    if (c.bp) {
      scr(bpHTML() + '<div class="btns"><button class="btn pri" id="bye">' + esc(tx(L('ゲートと時刻を案内してお見送り', '게이트와 시각을 안내하고 배웅', 'Give gate and time, and see them off'))) + '</button></div>');
      $('#bye').onclick = function () { endPax(false); };
      return;
    }
    var html = '<div class="h3">' + esc(tx(L('搭乗券を発行する', '탑승권 발행', 'Issue the boarding pass'))) + '</div><img class="bpprop" src="' + STG.src('prop_boarding_pass_01') + '" alt="">';
    if (need.length) html += '<p class="small">' + esc(tx(L('まだ終わっていない手続き：', '아직 끝나지 않은 수속: ', 'Still to do: '))) + need.map(tx).join('、') + '</p>';
    var warn = [];
    if (!c.chk.validity || !c.chk.photo || !c.chk.ticketName) warn.push(L('旅券の確認', '여권 확인', 'passport checks'));
    if (!c.denied && (!c.entryQ || !c.chk.entry)) warn.push(L('渡航条件', '입국 조건', 'entry requirements'));
    if (p.bags.length && !c.dg) warn.push(L('保安質問', '보안 질문', 'security questions'));
    if (G.hints && warn.length && !need.length) html += '<p class="small" style="color:var(--termwarn)">' + esc(tx(L('未確認：', '미확인: ', 'Not checked: '))) + warn.map(tx).join('、') + esc(tx(L(' ― 発行はできますが、安全・保安の見落としとして記録されます。', ' — 발행은 되지만 안전·보안 누락으로 기록됩니다.', ' — you can still issue, but it will be recorded as a safety miss.'))) + '</p>';
    html += '<div class="btns"><button class="btn pri" id="issue" ' + (need.length ? 'disabled' : '') + '>' + esc(tx(L('発行する', '발행', 'Issue'))) + '</button></div>';
    scr(html);
    if ($('#issue')) $('#issue').onclick = issueBP;
  }
  function issueBP() {
    var c = S.cur, p = c.p;
    /* 놓친 확인의 결과 */
    if (p.issue === 'name' && !c.flags.nameFixed) {
      sfx.ng(); addTime(5); mood(-10); var was = p.pnr.sur + '/' + p.pnr.given; fixName(c); c.chk.ticketName = 'ok'; c.flags.nameSkipped = true;
      note('bad', function () { return tx(L('予約と旅券の名前の違いを見落とし、API送信でエラーになりました。訂正のため5分かかりました。', '예약과 여권의 이름 차이를 놓쳐 API 송신에서 오류가 났습니다. 정정에 5분이 걸렸습니다.', 'You missed the name mismatch and the API transmission failed. Fixing it took 5 minutes.')); }, 'ciq/0-4');
      return modal(L('API送信エラー', 'API 송신 오류', 'API transmission error'), 'NAME MISMATCH ' + p.pp.sur + '/' + p.pp.given + ' ≠ ' + was,
        L('事前旅客情報（API）は旅券の情報で送ります。予約の名前を規定にそって訂正しました。', '사전 승객 정보(API)는 여권 정보로 보냅니다. 예약 이름을 규정에 따라 정정했습니다.', 'API data is sent from the passport. The booking name has been corrected under the rules.'),
        [{ id: 'ok', t: L('訂正して続ける', '정정하고 계속', 'Correct it and continue'), run: function () {} }], 'ciq/0-4', function () { issueBP(); });
    }
    if (p.issue === 'visa' && !c.flags.denied) { safetyMiss(c, L('期限切れの査証で搭乗券を発行（入国拒否）', '만료된 비자로 탑승권 발행(입국 거부)', 'Boarding pass issued on an expired visa (refused entry)')); c.flags.inad = true; note('bad', function () { return tx(L('期限切れの査証を見落として搭乗券を出しました。到着地で入国拒否（INAD）となり、送還費用と違反通知の対象になります。', '기한이 지난 비자를 놓치고 탑승권을 발행했습니다. 도착지에서 입국 거부(INAD)되어 송환 비용과 위반 통지 대상이 됩니다.', 'You missed the expired visa and issued a boarding pass. The passenger will be refused entry (INAD): removal costs and an infringement notice.')); }, 'ciq/1-4'); }
    if (c.flags.pbInHold && !c.flags.pbHandled) { safetyMiss(c, L('保安質問をせずにタグを付け、受託手荷物にモバイルバッテリーが残ったまま（X線で発見・開披検査）', '보안 질문 없이 태그를 달아 위탁 수하물에 보조배터리가 남음(X선 발견·개방 검사)', 'Tagged without the security questions; power banks stayed in the checked bag (found by X-ray, bag search)')); addTime(6); mood(-15); note('bad', function () { return tx(L('保安質問をせずにタグを付けたため、X線検査で受託手荷物の中のモバイルバッテリーが見つかり、開披検査になりました。', '보안 질문 없이 태그를 달아서 X선 검사에서 위탁 수하물 속 보조배터리가 발견되어 개방 검사가 되었습니다.', 'You tagged the bag without the security questions. X-ray found power banks in the checked bag and a bag search followed.')); }, 'passenger/2-3'); }
    else if (c.flags.tagNoDG && !c.dg) { safetyMiss(c, L('預ける荷物の保安質問をしていない', '위탁 수하물 보안 질문을 하지 않음', 'No security questions for the checked bag')); note('bad', function () { return tx(L('預ける荷物の保安質問をしませんでした。今回は該当物がありませんでしたが、保安上の必須手順の省略です。', '위탁 수하물 보안 질문을 하지 않았습니다. 이번에는 해당 물품이 없었지만 보안상 필수 절차를 생략한 것입니다.', 'You skipped the security questions for the checked bag. Nothing was found this time, but it is a mandatory security step.')); }, 'passenger/1-1'); }
    if (!c.chk.validity || !c.chk.photo || !c.chk.ticketName || c.flags.nameSkipped) { safetyMiss(c, L('旅券の確認（有効期限・写真と本人・予約の名前）をしていない', '여권 확인(유효기간·사진과 본인·예약 이름)을 하지 않음', 'Passport not fully checked (validity, photo, name on the booking)')); note('bad', function () { return tx(L('旅券の確認（有効期限・写真と本人・予約の名前）を終えずに発券しました。本人確認と書類確認は必須です。', '여권 확인(유효기간·사진과 본인·예약 이름)을 끝내지 않고 발권했습니다. 본인 확인과 서류 확인은 필수입니다.', 'You issued without finishing the passport checks (validity, photo, name on the booking). Identity and document checks are mandatory.')); }, 'passenger/1-3'); }
    if (p.issue !== 'visa' && (!c.entryQ || !c.chk.entry)) { safetyMiss(c, L('渡航条件（入国・通過）を確認していない', '입국·경유 조건을 확인하지 않음', 'Entry/transit requirements not checked')); note('bad', function () { return tx(L('渡航条件を確認せずに発券しました（今回は問題なし）。書類不備のまま運ぶと入国拒否の原因になります。', '입국 조건을 확인하지 않고 발권했습니다(이번에는 문제없음). 서류 미비로 운송하면 입국 거부의 원인이 됩니다.', 'You issued without checking the entry requirements (fine this time). Carrying a passenger with the wrong documents leads to refused entry.')); }, 'ciq/1-2'); }
    c.bp = true; S.seq++; c.seqNo = S.seq; addTime(M.cost.bp); sfx.print(); mood(+3); say('me', D.bpIssue);
    tabBP(); renderTabs();
  }
  function safetyMiss(c, what) { S.strikes++; (S.safety = S.safety || []).push({ who: c.p.pp.sur + ' ' + c.p.pp.given, what: what }); }
  function bpHTML() {
    var c = S.cur, p = c.p, ap = R.airport[V.from];
    return '<div class="bp"><div class="m"><div class="lab">Vela Air · Boarding pass</div><div class="big">' + p.pp.sur + '/' + p.pp.given + '</div>' +
      '<div class="grid"><span class="lab">Flight</span><span class="lab">From</span><span class="lab">To</span><span class="lab">Date</span><b class="mono">' + V.flight + '</b><b class="mono">' + V.from + '</b><b class="mono">' + V.to + '</b><b class="mono">10OCT</b>' +
      '<span class="lab">Gate</span><span class="lab">Boarding</span><span class="lab">Seat</span><span class="lab">Seq</span><b class="mono">' + ap.gate + '</b><b class="mono">' + V.board + '</b><b class="mono">' + c.seat + '</b><b class="mono">' + ('00' + c.seqNo).slice(-3) + '</b></div>' +
      (p.inf ? '<div class="lab" style="margin-top:6px">+INF ' + p.inf.sur + '/' + p.inf.given + '</div>' : '') + '<div class="bars"></div></div>' +
      '<div class="s"><span>' + V.flight + '</span><span>' + V.from + '→' + V.to + '</span><span>SEAT ' + c.seat + '</span><span>GATE ' + ap.gate + '</span><span>BRD ' + V.board + '</span></div></div>';
  }
  function endPax(denied) {
    var c = S.cur, p = c.p;
    if (S.leaving) return;
    say('me', denied ? D.deny : D.bye(R.airport[V.from].gate, V.board));
    if (!denied) { say('pax', p.say.thanks); if (c.seatGood) note('good', function () { return tx(L('お客様の希望に合う座席を割り当てました。', '승객 희망에 맞는 좌석을 배정했습니다.', 'You gave a seat that matched the request.')); }, 'passenger/1-5'); }
    if (denied && c.flags.handover && p.say.denyOk) say('pax', p.say.denyOk);
    c.denied = denied; STG.pose(denied ? 'explain' : 'greet');
    /* 대사가 끝날 때까지 기다린 뒤 승객이 떠나고 다음 승객으로 (음성 끔: 1.6초 읽을 시간) */
    S.leaving = true; document.body.classList.add('busy');
    var mine = S.cur;
    setTimeout(function () {
      VO.whenIdle(function () {
        if (S.cur !== mine || G.screen !== 'play' || !$('#paxwrap')) return;
        $('#paxwrap').style.transform = 'translateX(-40%)'; $('#paxwrap').style.opacity = 0;
        setTimeout(function () { if (S.cur !== mine || G.screen !== 'play') return; S.leaving = false; document.body.classList.remove('busy'); guide(''); say('me', ''); say('pax', ''); nextPax(); }, 900);
      }, 12000);
    }, G.voice ? 300 : 1600);
  }

  /* ---------- 판단 모달 ---------- */
  function openModalShell(title, html) {
    $('#modal').innerHTML = '<div class="modal"><div class="card" role="dialog" aria-modal="true"><h2>' + esc(tx(title)) + '</h2><div class="cbody">' + html + '</div></div></div>';
    return $('#modal .card');
  }
  function closeModal() { if (S) S.modalRedraw = null; var md = $('#modal'); if (md) md.innerHTML = ''; if (G.screen === 'play') STG.pose('idle'); }
  function modal(title, fact, must, opts, lesson, after) {
    var h = '<div class="mhead">' + (S && S.cur && STG.has(S.cur.p.art) ? STG.mini(S.cur.p) : '') + '<p class="mono" style="font-size:13px;color:var(--sub);margin:0">' + esc(fact) + '</p></div><div class="must">' + STG.mascot('korarin', 'idle', 'km') + '<div><b>' + esc(tx(T.rule)) + '</b> ' + esc(tx(must)) + '</div></div>';
    h += opts.map(function (o, i) {
      var lock = o.lock;
      return '<button class="opt' + (lock ? ' lock' : '') + '" data-i="' + i + '">' + (lock ? '🔒 ' : '') + esc(tx(o.t)) + (o.s ? '<small>' + esc(tx(o.s)) + '</small>' : '') + '</button>';
    }).join('');
    h += '<div id="whybox"></div>';
    if (lesson && LS[lesson]) h += '<p class="lessonref">📘 ' + lesson + ' ' + esc(tx(LS[lesson]) || LS[lesson].ja) + '</p>';
    var card = openModalShell(title, h); STG.pose('explain');
    var args = arguments; S.modalRedraw = function () { modal.apply(null, args); };
    card.querySelectorAll('.opt').forEach(function (b) {
      b.onclick = function () {
        var o = opts[+b.dataset.i];
        if (o.lock) { sfx.ng(); $('#whybox').innerHTML = '<div class="why bad">' + esc(tx(o.lock)) + '</div>'; if (S.cur) note('info', function () { return tx(L('できない選択を試みました：', '할 수 없는 선택을 시도했습니다: ', 'Tried a choice that is not allowed: ')) + tx(o.t); }, lesson); return; }
        sfx.ok(); closeModal(); if (o.run) o.run(); if (after) after();
      };
    });
    return card;
  }

  /* ---------- 결과 ---------- */
  function finish() {
    if (S.cur && S.results.indexOf(S.cur) < 0) S.results.push(S.cur);
    var unserved = S.list.length - S.results.length;
    var bad = 0, good = 0, moods = [];
    S.results.forEach(function (r) { r.notes.forEach(function (n) { if (n.t === 'bad') bad++; if (n.t === 'good') good++; }); if (!r.denied) moods.push(r.mood); });
    var acc = Math.max(0, 100 - bad * 12 - unserved * 15);
    var svc = Math.round(moods.reduce(function (a, b) { return a + b; }, 0) / Math.max(1, moods.length));
    var left = S.close - S.clock, tim = unserved ? Math.max(0, 40 - unserved * 10) : Math.round(Math.max(0, Math.min(100, 70 + left * 4)));
    var tot = Math.round(acc * .4 + svc * .3 + tim * .3);
    var safe = S.strikes === 0, smiss = (S.safety || []);
    var rank = !safe ? 'C' : tot >= 90 ? 'S' : tot >= 80 ? 'A' : tot >= 65 ? 'B' : 'C';
    G.best = G.best || {}; var key = 'pax.ci.01.' + G.country; if (!G.best[key] || G.best[key] < tot) G.best[key] = tot; save();
    var rev = S.revenue.map(function (r) { return r.pax + ' ' + r.what + ' ' + (r.cur === 'JPY' ? '¥' : '₩') + r.amt.toLocaleString(); });
    var rp = S.results.map(function (r) {
      var p = r.p;
      return '<div class="rp"><h3>' + p.pp.sur + ' ' + p.pp.given + ' <span style="font-weight:400;color:var(--sub);font-size:12px">' + (r.denied ? tx(L('搭乗お断り', '탑승 거절', 'Not accepted')) : (r.seat || '—')) + ' · ' + tx(L('満足', '만족', 'Mood')) + ' ' + Math.round(r.mood) + ' · ' + r.mins.toFixed(1) + tx(T.min) + '</span></h3><ul>' +
        (r.notes.length ? r.notes.map(function (n) { return '<li class="' + (n.t === 'bad' ? 'bad' : n.t === 'good' ? 'good' : '') + '">' + esc(noteText(n)) + (n.l && LS[n.l] ? ' <span class="lessonref">📘 ' + n.l + '</span>' : '') + '</li>'; }).join('') : '<li>' + esc(tx(L('記録なし', '기록 없음', 'No notes'))) + '</li>') + '</ul></div>';
    }).join('');
    G.screen = 'result';
    $('#app').innerHTML = '<div class="res"><div class="panel reshead"><div class="twins">' + STG.mascot('koradon', rank === 'S' || rank === 'A' ? 'greet' : 'idle') + STG.mascot('korarin', rank === 'S' || rank === 'A' ? 'greet' : 'idle') + '</div><div class="rank">' + rank + '</div><div><h2 style="margin:0">' + esc(tx(L('チェックイン締め切り', '체크인 마감', 'Check-in closed'))) + ' · ' + V.flight + '</h2><div style="color:var(--sub);font-size:13px">' + hm(S.clock) + ' / ' + tx(L('締切', '마감', 'close')) + ' ' + V.close + ' · ' + tx(L('総合', '종합', 'Total')) + ' ' + tot + '</div></div></div>' +
      '<div class="gate ' + (safe ? 'ok' : 'ng') + '">' + esc(tx(safe ? L('安全・保安：合格 ― 安全に関わる見落としはありません。', '안전·보안: 합격 — 안전 관련 누락이 없습니다.', 'Safety & security: pass — no safety-related misses.') : L('安全・保安：要再訓練 ― 安全に関わる見落としは、ほかの点数で埋め合わせできません。', '안전·보안: 재훈련 필요 — 안전 관련 누락은 다른 점수로 메울 수 없습니다.', 'Safety & security: retraining needed — safety misses cannot be offset by other scores.'))) + (smiss.length ? '<ul class="smiss">' + smiss.map(function (x) { return '<li>' + esc(typeof x === 'string' ? x : x.who + ' — ' + tx(x.what)) + '</li>'; }).join('') + '</ul>' : '') + '</div>' +
      '<div class="score"><div class="sc"><div class="v">' + acc + '</div><div class="l">' + esc(tx(L('正確さ', '정확성', 'Accuracy'))) + '</div></div><div class="sc"><div class="v">' + svc + '</div><div class="l">' + esc(tx(L('お客様の満足', '승객 만족', 'Passenger mood'))) + '</div></div><div class="sc"><div class="v">' + tim + '</div><div class="l">' + esc(tx(L('時間', '시간', 'Time'))) + '</div></div><div class="sc"><div class="v">' + (rev.length ? rev.length : 0) + '</div><div class="l">' + esc(tx(L('空港での収入（件）', '공항 수입(건)', 'Airport sales (items)'))) + '</div></div></div>' +
      (rev.length ? '<div class="panel"><h2>' + esc(tx(L('空港売上 ― 便の締めで精算します（次のステージへ）', '공항 매출 — 편 마감 때 정산합니다(다음 스테이지로)', 'Airport sales — settled when the flight closes (next stages)'))) + '</h2><p class="mono" style="margin:0">' + rev.join('<br>') + '</p></div>' : '') +
      '<div class="panel"><h2>' + esc(tx(L('ふりかえり', '되돌아보기', 'Replay'))) + '</h2><div class="replay">' + rp + '</div></div>' +
      '<div class="panel"><h2>' + esc(tx(L('この便のデータは次へつながります', '이 편의 데이터는 다음으로 이어집니다', 'This flight\'s data carries on'))) + '</h2><p style="margin:0;font-size:14px">' + esc(tx(L('チェックインした人数・座席・手荷物の個数と重さは、ゲート（STAGE 02）とロードコントロール W&B（STAGE 03）の入力になります。', '체크인한 인원·좌석·수하물 개수와 무게는 게이트(STAGE 02)와 탑재관리 W&B(STAGE 03)의 입력이 됩니다.', 'Checked-in passengers, seats and bag counts and weights feed the Gate (STAGE 02) and Load Control W&B (STAGE 03).'))) + '</p>' +
      '<p class="mono" style="font-size:13px;margin:8px 0 0">PAX ' + S.results.filter(function (r) { return r.bp; }).length + ' / BAGS ' + S.results.reduce(function (a, r) { return a + r.bags.filter(function (b) { return b.tag; }).length; }, 0) + ' / ' + S.results.reduce(function (a, r) { return a + r.bags.reduce(function (x, b) { return x + (b.tag ? b.w : 0); }, 0); }, 0).toFixed(1) + ' KG</p></div>' +
      '<div class="btns"><button class="start" id="again" style="width:auto">' + esc(tx(L('もう一度', '다시 하기', 'Play again'))) + '</button><button class="start" id="home" style="width:auto;background:#5d7480">' + esc(tx(L('タイトルへ', '처음으로', 'Title'))) + '</button></div></div>';
    $('#again').onclick = startMission; $('#home').onclick = renderTitle;
    window.scrollTo(0, 0);
  }

  /* ---------- 시작 ---------- */
  /* 사이트(항공커리어노트) 안에서: 사이트 공통 언어 설정(art-lang)과 맞춤. 상단 언어 버튼(#lang)으로 바꾸면 화면을 다시 그림 */
  var SITE = !!window.__SHELL;
  function setLang(l) {
    if (['ja', 'ko', 'en'].indexOf(l) < 0) return;
    G.lang = l; document.documentElement.lang = l; save();
    try { localStorage.setItem('art-lang', l); } catch (e) {}
    var lb = document.getElementById('lang'); if (lb) lb.querySelectorAll('button[data-l]').forEach(function (b) { b.classList.toggle('on', b.dataset.l === l); });
    if (G.screen === 'title') renderTitle();
    else if (G.screen === 'play' && S && S.cur) { $('#gbar').innerHTML = barInner(); bindBar(); updateBar(); var mr = S.modalRedraw; renderTabs(); showTab(S.cur.tab); var b = S.bub || {}; if (b.me) say('me', b.me, true); if (b.pax) say('pax', b.pax, true); var gv = $('#guide'); if (S.guideL && gv && !gv.classList.contains('hide')) guide(S.guideL); if (mr) mr(); }
    else if (G.screen === 'result') finish();
  }
  function boot() {
    STG.preload();
    var had = false; try { had = !!localStorage.getItem('acn-saga-v1'); } catch (e) {}
    load();
    if (!had) { var nl = (navigator.language || 'ja').slice(0, 2); G.lang = nl === 'ko' ? 'ko' : nl === 'en' ? 'en' : 'ja'; }
    if (SITE) { try { var al = localStorage.getItem('art-lang'); if (['ja', 'ko', 'en'].indexOf(al) >= 0) G.lang = al; } catch (e) {} }
    var lb = document.getElementById('lang');
    if (lb) { lb.addEventListener('click', function (e) { var b = e.target.closest('button[data-l]'); if (b) setLang(b.dataset.l); }); lb.querySelectorAll('button[data-l]').forEach(function (b) { b.classList.toggle('on', b.dataset.l === G.lang); }); }
    document.documentElement.lang = G.lang;
    renderTitle();
  }
  window.SAGA = window.AS = { boot: boot, _S: function () { return S; }, _G: G };
  boot();
})();
