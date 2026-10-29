// keeki-vods' own controls: the jobs vex-ui's do on the other sites, in the Keeki Archives look (theme.css).
// `keekiUi` hands them to vods-core's app as its Ui* controls (createVodsApp's `ui`).
import type { VodsUi } from '@vex/vods-core/app'

import KAccountMenu from './KAccountMenu.vue'
import KButton from './KButton.vue'
import KCallout from './KCallout.vue'
import KChapterBar from './KChapterBar.vue'
import KCheckbox from './KCheckbox.vue'
import KChip from './KChip.vue'
import KConfirm from './KConfirm.vue'
import KDateInput from './KDateInput.vue'
import KDateRange from './KDateRange.vue'
import KDialog from './KDialog.vue'
import KEmptyState from './KEmptyState.vue'
import KField from './KField.vue'
import KInput from './KInput.vue'
import KKbd from './KKbd.vue'
import KLink from './KLink.vue'
import KLoadState from './KLoadState.vue'
import KMenuItem from './KMenuItem.vue'
import KNavBar from './KNavBar.vue'
import KPageHead from './KPageHead.vue'
import KPlaceholder from './KPlaceholder.vue'
import KPopover from './KPopover.vue'
import KPosters from './KPosters.vue'
import KProgress from './KProgress.vue'
import KSaveBar from './KSaveBar.vue'
import KSegmented from './KSegmented.vue'
import KSelect from './KSelect.vue'
import KShell from './KShell.vue'
import KSkeleton from './KSkeleton.vue'
import KSlider from './KSlider.vue'
import KSpinner from './KSpinner.vue'
import KStatTile from './KStatTile.vue'
import KStatusDot from './KStatusDot.vue'
import KStepper from './KStepper.vue'
import KSwitch from './KSwitch.vue'
import KTable from './KTable.vue'
import KTabs from './KTabs.vue'
import KTagInput from './KTagInput.vue'
import KTextarea from './KTextarea.vue'
import KTooltip from './KTooltip.vue'

export { default as KIcon } from './KIcon.vue'
export { default as KNoPicture } from './KNoPicture.vue'
export type { AccountUser, LockedTag, NavItem, Option, SortState, TableColumn, TagOption } from './types'

// Not an inline literal, so a role vods-core doesn't ask for yet (TagInput before v0.40) isn't an excess-property error.
const components = {
  AccountMenu: KAccountMenu,
  Button: KButton,
  Callout: KCallout,
  ChapterBar: KChapterBar,
  Checkbox: KCheckbox,
  Chip: KChip,
  Confirm: KConfirm,
  DateInput: KDateInput,
  DateRange: KDateRange,
  Dialog: KDialog,
  EmptyState: KEmptyState,
  Field: KField,
  Input: KInput,
  Kbd: KKbd,
  Link: KLink,
  LoadState: KLoadState,
  MenuItem: KMenuItem,
  NavBar: KNavBar,
  PageHead: KPageHead,
  Placeholder: KPlaceholder,
  Popover: KPopover,
  Posters: KPosters,
  Progress: KProgress,
  SaveBar: KSaveBar,
  Segmented: KSegmented,
  Select: KSelect,
  Shell: KShell,
  Skeleton: KSkeleton,
  Slider: KSlider,
  Spinner: KSpinner,
  StatTile: KStatTile,
  StatusDot: KStatusDot,
  Stepper: KStepper,
  Switch: KSwitch,
  Table: KTable,
  Tabs: KTabs,
  TagInput: KTagInput,
  Textarea: KTextarea,
  Tooltip: KTooltip,
}

export const keekiUi: VodsUi = { components }
