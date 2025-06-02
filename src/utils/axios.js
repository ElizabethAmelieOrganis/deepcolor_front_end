import axios from "axios";
import { config } from "@/config";
import { ElMessage } from "element-plus";

// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 重试配置
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 初始化重试计数
    config._retryCount = config._retryCount || 0;

    // 从 localStorage 获取 token - 使用与auth store一致的key
    const tokenKey = "access_token"; // 与config.auth.tokenKey一致
    const token = localStorage.getItem(tokenKey);

    console.log("🔍 Token读取调试:", {
      tokenKey,
      token: token ? `${token.substring(0, 20)}...` : null,
      hasToken: !!token,
      url: config.url,
    });

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("⚠️ 未找到token，请求将不包含Authorization头");
    }

    // 添加请求时间戳，防止缓存
    if (config.method === "get") {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    return config;
  },
  (error) => {
    console.error("请求错误:", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response, config } = error;

    // 处理 401 错误（未授权）
    if (response?.status === 401) {
      // 如果是登录请求本身返回401，不要尝试刷新token
      if (config.url && config.url.includes("/auth/token/")) {
        console.log("登录请求返回401，用户名或密码错误");
        return Promise.reject(error);
      }

      try {
        const refreshTokenKey = "refresh_token"; // 与config.auth.refreshTokenKey一致
        const refreshToken = localStorage.getItem(refreshTokenKey);

        console.log("🔄 Token刷新调试:", {
          refreshTokenKey,
          hasRefreshToken: !!refreshToken,
        });

        if (refreshToken) {
          // 使用正确的刷新token接口路径：/users/token/refresh/ -> /auth/refresh/
          const result = await axiosInstance.post("/auth/refresh/", {
            refresh: refreshToken,
          });

          // 更新 token - 使用正确的key
          const accessTokenKey = "access_token";
          localStorage.setItem(accessTokenKey, result.data.access);

          console.log("✅ Token刷新成功");

          // 重发请求
          return axiosInstance(config);
        }
      } catch (refreshError) {
        console.error("Token刷新失败:", refreshError);
        // 如果刷新令牌失败，则清除 token - 使用正确的key
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        ElMessage.error("登录已过期，请重新登录");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // 处理网络错误和重试
    if (!response || error.code === "ECONNABORTED") {
      if (config._retryCount < MAX_RETRIES) {
        config._retryCount++;
        ElMessage.warning(`请求超时，正在进行第${config._retryCount}次重试...`);
        await new Promise((resolve) =>
          setTimeout(resolve, RETRY_DELAY * config._retryCount)
        );
        return axiosInstance(config);
      } else {
        ElMessage.error("请求超时，请检查网络连接后重试");
      }
    }

    // 处理其他错误
    if (response) {
      const errorMessage =
        response.data?.detail || response.data?.message || "请求失败";
      switch (response.status) {
        case 400:
          ElMessage.error(errorMessage);
          break;
        case 403:
          ElMessage.error("权限不足");
          break;
        case 404:
          ElMessage.error("请求的资源不存在");
          break;
        case 500:
          ElMessage.error("服务器错误，请稍后重试");
          break;
        default:
          ElMessage.error(errorMessage);
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      ElMessage.error("网络错误，请检查网络连接");
    } else {
      // 请求配置出错
      ElMessage.error("请求配置错误");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
