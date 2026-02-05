import { memo, useMemo } from 'react'
import TaskCard from '../TaskCard/TaskCard'
import { Task } from '../../utils/storage'
import { useTasks } from '../../contexts/TaskContext'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

interface TaskListProps {
    tasks: Task[]
    onEdit?: (task: Task) => void
}

function TaskList({ tasks, onEdit }: TaskListProps) {
    const { deleteTask } = useTasks()
    const taskIds = useMemo(() => tasks.map((t) => t.id), [tasks])

    return (
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={deleteTask}
                />
            ))}
        </SortableContext>
    )
}

export default memo(TaskList)
