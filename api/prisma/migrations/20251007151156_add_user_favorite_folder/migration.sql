-- CreateTable
CREATE TABLE "public"."user_favorite_folders" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profile_id" UUID NOT NULL,
    "folder_id" UUID NOT NULL,

    CONSTRAINT "user_favorite_folders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_favorite_folders_profile_id_folder_id_key" ON "public"."user_favorite_folders"("profile_id", "folder_id");

-- AddForeignKey
ALTER TABLE "public"."user_favorite_folders" ADD CONSTRAINT "user_favorite_folders_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_favorite_folders" ADD CONSTRAINT "user_favorite_folders_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "public"."folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
