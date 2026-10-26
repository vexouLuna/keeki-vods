<script setup lang="ts">
// Multi-line text, styled like KInput. Attributes and listeners go to the <textarea>; it grows by hand from `rows`.
withDefaults(
  defineProps<{ rows?: number; placeholder?: string; invalid?: boolean; disabled?: boolean; mono?: boolean }>(),
  { rows: 4, invalid: false, disabled: false, mono: false },
)
const model = defineModel<string>({ default: '' })
</script>

<template>
  <textarea
    v-model="model"
    class="k-input textarea"
    :class="{ 'k-mono': mono }"
    :rows="rows"
    :placeholder="placeholder"
    :disabled="disabled"
    :aria-invalid="invalid || undefined"
  ></textarea>
</template>

<style scoped>
.textarea { height: auto; padding: 6px 8px; resize: vertical; font: inherit; font-size: 13px; }
.textarea[aria-invalid='true'] { border-color: var(--k-bad); }
</style>
