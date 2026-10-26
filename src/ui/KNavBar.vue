<script setup lang="ts">
// A section's own nav under the header (Manage: Overview · Jobs · …): a label, links with the current one marked, and
// `#trail` after them (who's signed in). It wraps on narrow screens; nothing is dropped.
import KLink from './KLink.vue'
import type { NavItem } from './types'

defineProps<{ links: NavItem[]; label: string; title?: string }>()
</script>

<template>
  <nav class="navbar k-panel" :aria-label="label">
    <span v-if="title" class="k-eyebrow title">{{ title }}</span>
    <slot name="lead"></slot>
    <div class="links">
      <KLink
        v-for="l in links"
        :key="l.to ?? l.href ?? l.label"
        :to="l.to"
        :href="l.href"
        class="link"
        :class="{ 'is-current': l.current }"
        :aria-current="l.current ? 'page' : undefined"
      >{{ l.label }}</KLink>
    </div>
    <div v-if="$slots.trail" class="trail k-muted"><slot name="trail"></slot></div>
  </nav>
</template>

<style scoped>
.navbar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 14px; padding: 8px 12px; margin: 0 0 20px; }
.title { margin: 0; }
.links { display: flex; flex-wrap: wrap; gap: 2px; }
.link { padding: 5px 10px; border-radius: var(--k-radius-sm); color: var(--k-muted); text-decoration: none; font-size: 13px; }
.link:hover { color: var(--k-ink); background: var(--k-surface-2); }
.link.is-current { color: var(--k-accent); background: var(--k-surface-2); }
.trail { margin-left: auto; min-width: 0; max-width: 100%; font-size: 12px; }
</style>
