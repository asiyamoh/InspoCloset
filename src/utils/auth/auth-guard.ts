import { redirect } from '@tanstack/react-router';
import { supabase } from '../supabase/supabase-client';
import { appConfig } from '../../config/app.config';
import { API_URL } from '../../utils/constants';
import { getAuthToken, buildAuthHeaders } from '../auth-headers';

export async function authGuard() {
  try {
    // Get current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Session error:', sessionError);
      // Force sign out to clear auth context
      await supabase.auth.signOut();
      throw redirect({ to: '/sign-in' });
    }
    
    if (!session) {
      throw redirect({ to: '/sign-in' });
    }

    // Check email confirmation in staging/production environments
    if (!appConfig.isDevelopment && !session.user.email_confirmed_at) {
      throw redirect({ to: '/email-confirmation' as any });
    }

    // Verify auth and get profile data from backend API
    try {
      const token = await getAuthToken();
      const authHeaders = buildAuthHeaders(token);
      
      const response = await fetch(`${API_URL}/auth/verify`, {
        headers: authHeaders,
      });


      if (!response.ok) {
        const errorData = await response.json();
        console.error('Auth verification failed:', errorData);
        
        // If profile not found or auth failed, sign out and redirect
        await supabase.auth.signOut();
        throw redirect({ to: '/sign-in' });
      }

      const authData = await response.json();
      
      if (!authData.success || !authData.profile) {
        console.error('Invalid auth response:', authData);
        await supabase.auth.signOut();
        throw redirect({ to: '/sign-in' });
      }

      // Auth verification successful, profile exists
      return { session, profile: authData.profile };
      
    } catch (apiError) {
      console.error('Backend API error:', apiError);
      // If backend API fails, sign out and redirect
      await supabase.auth.signOut();
      throw redirect({ to: '/sign-in' });
    }
    
  } catch (error) {
    if (error instanceof Error && error.message.includes('redirect')) {
      throw error;
    }
    console.error('Auth guard error:', error);
    // Force sign out on any unexpected error
    await supabase.auth.signOut();
    throw redirect({ to: '/sign-in' });
  }
}
