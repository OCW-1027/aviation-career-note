/* コミュニティ掲示板の設定
   Supabase のプロジェクトを作ったら、下の2つを入れてください。
   （Supabase → Project Settings → API にある「Project URL」と「anon public」キー）
   ※ anon キーは公開してよいキーです（アクセスはデータベース側の規則で制限しています）。
   ※ 「service_role」キーは絶対にここに入れないでください。
   空のままだと、掲示板は「準備中」の表示とサンプルの投稿だけになります。 */
window.COMMUNITY_CONFIG={
  url:"",
  anonKey:""
};
