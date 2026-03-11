<template>
  <nav v-if="headers.length > 0" class="notes-outline">
    <div class="outline-header">
      <svg class="outline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
      <span>Outline</span>
    </div>
    <ul class="outline-list">
      <li
        v-for="header in headers"
        :key="header.link"
        :class="`level-${header.level}`"
      >
        <a
          :href="header.link"
          class="outline-link"
          :class="{ active: activeId === header.link.slice(1) }"
          @click="scrollTo(header.link)"
        >
          {{ header.title }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { shallowRef, ref, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, onContentUpdated } from 'vitepress'
import { getHeaders } from '../utils'
import type { HeaderItem } from '../utils'

const route = useRoute()
const headers = shallowRef<HeaderItem[]>([])
const activeId = ref('')

let observer: IntersectionObserver | null = null

function setupObserver(): void {
  if (observer) observer.disconnect()

  const headingEls = headers.value
    .map((h) => document.getElementById(h.link.slice(1)))
    .filter(Boolean) as HTMLElement[]

  if (headingEls.length === 0) return

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    { rootMargin: '0px 0px -70% 0px', threshold: 0.1 },
  )

  for (const el of headingEls) {
    observer.observe(el)
  }
}

function refreshHeaders(): void {
  headers.value = getHeaders()
  setTimeout(setupObserver, 100)
}

function scrollTo(link: string): void {
  const el = document.querySelector(link)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onContentUpdated(refreshHeaders)
onMounted(refreshHeaders)

// Re-query headers on SPA navigation.
// Use nextTick to wait for the new page content and applyVpDocClass to settle.
watch(() => route.path, () => {
  nextTick(refreshHeaders)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.notes-outline {
  width: 100%;
  padding: 16px 0;
}
.outline-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px 12px;
  font-size: 0.9em;
  font-weight: 700;
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 8px;
}
.outline-icon {
  width: 16px;
  height: 16px;
  color: var(--vp-c-brand);
}
.outline-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.outline-list li {
  margin: 0;
}
.outline-list li.level-3 {
  padding-left: 12px;
}
.outline-list li.level-4 {
  padding-left: 24px;
}
.outline-list li.level-5,
.outline-list li.level-6 {
  padding-left: 36px;
}
.outline-link {
  display: block;
  padding: 4px 16px;
  font-size: 0.8em;
  color: var(--vp-c-text-2);
  text-decoration: none;
  border-left: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.6;
}
.outline-link:hover {
  color: var(--vp-c-brand);
  text-decoration: none;
}
.outline-link.active {
  color: var(--vp-c-brand);
  border-left-color: var(--vp-c-brand);
  font-weight: 500;
}
</style>
