import { BrideQuickAction } from './BrideQuickAction';
import { FolderQuickAction } from './FolderQuickAction';
import { UploadPhotosQuickAction } from './UploadPhotosQuickAction';

export function QuickActionsGrid() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <BrideQuickAction />
            <FolderQuickAction />
            <UploadPhotosQuickAction />
        </div>
    );
} 