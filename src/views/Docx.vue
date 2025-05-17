<template>
  <div class="background_container"></div>
  <div class="home_container">
    <div class="tietle_container">
      <div class="tietle_left">
        <div class="deepcolor_icon">
          <img alt="LOGO" src="../assets/img/afbalbatross.svg" />
        </div>
        <div class="deepcolor_name">{{ $t("messages.home_title") }}</div>
      </div>
      <div class="tietle_middle">
        <div class="hometab"><hometab /></div>
      </div>
      <div class="languagechange"><Languagechange /></div>
    </div>
  </div>
</template>

<script setup>
import icon from "../components/icon.vue";
import hometab from "../components/hometab.vue";
import Languagechange from "../components/Languagechange.vue";
</script>
