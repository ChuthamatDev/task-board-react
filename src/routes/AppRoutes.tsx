import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import KanbanBoard from '../pages/KanbanBoard'
import { AppLayout } from '../components/AppLayout'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import ProfilePage from '../pages/ProfilePage'
import NotFound from '../pages/NotFound'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                    <Route path="/dashboard" element={<KanbanBoard />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
