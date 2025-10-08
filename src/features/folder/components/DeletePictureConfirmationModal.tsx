import { Modal } from '../../../components/ui/Modal';
import { PictureResponse } from '@/utils/api/folder-api';
import { useDeletePicture } from '../hooks/useDeletePicture';

interface DeletePictureConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  picture: PictureResponse | null;
}

export function DeletePictureConfirmationModal({ isOpen, onClose, onSuccess, picture }: DeletePictureConfirmationModalProps) {
  const { deletePicture, isDeleting, errors } = useDeletePicture();

  const handleDelete = async () => {
    if (!picture) return;

    try {
      await deletePicture(picture.id);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Failed to delete picture:', error);
    }
  };

  if (!picture) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-md mx-auto p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="text-6xl mb-4">🗑️</div>
          <h2 className="text-2xl font-bold text-dustyRose mb-2">Delete Picture</h2>
          <p className="text-sm text-gray-500">
            This action cannot be undone
          </p>
        </div>

        {/* Picture Info */}
        <div className="mb-8">
          <div className="bg-white/60 p-6 rounded-lg border border-dustyRose/20 shadow-photo-glue">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 flex-shrink-0">
                <img 
                  src={picture.thumbnailUrl || picture.url} 
                  alt="Picture to delete"
                  className="w-full h-full rounded object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-sageGreen">Picture</h3>
                <p className="text-sm text-dustyRose/70">
                  Added {new Date(picture.createdAt).toLocaleDateString()}
                </p>
                {picture.pictureTags.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-dustyRose/50 mb-1">Tags:</p>
                    <div className="flex flex-wrap gap-1">
                      {picture.pictureTags.slice(0, 3).map((pictureTag) => (
                        <span
                          key={pictureTag.tag.id}
                          className="bg-sageGreen/20 text-sageGreen text-xs px-2 py-1 rounded"
                        >
                          {pictureTag.tag.name}
                        </span>
                      ))}
                      {picture.pictureTags.length > 3 && (
                        <span className="text-xs text-dustyRose/50">
                          +{picture.pictureTags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
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
                Deleting this picture will permanently remove:
              </p>
              <ul className="text-sm text-red-700 mt-2 ml-4 list-disc">
                <li>The picture file and thumbnail</li>
                <li>All associated tags</li>
                <li>Picture metadata</li>
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
