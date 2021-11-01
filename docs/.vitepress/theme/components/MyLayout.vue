<script setup>
import DefaultTheme from "vitepress/theme";
const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #page-bottom>
      <footer>
        Theme by
        <a
          href="https://github.com/clark-cui/homeSite"
          target="_blank"
          title="本站主题"
          >Fruits</a
        >
        | Copyright © 2019-2021
        <a href="https://github.com/clark-cui" target="_blank" title="作者"
          >clark-cui</a
        >
        | MIT License
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