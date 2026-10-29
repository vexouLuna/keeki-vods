// Runs after `npm install`/`npm ci`: says so when an installed @vex/* package is behind the tag pinned in package.json
// (a copied-in `dist/` from a library build, or a stale node_modules). Only prints; never fails an install.
import { readFileSync } from 'node:fs'

const read = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url), 'utf8'))
const deps = read('../package.json').dependencies
const behind = []
for (const [name, spec] of Object.entries(deps)) {
  const pin = /#v?(\d+\.\d+\.\d+)$/.exec(spec)?.[1]
  if (!name.startsWith('@vex/') || !pin) continue
  let have
  try { have = read(`../node_modules/${name}/package.json`).version } catch { continue }
  if (have !== pin) behind.push(`  ${name}: installed ${have}, package.json pins ${pin}`)
}
if (behind.length) {
  console.warn(`\nThe installed @vex packages differ from the pins in package.json:\n${behind.join('\n')}\nRun \`npm ci\` to install the pinned versions.\n`)
}
