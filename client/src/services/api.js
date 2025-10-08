import axios from 'axios';

const API_BASE_URL = 'https://promptvision.onrender.com/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Image generation API
export const generateImage = async (data) => {
  try {
    const response = await api.post('/images/generate', data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to generate image');
  }
};

// Share image with community
export const shareImage = async (data) => {
  try {
    const response = await api.post('/images/share', data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to share image');
  }
};

// Get all shared images (community feed)
export const getCommunityImages = async () => {
  try {
    const response = await api.get('/images');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch images');
  }
};

// Get user's images
export const getUserImages = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/images`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user images');
  }
};

// Auth APIs
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/auth/logout');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};

export default api;
