import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TagSearchHandler } from './handlers/tag-search.handler';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SearchController],
  providers: [SearchService, TagSearchHandler],
  exports: [SearchService],
})
export class SearchModule {}
