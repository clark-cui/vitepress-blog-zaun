<template>
  <div class="feature">
    <article>
      <p>工具是第一生产力</p>
      <p>
        使用什么样的工具，就能做什么样的事。用工具的最佳实践来学习，往往能很快掌握一个领域
        80%的知识。
      </p>
      <p>
        重点是快速上手工具的能力，而不是死扣一个工具的细枝末节，投入与回报比例很低，也有工具过时的风险。
      </p>
    </article>
    <article>
      <p>Tools are the first productivity</p>
      <p>
        what you do with the tools you use is what you do. Learning with the
        best practices of tools often leads to a quick mastery of 80% of a
        field's knowledge.
      </p>
      <p>
        The focus is on the ability to get up to speed with a tool
        quickly.Instead of sticking to the nitty-gritty of a tool, the ratio of
        input to return is low, and there is a risk of tool obsolescence.
      </p>
    </article>
  </div>
</template>
<script lang="ts" setup>
</script>
<style scoped>
.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

article {
  display: block;
  border-radius: 10px;
  padding: 0 20px;
  margin: 10px;
  background: #fff;
  max-width: 600px;

  box-shadow: 6px 6px var(--c-brand);
  border: 4px solid #282936;
}
p {
  line-height: 1.6;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>