import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../../../utils/constants";
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

export function useFolderDetail(folderId: string) {
  const [folder, setFolder] = useState<FolderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFolder = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Get auth token and build headers
      const token = await getAuthToken();
      const authHeaders = buildAuthHeaders(token);
      
      const response = await fetch(`${API_URL}/folders/${folderId}`, {
        headers: authHeaders,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch folder');
      }
      
      const folderData: FolderResponse = await response.json();
      setFolder(folderData);
    } catch (err) {
      console.error('Error fetching folder:', err);
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch folder";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [folderId]);

  useEffect(() => {
    if (folderId) {
      fetchFolder();
    }
  }, [folderId, fetchFolder]);

  return { folder, loading, error, refreshFolder: fetchFolder };
}
