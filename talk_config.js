/* 会話練習の「AIと話す」の設定（2026.10）
   ・endpoint：Cloudflare に置いた Worker の住所（例 'https://talk-ai.○○○.workers.dev'）。
     作り方（韓国語）：00_AI대화_설정방법.md　Worker の中身：_build/worker/talk-worker.js
   ・endpoint が空 '' のあいだは、ページの中で AI と話す代わりに、プロンプトをコピーして
     ChatGPT・Claude・Gemini などのアプリで使う形になる（これでも練習はできる）
   ・model：Workers AI のモデル。Worker の ALLOWED_MODELS に入っているものだけ使える
       '@cf/qwen/qwen3-30b-a3b-fp8'  安くて速い（1日の無料の分で約800回の返事）← ふだんはこれ
       '@cf/google/gemma-3-12b-it'   1回の費用が約4〜5倍（1日 約170回）
       '@cf/openai/gpt-oss-120b'     1回の費用が約5倍以上（1日 約150回より少ない） */
window.TALK_AI={endpoint:'',model:'@cf/qwen/qwen3-30b-a3b-fp8'};
