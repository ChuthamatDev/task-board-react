import { useState } from 'react'
import { DragStartEvent, DragOverEvent, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core'

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
    updateTaskPosition: (id: string, newColumnId: string, newPosition: number) => void
) {
    const [activeTask, setActiveTask] = useState<Task | null>(null)

    const onDragStart = (event: DragStartEvent) => {
        const { active } = event
        const task = taskItems.find((t) => t.id === active.id)
        setActiveTask(task || null)
    }

    // ✅ เพิ่ม onDragOver: เพื่อให้การย้ายข้าม Column ดูลื่นไหล (Optimistic UI)
    const onDragOver = (event: DragOverEvent) => {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const isActiveTask = active.data.current?.type === 'Task'
        const isOverTask = over.data.current?.type === 'Task'

        if (!isActiveTask || !isOverTask) return

        // Optimistic UI updates removed - relying on backend updates instead
        // The drag preview will still work via DragOverlay
    }

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        setActiveTask(null)

        if (!over) return

        const activeId = String(active.id)
        const overId = String(over.id)

        // หาข้อมูล Task ปัจจุบัน
        const currentTask = taskItems.find(t => t.id === activeId)
        if (!currentTask) return

        // --- คำนวณหาตำแหน่งปลายทาง ---
        let targetColumnId = currentTask.columnId
        let newIndex = 0

        const isOverColumn = columns.some((col) => col.id === overId)

        if (isOverColumn) {
            // กรณีวางใส่ Column ว่างๆ -> ย้ายไป Column นั้น ตำแหน่งแรก
            targetColumnId = overId
            newIndex = 0
        } else {
            // กรณีวางใส่ Task อื่น
            const overTask = taskItems.find((t) => t.id === overId)
            if (overTask) {
                targetColumnId = overTask.columnId
                // กรอง Task ใน Column เป้าหมายมาเรียงก่อน
                const tasksInColumn = taskItems
                    .filter(t => t.columnId === targetColumnId && t.id !== activeId)
                    .sort((a, b) => a.position - b.position)

                // หา Index ที่ควรจะอยู่
                const overTaskIndex = tasksInColumn.findIndex(t => t.id === overId)

                // Logic ง่ายๆ: ถ้าวางทับ ให้ต่อท้ายตัวที่ทับ (หรือคุณจะเช็ค active.rect กับ over.rect เพื่อดูว่าวางบน/ล่างก็ได้)
                newIndex = overTaskIndex >= 0 ? overTaskIndex : tasksInColumn.length
            }
        }

        // --- 🚀 หัวใจสำคัญ: คำนวณ Position แบบ Float ---
        // เอา Task ใน Column เป้าหมายมาเรียงใหม่ (ไม่รวมตัวที่กำลังลาก)
        const targetTasks = taskItems
            .filter(t => t.columnId === targetColumnId && t.id !== activeId)
            .sort((a, b) => a.position - b.position)

        // คำนวณค่า Position ใหม่
        const newPosition = calculateNewPosition(targetTasks, newIndex)

        // ยิง API อัปเดต (ส่งค่า Position ไปเลย Backend ไม่ต้องคิด)
        // เช็คว่ามีการเปลี่ยนแปลงจริงไหมค่อยยิง
        if (currentTask.position !== newPosition || currentTask.columnId !== targetColumnId) {
            updateTaskPosition(activeId, targetColumnId, newPosition)
        }
    }

    const onDragCancel = () => {
        setActiveTask(null)
        // ควรมี logic reset state กลับถ้ายกเลิก (optional)
    }

    return {
        activeTask,
        onDragStart,
        onDragOver,
        onDragEnd,
        onDragCancel,
    }
}