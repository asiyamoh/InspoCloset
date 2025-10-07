import { useState, useCallback } from 'react';
import { API_URL } from '../../../utils/constants';

export interface UpdateSubcategoryFormData {
  name: string;
  icon?: File;
}

export function useUpdateSubcategory() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (data: UpdateSubcategoryFormData): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!data.name.trim()) {
      newErrors.name = 'Subcategory name is required';
    }

    if (data.name.trim().length > 50) {
      newErrors.name = 'Subcategory name must be 50 characters or less';
    }

    if (data.icon && data.icon.size > 5 * 1024 * 1024) { // 5MB limit
      newErrors.icon = 'Icon file must be smaller than 5MB';
    }

    if (data.icon && !data.icon.type.startsWith('image/')) {
      newErrors.icon = 'Icon must be an image file';
    }

    return newErrors;
  };

  const updateSubcategory = async (
    subcategoryId: string, 
    data: UpdateSubcategoryFormData
  ): Promise<void> => {
    setIsSubmitting(true);
    setErrors({});

    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', data.name.trim());
      
      if (data.icon) {
        formData.append('icon', data.icon);
      }

      const response = await fetch(`${API_URL}/folders/subcategory/${subcategoryId}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update subcategory');
      }

      await response.json();
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error updating subcategory:', error);
      setErrors({ 
        general: error instanceof Error 
          ? error.message 
          : 'Failed to update subcategory. Please try again.' 
      });
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    errors,
    updateSubcategory,
    clearErrors: useCallback(() => setErrors({}), [])
  };
}
