# AI 대화 설정 방법 (Cloudflare Workers AI · 무료)

> 대상: 회화 연습 페이지(`会話練習_日韓英.html`, 공개 주소 `talk.html`)의 **「AI와 대화」** 기능
> 이 문서(*.md)는 공개되지 않습니다. 개발 지식 없이 따라 할 수 있게 적었습니다. (2026.10)

---

## 0. 먼저 알아 두기

- 사이트 안의 채팅창이 **Cloudflare에 올린 작은 프로그램(Worker)** 을 거쳐 AI(Workers AI)와 대화합니다. **API 키는 필요 없습니다.**
- **무료 범위:** 하루 **10,000 뉴런(Neurons)**. 기본 모델(`@cf/qwen/qwen3-30b-a3b-fp8`)은 대답 1번에 약 10~12뉴런 → **하루 약 800번 대답**까지 무료.
  - 하루 사용량은 **매일 한국·일본 시간 오전 9시(UTC 0시)** 에 다시 채워집니다.
  - 무료 플랜에서는 다 쓰면 그날은 AI가 멈출 뿐, **요금이 청구되지 않습니다.** (유료 플랜을 따로 신청하지 않는 한)
  - 다 쓴 날은 채팅창이 자동으로 **“다른 AI 앱에서 연습하기”**(프롬프트 복사 → ChatGPT·Claude·Gemini) 방식으로 바뀝니다.
- **아직 설정하지 않아도 페이지는 동작합니다.** `talk_config.js`의 주소가 비어 있으면 처음부터 “프롬프트 복사” 방식으로 연습합니다.
- Worker는 **대화 내용을 기록하지 않습니다.** (실패했을 때 “quota”, “ai” 같은 종류만 남김)

관련 파일

| 파일 | 역할 |
|---|---|
| `_build/worker/talk-worker.js` | Cloudflare에 붙여 넣을 Worker 코드 (사이트에는 공개되지 않음) |
| `talk_config.js` | Worker 주소와 모델 이름을 적는 곳 (사이트에 공개됨) |
| `talk_topics.js` | 「자유 대화(AI)」의 주제 목록 |

---

## 1. Cloudflare 무료 계정 만들기

1. <https://dash.cloudflare.com/sign-up> 에서 이메일과 비밀번호로 가입합니다.
2. 받은 메일의 확인 링크를 누릅니다.
3. 요금제를 묻는 화면이 나오면 **Free(무료)** 를 고릅니다. 카드 등록은 필요 없습니다.

## 2. Worker 만들기

1. 대시보드 왼쪽 메뉴에서 **Compute (Workers)** → **Workers & Pages** 를 엽니다.
2. **Create**(만들기) → **Start with Hello World!** 를 고릅니다.
3. 이름(Worker name)에 `talk-ai` 라고 쓰고 **Deploy**(배포)를 누릅니다.
4. 화면에 `https://talk-ai.○○○.workers.dev` 같은 주소가 나옵니다. **이 주소가 나중에 필요합니다.** (○○○은 계정마다 다름)

## 3. 코드 붙여 넣기

1. 방금 만든 Worker 화면에서 **Edit code**(코드 편집)를 누릅니다.
2. 왼쪽 편집기 안의 내용을 **모두 지웁니다** (Ctrl+A → Delete).
3. PC의 `콘텐츠\_build\worker\talk-worker.js` 를 메모장으로 열어 **전부 복사**(Ctrl+A → Ctrl+C)한 뒤 편집기에 붙여 넣습니다(Ctrl+V).
4. 오른쪽 위 **Deploy** 를 누릅니다.

## 4. Workers AI 연결하기 (이름: `AI`)

1. Worker 화면 위쪽 탭에서 **Settings**(설정) → **Bindings**(바인딩)로 갑니다.
2. **Add**(추가) → **Workers AI** 를 고릅니다.
3. **Variable name**(변수 이름)에 정확히 `AI` (대문자 두 글자)라고 쓰고 저장(**Add Binding** / **Deploy**)합니다.

## 5. 허용할 사이트 주소 정하기 (`ALLOWED_ORIGINS`)

다른 사이트가 이 Worker를 몰래 쓰지 못하게, **우리 사이트에서 온 요청에만** 대답하게 합니다.

1. **Settings** → **Variables and Secrets**(변수와 비밀) → **Add**(추가)
2. Type: **Text**, Variable name: `ALLOWED_ORIGINS`, Value: `https://ocw-1027.github.io,https://www.ac-note.com,https://ac-note.com`
3. **Deploy** 를 누릅니다.

- 주소는 **`https://` + 도메인까지만** 씁니다. 뒤의 `/aviation-career-note/` 는 넣지 않습니다.
- 여러 개면 쉼표로 구분: `https://ocw-1027.github.io,https://www.ac-note.com`
- 이 변수를 넣지 않으면 기본값은 `https://ocw-1027.github.io` 하나입니다. **공식 도메인(www.ac-note.com)을 연결하는 날**에는 이 변수에 위 3개 주소를 넣으세요(코드는 그대로, 2026-10-18 배포본 기준).
- PC에서 시험할 때 쓰는 `http://localhost` 도 기본으로 허용됩니다. 막고 싶으면 변수 `ALLOW_LOCALHOST` 를 만들어 값 `false` 를 넣습니다.

## 6. 잘 동작하는지 확인

브라우저 주소창에 2단계에서 받은 Worker 주소를 넣어 엽니다. 아래처럼 보이면 성공입니다.

```
{"ok":true,"service":"talk-ai","ai":true,"model":"@cf/qwen/qwen3-30b-a3b-fp8","origins":["https://ocw-1027.github.io"]}
```

- `"ai":false` 이면 → 4단계(이름이 정확히 `AI` 인지)를 다시 확인합니다.
- `origins` 가 이상하면 → 5단계의 값을 확인합니다.

## 7. 사이트에 Worker 주소 넣기

1. PC의 `콘텐츠\talk_config.js` 를 메모장으로 엽니다.
2. 마지막 줄의 `endpoint:''` 따옴표 안에 Worker 주소를 넣습니다.
   ```js
   window.TALK_AI={endpoint:'https://talk-ai.○○○.workers.dev',model:'@cf/qwen/qwen3-30b-a3b-fp8'};
   ```
   - 따옴표는 **작은따옴표(')** 그대로 둡니다.
3. 저장한 뒤 평소처럼 GitHub에 올립니다. 몇 분 뒤 `talk.html` 의 「AI와 대화」에 **시작** 버튼이 나타납니다.

## 8. 사용량 확인

- Cloudflare 대시보드 왼쪽 메뉴 **AI** → **Workers AI** 에서 오늘 쓴 **Neurons** 를 볼 수 있습니다(화면 이름은 바뀔 수 있음).
- 하루 10,000을 넘으면 그날은 채팅창이 “다른 AI 앱에서 연습하기” 로 바뀝니다. 다음 날 오전 9시(한국·일본)에 다시 됩니다.
- 대략 계산: 대답 1번 ≈ 10~12뉴런 → 한 사람이 한 번에 10번 주고받으면 약 120뉴런 → **하루 약 80명분**.

## 9. 모델 (2026-10-09 실제 시험 결과)

지금 사이트는 **`@cf/openai/gpt-oss-120b`** 를 씁니다(`talk_config.js` 의 `model`).

| 모델 | 시험 결과 | 하루 무료로 대략 |
|---|---|---|
| `@cf/openai/gpt-oss-120b` | ✅ 일본어 자연스러움, 정해진 형식(JSON) 잘 지킴, 대답 3~8초 | 약 100~170번 |
| `@cf/qwen/qwen3-30b-a3b-fp8` | ❌ 대답이 비거나 형식이 여러 개 섞여 나옴 | (약 800번) |
| `@cf/google/gemma-3-12b-it` | ❌ 오류 | — |

- 무료분(하루 10,000뉴런)을 다 쓰면 그날은 자동으로 “다른 AI 앱에서 연습하기”로 바뀝니다.
- 이용자가 늘어 부족해지면: Workers **유료 플랜(월 5달러)** 으로 바꾸면 무료분을 넘은 만큼만 1,000뉴런당 0.011달러가 붙습니다. gpt-oss-120b 대답 1,000번 ≈ 수십 센트~1달러 정도(추정).

## 10. 지나친 사용 막기 (이미 들어 있음)

Worker 코드에 다음 제한이 들어 있습니다.

- 한 번에 메시지 **16개까지**, 메시지 1개 **1,200자까지** (처음의 설정 프롬프트는 3,000자까지)
- AI 대답 길이 **max_tokens 400** (gpt-oss-120b는 ‘생각하는 부분’도 같은 한도를 쓰므로 **1000**. 400이면 대답(JSON)이 중간에 잘렸습니다 — 2026.10)
- gpt-oss는 **생각하는 양을 ‘low’(적게)** 로 요청합니다(Cloudflare 문서의 `reasoning: { effort: "low" }` 형식). 이 형식이 거절되면 Worker가 자동으로 예전 형식으로 한 번 다시 보냅니다.
- 모델은 위 표의 3개만
- 같은 IP에서 **1분에 20번까지** (Worker 안의 간단한 계산. 정확한 제한은 아래 고급 설정)
- 우리 사이트 주소(`ALLOWED_ORIGINS`)에서 온 요청만

**고급(선택):** Cloudflare의 Rate Limiting 바인딩은 대시보드 화면에서는 만들 수 없고 `wrangler`(명령줄 도구)로만 설정됩니다. 필요해지면 `wrangler.toml` 에 아래를 넣고 `wrangler deploy` 합니다. 이름 `RL` 이 있으면 Worker가 자동으로 그것을 씁니다.

```toml
[[ratelimits]]
name = "RL"
namespace_id = "1001"
simple = { limit = 20, period = 60 }
```

## 11. 문제가 생겼을 때

| 화면에 보이는 것 | 원인과 해결 |
|---|---|
| 「AI와 대화」에 **시작** 버튼이 없고 프롬프트만 나옴 | `talk_config.js` 의 `endpoint` 가 비어 있거나 `https://` 로 시작하지 않음 (7단계) |
| “AI에 연결하지 못했어요” | Worker 주소 오타, 또는 `ALLOWED_ORIGINS` 에 사이트 주소가 없음 (5단계). Worker 주소를 브라우저로 열어 6단계처럼 보이는지 확인 |
| 바로 “다른 AI 앱” 화면으로 바뀌며 “오늘 무료로 쓸 수 있는 양이 끝났습니다” | 하루 무료 사용량 소진. 다음 날 오전 9시에 복구 |
| “다른 AI 앱” 화면으로 바뀜(사용량 문구 없음) | AI 연결 이름이 `AI` 가 아님(4단계), 또는 사이트 주소 미허용(5단계) |
| “너무 빨리 보냈어요” | 1분 20번 제한. 잠시 뒤 다시 |
| 채팅에 `{"reply":"…` 같은 글자가 보임 | 옛 페이지·옛 Worker 코드. 페이지는 2026.10 수정판부터 이런 글자를 절대 보여 주지 않음. Worker도 12단계대로 새 코드로 바꿔 주세요 |
| “AI의 대답이 늦어지고 있어요” | 30초 안에 대답이 오지 않음. **다시 보내기** 를 누르면 됨 |

Worker가 돌려주는 오류 이름: `origin`(허용 안 된 사이트) · `bad_request`(형식 오류) · `too_large`(너무 김) · `rate`(횟수 제한) · `quota`(오늘 무료분 소진) · `config`(AI 연결 없음) · `ai`/`empty`/`busy`(AI 쪽 일시 오류)

## 12. Worker 코드 업데이트 방법 (코드를 고친 뒤 · 2026.10 업데이트 포함)

`_build/worker/talk-worker.js` 가 바뀌면 Cloudflare에 있는 코드도 **직접 바꿔 넣어야** 합니다. (GitHub에 올리는 것만으로는 바뀌지 않습니다.) 4·5단계 설정(AI 연결, 허용 주소)은 그대로 남습니다.

1. PC의 `콘텐츠\_build\worker\talk-worker.js` 를 메모장으로 엽니다 → **Ctrl+A → Ctrl+C** (전부 복사).
2. <https://dash.cloudflare.com> → 왼쪽 **Compute (Workers)** → **Workers & Pages** → **`talk-ai`** 를 누릅니다.
3. 오른쪽 위 **Edit code**(코드 편집, `</>` 모양)를 누릅니다.
4. 왼쪽 편집기(`worker.js`)를 클릭 → **Ctrl+A → Delete** 로 전부 지우고 → **Ctrl+V** 로 붙여 넣습니다.
5. 오른쪽 위 **Deploy**(배포)를 누릅니다. “Deployed” 같은 표시가 나오면 끝입니다.
6. 확인: 브라우저로 Worker 주소(`https://talk-ai.kumamongmong.workers.dev`)를 열어 `{"ok":true, … "ai":true …}` 가 보이면 정상입니다. 그 뒤 `talk.html` 의 「AI와 대화」에서 2~3번 주고받아 봅니다.

- 붙여 넣은 첫 줄이 `// 航空キャリアノート：会話練習の「AIと話す」の中継` 로 시작하고, 마지막 줄이 `};` 인지 확인하면 빠진 곳 없이 복사된 것입니다.
- **(선택)** 생각하는 양을 바꾸고 싶으면: **Settings → Variables and Secrets → Add** → Type **Text**, 이름 `REASONING_EFFORT`, 값 `low`(기본) / `medium` / `high` / `off`(예전 방식만 사용). 보통은 만들지 않아도 됩니다.
- 혹시 업데이트 뒤 AI가 대답하지 않으면: 같은 화면 위쪽 **Deployments**(배포) 탭에서 바로 전 버전을 골라 **Rollback**(되돌리기)할 수 있습니다. 페이지는 옛 Worker로도 동작합니다.

## 13. 고정밀 음성 인식 (2026-10-10 추가)

- 회화 연습의 🎤는 Worker가 지원하면 **고정밀 인식**(Workers AI의 Whisper, `@cf/openai/whisper-large-v3-turbo`)을 씁니다. 말하는 동안에는 글자가 나오지 않고, 「■ 종료」를 누른 뒤 1~3초 안에 글자가 나옵니다. 브라우저 인식보다 일본어·한국어·항공 용어를 더 정확하게 알아듣습니다.
- 켜는 방법: 12단계처럼 `talk-worker.js` 를 새로 붙여 넣고 **Deploy** 하면 끝입니다. 추가 설정은 없습니다(같은 `AI` 연결을 씁니다).
- 확인: Worker 주소를 열어 `"stt":true` 가 보이면 켜진 것입니다. 페이지는 열 때 이것을 확인하고, 없으면(옛 Worker) 지금까지처럼 브라우저 인식을 씁니다. 그래서 **푸쉬와 Deploy 순서는 상관없습니다.**
- 비용: 음성 1분에 약 0.0005달러 상당. AI 대화와 같은 하루 무료 사용량(10,000 neurons)에서 빠지며, 무료 사용량이 끝나면 자동으로 브라우저 인식으로 돌아갑니다.
- 음성은 문자로 바꾸는 데만 쓰고 저장하지 않습니다. 한 번에 최대 60초입니다.
- (2026-10-10 개선) 인식할 때 **대화의 흐름**을 함께 보냅니다. AI 대화에서는 AI의 직전 말을, 대화 연습에서는 바로 앞 상대의 대사(첫 대사면 장면 이름)를 보냅니다. Whisper가 이어지는 말을 더 정확하게 알아듣습니다. 정답 문장은 보내지 않으므로 점수가 부풀려지지 않습니다. 이 개선도 Worker를 다시 붙여 넣고 Deploy해야 적용됩니다(그 전에는 지금처럼 동작).

## 14. 예비(Groq) 설정 — 무료분이 끝났을 때 자동 전환 (2026-10-18 추가)
배포본: `_build/worker/talk-worker.js`(2026-10-18 Groq 예비판, Cloudflare의 talk-ai와 같은 코드)

**무엇이 바뀌나**
- 평소에는 지금처럼 Cloudflare Workers AI 무료분을 씁니다.
- Cloudflare가 「오늘 무료분 끝(quota)」이나 「혼잡(busy)」을 내면, 그 요청만 Groq 무료분으로 자동 전환합니다.
  - AI 대화: qwen·gemma 요청 → `llama-3.3-70b-versatile`, gpt-oss-120b 요청 → `openai/gpt-oss-120b`(생각 내용은 돌려주지 않음). 변수 `GROQ_MODEL`로 하나로 고정할 수 있습니다.
  - 받아쓰기: `whisper-large-v3-turbo`(Cloudflare와 같은 종류)
- Groq 무료분까지 다 쓰면 지금처럼 `quota`를 돌려줍니다 → 페이지가 「다른 AI 앱으로 연습」으로 넘어갑니다.
- 응답 모양은 그대로(`{text, model}` / `{error}`)이고, Groq로 처리된 대화에만 `via:'groq'`가 붙습니다(페이지는 무시해도 됨).
- 둘 다 무료 플랜이라 청구가 생기지 않습니다. Groq를 유료(Developer)로 올리지만 않으면 됩니다.
- `GROQ_API_KEY`를 넣지 않으면 예전과 완전히 같게 동작합니다.

**설정 순서(약 10분)**
1. **Groq 키 발급:** https://console.groq.com 가입(Google 계정 가능) → 왼쪽 **API Keys** → **Create API Key** → 이름 `talk-ai` → 키 복사(한 번만 보임). 카드 등록 화면이 나오면 진행하지 않습니다.
2. **Cloudflare에 키 넣기:** Workers & Pages → **talk-ai** → **Settings** → **Variables and Secrets** → **Add** → 종류 **Secret**, 이름 `GROQ_API_KEY`, 값 = 복사한 키 → **Deploy**. (키는 코드·저장소에 절대 쓰지 않습니다.)
3. **코드 바꾸기:** talk-ai → **Edit code** → `worker.js` 내용을 모두 지우고 `_build/worker/talk-worker.js` 내용을 붙여넣기 → **Deploy**.
4. **확인:** 브라우저로 Worker 주소(예: https://talk-ai.kumamongmong.workers.dev)를 열어 `"groq":true`가 보이면 끝입니다. 실제 전환은 Cloudflare 무료분이 끝났을 때만 일어나며, **Observability → Logs**에 `talk-ai: groq` / `talk-ai: stt_groq`가 보이면 Groq로 넘어간 것입니다. (`groq_quota` 등은 Groq 쪽 한도·오류)

**되돌리기**
- `GROQ_API_KEY` Secret을 지우면 예전과 똑같이 동작합니다(코드는 그대로 둬도 됨).
- 또는 Deployments에서 이전 버전(2dd7c48a)으로 Rollback합니다.

**참고**
- Groq 무료 한도는 바뀔 수 있습니다(공개 정리 자료 기준: 받아쓰기 하루 약 2,000회, 대화 모델별 하루 약 1,000회). 실제 값은 Groq 콘솔 **Settings → Limits**에서 확인합니다.
- 대화·음성 내용은 지금처럼 로그에 남기지 않습니다. Groq로 가는 요청은 Groq 이용약관의 데이터 처리 방침을 따릅니다.
- 모델 선택: 사이트는 `talk_config.js`에서 gpt-oss-120b를 씁니다(2026-10 시험에서 qwen3는 빈 답·형식 깨짐이 있어 gpt-oss로 정함, 9절). gpt-oss는 Cloudflare 무료분을 빨리 쓰지만(하루 약 100~170회), 그 뒤에는 Groq의 같은 모델(openai/gpt-oss-120b)이 이어받으므로 그대로 둡니다.
- 영상 제작용 받아쓰기 점검은 2026-10-18부터 이 Worker를 쓰지 않습니다(사이트 이용자 몫을 줄이지 않음).

## 15. Claude 연결 — Max 요금제의 월 API 크레딧 사용 (2026-10-18 추가)
배포본: `_build/worker/talk-worker.js`(2026-10-18 Claude판). 순서는 **Claude → Cloudflare Workers AI → Groq**입니다.

- 비밀 변수 `ANTHROPIC_API_KEY`가 있을 때만 Claude를 씁니다. 없으면 예전과 완전히 같습니다.
- 모델: 기본 `claude-haiku-5-5`(생각하기 끔·effort low). 품질이 부족하면 변수 `CLAUDE_MODEL`(Text)에 `claude-sonnet-5-5`를 넣어 시험합니다.
- (선택) 변수 `CLAUDE_THINKING`(Text): `on`=생각하고 답함(느리지만 역할을 덜 헷갈림) / `off`=생각하지 않음. 비워 두면 Haiku만 off. 변수 `CLAUDE_EFFORT`(Text): `low`(기본) / `medium` / `high`. Worker 주소를 열면 `claude_thinking`·`claude_effort`로 지금 값이 보입니다. 페이지의 `talk_config.js`(model)는 바꾸지 않습니다 — 그 값은 Claude가 실패해 Cloudflare로 넘어갈 때만 쓰입니다.
- **자동 대체:** 크레딧 부족·결제 오류·지출 한도 도달·키 오류(401/403)·429·서버 오류(5xx/529)·15초 안에 답 없음·빈 답 → 그 요청은 바로 Cloudflare(→ Groq)가 답합니다. 사용자 화면에는 오류가 나오지 않습니다. 크레딧 부족·키 오류 뒤에는 10분 동안 Claude를 건너뜁니다(기다리는 시간을 없앰).
- 그래서 그달 크레딧이 끝나거나, 요금제를 바꾸거나(Max 20x → 5x) 해지해도 **사이트와 Worker를 고칠 필요가 없습니다.** 다시 Claude를 쓰려면 키(또는 크레딧)만 있으면 됩니다.
- 응답 모양은 그대로(`{text, model}`)이고, Claude가 답한 대화에만 `via:'claude'`가 붙습니다(페이지는 무시).
- 프롬프트 캐싱은 쓰지 않습니다(시스템 지시가 최대 3,000자라 캐싱 최소 길이에 못 미침).

**지금 운영값(2026-10-18 실제 시험으로 정함)**
- `CLAUDE_MODEL` = `claude-sonnet-5-5`, `CLAUDE_THINKING` = `on` (둘 다 Text 변수). 코드 기본값(Haiku)은 변수를 지웠을 때만 쓰입니다.
- 시험: 실제 회화 페이지 7장면(일·한·영, AI가 손님 역·직원 역) + 역할 혼동이 잘 나던 한 차례를 8번 반복.
  - Haiku·생각 끔: 학습자의 연습 표현을 AI가 대신 말함 7/8 (페이지 안전장치가 걸러 「다시 보내 주세요」가 뜸), 3~4문장으로 길어짐
  - Haiku·생각 켬: 5/8
  - **Sonnet·생각 켬: 0/8**, 1~2문장 지킴, 교정·힌트 정상, 「おわり」 정리 정상. 응답 1.4~4.2초
- 비용 어림(공식 단가 기준, 실측 아님): Sonnet은 1회 주고받기에 약 1센트 → 월 150달러 한도로 약 1만 회 이상. 방문자가 늘어 한도에 가까워지면 Haiku로 되돌리는 것을 다시 검토(변수만 바꿈).

**설정 순서**
1. **Console(platform.claude.com):** Settings → Workspaces → 회화 전용 워크스페이스 `acn-talk` → **Limits**에서 월 지출 한도(Max 20x: 150달러 / Max 5x: 80달러 권장). 자동 충전은 끔.
2. 그 워크스페이스에서 API 키 생성(이름 `talk-ai-worker`) → Cloudflare **talk-ai → Settings → Variables and Secrets → Add** → 종류 **Secret**, 이름 `ANTHROPIC_API_KEY`, 값 = 키 → Deploy. 키는 채팅·코드·저장소에 쓰지 않습니다.
3. **코드 바꾸기:** 12절 방법대로 `talk-worker.js`를 붙여 넣고 Deploy.
4. **확인:** Worker 주소를 열어 `"claude":true,"claude_model":"claude-haiku-5-5"`가 보이면 연결된 것입니다. **Observability → Logs**에 `talk-ai: claude`가 보이면 Claude가 답한 것, `talk-ai: claude_credit`(크레딧 부족)·`claude_quota`(한도)·`claude_auth`(키 문제)·`claude_busy`·`claude_timeout`·`claude_bad`(요청 형식 문제 — 반복되면 Claude 채팅에 알려 주세요)는 Cloudflare로 넘어간 것입니다.

**되돌리기**
- Cloudflare에서 `ANTHROPIC_API_KEY` Secret을 지우면 예전(Cloudflare → Groq)과 똑같이 동작합니다(코드는 그대로 둬도 됨).

**요금제를 바꿀 때**
- Max 20x → 5x: 크레딧이 월 100달러로 줄 뿐 그대로 동작합니다. Console 지출 한도만 80달러 정도로 낮춥니다.
- 해지·Pro로 변경: 남은 크레딧이 끝나면 자동으로 Cloudflare → Groq로 넘어갑니다. 고칠 것 없음.
- 쓴 금액은 Console의 Usage / Cost에서 워크스페이스별로 봅니다.
