import { useState, useCallback, useEffect } from 'react';
import { API_URL } from '../../../utils/constants';
import { getAuthToken, buildAuthHeaders } from '../../../utils/auth-headers';
import { useAuthContext } from '../../../utils/auth/use-auth-context';

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

export function useGetAllFolders() {
  const [folders, setFolders] = useState<FolderResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { profile, profileLoading } = useAuthContext();

  const fetchFolders = useCallback(async (): Promise<void> => {
    // Don't attempt to fetch if profile is still loading
    if (profileLoading) {
      return;
    }

    if (!profile?.id) {
      setError('User profile not available');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Get auth token and build headers
      const token = await getAuthToken();
      const authHeaders = buildAuthHeaders(token);
      
      const response = await fetch(`${API_URL}/folders/user/${profile.id}`, {
        headers: authHeaders,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch folders');
      }
      
      const data: FolderResponse[] = await response.json();
      setFolders(data);
    } catch (err) {
      console.error('Error fetching folders:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch folders';
      setError(errorMessage);
      setFolders([]);
    } finally {
      setLoading(false);
    }
  }, [profile?.id, profileLoading]);

  return {
    folders,
    loading: loading || profileLoading,
    error,
    fetchFolders,
    clearError: useCallback(() => setError(null), []),
    retry: fetchFolders
  };
}
