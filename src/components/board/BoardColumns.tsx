import { useColumns } from '../../contexts/ColumnContext'
import TaskColumn from '../column/TaskColumn'
import AddColumnButton from '../column/AddColumnButton'
import { Task } from '../../utils/types'

interface BoardColumnsProps {
    tasks: Task[]
    onEdit: (task: Task) => void
}

export default function BoardColumns({ tasks, onEdit }: BoardColumnsProps) {
    const { columns } = useColumns()

    const sortedColumns = [...columns].sort((a, b) => a.position - b.position)

    return (
        <>
            {sortedColumns.map((col) => {
                const columnTasks = tasks
                    .filter((t) => t.columnId === col.id)
                    .sort((a, b) => a.position - b.position)

                return (
                    <TaskColumn
                        key={col.id}
                        column={col}
                        tasks={columnTasks}
                        onEdit={onEdit}
                    />
                )
            })}

            <AddColumnButton />
        </>
    )
}
