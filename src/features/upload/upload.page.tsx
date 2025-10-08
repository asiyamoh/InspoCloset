import { useState } from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Button } from '../../components/ui/Button';
import { useUpload } from './hooks/useUpload';
import { FolderSelectionStep } from './components/FolderSelectionStep';
import { SubcategorySelectionStep } from './components/SubcategorySelectionStep';
import { ImageUploadStep } from './components/ImageUploadStep';
import { UploadFormData, UploadResult } from './types';

const STEPS = [
  'Select Folder',
  'Select Subcategory', 
  'Upload Photos'
];

const DEFAULT_PROFILE_ID = 'bf24ad7d-89c9-46c4-a59d-8fa054eb35ad';

export function UploadPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<UploadFormData>({
    selectedFolder: null,
    selectedSubcategory: null,
    selectedFiles: [],
  });
  
  const { uploadPictures, isUploading, error, clearError } = useUpload();
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await uploadPictures(formData);
      setUploadResult(result);
      setUploadComplete(true);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleUploadMore = () => {
    // Reset only the files, keep folder and subcategory selected
    setFormData(prev => ({
      ...prev,
      selectedFiles: [],
    }));
    setUploadComplete(false);
    setUploadResult(null);
    clearError();
    // Stay on step 3 (upload step)
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      selectedFolder: null,
      selectedSubcategory: null,
      selectedFiles: [],
    });
    setUploadComplete(false);
    setUploadResult(null);
    clearError();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FolderSelectionStep
            selectedFolder={formData.selectedFolder}
            onFolderSelect={(folder) => setFormData(prev => ({ 
              ...prev, 
              selectedFolder: folder,
              selectedSubcategory: null // Reset subcategory when folder changes
            }))}
            onNext={handleNext}
            onPrevious={handlePrevious}
            profileId={DEFAULT_PROFILE_ID}
          />
        );
      
      case 2:
        return (
          <SubcategorySelectionStep
            selectedFolder={formData.selectedFolder}
            selectedSubcategory={formData.selectedSubcategory}
            onSubcategorySelect={(subcategory) => setFormData(prev => ({ 
              ...prev, 
              selectedSubcategory: subcategory 
            }))}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      
      case 3:
        return (
          <ImageUploadStep
            selectedFolder={formData.selectedFolder}
            selectedSubcategory={formData.selectedSubcategory}
            selectedFiles={formData.selectedFiles}
            isUploading={isUploading}
            onFilesSelect={(files) => setFormData(prev => ({ 
              ...prev, 
              selectedFiles: files 
            }))}
            onUpload={handleSubmit}
            onPrevious={handlePrevious}
          />
        );
      
      default:
        return null;
    }
  };

  if (uploadComplete) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h1 className="text-3xl font-handwritten text-dustyRose mb-2">
              Photos Uploaded Successfully!
            </h1>
            <p className="text-sageGreen text-lg">
              {uploadResult?.uploadedPictures?.length || 0} photo{(uploadResult?.uploadedPictures?.length || 0) !== 1 ? 's' : ''} uploaded to subcategory "{formData.selectedSubcategory?.name}" in folder "{formData.selectedFolder?.name}"
            </p>
          </div>

          {uploadResult && (
            <div className="bg-white/60 p-6 rounded-lg border border-dustyRose/20 shadow-photo-glue">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {uploadResult.uploadedPictures?.length || 0}
                  </div>
                  <p className="text-sageGreen">Photos Uploaded</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 mb-2">
                    {uploadResult.errors?.length || 0}
                  </div>
                  <p className="text-sageGreen">Failed Uploads</p>
                </div>
              </div>

              {uploadResult.errors && uploadResult.errors.length > 0 && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="font-medium text-red-800 mb-2">Failed Uploads:</h3>
                  <ul className="text-sm text-red-600 space-y-1">
                    {uploadResult.errors.map((error, index) => (
                      <li key={index}>• {error.fileName}: {error.error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center space-x-4">
            <Button onClick={handleUploadMore}>
              Upload More Photos to This Subcategory
            </Button>
            <Button onClick={resetForm} outline>
              Upload to Different Folder
            </Button>
            <Button onClick={() => window.location.href = '/home'} outline>
              Back to Home
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-handwritten text-dustyRose mb-2">
            Upload Photos
          </h1>
          <p className="text-sageGreen text-lg">
            Add new inspiration to your collection
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white/60 p-4 rounded-lg border border-dustyRose/20 shadow-photo-glue">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-dustyRose">
              Step {currentStep} of {STEPS.length}
            </span>
            <span className="text-sm text-sageGreen">
              {Math.round((currentStep / STEPS.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-skyBlue h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
            ></div>
          </div>
          <div className="mt-2">
            <h2 className="text-lg font-medium text-dustyRose">
              {STEPS[currentStep - 1]}
            </h2>
            <p className="text-sm text-sageGreen">
              {currentStep === 1 && 'Choose which folder to upload photos to'}
              {currentStep === 2 && 'Choose a subcategory within the folder'}
              {currentStep === 3 && 'Select and upload your photos'}
            </p>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-400">⚠️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Upload Error
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  {error}
                </div>
                <div className="mt-3">
                  <Button onClick={clearError} outline size="sm">
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Current Step Content */}
        <div className="bg-white/60 p-6 rounded-lg border border-dustyRose/20 shadow-photo-glue">
          {renderCurrentStep()}
        </div>
      </div>
    </MainLayout>
  );
} 