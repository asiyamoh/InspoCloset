-- Row Level Security Policies for InspoCloset App
-- This file contains all RLS policies to allow users to manage their own data

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE brides ENABLE ROW LEVEL SECURITY;
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE pictures ENABLE ROW LEVEL SECURITY;
ALTER TABLE picture_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE picture_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorite_folders ENABLE ROW LEVEL SECURITY;

-- ==============================================
-- PROFILES TABLE POLICIES
-- ==============================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
FOR SELECT USING (auth.uid() = id::uuid);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
FOR UPDATE USING (auth.uid() = id::uuid);

-- Users can insert their own profile (for registration)
CREATE POLICY "Users can insert own profile" ON profiles
FOR INSERT WITH CHECK (auth.uid() = id::uuid);

-- ==============================================
-- BRIDES TABLE POLICIES
-- ==============================================

-- Users can view their own brides
CREATE POLICY "Users can view own brides" ON brides
FOR SELECT USING (auth.uid() = profile_id::uuid);

-- Users can insert brides for themselves
CREATE POLICY "Users can insert own brides" ON brides
FOR INSERT WITH CHECK (auth.uid() = profile_id::uuid);

-- Users can update their own brides
CREATE POLICY "Users can update own brides" ON brides
FOR UPDATE USING (auth.uid() = profile_id::uuid);

-- Users can delete their own brides
CREATE POLICY "Users can delete own brides" ON brides
FOR DELETE USING (auth.uid() = profile_id::uuid);

-- ==============================================
-- FOLDERS TABLE POLICIES
-- ==============================================

-- Users can view their own folders
CREATE POLICY "Users can view own folders" ON folders
FOR SELECT USING (auth.uid() = profile_id::uuid);

-- Users can insert folders for themselves
CREATE POLICY "Users can insert own folders" ON folders
FOR INSERT WITH CHECK (auth.uid() = profile_id::uuid);

-- Users can update their own folders
CREATE POLICY "Users can update own folders" ON folders
FOR UPDATE USING (auth.uid() = profile_id::uuid);

-- Users can delete their own folders
CREATE POLICY "Users can delete own folders" ON folders
FOR DELETE USING (auth.uid() = profile_id::uuid);

-- ==============================================
-- CATEGORIES TABLE POLICIES
-- ==============================================

-- Users can view categories in their own folders
CREATE POLICY "Users can view categories in own folders" ON categories
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM folders 
    WHERE folders.id = categories.folder_id 
    AND folders.profile_id = auth.uid()::uuid
  )
);

-- Users can insert categories in their own folders
CREATE POLICY "Users can insert categories in own folders" ON categories
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM folders 
    WHERE folders.id = categories.folder_id 
    AND folders.profile_id = auth.uid()::uuid
  )
);

-- Users can update categories in their own folders
CREATE POLICY "Users can update categories in own folders" ON categories
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM folders 
    WHERE folders.id = categories.folder_id 
    AND folders.profile_id = auth.uid()::uuid
  )
);

-- Users can delete categories in their own folders
CREATE POLICY "Users can delete categories in own folders" ON categories
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM folders 
    WHERE folders.id = categories.folder_id 
    AND folders.profile_id = auth.uid()::uuid
  )
);

-- ==============================================
-- PICTURES TABLE POLICIES
-- ==============================================

-- Users can view pictures they uploaded (through picture_locations)
CREATE POLICY "Users can view own pictures" ON pictures
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM picture_locations pl
    JOIN folders f ON f.id = pl.folder_id
    WHERE pl.picture_id = pictures.id 
    AND f.profile_id = auth.uid()::uuid
  )
);

-- Users can insert pictures
CREATE POLICY "Users can insert pictures" ON pictures
FOR INSERT WITH CHECK (true); -- Allow insertion, ownership determined by picture_locations

-- Users can update their own pictures
CREATE POLICY "Users can update own pictures" ON pictures
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM picture_locations pl
    JOIN folders f ON f.id = pl.folder_id
    WHERE pl.picture_id = pictures.id 
    AND f.profile_id = auth.uid()::uuid
  )
);

-- Users can delete their own pictures
CREATE POLICY "Users can delete own pictures" ON pictures
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM picture_locations pl
    JOIN folders f ON f.id = pl.folder_id
    WHERE pl.picture_id = pictures.id 
    AND f.profile_id = auth.uid()::uuid
  )
);

-- ==============================================
-- PICTURE_LOCATIONS TABLE POLICIES
-- ==============================================

-- Users can view picture locations in their own folders
CREATE POLICY "Users can view picture locations in own folders" ON picture_locations
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM folders f
    WHERE f.id = picture_locations.folder_id 
    AND f.profile_id = auth.uid()::uuid
  )
);

-- Users can insert picture locations in their own folders
CREATE POLICY "Users can insert picture locations in own folders" ON picture_locations
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM folders f
    WHERE f.id = picture_locations.folder_id 
    AND f.profile_id = auth.uid()::uuid
  )
);

-- Users can update picture locations in their own folders
CREATE POLICY "Users can update picture locations in own folders" ON picture_locations
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM folders f
    WHERE f.id = picture_locations.folder_id 
    AND f.profile_id = auth.uid()::uuid
  )
);

-- Users can delete picture locations in their own folders
CREATE POLICY "Users can delete picture locations in own folders" ON picture_locations
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM folders f
    WHERE f.id = picture_locations.folder_id 
    AND f.profile_id = auth.uid()::uuid
  )
);

-- ==============================================
-- TAGS TABLE POLICIES
-- ==============================================

-- Users can view tags (global tags, but only see them if they have pictures with those tags)
CREATE POLICY "Users can view tags" ON tags
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM picture_tags pt
    JOIN picture_locations pl ON pl.picture_id = pt.picture_id
    JOIN folders f ON f.id = pl.folder_id
    WHERE pt.tag_id = tags.id 
    AND f.profile_id = auth.uid()::uuid
  )
);

-- Users can insert tags
CREATE POLICY "Users can insert tags" ON tags
FOR INSERT WITH CHECK (true);

-- Users can update tags (if they have pictures with those tags)
CREATE POLICY "Users can update own tags" ON tags
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM picture_tags pt
    JOIN picture_locations pl ON pl.picture_id = pt.picture_id
    JOIN folders f ON f.id = pl.folder_id
    WHERE pt.tag_id = tags.id 
    AND f.profile_id = auth.uid()::uuid
  )
);

-- Users can delete tags (if they have pictures with those tags)
CREATE POLICY "Users can delete own tags" ON tags
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM picture_tags pt
    JOIN picture_locations pl ON pl.picture_id = pt.picture_id
    JOIN folders f ON f.id = pl.folder_id
    WHERE pt.tag_id = tags.id 
    AND f.profile_id = auth.uid()::uuid
  )
);

-- ==============================================
-- PICTURE_TAGS TABLE POLICIES
-- ==============================================

-- Users can view picture tags for their own pictures
CREATE POLICY "Users can view picture tags for own pictures" ON picture_tags
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM picture_locations pl
    JOIN folders f ON f.id = pl.folder_id
    WHERE pl.picture_id = picture_tags.picture_id 
    AND f.profile_id = auth.uid()::uuid
  )
);

-- Users can insert picture tags for their own pictures
CREATE POLICY "Users can insert picture tags for own pictures" ON picture_tags
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM picture_locations pl
    JOIN folders f ON f.id = pl.folder_id
    WHERE pl.picture_id = picture_tags.picture_id 
    AND f.profile_id = auth.uid()::uuid
  )
);

-- Users can update picture tags for their own pictures
CREATE POLICY "Users can update picture tags for own pictures" ON picture_tags
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM picture_locations pl
    JOIN folders f ON f.id = pl.folder_id
    WHERE pl.picture_id = picture_tags.picture_id 
    AND f.profile_id = auth.uid()::uuid
  )
);

-- Users can delete picture tags for their own pictures
CREATE POLICY "Users can delete picture tags for own pictures" ON picture_tags
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM picture_locations pl
    JOIN folders f ON f.id = pl.folder_id
    WHERE pl.picture_id = picture_tags.picture_id 
    AND f.profile_id = auth.uid()::uuid
  )
);

-- ==============================================
-- USER_FAVORITE_FOLDERS TABLE POLICIES
-- ==============================================

-- Users can view their own favorite folders
CREATE POLICY "Users can view own favorite folders" ON user_favorite_folders
FOR SELECT USING (auth.uid() = profile_id::uuid);

-- Users can insert their own favorite folders
CREATE POLICY "Users can insert own favorite folders" ON user_favorite_folders
FOR INSERT WITH CHECK (auth.uid() = profile_id::uuid);

-- Users can update their own favorite folders
CREATE POLICY "Users can update own favorite folders" ON user_favorite_folders
FOR UPDATE USING (auth.uid() = profile_id::uuid);

-- Users can delete their own favorite folders
CREATE POLICY "Users can delete own favorite folders" ON user_favorite_folders
FOR DELETE USING (auth.uid() = profile_id::uuid);

-- Update existing policy to include service role
DROP POLICY "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
FOR SELECT USING (
  auth.role() = 'service_role' OR 
  auth.uid() = id
);