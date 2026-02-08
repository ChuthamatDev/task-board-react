import { forwardRef, ReactNode } from 'react'
import clsx from 'clsx'

interface ColumnContainerProps {
    children: ReactNode
    className?: string
}

const ColumnContainer = forwardRef<HTMLDivElement, ColumnContainerProps>(
    ({ children, className }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    'flex flex-col w-80 shrink-0',
                    'bg-gray-100/50 dark:bg-gray-800/50',
                    'border border-gray-200 dark:border-gray-700',
                    'rounded-md backdrop-blur-sm',
                    'transition-colors duration-300',
                    'mt-4',
                    className
                )}
            >
                {children}
            </div>
        )
    }
)

export default ColumnContainer
