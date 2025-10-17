import { useState, useCallback } from 'react';
import { API_URL } from '../../../utils/constants';
import { getAuthToken, buildAuthHeaders } from '../../../utils/auth-headers';

export interface UploadResult {
  success: boolean;
  results: Array<{
    index: number;
    picture: {
      id: string;
      url: string;
      thumbnailUrl: string;
    };
    success: boolean;
  }>;
  errors: Array<{
    index: number;
    fileName: string;
    error: string;
  }>;
  message: string;
}

export function useUploadPictures() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadPictures = useCallback(async (formData: FormData): Promise<UploadResult> => {
    try {
      setIsUploading(true);
      setError(null);
      
      const token = await getAuthToken();
      const authHeaders = buildAuthHeaders(token);

      const response = await fetch(`${API_URL}/upload/pictures`, {
        method: 'POST',
        body: formData,
        headers: authHeaders,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload pictures');
      }
      
      const result: UploadResult = await response.json();
      setIsUploading(false);
      return result;
    } catch (err) {
      console.error('Error uploading pictures:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload pictures';
      setError(errorMessage);
      setIsUploading(false);
      
      // Return a default error result
      return {
        success: false,
        results: [],
        errors: [{
          index: 0,
          fileName: 'Unknown',
          error: errorMessage
        }],
        message: errorMessage
      };
    }
  }, []);

  return {
    isUploading,
    error,
    uploadPictures,
    clearError: useCallback(() => setError(null), [])
  };
}
