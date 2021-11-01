<script setup>
import DefaultTheme from "vitepress/theme";
const { Layout } = DefaultTheme;
import HomeHero from "./HomeHero.vue";
import HomeFeature from "./HomeFeature.vue";
</script>

<template>
  <Layout>
    <template #page-bottom>
      <footer>
        Designed by
        <a href="https://github.com/clark-cui/" target="_blank" title="作者"
          >clark-cui</a
        >
        | Copyright © 2019-2021 | MIT License
      </footer>
    </template>
    <template #home-hero> <HomeHero></HomeHero> </template>
    <template #home-features> <HomeFeature></HomeFeature> </template>
    <template #home-footer>
      <footer>
        Designed by
        <a href="https://github.com/clark-cui/" target="_blank" title="作者"
          >clark-cui</a
        >
        | Copyright © 2019-2021 | MIT License
      </footer>
    </template>
  </Layout>
</template>
<style scoped>
footer {
  text-align: center;
}
a {
  color: #646cff;
  font-weight: bold;
}
</style>