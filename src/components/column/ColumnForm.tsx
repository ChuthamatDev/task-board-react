import { useState, FormEvent } from 'react'
import Button from '../ui/Button'
import { CheckIcon } from '@heroicons/react/24/outline'
import Input from '../ui/Input'
import { COLUMN_COLORS, migrateColor } from '../../utils/formatters'
import { useLanguage } from '../../contexts/LanguageContext'

interface ColumnFormProps {
    onSave: (title: string, color: string) => void
    onCancel: () => void
    initialData?: {
        title?: string
        color?: string
    }
}

export default function ColumnForm({
    onSave,
    onCancel,
    initialData,
}: ColumnFormProps) {
    const [title, setTitle] = useState(initialData?.title || '')
    const { trans } = useLanguage()

    const [selectedColor, setSelectedColor] = useState(() => {
        return migrateColor(initialData?.color)
    })

    const [error, setError] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (!title.trim()) {
            setError('Column title is required')
            return
        }

        onSave(title, selectedColor)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pointer-events-auto">
            <div>
                <Input
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                        setError('')
                    }}
                    placeholder={trans('column_title')}
                    error={error}
                    autoFocus
                />
            </div>

            <div>
                <div className="flex flex-wrap gap-3">
                    {Object.entries(COLUMN_COLORS).map(([name, colorClass]) => (
                        <button
                            key={name}
                            type="button"
                            onClick={() => setSelectedColor(colorClass)}
                            className={`
                                w-8 h-8 rounded-full ${colorClass} 
                                flex items-center justify-center
                                transition-all hover:scale-110
                                ${selectedColor === colorClass
                                    ? 'ring-2 ring-offset-2 ring-app-text scale-110 shadow-sm'
                                    : 'opacity-70 hover:opacity-100'
                                }
                            `}
                            title={name}
                        >
                            {selectedColor === colorClass && (
                                <CheckIcon className="w-5 h-5 text-white drop-shadow-md" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={onCancel}
                >
                    {trans('btn_cancel')}
                </Button>

                <Button type="submit" variant="primary" size="sm">
                    {trans('btn_save')}
                </Button>
            </div>
        </form>
    )
}
