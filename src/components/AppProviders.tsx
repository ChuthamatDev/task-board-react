import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext'
import ThemeProvider from '../contexts/ThemeContext'
import LanguageProvider from '../contexts/LanguageContext'
import TaskProvider from '../contexts/TaskContext'
import ColumnProvider from '../contexts/ColumnContext'
import AlertProvider from '../contexts/AlertContext'
import AlertPopup from './AlertPopup/AlertPopup'

interface AppProvidersProps {
    children: ReactNode
}

export const AppProviders = ({ children }: AppProvidersProps) => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider>
                    <LanguageProvider>
                        <AlertProvider>
                            <ColumnProvider>
                                <TaskProvider>
                                    <AlertPopup />
                                    {children}
                                </TaskProvider>
                            </ColumnProvider>
                        </AlertProvider>
                    </LanguageProvider>
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}
