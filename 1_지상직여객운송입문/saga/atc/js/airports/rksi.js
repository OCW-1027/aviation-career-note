/* AIRLINE SAGA — ATC(관제편) 공항 묶음: 인천국제공항(RKSI) — tools/gen_rksi.py가 tools/rksi_tpl.js로 만듦(지점 좌표 · 경로는 직접 고치지 말고 틀과 gen_rksi.py를 고칠 것)
 * 자료: 한국 AIP AMDT 12/26(RKSI AD 2 본문 · AD 2.24 차트 — 2026-11-12 ~ 12-11판)을 바탕으로 간추린 학습용 값. 실제 운항 · 관제에 쓸 수 없음.
 * 1단계(레이더): 활주로 시단 · STAR · SID · ILS 접근 지점 · 복행 절차 · 주파수.  2단계(지상): 유도로 · 주기장 → 비행허가 · 지상 · 관제탑.  지역관제는 다음 단계.
 * 지상 좌표: u = 활주로 방향(15 → 33 반대, 진방위 144.66° — 남남동), v = 그 왼쪽(북동), 원점 = 공항 표점(ARP 37°27'45"N 126°26'21"E). m
 */
(function (G) {
  'use strict';
  var ATC = G.ATC;
  ATC.AIRPORT_DEFS.RKSI = function (D, mk) {
    var h = mk(154), fx = h.fx, F = D.fix, T = ATC.T;
    var ARP = [37 + 27 / 60 + 45 / 3600, 126 + 26 / 60 + 21 / 3600], TRUE_HDG = 144.66, D2R = Math.PI / 180;
    /* 위경도 → 지상 좌표(m) → 레이더 좌표(NM). 진방위 144.66°가 u축(자방위 154° — 편차 9°W) */
    function ll2uv(la, lo) {
      var p = ARP[0] * D2R, mla = 111132.92 - 559.82 * Math.cos(2 * p) + 1.175 * Math.cos(4 * p), mlo = 111412.84 * Math.cos(p) - 93.5 * Math.cos(3 * p);
      var X = (lo - ARP[1]) * mlo, Y = (la - ARP[0]) * mla, g = TRUE_HDG * D2R;
      return [X * Math.sin(g) + Y * Math.cos(g), -X * Math.cos(g) + Y * Math.sin(g)];
    }
    function ll(la, lo) { var p = ll2uv(la, lo); return h.uv2xy(p[0], p[1]); }
    D.ll2xy = ll; D.realTraffic = true;      /* 실제 교통 근무(realtraffic.js): 위경도 → 레이더 좌표 */
    function dms(d, m, s) { return d + m / 60 + s / 3600; }
    function thr(la, lo) { var p = ll2uv(la, lo); return [Math.round(p[0]), Math.round(p[1])]; }

    D.airport = {
      icao: 'RKSI', iata: 'ICN', name: 'Incheon International Airport', elev: 23,
      call: 'Incheon',
      short: ATC.pick({ ko: '인천', ja: '仁川', en: 'Incheon' }),
      ko: ATC.pick({ ko: '인천국제공항', ja: '仁川国際空港', en: 'Incheon International Airport' }),
      transAlt: 14000, tower: { u: 0, v: 0 },
      note: ATC.pick({ ko: '한국 AIP AMDT 12/26 기준 · 교육용으로 단순화 · 실제 운항과 관제에 쓸 수 없음', ja: '韓国AIP AMDT 12/26基準・教育用に簡略化・実際の運航や管制には使えません', en: 'Based on AIP Republic of Korea AMDT 12/26 · simplified for training · not for real-world use' })
    };
    D.sidByRwy = true; D.gateSwap = { S: { NOPIK: 'BINIL' }, N: { BINIL: 'NOPIK' } };      /* SID 이름이 활주로 방향마다 다름(EGOBA 2E ↔ 2C) · 북서쪽 출구는 북풍 NOPIK ↔ 남풍 BINIL — 비행허가 활주로 변경 때 씀 */
    D.voice = { dir: 'assets/voice/rksi/', parts: { ctl: 16, ctlf: 16, p1: 19, p2: 19 } };      /* 인천 음성 조각(assets/voice/rksi/ — VC_APT=RKSI voice_corpus_apt.js → VBANK_APT=RKSI voice_bank.js → VAPT=RKSI voice_synth.py). 목소리는 다른 공항과 같음(관제사 미국 영어). ※ 항공사 표 · 편명 순서를 바꾸면 음성 조각을 다시 만들어야 함 */
    D.modes = ['DEL', 'GND', 'TWR', 'APP', 'ACC'];
    D.faceVec = { north: [-1, 0], south: [1, 0], east: [0, 1], west: [0, -1] };
    D.twrZoneNM = 6; D.indepParallel = true;      /* AD 2.22 1.11: ILS 34L ↔ 33R · ILS 16R ↔ 15L 독립 평행 접근 */
    D.tmaName = 'SEOUL TMA';

    /* ---------- 활주로(시단 좌표 = AIP RKSI AD 2.12, 네 개 모두 진방위 144.66° / 324.67°) ----------
       1 = 15R/33L · 2 = 15L/33R(3,750 × 60m) · 3 = 16L/34R(4,000 × 60m) · 4 = 16R/34L(3,750 × 60m) */
    D.rw = {
      1: { id: '1', a: '15R', b: '33L', width: 60 }, 2: { id: '2', a: '15L', b: '33R', width: 60 },
      3: { id: '3', a: '16L', b: '34R', width: 60 }, 4: { id: '4', a: '16R', b: '34L', width: 60 }
    };
    function end(id, rw, p, q, crs, o) { var e = { id: id, rw: rw, thrU: p[0], thrV: p[1], endU: q[0], endU2: q[0], endV2: q[1], dir: 1, crs: crs, exits: [], holds: [] }; for (var k in o) e[k] = o[k]; D.ends[id] = e; }
    D.ends = {};
    var T15R = thr(dms(37, 28, 54.44), dms(126, 26, 10.82)), T33L = thr(dms(37, 27, 15.21), dms(126, 27, 39.08)), T15L = thr(dms(37, 29, 2.20), dms(126, 26, 24.56)), T33R = thr(dms(37, 27, 22.97), dms(126, 27, 52.82));
    var T16L = thr(dms(37, 28, 22.11), dms(126, 24, 56.06)), T34R = thr(dms(37, 26, 36.29), dms(126, 26, 30.22)), T16R = thr(dms(37, 28, 7.71), dms(126, 24, 48.18)), T34L = thr(dms(37, 26, 28.50), dms(126, 26, 16.45));
    /* ILS 식별부호 · 주파수 = AD 2.19 · AD 차트 */
    end('15R', '1', T15R, T33L, 154, { ilsId: 'ISRR', ilsFq: '109.10' }); end('33L', '1', T33L, T15R, 334, { ilsId: 'INLL', ilsFq: '109.30' });
    end('15L', '2', T15L, T33R, 154, { ilsId: 'ISLL', ilsFq: '111.90' }); end('33R', '2', T33R, T15L, 334, { ilsId: 'INRR', ilsFq: '108.90' });
    end('16L', '3', T16L, T34R, 154, { ilsId: 'IRKS', ilsFq: '110.35' }); end('34R', '3', T34R, T16L, 334, { ilsId: 'IRKN', ilsFq: '108.10' });
    end('16R', '4', T16R, T34L, 154, { ilsId: 'IRFS', ilsFq: '108.55' }); end('34L', '4', T34L, T16R, 334, { ilsId: 'IRFN', ilsFq: '109.95' });
    h.finishRunways();

    /* ---------- 운용 방식 ----------
       AD 2.20 1.7: 출발 15R/33L · 16L/34R(안쪽 두 개), 도착 15L/33R · 16R/34L(바깥 두 개). 1.5: 배풍 8kt까지 33 · 34 방향 권고.
       방면별 활주로(게임값 — AD 2.22 1.5의 STAR · SID 배정표에서 고름):
         도착  KARBU · GUKDO → 동쪽 활주로(33R · 15L),  REBIT · OLMEN → 서쪽 활주로(34L · 16R)
         출발  EGOBA · OSPOT → 동쪽(33L · 15R),  BOPTA · NOPIK/BINIL → 서쪽(34R · 16L)
       서쪽 출구는 33/34 방향 NOPIK, 15/16 방향 BINIL(둘 다 G597) */
    D.flows = {
      N: { id: 'N', label: T('33 · 34 방향'), arr: '33R', dep: '33L', arrs: ['33R', '34L'], deps: ['33L', '34R'], sfx: 'E',
        depBy: { EGOBA: '33L', OSPOT: '33L', NOPIK: '34R', BOPTA: '34R' }, arrBy: { KARBU: '33R', GUKDO: '33R', REBIT: '34L', OLMEN: '34L' }, appArr: '33R', vecFix: ['TESIK', 'ENPIL', 'PAMBI'],
        twr: { 1: { arr: ['33R'], dep: ['33L'] }, 2: { arr: ['34L'], dep: ['34R'] } },      /* 관제탑 초급 = 동쪽 두 활주로(착륙기가 이륙 활주로를 건너 계류장으로) / 중급 = 서쪽 두 활주로 / 고급 = 네 개 모두 */
        w: 0.7, wind: { dir: 300, spd: 6, spdN: 10 }, push: 'south', pushDu: 1, mini: 'R',
        taxiNote: T('유도로 A · C · M · P는 남동쪽(33 · 34 시단 쪽) 방향이 표준 흐름 — 출발기는 A · M으로 활주로 끝까지, 착륙기는 C · P로 내려와 활주로를 건넘'),
        closures: [['B', 37, 832, 647, 832], ['M', 37, -742, 647, -742], ['C', -653, 1248, 2, 1248]] },
      S: { id: 'S', label: T('15 · 16 방향'), arr: '15L', dep: '15R', arrs: ['15L', '16R'], deps: ['15R', '16L'], sfx: 'C',
        depBy: { EGOBA: '15R', OSPOT: '15R', BINIL: '16L', BOPTA: '16L' }, arrBy: { KARBU: '15L', GUKDO: '15L', REBIT: '16R', OLMEN: '16R' }, appArr: '15L', vecFix: ['LASIG', 'BITIM', 'MUNAN'],
        twr: { 1: { arr: ['15L'], dep: ['15R'] }, 2: { arr: ['16R'], dep: ['16L'] } },
        w: 0.3, wind: { dir: 140, spd: 7, spdN: 11 }, push: 'north', pushDu: -1, mini: 'L',
        taxiNote: T('유도로 A · C · M · P는 북서쪽(15 · 16 시단 쪽) 방향이 표준 흐름'),
        closures: [['B', 37, 832, 647, 832], ['M', 37, -742, 647, -742], ['C', -653, 1248, 2, 1248]] }
    };
    /* 표준 유도 흐름(게임값 — 마주 보고 멈추는 일을 줄이려는 일방통행 권장):
       평행 유도로 A · C · M · P는 쓰는 활주로 방향의 반대로(= 이륙 시작 쪽으로), 계류장을 가로지르는 두 줄 묶음은 AIP AD 2.20 3.4의 TCP 이름(7E · 9E · 11E / 8W · 10W · 12W)에 맞춰 R7 · R9 · R11 = 동쪽 활주로 쪽(A, v 커지는 쪽), R8 · R10 · R12 = 서쪽 활주로 쪽(M).
       ※ 처음(41차)에는 반대로 넣었음 → 46차에서 AIP에 맞춤 */
    D.taxiFlow = function (flowId, hard) {
      var bad = hard ? 1e9 : 3.2, w = flowId === 'N' ? 1 : -1, UP = { R7: 1, R9: 1, R11: 1, A7: 1, A9: 1, A11: 1, M7: 1, M9: 1, M11: 1 }, DN = { R8: 1, R10: 1, R12: 1, A8: 1, A10: 1, A12: 1, M8: 1, M10: 1, M12: 1 };
      return function (e, a, b) {
        if (e.name === 'A' || e.name === 'C' || e.name === 'M' || e.name === 'P') return (b.u - a.u) * w < 0 ? bad : 1;
        if (UP[e.name]) return b.v < a.v ? bad : 1;
        if (DN[e.name]) return b.v > a.v ? bad : 1;
        return 1;
      };
    };
    /* 화물기(화물 계류장 = 15L/33R 동쪽)는 착륙 뒤 동쪽 D 쪽 고속 탈출 유도로로 빠짐 — C 쪽으로 빠지면 활주로를 다시 건너야 해 E에서 마주 서는 일이 생김(게임 배정) */
    D.exitList = function (e, ac) { var st = D.stands[ac.stand]; return st && st.grp === 'KC' && e.rw === '2' ? (e.thrU > 0 ? ['D3', 'D4'] : ['D2', 'D1']) : null; };
    D.standGroups = { cargo: ['KC'], ga: [], pax: ['T1', 'CC', 'T2', 'RM'] }; D.rwStands = {}; D.spareStand = '301';
    D.center = { x: 0, y: 0 };
    h.finishFlows();

    /* ---------- 지점(좌표 = AIP RKSI AD 2.24 STAR · SID · IAC coding table / aeronautical data tabulation) ---------- */
    function fxs(list, kind) { list.forEach(function (a) { fx(a[0], ll(a[1], a[2]), kind); }); }
    fxs([['KARBU', 37.533060, 127.664440], ['GUKDO', 37.019690, 127.639690], ['REBIT', 37.200833, 125.486861], ['OLMEN', 36.737060, 126.991000]], 'in');
    fxs([['EGOBA', 37.487420, 127.379420], ['OSPOT', 36.838360, 127.348580], ['NOPIK', 37.403330, 125.651390], ['BOPTA', 36.735110, 126.616220], ['BINIL', 37.397000, 125.233140]], 'out');
    fxs([['SEL', 37.413610, 126.928360], ['SOT', 37.094360, 127.031670], ['NCN', 37.494917, 126.430333]], 'vor');
    fxs([['ELMAP', 37.271110, 127.187470], ['TESIK', 37.271280, 126.909580], ['ENPIL', 37.160830, 126.726110], ['BIRIN', 37.243920, 126.652890], ['KAKSO', 37.129060, 127.443720], ['LAPOP', 37.093556, 126.121361], ['NOKEB', 37.213390, 126.310220], ['EMSOS', 37.267780, 126.261830], ['PAMBI', 37.181750, 126.542890], ['KAGOK', 37.228830, 126.626170], ['LEGOP', 36.987530, 126.561280], ['UPSOM', 37.477440, 127.317860], ['LASIG', 37.545640, 126.745750], ['ANPEM', 37.628830, 126.630170], ['BITIM', 37.680000, 126.410030], ['OLTEM', 37.671720, 126.346190], ['PUDIM', 37.631720, 126.308330], ['NODUN', 37.186140, 127.340970], ['ELGUK', 37.333170, 125.756860], ['POMIM', 37.289940, 126.139470], ['MUNAN', 37.569250, 126.198060], ['OLKIK', 37.616560, 126.281530], ['BOPKI', 36.908830, 126.775030], ['UDIDA', 37.029000, 126.623060], ['SANLA', 37.227640, 126.344170], ['EKITO', 37.670190, 126.447360], ['ATNER', 37.104420, 126.314580], ['BELTU', 37.205000, 125.799720], ['VIMER', 36.984110, 126.623580], ['EXUTO', 36.885720, 126.624720], ['GOKAK', 37.350670, 126.558470], ['PIBAK', 37.306170, 126.597860], ['BODEK', 37.377030, 126.494970], ['LENBI', 37.291060, 126.571140], ['SAKOS', 37.589560, 126.346030], ['OSERI', 37.533060, 126.356140], ['ATKON', 37.666560, 126.306440], ['POSOK', 37.241750, 126.649060], ['BATAP', 37.348530, 126.554670], ['NIPUT', 37.230970, 126.629970], ['PIPAN', 37.379190, 126.498780], ['TASUR', 37.629560, 126.304500], ['ANBOG', 37.587390, 126.342190], ['IPKOL', 37.618720, 126.285360], ['RUMRI', 37.536920, 126.358440]], 'wp');
    fxs([['KE044', 37.373280, 127.277970], ['GE023', 37.340780, 126.822970], ['GE022', 37.387640, 126.761220], ['GE016', 37.347330, 126.689390], ['GE017', 37.292750, 126.737530], ['GE020', 37.238190, 126.785610], ['GE024', 37.183580, 126.833610], ['GE028', 37.128970, 126.881530], ['GE027', 37.081000, 126.796310], ['GE019', 37.201750, 126.690080], ['GE046', 37.199890, 127.316190], ['PY049', 37.111444, 125.801778], ['PY036', 37.092500, 126.017222], ['PY031', 37.094750, 126.249972], ['DY025', 37.157220, 126.359810], ['DY020', 37.345140, 126.398030], ['DY017', 37.290690, 126.446390], ['DY016', 37.236220, 126.494670], ['DY037', 36.936810, 126.885670], ['DY034', 36.955060, 126.769610], ['DY027', 37.116390, 126.395970], ['KC067', 37.350420, 127.317690], ['KC066', 37.233670, 127.255220], ['GC022', 37.647500, 126.571780], ['GC021', 37.670860, 126.498500], ['GC072', 37.333610, 127.420060], ['GC071', 37.494030, 127.420470], ['PH036', 37.311560, 125.913720], ['PH037', 37.231750, 126.037560], ['DH030', 37.344280, 126.090890], ['DH029', 37.398560, 126.042250], ['DH028', 37.452830, 125.993560], ['DH021', 37.511080, 126.095720], ['DH022', 37.456780, 126.144390], ['DH024', 37.402440, 126.193000], ['DH027', 37.348080, 126.241530], ['DH023', 37.406110, 126.343750], ['DH020', 37.460500, 126.295250], ['DH017', 37.514890, 126.246690], ['DH047', 37.038890, 126.516110], ['DH034', 37.235610, 126.187970], ['EG020', 37.558780, 126.373470], ['EG040', 37.640940, 126.344190], ['EG070', 37.641440, 126.546830], ['EG140', 37.413190, 126.807360], ['EG160', 37.319890, 126.895720], ['AD020', 37.579190, 126.355280], ['AD050', 37.579640, 126.208500], ['AP140', 37.404690, 125.755940], ['YD070', 37.408720, 126.135830], ['YD100', 37.326390, 126.253890], ['YD130', 37.194360, 126.442250], ['YD160', 37.038780, 126.516170], ['YD190', 36.877310, 126.569440], ['YD020', 37.503690, 126.368810], ['YD040', 37.508220, 126.182470], ['YK130', 37.324610, 126.458640], ['YK170', 37.321720, 126.710780], ['YK210', 37.318140, 127.008720], ['YG160', 37.121810, 126.629140], ['YP080', 37.407360, 125.990110], ['CG050', 37.371780, 126.585280], ['CG100', 37.271190, 126.628830], ['CG101', 37.285250, 126.889530], ['CK100', 37.306310, 127.122610], ['CK099', 37.339220, 127.247780], ['CG130', 37.168250, 126.978610], ['CG200', 36.924780, 127.162110], ['CP101', 37.105610, 126.482670], ['HP121', 37.102500, 126.097860], ['CD120', 37.124390, 126.625330], ['HD050', 37.385720, 126.484360], ['HD100', 37.279720, 126.520280], ['DY019', 37.186670, 126.663330], ['GE973', 37.463060, 126.224720], ['PY985', 37.388780, 126.098720], ['GC966', 37.298060, 126.316110], ['DH989', 37.315280, 126.333060]], 'tt');

    /* ---------- 출발 · 도착 방면과 공항(게임 표 — 방면은 항공로 방향으로 고름: G597 동 = KARBU/EGOBA, G585 · A582 남동 = GUKDO/OSPOT, Y722 · Y711 남 = OLMEN/BOPTA, Y644 · G597 서 = REBIT/NOPIK · BINIL) ---------- */
    D.isIntl = function () { return true; };
    var EAST = [['RJAA', 'Tokyo Narita'], ['RJCC', 'Sapporo New Chitose'], ['KLAX', 'Los Angeles'], ['KSFO', 'San Francisco'], ['KSEA', 'Seattle'], ['CYVR', 'Vancouver']];
    var SE = [['RJBB', 'Osaka Kansai'], ['RJFF', 'Fukuoka'], ['RJGG', 'Nagoya Chubu'], ['PGUM', 'Guam'], ['PHNL', 'Honolulu']];
    var SOUTH = [['RCTP', 'Taipei Taoyuan'], ['VHHH', 'Hong Kong'], ['RPLL', 'Manila'], ['VTBS', 'Bangkok Suvarnabhumi'], ['WSSS', 'Singapore Changi'], ['VVNB', 'Hanoi Noi Bai'], ['YSSY', 'Sydney']];
    var WEST = [['ZBAA', 'Beijing Capital'], ['ZMCK', 'Ulaanbaatar'], ['EDDF', 'Frankfurt'], ['LFPG', 'Paris Charles de Gaulle'], ['EGLL', 'London Heathrow'], ['OMDB', 'Dubai']];
    D.gateDest = { EGOBA: EAST, OSPOT: SE, BOPTA: SOUTH, NOPIK: WEST, BINIL: WEST };
    D.gateOrig = { KARBU: EAST, GUKDO: SE, OLMEN: SOUTH, REBIT: WEST };
    D.gateEast = { EGOBA: true, OSPOT: true, BOPTA: false, NOPIK: false, BINIL: false };

    /* SID 이름: 활주로마다 끝 글자가 다름(AD 2.22 1.5 2 — 15L/R = C, 16L/R = H, 33L/R = E(EGOBA · OSPOT) · A(NOPIK · BOPTA), 34L/R = Y) */
    var SIDN = { '33L': { EGOBA: 'EGOBA 2E', OSPOT: 'OSPOT 2E', NOPIK: 'NOPIK 2A', BOPTA: 'BOPTA 2A' }, '34R': { EGOBA: 'EGOBA 2Y', OSPOT: 'OSPOT 2Y', NOPIK: 'NOPIK 2Y', BOPTA: 'BOPTA 2Y' },
      '15R': { EGOBA: 'EGOBA 2C', OSPOT: 'OSPOT 2C', BINIL: 'BINIL 3C', BOPTA: 'BOPTA 3C' }, '16L': { EGOBA: 'EGOBA 2H', OSPOT: 'OSPOT 2H', BINIL: 'BINIL 3H', BOPTA: 'BOPTA 3H' } };
    D.depRwyFor = function (flow, gate) { return (flow.depBy || {})[gate] || flow.dep; };
    function flowOf(x) { return x && x.flow ? x.flow : D.flows[x] || D.flows.N; }
    D.sidName = function (gate, x) { var rw = D.depRwyFor(flowOf(x), gate); return (SIDN[rw] || {})[gate] || gate; };
    D.sidNames = function (x) { var f = flowOf(x); return Object.keys(f.depBy).map(function (g) { return D.sidName(g, f.id); }); };
    D.sidAll = function () { var o = []; Object.keys(SIDN).forEach(function (r) { Object.keys(SIDN[r]).forEach(function (g) { o.push(SIDN[r][g]); }); }); return o; };
    D.sidInit = 7000;      /* 게임값(AIP에 SID 초기 고도가 따로 없음 — RADAR 출발의 「Maintain 7 000 ft」를 따옴. 첫 지점의 「이하」 제한은 아래 SIDALT) */
    D.sidInitGame = true;

    /* ---------- 최종 접근(AD 2.24 IAC — ILS RWY 33R · 34L · ILS Z RWY 15L · ILS RWY 16R) ----------
       동시 평행 접근의 높은 쪽 = 33R · 15L, 낮은 쪽 = 34L · 16R(AD 2.22 1.11 4).
       33R: ENPIL 7,000 → GE019 6,000 → BIRIN(IF) 5,000 → PIBAK 3,600 → GOKAK(FAF) 2,600      34L: PAMBI 2,600 → KAGOK(IF) 1,600 → BODEK(FAF) 1,600
       15L: BITIM 3,000 ~ 3,500 → OLTEM 3,000 → PUDIM(IF) 3,000 → SAKOS(FAF) 2,600             16R: MUNAN 1,600 ~ 2,000 → OLKIK(IF) → OSERI(FAF) 1,600
       apAlt = 중간 접근 지점(IF)에서 로컬라이저에 들어설 때의 고도 */
    function finAt(end, ifn, faf, apAlt) {
      var e = D.ends[end]; F[ifn].k = 'if'; F[faf].k = 'faf'; e.IF = ifn; e.FAF = faf; e.apAlt = apAlt; e.ifD = Math.hypot(F[ifn].x - e.thr.x, F[ifn].y - e.thr.y); e.locLen = Math.ceil(e.ifD) + 2;
    }
    finAt('33R', 'BIRIN', 'GOKAK', 5000); finAt('34L', 'KAGOK', 'BODEK', 1600); finAt('15L', 'PUDIM', 'SAKOS', 3000); finAt('16R', 'OLKIK', 'OSERI', 1600);
    finAt('33L', 'POSOK', 'BATAP', 5000); finAt('34R', 'NIPUT', 'PIPAN', 1600); finAt('15R', 'TASUR', 'ANBOG', 3000); finAt('16L', 'IPKOL', 'RUMRI', 1600);      /* 출발 활주로의 ILS — 지점만 AIP, 고도는 옆 활주로와 같게 둔 게임값(평소 도착에 쓰지 않음) */
    D.flyBy = true;

    /* ---------- STAR(AD 2.22 1.5 1의 배정표 · AD 2.24 STAR coding table) ----------
       33/34 방향: KARBU 2E · GUKDO 2E → ENPIL → 33R,  REBIT 1Y · OLMEN 1Y → PAMBI → 34L
       15/16 방향: KARBU 3C · GUKDO 3C → BITIM → 15L,  REBIT 2H · OLMEN 2H → MUNAN → 16R
       (AIP의 1순위는 15/16 방향에서 KARBU · GUKDO도 2H — 게임은 동쪽에서 오는 흐름을 2순위 3C로 동쪽 활주로에 보냄. 2M · 3M(1400 ~ 1900UTC 전용)은 넣지 않음)
       경로 끝은 중간 접근 지점(IF) */
    D.star = { N: { KARBU: ['KARBU', 'EGOBA', 'KE044', 'ELMAP', 'TESIK', 'GE023', 'GE022', 'GE016', 'GE017', 'GE020', 'GE024', 'GE028', 'GE027', 'ENPIL', 'GE019', 'BIRIN'], GUKDO: ['GUKDO', 'KAKSO', 'GE046', 'ELMAP', 'TESIK', 'GE023', 'GE022', 'GE016', 'GE017', 'GE020', 'GE024', 'GE028', 'GE027', 'ENPIL', 'GE019', 'BIRIN'], REBIT: ['REBIT', 'PY049', 'PY036', 'LAPOP', 'PY031', 'DY025', 'NOKEB', 'EMSOS', 'DY020', 'DY017', 'DY016', 'PAMBI', 'KAGOK'], OLMEN: ['OLMEN', 'DY037', 'DY034', 'LEGOP', 'DY027', 'DY025', 'NOKEB', 'EMSOS', 'DY020', 'DY017', 'DY016', 'PAMBI', 'KAGOK'] }, S: { KARBU: ['KARBU', 'UPSOM', 'KC067', 'KC066', 'SEL', 'LASIG', 'ANPEM', 'GC022', 'GC021', 'BITIM', 'OLTEM', 'PUDIM'], GUKDO: ['GUKDO', 'KAKSO', 'NODUN', 'GC072', 'GC071', 'SEL', 'LASIG', 'ANPEM', 'GC022', 'GC021', 'BITIM', 'OLTEM', 'PUDIM'], REBIT: ['REBIT', 'ELGUK', 'PH036', 'PH037', 'POMIM', 'DH030', 'DH029', 'DH028', 'DH021', 'DH022', 'DH024', 'DH027', 'DH023', 'DH020', 'DH017', 'MUNAN', 'OLKIK'], OLMEN: ['OLMEN', 'BOPKI', 'UDIDA', 'DH047', 'SANLA', 'DH034', 'POMIM', 'DH030', 'DH029', 'DH028', 'DH021', 'DH022', 'DH024', 'DH027', 'DH023', 'DH020', 'DH017', 'MUNAN', 'OLKIK'] } };
    D.starName = { N: { KARBU: 'KARBU 2E', GUKDO: 'GUKDO 2E', REBIT: 'REBIT 1Y', OLMEN: 'OLMEN 1Y' }, S: { KARBU: 'KARBU 3C', GUKDO: 'GUKDO 3C', REBIT: 'REBIT 2H', OLMEN: 'OLMEN 2H' } };
    /* 경로를 줄여 줄 때 직행시키는 지점 = 최초 접근 지점(IAF) */
    D.starCut = { N: { KARBU: 'ENPIL', GUKDO: 'ENPIL', REBIT: 'PAMBI', OLMEN: 'PAMBI' }, S: { KARBU: 'BITIM', GUKDO: 'BITIM', REBIT: 'MUNAN', OLMEN: 'MUNAN' } };
    /* STAR 지점별 고도(coding table의 「이상(+)」 값을 그 지점에서 맞출 고도로 씀). DY025는 REBIT 1Y @7,000 · OLMEN 1Y +8,000으로 서로 달라 적지 않음.
       EMSOS 5,000 ~ 6,000 · DY020 2,600 ~ 3,600 · PAMBI 34L/R @2,600 · BITIM 3,000 ~ 3,500 · MUNAN 16L/R 1,600 ~ 2,000 → 아래쪽 값 */
    D.starAlt = { ELMAP: 13000, TESIK: 10000, ENPIL: 7000, GE019: 6000,
      PY031: 7000, DY037: 12000, LEGOP: 10000, DY027: 9000, EMSOS: 5000, DY020: 3000, PAMBI: 2600,
      SEL: 13000, LASIG: 9000, ANPEM: 6500, GC022: 5500, GC021: 4500, BITIM: 3000,
      ELGUK: 13000, PH037: 9000, UDIDA: 15000, SANLA: 12000, POMIM: 3000, MUNAN: 1600 };
    D.entryAlt = { KARBU: 18000, GUKDO: 18000, REBIT: 16000, OLMEN: 18000 };      /* KARBU · GUKDO +FL180 = AIP. REBIT은 2H −FL170(이하) → FL160, OLMEN은 2E +FL160 · 2H의 다음 지점 BOPKI +FL180 → FL180(게임값) */

    /* ---------- 지역관제(Incheon Control) — 게임 구역 ----------
       항공로 · 지점: 한국 AIP ENR 3.1(G597 · G585 · B467 · A582) · ENR 3.2(Y697 · Y685 · Y644 · Y722 · Y782 · Y711 · Z51) — work/enr_routes.py로 뽑음.
       실제 인천 비행정보구역은 인천 ACC · 대구 ACC가 여러 섹터로 나눠 맡음 → 게임은 서울 둘레를 한 구역으로 묶음(경계 · 이웃 주파수는 게임값) */
    fxs([['OLBIM', 37.236389, 124.130833], ['NOGON', 37.380556, 124.418056], ['ANSIM', 37.389722, 124.835833], ['GOGET', 37.411667, 126.510000], ['TORUS', 37.606944, 128.135278], ['BIKSI', 37.675556, 128.584444], ['KAE', 37.700833, 128.753889], ['GONAV', 37.180000, 124.414722], ['DANTI', 37.301667, 124.658056], ['KALMA', 37.312500, 127.112500], ['KAKSO', 37.129167, 127.443611], ['ENSAL', 36.931667, 127.796389], ['BASEM', 36.843611, 127.952778], ['BIGOB', 36.723611, 128.164444], ['CUN', 36.631944, 128.325278], ['ELAPI', 36.337222, 128.847500], ['KPO', 35.977222, 129.474444], ['RILRO', 37.175833, 124.245000], ['BODOL', 37.189444, 124.831667], ['BOGAN', 37.211389, 126.470000], ['MONSI', 37.213056, 126.837500], ['POLEG', 37.213611, 126.993056], ['GUNKU', 36.570556, 126.996944], ['PEBRI', 36.386389, 127.003611], ['ATASO', 35.895556, 126.949167], ['MAKSA', 35.503056, 126.906111], ['MOXID', 36.386389, 126.733056], ['BEDES', 36.151389, 126.812222], ['BULTI', 36.722778, 126.825000], ['MEKIL', 36.556111, 126.831389], ['GONAX', 36.386389, 126.837778], ['ELPOS', 35.902778, 126.785278], ['MANGI', 35.503056, 126.742222], ['VASLI', 36.714444, 127.500833], ['MAKDU', 36.453333, 127.819167], ['BITUX', 36.279167, 128.030000], ['TGU', 35.809722, 128.590833], ['SAMUL', 35.126667, 126.865000], ['KAMIT', 34.253889, 126.771667]], 'en');
    ['KAE', 'TGU', 'MANGI', 'OLBIM', 'GONAV', 'RILRO', 'KPO', 'MAKSA', 'SAMUL'].forEach(function (n) { if (F[n]) F[n].k = 'bd'; });
    D.acc = { x1: -112, x2: 136, y1: -124, y2: 28 };
    D.accLabel = 'INCHEON CONTROL  (GAME SECTOR)';
    D.accView = { cx: 12, cy: -48, w: 262, h: 178 };
    D.bdSide = { KAE: 'E', KPO: 'E', TGU: 'S', MANGI: 'S', MAKSA: 'S', SAMUL: 'S', OLBIM: 'W', GONAV: 'W', RILRO: 'W' };
    D.neighbor = {      /* 다음 섹터(게임값 — 주파수는 ENR 3.1 · 3.2 항공로 표에 적힌 것 중에서): 동 = 대구 ACC 동해 저고도 134.175, 남 = 인천 ACC 제주 북부 124.525, 서 = 대구 ACC 서해 고고도 132.80(GPT 19차 F19-06). 실제 바로 이웃 섹터인지는 게임값 */
      E: { n: 'Daegu Control', fq: '134.175' }, S: { n: 'Incheon Control', fq: '124.525' }, W: { n: 'Daegu Control', fq: '132.80' }, N: { n: 'Incheon Control', fq: '120.725' }
    };
    function od(r, a, b) { r.od = [a, b]; return r; }
    /* 도착: 경계 → 진입 지점 / 출발: 출구 지점 → 경계 */
    D.accArr = {
      KARBU: [['KAE', 'BIKSI', 'TORUS', 'KARBU']],      /* Y697(동해 쪽 · 일본 · 미주) */
      GUKDO: [['KPO', 'ELAPI', 'CUN', 'BIGOB', 'BASEM', 'ENSAL', 'GUKDO']],      /* Y685(남동 — 일본 남부 · 괌) */
      REBIT: [['RILRO', 'GONAV', 'BODOL', 'REBIT']],      /* Y644(서 — 중국 · 유럽) */
      OLMEN: [['MAKSA', 'ATASO', 'PEBRI', 'GUNKU', 'OLMEN']]      /* Y722(남 — 동남아 · 대만 · 홍콩) */
    };
    D.accDep = {
      EGOBA: [['EGOBA', 'KARBU', 'TORUS', 'BIKSI', 'KAE']],      /* Y697 동쪽 */
      OSPOT: [['OSPOT', 'VASLI', 'MAKDU', 'BITUX', 'TGU']],      /* Y782 */
      BOPTA: [['BOPTA', 'MOXID', 'BEDES', 'ELPOS', 'MANGI']],      /* Z51 → Y711 */
      NOPIK: [['NOPIK', 'BINIL', 'ANSIM', 'NOGON', 'OLBIM']],      /* Y697 서쪽 */
      BINIL: [['BINIL', 'ANSIM', 'DANTI', 'GONAV']]      /* G597 서쪽 */
    };
    D.accArrAlt = 16000; D.accArrAltBy = D.entryAlt;      /* 진입 지점마다 넘겨주는 고도(접근관제와 같은 값) */
    D.accArrLv = [210, 230, 250, 270];
    D.airways = [
      { n: 'Y697', f: ['OLBIM', 'NOGON', 'ANSIM', 'BINIL', 'NOPIK', 'GOGET', 'SEL', 'EGOBA', 'KARBU', 'TORUS', 'BIKSI', 'KAE'] }, { n: 'G597', f: ['GONAV', 'DANTI', 'ANSIM'] },
      { n: 'Y644', f: ['RILRO', 'GONAV', 'BODOL', 'REBIT', 'BELTU', 'BOGAN', 'MONSI', 'POLEG', 'EGOBA'] }, { n: 'Y685', f: ['SEL', 'KALMA', 'KAKSO', 'GUKDO', 'ENSAL', 'BASEM', 'BIGOB', 'CUN', 'ELAPI', 'KPO'] },
      { n: 'Y722', f: ['SOT', 'OLMEN', 'GUNKU', 'PEBRI', 'ATASO', 'MAKSA', 'SAMUL'] }, { n: 'Z52', f: ['OLMEN', 'POSAN', 'KAKSO'] }, { n: 'Y782', f: ['SOT', 'OSPOT', 'VASLI', 'MAKDU', 'BITUX', 'TGU'] },
      { n: 'Z51', f: ['BOPTA', 'MOXID', 'BEDES'] }, { n: 'Y711', f: ['MONSI', 'BULTI', 'MEKIL', 'GONAX', 'BEDES', 'ELPOS', 'MANGI'] }
    ].filter(function (a) { return a.f.every(function (n) { return F[n]; }); });
    /* 통과기: 중국 ↔ 일본(서행 Y697 · 동행 Y644 — G597 서쪽 구간 동행은 사전 허가 필요, ENR 3.1), 제주 ↔ 일본(Y722 · Z52 · Y685 — OLMEN · GUKDO 도착 흐름과 엇갈림). 경로 선택은 게임값 */
    D.ovfRoutes = [
      od(['KAE', 'BIKSI', 'TORUS', 'KARBU', 'EGOBA', 'SEL', 'GOGET', 'NOPIK', 'BINIL', 'ANSIM', 'NOGON', 'OLBIM'], 'RJBB', 'ZBAA'),
      od(['RILRO', 'GONAV', 'BODOL', 'REBIT', 'BELTU', 'BOGAN', 'MONSI', 'POLEG', 'EGOBA', 'KARBU', 'TORUS', 'BIKSI', 'KAE'], 'ZBAA', 'RJAA'),
      od(['SAMUL', 'MAKSA', 'ATASO', 'PEBRI', 'GUNKU', 'OLMEN', 'POSAN', 'KAKSO', 'GUKDO', 'ENSAL', 'BASEM', 'BIGOB', 'CUN', 'ELAPI', 'KPO'], 'RKPC', 'RJBB'),
      od(['KPO', 'ELAPI', 'CUN', 'BIGOB', 'BASEM', 'ENSAL', 'GUKDO', 'KAKSO', 'POSAN', 'OLMEN', 'GUNKU', 'PEBRI', 'ATASO', 'MAKSA', 'SAMUL'], 'RJBB', 'RKPC')
    ].filter(function (r) { return r.every(function (n) { return F[n]; }); });

    /* ---------- SID 경로(AD 2.24 SID 본문) · 지점별 고도 제한(coding table) ---------- */
    var SIDR = { '33L': { EGOBA: ['EG020', 'EG040', 'EKITO', 'EG070', 'EG140', 'SEL', 'EGOBA'], OSPOT: ['EG020', 'EG040', 'EKITO', 'EG070', 'EG140', 'EG160', 'OSPOT'], NOPIK: ['AD020', 'AD050', 'AP140', 'NOPIK'], BOPTA: ['AD020', 'AD050', 'YD070', 'YD100', 'YD130', 'YD160', 'YD190', 'BOPTA'] }, '34R': { EGOBA: ['YD020', 'YD040', 'YD070', 'YD100', 'YK130', 'YK170', 'YK210', 'EGOBA'], OSPOT: ['YD020', 'YD040', 'YD070', 'YD100', 'YD130', 'YG160', 'OSPOT'], NOPIK: ['YD020', 'YD040', 'YP080', 'NOPIK'], BOPTA: ['YD020', 'YD040', 'YD070', 'YD100', 'YD130', 'YD160', 'YD190', 'BOPTA'] }, '15R': { EGOBA: ['CG050', 'CG100', 'CG101', 'CK100', 'CK099', 'EGOBA'], OSPOT: ['CG050', 'CG100', 'CG101', 'CG130', 'SOT', 'CG200', 'OSPOT'], BINIL: ['CG050', 'CG100', 'CP101', 'ATNER', 'HP121', 'BELTU', 'BINIL'], BOPTA: ['CG050', 'CG100', 'CD120', 'VIMER', 'EXUTO', 'BOPTA'] }, '16L': { EGOBA: ['HD050', 'HD100', 'CG100', 'CG101', 'CK100', 'CK099', 'EGOBA'], OSPOT: ['HD050', 'HD100', 'CG100', 'CG101', 'CG130', 'SOT', 'CG200', 'OSPOT'], BINIL: ['HD050', 'HD100', 'ATNER', 'HP121', 'BELTU', 'BINIL'], BOPTA: ['HD050', 'HD100', 'CD120', 'VIMER', 'EXUTO', 'BOPTA'] } };
    D.sidRoute = function (rwy, gate) { var r = SIDR[rwy] && SIDR[rwy][gate]; return r ? r.slice() : [gate]; };
    /* min = 이상 · max = 이하. 같은 지점이라도 SID마다 값이 달라 SID 이름별로 적음. 속도 제한(EG020 · EG040 · YD020 −230kt)은 넣지 않음 */
    var A_ = { AD020: { min: 2000 }, AD050: { min: 5000 } }, Y_ = { YD040: { min: 4000 } }, C_ = { CG050: { max: 5000 } }, H_ = { HD050: { max: 5000 } };
    function mix() { var o = {}, i, k; for (i = 0; i < arguments.length; i++) for (k in arguments[i]) o[k] = arguments[i][k]; return o; }
    var SIDALT = {
      'EGOBA 2E': { EG040: { min: 4000 }, EKITO: { max: 5500 }, EG070: { min: 7000 }, EG140: { min: 14000 }, SEL: { min: 16000 }, EGOBA: { min: 21000 } },
      'OSPOT 2E': { EG040: { min: 4000 }, EKITO: { max: 5500 }, EG070: { min: 7000 }, EG140: { min: 14000 }, EG160: { min: 16000 }, OSPOT: { min: 21000 } },
      'NOPIK 2A': mix(A_, { AP140: { min: 14000 }, NOPIK: { min: 16000 } }),
      'BOPTA 2A': mix(A_, { YD070: { min: 9000 }, YD100: { min: 11000 }, YD130: { min: 15000 }, YD160: { min: 18000 }, YD190: { min: 19000 } }),
      'EGOBA 2Y': mix(Y_, { YD070: { min: 7000 }, YD100: { min: 10000 }, YK130: { min: 13000 } }),
      'OSPOT 2Y': mix(Y_, { YD070: { min: 7000 }, YD100: { min: 10000 }, YD130: { min: 13000 }, YG160: { min: 16000 } }),
      'NOPIK 2Y': mix(Y_, { YP080: { min: 8000 }, NOPIK: { min: 13000 } }),
      'BOPTA 2Y': mix(Y_, { YD070: { min: 7000 }, YD100: { min: 10000 }, YD130: { min: 13000 }, YD160: { min: 16000 }, YD190: { min: 19000 } }),
      'EGOBA 2C': mix(C_, { CG100: { max: 10000 }, CK099: { max: 10000 } }),
      'OSPOT 2C': mix(C_, { CG100: { max: 10000 }, CG130: { min: 13000 }, SOT: { min: 15000 }, CG200: { min: 20000 }, OSPOT: { min: 23000 } }),
      'BINIL 3C': mix(C_, { CG100: { max: 8000 }, CP101: { min: 9000, max: 10000 }, ATNER: { max: 10000 }, BELTU: { min: 18000 } }),
      'BOPTA 3C': mix(C_, { CG100: { max: 8000 }, CD120: { min: 9000, max: 13000 }, VIMER: { max: 13000 }, EXUTO: { min: 14500 }, BOPTA: { min: 17000 } }),
      'EGOBA 2H': mix(H_, { HD100: { max: 10000 }, CK099: { max: 10000 } }),
      'OSPOT 2H': mix(H_, { HD100: { max: 10000 }, CG130: { min: 13000 }, SOT: { min: 15000 }, CG200: { min: 20000 }, OSPOT: { min: 23000 } }),
      'BINIL 3H': mix(H_, { HD100: { max: 8000 }, ATNER: { max: 10000 }, BELTU: { min: 18000 } }),
      'BOPTA 3H': mix(H_, { HD100: { max: 8000 }, CD120: { min: 9000, max: 13000 }, VIMER: { max: 13000 }, EXUTO: { min: 14500 }, BOPTA: { min: 17000 } })
    };
    /* 이 활주로 · 방면의 고도 제한을 경로 차례대로. 접근관제구 상한(게임 FL180)보다 높은 제한은 지역관제 몫이라 뺌 */
    D.sidAltFor = function (rwy, gate) {
      var o = [], a = SIDALT[(SIDN[rwy] || {})[gate]] || {};
      D.sidRoute(rwy, gate).forEach(function (n) { var r = a[n]; if (r && !(r.min > D.tmaTop)) o.push({ fix: n, min: r.min, max: r.max }); });
      return o;
    };
    D.sidAt = 0.6;
    /* 공시 복행 절차(AD 2.24 IAC): 활주로 방위로 올라가 at(ft)에서 turn 쪽으로 trk 기수, 그 뒤 체공 지점(fix)으로 · alt까지 상승. 게임은 VOR 거리(NCN D6 · WNG D7 …)에서 꺾는 대신 그 기수로 비행(근사) */
    D.missed = { '33R': { hdg: 334, at: 500, turn: 'R', trk: 10, alt: 3000, fix: 'GE973', rad: 'NCN D6' }, '34L': { hdg: 334, at: 500, turn: 'L', trk: 289, alt: 3000, fix: 'PY985', rad: 'WNG D7' },
      '15L': { hdg: 154, at: 720, turn: 'L', trk: 108, alt: 4000, fix: 'GC966', rad: 'NCN D8' }, '16R': { hdg: 154, at: 500, turn: 'R', trk: 188, alt: 2000, fix: 'DH989', rad: 'WNG D4' } };

    /* ---------- 접근관제구 ----------
       서울 접근관제구(TMA) 상한 FL185(ENR 2.1) → 게임에서 쓰는 가장 높은 고도는 FL180. 구역 모양은 진입 · 출구 지점을 이은 게임값(실제는 T01 ~ T07 등 여러 다각형) */
    D.tmaTop = 17000; D.tmaR = 70; D.tmaLabel = 'SFC-FL185';      /* tmaTop = 접근관제가 출발기를 올려 지역관제에 넘기는 고도(게임값 FL170 — 동 · 남쪽 진입 지점의 도착기 FL180 아래, 서쪽 REBIT 도착기 FL160 위) */
    D.sidKeep = true;
    D.xingFirst = true;      /* AI 관제탑: 활주로 횡단 대기기를 이륙기와 번갈아 먼저 */
    D.arrSlot = 165;      /* 같은 활주로로 가는 두 방면(KARBU · GUKDO / REBIT · OLMEN)이 접근 전에 한 줄로 만나므로, 진입 시각을 활주로 도착 예정 시각이 이만큼(초) 떨어지게 잡음 */
    function ext(n, d) { var f = F[n], r = Math.hypot(f.x, f.y); return { x: f.x * (r + d) / r, y: f.y * (r + d) / r }; }
    D.tmaPoly = [ll(37.78, 126.20), ll(37.80, 126.75), ll(37.76, 127.30), ext('KARBU', 3), ext('GUKDO', 3), ext('OSPOT', 3), ext('OLMEN', 3), ext('BOPTA', 3), ll(36.80, 125.90), ext('REBIT', 3), ext('BINIL', 3), ll(37.72, 125.30)];
    D.appView = { cx: 0, cy: -6, w: 132, h: 104 };
    D.appDelay = { perNM: 0.24, plus: 9 };
    D.arrAlts = [1600, 2600, 3000, 3600, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000];      /* 고도 단추(도착) — 낮은 쪽 접근 1,600 · PAMBI 2,600 · PIBAK 3,600 */
    D.depAlts = [5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000];
    /* 최저 레이더 유도 고도: AD 2.24 「ATC Surveillance Minimum Altitude Chart」의 구역을 원으로 간추린 게임값(서쪽 바다 1,600 · 공항 둘레 1,700 ~ 2,100은 기본값 1,600으로 묶음) */
    D.mvaBase = 1600;
    D.mva = [{ n: 'SEOUL', c: ll(37.42, 126.98), r: 8, alt: 3300, peak: 2000 }, { n: 'NE HILLS', c: ll(37.95, 127.10), r: 14, alt: 6000, peak: 4800 }, { n: 'ICHEON', c: ll(37.22, 127.45), r: 7, alt: 4900, peak: 3800 }, { n: 'SEOSAN', c: ll(36.83, 126.60), r: 9, alt: 3300, peak: 2200 }];

    /* ---------- 항공사 ----------
       실제 항공사(인천에 실제로 다니는 곳 · 게임 목적지 표 안의 노선만 — 공개된 운항 정보로 고른 게임 표, GPT 검수 대상) + 가상 항공사(비정상 상황은 가상 항공사에만).
       실제 취항사 가운데 일부만 고름 — 아시아나항공은 넣지 않음(사용자 결정 · 2026-12-17 대한항공과 통합 예정), Peach 등도 없음. GPT 19차(F19-02 · 03 · R19-05 · U19-06)로
       델타 LAX · 유나이티드 괌(자사 직항 없음)을 빼고, 티웨이(호출부호 TWAYAIR가 근거와 다르고 새 호출부호도 확정 자료 없음) · 일본항공 · 전일본공수(나리타–인천 자사 여객편 확인 안 됨)는 편명 번호 자리만 지키고 목록에서 뺌.
       진에어 · 에어부산 · 에어서울 통합 LCC는 2027-03-17 예정(F19-04). 화물은 가상 항공사만. 편명 번호는 항공사 차례로 정해지고 음성도 그 번호로 녹음했으므로, 항공사를 빼거나 순서를 바꾸면 하네다처럼 번호를 매긴 뒤에 빼거나 음성을 다시 만들 것 */
    var RC = '#5b6b7f', RC2 = '#eef1f5', FX = D.airlines.filter(function (a) { return !a.ga && a.code !== 'KCM'; });
    function R(code, cs, name, types, w, dest) { return { code: code, cs: cs, name: name, col: RC, col2: RC2, types: types, w: w, real: true, scope: 'I', ovf: false, dest: dest }; }
    var ALL = [].concat(EAST, SE, SOUTH, WEST).map(function (d) { return d[0]; });
    D.airlines = [FX[0]].concat([
      R('KAL', 'KOREAN AIR', 'Korean Air', ['B77W', 'B789', 'A333', 'A321'], 5, ALL),
      R('JJA', 'JEJU AIR', 'Jeju Air', ['B738'], 3, ['RJAA', 'RJBB', 'RJFF', 'RJGG', 'RJCC', 'PGUM', 'RCTP', 'RPLL', 'VTBS', 'VVNB']),
      R('JNA', 'JIN AIR', 'Jin Air', ['B738'], 2, ['RJAA', 'RJBB', 'RJFF', 'RJGG', 'RJCC', 'PGUM', 'RCTP', 'RPLL', 'VTBS', 'VVNB']),
      Object.assign(R('TWB', 'TWAYAIR', "T'way Air", ['B738', 'A333'], 2, ['RJAA']), { gone: true }),      /* 편명 번호 자리만 — 아래에서 뺌 */
      R('APZ', 'AIR PREMIA', 'Air Premia', ['B789'], 1, ['KLAX', 'KSFO', 'RJAA', 'VTBS']),
      Object.assign(R('JAL', 'JAPAN AIR', 'Japan Airlines', ['B789', 'B738'], 1, ['RJAA']), { gone: true }),
      Object.assign(R('ANA', 'ALL NIPPON', 'All Nippon Airways', ['B789', 'A321'], 1, ['RJAA']), { gone: true }),
      R('DAL', 'DELTA', 'Delta Air Lines', ['A359', 'A333'], 1, ['KSEA']),
      R('UAL', 'UNITED', 'United Airlines', ['B789', 'B77W'], 1, ['KSFO']),
      R('ACA', 'AIR CANADA', 'Air Canada', ['B789'], 1, ['CYVR']),
      R('CPA', 'CATHAY', 'Cathay Pacific', ['A359', 'A333'], 1, ['VHHH']),
      R('SIA', 'SINGAPORE', 'Singapore Airlines', ['A359', 'B77W'], 1, ['WSSS']),
      R('THA', 'THAI', 'Thai Airways', ['B789', 'A359'], 1, ['VTBS']),
      R('HVN', 'VIET NAM AIRLINES', 'Vietnam Airlines', ['A321', 'B789'], 1, ['VVNB']),
      R('EVA', 'EVA', 'EVA Air', ['B77W', 'A333'], 1, ['RCTP']),
      R('PAL', 'PHILIPPINE', 'Philippine Airlines', ['A321', 'A333'], 1, ['RPLL']),
      R('CCA', 'AIR CHINA', 'Air China', ['A333', 'B789'], 1, ['ZBAA']),
      R('MGL', 'MONGOL AIR', 'MIAT Mongolian Airlines', ['B789', 'B738'], 1, ['ZMCK']),
      R('DLH', 'LUFTHANSA', 'Lufthansa', ['A359'], 1, ['EDDF']),
      R('AFR', 'AIRFRANS', 'Air France', ['B77W', 'A359'], 1, ['LFPG']),
      R('UAE', 'EMIRATES', 'Emirates', ['B77W'], 1, ['OMDB']),
      R('QFA', 'QANTAS', 'Qantas', ['A333'], 1, ['YSSY'])
    ], FX.slice(1));
    D.mkFlights();
    D.airlines = D.airlines.filter(function (a) { if (a.gone) delete D.alBy[a.code]; return !a.gone; });      /* 번호를 매긴 뒤에 뺌 — 남은 항공사의 편명 · 녹음이 그대로 */
    /* 터미널 배정: 실제 항공사는 공항 공식 안내를 간추림(제2여객터미널 = 대한항공 · 진에어 · 델타 · 에어프랑스, 베트남항공은 제1 — GPT 19차 F19-05), 가상 항공사는 게임값 */
    var TERM = { VLA: 'T2', SOG: 'T2', AOP: 'T1', HNB: 'T1', LMN: 'T1', NCE: 'CC', CKY: 'CC', TSB: 'CC', KAL: 'T2', JNA: 'T2', DAL: 'T2', AFR: 'T2' };
    D.planFlight = function (sim, f, kind, rwy) {
      var fl = sim.flow, by = kind === 'dep' ? fl.depBy : fl.arrBy, tbl = kind === 'dep' ? D.gateDest : D.gateOrig;
      var gates = Object.keys(tbl).filter(function (g) { return by[g] && (!rwy || by[g] === rwy); }); if (!gates.length) gates = Object.keys(tbl).filter(function (g) { return by[g]; });
      /* 화물기는 화물 계류장(15L/33R 동쪽)과 가까운 동쪽 활주로만 — 서쪽 활주로를 쓰면 여객 계류장과 활주로 둘을 가로질러 E에서 마주 서는 일이 생김(게임 배정, GPT 19차 17번) */
      if (f.al.cargo && !rwy) { var eg = gates.filter(function (x) { var r = D.ends[by[x]].rw; return r === '1' || r === '2'; }); if (eg.length) gates = eg; }
      var g = sim.rng.pick(gates), ap = sim.rng.pick(tbl[g]);
      if (f.rt && ATC.RT) { var ro = []; gates.forEach(function (x) { tbl[x].forEach(function (d) { if (ATC.RT.destOk(f.al.code, d[0])) ro.push([x, d]); }); }); if (ro.length) { var pk = sim.rng.pick(ro); g = pk[0]; ap = pk[1]; } }      /* 실제 교통: 외국 항공사는 그 나라 공항 · 저비용항공은 근거리를 먼저 */
      return { gate: g, ap: ap, intl: true, rwy: by[g], grp: f.al.cargo ? ['KC'] : [TERM[f.al.code] || 'T1'] };
    };

    D.posBrief = {
      ACC: [T('핸드오프 수락 → 경로와 고도를 확인해 교차 지점의 상대 항공기를 탐지'), T('같은 고도로 교차하면 한쪽 고도를 변경(동쪽행은 1,000ft 단위 홀수 · 서쪽행은 짝수)'), T('도착기는 진입 지점별 협정 고도(KARBU FL180 · GUKDO FL180 · REBIT FL160 · OLMEN FL180)로 강하'), T('출발기는 요청 고도까지 상승시키고, 경계 도달 전에 다음 관제구역(동쪽 = Daegu Control)으로 이양'), T('5NM/1,000ft 분리 · 기본 배속 4배')],
      APP: [T('깜박이는 표적 = 핸드오프 요청 → 「수락」'), T('STAR 각 지점 옆의 숫자(100ft 단위)에 맞춰 강하 — 인천 STAR는 접근 전에 길게 접힌 구간이 있어, 간격이 넉넉하면 최초 접근 지점(ENPIL · PAMBI · BITIM · MUNAN)으로 직행시켜 줄임'),
        T('동쪽에서 오는 흐름은 동쪽 활주로, 서쪽 · 남쪽에서 오는 흐름은 서쪽 활주로 — 두 활주로에 동시에 접근(높은 쪽 5,000 · 3,000ft, 낮은 쪽 1,600ft)'), T('중간 접근 지점(IF) 앞에서 「ILS 접근 허가」 → 로컬라이저 확립 뒤 Incheon Tower로 이양'),
        T('출발기는 SID 고도 제한을 지키게 「climb via SID」로 FL170까지 올린 뒤 Incheon Control로 이양 — 동 · 남쪽에서는 도착기가 위(FL180), 서쪽에서는 아래(FL160)')]
    };

    /* ---------- 주파수(AD 2.18 — 자리마다 대표 하나. 지역관제는 ENR 2.1의 Incheon Control) ---------- */
    D.freq = {
      DEL: { n: 'Incheon Delivery', fq: '121.60' }, GND: { n: 'Incheon Ground', fq: '121.75' }, TWR: { n: 'Incheon Tower', fq: '118.20' },
      APP: { n: 'Seoul Approach', fq: '119.75' }, DEP: { n: 'Seoul Departure', fq: '125.15' }, ACC: { n: 'Incheon Control', fq: '126.175' }, ATIS: { n: 'ATIS', fq: '128.40' }
    };
    /* 계류장 관제(지상관제를 「계류장 관제로 시작」) — AD 2.18: Incheon Apron 121.65(Apron 1, 1 ~ 50 · 101 ~ 132) · 121.8(Apron 2) · 122.175 / 129.725(Apron 3) · 123.675(Apron 4). 게임은 한 자리로 묶어 121.65.
       TCP(Transfer of Control Point, AD 2.20 3.4): 이름 = 유도선 · 유도로 번호 + 방향(E = 동쪽 활주로 쪽 A, W = 서쪽 활주로 쪽 M). 게임 그물에 있는 10곳만(실제는 5W · 15E · 15W · 19W · 30E · 30W · 50E · 화물 7Y ~ 10Y도 있음) */
    D.freq.APN = { n: 'Incheon Apron', fq: '121.65' };
    /* 서쪽 활주로(16L/34R · 16R/34L)를 쓰는 항공기의 Ground · Tower 주파수(AD 2.18) — ATC.fqOf가 씀. 게임의 관제석은 동 · 서를 한 자리로 묶지만 교신에서 부르는 주파수는 쪽에 맞춤 */
    D.freqSide = { W: { GND: { n: 'Incheon Ground', fq: '121.70' }, TWR: { n: 'Incheon Tower', fq: '118.80' } } };
    D.rwSide = function (rwy) { var e = D.ends[rwy]; return e && (e.rw === '3' || e.rw === '4') ? 'W' : 'E'; };
    D.pilotDep = true; D.pilotStands = ['T2']; D.twrAltFq = '118.80';      /* 조종사 체험 출발편: Vela Air = 제2여객터미널(게임 배정), 주파수 고르기의 틀린 보기 = 서쪽 Tower */
    D.tcp = { '4E': { u: 1852, v: 550, side: 'E' }, '7E': { u: 1253, v: 724, side: 'E' }, '9E': { u: 738, v: 724, side: 'E' }, '11E': { u: 37, v: 724, side: 'E' }, '13E': { u: -556, v: 550, side: 'E' },
      '8W': { u: 1152, v: -742, side: 'W' }, '10W': { u: 647, v: -742, side: 'W' }, '12W': { u: -40, v: -742, side: 'W' }, '13W': { u: -554, v: -570, side: 'W' }, '17W': { u: -1510, v: -742, side: 'W' } };
    /* 계류장 유도선의 방향(TCP 짝에서 읽음 — R7 · R9 · R11은 동쪽 A 쪽으로, R8 · R10 · R12는 서쪽 M 쪽으로). 도착기는 반대 방향 유도선으로 들어옴(게임값 — AIP에는 출발 경로만 있음) */
    D.apnOneWay = { R7: 1, R9: 1, R11: 1, R8: -1, R10: -1, R12: -1 };
    D.apnIn = { R8: { u: 1152, v: 724, side: 'E' }, R10: { u: 647, v: 724, side: 'E' }, R12: { u: -40, v: 724, side: 'E' }, R7: { u: 1253, v: -742, side: 'W' }, R9: { u: 738, v: -742, side: 'W' }, R11: { u: 37, v: -742, side: 'W' } };

    /* ---------- 지상 그물 ----------
       자료: AD 2.24 Aircraft Parking / Docking Chart(RKSI AD CHART 2-3)의 유도로 이름 자리 · 주기장 좌표(INS coordinates 표 331곳)와 AD Chart 2-1.
       차트의 이름 자리를 주기장 좌표로 맞춰(닮음 변환, 오차 중앙값 약 20m) 유도로의 위치를 읽음 — 평행 유도로 · 가로지르는 유도로는 그 값을 10m 안팎으로 다듬은 직선.
       간추린 것: 고속 탈출 유도로는 30° 직선, 계류장 안의 유도선은 큰 줄기(R1 · R4 · R7 ~ R12 · R17 · RG …)만, 주기장은 가장 가까운 유도선에 곧게 이음. 정비 · 제방빙 주기장은 넣지 않음 */
    var L = [], vA = 724, vB = 832, v1 = T15R[1], vC = 1248, v2 = T15L[1], vD = 1660, vM = -742, vN = -858, v3 = T16L[1], vP = -1275, v4 = T16R[1], vR1 = 550, vR4 = -570, HOLD = 110, N = h.N, E = h.E;
    function ln(n, p, kind) { L.push({ n: n, p: p.map(function (q) { return [Math.round(q[0]), Math.round(q[1])]; }), o: kind ? { kind: kind } : undefined }); }
    function unit(a, b) { var d = Math.hypot(b[0] - a[0], b[1] - a[1]); return [(b[0] - a[0]) / d, (b[1] - a[1]) / d]; }
    /* 평행 유도로 */
    ln('A', [[-1900, vA], [1990, vA]]); ln('B', [[-1900, vB], [1990, vB]]); ln('C', [[-1850, vC], [1852, vC]]); ln('D', [[-1850, vD], [1852, vD]]);
    ln('M', [[-2150, vM], [2050, vM]]); ln('N', [[-2150, vN], [1900, vN]]); ln('P', [[-1860, vP], [1748, vP]]);
    /* 계류장 유도선: R1(동쪽) · R4(서쪽)와 그 사이를 잇는 줄 */
    ln('R1', [[-2400, vR1], [2150, vR1]], 'lane'); ln('R4', [[-2400, vR4], [2150, vR4]], 'lane');
    var CROSS = [['R7', 1253], ['R8', 1152], ['R9', 738], ['R10', 647], ['R11', 37], ['R12', -40], ['R17', -1510]];
    CROSS.forEach(function (c) { ln(c[0], [[c[1], vM], [c[1], vA]], 'lane'); });      /* M ~ 계류장 ~ A */
    ln('R2', [[1152, 142], [1900, 142]], 'lane'); ln('R3', [[1152, -155], [1900, -155]], 'lane'); ln('RG', [[336, vR4], [336, vR1]], 'lane'); ln('R26', [[-2400, -245], [-1510, -245]], 'lane');
    ln('DM', [[26, vD], [26, 3000]], 'lane'); ln('DA', [[1045, vD], [1045, 3000]], 'lane');
    /* A ~ B · M ~ N을 잇는 짧은 유도로(이름 = 차트). 두 줄로 적힌 것(A4 · A5 · A6 · A13 · A14 / M13 · M14 · M18 · M19)은 계류장까지 */
    [['A4', 1852, 1], ['A5', 1756, 1], ['A6', 1523, 1], ['A7', 1253], ['A8', 1152], ['A9', 738], ['A10', 647], ['A11', 37], ['A12', -40], ['A13', -556, 1], ['A14', -655, 1], ['A15', -1159], ['A16', -1259], ['A18', -1759], ['A19', -1856]]
      .forEach(function (c) { ln(c[0], [[c[1], c[2] ? vR1 : vA], [c[1], vB]]); });
    [['M5', 1853], ['M6', 1754], ['M7', 1253], ['M8', 1152], ['M9', 738], ['M10', 647], ['M11', 37], ['M12', -40], ['M13', -554, 1], ['M14', -652, 1], ['M15', -1158], ['M16', -1256], ['M17', -1510], ['M18', -2006], ['M19', -2104]]
      .forEach(function (c) { ln(c[0], [[c[1], c[2] ? vR4 : vM], [c[1], vN]]); });
    /* 활주로를 가로지르는 유도로: 동쪽 L · K · E · J · G(B ~ D), 서쪽 V · U · W · T · S(N ~ P). 활주로 앞뒤 정지선 사이는 아래 xing이 이음 */
    var XE = [['L', -1850], ['K', -1208], ['E', 2], ['J', 1202], ['G', 1852]], XW = [['V', -1512], ['U', -1208], ['W', 2], ['T', 1208], ['S', 1853]];
    XE.forEach(function (c) { var end = c[0] === 'G' || c[0] === 'L'; if (!end) ln(c[0], [[c[1], vB], [c[1], v1 - HOLD]]); ln(c[0], [[c[1], end ? vC : v1 + HOLD], [c[1], v2 - HOLD]]); ln(c[0], [[c[1], v2 + HOLD], [c[1], vD]]); });      /* 끝 유도로 G · L: B 쪽은 이륙 대기 지점(아래 CONN), 15R/33L ~ C 사이는 넣지 않음(동쪽에서 오는 항공기는 J · K로 건넘 — 간추림) */
    XW.forEach(function (c) { if (c[0] === 'S') return; ln(c[0], [[c[1], vN], [c[1], v3 + HOLD]]); ln(c[0], [[c[1], v3 - HOLD], [c[1], vP]]); });
    /* 활주로 진입 · 탈출 유도로: [이름, 활주로, 활주로 위 지점, 유도로 쪽 지점]. s = ±1이면 30° 고속 탈출(그 방향으로 착륙할 때 씀), 0이면 직각 */
    var CONN = [];
    function cx(n, rw, vr, vt, u, s) { var du = s ? Math.abs(vr - vt) / 2 / Math.tan(30 * D2R) * s : 0; CONN.push([n, rw, [u - du, vr], [u + du, vt]]); }
    [['B1', 1752, 0], ['B2', 953, 1], ['B3', 690, 1], ['B4', -660, -1], ['B5', -956, -1], ['B6', -1757, 0]].forEach(function (c) { cx(c[0], '1', v1, vB, c[1], c[2]); });
    cx('C9', '1', v1, vC, 714, 0); cx('C10', '1', v1, vC, -653, 0);
    [['C1', 950, 1], ['C2', 643, 1], ['C3', 326, 1], ['C4', 150, 1], ['C5', -150, -1], ['C6', -333, -1], ['C7', -654, -1], ['C8', -965, -1]].forEach(function (c) { cx(c[0], '2', v2, vC, c[1], c[2]); });      /* C4 · C5는 E 유도로 양옆에서 엇갈림 — 그물에서 E와 겹치지 않게 조금 벌림 */
    [['D1', 953, 1], ['D2', 481, 1], ['D3', -483, -1], ['D4', -966, -1]].forEach(function (c) { cx(c[0], '2', v2, vD, c[1], c[2]); });
    [['N1', 1752, 0], ['N2', 709, 1], ['N3', 210, 1], ['N4', -454, -1], ['N5', -953, -1], ['N6', -2002, 0], ['N7', -2101, 0]].forEach(function (c) { cx(c[0], '3', v3, vN, c[1], c[2]); });
    cx('P3', '3', v3, vP, 740, 0); cx('P9', '3', v3, vP, -605, 0);
    [['P1', 1748, 0], ['P2', 941, 1], ['P4', 627, 1], ['P5', 333, 1], ['P6', 150, 1], ['P7', -150, -1], ['P8', -332, -1], ['P10', -639, -1], ['P11', -937, -1], ['P12', -1754, 0], ['P13', -1860, 0]].forEach(function (c) { cx(c[0], '4', v4, vP, c[1], c[2]); });
    /* 활주로 끝 진입: G · L(B 쪽에서 15R/33L로), S(N 쪽에서 16L/34R로) — 이륙 대기 지점 이름으로 씀 */
    CONN.push(['G1', '1', [1852, v1], [1852, vB]], ['L1', '1', [-1850, v1], [-1850, vB]], ['S1', '3', [1853, v3], [1853, vN]]);
    CONN.forEach(function (c) {
      var r = c[2], a = c[3], d = unit(r, a), hd = HOLD / Math.abs(d[1]), hp = [r[0] + d[0] * hd, r[1] + d[1] * hd];      /* 정지선 = 활주로 중심선에서 110m(게임값 — 엔진이 100m 안쪽을 활주로 위로 봄) */
      c.r = [Math.round(r[0]), Math.round(r[1])]; c.h = [Math.round(hp[0]), Math.round(hp[1])]; c.a = [Math.round(a[0]), Math.round(a[1])];
      ln(c[0].replace(/^([GLS])1$/, '$1'), [c.a, c.h]);
    });

    /* 주기장(좌표 = AD Chart 2-3의 INS coordinates). 묶음: T1 = 제1여객터미널(1 ~ 50) · CC = 탑승동(101 ~ 132) · T2 = 제2여객터미널(208 ~ 291) · RM = 원격 주기장(3xx · 5xx) · KC = 화물 계류장(6xx) */
    var SRC = [['1', 37.449719, 126.455972], ['2', 37.449825, 126.456483], ['3', 37.450086, 126.456697], ['6', 37.450492, 126.456653], ['7', 37.450819, 126.456386], ['8', 37.450972, 126.455800], ['9', 37.451092, 126.455044], ['10', 37.451139, 126.454261], ['11', 37.451156, 126.453444], ['12', 37.451792, 126.452356], ['14', 37.452494, 126.452139], ['15', 37.453139, 126.451978], ['16', 37.453694, 126.451969], ['17', 37.454103, 126.451619], ['18', 37.454222, 126.451264], ['19', 37.453875, 126.450731], ['20', 37.453694, 126.450261], ['21', 37.453231, 126.450417], ['22', 37.452825, 126.450706], ['23', 37.452183, 126.450889], ['24', 37.451536, 126.451272], ['26', 37.450542, 126.450822], ['27', 37.450161, 126.450086], ['28', 37.449708, 126.449411], ['30', 37.449719, 126.448044], ['31', 37.450203, 126.447422], ['32', 37.450572, 126.446742], ['33', 37.450961, 126.446233], ['34', 37.451236, 126.445783], ['35', 37.450853, 126.445383], ['36', 37.450547, 126.444992], ['37', 37.450111, 126.444997], ['38', 37.449892, 126.445336], ['39', 37.449778, 126.445897], ['40', 37.449419, 126.446597], ['41', 37.449000, 126.447394], ['42', 37.447994, 126.447797], ['43', 37.447364, 126.447547], ['45', 37.446772, 126.447353], ['46', 37.446161, 126.447267], ['47', 37.445636, 126.447208], ['48', 37.445294, 126.447658], ['49', 37.445261, 126.448136], ['50', 37.445619, 126.448764], ['101', 37.458653, 126.449433], ['102', 37.458994, 126.449103], ['103', 37.458219, 126.449997], ['104', 37.458794, 126.448731], ['105', 37.457906, 126.449603], ['106', 37.458403, 126.448389], ['107', 37.457597, 126.448869], ['108', 37.458081, 126.447672], ['109', 37.457219, 126.448203], ['110', 37.457603, 126.446986], ['111', 37.456764, 126.447394], ['112', 37.457147, 126.446181], ['113', 37.456386, 126.446728], ['114', 37.456878, 126.445400], ['115', 37.455925, 126.446131], ['117', 37.455578, 126.445478], ['118', 37.455772, 126.443600], ['119', 37.455186, 126.444781], ['121', 37.454875, 126.444053], ['122', 37.455292, 126.442856], ['123', 37.454497, 126.443383], ['124', 37.454861, 126.442133], ['125', 37.454006, 126.442625], ['126', 37.454444, 126.441394], ['127', 37.453586, 126.441992], ['128', 37.454169, 126.440619], ['129', 37.453272, 126.441358], ['130', 37.453831, 126.440211], ['131', 37.452992, 126.440942], ['132', 37.453283, 126.440553], ['208', 37.471567, 126.428572], ['209', 37.471311, 126.428131], ['210', 37.471289, 126.427717], ['211', 37.471075, 126.427336], ['212', 37.470861, 126.426958], ['213', 37.470647, 126.426583], ['214', 37.470467, 126.426225], ['215', 37.470144, 126.426281], ['216', 37.469869, 126.426681], ['217', 37.469450, 126.427100], ['218', 37.468997, 126.427636], ['219', 37.468372, 126.427892], ['220', 37.468039, 126.428667], ['221', 37.467519, 126.429164], ['222', 37.466969, 126.429694], ['224', 37.466344, 126.430275], ['225', 37.465586, 126.430975], ['231', 37.464861, 126.431592], ['232', 37.464064, 126.431975], ['233', 37.463350, 126.432331], ['234', 37.462569, 126.432681], ['235', 37.462064, 126.432897], ['236', 37.461564, 126.433150], ['237', 37.461653, 126.433469], ['238', 37.461653, 126.434003], ['239', 37.461825, 126.434375], ['240', 37.462178, 126.434419], ['241', 37.462531, 126.434603], ['242', 37.462911, 126.434281], ['243', 37.463422, 126.434042], ['245', 37.463594, 126.433544], ['246', 37.464292, 126.433117], ['247', 37.465278, 126.433258], ['248', 37.465897, 126.433967], ['249', 37.466303, 126.434714], ['250', 37.466419, 126.435422], ['251', 37.467064, 126.436058], ['252', 37.467492, 126.436797], ['253', 37.467819, 126.437731], ['254', 37.467608, 126.438964], ['255', 37.466794, 126.439944], ['256', 37.466275, 126.440278], ['257', 37.465922, 126.440614], ['258', 37.465719, 126.441086], ['259', 37.465964, 126.441286], ['260', 37.466197, 126.441753], ['261', 37.466453, 126.442047], ['262', 37.466711, 126.441883], ['263', 37.467089, 126.441661], ['264', 37.467392, 126.441108], ['265', 37.467919, 126.440311], ['266', 37.468403, 126.439614], ['267', 37.468981, 126.438839], ['268', 37.469583, 126.438103], ['275', 37.470403, 126.437469], ['276', 37.471014, 126.436972], ['277', 37.471561, 126.436525], ['278', 37.472111, 126.436078], ['279', 37.472686, 126.435989], ['280', 37.473036, 126.435361], ['281', 37.473631, 126.434953], ['282', 37.474219, 126.434533], ['283', 37.474822, 126.434372], ['284', 37.474783, 126.433967], ['285', 37.474681, 126.433636], ['286', 37.474464, 126.433331], ['287', 37.474250, 126.432956], ['288', 37.474036, 126.432575], ['289', 37.473822, 126.432197], ['290', 37.473608, 126.431822], ['291', 37.473169, 126.431914], ['301', 37.461117, 126.447603], ['305', 37.459069, 126.444022], ['306', 37.458606, 126.443206], ['307', 37.458144, 126.442386], ['308', 37.457681, 126.441567], ['309', 37.457172, 126.440669], ['310', 37.456619, 126.439689], ['311', 37.456067, 126.438708], ['312', 37.455664, 126.437956], ['321', 37.461931, 126.446881], ['322', 37.461497, 126.446158], ['323', 37.460944, 126.445178], ['324', 37.460389, 126.444197], ['325', 37.459881, 126.443300], ['326', 37.459419, 126.442481], ['327', 37.458956, 126.441664], ['328', 37.458494, 126.440844], ['329', 37.457986, 126.439947], ['330', 37.457433, 126.438967], ['331', 37.456878, 126.437986], ['332', 37.456478, 126.437233], ['341', 37.463700, 126.445017], ['342', 37.463242, 126.444208], ['343', 37.462797, 126.443417], ['344', 37.462283, 126.443031], ['345', 37.462072, 126.442658], ['346', 37.461861, 126.442286], ['347', 37.461650, 126.441911], ['348', 37.461439, 126.441539], ['349', 37.461228, 126.441167], ['350', 37.459444, 126.438011], ['351', 37.459342, 126.437303], ['352', 37.458922, 126.436564], ['353', 37.458467, 126.435758], ['361', 37.464225, 126.444711], ['362', 37.463825, 126.444261], ['363', 37.463447, 126.443592], ['364', 37.463069, 126.442922], ['365', 37.462692, 126.442256], ['366', 37.462314, 126.441586], ['367', 37.461933, 126.440919], ['368', 37.461789, 126.440244], ['369', 37.461414, 126.439581], ['370', 37.460956, 126.439183], ['371', 37.460578, 126.438517], ['372', 37.460200, 126.437847], ['373', 37.459822, 126.437178], ['374', 37.459444, 126.436511], ['375', 37.459067, 126.435842], ['376', 37.458858, 126.435219], ['501', 37.471578, 126.440056], ['502', 37.472167, 126.439497], ['503', 37.472714, 126.439006], ['504', 37.473250, 126.438531], ['505', 37.473742, 126.438097], ['506', 37.475792, 126.436328], ['507', 37.476094, 126.436058], ['511', 37.464772, 126.428033], ['512', 37.465389, 126.427519], ['513', 37.465936, 126.427033], ['514', 37.466472, 126.426558], ['515', 37.466961, 126.426119], ['516', 37.468986, 126.424289], ['517', 37.469283, 126.424025], ['520', 37.475161, 126.426064], ['521', 37.475428, 126.425728], ['522', 37.475725, 126.425461], ['523', 37.476272, 126.425297], ['524', 37.476806, 126.424825], ['525', 37.477339, 126.424350], ['526', 37.477872, 126.423875], ['527', 37.478178, 126.423281], ['528', 37.478475, 126.423017], ['529', 37.478808, 126.422817], ['530', 37.479106, 126.422550], ['531', 37.474153, 126.424250], ['532', 37.474511, 126.423753], ['533', 37.475044, 126.423278], ['534', 37.477050, 126.421494], ['535', 37.477581, 126.421019], ['536', 37.478075, 126.420758], ['541', 37.472736, 126.424739], ['542', 37.473381, 126.424167], ['543', 37.474022, 126.423594], ['544', 37.474667, 126.423022], ['545', 37.476831, 126.421108], ['546', 37.477364, 126.420633], ['547', 37.477767, 126.420214], ['551', 37.471267, 126.422386], ['552', 37.472039, 126.421697], ['553', 37.472747, 126.421067], ['554', 37.473392, 126.420494], ['557', 37.475517, 126.418603], ['558', 37.476222, 126.417972], ['601', 37.463292, 126.463753], ['602', 37.463669, 126.464422], ['603', 37.464047, 126.465092], ['604', 37.464528, 126.465942], ['605', 37.464906, 126.466611], ['606', 37.465283, 126.467281], ['607', 37.465767, 126.468133], ['608', 37.466144, 126.468803], ['609', 37.466519, 126.469469], ['610', 37.467003, 126.470325], ['611', 37.467381, 126.470992], ['612', 37.467758, 126.471661], ['613', 37.468142, 126.472325], ['614', 37.468519, 126.472992], ['615', 37.468897, 126.473661], ['616', 37.469275, 126.474331], ['621', 37.465569, 126.461728], ['622', 37.465947, 126.462397], ['623', 37.466325, 126.463064], ['624', 37.466806, 126.463917], ['625', 37.467183, 126.464586], ['626', 37.467561, 126.465256], ['627', 37.468044, 126.466108], ['628', 37.468422, 126.466778], ['629', 37.468800, 126.467444], ['630', 37.469281, 126.468297], ['631', 37.469658, 126.468967], ['632', 37.470036, 126.469636], ['633', 37.470408, 126.470308], ['634', 37.470786, 126.470978], ['635', 37.471164, 126.471647], ['636', 37.471542, 126.472314], ['641', 37.470669, 126.457300], ['642', 37.471128, 126.458003], ['643', 37.471506, 126.458672], ['644', 37.471883, 126.459444], ['645', 37.472333, 126.460153], ['646', 37.472711, 126.460822], ['647', 37.473092, 126.461492], ['648', 37.473806, 126.462728], ['649', 37.474294, 126.463492], ['650', 37.474672, 126.464158], ['651', 37.475050, 126.464828], ['652', 37.475519, 126.465761], ['653', 37.475975, 126.466464], ['654', 37.476353, 126.467133], ['655', 37.476731, 126.467803], ['671', 37.473447, 126.455264], ['672', 37.473828, 126.456042], ['673', 37.474206, 126.456711], ['674', 37.474661, 126.457414], ['675', 37.475039, 126.458186], ['676', 37.475417, 126.458856], ['677', 37.475794, 126.459522], ['678', 37.476781, 126.461272], ['679', 37.477161, 126.461939], ['680', 37.477539, 126.462614], ['681', 37.478086, 126.463478], ['682', 37.478467, 126.464256], ['683', 37.478844, 126.464922]];
    var LANES = L.filter(function (x) { return x.o && x.o.kind === 'lane'; }), ST = [];
    SRC.forEach(function (s) {
      var uv = ll2uv(s[1], s[2]), best = null;
      LANES.forEach(function (ln2) { var a = ln2.p[0], b = ln2.p[1], t = ((uv[0] - a[0]) * (b[0] - a[0]) + (uv[1] - a[1]) * (b[1] - a[1])) / (Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2)); if (t < 0.01 || t > 0.99) return;      /* 유도선 끝을 벗어난 것은 그 줄에 잇지 않음 */
        var q = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t], d = Math.hypot(q[0] - uv[0], q[1] - uv[1]); if (!best || d < best.d) best = { d: d, q: q, hz: a[1] === b[1], ln: ln2 }; });
      if (!best) return;
      var n = +s[0], grp = n < 100 ? 'T1' : n < 200 ? 'CC' : n < 300 ? 'T2' : n < 600 ? 'RM' : 'KC';
      if (best.d < 40 || best.d > 420) return;      /* 유도선 위에 놓였거나 너무 먼 것은 뺌 */
      ST.push({ name: s[0], u: Math.round(uv[0]), v: Math.round(uv[1]), grp: grp, lane: [Math.round(best.q[0]), Math.round(best.q[1])], faces: best.hz ? ['north', 'south'] : ['east', 'west'], faceRec: null });
    });
    /* 같은 유도선 점을 여러 주기장이 쓰면 그물 마디가 겹치므로 10m씩 벌림 */
    var used = {}; L.forEach(function (x) { if (!x.o || x.o.kind !== 'lane') x.p.forEach(function (q) { used[q.join(',')] = 1; }); });
    ST.forEach(function (s) { var k = s.lane.join(','), i = 0, ax = s.faces[0] === 'north' ? 0 : 1, base = s.lane[ax]; while (used[k] && i++ < 40) { s.lane[ax] = base + Math.ceil(i / 2) * 12 * (i % 2 ? 1 : -1); k = s.lane.join(','); } used[k] = 1; });
    ST.forEach(function (s) { ln('STAND', [[s.u, s.v], s.lane], 'stand'); });

    h.mesh(L);

    /* 활주로 위 마디 · 정지선 · 진입 구간 */
    var rwPts = { 1: [], 2: [], 3: [], 4: [] };
    CONN.forEach(function (c) {
      var name = c[0].replace(/^([GLS])1$/, '$1'), rw = c[1], r = N(c.r[0], c.r[1], { rwy: rw }), hp = N(c.h[0], c.h[1], { hold: name, rw: rw }), a = N(c.a[0], c.a[1]);
      E(hp, r, name, { kind: 'entry', rw: rw }); rwPts[rw].push(c.r);
      var mx = (c.h[0] + c.a[0]) / 2, my = (c.h[1] + c.a[1]) / 2, d = unit(c.r, c.a);
      D.holds[name] = { name: name, node: hp, rnode: r, anode: a, u: c.r[0], rw: rw, lu: Math.round(mx - d[1] * 38), lv: Math.round(my + d[0] * 38) };
    });
    function xing(name, rw, u, vr) {      /* 가로지르는 유도로: 활주로 양쪽 정지선 ↔ 활주로 위 마디 */
      var c = N(u, vr, { rwy: rw }), a = N(u, vr - HOLD, { hold: name, rw: rw }), b = N(u, vr + HOLD, { hold: name, rw: rw });
      if (!D.holds[name] || D.holds[name].rw !== rw || D.holds[name].u !== u) E(a, c, name, { kind: 'entry', rw: rw });
      E(c, b, name, { kind: 'entry', rw: rw }); rwPts[rw].push([u, vr]);
    }
    XE.forEach(function (c) { if (c[0] !== 'G' && c[0] !== 'L') xing(c[0], '1', c[1], v1); xing(c[0], '2', c[1], v2); });
    XW.forEach(function (c) { if (c[0] !== 'S') xing(c[0], '3', c[1], v3); });
    Object.keys(rwPts).forEach(function (rw) {
      var e = D.ends[D.rw[rw].a], pts = rwPts[rw].concat([[e.thrU, e.thrV], [D.ends[D.rw[rw].b].thrU, D.ends[D.rw[rw].b].thrV]]), seen = {};
      pts = pts.filter(function (p) { var k = p[0] + ',' + p[1]; if (seen[k]) return false; seen[k] = 1; return true; });
      pts.sort(function (p, q) { return D.rwAlong(e, { u: p[0], v: p[1] }) - D.rwAlong(e, { u: q[0], v: q[1] }); });
      pts.forEach(function (p) { N(p[0], p[1], { rwy: rw }); });
      h.line('RWY', pts, { kind: 'rwy', rw: rw });
    });
    ST.forEach(function (s) {
      var id = N(s.u, s.v, { stand: s.name }), al = Math.abs(s.lane[0] - s.u) > Math.abs(s.lane[1] - s.v);
      D.stands[s.name] = { name: s.name, node: id, lane: s.lane[0] + ',' + s.lane[1], u: s.u, v: s.v, grp: s.grp, intl: true,
        lab: al ? [s.lane[0] > s.u ? -66 : 66, 0] : [0, s.lane[1] > s.v ? -52 : 52], faces: s.faces, faceRec: s.faceRec };
    });
    /* 탈출 · 이륙 대기 지점(착륙 방향으로 가까운 것부터) */
    var EX = { '33R': ['C5', 'C6', 'C7', 'C8'], '15L': ['C4', 'C3', 'C2', 'C1'], '34L': ['P7', 'P8', 'P10', 'P11', 'P12', 'P13'], '16R': ['P6', 'P5', 'P4', 'P2', 'P1'],
      '33L': ['B4', 'B5', 'B6', 'L'], '15R': ['B3', 'B2', 'B1', 'G'], '34R': ['N4', 'N5', 'N6', 'N7'], '16L': ['N3', 'N2', 'N1', 'S'] };
    var HO = { '33L': ['G', 'B1'], '15R': ['L', 'B6'], '34R': ['S', 'N1'], '16L': ['N7', 'N6'], '33R': ['D1', 'C1'], '15L': ['D4', 'C8'], '34L': ['P1'], '16R': ['P13', 'P12'] };
    Object.keys(D.ends).forEach(function (k) { D.ends[k].exits = EX[k]; D.ends[k].holds = HO[k]; });

    D.gLabels = [['A', -900, vA], ['A', 400, vA], ['A', 1650, vA], ['B', -900, vB], ['B', 400, vB], ['C', -900, vC], ['C', 500, vC], ['D', -900, vD], ['D', 500, vD], ['M', -900, vM], ['M', 400, vM], ['M', 1650, vM], ['N', -900, vN], ['N', 400, vN], ['P', -1300, vP], ['P', 1500, vP],
      ['R1', -700, vR1], ['R1', 900, vR1], ['R4', -700, vR4], ['R4', 900, vR4], ['R7', 1253, 0], ['R8', 1152, 300], ['R9', 738, 0], ['R10', 647, 300], ['R11', 37, 300], ['R12', -40, 0], ['R17', -1510, 100], ['RG', 336, 0],
      ['L', -1850, 1140], ['K', -1208, 1140], ['E', 2, 1140], ['J', 1202, 1140], ['G', 1852, 1140], ['V', -1512, -1160], ['U', -1208, -1160], ['W', 2, -1160], ['T', 1208, -1160], ['S', 1853, -1160]];
    D.guide = { u1: -2600, u2: 2400, v1: -1700, v2: 3100 };
    D.geoCol = { land: '#585c56', sea: '#48575b' };
    D.view = { cu: -50, cv: 100, w: 5200, h: 3900 };
    /* 지상 바탕 사진: Sentinel-2 L2A(2026-10-08, 타일 52SBG) — AWS 공개 COG의 B04 · B03 · B02(10m)를 지상 좌표 격자(7m, 영종도 전체 약 17 × 16km)로 다시 뽑음(tools/rksi_sat.py). 코페르니쿠스 자료는 무료 공개(상업 이용 가능, 출처 표시) */
    D.sat = { img: 'assets/img/ground_sat_rksi.webp', u1: -8600, u2: 8600, v1: -8000, v2: 8000, edge: '#35504f', credit: 'Contains modified Copernicus Sentinel data 2026 (Sentinel-2, 8 Oct 2026)' };
    D.areas = [
      { label: ATC.T('동쪽 활주로(15 · 33)'), box: [-2000, 620, 2000, 1760] }, { label: ATC.T('서쪽 활주로(16 · 34)'), box: [-2250, -1560, 2000, -640] },
      { label: ATC.T('1터미널 · 탑승동'), box: [550, -700, 2150, 700] }, { label: ATC.T('2터미널'), box: [-1650, -700, 450, 700] }, { label: ATC.T('화물 계류장'), box: [-400, 1560, 1400, 3050] }
    ];
    D.lobby = 'assets/img/lobby.webp';
    /* 바탕 그림이 없을 때 그리는 계류장 · 건물(자리만 — 모양은 간추림) */
    D.decor = function (rect, C) {
      rect(-1700, vR4, 1900, vR1, C.apron); rect(-300, vD + 60, 300, 3000, C.apron); rect(900, vD + 60, 1250, 3000, C.apron);
      rect(1560, -420, 2000, 420, C.bld); rect(1620, -360, 1940, 360, C.bld2);       /* 제1여객터미널 */
      rect(860, -470, 920, 480, C.bld);                                               /* 탑승동 */
      rect(-1330, -430, -330, 430, C.bld); rect(-1270, -370, -390, 370, C.bld2);     /* 제2여객터미널 */
      rect(-120, 1900, 120, 2950, '#6a7178'); rect(1020, 1900, 1070, 2950, '#6a7178');
    };
    return h;
  };
  ATC.AIRPORT_DEFS.RKSI.title = ATC.pick({ ko: '인천국제공항(AIP 바탕 · 학습용)', ja: '仁川国際空港(AIPに基づく学習用)', en: 'Incheon Intl (AIP-based, for study)' });
  /* 시험판 표시는 GPT 19차 반영(56차)으로 뗌 */      /* 52차부터 사이트판에 공개 — GPT ATC-19차 검수 전이라 로비에 「시험판」 표시(검수 반영 뒤 이 줄을 지움) */
})(typeof globalThis !== 'undefined' ? globalThis : this);
