-- Create the storage bucket for images if it doesn't exist
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

-- Set up security policies for the 'images' bucket

-- 1. Anyone can view images
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'images' );

-- 2. Authenticated users can upload images
create policy "Authenticated users can upload images"
  on storage.objects for insert
  with check (
    bucket_id = 'images'
    and auth.role() = 'authenticated'
  );

-- 3. Users can update their own images (optional, mostly for profile pics or post edits)
create policy "Users can update own images"
  on storage.objects for update
  using (
    bucket_id = 'images'
    and auth.uid() = owner
  );

-- 4. Users can delete their own images
create policy "Users can delete own images"
  on storage.objects for delete
  using (
    bucket_id = 'images'
    and auth.uid() = owner
  );