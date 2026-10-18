import '@vex/platform-web/style.css'
import '@vex/vods-core/app.css'
import './theme.css'
import './platform.css'

import { createVodsApp } from '@vex/vods-core/app'

import SeekMarker from './art/SeekMarker.vue'
import { keekiUi, KNoPicture } from './ui'
import { site, USER_LOOKUP, vodsConfig } from './vods.config'

// The pages, player, chat replay and Manage are vods-core's app; this repo is its look: the K* controls and KShell
// (src/ui), theme.css, and the art (no thumbnail, the gorilla playhead).
// The quiet admin check asks vex-auth for a code for this archive's worker, whose client there is `keeki-admin`
// (its ARCHIVE_ADMIN_AUTH_CLIENT_ID); a code for vods' `vods-admin` is refused, and Manage never shows.
createVodsApp({
  config: vodsConfig,
  ui: keekiUi,
  site,
  adminBase: import.meta.env.VITE_ADMIN_API || '/backend-admin',
  authBase: import.meta.env.VITE_AUTH_BASE ?? 'https://auth.vexoul.net',
  adminClientId: 'keeki-admin',
  commit: __COMMIT__,
  art: { noThumbnail: KNoPicture, playhead: SeekMarker },
  userLookupUrl: USER_LOOKUP || undefined,
}).app.mount('#app')
