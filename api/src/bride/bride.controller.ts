import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpException, UseGuards, Req } from '@nestjs/common';
import { BrideService } from './bride.service';
import { CreateBrideDto } from './dto/create-bride.dto';
import { UpdateBrideDto } from './dto/update-bride.dto';
import { BrideResponseDto } from './dto/bride-response.dto';
import { AuthGuard } from '../auth/supabase-auth.guard';

@Controller('brides')
@UseGuards(AuthGuard)
export class BrideController {
  constructor(private readonly brideService: BrideService) {}

  @Post()
  async createBride(
    @Body() createBrideDto: CreateBrideDto,
    @Req() req: any
  ): Promise<BrideResponseDto> {
    try {
      const user = req.user;
      return await this.brideService.createBride(user.id, createBrideDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create bride',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAllBrides(@Req() req: any): Promise<BrideResponseDto[]> {
    try {
      const user = req.user;
      return await this.brideService.getAllBrides(user.id);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch brides',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getBrideById(@Param('id') id: string, @Req() req: any): Promise<BrideResponseDto> {
    try {
      const user = req.user;
      return await this.brideService.getBrideById(user.id, id);
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
    @Req() req: any
  ): Promise<BrideResponseDto> {
    try {
      const user = req.user;
      return await this.brideService.updateBride(user.id, id, updateBrideDto);
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
  async deleteBride(@Param('id') id: string, @Req() req: any): Promise<{ message: string }> {
    try {
      const user = req.user;
      return await this.brideService.deleteBride(user.id, id);
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
