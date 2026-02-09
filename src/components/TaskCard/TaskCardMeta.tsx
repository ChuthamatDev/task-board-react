import { CalendarIcon, FlagIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Task, Priority } from '../../utils/types'
import { formatDate } from '../../utils/formatters'

interface TaskCardMetaProps {
    task: Task
}

export default function TaskCardMeta({ task }: TaskCardMetaProps) {
    const getPriorityStyles = (priority: Priority) => {
        switch (priority) {
            case 'high':
                return 'bg-red-50 border-red-100 text-red-600 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300'
            case 'medium':
                return 'bg-orange-50 border-orange-100 text-orange-600 dark:bg-orange-900/30 dark:border-orange-800 dark:text-orange-300'
            case 'low':
                return 'bg-green-50 border-green-200 text-green-600 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300'
            default:
                return 'bg-gray-100 border-gray-200 text-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
        }
    }

    return (
        <div className="flex items-center gap-2 mt-3">
            <div
                className={clsx(
                    'flex items-center gap-1.5',
                    'px-2 py-0.5',
                    'rounded-full border',
                    'text-xs font-semibold',
                    getPriorityStyles(task.priority)
                )}
            >
                <FlagIcon className="w-3 h-3" />
                <span>{task.priority}</span>
            </div>

            {task.createdAt && (
                <div
                    className={clsx(
                        'flex items-center gap-1.5',
                        'px-2 py-0.5',
                        'rounded-full border',
                        'text-xs font-semibold',
                        'bg-gray-100 border-gray-200 text-gray-500',
                        'dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
                    )}
                >
                    <CalendarIcon className="w-3 h-3" />
                    <span>{formatDate(task.createdAt)}</span>
                </div>
            )}
        </div>
    )
}
