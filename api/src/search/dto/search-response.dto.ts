export interface SearchPicture {
  id: string;
  url: string;
  thumbnailUrl?: string;
}

export interface TagSearchResult {
  id: string;
  name: string;
  pictureCount: number;
  pictures: SearchPicture[];
}

export interface SearchResults {
  tags?: TagSearchResult[];
  folders?: any[]; // Future implementation
  categories?: any[]; // Future implementation
}

export interface SearchResponseDto {
  results: SearchResults;
  total: number;
  hasMore: boolean;
  query: string;
  type: string;
}
