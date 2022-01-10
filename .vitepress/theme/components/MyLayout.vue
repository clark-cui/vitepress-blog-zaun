<template>
  <Layout>
    <template #navbar-search> <ToggleTheme /></template>
    <template #page-top>
      <Category />
    </template>
    <template #page-bottom>
      <div id="gitalk-container"></div>
    </template>
    <!-- Home slot-->
    <template #home-hero><HomeHero /> </template>
    <template #home-features> <Page /></template>
  </Layout>
  <!-- copywright -->
  <CopyWright />
</template>
<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import Gitalk from "gitalk";
const { Layout } = DefaultTheme;
import HomeHero from "./HomeHero.vue";
import CopyWright from "./CopyWright.vue";
import Page from "./Page.vue";
import ToggleTheme from "./ToggleTheme.vue";
import Category from "./Category.vue";
const gitalk = new Gitalk({
  clientID: "94f8f287e970c48e2122",
  clientSecret: "2a3c7be462ddf835cff98c4ffa7add4ba229ad7e",
  repo: "blog-comment",
  owner: "clark-cui",
  admin: ["clark-cui"],
  id: decodeURI(window.location.pathname), // Ensure uniqueness and length less than 50
  language: "zh-CN",
  distractionFreeMode: true, // Facebook-like distraction free mode
});
</script>
<style scoped>
</style>