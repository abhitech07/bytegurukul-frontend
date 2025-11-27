import api from './api';

export const authService = {
  // Register new user
  register: async (userData) => {
    try {
      // NOTE: Assuming your backend returns user data + token on successful registration
      const response = await api.post('/auth/register', userData);
      
      // Store token and user data in localStorage on successful registration
      if (response.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      // --- CRITICAL CHECK: Ensure response structure is handled ---
      // Your backend log indicates the successful response body is where the data lives.
      if (response.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      
      return response;
    } catch (error) {
      // Show the exact error message from the backend on failure (e.g., "Invalid credentials")
      throw error; 
    }
  },

  // Get current user profile
  getProfile: async () => {
    try {
      const response = await api.get('/auth/me');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // window.location.href = '/login'; // Let AuthContext handle navigation
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get current user data
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};