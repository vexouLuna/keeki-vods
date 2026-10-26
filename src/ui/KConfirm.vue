<script setup lang="ts">
// "Are you sure?" on KDialog: what happens in the body, Cancel and the confirming button. It stays open while
// `loading`, and can't be dismissed then. `confirmText` asks for that text to be typed first (a VOD id).
import { computed, ref, useId, watch } from 'vue'
import KButton from './KButton.vue'
import KDialog from './KDialog.vue'
import KInput from './KInput.vue'

const props = withDefaults(
  defineProps<{
    title: string
    confirmLabel?: string
    cancelLabel?: string
    tone?: 'default' | 'danger'
    loading?: boolean
    confirmText?: string
    confirmIgnoreCase?: boolean
    width?: string
  }>(),
  { confirmLabel: 'Confirm', cancelLabel: 'Cancel', tone: 'default', loading: false, confirmIgnoreCase: false, width: '420px' },
)
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ confirm: [] }>()
const typed = ref('')
const id = useId()
watch(open, () => (typed.value = ''))
const same = (a: string, b: string) => (props.confirmIgnoreCase ? a.toLowerCase() === b.toLowerCase() : a === b)
const ready = computed(() => !props.confirmText || same(typed.value.trim(), props.confirmText))

function confirm() {
  if (ready.value && !props.loading) emit('confirm')
}
</script>

<template>
  <KDialog v-model:open="open" :title="title" :width="width" :dismissable="!loading">
    <slot></slot>
    <form v-if="confirmText" class="type" @submit.prevent="confirm">
      <label :for="id">Type <code class="k-mono">{{ confirmText }}</code> to confirm.</label>
      <KInput :id="id" v-model="typed" mono autocomplete="off" spellcheck="false" :disabled="loading" />
    </form>
    <template #actions="{ close }">
      <KButton :disabled="loading" @click="close">{{ cancelLabel }}</KButton>
      <KButton :variant="tone === 'danger' ? 'danger-solid' : 'primary'" :disabled="!ready" :loading="loading" @click="confirm">{{ confirmLabel }}</KButton>
    </template>
  </KDialog>
</template>

<style scoped>
.type { display: flex; flex-direction: column; gap: 6px; margin-top: 12px; color: var(--k-ink); }
</style>
