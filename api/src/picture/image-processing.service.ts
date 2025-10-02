import { Injectable } from '@nestjs/common';
import sharp from 'sharp';

@Injectable()
export class ImageProcessingService {
  async resizeAndCompressImage(
    buffer: Buffer,
    maxWidth: number = 1200,
    maxHeight: number = 1200,
    quality: number = 80
  ): Promise<Buffer> {
    try {
      return await sharp(buffer)
        .resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({ quality })
        .toBuffer();
    } catch (error) {
      throw new Error(`Image processing failed: ${error.message}`);
    }
  }

  async generateThumbnail(
    buffer: Buffer,
    size: number = 200
  ): Promise<Buffer> {
    try {
      return await sharp(buffer)
        .resize(size, size, {
          fit: 'cover',
        })
        .jpeg({ quality: 70 })
        .toBuffer();
    } catch (error) {
      throw new Error(`Thumbnail generation failed: ${error.message}`);
    }
  }

  async validateImage(buffer: Buffer): Promise<boolean> {
    try {
      const metadata = await sharp(buffer).metadata();
      return ['jpeg', 'png', 'webp'].includes(metadata.format || '');
    } catch {
      return false;
    }
  }
}
