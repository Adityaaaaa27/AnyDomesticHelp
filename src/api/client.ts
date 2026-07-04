/**
 * API client configuration for Any Domestic Help backend.
 */

import axios from 'axios';

export const BASE_URL = 'https://www.anydomestichelp.com';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

/**
 * Standard API response type.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * Standard error handler for API calls.
 */
export function handleApiError(error: unknown): ApiResponse {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data?.message || 'Something went wrong. Please try again.',
      };
    }
    if (error.request) {
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      };
    }
  }
  return {
    success: false,
    message: 'Something went wrong. Please try again.',
  };
}
