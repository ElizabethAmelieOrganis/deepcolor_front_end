import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: "https://cmheelzvjfkx.sealoshzh.site", // 后端地址
  timeout: 5000,
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.accessToken;
    // 如果 token 存在，则添加到请求头中
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;
    const authStore = useAuthStore();
    const router = useRouter();
    // 处理 401 错误（未授权）
    if (response?.status === 401) {
      try {
        const refreshToken = authStore.refreshToken;
        if (refreshToken) {
          // 使用正确的刷新token接口
          const result = await axiosInstance.post("/api/auth/refresh/", {
            refresh: refreshToken,
          });
          // 更新 token
          authStore.setToken({
            accessToken: result.data.access,
            refreshToken: result.data.refresh,
          });
          // 重发请求
          return axiosInstance(response.config);
        }
      } catch (refreshError) {
        // 如果刷新令牌失败，则清除 token 并重定向到登录页面
        authStore.clearToken();
        alert("登录过期，请重新登录");
        router.push("/");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
