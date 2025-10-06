import { FolderResponse } from "../../../utils/api/folder-api";
import { useNavigate } from "@tanstack/react-router";

interface FolderDetailContentProps {
  folder: FolderResponse;
}

export function FolderDetailContent({ folder }: FolderDetailContentProps) {
  const navigate = useNavigate();
  const subcategories = folder.subcategories || folder.categories || [];
  const folderId = folder.id;

  const handleSubcategoryClick = (subcategoryId: string) => {
    console.log('i have been clicked:', subcategoryId, folderId)
    navigate({ to: `/folder-details/${folderId}/subcategory/${subcategoryId}` });
  };

  return (
    <div className="p-4 space-y-6">
      {/* Folder Header */}
      <div className="bg-white/60 p-6 rounded-lg border border-dustyRose/20 shadow-photo-glue">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">
            {folder.iconPicture ? (
              <img 
                src={folder.iconPicture} 
                alt={folder.name}
                className="w-12 h-12 rounded object-cover"
              />
            ) : (
              '📁'
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-sageGreen">{folder.name}</h1>
            <p className="text-dustyRose/70">
              Created {new Date(folder.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Subcategories */}
      {subcategories.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold text-sageGreen mb-4">
            Subcategories ({subcategories.length})
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {subcategories.map((subcategory) => (
              <div
                key={subcategory.id}
                className="bg-white/60 p-4 rounded-lg border border-dustyRose/20 shadow-photo-glue hover:shadow-photo-glue-md transition-shadow cursor-pointer"
                onClick={() => handleSubcategoryClick(subcategory.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {subcategory.iconPicture ? (
                      <img 
                        src={subcategory.iconPicture} 
                        alt={subcategory.name}
                        className="w-8 h-8 rounded object-cover"
                      />
                    ) : (
                      '📂'
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sageGreen truncate">
                      {subcategory.name}
                    </h3>
                    <p className="text-sm text-dustyRose/70">
                      Created {new Date(subcategory.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white/60 p-6 rounded-lg border border-dustyRose/20 shadow-photo-glue text-center">
          <div className="text-4xl mb-2">📂</div>
          <h3 className="text-lg font-semibold text-sageGreen mb-2">
            No subcategories yet
          </h3>
          <p className="text-dustyRose/70">
            This folder doesn't have any subcategories yet.
          </p>
        </div>
      )}
    </div>
  );
}
