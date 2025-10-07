import { useState, useEffect, useCallback } from 'react';
import { folderApi } from '../utils/api/folder-api';
import { API_URL } from '../utils/constants';

export interface FavoriteFolder {
  id: string;
  name: string;
  iconPicture?: string;
  createdAt: string;
  updatedAt: string;
  icon: string; // Computed field for display
}

export interface FavoriteFoldersResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  folder: FavoriteFolder;
}

// Global state for favorites
let globalFavorites: FavoriteFolder[] = [];
let globalIsLoading = false;
let globalError: string | null = null;
let hasInitialized = false;
let listeners: Set<() => void> = new Set();

// Notify all listeners of state changes
const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

// Global state management functions
const setGlobalFavorites = (favorites: FavoriteFolder[]) => {
  globalFavorites = favorites;
  notifyListeners();
};

const setGlobalIsLoading = (loading: boolean) => {
  globalIsLoading = loading;
  notifyListeners();
};

const setGlobalError = (error: string | null) => {
  globalError = error;
  notifyListeners();
};

// Utility function to fetch favorites (also updates global state)
export async function fetchFavorites(): Promise<FavoriteFolder[]> {
  try {
    setGlobalIsLoading(true);
    setGlobalError(null);
    
    const data = await folderApi.getFavorites();
    
    // Extract folder data from the response
    const favoriteFolders = data.map(item => ({
      ...item.folder,
      icon: item.folder.iconPicture || '📁' // Use iconPicture URL or fallback to default folder icon
    }));
    
    setGlobalFavorites(favoriteFolders);
    return favoriteFolders;
  } catch (error) {
    console.error('Error fetching favorite folders:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch favorites';
    setGlobalError(errorMessage);
    setGlobalFavorites([]);
    throw error;
  } finally {
    setGlobalIsLoading(false);
  }
}

// Utility function to toggle favorite
export async function toggleFavorite(folderId: string): Promise<{ isFavorite: boolean; message: string }> {
  try {
    const response = await fetch(`${API_URL}/user-favorite-folders/toggle/${folderId}`, {
      method: 'PUT',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to toggle favorite');
    }

    const result = await response.json();
    
    // Refetch favorites after toggle to update global state
    await fetchFavorites();
    
    return result;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
}

// Utility function to check favorite status
export async function checkFavoriteStatus(folderId: string): Promise<boolean> {
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
}

// Global state hook
export function useFavorites() {
  const [, forceUpdate] = useState({});

  // Force re-render when global state changes
  const rerender = useCallback(() => {
    forceUpdate({});
  }, []);

  // Subscribe to global state changes
  useEffect(() => {
    listeners.add(rerender);
    return () => {
      listeners.delete(rerender);
    };
  }, [rerender]);

  // Initialize favorites on first use
  useEffect(() => {
    if (!hasInitialized) {
      hasInitialized = true;
      fetchFavorites();
    }
  }, []);

  return {
    favorites: globalFavorites,
    isLoading: globalIsLoading,
    error: globalError,
    refetch: fetchFavorites,
    toggleFavorite,
    checkFavoriteStatus
  };
}
