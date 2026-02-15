import { forwardRef, ButtonHTMLAttributes, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    loading?: boolean
    loadingText?: string
}

function Spinner({ size = 16 }: { size?: number }) {
    return (
        <svg
            className="animate-spin text-current"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
        >
            <circle
                className="opacity-20"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3.5"
            />
            <path
                className="opacity-90"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    )
}

function useRipple() {
    const [ripples, setRipples] = useState<
        { x: number; y: number; id: number }[]
    >([])

    const addRipple = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            const id = Date.now()

            setRipples((prev) => [...prev, { x, y, id }])
            setTimeout(() => {
                setRipples((prev) => prev.filter((r) => r.id !== id))
            }, 600)
        },
        []
    )

    return { ripples, addRipple }
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
            loadingText,
            type = 'button',
            onClick,
            ...props
        },
        ref
    ) => {
        const { ripples, addRipple } = useRipple()

        const baseStyles =
            'relative inline-flex items-center justify-center rounded-lg font-medium overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed select-none'

        const variants: Record<ButtonVariant, string> = {
            primary:
                'bg-app-primary text-app-primary-fg shadow-sm focus:ring-app-primary',
            secondary:
                'bg-app-surface border border-app-border text-app-text focus:ring-gray-200',
            outline:
                'border-2 border-app-primary text-app-primary',
            ghost: 'text-app-text',
            danger: 'bg-red-50 text-red-600 border-2 border-red-600 dark:bg-red-900/20 dark:text-red-200 dark:border-red-900',
        }

        const hoverVariants: Record<ButtonVariant, string> = {
            primary: 'hover:bg-app-primary-hover hover:shadow-md',
            secondary: 'hover:bg-gray-50 dark:hover:bg-gray-800',
            outline: 'hover:bg-app-primary/10',
            ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
            danger: 'hover:bg-red-100',
        }

        const sizes: Record<ButtonSize, string> = {
            sm: 'h-8 px-3 text-xs',
            md: 'h-10 px-4 text-sm',
            lg: 'h-12 px-6 text-base',
            icon: 'h-10 w-10 p-2',
        }

        const isDisabled = disabled || loading

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (isDisabled) return
            addRipple(e)
            onClick?.(e)
        }

        return (
            <motion.button
                ref={ref}
                type={type}
                disabled={isDisabled}
                whileTap={isDisabled ? undefined : { scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                className={clsx(
                    baseStyles,
                    variants[variant],
                    !isDisabled && hoverVariants[variant],
                    isDisabled && 'opacity-60',
                    sizes[size],
                    className
                )}
                onClick={handleClick}
                {...(props as any)}
            >
                <AnimatePresence>
                    {ripples.map((ripple) => (
                        <motion.span
                            key={ripple.id}
                            initial={{ scale: 0, opacity: 0.4 }}
                            animate={{ scale: 4, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="absolute rounded-full bg-white/30 pointer-events-none"
                            style={{
                                left: ripple.x - 10,
                                top: ripple.y - 10,
                                width: 20,
                                height: 20,
                            }}
                        />
                    ))}
                </AnimatePresence>

                <AnimatePresence mode="wait" initial={false}>
                    {loading ? (
                        <motion.span
                            key="loading"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.15 }}
                            className="inline-flex items-center gap-2"
                        >
                            <Spinner size={size === 'sm' ? 14 : 16} />
                            {loadingText && (
                                <span>{loadingText}</span>
                            )}
                            {!loadingText && children}
                        </motion.span>
                    ) : (
                        <motion.span
                            key="content"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="inline-flex items-center gap-2"
                        >
                            {children}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        )
    }
)

Button.displayName = 'Button'

export default Button