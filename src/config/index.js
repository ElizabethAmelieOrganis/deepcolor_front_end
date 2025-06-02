// 辅助函数：判断当前环境
const isDevelopment = () => {
  // 方法1: 使用 import.meta.env
  const viteEnv = import.meta.env.MODE === "development";

  // 方法2: 检查主机名
  const hostEnv =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  // 输出调试信息
  console.log("环境检测:", {
    viteEnv,
    hostEnv,
    hostname: window.location.hostname,
    fullUrl: window.location.href,
    mode: import.meta.env.MODE,
  });

  // 使用两种方法的组合结果
  return viteEnv || hostEnv;
};

// 尝试加载环境变量
try {
  console.log("Vite环境变量:", import.meta.env);
} catch (e) {
  console.error("无法加载环境变量:", e);
}

export const config = {
  // API基础配置
  apiBase: "/api",
  // 修正后端API地址 - 指向正确的后端服务器
  get apiBaseUrl() {
    // 由于前后端在不同服务器，统一使用后端公网地址
    return "https://mcyrmcxgozkd.sealoshzh.site/api";
  },

  // AI API配置 - 新增
  get aiApiUrl() {
    return isDevelopment()
      ? "http://127.0.0.1:5000/api"
      : "https://drpslauocjcs.sealoshzh.site/api"; // 新AI服务公网域名
  },

  // WebSocket配置 - 更新以支持公网
  get socketUrl() {
    return isDevelopment() ? "http://127.0.0.1:5000" : window.location.origin; // 使用同源代理
  },
  socketOptions: {
    path: "/socket.io",
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
  },

  // 数据库配置
  database: {
    postgres: {
      development:
        "postgresql://postgres:cwsmr7ms@clmaindb-postgresql.ns-l69na7sk.svc:5432",
      production:
        "postgresql://postgres:cwsmr7ms@dbconn.sealosgzg.site:44763/?directConnection=true",
    },
    redis: {
      development: "redis://default:kdrwk2hk@clfudb-redis.ns-l69na7sk.svc:6379",
      production: "redis://default:kdrwk2hk@dbconn.sealosgzg.site:42005",
    },
  },

  // API超时配置
  timeout: 30000, // 30秒

  // 认证相关配置 - 根据后端文档调整
  auth: {
    tokenKey: "access_token",
    refreshTokenKey: "refresh_token",
    tokenExpireTime: 3600, // 60分钟 (与后端文档一致)
    refreshTokenExpireTime: 86400, // 24小时 (与后端文档一致)
  },

  // 公开注册模式配置 - 移除测试账号，支持真实注册
  registrationMode: {
    enabled: true, // 启用公开注册
    requireEmailVerification: true, // 需要邮箱验证
    autoLogin: false, // 禁用自动登录
  },
};
