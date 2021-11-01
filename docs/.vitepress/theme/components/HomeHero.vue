<template>
  <div class="pic"></div>
</template>
<script lang="ts" setup>
import avator from "../../../public/avator.jpg";
import { onMounted } from "vue";
import lottie from "lottie-web";
onMounted(() => {
  // storage lottie
  const svgContainer = document.getElementById("svgContainer");
  if (svgContainer) {
    return;
  }
  const insertNode = document.createElement("div");
  insertNode.id = "svgContainer";
  const pic = document.getElementsByClassName("pic")[0];
  pic.appendChild(insertNode);
  const animItem = lottie.loadAnimation({
    container: insertNode,
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
