import { defineStore } from "pinia";
import { config } from "@/config";
import axiosInstance from "@/utils/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    user: null,
    isEmailVerified: false,
    loading: false,
    error: null,
    initialized: false,
  }),

  getters: {
    isLoggedIn: (state) => !!state.accessToken,
    isVerified: (state) => state.isEmailVerified,
    userProfile: (state) => state.user,
  },

  actions: {
    initializeFromStorage() {
      if (this.initialized) return;

      console.log("🔄 初始化认证状态...");
      const savedToken = localStorage.getItem(config.auth.tokenKey);
      const savedRefreshToken = localStorage.getItem(
        config.auth.refreshTokenKey
      );
      const savedUser = localStorage.getItem("user");
      const savedEmailVerified = localStorage.getItem("isEmailVerified");

      if (savedToken && savedRefreshToken) {
        console.log("📋 发现保存的登录状态，恢复中...");
        this.accessToken = savedToken;
        this.refreshToken = savedRefreshToken;
        this.user = savedUser ? JSON.parse(savedUser) : null;
        this.isEmailVerified = savedEmailVerified
          ? JSON.parse(savedEmailVerified)
          : false;
      } else {
        console.log("✨ 无保存的登录状态，保持访客模式");
      }

      this.initialized = true;
    },

    clearAllState() {
      console.log("🧹 彻底清除所有认证状态");
      this.accessToken = null;
      this.refreshToken = null;
      this.user = null;
      this.isEmailVerified = false;
      this.error = null;
      this.initialized = false;

      localStorage.removeItem(config.auth.tokenKey);
      localStorage.removeItem(config.auth.refreshTokenKey);
      localStorage.removeItem("user");
      localStorage.removeItem("isEmailVerified");

      console.log("✅ 状态清除完成");
    },

    setToken({ accessToken, refreshToken }) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      localStorage.setItem(config.auth.tokenKey, accessToken);
      localStorage.setItem(config.auth.refreshTokenKey, refreshToken);
    },

    clearToken() {
      this.accessToken = null;
      this.refreshToken = null;
      this.user = null;
      this.isEmailVerified = false;
      this.error = null;
      localStorage.removeItem(config.auth.tokenKey);
      localStorage.removeItem(config.auth.refreshTokenKey);
      localStorage.removeItem("user");
      localStorage.removeItem("isEmailVerified");
    },

    setUser(userData) {
      this.user = userData;
      this.isEmailVerified = userData.is_email_verified;
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem(
        "isEmailVerified",
        JSON.stringify(userData.is_email_verified)
      );
    },

    updateUser(userData) {
      this.user = { ...this.user, ...userData };
      if (userData.is_email_verified !== undefined) {
        this.isEmailVerified = userData.is_email_verified;
        localStorage.setItem(
          "isEmailVerified",
          JSON.stringify(userData.is_email_verified)
        );
      }
      localStorage.setItem("user", JSON.stringify(this.user));
    },

    async fetchUserProfile() {
      try {
        this.loading = true;
        this.error = null;
        const response = await axiosInstance.get("/users/profile/");
        this.setUser(response.data);
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.detail || "获取用户信息失败";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateProfile(userData) {
      try {
        this.loading = true;
        this.error = null;
        const response = await axiosInstance.patch("/users/profile/", userData);
        this.updateUser(response.data);
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.detail || "更新用户信息失败";
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
