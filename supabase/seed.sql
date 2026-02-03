-- WalaWala MVP Content Seeding (Manual Fix with Virtual IDs)
-- 1. Create Virtual Users (in auth.users) to satisfy Foreign Key constraints
-- We use fixed UUIDs for demo consistency.

INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
VALUES
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'min@walawala.kr', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"nickname":"Min"}', now(), now(), '', '', '', ''),
  ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'sophia@walawala.kr', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"nickname":"Sophia"}', now(), now(), '', '', '', '')
ON CONFLICT (id) DO NOTHING;

-- 2. Create Profiles for these users
INSERT INTO public.profiles (id, nickname, nationality, visa_type, avatar_url)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Min', 'Vietnam', 'D-2', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Min'),
  ('22222222-2222-2222-2222-222222222222', 'Sophia', 'USA', 'E-7', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sophia')
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Posts using the Virtual IDs
INSERT INTO public.posts (title, content, category, author_id)
VALUES 
(
  '[Help] D-2 Visa Extension Documents?', 
  'Hi guys! I actully need to extend my student visa next month. \nDoes anyone know if I strictly need the bank statement for 6 months? My balance fluctuated a bit... 😭 \n\nAny advice would be appreciated! #D2 #Extension',
  'VISA',
  '11111111-1111-1111-1111-111111111111' -- Min
),
(
  'Best cafes to study near Hongdae? ☕️', 
  'Midterms are coming... I need a place with good wifi and power outlets. \nI usually go to Starbucks but it is too crowded. \nShare your secret spots! Plz!',
  'LIFE',
  '11111111-1111-1111-1111-111111111111' -- Min
),
(
  '[Guide] How to change D-10 to E-7 Visa (Marketing)', 
  'Hello everyone, I successfully switched to E-7 last week! 🎉\n\nHere is my checklist:\n1. Employment Contract (Standard Form)\n2. Company Value Added Tax Certificate\n3. Proof of Employment (Need to prove why a Korean cannot do this job - IMPORTANT)\n\nIf you have questions, leave a comment. I can share my cover letter tips.',
  'JOBS',
  '22222222-2222-2222-2222-222222222222' -- Sophia
),
(
  'Cheap weekend getaway trips for Fall? 🍁', 
  'The weather is so nice these days. \nI am thinking of going to Seoraksan or Nami Island. \nWhich one is better for public transport? I don''t have a car.',
  'LIFE',
  '22222222-2222-2222-2222-222222222222' -- Sophia
),
(
  'Anyone looking for a language exchange partner? (Korean-English)', 
  'I want to improve my Korean speaking. I can help you with English!\nLet''s meet in Gangnam or online. 🗣️',
  'Q&A',
  '11111111-1111-1111-1111-111111111111' -- Min
);
