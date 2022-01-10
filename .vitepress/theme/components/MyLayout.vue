<template>
  <Layout>
    <template #navbar-search> <ToggleTheme /></template>
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
import Page from "./Page.vue";
import ToggleTheme from "./ToggleTheme.vue";
</script>
<style scoped>
</style>