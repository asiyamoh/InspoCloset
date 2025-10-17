import { useState, useCallback } from 'react';
import { API_URL } from '../utils/constants';
import { SearchResponse, TagSearchResult } from '../types/search.types';
import { getAuthToken, buildAuthHeaders } from '../utils/auth-headers';

export function useSearch() {
  const [results, setResults] = useState<TagSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchTags = useCallback(async (query: string): Promise<void> => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = await getAuthToken();
      const authHeaders = buildAuthHeaders(token);

      const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}&type=tags&limit=10`, {
        headers: authHeaders,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Search failed');
      }

      const data: SearchResponse = await response.json();
      setResults(data.results.tags || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    results,
    isLoading,
    error,
    searchTags,
    clearResults,
  };
}
