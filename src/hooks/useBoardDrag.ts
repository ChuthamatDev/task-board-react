import { useState, useCallback } from 'react'
import {
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
} from '@dnd-kit/core'
import { Task, Column } from '../utils/types'

/**
 * คำนวณ position ใหม่ที่สอดแทรกเข้าไปใน list ของ tasks
 * ใช้ midpoint ระหว่าง task ก่อนหน้าและ task ถัดไป
 */
const calculateNewPosition = (tasks: Task[], newIndex: number): number => {
    if (tasks.length === 0) return 1000
    if (newIndex === 0) return tasks[0].position / 2

    if (newIndex >= tasks.length) {
        return tasks[tasks.length - 1].position + 1000
    }

    const prevTask = tasks[newIndex - 1]
    const nextTask = tasks[newIndex]
    return (prevTask.position + nextTask.position) / 2
}

export function useBoardDrag(
    taskItems: Task[],
    columns: Column[],
    updateTaskPosition: (
        id: string,
        newColumnId: string,
        newPosition: number
    ) => void
) {
    const [activeTask, setActiveTask] = useState<Task | null>(null)

    // ─── Drag Start ───────────────────────────
    const onDragStart = useCallback(
        (event: DragStartEvent) => {
            const task = taskItems.find((t) => t.id === event.active.id)
            setActiveTask(task || null)
        },
        [taskItems]
    )

    // ─── Drag Over ────────────────────────────
    // ให้ feedback ทันทีขณะลากข้ามคอลัมน์
    const onDragOver = useCallback(
        (event: DragOverEvent) => {
            const { active, over } = event
            if (!over) return

            const activeId = String(active.id)
            const overId = String(over.id)

            if (activeId === overId) return

            const activeTaskItem = taskItems.find((t) => t.id === activeId)
            if (!activeTaskItem) return

            // กรณีที่ 1: ลากไปวางทับ Task อื่นที่อยู่คนละ Column
            const isOverTask = over.data.current?.type === 'Task'
            if (isOverTask) {
                const overTask = taskItems.find((t) => t.id === overId)
                if (overTask && activeTaskItem.columnId !== overTask.columnId) {
                    // Optimistic update — เปลี่ยน columnId ทันทีขณะลาก
                    const tasksInNewColumn = taskItems
                        .filter(
                            (t) =>
                                t.columnId === overTask.columnId &&
                                t.id !== activeId
                        )
                        .sort((a, b) => a.position - b.position)

                    const overIndex = tasksInNewColumn.findIndex(
                        (t) => t.id === overId
                    )
                    const insertIndex =
                        overIndex >= 0 ? overIndex : tasksInNewColumn.length

                    const newPosition = calculateNewPosition(
                        tasksInNewColumn,
                        insertIndex
                    )

                    updateTaskPosition(activeId, overTask.columnId, newPosition)
                }
                return
            }

            // กรณีที่ 2: ลากไปวางบน Column ว่างๆ (useDroppable ของ Column)
            const isOverColumn = columns.some((col) => col.id === overId)
            if (isOverColumn && activeTaskItem.columnId !== overId) {
                const tasksInNewColumn = taskItems
                    .filter(
                        (t) => t.columnId === overId && t.id !== activeId
                    )
                    .sort((a, b) => a.position - b.position)

                const newPosition = calculateNewPosition(
                    tasksInNewColumn,
                    tasksInNewColumn.length
                )

                updateTaskPosition(activeId, overId, newPosition)
            }
        },
        [taskItems, columns, updateTaskPosition]
    )

    // ─── Drag End ─────────────────────────────
    const onDragEnd = useCallback(
        (event: DragEndEvent) => {
            const { active, over } = event
            setActiveTask(null)

            if (!over) return

            const activeId = String(active.id)
            const overId = String(over.id)

            if (activeId === overId) return

            const currentTask = taskItems.find((t) => t.id === activeId)
            if (!currentTask) return

            let targetColumnId = currentTask.columnId
            let newIndex = 0

            const isOverColumn = columns.some((col) => col.id === overId)

            if (isOverColumn) {
                targetColumnId = overId
                const tasksInColumn = taskItems
                    .filter(
                        (t) =>
                            t.columnId === targetColumnId && t.id !== activeId
                    )
                    .sort((a, b) => a.position - b.position)
                newIndex = tasksInColumn.length
            } else {
                const overTask = taskItems.find((t) => t.id === overId)
                if (overTask) {
                    targetColumnId = overTask.columnId
                    const tasksInColumn = taskItems
                        .filter(
                            (t) =>
                                t.columnId === targetColumnId &&
                                t.id !== activeId
                        )
                        .sort((a, b) => a.position - b.position)

                    const overTaskIndex = tasksInColumn.findIndex(
                        (t) => t.id === overId
                    )

                    newIndex =
                        overTaskIndex >= 0
                            ? overTaskIndex
                            : tasksInColumn.length
                }
            }

            const targetTasks = taskItems
                .filter(
                    (t) => t.columnId === targetColumnId && t.id !== activeId
                )
                .sort((a, b) => a.position - b.position)

            const newPosition = calculateNewPosition(targetTasks, newIndex)

            if (
                currentTask.position !== newPosition ||
                currentTask.columnId !== targetColumnId
            ) {
                updateTaskPosition(activeId, targetColumnId, newPosition)
            }
        },
        [taskItems, columns, updateTaskPosition]
    )

    // ─── Drag Cancel ──────────────────────────
    const onDragCancel = useCallback(() => {
        setActiveTask(null)
    }, [])

    return {
        activeTask,
        onDragStart,
        onDragOver,
        onDragEnd,
        onDragCancel,
    }
}
