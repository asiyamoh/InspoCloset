import { PrismaClient, ProfileRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Profiles
  const adminProfile = await prisma.profile.create({
    data: {
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      role: ProfileRole.ADMIN,
    },
  });

  const userProfile = await prisma.profile.create({
    data: {
      email: 'user@example.com',
      firstName: 'Regular',
      lastName: 'User',
      role: ProfileRole.USER,
    },
  });

  console.log('✅ Created profiles');

  // Create Brides
  const bride1 = await prisma.bride.create({
    data: {
      name: 'Jane Bride',
      email: 'jane@example.com',
      profileId: adminProfile.id,
    },
  });

  const bride2 = await prisma.bride.create({
    data: {
      name: 'Emily Bride',
      email: 'emily@example.com',
      profileId: userProfile.id,
    },
  });

  console.log('✅ Created brides');

  // Create Folders (now with profileId)
  const folder1 = await prisma.folder.create({
    data: {
      name: 'Wedding Dresses',
      iconPicture: 'dress-icon.png',
      brideId: bride1.id,
      profileId: adminProfile.id, // Required field
    },
  });

  const folder2 = await prisma.folder.create({
    data: {
      name: 'Venues',
      iconPicture: 'venue-icon.png',
      brideId: bride2.id,
      profileId: userProfile.id, // Required field
    },
  });

  const folder3 = await prisma.folder.create({
    data: {
      name: 'Bouquets',
      iconPicture: 'bouquet-icon.png',
      brideId: bride1.id,
      profileId: adminProfile.id,
    },
  });

  console.log('✅ Created folders');

  // Create Categories
  const category1 = await prisma.category.create({
    data: {
      name: 'Designer Dresses',
      iconPicture: 'designer-icon.png',
      folderId: folder1.id,
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Outdoor Venues',
      iconPicture: 'outdoor-icon.png',
      folderId: folder2.id,
    },
  });

  const category3 = await prisma.category.create({
    data: {
      name: 'Rose Bouquets',
      iconPicture: 'rose-icon.png',
      folderId: folder3.id,
    },
  });

  console.log('✅ Created categories');

  // Create Pictures (with thumbnailUrl)
  const picture1 = await prisma.picture.create({
    data: {
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=200',
    },
  });

  const picture2 = await prisma.picture.create({
    data: {
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800',
      thumbnailUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=200',
    },
  });

  const picture3 = await prisma.picture.create({
    data: {
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
      thumbnailUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=200',
    },
  });

  const picture4 = await prisma.picture.create({
    data: {
      url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800',
      thumbnailUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=200',
    },
  });

  console.log('✅ Created pictures');

  // Create Tags
  const tag1 = await prisma.tag.create({
    data: {
      name: 'Elegant',
    },
  });

  const tag2 = await prisma.tag.create({
    data: {
      name: 'Rustic',
    },
  });

  const tag3 = await prisma.tag.create({
    data: {
      name: 'Romantic',
    },
  });

  const tag4 = await prisma.tag.create({
    data: {
      name: 'Modern',
    },
  });

  console.log('✅ Created tags');

  // Create PictureLocations linking pictures to folders/categories/brides
  await prisma.pictureLocation.create({
    data: {
      pictureId: picture1.id,
      folderId: folder1.id,
      categoryId: category1.id,
      brideId: bride1.id,
      notes: 'Stunning designer dress with elegant details',
    },
  });

  await prisma.pictureLocation.create({
    data: {
      pictureId: picture2.id,
      folderId: folder2.id,
      categoryId: category2.id,
      brideId: bride2.id,
      notes: 'Perfect outdoor venue with rustic charm',
    },
  });

  await prisma.pictureLocation.create({
    data: {
      pictureId: picture3.id,
      folderId: folder3.id,
      categoryId: category3.id,
      brideId: bride1.id,
      notes: 'Beautiful rose bouquet for romantic ceremony',
    },
  });

  await prisma.pictureLocation.create({
    data: {
      pictureId: picture4.id,
      folderId: folder1.id,
      categoryId: category1.id,
      brideId: bride2.id,
      notes: 'Modern minimalist wedding dress',
    },
  });

  console.log('✅ Created picture locations');

  // Create PictureTags linking pictures and tags
  await prisma.pictureTag.create({
    data: {
      pictureId: picture1.id,
      tagId: tag1.id,
    },
  });

  await prisma.pictureTag.create({
    data: {
      pictureId: picture1.id,
      tagId: tag3.id,
    },
  });

  await prisma.pictureTag.create({
    data: {
      pictureId: picture2.id,
      tagId: tag2.id,
    },
  });

  await prisma.pictureTag.create({
    data: {
      pictureId: picture3.id,
      tagId: tag3.id,
    },
  });

  await prisma.pictureTag.create({
    data: {
      pictureId: picture4.id,
      tagId: tag4.id,
    },
  });

  console.log('✅ Created picture tags');

  // Create UserFavoriteFolders
  await prisma.userFavoriteFolder.create({
    data: {
      profileId: adminProfile.id,
      folderId: folder1.id,
    },
  });

  await prisma.userFavoriteFolder.create({
    data: {
      profileId: userProfile.id,
      folderId: folder2.id,
    },
  });

  await prisma.userFavoriteFolder.create({
    data: {
      profileId: adminProfile.id,
      folderId: folder3.id,
    },
  });

  console.log('✅ Created user favorite folders');

  console.log('🎉 Seed complete!');
  console.log(`Created:`);
  console.log(`- 2 profiles (admin@example.com, user@example.com)`);
  console.log(`- 2 brides (Jane Bride, Emily Bride)`);
  console.log(`- 3 folders (Wedding Dresses, Venues, Bouquets)`);
  console.log(`- 3 categories (Designer Dresses, Outdoor Venues, Rose Bouquets)`);
  console.log(`- 4 pictures with thumbnails`);
  console.log(`- 4 tags (Elegant, Rustic, Romantic, Modern)`);
  console.log(`- 4 picture locations`);
  console.log(`- 5 picture tags`);
  console.log(`- 3 user favorite folders`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
