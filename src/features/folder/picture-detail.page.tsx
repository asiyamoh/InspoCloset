import { useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { usePictureDetail } from './hooks/usePictureDetail';
import { useUpdatePictureTags } from './hooks/useUpdatePictureTags';
import { DeletePictureConfirmationModal } from './components/DeletePictureConfirmationModal';

export function PictureDetailPage() {
  const { pictureId } = useParams({ from: '/_authenticated/picture-detail/$pictureId' });
  const navigate = useNavigate();
  const { picture, isLoading, error } = usePictureDetail(pictureId);
  const { updatePictureTags, isUpdating, error: updateError } = useUpdatePictureTags();
  
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Initialize tags when picture loads
  if (picture && tags.length === 0 && picture.pictureTags.length > 0) {
    setTags(picture.pictureTags.map(pt => pt.tag.name));
  }

  const handleAddTag = () => {
    const trimmedTag = newTag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSave = async () => {
    if (!picture) return;

    try {
      await updatePictureTags(picture.id, tags);
      // Navigate back to subcategory after successful save
      const subcategory = picture.pictureLocations[0]?.category;
      if (subcategory) {
        navigate({ 
          to: '/folder-details/$folderId/subcategory/$subcategoryId',
          params: { 
            folderId: subcategory.folderId, 
            subcategoryId: subcategory.id 
          }
        });
      }
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handlePictureDeleted = () => {
    // Navigate back to subcategory after deletion
    const subcategory = picture?.pictureLocations[0]?.category;
    if (subcategory) {
      navigate({ 
        to: '/folder-details/$folderId/subcategory/$subcategoryId',
        params: { 
          folderId: subcategory.folderId, 
          subcategoryId: subcategory.id 
        }
      });
    }
  };

  const handleBack = () => {
    if (picture?.pictureLocations[0]?.category) {
      const subcategory = picture.pictureLocations[0].category;
      navigate({ 
        to: '/folder-details/$folderId/subcategory/$subcategoryId',
        params: { 
          folderId: subcategory.folderId, 
          subcategoryId: subcategory.id 
        }
      });
    } else {
      navigate({ to: '/home' });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-champagneBeige to-ivoryCream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sageGreen mx-auto mb-4"></div>
          <p className="text-sageGreen font-medium">Loading picture...</p>
        </div>
      </div>
    );
  }

  if (error || !picture) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-champagneBeige to-ivoryCream flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-sageGreen mb-2">Picture Not Found</h2>
          <p className="text-dustyRose/70 mb-6">{error || 'The picture you are looking for does not exist.'}</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-sageGreen text-white font-medium rounded-lg hover:bg-sageGreen/90 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const subcategory = picture.pictureLocations[0]?.category;
  const folder = subcategory?.folder;

  return (
    <div className="min-h-screen bg-gradient-to-br from-champagneBeige to-ivoryCream">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Breadcrumbs */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-dustyRose/70 mb-4">
            <button
              onClick={() => navigate({ to: '/home' })}
              className="hover:text-sageGreen transition-colors"
            >
              Home
            </button>
            <span>›</span>
            {folder && (
              <>
                <button
                  onClick={() => navigate({ to: '/folder/$folderId', params: { folderId: folder.id } })}
                  className="hover:text-sageGreen transition-colors"
                >
                  {folder.name}
                </button>
                <span>›</span>
              </>
            )}
            {subcategory && (
              <>
                <button
                  onClick={() => navigate({ 
                    to: '/folder-details/$folderId/subcategory/$subcategoryId',
                    params: { folderId: subcategory.folderId, subcategoryId: subcategory.id }
                  })}
                  className="hover:text-sageGreen transition-colors"
                >
                  {subcategory.name}
                </button>
                <span>›</span>
              </>
            )}
            <span className="text-sageGreen font-medium">Picture</span>
          </div>
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-sageGreen">Picture Details</h1>
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-dustyRose hover:bg-champagneBeige/50 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to {subcategory?.name || 'Subcategory'}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {updateError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{updateError}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="bg-white/60 rounded-lg border border-dustyRose/20 shadow-photo-glue p-6">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={picture.url}
                  alt="Picture detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div className="space-y-6">
            <div className="bg-white/60 rounded-lg border border-dustyRose/20 shadow-photo-glue p-6">
              <h3 className="text-lg font-medium text-sageGreen mb-4">Tags</h3>
              
              {/* Add New Tag */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-sageGreen mb-2">
                  Add new tag
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter tag name..."
                    className="flex-1 px-4 py-2 text-base border border-dustyRose/30 rounded-lg focus:ring-2 focus:ring-skyBlue focus:border-skyBlue transition-colors placeholder:text-dustyRose/60 bg-ivoryCream"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    disabled={!newTag.trim()}
                    className="px-4 py-2 bg-skyBlue text-white text-sm font-medium rounded-lg hover:bg-skyBlue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Add
                  </button>
                </div>
                <p className="text-xs text-dustyRose/60 mt-2">
                  Press Enter or comma to add tags
                </p>
              </div>

              {/* Current Tags */}
              <div>
                <h4 className="text-sm font-medium text-sageGreen mb-3">
                  Current tags ({tags.length})
                </h4>
                {tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-skyBlue/15 text-skyBlue text-sm rounded-full border border-skyBlue/30"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-skyBlue/70 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-dustyRose/60 italic">
                    No tags added yet. Add some tags to help you find this picture later.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-dustyRose/30">
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
          >
            Delete Picture
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-2 text-sm font-medium text-dustyRose bg-champagneBeige/50 border border-dustyRose/30 rounded-lg hover:bg-champagneBeige/70 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isUpdating}
              className="px-6 py-2 text-sm font-medium text-white bg-sageGreen border border-transparent rounded-lg hover:bg-sageGreen/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Delete Picture Confirmation Modal */}
      {picture && (
        <DeletePictureConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onSuccess={handlePictureDeleted}
          picture={picture}
        />
      )}
    </div>
  );
}
