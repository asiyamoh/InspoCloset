import { useState, useEffect } from 'react';
import { folderApi } from '../../../utils/api/folder-api';
import { FolderData, SubcategoryData } from '../types';
import { Button } from '../../../components/ui/Button';

interface SubcategorySelectionStepProps {
  selectedFolder: FolderData | null;
  selectedSubcategory: SubcategoryData | null;
  onSubcategorySelect: (subcategory: SubcategoryData | null) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function SubcategorySelectionStep({
  selectedFolder,
  selectedSubcategory,
  onSubcategorySelect,
  onNext,
  onPrevious
}: SubcategorySelectionStepProps) {
  const [subcategories, setSubcategories] = useState<SubcategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedFolder) {
      fetchSubcategories();
    }
  }, [selectedFolder]);

  const fetchSubcategories = async () => {
    if (!selectedFolder) return;

    try {
      setIsLoading(true);
      setError(null);
      const folderDetails = await folderApi.getFolderById(selectedFolder.id);
      const folderSubcategories = folderDetails.subcategories || folderDetails.categories || [];
      
      setSubcategories(folderSubcategories.map(sub => ({
        id: sub.id,
        name: sub.name,
        iconPicture: sub.iconPicture,
        folderId: sub.folderId,
      })));
    } catch (err) {
      setError('Failed to load subcategories');
      console.error('Error fetching subcategories:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubcategoryClick = (subcategory: SubcategoryData) => {
    onSubcategorySelect(subcategory);
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dustyRose mx-auto"></div>
        <p className="text-sageGreen mt-2">Loading subcategories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={fetchSubcategories} outline>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-handwritten text-dustyRose mb-2">
          Select Subcategory
        </h2>
        <p className="text-sageGreen">
          Choose a subcategory in "{selectedFolder?.name}"
        </p>
      </div>

      {subcategories.length === 0 ? (
        <div className="text-center py-12 px-4">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-lavenderGray/30 to-champagneBeige/30 rounded-full flex items-center justify-center">
              <div className="w-8 h-10 bg-dustyRose/60 dress-silhouette"></div>
            </div>
          </div>
          
          <h3 className="text-xl font-handwritten text-dustyRose mb-4">
            No Subcategories Available
          </h3>
          <p className="text-sageGreen text-lg leading-relaxed mb-6">
            This folder doesn't have any subcategories yet. 
            You need to add subcategories to this folder before uploading photos.
          </p>
          
          <Button onClick={() => window.location.href = `/folder/${selectedFolder?.id}`}>
            Add Subcategories to This Folder
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subcategories.map((subcategory) => (
            <button
              key={subcategory.id}
              onClick={() => handleSubcategoryClick(subcategory)}
              className={`p-4 rounded-lg border-2 transition-all hover:shadow-photo-glue ${
                selectedSubcategory?.id === subcategory.id
                  ? 'border-skyBlue bg-skyBlue/10'
                  : 'border-dustyRose/20 bg-white/60 hover:border-dustyRose/40'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-lavenderGray/30 to-champagneBeige/30 flex items-center justify-center">
                  {subcategory.iconPicture ? (
                    <img 
                      src={subcategory.iconPicture} 
                      alt={subcategory.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                  ) : (
                    <div className="w-8 h-10 bg-dustyRose/60 dress-silhouette"></div>
                  )}
                </div>
                <div className="text-left flex-1">
                  <h3 className="font-medium text-dustyRose">{subcategory.name}</h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button onClick={onPrevious} outline>
          Previous
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!selectedSubcategory}
        >
          Next: Upload Photos
        </Button>
      </div>
    </div>
  );
}
