import { useState, memo } from 'react'
import { XMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { Task } from '../../utils/types'
import ConfirmDialog from '../dialog/ConfirmDialog'
import { useAlert } from '../../contexts/AlertContext'
import { useLanguage } from '../../contexts/LanguageContext'

interface TaskCardActionsProps {
    task: Task
    onEdit?: (task: Task) => void
    onDelete?: (id: string) => void
}

function TaskCardActions({ task, onEdit, onDelete }: TaskCardActionsProps) {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)

    const { setAlert } = useAlert()
    const { trans } = useLanguage()

    const handleConfirmDelete = () => {
        if (onDelete) {
            onDelete(task.id)
            setAlert(`${trans('alert_delete_success')}`, 'success')
        }
        setIsConfirmOpen(false)
    }

    return (
        <>
            <div className="absolute top-2 right-2 flex gap-1 text-app-subtle">
                <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                        e.stopPropagation()
                        onEdit?.(task)
                    }}
                    className="p-1 rounded hover:bg-app-bg hover:text-app-text"
                >
                    <PencilSquareIcon className="w-4 h-4" />
                </button>

                <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsConfirmOpen(true)
                    }}
                    className="p-1 rounded hover:bg-red-500/10 hover:text-red-500"
                >
                    <XMarkIcon className="w-4 h-4" />
                </button>
            </div>

            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirm deletion"
                message={`${trans('dialog_del_title')} "${task.title}"?`}
            />
        </>
    )
}

export default memo(TaskCardActions)
