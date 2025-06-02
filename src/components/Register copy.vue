<template>
  <div class="background_container"></div>
  <div class="register-box">
    <p>Sign Up</p>
    <el-form
      :rules="registerRules"
      ref="registerFormRef"
      :model="registerForm"
      class="register-form"
    >
      <div class="user-box">
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" placeholder="Username" />
        </el-form-item>
      </div>
      <div class="user-box">
        <el-form-item prop="email">
          <el-input
            v-model="registerForm.email"
            type="email"
            placeholder="Email"
          />
        </el-form-item>
      </div>
      <div class="user-box verification-box">
        <el-form-item prop="verificationCode">
          <el-input
            v-model="registerForm.verificationCode"
            placeholder="Verification Code"
            class="verification-input"
          />
          <el-button
            :disabled="countdown > 0"
            @click="getVerificationCode"
            class="verification-button"
          >
            {{ countdown > 0 ? `${countdown}s` : "Get Code" }}
          </el-button>
        </el-form-item>
      </div>
      <div class="user-box">
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="Password"
            show-password
          />
        </el-form-item>
      </div>
      <div class="user-box">
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="Confirm Password"
            @blur="validateConfirmPassword"
            show-password
          />
        </el-form-item>
      </div>
      <a>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <p @click="handleRegister">Register</p>
      </a>
    </el-form>
    <p>
      Already have an account?
      <a href="" class="a2" @click.prevent="goToLogin">Login!</a>
    </p>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
//引入pinia
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
//引入axios
import axios from "axios";
const router = useRouter();
//使用pinia管理token
const authStore = useAuthStore();
//表单对象
const registerForm = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  verificationCode: "",
});

// 添加倒计时相关的数据
const countdown = ref(0);
const timer = ref(null);

//表单验证
const registerRules = {
  username: [
    { required: true, message: "Please enter your username", trigger: "blur" },
    {
      min: 4,
      max: 20,
      message: "用户名长度必须在4到20个字符之间",
      trigger: "blur",
    },
  ],
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
  confirmPassword: [
    { required: true, message: "确认密码不能为空", trigger: "blur" },
  ],
  verificationCode: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    { min: 6, max: 6, message: "验证码长度必须为6位", trigger: "blur" },
  ],
};

const validateConfirmPassword = () => {
  if (registerForm.value.confirmPassword !== registerForm.value.password) {
    alert("两次输入的密码不一致");
    // 这里可以根据需要修改表单验证的状态
    registerFormRef.value.validateField("confirmPassword");
  } else {
    // 密码一致，清除错误提示
    registerFormRef.value.clearValidate("confirmPassword");
  }
};

const registerFormRef = ref(null);

// 获取验证码的方法
const getVerificationCode = () => {
  if (!registerForm.value.email) {
    alert("请先输入邮箱地址");
    return;
  }

  // 这里添加发送验证码的API调用
  // TODO: 调用后端API发送验证码

  // 开始倒计时
  countdown.value = 60;
  timer.value = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer.value);
    }
  }, 1000);
};

// 组件卸载时清除定时器
onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
});

//注册逻辑
const handleRegister = async () => {
  const UserRegistration = {
    username: registerForm.value.username,
    email: registerForm.value.email,
    password: registerForm.value.password,
    password_confirm: registerForm.value.confirmPassword,
    verificationCode: registerForm.value.verificationCode,
  };
  //验证表单
  const isValid = await registerFormRef.value.validate();
  if (isValid) {
    try {
      const response = await axios.post(
        "https://cmheelzvjfkx.sealoshzh.site/users/register",
        UserRegistration
      );
      console.log("注册成功");
      console.log(response);
      //跳转到主界面,注册完成后先不保存token,而是在登录时保存
      router.push("/");
    } catch (error) {
      console.error("注册错误:", error);
    }
  }
};

const goToLogin = () => {
  router.push("/");
};
</script>

<style scoped>
.register-box {
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

.register-box p:first-child {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.register-box .user-box {
  position: relative;
}

.register-box .user-box input {
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

.register-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.register-box .user-box input:focus ~ label,
.register-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #fff;
  font-size: 12px;
}

.register-box form a {
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
  margin-top: 40px;
  letter-spacing: 3px;
  cursor: pointer;
}

.register-box a:hover {
  background: #fff;
  color: #272727;
  border-radius: 5px;
}

.register-box a span {
  position: absolute;
  display: block;
}

.register-box a span:nth-child(1) {
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

.register-box a span:nth-child(2) {
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

.register-box a span:nth-child(3) {
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

.register-box a span:nth-child(4) {
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

.register-box p:last-child {
  color: #aaa;
  font-size: 14px;
}

.register-box a.a2 {
  color: #fff;
  text-decoration: none;
  margin: 0;
  padding: 0;
  display: inline;
}

.register-box a.a2:hover {
  background: transparent;
  color: #aaa;
  border-radius: 5px;
}

/* 与登录页面相同的 Element Plus 样式覆盖 */
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

.verification-box {
  display: flex;
  align-items: center;
}

.verification-input {
  flex: 1;
  margin-right: 10px;
}

.verification-button {
  width: 120px;
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
}

.verification-button:hover:not(:disabled) {
  background: #fff;
  color: #272727;
}

.verification-button:disabled {
  border-color: #666;
  color: #666;
  cursor: not-allowed;
}
</style>
