import { useState } from "react";
import { Modal } from "../../../components/ui/Modal";
import { Step3PicturesTags } from "./Step3PicturesTags";
import { useAddPicturesToSubcategory } from "../hooks/useAddPicturesToSubcategory";
import { PictureUpload, Subcategory } from "../types";
import { FolderResponse } from "../hooks/useFolderDetail";

interface AddPicturesToSubcategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
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

export function AddPicturesToSubcategoryModal({
  isOpen,
  onClose,
  onSuccess,
  folder,
  subcategory
}: AddPicturesToSubcategoryModalProps) {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([
    {
      id: subcategory.id,
      name: subcategory.name,
      icon: subcategory.iconPicture || null,
      folderId: subcategory.folderId,
      createdAt: subcategory.createdAt,
      updatedAt: subcategory.updatedAt,
      pictures: []
    }
  ]);

  const { uploadPictures, isUploading, error } = useAddPicturesToSubcategory();

  const handleUpload = async (pictures: PictureUpload[]) => {
    try {
      await uploadPictures(
        subcategory.id,
        pictures,
        folder.id,
        folder.brideId
      );
      onSuccess?.();
      onClose();
      // Reset the form
      setSubcategories([{
        id: subcategory.id,
        name: subcategory.name,
        icon: subcategory.iconPicture || null,
        folderId: subcategory.folderId,
        createdAt: subcategory.createdAt,
        updatedAt: subcategory.updatedAt,
        pictures: []
      }]);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset the form
    setSubcategories([{
      id: subcategory.id,
      name: subcategory.name,
      icon: subcategory.iconPicture || null,
      folderId: subcategory.folderId,
      createdAt: subcategory.createdAt,
      updatedAt: subcategory.updatedAt,
      pictures: []
    }]);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-sageGreen mb-2">
            Add Pictures to {subcategory.name}
          </h2>
          <p className="text-dustyRose/70">
            Upload photos and add tags to organize them in this subcategory
          </p>
          <div className="mt-2 text-sm text-dustyRose/60">
            In folder: <span className="font-medium">{folder.name}</span>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Upload Form */}
        <Step3PicturesTags
          subcategories={subcategories}
          onSubcategoriesChange={setSubcategories}
          errors={{}}
          suggestedTags={[]}
          singleSubcategoryMode={true}
          onUpload={handleUpload}
        />

        {/* Loading Overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sageGreen mx-auto mb-2"></div>
              <p className="text-sageGreen font-medium">Uploading pictures...</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
