import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateBrideDto } from './dto/create-bride.dto';
import { UpdateBrideDto } from './dto/update-bride.dto';
import { BrideResponseDto } from './dto/bride-response.dto';

@Injectable()
export class BrideService {
  constructor(private readonly prisma: PrismaService) {}

  async createBride(profileId: string, createBrideDto: CreateBrideDto): Promise<BrideResponseDto> {
    const bride = await this.prisma.bride.create({
      data: {
        ...createBrideDto,
        profileId,
      },
    });

    return this.mapToResponseDto(bride);
  }

  async getAllBrides(profileId: string): Promise<BrideResponseDto[]> {
    const brides = await this.prisma.bride.findMany({
      where: {
        profileId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return brides.map(bride => this.mapToResponseDto(bride));
  }

  async getBrideById(profileId: string, brideId: string): Promise<BrideResponseDto> {
    const bride = await this.prisma.bride.findFirst({
      where: {
        id: brideId,
        profileId,
      },
    });

    if (!bride) {
      throw new NotFoundException(`Bride with ID ${brideId} not found`);
    }

    return this.mapToResponseDto(bride);
  }

  async updateBride(profileId: string, brideId: string, updateBrideDto: UpdateBrideDto): Promise<BrideResponseDto> {
    const existingBride = await this.prisma.bride.findFirst({
      where: {
        id: brideId,
        profileId,
      },
    });

    if (!existingBride) {
      throw new NotFoundException(`Bride with ID ${brideId} not found`);
    }

    const updatedBride = await this.prisma.bride.update({
      where: {
        id: brideId,
      },
      data: updateBrideDto,
    });

    return this.mapToResponseDto(updatedBride);
  }

  async deleteBride(profileId: string, brideId: string): Promise<{ message: string }> {
    const existingBride = await this.prisma.bride.findFirst({
      where: {
        id: brideId,
        profileId,
      },
    });

    if (!existingBride) {
      throw new NotFoundException(`Bride with ID ${brideId} not found`);
    }

    await this.prisma.bride.delete({
      where: {
        id: brideId,
      },
    });

    return { message: 'Bride deleted successfully' };
  }

  private mapToResponseDto(bride: any): BrideResponseDto {
    return {
      id: bride.id,
      name: bride.name,
      email: bride.email,
      profilePicture: bride.profilePicture,
      createdAt: bride.createdAt,
      updatedAt: bride.updatedAt,
      profileId: bride.profileId,
    };
  }
}
