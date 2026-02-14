import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 text-center">
            <div className="relative mb-8">
                <h1 className="text-9xl font-black text-gray-200 dark:text-gray-800 select-none">
                    404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold bg-white dark:bg-gray-900 px-4 rounded-lg shadow-sm">
                        Page Not Found
                    </span>
                </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md text-lg">
                Sorry, we couldn't find the page you're looking for. It might
                have been removed, renamed, or doesn't exist.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="gap-2"
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                    Go Back
                </Button>
                <Button
                    onClick={() => navigate('/')}
                    className="gap-2"
                >
                    <HomeIcon className="w-5 h-5" />
                    Go Home
                </Button>
            </div>
        </div>
    )
}

export default NotFound
