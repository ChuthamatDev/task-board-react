import clsx from 'clsx'

interface SkeletonProps {
    className?: string
}

const Skeleton = ({ className }: SkeletonProps) => {
    return (
        <div
            className={clsx(
                'animate-pulse rounded bg-gray-200 dark:bg-gray-700',
                className
            )}
        />
    )
}

export default Skeleton
