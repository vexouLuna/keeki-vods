<script setup lang="ts">
// One thing's state at a glance (Manage's overview): what it is, a status dot and headline, a line under it, anything
// more in the slot, and a link on to the details.
import KLink from './KLink.vue'
import KStatusDot from './KStatusDot.vue'

withDefaults(
  defineProps<{
    label?: string
    status?: 'live' | 'ok' | 'warn' | 'caution' | 'down' | 'off'
    headline: string
    sub?: string
    to?: string
    href?: string
    linkLabel?: string
  }>(),
  { status: 'off', linkLabel: 'Details' },
)
</script>

<template>
  <div class="tile k-panel">
    <div v-if="label" class="k-eyebrow">{{ label }}</div>
    <div class="main"><KStatusDot :status="status" />{{ headline }}</div>
    <div v-if="sub" class="k-muted small">{{ sub }}</div>
    <slot></slot>
    <KLink v-if="to || href" :to="to" :href="href" class="link small">{{ linkLabel }}</KLink>
  </div>
</template>

<style scoped>
.tile { display: flex; flex-direction: column; gap: var(--k-space-2); padding: 14px 16px; align-items: flex-start; }
.main { display: flex; align-items: center; gap: var(--k-space-3); font-size: 16px; }
.link { color: var(--k-accent); text-decoration: underline; text-underline-offset: 2px; }
.link:hover { color: var(--k-ink); }
.small { font-size: var(--k-text-xs); }
</style>
