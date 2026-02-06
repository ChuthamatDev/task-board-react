import { useMemo, useState, useCallback } from 'react'
import { useTasks } from '../contexts/TaskContext'
import { Priority, Task } from '../utils/storage'

export function useKanban() {
    const [searchQuery, setSearchQuery] = useState('')
    const [filterPriority, setFilterPriority] = useState<Priority | ''>('')

    const { taskItems, updateTask, isLoading } = useTasks()

    const filteredTasks = useMemo(() => {
        if (!Array.isArray(taskItems)) {
            console.warn('taskItems is not an array:', taskItems)
            return []
        }

        return taskItems.filter((task) => {
            const matchesSearch =
                !searchQuery.trim() ||
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase())
            const matchesPriority =
                !filterPriority || task.priority === filterPriority
            return matchesSearch && matchesPriority
        })
    }, [taskItems, searchQuery, filterPriority])

    const calculateNewPosition = (
        tasksInColumn: Task[],
        newIndex: number
    ): number => {
        const sortedTasks = [...tasksInColumn].sort(
            (a, b) => a.position - b.position
        )

        const prevTask = sortedTasks[newIndex - 1]
        const nextTask = sortedTasks[newIndex]

        if (!prevTask && !nextTask) return 1000
        if (!prevTask) return nextTask.position / 2
        if (!nextTask) return prevTask.position + 1000

        return (prevTask.position + nextTask.position) / 2
    }

    const moveTask = useCallback(
        async (taskId: string, newColumnId: string, newIndex: number) => {
            const targetColumnTasks = taskItems.filter(
                (t) => t.columnId === newColumnId && t.id !== taskId
            )
            const newPosition = calculateNewPosition(
                targetColumnTasks,
                newIndex
            )

            await updateTask(taskId, {
                columnId: newColumnId,
                position: newPosition,
            })
        },
        [taskItems, updateTask]
    )

    const reorderTask = useCallback(
        async (taskId: string, newIndex: number) => {
            const task = taskItems.find((t) => t.id === taskId)
            if (!task) return

            const columnTasks = taskItems.filter(
                (t) => t.columnId === task.columnId && t.id !== taskId
            )
            const newPosition = calculateNewPosition(columnTasks, newIndex)

            await updateTask(taskId, { position: newPosition })
        },
        [taskItems, updateTask]
    )

    return {
        searchQuery,
        setSearchQuery,
        filterPriority,
        setFilterPriority,
        filteredTasks,
        isLoading,
        moveTask,
        reorderTask,
        taskItems,
    }
}
