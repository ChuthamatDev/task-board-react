import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import ColumnForm from './ColumnForm'
import { useColumns } from '../../contexts/ColumnContext'
import { useLanguage } from '../../contexts/LanguageContext'

export default function AddColumnButton() {
    const [isAdding, setIsAdding] = useState(false)
    const { addColumn } = useColumns()
    const { trans } = useLanguage()

    const handleSave = async (title: string) => {
        await addColumn(title)
        setIsAdding(false)
    }

    if (isAdding) {
        return (
            <div className="flex-shrink-0 w-80 bg-app-surface rounded-lg p-4 shadow-sm border border-app-border transition-colors duration-300">
                <ColumnForm
                    onSave={handleSave}
                    onCancel={() => setIsAdding(false)}
                />
            </div>
        )
    }

    return (
        <button
            onClick={() => setIsAdding(true)}
            className="flex-shrink-0 w-80 h-fit bg-app-surface/50 hover:bg-app-surface rounded-lg p-4 border-2 border-dashed border-app-border hover:border-app-primary/50 transition-all duration-300 group"
        >
            <div className="flex items-center justify-center gap-2 text-app-text-secondary group-hover:text-app-primary transition-colors">
                <PlusIcon className="w-5 h-5" />
                <span className="font-medium">{trans('add_column')}</span>
            </div>
        </button>
    )
}
