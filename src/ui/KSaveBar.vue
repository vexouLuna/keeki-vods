<script setup lang="ts">
// The bar under a settings form: "N unsaved changes", Undo and Save. It sticks to the bottom of the screen while the
// form scrolls, and lights up while there's something to save. With `submit`, Save submits the form.
import { computed } from 'vue'
import KButton from './KButton.vue'
import KCallout from './KCallout.vue'

const props = withDefaults(
  defineProps<{
    count: number
    saving?: boolean
    blocked?: boolean
    error?: string | null
    submit?: boolean
    saveLabel?: string
    undoLabel?: string
  }>(),
  { saving: false, blocked: false, error: null, submit: false, saveLabel: 'Save', undoLabel: 'Undo changes' },
)
defineEmits<{ save: []; undo: [] }>()
const status = computed(() => (props.count ? `${props.count} unsaved ${props.count === 1 ? 'change' : 'changes'}` : 'No changes'))
</script>

<template>
  <div class="savebar k-panel" :class="{ 'is-on': count > 0 || error }">
    <KCallout v-if="error" tone="error" title="Nothing was saved" class="err">{{ error }}</KCallout>
    <span class="k-muted" role="status">{{ status }}</span>
    <span class="gap"></span>
    <KButton :disabled="!count || saving" @click="$emit('undo')">{{ undoLabel }}</KButton>
    <KButton variant="primary" :type="submit ? 'submit' : 'button'" :loading="saving" :disabled="!count || blocked" @click="submit || $emit('save')">
      {{ saveLabel }}
    </KButton>
  </div>
</template>

<style scoped>
.savebar {
  position: sticky; bottom: 12px; z-index: 5; display: flex; flex-wrap: wrap; align-items: center; gap: 8px;
  padding: 10px 14px; background: var(--k-bg);
}
.savebar.is-on { box-shadow: 0 0 0 1px var(--k-accent); }
.err { flex-basis: 100%; }
.gap { flex: 1; }
</style>
