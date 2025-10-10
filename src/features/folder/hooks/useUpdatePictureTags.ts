import { useState, useCallback } from 'react';
import { API_URL } from '../../../utils/constants';

export function useUpdatePictureTags() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePictureTags = useCallback(async (pictureId: string, tags: string[]): Promise<void> => {
    setIsUpdating(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/pictures/${pictureId}/tags`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tags }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update picture tags');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update tags';
      setError(errorMessage);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    updatePictureTags,
    isUpdating,
    error,
    clearError,
  };
}
