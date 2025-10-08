import { useState } from 'react';
import { FolderResponse } from "../../../utils/api/folder-api";
import { useNavigate } from "@tanstack/react-router";
import { FavoriteToggle } from "./FavoriteToggle";
import { EditFolderModal } from "./EditFolderModal";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

interface FolderDetailContentProps {
  folder: FolderResponse;
  onFolderUpdated?: () => void;
  onFolderDeleted?: () => void;
}

export function FolderDetailContent({ folder, onFolderUpdated, onFolderDeleted }: FolderDetailContentProps) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const subcategories = folder.subcategories || folder.categories || [];
  const folderId = folder.id;

  const handleSubcategoryClick = (subcategoryId: string) => {
    navigate({ to: `/folder-details/${folderId}/subcategory/${subcategoryId}` });
  };

  const handleEditSuccess = () => {
    setIsEditing(false);
    onFolderUpdated?.();
  };

  const handleDeleteSuccess = () => {
    setIsDeleting(false);
    onFolderDeleted?.();
    // Navigate back to home after deletion
    navigate({ to: '/home' });
  };

  return (
    <>
      <div className="p-4 space-y-6">
        {/* Folder Header */}
        <div className="bg-white/60 p-6 rounded-lg border border-dustyRose/20 shadow-photo-glue">
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
              {folder.iconPicture ? (
                <img 
                  src={folder.iconPicture} 
                  alt={folder.name}
                  className="w-full h-full rounded object-cover"
                />
              ) : (
                <span className="text-5xl">📁</span>
              )}
            </div>
            
            {/* Folder Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-sageGreen mb-1">{folder.name}</h1>
              <p className="text-dustyRose/70 text-lg">
                Created {new Date(folder.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white/40 px-6 py-3 rounded-lg border border-dustyRose/10 shadow-photo-glue-sm">
          <div className="flex items-center justify-center gap-6">
            <FavoriteToggle folderId={folder.id} />
            
            {/* Management Actions */}
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 text-sageGreen hover:bg-sageGreen/10 rounded-lg transition-colors"
              title="Edit folder"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span className="text-sm font-medium">Edit</span>
            </button>
            
            <button
              onClick={() => setIsDeleting(true)}
              className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete folder"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="text-sm font-medium">Delete</span>
            </button>
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

      {/* Modals */}
      <EditFolderModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSuccess={handleEditSuccess}
        folder={folder}
      />

      <DeleteConfirmationModal
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onSuccess={handleDeleteSuccess}
        folder={folder}
      />
    </>
  );
}
