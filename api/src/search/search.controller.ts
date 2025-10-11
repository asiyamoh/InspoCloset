import { Controller, Get, Query, HttpStatus, HttpException } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchRequestDto } from './dto/search-request.dto';
import { SearchResponseDto } from './dto/search-response.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query() searchRequest: SearchRequestDto): Promise<SearchResponseDto> {
    try {
      // Validate query parameter
      if (!searchRequest.q || searchRequest.q.trim().length === 0) {
        return {
          results: {},
          total: 0,
          hasMore: false,
          query: '',
          type: searchRequest.type || 'tags',
        };
      }

      // Ensure limit is a number
      const limit = typeof searchRequest.limit === 'string' 
        ? parseInt(searchRequest.limit) || 10 
        : searchRequest.limit || 10;

      const searchParams = {
        ...searchRequest,
        limit,
      };

      return await this.searchService.search(searchParams);
    } catch (error) {
      console.error('Search error:', error);
      throw new HttpException(
        'Search failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
