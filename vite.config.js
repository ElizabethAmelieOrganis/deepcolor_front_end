import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: [
      "wncrfqciospe.sealoshzh.site",
      "cmheelzvjfkx.sealoshzh.site",
      "clfront.ns-ocuuudni.svc.cluster.local",
    ],
    proxy: {
      "/users": {
        target: "https://mcyrmcxgozkd.sealoshzh.site",
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path,
        configure: (proxy, options) => {
          proxy.on("error", (err, req, res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, res) => {
            console.log("Sending Request to the Target:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, res) => {
            console.log(
              "Received Response from the Target:",
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
      "/api": {
        target: "https://mcyrmcxgozkd.sealoshzh.site",
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path,
        configure: (proxy, options) => {
          proxy.on("error", (err, req, res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, res) => {
            console.log(
              "Sending API Request to the Target:",
              req.method,
              req.url
            );
          });
          proxy.on("proxyRes", (proxyRes, req, res) => {
            console.log(
              "Received API Response from the Target:",
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
      // AI后端API代理配置 - 保持原路径
      "/ai-api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        ws: false,
        rewrite: (path) => path.replace(/^\/ai-api/, "/api"),
        configure: (proxy, options) => {
          proxy.on("error", (err, req, res) => {
            console.log("AI后端API代理错误:", err);
          });
          proxy.on("proxyReq", (proxyReq, req, res) => {
            console.log("发送AI API请求:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, res) => {
            console.log("收到AI API响应:", proxyRes.statusCode, req.url);
          });
        },
      },
      // AI后端健康检查代理 - 直接映射
      "/ai-health": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        ws: false,
        rewrite: (path) => path.replace(/^\/ai-health/, "/health"),
        configure: (proxy, options) => {
          proxy.on("error", (err, req, res) => {
            console.log("AI健康检查代理错误:", err);
          });
          proxy.on("proxyReq", (proxyReq, req, res) => {
            console.log("发送AI健康检查请求:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, res) => {
            console.log("收到AI健康检查响应:", proxyRes.statusCode, req.url);
          });
        },
      },
      // WebSocket代理配置
      "/socket.io": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, options) => {
          proxy.on("error", (err, req, res) => {
            console.log("WebSocket代理错误:", err);
          });
          proxy.on("proxyReq", (proxyReq, req, res) => {
            console.log("WebSocket代理请求:", req.method, req.url);
          });
          proxy.on("upgrade", (req, socket, head) => {
            console.log("WebSocket升级连接:", req.url);
          });
        },
      },
    },
    cors: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
