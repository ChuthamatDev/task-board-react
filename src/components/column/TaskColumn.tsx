import { memo } from 'react'
import { useDroppable } from '@dnd-kit/core'
import clsx from 'clsx'
import TaskList from '../TaskList/TaskList'
import ColumnHeader from './ColumnHeader'
import ColumnContainer from './ColumnContainer'
import ColumnForm from './ColumnForm'
import ConfirmDialog from '../dialog/ConfirmDialog'
import { useColumnForm } from '../../hooks/column/useColumnForm'
import { Task, Column } from '../../utils/storage'
import { migrateColor } from '../../utils/formatters'
import { useLanguage } from '../../contexts/LanguageContext'

interface TaskColumnProps {
    column: Column
    tasks: Task[]
    onEdit?: (task: Task) => void
}

function TaskColumn({ column, tasks, onEdit }: TaskColumnProps) {
    const { setNodeRef, isOver } = useDroppable({ id: column.id })
    const { trans } = useLanguage()

    const {
        isEditing,
        setIsEditing,
        isConfirmOpen,
        setIsConfirmOpen,
        handleSaveEdit,
        handleDeleteClick,
        handleConfirmDelete,
    } = useColumnForm(column.id)

    return (
        <ColumnContainer
            ref={setNodeRef}
            className={clsx(
                'h-full snap-center sm:snap-start',
                'rounded-lg',
                'border',
                'border-[hsla(220,20%,80%,0.4)] dark:border-[hsla(220,20%,25%,0.6)]',
                'bg-[hsl(0,0%,99%)] dark:bg-[hsl(220,30%,7%)]',
                'overflow-hidden'
            )}
        >
            <div className="flex flex-col h-full max-h-full">
                <div className="flex-none p-1.5 border-b border-[hsla(220,20%,80%,0.4)] dark:border-[hsla(220,20%,25%,0.6)] bg-inherit z-10">
                    {isEditing ? (
                        <ColumnForm
                            initialData={{
                                title: column.title,
                                color: column.color,
                            }}
                            onSave={handleSaveEdit}
                            onCancel={() => setIsEditing(false)}
                        />
                    ) : (
                        <ColumnHeader
                            title={column.title}
                            status={column.id}
                            count={tasks.length}
                            onEditClick={() => setIsEditing(true)}
                            onDeleteClick={handleDeleteClick}
                            color={migrateColor(column.color)}
                        />
                    )}
                </div>

                {!isEditing && (
                    <div
                        className={clsx(
                            'flex-1 overflow-y-auto min-h-0',
                            'scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600',
                            'p-3 flex flex-col gap-3 transition-colors duration-200',
                            isOver
                                ? 'bg-[hsla(210,98%,48%,0.05)]'
                                : 'bg-transparent'
                        )}
                    >
                        <TaskList tasks={tasks} onEdit={onEdit} disabled={isEditing} />

                        {tasks.length === 0 && (
                            <div
                                className={clsx(
                                    'h-24 flex items-center justify-center text-sm rounded-lg border-2 border-dashed transition-all shrink-0',
                                    isOver
                                        ? 'border-app-primary/50 text-app-primary bg-app-primary/5'
                                        : 'border-app-border/30 text-app-subtle/50'
                                )}
                            >
                                {isOver
                                    ? `${trans('drop_here')}`
                                    : `${trans('empty_col')}`}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Column"
                message={`${trans('dialog_del_desc')} "${column.title}"?`}
            />
        </ColumnContainer>
    )
}

export default memo(TaskColumn)
