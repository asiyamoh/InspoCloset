export interface ApiError {
  message: string;
  status?: number;
  statusText?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
