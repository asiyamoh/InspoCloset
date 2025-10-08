import { useState } from 'react';
import { API_URL } from '../../../utils/constants';

export function useDeletePicture() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const deletePicture = async (pictureId: string): Promise<void> => {
    setIsDeleting(true);
    setErrors({});

    try {
      const response = await fetch(`${API_URL}/pictures/${pictureId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete picture');
      }

      setIsDeleting(false);
    } catch (error) {
      console.error('Error deleting picture:', error);
      setErrors({ 
        general: error instanceof Error 
          ? error.message 
          : 'Failed to delete picture. Please try again.' 
      });
      setIsDeleting(false);
      throw error;
    }
  };

  return {
    isDeleting,
    errors,
    deletePicture,
    clearErrors: () => setErrors({})
  };
}
