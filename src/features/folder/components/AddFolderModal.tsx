import { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { StepCounter } from '../../../components/ui/StepCounter';
import { Step1FolderInfo } from './Step1FolderInfo';
import { Step2Subcategories } from './Step2Subcategories';
import { Step3PicturesTags } from './Step3PicturesTags';
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
  'Photos & Tags'
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
        return true; // Step 3 is optional
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
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Folder</h2>
          <StepCounter currentStep={currentStep} totalSteps={STEPS.length} stepNames={STEPS} />
        </div>

        <div className="mb-6">
          {renderCurrentStep()}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>

            {currentStep < STEPS.length ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !isStepValid()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
