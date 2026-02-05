import { useState } from 'react'
import { useColumns } from '../../contexts/ColumnContext'
import { useAlert } from '../../contexts/AlertContext'
import { useLanguage } from '../../contexts/LanguageContext'

export function useColumnForm(columnId: string) {
    const { updateColumn, deleteColumn } = useColumns()
    const { setAlert } = useAlert()
    const { trans } = useLanguage()

    const [isEditing, setIsEditing] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)

    const handleSaveEdit = (newTitle: string) => {
        updateColumn(columnId, { title: newTitle })
        setIsEditing(false)
        setAlert(`${trans('alert_update_success')}`, 'success')
    }

    const handleDeleteClick = () => {
        setIsConfirmOpen(true)
    }

    const handleConfirmDelete = () => {
        deleteColumn(columnId)
        setIsConfirmOpen(false)
        setAlert(`${trans('alert_delete_success')}`, 'success')
    }

    return {
        isEditing,
        setIsEditing,
        isConfirmOpen,
        setIsConfirmOpen,
        handleSaveEdit,
        handleDeleteClick,
        handleConfirmDelete,
    }
}
