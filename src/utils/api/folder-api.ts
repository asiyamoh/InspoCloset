import { get, post, put, del } from './rest-client';

export interface CreateFolderRequest {
  name: string;
  brideId?: string;
  iconPicture?: string;
  hasSubcategories?: boolean;
  profileId?: string;
  subcategories?: {
    name: string;
    picture?: string;
    tags?: string[];
  }[];
}

export interface FolderResponse {
  id: string;
  name: string;
  brideId?: string;
  profileId?: string;
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
  categories?: {
    id: string;
    name: string;
    iconPicture?: string;
    folderId: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface UploadPicturesRequest {
  categoryId: string;
  brideId?: string;
  folderId?: string;
  tags: { [pictureIndex: string]: string[] };
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

export interface TagSuggestion {
  id: string;
  name: string;
  count: number;
}

export interface PictureResponse {
  id: string;
  url: string;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
  pictureTags: Array<{
    tag: {
      id: string;
      name: string;
    };
  }>;
}

export interface FavoriteFolderResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  folder: {
    id: string;
    name: string;
    iconPicture?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const folderApi = {
  createFolder: (data: CreateFolderRequest): Promise<FolderResponse> =>
    post<FolderResponse>('folders', data),

  getAllFolders: (): Promise<FolderResponse[]> =>
    get<FolderResponse[]>('folders'),

  getUserFolders: (profileId: string): Promise<FolderResponse[]> =>
    get<FolderResponse[]>(`folders/user/${profileId}`),

  getFoldersByBride: (brideId: string): Promise<FolderResponse[]> =>
    get<FolderResponse[]>(`folders/bride/${brideId}`),

  getFolderById: (id: string): Promise<FolderResponse> =>
    get<FolderResponse>(`folders/${id}`),

  updateFolder: (id: string, data: Partial<CreateFolderRequest>): Promise<FolderResponse> =>
    put<FolderResponse>(`folders/${id}`, data),

  deleteFolder: (id: string): Promise<{ message: string }> =>
    del<{ message: string }>(`folders/${id}`),

  uploadPictures: (formData: FormData): Promise<UploadResult> =>
    post<UploadResult>('upload/pictures', formData),

  getMostUsedTags: (limit: number = 3): Promise<TagSuggestion[]> =>
    get<TagSuggestion[]>(`tags/most-used?limit=${limit}`),

  getPicturesByCategory: (categoryId: string): Promise<PictureResponse[]> =>
    get<PictureResponse[]>(`pictures/category/${categoryId}`),

  getFavorites: (): Promise<FavoriteFolderResponse[]> =>
    get<FavoriteFolderResponse[]>('user-favorite-folders/favorites'),

  deletePicture: (pictureId: string): Promise<{ message: string }> =>
    del<{ message: string }>(`pictures/${pictureId}`),

  deleteSubcategory: (subcategoryId: string): Promise<{ message: string }> =>
    del<{ message: string }>(`folders/subcategory/${subcategoryId}`),
};
