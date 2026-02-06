import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoadingScreen from '../components/ui/LoadingScreen'

export default function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) return <LoadingScreen text="Checking authentication..." />

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
