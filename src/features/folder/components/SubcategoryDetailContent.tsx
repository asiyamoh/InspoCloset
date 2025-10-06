import { FolderResponse, PictureResponse } from "../../../utils/api/folder-api";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AddPicturesToSubcategoryModal } from "./AddPicturesToSubcategoryModal";

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
  pictures: PictureResponse[];
  onPicturesRefresh?: () => void;
}

export function SubcategoryDetailContent({ folder, subcategory, pictures, onPicturesRefresh }: SubcategoryDetailContentProps) {
  const navigate = useNavigate();
  const [isAddPicturesModalOpen, setIsAddPicturesModalOpen] = useState(false);

  const handleBackToFolder = () => {
    navigate({ to: `/folder/${folder.id}` });
  };

  const handleAddPicturesClick = () => {
    setIsAddPicturesModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddPicturesModalOpen(false);
  };

  const handlePicturesUploaded = () => {
    onPicturesRefresh?.();
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
          Pictures ({pictures.length})
        </h2>
        {pictures.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pictures.map((picture) => (
              <div key={picture.id} className="bg-white/60 rounded-lg border border-dustyRose/20 shadow-photo-glue overflow-hidden">
                <img
                  src={picture.thumbnailUrl || picture.url}
                  alt={`Picture in ${subcategory.name}`}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <div className="text-sm text-dustyRose/70 mb-2">
                    {picture.pictureTags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {picture.pictureTags.slice(0, 2).map((pictureTag) => (
                          <span
                            key={pictureTag.tag.id}
                            className="bg-sageGreen/20 text-sageGreen text-xs px-2 py-1 rounded"
                          >
                            {pictureTag.tag.name}
                          </span>
                        ))}
                        {picture.pictureTags.length > 2 && (
                          <span className="text-xs text-dustyRose/50">
                            +{picture.pictureTags.length - 2} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-dustyRose/50">
                    {new Date(picture.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/60 p-6 rounded-lg border border-dustyRose/20 shadow-photo-glue text-center">
            <div className="text-4xl mb-2">📷</div>
            <h3 className="text-lg font-semibold text-sageGreen mb-2">
              No pictures yet
            </h3>
            <p className="text-dustyRose/70">
              This subcategory doesn't have any pictures yet.
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex space-x-4">
        <button 
          onClick={handleAddPicturesClick}
          className="bg-sageGreen text-white px-4 py-2 rounded-lg hover:bg-sageGreen/80 transition-colors"
        >
          Add Pictures
        </button>
        <button className="bg-dustyRose text-white px-4 py-2 rounded-lg hover:bg-dustyRose/80 transition-colors">
          Edit Subcategory
        </button>
      </div>

      {/* Add Pictures Modal */}
      <AddPicturesToSubcategoryModal
        isOpen={isAddPicturesModalOpen}
        onClose={handleCloseModal}
        onSuccess={handlePicturesUploaded}
        folder={folder}
        subcategory={subcategory}
      />
    </div>
  );
}
