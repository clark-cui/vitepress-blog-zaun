<template>
  <Layout>
    <template #doc-before>
      <Title />
      <Category />
    </template>
    <template #doc-after>
      <div>
        <button @click="goBack">cd ..</button>
      </div>
      <Comments />
    </template>
    <template #home-hero-before>
      <HomeHero />
    </template>
    <template #home-features-after>
      <Page />
    </template>
    <template v-if="isNotesPage" #page-top>
      <NotesLayout />
    </template>
  </Layout>
  <CopyWright />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HomeHero from './HomeHero.vue'
import CopyWright from './CopyWright.vue'
import Comments from './Comments.vue'
import Page from './Page.vue'
import Category from './Category.vue'
import Title from './Title.vue'
import NotesLayout from './NotesLayout.vue'

const { Layout } = DefaultTheme
const { page } = useData()

const isNotesPage = computed(() => page.value.relativePath.startsWith('notes/'))

function goBack(): void {
  history.back()
}
</script>

<style scoped>
button {
  display: inline-block;
  position: relative;
  color: var(--vp-c-color-d);
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
}

button::after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--vp-c-color-d);
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}
button:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
