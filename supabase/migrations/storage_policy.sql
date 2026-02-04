
-- Note: 'storage.objects' usually has RLS enabled by default. 
-- We SKIP 'alter table' to avoid permission errors (42501).

-- 1. Drop existing policies to allow re-running script cleanly
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Authenticated Insert" on storage.objects;
drop policy if exists "Owner Delete" on storage.objects;

-- 2. Policy: Allow public read access to 'images' bucket
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'images' );

-- 3. Policy: Allow authenticated users to upload to 'images' bucket
create policy "Authenticated Insert"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'images' AND auth.role() = 'authenticated' );

-- 4. Policy: Allow users to delete their own objects
create policy "Owner Delete"
on storage.objects for delete
to authenticated
using ( bucket_id = 'images' AND owner = auth.uid() );
