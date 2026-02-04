-- Courses Table (KIIP, Korean, Culture 교육 콘텐츠)
create table if not exists courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  category text not null check (category in ('kiip', 'korean', 'culture')),
  content_type text not null check (content_type in ('video', 'text', 'document')),
  content_url text,
  thumbnail_url text,
  duration text,
  level text not null check (level in ('beginner', 'intermediate', 'advanced')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Course Comments Table
create table if not exists course_comments (
  id uuid default gen_random_uuid() primary key,
  course_id uuid references courses(id) on delete cascade not null,
  author_id uuid references auth.users not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies for courses
alter table courses enable row level security;

create policy "Anyone can view courses"
  on courses for select
  using (true);

create policy "Admins can insert courses"
  on courses for insert
  with check (auth.uid() in (select id from auth.users where raw_user_meta_data->>'role' = 'admin'));

create policy "Admins can update courses"
  on courses for update
  using (auth.uid() in (select id from auth.users where raw_user_meta_data->>'role' = 'admin'));

create policy "Admins can delete courses"
  on courses for delete
  using (auth.uid() in (select id from auth.users where raw_user_meta_data->>'role' = 'admin'));

-- RLS Policies for course_comments
alter table course_comments enable row level security;

create policy "Anyone can view course comments"
  on course_comments for select
  using (true);

create policy "Authenticated users can create comments"
  on course_comments for insert
  with check (auth.uid() = author_id);

create policy "Users can delete own comments"
  on course_comments for delete
  using (auth.uid() = author_id);

-- Indexes for performance
create index if not exists courses_category_idx on courses(category);
create index if not exists courses_level_idx on courses(level);
create index if not exists course_comments_course_id_idx on course_comments(course_id);
create index if not exists course_comments_author_id_idx on course_comments(author_id);

-- Updated_at trigger for courses
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger update_courses_updated_at
  before update on courses
  for each row
  execute function update_updated_at_column();
