import React, { useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase-client';
import { AuthContext, AuthContextType, Profile } from './use-auth-context';
import { useSessionQuery, useProfileQuery } from '../queries/auth.mutations';

// Auth Provider Component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Use the session query from your auth mutations
  const { data: sessionData, isLoading: sessionLoading } = useSessionQuery();
  
  // Use the profile query when we have a user
  const { data: profileData, isLoading: profileLoading } = useProfileQuery(user?.id);

  useEffect(() => {
    if (sessionData?.session) {
      setSession(sessionData.session);
      setUser(sessionData.session.user);
    } else {
      setSession(null);
      setUser(null);
    }
    setLoading(sessionLoading);
  }, [sessionData, sessionLoading]);

  useEffect(() => {
    if (profileData) {
      setProfile(profileData);
    } else {
      setProfile(null);
    }
  }, [profileData]);

  // Listen for auth changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
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
    loading: loading || profileLoading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}