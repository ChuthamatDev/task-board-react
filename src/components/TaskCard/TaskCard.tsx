import { memo } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import { Task } from '../../utils/storage'
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
                // Base Shape & Layout
                'relative rounded-lg p-4 gap-4',
                'touch-none cursor-grab active:cursor-grabbing',

                // --- MUI Card Style (Outlined Variant) ---
                // Transition
                'transition-all duration-100 ease-out',

                // Background
                'bg-white', // Light: hsl(0, 0%, 100%)
                'dark:bg-[hsla(220,35%,3%,0.4)]', // Dark: alpha(gray[900], 0.4)

                // Border (Divider Color)
                'border',
                'border-[hsla(220,20%,80%,0.4)]', // Light: alpha(gray[300], 0.4)
                'dark:border-[hsla(220,20%,25%,0.6)]', // Dark: alpha(gray[700], 0.6)

                // Shadow
                'shadow-none', // MuiCard outlined has no shadow

                // Dragging States
                isOverlay &&
                    'pointer-events-none opacity-90 rotate-2 scale-105 shadow-xl z-50',
                isDragging && 'opacity-30'
            )}
        >
            <TaskCardActions task={task} onEdit={onEdit} onDelete={onDelete} />

            <h3 className="font-semibold text-sm mb-1 pr-12 text-app-text">
                {task.title}
            </h3>

            <p className="text-xs text-app-subtle mb-3 line-clamp-2">
                {task.description}
            </p>

            <TaskCardMeta task={task} />
        </div>
    )
}

const isEditMode = false

export default memo(TaskCard)
