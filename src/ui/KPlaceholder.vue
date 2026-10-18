<script setup lang="ts">
// A stand-in for an image that isn't there (no thumbnail, no box art yet). `flush` drops the border and fills its box.
import { computed } from 'vue'

const props = withDefaults(defineProps<{ label?: string; w?: number | string; h?: number | string; ratio?: string; round?: boolean; flush?: boolean }>(), {
  label: 'img',
  round: false,
  flush: false,
})
const px = (v: number | string | undefined, fallback: string) => (v == null ? fallback : typeof v === 'number' ? `${v}px` : v)
const style = computed(() => ({ width: px(props.w, '100%'), height: px(props.h, props.flush ? '100%' : 'auto'), aspectRatio: props.ratio }))
</script>

<template>
  <div class="k-ph" :class="{ 'is-round': round, 'is-flush': flush }" :style="style" role="img" :aria-label="label"><span>{{ label }}</span></div>
</template>
