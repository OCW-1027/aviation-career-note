-- ============================================================
-- 航空キャリアノート コミュニティ掲示板：Supabase の初期設定
-- 使い方：Supabase の管理画面 → SQL Editor → この内容を貼り付けて「Run」
-- 何度実行しても壊れないように作っています（if not exists など）
-- ============================================================

-- 1) プロフィール（ニックネーム）
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null check (char_length(nickname) between 2 and 20),
  created_at timestamptz not null default now()
);

-- 2) 管理者（ここに入れたユーザーだけが、他人の投稿を非表示にできる）
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

-- 3) 投稿
create table if not exists public.posts (
  id bigserial primary key,
  board text not null check (board in ('qa','info','career','free')),
  title text not null check (char_length(title) between 2 and 80),
  body text not null check (char_length(body) between 2 and 5000),
  lang text not null default 'ja' check (lang in ('ja','ko','en')),
  author uuid not null references auth.users(id) on delete cascade default auth.uid(),
  author_name text not null,
  deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists posts_board_created on public.posts (board, created_at desc);

-- 4) コメント
create table if not exists public.comments (
  id bigserial primary key,
  post_id bigint not null references public.posts(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  author uuid not null references auth.users(id) on delete cascade default auth.uid(),
  author_name text not null,
  deleted boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists comments_post on public.comments (post_id, created_at);

-- 5) 通報
create table if not exists public.reports (
  id bigserial primary key,
  target_type text not null check (target_type in ('post','comment')),
  target_id bigint not null,
  reason text not null check (char_length(reason) between 1 and 500),
  reporter uuid not null references auth.users(id) on delete cascade default auth.uid(),
  created_at timestamptz not null default now()
);

-- 管理者かどうかを調べる関数
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as
$$ select exists (select 1 from public.admins where user_id = auth.uid()) $$;

-- ============================================================
-- 行ごとのアクセスの制限（RLS）
-- ============================================================
alter table public.profiles enable row level security;
alter table public.admins   enable row level security;
alter table public.posts    enable row level security;
alter table public.comments enable row level security;
alter table public.reports  enable row level security;

-- プロフィール：誰でも読める／本人だけ作成・変更
drop policy if exists "profiles read" on public.profiles;
create policy "profiles read" on public.profiles for select using (true);
drop policy if exists "profiles insert own" on public.profiles;
create policy "profiles insert own" on public.profiles for insert with check (id = auth.uid());
drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own" on public.profiles for update using (id = auth.uid());

-- 管理者の表：本人が自分を確認できるだけ（追加は管理画面から）
drop policy if exists "admins read self" on public.admins;
create policy "admins read self" on public.admins for select using (user_id = auth.uid());

-- 投稿：非表示でないものは誰でも読める（管理者は全部）／ログインした人が本人名義で作成／本人・管理者が変更
drop policy if exists "posts read" on public.posts;
create policy "posts read" on public.posts for select using (deleted = false or author = auth.uid() or public.is_admin());
drop policy if exists "posts insert" on public.posts;
create policy "posts insert" on public.posts for insert with check (auth.uid() is not null and author = auth.uid());
drop policy if exists "posts update" on public.posts;
create policy "posts update" on public.posts for update using (author = auth.uid() or public.is_admin());

-- コメント：同じ考え方
drop policy if exists "comments read" on public.comments;
create policy "comments read" on public.comments for select using (deleted = false or author = auth.uid() or public.is_admin());
drop policy if exists "comments insert" on public.comments;
create policy "comments insert" on public.comments for insert with check (auth.uid() is not null and author = auth.uid());
drop policy if exists "comments update" on public.comments;
create policy "comments update" on public.comments for update using (author = auth.uid() or public.is_admin());

-- 通報：ログインした人が作成／管理者だけが読める
drop policy if exists "reports insert" on public.reports;
create policy "reports insert" on public.reports for insert with check (auth.uid() is not null and reporter = auth.uid());
drop policy if exists "reports read admin" on public.reports;
create policy "reports read admin" on public.reports for select using (public.is_admin());

-- 投稿の更新日時を自動で入れる
create or replace function public.touch_updated_at() returns trigger language plpgsql as
$$ begin new.updated_at = now(); return new; end $$;
drop trigger if exists posts_touch on public.posts;
create trigger posts_touch before update on public.posts for each row execute function public.touch_updated_at();

-- ============================================================
-- 投稿者とニックネームをサーバー側で決める（ブラウザーから送られた値は信用しない）
-- ・作成時：author をログイン中の本人に、author_name を本人のプロフィールのニックネームに固定
-- ・変更時：author・author_name・作成日時は変えられない
-- ============================================================
create or replace function public.set_author_on_insert() returns trigger
language plpgsql security definer set search_path = public as
$$
declare nm text;
begin
  select nickname into nm from public.profiles where id = auth.uid();
  if nm is null then
    raise exception 'profile (nickname) is required before posting';
  end if;
  new.author := auth.uid();
  new.author_name := nm;
  new.deleted := false;
  new.created_at := now();
  return new;
end $$;

create or replace function public.keep_author_on_update() returns trigger
language plpgsql as
$$
begin
  new.author := old.author;
  new.author_name := old.author_name;
  new.created_at := old.created_at;
  return new;
end $$;

drop trigger if exists posts_set_author on public.posts;
create trigger posts_set_author before insert on public.posts for each row execute function public.set_author_on_insert();
drop trigger if exists posts_keep_author on public.posts;
create trigger posts_keep_author before update on public.posts for each row execute function public.keep_author_on_update();
drop trigger if exists comments_set_author on public.comments;
create trigger comments_set_author before insert on public.comments for each row execute function public.set_author_on_insert();
drop trigger if exists comments_keep_author on public.comments;
create trigger comments_keep_author before update on public.comments for each row execute function public.keep_author_on_update();

-- 通報者もサーバー側で固定
create or replace function public.set_reporter() returns trigger
language plpgsql security definer set search_path = public as
$$ begin new.reporter := auth.uid(); new.created_at := now(); return new; end $$;
drop trigger if exists reports_set_reporter on public.reports;
create trigger reports_set_reporter before insert on public.reports for each row execute function public.set_reporter();

-- ============================================================
-- 管理者の登録（自分がログインした後に実行）
-- 1. サイトの掲示板にメールでログインする
-- 2. Supabase → Authentication → Users で自分の User UID をコピー
-- 3. 下の行の 'ここにUID' を置き換えて、先頭の「-- 」を消して実行
-- ============================================================
-- insert into public.admins (user_id) values ('ここにUID');

-- ============================================================
-- 会員システム（2026-09 追加）：プロフィールの言語、学習の記録、会員ごとの保存データ、退会
-- 掲示板と同じプロジェクトで使う。何度実行しても壊れない
-- ============================================================

-- プロフィールに言語を足す
alter table public.profiles add column if not exists lang text not null default 'ja' check (lang in ('ja','ko','en'));

-- 学習の記録（過去問題など）：1問1行。item_id は "試験期-科目-問番号"（例 EX2606-P42-1）。資格が増えても同じ表を使う
create table if not exists public.study_records (
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  item_id text not null check (char_length(item_id) between 3 and 60),
  ok boolean not null default false,
  marked boolean not null default false,
  answered_at timestamptz not null default now(),
  primary key (user_id, item_id)
);
create index if not exists study_records_user on public.study_records (user_id, answered_at desc);

-- 会員ごとの保存データ（ストーリー設計シートなど）：kind ごとに JSON を1つ
create table if not exists public.user_docs (
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  kind text not null check (char_length(kind) between 1 and 40),
  data jsonb not null default '{}'::jsonb check (pg_column_size(data) < 200000),
  updated_at timestamptz not null default now(),
  primary key (user_id, kind)
);

alter table public.study_records enable row level security;
alter table public.user_docs     enable row level security;

-- 本人だけが読み書きできる
drop policy if exists "study own select" on public.study_records;
create policy "study own select" on public.study_records for select using (user_id = auth.uid());
drop policy if exists "study own insert" on public.study_records;
create policy "study own insert" on public.study_records for insert with check (user_id = auth.uid());
drop policy if exists "study own update" on public.study_records;
create policy "study own update" on public.study_records for update using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "study own delete" on public.study_records;
create policy "study own delete" on public.study_records for delete using (user_id = auth.uid());

drop policy if exists "docs own select" on public.user_docs;
create policy "docs own select" on public.user_docs for select using (user_id = auth.uid());
drop policy if exists "docs own insert" on public.user_docs;
create policy "docs own insert" on public.user_docs for insert with check (user_id = auth.uid());
drop policy if exists "docs own update" on public.user_docs;
create policy "docs own update" on public.user_docs for update using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "docs own delete" on public.user_docs;
create policy "docs own delete" on public.user_docs for delete using (user_id = auth.uid());

-- 退会：本人が自分のアカウントを消す（投稿・記録は on delete cascade で一緒に消える）
create or replace function public.delete_me() returns void
language plpgsql security definer set search_path = public, auth as
$$
begin
  if auth.uid() is null then raise exception 'not logged in'; end if;
  delete from auth.users where id = auth.uid();
end
$$;
revoke all on function public.delete_me() from public;
grant execute on function public.delete_me() to authenticated;
