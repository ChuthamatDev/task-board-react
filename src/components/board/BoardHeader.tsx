import { memo, SetStateAction, Dispatch } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import Button from '../ui/Button'
import RefreshButton from '../ui/RefreshButton'
import SearchBar from '../ui/SearchBar'
import { Priority } from '../../utils/types'
import { useLanguage } from '../../contexts/LanguageContext'

interface BoardHeaderProps {
    onNew: () => void
    searchQuery: string
    setSearchQuery: Dispatch<SetStateAction<string>>
    filterPriority: Priority | ''
    setFilterPriority: Dispatch<SetStateAction<Priority | ''>>
}

function BoardHeader({
    onNew,
    searchQuery,
    setSearchQuery,
    filterPriority,
    setFilterPriority,
}: BoardHeaderProps) {
    const { trans } = useLanguage()

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4 bg-app-bg transition-colors duration-300">
            <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-app-text truncate transition-colors duration-300">
                    {trans('app_title')}
                </h1>
                <p className="text-sm text-app-subtle mt-1 truncate transition-colors duration-300">
                    {trans('app_sub')}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center transition-colors duration-300">
                <div className="w-full sm:w-72 lg:w-[450px]">
                    <SearchBar
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        filterValue={filterPriority}
                        onFilterChange={(e) =>
                            setFilterPriority(e.target.value as Priority | '')
                        }
                        placeholder={trans('placeholder_search')}
                        className="w-full"
                    />
                </div>

                <div className="flex items-center justify-end gap-3 shrink-0">
                    <div className="h-8 w-[1px] bg-app-border hidden md:block transition-colors transition-colors duration-300"></div>

                    <RefreshButton />

                    <Button
                        variant="primary"
                        size="md"
                        onClick={onNew}
                        title={trans('btn_new_task')}
                        className="whitespace-nowrap shadow-sm"
                    >
                        <PlusIcon className="w-5 h-5 sm:mr-1.5" />

                        <span className="hidden sm:inline">
                            {trans('btn_new_task')}
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default memo(BoardHeader)
