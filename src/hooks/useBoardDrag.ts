import { useState } from 'react'
import { DragStartEvent, DragEndEvent } from '@dnd-kit/core'
import { Task, Column } from '../utils/storage'

export function useBoardDrag(
    taskItems: Task[],
    columns: Column[],
    moveTask: (id: string, newColumnId: string, newIndex: number) => void,
    reorderTask: (id: string, newIndex: number) => void
) {
    const [activeTask, setActiveTask] = useState<Task | null>(null)

    const onDragStart = (event: DragStartEvent) => {
        const { active } = event
        const task = taskItems.find((t) => t.id === active.id)
        setActiveTask(task || null)
    }

    const onDragOver = () => {
        // เว้นว่างไว้ หรือใส่ Logic Optimistic UI ขั้นสูงในอนาคต
    }

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        setActiveTask(null)

        if (!over) return

        const activeId = String(active.id)
        const overId = String(over.id)

        if (activeId === overId) return

        const activeTask = taskItems.find((t) => t.id === activeId)
        if (!activeTask) return

        // --- กรณีที่ 1: ลากไปวางทับ "Column" (เช่น พื้นที่ว่างใน Column) ---
        // เช็คจาก column.id แทน column.status
        const isOverColumn = columns.some((col) => col.id === overId)

        if (isOverColumn) {
            // ถ้าย้ายไป Column ใหม่ ให้ไปต่อท้ายสุด หรือขึ้นบนสุด (ที่นี่เลือก Index 0 คือบนสุด)
            if (activeTask.columnId !== overId) {
                moveTask(activeId, overId, 0)
            }
            return
        }

        // --- กรณีที่ 2: ลากไปวางทับ "Task อื่น" ---
        const overTask = taskItems.find((t) => t.id === overId)

        if (overTask) {
            // เราต้องหาว่า Task ที่เราไปทับเนี่ย มันอยู่อันดับที่เท่าไหร่ใน Column นั้น
            // เพื่อที่เราจะได้แทรกตัวเข้าไปได้ถูกช่อง
            const tasksInTargetColumn = taskItems
                .filter((t) => t.columnId === overTask.columnId)
                .sort((a, b) => a.position - b.position) // เรียงตาม Position จริงก่อน

            const newIndex = tasksInTargetColumn.findIndex(
                (t) => t.id === overId
            )

            // 2.1 ถ้าอยู่ Column เดียวกัน (Reorder)
            if (activeTask.columnId === overTask.columnId) {
                reorderTask(activeId, newIndex)
            }
            // 2.2 ถ้าข้ามไปคนละ Column (Move)
            else {
                moveTask(activeId, overTask.columnId, newIndex)
            }
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
