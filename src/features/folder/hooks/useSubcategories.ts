import { useState } from 'react';
import { Subcategory } from '../types';

export function useSubcategories() {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  const addSubcategory = () => {
    const newSubcategory: Subcategory = {
      id: Date.now().toString(),
      name: '',
      tags: []
    };
    setSubcategories(prev => [...prev, newSubcategory]);
  };

  const removeSubcategory = (id: string) => {
    setSubcategories(prev => prev.filter(sub => sub.id !== id));
  };

  const updateSubcategory = (id: string, updates: Partial<Subcategory>) => {
    setSubcategories(prev =>
      prev.map(sub =>
        sub.id === id ? { ...sub, ...updates } : sub
      )
    );
  };

  const addTag = (subcategoryId: string, tag: string) => {
    if (!tag.trim()) return;
    
    updateSubcategory(subcategoryId, {
      tags: [...subcategories.find(sub => sub.id === subcategoryId)?.tags || [], tag.trim()]
    });
  };

  const removeTag = (subcategoryId: string, tagToRemove: string) => {
    updateSubcategory(subcategoryId, {
      tags: subcategories
        .find(sub => sub.id === subcategoryId)
        ?.tags.filter(tag => tag !== tagToRemove) || []
    });
  };

  const clearSubcategories = () => {
    setSubcategories([]);
  };

  return {
    subcategories,
    addSubcategory,
    removeSubcategory,
    updateSubcategory,
    addTag,
    removeTag,
    clearSubcategories
  };
}
