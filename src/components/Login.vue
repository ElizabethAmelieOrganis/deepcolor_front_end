<template>
  <div class="background_container"></div>
  <loading v-show="showLoading" />
  <div class="login-box">
    <p>Login</p>

    <!-- 加强的反自动填充策略 -->
    <div style="position: absolute; left: -9999px; top: -9999px">
      <input type="text" name="fake_username" autocomplete="username" />
      <input
        type="password"
        name="fake_password"
        autocomplete="current-password"
      />
      <input type="text" name="decoy1" autocomplete="off" />
      <input type="password" name="decoy2" autocomplete="off" />
    </div>

    <el-form
      :rules="loginRules"
      ref="loginFormRef"
      :model="loginForm"
      class="login-form"
      autocomplete="off"
      @submit.native.prevent
    >
      <div class="user-box">
        <el-form-item prop="email">
          <el-input
            v-model="loginForm.email"
            type="email"
            placeholder="Email"
            autocomplete="nope"
            spellcheck="false"
            :readonly="false"
            name="user_email_input"
            data-form-type="other"
            @focus="onEmailFocus"
          />
        </el-form-item>
      </div>
      <div class="user-box">
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="Password"
            show-password
            autocomplete="nope"
            spellcheck="false"
            :readonly="false"
            name="user_password_input"
            data-form-type="other"
            @input="onPasswordInput"
            @focus="onPasswordFocus"
            @blur="onPasswordBlur"
          />
        </el-form-item>
      </div>
      <a @click="submitForm">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Submit
      </a>
    </el-form>
    <p class="forget" style="color: #aaa">
      Forget your password?<a
        class="a2"
        href="#"
        @click.prevent="goToForgetPassword"
        >Click here!</a
      >
    </p>
    <p>
      Don't have an account?
      <a href="" class="a2" @click.prevent="goToRegister">Sign up!</a>
    </p>
  </div>
</template>

<script setup>
import loading from "./loading.vue";
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
//引入axios
import axios from "axios";
//引入pinia
import { useAuthStore } from "@/stores/auth";
//引入拦截器
import axiosInstance from "@/utils/axios";
import { config } from "@/config";

const authStore = useAuthStore();
const router = useRouter();
const loginForm = ref({
  email: "",
  password: "",
});

// 强制清除任何自动填充的内容
const forceCleanAutoFill = () => {
  console.log("🧹 强制清除浏览器自动填充");

  const wasAutoFilled =
    loginForm.value.email !== "" || loginForm.value.password !== "";

  if (wasAutoFilled) {
    console.log("⚠️ 检测到自动填充，正在清除...");
    loginForm.value.email = "";
    loginForm.value.password = "";
  }
};

// 在组件挂载后延迟清除自动填充
onMounted(() => {
  console.log("🔧 Login组件已挂载，设置防自动填充");

  // 多次延迟检查，因为浏览器可能在不同时间填充
  setTimeout(forceCleanAutoFill, 100);
  setTimeout(forceCleanAutoFill, 500);
  setTimeout(forceCleanAutoFill, 1000);

  // 禁用表单的autocomplete
  nextTick(() => {
    const form = document.querySelector(".login-form");
    if (form) {
      form.setAttribute("autocomplete", "off");
    }
  });
});

//登录表单验证规则
const loginRules = {
  email: [
    { required: true, message: "邮箱不能为空", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    {
      min: 6,
      max: 20,
      message: "密码长度必须在6到20个字符之间",
      trigger: "blur",
    },
  ],
};

const loginFormRef = ref(null);

//登录逻辑
const handleLogin = async () => {
  loginFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        console.log("🔍 登录调试信息:");
        console.log("API Base URL:", config.apiBaseUrl);
        console.log("登录数据:", {
          email: loginForm.value.email,
          password: "***隐藏***",
        });

        const response = await axiosInstance.post("/auth/token/", {
          email: loginForm.value.email,
          password: loginForm.value.password,
        });
        console.log("登录成功", response.data);
        // 保存token
        authStore.setToken({
          accessToken: response.data.access,
          refreshToken: response.data.refresh,
        });
        // 获取用户信息
        const userResponse = await axiosInstance.get("/users/profile/");
        authStore.setUser(userResponse.data);
        // 跳转到主界面
        router.push("/main");
      } catch (error) {
        console.error("❌ 登录错误详情:", error);

        if (error.response) {
          switch (error.response.status) {
            case 400:
              alert("用户名或密码格式不正确");
              break;
            case 401:
              alert("用户名或密码错误");
              break;
            default:
              alert("登录失败，请稍后重试");
          }
        }
      }
    }
  });
};

const showLoading = ref(false);
const submitForm = () => {
  showLoading.value = true;
  handleLogin()
    .then(() => {
      showLoading.value = false;
    })
    .catch(() => {
      showLoading.value = false;
    });
};

const goToRegister = () => {
  router.push("/register");
};

const goToForgetPassword = () => {
  // 这里可以添加忘记密码的逻辑，现在暂时跳转到注册页面
  alert("忘记密码功能开发中，请联系管理员或使用注册功能");
  // router.push("/forgot-password"); // 如果有忘记密码页面的话
};

const onEmailFocus = () => {
  console.log("📧 邮箱框获得焦点");

  // 立即检查并清除测试邮箱的自动填充
  if (loginForm.value.email === "18924412117@163.com") {
    console.log("⚠️ 检测到测试邮箱自动填充，立即清除:", loginForm.value.email);
    loginForm.value.email = "";
  }

  // 检查其他自动填充
  setTimeout(() => {
    if (loginForm.value.email && loginForm.value.email !== "") {
      console.log("⚠️ 邮箱被自动填充，正在清除:", loginForm.value.email);
      loginForm.value.email = "";
    }
  }, 100);
};

const onPasswordInput = () => {
  // 检查是否是浏览器自动填充的测试密码
  if (loginForm.value.password === "jsiqhdhwajsd") {
    console.log("⚠️ 检测到测试账号自动填充，立即清除");
    loginForm.value.password = "";
    return;
  }

  // 仅在开发环境显示调试信息
  if (import.meta.env.MODE === "development") {
    console.log("🔑 密码输入监控");
  }
};

const onPasswordFocus = () => {
  console.log("🎯 密码框获得焦点");

  // 立即检查并清除自动填充
  if (loginForm.value.password && loginForm.value.password !== "") {
    console.log("⚠️ 检测到浏览器自动填充，立即清除:", loginForm.value.password);
    loginForm.value.password = "";
  }

  // 延迟再次检查，防止浏览器延后填充
  setTimeout(() => {
    if (loginForm.value.password && loginForm.value.password !== "") {
      console.log("⚠️ 延迟检测到自动填充，再次清除:", loginForm.value.password);
      loginForm.value.password = "";
    }
  }, 100);
};

const onPasswordBlur = () => {
  console.log("🎯 密码框失去焦点");
};
</script>

<style>
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  margin: 20px auto;
  transform: translate(-50%, -55%);
  background: rgba(0, 0, 0, 0.9);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  z-index: 1000;
}

.login-box p:first-child {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #fff;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  font-weight: bold;
  color: #fff;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 10px;
  letter-spacing: 3px;
}

.login-box a:hover {
  background: #fff;
  color: #272727;
  border-radius: 5px;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #fff);
  animation: btn-anim1 1.5s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }

  50%,
  100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #fff);
  animation: btn-anim2 1.5s linear infinite;
  animation-delay: 0.375s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }

  50%,
  100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #fff);
  animation: btn-anim3 1.5s linear infinite;
  animation-delay: 0.75s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }

  50%,
  100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #fff);
  animation: btn-anim4 1.5s linear infinite;
  animation-delay: 1.125s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }

  50%,
  100% {
    bottom: 100%;
  }
}

.login-box p:last-child {
  color: #aaa;
  font-size: 14px;
}

.login-box a.a2 {
  color: #fff;
  text-decoration: none;
}

.login-box a.a2:hover {
  background: transparent;
  color: #aaa;
  border-radius: 5px;
}

.el-input__wrapper {
  background-color: rgba(0, 0, 0, 0.8) !important;
  box-shadow: none !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  border-radius: 4px !important;
}

.el-input__inner {
  background-color: rgba(0, 0, 0, 0.8) !important;
  border: none !important;
  border-bottom: 1px solid #fff !important;
  border-radius: 0 !important;
  color: #fff !important;
  padding: 10px 12px !important;
}

.el-input__inner::placeholder {
  color: rgba(255, 255, 255, 0.6) !important;
}

.el-form-item__error {
  color: #ff6b6b !important;
}

.background_container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/img/background/greatbackground.svg");
  z-index: 1;
  opacity: 1;
  pointer-events: none;
  animation: slide-down 2s ease-in-out forwards;
}

@keyframes slide-down {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

body {
  margin: 0;
  background-color: black;
}
</style>
