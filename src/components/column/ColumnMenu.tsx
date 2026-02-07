import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {
    EllipsisHorizontalIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useLanguage } from '../../contexts/LanguageContext'

interface ColumnMenuProps {
    onEdit: () => void
    onDelete: () => void
}

export default function ColumnMenu({ onEdit, onDelete }: ColumnMenuProps) {
    const { trans } = useLanguage()

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex items-center justify-center w-8 h-8 rounded-full text-app-subtle hover:text-app-text hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <EllipsisHorizontalIcon className="w-5 h-5" />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className={clsx(
                        'absolute right-0 mt-2 w-40 origin-top-right z-50 focus:outline-none',
                        'p-2',
                        'flex flex-col gap-0.5',
                        'rounded-lg',
                        'bg-white dark:bg-[hsl(220,30%,7%)]',
                        'border border-gray-200 dark:border-gray-800',
                        'shadow-[0px_4px_16px_0px_hsla(220,30%,5%,0.07),0px_8px_16px_-5px_hsla(220,25%,10%,0.07)]',
                        'dark:shadow-[0px_4px_16px_0px_hsla(220,30%,5%,0.7),0px_8px_16px_-5px_hsla(220,25%,10%,0.8)]'
                    )}
                >
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                onClick={onEdit}
                                className={clsx(
                                    'group flex w-full items-center gap-2 px-2 py-1.5',
                                    'rounded-md',
                                    'text-sm font-medium',
                                    'transition-colors',
                                    active
                                        ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100' // Hover/Selected
                                        : 'text-gray-700 dark:text-gray-300'
                                )}
                            >
                                <PencilSquareIcon
                                    className={clsx(
                                        'w-4 h-4',
                                        active
                                            ? 'text-gray-900 dark:text-gray-100'
                                            : 'text-gray-500 dark:text-gray-400'
                                    )}
                                />
                                {trans('column_edit')}
                            </button>
                        )}
                    </Menu.Item>

                    <Menu.Item>
                        {({ active }) => (
                            <button
                                onClick={onDelete}
                                className={clsx(
                                    'group flex w-full items-center gap-2 px-2 py-1.5',
                                    'rounded-md',
                                    'text-sm font-medium',
                                    'transition-colors',
                                    active
                                        ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300' // Custom Danger Hover
                                        : 'text-red-600 dark:text-red-400'
                                )}
                            >
                                <TrashIcon
                                    className={clsx(
                                        'w-4 h-4',
                                        active
                                            ? 'text-red-600 dark:text-red-300'
                                            : 'text-red-500 dark:text-red-400'
                                    )}
                                />
                                {trans('column_delete')}
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
