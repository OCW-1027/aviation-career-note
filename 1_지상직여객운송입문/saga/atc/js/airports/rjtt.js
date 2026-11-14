/* AIRLINE SAGA — ATC(관제편) 공항 묶음: 도쿄국제공항(하네다, RJTT) — 다섯 자리(비행허가 · 지상 · 관제탑 · 접근 · 지역)
 * 자료: AIP Japan RJTT AD 2(기준일 2026-11-26) — 활주로 시단 좌표 · 주기장 좌표 · 유도로 이름 · 주파수 · 출발 활주로 배정표.
 * 교육용으로 단순화한 값이며 실제 운항 · 관제에 쓸 수 없음. 항공사와 편명은 전부 가상.
 *  - 유도로: 실제 이름을 쓰되 줄기만 골라 곧은 선으로 폄(고속 탈출 유도로도 직각으로 그림). 좌표는 AIP 비행장 차트에서 읽은 근삿값(±30m).
 *  - 주기장: AIP의 주기장 좌표를 그대로 씀(터미널 1 · 2 · 3 · 화물 · N 구역에서 일부만).
 *  - 방위: 자북 기준(편차 7°W를 반영해 활주로 방위가 차트의 접근 코스와 맞도록 함 — 34L/34R = 337°, 22 = 222°).
 * 지상 좌표: 공항 기준점(ARP)에서 u = 활주로 16→34 방향(m) · v = 그 왼쪽(동북동, m). AIP 비행장 차트와 같은 방향(오른쪽 = 남남동, 위 = 동북동).
 */
(function (G) {
  'use strict';
  var ATC = G.ATC;
  ATC.AIRPORT_DEFS.RJTT = function (D, mk) {
    var h = mk(157), fx = h.fx, N = h.N, E = h.E, F = D.fix, T = ATC.T;
    var ARP = [35 + 33 / 60 + 12 / 3600, 139 + 46 / 60 + 52 / 3600], TRUE_HDG = 149.88, D2R = Math.PI / 180;
    /* 위경도 → 지상 좌표(m) → 레이더 좌표(NM). 진방위 149.88°가 u축 */
    function ll2uv(la, lo) {
      var p = ARP[0] * D2R, mla = 111132.92 - 559.82 * Math.cos(2 * p) + 1.175 * Math.cos(4 * p), mlo = 111412.84 * Math.cos(p) - 93.5 * Math.cos(3 * p);
      var X = (lo - ARP[1]) * mlo, Y = (la - ARP[0]) * mla, g = TRUE_HDG * D2R;
      return [X * Math.sin(g) + Y * Math.cos(g), -X * Math.cos(g) + Y * Math.sin(g)];
    }
    function ll(la, lo) { var p = ll2uv(la, lo); return h.uv2xy(p[0], p[1]); }

    D.airport = {
      icao: 'RJTT', iata: 'HND', name: 'Tokyo International Airport', elev: 21,
      call: 'Tokyo',
      short: ATC.pick({ ko: '하네다', ja: '羽田', en: 'Haneda' }),
      ko: ATC.pick({ ko: '도쿄국제공항(하네다)', ja: '東京国際空港(羽田)', en: 'Tokyo International Airport (Haneda)' }),
      transAlt: 14000, tower: { u: 290, v: 125 },
      note: ATC.pick({ ko: 'AIP Japan 2026-11-26 기준 · 교육용으로 단순화 · 실제 운항과 관제에 쓸 수 없음', ja: 'AIP Japan 2026-11-26基準・教育用に簡略化・実際の運航や管制には使えません', en: 'Based on AIP Japan 26 NOV 2026 · simplified for training · not for real-world use' })
    };
    /* 하네다만의 음성 조각(assets/voice/rjtt/ — tools/voice_corpus_rjtt.js → VBANK_APT=RJTT voice_bank.js → VAPT=RJTT voice_synth.py). 관제사는 일본어 목소리 */
    D.voice = { dir: 'assets/voice/rjtt/', parts: { ctl: 2, ctlf: 2, p1: 3, p2: 2, p3: 2, p4: 2 },
      note: ATC.T('하네다의 관제사 목소리는 일본인 관제사처럼 일본어 억양의 영어로 녹음했습니다. 접근관제 · 지역관제의 교신은 아직 녹음한 조각이 없어 브라우저의 영어 음성으로 나옵니다.') };
    D.modes = ['DEL', 'GND', 'TWR', 'APP', 'ACC'];
    D.faceVec = { north: [-1, 0], south: [1, 0], east: [0, 1], west: [0, -1] };   /* 푸시백 기수 방향 → 지상 좌표(여기서는 u축이 남남동) */
    D.twrZoneNM = 6; D.indepParallel = true;

    /* ---------- 활주로(시단 좌표 = AIP AD 2.12) ---------- */
    D.rw = {
      A: { id: 'A', a: '16R', b: '34L', width: 60 }, C: { id: 'C', a: '16L', b: '34R', width: 60 },
      B: { id: 'B', a: '04', b: '22', width: 60 }, D: { id: 'D', a: '05', b: '23', width: 60 }
    };
    function end(id, rw, p, q, crs, o) { var e = { id: id, rw: rw, thrU: p[0], thrV: p[1], endU: q[0], endU2: q[0], endV2: q[1], dir: 1, crs: crs }; for (var k in o) e[k] = o[k]; D.ends[id] = e; }
    D.ends = {};
    var A16 = [-1186, -575], A34 = [1813, -575], C16 = [-958, 1125], C34 = [2402, 1125], B04 = [-488, -1796], B22 = [-1538, 473], D05 = [3832, 120], D23 = [3088, 2507];
    /* 16R의 처음 133m는 B 활주로 서쪽에 있음 — 그 부분과 A16 · L16(B 활주로를 건너 들어가는 진입로)은 넣지 않고, 16R 이륙은 AIP가 교차점 이륙 지점으로 든 A15 · A14(동쪽) · L15 · L14(서쪽)에서 진입.
       활주로 연결 유도로의 위치는 AIP AD 2.20 1.3 (4)(c)의 「교차점 이륙 때 남은 활주로 길이」에서 계산(활주로 중심선과 만나는 점).
       이설 시단: 16R 480m(착륙 가용 2,520m) · 16L 390m(2,970m) · 34R 360m(3,000m) */
    end('16R', 'A', A16, A34, 157, { disp: 480, ilsId: 'ITA', ilsFq: '111.55', exits: ['A7', 'A6', 'A5', 'A4', 'A2', 'A1'], holds: ['A15', 'A14'] });
    end('34L', 'A', A34, A16, 337, { ilsId: 'IHA', ilsFq: '111.70', exits: ['A10', 'A11', 'A12', 'A13', 'A14', 'A15'], holds: ['A1', 'A2'] });
    end('16L', 'C', C16, C34, 157, { disp: 390, ilsId: 'IOC', ilsFq: '111.95', exits: ['C7', 'C6', 'C5', 'C3', 'C2', 'C1'], holds: ['C14', 'C13'] });
    end('34R', 'C', C34, C16, 337, { disp: 360, ilsId: 'ITC', ilsFq: '108.90', exits: ['C9', 'C10', 'C11', 'C12', 'C13', 'C14'], holds: ['C1', 'C2', 'C3'] });
    end('04', 'B', B04, B22, 42, { exits: ['B12', 'B13', 'B14'], holds: ['B1', 'B2'] });
    end('22', 'B', B22, B04, 222, { ilsId: 'IAD', ilsFq: '108.10', exits: ['B6', 'B4', 'B2', 'B1'], holds: ['B14', 'B13'] });
    end('05', 'D', D05, D23, 50, { exits: ['D6', 'D7'], holds: ['D1', 'D2'] });
    end('23', 'D', D23, D05, 230, { ilsId: 'ITD', ilsFq: '110.50', exits: ['D5', 'D3', 'D4', 'D2', 'D1'], holds: ['D7', 'D6'] });
    h.finishRunways();
    /* 활주로 양쪽에 유도로가 있는 A · B: 주기장이 있는 쪽으로 빠짐(서쪽 = 터미널 3 · N 구역) */
    var WEST_EXITS = { '34L': ['L12', 'L11', 'L13', 'L14', 'L15'], '16R': ['L9', 'L6', 'L5', 'L4', 'L3'], '22': ['T6', 'T4', 'T2', 'T1'] };
    D.exitList = function (e, ac) {
      var sd = D.stands[ac.stand], w = WEST_EXITS[e.id]; if (!sd || !w) return null;
      if (e.rw === 'A') return sd.grp === 'T3' || sd.grp === 'KI' || sd.grp === 'NA' ? w : null;
      if (e.rw === 'B') return sd.grp === 'NA' ? w : null;
      return null;
    };
    /* 16R 이륙: 터미널 3 · 화물 · N 구역에서 오면 활주로를 건너지 않고 서쪽 대기 지점(L15 · L14)에서 진입 */
    D.holdList = function (e, ac) { var sd = D.stands[ac.stand]; return e.id === '16R' && sd && (sd.grp === 'T3' || sd.grp === 'KI' || sd.grp === 'NA') ? ['L15', 'L14'] : null; };

    /* ---------- 운용 방식(낮 시간대 · AIP AD 2.20 / AIC 기준을 단순화) ----------
       북풍: 착륙 34L · 34R / 이륙 05 · 34R        남풍: 착륙 22 · 23 / 이륙 16R · 16L
       (남풍 오후 일부 시간의 16L · 16R 착륙 운용은 넣지 않음) */
    D.flows = {
      N: { id: 'N', label: T('북풍 운용'), arr: '34L', dep: '05', arrs: ['34L', '34R'], deps: ['05', '34R'], sfx: 'A',
        depBy: { ROVER: '34R', BEKLA: '34R', GUSRO: '05', NINOX: '05', LAXAS: '05' }, arrBy: { GODIN: '34R', POLIX: '34R', XAC: '34L', AKSEL: '34L', AROSA: '34L' }, appArr: '34L', vecFix: ['WEDGE', 'COACH', 'EDDIE'],
        twr: { 1: { arr: ['34L'], dep: ['34R'] }, 2: { arr: ['34R'], dep: ['05'] } },      /* 관제탑 초급 = 서로 독립인 평행 활주로 / 중급 = 05 이륙과 34R 접근이 서로 걸리는 조합 */
        w: 0.6, wind: { dir: 350, spd: 6, spdN: 10 }, push: 'south', pushDu: 1, mini: 'R',
        taxiNote: T('유도로 W · E · L은 남쪽 방향, A는 북쪽 방향, H는 동쪽 · G는 서쪽 방향이 표준'),
        closures: [['W', 450, -285, 800, -285], ['E', 300, 830, 550, 830, 800, 830], ['H', 1100, -285, 1100, 555]] },
      S: { id: 'S', label: T('남풍 운용'), arr: '22', dep: '16R', arrs: ['23', '22'], deps: ['16R', '16L'], sfx: 'A', simul: [['22', '23']],
        depBy: { ROVER: '16L', BEKLA: '16L', GUSRO: '16R', NINOX: '16R', LAXAS: '16R' }, arrBy: { GODIN: '22', POLIX: '22', XAC: '23', AKSEL: '23', AROSA: '23' }, appArr: '23', vecFix: ['SHAFT', 'SCREW', 'STOCK'],
        twr: { 1: { arr: ['23'], dep: ['16R'] }, 2: { arr: ['22'], dep: ['16R'] } },       /* 초급 = 서로 걸리지 않는 23 착륙 · 16R 이륙 / 중급 = 교차 활주로(22 착륙 · 16R 이륙) */
        w: 0.4, wind: { dir: 170, spd: 7, spdN: 11 }, push: 'north', pushDu: -1, mini: 'L',
        taxiNote: T('유도로 W · A · E · L은 북쪽 방향, K는 동쪽 · J는 서쪽 방향이 표준'),
        closures: [['W', 450, -285, 800, -285], ['E', 300, 830, 550, 830, 800, 830], ['J', -870, -285, -870, 630]] }
    };
    /* 표준 유도 흐름(게임값 — 마주 보고 멈추는 일을 줄이려는 일방통행 권장. 실제 표준 경로는 AIP AD 2.20 참조)
       북풍: W · E · L 남쪽 방향 / A 북쪽 방향 / H 동쪽(C 활주로 쪽) · G 서쪽
       남풍: W · A · E · L 모두 북쪽 방향(16R · 16L 대기 지점 쪽) / K 동쪽 · J 서쪽 */
    D.taxiFlow = function (flowId, hard) {
      var bad = hard ? 6 : 2.4, badL = hard ? 8 : 5;      /* L은 터미널 3쪽의 하나뿐인 줄기라 더 세게: 반대 방향은 안쪽 P · M으로 돌아가게 */
      return function (e, a, b) {
        var du = b.u - a.u, dv = b.v - a.v, n = e.name, flat = a.v === b.v;
        if (flowId === 'N') {
          if ((n === 'W' || n === 'E') && flat) return du < 0 ? bad : 1;
          if (n === 'A' && flat) return du > 0 ? bad : 1;
          if (n === 'L' && flat) return du < 0 ? badL : 1;
          if (n === 'H') return dv < 0 ? bad : 1; if (n === 'G') return dv > 0 ? bad : 1;
        } else {
          if ((n === 'W' || n === 'E' || n === 'A') && flat) return du > 0 ? bad : 1;
          if (n === 'L' && flat) return du > 0 ? badL : 1;
          if (n === 'K') return dv < 0 ? bad : 1; if (n === 'J') return dv > 0 ? bad : 1;
        }
        return 1;
      };
    };
    D.standGroups = { cargo: ['KI', 'KD'], ga: ['NA'], pax: ['T1', 'T2', 'T3'] }; D.rwStands = {}; D.spareStand = '32';
    D.center = { x: 0, y: 0 };
    h.finishFlows();

    /* ---------- 출발 · 도착 지점과 공항 ----------
       국내선 목적지 ↔ 출구 지점: AIC 020/26(2026-11-26 적용)의 표준 비행계획 경로에 맞춤(GPT ATC-4차 검수 반영 — 이타미 · 간사이 = LAXAS, 히로시마 · 후쿠오카 = TIARA → GUSRO).
       국제선 목적지의 짝과 도착 쪽 묶음은 게임값(방면만 맞춤). BEKLA · GUSRO의 출발 활주로는 AIP에 두 가지가 있으나 하나로 고정(게임값). */
    fx('TTE', ll(35 + 33 / 60 + 36.15 / 3600, 139 + 45 / 60 + 22 / 3600), 'vor');
    fx('ROVER', ll(35.9884, 139.8498), 'out'); fx('BEKLA', ll(35.832961, 139.169306), 'out'); fx('GUSRO', ll(35.662439, 139.136975), 'out'); fx('NINOX', ll(35.498178, 139.164739), 'out'); fx('LAXAS', ll(35.031408, 139.242439), 'out');
    fx('POLIX', ll(36.210294, 140.439592), 'in'); fx('AKSEL', ll(34.677644, 139.857475), 'in'); fx('AROSA', ll(34.700478, 140.699247), 'in');
    fx('XAC', ll(34.712250, 139.414028), 'in'); fx('GODIN', ll(36.407028, 140.282194), 'in');
    D.isIntl = function (icao) { return !/^R[JO]/.test(icao); };
    D.gateDest = {
      ROVER: [['RJCC', 'Sapporo New Chitose'], ['RJCH', 'Hakodate'], ['RJSA', 'Aomori'], ['PHNL', 'Honolulu'], ['KLAX', 'Los Angeles']],
      BEKLA: [['RJNK', 'Komatsu'], ['RJNT', 'Toyama'], ['RKSS', 'Seoul Gimpo'], ['ZBAA', 'Beijing Capital']],
      GUSRO: [['RJFF', 'Fukuoka'], ['RJOA', 'Hiroshima']],
      NINOX: [['ZSPD', 'Shanghai Pudong']],
      LAXAS: [['RJOO', 'Osaka Itami'], ['RJBB', 'Osaka Kansai'], ['RJFK', 'Kagoshima'], ['ROAH', 'Naha'], ['RCTP', 'Taipei Taoyuan'], ['VHHH', 'Hong Kong'], ['WSSS', 'Singapore Changi'], ['VTBS', 'Bangkok Suvarnabhumi']]
    };
    /* 도착 방면 ↔ 진입 지점: 국내선과 서울 · 타이베이 · 북미 쪽은 AIC 020/26의 표준 경로(Y10 → GODIN · Y807 → POLIX · Y824/Y875 → AROSA · Y21 → AKSEL · Y71 → XAC)대로. 나머지 국제선은 방면만 맞춘 게임값 */
    D.gateOrig = {
      GODIN: [['RJCC', 'Sapporo New Chitose'], ['RJCH', 'Hakodate'], ['RJSA', 'Aomori']],
      POLIX: [['KLAX', 'Los Angeles'], ['KSFO', 'San Francisco'], ['CYVR', 'Vancouver']],
      AROSA: [['PHNL', 'Honolulu']],
      AKSEL: [['RJFK', 'Kagoshima'], ['ROAH', 'Naha'], ['RCTP', 'Taipei Taoyuan'], ['VHHH', 'Hong Kong'], ['WSSS', 'Singapore Changi'], ['VTBS', 'Bangkok Suvarnabhumi'], ['YSSY', 'Sydney']],
      XAC: [['RJOO', 'Osaka Itami'], ['RJBB', 'Osaka Kansai'], ['RJFF', 'Fukuoka'], ['RJNK', 'Komatsu'], ['RKSS', 'Seoul Gimpo'], ['ZSPD', 'Shanghai Pudong']]
    };
    D.gateEast = { ROVER: true, BEKLA: false, GUSRO: false, NINOX: false, LAXAS: false };
    /* SID: 하네다는 활주로가 달라도 이름이 같음(낮 시간대의 것만 — B · C는 시간대별 소음 대책용) */
    var SID = { ROVER: 'ROVER 3A', BEKLA: 'BEKLA 3A', GUSRO: 'TIARA 2A', NINOX: 'NINOX 4', LAXAS: 'LAXAS 4' };      /* GUSRO로 나가는 SID가 TIARA(TIARA → GUSRO) */
    D.sidName = function (gate) { return SID[gate]; };
    D.sidNames = function () { return Object.keys(SID).map(function (g) { return SID[g]; }); };
    D.depRwyFor = function (flow, gate) { return flow.depBy[gate] || flow.dep; };
    D.sidInit = 9000;      /* 게임값(실제는 SID · 허가마다 다름) */
    D.sidInitGame = true;  /* 화면에 「이 게임에서 정한 값」이라고 밝힘 */
    /* ---------- 접근관제(레이더) ----------
       자료: AIP RJTT AD 2.24의 RNAV STAR · SID · ILS 접근 차트(기준일 2026-11-26) — 지점 좌표, 지점 순서, 최종 접근 지점의 고도.
       넣은 것: 낮 시간대의 STAR(북풍 1A · 1C / 남풍 1N · 1S)와 ILS 접근(34L · 34R · 22 · 23), SID 다섯 개.
       뺀 것: 남풍 때 날씨가 좋으면 쓰는 LDA 접근, 야간 절차, K · H · B · D로 끝나는 도착, 지점마다의 고도 · 속도 제한(관제사인 플레이어가 직접 지시).
       게임값: 접근관제구의 모양(진입 · 출구 지점을 이은 선 — 실제 구역은 훨씬 복잡한 다각형) · XAC/GODIN/AROSA 진입 고도 · 초기 상승 고도 9,000ft · 최저 유도 고도 · 복행 뒤 고도 */
    function fxs(list, kind) { list.forEach(function (a) { fx(a[0], ll(a[1], a[2]), kind || (/^T[T6]/.test(a[0]) ? 'tt' : 'wp')); }); }
    fxs([
      ['XAC', 34.712250, 139.414028], ['GODIN', 36.407028, 140.282194], ['ANZAC', 34.841333, 139.696306], ['TT450', 34.881667, 139.785000],
      ['TT451', 34.838000, 139.959528], ['TT452', 34.853667, 140.100028], ['TT453', 34.910694, 140.223861], ['WANDA', 35.032028, 140.331694],
      ['WEDGE', 35.150111, 139.979583], ['ARLON', 35.257028, 139.983278], ['TT454', 34.812444, 139.957028], ['TT455', 34.829500, 140.109806],
      ['TT456', 34.891472, 140.244500], ['WALLY', 35.022250, 140.360722], ['AVEEY', 34.698861, 140.366111], ['TT457', 34.787306, 140.267417],
      ['TT458', 34.805306, 140.119583], ['TT459', 34.786889, 139.954528], ['WALTZ', 34.837333, 139.752972], ['CHIPS', 36.213250, 140.243583],
      ['COLOR', 36.021194, 140.205500], ['COPSE', 35.783000, 140.201500], ['COACH', 35.626667, 140.208750], ['TT465', 35.494222, 140.209833],
      ['TT466', 35.427500, 140.311139], ['TT467', 35.352833, 140.356778], ['EDDIE', 35.246500, 140.361361], ['CREAM', 35.295389, 140.103444],
      ['CLOAK', 35.263333, 140.035611], ['CAMEL', 35.288389, 139.982722], ['SOLAR', 34.985889, 139.755139], ['SCOUT', 35.106694, 139.899111],
      ['TT250', 35.024917, 140.052361], ['TT251', 34.999361, 140.193333], ['TT252', 35.011083, 140.336944], ['STOCK', 35.077417, 140.500806],
      ['SHAFT', 35.374278, 140.220361], ['NYLON', 35.671806, 140.155528], ['SALLY', 34.892750, 139.927806], ['TT253', 35.000389, 140.040167],
      ['TT254', 34.974028, 140.191500], ['TT255', 34.986361, 140.344833], ['STOWE', 35.057194, 140.519833], ['ALDEN', 34.861417, 140.251472],
      ['TT256', 34.948722, 140.189694], ['TT257', 34.977361, 140.029611], ['SLICK', 35.070194, 139.855556], ['NOVEL', 36.351917, 140.001361],
      ['SCREW', 36.050333, 139.900111], ['STEAM', 35.931472, 139.952333], ['NINJA', 35.863389, 139.982194], ['CACAO', 35.370222, 139.925028], ['TT501', 35.557972, 139.841639],
      ['TT502', 35.540111, 139.955750], ['LOCUP', 35.455222, 139.935694], ['TAURA', 35.312806, 139.746472], ['IMOLA', 35.073889, 139.497500],
      ['BAYGE', 35.426500, 139.724278], ['SEIKO', 35.484583, 139.501389], ['TT503', 35.474444, 139.811222], ['KAMAT', 35.564889, 139.696917],
      ['LAYER', 35.657056, 139.474861], ['TIARA', 35.659444, 139.331722], ['TORAM', 35.610222, 139.836389], ['PLUTO', 35.608917, 139.960222],
      ['KAIJI', 35.736000, 139.968500], ['SPOON', 35.907861, 139.887778], ['INTEL', 35.764722, 139.727833], ['RAGOS', 35.828389, 139.472556],
      ['T6R11', 35.431250, 139.860333], ['T6R12', 35.403778, 139.879750], ['T6R13', 35.466889, 139.835111], ['TT631', 35.356500, 139.780167],
      ['HATBA', 35.439833, 139.721083], ['T6L23', 35.441000, 139.927528], ['WELDA', 35.494833, 139.999083], ['APOLO', 35.322033, 139.937439]
    ]);
    /* 최종 접근: 중간 접근 지점(IF) · 최종 접근 지점(FAF) · 그 고도. 좌표가 없는 지점은 활주로 중심선 위의 거리(NM)로 놓음 */
    function finAt(end, ifn, faf, apAlt, ifD, fafD) {
      var e = D.ends[end]; if (!F[ifn]) fx(ifn, h.off(e.thr, e.crs + 180, ifD)); if (!F[faf]) fx(faf, h.off(e.thr, e.crs + 180, fafD));
      F[ifn].k = 'if'; F[faf].k = 'faf'; e.IF = ifn; e.FAF = faf; e.apAlt = apAlt; e.ifD = Math.hypot(F[ifn].x - e.thr.x, F[ifn].y - e.thr.y); e.locLen = Math.ceil(e.ifD) + 2;
    }
    finAt('34L', 'ARLON', 'APOLO', 5000); finAt('34R', 'CAMEL', 'CACAO', 4000);
    finAt('22', 'NEXUS', 'NITRO', 5000, 16.8, 14.8); finAt('23', 'SMILE', 'SAROB', 4000, 17.06, 11.83);      /* ILS Z RWY23의 로컬라이저는 활주로 방향과 2° 어긋나 있음 — 게임의 ILS는 활주로 중심선이라 SMILE · SAROB를 그 위(실제 자리에서 0.3~0.5NM)로 옮김. NEXUS · NITRO도 중심선 위에 거리(16.8 · 14.8NM)로 놓음 — 차트 좌표와 0.1NM 안쪽으로 맞음 */
    D.flyBy = true;        /* 지점을 지나기 전에 미리 돌기 시작(다음 구간과 이루는 각만큼) — RNAV 경로의 꺾이는 곳을 매끄럽게 */
    var toL = ['WEDGE', 'ARLON'], toR = ['CHIPS', 'COLOR', 'COPSE', 'COACH', 'TT465', 'TT466', 'TT467', 'EDDIE', 'CREAM', 'CLOAK', 'CAMEL'], to23 = ['SHAFT', 'NYLON', 'SMILE'], to22 = ['NOVEL', 'SCREW', 'STEAM', 'NINJA', 'NEXUS'];
    D.star = {
      N: { XAC: ['XAC', 'ANZAC', 'TT450', 'TT451', 'TT452', 'TT453', 'WANDA'].concat(toL), AKSEL: ['AKSEL', 'TT454', 'TT455', 'TT456', 'WALLY'].concat(toL), AROSA: ['AROSA', 'AVEEY', 'TT457', 'TT458', 'TT459', 'WALTZ'].concat(toL),
        GODIN: ['GODIN'].concat(toR), POLIX: ['POLIX'].concat(toR) },
      S: { XAC: ['XAC', 'ANZAC', 'SOLAR', 'SCOUT', 'TT250', 'TT251', 'TT252', 'STOCK'].concat(to23), AKSEL: ['AKSEL', 'SALLY', 'TT253', 'TT254', 'TT255', 'STOWE'].concat(to23), AROSA: ['AROSA', 'AVEEY', 'ALDEN', 'TT256', 'TT257', 'SLICK'].concat(to23),
        GODIN: ['GODIN'].concat(to22), POLIX: ['POLIX', 'GODIN'].concat(to22) }
    };
    D.starName = { N: { XAC: 'OSHIMA 1A', AKSEL: 'AKSEL 1A', AROSA: 'AROSA 1A', GODIN: 'GODIN 1C', POLIX: 'POLIX 1C' }, S: { XAC: 'OSHIMA 1N', AKSEL: 'AKSEL 1N', AROSA: 'AROSA 1N', GODIN: 'GODIN 1S', POLIX: 'POLIX 1S' } };
    /* 경로를 줄여 줄 때 직행시키는 지점(여러 흐름이 만나는 곳) */
    D.starCut = { N: { XAC: 'WEDGE', AKSEL: 'WEDGE', AROSA: 'WEDGE', GODIN: 'CREAM', POLIX: 'CREAM' }, S: { XAC: 'SHAFT', AKSEL: 'SHAFT', AROSA: 'SHAFT', GODIN: 'STEAM', POLIX: 'STEAM' } };
    /* STAR의 지점별 고도(AIP — 「at」 · 「at or below」 · 「at or above」를 가리지 않고 그 지점에서 맞출 고도로 씀). 흐름끼리 엇갈리는 곳에서 1,000ft씩 떨어지게 짜여 있음 */
    D.starAlt = { ANZAC: 13000, WANDA: 13000, WALLY: 12000, AVEEY: 11000, WALTZ: 11000, WEDGE: 8000, CHIPS: 13000, COLOR: 11000, COACH: 8000, EDDIE: 8000,
      SOLAR: 13000, STOCK: 13000, SALLY: 12000, STOWE: 12000, ALDEN: 11000, SLICK: 11000, SHAFT: 8000, NOVEL: 8000 };
    D.entryAlt = { XAC: 15000, AKSEL: 12000, AROSA: 13000, GODIN: 14000, POLIX: 15000 };      /* AKSEL 12,000 · POLIX FL150 = AIP, 나머지는 게임값 */
    /* SID 경로(활주로별). 활주로 바로 앞의 첫 지점(TT501 등)은 빼고 그다음 지점부터 */
    var SIDR = {
      '05': { LAXAS: ['TT502', 'LOCUP', 'TAURA', 'IMOLA', 'LAXAS'], NINOX: ['TT502', 'LOCUP', 'BAYGE', 'SEIKO', 'NINOX'], GUSRO: ['TT502', 'LOCUP', 'TT503', 'KAMAT', 'LAYER', 'TIARA', 'GUSRO'] },
      '34R': { ROVER: ['TORAM', 'PLUTO', 'KAIJI', 'SPOON', 'ROVER'], BEKLA: ['TORAM', 'PLUTO', 'KAIJI', 'INTEL', 'RAGOS', 'BEKLA'] },
      '16R': { LAXAS: ['T6R11', 'TAURA', 'IMOLA', 'LAXAS'], NINOX: ['T6R12', 'TT631', 'BAYGE', 'SEIKO', 'NINOX'], GUSRO: ['T6R13', 'HATBA', 'KAMAT', 'LAYER', 'TIARA', 'GUSRO'] },
      '16L': { ROVER: ['T6L23', 'WELDA', 'PLUTO', 'KAIJI', 'SPOON', 'ROVER'], BEKLA: ['T6L23', 'WELDA', 'PLUTO', 'KAIJI', 'INTEL', 'RAGOS', 'BEKLA'] }
    };
    D.sidRoute = function (rwy, gate) { var r = SIDR[rwy] && SIDR[rwy][gate]; return r ? r.slice() : [gate]; };
    D.sidAt = 0.6;         /* 이륙 뒤 활주로 끝에서 이만큼(NM) 지나면 SID 경로로 */
    D.tmaTop = 24000;      /* 도쿄 접근관제구의 상한 FL240(AIP ENR 2.1 — 구역 대부분) */
    D.tmaR = 75;
    /* 게임의 접근관제구: 진입 · 출구 지점을 이은 선에서 3NM 바깥 */
    D.tmaPoly = ['ROVER', 'NOVEL', 'GODIN', 'POLIX', 'AROSA', 'AKSEL', 'XAC', 'LAXAS', 'NINOX', 'GUSRO', 'BEKLA'].map(function (n) { var f = F[n], d = Math.hypot(f.x, f.y); return { x: f.x * (d + 3) / d, y: f.y * (d + 3) / d }; });
    D.appView = { cx: 4, cy: -4, w: 96, h: 132 };      /* 레이더 화면을 처음 열 때 보이는 범위(NM) */
    D.appDelay = { perNM: 0.24, plus: 9 };             /* 「공역 안에 너무 오래 있음」 기준(분) = 계획 경로 길이 × perNM + plus */
    D.mvaBase = 2500;
    D.mva = [{ n: 'TANZAWA', c: ll(35.4864, 139.1389), r: 7, alt: 7000, peak: 5489 }];      /* 단자와 산지(히루가타케 1,673m). 반지름 · 고도는 게임값 */

    /* ---------- 지역관제 ----------
       자료: AIP의 KML(RNAV 경로 · 지점 좌표 · 관제 섹터 · 훈련 공역, 기준일 2026-11-26)과 AIC 020/26의 표준 비행계획 경로.
       게임값: 구역의 모양 — 하네다 주변의 Tokyo Control 여러 섹터를 하나로 묶고 네모로 단순화. 서쪽 경계는 실제 도쿄 · 고베 관제의 경계 가까이에 둠.
       이웃 관제의 이름과 주파수는 그 방향에 있는 실제 섹터의 값(서 = Kobe Control N44 · 북 = Tokyo Control T33 · 동 = T36 · 남 = T42). 경로는 곧은 구간의 가운데 지점을 덜어 냄 */
    fxs([
      ['SASAP', 37.181992, 140.473447], ['DANDY', 37.173756, 139.511633], ['GUSGI', 36.927103, 140.401275], ['DAIGO', 36.744367, 140.349850],
      ['SYOEN', 37.038489, 140.003919], ['AGRIS', 36.420750, 139.942536], ['LIBNO', 37.531517, 140.131783], ['NOGIX', 36.181111, 142.420833],
      ['LALID', 35.944097, 141.764464], ['MILIT', 35.946331, 141.219136], ['ESKEN', 36.083636, 140.689656], ['OLVEK', 34.686389, 142.227500],
      ['DOLBA', 34.700828, 141.435300], ['PONEM', 34.630739, 142.923769], ['FITTO', 33.985731, 140.022428], ['TOPIT', 34.194847, 139.995056], ['LUTNA', 34.298222, 140.159439],
      ['RURER', 34.490200, 140.700319], ['MENUR', 33.911353, 138.278989], ['SELNO', 34.284339, 139.124633], ['RUNSO', 34.487978, 139.718031],
      ['GAKKI', 34.747869, 137.680658], ['ARTIC', 34.715558, 138.804569], ['BOGON', 34.542500, 137.595503], ['BOKJO', 34.542331, 138.384939],
      ['BOPNO', 34.943236, 138.167636], ['TOHME', 34.853169, 137.473836], ['LEBOS', 35.641225, 138.669739], ['SUGAL', 35.593114, 137.794692],
      ['ENDAG', 35.512961, 137.253181], ['ISPOR', 35.446539, 138.169489], ['IPLES', 35.407683, 137.562714], ['MBE', 36.155975, 137.919817],
      ['YARII', 36.270439, 137.214583], ['PIGAP', 35.789211, 138.316942], ['BIDIK', 36.012811, 137.485994], ['AZUMI', 36.480597, 137.909133],
      ['URUSI', 36.819208, 137.131533], ['SWING', 35.389428, 137.258186], ['TEPEX', 36.004103, 138.882750], ['AKAGI', 36.391203, 139.698967],
      ['DAKEX', 36.794317, 140.942894], ['BEKPO', 36.909872, 142.481892], ['NAKTU', 35.467097, 137.463078], ['POTEB', 35.144719, 137.248114],
      ['FINGA', 37.125961, 138.555294], ['KIBOM', 36.451414, 138.111319], ['MATPI', 35.877942, 137.732386], ['TASOT', 33.736722, 138.504989],
      ['LAKOS', 34.125069, 139.278106], ['LIGNI', 34.697017, 140.447853], ['INUBO', 35.726469, 140.799428], ['TOKIS', 35.179703, 139.504872],
      ['ELNIS', 35.123756, 138.381247], ['IBENO', 34.913697, 137.675778], ['NOKUG', 36.247575, 137.560411], ['OLTAX', 36.236531, 138.324631], ['SANEP', 36.081908, 139.639039],
      ['LARIX', 35.936569, 140.312658], ['GULBO', 35.442461, 141.752653], ['TASID', 35.435203, 142.542908], ['ADKAK', 33.903500, 142.163306],
      ['MERED', 34.238167, 141.441406], ['UTIBO', 34.946394, 139.895528]
    ], 'en');
    D.acc = { x1: -126, x2: 150, y1: -116, y2: 112 };
    D.accLabel = 'TOKYO CONTROL  (GAME SECTOR)';
    D.accView = { cx: 12, cy: -2, w: 304, h: 252 };
    D.bdSide = { TOHME: 'W', ENDAG: 'W', IPLES: 'W', YARII: 'W', BIDIK: 'W', URUSI: 'W', POTEB: 'W', LIBNO: 'N', BEKPO: 'E', TASID: 'E', PONEM: 'E' };
    ['SASAP', 'DANDY', 'NOGIX', 'OLVEK', 'FITTO', 'MENUR', 'GAKKI', 'BOGON', 'SWING', 'FINGA', 'TASOT', 'NOKUG', 'ADKAK'].concat(Object.keys(D.bdSide)).forEach(function (n) { F[n].k = 'bd'; });
    D.neighbor = {
      W: { n: 'Kobe Control', fq: '123.90' }, E: { n: 'Tokyo Control', fq: '134.00' },
      N: { n: 'Tokyo Control', fq: '132.30' }, S: { n: 'Tokyo Control', fq: '125.90' }
    };
    function od(r, a, b) { r.od = [a, b]; return r; }
    /* 도착: 경계 → 진입 지점 / 출발: 출구 지점 → 경계 (AIC 020/26의 RJTT 표준 경로) */
    D.accArr = {
      GODIN: [['SASAP', 'GUSGI', 'DAIGO', 'GODIN'], ['DANDY', 'SYOEN', 'GUSGI', 'DAIGO', 'GODIN']],
      POLIX: [['NOGIX', 'LALID', 'MILIT', 'ESKEN', 'POLIX']],
      AROSA: [['PONEM', 'OLVEK', 'DOLBA', 'AROSA'], ['FITTO', 'TOPIT', 'LUTNA', 'RURER', 'AROSA']],
      AKSEL: [['MENUR', 'SELNO', 'RUNSO', 'AKSEL']],
      XAC: [['GAKKI', 'ARTIC', 'XAC'], ['BOGON', 'BOKJO', 'ARTIC', 'XAC']]
    };
    D.accDep = {
      ROVER: [['ROVER', 'AGRIS', 'SYOEN', 'LIBNO']],
      BEKLA: [['BEKLA', 'MBE', 'YARII'], ['BEKLA', 'AZUMI', 'URUSI'], ['BEKLA', 'PIGAP', 'BIDIK']],
      GUSRO: [['GUSRO', 'LEBOS', 'SUGAL', 'ENDAG']],
      NINOX: [['NINOX', 'ISPOR', 'IPLES']],
      LAXAS: [['LAXAS', 'BOPNO', 'IBENO', 'TOHME']]
    };
    D.accArrAlt = 11000; D.accArrAltBy = D.entryAlt;      /* 진입 지점마다 넘겨주는 고도 */
    D.accArrLv = [200, 210, 220, 230, 240];
    D.airways = [
      { n: 'Y10', f: ['SASAP', 'GUSGI', 'DAIGO', 'GODIN'] }, { n: 'Y31', f: ['DANDY', 'SYOEN', 'GUSGI'] }, { n: 'Y807', f: ['NOGIX', 'LALID', 'MILIT', 'ESKEN', 'POLIX'] },
      { n: 'Y824', f: ['PONEM', 'OLVEK', 'DOLBA', 'AROSA'] }, { n: 'Y87', f: ['FITTO', 'TOPIT'] }, { n: 'Y875', f: ['TOPIT', 'LUTNA', 'RURER', 'AROSA'] }, { n: 'Y21', f: ['MENUR', 'SELNO', 'RUNSO', 'AKSEL'] },
      { n: 'Y71', f: ['GAKKI', 'ARTIC', 'XAC'] }, { n: 'Y23', f: ['BOGON', 'BOKJO', 'ARTIC'] }, { n: 'Y56', f: ['LAXAS', 'BOPNO', 'IBENO', 'TOHME'] }, { n: 'Y20', f: ['GUSRO', 'LEBOS', 'SUGAL', 'ENDAG'] },
      { n: 'Y28', f: ['NINOX', 'ISPOR', 'IPLES'] }, { n: 'Y884', f: ['BEKLA', 'MBE', 'YARII'] }, { n: 'Y885', f: ['BEKLA', 'AZUMI', 'URUSI'] }, { n: 'Y18', f: ['BEKLA', 'PIGAP'] }, { n: 'Y182', f: ['PIGAP', 'BIDIK'] }, { n: 'Y11', f: ['AGRIS', 'SYOEN', 'LIBNO'] },
      { n: 'Y88', f: ['SWING', 'NAKTU', 'SUGAL', 'PIGAP', 'TEPEX', 'AKAGI', 'DAIGO'] }, { n: 'Y886', f: ['DAIGO', 'DAKEX', 'BEKPO'] }, { n: 'Y12', f: ['FINGA', 'KIBOM', 'MBE', 'MATPI', 'NAKTU', 'POTEB'] },
      { n: 'Y57', f: ['TASOT', 'LAKOS', 'LIGNI'] }, { n: 'Y818', f: ['LIGNI', 'DOLBA'] }, { n: 'Y804', f: ['LALID', 'INUBO'] }, { n: 'Y50', f: ['INUBO', 'TOKIS', 'ELNIS'] }, { n: 'Y564', f: ['ELNIS', 'IBENO'] },
      { n: 'Y51', f: ['NOKUG', 'OLTAX', 'SANEP', 'LARIX', 'INUBO'] }, { n: 'Y808', f: ['INUBO', 'GULBO', 'TASID'] }, { n: 'Y821', f: ['ADKAK', 'MERED', 'LIGNI', 'UTIBO'] }, { n: 'Y502', f: ['UTIBO', 'TOKIS'] }
    ];
    /* 통과기: AIC 020/26의 통과 · 다른 공항 경로에서 이 구역을 지나는 것(양 끝 공항은 그 경로를 쓰는 예) */
    D.ovfRoutes = [
      od(['SWING', 'NAKTU', 'SUGAL', 'PIGAP', 'TEPEX', 'AKAGI', 'DAIGO', 'DAKEX', 'BEKPO'], 'RJBB', 'PANC'), od(['BEKPO', 'DAKEX', 'DAIGO', 'AKAGI', 'TEPEX', 'PIGAP', 'SUGAL', 'NAKTU', 'POTEB'], 'PANC', 'RJBB'),
      od(['FINGA', 'KIBOM', 'MBE', 'MATPI', 'NAKTU', 'POTEB'], 'RJCC', 'RJOO'),
      od(['TASOT', 'LAKOS', 'LIGNI', 'DOLBA', 'OLVEK', 'PONEM'], 'RCTP', 'KLAX'),
      od(['NOGIX', 'LALID', 'INUBO', 'TOKIS', 'ELNIS', 'IBENO', 'TOHME'], 'KSFO', 'RJBB'), od(['ADKAK', 'MERED', 'LIGNI', 'UTIBO', 'TOKIS', 'ELNIS', 'IBENO', 'TOHME'], 'PHNL', 'RJBB'),
      od(['NOKUG', 'OLTAX', 'SANEP', 'LARIX', 'INUBO', 'GULBO', 'TASID'], 'RKSI', 'KSEA')
    ];
    /* 자위대 훈련 공역 Area H(지표 ~ FL230) — 사용 중일 때는 그 높이 아래로 지나지 못함(BEKLA → AZUMI 출발 경로가 이 구역의 남서쪽을 지남) */
    D.restricted = { n: 'AREA H', pts: [[37.5531, 139.0467], [37.0639, 138.6333], [36.555, 138.2969], [36.0364, 138.2969], [36.1531, 138.7636], [36.4864, 139.43]].map(function (q) { return ll(q[0], q[1]); }), top: 23000 };
    /* 항공사(가상)별 국내선 터미널 · 노선 범위(I = 국제선만, D = 국내선만) */
    D.domTerm = { VLA: 'T1', HNB: 'T1', CKY: 'T1', KCM: 'T1', AOP: 'T2', NCE: 'T2', LMN: 'T2' };
    var SCOPE = { SOG: 'I', TSB: 'I', KCM: 'D', SVJ: 'D', SNX: 'D' };
    /* 편마다 방면(출구 · 입구 지점) · 공항 · 주기장 묶음을 함께 정함. rwy를 주면 그 활주로를 쓰는 방면에서만 고름
       국내선 = 터미널 1 · 2(항공사별), 국제선 = 터미널 3, 화물 = 국제 화물 지구 · 국내 화물 주기장, 소형기 = N 구역 */
    D.planFlight = function (sim, f, kind, rwy) {
      var by = kind === 'dep' ? sim.flow.depBy : sim.flow.arrBy, tbl = kind === 'dep' ? D.gateDest : D.gateOrig, sc = SCOPE[f.al.code];
      var gates = Object.keys(tbl).filter(function (g) { return !rwy || by[g] === rwy; }); if (!gates.length) gates = Object.keys(tbl);
      var opts = []; gates.forEach(function (g) { tbl[g].forEach(function (d) { var i = D.isIntl(d[0]); if (!sc || (sc === 'I') === i) opts.push([g, d]); }); });
      if (!opts.length) gates.forEach(function (g) { tbl[g].forEach(function (d) { opts.push([g, d]); }); });
      var o = sim.rng.pick(opts), intl = D.isIntl(o[1][0]);
      return { gate: o[0], ap: o[1], intl: intl, rwy: by[o[0]], grp: f.al.cargo ? [intl ? 'KI' : 'KD'] : f.al.ga ? ['NA'] : intl ? ['T3'] : [D.domTerm[f.al.code] || 'T1'] };
    };

    /* 근무 순서(접근관제 · 지역관제) — 세이라와 다른 점: 도착기는 STAR를 따라 중간 접근 지점(IF)까지 스스로 오고, 관제사는 고도 · 속도 · 경로 줄이기로 순서를 만듦 */
    D.posBrief = {
      APP: [T('깜박이는 표지 = 핸드오프 요청 → 「수락」'), T('STAR의 지점 옆 숫자(백 ft)에 맞춰 강하 — 흐름이 엇갈리는 곳은 그 고도로 1,000ft씩 떨어짐'), T('만나는 지점(WEDGE · CREAM · SHAFT · STEAM)에 같이 닿지 않게 속도를 조절하거나, 비어 있으면 직행으로 경로를 줄임'), T('IF(ARLON · CAMEL · SMILE · NEXUS)에 닿기 전에 「ILS 접근 허가」, 확립하면 Tower로 이양'), T('출발기는 9,000ft에서 위가 비면 FL240으로 올려 Tokyo Control로 이양')],
      ACC: [T('핸드오프 수락 → 경로와 고도를 훑어 만나는 지점을 찾음'), T('같은 고도로 만나면 한쪽 고도를 바꿈(동쪽행은 천 단위 홀수 · 서쪽행은 짝수)'), T('도착기는 진입 지점마다 정해진 고도(XAC FL150 · AKSEL 12,000 · AROSA 13,000 · GODIN FL140 · POLIX FL150)로'), T('출발기는 요청 고도까지 올리고, 경계 전 다음 구역(서쪽 = Kobe Control)으로 이양'), T('5NM/1,000ft 분리 · 기본 배속 4배')]
    };

    /* ---------- 주파수(AIP AD 2.18 — 자리마다 대표 하나) ---------- */
    D.freq = {
      DEL: { n: 'Tokyo Delivery', fq: '121.825' }, GND: { n: 'Tokyo Ground', fq: '121.70' }, TWR: { n: 'Tokyo Tower', fq: '118.10' },
      APP: { n: 'Tokyo Approach', fq: '119.10' }, DEP: { n: 'Tokyo Departure', fq: '126.00' }, ACC: { n: 'Tokyo Control', fq: '120.50' }, ATIS: { n: 'ATIS', fq: '128.80' }
    };

    /* ---------- 지상 그물 ---------- */
    var L = [], vA = -575, vAt = -390, vW = -285, vL = -765, vP = -900, vC = 1125, vCt = 945, vE = 830, vR = 630;
    function ln(n, p, kind) { L.push({ n: n, p: p.map(function (q) { return [Math.round(q[0]), Math.round(q[1])]; }), o: kind ? { kind: kind } : undefined }); }
    function unit(a, b) { var d = Math.hypot(b[0] - a[0], b[1] - a[1]); return [(b[0] - a[0]) / d, (b[1] - a[1]) / d]; }
    var dB = unit(B04, B22), nB = [dB[1], -dB[0]], dD = unit(D05, D23), nD = [-dD[1], dD[0]];   /* nB = B 활주로의 동쪽(터미널 3쪽), nD = D 활주로의 서쪽(터미널쪽) */
    function onB(s, off) { return [B04[0] + dB[0] * s + nB[0] * off, B04[1] + dB[1] * s + nB[1] * off]; }
    function onD(s, off) { return [D05[0] + dD[0] * s + nD[0] * off, D05[1] + dD[1] * s + nD[1] * off]; }
    function atV(a, b, v) { var t = (v - a[1]) / (b[1] - a[1]); return [a[0] + (b[0] - a[0]) * t, v]; }
    var Bt0 = onB(0, 190), Bt1 = onB(2500, 190), Tt0 = onB(0, -190), Tt1 = onB(1064, -190), Dt0 = onD(0, 190), Dt1 = onD(2500, 190);
    var HOLD = 110, B9 = atV(Bt0, Bt1, vA + HOLD), B8 = atV(Bt0, Bt1, vA - HOLD), BxA = atV(Bt0, Bt1, vA);       /* 유도로 B가 A 활주로를 건너는 곳(북쪽 정지선 B9 · 남쪽 B8) */
    /* A 활주로 동쪽(터미널 1쪽): 바깥 평행 유도로 A, 안쪽 W. A는 남쪽 끝에서 정비 지구를 돌아 동쪽 지구 · D 활주로 연결 유도로로 이어짐 */
    ln('A', [[-1000, vAt], [1850, vAt], [2250, -330], [2420, -160], [2420, vE]]);
    ln('W', [[-1000, vW], [2150, vW], [2250, -330]]);
    [['W1', 1750], ['W6', 800], ['W9', 450], ['W10', -50], ['W11', -260], ['W13', -650]].forEach(function (c) { ln(c[0], [[c[1], vW], [c[1], vAt]]); });
    /* A 활주로 서쪽(터미널 3쪽): L, 계류장 쪽 P */
    ln('L', [[Math.round(atV(Bt0, Bt1, vL)[0]), vL], [1340, vL]]);                               /* 북쪽 끝 = 유도로 B와 만나는 곳 */
    ln('P', [[-440, vP], [1340, vP]]); ln('P3', [[1340, vL], [1340, vP]]); ln('P4', [[1100, vL], [1100, vP]]);
    ln('P8', [[640, vL], [640, vP]]); ln('P9', [[430, vL], [430, vP]]); ln('P10', [[100, vL], [100, vP]]); ln('P11', [[-280, vL], [-280, vP]]);
    ln('P8', [[640, vP], [640, -1230]], 'lane'); ln('P9', [[430, vP], [430, -1230]], 'lane'); ln('P10', [[100, vP], [100, -1230]], 'lane'); ln('P11', [[-280, vP], [-280, -1552]], 'lane');
    ln('V', [[100, -1230], [640, -1230]], 'lane');
    ln('M', [[-440, vL], [-440, -1448]]);                                                      /* 남쪽 끝이 유도로 B에 닿음 */
    /* B 활주로 양쪽: 동쪽 B(A 활주로를 건넘), 서쪽 T, N 구역 */
    ln('B', [Bt1, B9]); ln('B', [B8, Bt0]);
    ln('T', [Tt0, Tt1]);
    /* C 활주로 서쪽(터미널 2쪽): 바깥 C, 안쪽 E, 계류장 쪽 R. E · R은 다리로 D 활주로까지 */
    var Ex = atV(Dt0, Dt1, 700), Rx = atV(Dt0, Dt1, 570);
    ln('C', [[-1000, vCt], [2402, vCt]]);
    ln('E', [[-1000, vE], [2420, vE], [2560, 700], Ex]);
    ln('E1', [[2402, vCt], [2420, vE]]);
    [['E2', 2100], ['E3', 1900], ['E4', 1650], ['E5', 1500], ['E12', -640]].forEach(function (c) { ln(c[0], [[c[1], vE], [c[1], vCt]]); });
    [['E8', 800], ['M2', 550], ['E9', 300], ['E10', 20]].forEach(function (c) { ln(c[0], [[c[1], vE], [c[1], vCt]]); ln(c[0], [[c[1], vR], [c[1], vE]], 'lane'); });
    ln('R', [[-1000, vR], [20, vR]], 'lane'); ln('R', [[300, vR], [800, vR]], 'lane');
    ln('R', [[1100, vR], [2300, vR], [2420, 570], Rx]);
    /* 두 지구를 잇는 유도로: 북쪽 K · J, 남쪽 H · G */
    ln('K', [[-1000, vAt], [-1000, vCt]]); ln('J', [[-870, vAt], [-870, vCt]]); ln('H', [[1100, vAt], [1100, vCt]]); ln('G', [[1360, vAt], [1360, vCt]]);
    /* D 활주로 서쪽 평행 유도로 D */
    ln('D', [Dt0, Dt1]);
    /* N 구역(소형기): 주기장 줄과 나란한 유도로 N — 양 끝이 T에 닿음 */
    var n901 = [-964, -1880], n909 = [-1184, -1359], dN = unit(n901, n909), nN = [dN[1], -dN[0]];
    var Na = [n901[0] + nN[0] * 75, n901[1] + nN[1] * 75], Nb = [n909[0] + nN[0] * 75, n909[1] + nN[1] * 75];
    var Ts = atV(Tt0, Tt1, Na[1]), Tn = atV(Tt0, Tt1, -1100);
    ln('N', [Ts, Na, Nb, Tn], 'lane');

    /* 활주로 진입 · 탈출 유도로: [이름, 활주로, 활주로 위 지점, 유도로 쪽 지점] — 정지선은 활주로 중심선에서 110m */
    var CONN = [];
    function cA(n, u, side) { CONN.push([n, 'A', [u, vA], [u, side > 0 ? vAt : vL]]); }
    function cC(n, u) { CONN.push([n, 'C', [u, vC], [u, vCt]]); }
    function cB(n, s, side) { CONN.push([n, 'B', onB(s, 0), onB(s, 190 * side)]); }
    function cD(n, s) { CONN.push([n, 'D', onD(s, 0), onD(s, 190)]); }
    [['A1', 1813], ['A2', 1334], ['A4', 1134], ['A5', 824], ['A6', 704], ['A7', 384], ['A10', 313], ['A11', -117], ['A12', -187], ['A13', -497], ['A14', -677], ['A15', -787]].forEach(function (c) { cA(c[0], c[1], 1); });
    [['L3', 1234], ['L4', 1134], ['L5', 794], ['L6', 704], ['L9', 284], ['L12', 13], ['L11', -117], ['L13', -267], ['L14', -627], ['L15', -737]].forEach(function (c) { cA(c[0], c[1], -1); });
    [['C1', 2402], ['C2', 1962], ['C3', 1862], ['C5', 1462], ['C6', 1142], ['C7', 822], ['C9', 752], ['C10', 372], ['C11', -78], ['C12', -398], ['C13', -778], ['C14', -958]].forEach(function (c) { cC(c[0], c[1]); });
    [['B1', 0], ['B2', 190], ['B4', 700], ['B6', 970], ['B12', 1931], ['B13', 2321], ['B14', 2500]].forEach(function (c) { cB(c[0], c[1], 1); });
    [['T1', 0], ['T2', 190], ['T4', 700], ['T6', 970]].forEach(function (c) { cB(c[0], c[1], -1); });
    [['D1', 0], ['D2', 179], ['D4', 620], ['D3', 700], ['D5', 1000], ['D6', 2020], ['D7', 2500]].forEach(function (c) { cD(c[0], c[1]); });
    CONN.forEach(function (c) {
      var r = c[2], a = c[3], d = unit(r, a), hp = c[4] || [r[0] + d[0] * HOLD, r[1] + d[1] * HOLD];
      c.r = [Math.round(r[0]), Math.round(r[1])]; c.h = [Math.round(hp[0]), Math.round(hp[1])]; c.a = [Math.round(a[0]), Math.round(a[1])];
      ln(c[0], [c.a, c.h]);
    });

    /* 주기장: [번호, u, v, 묶음, 뒤쪽 유도로의 점] — 좌표는 AIP AD 2.8의 주기장 좌표 */
    var ST = [], rec = {};
    function st(name, u, v, grp, lane, faces, faceRec) { ST.push({ name: name, u: Math.round(u), v: Math.round(v), grp: grp, lane: [Math.round(lane[0]), Math.round(lane[1])], faces: faces, faceRec: faceRec || null }); }
    var NS = ['north', 'south'], EW = ['east', 'west'];
    /* 터미널 1(국내선): 동쪽 끝은 H, 남쪽 면과 북쪽 줄은 W */
    st('1', 1019, 91, 'T1', [1100, 91], EW, 'west'); st('3', 1016, -42, 'T1', [1100, -42], EW, 'west');
    [['6', 976, -174], ['8', 887, -111], ['10', 719, -89], ['12', 595, -155], ['14', 501, -126], ['16', 331, -90], ['18', 212, -155], ['20', 109, -174], ['26', -197, -59], ['28', -337, -59], ['30', -467, -68], ['32', -617, -59]].forEach(function (s) { st(s[0], s[1], s[2], 'T1', [s[1], vW], NS); });
    /* 터미널 2(국내선): 북쪽 면은 R, 부두는 E8 · E9 · E10, 남쪽 끝은 H */
    [['48', -309, 516], ['50', -150, 534], ['52', -6, 541]].forEach(function (s) { st(s[0], s[1], s[2], 'T2', [s[1], vR], NS); });
    st('54', 100, 677, 'T2', [20, 677], EW, 'east'); st('57', 202, 672, 'T2', [300, 672], EW, 'east'); st('67', 904, 668, 'T2', [800, 668], EW, 'east');
    [['59', 340, 539], ['61', 480, 539], ['63', 620, 539], ['65', 760, 539]].forEach(function (s) { st(s[0], s[1], s[2], 'T2', [s[1], vR], NS); });
    st('69', 1003, 736, 'T2', [1100, 736], EW, 'east'); st('72', 1004, 555, 'T2', [1100, 555], EW, 'east');
    /* 터미널 3(국제선): 본관 앞은 V, 북쪽 부두는 P11 */
    st('105', 695, -1325, 'T3', [640, -1230], NS);
    [['106', 616, -1325], ['107', 526, -1300], ['108', 439, -1300, 430], ['109', 367, -1300], ['110', 294, -1300], ['111', 222, -1300], ['112', 139, -1300], ['113', 67, -1300, 100]].forEach(function (s) { st(s[0], s[1], s[2], 'T3', [s[3] || s[1], -1230], NS); });
    [['143', -167, -1094], ['145', -168, -1244], ['147', -168, -1407], ['149', -168, -1552]].forEach(function (s) { st(s[0], s[1], s[2], 'T3', [-280, s[2]], EW, 'east'); });
    /* 화물: 국제 화물 지구(101~104, P8) · 국내 화물 쪽 주기장(501~504, E) */
    [['101', 725, -984], ['102', 725, -1060], ['103', 725, -1136], ['104', 725, -1212]].forEach(function (s) { st(s[0], s[1], s[2], 'KI', [640, s[2]], EW, 'east'); });
    [['501', -752, 747], ['502', -687, 752], ['503', -617, 749], ['504', -547, 749]].forEach(function (s) { st(s[0], s[1], s[2], 'KD', [s[1], vE], NS); });
    /* N 구역(소형기) */
    [['902', -994, -1814], ['904', -1055, -1683], ['906', -1116, -1551], ['908', -1177, -1420]].forEach(function (s) { var t = (s[1] - Na[0]) * dN[0] + (s[2] - Na[1]) * dN[1]; st(s[0], s[1], s[2], 'NA', [Na[0] + dN[0] * t, Na[1] + dN[1] * t], NS); });
    ST.forEach(function (s) { ln('STAND', [[s.u, s.v], s.lane], 'stand'); });

    h.mesh(L);

    /* 활주로 위 마디 · 정지선 · 진입 구간 */
    var rwPts = { A: [], B: [], C: [], D: [] };
    CONN.forEach(function (c) {
      var name = c[0], rw = c[1], r = N(c.r[0], c.r[1], { rwy: rw }), hp = N(c.h[0], c.h[1], { hold: name, rw: rw }), a = N(c.a[0], c.a[1]);
      E(hp, r, name, { kind: 'entry', rw: rw }); rwPts[rw].push(c.r);
      var mx = (c.h[0] + c.a[0]) / 2, my = (c.h[1] + c.a[1]) / 2, d = unit(c.r, c.a);
      D.holds[name] = { name: name, node: hp, rnode: r, anode: a, u: c.r[0], rw: rw, lu: Math.round(mx - d[1] * 38), lv: Math.round(my + d[0] * 38) };
    });
    function xing(name, rw, p1, r, p2) {
      var a = N(Math.round(p1[0]), Math.round(p1[1]), { hold: name, rw: rw }), c = N(Math.round(r[0]), Math.round(r[1]), { rwy: rw }), b = N(Math.round(p2[0]), Math.round(p2[1]), { hold: name, rw: rw });
      E(a, c, name, { kind: 'entry', rw: rw }); E(c, b, name, { kind: 'entry', rw: rw }); rwPts[rw].push([Math.round(r[0]), Math.round(r[1])]);
    }
    xing('B', 'A', B9, BxA, B8);
    /* 활주로 중심선 구간(그리기 · 줄서기용) */
    Object.keys(rwPts).forEach(function (rw) {
      var e = D.ends[D.rw[rw].a], pts = rwPts[rw].concat([[e.thrU, e.thrV], [D.ends[D.rw[rw].b].thrU, D.ends[D.rw[rw].b].thrV]]), seen = {};
      pts = pts.filter(function (p) { var k = p[0] + ',' + p[1]; if (seen[k]) return false; seen[k] = 1; return true; });
      pts.sort(function (p, q) { return D.rwAlong(e, { u: p[0], v: p[1] }) - D.rwAlong(e, { u: q[0], v: q[1] }); });
      pts.forEach(function (p) { N(p[0], p[1], { rwy: rw }); });
      h.line('RWY', pts, { kind: 'rwy', rw: rw });
    });
    ST.forEach(function (s) {
      var id = N(s.u, s.v, { stand: s.name }), al = Math.abs(s.lane[0] - s.u) > Math.abs(s.lane[1] - s.v);
      D.stands[s.name] = { name: s.name, node: id, lane: s.lane[0] + ',' + s.lane[1], u: s.u, v: s.v, grp: s.grp, intl: s.grp === 'T3' || s.grp === 'KI',
        lab: al ? [s.lane[0] > s.u ? -66 : 66, 0] : [0, s.lane[1] > s.v ? -52 : 52], faces: s.faces, faceRec: s.faceRec };
    });

    /* 유도로 이름표 자리 [이름, u, v] */
    D.gLabels = [['A', -400, vAt], ['A', 620, vAt], ['A', 1500, vAt], ['A', 2420, 200], ['W', -500, vW], ['W', 600, vW], ['W', 1500, vW], ['L', -300, vL], ['L', 550, vL], ['P', 250, vP], ['P', 900, vP],
      ['C', -500, vCt], ['C', 250, vCt], ['C', 1700, vCt], ['E', -400, vE], ['E', 1200, vE], ['E', 2900, 700], ['R', -500, vR], ['R', 550, vR], ['R', 1700, vR], ['R', 2900, 570],
      ['K', -1000, 250], ['J', -870, 100], ['H', 1100, 300], ['G', 1360, 150], ['M', -440, -1150], ['V', 320, -1230], ['N', -1010, -1580],
      ['B', Math.round(onB(500, 190)[0]), Math.round(onB(500, 190)[1])], ['B', Math.round(onB(2150, 190)[0]), Math.round(onB(2150, 190)[1])], ['T', Math.round(onB(880, -190)[0]), Math.round(onB(880, -190)[1])],
      ['D', Math.round(onD(1300, 190)[0]), Math.round(onD(1300, 190)[1])]];
    D.guide = { u1: -2575, u2: 4625, v1: -2470, v2: 2930 };
    D.lobby = 'assets/img/lobby_rjtt.webp';   /* 첫 화면 배경(Gemini v15 — 하네다 관제탑에서 본 황혼) */
    D.sat = { img: 'assets/img/ground_sat_rjtt.webp', u1: -2575, u2: 4625, v1: -2470, v2: 2930, edge: '#47565c' };   /* Gemini v15 그림 — 배치도에 맞춰 위치를 보정해 둠 */
    D.view = { cu: 950, cv: 250, w: 6900, h: 5300 };     /* 지상 화면을 처음 열 때 보이는 범위(m) */
    /* 지상 화면의 구역 바로가기 단추 — 공항이 넓어 한 화면에 다 보면 작으므로 [u1, v1, u2, v2](m) */
    D.areas = [
      { label: ATC.T('1터미널 · A활주로'), box: [-1300, -700, 1900, 260] },
      { label: ATC.T('2터미널 · C활주로'), box: [-1150, 380, 2550, 1260] },
      { label: ATC.T('3터미널(국제선)'), box: [-700, -1700, 1050, -650] },
      { label: ATC.T('B활주로 · N구역'), box: [-1800, -2050, -150, 650] },
      { label: ATC.T('D활주로'), box: [2300, -250, 4300, 2700] }
    ];
    /* 바탕 그림이 없을 때 그리는 계류장 · 건물 */
    D.decor = function (rect, C) {
      rect(-900, -330, 1150, 110, C.apron); rect(-950, 440, 1150, 880, C.apron); rect(-330, -1620, 800, -850, C.apron); rect(1300, -330, 2400, 780, C.apron);
      rect(-1290, -1960, -880, -1300, C.apron); rect(-820, 690, -480, 860, C.apron);
      rect(60, -70, 1000, 60, C.bld); rect(120, -50, 960, 40, C.bld2);                 /* 터미널 1 */
      rect(-420, 380, 990, 500, C.bld); rect(-380, 400, 950, 480, C.bld2); rect(120, 500, 180, 760, C.bld); rect(930, 500, 980, 760, C.bld);   /* 터미널 2 */
      rect(-110, -1470, 650, -1350, C.bld); rect(-70, -1450, 610, -1370, C.bld2); rect(-140, -1580, -100, -1000, C.bld);   /* 터미널 3 */
      rect(760, -1250, 810, -960, '#6a7178'); rect(-800, 430, -470, 500, '#6a7178'); rect(1400, -80, 2330, 60, '#6a7178');   /* 화물 · 정비 */
    };
    return h;
  };
  ATC.AIRPORT_DEFS.RJTT.preview = true;      /* 시험판: 사이트판(window.ATC_SITE)에서는 공항 목록에 내놓지 않음 */
  ATC.AIRPORT_DEFS.RJTT.title = ATC.pick({ ko: '도쿄국제공항 · 하네다(시험판)', ja: '東京国際空港・羽田(試作)', en: 'Tokyo Intl · Haneda (preview)' });
})(typeof globalThis !== 'undefined' ? globalThis : this);
