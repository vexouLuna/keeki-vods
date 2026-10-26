<script setup lang="ts">
// Whatever a section shows while its data isn't there: the error with "Try again", skeleton rows while loading, or the
// empty state once loaded with nothing in it. `stale` keeps older data on screen under a warning when a refresh fails.
import KButton from './KButton.vue'
import KCallout from './KCallout.vue'
import KEmptyState from './KEmptyState.vue'
import KSkeleton from './KSkeleton.vue'

withDefaults(
  defineProps<{
    error?: unknown
    loading?: boolean
    empty?: boolean
    errorTitle?: string
    errorText?: (e: unknown) => string
    stale?: boolean
    staleTitle?: string
    rows?: number
    rowHeight?: string
    emptyTitle?: string
    emptyText?: string
  }>(),
  {
    loading: false,
    empty: false,
    errorTitle: "Couldn't load this",
    errorText: (e: unknown) => (e instanceof Error ? e.message : String(e)),
    stale: false,
    staleTitle: "Couldn't refresh, showing older data",
    rows: 4,
    rowHeight: '38px',
    emptyTitle: 'Nothing here yet',
  },
)
defineEmits<{ retry: [] }>()
</script>

<template>
  <template v-if="error && stale">
    <KCallout tone="warn" :title="staleTitle" class="stale">
      {{ errorText(error) }}
      <template #actions><KButton size="sm" @click="$emit('retry')">Try again</KButton></template>
    </KCallout>
    <slot></slot>
  </template>
  <KCallout v-else-if="error" tone="error" :title="errorTitle">
    {{ errorText(error) }}
    <template #actions><KButton size="sm" @click="$emit('retry')">Try again</KButton></template>
  </KCallout>
  <div v-else-if="loading" class="rows" role="status" aria-busy="true" aria-label="Loading">
    <slot name="loading"><KSkeleton v-for="i in rows" :key="i" :h="rowHeight" /></slot>
  </div>
  <slot v-else-if="empty" name="empty"><KEmptyState :title="emptyTitle" :text="emptyText" /></slot>
  <slot v-else></slot>
</template>

<style scoped>
.rows { display: flex; flex-direction: column; gap: 12px; }
.stale { margin-bottom: 16px; }
</style>
