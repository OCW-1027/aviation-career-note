/* 会員システムの設定（コミュニティ掲示板と共通）
   Supabase のプロジェクトを作ったら、下の2つを入れてください。
   （Supabase → Project Settings → API にある「Project URL」と「anon public」キー）
   ※ anon キーは公開してよいキーです。データへのアクセスはデータベース側の規則（RLS）で制限しています。
   ※ 「service_role」キーは絶対にここに入れないでください。
   空のままだと、ログインの機能は表示されず、記録はこの端末にだけ保存されます。 */
window.MEMBER_CONFIG={
  url:"",
  anonKey:""
};
