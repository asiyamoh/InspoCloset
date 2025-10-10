import { FolderResponse, PictureResponse } from "../../../utils/api/folder-api";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AddPicturesToSubcategoryModal } from "./AddPicturesToSubcategoryModal";
import { EditSubcategoryModal } from "./EditSubcategoryModal";
import { DeleteSubcategoryConfirmationModal } from "./DeleteSubcategoryConfirmationModal";

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
  const [isEditSubcategoryModalOpen, setIsEditSubcategoryModalOpen] = useState(false);
  const [isDeleteSubcategoryModalOpen, setIsDeleteSubcategoryModalOpen] = useState(false);

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

  const handleEditSubcategoryClick = () => {
    setIsEditSubcategoryModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditSubcategoryModalOpen(false);
  };

  const handleSubcategoryUpdated = () => {
    // Refresh the page to show updated subcategory data
    window.location.reload();
  };


  const handlePictureClick = (picture: PictureResponse) => {
    navigate({ to: '/picture-detail/$pictureId', params: { pictureId: picture.id } });
  };

  const handleDeleteSubcategoryClick = () => {
    setIsDeleteSubcategoryModalOpen(true);
  };

  const handleCloseDeleteSubcategoryModal = () => {
    setIsDeleteSubcategoryModalOpen(false);
  };

  const handleSubcategoryDeleted = () => {
    // Navigate back to folder after deletion
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

      {/* Action Bar */}
      <div className="bg-white/40 px-6 py-3 rounded-lg border border-dustyRose/10 shadow-photo-glue-sm">
        <div className="flex items-center justify-center gap-4">
          {/* Add Pictures Action */}
          <button 
          onClick={handleAddPicturesClick}
          className="bg-sageGreen text-white px-4 py-2 rounded-lg hover:bg-sageGreen/80 transition-colors"
        >
          Add Pictures
        </button>
          
          {/* Edit Action */}
          <button
            onClick={handleEditSubcategoryClick}
            className="flex items-center gap-2 px-4 py-2 text-sageGreen hover:bg-sageGreen/10 rounded-lg transition-colors"
            title="Edit subcategory"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="text-sm font-medium">Edit</span>
          </button>
          
          {/* Delete Action */}
          <button
            onClick={handleDeleteSubcategoryClick}
            className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete subcategory"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="text-sm font-medium">Delete</span>
          </button>
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
              <div key={picture.id} className="bg-white/60 rounded-lg border border-dustyRose/20 shadow-photo-glue overflow-hidden relative group cursor-pointer">
                {/* Clickable Image */}
                <div 
                  onClick={() => handlePictureClick(picture)}
                  className="relative"
                >
                  <img
                    src={picture.thumbnailUrl || picture.url}
                    alt={`Picture in ${subcategory.name}`}
                    className="w-full h-32 object-cover transition-transform group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <div className="text-white text-sm font-medium">
                      Click to edit tags
                    </div>
                  </div>
                </div>
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


      {/* Add Pictures Modal */}
      <AddPicturesToSubcategoryModal
        isOpen={isAddPicturesModalOpen}
        onClose={handleCloseModal}
        onSuccess={handlePicturesUploaded}
        folder={folder}
        subcategory={subcategory}
      />

      {/* Edit Subcategory Modal */}
      <EditSubcategoryModal
        key={subcategory.id} 
        isOpen={isEditSubcategoryModalOpen}
        onClose={handleCloseEditModal}
        onSuccess={handleSubcategoryUpdated}
        subcategory={subcategory}
      />

      {/* Delete Subcategory Modal */}
      <DeleteSubcategoryConfirmationModal
        isOpen={isDeleteSubcategoryModalOpen}
        onClose={handleCloseDeleteSubcategoryModal}
        onSuccess={handleSubcategoryDeleted}
        folder={folder}
        subcategory={subcategory}
      />
    </div>
  );
}
