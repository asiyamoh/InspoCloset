export interface UserData {
  id: string;
  email: string;
  email_confirmed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileData {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  role: 'USER' | 'ADMIN';
  profilePictureUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponseDto {
  user: UserData;
  profile: ProfileData;
  success: boolean;
  message?: string;
}
