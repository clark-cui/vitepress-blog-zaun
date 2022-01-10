<template>
  <Layout>
    <template #navbar-search> <ToggleTheme /></template>
    <template #page-top>
      <Title v-if="isPost" />
      <Category v-if="isPost" />
    </template>
    <template #page-bottom>
      <Comments v-if="isPost" />
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
const { Layout } = DefaultTheme;
import HomeHero from "./HomeHero.vue";
import CopyWright from "./CopyWright.vue";
import Comments from "./Comments.vue";
import Page from "./Page.vue";
import ToggleTheme from "./ToggleTheme.vue";
import Category from "./Category.vue";
import Title from "./Title.vue";
import { useData } from "vitepress";
import { computed } from "vue";
const isPost = computed(() => {
  console.log("compute");
  return useData().page.value.relativePath.indexOf("posts") > -1 ? true : false;
});
</script>
<style scoped>
</style>