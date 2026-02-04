
-- Enable RLS on storage.objects
alter table storage.objects enable row level security;

-- Policy: Allow public read access to 'images' bucket
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'images' );

-- Policy: Allow authenticated users to upload to 'images' bucket
create policy "Authenticated Insert"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'images' AND auth.role() = 'authenticated' );

-- Policy: Allow users to delete their own objects
create policy "Owner Delete"
on storage.objects for delete
to authenticated
using ( bucket_id = 'images' AND owner = auth.uid() );
