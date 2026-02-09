import { memo } from 'react'
import clsx from 'clsx'
import ColumnMenu from './ColumnMenu'

interface ColumnHeaderProps {
    title: string
    status: string
    count: number
    onEditClick: () => void
    onDeleteClick: () => void
    color: string
}

function ColumnHeader({
    title,
    count,
    onEditClick,
    onDeleteClick,
    color,
}: ColumnHeaderProps) {
    return (
        <div className="flex items-center justify-between px-2 py-1 group">
            <div className="flex items-center gap-2.5 overflow-hidden">
                <div
                    className={clsx(
                        'w-2 h-2 rounded-full shrink-0 transition-all duration-300',
                        'group-hover:w-2.5 group-hover:h-2.5 group-hover:shadow-sm',
                        color
                    )}
                />
                <h2 className="font-semibold text-app-text truncate text-sm tracking-tight">
                    {title}
                </h2>
                <span className="bg-app-surface text-app-subtle text-[11px] px-2 py-0.5 rounded-full font-medium border border-app-border/30 min-w-[24px] text-center">
                    {count}
                </span>
            </div>

            <div className="pointer-events-auto -mr-1">
                <ColumnMenu onEdit={onEditClick} onDelete={onDeleteClick} />
            </div>
        </div>
    )
}

export default memo(ColumnHeader)
