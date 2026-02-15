import Skeleton from './Skeleton'

export default function BoardSkeleton() {
    return (
        <div className="flex h-full gap-6 overflow-x-auto p-6">
            {[1, 2, 3].map((colIndex) => (
                <div
                    key={colIndex}
                    className="flex w-80 shrink-0 flex-col rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4 rounded-full" />{' '}
                            <Skeleton className="h-6 w-32" />
                        </div>
                        <Skeleton className="h-6 w-8 rounded-full" />{' '}
                    </div>

                    <div className="flex flex-col gap-3">
                        {Array.from({ length: colIndex === 2 ? 4 : 2 }).map(
                            (_, taskIndex) => (
                                <div
                                    key={taskIndex}
                                    className="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-200 dark:border-gray-700"
                                >
                                    <Skeleton className="h-5 w-3/4 mb-2" />{' '}
                                    <Skeleton className="h-4 w-full mb-1" />{' '}
                                    <Skeleton className="h-4 w-2/3 mb-4" />{' '}
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-5 w-16 rounded" />{' '}
                                        <Skeleton className="h-6 w-6 rounded-full" />{' '}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
