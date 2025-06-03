import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { ProfileSetup } from '../types/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  requestOtp: async (email: string) => {
    const response = await api.post('/auth/request-otp/', { email });
    return response.data;
  },
  verifyOtp: async (email: string, otp: string) => {
    const response = await api.post('/auth/verify-otp/', { email, otp });
    return response.data;
  },
  setupProfile: async (data: ProfileSetup) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('phone', data.phone);
    formData.append('gender', data.gender);
    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }
    
    const response = await api.post('/auth/setup-profile/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  logout: async () => {
    await api.post('/auth/logout/');
    useAuthStore.getState().clearAuth();
  },
};

export const photoApi = {
  getPhotos: () => api.get('/photos/'),
  uploadPhoto: (formData: FormData) => api.post('/photos/', formData),
  deletePhoto: (id: string) => api.delete(`/photos/${id}/`),
  updatePhoto: (id: string, data: any) => api.patch(`/photos/${id}/`, data),
};

export const albumApi = {
  getAlbums: () => api.get('/albums/'),
  createAlbum: (data: any) => api.post('/albums/', data),
  updateAlbum: (id: string, data: any) => api.patch(`/albums/${id}/`, data),
  deleteAlbum: (id: string) => api.delete(`/albums/${id}/`),
};

export default api;