import { useState, useEffect } from 'react';
import { API_URL } from '../../../utils/constants';
import { getAuthToken, buildAuthHeaders } from '../../../utils/auth-headers';

interface PictureTag {
  id: string;
  tag: {
    id: string;
    name: string;
  };
}

interface PictureDetail {
  id: string;
  url: string;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
  pictureTags: PictureTag[];
  pictureLocations: Array<{
    id: string;
    categoryId: string;
    folderId: string;
    brideId?: string;
    category?: {
      id: string;
      name: string;
      folderId: string;
      folder?: {
        id: string;
        name: string;
      };
    };
  }>;
}

export function usePictureDetail(pictureId: string) {
  const [picture, setPicture] = useState<PictureDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPicture = async () => {
      if (!pictureId) return;
      
      setIsLoading(true);
      setError(null);

      try {
        // Get auth token and build headers
        const token = await getAuthToken();
        const authHeaders = buildAuthHeaders(token);

        const response = await fetch(`${API_URL}/pictures/${pictureId}`, {
          headers: authHeaders,
        });
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Picture not found');
          }
          throw new Error('Failed to fetch picture');
        }

        const data = await response.json();
        setPicture(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch picture';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPicture();
  }, [pictureId]);

  return {
    picture,
    isLoading,
    error,
    refetch: () => {
      if (pictureId) {
        setIsLoading(true);
        setError(null);
        // Re-trigger the effect by updating a dependency
        setPicture(null);
      }
    }
  };
}
