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
      '<p>항공기 한 편은 출발부터 도착까지 여러 관제석을 차례로 거칩니다. 각 관제석은 자기 구역 안에서만 지시하고, 구역 끝에서 다음 관제석으로 <b>이양(hand-off)</b>합니다.</p>' +
      '<table class="lt"><tr><th>관제석</th><th>호출 이름</th><th>맡는 일</th></tr>' +
      '<tr><td>비행허가</td><td>Delivery</td><td>비행계획을 확인하고 출발 전 관제 허가(목적지·SID·초기 고도·스쿼크)를 전달</td></tr>' +
      '<tr><td>지상관제</td><td>Ground<br>(공항에 따라 Ramp)</td><td>푸시백, 유도로 이동 경로, 활주로 앞 정지. 계류장만 따로 맡는 램프 컨트롤이 있는 공항도 있음</td></tr>' +
      '<tr><td>관제탑</td><td>Tower</td><td>활주로 사용 — 이륙·착륙·횡단 허가, 복행 지시</td></tr>' +
      '<tr><td>접근관제</td><td>Approach / Departure</td><td>공항 주변(터미널 공역)에서 도착기를 순서대로 최종 접근로에 올리고 출발기를 상승시킴</td></tr>' +
      '<tr><td>지역관제</td><td>Control (ACC)</td><td>항로 구간. 비행정보구역(FIR)을 여러 섹터로 나눠 순항 중인 항공기의 간격을 유지</td></tr></table>' +
      '<p>출발: Delivery → Ground → Tower → Departure → Control &nbsp;/&nbsp; 도착: Control → Approach → Tower → Ground</p>' + NOTE },
    { id: 'rt', t: '교신의 기본', h:
      '<p>관제 교신은 <b>누구에게(호출부호) → 무엇을(지시)</b> 순서로 말하고, 조종사는 지시를 <b>복창(readback)</b>한 뒤 자기 호출부호를 붙입니다. 관제사는 복창이 맞는지 듣고 확인(<b>hearback</b>)해야 합니다.</p>' +
      ex('VELA 301, turn left heading 100, descend and maintain 3,000.', '벨라 301, 좌선회 기수 100, 3,000피트로 강하 후 유지') +
      ex('Left heading 100, descend and maintain 3,000, VELA 301.', '(조종사 복창)') +
      '<h4>숫자 읽기</h4><p>한 자리씩 읽습니다. 3 = tree, 5 = fife, 9 = niner, 소수점 = decimal. 고도 12,000 = "one two thousand", FL240 = "flight level two four zero", 기수 070 = "heading zero seven zero", 활주로 07L = "runway zero seven left".</p>' +
      '<h4>전이 고도</h4><p>낮은 곳에서는 그 지역 기압(QNH)에 맞춘 고도("feet")를, 높은 곳에서는 표준 기압에 맞춘 비행고도(FL)를 씁니다. <b>이 게임은 14,000ft 미만을 고도, 14,000ft 이상을 FL</b>로 부릅니다. 일본 · 한국의 AIP가 14,000ft를 경계로 쓰지만, 바꾸는 높이(전이 고도 · 전이 레벨)와 쓸 수 있는 가장 낮은 FL은 나라 · 공항 · 그날 기압에 따라 다르므로 실제로는 해당 AIP를 따릅니다.</p>' +
      '<h4>나라별 표현 차이</h4><p>국제 표준(ICAO)은 "descend to altitude 5,000 feet", 일본·한국·미국식은 "descend and maintain 5,000". 게임은 일본·한국에서 듣게 되는 형식을 씁니다.</p>' +
      '<h4>음성 문자</h4><p class="lph">' + Object.keys(ATC.PH).map(function (k) { return '<i>' + k + '</i> ' + ATC.PH[k]; }).join(' · ') + '</p>' },
    { id: 'rb', t: '복창 오류 잡기', h:
      '<p>조종사가 지시와 다른 숫자를 복창하면 바로 <b>"Negative"</b>로 끊고 맞는 지시를 다시 줍니다. 그대로 두면 항공기는 <b>틀린 숫자대로</b> 움직입니다. 고도·기수·스쿼크·활주로 번호가 가장 많이 틀립니다.</p>' +
      ex('HANBIT 512, negative, descend and maintain 5,000.', '아닙니다. 5,000피트입니다') +
      '<p>게임에서는 교신 기록에 붉은 테두리로 표시된 복창 줄이나 「정정」 단추를 누릅니다. 중급 이상에서만 일어납니다.</p>' },
    { id: 'ear', t: '무선 교신 듣는 법', h:
      '<p>실제 무선은 전화보다도 좁은 소리 폭만 지나가고 잡음이 섞입니다. 자음이 뭉개지기 때문에 헷갈리는 낱말을 아예 쓰지 않도록 규칙을 만든 것이 표준 교신입니다. 이 게임의 교신 음성도 같은 음질로 들리게 했습니다.</p>'
      + '<ul><li><b>듣는 순서</b> — 호출부호(누구에게) → 동작 낱말(climb · descend · turn · cleared · contact · hold) → 숫자. 다른 구역 · 다른 항공기에 가는 교신은 내 지시와 구분해 듣습니다(주변 상황을 아는 데는 도움이 됩니다).</li>'
      + '<li><b>숫자는 한 자리씩</b> — 기수 090 = zero niner zero, FL190 = flight level one niner zero. 잡음 속에서도 구별되도록 발음이 정해져 있습니다: three는 「트리(TREE)」, five는 「파이프(FIFE)」, nine은 「나이너(NIN-er)」, thousand는 첫소리를 t로 「타우전드(TOU-SAND)」, 소수점은 decimal(DAY-SEE-MAL). 철자는 그대로 three · five · nine · thousand입니다.</li>'
      + '<li><b>글자는 음성 문자로</b> — A = Alfa, B = Bravo, C = Charlie … 유도로 B1은 Bravo 1, ATIS 정보 C는 information Charlie.</li>'
      + '<li><b>한 번에 한 사람</b> — 한 주파수에서는 한 사람만 송신할 수 있습니다. 화면 위의 TX(내가 송신) · RX(조종사 송신) 표시가 꺼진 뒤에 다음 지시가 나갑니다. 그래서 급한 지시부터, 짧게 보냅니다.</li>'
      + '<li><b>복창을 끝까지 듣기</b> — 지시는 조종사의 복창이 맞아야 끝납니다. 숫자 하나, 좌우(left/right), 활주로 이름을 특히 듣습니다.</li>'
      + '<li><b>비슷한 호출부호</b> — VELA 143과 VELA 134처럼 닮은 호출부호가 같이 있으면 다른 항공기가 대신 대답하는 일이 생깁니다. 호출부호를 또박또박 끝까지 말합니다.</li></ul>'
      + '<p>상단의 「해석」을 켜면 교신 기록 아래에 우리말 풀이가 붙습니다. 익숙해지면 꺼서 영어만으로 근무해 보세요. 로비의 「교신 훈련소」에서 듣기만 따로 연습할 수 있습니다.</p>' },
    { id: 'phr', t: '표준 문구 대조표', h:
      '<p>이 게임에서 쓰는 지시와 맞는 복창입니다. 복창은 지시의 알맹이(숫자 · 방향 · 활주로)를 그대로 되돌려 말하고 끝에 호출부호를 붙입니다.</p>'
      + '<table class="ptab"><tr><th>관제 지시</th><th>뜻</th><th>맞는 복창</th></tr><tr><td><code>Climb and maintain flight level 190</code></td><td>FL190까지 올라가서 유지</td><td><code>Climb and maintain flight level 190</code></td></tr><tr><td><code>Descend and maintain 5,000</code></td><td>5,000ft까지 내려가서 유지</td><td><code>Descend and maintain 5,000</code></td></tr><tr><td><code>Turn left heading 270</code></td><td>왼쪽으로 돌아 기수 270</td><td><code>Left heading 270</code></td></tr><tr><td><code>Proceed direct KALVO</code></td><td>KALVO 지점으로 곧장</td><td><code>Direct KALVO</code></td></tr><tr><td><code>Reduce speed to 180 knots</code></td><td>속도를 180노트로 줄임</td><td><code>Speed 180</code></td></tr><tr><td><code>Cleared for ILS runway 07L approach</code></td><td>활주로 07L 계기 접근 허가</td><td><code>Cleared for ILS runway 07L approach</code></td></tr><tr><td><code>Hold at SORIN as published</code></td><td>SORIN에서 공시된 절차대로 체공(정해진 모양으로 돌며 대기)</td><td><code>Hold at SORIN</code></td></tr><tr><td><code>Contact Seira Tower 118.10</code></td><td>관제탑 주파수 118.10으로 옮겨 호출</td><td><code>118.10</code></td></tr><tr><td><code>Runway 07R, line up and wait</code></td><td>활주로에 들어가 정렬하고 대기(이륙 허가 아님)</td><td><code>Runway 07R, line up and wait</code></td></tr><tr><td><code>Wind 040 at 10, runway 07R, cleared for takeoff</code></td><td>이륙 허가</td><td><code>Runway 07R, cleared for takeoff</code></td></tr><tr><td><code>Runway 07L, cleared to land, wind 040 at 10</code></td><td>착륙 허가</td><td><code>Runway 07L, cleared to land</code></td></tr><tr><td><code>Go around</code></td><td>착륙을 그만두고 다시 올라감(복행)</td><td><code>Going around</code></td></tr><tr><td><code>Hold short of runway 07L</code></td><td>활주로 앞 정지선에서 멈춤(들어가지 않음)</td><td><code>Holding short runway 07L</code></td></tr><tr><td><code>Cross runway 07L</code></td><td>활주로를 건너감</td><td><code>Crossing runway 07L</code></td></tr><tr><td><code>Hold position</code></td><td>지금 자리에서 멈춤</td><td><code>Holding position</code></td></tr><tr><td><code>Pushback approved, face west</code></td><td>뒤로 밀기 허가, 기수는 서쪽</td><td><code>Pushback approved, face west</code></td></tr><tr><td><code>Taxi to holding point Bravo 1, runway 07R via Sierra, Charlie, Bravo</code></td><td>S → C → B 유도로로 대기 지점 B1까지 이동</td><td><code>Holding point Bravo 1, runway 07R via Sierra, Charlie, Bravo</code></td></tr><tr><td><code>Give way to …</code></td><td>상대에게 길을 양보</td><td><code>Giving way to …</code></td></tr></table>'
      + '<h4>자주 쓰는 짧은 말</h4><table class="ptab"><tr><th>말</th><th>뜻</th></tr><tr><td><code>Affirm / Negative</code></td><td>예 / 아니요</td></tr><tr><td><code>Roger</code></td><td>들었음(따르겠다는 뜻은 아님)</td></tr><tr><td><code>Wilco</code></td><td>들었고 그대로 하겠음</td></tr><tr><td><code>Unable</code></td><td>할 수 없음 — 이유를 덧붙임</td></tr><tr><td><code>Standby</code></td><td>잠시 기다림(다시 부를 때까지 송신하지 않음)</td></tr><tr><td><code>Say again</code></td><td>다시 말해 달라 — 일부만이면 Say again altitude처럼</td></tr><tr><td><code>Correction</code></td><td>방금 말을 고침</td></tr><tr><td><code>Readback correct</code></td><td>복창이 맞음</td></tr><tr><td><code>Request …</code></td><td>…을 요청</td></tr><tr><td><code>Mayday ×3 / Pan-pan ×3</code></td><td>조난(즉각 도움 필요) / 긴급(위험하지만 즉각은 아님)</td></tr></table>'
      + '<p>나라마다 낱말이 조금 다릅니다. 이 게임은 한국 · 일본에서 쓰는 방식(climb and maintain, line up and wait)을 따랐고, 유럽 등에서는 climb to, 일부 공항에서는 다른 표현을 씁니다.</p>' },
    { id: 'sep', t: '분리 기준(레이더)', h:
      '<p>두 항공기는 <b>수평 간격</b>과 <b>수직 간격</b> 가운데 하나는 항상 기준 이상이어야 합니다.</p>' +
      '<table class="lt"><tr><th>구역</th><th>수평</th><th>수직</th></tr><tr><td>접근관제(터미널)</td><td>3NM</td><td>1,000ft</td></tr><tr><td>지역관제(항로)</td><td>5NM</td><td>1,000ft (FL290~FL410 RVSM 포함)</td></tr></table>' +
      '<p>푸는 방법은 세 가지: ① 고도를 다르게 ② 기수를 돌려(벡터) ③ 속도를 조절해. 가까워지기 전에 미리 쓰는 것이 원칙입니다. 화면의 주황 선은 「곧 가까워짐」 예고, 붉은 테두리는 이미 기준 안으로 들어온 상태입니다.</p>' +
      '<h4>같은 ILS에 선 앞뒤 항공기</h4><p>같은 활주로로 줄지어 접근하는 항공기는 3NM(둘 다 활주로 10NM 안에 들어오면 2.5NM — 조건이 붙는 축소 분리) 또는 후방난기류 간격 가운데 큰 값을 지킵니다. 속도를 맞춰 주면 간격이 유지됩니다(예: 최종 접근로에서 모두 180kt).</p>' +
      '<h4>이 게임이 레이더 분리 판정에서 빼는 경우</h4><p>세이라 공항의 절차로 정해 둔 것만 뺍니다. ① 서로 다른 평행 활주로(간격 1,600m)의 로컬라이저에 둘 다 확립한 항공기 — 독립 평행 접근. 확립하기 전까지는 3NM 또는 1,000ft가 필요합니다. ② 관제탑 구역(공항 6NM 안)에서 관제탑이 활주로 분리로 책임지는 구간 — 이륙 직후(3,000ft 미만) · 복행 직후(2,500ft 미만)의 항공기와 로컬라이저에 확립한 항공기 사이, 그리고 서로 다른 활주로에서 나온 복행기와 출발기 사이. 같은 활주로의 복행기와 출발기를 포함해 그 밖의 모든 쌍은 기본 분리를 적용합니다. ①은 같은 방향으로 쓰는 서로 다른 두 활주로일 때만 해당합니다. 실제 공항에서는 이런 예외마다 승인 조건이 따로 있습니다.</p>' + NOTE },
    { id: 'wake', t: '후방난기류', h:
      '<p>큰 항공기 뒤에는 날개 끝 소용돌이가 남습니다. 뒤따르는 항공기가 가벼울수록 더 멀리 떨어뜨립니다(ICAO PANS-ATM 4분류 기준).</p>' +
      '<table class="lt"><tr><th>등급</th><th>최대 이륙 중량</th><th>게임 속 기종</th></tr><tr><td>LIGHT (L)</td><td>7,000kg 이하</td><td>PC-12</td></tr><tr><td>MEDIUM (M)</td><td>7,000kg 초과 ~ 136,000kg 미만</td><td>B737-800, A320, A321, DHC-8-400, ATR 72</td></tr><tr><td>HEAVY (H)</td><td>136,000kg 이상</td><td>B787-9, B777, A350, A330, B767</td></tr><tr><td>SUPER (J)</td><td>A380-800</td><td>(게임에 없음)</td></tr></table>' +
      '<table class="lt"><tr><th>앞</th><th>뒤</th><th>접근 중 거리</th></tr><tr><td>HEAVY</td><td>HEAVY</td><td>4NM</td></tr><tr><td>HEAVY</td><td>MEDIUM</td><td>5NM</td></tr><tr><td>HEAVY</td><td>LIGHT</td><td>6NM</td></tr><tr><td>MEDIUM</td><td>LIGHT</td><td>5NM</td></tr><tr><td>SUPER</td><td>HEAVY / MEDIUM / LIGHT</td><td>5 / 7 / 8NM</td></tr></table>' +
      '<p><b>이륙</b>: 같은 활주로에서 HEAVY 뒤의 MEDIUM·LIGHT, MEDIUM 뒤의 LIGHT는 <b>2분</b>(뒤 항공기가 활주로 중간에서 출발하면 <b>3분</b>). 호출부호 뒤의 "heavy"는 이 등급을 알리는 말입니다.</p>' + NOTE },
    { id: 'del', t: '비행허가(Clearance Delivery)', h:
      '<p>출발 약 20~30분 전, 조종사가 주기장과 ATIS 정보 문자를 말하며 허가를 요청합니다. 확인 순서:</p>' +
      '<ol><li><b>비행계획이 있는가</b> — 없으면 허가하지 않고 운항관리에 확인하도록 안내</li><li><b>ATIS가 최신인가</b> — 지난 문자를 말하면 현재 문자와 QNH를 알려 줌</li><li><b>순항 고도가 방향에 맞는가</b> — 동쪽행(000°~179°)은 천 단위가 홀수(FL330 · 350 · 370), 서쪽행(180°~359°)은 짝수(FL340 · 360 · 380) — FL410까지의 수직 분리 축소(RVSM) 공역 기준</li><li><b>SID</b> — 목적지 방향의 출구 지점 + 사용 활주로에 맞는 것</li><li><b>흐름 관리 시각(CTOT)</b>이 있으면 알려 주고, 시동 예정 시각 전에는 지상관제로 넘기지 않음</li></ol>' +
      ex('VELA 301, cleared to Tokyo Haneda airport via NEVIS 1A departure, flight planned route, maintain 6,000, squawk 4521.', '도쿄 하네다 공항까지, NEVIS 1A 출발 절차, 계획한 경로, 6,000피트 유지, 스쿼크 4521') +
      ex('VELA 301, readback correct, contact Seira Ground 121.70.', '복창 맞습니다. 지상관제와 교신하세요') +
      '<p><b>이 게임의 SID 이름</b>: 출구 지점 + 1A(활주로 07R) / 1B(활주로 25L). 출구: NEVIS(북동 — 도쿄·오사카·삿포로), EKATO(남동 — 괌·시드니·호놀룰루), SUDAR(남서 — 타이베이·홍콩·싱가포르·방콕), WAVEN(북서 — 서울·부산·상하이·후쿠오카).</p>' +
      '<p><b>이 게임의 CTOT 규칙(교육용)</b>: 시동 예정 시각(TSAT) = CTOT − 15분, 그 5분 전부터 지상관제로 넘길 수 있음.</p>' },
    { id: 'gnd', t: '지상관제(Ground)', h:
      '<p>지상관제는 <b>유도로 이름을 순서대로</b> 불러 경로를 주고, 항공기끼리 마주 보거나 가로막지 않게 순서를 정합니다.</p>' +
      ex('VELA 301, pushback approved, face west.', '푸시백 허가, 기수는 서쪽') +
      ex('VELA 301, taxi to holding point Bravo 1, runway 07R via Sierra, Charlie, Bravo.', '대기 지점 B1까지 S → C → B 유도로로 이동') +
      ex('HANBIT 512, taxi to stand 105 via Alfa, Papa 3, November.', '주기장 105까지 A → P3 → N') +
      ex('ORIENT STAR 812, hold short of runway 07L.', '활주로 07L 앞에서 정지') +
      '<h4>요령</h4><ul><li><b>일방통행 흐름</b>을 만든다 — 계류장 유도로 N·S는 07 방향 운용 때 서쪽으로만, 25 방향 운용 때 동쪽으로만.</li><li>푸시백은 뒤쪽 유도로를 지나가는 항공기가 없을 때 허가한다.</li><li>두 경로가 만나면 한쪽에 "hold position"을 주고, 지나간 뒤 "continue taxi".</li><li><b>활주로 횡단</b>은 착륙기·이륙기가 없을 때만. 실제로는 관제탑이 허가하며, 게임에서는 타워와 조정을 마친 것으로 보고 지시한다.</li><li>대기 지점에 가까워지면 관제탑으로 넘긴다.</li></ul>' +
      '<p>조종사는 앞이 막히면 스스로 멈춥니다. 충돌은 피하지만 흐름이 끊긴 것이므로 감점입니다. 서로 마주 보고 멈추면(교착) 견인차가 필요해 큰 지연이 됩니다.</p>' },
    { id: 'twr', t: '관제탑(Tower)', h:
      '<p>관제탑의 핵심은 <b>활주로에는 한 번에 한 대</b>입니다.</p>' +
      ex('VELA 301, runway 07R, line up and wait.', '활주로에 들어가 중심선에 맞춰 선 뒤 대기(이륙 허가는 아님)') +
      ex('VELA 301, wind 060 at 8, runway 07R, cleared for takeoff.', '바람 060도 8노트, 이륙 허가') +
      ex('HANBIT 512, runway 07L, cleared to land, wind 060 at 8.', '착륙 허가') +
      ex('CORAL 233, go around.', '복행하라') +
      '<h4>판단 기준</h4><ul><li><b>착륙 허가</b>: 착륙기가 활주로 끝(시단)을 지날 때, 앞 착륙기는 활주로를 벗어나 있어야 하고 앞 출발기는 활주로 끝을 지났거나 선회를 시작한 상태여야 한다(일반 기준. 공항별로 승인된 축소 기준은 따로 있음). 허가를 내는 때와 시단을 지나는 때는 다르다 — 그때 조건이 채워질 것이 확실하면 미리 허가할 수 있다.</li><li><b>이륙 허가</b>: 활주로가 비어 있고, 착륙기와의 간격이 충분하며(게임 기준 약 4NM 이상이면 여유), 앞 출발기와 후방난기류 간격(2분/3분)이 지났을 때.</li><li><b>횡단 허가</b>: 건너는 데 걸리는 시간 안에 착륙기 · 이륙기가 오지 않을 때. 실제로는 고정된 거리가 아니라 횡단 소요 시간과 접근 속도를 보고 판단한다.</li><li>이륙한 항공기는 Departure로, 복행한 항공기는 Approach로, 활주로를 벗어난 항공기는 Ground로 넘긴다.</li></ul>' +
      '<p class="lnote">이 게임의 자동 판정(실제 절차의 수치가 아님): 앞 출발기는 떠오르면 조건을 채운 것으로 본다 · 착륙기가 0.5NM에 올 때까지 허가가 없으면 조종사가 복행한다 · 횡단은 착륙기가 1.6NM보다 멀 때만 받아들인다.</p><p><b>복행</b>은 실패가 아니라 안전 절차입니다. 간격이 모자라면 망설이지 말고 지시합니다. 다만 관제사의 판단 때문에 생긴 복행은 효율 감점입니다.</p>' },
    { id: 'rwy', t: '활주로 안전', h:
      '<p>활주로 침범(runway incursion)은 가장 위험한 사고 유형입니다. 지시를 내기 전에 반드시 세 가지를 봅니다: ① 그 활주로에 지금 누가 있는가 ② 최종 접근 중인 항공기까지 몇 NM인가 ③ 방금 이륙 허가를 준 항공기가 있는가.</p>' +
      '<p>활주로 점검·이륙 중단·비상 착륙으로 활주로가 막히면, 그 활주로로 접근하는 항공기는 일찍 복행시키거나 접근관제가 간격을 벌려 주어야 합니다.</p>' },
    { id: 'app', t: '접근관제(Approach)', h:
      '<p>여러 방향에서 들어오는 도착기를 <b>한 줄</b>로 세워 ILS 최종 접근로에 올립니다.</p>' +
      '<ol><li>진입 지점(MIRAN·TOKAS·SELDO·PARUM)에서 핸드오프를 받고 STAR를 따라 내려오게 한다.</li><li>거리에 맞춰 강하: 공항 30NM 밖 8,000 → 20NM 안 5,000 → 최종 접근 전 3,000~4,000ft.</li><li>속도를 줄인다: 250 → 210 → 최종 접근로에서 180kt. 앞뒤 속도를 같게 하면 간격이 유지된다.</li><li><b>베이스 선회</b>(최종 접근로 옆을 지나쳐 가던 항공기를 접근로 쪽으로 돌리는 것) 뒤, 최종 접근로와 <b>30° 이하</b>의 각도로 만나는 기수를 주며 접근을 허가한다. 이 합류를 「요격(intercept)」이라 한다.</li><li>로컬라이저(활주로 중심선 방향을 알려 주는 접근 유도 전파)에 <b>확립</b>하면 — 그 전파를 타고 안정적으로 날면 — 관제탑으로 넘긴다.</li></ol>' +
      ex('VELA 301, 7 miles from KALVO, turn left heading 100, descend and maintain 3,000 until established on the localizer, cleared for ILS runway 07L approach.', 'KALMA에서 7마일, 기수 100(07 방향 최종 접근로에 30°로 접근), 3,000피트까지 강하해 로컬라이저에 확립할 때까지 유지, ILS 07L 접근 허가') +
      '<p>기수를 주며 유도하는 항공기에 접근을 허가할 때는 <b>위치 → 기수 → 확립할 때까지 지킬 고도 → 접근 허가</b> 순서로 말합니다. 스스로 경로를 따라 접근 지점으로 가는 항공기에는 위치와 유지 고도를 붙이지 않습니다(공시된 경로의 고도를 따르므로). 접근 허가 문구는 일본식 <code>cleared for ILS runway 07L approach</code>를 썼습니다. 한국 · 미국에서는 for 없이 <code>cleared ILS runway 07L approach</code>라고 합니다.</p>' +
      '<p>활공각(3°)은 1NM에 약 300ft입니다. 10NM 지점에서 3,000ft, 13NM에서 4,000ft가 알맞습니다. 너무 높거나 합류(요격) 각도가 크면 불안정 접근이 되어 복행합니다.</p>' +
      '<p><b>최저 레이더 유도 고도(MVA)</b>: 화면의 갈색 원 안(하쿠레이산)은 6,000ft, 그 밖은 2,500ft 아래로 내리면 안 됩니다. <b>10,000ft 아래 250kt 이하</b> — 이 게임은 10,000ft 미만에서 지시 대기속도(IAS) 250노트를 상한으로 둡니다. 실제 제한과 관제 승인 예외는 공역 · 절차마다 다릅니다. 위의 거리별 강하 고도도 이 공항의 연습용 예시입니다.</p>' +
      '<p><b>출발기</b>: SID 초기 고도 6,000ft에서 멈추지 않게, 위에 도착기가 없을 때 FL190까지 올리고 출구 지점 직행 상태로 Seira Control에 넘깁니다.</p>' },
    { id: 'acc', t: '지역관제(Control · FIR)', h:
      '<p>항로에서는 항공기가 빠르고(1분에 7~8NM) 화면이 넓어, <b>10분 뒤의 위치</b>를 내다보고 미리 풉니다. 기본 도구는 고도입니다.</p>' +
      '<ul><li><b>순항 고도의 방향 규칙</b>: 동쪽행(000°~179°) = 천 단위가 홀수인 FL(330·350·370…), 서쪽행 = 짝수인 FL(340·360·380…). FL410까지의 기준이며 그 위는 간격이 달라집니다. 그래서 마주 보는 항공기는 처음부터 1,000ft 떨어져 있고, 문제는 <b>같은 쪽으로 가며 경로가 만나는</b> 항공기와 <b>오르내리는</b> 항공기에서 생깁니다.</li><li><b>도착기</b>: 접근관제와의 협정대로 진입 지점을 13,000ft로 통과하게 강하시켜 넘긴다.</li><li><b>출발기</b>: FL190으로 올라오면 가로지르는 항공기를 확인하고 요청 고도까지 올린다.</li><li><b>이양</b>: 경계 지점에 닿기 전에 다음 구역(Jade·Akitsu·Haneul·Coral Control 또는 Seira Approach)으로 넘긴다.</li></ul>' +
      ex('SOLARA 771, climb and maintain FL370.', 'FL370으로 상승') +
      ex('AOZORA 245, descend and maintain 13,000, proceed direct MIRAN.', '13,000피트로 강하, MIRAN 직행') +
      '<p>조종사의 요청(난기류로 고도 변경, 악기상 회피 기수)은 다른 항공기와 문제가 없으면 승인하고, 안 되면 대안을 줍니다. 군 훈련 공역이 열리면 그 고도 아래로는 통과시키지 않습니다.</p>' },
    { id: 'ho', t: '이양(주파수 변경)', h:
      '<p>이양은 두 단계입니다. ① 관제사끼리 레이더 표지를 넘기고 받는 <b>핸드오프</b>(게임: 깜박이는 표지 → 「수락」) ② 조종사에게 다음 주파수를 알려 주는 <b>교신 이양</b>("contact … ").</p>' +
      ex('VELA 301, contact Seira Tower 118.10.', '세이라 타워 118.10과 교신하세요') +
      '<p>넘기기 전에 <b>협정 조건</b>(고도·경로)을 맞춰야 합니다. 조건이 안 된 채 넘기거나, 넘기지 않은 채 구역을 벗어나면 감점입니다.</p>' },
    { id: 'emg', t: '비정상 상황', h:
      '<table class="lt"><tr><th>신호</th><th>뜻</th></tr><tr><td>MAYDAY ×3 · 스쿼크 7700</td><td>조난 — 중대하고 급박한 위험, 즉시 도움이 필요(이 게임의 예: 엔진 고장, 여압 상실, 연료 비상)</td></tr><tr><td>PAN-PAN ×3</td><td>긴급 — 안전에 관한 급한 일이지만 즉각적 조난은 아님(이 게임의 예: 응급 환자)</td></tr><tr><td>"Minimum fuel"</td><td>지금 받은 허가대로 가면 착륙할 수 있지만, 허가가 바뀌거나 더 지연되면 최종 예비 연료 아래로 내려갈 수 있는 상태. 비상 선언이 아니고 자동 우선권도 없음. 관제사는 예상되는 지연(또는 지연 없음)을 곧바로 알려 줌. 연료 비상(MAYDAY FUEL)과 구별</td></tr><tr><td>스쿼크 7600</td><td>무선 통신 두절 — 이 게임에서는 정해진 경로로 스스로 접근하므로 주변 항공기를 비켜 줌. 실제로는 마지막으로 받은 허가, 기상 상태, 그 나라가 공시한 통신 두절 절차에 따라 예상 경로 · 고도를 판단하고, 다른 주파수 등으로 교신 복구를 시도</td></tr><tr><td>스쿼크 7500</td><td>불법 간섭(게임에 없음)</td></tr></table>' +
      '<p>원칙: ① 비상기를 <b>가장 먼저</b>, 가장 짧은 경로로 ② 다른 항공기를 체공·감속·우회시켜 길을 비움 ③ 필요한 정보(바람·활주로)를 간결하게 ④ 교신을 줄임. 여압 상실기는 스스로 급강하하므로 그 아래 항공기부터 비킵니다(이 게임의 강하 목표는 10,000ft. 실제로는 지형 · 기체 절차 · 조종사 판단에 따름). MAYDAY인지 PAN-PAN인지는 고장의 종류가 아니라 위험이 얼마나 중대하고 급한가로 조종사가 정합니다 — 표의 예는 이 게임의 설정입니다.</p>' +
      '<p><b>복행</b>, <b>이륙 중단</b>, <b>조류 충돌 뒤 활주로 점검</b>, <b>유도로 폐쇄</b>, <b>악기상(적란운) 회피</b>도 고급 근무에서 나옵니다.</p>' },
    { id: 'mva', t: '지형과 최저 고도', h: '<p>레이더로 기수를 줄 때는 관제사가 지형 간격을 책임집니다. 구역별 최저 레이더 유도 고도(MVA) 아래로 내리지 않습니다. 접근 허가를 받아 ILS에 확립한 항공기는 절차 고도를 따르므로 예외입니다.</p>' },
    { id: 'eff', t: '효율', h: '<p>안전 다음은 흐름입니다. 조종사의 요청에 오래 답하지 않거나, 불필요하게 체공시키거나, 대기 지점에서 오래 세워 두면 지연 감점이 쌓입니다. 한 번의 송신에 여러 지시(기수 + 고도 + 속도)를 묶으면 주파수가 덜 붐빕니다.</p>' },
    { id: 'keys', t: '조작 방법', h:
      '<ul><li>항공기(표지·스트립)를 눌러 선택 → 아래 지시판에서 지시를 고르면 「보낼 지시」에 쌓임 → <b>송신</b>(Enter)</li><li>레이더: 선택한 뒤 <b>H</b>를 누른 채(또는 「기수 조준」) 화면을 누르면 그 방향 기수, 지점 이름을 누르면 직행</li><li>마우스 휠 = 확대·축소, 끌기 = 이동, <b>F</b> = 전체 보기</li><li><b>A</b> = 핸드오프 수락, <b>Esc</b> = 지시 지움, <b>Space</b> = 일시 정지, <b>1·2·3·4</b> = 배속</li><li>입력창(레이더): <code>VLA301 H100 A30 S180 ILS</code> — H 기수, L/R 좌·우선회 기수, A 고도(100ft 단위), S 속도, D 지점, ILS, HO 이양</li><li>상단 <b>음성</b> = 무선 음질의 교신 음성, <b>해석</b> = 교신 기록의 우리말 풀이, <b>코치</b> = 지금 할 일 안내</li><li>로비 <b>교관 동행</b> = 꼭 해야 할 일이 생기면 시간을 멈추고 무엇을 어떻게 말할지 알려 줌(초급 연습용) · <b>교신 훈련소</b> = 말하기 · 듣기 · 복창 대조 · 숫자 읽기 문제</li></ul>' }
  ];
  /* i18n:on */
  ATC.LEARN_SRC = ATC.LEARN_SRC || {}; ATC.LEARN_SRC.ko = LEARN_KO;
  ATC.learnInit = function () { ATC.LEARN = ATC.pick(ATC.LEARN_SRC); ATC.LEARN_BY = {}; ATC.LEARN.forEach(function (s) { ATC.LEARN_BY[s.id] = s; }); };
  ATC.learnInit();

  ATC.POS = {
    DEL: { id: 'DEL', ko: ATC.T('비행허가'), en: 'CLEARANCE DELIVERY', call: D.freq.DEL.n, fq: D.freq.DEL.fq, les: 'del', view: 'del', spd: 1,
      sum: ATC.T('비행계획을 확인하고 출발 허가를 내 줍니다. 숫자 하나까지 맞게 주고, 복창을 끝까지 듣습니다.'),
      brief: [ATC.T('조종사의 요청을 듣고 스트립을 선택'), ATC.T('ATIS 문자 · 순항 고도 방향 · CTOT를 확인해 필요한 항목을 켬'), ATC.T('SID와 초기 고도를 골라 「허가 송신」'), ATC.T('복창이 맞으면 「Readback correct」, 다르면 「정정」'), ATC.T('준비 완료 보고 뒤 Ground로 이양(CTOT가 있으면 시각 확인)')] },
    GND: { id: 'GND', ko: ATC.T('지상관제 · 램프'), en: 'GROUND / RAMP', call: D.freq.GND.n, fq: D.freq.GND.fq, les: 'gnd', view: 'ground', spd: 2,
      sum: ATC.T('푸시백부터 활주로 앞까지, 착륙 뒤 주기장까지. 유도로 위의 흐름을 설계합니다.'),
      brief: [ATC.T('푸시백 요청 → 뒤쪽 유도로를 보고 허가'), ATC.T('지상 이동 요청 → 목적지와 경로 후보를 골라 송신'), ATC.T('경로가 만나면 한쪽을 「정지」, 지나간 뒤 「계속 이동」'), ATC.T('화물 계류장(K)은 북쪽 활주로를 건넘 — 착륙기를 보고 「횡단 허가」'), ATC.T('대기 지점에 닿으면 Tower로 이양')] },
    TWR: { id: 'TWR', ko: ATC.T('관제탑'), en: 'TOWER', call: D.freq.TWR.n, fq: D.freq.TWR.fq, les: 'twr', view: 'ground', spd: 2,
      sum: ATC.T('활주로의 주인. 이륙·착륙·횡단을 한 번에 한 대씩, 끊김 없이 이어 붙입니다.'),
      brief: [ATC.T('착륙기: 활주로가 비는 것을 보고 「착륙 허가」(0.5NM 전까지)'), ATC.T('출발기: 착륙기와의 거리·후방난기류 간격을 보고 「이륙 허가」'), ATC.T('간격이 모자라면 「복행」'), ATC.T('이륙 뒤 Departure로, 활주로 이탈 뒤 Ground로 이양'), ATC.T('오른쪽 위 타워 레이더와 활주로 옆 FINAL 목록을 계속 확인')] },
    APP: { id: 'APP', ko: ATC.T('접근관제'), en: 'APPROACH / DEPARTURE', call: D.freq.APP.n, fq: D.freq.APP.fq, les: 'app', view: 'radar', spd: 2,
      sum: ATC.T('레이더 유도의 꽃. 사방에서 오는 도착기를 한 줄로 세워 ILS에 올립니다.'),
      brief: [ATC.T('깜박이는 표지 = 핸드오프 요청 → 「수락」'), ATC.T('거리 맞춰 강하 · 감속(250 → 210 → 180)'), ATC.T('최종 접근로 쪽으로 돌린 뒤 30° 이하로 만나는 기수 + 「ILS 접근 허가」'), ATC.T('로컬라이저에 올라타면(확립) Tower로 이양'), ATC.T('출발기는 FL190으로 올려 Control로 이양 · 3NM/1,000ft 분리 유지')] },
    ACC: { id: 'ACC', ko: ATC.T('지역관제(FIR)'), en: 'AREA CONTROL', call: D.freq.ACC.n, fq: D.freq.ACC.fq, les: 'acc', view: 'radar', spd: 4,
      sum: ATC.T('넓은 하늘의 교통정리. 10분 앞을 내다보고 고도로 풉니다.'),
      brief: [ATC.T('핸드오프 수락 → 경로와 고도를 훑어 만나는 지점을 찾음'), ATC.T('같은 고도로 만나면 한쪽 고도를 바꿈(동쪽행은 천 단위 홀수 · 서쪽행은 짝수)'), ATC.T('도착기는 진입 지점 13,000ft, 출발기는 요청 고도까지'), ATC.T('경계 전 다음 구역으로 이양'), ATC.T('5NM/1,000ft 분리 · 기본 배속 4배')] }
  };
  ATC.POS_ORDER = ['DEL', 'GND', 'TWR', 'APP', 'ACC'];
})(typeof globalThis !== 'undefined' ? globalThis : this);
