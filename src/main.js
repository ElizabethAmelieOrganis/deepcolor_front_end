import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./assets/fonts/fonts.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import axios from "axios";
import i18n from "./i18n";
import 'vis-network/styles/vis-network.css'
const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(ElementPlus);
app.use(pinia);
app.use(i18n);
app.mount("#app");
app.config.globalProperties.$axios = axios;
