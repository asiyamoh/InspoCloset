import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { ImageProcessingService } from './image-processing.service';
import { TagService } from '../tag/tag.service';
import { createClient } from '@supabase/supabase-js';

export interface PictureUploadData {
  buffer: Buffer;
  originalName: string;
  mimeType: string;
}

export interface ProcessedPicture {
  id: string;
  url: string;
  thumbnailUrl: string;
}

export interface IconUploadData {
  buffer: Buffer;
  originalName: string;
  mimeType: string;
}

export interface ProcessedIcon {
  url: string;
}

@Injectable()
export class PictureService {
  private supabase;

  constructor(
    private prisma: PrismaService,
    private imageProcessing: ImageProcessingService,
    private tagService: TagService
  ) {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }

  async processAndSaveIcon(
    iconData: IconUploadData,
    iconType: 'folder' | 'category'
  ): Promise<ProcessedIcon> {
    // Validate image
    if (!await this.imageProcessing.validateImage(iconData.buffer)) {
      throw new Error('Invalid image format');
    }

    // Process icon (smaller size for icons)
    const processedBuffer = await this.imageProcessing.resizeAndCompressImage(
      iconData.buffer,
      300,
      300,
      85
    );

    // Upload to Supabase Storage
    const fileName = `${Date.now()}-${iconData.originalName}`;
    const folderPath = iconType === 'folder' ? 'folder-icons' : 'category-icons';
    
    const { data, error } = await this.supabase.storage
      .from('pictures')
      .upload(`${folderPath}/${fileName}`, processedBuffer, {
        contentType: 'image/jpeg',
        upsert: false,
      });

    if (error) {
      throw new Error(`${iconType} icon upload failed: ${error.message}`);
    }

    // Get public URL
    const { data: publicUrlData } = this.supabase.storage
      .from('pictures')
      .getPublicUrl(`${folderPath}/${fileName}`);

    return {
      url: publicUrlData.publicUrl,
    };
  }

  async getPicturesByCategory(categoryId: string) {
    return await this.prisma.picture.findMany({
      where: {
        pictureLocations: {
          some: {
            categoryId,
          },
        },
      },
      include: {
        pictureTags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async deletePicture(pictureId: string): Promise<void> {
    await this.prisma.picture.delete({
      where: { id: pictureId },
    });
  }

  async processAndSavePictureInTransaction(
    tx: any,
    pictureData: PictureUploadData,
    categoryId: string,
    brideId?: string,
    folderId?: string
  ): Promise<ProcessedPicture> {
    // Validate image
    if (!await this.imageProcessing.validateImage(pictureData.buffer)) {
      throw new Error('Invalid image format');
    }

    // Process image
    const processedBuffer = await this.imageProcessing.resizeAndCompressImage(pictureData.buffer);
    const thumbnailBuffer = await this.imageProcessing.generateThumbnail(pictureData.buffer);

    // Upload to Supabase Storage
    const fileName = `${Date.now()}-${pictureData.originalName}`;
    const thumbnailFileName = `thumb-${fileName}`;
    
    // Upload main image
    const { error: imageError } = await this.supabase.storage
      .from('pictures')
      .upload(`photos/${fileName}`, processedBuffer, {
        contentType: 'image/jpeg',
        upsert: false,
      });

    if (imageError) {
      throw new Error(`Image upload failed: ${imageError.message}`);
    }

    // Upload thumbnail
    const { error: thumbnailError } = await this.supabase.storage
      .from('pictures')
      .upload(`thumbnails/${thumbnailFileName}`, thumbnailBuffer, {
        contentType: 'image/jpeg',
        upsert: false,
      });

    if (thumbnailError) {
      throw new Error(`Thumbnail upload failed: ${thumbnailError.message}`);
    }

    // Get public URLs
    const { data: imageUrl } = this.supabase.storage
      .from('pictures')
      .getPublicUrl(`photos/${fileName}`);

    const { data: thumbnailUrl } = this.supabase.storage
      .from('pictures')
      .getPublicUrl(`thumbnails/${thumbnailFileName}`);

    // Save to database WITHIN transaction
    const picture = await tx.picture.create({
      data: {
        url: imageUrl.publicUrl,
        thumbnailUrl: thumbnailUrl.publicUrl,
      },
    });

    // Create picture location WITHIN transaction
    await tx.pictureLocation.create({
      data: {
        pictureId: picture.id,
        categoryId,
        brideId: brideId || null,
        folderId: folderId || null,
      },
    });

    return {
      id: picture.id,
      url: imageUrl.publicUrl,
      thumbnailUrl: thumbnailUrl.publicUrl,
    };
  }

  async addPicturesToSubcategory(
    picturesData: Array<{ file: Express.Multer.File; tags: string[] }>,
    categoryId: string,
    folderId: string,
    brideId?: string
  ): Promise<{
    success: boolean;
    uploadedPictures: ProcessedPicture[];
    errors: Array<{ fileName: string; error: string }>;
  }> {
    const uploadedPictures: ProcessedPicture[] = [];
    const errors: Array<{ fileName: string; error: string }> = [];
    
    return await this.prisma.$transaction(async (tx) => {
      for (const pictureData of picturesData) {
        try {
          // REUSE existing method
          const processedPicture = await this.processAndSavePictureInTransaction(
            tx,
            {
              buffer: pictureData.file.buffer,
              originalName: pictureData.file.originalname,
              mimeType: pictureData.file.mimetype,
            },
            categoryId,
            brideId,
            folderId
          );
          
          // REUSE existing tag assignment
          if (pictureData.tags && pictureData.tags.length > 0) {
            await this.tagService.assignTagsToPicture(processedPicture.id, pictureData.tags);
          }
          
          uploadedPictures.push(processedPicture);
        } catch (error) {
          errors.push({ 
            fileName: pictureData.file.originalname, 
            error: error instanceof Error ? error.message : 'Unknown error' 
          });
        }
      }
      
      return { 
        success: errors.length === 0, 
        uploadedPictures, 
        errors 
      };
    });
  }
}
