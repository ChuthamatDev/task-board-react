// src/contexts/TaskContext.tsx
import {
    createContext,
    useCallback,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from 'react'
import { Task } from '../utils/storage'
import api from '../services/api' // Import ตัวที่เราสร้าง
import { useColumns } from './ColumnContext'
import { useAuth } from './AuthContext'

interface TaskContextType {
    taskItems: Task[]
    isLoading: boolean
    createTask: (taskData: any) => Promise<void>
    updateTask: (id: string, updates: Partial<Task>) => Promise<void>
    deleteTask: (id: string) => Promise<void>
    fetchTasks: () => Promise<void>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export default function TaskProvider({ children }: { children: ReactNode }) {
    const [taskItems, setTaskItems] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { columns } = useColumns()
    const { isAuthenticated } = useAuth()

    const fetchTasks = useCallback(async () => {
        if (!isAuthenticated) {
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        try {
            const res = await api.get('/tasks')
            setTaskItems(res.data)
        } catch (error) {
            console.error('Error fetching:', error)
        } finally {
            setIsLoading(false)
        }
    }, [isAuthenticated])

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    const createTask = useCallback(
        async (taskData: any) => {
            try {
                const defaultColumnId = columns[0]?.id

                if (!defaultColumnId) {
                    console.error('No columns available to create task')
                    return
                }

                await api.post('/tasks', {
                    ...taskData,
                    columnId: defaultColumnId,
                })
                fetchTasks()
            } catch (error) {
                console.error(error)
            }
        },
        [fetchTasks, columns]
    )

    const updateTask = useCallback(
        async (id: string, updates: Partial<Task>) => {
            try {
                setTaskItems((prev) =>
                    prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
                )

                await api.patch(`/tasks/${id}`, updates)
            } catch (error) {
                console.error(error)
                fetchTasks()
            }
        },
        [fetchTasks]
    )

    const deleteTask = useCallback(
        async (id: string) => {
            try {
                setTaskItems((prev) => prev.filter((t) => t.id !== id))
                await api.delete(`/tasks/${id}`)
            } catch (error) {
                console.error(error)
                fetchTasks()
            }
        },
        [fetchTasks]
    )

    return (
        <TaskContext.Provider
            value={{
                taskItems,
                isLoading,
                createTask,
                updateTask,
                deleteTask,
                fetchTasks,
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}

export const useTasks = () => {
    const context = useContext(TaskContext)
    if (!context) throw new Error('useTasks must be used within TaskProvider')
    return context
}
