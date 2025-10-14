import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase/supabase-client';
import { Profile } from '../auth/use-auth-context';

// Auth Queries
export function useSessionQuery() {
  return useQuery({
    queryKey: ['auth-session'],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data;
    },
  });
}

export function useProfileQuery(userId?: string) {
  return useQuery({
    queryKey: ['auth-profile', userId],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      return data as Profile;
    },
    enabled: !!userId,
  });
}

// Auth Mutations
export function useAuthMutations() {
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ['auth-session'] });
      queryClient.invalidateQueries({ queryKey: ['auth-profile'] });
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
        },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth-session'] });
      queryClient.invalidateQueries({ queryKey: ['auth-profile'] });
    },
  });

  const signOutMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.clear();
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
