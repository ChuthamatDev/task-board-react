import { Disclosure } from '@headlessui/react'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import ThemeToggleButton from './ui/ThemeToggleButton'
import LanguageSwitcher from './ui/LanguageSwitcher'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
    const { trans } = useLanguage()
    const { isAuthenticated, logout } = useAuth()

    return (
        <Disclosure
            as="nav"
            className="relative bg-app-surface transition-colors duration-300 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:border-app-border"
        >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex space-x-4 text-gray-900 dark:text-gray-300 text-2xl font-bold transition-colors duration-300">
                        {trans('app_title')}
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-4">
                        <LanguageSwitcher />

                        <div className="h-6 w-[1px] bg-app-border mx-2 hidden sm:block"></div>

                        <ThemeToggleButton />

                        {isAuthenticated && (
                            <>
                                <div className="h-6 w-[1px] bg-app-border mx-2 hidden sm:block"></div>

                                <button
                                    onClick={logout}
                                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                    title="Logout"
                                >
                                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                    <span className="hidden sm:inline">{trans('logout')}</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Disclosure>
    )
}
