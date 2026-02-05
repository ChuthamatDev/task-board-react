import { useTasks } from '../../contexts/TaskContext'
import Button from './Button'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../contexts/LanguageContext'

const RefreshButton = () => {
    const { fetchTasks, isLoading } = useTasks()
    const { trans } = useLanguage()

    return (
        <Button
            variant="outline"
            size="md"
            onClick={fetchTasks}
            disabled={isLoading}
            className={isLoading ? 'animate-spin' : ''}
            title="Refresh Board"
        >
            <ArrowPathIcon
                className={`w-5 h-5 sm:mr-1.5 ${isLoading ? 'animate-spin' : ''}`}
            />

            <span className="hidden sm:inline">
                {isLoading
                    ? `${trans('btn_refresh')}`
                    : `${trans('btn_refresh')}`}
            </span>
        </Button>
    )
}

export default RefreshButton
