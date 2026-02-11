import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { HomeIcon } from '@heroicons/react/24/outline'

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-app-bg text-app-text p-4 text-center">
            <h1 className="text-9xl font-bold text-app-primary opacity-20">404</h1>
            <h2 className="text-3xl font-bold -mt-12 mb-4 bg-app-bg px-4 relative z-10">
                Page Not Found
            </h2>
            <p className="text-app-subtle mb-8 max-w-md">
                Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, or doesn't exist.
            </p>
            <Button
                size="lg"
                onClick={() => navigate('/')}
                className="gap-2"
            >
                <HomeIcon className="w-5 h-5" />
                Go Home
            </Button>
        </div>
    )
}

export default NotFound
