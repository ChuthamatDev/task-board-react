import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAlert } from '../../contexts/AlertContext'
import { useTasks } from '../../contexts/TaskContext'
import { Task, Priority } from '../../utils/types'
import { useLanguage } from '../../contexts/LanguageContext'

export interface TaskFormData {
    title: string
    description: string
    priority: Priority
}

interface UseTaskFormProps {
    taskToEdit: Task | null
    isOpen: boolean
    onClose: () => void
}

export default function useTaskForm({
    taskToEdit,
    isOpen,
    onClose,
}: UseTaskFormProps) {
    const { createTask, updateTask } = useTasks()
    const { setAlert } = useAlert()
    const { trans } = useLanguage()

    const form = useForm<TaskFormData>({
        defaultValues: {
            title: '',
            description: '',
            priority: 'medium',
        },
    })

    const { reset } = form

    useEffect(() => {
        if (!isOpen) return

        if (taskToEdit) {
            reset({
                title: taskToEdit.title,
                description: taskToEdit.description,
                priority: taskToEdit.priority,
            })
        } else {
            reset({
                title: '',
                description: '',
                priority: 'medium',
            })
        }
    }, [isOpen, taskToEdit, reset])

    const onSubmit: SubmitHandler<TaskFormData> = (data) => {
        if (taskToEdit) {
            updateTask(taskToEdit.id, data)
            setAlert(`${trans('alert_update_success')}`, 'success')
        } else {
            createTask(data)
            setAlert(`${trans('alert_create_success')}`, 'success')
        }
        onClose()
    }

    return {
        ...form,
        onSubmit,
        isEditMode: !!taskToEdit,
    }
}
