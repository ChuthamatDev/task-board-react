import { Priority } from './storage'
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
    gray: 'bg-gray-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    emerald: 'bg-emerald-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    indigo: 'bg-indigo-500',
}

export const DEFAULT_COLUMN_COLOR = COLUMN_COLORS.gray
