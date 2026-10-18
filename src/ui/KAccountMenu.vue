<script setup lang="ts">
// UiAccountMenu in the Keeki Archives look (the same props, events and slot as vex-ui's VxAccountMenu). Signed out,
// "Sign in" (greyed out when sign-in is off or the account is still being checked); signed in, the name opens a menu: `note`, then the app's items
// (default slot), then "Sign out" (as VxAccountMenu; it ends every session).
import { initials } from '@vex/ui/utils'
import KButton from './KButton.vue'
import KMenuItem from './KMenuItem.vue'
import KPopover from './KPopover.vue'
import type { AccountUser } from './types'

withDefaults(defineProps<{ user?: AccountUser | null; disabled?: boolean; checking?: boolean; note?: string }>(), {
  user: null,
  disabled: false,
  checking: false,
  note: 'Signed in on vexoul.net',
})
const emit = defineEmits<{ signIn: []; signOut: [] }>()
</script>

<template>
  <KPopover v-if="user" align="right" width="220px">
    <template #trigger="{ toggle, open }">
      <button type="button" class="who" :class="{ open }" :aria-expanded="open" aria-haspopup="menu" @click="toggle">
        <img v-if="user.avatar" class="pic" :src="user.avatar" alt="" />
        <span v-else class="pic k-mono" aria-hidden="true">{{ initials(user.name) }}</span>
        <span class="name" :style="user.color ? { color: user.color } : undefined">{{ user.name }}</span>
        <span aria-hidden="true">▾</span>
      </button>
    </template>
    <template #default="{ close }">
      <div class="k-eyebrow head">{{ note }}</div>
      <slot :close="close"></slot>
      <KMenuItem @click="close(), emit('signOut')">Sign out</KMenuItem>
    </template>
  </KPopover>
  <KButton
    v-else
    size="sm"
    :disabled="disabled || checking"
    :title="checking ? 'Checking sign-in…' : disabled ? 'Sign-in is off on this copy of the site' : 'Sign in with Twitch, through vexoul.net: your watch progress follows you to any device'"
    @click="emit('signIn')"
  >Sign in</KButton>
</template>

<style scoped>
.who {
  display: inline-flex; align-items: center; gap: 7px; max-width: 220px; height: var(--k-control-sm); padding: 0 9px 0 3px;
  border: 1px solid var(--k-line); border-radius: var(--k-radius); background: var(--k-panel); color: var(--k-ink);
  font-size: 13px; cursor: pointer;
}
.who:hover, .who.open { border-color: var(--k-accent); }
.pic {
  flex: none; width: 22px; height: 22px; display: grid; place-items: center; object-fit: cover;
  background: var(--k-frame); color: var(--k-muted); font-size: 10px;
}
.name { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 600; }
.head { padding: 6px 8px; }
</style>
