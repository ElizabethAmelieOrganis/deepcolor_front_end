# CL_MAS_WEB 前端项目

## 项目简介

这是一个基于 Vue 3 的前端项目，使用了现代化的开发工具链和框架。项目采用 Vite 作为构建工具，使用 Element Plus 作为 UI 组件库，并集成了国际化支持。项目实现了实验方案的实时对话和处理进度展示功能。

## 技术栈

- Vue 3
- Vite
- Element Plus
- Vue Router
- Pinia (状态管理)
- Vue I18n (国际化)
- Axios (HTTP 客户端)
- Socket.IO (WebSocket 实时通信)
- Vis Network (网络可视化)

## 项目结构

```
├── src/                    # 源代码目录
│   ├── assets/            # 静态资源文件
│   ├── components/        # 可复用的Vue组件
│   ├── i18n/             # 国际化相关配置和翻译文件
│   ├── router/           # 路由配置
│   ├── stores/           # Pinia状态管理
│   ├── utils/            # 工具函数
│   ├── views/            # 页面级组件
│   ├── App.vue           # 根组件
│   └── main.js           # 应用入口文件
├── public/               # 静态公共资源
├── .vscode/             # VS Code配置文件
├── vite.config.js       # Vite配置文件
├── package.json         # 项目依赖配置
└── index.html           # HTML入口文件
```

## 主要功能模块

1. **视图层 (views/)**

   - 包含所有页面级组件
   - 负责整体页面布局和路由视图
   - 实现实验方案对话界面

2. **组件层 (components/)**

   - 可复用的 UI 组件
   - 业务逻辑组件
   - 实时消息显示组件

3. **状态管理 (stores/)**

   - 使用 Pinia 进行状态管理
   - 处理全局状态和数据流
   - 管理 WebSocket 连接状态

4. **国际化支持 (i18n/)**

   - 多语言支持配置
   - 语言包管理

5. **工具类 (utils/)**
   - 通用工具函数
   - API 请求封装
   - WebSocket 通信封装
   - 常量定义

## 后端服务

后端服务基于 Flask 框架，提供以下功能：

- 实验方案搜索和处理
- WebSocket 实时消息推送
- Nature Protocols 文章爬取和处理
- DeepSeek API 集成

### 后端依赖安装

```bash
cd CL_MAS_WEB-AI-Core
pip install -r requirements.txt
```

### 后端服务启动

```bash
python app.py
```

## 前端开发环境设置

1. 安装依赖：

```bash
npm install
```

2. 启动开发服务器：

```bash
npm run dev
```

3. 构建生产版本：

```bash
npm run build
```

4. 预览生产构建：

```bash
npm run preview
```

## 依赖版本

### 前端依赖

- axios: ^1.8.3
- element-plus: ^2.9.7
- pinia: ^3.0.1
- socket.io-client: ^4.7.5
- vue: ^3.5.13
- vue-i18n: ^11.1.2
- vue-router: ^4.5.0
- vis-network: ^9.1.9
- vis-data: ^7.1.9

### 后端依赖

- flask: 3.0.2
- flask-cors: 4.0.0
- flask-socketio: 5.3.6
- requests: 2.31.0
- beautifulsoup4: 4.12.3
- openai: 1.12.0
- python-socketio: 5.11.1
- eventlet: 0.35.1

## 实时消息功能

项目实现了实验方案处理的实时消息推送功能：

1. 搜索进度实时显示
2. 文章查找过程实时显示
3. 处理状态实时显示
4. 最终实验方案显示

## 开发规范

1. **组件命名**

   - 使用 PascalCase 命名组件
   - 页面组件以 View 结尾
   - 通用组件使用描述性名称

2. **文件组织**

   - 按功能模块组织文件
   - 相关文件放在同一目录下
   - 保持目录结构清晰

3. **代码风格**
   - 遵循 Vue 3 组合式 API 的最佳实践
   - 使用 ESLint 进行代码规范检查
   - 保持代码整洁和可维护性

## 注意事项

1. 确保 Node.js 版本兼容性
2. 开发时注意保持依赖版本的一致性
3. 提交代码前进行必要的测试
4. 确保 WebSocket 服务正常运行
5. 遵循项目的 Git 提交规范

## 贡献指南

1. Fork 本仓库
2. 创建特性分支
3. 提交更改
4. 发起 Pull Request

## 许可证

MIT License
##Merged The Code Of The New Front End And Added Animations When Entering The Page
