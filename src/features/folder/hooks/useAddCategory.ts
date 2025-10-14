import { useState } from 'react';
import { CategoryFormData } from '../types';
import { API_URL } from '../../../utils/constants';
import { getAuthToken, buildAuthHeaders } from '../../../utils/api/auth-headers';

export function useAddCategory() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (data: CategoryFormData): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!data.categories || data.categories.length === 0) {
      newErrors.general = 'At least one category is required';
      return newErrors;
    }

    data.categories.forEach((category, index) => {
      if (!category.name.trim()) {
        newErrors[`category-${index}`] = 'Category name is required';
      }
    });

    return newErrors;
  };

  const addCategories = async (
    folderId: string, 
    data: CategoryFormData, 
    brideId?: string
  ): Promise<{
    success: boolean;
    createdCategories: any[];
    errors: Array<{ categoryName: string; error: string }>;
  }> => {
    setIsSubmitting(true);
    setErrors({});

    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return {
        success: false,
        createdCategories: [],
        errors: []
      };
    }

    try {
      const formData = new FormData();

      // Add folder metadata
      formData.append('folderId', folderId);
      if (brideId) {
        formData.append('brideId', brideId);
      }

      // Add categories data
      data.categories.forEach((category, catIndex) => {
        // Add category name
        formData.append(`categories[${catIndex}].name`, category.name.trim());

        // Add category icon if provided
        if (category.icon && category.icon instanceof File) {
          formData.append(`categories[${catIndex}].icon`, category.icon);
        }

        // Add pictures for this category
        if (category.pictures && category.pictures.length > 0) {
          category.pictures.forEach((picture, picIndex) => {
            // Add picture file
            formData.append(`categories[${catIndex}].pictures[${picIndex}].file`, picture.file);

            // Add tags as JSON string
            formData.append(`categories[${catIndex}].pictures[${picIndex}].tags`, JSON.stringify(picture.tags));
          });
        }
      });
      // Get auth token and build headers
      const token = await getAuthToken();
      const authHeaders = buildAuthHeaders(token);

      // Make API call
      const response = await fetch(`${API_URL}/folders/${folderId}/categories`, {
        headers: authHeaders,
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add categories');
      }

      const result = await response.json();
      setIsSubmitting(false);
      return result;
    } catch (error) {
      console.error('Error adding categories:', error);
      setErrors({ 
        general: error instanceof Error 
          ? error.message 
          : 'Failed to add categories. Please try again.' 
      });
      setIsSubmitting(false);
      return {
        success: false,
        createdCategories: [],
        errors: [{
          categoryName: 'General',
          error: error instanceof Error ? error.message : 'Unknown error'
        }]
      };
    }
  };

  return {
    isSubmitting,
    errors,
    addCategories,
    clearErrors: () => setErrors({})
  };
}
