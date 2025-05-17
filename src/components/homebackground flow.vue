<template>
  <div class="background-container">
    <div class="image-container">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        :class="{ active: currentIndex === index }"
        class="background-image"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const currentIndex = ref(0);
const images = ref([
  "/src/assets/img/background.svg",
  "/src/assets/img/campus.svg",
  "/src/assets/img/more_mas.svg",
]);

let timer = null;

const startSlideshow = () => {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.value.length;
  }, 3000);
};

onMounted(() => {
  startSlideshow();
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style>
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.background-image.active {
  opacity: 1;
}
</style>
