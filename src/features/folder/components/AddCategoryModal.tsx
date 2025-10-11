import { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { StepCounter } from '../../../components/ui/StepCounter';
import { Step1CategoryInfo } from './Step1CategoryInfo';
import { Step2CategoryPictures } from './Step2CategoryPictures';
import { Step3CategoryReview } from './Step3CategoryReview';
import { useAddCategory } from '../hooks/useAddCategory';
import { CategoryFormData } from '../types';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  folderId: string;
  brideId?: string;
}

const STEPS = [
  'Category Info',
  'Pictures', 
  'Review & Tags'
];

export function AddCategoryModal({ isOpen, onClose, onSuccess, folderId, brideId }: AddCategoryModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CategoryFormData>({
    categories: [{
      id: `category-${Date.now()}`,
      name: '',
      icon: null,
      pictures: []
    }]
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const { addCategories, isSubmitting, errors, clearErrors } = useAddCategory();

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
    setSubmitError(null);
    try {
      const result = await addCategories(folderId, formData, brideId);
      if (result.success) {
        onSuccess?.();
        onClose();
        resetForm();
      } else {
        // Handle partial success or errors
        console.error('Some categories failed to create:', result.errors);
        if (result.errors && result.errors.length > 0) {
          const errorMessage = result.errors.map(err => `${err.categoryName}: ${err.error}`).join(', ');
          setSubmitError(`Some categories failed to create: ${errorMessage}`);
        }
      }
    } catch (error) {
      console.error('Failed to add categories:', error);
      setSubmitError('Failed to add categories. Please try again.');
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      categories: [{
        id: `category-${Date.now()}`,
        name: '',
        icon: null,
        pictures: []
      }]
    });
    setSubmitError(null);
    clearErrors();
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.categories.length > 0 && formData.categories.every(cat => cat.name.trim().length > 0);
      case 2:
        return true; // Pictures step is always valid
      case 3:
        return true; // Review step is always valid
      default:
        return false;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1CategoryInfo
            formData={formData}
            onFormDataChange={setFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <Step2CategoryPictures
            formData={formData}
            onFormDataChange={setFormData}
            errors={errors}
            suggestedTags={[]}
          />
        );
      case 3:
        return (
          <Step3CategoryReview
            formData={formData}
            onFormDataChange={setFormData}
            onComplete={handleSubmit}
            onSkip={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="w-full max-w-3xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-sageGreen mb-4 text-center">Add Categories</h2>
          <StepCounter currentStep={currentStep} totalSteps={STEPS.length} stepNames={STEPS} />
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderCurrentStep()}
        </div>

        {/* Error Display */}
        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-600 text-sm">{submitError}</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="pt-6 pb-20">
          <div className="border-t border-dustyRose/30 mb-6"></div>
          <div className="flex justify-between items-center gap-4">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex-1 px-4 py-3 text-xs font-medium text-dustyRose bg-champagneBeige/50 border border-dustyRose/30 rounded-lg hover:bg-champagneBeige/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px] flex items-center justify-center"
            >
              Previous
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 text-xs font-medium text-dustyRose bg-champagneBeige/50 border border-dustyRose/30 rounded-lg hover:bg-champagneBeige/70 transition-colors min-h-[44px] flex items-center justify-center"
            >
              Cancel
            </button>

            {currentStep < STEPS.length ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid()}
                className="flex-1 px-4 py-3 text-xs font-medium text-white bg-skyBlue border border-transparent rounded-lg hover:bg-skyBlue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px] flex items-center justify-center"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isStepValid() || isSubmitting}
                className="flex-1 px-4 py-3 text-xs font-medium text-white bg-sageGreen border border-transparent rounded-lg hover:bg-sageGreen/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px] flex items-center justify-center"
              >
                {isSubmitting ? 'Creating...' : 'Create Categories'}
              </button>
            )}
          </div>
        </div>

        {/* Loading Overlay */}
        {isSubmitting && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sageGreen mx-auto mb-2"></div>
              <p className="text-sageGreen font-medium">Creating categories...</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
