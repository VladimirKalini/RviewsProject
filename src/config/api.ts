// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const API_ENDPOINTS = {
  REVIEWS: '/api/reviews',
  COMPANY_REVIEWS: (companyName: string) => `/api/reviews/company/${encodeURIComponent(companyName)}`,
  AUTH_LOGIN: '/api/auth/login',
  AUTH_REGISTER: '/api/auth/register',
};

export const createApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`; 