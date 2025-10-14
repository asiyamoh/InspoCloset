import { useState } from 'react';
import { FolderFormData } from '../types';
import { API_URL } from '../../../utils/constants';
import { getAuthToken, buildAuthHeaders } from '../../../utils/auth-headers';

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

  const createFolder = async (data: FolderFormData, brideId?: string): Promise<void> => {
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

      // Add folder metadata
      formData.append('folderName', data.name.trim());
      if (brideId) {
        formData.append('brideId', brideId);
      }
      formData.append('hasSubcategories', data.hasSubcategories.toString());

      // Add folder icon if provided
      if (data.icon && data.icon instanceof File) {
        formData.append('folderIcon', data.icon);
      }

      // Add subcategories data
      if (data.hasSubcategories && data.subcategories.length > 0) {
        data.subcategories.forEach((subcategory, subIndex) => {
          // Add subcategory name
          formData.append(`subcategories[${subIndex}].name`, subcategory.name.trim());

          // Add subcategory icon if provided
          if (subcategory.icon && subcategory.icon instanceof File) {
            formData.append(`subcategories[${subIndex}].icon`, subcategory.icon);
          }

          // Add pictures for this subcategory
          if (subcategory.pictures && subcategory.pictures.length > 0) {
            subcategory.pictures.forEach((picture, picIndex) => {
              // Add picture file
              formData.append(`subcategories[${subIndex}].pictures[${picIndex}].file`, picture.file);

              // Add tags as JSON string
              formData.append(`subcategories[${subIndex}].pictures[${picIndex}].tags`, JSON.stringify(picture.tags));
            });
          }
        });
      }

      // Make API call
      const token = await getAuthToken();
      const authHeaders = buildAuthHeaders(token);

      const response = await fetch(`${API_URL}/folders`, {
        method: 'POST',
        body: formData,
        headers: authHeaders,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create folder');
      }

      await response.json();
      
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error creating folder:', error);
      setErrors({ 
        general: error instanceof Error 
          ? error.message 
          : 'Failed to create folder. Please try again.' 
      });
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
