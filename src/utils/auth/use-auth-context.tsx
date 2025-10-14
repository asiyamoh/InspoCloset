import { createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  role: 'USER' | 'ADMIN';
  profilePictureUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
