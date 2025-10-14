import { redirect } from '@tanstack/react-router';
import { supabase } from '../supabase/supabase-client';

export async function authGuard() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw redirect({ to: '/sign-in' });
    }
    
    return { session };
  } catch (error) {
    if (error instanceof Error && error.message.includes('redirect')) {
      throw error;
    }
    console.error('Auth guard error:', error);
    throw redirect({ to: '/sign-in' });
  }
}
