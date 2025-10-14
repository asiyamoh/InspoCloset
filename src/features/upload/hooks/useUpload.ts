import { useState } from 'react';
import { UploadFormData, UploadResult } from '../types';
import { API_URL } from '../../../utils/constants';
import { getAuthToken, buildAuthHeaders } from '../../../utils/auth-headers';

export function useUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadPictures = async (
    formData: UploadFormData
  ): Promise<UploadResult> => {
    if (!formData.selectedFolder || formData.selectedFiles.length === 0) {
      throw new Error('No folder selected or no files to upload');
    }

    setIsUploading(true);
    setError(null);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('folderId', formData.selectedFolder.id);
      
      // Add each picture and its tags to FormData
      formData.selectedFiles.forEach((file, index) => {
        uploadFormData.append(`pictures[${index}].file`, file);
        uploadFormData.append(`pictures[${index}].tags`, JSON.stringify([])); // Empty tags for now
      });

      const token = await getAuthToken();
      const authHeaders = buildAuthHeaders(token);

      const response = await fetch(`${API_URL}/pictures/subcategory/${formData.selectedSubcategory!.id}/pictures`, {
        method: 'POST',
        body: uploadFormData,
        headers: authHeaders,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload pictures');
      }

      const result = await response.json();
      
      return {
        success: result.success,
        uploadedPictures: result.uploadedPictures || [],
        errors: result.errors || [],
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    uploadPictures,
    isUploading,
    error,
    clearError,
  };
}
