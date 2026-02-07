import { Disclosure } from '@headlessui/react'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import ThemeToggleButton from './ui/ThemeToggleButton'
import LanguageSwitcher from './ui/LanguageSwitcher'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
    const { trans } = useLanguage()
    const { isAuthenticated, logout, user } = useAuth()

    const getInitials = (name: string) => {
        if (!name) return '?'
        const parts = name.trim().split(' ')
        if (parts.length > 1) {
            return (parts[0][0] + parts[1][0]).toUpperCase()
        }
        return name.slice(0, 2).toUpperCase()
    }

    const displayName = user?.username || user?.name || user?.email || 'Guest'

    return (
        <Disclosure
            as="nav"
            className="relative transition-colors duration-300 
            bg-white dark:bg-[hsl(220,35%,3%)] 
            border-b border-gray-200 dark:border-gray-800
            shadow-[0px_4px_16px_0px_hsla(220,30%,5%,0.07),0px_8px_16px_-5px_hsla(220,25%,10%,0.07)]
            dark:shadow-[0px_4px_16px_0px_hsla(220,30%,5%,0.7),0px_8px_16px_-5px_hsla(220,25%,10%,0.8)]"
        >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex space-x-4 text-gray-900 dark:text-gray-100 text-2xl font-bold transition-colors duration-300">
                        {trans('app_title')}
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-4">
                        <LanguageSwitcher />

                        <ThemeToggleButton />

                        {isAuthenticated && (
                            <>
                                <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-semibold text-xs shadow-sm ring-2 ring-white dark:ring-gray-700 overflow-hidden">
                                        {getInitials(displayName)}
                                    </div>

                                    <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {displayName}
                                    </span>
                                </div>

                                <button
                                    onClick={logout}
                                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                                    title="Logout"
                                >
                                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                    <span className="hidden sm:inline">
                                        {trans('logout')}
                                    </span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Disclosure>
    )
}
