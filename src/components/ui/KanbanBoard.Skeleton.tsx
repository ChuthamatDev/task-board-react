import { useMemo } from 'react'
import Skeleton from './Skeleton'
import { useColumns } from '../../contexts/ColumnContext'
import { migrateColor } from '../../utils/formatters'
import clsx from 'clsx'

function getTaskCountCache(): Record<string, number> {
    try {
        const cached = localStorage.getItem('taskCountPerColumn')
        return cached ? JSON.parse(cached) : {}
    } catch {
        return {}
    }
}

export default function BoardSkeleton() {
    const { columns } = useColumns()
    const taskCountCache = useMemo(() => getTaskCountCache(), [])

    const sortedColumns = columns.length > 0
        ? [...columns].sort((a, b) => a.position - b.position)
        : null

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-none border-b border-app-border/50 p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <Skeleton className="h-7 w-48 mb-1" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-52 rounded-lg" />
                        <Skeleton className="h-10 w-28 rounded-lg" />
                        <Skeleton className="h-10 w-10 rounded-lg" />
                        <Skeleton className="h-10 w-28 rounded-lg" />
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto overflow-y-hidden px-6 pb-4">
                <div className="h-full inline-flex gap-6 items-start">
                    {sortedColumns ? (
                        sortedColumns.map((col) => (
                            <ColumnSkeleton
                                key={col.id}
                                title={col.title}
                                color={migrateColor(col.color)}
                                taskCount={taskCountCache[col.id] ?? 1}
                            />
                        ))
                    ) : (
                        [1, 2, 3].map((i) => (
                            <FallbackColumnSkeleton key={i} taskCount={i === 2 ? 3 : 2} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

function ColumnSkeleton({
    title,
    color,
    taskCount,
}: {
    title: string
    color: string
    taskCount: number
}) {
    const count = Math.max(taskCount, 0)

    return (
        <div
            className={clsx(
                'flex flex-col w-80 shrink-0 mt-4',
                'rounded-lg border',
                'border-[hsla(220,20%,80%,0.4)] dark:border-[hsla(220,20%,25%,0.6)]',
                'bg-[hsl(0,0%,99%)] dark:bg-[hsl(220,30%,7%)]',
                'overflow-hidden'
            )}
        >
            <div className="flex-none p-1.5 border-b border-[hsla(220,20%,80%,0.4)] dark:border-[hsla(220,20%,25%,0.6)]">
                <div className="flex items-center justify-between px-2 py-1">
                    <div className="flex items-center gap-2.5">
                        <div className={clsx('w-2 h-2 rounded-full shrink-0', color)} />
                        <h2 className="font-semibold text-app-text text-sm tracking-tight">
                            {title}
                        </h2>
                        <span className="bg-app-surface text-app-subtle text-[11px] px-2 py-0.5 rounded-full font-medium border border-app-border/30 min-w-[24px] text-center">
                            {count}
                        </span>
                    </div>
                    <Skeleton className="h-5 w-5 rounded" />
                </div>
            </div>

            <div className="flex-1 p-3 flex flex-col gap-3">
                {count > 0 ? (
                    Array.from({ length: count }).map((_, i) => (
                        <TaskCardSkeleton key={i} />
                    ))
                ) : (
                    <div className="h-24 flex items-center justify-center text-sm rounded-lg border-2 border-dashed border-app-border/30 text-app-subtle/50">
                        No tasks
                    </div>
                )}
            </div>
        </div>
    )
}

function FallbackColumnSkeleton({ taskCount }: { taskCount: number }) {
    return (
        <div
            className={clsx(
                'flex flex-col w-80 shrink-0 mt-4',
                'rounded-lg border',
                'border-[hsla(220,20%,80%,0.4)] dark:border-[hsla(220,20%,25%,0.6)]',
                'bg-[hsl(0,0%,99%)] dark:bg-[hsl(220,30%,7%)]',
                'overflow-hidden'
            )}
        >
            <div className="flex-none p-1.5 border-b border-[hsla(220,20%,80%,0.4)] dark:border-[hsla(220,20%,25%,0.6)]">
                <div className="flex items-center justify-between px-2 py-1">
                    <div className="flex items-center gap-2.5">
                        <Skeleton className="h-2 w-2 rounded-full" />
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-6 rounded-full" />
                    </div>
                    <Skeleton className="h-5 w-5 rounded" />
                </div>
            </div>

            <div className="flex-1 p-3 flex flex-col gap-3">
                {Array.from({ length: taskCount }).map((_, i) => (
                    <TaskCardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}

function TaskCardSkeleton() {
    return (
        <div
            className={clsx(
                'relative rounded-lg p-3',
                'bg-white dark:bg-[hsla(220,35%,3%,0.4)]',
                'border',
                'border-[hsla(220,20%,80%,0.4)] dark:border-[hsla(220,20%,25%,0.6)]',
            )}
        >
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-full mb-1" />
            <Skeleton className="h-3 w-2/3 mb-3" />
            <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-14 rounded-full" />
                <Skeleton className="h-3 w-16" />
            </div>
        </div>
    )
}
