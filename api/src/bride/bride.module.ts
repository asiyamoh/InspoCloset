import { Module } from '@nestjs/common';
import { BrideController } from './bride.controller';
import { BrideService } from './bride.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BrideController],
  providers: [BrideService],
  exports: [BrideService],
})
export class BrideModule {}
