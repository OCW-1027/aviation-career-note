/* AIRLINE SAGA — ATC 자동 관제사(AI): 조종사 체험 모드에서 관제를 맡음.
   test/bots.js(시험용 자동 관제 봇)를 브라우저용으로 옮긴 것 — test/bots.js를 고치면 python3 tools/aictl_build.py로 다시 만듦 */
(function () {
  var ATC = window.ATC, D = ATC.D, U = ATC.U; const NM = 1852;
function gbot(sim) {
  for (const a of sim.acs) { if (a.owner !== 'me' || sim.t - (a.botT || -99) < 40) continue;
    if (a.st === 'reqpush') { a.botT = sim.t; sim.command(a, [{ k: 'push' }], { noErr: true }); }
    else if (a.st === 'reqtaxi') { const tg = (a.kind === 'dep' && !a.tech) ? { hp: sim.holdsFor(a)[0] } : { stand: a.stand }; const r = sim.routeOptions(a, tg)[0]; if (!r) continue; a.botT = sim.t;
      sim.command(a, [Object.assign({ k: 'taxi', via: r.via, nodes: r.nodes, len: r.len, rwy: a.rwy }, tg)], { noErr: true }); }
    else if (a.st === 'athold' && a.holdKind === 'dep') { a.botT = sim.t; sim.command(a, [{ k: 'ho', to: 'TWR' }], { noErr: true }); }
    else if (a.st === 'athold' && a.holdKind === 'cross') { const arr = sim.nextArr(a.holdRw); if (sim.reqCross && !sim.crossOk(a)) { sim.reqCross(a); continue; } if (a.pilotMe ? sim.crossClear(a, 3) : (!sim.rwyBusy(a.holdRw, a) && (!arr || arr.d > 2.6 * NM))) { a.botT = sim.t; sim.command(a, [{ k: 'cross', rwy: sim.flow.use[a.holdRw] }], { noErr: true }); } }
  }
}
function tbot(sim) {
  for (const a of sim.acs) { if (a.owner !== 'me' || sim.t - (a.botT || -99) < 25) continue;
    const e = D.ends[a.rwy], rw = e.rw, arr = sim.nextArr(rw), busy = sim.rwyBusy(rw, a), closed = sim.rwClosed[rw] > sim.t;
    if (a.st === 'final') { if (closed && a.d < 2.5 * NM && !a.emg) { a.botT = sim.t; sim.command(a, [{ k: 'ga' }], { noErr: true }); } else if (!a.clr && a.d < 5 * NM && !closed && (!busy || busy.st === 'roll')) { a.botT = sim.t; sim.command(a, [{ k: 'ctl', rwy: a.rwy }], { noErr: true }); } }
    else if (a.st === 'athold' && a.holdKind === 'dep') { if (!closed && !busy && (!arr || arr.d > (sim.lvp ? 5.8 : 4.6) * NM) && sim.wakeGap(a, rw) <= 0 && !sim.crossTraffic(rw, a)) { a.botT = sim.t; if (!sim.relOk || sim.relOk(a)) sim.command(a, [{ k: 'cto', rwy: a.rwy }], { noErr: true }); }
      else if (a.pilotMe && !closed && (!busy || (busy.kind === 'dep' && (busy.st === 'roll' || busy.st === 'air'))) && (!arr || arr.d > 6 * NM) && !sim.crossTraffic(rw, a)) { a.botT = sim.t; sim.command(a, [{ k: 'luaw', rwy: a.rwy }], { noErr: true }); } }      /* 조종사 체험 출발편: 앞 출발기가 뜨는 동안 「line up and wait」 */
    else if (a.st === 'linedup' && !a.cto) { if (!sim.crossTraffic(rw, a) && (!a.pilotMe || (!busy && sim.wakeGap(a, rw) <= 0 && (!arr || arr.d > 3.5 * NM)))) { a.botT = sim.t; if (!sim.relOk || sim.relOk(a)) sim.command(a, [{ k: 'cto', rwy: a.rwy }], { noErr: true }); } }
    else if (a.st === 'air') { a.botT = sim.t; sim.command(a, [{ k: 'ho', to: a.goAround ? 'APP' : 'DEP' }], { noErr: true }); }
    else if (a.st === 'reqtaxi') { a.botT = sim.t; sim.command(a, [{ k: 'ho', to: 'GND' }], { noErr: true }); }
    else if (a.st === 'athold' && a.holdKind === 'cross') { const ar = sim.nextArr(a.holdRw); if (!(sim.rwClosed[a.holdRw] > sim.t) && !sim.rwyBusy(a.holdRw, a) && (!ar || ar.d > 2.6 * NM)) { a.botT = sim.t; sim.command(a, [{ k: 'cross', rwy: sim.endOf(a.holdRw) }], { noErr: true }); } }
  }
}
// 저시정(LVP): 같은 ILS에 6NM 간격 — 이미 보낸 항공기들과 남은 거리 차가 충분해야 다음을 보냄. 못 보내는 동안은 STAR 위 지점에서 고도를 달리해 체공, 복행기가 우선
function lvpPath(a, e, i0) { const r = a.fpRoute; let d = 0, p = a; for (let i = i0; i < r.length; i++) { d += U.dist(p, D.fix[r[i]]); p = D.fix[r[i]]; } const lf = D.fix[r[r.length - 1]]; return d + Math.max(ATC.ilsGeom(lf, e).d, 5) + (lf.k === 'if' ? 0 : 3); }
function lvpRem(a, e) { if (a.appr && a.appr.loc) return a.appr.d; const g = ATC.ilsGeom(a, e); if (a.nav.mode === 'route' && !a.botBase) return lvpPath(a, e, Math.max(0, a.fpRoute.indexOf(a.nav.route[a.nav.i]))); return Math.max(g.d, 4) + Math.abs(g.xtk); }
function lvpClear(sim, a, dNew) { return sim.acs.every(x => x === a || x.rwy !== a.rwy || !x.botSeq || x.onGround || Math.abs(dNew - lvpRem(x, D.ends[x.rwy])) >= 8.5); }
function lvpHF(a) { const r = a.fpRoute, lf = D.fix[r[r.length - 1]]; return Math.max(0, r.length - (lf.k === 'if' ? 2 : 1)); }
function lvpUsed(sim, a, fix) { return sim.acs.filter(x => x !== a && x.botHF === fix && x.botHA && !(x.botGo && x.alt < x.botHA - 900)).map(x => x.botHA); }
function lvpLevel(sim, a, fix) { const u = lvpUsed(sim, a, fix); return u.length ? Math.max.apply(null, u) + 1000 : 5000; }      /* 새로 오는 항공기는 맨 위 단 */
function lvpGate(sim, a, e) {      /* true면 이번 차례는 여기서 끝 */
  if (!sim.lvp || a.botGo) return false;
  const r = a.fpRoute, hi = lvpHF(a), hf = D.fix[r[hi]], dl = U.dist(a, hf), say = c => { a.botT = sim.t; sim.command(a, c, {noErr:true}); };
  const mis = sim.acs.some(x => x !== a && x.rwy === a.rwy && x.missed && !x.botSeq), dFol = lvpPath(a, e, hi);
  const q = sim.acs.filter(x => x.kind === 'arr' && x.owner === 'me' && x.rwy === a.rwy && x.botHeld === 1).sort((x, y) => x.botHT - y.botHT), q5 = q.filter(x => x.botHA === 5000);
  if (a.botHeld === 1) {
    if (q5[0] === a && !mis && dl > 2 && a.botHA === 5000 && a.alt < 5300 && lvpClear(sim, a, dFol + 1)) { a.botSeq = 1; a.botHeld = 2; a.botGo = 1; a.botBase = 0; a.botIls = 0; say([{k:'dct', fix:r[hi]},{k:'alt', v:4000},{k:'spd', v:200}]); return true; }
    if (a.botHA > 5000 && lvpUsed(sim, a, r[hi]).indexOf(a.botHA - 1000) < 0) { a.botHA -= 1000; say([{k:'alt', v:a.botHA}]); }      /* 아래가 비면 한 단씩 내려 줌 */
    return true;
  }
  if (!a.botHA) { if (U.dist(a, D.center || D.fix.SRA) > 42) return true; a.botHF = r[hi]; a.botHA = lvpLevel(sim, a, r[hi]); a.botAlt = 1; say([{k:'alt', v:a.botHA}]); return true; }
  if (dl > 8 && a.nav.mode === 'route' && r.indexOf(a.nav.route[a.nav.i]) <= hi) return true;
  if (!q.length && !mis && lvpClear(sim, a, dFol)) { a.botSeq = 1; a.botGo = 1; say([{k:'alt', v:4000},{k:'spd', v:200}]); return true; }
  a.botHeld = 1; a.botHT = sim.t; say([{k:'hold', fix:r[hi]},{k:'spd', v:210}]); return true;
}
function lvpMiss(sim, a, g) {      /* 복행기: 순서에 빈자리가 있어야 기초 선회 */
  if (!sim.lvp) return true; if (!lvpClear(sim, a, g.d + 3) && g.d < 20) return false; a.botSeq = 1; return true;
}
// 지나갈 길(꺾은선) 위의 최저 레이더 유도 고도 가운데 가장 높은 값
function pathMva(pts) { let hi = D.mvaBase || 0; for (let i = 1; i < pts.length; i++) { const p = pts[i - 1], q = pts[i], n = Math.max(1, Math.ceil(U.dist(p, q))); for (let k = 0; k <= n; k++) { const x = { x: p.x + (q.x - p.x) * k / n, y: p.y + (q.y - p.y) * k / n }; for (const m of D.mva) if (U.dist(x, m.c) < m.r + 1.2) hi = Math.max(hi, m.alt); } } return hi; }
function routeMva(a) { return pathMva([a].concat(a.nav.mode === 'route' ? a.nav.route.slice(a.nav.i).map(n => D.fix[n]) : [])); }
// 활주로 전환: 새 활주로를 배정받은 항공기를 공항 옆 다운윈드 → 기초 선회 → 30° 진입으로 다시 유도. true면 이번 차례는 여기서 끝
function rvRem(a) { const e = D.ends[a.rwy]; if (a.appr && a.appr.loc) return a.appr.d; const g = ATC.ilsGeom(a, e); if (a.botRv === 1 && a.botP) return U.dist(a, a.botP) + 6 + 13; return Math.max(g.d, 4) + Math.abs(g.xtk); }
function rvBot(sim, a) {
  const cg = sim.rwChg; if (!cg || !a.rwNew || a.appr || a.missed || a.botRv === 9) return false;
  const e = D.ends[a.rwy], g = ATC.ilsGeom(a, e), say = c => { a.botT = sim.t; sim.command(a, c, {noErr:true}); };
  if (a.nav.mode === 'route' && cg.to && D.star[cg.to.id][a.gate] && a.fpRoute === D.star[cg.to.id][a.gate]) return false;      /* 새 방향 STAR로 들어온 항공기는 평소대로 */
  if (!a.botRv) { a.botRv = 1; a.botBase = 1; a.botIls = 1; a.botAlt = 1; const sd = g.xtk > 0 ? 90 : -90; a.botP = D.off(D.off(e.thr, e.crs + 180, 13), e.crs + sd, 6); a.botAim = sim.t;
    a.botHi = pathMva([a, a.botP]) > 4000; say([{k:'hdg', v:Math.round(U.brg(a, a.botP) / 5) * 5 || 360},{k:'alt', v:a.botHi ? Math.max(4000, pathMva([a, a.botP])) : 4000},{k:'spd', v:210}]); return true; }
  if (a.botRv === 1) {
    const dP = U.dist(a, a.botP), ok = sim.t > cg.t1 - 200 && !sim.acs.some(x => x.chgKeep && x.appr && x.appr.d > 4) && sim.acs.every(x => x === a || x.rwy !== a.rwy || !x.botSeq || x.onGround || Math.abs(dP + 19 - rvRem(x)) >= 5.5);
    if (dP < 2.5 || a.botOut) {
      if (ok || g.d > 21) { a.botRv = 2; a.botSeq = 1; say([{k:'hdg', v:U.n360(e.crs + (g.xtk > 0 ? -90 : 90))},{k:'alt', v:3000},{k:'spd', v:200}]); }
      else if (!a.botOut) { a.botOut = 1; say([{k:'hdg', v:U.n360(e.crs + 180)}]); }
      return true; }
    if (a.botOut && dP > 7) { a.botOut = 0; a.botAim = sim.t; say([{k:'hdg', v:Math.round(U.brg(a, a.botP) / 5) * 5 || 360}]); return true; }      /* 기다리는 동안 대기 지점 둘레를 오가며(관할 밖으로 나가지 않게) */
    if (a.botHi && pathMva([a, a.botP]) <= 4000) { a.botHi = false; say([{k:'alt', v:4000}]); return true; }
    if (sim.t - a.botAim > 40) { a.botAim = sim.t; say([{k:'hdg', v:Math.round(U.brg(a, a.botP) / 5) * 5 || 360}]); }
    return true;
  }
  if (a.botRv === 2 && Math.abs(g.xtk) < 2.6) { a.botRv = 9; say([{k:'hdg', v:U.n360(e.crs + (g.xtk > 0 ? -30 : 30))},{k:'ils', rwy:a.rwy}]); }
  return true;
}
function abot(sim) {
  for (const a of sim.acs) {
    if (a.owner === 'in') { sim.accept(a); continue; }
    if (a.owner !== 'me' || sim.t - (a.botT||-99) < 12) continue;
    // 공항 폐쇄(시나리오): 회항 요청은 바로 허가, 도착기는 STAR 끝에서 고도를 달리해 체공, 재개가 가까우면 최소 연료기 → 예상 접근 시각 순서로 한 대씩 풀어 줌
    const cl = sim.apClosed;
    if (a.waiting === 'divert') { a.botT = sim.t; sim.command(a, [Object.assign({k:'divert'}, sim.divertTo(a))], {noErr:true}); continue; }
    if (cl && a.kind === 'arr' && !a.appr) {
      const shut = sim.t < cl.t1 - 150, hf = a.fpRoute[a.fpRoute.length-1];
      if (shut && a.nav.mode !== 'hold') { a.botT = sim.t; cl.botN = (cl.botN||0) + 1; a.botHeld = 1; sim.command(a, [{k:'hold', fix:hf},{k:'alt', v:5000 + 1000*((cl.botN-1)%8)},{k:'spd', v:210}], {noErr:true}); continue; }
      if (shut) continue;
      if (a.nav.mode === 'hold' || a.botHeld === 1) {
        const q = sim.acs.filter(x => x.kind==='arr' && x.owner==='me' && !x.appr && (x.nav.mode==='hold' || x.botHeld===1)).sort((x,y) => (y.emg?1:0)-(x.emg?1:0) || (x.eat||0)-(y.eat||0));
        if (q[0] === a && sim.t - (cl.botRel||-999) > 170) { cl.botRel = sim.t; a.botT = sim.t; a.botHeld = 2; a.botBase = 0; sim.command(a, [{k:'dct', fix:hf},{k:'alt', v:4000}], {noErr:true}); }
        continue;
      }
    }
    const dc = U.dist(a, D.fix.SRA);
    if (a.kind === 'dep') {
      if (a.tAlt < 19000 && a.alt > 2500) { a.botT = sim.t; sim.command(a, [{k:'alt', v:19000},{k:'dct',fix:a.gate}], {noErr:true}); }
      else if (a.tAlt >= 19000 && dc > 20) { a.botT = sim.t; sim.command(a, [{k:'ho', to:'ACC'}], {noErr:true}); }
      continue;
    }
    const e = D.ends[a.rwy], g = ATC.ilsGeom(a, e);
    if (a.appr && a.appr.loc) { a.botT = sim.t; sim.command(a, [{k:'ho', to:'TWR'}], {noErr:true}); continue; }
    if (a.appr) continue;
    if (a.missed) { if (!a.botMiss) { a.botMiss = 1; a.botSeq = 0; a.botT = sim.t; sim.command(a, [{k:'hdg', v:U.n360(e.crs+ (a.rwy.endsWith('L')? -90: 90))},{k:'alt', v:4000}], {noErr:true}); a.botDw = sim.t; }
      else if (a.botMiss===1 && sim.t - a.botDw > 50) { a.botMiss=2; a.botT=sim.t; sim.command(a,[{k:'hdg', v:U.n360(e.crs+180)}],{noErr:true}); }
      else if (a.botMiss===2 && g.d > 11 && lvpMiss(sim, a, g)) { a.botMiss=3; a.botT=sim.t; sim.command(a,[{k:'hdg', v:U.n360(e.crs+(g.xtk>0?-90:90))},{k:'alt',v:3000},{k:'spd',v:200}],{noErr:true}); }
      else if (a.botMiss===3 && Math.abs(g.xtk) < 2.6) { a.botT=sim.t; a.missed=false; a.botMiss=0; sim.command(a,[{k:'hdg', v:U.n360(e.crs+(g.xtk>0?-30:30))},{k:'ils',rwy:a.rwy}],{noErr:true}); }
      continue; }
    if (rvBot(sim, a)) continue;
    const last = a.fpRoute[a.fpRoute.length-1], lf = D.fix[last];
    if (lvpGate(sim, a, e)) continue;
    if (!a.botAlt && dc < 40) { a.botAlt = 1; a.botT = sim.t; sim.command(a, [{k:'alt', v:Math.max(5000, sim.rwChg ? routeMva(a) : 0)}], {noErr:true}); continue; }
    if (lf.k === 'if') { if (U.dist(a, lf) < 9 && !a.botIls) { a.botIls=1; a.botT = sim.t; sim.command(a, [{k:'alt', v:3000},{k:'spd',v:200},{k:'ils', rwy:a.rwy}], {noErr:true}); } continue; }
    if (!a.botBase && U.dist(a, lf) < (sim.lvp ? 3.6 : 2.5)) { a.botBase = 1; a.botT = sim.t; sim.command(a, [{k:'hdg', v:U.n360(e.crs + (g.xtk>0?-90:90))},{k:'alt', v:3000},{k:'spd',v:200}], {noErr:true}); continue; }
    if (a.botBase && Math.abs(g.xtk) < 2.6) { a.botT = sim.t; sim.command(a, [{k:'hdg', v:U.n360(e.crs + (g.xtk>0?-30:30))},{k:'ils', rwy:a.rwy}], {noErr:true}); }
  }
}
function cbot(sim) {
  for (const a of sim.acs) {
    if (a.owner === 'in') { sim.accept(a); continue; }
    if (a.owner !== 'me' || sim.t - (a.botT||-99) < 15) continue;
    if (sim.q.some(m => m.ac === a && m.who === 'atc') || (sim.cur && sim.cur.ac === a)) continue;      /* 앞선 지시가 아직 송신 대기 중이면 거듭 지시하지 않음 */
    if (accCl(sim, a)) continue;
    if (a.kind === 'arr' || a.divert) {
      const d = U.dist(a, D.fix[a.gate]);
      if (a.divert && !(a.nav.mode==='route')) { a.botT=sim.t; sim.command(a, [{k:'dct', fix:a.gate},{k:'alt', v:D.accArrAlt}], {noErr:true}); }
      else if (a.tAlt !== D.accArrAlt && d < 80) { a.botT=sim.t; sim.command(a, [{k:'alt', v:D.accArrAlt}], {noErr:true}); }
      else if (a.tAlt === D.accArrAlt && d < 40) { a.botT=sim.t; sim.command(a, [{k:'ho', to:sim.nextSector(a)}], {noErr:true}); }
    } else {
      const d = U.dist(a, D.fix[a.exitFix]);
      if (a.kind === 'dep' && a.tAlt < 20000) { a.botT=sim.t; sim.command(a, [{k:'alt', v:a.rfl}], {noErr:true}); }
      else if (a.waiting === 'lvl') { a.botT=sim.t; sim.command(a, [{k:'alt', v:a.reqLvl}], {noErr:true}); }
      else if (d < 45 && a.nav.mode==='route') { a.botT=sim.t; sim.command(a, [{k:'ho', to:sim.nextSector(a)}], {noErr:true}); }
    }
  }
}
function dbot(sim) { const good = true;
  for (const a of sim.acs) { if (sim.t - (a.botT||-99) < 14) continue;
    if (a.st === 'req' && a.waiting === 'clr') { a.botT = sim.t; if (a.noFpl) { sim.command(a, [{k:'stby', text:'stand by, flight plan not received, check with your dispatch'}]); continue; }
      const c = []; if (good && a.atisRep !== sim.atis) c.push({k:'atis', v:sim.atis});
      if (good && !sim.parityOk(a, a.rfl)) c.push({k:'amendfl', old:a.rfl, v:a.rfl-1000});
      if (good && a.ctot) c.push({k:'slot', v:U.hhmm(a.ctot), tsat:U.hhmm(a.tsat)});
      c.push({k:'clr', destName:a.destName, sid: good ? sim.sidFor(a.gate) : a.gate+' 1A', alt: D.sidInit, sq:a.squawk}); sim.command(a, c); }
    else if (a.st === 'rb' && sim.cur === null && sim.q.length === 0) { a.botT = sim.t; if (good && sim.hasWrong(a.id)) sim.correct(a.id); else sim.command(a, [{k:'rbok'}]); }
    else if (a.st === 'ready') { if (!good || !a.tsat || sim.utc() >= a.tsat - 300) { a.botT = sim.t; sim.command(a, [{k:'ho', to:'GND'}]); } }
  }
}
// 공항마다 경로 · 협정 고도가 달라 접근 · 지역 봇은 공항별로 둠
function xabot(sim) {
  for (const a of sim.acs) {
    if (a.owner === 'in') { sim.accept(a); continue; }
    if (a.owner !== 'me' || sim.t - (a.botT||-99) < 12) continue;
    const dc = U.dist(a, D.center);
    if (a.kind === 'dep') {
      if (a.tAlt < 19000 && a.alt > 2500) { a.botT = sim.t; sim.command(a, [{k:'alt', v:19000},{k:'dct',fix:a.gate}], {noErr:true}); }
      else if (a.tAlt >= 19000 && dc > 20) { a.botT = sim.t; sim.command(a, [{k:'ho', to:'ACC'}], {noErr:true}); }
      continue;
    }
    const e = D.ends[a.rwy], g = ATC.ilsGeom(a, e);
    if (a.appr && a.appr.loc) { a.botT = sim.t; sim.command(a, [{k:'ho', to:'TWR'}], {noErr:true}); continue; }
    if (a.appr) continue;
    if (a.missed) { if (!a.botMiss) { a.botMiss = 1; a.botSeq = 0; a.botT = sim.t; sim.command(a, [{k:'hdg', v:U.n360(e.crs+ (a.rwy.endsWith('L')? -90: 90))},{k:'alt', v:4000}], {noErr:true}); a.botDw = sim.t; }
      else if (a.botMiss===1 && sim.t - a.botDw > 50) { a.botMiss=2; a.botT=sim.t; sim.command(a,[{k:'hdg', v:U.n360(e.crs+180)}],{noErr:true}); }
      else if (a.botMiss===2 && g.d > 11 && lvpMiss(sim, a, g)) { a.botMiss=3; a.botT=sim.t; sim.command(a,[{k:'hdg', v:U.n360(e.crs+(g.xtk>0?-90:90))},{k:'alt',v:3000},{k:'spd',v:200}],{noErr:true}); }
      else if (a.botMiss===3 && Math.abs(g.xtk) < 2.6) { a.botT=sim.t; a.missed=false; a.botMiss=0; sim.command(a,[{k:'hdg', v:U.n360(e.crs+(g.xtk>0?-30:30))},{k:'ils',rwy:a.rwy}],{noErr:true}); }
      continue; }
    if (rvBot(sim, a)) continue;
    const last = a.fpRoute[a.fpRoute.length-1], lf = D.fix[last];
    if (lvpGate(sim, a, e)) continue;
    if (!a.botAlt && dc < 40) { a.botAlt = 1; a.botT = sim.t; sim.command(a, [{k:'alt', v:Math.max(5000, sim.rwChg ? routeMva(a) : 0)}], {noErr:true}); continue; }
    if (lf.k === 'if') { if (U.dist(a, lf) < 9 && !a.botIls) { a.botIls=1; a.botT = sim.t; sim.command(a, [{k:'alt', v:3000},{k:'spd',v:200},{k:'ils', rwy:a.rwy}], {noErr:true}); } continue; }
    if (!a.botBase && U.dist(a, lf) < (sim.lvp ? 3.6 : 2.5)) { a.botBase = 1; a.botT = sim.t; sim.command(a, [{k:'hdg', v:U.n360(e.crs + (g.xtk>0?-90:90))},{k:'alt', v:3000},{k:'spd',v:200}], {noErr:true}); continue; }
    if (a.botBase && Math.abs(g.xtk) < 2.6) { a.botT = sim.t; sim.command(a, [{k:'hdg', v:U.n360(e.crs + (g.xtk>0?-30:30))},{k:'ils', rwy:a.rwy}], {noErr:true}); }
  }
}
function xcbot(sim) {
  for (const a of sim.acs) {
    if (a.owner === 'in') { sim.accept(a); continue; }
    if (a.owner !== 'me' || sim.t - (a.botT||-99) < 15) continue;
    if (sim.q.some(m => m.ac === a && m.who === 'atc') || (sim.cur && sim.cur.ac === a)) continue;      /* 앞선 지시가 아직 송신 대기 중이면 거듭 지시하지 않음 */
    if (accCl(sim, a)) continue;
    if (a.kind === 'arr' || a.divert) {
      const d = U.dist(a, D.fix[a.gate]);
      if (a.divert && !(a.nav.mode==='route')) { a.botT=sim.t; sim.command(a, [{k:'dct', fix:a.gate},{k:'alt', v:D.accArrAlt}], {noErr:true}); }
      else if (a.tAlt !== D.accArrAlt && d < 80) { a.botT=sim.t; sim.command(a, [{k:'alt', v:D.accArrAlt}], {noErr:true}); }
      else if (a.tAlt === D.accArrAlt && d < 40) { a.botT=sim.t; sim.command(a, [{k:'ho', to:sim.nextSector(a)}], {noErr:true}); }
    } else {
      const d = U.dist(a, D.fix[a.exitFix]);
      if (a.kind === 'dep' && a.tAlt < 20000) { a.botT=sim.t; sim.command(a, [{k:'alt', v:a.rfl}], {noErr:true}); }
      else if (a.waiting === 'lvl') { a.botT=sim.t; sim.command(a, [{k:'alt', v:a.reqLvl}], {noErr:true}); }
      else if (d < 45 && a.nav.mode==='route') { a.botT=sim.t; sim.command(a, [{k:'ho', to:sim.nextSector(a)}], {noErr:true}); }
    }
  }
}
function reta(a, e) { if (a.appr && a.appr.loc) return a.appr.d / 3; let d = 0, p = a; if (a.nav.mode === 'route') { for (let i = a.nav.i; i < a.nav.route.length; i++) { d += U.dist(p, D.fix[a.nav.route[i]]); p = D.fix[a.nav.route[i]]; } } else d = U.dist(a, D.fix[e.IF]); return (d + e.ifD) / 4.2; }
function rabot(sim) {
  const arrs = sim.acs.filter(a => a.kind === 'arr' && a.owner !== 'out');
  for (const a of sim.acs) {
    if (a.owner === 'in') { sim.accept(a); continue; }
    if (a.owner !== 'me' || sim.t - (a.botT || -99) < 14) continue;
    const dc = U.dist(a, D.center), say = c => { a.botT = sim.t; sim.command(a, c, { noErr: true }); };
    if (a.kind === 'dep') {
      const above = arrs.some(b => U.dist(a, b) < 12 && b.alt > a.alt - 300 && b.alt < a.alt + 6000);
      if (a.tAlt < D.tmaTop && a.alt > 2500 && !above) say([{ k: 'alt', v: D.tmaTop }]);
      else if (a.tAlt >= D.tmaTop && (a.waiting === 'ho' || ATC.AppSim.depRem(a) < 12)) say([{ k: 'ho', to: 'ACC' }]);
      else if (a.waiting === 'climb' && !above) say([{ k: 'alt', v: D.tmaTop }]);
      continue;
    }
    const e = D.ends[a.rwy], g = ATC.ilsGeom(a, e);
    if (a.appr && a.appr.loc) { say([{ k: 'ho', to: 'TWR' }]); continue; }
    if (a.missed || a.waiting === 'vector') {      /* 복행 · 포착 실패: 장주로 돌려 다시 */
      const side = g.xtk > 0 ? 1 : -1;
      if (!a.botM) { a.botM = 1; a.botDw = sim.t; say([{ k: 'hdg', v: U.n360(e.crs + (a.rwy.endsWith('L') || a.rwy === '22' ? -90 : 90)) }, { k: 'alt', v: e.apAlt }, { k: 'spd', v: 210 }]); }
      else if (a.botM === 1 && sim.t - a.botDw > 55) { a.botM = 2; say([{ k: 'hdg', v: U.n360(e.crs + 180) }]); }
      else if (a.botM === 2 && g.d > e.ifD - 4) { a.botM = 3; say([{ k: 'hdg', v: U.n360(e.crs + (g.xtk > 0 ? -90 : 90)) }]); }
      else if (a.botM === 3 && Math.abs(g.xtk) < 2.8) { a.botM = 0; a.missed = false; a.waiting = null; say([{ k: 'hdg', v: U.n360(e.crs + (g.xtk > 0 ? -30 : 30)) }, { k: 'ils', rwy: a.rwy }]); }
      continue;
    }
    if (a.appr) continue;
    if (rvBot(sim, a)) continue;      /* 운용 전환으로 새 활주로를 받은 항공기 */
    if (a.waiting === 'appr') { say([{ k: 'alt', v: e.apAlt }, { k: 'ils', rwy: a.rwy }]); continue; }
    const last = a.fpRoute[a.fpRoute.length - 1], dIF = U.dist(a, D.fix[last]), cmds = [];
    /* 같은 활주로의 앞 항공기와 간격(도착 예정 시각 차) */
    const mine = reta(a, e), ahead = arrs.filter(b => b !== a && b.rwy === a.rwy && reta(b, D.ends[b.rwy]) < mine).map(b => mine - reta(b, D.ends[b.rwy])), gap = ahead.length ? Math.min(...ahead) : 99;
    const sw = sim.starWant(a), spd = gap < 1.6 ? 190 : gap < 2.3 ? 210 : dIF < 14 ? 220 : 250;
    if (sw && sw.d < (a.tAlt - sw.alt) / 1000 * 3.2 + 6) cmds.push({ k: 'alt', v: sw.alt });
    if ((a.spdAsg || 250) !== spd && spd >= a.perf.vapp + 20 && sim.t - (a.botS || -999) > 90) { a.botS = sim.t; cmds.push({ k: 'spd', v: spd }); }
    if (dIF < 9 && a.nav.mode === 'route' && a.nav.i >= a.nav.route.length - 2 && a.tAlt <= e.apAlt + 1000) cmds.push({ k: 'ils', rwy: a.rwy });
    if (cmds.length) say(cmds);
  }
}
// 지역관제 공통: 공항 폐쇄(체공 · 회항 · 재개 후 순서대로 이양)와 진입 간격 제한(MIT). true면 이번 차례는 여기서 끝
function accCl(sim, a) {
  if (typeof process !== 'undefined' && process.env && process.env.NO_ACCCL) return false;
  const cl = sim.apClosed, mt = sim.mit && sim.t < sim.mit.t1 ? sim.mit : null;
  if (a.waiting === 'divert') { const dv = sim.divertTo(a); a.botT = sim.t; sim.command(a, [{ k: 'divert', fix: dv.fix, dest: dv.dest, destName: dv.destName, alt: dv.alt }], { noErr: true }); return true; }
  if (a.kind !== 'arr' || a.emg) return false;
  const g = a.gate, d = U.dist(a, D.fix[g]), al = ATC.accAlt(a), same = sim.acs.filter(b => b !== a && b.kind === 'arr' && b.gate === g);
  const stackAlt = () => { const used = same.filter(b => b.nav.mode === 'hold' || U.dist(b, D.fix[g]) < 30).map(b => b.tAlt); let v = al; while (used.includes(v)) v += 2000; return v; };
  sim.botRel = sim.botRel || {};
  if (a.nav.mode === 'hold') {
    if (cl && sim.t < cl.t1 - 240) return true;
    const st = same.concat([a]).filter(b => b.nav.mode === 'hold').sort((x, y) => x.tAlt - y.tAlt || x.holdT - y.holdT || (x.cs < y.cs ? -1 : 1)), lastG = (sim.gateLast || {})[g];
    const need = mt ? mt.nm / Math.max(a.gs, 200) * 3600 + 40 : 110, inbound = same.some(b => b.nav.mode === 'route' && U.dist(b, D.fix[g]) < (mt ? mt.nm + 12 : 12));
    if (st[0] === a && a.tAlt !== al && !same.some(b => U.dist(b, D.fix[g]) < 30 && Math.abs(b.alt - al) < 1500 && b.owner !== 'out')) { a.botT = sim.t; sim.command(a, [{ k: 'alt', v: al }], { noErr: true }); return true; }      /* 아래가 비면 협정 고도로 먼저 내림 */
    if (st[0] === a && Math.abs(a.alt - al) > 300) return true;
    if (st[0] === a && !inbound && sim.t - (sim.botRel[g] || -999) > need && (!mt || !lastG || sim.t - lastG.t > need - 60)) { sim.botRel[g] = sim.t; a.botT = sim.t; sim.command(a, d < 40 ? [{ k: 'dct', fix: g }, { k: 'alt', v: al }, { k: 'ho', to: sim.nextSector(a) }] : [{ k: 'dct', fix: g }, { k: 'alt', v: al }], { noErr: true }); }
    return true;
  }
  if (cl && sim.t < cl.t1 - 240) { if (d < 60) { a.botT = sim.t; sim.command(a, [{ k: 'hold', fix: g }, { k: 'alt', v: stackAlt() }], { noErr: true }); } return true; }
  if (mt && d < 75 && d > 14) {
    const lead = same.filter(b => b.nav.mode === 'route' && U.dist(b, D.fix[g]) < d).sort((x, y) => U.dist(y, D.fix[g]) - U.dist(x, D.fix[g]))[0], gap = lead ? d - U.dist(lead, D.fix[g]) : 99;
    const lastG = (sim.gateLast || {})[g], since = lastG ? (sim.t - lastG.t) * a.gs / 3600 + d : 99;
    if (Math.min(gap, since) < mt.nm + 1) { a.botT = sim.t; sim.command(a, [{ k: 'hold', fix: g }, { k: 'alt', v: stackAlt() }], { noErr: true }); return true; }
    if (Math.min(gap, since) < mt.nm + 8 && a.spdAsg !== 250) { a.botT = sim.t; sim.command(a, [{ k: 'spd', v: 250 }], { noErr: true }); return true; }
  }
  return false;
}
function rcbot(sim) {
  for (const a of sim.acs) {
    if (a.owner === 'in') { sim.accept(a); continue; }
    if (a.owner !== 'me' || sim.t - (a.botT || -99) < 15) continue;
    if (sim.q.some(m => m.ac === a && m.who === 'atc') || (sim.cur && sim.cur.ac === a)) continue;      /* 앞선 지시가 아직 송신 대기 중이면 거듭 지시하지 않음 */
    if (accCl(sim, a)) continue;
    if (a.kind === 'arr' || a.divert) {
      const d = U.dist(a, D.fix[a.gate]), al = ATC.accAlt(a);
      if (a.divert && !(a.nav.mode === 'route' && a.nav.route[a.nav.route.length - 1] === a.gate)) { a.botT = sim.t; sim.command(a, [{ k: 'dct', fix: a.gate }, { k: 'alt', v: al }], { noErr: true }); }
      else if (a.tAlt !== al && d < 80) { a.botT = sim.t; sim.command(a, [{ k: 'alt', v: al }], { noErr: true }); }
      else if (a.tAlt === al && d < 40) { a.botT = sim.t; sim.command(a, [{ k: 'ho', to: sim.nextSector(a) }], { noErr: true }); }
    } else {
      const d = U.dist(a, D.fix[a.exitFix]);
      if (a.kind === 'dep' && a.tAlt < D.tmaTop + 1000) { a.botT = sim.t; sim.command(a, [{ k: 'alt', v: a.rfl }], { noErr: true }); }
      else if (a.waiting === 'lvl') { a.botT = sim.t; sim.command(a, [{ k: 'alt', v: a.reqLvl }], { noErr: true }); }
      else if (d < 45 && a.nav.mode === 'route') { a.botT = sim.t; sim.command(a, [{ k: 'ho', to: sim.nextSector(a) }], { noErr: true }); }
    }
  }
}
var APS = { XSRA: [abot, cbot], XAST: [xabot, xcbot], RJTT: [rabot, rcbot] }, APD = [abot, cbot];
// 공통: 혼신이 나면 바로 재송신 요청, 직행 요청 · 난기류 보고 · 레이저 보고에 응답
function withReq(fn) { return function (sim) {
  if (sim.rxBlock) sim.sayAgain();
  if (sim.coordAsk && !sim.coordAsk.done && sim.t - sim.coordAsk.t > 3) sim.coordAck();
  if (sim.coordOn && sim.coordOn()) for (const a of sim.acs) { if (a.owner !== 'me' && !(a.kind === 'dep' && a.st === 'taxi' && sim.reqRelease)) continue;
    if (sim.reqRelease && a.kind === 'dep' && (a.st === 'athold' && a.holdKind === 'dep' || a.st === 'linedup' || a.st === 'lineup' || a.st === 'taxi' && a.path && a.pi > a.path.length - 6) && a.rel !== 'req' && !sim.relOk(a)) sim.reqRelease(a);
    if (sim.reqCross && a.st === 'athold' && a.holdKind === 'cross' && !a.xco) sim.reqCross(a); }
  for (const a of sim.acs) { if (a.owner !== 'me' || sim.t - (a.botR || -99) < 8) continue;
    const c = a.waiting === 'dctreq' ? [{ k: 'dct', fix: a.reqFix }] : a.waiting === 'pirep' ? [{ k: 'ack' }] : a.waiting === 'laser' ? [{ k: 'laserack' }] : null;
    if (c) { a.botR = sim.t; sim.command(a, c, { noErr: true }); } }
  return fn(sim); }; }
var FN = {};
  ATC.AI = { run: function (pos, sim) { D = ATC.D; U = ATC.U; var ap = APS[ATC.aptId] || APD, f = FN[ATC.aptId + pos] || (FN[ATC.aptId + pos] = withReq({ DEL: dbot, GND: gbot, TWR: tbot, APP: ap[0], ACC: ap[1] }[pos])); if (f) f(sim); } };
})();
