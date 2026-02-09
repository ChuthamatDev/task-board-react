import { Priority } from './types'
import { TranslationKey } from './i18n'

export const formatDate = (dateString: string): string => {
    if (!dateString) return '-'

    const date = new Date(dateString)

    if (isNaN(date.getTime())) return '-'

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
}

export const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

export const priorityColors: Record<Priority, string> = {
    high: 'bg-rose-500/10 text-rose-500 border-rose-500/30',
    medium: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
    low: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
}

export const PRIORITY_OPTIONS: { value: Priority; label: TranslationKey }[] = [
    { value: 'low', label: 'priority_low' },
    { value: 'medium', label: 'priority_medium' },
    { value: 'high', label: 'priority_high' },
]

export const COLUMN_COLORS: Record<string, string> = {
    slate: 'bg-slate-500',
    sky: 'bg-sky-500',
    amber: 'bg-amber-500',
    teal: 'bg-teal-500',
    rose: 'bg-rose-500',
    violet: 'bg-violet-500',
    fuchsia: 'bg-fuchsia-500',
    cyan: 'bg-cyan-500',
}

export const COLOR_MIGRATION_MAP: Record<string, string> = {
    'bg-gray-500': 'bg-slate-500',
    'bg-blue-500': 'bg-sky-500',
    'bg-yellow-500': 'bg-amber-500',
    'bg-emerald-500': 'bg-teal-500',
    'bg-red-500': 'bg-rose-500',
    'bg-purple-500': 'bg-violet-500',
    'bg-pink-500': 'bg-fuchsia-500',
    'bg-indigo-500': 'bg-cyan-500',
}

export const DEFAULT_COLUMN_COLOR = COLUMN_COLORS.slate

export const migrateColor = (color?: string): string => {
    if (!color) return DEFAULT_COLUMN_COLOR
    return COLOR_MIGRATION_MAP[color] || color
}
