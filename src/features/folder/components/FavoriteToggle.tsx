import { useState, useEffect } from 'react';
import { useToggleFavorite } from '../hooks/useToggleFavorite';
import { InfoTooltip } from '../../../components/ui/InfoTooltip';

interface FavoriteToggleProps {
  folderId: string;
  onToggle?: (isFavorite: boolean) => void;
}

export function FavoriteToggle({ folderId, onToggle }: FavoriteToggleProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isToggling, error, toggleFavorite, checkFavoriteStatus } = useToggleFavorite();

  // Check initial favorite status
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const status = await checkFavoriteStatus(folderId);
        setIsFavorite(status);
      } catch (error) {
        console.error('Failed to check favorite status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkStatus();
  }, [folderId, checkFavoriteStatus]);

  const handleToggle = async () => {
    try {
      const result = await toggleFavorite(folderId);
      setIsFavorite(result.isFavorite);
      onToggle?.(result.isFavorite);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 border-2 border-dustyRose/30 border-t-dustyRose rounded-full animate-spin" />
        <span className="text-sm text-dustyRose/70">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isFavorite}
          onChange={handleToggle}
          disabled={isToggling}
          className="w-4 h-4 text-sageGreen bg-white border-dustyRose/30 rounded focus:ring-sageGreen focus:ring-2"
        />
        <span className="text-sm font-medium text-sageGreen">
          {isFavorite ? '⭐ Favorite' : '☆ Add to Favorites'}
        </span>
        <InfoTooltip 
          content={isFavorite 
            ? "This folder appears in your bottom navigation" 
            : "Add to favorites to access quickly from bottom navigation"
          }
          placement="top"
        />
      </label>
      
      {isToggling && (
        <div className="w-4 h-4 border-2 border-dustyRose/30 border-t-dustyRose rounded-full animate-spin" />
      )}
      
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1">
          {error}
        </div>
      )}
    </div>
  );
}
