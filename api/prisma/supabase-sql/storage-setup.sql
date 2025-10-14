-- Create storage bucket for pictures, icons, and thumbnails
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'pictures',
  'pictures', 
  true, -- Public bucket so images can be accessed directly
  52428800, -- 50MB file size limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Create storage policies for the pictures bucket
-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated users to upload pictures" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'pictures' 
  AND auth.role() = 'authenticated'
);

-- Allow public access to view files
CREATE POLICY "Allow public access to view pictures" ON storage.objects
FOR SELECT USING (bucket_id = 'pictures');

-- Allow authenticated users to update their own files
CREATE POLICY "Allow authenticated users to update pictures" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'pictures' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete their own files
CREATE POLICY "Allow authenticated users to delete pictures" ON storage.objects
FOR DELETE USING (
  bucket_id = 'pictures' 
  AND auth.role() = 'authenticated'
);
