/* コミュニティ掲示板の設定
   Supabase のプロジェクトを作ったら、下の2つを入れてください。
   （Supabase → Project Settings → API にある「Project URL」と「anon public」キー）
   ※ anon キーは公開してよいキーです（アクセスはデータベース側の規則で制限しています）。
   ※ 「service_role」キーは絶対にここに入れないでください。
   空のままだと、掲示板は「準備中」の表示とサンプルの投稿だけになります。 */
/* 2026-09：設定は 8_사이트/assets/member_config.js（会員システムと共通）に移した。ここは読み替えるだけ */
window.COMMUNITY_CONFIG=window.MEMBER_CONFIG||{url:"",anonKey:""};
