import API from './api';

export const authService = {
  login: async (email, password) => {
    const response = await API.post('/auth/login', { email, password });
    if (response.data.access_token) {
      localStorage.setItem('helixmind_token', response.data.access_token);
    }
    return response.data;
  },
  register: async (userData) => {
    const response = await API.post('/auth/register', userData);
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await API.get('/auth/me');
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('helixmind_token');
  },
};