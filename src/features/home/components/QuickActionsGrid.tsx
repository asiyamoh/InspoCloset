import { useState } from 'react';
import { BrideQuickAction } from './BrideQuickAction';
import { FolderQuickAction } from './FolderQuickAction';
import { UploadPhotosQuickAction } from './UploadPhotosQuickAction';
import { AddFolderModal } from '../../folder/components/AddFolderModal';

export function QuickActionsGrid() {
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);

  const handleAddFolderClick = () => {
    setIsAddFolderModalOpen(true);
  };

  const handleFolderCreated = () => {
    // TODO: Refresh folder list or show success message
    console.log('Folder created successfully!');
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <BrideQuickAction />
        <FolderQuickAction onClick={handleAddFolderClick} />
        <UploadPhotosQuickAction />
      </div>

      <AddFolderModal
        isOpen={isAddFolderModalOpen}
        onClose={() => setIsAddFolderModalOpen(false)}
        onSuccess={handleFolderCreated}
      />
    </>
  );
}
