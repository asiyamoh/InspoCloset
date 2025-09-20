import { PrismaClient, ProfileRole } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Profiles
  const adminProfile = await prisma.profile.create({
    data: {
      id: randomUUID(),
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      role: ProfileRole.ADMIN,
    },
  });

  const userProfile = await prisma.profile.create({
    data: {
      id: randomUUID(),
      email: 'user@example.com',
      firstName: 'Regular',
      lastName: 'User',
      role: ProfileRole.USER,
    },
  });

  // Create Brides
  const bride1 = await prisma.bride.create({
    data: {
      id: randomUUID(),
      name: 'Jane Bride',
      email: 'jane@example.com',
      profileId: adminProfile.id,
    },
  });

  const bride2 = await prisma.bride.create({
    data: {
      id: randomUUID(),
      name: 'Emily Bride',
      email: 'emily@example.com',
      profileId: userProfile.id,
    },
  });

  // Create Folders
  const folder1 = await prisma.folder.create({
    data: {
      id: randomUUID(),
      name: 'Wedding Dresses',
      iconPicture: 'dress-icon.png',
      brideId: bride1.id,
    },
  });

  const folder2 = await prisma.folder.create({
    data: {
      id: randomUUID(),
      name: 'Venues',
      iconPicture: 'venue-icon.png',
      brideId: bride2.id,
    },
  });

  // Create Categories
  const category1 = await prisma.category.create({
    data: {
      id: randomUUID(),
      name: 'Designer Dresses',
      iconPicture: 'designer-icon.png',
      folderId: folder1.id,
    },
  });

  const category2 = await prisma.category.create({
    data: {
      id: randomUUID(),
      name: 'Outdoor Venues',
      iconPicture: 'outdoor-icon.png',
      folderId: folder2.id,
    },
  });

  // Create Pictures
  const picture1 = await prisma.picture.create({
    data: {
      id: randomUUID(),
      url: 'https://example.com/pic1.jpg',
    },
  });

  const picture2 = await prisma.picture.create({
    data: {
      id: randomUUID(),
      url: 'https://example.com/pic2.jpg',
    },
  });

  // Create Tags
  const tag1 = await prisma.tag.create({
    data: {
      id: randomUUID(),
      name: 'Elegant',
    },
  });

  const tag2 = await prisma.tag.create({
    data: {
      id: randomUUID(),
      name: 'Rustic',
    },
  });

  // Create PictureLocations linking pictures to folders/categories/brides
  await prisma.pictureLocation.create({
    data: {
      id: randomUUID(),
      pictureId: picture1.id,
      folderId: folder1.id,
      categoryId: category1.id,
      brideId: bride1.id,
      notes: 'Stunning designer dress',
    },
  });

  await prisma.pictureLocation.create({
    data: {
      id: randomUUID(),
      pictureId: picture2.id,
      folderId: folder2.id,
      categoryId: category2.id,
      brideId: bride2.id,
      notes: 'Perfect outdoor venue',
    },
  });

  // Create PictureTags linking pictures and tags
  await prisma.pictureTag.create({
    data: {
      id: randomUUID(),
      pictureId: picture1.id,
      tagId: tag1.id,
    },
  });

  await prisma.pictureTag.create({
    data: {
      id: randomUUID(),
      pictureId: picture2.id,
      tagId: tag2.id,
    },
  });

  console.log('✅ Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
