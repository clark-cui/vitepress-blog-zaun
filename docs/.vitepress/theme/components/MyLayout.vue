<template>
  <Layout>
    <!-- Home -->
    <template #home-hero><HomeHero /> </template>
    <template #home-features> <HomeFeature /> </template>
  </Layout>
  <!-- copywright -->
  <CopyWright />
</template>
<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
const { Layout } = DefaultTheme;
import HomeHero from "./HomeHero.vue";
import HomeFeature from "./HomeFeature.vue";
import CopyWright from "./CopyWright.vue";
</script>
<style scoped>
</style>