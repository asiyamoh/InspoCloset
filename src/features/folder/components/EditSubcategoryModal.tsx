import { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { FormInput } from '../../../components/ui/FormInput';
import { Button } from '../../../components/ui/Button';
import { FileUploadZone } from '../../../components/ui/FileUploadZone';
import { useUpdateSubcategory, UpdateSubcategoryFormData } from '../hooks/useUpdateSubcategory';

interface EditSubcategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  subcategory: {
    id: string;
    name: string;
    iconPicture?: string;
  };
}

export function EditSubcategoryModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  subcategory 
}: EditSubcategoryModalProps) {
  // Initialize form data directly from props 
  const [formData, setFormData] = useState<UpdateSubcategoryFormData>({
    name: subcategory.name,
    icon: undefined,
  });
  const [iconPreview, setIconPreview] = useState<string | null>(
    subcategory.iconPicture || null
  );

  const { isSubmitting, errors, updateSubcategory, clearErrors } = useUpdateSubcategory();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, name: e.target.value }));
    if (errors.name) {
      clearErrors();
    }
  };

  const handleIconChange = (files: File[]) => {
    const file = files[0] || null;
    setFormData(prev => ({ ...prev, icon: file || undefined }));
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setIconPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setIconPreview(subcategory.iconPicture || null);
    }
    
    if (errors.icon) {
      clearErrors();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updateSubcategory(subcategory.id, formData);
      onSuccess();
      onClose();
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-sageGreen mb-6">
          Edit Subcategory
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <FormInput
              label="Subcategory Name"
              value={formData.name}
              onChange={handleNameChange}
              placeholder="Enter subcategory name"
              error={errors.name}
              required
            />
          </div>

          {/* Icon Section */}
          <div>
            <label className="block text-sm font-medium text-sageGreen mb-2">
              Icon
            </label>
            
            {/* Current Icon Preview */}
            {iconPreview && (
              <div className="mb-4">
                <p className="text-sm text-dustyRose/70 mb-2">Current Icon:</p>
                <div className="w-16 h-16 rounded-lg border border-dustyRose/20 overflow-hidden bg-white/60">
                  <img
                    src={iconPreview}
                    alt="Current icon"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Icon Upload */}
            <FileUploadZone
              onFilesSelected={handleIconChange}
              acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
              maxFiles={1}
              className="mb-2"
            />
            
            {errors.icon && (
              <p className="text-sm text-dustyRose mt-1">{errors.icon}</p>
            )}
            
            <p className="text-xs text-dustyRose/60">
              Upload a new icon (optional). Max size: 5MB
            </p>
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <Button
              type="button"
              color="ghost"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="secondary"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
