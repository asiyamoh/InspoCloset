export interface PictureUpload {
  id: string;
  file: File;
  previewUrl: string;
  tags: string[];
  uploadProgress?: number;
  uploadError?: string;
}

export interface Subcategory {
  id?: string;
  name: string;
  icon: string | File | null;
  pictures: PictureUpload[];
}

export interface FolderFormData {
  name: string;
  icon: string | File | null;
  hasSubcategories: boolean;
  subcategories: Subcategory[];
}

export interface CreateFolderRequest {
  name: string;
  brideId?: string;
  iconPicture?: string;
  hasSubcategories?: boolean;
  subcategories?: {
    name: string;
    iconPicture?: string;
    pictures?: {
      originalName: string;
      tags?: string[];
    }[];
  }[];
}

export interface Folder {
  id: string;
  name: string;
  brideId?: string;
  iconPicture?: string;
  createdAt: string;
  updatedAt: string;
  subcategories?: Subcategory[];
}

// API Response types
export interface FolderApiResponse {
  id: string;
  name: string;
  brideId?: string;
  iconPicture?: string;
  createdAt: string;
  updatedAt: string;
  subcategories?: {
    id: string;
    name: string;
    iconPicture?: string;
    folderId: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface UploadPictureResponse {
  index: number;
  picture?: { id: string; url: string; thumbnailUrl: string };
  success: boolean;
  error?: string;
  fileName: string;
}

export interface UploadResponse {
  success: boolean;
  results: UploadPictureResponse[];
  errors: UploadPictureResponse[];
  message: string;
}

// Legacy types for backward compatibility
export interface PictureData {
  file: File;
  tags: string[];
}

export interface SubcategoryWithPictures {
  id: string;
  name: string;
  icon: string | File | null;
  pictures?: PictureData[];
}

export interface StepFormData {
  folderName: string;
  folderIcon: string | File | null;
  subcategories: SubcategoryWithPictures[];
  subcategoryPictures: Record<string, PictureData[]>;
}

export interface UploadResult {
  success: boolean;
  results: Array<{
    index: number;
    picture: {
      id: string;
      url: string;
      thumbnailUrl: string;
    };
    success: boolean;
  }>;
  errors: Array<{
    index: number;
    fileName: string;
    error: string;
  }>;
  message: string;
}
