# keekivods.vexoul.net

[keeki_dechu](https://twitch.tv/keeki_dechu)'s VOD archive: past broadcasts with their YouTube uploads, a timeline
across all parts, and the Twitch chat replayed alongside.

It's "Keeki Archives": an old cinema with the lights down. This repo is only the look. The pages, cards, menus,
Manage and routing are [`@vex/vods-core`](https://github.com/vexouLuna/vods-core)'s app (`createVodsApp()` in
`src/main.ts`), shared with [vods.vexoul.net](https://github.com/vexouLuna/vex-vods); its logic (the API client, player and
chat replay state, list filters, tags, games) comes with it. A feature, layout or copy change goes to vods-core, then a
release, then a version bump here; a page is never copied back into this repo. The site isn't part of the vexoul.net
network and doesn't use its design: from `@vex/ui` it takes only the headless logic (`/utils`, `/account`). It links to
vexoul.net only as its maker.

- `src/vods.config.ts`: the channel, its Twitch id, the archive API and the site's name.
- `src/main.ts`: the styles, `setupVodsSite()`, the router and the vods plugin.
- `src/theme.css`: the tokens (blackout colours, type and spacing scales, Big Shoulders title boards, film-strip
  edges) and the `.k-*` classes. Dark only. `src/platform.css`: platform-web's `--vxp-*` colours.
- `src/ui/`: the controls (`KButton`, `KPopover`, `KIcon`, …), handed to the app as `keekiUi`. Each has the same props,
  events and slots as its `Vx*` twin in vex-ui.
- `src/art/`: the gorilla playhead. `index.html` and `public/`: title, description, favicon.

Pages: Home (the latest VOD on the screen, the series now running, the most played games), `/vods` and
`/playthroughs` (filters and a card grid), the watch page (`/vods/:id`, with the YouTube parts on one timeline and
the chat replay). Manage (`/manage`, archive admins only, through the worker's Twitch sign-in) is
the worker's dashboard in this UI: overview, jobs, VODs (with synthetic VODs), storage, settings, tags and the audit
log, all on vods-core's `/kit` admin client.

Sign-in is the vexoul.net one (vex-auth, through `@vex/ui/account`): the same session as the other vexoul.net
sites. Signed in, watch progress is kept in the account and follows you across devices and sites; signed out it
stays in the browser, and signing in moves it into the account. Archive admins also get Manage in the account menu.

```bash
npm ci
npm run dev         # http://localhost:5176 (proxies /backend to the archive API)
npm run typecheck   # vue-tsc
npm test            # vitest
npm run build       # → dist/
git config core.hooksPath .conventions/githooks   # once per clone: branch-name rules, see CONTRIBUTING.md
```

`main` is merge-only and branches follow [Conventional Branch](https://conventional-branch.github.io/)
(`feature/…`, `bugfix/…`, `hotfix/…`, `release/…`, `chore/…`). See [CONTRIBUTING.md](CONTRIBUTING.md).

Dev server: `keeki-dev` in `.claude/launch.json` (`npm run dev -- --host 127.0.0.1`, port 5176). `npm ci` ends with a
check that warns when an installed `@vex/*` package is behind the pins in `package.json`.

## Config

See `.env.example`; everything is optional.

- `VITE_ARCHIVE_API`: the archive API (default `/backend`, same origin).
- `VITE_ADMIN_API`: the worker's admin API, for Manage (default `/backend-admin`, same origin).
- `VITE_AUTH_BASE`: vex-auth (default the vexoul.net one). Empty turns sign-in off. The service only answers
  the origins it's configured for, so on a dev server sign-in stays signed out unless you point this at your own:
  put `VITE_AUTH_BASE=http://127.0.0.1:8090` in `.env.local` (a local vex-auth, see its README) and restart the dev server.
- In dev, `/backend` is proxied to `VITE_DEV_API_TARGET` (default the public site), and `/backend-admin` is
  vods-core's in-memory mock (password `admin`) unless `VITE_DEV_ADMIN_TARGET` is set in `.env.local`.

## Assets still needed

- A favicon of its own (`public/favicon.ico` is vods.vexoul.net's for now).
- A marquee or logo mark for the header, if wanted (it's type only for now).
- The vector shapes for the drawn thumbnail tags, as on vods.vexoul.net (placeholders until then).

## Publishing

`.github/workflows/publish.yml` runs the checks, builds, and pushes `dist/` to the `deploy` branch on every merge
to `main`. The site is a single-page app, so the server must answer unknown paths with `index.html` and send
`/backend/*` to the archive API (and `/backend-admin/*` to the worker's admin API). `@vex/vods-core` and
`@vex/platform-web` are pinned to git tags in `package.json`, and Renovate opens the
bumps.

## Infrastructure

This repo is host-agnostic: it builds and publishes, nothing more. Details about where or how the site is hosted
(machines, addresses, proxy or tunnel config, server paths, deploy scripts) belong in the private `homelab-docs`
repo and must never be committed here. `.gitignore` blocks `.env*` (except `.env.example`), `*.local.*` and
`/deploy.local/` so local host files can't slip in.
