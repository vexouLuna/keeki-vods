# E1: keeki-vods keeps only its look

> "a lot of work gets done twice each time an implementation happens. is it possible for keeki vods only have the
> styling part? cards, menu layouts and everything else should be the same."

Status: **proposal, waiting for approval.** Nothing is implemented yet.

## What is duplicated today

vex-vods is already thin: `main.ts` calls vods-core's `createVodsApp()` and passes its config and art (81 lines in
`src/`). keeki-vods is not. It uses vods-core's logic (`/kit`, `/vue`) but has its own copy of every page and
component:

| keeki-vods file group | Lines | Same file in vods-core `src/app/` | What differs |
|---|---|---|---|
| `src/pages/` (home, list, watch, games, 404) | ~690 | `pages/` | `Vx*` → `K*`, `vx-*` → `k-*` classes, some layout, drift |
| `src/pages/manage/` (12 Manage pages) | ~1,900 | `pages/admin/Admin*` | Same: mostly the rename, some drift both ways |
| `src/components/` (cards, watch view, chat, shell) | ~2,300 | `components/` | Card and shell layout, the rename, drift |
| `src/components/manage/` (19 editors/dialogs) | ~2,000 | `admin/` | The rename, drift |
| `src/router.ts`, `App.vue` | ~35 | `index.ts`, `App.vue` | Nothing but the imports |
| **Copied, total** | **~6,900** | | |
| `src/ui/` (31 `K*` controls) | ~1,300 | (vex-ui's `Vx*`) | The real look: same props as `Vx*` |
| `src/theme.css`, `platform.css` | ~360 | (vex-ui's tokens) | The real look |

What I found comparing them file by file:

- **Every copied file is the vods-core one with `Vx*` swapped for `K*`.** The `K*` controls were built with the same
  props and slots as the `Vx*` ones (`KPopover #trigger`, `KMenuItem :sub`, `KPosters mode`…), so templates differ
  mostly in the tag names.
- **Drift has already started in both directions.** Examples: keeki's Manage VODs list has "untick all" and links
  each job; vods-core doesn't. vods-core has `SnailMarker`, `SeeAllButton`, `ManageLink` (the header "Manage"
  button) and `NoThumbnail`; keeki has `SeekMarker` instead and no Manage button.
- **The look-only part is small:** the 31 `K*` controls, `theme.css` and `platform.css` (about 1,700 lines), plus the
  header/footer (`SiteShell.vue`) and the card layout.
- vods-core's own app styles use only **21 `--vx-*` tokens** and **5 utility classes** (`vx-muted`, `vx-mono`,
  `vx-eyebrow`, `vx-panel`, `vx-display`). That is what stands between the shared pages and "any look".

## Options

### 1. Recommended: shared pages, swappable controls

vods-core's `app` stops importing `@vex/ui` components. Its pages use a fixed set of controls by role (`UiButton`,
`UiChip`, `UiPopover`, `UiShell`…). Each site hands its own set to `createVodsApp()`:

```ts
// vex-vods/src/main.ts
import { deepField } from '@vex/vods-core/deep-field'   // the Vx* set + Deep Field shell
createVodsApp({ config, site, ui: deepField, ... })

// keeki-vods/src/main.ts
import * as ui from './ui'                               // the K* set + SiteShell
createVodsApp({ config, site, ui, ... })
```

- **Pages, cards, menus, Manage, routing:** one copy, in vods-core `src/app/`. A feature added there reaches both
  sites with the next release and pin bump.
- **Look:** each site supplies the controls, the shell (header/footer), its fonts and a theme file that sets
  vods-core's own `--vods-*` tokens. This is the same pattern platform-web already uses with `--vxp-*`, and keeki's
  `platform.css` already does it.
- **Deep Field stays out of keeki:** the `Vx*` set moves to a separate `@vex/vods-core/deep-field` entry. Only
  vex-vods imports it. keeki's `tests/headless.test.ts` keeps passing.
- **How the controls get in:** `createVodsApp` registers them as app-wide components. vods-core's templates use
  `<UiButton>` without importing it, and a `GlobalComponents` type contract makes vue-tsc check every prop. If a site
  leaves a control out, `createVodsApp` throws at startup and names it.
- **Effort:** about 2 days of work, spread over 3 releases (steps below).

### 2. keeki uses vex-ui's components with its own token values

keeki drops `src/ui/`, runs vods-core's app as it is, and overrides `--vx-*` tokens and fonts.

- Least code: keeki becomes about 100 lines.
- But Deep Field's shapes, glass panels, star sky, 48px header and button styles come with it. Tokens change colours
  and fonts, not shapes. The Keeki Archives look (film strips, title boards) would need overrides that fight
  vex-ui's CSS, and break whenever vex-ui changes. This is the "dragging Deep Field in" the brief warns about.

### 3. Keep two copies, add a parity check

A test that compares the route list and a feature checklist between the two sites. Cheapest now, but every feature is
still built twice. It only makes the drift visible.

## Recommendation

**Option 1.** It deletes about 6,900 lines from keeki, keeps its look fully its own, and gives later features (B1
cut-VOD page, B3 live card, B4 admin wrench, E2/E3 homepage cards and tags) one place to go: vods-core `src/app/`.
A new site later is a config, a control set and a theme.

## What changes for keeki (please check)

You said cards and menu layouts should be the same, so keeki takes vods-core's layouts:

- **The VOD card** becomes vods-core's card (posters fanned on the thumbnail, title beside the date) in keeki's
  colours and fonts, instead of keeki's "showing card" with the title strip and posters hanging off the corner.
- **keeki's own touches that stay:** the header and footer (`SiteShell`: "Keeki Archives", ケーキでちゅ, the
  "made by vexoul.net" footer), every control's look, fonts, colours, film-strip edges done in CSS.
- **Features keeki gains:** the header "Manage" button, `SnailMarker`, "See all" links, anything else vods has.
- **Features vex-vods gains:** what keeki added (untick all, job links in Manage VODs). These get merged into the
  shared pages during step 2, not dropped.
- **The nav:** keeki's "Playthroughs" link becomes a per-site setting (`site.nav`).
- If a layout difference matters to you (e.g. keep the "showing card"), it can stay as a named slot that keeki
  fills. I'd keep those to a minimum: each one is a place where features can drift again.

## Migration steps

Each step leaves both sites building and running.

1. **vods-core: make the app look-neutral.** (about 1 day)
   - Add the `Ui*` contract and the `ui` option. Swap `Vx*` → `Ui*` and `vx-*` classes/tokens → `vods-*` in
     `src/app/`.
   - Add the `./deep-field` entry: the `Vx*` set, the Deep Field shell, and a `deep-field.css` that maps `--vods-*`
     to `--vx-*`.
   - Extend `tests/app/kit.test.ts` so the `app` entry no longer reaches `@vex/ui` components.
   - Changeset: a minor bump (`createVodsApp` needs `ui` now).
2. **vods-core: merge keeki's drift into the shared pages.** (about 2 hours) Untick all, job links, and whatever else
   the per-file diff turns up.
3. **vex-vods: pass `ui: deepField`.** (about 15 minutes) Check that it looks the same as today, page by page.
4. **keeki-vods: become a theme.** (about half a day)
   - `main.ts` calls `createVodsApp({ ui })`.
   - Delete `src/pages/`, `src/components/` (except `SiteShell` and keeki-only art), `router.ts`, `App.vue`.
   - `theme.css` sets the `--vods-*` tokens. Adjust `K*` props where the contract needs it.
5. **Docs and rules.**
   - Update the CLAUDE.md files: keeki's "everything you see is this repo's" becomes "only the look is this repo's;
     pages go to vods-core".
   - vods-core's `kit` entry stays for now but has no site using it. Remove it in a later minor bump.

During development I'll try the vods-core changes in both sites with the workspace's copy-`dist/` recipe, in
worktrees. Releases, tags and pin bumps wait for your go-ahead.

## What breaks

- **vods-core `createVodsApp`** gains a required `ui` option. This is a minor bump; vex-vods is its only caller.
- **keeki's look changes** where its layouts differed (card, home sections). See "What changes for keeki" above.
- **vods-core app's CSS hooks** (`vx-muted`…) get renamed to `vods-*`. Nothing outside vods-core uses them.
- **Other sessions:** branches that edit keeki's `src/pages` or `src/components` right now will conflict with step 4.
  Their changes need to land in vods-core `src/app/` instead.

## Decisions for you

1. Option 1? (recommended)
2. OK for keeki's VOD card and home layout to become vods-core's (in keeki's look)? Or are there layouts you want
   kept as keeki-only slots? If so, which ones?
