import { FolderQuickAction } from './FolderQuickAction';
import { UploadPhotosQuickAction } from './UploadPhotosQuickAction';

interface QuickActionsGridProps {
  folderCount: number;
  onAddFolder: () => void;
}

export function QuickActionsGrid({ folderCount, onAddFolder }: QuickActionsGridProps) {
  // If no folders, don't show quick actions (empty state handles this)
  if (folderCount === 0) {
    return null;
  }

  // If 1-3 folders, make Add Inspiration more prominent
  // If more than 3 folders, don't show Add Inspiration at all
  const shouldShowAddInspiration = folderCount <= 3;
  const isAddInspirationProminent = folderCount <= 3;

  return (
    <div className={`grid gap-4 ${isAddInspirationProminent ? 'grid-cols-1' : 'grid-cols-1'}`}>
      <FolderQuickAction onClick={onAddFolder} />
      {shouldShowAddInspiration && (
        <div className={isAddInspirationProminent ? 'transform scale-105' : ''}>
          <UploadPhotosQuickAction />
        </div>
      )}
    </div>
  );
}
