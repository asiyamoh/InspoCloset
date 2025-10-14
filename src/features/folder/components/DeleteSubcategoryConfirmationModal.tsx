import { Modal } from '../../../components/ui/Modal';
import { FolderResponse } from '../hooks/useFolderDetail';
import { useDeleteSubcategory } from '../hooks/useDeleteSubcategory';

interface DeleteSubcategoryConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  folder: FolderResponse | null;
  subcategory: {
    id: string;
    name: string;
    iconPicture?: string;
    folderId: string;
    createdAt: string;
    updatedAt: string;
  } | null;
}

export function DeleteSubcategoryConfirmationModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  folder, 
  subcategory 
}: DeleteSubcategoryConfirmationModalProps) {
  const { deleteSubcategory, isDeleting, errors } = useDeleteSubcategory();

  const handleDelete = async () => {
    if (!subcategory) return;

    try {
      await deleteSubcategory(subcategory.id);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Failed to delete subcategory:', error);
    }
  };

  if (!subcategory || !folder) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-md mx-auto p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="text-6xl mb-4">🗑️</div>
          <h2 className="text-2xl font-bold text-dustyRose mb-2">Delete Subcategory</h2>
          <p className="text-sm text-gray-500">
            This action cannot be undone
          </p>
        </div>

        {/* Subcategory Info */}
        <div className="mb-8">
          <div className="bg-white/60 p-6 rounded-lg border border-dustyRose/20 shadow-photo-glue">
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-3xl">
                {subcategory.iconPicture ? (
                  <img 
                    src={subcategory.iconPicture} 
                    alt={subcategory.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                ) : (
                  '📂'
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-sageGreen">{subcategory.name}</h3>
                <p className="text-sm text-dustyRose/70">
                  Created {new Date(subcategory.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-dustyRose/50">
                  In folder: {folder.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Message */}
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="text-red-500 text-lg">⚠️</div>
            <div>
              <h4 className="text-sm font-medium text-red-800 mb-1">Warning</h4>
              <p className="text-sm text-red-700">
                Deleting this subcategory will permanently remove:
              </p>
              <ul className="text-sm text-red-700 mt-2 ml-4 list-disc">
                <li>All pictures in this subcategory</li>
                <li>All tags associated with those pictures</li>
                <li>Subcategory icon and metadata</li>
                <li>All picture files and thumbnails</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{errors.general}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-4 py-3 text-xs font-medium text-dustyRose bg-champagneBeige/50 border border-dustyRose/30 rounded-lg hover:bg-champagneBeige/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px] flex items-center justify-center"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 px-4 py-3 text-xs font-medium text-white bg-red-500 border border-transparent rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px] flex items-center justify-center"
          >
            {isDeleting ? 'Deleting...' : 'Delete Forever'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
