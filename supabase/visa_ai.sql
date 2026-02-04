-- AI 비자 인터뷰 및 서류 데이터 관리 테이블

-- 1. 비자 인터뷰 세션 테이블
create table public.visa_interviews (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  visa_type text not null, -- 상담 중인 비자 종류 (예: D-10, E-7, F-2)
  status text default 'in_progress' check (status in ('in_progress', 'completed', 'expired')),
  
  -- 인터뷰 질의응답 데이터를 JSONB 형태로 저장 (질문-답변 리스트)
  interview_data jsonb default '[]'::jsonb,
  
  -- AI가 최종적으로 생성한 요약 및 권장 사항
  ai_summary text,
  
  -- AI가 생성한 필요 서류 체크리스트
  document_checklist jsonb default '[]'::jsonb,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS 설정
alter table public.visa_interviews enable row level security;

create policy "Users can view their own interviews."
  on visa_interviews for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own interviews."
  on visa_interviews for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own interviews."
  on visa_interviews for update
  using ( auth.uid() = user_id );

-- 트리거: updated_at 자동 갱신
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_visa_interviews_updated_at
before update on visa_interviews
for each row execute procedure update_updated_at_column();
