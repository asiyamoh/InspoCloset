import { useState } from 'react';
import { Subcategory } from '../types';

interface Step3_1PhotoReviewProps {
  subcategories: Subcategory[];
  onSubcategoriesChange: (subcategories: Subcategory[]) => void;
  onComplete: () => void;
  onSkip: () => void;
}

export function Step3_1PhotoReview({
  subcategories,
  onSubcategoriesChange,
  onComplete,
  onSkip
}: Step3_1PhotoReviewProps) {
  // Get all photos from all subcategories
  const allPhotos = subcategories.flatMap(sub => 
    sub.pictures.map(pic => ({
      ...pic,
      subcategoryId: sub.id!,
      subcategoryName: sub.name || 'Untitled Subcategory'
    }))
  );

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [tagInput, setTagInput] = useState('');

  const currentPhoto = allPhotos[currentPhotoIndex];
  const isLastPhoto = currentPhotoIndex === allPhotos.length - 1;
  const isFirstPhoto = currentPhotoIndex === 0;

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !currentPhoto.tags.includes(trimmedTag)) {
      const newTags = [...currentPhoto.tags, trimmedTag];
      
      onSubcategoriesChange(
        subcategories.map(sub => {
          if (sub.id === currentPhoto.subcategoryId) {
            return {
              ...sub,
              pictures: sub.pictures.map(pic =>
                pic.id === currentPhoto.id ? { ...pic, tags: newTags } : pic
              )
            };
          }
          return sub;
        })
      );
    }
    setTagInput('');
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = currentPhoto.tags.filter(tag => tag !== tagToRemove);
    
    onSubcategoriesChange(
      subcategories.map(sub => {
        if (sub.id === currentPhoto.subcategoryId) {
          return {
            ...sub,
            pictures: sub.pictures.map(pic =>
              pic.id === currentPhoto.id ? { ...pic, tags: newTags } : pic
            )
          };
        }
        return sub;
      })
    );
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  const handleNext = () => {
    if (isLastPhoto) {
      onComplete();
    } else {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
      setTagInput('');
    }
  };

  const handlePrevious = () => {
    if (!isFirstPhoto) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
      setTagInput('');
    }
  };

  const handleSkip = () => {
    onSkip();
  };

  if (allPhotos.length === 0) {
    return (
      <div className="space-y-8 py-4">
        <div className="text-center py-12">
          <div className="inline-flex items-center px-6 py-4 bg-champagneBeige/30 rounded-lg border border-dustyRose/20">
            <svg className="w-6 h-6 text-dustyRose/60 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-left">
              <p className="text-sm font-medium text-dustyRose">No photos to review</p>
              <p className="text-xs text-dustyRose/70">Go back to upload photos first</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-sageGreen mb-2">
          Review & Tag Your Photos
        </h3>
        <p className="text-sm text-dustyRose/70">
          Add tags to help you find these photos later
        </p>
      </div>

      {/* Progress */}
      <div className="text-center">
        <div className="inline-flex items-center px-4 py-2 bg-champagneBeige/30 rounded-lg border border-dustyRose/20">
          <span className="text-sm font-medium text-dustyRose">
            Photo {currentPhotoIndex + 1} of {allPhotos.length}
          </span>
        </div>
      </div>

      {/* Photo Preview */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-champagneBeige/20 border border-dustyRose/30 rounded-lg p-6">
          {/* Photo */}
          <div className="mb-6">
            <div className="aspect-square max-w-md mx-auto rounded-lg overflow-hidden bg-gray-100">
              <img
                src={currentPhoto.previewUrl}
                alt={currentPhoto.file.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Photo Info */}
          <div className="text-center mb-6">
            <h4 className="text-lg font-medium text-sageGreen mb-1">
              {currentPhoto.subcategoryName}
            </h4>
            <p className="text-sm text-dustyRose/70 truncate" title={currentPhoto.file.name}>
              {currentPhoto.file.name}
            </p>
          </div>

          {/* Tag Input Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-sageGreen mb-2">
                Add tags for this photo
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagInputKeyPress}
                placeholder="e.g., ceremony, outdoor, romantic..."
                className="w-full px-4 py-3 text-base border border-dustyRose/30 rounded-lg focus:ring-2 focus:ring-skyBlue focus:border-skyBlue transition-colors placeholder:text-dustyRose/60 bg-ivoryCream"
              />
              <p className="text-xs text-dustyRose/60 mt-2">
                Press Enter or comma to add tags
              </p>
            </div>

            {/* Current Tags */}
            {currentPhoto.tags.length > 0 && (
              <div>
                <p className="text-sm font-medium text-sageGreen mb-3">Current tags:</p>
                <div className="flex flex-wrap gap-2">
                  {currentPhoto.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-skyBlue/15 text-skyBlue text-sm rounded-full border border-skyBlue/30"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-skyBlue/70 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center max-w-2xl mx-auto">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={isFirstPhoto}
          className="px-6 py-3 text-sm font-medium text-dustyRose bg-champagneBeige/50 border border-dustyRose/30 rounded-lg hover:bg-champagneBeige/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous Photo
        </button>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSkip}
            className="px-6 py-3 text-sm font-medium text-dustyRose bg-champagneBeige/50 border border-dustyRose/30 rounded-lg hover:bg-champagneBeige/70 transition-colors"
          >
            Skip Tagging
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-3 text-sm font-medium text-white bg-skyBlue border border-transparent rounded-lg hover:bg-skyBlue/90 transition-colors"
          >
            {isLastPhoto ? 'Complete' : 'Next Photo'}
          </button>
        </div>
      </div>
    </div>
  );
}
