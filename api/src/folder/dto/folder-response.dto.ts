export class FolderResponseDto {
  id: string;
  name: string;
  brideId: string;
  iconPicture?: string;
  createdAt: Date;
  updatedAt: Date;
  subcategories?: SubcategoryResponseDto[];
}

export class SubcategoryResponseDto {
  id: string;
  name: string;
  iconPicture?: string;
  folderId: string;
  createdAt: Date;
  updatedAt: Date;
}
