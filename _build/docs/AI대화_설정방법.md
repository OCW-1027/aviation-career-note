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
2. Type: **Text**, Variable name: `ALLOWED_ORIGINS`, Value: `https://ocw-1027.github.io`
3. **Deploy** 를 누릅니다.

- 주소는 **`https://` + 도메인까지만** 씁니다. 뒤의 `/aviation-career-note/` 는 넣지 않습니다.
- 여러 개면 쉼표로 구분: `https://ocw-1027.github.io,https://example.com`
- 이 변수를 넣지 않아도 기본값이 `https://ocw-1027.github.io` 입니다.
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
