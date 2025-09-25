import { useState } from 'react';
import { FolderFormData, CreateFolderRequest } from '../types';

export function useAddFolder() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (data: FolderFormData): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!data.name.trim()) {
      newErrors.name = 'Folder name is required';
    }

    if (data.hasSubcategories) {
      data.subcategories.forEach((subcategory, index) => {
        if (!subcategory.name.trim()) {
          newErrors[`subcategory-${index}`] = 'Subcategory name is required';
        }
      });
    }

    return newErrors;
  };

  const createFolder = async (data: FolderFormData): Promise<void> => {
    setIsSubmitting(true);
    setErrors({});

    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const requestData: CreateFolderRequest = {
        name: data.name.trim(),
        subcategories: data.hasSubcategories
          ? data.subcategories.map(sub => ({
              name: sub.name.trim(),
              picture: typeof sub.picture === 'string' ? sub.picture : undefined,
              tags: sub.tags
            }))
          : undefined
      };

      // TODO: Replace with actual API call
      console.log('Creating folder:', requestData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form on success
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error creating folder:', error);
      setErrors({ general: 'Failed to create folder. Please try again.' });
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    errors,
    createFolder,
    clearErrors: () => setErrors({})
  };
}
