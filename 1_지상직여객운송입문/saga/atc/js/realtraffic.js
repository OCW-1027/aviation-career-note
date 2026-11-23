/* AIRLINE SAGA — ATC 「실제 교통 근무」: GitHub Actions(atc-traffic)가 15분마다 adsb.lol(ODbL)에서 받아 둔 교통으로 근무를 시작
   데이터: https://raw.githubusercontent.com/OCW-1027/aviation-career-note/traffic-data/<공항>.json (CORS *, 5분 캐시)
   형식: {apt, t(유닉스 초), src, ac: [[hex, 편명, 기종, 등록부호, 위도, 경도, 고도 ft 또는 'g', 대지속도 kt, 진행 방향°(진북), 상승률 ft/분, 스쿼크]]}
   받은 기체 → 게임 항공기(위치 · 고도 · 기수 · 편명 · 기종 그대로). 그 뒤로는 평소 근무와 같음(지시를 받으면 게임 속에서 움직임) */
(function (G) {
  'use strict';
  var ATC = G.ATC, U = ATC.U;
  var RT = ATC.RT = {};
  RT.BASE = 'https://raw.githubusercontent.com/OCW-1027/aviation-career-note/traffic-data/';
  RT.KINDS = ['', 'am', 'noon', 'pm'];      /* '' = 최근(15분 안), am · noon · pm = 현지 07:30 · 12:00 · 18:00 무렵 기록 */
  RT.MAXAGE = { '': 3 * 3600, am: 30 * 3600, noon: 30 * 3600, pm: 30 * 3600 };      /* 이보다 오래된 자료는 「오래됨」으로 알림(그래도 씀) */
  RT.base = function () { var S = G.ATC_SITE, q = /[?&]rt=([^&]+)/.exec((G.location && G.location.search) || ''); return q ? decodeURIComponent(q[1]) : (S && S.traffic) || RT.BASE; };
  RT.sqOk = function (q) { return /^[0-7]{4}$/.test(q) && !/^(7500|7600|7700|0000|1200|2000|7000)$/.test(q); };      /* 실제 비상 · 통신두절 · 불법간섭 · 미지정 코드는 그대로 쓰지 않음(게임의 비상 처리와 섞이지 않게) */
  RT.url = function (apt, k) { return RT.base() + apt.toLowerCase() + (k ? '_' + k : '') + '.json'; };
  var CK = 'atc_rt_';      /* 마지막으로 받은 자료(받기 실패 때 씀) */
  RT.ok = function (d) { return !!(d && d.ac && d.ac.length !== undefined && d.t > 1.6e9); };
  /* 받기: cb(자료 | null, 'net' | 'cache' | 'none') — 8초 넘으면 마지막 자료로 */
  RT.load = function (apt, k, cb) {
    var key = CK + apt + (k || ''), done = false, tm;
    function fin(d, how) { if (done) return; done = true; clearTimeout(tm); cb(d, how); }
    function cache() { try { var s = G.localStorage && G.localStorage.getItem(key); var d = s ? JSON.parse(s) : null; fin(RT.ok(d) ? d : null, RT.ok(d) ? 'cache' : 'none'); } catch (e) { fin(null, 'none'); } }
    if (typeof G.fetch !== 'function') return cache();
    tm = setTimeout(cache, 8000);
    G.fetch(RT.url(apt, k), { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.text(); })      /* raw.githubusercontent는 text/plain으로 줌 */
      .then(function (s) { var d = JSON.parse(s); if (!RT.ok(d)) throw new Error('bad'); try { G.localStorage && G.localStorage.setItem(key, s); } catch (e) { } fin(d, 'net'); })
      .catch(cache);
  };
  /* 기종: 게임 표(D.types)에 없는 것은 가까운 기종으로 */
  var TMAP = { A35K: 'A359', A350: 'A359', A339: 'A333', A332: 'A333', A338: 'A333', A21N: 'A321', A20N: 'A320', A319: 'A320', A19N: 'A320', B38M: 'B738', B39M: 'B738', B739: 'B738', B37M: 'B737', B736: 'B737', B788: 'B789', B78X: 'B789', B772: 'B77W', B773: 'B77W', B77L: 'B77W', B744: 'B77W', B748: 'B77W', B762: 'B763', B764: 'B763', B752: 'B763', B753: 'B763', A388: 'B77W', A346: 'B77W', A343: 'B77W', E190: 'A320', E195: 'A320', E290: 'A320', E75L: 'A320', CRJ9: 'A320', DH8C: 'DH8D', AT75: 'AT76', AT72: 'AT76' };
  function typeOf(t, al) { var D = ATC.D; if (D.types[t]) return t; if (TMAP[t] && D.types[TMAP[t]]) return TMAP[t]; return (al.types || ['A320'])[0]; }
  /* 진북 기준 진행 방향 → 레이더 좌표의 기수(공항 묶음의 위경도 변환으로 맞춤) */
  function hdgOf(la, lo, trk) { var D = ATC.D, a = D.ll2xy(la, lo), r = trk * Math.PI / 180, b = D.ll2xy(la + Math.cos(r) * 0.02, lo + Math.sin(r) * 0.02 / Math.cos(la * Math.PI / 180)); return U.n360(Math.round(U.brg(a, b))) || 360; }
  /* 자료 → 쓸 수 있는 항공기(편명이 항공사 3자 + 숫자 · 공중 · 게임 항공사 표에 있는 것). 반환: {list, skip: {why: 수}} */
  /* 실제 교통 근무 전용 항공사(게임 항공사 표에 없는 곳) — ICAO 3자 부호 : [무선 호출 이름, 이름]. 게임 표에 있는 부호가 먼저.
     아시아나(AAR)와 자회사(ABL · ASV)는 사용자 결정(11/19)으로 넣지 않음. 호출 이름은 FAA JO 7340.2R(2026-10-29) · N JO 7340.942로 GPT ATC-20차 확인(필수 6 반영: TWB SONOROUS · AIH QUANTUM SKY · ESR EASTARJET · VJC VIETJETAIR · CEB CEBU AIR · HAL → ASA ALASKA, 추가 8).
     HAL/HAWAIIAN은 2025-10-30부터 쓰지 않아 넣지 않음(실제 자료의 HAL 부호를 ASA로 바꿔 읽지도 않음 — 뺌). JAPAN AIR · NEW SKY · KOREAN AIR는 공식 철자에 공백이 없지만(JAPANAIR 등) 읽는 소리는 같아 게임 표와 같은 표기 유지 */
  RT.EXTRA = {
    ANA: ['ALL NIPPON', 'All Nippon Airways'], JAL: ['JAPAN AIR', 'Japan Airlines'], APJ: ['AIR PEACH', 'Peach Aviation'], JJP: ['ORANGE LINER', 'Jetstar Japan'], SKY: ['SKYMARK', 'Skymark Airlines'],
    ADO: ['AIR DO', 'AIRDO'], SNJ: ['NEW SKY', 'Solaseed Air'], SFJ: ['STARFLYER', 'StarFlyer'], JTA: ['JAI OCEAN', 'Japan Transocean Air'], IBX: ['IBEX', 'IBEX Airlines'], FDA: ['FUJI DREAM', 'Fuji Dream Airlines'],
    JAC: ['COMMUTER', 'Japan Air Commuter'], TZP: ['ZIPPY', 'ZIPAIR Tokyo'], NCA: ['NIPPON CARGO', 'Nippon Cargo Airlines'],
    KAL: ['KOREAN AIR', 'Korean Air'], JJA: ['JEJU AIR', 'Jeju Air'], JNA: ['JIN AIR', 'Jin Air'], TWB: ['SONOROUS', 'Trinity Airways'], ESR: ['EASTARJET', 'Eastar Jet'], APZ: ['AIR PREMIA', 'Air Premia'], AIH: ['QUANTUM SKY', 'AirZeta'],
    CAL: ['DYNASTY', 'China Airlines'], EVA: ['EVA', 'EVA Air'], SJX: ['STARWALKER', 'STARLUX Airlines'], TTW: ['SMART CAT', 'Tigerair Taiwan'], CPA: ['CATHAY', 'Cathay Pacific'], HKE: ['HONGKONG SHUTTLE', 'HK Express'],
    CRK: ['BAUHINIA', 'Hong Kong Airlines'], AMU: ['AIR MACAU', 'Air Macau'], CCA: ['AIR CHINA', 'Air China'], CES: ['CHINA EASTERN', 'China Eastern Airlines'], CSN: ['CHINA SOUTHERN', 'China Southern Airlines'],
    CXA: ['XIAMEN AIR', 'XiamenAir'], CHH: ['HAINAN', 'Hainan Airlines'], CSZ: ['SHENZHEN AIR', 'Shenzhen Airlines'], CDG: ['SHANDONG', 'Shandong Airlines'], CQH: ['AIR SPRING', 'Spring Airlines'],
    MGL: ['MONGOL AIR', 'MIAT Mongolian Airlines'], HVN: ['VIET NAM AIRLINES', 'Vietnam Airlines'], VJC: ['VIETJETAIR', 'VietJet Air'], PAL: ['PHILIPPINE', 'Philippine Airlines'], CEB: ['CEBU AIR', 'Cebu Pacific'],
    THA: ['THAI', 'Thai Airways'], MAS: ['MALAYSIAN', 'Malaysia Airlines'], SIA: ['SINGAPORE', 'Singapore Airlines'], TGW: ['SCOOTER', 'Scoot'], GIA: ['INDONESIA', 'Garuda Indonesia'], XAX: ['XANADU', 'AirAsia X'],
    AIC: ['AIRINDIA', 'Air India'], UZB: ['UZBEK', 'Uzbekistan Airways'], QFA: ['QANTAS', 'Qantas'], JST: ['JETSTAR', 'Jetstar Airways'], ANZ: ['NEW ZEALAND', 'Air New Zealand'],
    UAE: ['EMIRATES', 'Emirates'], QTR: ['QATARI', 'Qatar Airways'], ETD: ['ETIHAD', 'Etihad Airways'], THY: ['TURKISH', 'Turkish Airlines'], ETH: ['ETHIOPIAN', 'Ethiopian Airlines'],
    DLH: ['LUFTHANSA', 'Lufthansa'], AFR: ['AIRFRANS', 'Air France'], KLM: ['KLM', 'KLM Royal Dutch Airlines'], BAW: ['SPEEDBIRD', 'British Airways'], FIN: ['FINNAIR', 'Finnair'], SWR: ['SWISS', 'Swiss International Air Lines'],
    AUA: ['AUSTRIAN', 'Austrian Airlines'], SAS: ['SCANDINAVIAN', 'Scandinavian Airlines'], UAL: ['UNITED', 'United Airlines'], DAL: ['DELTA', 'Delta Air Lines'], AAL: ['AMERICAN', 'American Airlines'],
    ASA: ['ALASKA', 'Alaska Airlines'], ACA: ['AIR CANADA', 'Air Canada'], FDX: ['FEDEX', 'FedEx Express'], UPS: ['UPS', 'UPS Airlines'], GTI: ['GIANT', 'Atlas Air'], PAC: ['POLAR', 'Polar Air Cargo'],
    CKS: ['CONNIE', 'Kalitta Air'], ABX: ['ABEX', 'ABX Air'], CLX: ['CARGOLUX', 'Cargolux'],
    EOK: ['AEROHANGUK', 'Aero K'], CSH: ['SHANGHAI AIR', 'Shanghai Airlines'], AXM: ['RED CAP', 'AirAsia'], CKK: ['CARGO KING', 'China Cargo Airlines'], AHK: ['AIR HONG KONG', 'Air Hong Kong'],
    VIR: ['VIRGIN', 'Virgin Atlantic'], ITY: ['ITARROW', 'ITA Airways']
  };
  RT.CARGO = { CKK: 1, AHK: 1, NCA: 1, AIH: 1, FDX: 1, UPS: 1, GTI: 1, PAC: 1, CKS: 1, ABX: 1, CLX: 1 };
  RT.JPN = { ANA: 1, JAL: 1, APJ: 1, JJP: 1, SKY: 1, ADO: 1, SNJ: 1, SFJ: 1, JTA: 1, IBX: 1, FDA: 1, JAC: 1, TZP: 1, NCA: 1 };
  var XAL = {};
  /* 게임 표에 없는 실제 항공사 → 근무 동안만 쓰는 항공사 정보(가상 항공사처럼 돌발 상황이 걸리지 않게 real 표시, 노선 제한 없음) */
  RT.extraAl = function (code) {
    if (!RT.EXTRA[code]) return null;
    if (!XAL[code]) { var e = RT.EXTRA[code]; XAL[code] = { code: code, cs: e[0], name: e[1], col: '#8a96a8', col2: '#d8dde5', types: RT.CARGO[code] ? ['B77W'] : ['A320'], w: 0, real: true, extra: true, cargo: !!RT.CARGO[code], flights: [], scope: RT.JPN[code] ? (code === 'TZP' ? 'I' : undefined) : 'I' }; }      /* 일본 밖 항공사는 국제선만(하네다 국내선 목적지로 배정되지 않게) */
    return XAL[code];
  };
  /* 음성 녹음 대상(이 공항의 게임 표에 없는 것만) */
  RT.extraCs = function () { var D = ATC.D; return Object.keys(RT.EXTRA).filter(function (k) { return !D.alBy[k]; }).map(function (k) { return RT.EXTRA[k][0]; }); };
  RT.parse = function (d) {
    var D = ATC.D, out = [], gnd = [], skip = { noCs: 0, ground: 0, unknownAl: 0 }, seen = {};
    (d.ac || []).forEach(function (r) {
      var cs = String(r[1] || '').toUpperCase().replace(/\s+/g, ''), m = /^([A-Z]{3})0*(\d{1,4}[A-Z]?)$/.exec(cs);
      if (!m || !r[2] || /^TEST/.test(cs)) { skip.noCs++; return; }      /* 편명 없음 · TEST · 지상 차량(기종 없음) */
      var onG = r[6] === 'g' || r[6] === null || r[6] === undefined;
      var al = D.alBy[m[1]]; if (al && !al.real) al = null; al = al || RT.extraAl(m[1]);      /* 부호가 게임의 가상 항공사와 같으면 그 이름을 쓰지 않음(실제로는 다른 회사) */ if (!al || !/^\d+$/.test(m[2])) { skip.unknownAl++; return; }      /* 게임 항공사 표 → 실제 교통 전용 표(RT.EXTRA) 순. 둘 다 없으면 뺌 */
      if (seen[al.code + m[2]]) return; seen[al.code + m[2]] = 1;
      if (onG) { skip.ground++; gnd.push({ hex: r[0], al: al, code: al.code, num: m[2], cs: al.code + m[2], t: r[2], gs: r[7] || 0 }); return; }      /* 지상 기체: 접근관제에서는 빼고, 관제탑 · 지상 근무에서 출발편으로 씀 */
      var p = D.ll2xy(r[4], r[5]);
      out.push({ hex: r[0], al: al, code: al.code, num: m[2], cs: al.code + m[2], t: r[2], reg: r[3], x: p.x, y: p.y, alt: +r[6], gs: r[7] || 250, hdg: r[8] === null || r[8] === undefined ? null : hdgOf(r[4], r[5], r[8]), vr: r[9] || 0, sq: r[10] || '' });
    });
    return { list: out, gnd: gnd, skip: skip };
  };
  /* 운용 방향: 공항 가까이 낮게 나는 기체가 어느 활주로 쪽으로 가는지로 */
  RT.flowOf = function (list) {
    var D = ATC.D, sc = {};
    list.forEach(function (a) {
      if (a.hdg === null || a.alt > 6000 || U.dist(a, D.center) > 22) return;
      Object.keys(D.flows).forEach(function (k) {
        var f = D.flows[k], rs = (a.vr <= 0 ? (f.arrs || [f.arr]) : (f.deps || [f.dep]));
        rs.forEach(function (r) { var e = D.ends[r]; if (e && Math.abs(U.adiff(e.crs, a.hdg)) < 25) sc[k] = (sc[k] || 0) + 1; });
      });
    });
    var best = null; Object.keys(sc).forEach(function (k) { if (!best || sc[k] > sc[best]) best = k; }); return best;
  };
  function segD(p, a, b) { var dx = b.x - a.x, dy = b.y - a.y, t = U.clamp(((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy || 1), 0, 1); return Math.hypot(p.x - a.x - dx * t, p.y - a.y - dy * t); }
  /* 경로 가운데 이 기체가 지금 가는 구간(가까움 + 방향이 맞음) → {i: 다음 지점 번호, d: 점수} */
  function joinRoute(a, route) {
    var D = ATC.D, best = null, i, f0, f1, s;
    for (i = 0; i < route.length - 1; i++) {
      f0 = D.fix[route[i]]; f1 = D.fix[route[i + 1]]; if (!f0 || !f1) continue;
      s = segD(a, f0, f1) + (a.hdg === null ? 0 : Math.abs(U.adiff(U.brg(f0, f1), a.hdg)) / 15);
      if (!best || s < best.d) best = { i: i + 1, d: s };
    }
    return best;
  }
  /* 근무에 넣기: AppSim이 만들어진 뒤 부름. 들어간 수 · 사정 문구를 돌려줌 */
  RT.apply = function (sim, d) {
    var D = ATC.D, P = RT.parse(d), arr = 0, dep = 0, other = 0, self = sim, AF = sim.arrFlow || sim.flow;
    var nCall = 0;      /* 첫 호출은 8초씩 나눠서 — 한꺼번에 부르면 혼신이 나 시작하자마자 감점 */
    function firstCall(ac, fn) { var k = nCall++; if (!k) return fn(); sim.later(k * 8, function () { if (sim.acs.indexOf(ac) >= 0) fn(); }); }
    P.list.forEach(function (a) {
      if (a.hdg === null) { other++; return; }
      var dc = U.dist(a, D.center), tow = Math.abs(U.adiff(U.brg(a, D.center), a.hdg)) < 70, out = D.tmaPoly ? !U.inPoly(a, D.tmaPoly) : dc > D.tmaR;
      if (out && dc > (D.tmaR || 60) + 15) { other++; return; }
      var type = typeOf(a.t, a.al), perf = D.types[type], ac, ralt = Math.max(1000, Math.round(a.alt / 1000) * 1000);      /* 고도는 1,000ft 단위로 맞춤(실제 7,100 · 4,700 → 7,000 · 5,000 — 첫 호출 음성이 녹음 조각으로 이어지게) */
      if (tow && dc > 8 && a.alt < 24000 && (a.vr < 300 || a.alt < 12000)) {      /* 도착: 공항 쪽으로 내려오는 기체 */
        var gb = null; (sim.gates || Object.keys(D.star[AF.id])).forEach(function (g) { var j = joinRoute(a, D.star[AF.id][g]); if (j && (!gb || j.d < gb.d)) gb = { g: g, i: j.i, d: j.d }; });
        if (!gb || gb.d > 25) { other++; return; }
        if ((dc < 14 && a.alt < 4500) || (sim.mvaAt && ralt < sim.mvaAt(a) - 150)) { other++; return; }      /* 이미 낮게 최종 접근 중 · MVA 밑 — 관제탑 쪽 기체(시작하자마자 피할 수 없는 감점 막기) */
        var RW = sim.rwys, by = AF.arrBy, rwy = by && RW.indexOf(by[gb.g]) >= 0 ? by[gb.g] : (RW.indexOf(AF.arr) >= 0 ? AF.arr : RW[0]), route = D.star[AF.id][gb.g], og = ATC.odPick(sim.rng, a.al, D.gateOrig[gb.g]);
        var ias = U.clamp(Math.round((a.alt < 10000 ? Math.min(a.gs, 250) : Math.min(a.gs * 0.8, 300)) / 10) * 10, perf.vapp + 30, 300);
        ac = sim.spawnAc({ cs: a.cs, csWord: a.al.cs, num: a.num, al: a.al, type: type, wake: perf.wake, perf: perf, x: a.x, y: a.y, alt: ralt, hdg: a.hdg, ias: ias, normIas: Math.min(ias, 250),
          kind: 'arr', gate: gb.g, orig: og[0], origName: og[1], dest: D.airport.icao, fpRoute: route, squawk: RT.sqOk(a.sq) ? a.sq : sim.squawk(), rwy: rwy, owner: 'me', entT: sim.t, real: a.hex, realT: a.t });
        ac.setRoute(route.slice(gb.i));
        if (D.starName) ac.star = D.starName[AF.id][gb.g];
        firstCall(ac, function () { sim.checkIn(ac); }); arr++;
      } else if (!tow && a.vr > 300 && dc < 45 && a.alt < 20000) {      /* 출발: 공항에서 멀어지며 올라가는 기체 */
        var gs = ATC.depGates(sim.flow), bg = null; gs.forEach(function (g) { var f = D.fix[g]; if (!f) return; var e = Math.abs(U.adiff(U.brg(D.center, f), U.brg(D.center, a))); if (!bg || e < bg.e) bg = { g: g, e: e }; });
        if (!bg || bg.e > 60 || a.alt > 13000 || (sim.mvaAt && ralt < sim.mvaAt(a) - 150) || (ATC.AppSim.depRem && ATC.AppSim.depRem({ x: a.x, y: a.y, gate: bg.g }) < 8)) { other++; return; }      /* 곧 지역관제로 넘어갈 기체는 뺌 */
        var drw = D.depRwyFor ? D.depRwyFor(sim.flow, bg.g) : sim.flow.dep, fr = D.sidRoute ? D.sidRoute(drw, bg.g, sim) : [bg.g], jn = joinRoute(a, fr.length > 1 ? fr : ['_c', bg.g]) || { i: 0 }, dg = ATC.odPick(sim.rng, a.al, D.gateDest[bg.g]);
        var east = D.gateEast && D.gateEast[bg.g], rfl = (east ? 350 : 360) * 100; if (perf.ceil < rfl) rfl = 24000;
        var tAlt = ralt < (D.sidInit || 7000) - 300 ? (D.sidInit || 7000) : Math.min(13000, ralt + 2000);
        ac = sim.spawnAc({ cs: a.cs, csWord: a.al.cs, num: a.num, al: a.al, type: type, wake: perf.wake, perf: perf, x: a.x, y: a.y, alt: ralt, hdg: a.hdg, ias: 250, tIas: 250, normIas: 250, tAlt: tAlt,
          kind: 'dep', gate: bg.g, dest: dg[0], destName: dg[1], orig: D.airport.icao, fpRoute: fr, squawk: RT.sqOk(a.sq) ? a.sq : sim.squawk(), rwy: drw, owner: 'me', rfl: rfl, entT: sim.t, sidT: sim.t, real: a.hex, realT: a.t });
        if (fr.length > 1) ac.setRoute(fr.slice(Math.max(1, jn.i)));
        ac.sid = D.sidName ? D.sidName(bg.g, sim) : bg.g;
        firstCall(ac, function () { sim.say(ac, D.freq.DEP.n + ', ' + ac.csWord + ' ' + ac.num + ', passing ' + ATC.fmt.alt(Math.max(1000, Math.round(ac.alt / 1000) * 1000)) + ', climbing ' + ATC.fmt.alt(ac.tAlt || tAlt) + '.'); });
        dep++;
      } else { other++; return; }
      sim.usedCs[ac.cs] = 1;
    });
    /* 게임이 만들 교통은 그만큼 줄이고 조금 뒤로 — 처음 몇 분은 실제 교통이 중심 */
    var na = arr, nd = dep;
    sim.sched = sim.sched.filter(function (s) { if (s.kind === 'arr' && na > 0) { na--; return false; } if (s.kind === 'dep' && nd > 0) { nd--; return false; } return true; });
    sim.sched.forEach(function (s) { s.t += 120; s.warm = false; });
    if (sim.sched.length) sim.endT = sim.sched[sim.sched.length - 1].t;
    sim.real = { t: d.t, apt: d.apt, arr: arr, dep: dep, other: other, skip: P.skip, src: d.src || 'ADSB.lol' };
    return sim.real;
  };
  /* 자료 시각(현지) 글: 「11월 23일 08:15(현지)」 */
  /* 관제탑 · 지상 근무: 실제 기체를 게임의 예정 편에 끼워 넣음.
     도착 = 공항으로 내려오는 실제 기체(거리 · 속도로 결승 진입 시각을 계산) · 출발 = 지상의 실제 기체(지상 이동 중인 기체 먼저, 그다음 주기장에 선 기체).
     지상 그림은 실제 축척이 아니라 주기장은 실제 자리가 아니라 그 항공사의 터미널에서 고름(게임 배정) */
  RT.applyGround = function (sim, d) {
    var D = ATC.D, P = RT.parse(d), spawnD = sim.mode === 'TWR' ? 10 : 9, arrs = [], deps = [], other = 0;
    function flightOf(a) { var type = typeOf(a.t, a.al); return { cs: a.cs, csWord: a.al.cs, num: String(a.num), al: a.al, type: type, wake: D.types[type].wake, perf: D.types[type], rt: true }; }
    P.list.forEach(function (a) {
      var dc = U.dist(a, D.center), toC = U.brg(a, D.center);
      if (a.hdg !== null && dc > 2 && dc < 45 && a.alt < 16000 && a.vr <= 300 && Math.abs(U.adiff(a.hdg, toC)) < 70) arrs.push({ a: a, t: Math.max(4, Math.min(1500, (dc - spawnD) * 3600 / Math.max(150, a.gs))) });
      else other++;
    });
    P.gnd.forEach(function (g) { if (g.gs <= 35 && !g.al.ga) deps.push(g); else other++; });      /* 활주 중(35kt 넘음)은 이륙 · 착륙 굴림 — 뺌 */
    arrs.sort(function (x, y) { return x.t - y.t; });
    deps.sort(function (x, y) { return (y.gs >= 3) - (x.gs >= 3); });
    var sa = sim.sched.filter(function (s) { return s.kind === 'arr' && !s.f && !s.emg; }).sort(function (x, y) { return x.t - y.t; });
    var sd = sim.sched.filter(function (s) { return s.kind === 'dep' && !s.f; }).sort(function (x, y) { return x.t - y.t; });
    var na = Math.min(arrs.length, sa.length), nd = Math.min(deps.length, sd.length), i, gap = sim.mode === 'TWR' ? 80 : 50, last = -999;
    for (i = 0; i < na; i++) { last = Math.max(arrs[i].t, last + 110); sa[i].f = flightOf(arrs[i].a); sa[i].t = last; sa[i].rt = 1; sa[i].cargo = false; sim.usedCs[sa[i].f.cs] = 1; }      /* 결승 진입 간격은 2분 가까이 벌림(실제 자료는 몇 대가 한꺼번에 몰려 있을 수 있음) */
    for (i = 0; i < nd; i++) { sd[i].f = flightOf(deps[i]); sd[i].t = 6 + i * gap; sd[i].rt = 1; sd[i].cargo = false; sim.usedCs[sd[i].f.cs] = 1; }
    other += (arrs.length - na) + (deps.length - nd);
    sim.sched.sort(function (x, y) { return x.t - y.t; });
    sim.endT = Math.max(sim.endT || 0, sim.sched.length ? sim.sched[sim.sched.length - 1].t : 0);
    if (!sim.rtWrap) { sim.rtWrap = true; var sp = sim.spawn; sim.spawn = function (s) { var ac = sp.call(this, s); if (ac && s.rt) ac.real = true; return ac; }; }
    sim.real = { t: d.t, arr: na, dep: nd };
    return { arr: na, dep: nd, other: other, skip: P.skip, t: d.t };
  };
  RT.when = function (t) { var D = ATC.D, z = new Date((t + (D.tz !== undefined ? D.tz : 9) * 3600) * 1000); return ATC.T('{0}월 {1}일 {2}:{3}(현지)', z.getUTCMonth() + 1, z.getUTCDate(), U.pad(z.getUTCHours(), 2), U.pad(z.getUTCMinutes(), 2)); };
})(typeof window !== 'undefined' ? window : globalThis);
