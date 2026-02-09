import { memo } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import { Task } from '../../utils/types'
import TaskCardMeta from './TaskCardMeta'
import TaskCardActions from './TaskCardActions'

interface TaskCardProps {
    task: Task
    onEdit?: (task: Task) => void
    onDelete?: (id: string) => void
    isOverlay?: boolean
}

function TaskCard({
    task,
    onEdit,
    onDelete,
    isOverlay = false,
}: TaskCardProps) {

    const isEditMode = false

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: 'Task',
            task,
        },
        disabled: isEditMode,
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={clsx(
                'relative rounded-lg p-3',
                'touch-none cursor-grab active:cursor-grabbing',
                'transition-all duration-200 ease-out',
                'bg-white',
                'dark:bg-[hsla(220,35%,3%,0.4)]',
                'border',
                'border-[hsla(220,20%,80%,0.4)]',
                'dark:border-[hsla(220,20%,25%,0.6)]',
                'shadow-none',
                isOverlay && 'pointer-events-none opacity-90 shadow-xl z-50 cursor-grabbing',
                isDragging && 'opacity-30'
            )}
        >
            <TaskCardActions task={task} onEdit={onEdit} onDelete={onDelete} />

            <h3 className="font-semibold text-sm mb-0.5 pr-12 text-app-text">
                {task.title}
            </h3>

            {task.description && (
                <p className="text-xs text-app-subtle mb-2 line-clamp-2">
                    {task.description}
                </p>
            )}

            <TaskCardMeta task={task} />
        </div>
    )
}

export default memo(TaskCard)