import { forwardRef, InputHTMLAttributes } from 'react'
import clsx from 'clsx'


type FieldError = string | { message?: string } | undefined | null


export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: FieldError
    containerClassName?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            name,
            type = 'text',
            error,
            className = '',
            containerClassName = '',
            ...props
        },
        ref
    ) => {
        const errorMessage = typeof error === 'string' ? error : error?.message

        return (
            <div className={clsx('w-full', containerClassName)}>
                {label && (
                    <label
                        htmlFor={name}
                        className="block text-sm font-medium text-app-text mb-1.5"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={name}
                    name={name}
                    type={type}
                    className={clsx(
                        'w-full px-3 py-2 rounded-lg border text-sm transition-all',
                        'bg-app-surface text-app-text placeholder:text-app-subtle',
                        'focus:outline-none focus:ring-2',
                        errorMessage
                            ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                            : 'border-app-border focus:ring-app-primary/20 focus:border-app-primary',
                        className
                    )}
                    {...props}
                />
                {errorMessage && (
                    <p className="text-red-500 text-xs mt-1.5">
                        {errorMessage}
                    </p>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input'

export default Input
