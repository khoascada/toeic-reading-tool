import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export interface ApiError {
  message: string;
  statusCode?: number;
  errCode?: string;
}

export const ERROR_CODES = {
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

// Create axios instance
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const apiClient = api;

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally & normalize ApiError
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const mapStatusCodeToErrCode = (statusCode: number): ErrorCode | null => {
      switch (statusCode) {
        case 400:
          return ERROR_CODES.BAD_REQUEST;
        case 401:
          return ERROR_CODES.UNAUTHORIZED;
        case 403:
          return ERROR_CODES.FORBIDDEN;
        case 404:
          return ERROR_CODES.NOT_FOUND;
        case 500:
        case 502:
        case 503:
        case 504:
          return ERROR_CODES.INTERNAL_SERVER_ERROR;
        default:
          return null;
      }
    };

    // Case 1: Server có trả về response (HTTP 4xx, 5xx)
    if (error.response) {
      const contentType = error.response.headers['content-type'];
      const isHtmlResponse = typeof contentType === 'string' && contentType.includes('text/html');

      let apiError: ApiError;

      if (isHtmlResponse || typeof error.response.data === 'string') {
        // Backend trả về HTML (Next.js 404/500 page) hoặc text raw
        apiError = {
          message: `Lỗi kết nối máy chủ hoặc endpoint không tồn tại (Status: ${error.response.status})`,
          statusCode: error.response.status,
          errCode:
            mapStatusCodeToErrCode(error.response.status) || ERROR_CODES.INTERNAL_SERVER_ERROR,
        };
      } else {
        // Backend trả về JSON error response
        const data = error.response.data;
        apiError = {
          message: data?.message || error.message || 'Đã có lỗi xảy ra',
          statusCode: error.response.status,
          errCode: data?.errCode || mapStatusCodeToErrCode(error.response.status) || undefined,
        };
      }

      // Log dev-friendly message cho các lỗi phổ biến
      if (process.env.NODE_ENV === 'development') {
        switch (error.response.status) {
          case 401:
            console.warn('[API 401] Unauthorized access');
            break;
          case 403:
            console.warn('[API 403] Forbidden access');
            break;
          case 404:
            console.warn(`[API 404] Resource not found: ${error.config?.url}`);
            break;
          case 500:
            console.error('[API 500] Internal server error');
            break;
        }
      }

      return Promise.reject(apiError);
    }

    // Case 2: Đã gửi request nhưng không nhận được response (Network Error, Timeout, Server sập)
    if (error.request) {
      const isTimeout = error.code === 'ECONNABORTED' || error.message.includes('timeout');
      const apiError: ApiError = {
        message: isTimeout
          ? 'Quá thời gian kết nối tới máy chủ (Timeout)'
          : 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng!',
        statusCode: 0,
        errCode: ERROR_CODES.INTERNAL_SERVER_ERROR,
      };
      return Promise.reject(apiError);
    }

    // Case 3: Lỗi khi khởi tạo request
    const apiError: ApiError = {
      message: error.message || 'Đã có lỗi không xác định xảy ra',
      statusCode: 0,
      errCode: ERROR_CODES.BAD_REQUEST,
    };
    return Promise.reject(apiError);
  }
);

export default api;
