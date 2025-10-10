import { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { StepCounter } from '../../../components/ui/StepCounter';
import { Step1FolderInfo } from './Step1FolderInfo';
import { Step2Subcategories } from './Step2Subcategories';
import { Step3PicturesTags } from './Step3PicturesTags';
import { Step3_1PhotoReview } from './Step3_1PhotoReview';
import { useAddFolder } from '../hooks/useAddFolder';
import { FolderFormData } from '../types';

interface AddFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  brideId?: string;
}

const STEPS = [
  'Folder Info',
  'Subcategories', 
  'Photos',
  'Review & Tags'
];

export function AddFolderModal({ isOpen, onClose, onSuccess, brideId }: AddFolderModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FolderFormData>({
    name: '',
    icon: null,
    hasSubcategories: false,
    subcategories: []
  });
  
  const { createFolder, isSubmitting, errors, clearErrors } = useAddFolder();

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
      await createFolder(formData, brideId);
      onSuccess?.();
      onClose();
      resetForm();
    } catch (error) {
      console.error('Failed to create folder:', error);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      name: '',
      icon: null,
      hasSubcategories: false,
      subcategories: []
    });
    clearErrors();
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim().length > 0;
      case 2:
        return !formData.hasSubcategories || formData.subcategories.every(sub => sub.name.trim().length > 0);
      case 3:
        return true; // Photos step is always valid
      case 4:
        return true; // Review step is always valid
      default:
        return false;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1FolderInfo
            formData={formData}
            onFormDataChange={setFormData}
            error={errors.name}
          />
        );
      case 2:
        return (
          <Step2Subcategories
            subcategories={formData.subcategories}
            onSubcategoriesChange={(subcategories) => setFormData(prev => ({ ...prev, subcategories }))}
            errors={errors}
            hasSubcategories={formData.hasSubcategories}
            onToggleHasSubcategories={(value) => setFormData(prev => ({ ...prev, hasSubcategories: value }))}
          />
        );
      case 3:
        return (
          <Step3PicturesTags
            subcategories={formData.subcategories}
            onSubcategoriesChange={(subcategories) => setFormData(prev => ({ ...prev, subcategories }))}
            errors={errors}
            suggestedTags={[]}
          />
        );
      case 4:
        return (
          <Step3_1PhotoReview
            subcategories={formData.subcategories}
            onSubcategoriesChange={(subcategories) => setFormData(prev => ({ ...prev, subcategories }))}
            onComplete={() => handleSubmit()}
            onSkip={() => handleSubmit()}
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
          <h2 className="text-2xl font-bold text-sageGreen mb-4 text-center">Create New Folder</h2>
          <StepCounter currentStep={currentStep} totalSteps={STEPS.length} stepNames={STEPS} />
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderCurrentStep()}
        </div>

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
                disabled={isSubmitting || !isStepValid()}
                className="flex-1 px-4 py-3 text-xs font-medium text-white bg-sageGreen border border-transparent rounded-lg hover:bg-sageGreen/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px] flex items-center justify-center"
              >
                {isSubmitting ? 'Creating...' : 'Create Folder'}
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
