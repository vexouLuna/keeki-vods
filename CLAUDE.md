@.conventions/CLAUDE.md

# keeki-vods

keekivods.vexoul.net: keeki_dechu's VOD archive, "Keeki Archives". The pages, cards, menus, Manage and routing are
vods-core's app (`createVodsApp()` in `src/main.ts`); this repo is only its look. It is not part of the vexoul.net
network's Deep Field look: it never imports vods-core's `/deep-field` entry or @vex/ui's components and styles, only
@vex/ui's headless logic (`/utils`, `/account`); `tests/headless.test.ts` fails if it does. Published by
`publish.yml` to the `deploy` branch.

- A feature, layout or copy change goes to vods-core `src/app/`, then a release, then a bump here. Never copy a page
  or component back into this repo: that is the drift this setup exists to stop.
- What's this repo's: `src/ui/` (the `K*` controls, `KShell` with the header and footer, `KAccountMenu`), handed to
  the app as `keekiUi`; `src/theme.css` (the `--k-*` tokens and `.k-*` classes, the `--vods-*` tokens and `.vods-*`
  classes the app's pages use; dark only); `src/platform.css` (platform-web's `--vxp-*`); `src/art/` (the gorilla
  playhead). New colours, sizes and fonts become tokens in `theme.css`.
- Each `K*` control has the same props, events and slots as its `Vx*` twin in vex-ui: vods-core type-checks its
  templates against the `Vx*` ones, so a prop missing here is silently ignored. Check a new prop the app starts using.
- The archive API (twitch-archive) is read-only from here: ask for new endpoints there.
- Dev server in `.claude/launch.json`: `keeki-dev` (:5176) proxies `/backend` to the public archive API and
  serves `/backend-admin` from vods-core's mock.
