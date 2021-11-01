<template>
  <div class="pic">
    <picture>
      <img :src="avator" alt="" class="src" />
    </picture>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import avator from "./avator.jpg";
export default defineComponent({
  setup() {
    console.log("home");
    return {
      avator,
    };
  },
});
</script>
<style scoped>
.pic {
  text-align: center;
}
</style>
