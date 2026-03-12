<template>
<!-- Desktop sidebar (grid column 1) -->
<aside class="notes-sidebar-panel">
<NotesSidebar />
</aside>

<!-- Desktop outline (grid column 3) -->
<aside class="notes-outline-panel">
<NotesOutline />
</aside>

<!-- Mobile bar (visible only on small screens) -->
<div class="notes-mobile-bar">
<button class="notes-mobile-btn" @click="showSidebar = true" aria-label="Open sidebar">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
</svg>
<span>Menu</span>
</button>
<button class="notes-mobile-btn" @click="showOutline = true" aria-label="Open outline">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
<line x1="8" y1="6" x2="21" y2="6" />
<line x1="8" y1="12" x2="21" y2="12" />
<line x1="8" y1="18" x2="21" y2="18" />
<line x1="3" y1="6" x2="3.01" y2="6" />
<line x1="3" y1="12" x2="3.01" y2="12" />
<line x1="3" y1="18" x2="3.01" y2="18" />
</svg>
<span>Outline</span>
</button>
</div>

<!-- Mobile drawers -->
<teleport to="body">
<transition name="notes-drawer-fade">
<div v-if="showSidebar" class="notes-drawer-overlay" @click="showSidebar = false" />
</transition>
<transition name="notes-drawer-slide-left">
<div v-if="showSidebar" class="notes-drawer notes-drawer-left">
<div class="notes-drawer-header">
<span>Notes</span>
<button class="notes-drawer-close" @click="showSidebar = false" aria-label="Close">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
<line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
</svg>
</button>
</div>
<div class="notes-drawer-body" @click="onDrawerLinkClick">
<NotesSidebar />
</div>
</div>
</transition>

<transition name="notes-drawer-fade">
<div v-if="showOutline" class="notes-drawer-overlay" @click="showOutline = false" />
</transition>
<transition name="notes-drawer-slide-right">
<div v-if="showOutline" class="notes-drawer notes-drawer-right">
<div class="notes-drawer-header">
<span>Outline</span>
<button class="notes-drawer-close" @click="showOutline = false" aria-label="Close">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
<line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
</svg>
</button>
</div>
<div class="notes-drawer-body" @click="onDrawerLinkClick">
<NotesOutline />
</div>
</div>
</transition>
</teleport>
</template>

<script lang="ts" setup>
import { ref, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import NotesSidebar from './NotesSidebar.vue'
import NotesOutline from './NotesOutline.vue'

const showSidebar = ref(false)
const showOutline = ref(false)
const route = useRoute()

let resizeObserver: ResizeObserver | null = null
let mutationObserver: MutationObserver | null = null

function updateMobileBarTop(): void {
const localNav = document.querySelector('.VPLocalNav') as HTMLElement | null
const localNavHeight = localNav ? localNav.offsetHeight : 0
document.documentElement.style.setProperty(
'--notes-mobile-bar-top',
`${localNavHeight}px`
)
}

function syncMobileBarTop(): void {
updateMobileBarTop()

// Watch for VPLocalNav appearing/disappearing (it uses v-if)
const layout = document.querySelector('.Layout')
if (!layout) return

mutationObserver = new MutationObserver(() => {
// Re-attach ResizeObserver when VPLocalNav appears
resizeObserver?.disconnect()
const localNav = document.querySelector('.VPLocalNav') as HTMLElement | null
if (localNav) {
resizeObserver = new ResizeObserver(updateMobileBarTop)
resizeObserver.observe(localNav)
}
updateMobileBarTop()
})
mutationObserver.observe(layout, { childList: true })
}

/**
* VPPage renders <Content /> without the .vp-doc class.
* The .vp-doc class is what provides all markdown typography styles
* (headings, code blocks, lists, tables, etc.).
* We need to add it manually so notes render like blog posts.
*/
function applyVpDocClass(): void {
nextTick(() => {
const vpPage = document.querySelector('.VPPage')
if (!vpPage) return
for (const child of Array.from(vpPage.children)) {
if (
!child.classList.contains('notes-sidebar-panel') &&
!child.classList.contains('notes-outline-panel') &&
!child.classList.contains('notes-mobile-bar') &&
!child.classList.contains('vp-doc')
) {
child.classList.add('vp-doc')
}
}
})
}

onMounted(() => {
applyVpDocClass()
syncMobileBarTop()
})
onUnmounted(() => {
resizeObserver?.disconnect()
mutationObserver?.disconnect()
})
watch(() => route.path, () => nextTick(applyVpDocClass))

function onDrawerLinkClick(e: MouseEvent): void {
const target = e.target as HTMLElement
if (target.tagName === 'A' || target.closest('a')) {
showSidebar.value = false
showOutline.value = false
}
}
</script>

<style>
/*
Global (unscoped) styles:
Notes pages use layout: page → VPPage wraps Content.
NotesLayout is a fragment component (multiple root elements) injected
via the #page-top slot, so its children are direct children of .VPPage.
We use :has() to detect the notes layout and apply CSS grid.
*/

/* Three-column grid on desktop */
.VPPage:has(.notes-sidebar-panel) {
display: grid;
grid-template-columns: 260px 1fr 220px;
grid-template-rows: auto;
max-width: 1440px;
margin: 0 auto;
min-height: calc(100vh - var(--vp-nav-height, 64px));
}

/* Sidebar: column 1, spans all rows */
.notes-sidebar-panel {
grid-column: 1;
grid-row: 1 / 20;
border-right: 1px solid var(--vp-c-divider);
position: sticky;
top: var(--vp-nav-height, 64px);
height: calc(100vh - var(--vp-nav-height, 64px));
overflow-y: auto;
overflow-x: hidden;
}

/* Outline: column 3, spans all rows */
.notes-outline-panel {
grid-column: 3;
grid-row: 1 / 20;
border-left: 1px solid var(--vp-c-divider);
position: sticky;
top: var(--vp-nav-height, 64px);
height: calc(100vh - var(--vp-nav-height, 64px));
overflow-y: auto;
overflow-x: hidden;
}

/* Content (.vp-doc): column 2 */
.VPPage:has(.notes-sidebar-panel) > .vp-doc {
grid-column: 2;
grid-row: 1 / 20;
padding: 24px 32px 64px;
min-width: 0;
}

/* Mobile bar: hidden on desktop */
.notes-mobile-bar {
display: none;
}

/* Medium screens: hide outline, two-column */
@media (max-width: 1200px) {
.VPPage:has(.notes-sidebar-panel) {
grid-template-columns: 260px 1fr;
}
.notes-outline-panel {
display: none;
}
.VPPage:has(.notes-sidebar-panel) > .vp-doc {
grid-column: 2;
}
}

/* Small screens: single column with mobile bar */
@media (max-width: 960px) {
.VPPage:has(.notes-sidebar-panel) {
display: block;
}
.notes-sidebar-panel,
.notes-outline-panel {
display: none;
}
.notes-mobile-bar {
display: flex;
position: sticky;
top: var(--notes-mobile-bar-top, 0px);
z-index: 10;
background: var(--vp-c-bg);
border-bottom: 1px solid var(--vp-c-divider);
padding: 8px 16px;
gap: 12px;
}
.VPPage:has(.notes-sidebar-panel) > .vp-doc {
padding: 16px 20px 64px;
}
}

/* Mobile buttons */
.notes-mobile-btn {
display: inline-flex;
align-items: center;
gap: 6px;
padding: 6px 14px;
font-size: 0.85em;
font-weight: 500;
color: var(--vp-c-text-2);
background: var(--vp-c-bg-soft);
border: 1px solid var(--vp-c-divider);
border-radius: 8px;
cursor: pointer;
transition: color 0.2s, background-color 0.2s;
}
.notes-mobile-btn:hover {
color: var(--vp-c-brand);
background: var(--vp-c-bg-elv);
}
/* ===== Drawer ===== */
.notes-drawer-overlay {
position: fixed;
inset: 0;
background: rgba(0, 0, 0, 0.45);
z-index: 200;
}
.notes-drawer {
position: fixed;
top: 0;
bottom: 0;
width: 300px;
max-width: 85vw;
background: var(--vp-c-bg);
z-index: 201;
display: flex;
flex-direction: column;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}
.notes-drawer-left { left: 0; }
.notes-drawer-right { right: 0; }
.notes-drawer-header {
display: flex;
align-items: center;
justify-content: space-between;
padding: 16px;
font-weight: 700;
color: var(--vp-c-text-1);
border-bottom: 1px solid var(--vp-c-divider);
}
.notes-drawer-close {
display: flex;
align-items: center;
justify-content: center;
width: 32px;
height: 32px;
border-radius: 6px;
color: var(--vp-c-text-2);
cursor: pointer;
transition: background-color 0.2s, color 0.2s;
border: none;
background: none;
}
.notes-drawer-close:hover {
background: var(--vp-c-bg-soft);
color: var(--vp-c-text-1);
}
.notes-drawer-body {
flex: 1;
overflow-y: auto;
}

/* Drawer transitions */
.notes-drawer-fade-enter-active,
.notes-drawer-fade-leave-active {
transition: opacity 0.25s ease;
}
.notes-drawer-fade-enter-from,
.notes-drawer-fade-leave-to {
opacity: 0;
}
.notes-drawer-slide-left-enter-active,
.notes-drawer-slide-left-leave-active,
.notes-drawer-slide-right-enter-active,
.notes-drawer-slide-right-leave-active {
transition: transform 0.25s ease;
}
.notes-drawer-slide-left-enter-from,
.notes-drawer-slide-left-leave-to {
transform: translateX(-100%);
}
.notes-drawer-slide-right-enter-from,
.notes-drawer-slide-right-leave-to {
transform: translateX(100%);
}
</style>


