import { useState } from 'react';
import { Modal, ModalTitle, ModalBody } from '@/components/ui/Modal';
import { FolderForm } from './FolderForm';
import { useAddFolder } from '../hooks/useAddFolder';
import { useSubcategories } from '../hooks/useSubcategories';
import { FolderFormData } from '../types';

interface AddFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AddFolderModal({ isOpen, onClose, onSuccess }: AddFolderModalProps) {
  const [formData, setFormData] = useState<FolderFormData>({
    name: '',
    hasSubcategories: false,
    subcategories: []
  });

  const { isSubmitting, errors, createFolder, clearErrors } = useAddFolder();
  const { subcategories, addSubcategory, removeSubcategory, updateSubcategory, clearSubcategories } = useSubcategories();

  const handleClose = () => {
    setFormData({
      name: '',
      hasSubcategories: false,
      subcategories: []
    });
    clearSubcategories();
    clearErrors();
    onClose();
  };

  const handleSubmit = async (data: FolderFormData) => {
    await createFolder(data);
    if (Object.keys(errors).length === 0) {
      handleClose();
      onSuccess?.();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="lg"
    >
      <ModalTitle>Create New Folder</ModalTitle>
      
      <ModalBody>
        <FolderForm
          formData={formData}
          setFormData={setFormData}
          subcategories={subcategories}
          addSubcategory={addSubcategory}
          removeSubcategory={removeSubcategory}
          updateSubcategory={updateSubcategory}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          errors={errors}
        />
      </ModalBody>
    </Modal>
  );
}
