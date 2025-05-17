//router/index.js
import { createRouter, createWebHistory } from "vue-router";
import About from "../views/About.vue";
import Home from "../views/Home.vue";
import Docx from "../views/Docx.vue";
import Contact from "../views/Contact.vue";
import Main from "../views/Main.vue";
import project_list from "../views/project_list.vue";
import protocolsimulation from "../views/protocolsimulation.vue";
import ProjectWorkbench from "../components/project_workbenches.vue";
import Register from "../components/Register.vue";
import KnowledgeGraphTool from "../views/KnowledgeGraphTool.vue";
import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/docx",
    name: "Docx",
    component: Docx,
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
  },
  {
    path: "/main/project",
    name: "project_list",
    component: project_list,
  },
  {
    path: "/project-workbench/:id",
    name: "project-workbench",
    component: ProjectWorkbench,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/main/protocolsimulation",
    name: "protocolsimulation",
    component: protocolsimulation,
  },
  {
    path: "/main/knowledgeGraphTool",
    name: "knowledgeGraphTool",
    component: KnowledgeGraphTool,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
