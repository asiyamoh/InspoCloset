import { API_URL } from '../constants';
import { ApiError as ApiErrorType } from '../types/api.types';

export class ApiError extends Error implements ApiErrorType {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function buildHeaders(includeContentType: boolean = true): Record<string, string> {
  const headers: Record<string, string> = {};

  if (includeContentType) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
}

export async function fetchWithErrorHandling(
  endpoint: string,
  options?: RequestInit,
): Promise<Response> {
  try {
    const url = endpoint.startsWith('http')
      ? endpoint
      : `${API_URL}/${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: buildHeaders(true),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new ApiError(
        `Request failed: ${errorText}`,
        response.status,
        response.statusText,
      );
    }

    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Request failed', undefined, error?.toString());
  }
}
