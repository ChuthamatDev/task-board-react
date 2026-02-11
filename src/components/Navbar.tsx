import { Disclosure } from '@headlessui/react'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import ThemeToggleButton from './ui/ThemeToggleButton'
import LanguageSwitcher from './ui/LanguageSwitcher'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import Button from './ui/Button'
import Logo from '../assets/Logo'

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
            bg-app-surface
            border-b border-app-border
            shadow-app-base"
        >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">

                    <Logo />

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-4">
                        <LanguageSwitcher />

                        <ThemeToggleButton />

                        {isAuthenticated && (
                            <>
                                <div className="flex items-center gap-3 pl-4 border-l border-app-border">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-semibold text-xs shadow-sm ring-2 ring-app-surface overflow-hidden">
                                        {getInitials(displayName)}
                                    </div>

                                    <span className="hidden md:block text-sm font-medium text-app-text">
                                        {displayName}
                                    </span>
                                </div>

                                <Button
                                    variant="danger"
                                    size="md"
                                    onClick={logout}
                                    title="Logout"
                                    className="gap-2"
                                >
                                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                                    <span className="hidden sm:inline">
                                        {trans('logout')}
                                    </span>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Disclosure>
    )
}