import { useState } from 'react'
import { DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core'
import { Task, Column } from '../utils/storage'

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

    const onDragStart = (event: DragStartEvent) => {
        const { active } = event
        const task = taskItems.find((t) => t.id === active.id)
        setActiveTask(task || null)
    }

    const onDragOver = (event: DragOverEvent) => {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const isActiveTask = active.data.current?.type === 'Task'
        const isOverTask = over.data.current?.type === 'Task'

        if (!isActiveTask || !isOverTask) return
    }

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        setActiveTask(null)

        if (!over) return

        const activeId = String(active.id)
        const overId = String(over.id)

        const currentTask = taskItems.find((t) => t.id === activeId)
        if (!currentTask) return

        let targetColumnId = currentTask.columnId
        let newIndex = 0

        const isOverColumn = columns.some((col) => col.id === overId)

        if (isOverColumn) {
            targetColumnId = overId
            newIndex = 0
        } else {
            const overTask = taskItems.find((t) => t.id === overId)
            if (overTask) {
                targetColumnId = overTask.columnId
                const tasksInColumn = taskItems
                    .filter(
                        (t) =>
                            t.columnId === targetColumnId && t.id !== activeId
                    )
                    .sort((a, b) => a.position - b.position)

                const overTaskIndex = tasksInColumn.findIndex(
                    (t) => t.id === overId
                )

                newIndex =
                    overTaskIndex >= 0 ? overTaskIndex : tasksInColumn.length
            }
        }

        const targetTasks = taskItems
            .filter((t) => t.columnId === targetColumnId && t.id !== activeId)
            .sort((a, b) => a.position - b.position)

        const newPosition = calculateNewPosition(targetTasks, newIndex)

        if (
            currentTask.position !== newPosition ||
            currentTask.columnId !== targetColumnId
        ) {
            updateTaskPosition(activeId, targetColumnId, newPosition)
        }
    }

    const onDragCancel = () => {
        setActiveTask(null)
    }

    return {
        activeTask,
        onDragStart,
        onDragOver,
        onDragEnd,
        onDragCancel,
    }
}
