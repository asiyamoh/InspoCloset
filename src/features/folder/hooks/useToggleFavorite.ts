import { useState, useCallback } from 'react';
import { useFavorites } from '../../../hooks/useFavorites';

export function useToggleFavorite() {
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toggleFavorite: globalToggleFavorite, checkFavoriteStatus } = useFavorites();

  const toggleFavorite = async (folderId: string): Promise<{ isFavorite: boolean; message: string }> => {
    setIsToggling(true);
    setError(null);

    try {
      const result = await globalToggleFavorite(folderId);
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

  return {
    isToggling,
    error,
    toggleFavorite,
    checkFavoriteStatus,
    clearError: useCallback(() => setError(null), [])
  };
}
