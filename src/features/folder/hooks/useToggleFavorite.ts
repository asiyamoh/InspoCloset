import { useState, useCallback } from 'react';
import { API_URL } from '../../../utils/constants';

export function useToggleFavorite() {
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleFavorite = async (folderId: string): Promise<{ isFavorite: boolean; message: string }> => {
    setIsToggling(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/user-favorite-folders/toggle/${folderId}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to toggle favorite');
      }

      const result = await response.json();
      setIsToggling(false);
      return result;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to toggle favorite. Please try again.';
      setError(errorMessage);
      setIsToggling(false);
      throw error;
    }
  };

  const checkFavoriteStatus = async (folderId: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/user-favorite-folders/check/${folderId}`);
      
      if (!response.ok) {
        throw new Error('Failed to check favorite status');
      }

      const result = await response.json();
      return result.isFavorited;
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  };

  return {
    isToggling,
    error,
    toggleFavorite,
    checkFavoriteStatus,
    clearError: useCallback(() => setError(null), [])
  };
}
