import { useState } from "react";
import { PictureUpload } from "../types";
import { API_URL } from "../../../utils/constants";
import { getAuthToken, buildAuthHeaders } from '../../../utils/api/auth-headers';

export function useAddPicturesToSubcategory() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const uploadPictures = async (
    categoryId: string,
    pictures: PictureUpload[],
    folderId: string,
    brideId?: string
  ): Promise<any> => {
    setIsUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('folderId', folderId);
      if (brideId) {
        formData.append('brideId', brideId);
      }
      
      // Add each picture and its tags to FormData
      pictures.forEach((picture, index) => {
        formData.append(`pictures[${index}].file`, picture.file);
        formData.append(`pictures[${index}].tags`, JSON.stringify(picture.tags));
      });

      // Get auth token and build headers
      const token = await getAuthToken();
      const authHeaders = buildAuthHeaders(token);

      const response = await fetch(`${API_URL}/pictures/subcategory/${categoryId}/pictures`, {
        method: 'POST',
        headers: authHeaders,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload pictures');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };
  
  return { 
    uploadPictures, 
    isUploading, 
    error,
    clearError: () => setError(null)
  };
}
