import { FolderResponse } from "../../../utils/api/folder-api";
import { useNavigate } from "@tanstack/react-router";

interface SubcategoryDetailContentProps {
  folder: FolderResponse;
  subcategory: {
    id: string;
    name: string;
    iconPicture?: string;
    folderId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export function SubcategoryDetailContent({ folder, subcategory }: SubcategoryDetailContentProps) {
  const navigate = useNavigate();

  const handleBackToFolder = () => {
    navigate({ to: `/folder/${folder.id}` });
  };

  return (
    <div className="p-4 space-y-6">
      {/* Back Button */}
      <button
        onClick={handleBackToFolder}
        className="flex items-center space-x-2 text-dustyRose hover:text-sageGreen transition-colors"
      >
        <span>←</span>
        <span>Back to {folder.name}</span>
      </button>

      {/* Subcategory Header */}
      <div className="bg-white/60 p-6 rounded-lg border border-dustyRose/20 shadow-photo-glue">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">
            {subcategory.iconPicture ? (
              <img 
                src={subcategory.iconPicture} 
                alt={subcategory.name}
                className="w-12 h-12 rounded object-cover"
              />
            ) : (
              '📂'
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-sageGreen">{subcategory.name}</h1>
            <p className="text-dustyRose/70">
              Created {new Date(subcategory.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-dustyRose/50">
              In folder: {folder.name}
            </p>
          </div>
        </div>
      </div>

      {/* Pictures Section */}
      <div>
        <h2 className="text-xl font-semibold text-sageGreen mb-4">
          Pictures
        </h2>
        <div className="bg-white/60 p-6 rounded-lg border border-dustyRose/20 shadow-photo-glue text-center">
          <div className="text-4xl mb-2">📷</div>
          <h3 className="text-lg font-semibold text-sageGreen mb-2">
            No pictures yet
          </h3>
          <p className="text-dustyRose/70">
            This subcategory doesn't have any pictures yet.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-4">
        <button className="bg-sageGreen text-white px-4 py-2 rounded-lg hover:bg-sageGreen/80 transition-colors">
          Add Pictures
        </button>
        <button className="bg-dustyRose text-white px-4 py-2 rounded-lg hover:bg-dustyRose/80 transition-colors">
          Edit Subcategory
        </button>
      </div>
    </div>
  );
}
