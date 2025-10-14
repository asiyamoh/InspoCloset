import { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { IconSelector } from '../../../components/ui/IconSelector';
import { FolderResponse } from '../hooks/useFolderDetail';
import { useUpdateFolder } from '../hooks/useUpdateFolder';

interface EditFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  folder: FolderResponse | null;
}

export function EditFolderModal({ isOpen, onClose, onSuccess, folder }: EditFolderModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    icon: null as string | File | null,
  });

  const { updateFolder, isSubmitting, errors, clearErrors } = useUpdateFolder();

  // Initialize form data when folder changes
  useEffect(() => {
    if (folder) {
      setFormData({
        name: folder.name,
        icon: null, // We'll handle existing icon separately
      });
    }
  }, [folder]);

  const handleSubmit = async () => {
    if (!folder) return;

    try {
      await updateFolder(folder.id, {
        name: formData.name,
        icon: formData.icon,
      });
      onSuccess?.();
      onClose();
      resetForm();
    } catch (error) {
      console.error('Failed to update folder:', error);
    }
  };

  const resetForm = () => {
    if (folder) {
      setFormData({
        name: folder.name,
        icon: null,
      });
    }
    clearErrors();
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const isFormValid = () => {
    return formData.name.trim().length > 0;
  };

  if (!folder) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="w-full max-w-2xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-sageGreen mb-4 text-center">Edit Folder</h2>
          <p className="text-sm text-gray-500 text-center">
            Update your folder information
          </p>
        </div>

        {/* Form Content */}
        <div className="space-y-8 py-4">
          {/* Folder Name Input */}
          <div className="max-w-md mx-auto">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-sageGreen">
                Folder Name <span className="text-dustyRose">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., lace, veil, train"
                className="w-full px-4 py-3 text-lg border border-dustyRose/30 rounded-lg focus:ring-2 focus:ring-skyBlue focus:border-skyBlue transition-colors placeholder:text-dustyRose/60 bg-ivoryCream"
              />
              {errors.name && (
                <p className="text-sm text-dustyRose mt-1">{errors.name}</p>
              )}
            </div>
          </div>

          {/* Current Icon Display */}
          {folder.iconPicture && (
            <div className="max-w-md mx-auto">
              <div className="text-center mb-4">
                <p className="text-sm text-dustyRose/70 mb-2">Current Icon:</p>
                <img 
                  src={folder.iconPicture} 
                  alt={folder.name}
                  className="w-16 h-16 rounded-lg object-cover mx-auto border border-dustyRose/20"
                />
              </div>
            </div>
          )}

          {/* Icon Selector */}
          <div className="max-w-md mx-auto">
            <div className="text-center mb-4">
              <p className="text-sm text-dustyRose/70">
                {folder.iconPicture ? 'Change icon?' : 'Add an icon?'} (Optional)
              </p>
            </div>
            <IconSelector
              currentIcon={formData.icon}
              onIconSelected={(icon) => setFormData(prev => ({ ...prev, icon }))}
            />
          </div>


          {/* General Error */}
          {errors.general && (
            <div className="max-w-md mx-auto">
              <p className="text-sm text-dustyRose text-center">{errors.general}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="pt-6 pb-20">
          <div className="border-t border-dustyRose/30 mb-6"></div>
          <div className="flex justify-between items-center gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 text-xs font-medium text-dustyRose bg-champagneBeige/50 border border-dustyRose/30 rounded-lg hover:bg-champagneBeige/70 transition-colors min-h-[44px] flex items-center justify-center"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !isFormValid()}
              className="flex-1 px-4 py-3 text-xs font-medium text-white bg-sageGreen border border-transparent rounded-lg hover:bg-sageGreen/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px] flex items-center justify-center"
            >
              {isSubmitting ? 'Updating...' : 'Update Folder'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
