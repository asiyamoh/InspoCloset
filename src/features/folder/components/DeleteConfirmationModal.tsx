import { Modal } from '../../../components/ui/Modal';
import { FolderResponse } from '@/utils/api/folder-api';
import { useDeleteFolder } from '../hooks/useDeleteFolder';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  folder: FolderResponse | null;
}

export function DeleteConfirmationModal({ isOpen, onClose, onSuccess, folder }: DeleteConfirmationModalProps) {
  const { deleteFolder, isDeleting, errors } = useDeleteFolder();

  const handleDelete = async () => {
    if (!folder) return;

    try {
      await deleteFolder(folder.id);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Failed to delete folder:', error);
    }
  };

  if (!folder) return null;

  const subcategoryCount = (folder.subcategories?.length || folder.categories?.length || 0);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-md mx-auto p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-dustyRose mb-2">Delete Folder</h2>
          <p className="text-sm text-gray-500">
            This action cannot be undone
          </p>
        </div>

        {/* Folder Info */}
        <div className="mb-8">
          <div className="bg-white/60 p-6 rounded-lg border border-dustyRose/20 shadow-photo-glue">
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-3xl">
                {folder.iconPicture ? (
                  <img 
                    src={folder.iconPicture} 
                    alt={folder.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                ) : (
                  '📁'
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-sageGreen">{folder.name}</h3>
                <p className="text-sm text-dustyRose/70">
                  Created {new Date(folder.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Folder Stats */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-sageGreen">Subcategories:</span>
                <span className="text-dustyRose font-medium">{subcategoryCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sageGreen">Total Items:</span>
                <span className="text-dustyRose font-medium">
                  {subcategoryCount > 0 ? 'Multiple photos & tags' : 'Empty folder'}
                </span>
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
                Deleting this folder will permanently remove:
              </p>
              <ul className="text-sm text-red-700 mt-2 ml-4 list-disc">
                <li>All subcategories and their photos</li>
                <li>All tags associated with photos</li>
                <li>Folder icon and metadata</li>
                <li>All folder favorites</li>
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
