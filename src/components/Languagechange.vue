<template>
  <div class="chooselanguage">
    <zn class="language_content" @click="changeLang('zh')" />
    <en class="language_content" @click="changeLang('en')" />
  </div>
</template>
<script setup>
import zn from "../components/chinese.vue";
import en from "../components/english.vue";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const changeLang = (type) => {
  locale.value = type;
  localStorage.setItem("lang", type);
};
</script>
<style scoped>
.chooselanguage {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: relative;
}
.language_content {
  cursor: pointer;
}
</style>
