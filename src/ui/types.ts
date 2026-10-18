// The shapes the controls share (the same as vex-ui's, so Manage's pages port across unchanged).

/** One choice in a select, tab row or segmented control. */
export interface Option<T extends string | number = string> {
  value: T
  label: string
  /** Muted text on the right of a menu row. */
  sub?: string
  disabled?: boolean
  title?: string
}

/** One column of a KTable. */
export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  align?: 'left' | 'right'
  mono?: boolean
  muted?: boolean
  width?: string
}

export interface SortState {
  key: string
  dir: 'asc' | 'desc'
}

/** One header link (KShell). */
export interface NavItem {
  label: string
  /** Router location. */
  to?: string
  /** Plain link. */
  href?: string
  current?: boolean
  /** Leaves the site: opens in a new tab. */
  external?: boolean
}

/** Who the account menu shows as signed in (KAccountMenu). */
export interface AccountUser {
  name: string
  color?: string | null
  avatar?: string
}
