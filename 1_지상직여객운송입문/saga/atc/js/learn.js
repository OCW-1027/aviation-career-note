/* AIRLINE SAGA — ATC 학습 노트 · 포지션 브리핑(한국어) */
(function (G) {
  'use strict';
  var ATC = G.ATC, D = ATC.D;
  /* 학습 노트 본문은 언어별 내용 묶음(한국어). 다른 언어는 ATC.LEARN_SRC.<언어> = [같은 id의 장들] 로 등록 */
  /* i18n:off */
  var NOTE = '<p class="lnote">이 게임의 공항·공역·항공사·주파수·절차 수치는 모두 교육용 가상 값입니다. 실제 관제는 각 나라의 관제 기준과 공항별 절차를 따릅니다.</p>';
  function ex(en, ko) { return '<div class="lex"><b>' + en + '</b><span>' + ko + '</span></div>'; }
  var LEARN_KO = [
    { id: 'flow', t: '관제의 큰 흐름', h:
      '<p>항공기 한 편은 출발부터 도착까지 여러 관제석을 차례로 거칩니다. 각 관제석은 자신의 관할 구역 안에서만 지시하고, 구역 경계에서 다음 관제석으로 <b>이양(hand-off)</b>합니다.</p>' +
      '<table class="lt"><tr><th>관제석</th><th>호출 이름</th><th>담당 업무</th></tr>' +
      '<tr><td>비행허가<br><small>(허가중계석)</small></td><td>Delivery</td><td>비행계획을 확인하고 출발 전 비행허가(목적지 · SID · 초기 고도 · 스쿼크)를 발부</td></tr>' +
      '<tr><td>지상관제</td><td>Ground<br>(공항에 따라 Ramp)</td><td>푸시백, 지상 이동 경로 지정, 활주로 진입 전 대기. 계류장만 따로 담당하는 램프 컨트롤을 두는 공항도 있음</td></tr>' +
      '<tr><td>관제탑<br><small>(국지관제석)</small></td><td>Tower</td><td>활주로 사용 — 이륙·착륙·횡단 허가, 복행 지시</td></tr>' +
      '<tr><td>접근관제</td><td>Approach / Departure</td><td>공항 주변(터미널 공역)에서 도착기의 순서와 간격을 만들어 최종 접근로로 유도하고, 출발기를 상승시킴</td></tr>' +
      '<tr><td>지역관제</td><td>Control (ACC)</td><td>항로 구간. 비행정보구역(FIR)을 여러 섹터로 나누어 순항 중인 항공기 간의 분리를 유지</td></tr></table>' +
      '<p>출발: Delivery → Ground → Tower → Departure → Control &nbsp;/&nbsp; 도착: Control → Approach → Tower → Ground</p>' + NOTE },
    { id: 'rt', t: '교신의 기본', h:
      '<p>관제 교신은 <b>누구에게(호출부호) → 무엇을(지시)</b> 순서로 말하고, 조종사는 지시를 <b>복창(readback)</b>한 뒤 자기 호출부호를 붙입니다. 관제사는 복창이 맞는지 듣고 확인(<b>hearback</b>)해야 합니다.</p>' +
      ex('VELA 301, turn left heading 100, descend and maintain 3,000.', '벨라 301, 좌선회 기수 100, 3,000피트로 강하 후 유지') +
      ex('Left heading 100, descend and maintain 3,000, VELA 301.', '(조종사 복창)') +
      '<h4>숫자 읽기</h4><p>한 자리씩 읽습니다. 3 = tree, 5 = fife, 9 = niner, 소수점 = decimal. 고도 12,000 = "one two thousand", FL240 = "flight level two four zero", 기수 070 = "heading zero seven zero", 활주로 07L = "runway zero seven left".</p>' +
      '<h4>전이 고도</h4><p>낮은 곳에서는 그 지역 기압(QNH)에 맞춘 고도("feet")를, 높은 곳에서는 표준 기압에 맞춘 비행고도(FL)를 씁니다. <b>이 게임은 14,000ft 미만을 고도, 14,000ft 이상을 FL</b>로 부릅니다. 일본 · 한국의 AIP가 14,000ft를 경계로 쓰지만, 바꾸는 높이(전이 고도 · 전이 레벨)와 쓸 수 있는 가장 낮은 FL은 나라 · 공항 · 그날 기압에 따라 다르므로 실제로는 해당 AIP를 따릅니다.</p>' +
      '<h4>나라별 표현 차이</h4><p>국제 표준(ICAO)은 "descend to altitude 5,000 feet", 일본·한국·미국식은 "descend and maintain 5,000". 게임은 일본·한국에서 듣게 되는 형식을 씁니다.</p>' +
      '<h4>음성 알파벳(ICAO)</h4><p class="lph">' + Object.keys(ATC.PH).map(function (k) { return '<i>' + k + '</i> ' + ATC.PH[k]; }).join(' · ') + '</p>' },
    { id: 'rb', t: '복창 오류 정정', h:
      '<p>조종사가 지시와 다른 숫자를 복창하면 즉시 <b>"Negative"</b>로 정정하고 올바른 지시를 다시 송신합니다. 정정하지 않으면 항공기는 <b>잘못 복창한 수치대로</b> 비행합니다. 고도 · 기수 · 스쿼크 · 활주로 번호에서 오류가 가장 잦습니다.</p>' +
      ex('HANBIT 512, negative, descend and maintain 5,000.', '아닙니다. 5,000피트입니다') +
      '<p>게임에서는 교신 기록에 붉은 테두리로 표시된 복창 줄이나 「정정」 단추를 누릅니다. 복창 오류는 중급 이상에서만 발생합니다.</p>' },
    { id: 'ear', t: '무선 교신 듣는 법', h:
      '<p>항공 무선(VHF)은 전화보다 좁은 음성 대역만 전달하며 잡음이 섞입니다. 자음이 뭉개지기 쉬워, 혼동되는 낱말을 처음부터 배제하도록 정한 것이 표준 관제 용어입니다. 이 게임의 교신 음성도 같은 음질로 재현했습니다.</p>'
      + '<ul><li><b>듣는 순서</b> — 호출부호(누구에게) → 동작어(climb · descend · turn · cleared · contact · hold) → 숫자. 다른 항공기를 향한 교신은 자신의 지시와 구분해 듣되, 주변 교통 상황을 파악하는 데 활용합니다.</li>'
      + '<li><b>숫자는 한 자리씩</b> — 기수 090 = zero niner zero, FL190 = flight level one niner zero. 잡음 속에서도 구별되도록 발음이 정해져 있습니다: three는 「트리(TREE)」, five는 「파이프(FIFE)」, nine은 「나이너(NIN-er)」, thousand는 첫소리를 t로 「타우전드(TOU-SAND)」, 소수점은 decimal(DAY-SEE-MAL). 철자는 그대로 three · five · nine · thousand입니다.</li>'
      + '<li><b>글자는 음성 알파벳으로</b> — A = Alfa, B = Bravo, C = Charlie … 유도로 B1은 Bravo 1, ATIS 정보 C는 information Charlie.</li>'
      + '<li><b>한 번에 한 사람</b> — 한 주파수에서는 한 사람만 송신할 수 있습니다. 화면 위의 TX(내가 송신) · RX(조종사 송신) 표시가 꺼진 뒤에 다음 지시가 나갑니다. 따라서 긴급한 지시부터 간결하게 송신합니다.</li>'
      + '<li><b>복창을 끝까지 듣기</b> — 지시는 조종사의 복창이 일치해야 완결됩니다. 숫자, 좌우(left/right), 활주로 명칭을 특히 주의해 듣습니다.</li>'
      + '<li><b>유사 호출부호</b> — VELA 143과 VELA 134처럼 유사한 호출부호가 같은 주파수에 있으면 다른 항공기가 대신 응답하는 일이 생깁니다. 호출부호를 끝까지 명확하게 송신합니다.</li></ul>'
      + '<p>상단의 「해석」을 켜면 교신 기록 아래에 한국어 해석이 표시됩니다. 익숙해지면 꺼서 영어만으로 근무해 보세요. 로비의 「교신 훈련」에서 듣기만 따로 연습할 수 있습니다.</p>' },
    { id: 'phr', t: '표준 문구 대조표', h:
      '<p>이 게임에서 사용하는 지시와 올바른 복창입니다. 복창은 지시의 핵심 요소(숫자 · 방향 · 활주로)를 그대로 되풀이하고 끝에 호출부호를 붙입니다.</p>'
      + '<table class="ptab"><tr><th>관제 지시</th><th>뜻</th><th>올바른 복창</th></tr><tr><td><code>Climb and maintain flight level 190</code></td><td>FL190까지 상승 후 유지</td><td><code>Climb and maintain flight level 190</code></td></tr><tr><td><code>Descend and maintain 5,000</code></td><td>5,000ft까지 강하 후 유지</td><td><code>Descend and maintain 5,000</code></td></tr><tr><td><code>Turn left heading 270</code></td><td>좌선회, 기수 270</td><td><code>Left heading 270</code></td></tr><tr><td><code>Proceed direct KALVO</code></td><td>KALVO 지점으로 직행</td><td><code>Direct KALVO</code></td></tr><tr><td><code>Reduce speed to 180 knots</code></td><td>180노트로 감속</td><td><code>Speed 180</code></td></tr><tr><td><code>Cleared for ILS runway 07L approach</code></td><td>활주로 07L ILS 접근 허가</td><td><code>Cleared for ILS runway 07L approach</code></td></tr><tr><td><code>Hold at SORIN as published</code></td><td>SORIN에서 공시된 절차대로 체공(정해진 체공 경로를 선회하며 대기)</td><td><code>Hold at SORIN</code></td></tr><tr><td><code>Contact Seira Tower 118.10</code></td><td>관제탑 주파수 118.10으로 변경해 교신</td><td><code>118.10</code></td></tr><tr><td><code>Runway 07R, line up and wait</code></td><td>활주로에 진입해 정렬 후 대기(이륙 허가 아님)</td><td><code>Runway 07R, line up and wait</code></td></tr><tr><td><code>Wind 040 at 10, runway 07R, cleared for takeoff</code></td><td>이륙 허가</td><td><code>Runway 07R, cleared for takeoff</code></td></tr><tr><td><code>Runway 07L, cleared to land, wind 040 at 10</code></td><td>착륙 허가</td><td><code>Runway 07L, cleared to land</code></td></tr><tr><td><code>Go around</code></td><td>착륙을 중단하고 재상승(복행)</td><td><code>Going around</code></td></tr><tr><td><code>Hold short of runway 07L</code></td><td>활주로 진입 전 정지선에서 대기(진입 금지)</td><td><code>Holding short runway 07L</code></td></tr><tr><td><code>Cross runway 07L</code></td><td>활주로 횡단</td><td><code>Crossing runway 07L</code></td></tr><tr><td><code>Hold position</code></td><td>현 위치에서 정지</td><td><code>Holding position</code></td></tr><tr><td><code>Pushback approved, face west</code></td><td>푸시백 허가, 기수는 서쪽</td><td><code>Pushback approved, face west</code></td></tr><tr><td><code>Taxi to holding point Bravo 1, runway 07R via Sierra, Charlie, Bravo</code></td><td>S → C → B 유도로로 대기 지점 B1까지 이동</td><td><code>Holding point Bravo 1, runway 07R via Sierra, Charlie, Bravo</code></td></tr><tr><td><code>Give way to …</code></td><td>상대 항공기에 진로 양보</td><td><code>Giving way to …</code></td></tr></table>'
      + '<h4>자주 쓰는 표준 용어</h4><table class="ptab"><tr><th>용어</th><th>뜻</th></tr><tr><td><code>Affirm / Negative</code></td><td>예 / 아니요</td></tr><tr><td><code>Roger</code></td><td>수신함(이행하겠다는 뜻은 아님)</td></tr><tr><td><code>Wilco</code></td><td>수신했으며 지시대로 이행함</td></tr><tr><td><code>Unable</code></td><td>이행 불가 — 사유를 덧붙임</td></tr><tr><td><code>Standby</code></td><td>잠시 대기(다시 호출할 때까지 송신하지 않음)</td></tr><tr><td><code>Say again</code></td><td>재송신 요청 — 일부만 필요하면 Say again altitude처럼</td></tr><tr><td><code>Correction</code></td><td>방금 송신한 내용을 정정</td></tr><tr><td><code>Readback correct</code></td><td>복창 정확</td></tr><tr><td><code>Request …</code></td><td>…을 요청</td></tr><tr><td><code>Mayday ×3 / Pan-pan ×3</code></td><td>조난(즉각적인 지원 필요) / 긴급(위급하지만 즉각적인 조난은 아님)</td></tr></table>'
      + '<p>국가마다 용어가 조금씩 다릅니다. 이 게임은 한국 · 일본에서 쓰는 방식(climb and maintain, line up and wait)을 따랐고, 유럽 등에서는 climb to, 일부 공항에서는 다른 표현을 씁니다.</p>' },
    { id: 'sep', t: '분리 기준(레이더)', h:
      '<p>두 항공기 사이에는 <b>수평 분리</b>와 <b>수직 분리</b> 가운데 하나가 항상 기준 이상으로 확보되어야 합니다.</p>' +
      '<table class="lt"><tr><th>구역</th><th>수평</th><th>수직</th></tr><tr><td>접근관제(터미널)</td><td>3NM</td><td>1,000ft</td></tr><tr><td>지역관제(항로)</td><td>5NM</td><td>1,000ft (FL290~FL410 RVSM 포함)</td></tr></table>' +
      '<p>해소 방법은 세 가지입니다. ① 고도 분리 ② 기수 변경(레이더 유도) ③ 속도 조절. 근접하기 전에 선제적으로 적용하는 것이 원칙입니다. 화면의 주황색 선은 근접 예고, 붉은 테두리는 이미 분리 기준에 미달한 상태입니다.</p>' +
      '<h4>같은 ILS의 선행기와 후행기</h4><p>같은 활주로로 연이어 접근하는 항공기는 3NM(둘 다 활주로 10NM 안에 들어오면 2.5NM — 조건이 붙는 축소 분리) 또는 항적난기류 간격 가운데 큰 값을 지킵니다. 속도를 일치시키면 간격이 유지됩니다(예: 최종 접근로에서 모두 180kt).</p>' +
      '<h4>이 게임이 레이더 분리 판정에서 제외하는 경우</h4><p>세이라 공항의 절차로 정한 경우만 제외합니다. ① 서로 다른 평행 활주로(간격 1,600m)의 로컬라이저에 둘 다 확립한 항공기 — 독립 평행 접근. 확립하기 전까지는 3NM 또는 1,000ft가 필요합니다(실제 일본의 동시 평행 ILS 접근(SPIA)은 높은 쪽 항공기가 글라이드패스에 진입할 때까지 기본 분리를 유지하고, 활주로 사이 비행금지구역 감시 등의 조건이 붙습니다 — 이 게임은 단순화했습니다). ② 관제탑 구역(공항 6NM 안)에서 관제탑이 활주로 분리로 책임지는 구간 — 이륙 직후(3,000ft 미만) · 복행 직후(2,500ft 미만)의 항공기와 로컬라이저에 확립한 항공기 사이, 그리고 서로 다른 활주로에서 나온 복행기와 출발기 사이. 같은 활주로의 복행기와 출발기를 포함해 그 밖의 모든 쌍은 기본 분리를 적용합니다. ①은 같은 방향으로 쓰는 서로 다른 두 활주로일 때만 해당합니다. 실제 공항에서는 이런 예외마다 승인 조건이 따로 있습니다.</p>' + NOTE },
    { id: 'wake', t: '항적난기류', h:
      '<p>대형 항공기 뒤에는 날개 끝 와류가 남습니다. 후행기가 가벼울수록 더 큰 간격을 둡니다(ICAO PANS-ATM 4분류 기준).</p>' +
      '<table class="lt"><tr><th>등급</th><th>최대 이륙 중량</th><th>게임 속 기종</th></tr><tr><td>LIGHT (L)</td><td>7,000kg 이하</td><td>PC-12</td></tr><tr><td>MEDIUM (M)</td><td>7,000kg 초과 ~ 136,000kg 미만</td><td>B737-800, A320, A321, DHC-8-400, ATR 72</td></tr><tr><td>HEAVY (H)</td><td>136,000kg 이상</td><td>B787-9, B777, A350, A330, B767</td></tr><tr><td>SUPER (J)</td><td>A380-800</td><td>(게임에 없음)</td></tr></table>' +
      '<table class="lt"><tr><th>선행기</th><th>후행기</th><th>접근 중 거리</th></tr><tr><td>HEAVY</td><td>HEAVY</td><td>4NM</td></tr><tr><td>HEAVY</td><td>MEDIUM</td><td>5NM</td></tr><tr><td>HEAVY</td><td>LIGHT</td><td>6NM</td></tr><tr><td>MEDIUM</td><td>LIGHT</td><td>5NM</td></tr><tr><td>SUPER</td><td>HEAVY / MEDIUM / LIGHT</td><td>5 / 7 / 8NM</td></tr></table>' +
      '<p><b>이륙</b>: 같은 활주로에서 HEAVY 뒤의 MEDIUM·LIGHT, MEDIUM 뒤의 LIGHT는 <b>2분</b>(후행기가 활주로 중간 지점에서 출발하면 <b>3분</b>). 호출부호 뒤의 "heavy"는 이 등급을 알리는 표현입니다.</p>' + NOTE },
    { id: 'del', t: '비행허가(Clearance Delivery)', h:
      '<p>출발 약 20~30분 전, 조종사가 주기장 번호와 ATIS 식별 문자를 통보하며 비행허가를 요청합니다. 확인 순서:</p>' +
      '<ol><li><b>비행계획이 있는가</b> — 없으면 허가하지 않고 운항관리에 확인하도록 안내</li><li><b>ATIS가 최신인가</b> — 이전 식별 문자를 통보하면 현재 문자와 QNH를 알려 줌</li><li><b>순항 고도가 방향에 맞는가</b> — 동쪽행(000°~179°)은 천 단위가 홀수(FL330 · 350 · 370), 서쪽행(180°~359°)은 짝수(FL340 · 360 · 380) — FL410까지의 수직 분리 축소(RVSM) 공역 기준</li><li><b>SID</b> — 목적지 방향의 출구 지점 + 사용 활주로에 맞는 것</li><li><b>조정이륙시간(CTOT)</b>이 있으면 통보하고, 목표 시동 승인 시각(TSAT) 전에는 지상관제로 이양하지 않음</li></ol>' +
      ex('VELA 301, cleared to Tokyo Haneda airport via NEVIS 1A departure, flight planned route, maintain 6,000, squawk 4521.', '도쿄 하네다 공항까지, NEVIS 1A 출발 절차, 비행계획 경로, 6,000피트 유지, 스쿼크 4521') +
      ex('VELA 301, readback correct, contact Seira Ground 121.70.', '복창 정확합니다. 지상관제와 교신하십시오') +
      '<p><b>이 게임의 SID 이름</b>: 출구 지점 + 1A(활주로 07R) / 1B(활주로 25L). 출구: NEVIS(북동 — 도쿄·오사카·삿포로), EKATO(남동 — 괌·시드니·호놀룰루), SUDAR(남서 — 타이베이·홍콩·싱가포르·방콕), WAVEN(북서 — 서울·부산·상하이·후쿠오카).</p>' +
      '<p><b>이 게임의 CTOT 규칙(교육용)</b>: 목표 시동 승인 시각(TSAT) = CTOT − 15분, 그 5분 전부터 지상관제로 이양할 수 있음.</p>' },
    { id: 'gnd', t: '지상관제(Ground)', h:
      '<p>지상관제는 <b>유도로 명칭을 순서대로</b> 불러 경로를 지정하고, 항공기끼리 정면으로 마주치거나 진로를 막지 않도록 순서를 정합니다.</p>' +
      ex('VELA 301, pushback approved, face west.', '푸시백 허가, 기수는 서쪽') +
      ex('VELA 301, taxi to holding point Bravo 1, runway 07R via Sierra, Charlie, Bravo.', '대기 지점 B1까지 S → C → B 유도로로 이동') +
      ex('HANBIT 512, taxi to stand 105 via Alfa, Papa 3, November.', '주기장 105까지 A → P3 → N') +
      ex('ORIENT STAR 812, hold short of runway 07L.', '활주로 07L 앞에서 정지') +
      '<h4>운용 요령</h4><ul><li><b>일방통행 흐름</b>을 만든다 — 계류장 유도로 N·S는 07 방향 운용 때 서쪽으로만, 25 방향 운용 때 동쪽으로만.</li><li>푸시백은 후방 유도로를 통과하는 항공기가 없을 때 허가한다.</li><li>두 경로가 교차하면 한쪽에 "hold position"을 지시하고, 상대가 통과한 뒤 "continue taxi"를 지시한다.</li><li><b>활주로 횡단</b>은 착륙기·이륙기가 없을 때만. 실제로는 관제탑이 허가하며, 게임에서는 관제탑과 협의를 마친 것으로 보고 지시한다.</li><li>대기 지점에 가까워지면 관제탑으로 이양한다.</li></ul>' +
      '<p>조종사는 전방이 막히면 스스로 정지합니다. 충돌은 피하지만 흐름이 끊긴 것이므로 감점됩니다. 정면으로 마주 보고 정지하면(교착) 견인차가 필요해 큰 지연으로 이어집니다.</p>' +
      '<p class="lnote">용어: 활주로 앞에서 멈추는 곳의 공식 명칭은 「활주로정지위치」, 항공기가 자체 동력으로 움직이는 taxi는 「지상활주」입니다. 이 게임은 푸시백 · 견인까지 묶어 「지상 이동」, 활주로 앞의 정지 위치는 「대기 지점」이라 부릅니다.</p>' },
    { id: 'twr', t: '관제탑(Tower)', h:
      '<p>관제탑 업무의 핵심 원칙은 <b>「활주로에는 한 번에 한 대」</b>입니다.</p>' +
      ex('VELA 301, runway 07R, line up and wait.', '활주로에 진입해 중심선에 정렬한 뒤 대기(이륙 허가는 아님)') +
      ex('VELA 301, wind 060 at 8, runway 07R, cleared for takeoff.', '바람 060도 8노트, 이륙 허가') +
      ex('HANBIT 512, runway 07L, cleared to land, wind 060 at 8.', '착륙 허가') +
      ex('CORAL 233, go around.', '복행하십시오') +
      '<h4>판단 기준</h4><ul><li><b>착륙 허가</b>: 착륙기가 활주로 시단을 통과할 때, 선행 착륙기는 활주로를 이탈해 있어야 하고 선행 출발기는 활주로 종단을 통과했거나 선회를 시작한 상태여야 한다(일반 기준. 공항별로 승인된 축소 기준은 따로 있음). 허가 발부 시점과 시단 통과 시점은 다르다 — 통과 시점에 조건이 충족될 것이 확실하면 미리 허가할 수 있다.</li><li><b>이륙 허가</b>: 활주로가 비어 있고, 착륙기와의 간격이 충분하며(게임 기준 약 4NM 이상이면 여유), 선행 출발기와의 항적난기류 분리(2분/3분)가 충족되었을 때.</li><li><b>횡단 허가</b>: 횡단에 걸리는 시간 안에 착륙기 · 이륙기가 도달하지 않을 때. 실제로는 고정된 거리가 아니라 횡단 소요 시간과 접근 속도를 보고 판단한다.</li><li>이륙한 항공기는 Departure로, 복행한 항공기는 Approach로, 활주로를 이탈한 항공기는 Ground로 이양한다.</li></ul>' +
      '<p class="lnote">이 게임의 자동 판정(실제 절차의 수치가 아님): 선행 출발기는 부양하면 조건을 충족한 것으로 본다 · 착륙기가 0.5NM에 도달할 때까지 허가가 없으면 조종사가 복행한다 · 횡단은 착륙기가 1.6NM보다 멀 때만 수용한다.</p><p><b>복행</b>은 실패가 아니라 안전 절차입니다. 간격이 부족하면 지체 없이 지시합니다. 다만 관제사의 판단 착오로 발생한 복행은 효율 항목에서 감점됩니다.</p>' },
    { id: 'rwy', t: '활주로 안전', h:
      '<p>활주로 침범(runway incursion)은 가장 위험한 사고 유형입니다. 지시를 발부하기 전에 반드시 세 가지를 확인합니다: ① 그 활주로에 지금 누가 있는가 ② 최종 접근 중인 항공기까지 몇 NM인가 ③ 방금 이륙 허가를 준 항공기가 있는가.</p>' +
      '<p>활주로 점검·이륙 중단·비상 착륙으로 활주로를 사용할 수 없게 되면, 그 활주로로 접근하는 항공기는 조기에 복행시키거나 접근관제가 간격을 넓혀야 합니다.</p>' },
    { id: 'app', t: '접근관제(Approach)', h:
      '<p>여러 방향에서 들어오는 도착기를 <b>하나의 흐름</b>으로 정렬해 ILS 최종 접근로로 유도합니다.</p>' +
      '<ol><li>진입 지점(MIRAN·TOKAS·SELDO·PARUM)에서 핸드오프를 받고 STAR를 따라 강하시킨다.</li><li>거리에 맞춰 강하: 공항 30NM 밖 8,000 → 20NM 안 5,000 → 최종 접근 전 3,000~4,000ft.</li><li>감속시킨다: 250 → 210 → 최종 접근로에서 180kt. 선행기와 후행기의 속도를 일치시키면 간격이 유지된다.</li><li><b>베이스 선회</b>(최종 접근로와 나란히 반대 방향으로 비행하던 항공기를 접근로 쪽으로 선회시키는 것) 후, 최종 접근로와 <b>30° 이하</b>의 각도로 교차하는 기수를 지시하며 접근을 허가한다. 이 합류를 「인터셉트(intercept)」라 한다.</li><li>로컬라이저(활주로 중심선 방향을 알려 주는 접근 유도 전파)에 <b>확립</b>하면 — 그 전파를 따라 안정적으로 비행하면 — 관제탑으로 이양한다.</li></ol>' +
      ex('VELA 301, 7 miles from KALVO, turn left heading 100, descend and maintain 3,000 until established on the localizer, cleared for ILS runway 07L approach.', 'KALVO에서 7마일, 기수 100(07 방향 최종 접근로에 30°로 접근), 3,000피트까지 강하해 로컬라이저에 확립할 때까지 유지, ILS 07L 접근 허가') +
      '<p>레이더 유도 중인 항공기에 접근을 허가할 때는 <b>위치 → 기수 → 확립할 때까지 유지할 고도 → 접근 허가</b> 순서로 송신합니다. 공시된 경로를 따라 스스로 접근하는 항공기에는 위치와 유지 고도를 붙이지 않습니다(공시된 경로의 고도를 따르므로). 접근 허가 문구는 일본식 <code>cleared for ILS runway 07L approach</code>를 썼습니다. 한국 · 미국에서는 for 없이 <code>cleared ILS runway 07L approach</code>라고 합니다.</p>' +
      '<p>활공각(3°)은 1NM에 약 300ft입니다. 10NM 지점에서 3,000ft, 13NM에서 4,000ft가 적정합니다. 고도가 너무 높거나 진입각(인터셉트 각도)이 크면 불안정 접근이 되어 복행합니다.</p>' +
      '<p><b>최저 레이더 유도 고도(MVA)</b>: 화면의 갈색 원 안(하쿠레이산)은 6,000ft, 그 밖은 2,500ft 미만으로 강하시킬 수 없습니다. <b>10,000ft 아래 250kt 이하</b> — 이 게임은 10,000ft 미만에서 지시 대기속도(IAS) 250노트를 상한으로 둡니다. 실제 제한과 관제 승인 예외는 공역 · 절차마다 다릅니다. 위의 거리별 강하 고도도 이 공항의 연습용 예시입니다.</p>' +
      '<p><b>출발기</b>: SID 초기 고도 6,000ft에서 수평 비행으로 멈추지 않도록, 상공에 도착기가 없을 때 FL190까지 상승시키고 출구 지점 직행 상태로 Seira Control에 이양합니다.</p>' },
    { id: 'acc', t: '지역관제(Control · FIR)', h:
      '<p>항로에서는 항공기가 빠르고(1분에 7~8NM) 화면이 넓어, <b>10분 뒤의 위치</b>를 예측해 선제적으로 해소합니다. 기본 수단은 고도 분리입니다.</p>' +
      '<ul><li><b>순항 고도의 방향 규칙</b>: 동쪽행(000°~179°) = 천 단위가 홀수인 FL(330·350·370…), 서쪽행 = 짝수인 FL(340·360·380…). FL410까지의 기준이며 그 위는 간격이 달라집니다. 따라서 마주 오는 항공기는 처음부터 1,000ft 분리되어 있고, 충돌 위험은 <b>같은 방향으로 비행하며 경로가 합류 · 교차하는</b> 항공기와 <b>상승 · 강하 중인</b> 항공기에서 발생합니다.</li><li><b>도착기</b>: 접근관제와의 협정대로 진입 지점을 13,000ft로 통과하도록 강하시켜 이양한다.</li><li><b>출발기</b>: FL190으로 올라오면 상공을 횡단하는 항공기를 확인하고 요청 고도까지 상승시킨다.</li><li><b>이양</b>: 경계 지점에 도달하기 전에 다음 구역(Jade·Akitsu·Haneul·Coral Control 또는 Seira Approach)으로 이양한다.</li></ul>' +
      ex('SOLARA 771, climb and maintain FL370.', 'FL370으로 상승') +
      ex('AOZORA 245, descend and maintain 13,000, proceed direct MIRAN.', '13,000피트로 강하, MIRAN 직행') +
      '<p>조종사의 요청(난기류로 고도 변경, 악기상 회피 기수)은 다른 항공기와의 분리에 문제가 없으면 승인하고, 불가하면 대안을 제시합니다. 군 훈련 공역이 활성화되면 그 고도 아래로는 통과시키지 않습니다.</p>' },
    { id: 'ho', t: '이양(주파수 변경)', h:
      '<p>이양은 두 단계입니다. ① 관제사끼리 레이더 표적을 인계 · 인수하는 <b>핸드오프</b>(게임: 깜박이는 표적 → 「수락」) ② 조종사에게 다음 주파수를 알려 주는 <b>교신 이양</b>("contact … ").</p>' +
      ex('VELA 301, contact Seira Tower 118.10.', '세이라 타워 118.10과 교신하세요') +
      '<p>이양하기 전에 <b>협정 조건</b>(고도·경로)을 맞춰야 합니다. 조건을 갖추지 않은 채 이양하거나, 이양하지 않은 채 구역을 벗어나면 감점입니다.</p>' },
    { id: 'hold', t: '체공과 흐름 관리', h:
      '<p>공항이나 공역이 처리할 수 있는 교통량(수용량)을 교통 수요가 초과하면, 관제는 항공기를 <b>공중 또는 지상에서 대기</b>시켜 흐름을 조절합니다. 활주로 폐쇄 · 악기상 · 혼잡 시간대가 대표적인 경우입니다.</p>' +
      '<table class="lt"><tr><th>수단</th><th>내용</th></tr>' +
      '<tr><td>체공<br>(holding)</td><td>지정된 지점 상공에서 공시된 체공 경로를 선회하며 대기. 같은 지점에서 체공하는 항공기 사이에 1,000ft 이상의 수직 간격을 유지하고(체공 스택), 가장 낮은 항공기부터 차례로 내보냄</td></tr>' +
      '<tr><td>예상접근시간<br>(EAT)</td><td>지연 뒤 접근을 위해 체공 지점을 떠날 것으로 예상되는 시각(예상 착륙 시각이 아님)</td></tr>' +
      '<tr><td>추가 허가 예상 시각<br>(EFC)</td><td>다음 허가를 받을 것으로 예상되는 시각. 체공을 지시할 때 함께 통보하며, 지연 시간을 아직 알 수 없으면 「미정」으로 통보할 수 있음. 일본에서는 도착기가 체공 지점에서 체공할 때 EFC를 발부함</td></tr>' +
      '<tr><td>예상 시각의 갱신</td><td>조종사는 이 시각들을 기준으로 잔여 연료와 회항 여부를 판단합니다. 예상 시각에 변경이 생기면 적용 절차에 따라 갱신해 통보합니다(일본 기준: 5분 이상 바뀌면 신속히 갱신). 이 게임은 4분 간격으로 일괄 배정합니다</td></tr>' +
      '<tr><td>진입 간격 제한<br>(MIT · miles-in-trail)</td><td>다음 관제석이 수용할 수 있도록, 같은 지점을 통과하는 항공기 사이에 지정된 거리 이상의 종렬 간격을 두는 것. 이 게임에서는 속도 조절 → 우회 유도 → 체공 순으로 맞추기를 권합니다(효율적인 순서이며, 정해진 법정 순서는 아님)</td></tr>' +
      '<tr><td>지상 대기<br>(CTOT)</td><td>목적 공항 · 항로가 혼잡할 때 조정이륙시간을 지정해 출발 전 지상에서 대기시키는 것. 공중 체공보다 연료 소모가 적음(「비행허가」 장 참조). 일본에서는 출발제어시각(EDCT)이라 부름</td></tr>' +
      '<tr><td>회항<br>(diversion)</td><td>체공이 길어져 교체공항까지 비행할 연료만 남으면 조종사가 요청. 관제사는 교체공항 방면의 경로와 고도를 발부하고 인접 관제구역으로 이양</td></tr></table>' +
      ex('VELA 301, hold at MIRAN as published, expect further clearance at 0935.', 'MIRAN에서 공시된 절차대로 체공, 추가 허가 예상 시각 09시 35분') +
      ex('VELA 301, unable to hold any longer, request diversion to Osaka Kansai.', '더 이상 체공 불가 — 오사카 간사이 회항 요청') +
      '<h4>운용 요령</h4><ul><li>체공 스택은 먼저 도착한 항공기를 가장 낮은 고도에 두고, 뒤따르는 항공기를 그 위에 배치한다.</li><li>아래 항공기가 빠지면 위의 항공기를 한 단계씩 강하시킨다. 진입 지점 · 접근 개시 지점은 정해진 고도로 통과해야 한다.</li><li>간격 제한은 지점 통과 시점에 판정한다. 서로 다른 방향에서 합류하는 항공기는 「그 지점까지 남은 거리」로 먼저 비교하되, 지상속도가 다르면 예상 통과 시각도 함께 본다.</li><li>회항 요청은 지체 없이 처리한다. 회항기는 변경된 경로를 따라 인접 관제구역으로 이양하고, 비행 단계와 경로에 맞는 고도를 배정한다.</li></ul>' +
      '<p class="lnote">이 게임의 체공 시간 · 간격 수치 · 회항 요청 시점은 연습용 설정입니다. 실제 흐름 관리는 국가별 교통관리 기관과 공항별 절차를 따릅니다.</p>' },
    { id: 'lvp', t: '저시정 운용(LVP)', h:
      '<p>안개 등으로 활주로 가시거리(RVR)가 크게 떨어지면 공항은 <b>저시정 절차(LVP · low visibility procedures)</b>를 발효합니다. 조종사는 활주로를 거의 보지 못한 채 ILS 전파에 의지해 착륙하고(CAT II · III 접근), 관제탑도 활주로와 유도로를 눈으로 확인할 수 없습니다. 그래서 평소보다 간격을 넓히고 ILS 전파를 보호합니다.</p>' +
      '<table class="lt"><tr><th>항목</th><th>평소</th><th>저시정 절차 중</th></tr>' +
      '<tr><td>ILS 보호</td><td>CAT I 대기 지점</td><td>활주로에서 더 먼 CAT II/III 대기 지점에서 대기. 착륙기가 가까우면 활주로 주변(민감 구역)에 항공기 · 차량을 넣지 않음</td></tr>' +
      '<tr><td>착륙 허가</td><td>시단 통과 전까지</td><td>일찍 발부(이 게임: 2NM 전까지)</td></tr>' +
      '<tr><td>접근 간격</td><td>3NM 또는 항적난기류 간격</td><td>선행기가 활주로와 ILS 민감 구역을 완전히 벗어날 시간을 더해 넓힘(이 게임: 6NM)</td></tr>' +
      '<tr><td>활주로 이탈 확인</td><td>관제탑이 눈으로 확인</td><td>조종사 보고 또는 지상 감시 레이더로 확인</td></tr>' +
      '<tr><td>지상 이동</td><td>표준 속도</td><td>저속 이동, 정지선등(stop bar) 운용, 경로 단순화</td></tr></table>' +
      '<p>이렇게 간격을 넓히면 공항의 시간당 처리 능력이 크게 줄어듭니다. 그래서 저시정 때는 출발 시각 제한(CTOT)과 체공이 함께 따라옵니다. 활주로를 끝내 보지 못한 조종사는 결심 고도에서 복행하므로, 접근관제는 복행한 항공기를 다시 순서에 넣을 자리를 남겨 둡니다.</p>' +
      '<p class="lnote">2NM · 5NM · 6NM 같은 수치는 이 게임의 연습용 설정입니다. 실제 기준은 공항의 ILS 등급과 시설, 공항별 저시정 절차에 따라 다릅니다.</p>' },
    { id: 'rwchg', t: '운용 방향 전환', h:
      '<p>항공기는 맞바람을 받으며 이착륙합니다. 풍향이 크게 바뀌어 배풍(뒷바람) 성분이 한계에 가까워지면 공항은 <b>사용 활주로(운용 방향)</b>를 반대로 바꿉니다. 전환은 한순간에 끝나지 않습니다. 이미 최종 접근 중인 항공기는 지금 방향으로 내려야 하고, 그 뒤의 항공기는 공항 반대편으로 돌아가야 하기 때문입니다.</p>' +
      '<table class="lt"><tr><th>단계</th><th>하는 일</th></tr>' +
      '<tr><td>① 예고</td><td>관제탑 · 접근관제 · 지역관제가 전환 시각을 정하고 ATIS를 갱신. 지역관제는 새 방향의 STAR로 도착기를 넘기기 시작</td></tr>' +
      '<tr><td>② 마지막 착륙기 결정</td><td>전환 시각까지 지금 활주로에 착륙할 수 있는 마지막 항공기를 정함. 그 뒤의 항공기는 새 활주로 순서로 넘김</td></tr>' +
      '<tr><td>③ 재유도</td><td>이미 옛 방향 STAR에 있는 항공기를 다운윈드로 돌려 공항 반대편의 최종 접근로로 유도. 필요하면 체공</td></tr>' +
      '<tr><td>④ 전환</td><td>마지막 착륙기가 내리고 마지막 출발기가 뜬 뒤, 새 방향의 첫 착륙 · 이륙을 시작</td></tr></table>' +
      '<p>가장 위험한 순간은 ④의 앞뒤입니다. 같은 활주로의 양 끝으로 접근하는 항공기는 서로 마주 보고, 옛 방향으로 이륙한 출발기는 새 방향 도착기의 최종 접근로 쪽으로 상승합니다. 그래서 새 방향의 첫 도착기는 옛 방향의 마지막 항공기가 활주로를 벗어날 때까지 최종 접근 구간 밖에 둡니다.</p>' +
      '<p class="lnote">이 게임에서는 예고 7분 뒤에 전환하고, 전환 시각에 로컬라이저에 올라 8NM 안에 있는 항공기까지 옛 활주로 착륙을 인정합니다. 실제 절차와 시간은 공항 · 교통량에 따라 다르며, 전환 중에는 출발 · 도착 흐름을 일시적으로 줄이는 것이 보통입니다.</p>' },
    { id: 'emg', t: '비정상 상황', h:
      '<table class="lt"><tr><th>신호</th><th>뜻</th></tr><tr><td>MAYDAY ×3 · 스쿼크 7700</td><td>조난 — 중대하고 급박한 위험, 즉시 도움이 필요(이 게임의 예: 엔진 고장, 여압 상실, 연료 비상)</td></tr><tr><td>PAN-PAN ×3</td><td>긴급 — 안전과 관련된 긴급 상황이지만 즉각적인 조난은 아님(이 게임의 예: 응급 환자)</td></tr><tr><td>"Minimum fuel"</td><td>현재 허가대로 비행하면 착륙할 수 있지만, 허가가 바뀌거나 더 지연되면 최종 예비 연료 아래로 내려갈 수 있는 상태. 비상 선언이 아니고 자동 우선권도 없음. 관제사는 예상되는 지연(또는 지연 없음)을 즉시 통보. 연료 비상(MAYDAY FUEL)과 구별</td></tr><tr><td>스쿼크 7600</td><td>무선 통신 두절 — 이 게임에서는 정해진 경로로 스스로 접근하므로 주변 항공기를 분리시킴. 실제로는 마지막으로 받은 허가, 기상 상태, 그 나라가 공시한 통신 두절 절차에 따라 예상 경로 · 고도를 판단하고, 다른 주파수 등으로 교신 복구를 시도</td></tr><tr><td>스쿼크 7500</td><td>불법 간섭(게임에 없음)</td></tr></table>' +
      '<p>원칙: ① 비상기를 <b>가장 먼저</b>, 가장 짧은 경로로 ② 다른 항공기를 체공 · 감속 · 우회시켜 진로를 확보 ③ 필요한 정보(바람 · 활주로)를 간결하게 ④ 교신을 최소화. 여압 상실 항공기는 스스로 비상 강하하므로 그 아래 고도의 항공기부터 분리합니다(이 게임의 강하 목표는 10,000ft. 실제로는 지형 · 기체 절차 · 조종사 판단에 따름). MAYDAY인지 PAN-PAN인지는 고장의 종류가 아니라 위험의 중대성과 급박성에 따라 조종사가 판단합니다 — 표의 예는 이 게임의 설정입니다.</p>' +
      '<p><b>복행</b>, <b>이륙 중단</b>, <b>조류 충돌 뒤 활주로 점검</b>, <b>유도로 폐쇄</b>, <b>악기상(적란운) 회피</b>도 고급 근무에서 발생합니다.</p>' },
    { id: 'mva', t: '지형과 최저 고도', h: '<p>레이더 유도 중에는 관제사가 지형 회피에 책임을 집니다. 구역별 최저 레이더 유도 고도(MVA) 미만으로 강하시키지 않습니다. 접근 허가를 받아 ILS에 확립한 항공기는 절차 고도를 따르므로 예외입니다.</p>' },
    { id: 'eff', t: '효율', h: '<p>안전 다음은 교통 흐름입니다. 조종사의 요청에 응답이 늦거나, 불필요하게 체공시키거나, 대기 지점에서 장시간 대기시키면 지연 감점이 누적됩니다. 한 번의 송신에 여러 지시(기수 + 고도 + 속도)를 묶으면 주파수 혼잡이 줄어듭니다.</p>' },
    { id: 'keys', t: '조작 방법', h:
      '<ul><li>항공기(표적 · 스트립)를 눌러 선택 → 아래 지시판에서 지시를 고르면 「보낼 지시」에 쌓임 → <b>송신</b>(Enter)</li><li>레이더: 선택한 뒤 <b>H</b>를 누른 채(또는 「기수 조준」) 화면을 누르면 그 방향 기수, 지점 이름을 누르면 직행</li><li>마우스 휠 = 확대·축소, 끌기 = 이동, <b>F</b> = 전체 보기</li><li><b>A</b> = 핸드오프 수락, <b>Esc</b> = 지시 지움, <b>Space</b> = 일시 정지, <b>1·2·3·4</b> = 배속</li><li>입력창(레이더): <code>VLA301 H100 A30 S180 ILS</code> — H 기수, L/R 좌·우선회 기수, A 고도(100ft 단위), S 속도, D 지점, ILS, HO 이양</li><li>상단 <b>음성</b> = 무선 음질의 교신 음성, <b>해석</b> = 교신 기록의 한국어 해석, <b>코치</b> = 지금 할 일 안내</li><li>로비 <b>교관 동석</b> = 꼭 해야 할 일이 생기면 시간을 멈추고 무엇을 어떻게 말할지 알려 줌(초급 연습용) · <b>교신 훈련</b> = 말하기 · 듣기 · 복창 대조 · 숫자 읽기 문제</li></ul>' }
  ];
  /* i18n:on */
  ATC.LEARN_SRC = ATC.LEARN_SRC || {}; ATC.LEARN_SRC.ko = LEARN_KO;
  ATC.learnInit = function () { ATC.LEARN = ATC.pick(ATC.LEARN_SRC); ATC.LEARN_BY = {}; ATC.LEARN.forEach(function (s) { ATC.LEARN_BY[s.id] = s; }); };
  ATC.learnInit();

  ATC.POS = {
    DEL: { id: 'DEL', ko: ATC.T('비행허가'), en: 'CLEARANCE DELIVERY', call: D.freq.DEL.n, fq: D.freq.DEL.fq, les: 'del', view: 'del', spd: 1,
      sum: ATC.T('비행계획을 확인하고 비행 허가를 발부합니다. 숫자 하나까지 정확히 전달하고, 복창을 끝까지 확인합니다.'),
      brief: [ATC.T('조종사의 요청을 듣고 스트립을 선택'), ATC.T('ATIS 식별 문자 · 순항 고도의 방향 적합성 · CTOT를 확인해 필요한 항목을 선택'), ATC.T('SID와 초기 고도를 선택해 「허가 송신」'), ATC.T('복창이 일치하면 「Readback correct」, 다르면 「정정」'), ATC.T('준비 완료 보고 후 Ground로 이양(CTOT가 있으면 시각 확인)')] },
    GND: { id: 'GND', ko: ATC.T('지상관제 · 램프'), en: 'GROUND / RAMP', call: D.freq.GND.n, fq: D.freq.GND.fq, les: 'gnd', view: 'ground', spd: 2,
      sum: ATC.T('푸시백부터 활주로 대기 지점까지, 착륙 후 주기장까지. 유도로상의 교통 흐름을 설계합니다.'),
      brief: [ATC.T('푸시백 요청 → 후방 유도로 확인 후 허가'), ATC.T('지상 이동 요청 → 목적지와 경로를 선택해 송신'), ATC.T('경로가 교차하면 한쪽에 「정지」, 통과 후 「계속 이동」'), ATC.T('화물 계류장(K)은 북쪽 활주로를 횡단 — 착륙기 위치를 확인하고 「횡단 허가」'), ATC.T('대기 지점에 도착하면 Tower로 이양')] },
    TWR: { id: 'TWR', ko: ATC.T('관제탑'), en: 'TOWER', call: D.freq.TWR.n, fq: D.freq.TWR.fq, les: 'twr', view: 'ground', spd: 2,
      sum: ATC.T('활주로의 책임자. 이륙 · 착륙 · 횡단을 한 번에 한 대씩, 끊김 없이 처리합니다.'),
      brief: [ATC.T('착륙기: 활주로가 비는 것을 확인하고 「착륙 허가」(0.5NM 전까지)'), ATC.T('출발기: 착륙기와의 거리 · 항적난기류 분리를 확인하고 「이륙 허가」'), ATC.T('간격이 부족하면 「복행」'), ATC.T('이륙 후 Departure로, 활주로 이탈 후 Ground로 이양'), ATC.T('우측 상단의 타워 레이더와 활주로 옆 FINAL 목록을 수시로 확인')] },
    APP: { id: 'APP', ko: ATC.T('접근관제'), en: 'APPROACH / DEPARTURE', call: D.freq.APP.n, fq: D.freq.APP.fq, les: 'app', view: 'radar', spd: 2,
      sum: ATC.T('레이더 유도의 핵심. 여러 방면에서 진입하는 도착기의 순서와 간격을 만들어 ILS 접근으로 유도합니다.'),
      brief: [ATC.T('깜박이는 표적 = 핸드오프 요청 → 「수락」'), ATC.T('거리에 맞춰 강하 · 감속(250 → 210 → 180kt)'), ATC.T('최종 접근로 쪽으로 선회시킨 뒤 30° 이내로 교차하는 기수 + 「ILS 접근 허가」'), ATC.T('로컬라이저에 확립하면 Tower로 이양'), ATC.T('출발기는 FL190으로 상승시켜 Control로 이양 · 3NM/1,000ft 분리 유지')] },
    ACC: { id: 'ACC', ko: ATC.T('지역관제(ACC)'), en: 'AREA CONTROL', call: D.freq.ACC.n, fq: D.freq.ACC.fq, les: 'acc', view: 'radar', spd: 4,
      sum: ATC.T('넓은 공역의 교통 관리. 10분 앞을 내다보고 고도 분리로 해소합니다.'),
      brief: [ATC.T('핸드오프 수락 → 경로와 고도를 확인해 교차 지점의 상대 항공기를 탐지'), ATC.T('같은 고도로 교차하면 한쪽 고도를 변경(동쪽행은 1,000ft 단위 홀수 · 서쪽행은 짝수)'), ATC.T('도착기는 진입 지점 13,000ft, 출발기는 요청 고도까지'), ATC.T('경계 도달 전에 다음 관제구역으로 이양'), ATC.T('5NM/1,000ft 분리 · 기본 배속 4배')] }
  };
  if (D.posBrief) Object.keys(D.posBrief).forEach(function (k) { ATC.POS[k].brief = D.posBrief[k]; });      /* 공항마다 다른 근무 순서 */
  ATC.POS_ORDER = ['DEL', 'GND', 'TWR', 'APP', 'ACC'];
})(typeof globalThis !== 'undefined' ? globalThis : this);
