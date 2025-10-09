import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpException } from '@nestjs/common';
import { BrideService } from './bride.service';
import { CreateBrideDto } from './dto/create-bride.dto';
import { UpdateBrideDto } from './dto/update-bride.dto';
import { BrideResponseDto } from './dto/bride-response.dto';

@Controller('brides')
export class BrideController {
  constructor(private readonly brideService: BrideService) {}

  @Post()
  async createBride(@Body() createBrideDto: CreateBrideDto): Promise<BrideResponseDto> {
    try {
      const defaultProfileId = 'bf24ad7d-89c9-46c4-a59d-8fa054eb35ad';
      return await this.brideService.createBride(defaultProfileId, createBrideDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create bride',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAllBrides(): Promise<BrideResponseDto[]> {
    try {
      const defaultProfileId = 'bf24ad7d-89c9-46c4-a59d-8fa054eb35ad';
      return await this.brideService.getAllBrides(defaultProfileId);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch brides',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getBrideById(@Param('id') id: string): Promise<BrideResponseDto> {
    try {
      const defaultProfileId = 'bf24ad7d-89c9-46c4-a59d-8fa054eb35ad';
      return await this.brideService.getBrideById(defaultProfileId, id);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch bride',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updateBride(
    @Param('id') id: string,
    @Body() updateBrideDto: UpdateBrideDto,
  ): Promise<BrideResponseDto> {
    try {
      const defaultProfileId = 'bf24ad7d-89c9-46c4-a59d-8fa054eb35ad';
      return await this.brideService.updateBride(defaultProfileId, id, updateBrideDto);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to update bride',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteBride(@Param('id') id: string): Promise<{ message: string }> {
    try {
      const defaultProfileId = 'bf24ad7d-89c9-46c4-a59d-8fa054eb35ad';
      return await this.brideService.deleteBride(defaultProfileId, id);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        'Failed to delete bride',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
