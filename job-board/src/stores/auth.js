import { defineStore } from 'pinia';
import { auth } from '@/utils/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
  }),

  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.isAuthenticated,
  },

  actions: {
    async login(credentials) {
      try {
        const response = await auth.login(credentials);
        const { token, user } = response.data;
        
        this.token = token;
        this.user = user;
        this.isAuthenticated = true;
        
        localStorage.setItem('token', token);
        return response;
      } catch (error) {
        throw error;
      }
    },

    async register(userData) {
      try {
        const response = await auth.register(userData);
        return response;
      } catch (error) {
        throw error;
      }
    },

    async logout() {
      try {
        await auth.logout();
        this.clearAuth();
      } catch (error) {
        this.clearAuth();
        throw error;
      }
    },

    clearAuth() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
    },

    async resendVerification() {
      try {
        const response = await auth.resendVerification();
        return response;
      } catch (error) {
        throw error;
      }
    }
  }
}); 