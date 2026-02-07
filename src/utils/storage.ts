export type Priority = 'low' | 'medium' | 'high'

export type TaskStatus = 'draft' | 'todo' | 'doing' | 'done'

export interface Task {
    id: string
    title: string
    description: string
    priority: Priority
    position: number
    columnId: string
    createdAt: string
}

export interface Column {
    id: string
    title: string
    position: number
    color?: string
}
