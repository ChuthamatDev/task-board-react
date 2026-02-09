import { createPortal } from 'react-dom'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from '../ui/Button'
import { useLanguage } from '../../contexts/LanguageContext'

interface ConfirmDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    message: string
}

export default function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
}: ConfirmDialogProps) {
    if (!isOpen) return null

    const { trans } = useLanguage()

    return createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div
                onPointerDown={(e) => e.stopPropagation()}
                className="relative bg-app-surface w-full max-w-sm rounded-lg shadow-xl overflow-hidden transform transition-all scale-100 opacity-100 border border-app-border"
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-1 rounded-md text-app-subtle hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <XMarkIcon className="w-4 h-4" />
                </button>

                <div className="p-5">
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 pt-0.5">
                            <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                        </div>

                        <div className="flex-1">
                            <h3 className="text-base font-semibold text-app-text mb-1.5">
                                {title}
                            </h3>
                            <p className="text-sm text-app-subtle leading-relaxed">
                                {message}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-5 py-3 flex justify-end gap-2 border-t border-app-border/50">
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        {trans('btn_cancel')}
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={onConfirm}
                    >
                        {trans('btn_confirm')}
                    </Button>
                </div>
            </div>
        </div>,
        document.body
    )
}
