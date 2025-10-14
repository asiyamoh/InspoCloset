import { useState, useCallback } from 'react';
import { API_URL } from '../../../utils/constants';
import { getAuthToken, buildAuthHeaders } from '../../../utils/api/auth-headers';

export interface TagSuggestion {
  id: string;
  name: string;
  count: number;
}

export function useGetMostUsedTags() {
  const [tags, setTags] = useState<TagSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMostUsedTags = useCallback(async (limit: number = 3): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Get auth token and build headers
      const token = await getAuthToken();
      const authHeaders = buildAuthHeaders(token);
      
      const response = await fetch(`${API_URL}/tags/most-used?limit=${limit}`, {
        headers: authHeaders,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch most used tags');
      }
      
      const data: TagSuggestion[] = await response.json();
      setTags(data);
    } catch (err) {
      console.error('Error fetching most used tags:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch most used tags';
      setError(errorMessage);
      setTags([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tags,
    loading,
    error,
    fetchMostUsedTags,
    clearError: useCallback(() => setError(null), [])
  };
}
