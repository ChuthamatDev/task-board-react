import { ArrowPathIcon } from '@heroicons/react/24/outline'

export default function LoadingScreen({ text = 'Loading...' }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] flex-1 h-full w-full gap-4 p-8">
            <ArrowPathIcon className="w-10 h-10 animate-spin text-indigo-600 dark:text-indigo-400" />
            <p className="text-gray-500 dark:text-gray-400 animate-pulse font-medium">{text}</p>
        </div>
    )
}
