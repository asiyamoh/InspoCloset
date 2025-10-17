import { useState, useCallback } from 'react';
import { API_URL } from '../../../utils/constants';
import { getAuthToken, buildAuthHeaders } from '../../../utils/auth-headers';

export interface FolderResponse {
  id: string;
  name: string;
  brideId?: string;
  profileId?: string;
  iconPicture?: string;
  createdAt: string;
  updatedAt: string;
  subcategories?: {
    id: string;
    name: string;
    iconPicture?: string;
    folderId: string;
    createdAt: string;
    updatedAt: string;
  }[];
  categories?: {
    id: string;
    name: string;
    iconPicture?: string;
    folderId: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export function useGetFoldersByBride() {
  const [folders, setFolders] = useState<FolderResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFoldersByBride = useCallback(async (brideId: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Get auth token and build headers
      const token = await getAuthToken();
      const authHeaders = buildAuthHeaders(token);

      const response = await fetch(`${API_URL}/folders/bride/${brideId}`, {
        headers: authHeaders,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch folders by bride');
      }
      
      const data: FolderResponse[] = await response.json();
      setFolders(data);
    } catch (err) {
      console.error('Error fetching folders by bride:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch folders by bride';
      setError(errorMessage);
      setFolders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    folders,
    loading,
    error,
    fetchFoldersByBride,
    clearError: useCallback(() => setError(null), [])
  };
}
