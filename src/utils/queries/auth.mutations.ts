import { useMutation } from '@tanstack/react-query';
import { supabase } from '../supabase/supabase-client';

// Auth Mutations
export function useAuthMutations() {

  const signInMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Auth state change will handle the rest automatically
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async ({ 
      email, 
      password, 
      firstName, 
      lastName 
    }: { 
      email: string; 
      password: string; 
      firstName: string; 
      lastName: string; 
    }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
          emailRedirectTo: `${window.location.origin}/email-verified`,
        },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Auth state change will handle the rest automatically
    },
  });

  const signOutMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      // Auth state change will handle the rest automatically
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: async ({ password }: { password: string }) => {
      const { error } = await supabase.auth.updateUser({
        password,
      });
      if (error) throw error;
    },
  });

  return {
    signIn: signInMutation.mutateAsync,
    signInPending: signInMutation.isPending,
    signUp: signUpMutation.mutateAsync,
    signUpPending: signUpMutation.isPending,
    signOut: signOutMutation.mutateAsync,
    signOutPending: signOutMutation.isPending,
    resetPassword: resetPasswordMutation.mutateAsync,
    resetPasswordPending: resetPasswordMutation.isPending,
    updatePassword: updatePasswordMutation.mutateAsync,
    updatePasswordPending: updatePasswordMutation.isPending,
  };
}
