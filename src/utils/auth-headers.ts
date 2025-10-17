import { supabase } from './supabase/supabase-client';

export async function getAuthToken(): Promise<string | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

export function buildAuthHeaders(token?: string | null): Record<string, string> {
  const headers: Record<string, string> = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

export async function handleAuthError(response: Response): Promise<void> {
  if (response.status === 401) {
    // Clear the session and redirect to sign in
    await supabase.auth.signOut();
    
    // Redirect to sign in page
    window.location.href = '/sign-in';
    
    throw new Error('Authentication required. Please sign in.');
  }
}

export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const token = await getAuthToken();
  const authHeaders = buildAuthHeaders(token);
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...authHeaders,
      ...options.headers,
    },
  });
  
  // Handle auth errors
  await handleAuthError(response);
  
  return response;
}
