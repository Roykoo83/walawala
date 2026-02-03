-- Enable Row Level Security
-- Note: auth.users RLS is enabled by default in Supabase.
-- alter table auth.users enable row level security; -- Removed due to permission error

-- Create profiles table
create table public.profiles (
  id uuid not null references auth.users(id) on delete cascade,
  email text,
  nickname text,
  avatar_url text,
  nationality text,
  visa_type text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create posts table
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references public.profiles(id) not null,
  category text not null,
  title text not null,
  content text not null,
  images text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.posts enable row level security;

create policy "Posts are viewable by everyone."
  on posts for select
  using ( true );

create policy "Authenticated users can insert posts."
  on posts for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can update own posts."
  on posts for update
  using ( auth.uid() = author_id );

create policy "Users can delete own posts."
  on posts for delete
  using ( auth.uid() = author_id );

-- Create comments table
create table public.comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.posts(id) on delete cascade not null,
  author_id uuid references public.profiles(id) not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.comments enable row level security;

create policy "Comments are viewable by everyone."
  on comments for select
  using ( true );

create policy "Authenticated users can insert comments."
  on comments for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can update own comments."
  on comments for update
  using ( auth.uid() = author_id );

create policy "Users can delete own comments."
  on comments for delete
  using ( auth.uid() = author_id );

-- Storage Bucket Policy (You need to create 'images' bucket in Dashboard first)
-- This SQL just sets policies if the bucket exists.
-- create policy "Public Access" on storage.objects for select using ( bucket_id = 'images' );
-- create policy "Auth Upload" on storage.objects for insert with check ( bucket_id = 'images' and auth.role() = 'authenticated' );
