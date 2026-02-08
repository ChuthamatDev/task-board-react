import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import Button from './Button'
import { useTheme } from '../../contexts/ThemeContext'

const ThemeToggleButton = () => {
    const { isDark, toggleTheme } = useTheme()

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110 cursor-pointer w-10 h-10 flex items-center justify-center"
            title="Change Theme"
        >
            <div
                className={`relative flex items-center justify-center transition-all duration-500 ${isDark ? 'rotate-[360deg]' : 'rotate-0'
                    }`}
            >
                {isDark ? (
                    <SunIcon className="w-5 h-5 text-amber-500" />
                ) : (
                    <MoonIcon className="w-5 h-5 text-indigo-600" />
                )}
            </div>
        </Button>
    )
}

export default ThemeToggleButton
