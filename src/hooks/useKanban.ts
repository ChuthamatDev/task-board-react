import { useMemo, useState, useCallback } from 'react'
import { useTasks } from '../contexts/TaskContext'
import { Priority, Task } from '../utils/types'

export function useKanban() {
    const [searchQuery, setSearchQuery] = useState('')
    const [filterPriority, setFilterPriority] = useState<Priority | ''>('')

    const { tasks, updateTask, isLoading } = useTasks()

    const filteredTasks = useMemo(() => {
        if (!Array.isArray(tasks)) {
            console.warn('tasks is not an array:', tasks)
            return []
        }

        return tasks.filter((task) => {
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
    }, [tasks, searchQuery, filterPriority])

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
            const targetColumnTasks = tasks.filter(
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
        [tasks, updateTask]
    )

    const reorderTask = useCallback(
        async (taskId: string, newIndex: number) => {
            const task = tasks.find((t) => t.id === taskId)
            if (!task) return

            const columnTasks = tasks.filter(
                (t) => t.columnId === task.columnId && t.id !== taskId
            )
            const newPosition = calculateNewPosition(columnTasks, newIndex)

            await updateTask(taskId, { position: newPosition })
        },
        [tasks, updateTask]
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
        tasks,
    }
}
