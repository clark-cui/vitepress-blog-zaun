<template>
  <div class="pic">
    <picture>
      <img :src="avator" alt="" class="src" />
    </picture>
  </div>
</template>
<script lang="ts" setup>
import avator from "../../../public/avator.jpg";
</script>
<style scoped>
.pic {
  text-align: center;
}
</style>
