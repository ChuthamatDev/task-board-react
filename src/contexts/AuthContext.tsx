
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
    user: any | null
    isAuthenticated: boolean
    login: (tokens: { accessToken: string; refreshToken: string }, userData: any) => void
    logout: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<any | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const initAuth = () => {

            const token = localStorage.getItem('accessToken')

            if (token) {

                setUser({ name: 'User' })
            } else {
                setUser(null)
            }
            setIsLoading(false)
        }

        initAuth()
    }, [])

    const login = (tokens: { accessToken: string; refreshToken: string }, userData: any) => {
        localStorage.setItem('accessToken', tokens.accessToken)
        localStorage.setItem('refreshToken', tokens.refreshToken)
        setUser(userData)
    }

    const logout = () => {
        localStorage.clear()
        setUser(null)
        window.location.href = '/login'
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}