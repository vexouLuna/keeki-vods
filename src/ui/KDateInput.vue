<script setup lang="ts">
// A date typed as text (`YYYY-MM-DD`), or with `time` a date and 24-hour time (`YYYY-MM-DD HH:mm`), never the
// browser's own order (09/30/2026). The calendar button opens the browser's picker. The value has the native inputs'
// shape (`2026-10-23`, `2026-10-23T14:05`; '' for none). Attributes go to the text input; class and style stay outside.
import { isoDate, parseDate, showDate } from '@vex/ui/utils'
import { computed, ref, useAttrs, watch, type StyleValue } from 'vue'

defineOptions({ inheritAttrs: false })
const props = withDefaults(
  defineProps<{ time?: boolean; min?: string; max?: string; placeholder?: string; invalid?: boolean; disabled?: boolean }>(),
  { time: false, invalid: false, disabled: false },
)
const model = defineModel<string>({ default: '' })
const attrs = useAttrs()
const inputAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})

const text = ref(showDate(model.value))
const bad = ref(false)
watch(model, (v) => {
  if (parseDate(text.value, props.time) !== v) text.value = showDate(v)
  bad.value = false
})

const inRange = (v: string) => (!props.min || v >= props.min) && (!props.max || v <= props.max)
function read(t: string): string | null {
  const v = parseDate(t, props.time)
  return v === null || (v && !inRange(v)) ? null : v
}
const whole = computed(() => (props.time ? /^\d{4}\D\d\d\D\d\d[ T]\d\d:\d\d/ : /^\d{4}\D\d\d\D\d\d$/))

function onInput(e: Event) {
  text.value = (e.target as HTMLInputElement).value
  const v = read(text.value)
  // Only a finished date updates the value, so "2026-10-2" on the way to "2026-10-24" isn't taken as the 2nd.
  if (v === '' || (v !== null && whole.value.test(text.value.trim()))) model.value = v
  bad.value = false
}
function commit() {
  const v = read(text.value)
  if (v === null) return void (bad.value = true)
  model.value = v
  text.value = showDate(v)
  bad.value = false
}

// The browser's picker, on a hidden native input; it only ever hands back ISO values.
const native = ref<HTMLInputElement | null>(null)
function openPicker() {
  try {
    native.value?.showPicker()
  } catch {
    native.value?.click()
  }
}
function picked(e: Event) {
  const v = (e.target as HTMLInputElement).value
  if (v) model.value = props.time ? v.slice(0, 16) : v
}
const today = () => isoDate(new Date())
</script>

<template>
  <span class="k-input-wrap date" :class="[attrs.class, { 'is-invalid': invalid || bad }]" :style="attrs.style as StyleValue">
    <input
      v-bind="inputAttrs"
      class="k-input k-mono"
      type="text"
      inputmode="numeric"
      autocomplete="off"
      spellcheck="false"
      :value="text"
      :placeholder="placeholder ?? (time ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD')"
      :disabled="disabled"
      :aria-invalid="invalid || bad || undefined"
      @input="onInput"
      @change="commit"
      @keydown.enter="commit"
    />
    <button type="button" class="k-btn is-ghost is-icon is-sm cal" :disabled="disabled" aria-label="Pick from a calendar" title="Pick from a calendar" @click="openPicker">▦</button>
    <input
      ref="native"
      class="native"
      :type="time ? 'datetime-local' : 'date'"
      :value="model || (time ? `${today()}T00:00` : today())"
      :min="min"
      :max="max"
      tabindex="-1"
      aria-hidden="true"
      @change="picked"
    />
  </span>
</template>

<style scoped>
.date { position: relative; }
.date.is-invalid { border-color: var(--k-bad); }
.cal { margin-right: 4px; }
.native { position: absolute; right: 0; bottom: 0; width: 1px; height: 1px; opacity: 0; pointer-events: none; border: 0; padding: 0; }
</style>
