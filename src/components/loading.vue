<template>
  <div v-show="isLoading" class="loading-overlay">
    <div class="loading-spinner"></div>
    <span class="loading-texts">DEEP·COLOR</span>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isLoading = ref(false);

defineExpose({
  isLoading,
});
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999999;
  flex-direction: column;
}

.loading-spinner {
  width: 500px;
  height: 500px;
  background-image: url("../assets/img/afbalbatross_logo.svg");
  background-size: cover;

  animation: spin 3s infinite ease;
  background-repeat: no-repeat;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.loading-texts {
  color: #ffffff;
  font-size: 80px;
  font-family: MyriadPro;
}
</style>
