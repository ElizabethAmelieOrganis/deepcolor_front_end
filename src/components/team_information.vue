<template>
  <div class="container">
    <div class="item">
      <div class="number">4</div>
      <div class="text">成员</div>
    </div>
    <div class="item">
      <div class="number">2</div>
      <div class="text">项目</div>
    </div>
    <div class="item">
      <div class="number">0</div>
      <div class="text">文件</div>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  background-color: #242424;
  padding: 10px;
  border-radius: 10px;
  width: auto;
  margin: 0 auto;
  position: relative;
}
.item {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  height: 60px;
  gap: 4px;
}
.number {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  line-height: 24px;
  margin: 0;
  height: 24px;
  display: flex;
  align-items: center;
}
.text {
  font-size: 14px;
  color: #c9c9c9;
  line-height: 14px;
  width: 46px;
  height: 14px;
  text-align: center;
  padding-right: 10px;
}
</style>
