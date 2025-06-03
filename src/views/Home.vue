<template>
  <div class="openAnime" v-if="isAnime"><openAnime /></div>
  <div class="background_container"></div>
  <div class="background_item">
    <img alt="petrel" src="../assets/img/Petrels.svg" />
  </div>
  <div @dblclick="exitLog" class="Logpop" v-if="isOpen"><Login /></div>
  <div class="home_container">
    <div class="tietle_container">
      <div class="tietle_left">
        <div class="deepcolor_icon">
          <img alt="LOGO" src="../assets/img/icon/afbalbatross.svg" />
        </div>
        <div class="deepcolor_name">{{ $t("messages.home_title") }}</div>
      </div>
      <div class="tietle_middle">
        <div class="hometab"><hometab /></div>
      </div>
      <div class="languagechange"><Languagechange /></div>
    </div>
    <div class="introduction_container">
      <h2 class="introduction1">{{ $t("messages.home_introduction1") }}</h2>
      <h1 class="introduction2">{{ $t("messages.home_introduction2") }}</h1>
      <h3 class="introduction3">{{ $t("messages.home_introduction3") }}</h3>
      <div @click="startLog" class="start_button">
        <StartButton />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import StartButton from "../components/StartButton.vue";
import Login from "../components/Login.vue";
import hometab from "../components/hometab.vue";
import Languagechange from "../components/Languagechange.vue";
import openAnime from "../components/openAnime.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { config } from "@/config";
const isOpen = ref(false);
const isAnime = ref(true);
const router = useRouter();
const authStore = useAuthStore();

async function forceCleanState() {
  console.log("🧹 强制清除所有登录状态以确保访客模式");
  // 清除localStorage
  try {
    localStorage.removeItem(config.auth.tokenKey);
    localStorage.removeItem(config.auth.refreshTokenKey);
    localStorage.removeItem("user");
    localStorage.removeItem("isEmailVerified");
    console.log("✅ localStorage已清除");
  } catch (error) {
    console.log("⚠️ localStorage清除失败:", error);
  }
  // 清除Auth Store状态
  authStore.clearAllState();
  console.log("✅ 强制清除完成，确保访客模式");
}

function startLog() {
  isOpen.value = true;
}
function exitLog() {
  isOpen.value = false;
}
onMounted(async () => {
  await forceCleanState();
  setTimeout(() => {
    isAnime.value = false;
  }, 4000);
});
</script>

<style>
body {
  margin: 0;
  background-color: black;
}
.background_item {
  position: absolute;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  opacity: 0.4;
  animation: fade-in 5s infinite;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 0;
  }
}
.background_container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/img/background/greatbackground.svg");
  z-index: 1;
  opacity: 1;
  pointer-events: none;
}
.home_container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 10;
}
.Logpop {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  justify-items: center;
  align-items: center;
  z-index: 200;
}
.tietle_container {
  position: relative;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 0px;
  padding-left: 0px;
  margin: 0;
  z-index: 10;
}
.tietle_left {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}
.deepcolor_name {
  font-size: 30px;
  font-family: "MyriadPro";
  color: white;
  position: relative;
}
.hometab {
  position: relative;
}
.introduction_container {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70%;
  margin-top: 20px;
  z-index: 10;
  width: 100%;
}
.languagechange {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.introduction1 {
  color: rgb(255, 255, 255);
  font-family: "MyriadPro";
  font-style: italic;
}
.introduction2 {
  font-size: 70px;
  margin: 0;
  font-family: "MyriadPro";
  font-weight: bold;
  color: rgb(255, 255, 255);
}
.introduction3 {
  color: rgb(255, 255, 255);
  font-family: "MyriadPro";
  font-style: italic;
  font-size: 20px;
}
.start_button {
  margin-top: 20px;
}
.footer_container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  gap: 10px;
}
.footer_up {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.footer_up_text {
  font-size: 15px;
  font-family: "KaiTi";
  color: white;
  font-weight: bold;
}
.footer_down {
  font-size: 15px;
  font-family: "KaiTi";
  color: white;
  font-weight: bold;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.introduction1,
.introduction2,
.introduction3 {
  opacity: 0;
  animation: fadeIn 3s ease-in forwards;
}

.introduction1 {
  animation-delay: 0.5s;
}

.introduction2 {
  animation-delay: 1s;
}

.introduction3 {
  animation-delay: 1.5s;
}
.openAnime {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
</style>
