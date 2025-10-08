import { useState } from 'react';
import { FileUploadZone } from '../../../components/ui/FileUploadZone';
import { Button } from '../../../components/ui/Button';
import { FolderData, SubcategoryData } from '../types';

interface ImageUploadStepProps {
  selectedFolder: FolderData | null;
  selectedSubcategory: SubcategoryData | null;
  selectedFiles: File[];
  isUploading: boolean;
  onFilesSelect: (files: File[]) => void;
  onUpload: () => void;
  onPrevious: () => void;
}

export function ImageUploadStep({
  selectedFolder,
  selectedSubcategory,
  selectedFiles,
  isUploading,
  onFilesSelect,
  onUpload,
  onPrevious
}: ImageUploadStepProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [isAddingMore, setIsAddingMore] = useState(false);

  const handleFilesSelected = (files: File[]) => {
    if (isAddingMore) {
      onFilesSelect([...selectedFiles, ...files]);
    } else {
      onFilesSelect(files);
    }
    setShowPreview(true);
    setIsAddingMore(false);
  };

  const handleAddMoreClick = () => {
    setIsAddingMore(true);
    setShowPreview(false);
  };

  const handleChangeAllClick = () => {
    setIsAddingMore(false);
    setShowPreview(false);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    onFilesSelect(newFiles);
    if (newFiles.length === 0) {
      setShowPreview(false);
    }
  };

  const getUploadDestination = () => {
    if (selectedSubcategory) {
      return `subcategory "${selectedSubcategory.name}" in folder "${selectedFolder?.name}"`;
    }
    return `folder "${selectedFolder?.name}"`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-handwritten text-dustyRose mb-2">
          Upload Photos
        </h2>
        <p className="text-sageGreen">
          Uploading to: <span className="font-medium">{getUploadDestination()}</span>
        </p>
      </div>

      {!showPreview ? (
        <div className="bg-white/60 p-6 rounded-lg border border-dustyRose/20 shadow-photo-glue">
          <FileUploadZone
            onFilesSelected={handleFilesSelected}
            maxFiles={20}
            acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
            className="min-h-[200px]"
          />
          <p className="text-sm text-sageGreen text-center mt-4">
            {isAddingMore 
              ? `Add more photos to your selection (${selectedFiles.length} already selected)`
              : 'Drag and drop images or click to browse. You can select multiple images at once (up to 20).'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white/60 p-4 rounded-lg border border-dustyRose/20 shadow-photo-glue">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-dustyRose">
                Selected Photos ({selectedFiles.length})
              </h3>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleAddMoreClick} 
                  outline 
                  size="sm"
                >
                  Add More Photos
                </Button>
                <Button 
                  onClick={handleChangeAllClick} 
                  outline 
                  size="sm"
                >
                  Change All
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                  <p className="text-xs text-sageGreen mt-1 truncate">
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {isUploading && (
            <div className="bg-white/60 p-4 rounded-lg border border-dustyRose/20 shadow-photo-glue">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dustyRose mx-auto mb-2"></div>
                <p className="text-sageGreen">Uploading photos...</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button onClick={onPrevious} outline disabled={isUploading}>
          Previous
        </Button>
        <Button 
          onClick={onUpload} 
          disabled={selectedFiles.length === 0 || isUploading}
          className="min-w-[120px]"
        >
          {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} Photo${selectedFiles.length !== 1 ? 's' : ''}`}
        </Button>
      </div>
    </div>
  );
}
