import { useState } from 'react';
import { API_URL } from '../../../utils/constants';
import { getAuthToken, buildAuthHeaders } from '../../../utils/auth-headers';

export function useDeleteSubcategory() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const deleteSubcategory = async (subcategoryId: string): Promise<void> => {
    setIsDeleting(true);
    setErrors({});

    // Get auth token and build headers
    const token = await getAuthToken();
    const authHeaders = buildAuthHeaders(token);

    try {
      const response = await fetch(`${API_URL}/folders/subcategory/${subcategoryId}`, {
        method: 'DELETE',
        headers: authHeaders,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete subcategory');
      }

      setIsDeleting(false);
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      setErrors({ 
        general: error instanceof Error 
          ? error.message 
          : 'Failed to delete subcategory. Please try again.' 
      });
      setIsDeleting(false);
      throw error;
    }
  };

  return {
    isDeleting,
    errors,
    deleteSubcategory,
    clearErrors: () => setErrors({})
  };
}
