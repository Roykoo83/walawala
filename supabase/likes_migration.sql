-- Likes Table
create table if not exists likes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  post_id uuid references posts(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, post_id)
);

-- RLS Policies
alter table likes enable row level security;

create policy "Users can like posts"
  on likes for insert
  with check (auth.uid() = user_id);

create policy "Users can unlike posts"
  on likes for delete
  using (auth.uid() = user_id);

create policy "Anyone can view likes"
  on likes for select
  using (true);
