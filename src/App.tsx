import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import KanbanBoard from './pages/KanbanBoard'
import AlertPopup from './components/AlertPopup/AlertPopup'
import ThemeProvider from './contexts/ThemeContext'
import LanguageProvider from './contexts/LanguageContext'
import TaskProvider from './contexts/TaskContext'
import ColumnProvider from './contexts/ColumnContext'
import AlertProvider from './contexts/AlertContext'
import { AppLayout } from './components/AppLayout'


function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider>
                    <LanguageProvider>
                        <AlertProvider>
                            <ColumnProvider>
                                <TaskProvider>
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
                                </TaskProvider>
                            </ColumnProvider>
                        </AlertProvider>
                    </LanguageProvider>
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
