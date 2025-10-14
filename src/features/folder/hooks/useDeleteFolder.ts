import { useState } from 'react';
import { API_URL } from '../../../utils/constants';
import { getAuthToken, buildAuthHeaders } from '../../../utils/api/auth-headers';

export function useDeleteFolder() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const deleteFolder = async (folderId: string): Promise<void> => {
    setIsDeleting(true);
    setErrors({});

    try {
      // Get auth token and build headers
      const token = await getAuthToken();
      const authHeaders = buildAuthHeaders(token);

      const response = await fetch(`${API_URL}/folders/${folderId}`, {
        method: 'DELETE',
        headers: authHeaders,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete folder');
      }

      setIsDeleting(false);
    } catch (error) {
      console.error('Error deleting folder:', error);
      setErrors({ 
        general: error instanceof Error 
          ? error.message 
          : 'Failed to delete folder. Please try again.' 
      });
      setIsDeleting(false);
      throw error;
    }
  };

  return {
    isDeleting,
    errors,
    deleteFolder,
    clearErrors: () => setErrors({})
  };
}
