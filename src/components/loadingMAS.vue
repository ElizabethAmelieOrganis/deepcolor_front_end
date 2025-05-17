<template>
  <div v-show="isLoading" class="loading-overlay">
    <div class="loading-spinner"></div>
    <h1 class="loading-text">Connecting to MAS......</h1>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isLoading = ref(false);

defineExpose({
  isLoading
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
  z-index: 9999;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  background-image: url("../assets/img/afbalbatross.svg");
  transform: scale(2);
  animation: spin 1s linear infinite;
  background-repeat: no-repeat;
}
.loading-text{
  color: white;
}

@keyframes spin {
    0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>