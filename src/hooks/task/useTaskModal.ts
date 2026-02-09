import { useState, useCallback } from 'react'
import { Task } from '../../utils/types'

export function useTaskModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)

    const openNewTask = useCallback(() => {
        setTaskToEdit(null)
        setIsOpen(true)
    }, [])

    const openEditTask = useCallback((task: Task) => {
        setTaskToEdit(task)
        setIsOpen(true)
    }, [])

    const closeModal = useCallback(() => {
        setIsOpen(false)
        setTaskToEdit(null)
    }, [])

    return {
        isOpen,
        taskToEdit,
        openNewTask,
        openEditTask,
        closeModal,
    }
}
