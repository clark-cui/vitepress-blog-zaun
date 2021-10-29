<template>
  <div class="">
    <div class="years" v-for="(year, index) in data">
      <div class="year">
        {{ year[0].frontMatter.date.split("-")[0] }}
      </div>

      <a
        v-show="!article.frontMatter.home"
        :href="article.regularPath || ''"
        v-for="(article, el) in year"
        :key="el"
        class="article"
      >
        <div class="title">
          <div class="title-o"></div>
          {{ article.frontMatter.title || "" }}
        </div>
        <div class="date">{{ article.frontMatter.date.slice(5) || "" }}</div>
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { withBase, useYearSort } from "vitepress/theme/utils";
import { usePageData, useSiteData } from "vitepress";

export default defineComponent({
  setup() {
    const siteData = useSiteData();

    const data = computed(() => useYearSort(siteData.value.themeConfig.pages));

    return {
      data,
    };
  },
});
</script>

<style scoped>
.header {
  color: #353535;
  font-size: 2rem;
  font-weight: 600;
  margin: 1rem 0;
  text-align: center;
}
.year {
  padding: 15px 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-color);
}
.article {
  padding: 2px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title-o {
  display: inline-block;
  margin-right: 10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #353535;
}
.title {
  color: #4a9ae1;
  font-size: 1.1rem;
}
.date {
  color: #ccc;
  font-size: 1rem;
}

@media screen and (max-width: 700px) {
  .header {
    font-size: 1.5rem;
  }
  .article {
    padding: 2px;
  }
  .date,
  .title {
    font-size: 0.9rem;
  }
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 18em;
  }
}
</style>
