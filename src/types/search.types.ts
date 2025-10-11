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

export interface SearchResponse {
  results: {
    tags?: TagSearchResult[];
    folders?: any[]; // Future implementation
    categories?: any[]; // Future implementation
  };
  total: number;
  hasMore: boolean;
  query: string;
  type: string;
}
