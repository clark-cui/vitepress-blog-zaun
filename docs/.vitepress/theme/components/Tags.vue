<template>
  <div class="header">{{ selectTag }}</div>
  <a
    v-show="!article.frontMatter.home"
    :href="article.regularPath || ''"
    v-for="(article, el) in data[selectTag]"
    :key="el"
    class="article"
  >
    <div class="title">
      <div class="title-o"></div>
      {{ article.frontMatter.title || "" }}
    </div>
    <div class="date">{{ article.frontMatter.date.slice(5) || "" }}</div>
  </a>

  <div class="tags">
    <span
      @click="toggleTag(key)"
      v-for="(item, key, index) in data"
      class="tag"
    >
      {{ key }}
    </span>
  </div>
</template>

<script>
import { defineComponent, computed, watch, ref } from "vue";
import { withBase, initTags } from "vitepress/theme/utils";
import {
  usePageData,
  useSiteData,
  useRoute,
  useSiteDataByRoute,
} from "vitepress";

export default defineComponent({
  setup() {
    const siteData = useSiteData();
    const route = useRoute();
    const data = computed(() => initTags(siteData.value.themeConfig.pages));
    let selectTag = ref("");
    const toggleTag = (tag) => {
      selectTag.value = tag;
    };

    return {
      data,
      route,
      toggleTag,
      selectTag,
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
.tags {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.tag {
  display: inline-block;
  padding: 4px 16px;
  margin: 0 16px 12px 0;
  font-size: 14px;
  line-height: 25px;
  background-color: #fafafa;
  transition: 0.4s;
  color: #4a9ae1;
  cursor: pointer;
}
.year {
  padding: 15px 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-color);
}
.article {
  padding: 2px 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
}

.article:hover .date {
  color: #000;
}
.article:hover .title {
  color: #2b90c1;
}
.article:hover {
  text-decoration: none;
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

