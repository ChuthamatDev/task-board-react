import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import ThemeToggleButton from './ui/ThemeToggleButton'
import LanguageSwitcher from './ui/LanguageSwitcher'
import Logo from '../assets/Logo'
import { useNavbar } from '../hooks/useNavbar'

export default function Navbar() {
    const { trans, isAuthenticated, logout, displayName, initials } =
        useNavbar()

    return (
        <Disclosure
            as="nav"
            className="sticky top-0 z-40 transition-colors duration-300 bg-app-surface/80 backdrop-blur-md border-b border-app-border shadow-sm"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 group"
                    >
                        <Logo />
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <LanguageSwitcher />
                        <ThemeToggleButton />

                        {isAuthenticated && (
                            <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-app-border ml-2 cursor-pointer">
                                <Menu as="div" className="relative ml-1">
                                    <div>
                                        <Menu.Button className="cursor-pointer relative flex rounded-full bg-app-surface text-sm focus:outline-none focus:ring-2 focus:ring-app-primary focus:ring-offset-2 focus:ring-offset-app-surface transition-transform active:scale-95">
                                            <div className="cursor-pointer flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-app-primary dark:bg-app-primary text-white font-bold text-sm shadow-md ring-2 ring-app-surface overflow-hidden">
                                                {initials}
                                            </div>
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
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-app-surface py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-app-border divide-y divide-app-border">
                                            <div className="px-4 py-3">
                                                <p className="text-xs text-app-subtle">
                                                    Signed in as
                                                </p>
                                                <p className="truncate text-sm font-semibold text-app-text">
                                                    {displayName}
                                                </p>
                                            </div>

                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to="/profile"
                                                            className={clsx(
                                                                active
                                                                    ? 'bg-app-primary/10 text-app-primary'
                                                                    : 'text-app-text',
                                                                'group flex items-center px-4 py-2 text-sm transition-colors'
                                                            )}
                                                        >
                                                            <UserCircleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-app-primary" />
                                                            Your Profile
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </div>

                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={logout}
                                                            className={clsx(
                                                                active
                                                                    ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-200'
                                                                    : 'text-app-text',
                                                                'group flex w-full items-center px-4 py-2 text-sm transition-colors'
                                                            )}
                                                        >
                                                            <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500" />
                                                            {trans('logout')}
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Disclosure>
    )
}
