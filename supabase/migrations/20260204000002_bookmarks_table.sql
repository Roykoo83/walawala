-- Bookmarks Table
create table if not exists bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  post_id uuid references posts(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, post_id)
);

-- RLS Policies
alter table bookmarks enable row level security;

create policy "Users can bookmark posts"
  on bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users can remove bookmarks"
  on bookmarks for delete
  using (auth.uid() = user_id);

create policy "Users can view own bookmarks"
  on bookmarks for select
  using (auth.uid() = user_id);

-- Add category column to posts if not exists
alter table posts add column if not exists category text default 'life';

-- Index for bookmarks
create index if not exists bookmarks_user_id_idx on bookmarks(user_id);
create index if not exists bookmarks_post_id_idx on bookmarks(post_id);
create index if not exists posts_category_idx on posts(category);
