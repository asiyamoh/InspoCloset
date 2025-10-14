import { useState, useEffect } from "react";
import { API_URL } from "../../../utils/constants";
import { getAuthToken, buildAuthHeaders } from "../../../utils/api/auth-headers";

export interface PictureResponse {
  id: string;
  url: string;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
  pictureTags: Array<{
    tag: {
      id: string;
      name: string;
    };
  }>;
}

export function useSubcategoryPictures(categoryId: string) {
  const [pictures, setPictures] = useState<PictureResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPictures = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get auth token and build headers
      const token = await getAuthToken();
      const authHeaders = buildAuthHeaders(token);
      
      const response = await fetch(`${API_URL}/pictures/category/${categoryId}`, {
        headers: authHeaders
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch pictures');
      }
      
      const picturesData: PictureResponse[] = await response.json();
      setPictures(picturesData);
    } catch (err) {
      console.error('Error fetching pictures:', err);
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch pictures";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchPictures();
    }
  }, [categoryId]);

  return { pictures, loading, error, refetch: fetchPictures };
}
