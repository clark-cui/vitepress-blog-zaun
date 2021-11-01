<template>
  <div class="pic">
    <div id="svgContainer"></div>
  </div>
</template>
<script lang="ts" setup>
import avator from "../../../public/avator.jpg";
import { onMounted } from "vue";
import lottie from "lottie-web";
onMounted(() => {
  const svgContainer = document.getElementById("svgContainer");
  const animItem = lottie.loadAnimation({
    container: svgContainer,
    renderer: "svg",
    loop: true,
    path: "https://labs.nearpod.com/bodymovin/demo/markus/isometric/markus2.json",
  });
});
</script>
<style scoped>
.pic {
  text-align: center;
}
#svgContainer {
  width: 300px;
  margin: 0 auto;
}
</style>
