<script setup lang="ts">
// A page's heading: an eyebrow (the section), the title and actions on the right, with a line of text under it.
defineProps<{ title: string; eyebrow?: string }>()
</script>

<template>
  <header class="head">
    <div v-if="eyebrow" class="k-eyebrow">{{ eyebrow }}</div>
    <h1 class="k-display title"><slot name="title">{{ title }}</slot></h1>
    <div v-if="$slots.actions" class="actions"><slot name="actions"></slot></div>
    <div v-if="$slots.default" class="text k-muted"><slot></slot></div>
  </header>
</template>

<style scoped>
.head { display: flex; flex-wrap: wrap; align-items: flex-end; gap: var(--k-space-1) 16px; margin-bottom: 20px; }
.head > .k-eyebrow, .text { flex-basis: 100%; }
.title { font-size: 28px; margin: 0; flex: 1 1 auto; overflow-wrap: anywhere; }
.actions { display: flex; gap: var(--k-space-3); flex-wrap: wrap; }
.text { font-size: var(--k-text-md); }
</style>
