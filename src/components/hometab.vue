<template>
  <loading v-show="showLoading" />
  <div class="hometab-container">
    <p class="hometab-item" @click="navigateWithLoading('/')">
      {{ $t("messages.hometab_home") }}
    </p>
    <p class="hometab-item" @click="navigateWithLoading('/about')">
      {{ $t("messages.hometab_about") }}
    </p>
    <p class="hometab-item" @click="navigateWithLoading('/contact')">
      {{ $t("messages.hometab_contact") }}
    </p>
    <p class="hometab-item" @click="navigateWithLoading('/docx')">
      {{ $t("messages.hometab_docx") }}
    </p>
  </div>
</template>
<script setup>
import router from "@/router";
import { ref } from "vue";
import loading from "./loading.vue";

const showLoading = ref(false);

const navigateWithLoading = (path) => {
  showLoading.value = true;
  setTimeout(() => {
    router.push(path);
    showLoading.value = false;
  }, 2000);
};
</script>
<style scoped>
.hometab-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 10px;
}
.hometab-item {
  color: white;
  font-size: 15px;
  margin: 15px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  cursor: pointer;
}
</style>
