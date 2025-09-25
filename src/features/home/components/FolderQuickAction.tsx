import { PlusIcon } from '@heroicons/react/24/outline';

interface FolderQuickActionProps {
  onClick: () => void;
}

export function FolderQuickAction({ onClick }: FolderQuickActionProps) {
  return (
    <div 
      className="bg-lavenderGray/30 p-4 rounded-lg border border-dustyRose/20 shadow-photo-glue hover:shadow-photo-glue-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-2xl">📁</div>
        <PlusIcon className="w-5 h-5 text-dustyRose" />
      </div>
      <h3 className="font-semibold text-sageGreen">Add Folder</h3>
      <p className="text-sm text-dustyRose/70">Organize your inspiration</p>
    </div>
  );
}
