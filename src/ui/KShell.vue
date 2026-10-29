<script setup lang="ts">
// UiShell in the Keeki Archives look: the header (name, ケーキでちゅ, the app's `nav`, then the `actions` and
// `account` slots), the page in <main>, and the footer, which links to vexoul.net only as the site's maker.
// `fill`: the watch page, as wide as the window and exactly its height (the player and chat size themselves to it),
// with no footer; `header` false hides the header (theater mode). `sky` is Deep Field's star sky: no such thing here.
import { RouterLink } from 'vue-router'
import KToastHost from './KToastHost.vue'
import type { NavItem } from './types'

withDefaults(defineProps<{ nav: NavItem[]; fill?: boolean; header?: boolean; sky?: 'full' | 'dim' | 'off' }>(), {
  fill: false,
  header: true,
  sky: undefined,
})
</script>

<template>
  <div class="site" :class="{ 'is-fill': fill }">
    <a class="skip k-btn is-primary" href="#main">Skip to content</a>
    <header v-if="header" class="head">
      <div class="head-in">
        <RouterLink to="/" class="brand">
          <span class="name">Keeki Archives</span>
          <span class="jp" lang="ja">ケーキでちゅ</span>
        </RouterLink>
        <div class="end">
          <nav aria-label="Main" class="nav">
            <template v-for="n in nav" :key="n.label">
              <RouterLink v-if="n.to" v-slot="{ href, navigate, isActive }" :to="n.to" custom>
                <a
                  :href="href"
                  :class="{ on: n.current ?? isActive }"
                  :aria-current="(n.current ?? isActive) ? 'page' : undefined"
                  @click="navigate"
                >{{ n.label }}</a>
              </RouterLink>
              <a v-else :href="n.href" :target="n.external ? '_blank' : undefined" :rel="n.external ? 'noopener' : undefined"
                >{{ n.label }}<span v-if="n.external" aria-hidden="true"> ↗</span></a>
            </template>
          </nav>
          <slot name="actions"></slot>
          <slot name="account"></slot>
        </div>
      </div>
    </header>

    <main id="main" class="main" tabindex="-1">
      <slot></slot>
    </main>

    <footer v-if="!fill" class="foot">
      <div class="foot-in">
        <span>A fan archive of keeki_dechu's streams.</span>
        <span>Made by <a href="https://vexoul.net">vexoul.net</a></span>
      </div>
    </footer>
    <KToastHost />
  </div>
</template>

<style scoped>
.site { min-height: 100vh; min-height: 100dvh; display: flex; flex-direction: column; }
/* Fill is capped at the window, or the chat replay's growing list stretches the row and the video with it. */
.site.is-fill { height: 100vh; height: 100dvh; }
.skip { position: absolute; left: 16px; top: -100px; z-index: 2000; }
.skip:focus { top: 12px; }

.head { border-bottom: 1px solid var(--k-line); }
.head-in {
  max-width: 1200px; margin: 0 auto; padding: 12px 24px; display: flex; flex-wrap: wrap; align-items: center;
  justify-content: space-between; gap: var(--k-space-3) 16px;
}
.is-fill .head-in { max-width: none; }
.brand { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0 12px; margin-right: auto; color: var(--k-ink); text-decoration: none; }
.name { font-family: var(--k-display); font-weight: 900; font-size: 22px; letter-spacing: 0.04em; text-transform: uppercase; line-height: 1.1; }
.jp { font-size: var(--k-text-sm); color: var(--k-muted); }
.nav {
  display: flex; flex-wrap: wrap; gap: var(--k-space-1); font-family: var(--k-display); font-weight: 700;
  font-size: var(--k-text-lg); letter-spacing: 0.06em; text-transform: uppercase;
}
.end { display: flex; flex-wrap: wrap; align-items: center; gap: var(--k-space-2) 12px; margin-left: auto; }
.nav a { display: block; padding: 6px 10px; color: var(--k-ink); text-decoration: none; }
.nav a:hover { color: var(--k-accent); }
.nav a.on { color: var(--k-accent); }

.main {
  container: vods / inline-size; flex: 1 0 auto; width: 100%; max-width: 1200px; margin: 0 auto;
  padding: 24px 24px 56px; outline: none;
}
.is-fill .main { flex: 1 1 0; max-width: none; padding: 0; display: flex; flex-direction: column; min-height: 0; }

.foot { border-top: 1px solid var(--k-line); }
.foot-in {
  max-width: 1200px; margin: 0 auto; padding: 20px 24px; display: flex; flex-wrap: wrap; justify-content: space-between;
  gap: var(--k-space-5); font-size: var(--k-text-sm); color: var(--k-muted);
}
@media (max-width: 560px) {
  .head-in, .main, .foot-in { padding-left: 16px; padding-right: 16px; }
}
</style>
