import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import TaskForm from './TaskForm'
import useTaskForm from '../../hooks/task/useTaskForm'
import { Task } from '../../utils/types'
import { useLanguage } from '../../contexts/LanguageContext'

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
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel
                        className="
                            w-full max-w-xl rounded-2xl p-6
                            bg-white dark:bg-gray-800
                            text-gray-900 dark:text-white
                            border border-gray-200 dark:border-gray-700
                            shadow-xl
                            transition-colors
                        "
                    >
                        <div className="flex justify-between mb-6">
                            <Dialog.Title className="text-2xl font-bold">
                                {form.isEditMode
                                    ? `${trans('btn_edit')}`
                                    : `${trans('btn_new_task')}`}
                            </Dialog.Title>

                            <button onClick={onClose}>
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        <TaskForm
                            form={form}
                            onSubmit={form.onSubmit}
                            isEditMode={form.isEditMode}
                            onCancel={onClose}
                        />
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
    )
}
