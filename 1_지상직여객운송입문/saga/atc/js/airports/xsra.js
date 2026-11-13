/* AIRLINE SAGA — ATC(관제편) 공항 묶음: 세이라 국제공항(XSRA)
 * 전부 가상(공항 · 공역 · 호출부호 · 주파수). 실제 운항 · 관제에 쓸 수 없는 교육용 값.
 * 지상 좌표: 활주로 축 u(07 방향, m) · v(그 왼쪽, m).
 */
(function (G) {
  'use strict';
  var ATC = G.ATC;
  ATC.AIRPORT_DEFS.XSRA = function (D, mk) {
    var h = mk(70), uv2xy = h.uv2xy, pol = h.pol, off = h.off, fx = h.fx, fin = h.fin, N = h.N, E = h.E, hline = h.hline, vline = h.vline, F = D.fix;

    D.airport = {
      icao: 'XSRA', iata: 'XSR', name: 'Seira International Airport', elev: 20,
      call: 'Seira',                                   /* 교신에서 부르는 이름(Seira Tower …) */
      short: ATC.pick({ ko: '세이라', ja: 'セイラ', en: 'Seira' }),            /* 화면 글에 쓰는 짧은 이름 → 문구의 {apt} */
      ko: ATC.pick({ ko: '세이라 국제공항', ja: 'セイラ国際空港', en: 'Seira International Airport' }),
      transAlt: 14000, tower: { u: 0, v: 0 }
    };

    /* ---------- 활주로 ---------- */
    D.twrZoneNM = 6;          /* 관제탑이 활주로 분리로 책임지는 범위(공항 중심에서 NM) */
    D.indepParallel = true;   /* 두 평행 활주로(간격 1,600m)에 독립 평행 접근을 운용 — 둘 다 로컬라이저에 확립하면 서로 레이더 분리를 요구하지 않음 */
    /* 유도로 이름표를 그릴 자리 [이름, u, v] */
    D.gLabels = [['A', -1500, 600], ['A', 250, 600], ['A', 1550, 600], ['B', -1350, -600], ['B', 250, -600], ['B', 1500, -600], ['N', -800, 380], ['N', 400, 380], ['N', 1100, 380], ['S', -800, -380], ['S', 400, -380], ['S', 1100, -380], ['C', -1200, 190], ['C', -1200, -190], ['D', 1300, 190], ['D', 1300, -190],
        ['P1', -900, 490], ['P2', 0, 490], ['P3', 900, 490], ['Q1', -900, -490], ['Q2', 0, -490], ['Q3', 900, -490], ['E', -500, 980], ['K', -400, 1050]];
    /* 그림 의뢰용 배치도가 덮는 범위(m) */
    D.guide = { u1: -2400, u2: 2400, v1: -1500, v2: 1500 };
    /* 지상 바탕 그림: 파일과 그 그림이 덮는 범위(m). 그림을 바꾸면 이 네 값만 다시 맞춤 */
    D.sat = { img: 'assets/img/ground_sat.webp', u1: -2400, u2: 2400, v1: -1420, v2: 1467, edge: '#60634a' };
    D.rw = {
      N: { id: 'N', u1: -1800, u2: 1800, v: 800, width: 60, a: '07L', b: '25R' },
      S: { id: 'S', u1: -1500, u2: 1700, v: -800, width: 60, a: '07R', b: '25L' }
    };
    D.ends = {
      '07L': { id: '07L', rw: 'N', thrU: -1800, endU: 1800, dir: 1, crs: 70, ilsId: 'ISN', ilsFq: '110.30', exits: ['A4', 'A5', 'A6'], holds: ['A1', 'A2'] },
      '25R': { id: '25R', rw: 'N', thrU: 1800, endU: -1800, dir: -1, crs: 250, ilsId: 'ISR', ilsFq: '109.50', exits: ['A3', 'A2', 'A1'], holds: ['A6', 'A5'] },
      '07R': { id: '07R', rw: 'S', thrU: -1500, endU: 1700, dir: 1, crs: 70, ilsId: 'ISS', ilsFq: '111.10', exits: ['B4', 'B5', 'B6'], holds: ['B1', 'B2'] },
      '25L': { id: '25L', rw: 'S', thrU: 1700, endU: -1500, dir: -1, crs: 250, ilsId: 'ISL', ilsFq: '108.90', exits: ['B3', 'B2', 'B1'], holds: ['B6', 'B5'] }
    };
    h.finishRunways();
    /* 운용 방향(flow): 북쪽 활주로 = 도착, 남쪽 활주로 = 출발(분리 운용) */
    D.flows = {
      E: { id: 'E', label: ATC.T('07 방향'), arr: '07L', dep: '07R', arr2: '07R', dep2: '07L', sfx: 'A', vecFix: ['HOTAR', 'KALVO', 'SORIN'],
        w: 0.6, wind: { dir: 40, spd: 5, spdN: 9 },                      /* 「바람대로」에서 뽑힐 비율 · 그때의 바람 범위(dir부터 60° · spd부터 spdN kt) */
        push: 'west', pushDu: -1, mini: 'R', taxiNote: ATC.T('계류장 유도로 N·S는 서쪽 방향 일방통행'),
        closures: [['C', -1200, 380, -1200, 0, -1200, -380], ['P2', 0, 600, 0, 380], ['B', -1200, -600, -900, -600]] },   /* 유도로 폐쇄 사건 후보 [이름, u, v, u, v …] */
      W: { id: 'W', label: ATC.T('25 방향'), arr: '25R', dep: '25L', arr2: '25L', dep2: '25R', sfx: 'B', vecFix: ['YODAN', 'KUMOI', 'SAGAN'],
        w: 0.4, wind: { dir: 220, spd: 6, spdN: 10 },
        push: 'east', pushDu: 1, mini: 'L', taxiNote: ATC.T('계류장 유도로 N·S는 동쪽 방향 일방통행'),
        closures: [['D', 1300, 380, 1300, 0, 1300, -380], ['P2', 0, 600, 0, 380], ['B', 900, -600, 1100, -600, 1300, -600]] }
    };
    /* 표준 유도 흐름(일방통행 권장): 운용 방식에 따라 유도로 구간마다 벌점 */
    D.taxiFlow = function (flowId, hard) {
      var bad = hard ? 1e9 : 3.2, w = flowId === 'E' ? -1 : 1;
      return function (e, a, b) {
        if (e.kind === 'lane' && (e.name === 'N' || e.name === 'S')) return (b.u - a.u) * w < 0 ? bad : 1;
        var out = Math.abs(b.v) > Math.abs(a.v);   /* 계류장 → 평행 유도로 방향 */
        if (e.name === 'P2' || e.name === 'Q2') return out ? 1 : bad;
        if (e.name === 'P1' || e.name === 'Q1') return (flowId === 'E') === out ? 1 : bad;
        if (e.name === 'P3' || e.name === 'Q3') return (flowId === 'W') === out ? 1 : bad;
        return 1;
      };
    };
    /* 주기장 묶음: 화물 · 소형기 · 여객, 활주로별로 가까운 여객 주기장 묶음, 자리가 없을 때 쓰는 주기장 */
    D.standGroups = { cargo: ['K'], ga: ['G', 'W'], pax: ['N', 'S'] }; D.rwStands = { N: 'N', S: 'S' }; D.spareStand = '301';
    D.center = { x: 0, y: 0 };   /* 공항 기준점(레이더 좌표) */
    /* 운용 방향마다: 기준 방위(hdg) · 활주로별로 쓰는 끝(use) */
    h.finishFlows();

    /* ---------- 공역 지점 ---------- */
    fx('SRA', { x: 0, y: 0 }, 'vor');
    fx('MIRAN', pol(350, 42), 'in'); fx('TOKAS', pol(85, 42), 'in'); fx('SELDO', pol(170, 42), 'in'); fx('PARUM', pol(265, 42), 'in');
    fx('NEVIS', pol(40, 42), 'out'); fx('EKATO', pol(125, 42), 'out'); fx('SUDAR', pol(215, 42), 'out'); fx('WAVEN', pol(310, 42), 'out');
    fin('07L', 'RIKOS', 'DENAL'); fin('07R', 'RUMIT', 'DOLAN'); fin('25R', 'ASUKO', 'ALBAN'); fin('25L', 'AMIDO', 'ARGON');
    fx('KALVO', off(F.RIKOS, 340, 8), 'base'); fx('SORIN', off(F.RUMIT, 160, 8), 'base');
    fx('KUMOI', off(F.ASUKO, 340, 8), 'base'); fx('SAGAN', off(F.AMIDO, 160, 8), 'base');
    fx('HOTAR', pol(10, 13), 'dw'); fx('YODAN', pol(190, 13), 'dw');

    D.entryAlt = { MIRAN: 12000, TOKAS: 13000, SELDO: 12000, PARUM: 13000 };
    D.star = {
      E: { MIRAN: ['MIRAN', 'KALVO'], TOKAS: ['TOKAS', 'HOTAR', 'KALVO'], SELDO: ['SELDO', 'SORIN'], PARUM: ['PARUM', 'RIKOS'] },
      W: { MIRAN: ['MIRAN', 'KUMOI'], TOKAS: ['TOKAS', 'ASUKO'], SELDO: ['SELDO', 'SAGAN'], PARUM: ['PARUM', 'YODAN', 'SAGAN'] }
    };
    D.sidInit = 6000;      /* SID 초기 상승 고도(ft) */
    D.tmaTop = 19000;      /* 접근관제 상한 = FL190 */
    D.tmaR = 45;
    D.gateDest = {
      NEVIS: [['RJTT', 'Tokyo Haneda'], ['RJAA', 'Tokyo Narita'], ['RJBB', 'Osaka Kansai'], ['RJCC', 'Sapporo New Chitose']],
      EKATO: [['PGUM', 'Guam'], ['YSSY', 'Sydney'], ['PHNL', 'Honolulu']],
      SUDAR: [['RCTP', 'Taipei Taoyuan'], ['VHHH', 'Hong Kong'], ['WSSS', 'Singapore Changi'], ['VTBS', 'Bangkok Suvarnabhumi']],
      WAVEN: [['RKSI', 'Seoul Incheon'], ['RKPK', 'Busan Gimhae'], ['ZSPD', 'Shanghai Pudong'], ['RJFF', 'Fukuoka']]
    };
    D.gateOrig = {
      MIRAN: [['RKSI', 'Seoul Incheon'], ['RKPK', 'Busan Gimhae'], ['RJCC', 'Sapporo New Chitose']],
      TOKAS: [['RJTT', 'Tokyo Haneda'], ['RJAA', 'Tokyo Narita'], ['RJBB', 'Osaka Kansai'], ['PHNL', 'Honolulu']],
      SELDO: [['PGUM', 'Guam'], ['YSSY', 'Sydney'], ['RCTP', 'Taipei Taoyuan']],
      PARUM: [['VHHH', 'Hong Kong'], ['WSSS', 'Singapore Changi'], ['ZSPD', 'Shanghai Pudong'], ['VTBS', 'Bangkok Suvarnabhumi']]
    };
    /* 출발 게이트의 방향(동쪽행 = 홀수 FL, 서쪽행 = 짝수 FL) */
    D.gateEast = { NEVIS: true, EKATO: true, SUDAR: false, WAVEN: false };

    /* 최저 레이더 유도 고도(MVA) — 산악 구역만 높음 */
    D.mvaBase = 2500;
    D.mva = [{ n: 'MT. HAKUREI', c: pol(15, 24), r: 7, alt: 6000, peak: 4600 }];

    /* ---------- 지역관제(ACC) 구역 ---------- */
    D.acc = { x1: -130, x2: 130, y1: -95, y2: 95 };
    fx('BASOR', { x: -130, y: 55 }, 'bd'); fx('ONYXA', { x: -130, y: -30 }, 'bd');
    fx('DAISY', { x: 130, y: 60 }, 'bd'); fx('ELGAR', { x: 130, y: -35 }, 'bd');
    fx('FUMIN', { x: -30, y: 95 }, 'bd'); fx('GOSHU', { x: 55, y: 95 }, 'bd');
    fx('HIVON', { x: -45, y: -95 }, 'bd'); fx('IRUNO', { x: 60, y: -95 }, 'bd');
    fx('KENJO', { x: -60, y: 50 }, 'en'); fx('LOTAS', { x: 62, y: 52 }, 'en');
    fx('MANGA', { x: -58, y: -52 }, 'en'); fx('NIKOS', { x: 65, y: -50 }, 'en');
    D.bdSide = { BASOR: 'W', ONYXA: 'W', DAISY: 'E', ELGAR: 'E', FUMIN: 'N', GOSHU: 'N', HIVON: 'S', IRUNO: 'S' };
    D.neighbor = {
      W: { n: 'Jade Control', fq: '134.70' }, E: { n: 'Akitsu Control', fq: '135.30' },
      N: { n: 'Haneul Control', fq: '132.60' }, S: { n: 'Coral Control', fq: '128.90' }
    };
    D.airways = [
      { n: 'Y10', f: ['BASOR', 'KENJO', 'LOTAS', 'DAISY'] },
      { n: 'Y20', f: ['ONYXA', 'MANGA', 'NIKOS', 'ELGAR'] },
      { n: 'A1', f: ['FUMIN', 'KENJO', 'MANGA', 'HIVON'] },
      { n: 'A2', f: ['GOSHU', 'LOTAS', 'NIKOS', 'IRUNO'] },
      { n: 'B5', f: ['BASOR', 'SRA', 'ELGAR'] },
      { n: 'B6', f: ['ONYXA', 'SRA', 'DAISY'] }
    ];
    /* 통과기(overflight) 경로 */
    D.ovfRoutes = [
      ['BASOR', 'KENJO', 'LOTAS', 'DAISY'], ['DAISY', 'LOTAS', 'KENJO', 'BASOR'],
      ['ONYXA', 'MANGA', 'NIKOS', 'ELGAR'], ['ELGAR', 'NIKOS', 'MANGA', 'ONYXA'],
      ['FUMIN', 'KENJO', 'MANGA', 'HIVON'], ['HIVON', 'MANGA', 'KENJO', 'FUMIN'],
      ['GOSHU', 'LOTAS', 'NIKOS', 'IRUNO'], ['IRUNO', 'NIKOS', 'LOTAS', 'GOSHU'],
      ['BASOR', 'SRA', 'ELGAR'], ['ELGAR', 'SRA', 'BASOR'], ['ONYXA', 'SRA', 'DAISY'], ['DAISY', 'SRA', 'ONYXA']
    ];
    /* 도착기: 경계 지점 → TMA 진입 지점 / 출발기: TMA 출구 → 경계 지점 */
    D.accArr = { MIRAN: ['FUMIN', 'GOSHU'], TOKAS: ['DAISY', 'ELGAR'], SELDO: ['IRUNO', 'HIVON'], PARUM: ['ONYXA', 'BASOR'] };
    D.accDep = { NEVIS: ['GOSHU', 'DAISY'], EKATO: ['ELGAR', 'IRUNO'], SUDAR: ['HIVON', 'ONYXA'], WAVEN: ['BASOR', 'FUMIN'] };
    D.accArrAlt = 13000;   /* TMA 진입 지점 통과 고도(협정) */
    D.restricted = { n: 'R-21', pts: [{ x: 56, y: -86 }, { x: 78, y: -86 }, { x: 78, y: -62 }, { x: 56, y: -62 }], top: 35000 };

    /* ---------- 주파수 ---------- */
    D.freq = {
      DEL: { n: D.airport.call + ' Delivery', fq: '121.85' }, GND: { n: D.airport.call + ' Ground', fq: '121.70' },
      TWR: { n: D.airport.call + ' Tower', fq: '118.10' }, APP: { n: D.airport.call + ' Approach', fq: '119.10' },
      DEP: { n: D.airport.call + ' Departure', fq: '126.00' }, ACC: { n: D.airport.call + ' Control', fq: '133.50' }, ATIS: { n: 'ATIS', fq: '128.25' }
    };

    /* ---------- 지상 그래프(유도로) ---------- */
    var standU = [-700, -500, -300, -100, 100, 300, 500, 700];
    hline('A', 600, [-1800, -1200, -900, -500, -200, 0, 500, 900, 1100, 1300, 1800]);
    hline('B', -600, [-1500, -1200, -900, -100, 0, 500, 900, 1100, 1300, 1700]);
    hline('N', 380, [-1200, -900, -700, -500, -300, -100, 0, 100, 300, 500, 700, 900, 1300], { kind: 'lane' });
    hline('S', -380, [-1200, -900, -700, -500, -300, -100, 0, 100, 300, 500, 700, 900, 1300], { kind: 'lane' });
    vline('C', -1200, [600, 380, 0, -380, -600]);
    vline('D', 1300, [600, 380, 0, -380, -600]);
    vline('P1', -900, [600, 380]); vline('P2', 0, [600, 380]); vline('P3', 900, [600, 380]);
    vline('Q1', -900, [-600, -380]); vline('Q2', 0, [-600, -380]); vline('Q3', 900, [-600, -380]);
    function conn(name, u, side, rw) {
      var s = side, a = N(u, 600 * s), h = N(u, 690 * s, { hold: name, rw: rw }), r = N(u, 800 * s, { rwy: rw });
      E(a, h, name); E(h, r, name, { kind: 'entry', rw: rw });
      D.holds[name] = { name: name, node: h, rnode: r, anode: a, u: u, rw: rw, lu: u + 62, lv: s * 652 };   /* lu · lv = 이름표 자리 */
    }
    [['A1', -1800], ['A2', -900], ['A3', -200], ['A4', 500], ['A5', 1100], ['A6', 1800]].forEach(function (c) { conn(c[0], c[1], 1, 'N'); });
    [['B1', -1500], ['B2', -900], ['B3', -100], ['B4', 500], ['B5', 1100], ['B6', 1700]].forEach(function (c) { conn(c[0], c[1], -1, 'S'); });
    hline('RWY', 800, [-1800, -900, -500, -200, 500, 1100, 1800], { kind: 'rwy', rw: 'N' });
    hline('RWY', -800, [-1500, -900, -100, 500, 1100, 1700], { kind: 'rwy', rw: 'S' });
    /* 북쪽 화물 계류장: E 유도로가 북쪽 활주로를 횡단(정지선 = 남쪽 ES · 북쪽 EN, 부를 때는 둘 다 'E') */
    (function () {
      var a = N(-500, 600), hs = N(-500, 690, { hold: 'E', hkey: 'ES', rw: 'N' }), r = N(-500, 800, { rwy: 'N' }), hn = N(-500, 910, { hold: 'E', hkey: 'EN', rw: 'N' }), k = N(-500, 1050);
      E(a, hs, 'E'); E(hs, r, 'E', { kind: 'entry', rw: 'N' }); E(r, hn, 'E', { kind: 'entry', rw: 'N' }); E(hn, k, 'E');
      D.crossHolds = { ES: hs, EN: hn };
      hline('K', 1050, [-700, -500, -300], { kind: 'lane' });
    })();
    /* 주기장: lab = 번호를 적을 자리(주기장 기준 m), faces = 푸시백 기수 두 가지, faceRec = 권장 기수(없으면 운용 방식의 push) */
    var LAB = { N: [-62, -40], S: [-62, 40], K: [-62, 30], W: [-70, 46], G: [70, 46] };
    function stand(name, su, sv, lu, lv, grp) {
      var s = N(su, sv, { stand: name }), ns = grp === 'W' || grp === 'G'; E(s, N(lu, lv), 'STAND', { kind: 'stand' });
      D.stands[name] = { name: name, node: s, lane: lu + ',' + lv, u: su, v: sv, grp: grp, lab: LAB[grp], faces: ns ? ['north', 'south'] : ['west', 'east'], faceRec: ns ? 'south' : null };
    }
    standU.forEach(function (u, i) { stand('10' + (i + 1), u, 250, u, 380, 'N'); stand('20' + (i + 1), u, -250, u, -380, 'S'); });
    stand('K1', -700, 1160, -700, 1050, 'K'); stand('K2', -500, 1160, -500, 1050, 'K'); stand('K3', -300, 1160, -300, 1050, 'K');
    stand('301', -1390, 0, -1200, 0, 'W'); stand('G1', 1490, 0, 1300, 0, 'G');
    D.standU = standU;
    /* 바탕 그림이 없을 때 그리는 계류장 · 건물(rect(u1, v1, u2, v2, 색)) */
    D.decor = function (rect, C) {
      rect(-1290, -500, 1390, 500, C.apron); rect(-1480, -120, -1200, 120, C.apron); rect(1300, -110, 1580, 110, C.apron);
      rect(-820, 1000, -180, 1250, C.apron);
      rect(-830, -150, 830, 150, C.bld); rect(-800, -110, 800, 110, C.bld2); rect(-780, -22, 780, 22, '#5d666e');
      for (var i = -760; i <= 760; i += 95) rect(i - 14, -100, i + 14, 100, '#7b858d');
      standU.forEach(function (u) { rect(u + 22, 150, u + 30, 218, '#9aa3ab'); rect(u + 22, -218, u + 30, -150, '#9aa3ab'); });
      rect(-790, 1262, -210, 1340, '#6b6f58'); rect(-770, 1272, -230, 1330, '#7f846a');
      rect(1500, 130, 1640, 230, '#6a7178'); rect(-1560, 140, -1420, 220, '#6a7178');
    };
    return h;
  };
  ATC.AIRPORT_DEFS.XSRA.title = ATC.pick({ ko: '세이라 국제공항(가상)', ja: 'セイラ国際空港(架空)', en: 'Seira Intl (fictional)' });
})(typeof globalThis !== 'undefined' ? globalThis : this);
