export interface Subcategory {
  id: string;
  name: string;
  picture?: File | string;
  tags: string[];
}

export interface FolderFormData {
  name: string;
  hasSubcategories: boolean;
  subcategories: Subcategory[];
}

export interface CreateFolderRequest {
  name: string;
  subcategories?: {
    name: string;
    picture?: string;
    tags: string[];
  }[];
}

export interface Folder {
  id: string;
  name: string;
  iconPicture?: string;
  createdAt: string;
  updatedAt: string;
  subcategories?: Subcategory[];
}
