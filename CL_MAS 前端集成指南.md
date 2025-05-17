# CL_MAS 前端集成指南

本文档提供了前端应用与CL_MAS后端和AI核心服务的连接指南。

## 服务端点信息

### 后端服务
- 公网URL: https://cmheelzvjfkx.sealoshzh.site
- 本地开发URL: http://localhost:8080
- API基础路径: `/api`

### AI核心服务
- 公网URL: https://lvuyrmbchdbn.sealoshzh.site
- 本地开发URL: http://localhost:5000
- API基础路径: `/api`

## 认证流程

后端API使用JWT认证。前端需要实现以下步骤：

1. 用户登录: `POST /api/auth/token/`
   - 请求体: `{"email": "用户邮箱", "password": "密码"}`
   - 响应: `{"access": "访问令牌", "refresh": "刷新令牌"}`

2. 刷新令牌: `POST /api/auth/refresh/`
   - 请求体: `{"refresh": "刷新令牌"}`
   - 响应: `{"access": "新的访问令牌"}`

3. 所有认证API请求需要在Header中添加:
   - `Authorization: Bearer {访问令牌}`

## 实验方案功能集成

### 1. 检查AI服务健康状态

```javascript
// 检查AI服务健康状态
async function checkAIHealth() {
  try {
    const response = await fetch('https://cmheelzvjfkx.sealoshzh.site/api/experiments/health/');
    const data = await response.json();
    return data.status === 'healthy';
  } catch (error) {
    console.error('AI健康检查失败:', error);
    return false;
  }
}
```

### 2. 生成实验方案

```javascript
// 生成实验方案
async function generateProtocol(queryText, accessToken) {
  try {
    const response = await fetch('https://cmheelzvjfkx.sealoshzh.site/api/experiments/process/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ text: queryText })
    });
    
    if (!response.ok) {
      throw new Error(`服务器错误: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('生成实验方案失败:', error);
    throw error;
  }
}
```

### 3. 完整示例（Vue.js）

```javascript
// 实验方案组件示例
<template>
  <div class="protocol-generator">
    <div v-if="!isAIHealthy" class="error-message">
      AI服务当前不可用，请稍后再试。
    </div>
    
    <div v-else>
      <div class="form-group">
        <label>请输入查询内容：</label>
        <textarea 
          v-model="queryText" 
          placeholder="例如：PCR实验"
          rows="4"
          class="form-control"
        ></textarea>
      </div>
      
      <button 
        @click="generateProtocol" 
        :disabled="isLoading || !queryText" 
        class="btn btn-primary"
      >
        {{ isLoading ? '生成中...' : '生成实验方案' }}
      </button>
      
      <div v-if="result" class="result-container">
        <h3>生成的实验方案：</h3>
        <div v-html="formattedResult"></div>
      </div>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAIHealthy: true,
      queryText: '',
      result: null,
      isLoading: false,
      error: null
    }
  },
  
  computed: {
    formattedResult() {
      // 将Markdown格式转换为HTML
      if (!this.result || !this.result.message) return '';
      // 使用markdown-it或其他库处理markdown
      return this.markdownToHtml(this.result.message);
    }
  },
  
  async mounted() {
    // 检查AI服务健康状态
    this.checkAIHealth();
  },
  
  methods: {
    async checkAIHealth() {
      try {
        const response = await fetch('/api/experiments/health/');
        const data = await response.json();
        this.isAIHealthy = data.status === 'healthy';
      } catch (error) {
        console.error('AI健康检查失败:', error);
        this.isAIHealthy = false;
      }
    },
    
    async generateProtocol() {
      this.isLoading = true;
      this.error = null;
      this.result = null;
      
      try {
        // 从Vuex或其他状态管理获取accessToken
        const accessToken = this.$store.state.auth.accessToken;
        
        const response = await fetch('/api/experiments/process/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({ text: this.queryText })
        });
        
        if (!response.ok) {
          throw new Error(`服务器错误: ${response.status}`);
        }
        
        this.result = await response.json();
      } catch (error) {
        console.error('生成实验方案失败:', error);
        this.error = '生成实验方案失败: ' + error.message;
      } finally {
        this.isLoading = false;
      }
    },
    
    markdownToHtml(markdown) {
      // 使用markdown-it或其他库处理markdown
      // 这里只是示例，实际项目中需要引入适当的库
      return markdown.replace(/\n/g, '<br>');
    }
  }
}
</script>
```

## API参考文档

完整的API文档可通过后端Swagger界面访问：
- 公网: https://cmheelzvjfkx.sealoshzh.site/swagger/
- 本地开发: http://localhost:8080/swagger/

## 调试注意事项

1. 在开发过程中，可以使用浏览器开发者工具的网络面板监控API请求
2. 确保CORS配置正确，当前允许的前端域名：
   - https://zweshafupokm.sealoshzh.site
   - http://localhost:3000
   - http://127.0.0.1:3000
3. 如果遇到认证问题，检查JWT令牌是否过期
4. 如果AI服务不可用，前端应该优雅地处理并显示适当的错误消息

## 技术支持

如有问题，请联系：
- 邮箱：18924412117@163.com 