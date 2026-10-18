// keeki-vods' own controls: the jobs vex-ui's do on the other sites, in the Keeki Archives look (theme.css).
// `keekiUi` hands them to vods-core's app as its Ui* controls (createVodsApp's `ui`).
import type { VodsUi } from '@vex/vods-core/app'

import KAccountMenu from './KAccountMenu.vue'
import KButton from './KButton.vue'
import KCallout from './KCallout.vue'
import KChapterBar from './KChapterBar.vue'
import KCheckbox from './KCheckbox.vue'
import KChip from './KChip.vue'
import KDateRange from './KDateRange.vue'
import KDialog from './KDialog.vue'
import KEmptyState from './KEmptyState.vue'
import KField from './KField.vue'
import KInput from './KInput.vue'
import KKbd from './KKbd.vue'
import KLink from './KLink.vue'
import KMenuItem from './KMenuItem.vue'
import KPlaceholder from './KPlaceholder.vue'
import KPopover from './KPopover.vue'
import KPosters from './KPosters.vue'
import KProgress from './KProgress.vue'
import KSegmented from './KSegmented.vue'
import KSelect from './KSelect.vue'
import KShell from './KShell.vue'
import KSkeleton from './KSkeleton.vue'
import KSlider from './KSlider.vue'
import KSpinner from './KSpinner.vue'
import KStatusDot from './KStatusDot.vue'
import KStepper from './KStepper.vue'
import KSwitch from './KSwitch.vue'
import KTable from './KTable.vue'
import KTabs from './KTabs.vue'
import KTooltip from './KTooltip.vue'

export { default as KNoPicture } from './KNoPicture.vue'
export type { AccountUser, NavItem, Option, SortState, TableColumn } from './types'

export const keekiUi: VodsUi = {
  components: {
    AccountMenu: KAccountMenu,
    Button: KButton,
    Callout: KCallout,
    ChapterBar: KChapterBar,
    Checkbox: KCheckbox,
    Chip: KChip,
    DateRange: KDateRange,
    Dialog: KDialog,
    EmptyState: KEmptyState,
    Field: KField,
    Input: KInput,
    Kbd: KKbd,
    Link: KLink,
    MenuItem: KMenuItem,
    Placeholder: KPlaceholder,
    Popover: KPopover,
    Posters: KPosters,
    Progress: KProgress,
    Segmented: KSegmented,
    Select: KSelect,
    Shell: KShell,
    Skeleton: KSkeleton,
    Slider: KSlider,
    Spinner: KSpinner,
    StatusDot: KStatusDot,
    Stepper: KStepper,
    Switch: KSwitch,
    Table: KTable,
    Tabs: KTabs,
    Tooltip: KTooltip,
  },
}
