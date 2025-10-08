/*
  Warnings:

  - Added the required column `profile_id` to the `folders` table without a default value. This is not possible if the table is not empty.

*/

-- Step 1: Add the column as nullable first
ALTER TABLE "public"."folders" ADD COLUMN "profile_id" UUID;

-- Step 2: Update existing rows with the default profile ID
UPDATE "public"."folders" SET "profile_id" = 'bf24ad7d-89c9-46c4-a59d-8fa054eb35ad' WHERE "profile_id" IS NULL;

-- Step 3: Make the column NOT NULL
ALTER TABLE "public"."folders" ALTER COLUMN "profile_id" SET NOT NULL;

-- Step 4: Add the foreign key constraint
ALTER TABLE "public"."folders" ADD CONSTRAINT "folders_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
