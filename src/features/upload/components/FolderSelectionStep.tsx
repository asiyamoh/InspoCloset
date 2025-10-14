import { useEffect } from 'react';
import { useGetUserFolders, FolderResponse } from '../../folder/hooks/useGetUserFolders';
import { FolderData } from '../types';
import { Button } from '../../../components/ui/Button';

interface FolderSelectionStepProps {
  selectedFolder: FolderData | null;
  onFolderSelect: (folder: FolderData | null) => void;
  onNext: () => void;
  onPrevious: () => void;
  profileId: string;
}

export function FolderSelectionStep({
  selectedFolder,
  onFolderSelect,
  onNext,
  onPrevious,
  profileId
}: FolderSelectionStepProps) {
  const { folders, loading: isLoading, error, fetchUserFolders } = useGetUserFolders();

  useEffect(() => {
    fetchUserFolders(profileId);
  }, [profileId, fetchUserFolders]);

  const handleFolderClick = (folder: FolderResponse) => {
    // Convert FolderResponse to FolderData
    const folderData: FolderData = {
      id: folder.id,
      name: folder.name,
      iconPicture: folder.iconPicture,
      subcategories: folder.subcategories,
      categories: folder.categories
    };
    onFolderSelect(folderData);
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dustyRose mx-auto"></div>
        <p className="text-sageGreen mt-2">Loading folders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => fetchUserFolders(profileId)} outline>
          Try Again
        </Button>
      </div>
    );
  }

  if (folders.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-lavenderGray/30 to-champagneBeige/30 rounded-full flex items-center justify-center">
            <div className="w-8 h-10 bg-dustyRose/60 dress-silhouette"></div>
          </div>
        </div>
        
        <h2 className="text-2xl font-handwritten text-dustyRose mb-4">
          No Folders Yet
        </h2>
        <p className="text-sageGreen text-lg leading-relaxed mb-6">
          You need to create a folder before uploading photos. 
          Folders help organize your photos by category.
        </p>
        
        <Button onClick={() => window.location.href = '/home'}>
          Create Your First Folder
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-handwritten text-dustyRose mb-2">
          Select a Folder
        </h2>
        <p className="text-sageGreen">
          Choose which folder to upload photos to
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {folders.map((folder) => (
          <button
            key={folder.id}
            onClick={() => handleFolderClick(folder)}
            className={`p-4 rounded-lg border-2 transition-all hover:shadow-photo-glue ${
              selectedFolder?.id === folder.id
                ? 'border-skyBlue bg-skyBlue/10'
                : 'border-dustyRose/20 bg-white/60 hover:border-dustyRose/40'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-lavenderGray/30 to-champagneBeige/30 flex items-center justify-center">
                {folder.iconPicture ? (
                  <img 
                    src={folder.iconPicture} 
                    alt={folder.name}
                    className="w-8 h-8 rounded object-cover"
                  />
                ) : (
                  <div className="w-8 h-10 bg-dustyRose/60 dress-silhouette"></div>
                )}
              </div>
              <div className="text-left flex-1">
                <h3 className="font-medium text-dustyRose">{folder.name}</h3>
                <p className="text-sm text-sageGreen">
                  {folder.subcategories?.length || folder.categories?.length || 0 } subcategories
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button onClick={onPrevious} outline disabled>
          Previous
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!selectedFolder}
        >
          Next: Select Subcategory
        </Button>
      </div>
    </div>
  );
}
