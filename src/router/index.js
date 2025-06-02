//router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import About from "../views/About.vue";
import Home from "../views/Home.vue";
import Docx from "../views/Docx.vue";
import Contact from "../views/Contact.vue";
import Main from "../views/Main.vue";
import project_list from "../views/project_list.vue";
import protocolsimulation from "../views/protocolsimulation.vue";
import ProjectWorkbench from "../components/projectWorkBenches.vue";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import KnowledgeGraphTool from "../views/KnowledgeGraphTool.vue";
import Team from "../views/Team.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: false, allowAll: true }, // 首页允许所有人访问
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false, guestOnly: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresAuth: false, guestOnly: true },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: { requiresAuth: false },
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    meta: { requiresAuth: false },
  },
  {
    path: "/docx",
    name: "Docx",
    component: Docx,
    meta: { requiresAuth: false },
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
    meta: { requiresAuth: false },
  },
  {
    path: "/main/project",
    name: "project_list",
    component: project_list,
    meta: { requiresAuth: false },
  },
  {
    path: "/project-workbench/:id",
    name: "project-workbench",
    component: ProjectWorkbench,
    meta: { requiresAuth: false },
  },
  {
    path: "/main/protocolsimulation",
    name: "protocolsimulation",
    component: protocolsimulation,
    meta: { requiresAuth: false },
  },
  {
    path: "/main/knowledgeGraphTool",
    name: "knowledgeGraphTool",
    component: KnowledgeGraphTool,
    meta: { requiresAuth: false },
  },
  {
    path: "/main/team",
    name: "team",
    component: Team,
    meta: { requiresAuth: false },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// 修改后的路由守卫 - 支持公开注册模式
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const guestOnly = to.matched.some((record) => record.meta.guestOnly);
  const allowAll = to.matched.some((record) => record.meta.allowAll);
  const isAuthenticated = authStore.isLoggedIn;

  console.log("🔍 路由守卫检查:", {
    to: to.path,
    requiresAuth,
    guestOnly,
    allowAll,
    isAuthenticated,
  });

  // 首页和公开页面允许所有人访问，不做重定向
  if (allowAll || to.path === "/about" || to.path === "/contact") {
    console.log("✅ 允许访问公开页面:", to.path);
    next();
    return;
  }

  // 如果需要认证但未登录
  if (requiresAuth && !isAuthenticated) {
    console.log("❌ 需要登录，重定向到登录页");
    next({ path: "/login", query: { redirect: to.fullPath } });
    return;
  }

  // 登录和注册页面的处理 - 如果已登录，重定向到主页
  if (guestOnly && isAuthenticated) {
    console.log("🔄 已登录用户访问登录/注册页面，重定向到主页");
    next("/main");
    return;
  }

  // 对于已登录用户，仅在必要时获取用户信息
  if (isAuthenticated && !authStore.user && requiresAuth) {
    try {
      console.log("📋 获取用户信息...");
      await authStore.fetchUserProfile();
    } catch (error) {
      console.error("❌ 获取用户信息失败:", error);
      authStore.clearToken();
      next({ path: "/login", query: { redirect: to.fullPath } });
      return;
    }
  }

  console.log("✅ 路由守卫通过");
  next();
});
export default router;
