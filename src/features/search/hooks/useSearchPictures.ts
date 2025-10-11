import { useState, useEffect } from 'react';
import { API_URL } from '../../../utils/constants';
import { SearchPicture } from '../../../types/search.types';

export function useSearchPictures(searchTerm: string) {
  const [pictures, setPictures] = useState<SearchPicture[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchPictures = async () => {
      if (!searchTerm.trim()) {
        setPictures([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(searchTerm)}&type=tags&limit=30`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Search failed');
        }

        const data = await response.json();
        
        // Flatten all pictures from all matching tags
        const allPictures: SearchPicture[] = [];
        if (data.results.tags) {
          data.results.tags.forEach((tag: any) => {
            allPictures.push(...tag.pictures);
          });
        }
        
        // Remove duplicates based on picture ID
        const uniquePictures = allPictures.filter((picture, index, self) => 
          index === self.findIndex(p => p.id === picture.id)
        );
        
        setPictures(uniquePictures);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Search failed';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    searchPictures();
  }, [searchTerm]);

  return {
    pictures,
    isLoading,
    error,
  };
}
