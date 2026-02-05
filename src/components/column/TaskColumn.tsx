// src/components/column/TaskColumn.tsx
import { memo } from 'react'
import { useDroppable } from '@dnd-kit/core'
import clsx from 'clsx'
import TaskList from '../TaskList/TaskList'
import ColumnHeader from './ColumnHeader'
import ColumnContainer from './ColumnContainer'
import ColumnForm from './ColumnForm'
import ConfirmDialog from '../dialog/ConfirmDialog'
import { useColumnForm } from '../../hooks/column/useColumnForm'
import { Task, Column } from '../../utils/storage' // เพิ่ม Import Column
import { useLanguage } from '../../contexts/LanguageContext'

// 1. ปรับ Interface ให้รับ Column object ทั้งก้อน
interface TaskColumnProps {
    column: Column
    tasks: Task[]
    onEdit?: (task: Task) => void
}

function TaskColumn({
    column, // รับเป็นก้อน
    tasks,
    onEdit,
}: TaskColumnProps) {
    // 2. ใช้ column.id เป็น ID สำหรับ Drop Zone
    const { setNodeRef, isOver } = useDroppable({ id: column.id })
    const { trans } = useLanguage()

    // ใช้ ID ของ Column เพื่อจัดการ Form (ลบ/แก้ไข)
    const {
        isEditing,
        setIsEditing,
        isConfirmOpen,
        setIsConfirmOpen,
        handleSaveEdit,
        handleDeleteClick,
        handleConfirmDelete,
    } = useColumnForm(column.id)

    // *หมายเหตุ: ถ้า Database ยังไม่มี field color ให้ใส่ค่า default ไปก่อน
    // const displayColor = column.color || 'bg-gray-500'

    return (
        <ColumnContainer
            ref={setNodeRef}
            className="h-full snap-center sm:snap-start"
        >
            <div className="flex flex-col h-full max-h-full">
                <div className="flex-none p-3 border-b border-app-border/50 bg-inherit rounded-t-xl z-10">
                    {isEditing ? (
                        <ColumnForm
                            initialData={{
                                title: column.title,
                                //color: displayColor,
                            }}
                            onSave={handleSaveEdit}
                            onCancel={() => setIsEditing(false)}
                        />
                    ) : (
                        <ColumnHeader
                            title={column.title}
                            status={column.id} // ส่ง ID ไปแทน status เดิม
                            count={tasks.length}
                            
                            onEditClick={() => setIsEditing(true)}
                            onDeleteClick={handleDeleteClick}
                        />
                    )}
                </div>

                {!isEditing && (
                    <div
                        className={clsx(
                            'flex-1 overflow-y-auto min-h-0',
                            'scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600',
                            'p-3 flex flex-col gap-3 transition-colors duration-200',
                            isOver ? 'bg-app-primary/5' : 'bg-transparent'
                        )}
                    >
                        {/* ส่ง Tasks เข้าไปแสดงผล */}
                        <TaskList tasks={tasks} onEdit={onEdit} />

                        {tasks.length === 0 && (
                            <div
                                className={clsx(
                                    'h-24 flex items-center justify-center text-sm rounded-lg border-2 border-dashed transition-all shrink-0',
                                    isOver
                                        ? 'border-app-primary/50 text-app-primary bg-app-primary/5'
                                        : 'border-app-border/50 text-app-subtle/50'
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
