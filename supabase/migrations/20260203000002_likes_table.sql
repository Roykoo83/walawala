-- Create likes table
create table if not exists public.likes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  post_id uuid references public.posts(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, post_id)
);

-- Enable RLS
alter table public.likes enable row level security;

-- Policies
create policy "Likes are viewable by everyone."
  on likes for select
  using ( true );

create policy "Authenticated users can insert likes."
  on likes for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can delete own likes."
  on likes for delete
  using ( auth.uid() = user_id );
