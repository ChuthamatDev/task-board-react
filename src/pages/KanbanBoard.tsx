import {
    DndContext,
    DragOverlay,
    closestCorners,
    useSensor,
    useSensors,
    PointerSensor,
    TouchSensor,
    KeyboardSensor,
    defaultDropAnimationSideEffects,
    DropAnimation,
    MeasuringStrategy,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useBoardDrag } from '../hooks/useBoardDrag'
import { useTaskModal } from '../hooks/task/useTaskModal'
import { useKanban } from '../hooks/useKanban'
import { useColumns } from '../contexts/ColumnContext'
import { useTasks } from '../contexts/TaskContext'
import BoardHeader from '../components/board/BoardHeader'
import BoardColumns from '../components/board/BoardColumns'
import TaskCard from '../components/TaskCard/TaskCard'
import TaskModal from '../components/TaskModal/TaskModal'
import BoardSkeleton from '../components/ui/KanbanBoard.Skeleton'

const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: { opacity: '0.5' },
        },
    }),
}

export default function KanbanBoard() {
    const {
        searchQuery,
        setSearchQuery,
        filterPriority,
        setFilterPriority,
        filteredTasks,
        isLoading,
        tasks,
    } = useKanban()

    const { columns } = useColumns()

    const { updateTask } = useTasks()

    const { activeTask, onDragStart, onDragOver, onDragEnd, onDragCancel } =
        useBoardDrag(tasks, columns, (id, newColumnId, newPosition) => {
            updateTask(id, { columnId: newColumnId, position: newPosition })
        })

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, {
            activationConstraint: { delay: 150, tolerance: 5 },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const modal = useTaskModal()

    if (isLoading) {
        return <BoardSkeleton />
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            onDragCancel={onDragCancel}
            measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
        >
            <div className="flex flex-col h-full w-full">
                <div className="flex-none border-b border-app-border/50 transition-colors duration-300">
                    <BoardHeader
                        onNew={modal.openNewTask}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        filterPriority={filterPriority}
                        setFilterPriority={setFilterPriority}
                    />
                </div>

                <div className="flex-1 overflow-x-auto overflow-y-hidden px-6 pb-4 scrollbar-thin scroll-smooth snap-x snap-mandatory">
                    <div className="h-full inline-flex gap-6 items-start">
                        <BoardColumns
                            tasks={filteredTasks}
                            onEdit={modal.openEditTask}
                        />
                    </div>
                </div>

                <TaskModal
                    isOpen={modal.isOpen}
                    onClose={modal.closeModal}
                    taskToEdit={modal.taskToEdit}
                />

                <DragOverlay dropAnimation={dropAnimationConfig}>
                    {activeTask ? (
                        <TaskCard task={activeTask} isOverlay />
                    ) : null}
                </DragOverlay>
            </div>
        </DndContext>
    )
}
