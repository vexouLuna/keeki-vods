<script setup lang="ts">
// From / to dates (typed or picked: KDateInput) with quick presets. Values are ISO dates (YYYY-MM-DD); an empty one is
// open-ended.
import { isoDate as iso } from '@vex/ui/utils'
import KDateInput from './KDateInput.vue'

defineProps<{ min?: string; max?: string }>()
const from = defineModel<string>('from', { default: '' })
const to = defineModel<string>('to', { default: '' })

const PRESETS = [
  { label: '7 days', days: 7 },
  { label: '30 days', days: 30 },
  { label: 'This year', days: -1 },
  { label: 'All', days: 0 },
]

function apply(days: number) {
  const now = new Date()
  if (days === 0) {
    from.value = ''
    to.value = ''
  } else if (days < 0) {
    from.value = `${now.getFullYear()}-01-01`
    to.value = iso(now)
  } else {
    from.value = iso(new Date(now.getTime() - days * 86400000))
    to.value = iso(now)
  }
}
</script>

<template>
  <div class="range">
    <div class="row">
      <KDateInput v-model="from" class="end" :min="min" :max="to || max" aria-label="From" />
      <span class="k-muted" aria-hidden="true">→</span>
      <KDateInput v-model="to" class="end" :min="from || min" :max="max" aria-label="To" />
    </div>
    <div class="presets">
      <button v-for="p in PRESETS" :key="p.label" type="button" class="k-chip" @click="apply(p.days)">{{ p.label }}</button>
    </div>
  </div>
</template>

<style scoped>
.range { display: flex; flex-direction: column; gap: var(--k-space-4); }
.row { display: flex; align-items: center; gap: var(--k-space-2); }
.end { flex: 1 1 0; }
.end :deep(.k-input) { padding: 0 8px; font-size: var(--k-text-sm); }
.presets { display: flex; flex-wrap: wrap; gap: var(--k-space-2); }
</style>
