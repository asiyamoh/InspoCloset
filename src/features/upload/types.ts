export interface UploadFormData {
  selectedFolder: FolderData | null;
  selectedSubcategory: SubcategoryData | null;
  selectedFiles: File[];
}

export interface FolderData {
  id: string;
  name: string;
  iconPicture?: string;
  categories?: SubcategoryData[]
  subcategories?: SubcategoryData[];
}

export interface SubcategoryData {
  id: string;
  name: string;
  iconPicture?: string;
  folderId: string;
}

export interface UploadResult {
  success: boolean;
  uploadedPictures: Array<{
    id: string;
    url: string;
    thumbnailUrl: string;
  }>;
  errors: Array<{
    fileName: string;
    error: string;
  }>;
}
