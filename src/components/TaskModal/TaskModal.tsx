import TaskForm from './TaskForm'
import useTaskForm from '../../hooks/task/useTaskForm'
import { Task } from '../../utils/types'
import { useLanguage } from '../../contexts/LanguageContext'
import Modal from '../ui/Modal'

interface TaskModalProps {
    isOpen: boolean
    onClose: () => void
    taskToEdit: Task | null
}

export default function TaskModal({
    isOpen,
    onClose,
    taskToEdit,
}: TaskModalProps) {
    const form = useTaskForm({ isOpen, onClose, taskToEdit })
    const { trans } = useLanguage()

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={form.isEditMode ? trans('btn_edit') : trans('btn_new_task')}
        >
            <TaskForm
                form={form}
                onSubmit={form.onSubmit}
                isEditMode={form.isEditMode}
                onCancel={onClose}
            />
        </Modal>
    )
}
