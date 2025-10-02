import { fetchWithErrorHandling, ApiError } from './base-client';

export async function get<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetchWithErrorHandling(endpoint);
    if (response.status === 204) {
      return {} as T;
    }
    return response.json();
  } catch (error) {
    throw error instanceof ApiError
      ? error
      : new ApiError('GET request failed');
  }
}

export async function post<T>(endpoint: string, body?: unknown): Promise<T> {
  try {
    const response = await fetchWithErrorHandling(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
    if (response.status === 204) {
      return {} as T;
    }
    return response.json();
  } catch (error) {
    throw error instanceof ApiError
      ? error
      : new ApiError('POST request failed');
  }
}

export async function put<T>(endpoint: string, body?: unknown): Promise<T> {
  try {
    const response = await fetchWithErrorHandling(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
    if (response.status === 204) {
      return {} as T;
    }
    return response.json();
  } catch (error) {
    throw error instanceof ApiError
      ? error
      : new ApiError('PUT request failed');
  }
}

export async function del<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetchWithErrorHandling(endpoint, {
      method: 'DELETE',
    });
    if (response.status === 204) {
      return {} as T;
    }
    return response.json();
  } catch (error) {
    throw error instanceof ApiError
      ? error
      : new ApiError('DELETE request failed');
  }
}
