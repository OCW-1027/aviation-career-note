/* AIRLINE SAGA — ATC(관제편) 공항 묶음: 아스테라 국제공항(XAST) — 가상 대형 허브(작업 이름)
 * 전부 가상(공항 · 공역 · 호출부호 · 주파수 · 절차 수치). 실제 운항 · 관제에 쓸 수 없는 교육용 값.
 * 설계: plan/AIRLINE_SAGA_관제편_대형공항_설계안_v1.md
 * 지상 좌표: u = 활주로 08 방향(동쪽, m) · v = 그 왼쪽(북쪽, m). 관제탑이 원점.
 * 배치 v3(2026-11-14 사용자 의견): 가로 활주로 5개(북쪽 쌍 · 남쪽 쌍 · 해상 10/28) + 세로 예비 활주로 2개(서쪽 17R/35L = 착륙 · 동쪽 17L/35R = 이륙). 여객터미널 5개.
 * 1단계: 활주로 7 · 유도로 줄기 · 주기장 · 서풍/동풍 운용 + 남풍/북풍 예비 운용 — 비행허가 · 지상 · 관제탑.
 * 2단계: 접근 · 지역 — 세이라와 같은 방식(짧은 도착 경로 뒤 레이더 유도). 네 귀퉁이로 들어오고 네 변으로 나감.
 */
(function (G) {
  'use strict';
  var ATC = G.ATC, T = ATC.T;
  ATC.AIRPORT_DEFS.XAST = function (D, mk) {
    var h = mk(80), pol = h.pol, fx = h.fx, fin = h.fin, N = h.N, E = h.E;

    D.airport = {
      icao: 'XAST', iata: 'XAS', name: 'Astera International Airport', elev: 30,
      call: 'Astera',
      short: ATC.pick({ ko: '아스테라', ja: 'アステラ', en: 'Astera' }),
      ko: ATC.pick({ ko: '아스테라 국제공항', ja: 'アステラ国際空港', en: 'Astera International Airport' }),
      transAlt: 14000, tower: { u: 0, v: 0 }
    };
    D.voice = { dir: 'assets/voice/xast/', parts: { ctl: 4, ctlf: 4, p1: 4, p2: 4, p3: 4, p4: 4 } };      /* 녹음 묶음(관제사 남 · 여, 조종사 4역) */
    D.twrZoneNM = 7; D.indepParallel = true;

    /* ---------- 활주로 ----------
       북쪽 쌍(바깥 08L/26R · 안 08R/26L)과 남쪽 쌍(안 09L/27R · 바깥 09R/27L): 쌍 안은 380m, 가운데가 터미널.
       해상 활주로 10/28: 남쪽 바다 위 섬(09R/27L에서 1,400m). 방위가 같은 활주로는 번호를 하나씩 올려 구분(08 · 09 · 10 / 26 · 27 · 28).
       세로 예비 활주로 둘(가로 활주로를 쓸 수 없는 강한 남풍 · 북풍 때): 서쪽 17R/35L = 착륙 전용, 동쪽 17L/35R = 이륙 전용 — 가로 활주로의 양 끝 바깥 600m에 세로로 놓임(둘 사이 5km). */
    var vNO = 1300, vNI = 920, vSI = -920, vSO = -1300, vOF = -2700, uWX = -2500, uEX = 2500, vXn = 1100, vXs = -1900;
    D.rw = {
      NO: { id: 'NO', a: '08L', b: '26R', width: 60 }, NI: { id: 'NI', a: '08R', b: '26L', width: 60 },
      SI: { id: 'SI', a: '09L', b: '27R', width: 60 }, SO: { id: 'SO', a: '09R', b: '27L', width: 60 },
      OF: { id: 'OF', a: '10', b: '28', width: 60 },
      WX: { id: 'WX', a: '17R', b: '35L', width: 60 }, EX: { id: 'EX', a: '17L', b: '35R', width: 60 }
    };
    D.ends = {};
    function end(id, rw, p, q, crs, o) { var e = { id: id, rw: rw, thrU: p[0], thrV: p[1], endU: q[0], endU2: q[0], endV2: q[1], dir: 1, crs: crs }; for (var k in o) e[k] = o[k]; D.ends[id] = e; }
    end('08L', 'NO', [-1900, vNO], [1500, vNO], 80, { ilsId: 'IAN', ilsFq: '110.10', exits: ['N3', 'N4', 'N5', 'N6'], holds: ['N1', 'N2'] });
    end('26R', 'NO', [1500, vNO], [-1900, vNO], 260, { ilsId: 'IAR', ilsFq: '110.70', exits: ['N4', 'N3', 'N2', 'N1'], holds: ['N6', 'N5'] });
    end('08R', 'NI', [-1900, vNI], [1900, vNI], 80, { ilsId: 'IAE', ilsFq: '109.30', exits: ['A4', 'A5', 'A6', 'A7', 'A8'], holds: ['A1', 'A2'] });
    end('26L', 'NI', [1900, vNI], [-1900, vNI], 260, { ilsId: 'IAW', ilsFq: '109.90', exits: ['A5', 'A4', 'A3', 'A2', 'A1'], holds: ['A8', 'A7'] });
    end('09L', 'SI', [-1900, vSI], [1900, vSI], 80, { ilsId: 'IAC', ilsFq: '111.30', exits: ['B4', 'B5', 'B6', 'B7', 'B8'], holds: ['B1', 'B2'] });
    end('27R', 'SI', [1900, vSI], [-1900, vSI], 260, { ilsId: 'IAK', ilsFq: '111.90', exits: ['B5', 'B4', 'B3', 'B2', 'B1'], holds: ['B8', 'B7'] });
    end('09R', 'SO', [-1500, vSO], [1900, vSO], 80, { ilsId: 'IAS', ilsFq: '108.30', exits: ['S3', 'S4', 'S5', 'S6'], holds: ['S1', 'S2'] });
    end('27L', 'SO', [1900, vSO], [-1500, vSO], 260, { ilsId: 'IAL', ilsFq: '108.70', exits: ['S4', 'S3', 'S2', 'S1'], holds: ['S6', 'S5'] });
    end('10', 'OF', [-1100, vOF], [1900, vOF], 80, { ilsId: 'IAT', ilsFq: '110.35', exits: ['H4', 'H5', 'H6'], holds: ['H1', 'H2'] });
    end('28', 'OF', [1900, vOF], [-1100, vOF], 260, { ilsId: 'IAU', ilsFq: '110.95', exits: ['H3', 'H2', 'H1'], holds: ['H6', 'H5'] });
    end('17R', 'WX', [uWX, vXn], [uWX, vXs], 170, { ilsId: 'IAX', ilsFq: '109.15', exits: ['Y4', 'Y5', 'Y6'], holds: ['Y1', 'Y2'] });
    end('35L', 'WX', [uWX, vXs], [uWX, vXn], 350, { ilsId: 'IAY', ilsFq: '109.55', exits: ['Y3', 'Y2', 'Y1'], holds: ['Y6', 'Y5'] });
    end('17L', 'EX', [uEX, vXn], [uEX, vXs], 170, { exits: ['Z4', 'Z5', 'Z6'], holds: ['Z1', 'Z2'] });
    end('35R', 'EX', [uEX, vXs], [uEX, vXn], 350, { exits: ['Z3', 'Z2', 'Z1'], holds: ['Z6', 'Z5'] });
    h.finishRunways();
    /* 남쪽 바깥 활주로(09R/27L)는 양쪽에 유도로가 있음: 남쪽 지구(T5)에 서는 항공기는 남쪽(G)으로, 가운데 터미널에 서는 항공기는 북쪽(S)으로 빠져 안쪽 활주로를 건넘 */
    var SOUTH_EXITS = { '27L': ['G4', 'G3', 'G2', 'G1'], '09R': ['G3', 'G4', 'G5', 'G6'] }, SOUTH_HOLDS = { '27L': ['G6', 'G5'], '09R': ['G1', 'G2'] };
    function southStand(ac) { var sd = D.stands[ac.stand]; return !!sd && sd.grp === 'T5'; }
    D.exitList = function (e, ac) { return e.rw === 'SO' && southStand(ac) ? SOUTH_EXITS[e.id] : null; };
    D.holdList = function (e, ac) { return e.rw === 'SO' && southStand(ac) ? SOUTH_HOLDS[e.id] : null; };

    /* ---------- 운용 방식 ----------
       서풍: 착륙 26R · 27L(바깥) / 이륙 26L · 27R(안) · 28(해상 — 남쪽 방면)      동풍: 착륙 08L · 09R / 이륙 08R · 09L · 10(해상)
       바깥 활주로에 내린 항공기는 안쪽 활주로를 건너야 가운데 터미널에 닿음(C1 ~ C4 · D1 ~ D4). 해상 활주로는 남쪽 지구(T5)에서 다리 유도로로 감 — 활주로를 건너지 않음.
       예비 운용(강한 남풍 · 북풍): 가로 활주로를 모두 쉬고 세로 두 개만 — 서쪽에 내리고 동쪽에서 뜸. 지상 흐름은 서 → 동 한 방향. 수용량이 줄어 줄이 길어짐. */
    D.flows = {
      W: { id: 'W', label: T('서풍 운용'), arr: '26R', dep: '26L', arrs: ['26R', '27L'], deps: ['26L', '27R', '28'], sfx: 'A',
        depBy: { NORVA: '26L', WESKO: '26L', ESTIA: '27R', SOLTA: '28' }, arrBy: { VELKA: '26R', HASTO: '26R', DOMRA: '27L', PELIN: '27L' }, appArr: '26R', vecFix: ['NADIR', 'BRISA', 'SELKA'],
        twr: { 1: { arr: ['27R'], dep: ['26L'] }, 2: { arr: ['26R'], dep: ['26L', '28'] } },      /* 초급 = 안쪽 활주로 둘(서로 걸리지 않음) / 중급 = 바깥에 내려 안쪽을 건넘 + 해상 활주로 이륙 */
        w: 0.55, wind: { dir: 230, spd: 6, spdN: 11 }, push: 'east', pushDu: 1, mini: 'R',
        taxiNote: T('계류장 유도로 P · Q · R은 동쪽 방향 일방통행 — P1 · P2(Q1 · Q2)로 진입, P3 · P4(Q3 · Q4)로 진출'),
        closures: [['A', -300, 730, 300, 730], ['K', -1600, 480, -1600, -480], ['Q2', -400, -730, -400, -480], ['W', 1500, -1700, 1500, -2510]] },      /* 넷째(동쪽 다리 W — 서풍 운용에서 해상 활주로로 가는 길)는 시나리오 전용. 자유 근무에서는 앞의 셋 가운데서만 뽑음 */
      E: { id: 'E', label: T('동풍 운용'), arr: '08L', dep: '08R', arrs: ['08L', '09R'], deps: ['08R', '09L', '10'], sfx: 'B',
        depBy: { ESTIA: '08R', NORVA: '08R', SOLTA: '10', WESKO: '09L' }, arrBy: { VELKA: '08L', HASTO: '08L', DOMRA: '09R', PELIN: '09R' }, appArr: '08L', vecFix: ['NADIR', 'WINDA', 'WOLTA'],
        twr: { 1: { arr: ['09L'], dep: ['08R'] }, 2: { arr: ['08L'], dep: ['08R', '10'] } },
        w: 0.35, wind: { dir: 50, spd: 5, spdN: 10 }, push: 'west', pushDu: -1, mini: 'R',
        taxiNote: T('계류장 유도로 P · Q · R은 서쪽 방향 일방통행 — P3 · P4(Q3 · Q4)로 진입, P1 · P2(Q1 · Q2)로 진출'),
        closures: [['B', -300, -730, 300, -730], ['J', 1600, 480, 1600, -480], ['P3', 400, 730, 400, 480]] },
      S: xflow('S', T('남풍 운용(예비)'), '17R', '17L', 'A', 140, ['EDORA', 'XENON', 'XAVIA']),
      N: xflow('N', T('북풍 운용(예비)'), '35L', '35R', 'B', 320, ['EDORA', 'YUKON', 'YALTA'])
    };
    /* 예비 운용: 모든 방면이 착륙 하나 · 이륙 하나를 씀. SID 이름은 서풍 · 동풍 것과 같은 글자(게임값) */
    function xflow(id, label, arr, dep, sfx, dir, vec) {
      return { id: id, label: label, arr: arr, dep: dep, arrs: [arr], deps: [dep], sfx: sfx, spare: true,
        depBy: { NORVA: dep, WESKO: dep, ESTIA: dep, SOLTA: dep }, arrBy: { VELKA: arr, HASTO: arr, DOMRA: arr, PELIN: arr }, appArr: arr, vecFix: vec,
        twr: { 1: { arr: [arr], dep: [dep] }, 2: { arr: [arr], dep: [dep] } },
        w: 0.05, wind: { dir: dir, spd: 14, spdN: 10 }, push: 'east', pushDu: 1, mini: 'R',
        taxiNote: T('예비 운용: 서쪽 활주로 착륙 · 동쪽 활주로 이륙 — 유도로 A · B와 계류장 유도로는 모두 동쪽 방향'),
        closures: [['A', -300, 730, 300, 730], ['Q2', -400, -730, -400, -480]] };
    }
    /* 표준 유도 흐름(게임값 — 마주 보고 멈추는 일을 줄이려는 일방통행 권장)
       계류장 유도로 P · Q · R(남쪽 지구): 이륙 대기 지점 쪽으로 일방통행(서풍 = 동쪽 방향). 들어오는 연결 유도로와 나가는 연결 유도로를 나눔(서풍: P1 · P2로 들어와 P3 · P4로 나감).
       평행 유도로 A · B: 나가는 연결 유도로(서풍 P3 · 동풍 P2)를 경계로, 대기 지점 쪽 절반은 대기 지점 방향 · 반대쪽 절반은 그 반대 방향(도착기가 쓰는 길) */
    D.taxiFlow = function (flowId, hard) {
      var bad = hard ? 6 : 2.4, badL = hard ? 1e9 : 8, w = flowId === 'E' ? -1 : 1, split = 400 * w, spare = flowId === 'S' || flowId === 'N';
      return function (e, a, b) {
        var du = b.u - a.u, n = e.name, k;
        if (e.kind === 'lane' && (n === 'P' || n === 'Q' || n === 'R')) return du * w < 0 ? badL : 1;
        if (n === 'Y' || n === 'Z') return spare ? 1 : 20;                 /* 세로 활주로 옆 유도로는 예비 운용 때만(평소에는 가로 활주로의 접근 경로 밑이라 다니지 않음) */
        if ((n === 'A' || n === 'B') && a.v === b.v && Math.abs(a.u) <= 1600 && Math.abs(b.u) <= 1600) return (spare ? du < 0 : ((a.u + b.u) / 2 - split) * w > 0 ? du * w < 0 : du * w > 0) ? bad : 1;
        if ((k = /^[PQ]([1-4])$/.exec(n))) return ((w > 0 ? +k[1] <= 2 : +k[1] >= 3) === (Math.abs(b.v) > Math.abs(a.v))) ? bad : 1;
        /* K · J의 양 끝 토막(계류장 유도로 끝 ↔ 평행 유도로)도 같은 규칙: 계류장 유도로가 끝나는 쪽(서풍 J · 동풍 K)은 나가는 길, 시작하는 쪽은 들어오는 길 */
        if ((n === 'K' || n === 'J') && Math.abs(a.v) >= 480 && Math.abs(b.v) >= 480) return (((n === 'J') === (w > 0)) === (Math.abs(b.v) > Math.abs(a.v))) ? 1 : (hard ? 1e9 : 20);      /* 짧은 토막이라 세게 — 반대로 들어오려는 경로는 계류장 유도로로 돌아가게 */
        return 1;
      };
    };
    D.standGroups = { cargo: ['K'], ga: ['GA'], pax: ['T1', 'T2', 'T3', 'T4', 'T5'] }; D.rwStands = {}; D.spareStand = '206';
    D.center = { x: 0, y: 0 };
    h.finishFlows();

    /* ---------- 방면 · 공항 ---------- 네 귀퉁이로 들어오고(in) 네 변으로 나감(out) */
    fx('AST', { x: 0, y: 0 }, 'vor');
    fx('VELKA', pol(35, 48), 'in'); fx('DOMRA', pol(125, 48), 'in'); fx('PELIN', pol(215, 48), 'in'); fx('HASTO', pol(305, 48), 'in');
    fx('NORVA', pol(350, 48), 'out'); fx('ESTIA', pol(80, 48), 'out'); fx('SOLTA', pol(170, 48), 'out'); fx('WESKO', pol(260, 48), 'out');
    fin('08L', 'ODERA', 'OKTIS'); fin('26R', 'RONDA', 'RELTO'); fin('08R', 'PAVEL', 'PIRNA'); fin('26L', 'GARIN', 'GOSTA');
    fin('09L', 'CALDO', 'CERIS'); fin('27R', 'MIRTA', 'MOLEN'); fin('09R', 'BARUM', 'BELKA'); fin('27L', 'LAMOR', 'LETIS');
    fin('10', 'ZUMAR', 'ZELIA'); fin('28', 'YARNO', 'YOSTA'); fin('17R', 'TORMA', 'TILDA'); fin('35L', 'FENRO', 'FALTA');
    D.gateDest = {
      NORVA: [['RKSI', 'Seoul Incheon'], ['RJCC', 'Sapporo New Chitose'], ['ZBAA', 'Beijing Capital']],
      ESTIA: [['RJTT', 'Tokyo Haneda'], ['RJAA', 'Tokyo Narita'], ['PHNL', 'Honolulu'], ['KLAX', 'Los Angeles']],
      SOLTA: [['XSRA', 'Seira'], ['RCTP', 'Taipei Taoyuan'], ['WSSS', 'Singapore Changi'], ['YSSY', 'Sydney']],
      WESKO: [['VHHH', 'Hong Kong'], ['VTBS', 'Bangkok Suvarnabhumi'], ['ZSPD', 'Shanghai Pudong']]
    };
    D.gateOrig = {
      VELKA: [['RJTT', 'Tokyo Haneda'], ['RJCC', 'Sapporo New Chitose'], ['PHNL', 'Honolulu']],
      DOMRA: [['XSRA', 'Seira'], ['YSSY', 'Sydney'], ['PGUM', 'Guam']],
      PELIN: [['RCTP', 'Taipei Taoyuan'], ['WSSS', 'Singapore Changi'], ['VTBS', 'Bangkok Suvarnabhumi']],
      HASTO: [['RKSI', 'Seoul Incheon'], ['ZSPD', 'Shanghai Pudong'], ['ZBAA', 'Beijing Capital']]
    };
    D.gateEast = { NORVA: false, ESTIA: true, SOLTA: true, WESKO: false };
    D.depRwyFor = function (flow, gate) { return flow.depBy[gate] || flow.dep; };
    D.sidInit = 6000; D.tmaTop = 19000; D.tmaR = 52;

    /* ---------- 접근관제 ---------- 도착 경로는 짧게: 진입 지점 → (배풍 지점) → 기본 구간 지점. 그 뒤는 레이더 유도로 최종 접근로에 올림(세이라와 같은 방식).
       북쪽 두 귀퉁이는 북쪽 바깥 활주로(26R · 08L), 남쪽 두 귀퉁이는 남쪽 바깥 활주로(27L · 09R) — 두 최종 접근로는 2,600m 떨어져 동시에 접근 */
    var off = h.off, F = D.fix;
    fx('NADIR', pol(350, 14), 'dw'); fx('SUMAR', pol(170, 14), 'dw'); fx('EDORA', pol(80, 15), 'dw'); fx('WALDO', pol(260, 15), 'dw');
    fx('BRISA', off(F.RONDA, 350, 8), 'base'); fx('SELKA', off(F.LAMOR, 170, 8), 'base');          /* 서풍: 26R · 27L의 기본 구간 */
    fx('WINDA', off(F.ODERA, 350, 8), 'base'); fx('WOLTA', off(F.BARUM, 170, 8), 'base');          /* 동풍: 08L · 09R */
    fx('XENON', off(F.TORMA, 80, 8), 'base'); fx('XAVIA', off(F.TORMA, 260, 8), 'base');           /* 남풍(예비): 17R — 동쪽 · 서쪽에서 */
    fx('YUKON', off(F.FENRO, 80, 8), 'base'); fx('YALTA', off(F.FENRO, 260, 8), 'base');           /* 북풍(예비): 35L */
    D.entryAlt = { VELKA: 13000, DOMRA: 12000, PELIN: 13000, HASTO: 12000 };
    D.star = {
      W: { VELKA: ['VELKA', 'BRISA'], HASTO: ['HASTO', 'NADIR', 'BRISA'], DOMRA: ['DOMRA', 'SELKA'], PELIN: ['PELIN', 'SUMAR', 'SELKA'] },
      E: { HASTO: ['HASTO', 'WINDA'], VELKA: ['VELKA', 'NADIR', 'WINDA'], PELIN: ['PELIN', 'WOLTA'], DOMRA: ['DOMRA', 'SUMAR', 'WOLTA'] },
      S: { VELKA: ['VELKA', 'XENON'], DOMRA: ['DOMRA', 'EDORA', 'XENON'], HASTO: ['HASTO', 'XAVIA'], PELIN: ['PELIN', 'WALDO', 'XAVIA'] },
      N: { DOMRA: ['DOMRA', 'YUKON'], VELKA: ['VELKA', 'EDORA', 'YUKON'], PELIN: ['PELIN', 'YALTA'], HASTO: ['HASTO', 'WALDO', 'YALTA'] }
    };
    /* 최저 레이더 유도 고도 — 북쪽 산지만 높음 */
    D.mvaBase = 2500;
    D.mva = [{ n: 'MT. ORVEN', c: pol(350, 34), r: 8, alt: 6500, peak: 5200 }];

    /* ---------- 지역관제 ---------- */
    D.acc = { x1: -140, x2: 140, y1: -100, y2: 100 }; D.accLabel = 'ASTERA CONTROL';
    fx('KOVAN', { x: -140, y: 50 }, 'bd'); fx('LIRUS', { x: -140, y: -35 }, 'bd'); fx('MONTE', { x: 140, y: 55 }, 'bd'); fx('NELKO', { x: 140, y: -40 }, 'bd');
    fx('OPALA', { x: -40, y: 100 }, 'bd'); fx('PRIMA', { x: 60, y: 100 }, 'bd'); fx('QUILO', { x: -50, y: -100 }, 'bd'); fx('RASTA', { x: 55, y: -100 }, 'bd');
    fx('SIGMA', { x: -65, y: 52 }, 'en'); fx('TERRA', { x: 66, y: 54 }, 'en'); fx('ULTRA', { x: -62, y: -54 }, 'en'); fx('VISTA', { x: 68, y: -52 }, 'en');
    D.bdSide = { KOVAN: 'W', LIRUS: 'W', MONTE: 'E', NELKO: 'E', OPALA: 'N', PRIMA: 'N', QUILO: 'S', RASTA: 'S' };
    D.neighbor = {
      W: { n: 'Lumen Control', fq: '134.20' }, E: { n: 'Halcyon Control', fq: '135.60' },
      N: { n: 'Orvelle Control', fq: '132.85' }, S: { n: 'Seira Control', fq: '133.50' }          /* 남쪽 이웃이 세이라 */
    };
    D.airways = [
      { n: 'Y30', f: ['KOVAN', 'SIGMA', 'TERRA', 'MONTE'] }, { n: 'Y40', f: ['LIRUS', 'ULTRA', 'VISTA', 'NELKO'] },
      { n: 'A5', f: ['OPALA', 'SIGMA', 'ULTRA', 'QUILO'] }, { n: 'A6', f: ['PRIMA', 'TERRA', 'VISTA', 'RASTA'] },
      { n: 'B7', f: ['KOVAN', 'AST', 'NELKO'] }, { n: 'B8', f: ['LIRUS', 'AST', 'MONTE'] }
    ];
    D.ovfRoutes = [
      ['KOVAN', 'SIGMA', 'TERRA', 'MONTE'], ['MONTE', 'TERRA', 'SIGMA', 'KOVAN'], ['LIRUS', 'ULTRA', 'VISTA', 'NELKO'], ['NELKO', 'VISTA', 'ULTRA', 'LIRUS'],
      ['OPALA', 'SIGMA', 'ULTRA', 'QUILO'], ['QUILO', 'ULTRA', 'SIGMA', 'OPALA'], ['PRIMA', 'TERRA', 'VISTA', 'RASTA'], ['RASTA', 'VISTA', 'TERRA', 'PRIMA'],
      ['KOVAN', 'AST', 'NELKO'], ['NELKO', 'AST', 'KOVAN'], ['LIRUS', 'AST', 'MONTE'], ['MONTE', 'AST', 'LIRUS']
    ];
    D.accArr = { VELKA: ['PRIMA', 'MONTE'], DOMRA: ['NELKO', 'RASTA'], PELIN: ['QUILO', 'LIRUS'], HASTO: ['KOVAN', 'OPALA'] };
    D.accDep = { NORVA: ['OPALA', 'PRIMA'], ESTIA: ['MONTE', 'NELKO'], SOLTA: ['RASTA', 'QUILO'], WESKO: ['LIRUS', 'KOVAN'] };
    D.accArrAlt = 13000;
    D.restricted = { n: 'R-34', pts: [{ x: 58, y: 62 }, { x: 82, y: 62 }, { x: 82, y: 88 }, { x: 58, y: 88 }], top: 30000 };

    /* 편마다 방면 · 공항 · 주기장 묶음을 함께 정함. 주기장은 쓰는 활주로 쪽의 터미널:
       북쪽 쌍 = T1(Vela Air와 제휴사) · T2(그 밖) / 남쪽 쌍 = T3(Vela Air와 제휴사) · T4(그 밖) / 해상 활주로 = T5(남쪽 지구).
       남쪽 바깥 활주로에 내리는 저비용 · 지역 항공사(CKY · KCM · LMN)도 T5. 화물 · 소형기는 가운데 지구 양 끝(K · GA)이라 해상 활주로 방면은 고르지 않음 */
    var GRP_A = { VLA: 1, KCM: 1, AOP: 1 }, LCC = { CKY: 1, KCM: 1, LMN: 1 };
    function sideOf(r) { return /^(08|26)/.test(r) ? 'N' : /^(09|27)/.test(r) ? 'S' : /^(17|35)/.test(r) ? 'X' : 'O'; }
    D.planFlight = function (sim, f, kind, rwy) {
      var by = kind === 'dep' ? sim.flow.depBy : sim.flow.arrBy, tbl = kind === 'dep' ? D.gateDest : D.gateOrig, small = f.al.cargo || f.al.ga;
      var gates = Object.keys(tbl).filter(function (g) { return rwy ? by[g] === rwy : !(small && sideOf(by[g]) === 'O'); }); if (!gates.length) gates = Object.keys(tbl);
      var g = sim.rng.pick(gates), r = rwy || by[g], side = sideOf(r), a = GRP_A[f.al.code], grp;
      function free(t) { return Object.keys(D.stands).some(function (s) { return D.stands[s].grp === t && !(sim.standBusy && sim.standBusy[s]); }); }
      function prefer(p, q) { return free(p) ? [p] : [q]; }
      if (side === 'O' || small && side === 'O') grp = ['T5'];
      else if (f.al.cargo) grp = ['K']; else if (f.al.ga) grp = ['GA'];
      else if ((side === 'X' || side === 'S' && kind === 'arr' && D.ends[r].rw === 'SO') && LCC[f.al.code] && free('T5')) grp = ['T5'];
      else if (side === 'X') grp = a ? (free('T1') ? ['T1'] : ['T3', 'T1']) : (free('T2') ? ['T2'] : ['T4', 'T2']);      /* 예비 운용: 터미널은 항공사 묶음대로 */
      else grp = side === 'N' ? prefer(a ? 'T1' : 'T2', a ? 'T2' : 'T1') : prefer(a ? 'T3' : 'T4', a ? 'T4' : 'T3');
      return { gate: g, ap: sim.rng.pick(tbl[g]), intl: false, rwy: r, grp: grp };
    };

    /* ---------- 주파수 ---------- */
    D.freq = {
      DEL: { n: 'Astera Delivery', fq: '121.95' }, GND: { n: 'Astera Ground', fq: '121.60' }, TWR: { n: 'Astera Tower', fq: '118.30' },
      APP: { n: 'Astera Approach', fq: '119.70' }, DEP: { n: 'Astera Departure', fq: '125.20' }, ACC: { n: 'Astera Control', fq: '132.10' }, ATIS: { n: 'ATIS', fq: '127.65' }
    };

    /* ---------- 지상 그물 ---------- */
    var L = [], HOLD = 110, vN = 1110, vA = 730, vP = 480, vQ = -480, vB = -730, vS = -1110, vG = -1490, vR = -1700, vH = -2510, uK = -1600, uJ = 1600, uV = -1200, uW = 1500, uY = -2310, uZ = 2310;
    function ln(n, p, kind) { L.push({ n: n, p: p, o: kind ? { kind: kind } : undefined }); }
    /* 활주로 사이 유도로 N · S, 터미널 쪽 평행 유도로 A · B, 남쪽 지구의 G(09R/27L 남쪽) · 섬의 H(10/28 북쪽) */
    ln('N', [[-1900, vN], [1500, vN]]); ln('S', [[-1500, vS], [1900, vS]]);
    ln('A', [[uY, vA], [uZ, vA]]); ln('B', [[uY, vB], [uZ, vB]]);
    ln('G', [[uY, vG], [uZ, vG]]); ln('H', [[uV, vH], [1900, vH]]);
    /* 세로 예비 활주로 옆 유도로: 서쪽 Y · 동쪽 Z — A · B · G의 양 끝이 여기에 닿음 */
    ln('Y', [[uY, vXn], [uY, vXs]]); ln('Z', [[uZ, vXn], [uZ, vXs]]);
    /* 계류장 유도로 P · Q(가운데) · R(남쪽 지구)과 연결 유도로 P1 ~ P4 · Q1 ~ Q4 · R2, 남북 터미널을 잇는 K(서) · J(동) */
    ln('P', [[uK, vP], [uJ, vP]], 'lane'); ln('Q', [[uK, vQ], [uJ, vQ]], 'lane'); ln('R', [[uV, vR], [uW, vR]], 'lane');
    [-1300, -400, 400, 1300].forEach(function (u, i) { ln('P' + (i + 1), [[u, vA], [u, vP]]); ln('Q' + (i + 1), [[u, vB], [u, vQ]]); });
    ln('K', [[uK, vA], [uK, vB]]); ln('J', [[uJ, vA], [uJ, vB]]); ln('R2', [[0, vG], [0, vR]]);
    /* 다리 유도로: 서쪽 V · 동쪽 W — 남쪽 지구(G · R)에서 바다를 건너 섬의 H로 */
    ln('V', [[uV, vG], [uV, vH]]); ln('W', [[uW, vG], [uW, vH]]);

    /* 활주로 진입 · 탈출 유도로: [이름, 활주로, 활주로 위 지점, 유도로 쪽 지점] — 정지선은 활주로 중심선에서 110m */
    var CONN = [], XING = [];
    [-1900, -1300, -600, 100, 800, 1500].forEach(function (u, i) { CONN.push(['N' + (i + 1), 'NO', [u, vNO], [u, vN]]); });
    [-1900, -1500, -900, -300, 300, 900, 1500, 1900].forEach(function (u, i) { CONN.push(['A' + (i + 1), 'NI', [u, vNI], [u, vA]]); CONN.push(['B' + (i + 1), 'SI', [u, vSI], [u, vB]]); });
    [-1500, -800, -100, 600, 1300, 1900].forEach(function (u, i) { CONN.push(['S' + (i + 1), 'SO', [u, vSO], [u, vS]]); CONN.push(['G' + (i + 1), 'SO', [u, vSO], [u, vG]]); });
    [-1100, -500, 100, 700, 1300, 1900].forEach(function (u, i) { CONN.push(['H' + (i + 1), 'OF', [u, vOF], [u, vH]]); });
    [1100, 500, -100, -700, -1300, -1900].forEach(function (v, i) { CONN.push(['Y' + (i + 1), 'WX', [uWX, v], [uY, v]]); CONN.push(['Z' + (i + 1), 'EX', [uEX, v], [uZ, v]]); });
    /* 안쪽 활주로를 건너는 유도로: 북쪽 C1 ~ C4(N ↔ A), 남쪽 D1 ~ D4(S ↔ B). 정지선은 양쪽에 하나씩, 이름은 같음 */
    [-1300, -600, 100, 800].forEach(function (u, i) { XING.push(['C' + (i + 1), 'NI', [u, vN], [u, vNI], [u, vA]]); });
    [-800, -100, 600, 1300].forEach(function (u, i) { XING.push(['D' + (i + 1), 'SI', [u, vS], [u, vSI], [u, vB]]); });
    function toward(r, a, d) { var m = Math.hypot(a[0] - r[0], a[1] - r[1]); return [Math.round(r[0] + (a[0] - r[0]) / m * d), Math.round(r[1] + (a[1] - r[1]) / m * d)]; }
    CONN.forEach(function (c) { c.h = toward(c[2], c[3], HOLD); ln(c[0], [c[3], c.h]); });
    XING.forEach(function (x) { x.h1 = toward(x[3], x[2], HOLD); x.h2 = toward(x[3], x[4], HOLD); ln(x[0], [x[2], x.h1]); ln(x[0], [x.h2, x[4]]); });

    /* 주기장: T1 101 ~ 106 · T2 201 ~ 206(P) / T3 301 ~ 306 · T4 401 ~ 406(Q) / T5 501 ~ 510(R) / 화물 K1 ~ K4(K 서쪽) · 소형기 M1 ~ M3(J 동쪽) */
    var ST = [], NS = ['north', 'south'], EW = ['east', 'west'], i;
    function st(name, u, v, grp, lane, faces, faceRec) { ST.push({ name: name, u: u, v: v, grp: grp, lane: lane, faces: faces, faceRec: faceRec || null }); }
    for (i = 0; i < 6; i++) {
      st('10' + (i + 1), -1100 + i * 200, 350, 'T1', [-1100 + i * 200, vP], EW); st('20' + (i + 1), 100 + i * 200, 350, 'T2', [100 + i * 200, vP], EW);
      st('30' + (i + 1), -1100 + i * 200, -350, 'T3', [-1100 + i * 200, vQ], EW); st('40' + (i + 1), 100 + i * 200, -350, 'T4', [100 + i * 200, vQ], EW);
    }
    for (i = 0; i < 10; i++) st('5' + (i < 9 ? '0' : '') + (i + 1), -900 + i * 200, vR - 130, 'T5', [-900 + i * 200, vR], EW);
    [300, 100, -100, -300].forEach(function (v, k) { st('K' + (k + 1), uK - 150, v, 'K', [uK, v], NS); });
    [200, 0, -200].forEach(function (v, k) { st('M' + (k + 1), uJ + 150, v, 'GA', [uJ, v], NS); });
    ST.forEach(function (s) { ln('STAND', [[s.u, s.v], s.lane], 'stand'); });

    h.mesh(L);

    /* 활주로 위 마디 · 정지선 · 진입 구간 */
    var rwPts = { NO: [], NI: [], SI: [], SO: [], OF: [], WX: [], EX: [] };
    CONN.forEach(function (c) {
      var name = c[0], rw = c[1], r = N(c[2][0], c[2][1], { rwy: rw }), hp = N(c.h[0], c.h[1], { hold: name, rw: rw }), a = N(c[3][0], c[3][1]), up = c[2][0] === c[3][0];
      E(hp, r, name, { kind: 'entry', rw: rw }); rwPts[rw].push(c[2]);
      D.holds[name] = { name: name, node: hp, rnode: r, anode: a, u: c[2][0], rw: rw, lu: up ? c.h[0] + 62 : Math.round((c.h[0] + c[3][0]) / 2), lv: up ? Math.round((c.h[1] + c[3][1]) / 2) : c.h[1] + 46 };
    });
    XING.forEach(function (x) {
      var a = N(x.h1[0], x.h1[1], { hold: x[0], rw: x[1] }), c = N(x[3][0], x[3][1], { rwy: x[1] }), b = N(x.h2[0], x.h2[1], { hold: x[0], rw: x[1] });
      E(a, c, x[0], { kind: 'entry', rw: x[1] }); E(c, b, x[0], { kind: 'entry', rw: x[1] }); rwPts[x[1]].push(x[3]);
    });
    Object.keys(rwPts).forEach(function (rw) {
      var e = D.ends[D.rw[rw].a], b = D.ends[D.rw[rw].b], pts = rwPts[rw].concat([[e.thrU, e.thrV], [b.thrU, b.thrV]]), seen = {};
      pts = pts.filter(function (p) { var k = p[0] + ',' + p[1]; if (seen[k]) return false; seen[k] = 1; return true; });
      pts.sort(function (p, q) { return D.rwAlong(e, { u: p[0], v: p[1] }) - D.rwAlong(e, { u: q[0], v: q[1] }); });
      pts.forEach(function (p) { N(p[0], p[1], { rwy: rw }); });
      h.line('RWY', pts, { kind: 'rwy', rw: rw });
    });
    ST.forEach(function (s) {
      var id = N(s.u, s.v, { stand: s.name }), al = s.lane[1] === s.v;
      D.stands[s.name] = { name: s.name, node: id, lane: s.lane[0] + ',' + s.lane[1], u: s.u, v: s.v, grp: s.grp,
        lab: al ? [s.lane[0] > s.u ? -66 : 66, 0] : [0, s.lane[1] > s.v ? -52 : 52], faces: s.faces, faceRec: s.faceRec };
    });

    /* 유도로 이름표 자리 [이름, u, v] */
    D.gLabels = [['N', -950, vN], ['N', 450, vN], ['A', -1100, vA], ['A', 600, vA], ['A', 1750, vA], ['B', -1750, vB], ['B', -600, vB], ['B', 1100, vB], ['S', -1150, vS], ['S', 250, vS], ['S', 1600, vS],
      ['G', -1150, vG], ['G', 950, vG], ['H', -800, vH], ['H', 400, vH], ['H', 1700, vH], ['P', -200, vP], ['P', 1450, vP], ['Q', 200, vQ], ['Q', -1450, vQ], ['R', -1050, vR], ['R', 1250, vR],
      ['K', uK, 620], ['K', uK, -620], ['J', uJ, 620], ['J', uJ, -620], ['V', uV, -2150], ['W', uW, -2150], ['R2', 0, -1595], ['Y', uY, 250], ['Y', uY, -1050], ['Z', uZ, 250], ['Z', uZ, -1050],
      ['P1', -1300, 605], ['P2', -400, 605], ['P3', 400, 605], ['P4', 1300, 605], ['Q1', -1300, -605], ['Q2', -400, -605], ['Q3', 400, -605], ['Q4', 1300, -605],
      ['C1', -1300, 800], ['C2', -600, 800], ['C3', 100, 800], ['C4', 800, 800], ['D1', -800, -800], ['D2', -100, -800], ['D3', 600, -800], ['D4', 1300, -800]];
    /* 터미널 이름(지도에 옅게 적음) [글, u, v] */
    D.gText = [['T1', -600, 215], ['T2', 600, 215], ['T3', -600, -215], ['T4', 600, -215], ['T5', 0, -1985], ['CARGO', -1990, 0], ['GA', 1960, 0]];
    D.guide = { u1: -2900, u2: 2900, v1: -3000, v2: 1600 };
    D.sat = { img: null, u1: -2900, u2: 2900, v1: -3000, v2: 1600, edge: '#3f4a3c' };      /* 바탕 그림은 아직 없음(4단계 — Gemini) */
    D.view = { cu: 0, cv: -700, w: 5400, h: 4500 };                                         /* 공항 전체가 처음부터 보임 */
    D.areas = [
      { label: T('북쪽'), box: [-2050, 620, 2050, 1420] },
      { label: T('중앙'), box: [-2100, -800, 2100, 800] },
      { label: T('남쪽'), box: [-2050, -1420, 2050, -620] },
      { label: T('해상'), box: [-1650, -2850, 2050, -1400] },
      { label: T('서쪽 예비'), box: [-2750, -2050, -1450, 1250] },
      { label: T('동쪽 예비'), box: [1450, -2050, 2750, 1250] },
      { label: T('전체'), box: [-2700, -2900, 2700, 1500] }
    ];
    /* 바탕 그림이 없을 때 그리는 바다 · 섬 · 계류장 · 건물 */
    D.decor = function (rect, C) {
      rect(-2900, -3000, 2900, -2060, '#10283a');                                                    /* 바다 */
      rect(-1300, -2840, 2100, -2400, '#39443a'); rect(uV - 35, -2400, uV + 35, -2060, '#56605a'); rect(uW - 35, -2400, uW + 35, -2060, '#56605a');   /* 섬 · 다리 */
      rect(-1500, 240, 1500, 560, C.apron); rect(-1500, -560, 1500, -240, C.apron); rect(-1900, -420, -1660, 420, C.apron); rect(1660, -320, 1900, 320, C.apron);
      rect(-1300, -1930, 1600, -1580, C.apron);
      [[-1220, 20], [20, 1220]].forEach(function (b) {
        rect(b[0], 60, b[1], 250, C.bld); rect(b[0] + 30, 85, b[1] - 30, 225, C.bld2); rect(b[0], -250, b[1], -60, C.bld); rect(b[0] + 30, -225, b[1] - 30, -85, C.bld2);
      });
      rect(-1220, -30, 1220, 30, '#5d666e');
      rect(-1000, -2040, 1000, -1900, C.bld); rect(-970, -2020, 970, -1920, C.bld2);
      for (var u = -1100; u <= 1100; u += 200) { rect(u + 24, 250, u + 32, 300, '#9aa3ab'); rect(u + 24, -300, u + 32, -250, '#9aa3ab'); }
      for (u = -900; u <= 900; u += 200) rect(u + 24, -1900, u + 32, -1880, '#9aa3ab');
      rect(-2080, -380, -1940, 380, '#6a7178'); rect(1940, -260, 2060, 260, '#6a7178');
    };
    return h;
  };
  ATC.AIRPORT_DEFS.XAST.title = ATC.pick({ ko: '아스테라 국제공항(가상 · 대형)', ja: 'アステラ国際空港(架空・大型)', en: 'Astera Intl (fictional hub)' });
})(typeof globalThis !== 'undefined' ? globalThis : this);
