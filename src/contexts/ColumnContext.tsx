import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
    useMemo,
} from 'react'
import { Column } from '../utils/storage'
import api from '../services/api'
import { useAuth } from './AuthContext'

interface ColumnContextType {
    columns: Column[]
    addColumn: (title: string, color?: string) => Promise<void>
    updateColumn: (id: string, updates: Partial<Column>) => Promise<void>
    deleteColumn: (id: string) => Promise<void>
}

const ColumnContext = createContext<ColumnContextType | undefined>(undefined)

export default function ColumnProvider({ children }: { children: ReactNode }) {
    const [columns, setColumns] = useState<Column[]>([])
    const { isAuthenticated } = useAuth()

    const fetchColumns = useCallback(async () => {
        if (!isAuthenticated) {
            return
        }

        try {
            const response = await api.get('/columns')
            setColumns(response.data)
        } catch (error) {
            console.error('Error fetching columns', error)
        }
    }, [isAuthenticated])

    useEffect(() => {
        fetchColumns()
    }, [fetchColumns])

    const addColumn = useCallback(
        async (title: string, color?: string) => {
            if (!title.trim()) return
            try {
                await api.post('/columns', { title: title.trim(), color })
                fetchColumns()
            } catch (error) {
                console.error('Error adding column', error)
            }
        },
        [fetchColumns]
    )

    const updateColumn = useCallback(
        async (id: string, updates: Partial<Column>) => {
            try {
                setColumns((prev) =>
                    prev.map((col) =>
                        col.id === id ? { ...col, ...updates } : col
                    )
                )

                await api.patch(`/columns/${id}`, updates)
            } catch (error) {
                console.error('Error updating column', error)
                fetchColumns()
            }
        },
        [fetchColumns]
    )

    const deleteColumn = useCallback(
        async (id: string) => {
            try {
                setColumns((prev) => prev.filter((col) => col.id !== id))
                await api.delete(`/columns/${id}`)
            } catch (error) {
                console.error('Error deleting column', error)
                fetchColumns()
            }
        },
        [fetchColumns]
    )

    const value = useMemo(
        () => ({
            columns,
            addColumn,
            updateColumn,
            deleteColumn,
        }),
        [columns, addColumn, updateColumn, deleteColumn]
    )

    return (
        <ColumnContext.Provider value={value}>
            {children}
        </ColumnContext.Provider>
    )
}

export const useColumns = () => {
    const context = useContext(ColumnContext)
    if (!context)
        throw new Error('useColumns must be used within ColumnProvider')
    return context
}
