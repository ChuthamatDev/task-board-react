import { forwardRef, ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = 'primary',
            size = 'md',
            className,
            disabled,
            loading,
            type = 'button',
            ...props
        },
        ref
    ) => {
        const baseStyles =
            'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none'

        const variants: Record<ButtonVariant, string> = {
            primary:
                'bg-app-primary text-app-primary-fg hover:bg-app-primary-hover shadow-sm focus:ring-app-primary',
            secondary:
                'bg-app-surface border border-app-border text-app-text hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-gray-200',
            outline:
                'border-2 border-app-primary text-app-primary hover:bg-app-primary/10',
            ghost: 'text-app-text hover:bg-gray-100 dark:hover:bg-gray-800',
            danger: 'bg-red-50 text-white hover:bg-red-100 border border-red-200 dark:bg-red-900/20 dark:text-white dark:border-red-900',
        }

        const sizes: Record<ButtonSize, string> = {
            sm: 'h-8 px-3 text-xs',
            md: 'h-10 px-4 text-sm',
            lg: 'h-12 px-6 text-base',
            icon: 'h-10 w-10 p-2',
        }

        return (
            <button
                ref={ref}
                type={type}
                disabled={disabled || loading}
                className={clsx(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {loading ? (
                    <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                ) : null}
                {children}
            </button>
        )
    }
)

Button.displayName = 'Button'

export default Button
