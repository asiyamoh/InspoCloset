import React, { useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase-client';
import { AuthContext, AuthContextType, Profile } from './use-auth-context';
import { API_URL } from '../../utils/constants';
import { getAuthToken, buildAuthHeaders } from '../auth-headers';

// Auth Provider Component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);


  // Fetch profile from backend API
  const fetchProfileFromBackend = async (): Promise<Profile | null> => {
    try {
      const token = await getAuthToken();
      const authHeaders = buildAuthHeaders(token);
      
      const response = await fetch(`${API_URL}/auth/verify`, {
        headers: authHeaders,
      });

      if (!response.ok) {
        console.error('Failed to fetch profile from backend');
        return null;
      }

      const authData = await response.json();
      
      if (authData.success && authData.profile) {
        return authData.profile as Profile;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching profile from backend:', error);
      return null;
    }
  };

  // Listen for auth changes and fetch profile
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Fetch profile when user is authenticated
      if (session?.user) {
        setProfileLoading(true);
        try {
          const profileData = await fetchProfileFromBackend();
          if (profileData) {
            setProfile(profileData);
          } else {
            console.error('Failed to fetch profile from backend');
            setProfile(null);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
          setProfile(null);
        } finally {
          setProfileLoading(false);
        }
      } else {
        setProfile(null);
        setProfileLoading(false);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value: AuthContextType = {
    user,
    session,
    profile,
    loading,
    profileLoading,
    emailConfirmed: user?.email_confirmed_at !== null,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}