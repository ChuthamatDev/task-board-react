import { memo } from 'react'
// import clsx from 'clsx'
import ColumnMenu from './ColumnMenu'

interface ColumnHeaderProps {
    title: string
    status: string
    count: number
    onEditClick: () => void
    onDeleteClick: () => void
}

function ColumnHeader({
    title,
    count,
    onEditClick,
    onDeleteClick,
}: ColumnHeaderProps) {
    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 overflow-hidden">
                {/* <div className={clsx('w-3 h-3 rounded-full shrink-0', color)} /> */}
                <h2 className="font-bold text-app-text truncate text-md tracking-wide">
                    {title}
                </h2>
                <span className="bg-app-border text-app-subtle text-xs px-2 py-0.5 rounded-full font-medium">
                    {count}
                </span>
            </div>

            <ColumnMenu onEdit={onEditClick} onDelete={onDeleteClick} />
        </div>
    )
}

export default memo(ColumnHeader)
