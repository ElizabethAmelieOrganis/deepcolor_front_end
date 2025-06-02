// 测试配置文件
import { config } from "./src/config";
import axios from "axios";

// 打印当前环境
console.log("当前环境:", import.meta.env.MODE);

// 打印API配置
console.log("API配置:", {
  apiBaseUrl: config.apiBaseUrl,
  socketUrl: config.socketUrl,
});

// 创建测试请求
async function testRequest() {
  try {
    // 打印完整请求URL
    const fullUrl = `${config.apiBaseUrl}/users/request-code/`;
    console.log("完整请求URL:", fullUrl);

    // 尝试发送一个测试请求
    const response = await axios.get("https://httpbin.org/get", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log("测试请求成功:", response.status);
  } catch (error) {
    console.error("测试请求失败:", error);
  }
}

// 执行测试
testRequest();

export default { test: true };
