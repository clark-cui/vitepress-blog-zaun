<template>
  <nav class="notes-sidebar">
    <div class="sidebar-header">
      <svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
      <span>Notes</span>
    </div>
    <div v-for="category in notesSidebar" :key="category.name" class="sidebar-group">
      <div
        class="group-title"
        :class="{ expanded: expandedGroups.has(category.name) }"
        @click="toggleGroup(category.name)"
      >
        <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span>{{ category.name }}</span>
      </div>
      <transition name="collapse">
        <ul v-show="expandedGroups.has(category.name)" class="group-items">
          <li v-for="item in category.items" :key="item.path">
            <a
              :href="withBase(item.path)"
              class="sidebar-link"
              :class="{ active: isActive(item.path) }"
            >
              {{ cleanTitle(item.title) }}
            </a>
          </li>
        </ul>
      </transition>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'
import type { NoteCategory } from '../serverUtils'

const { theme, page } = useData()
const route = useRoute()
const notesSidebar = (theme.value.notesSidebar ?? []) as NoteCategory[]

const expandedGroups = ref(new Set<string>())

function toggleGroup(name: string): void {
  if (expandedGroups.value.has(name)) {
    expandedGroups.value.delete(name)
  } else {
    expandedGroups.value.add(name)
  }
  // Force reactivity
  expandedGroups.value = new Set(expandedGroups.value)
}

function isActive(path: string): boolean {
  const currentPath = `/${page.value.relativePath.replace('.md', '.html')}`
  return currentPath === path
}

function cleanTitle(title: string): string {
  // Remove leading number prefix like "01-", "02-" etc.
  return title.replace(/^\d+-/, '')
}

function expandCurrentCategory(): void {
  const currentPath = `/${page.value.relativePath.replace('.md', '.html')}`
  for (const category of notesSidebar) {
    if (category.items.some((item) => item.path === currentPath)) {
      expandedGroups.value.add(category.name)
      expandedGroups.value = new Set(expandedGroups.value)
      break
    }
  }
}

// Auto-expand on initial load and on SPA navigation
expandCurrentCategory()
watch(() => route.path, expandCurrentCategory)
</script>

<style scoped>
.notes-sidebar {
  width: 100%;
  padding: 16px 0;
}
.sidebar-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px 12px;
  font-size: 1.1em;
  font-weight: 700;
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 8px;
}
.sidebar-icon {
  width: 20px;
  height: 20px;
  color: var(--vp-c-brand);
}
.sidebar-group {
  margin-bottom: 2px;
}
.group-title {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 0.9em;
  font-weight: 600;
  color: var(--vp-c-text-1);
  cursor: pointer;
  border-radius: 6px;
  margin: 0 8px;
  transition: background-color 0.2s;
  user-select: none;
}
.group-title:hover {
  background-color: var(--vp-c-bg-soft);
}
.chevron {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  transition: transform 0.25s;
  color: var(--vp-c-text-3);
}
.group-title.expanded .chevron {
  transform: rotate(90deg);
}
.group-items {
  list-style: none;
  padding: 0 8px;
  margin: 0;
  overflow: hidden;
}
.sidebar-link {
  display: block;
  padding: 6px 16px 6px 38px;
  font-size: 0.85em;
  color: var(--vp-c-text-2);
  border-radius: 6px;
  transition: color 0.2s, background-color 0.2s;
  text-decoration: none;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sidebar-link:hover {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft);
  text-decoration: none;
}
.sidebar-link.active {
  color: var(--vp-c-brand);
  font-weight: 600;
  background-color: var(--vp-c-bg-soft);
}

/* collapse transition */
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.25s ease;
  max-height: 1000px;
}
.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
