export type Bride = {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt?: string;
  profileId: string;
  photosCount?: number;
  notesCount?: number;
};

export type BrideSubcategory = {
  icon: string;
  label: string;
  content: string;
}; 