import { Injectable } from '@nestjs/common';
import { TagSearchHandler } from './handlers/tag-search.handler';
import { SearchRequestDto, SearchType } from './dto/search-request.dto';
import { SearchResponseDto, SearchResults } from './dto/search-response.dto';

@Injectable()
export class SearchService {
  constructor(private tagSearchHandler: TagSearchHandler) {}

  async search(searchRequest: SearchRequestDto): Promise<SearchResponseDto> {
    const { q: query, type, limit } = searchRequest;
    const results: SearchResults = {};
    let total = 0;

    // Handle different search types
    switch (type) {
      case SearchType.TAGS:
        results.tags = await this.tagSearchHandler.searchTags(query, limit);
        total = results.tags.length;
        break;
      
      case SearchType.FOLDERS:
        // Future implementation
        results.folders = [];
        break;
      
      case SearchType.CATEGORIES:
        // Future implementation
        results.categories = [];
        break;
      
      case SearchType.ALL:
        // Search all types
        results.tags = await this.tagSearchHandler.searchTags(query, limit);
        // Future: add folders and categories
        total = results.tags.length;
        break;
      
      default:
        results.tags = await this.tagSearchHandler.searchTags(query, limit);
        total = results.tags.length;
    }

    return {
      results,
      total,
      hasMore: total >= limit,
      query,
      type,
    };
  }
}
