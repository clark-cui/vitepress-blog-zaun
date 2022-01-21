<template>
  <div class="category" v-if="headers.length > 0">
    <ul>
      <li class="header" v-for="item in headers">
        <a :href="`#${item.slug}`" class="header-h1" v-if="item.level === 2">{{
          item.title
        }}</a>
        <ul v-if="item.level === 3">
          <li>
            <a :href="`#${item.slug}`" class="header-h2">{{ item.title }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { useData } from "vitepress";
const pageData = useData();
const headers = pageData.page.value.headers;
console.log(headers, "pageData");
</script>
<style scoped>
.category {
  width: 20rem;
  background: var(--c-bg);
  box-shadow: 6px 6px var(--c-brand);
  border: 4px solid #282936;
  color: var(--c-brand-light);
}
.header-h2 {
  text-indent: 2;
}
ul {
  list-style-type: none;
}
@media (min-width: 1400px) {
  .category {
    position: fixed;
    right: 20px;
  }
}
</style>

