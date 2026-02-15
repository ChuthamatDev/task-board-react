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
                data-testid="task-column"
                className={clsx(
                    'flex flex-col w-80 shrink-0',
                    'bg-app-column',
                    'border-app-border',
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
