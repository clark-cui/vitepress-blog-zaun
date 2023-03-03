<template>
  <div class="shareCard">
    <h1 class="title">
      <span>Hi! Here is Tea Blog 👋</span>
    </h1>
    <p class="description">
      茶博客，一个休闲娱乐的小地方。
    </p>
  </div>
</template>

<script lang="ts" setup></script>
<style scoped>
.shareCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  text-align: center;
}
.title {
  display: flex;
  align-items: center;
  font-size: 2.2em;
  font-weight: bold;
}
.description {
  margin: 1em 0;
}
</style>
