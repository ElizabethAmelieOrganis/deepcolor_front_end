<template>
  <loading v-show="showLoading" />
  <div class="login-box">
    <p>Login</p>
    <el-form
      :rules="loginRules"
      ref="loginFormRef"
      :model="loginForm"
      class="login-form"
    >
      <div class="user-box">
        <el-form-item prop="email">
          <el-input
            v-model="loginForm.email"
            type="email"
            placeholder="Email"
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
      Forget your password?<a class="a2" href="#">Click here!</a>
    </p>
    <p>
      Don't have an account?
      <a href="" class="a2" @click.prevent="goToRegister">Sign up!</a>
    </p>
  </div>
</template>

<script setup>
import loading from "./loading.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
//引入axios
import axios from "axios";
//引入pinia
import { useAuthStore } from "@/stores/auth";
//引入拦截器
import axiosInstance from "@/utils/axios";
const authStore = useAuthStore();
const router = useRouter();
const loginForm = ref({
  email: "",
  password: "",
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
        // 使用正确的API路径
        const response = await axiosInstance.post("/api/auth/token/", {
          email: loginForm.email,
          password: loginForm.password,
        });
        console.log("登陆成功", response.data);
        // 保存token
        const { access, refresh } = response.data;
        // 存储token
        authStore.setToken({
          accessToken: access,
          refreshToken: refresh,
        });
        // 跳转到主界面
        router.push("/main");
      } catch (error) {
        console.error("登录错误:", error);
        alert("登陆失败,请检查邮箱或者密码是否正确");
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
  background-color: transparent !important;
  box-shadow: none !important;
}

.el-input__inner {
  background-color: transparent !important;
  border: none !important;
  border-bottom: 1px solid #fff !important;
  border-radius: 0 !important;
  color: #fff !important;
  padding: 10px 0 !important;
}

.el-input__inner::placeholder {
  color: #fff !important;
}

.el-form-item__error {
  color: #ff6b6b !important;
}
</style>
