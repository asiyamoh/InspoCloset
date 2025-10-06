import { FolderResponse } from '@/utils/api/folder-api';
import { useNavigate } from '@tanstack/react-router';

interface FolderGridProps {
  folders: FolderResponse[];
}

export function FolderGrid({ folders }: FolderGridProps) {
  const navigate = useNavigate();

  const handleFolderClick = (folderId: string) => {
    console.log('i have been clicked:', folderId)
    navigate({ to: `/folder/${folderId}` });
  };

  if (folders.length === 0) {
    return null; // Empty state will be handled by parent component
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {folders.map((folder) => (
        <div
          key={folder.id}
          className="bg-white/60 p-4 rounded-lg border border-dustyRose/20 shadow-photo-glue hover:shadow-photo-glue-md transition-shadow cursor-pointer"
          onClick={() => handleFolderClick(folder.id)}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl">
              {folder.iconPicture ? (
                <img 
                  src={folder.iconPicture} 
                  alt={folder.name}
                  className="w-8 h-8 rounded object-cover"
                />
              ) : (
                '📁'
              )}
            </div>
          </div>
          <h3 className="font-semibold text-sageGreen truncate">{folder.name}</h3>
          <p className="text-sm text-dustyRose/70">
            {(folder.subcategories?.length || folder.categories?.length || 0)} subcategories
          </p>
        </div>
      ))}
    </div>
  );
}
