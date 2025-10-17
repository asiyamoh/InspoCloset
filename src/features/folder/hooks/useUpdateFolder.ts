import { useState } from 'react';
import { FolderResponse } from './useFolderDetail';
import { API_URL } from '../../../utils/constants';
import { getAuthToken, buildAuthHeaders } from '../../../utils/auth-headers';

export interface UpdateFolderData {
  name?: string;
  icon?: string | File | null;
}

export function useUpdateFolder() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (data: UpdateFolderData): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (data.name !== undefined && !data.name.trim()) {
      newErrors.name = 'Folder name is required';
    }

    return newErrors;
  };

  const updateFolder = async (folderId: string, data: UpdateFolderData): Promise<FolderResponse> => {
    setIsSubmitting(true);
    setErrors({});

    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      throw new Error('Validation failed');
    }

    try {
      const formData = new FormData();

      // Add folder metadata
      if (data.name !== undefined) {
        formData.append('name', data.name.trim());
      }

      // Add folder icon if provided
      if (data.icon && data.icon instanceof File) {
        formData.append('icon', data.icon);
      }

      // Get auth token and build headers
      const token = await getAuthToken();
      const authHeaders = buildAuthHeaders(token);

      // Make API call
      const response = await fetch(`${API_URL}/folders/${folderId}`, {
        method: 'PUT',
        body: formData,
        headers: authHeaders,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update folder');
      }

      const updatedFolder = await response.json();
      
      setIsSubmitting(false);
      return updatedFolder;
    } catch (error) {
      console.error('Error updating folder:', error);
      setErrors({ 
        general: error instanceof Error 
          ? error.message 
          : 'Failed to update folder. Please try again.' 
      });
      setIsSubmitting(false);
      throw error;
    }
  };

  return {
    isSubmitting,
    errors,
    updateFolder,
    clearErrors: () => setErrors({})
  };
}
