import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
} from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import KanbanBoard from './pages/KanbanBoard'
import AlertPopup from './components/AlertPopup/AlertPopup'
import Navbar from './components/Navbar'
import ThemeProvider from './contexts/ThemeContext'
import LanguageProvider from './contexts/LanguageContext'
import TaskProvider from './contexts/TaskContext'
import ColumnProvider from './contexts/ColumnContext'
import AlertProvider from './contexts/AlertContext'

const AppLayout = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-app-bg transition-colors duration-200">
            <Navbar />

            <main className="flex-1 overflow-hidden relative">
                <Outlet />
            </main>
        </div>
    )
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider>
                    <LanguageProvider>
                        <ColumnProvider>
                            <TaskProvider>
                                <AlertProvider>
                                    <AlertPopup />

                                    <Routes>
                                        <Route
                                            path="/login"
                                            element={<SignIn />}
                                        />
                                        <Route
                                            path="/register"
                                            element={<SignUp />}
                                        />

                                        <Route element={<ProtectedRoute />}>
                                            <Route element={<AppLayout />}>
                                                <Route
                                                    path="/dashboard"
                                                    element={<KanbanBoard />}
                                                />
                                                <Route
                                                    path="*"
                                                    element={
                                                        <Navigate
                                                            to="/dashboard"
                                                            replace
                                                        />
                                                    }
                                                />
                                            </Route>
                                        </Route>

                                        <Route
                                            path="*"
                                            element={
                                                <Navigate
                                                    to="/dashboard"
                                                    replace
                                                />
                                            }
                                        />
                                    </Routes>
                                </AlertProvider>
                            </TaskProvider>
                        </ColumnProvider>
                    </LanguageProvider>
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
