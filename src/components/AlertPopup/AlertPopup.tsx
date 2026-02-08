import { XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import useAlertPopup from '../../hooks/alert/useAlertPopup'
import { ALERT_CONFIG } from './alertConfig'
import { AlertType } from '../../contexts/AlertContext'

const AlertPopup = () => {
    const { text, type, visible, close } = useAlertPopup()

    if (!text || !type || !visible) return null

    const config =
        ALERT_CONFIG[type as Exclude<AlertType, ''>] || ALERT_CONFIG.info

    const { icon: Icon, color, bgIcon } = config

    return (
        <div
            data-state={visible ? 'open' : 'closed'}
            className={clsx(
                'fixed z-[9999] flex items-center gap-4 p-4',
                'bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6',

                'min-w-[auto] sm:min-w-[340px] max-w-md',
                'bg-app-surface shadow-xl rounded-xl',
                'border border-app-border border-l-4',
                'transition-all duration-300 ease-out transform',

                visible
                    ? 'translate-y-0 opacity-100 scale-100'
                    : 'translate-y-4 opacity-0 scale-95 pointer-events-none',

                color.replace('text-', 'border-')
            )}
        >
            <div className={clsx('p-2 rounded-full shrink-0', bgIcon)}>
                <Icon className={clsx('w-6 h-6', color)} />
            </div>

            <div className="flex-1 min-w-0">
                <h4
                    className={clsx(
                        'text-sm font-bold capitalize mb-0.5',
                        color
                    )}
                >
                    {type}
                </h4>
                <p className="text-sm text-app-subtle leading-snug break-words">
                    {text}
                </p>
            </div>

            <button
                onClick={close}
                className="shrink-0 p-1.5 -mr-1 rounded-lg text-app-subtle hover:text-app-text hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                <XMarkIcon className="w-5 h-5" />
            </button>
        </div>
    )
}

export default AlertPopup