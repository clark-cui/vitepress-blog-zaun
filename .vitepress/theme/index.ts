import Theme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import { inBrowser } from 'vitepress'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import '@shikijs/vitepress-twoslash/style.css'

import Archives from './components/Archives.vue'
import AboutMe from './components/AboutMe.vue'
import MyLayout from './components/MyLayout.vue'
import './custom.css'

// Client-side mermaid rendering
async function renderMermaid(): Promise<void> {
  const elements = document.querySelectorAll('pre.mermaid')
  if (elements.length === 0) return

  const { default: mermaid } = await import('mermaid')
  const isDark = document.documentElement.classList.contains('dark')
  mermaid.initialize({
    startOnLoad: false,
    theme: isDark ? 'dark' : 'default',
  })
  await mermaid.run({ nodes: elements as any })
}

export default {
  extends: Theme,
  Layout: MyLayout,
  enhanceApp({ app, router }: EnhanceAppContext) {
    app.component('Archives', Archives)
    app.component('AboutMe', AboutMe)
    app.use(TwoslashFloatingVue)

    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        // Wait for DOM to update then render mermaid
        setTimeout(renderMermaid, 100)
      }
    }
  },
}
