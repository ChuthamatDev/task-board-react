import {
    createContext,
    useCallback,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from 'react'
import { Task, TaskCreateData } from '../utils/types'
import api from '../services/api'
import { useColumns } from './ColumnContext'
import { useAuth } from './AuthContext'
import { useAlert } from './AlertContext'

interface TaskContextType {
    tasks: Task[]
    isLoading: boolean
    createTask: (taskData: TaskCreateData) => Promise<void>
    updateTask: (id: string, updates: Partial<Task>) => Promise<void>
    deleteTask: (id: string) => Promise<void>
    fetchTasks: () => Promise<void>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export default function TaskProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { columns } = useColumns()
    const { isAuthenticated } = useAuth()
    const { setAlert } = useAlert()

    const fetchTasks = useCallback(async () => {
        if (!isAuthenticated) {
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        try {
            const res = await api.get('/tasks')
            const fetchedTasks: Task[] = res.data?.data || []
            setTasks(fetchedTasks)

            const taskCountMap: Record<string, number> = {}
            fetchedTasks.forEach((t) => {
                taskCountMap[t.columnId] = (taskCountMap[t.columnId] || 0) + 1
            })
            localStorage.setItem('taskCountPerColumn', JSON.stringify(taskCountMap))
        } catch (error) {
            setAlert('Failed to fetch tasks', 'error')
            setTasks([])
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
                    setAlert('No columns available to create task', 'error')
                    return
                }

                await api.post('/tasks', {
                    ...taskData,
                    columnId: defaultColumnId,
                })
                fetchTasks()
            } catch (error) {
                setAlert('Failed to create task', 'error')
            }
        },
        [fetchTasks, columns]
    )

    const updateTask = useCallback(
        async (id: string, updates: Partial<Task>) => {
            try {
                setTasks((prev) =>
                    prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
                )

                await api.patch(`/tasks/${id}`, updates)
            } catch (error) {
                setAlert('Failed to update task', 'error')
                fetchTasks()
            }
        },
        [fetchTasks]
    )

    const deleteTask = useCallback(
        async (id: string) => {
            try {
                setTasks((prev) => prev.filter((t) => t.id !== id))
                await api.delete(`/tasks/${id}`)
            } catch (error) {
                setAlert('Failed to delete task', 'error')
                fetchTasks()
            }
        },
        [fetchTasks]
    )

    return (
        <TaskContext.Provider
            value={{
                tasks,
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
