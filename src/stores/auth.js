import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
  }),

  actions: {
    setToken({ accessToken, refreshToken }) {
      // 存储到 state
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      // 存储到 localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    },

    clearToken() {
      // 清除 state
      this.accessToken = null;
      this.refreshToken = null;
      // 清除 localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },

    isLoggedIn() {
      return !!this.accessToken;
    }
  }
})