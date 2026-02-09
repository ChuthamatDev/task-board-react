import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react'

interface AuthContextType {
    user: any | null
    isAuthenticated: boolean
    login: (token: string, userData: any) => void
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
            const storedUser = localStorage.getItem('userData')
            if (token && storedUser) {
                try {
                    setUser(JSON.parse(storedUser))
                } catch (e) {
                    // Silent failure - invalid stored data will be cleared
                    setUser(null)
                }
            } else {
                setUser(null)
            }
            setIsLoading(false)
        }

        initAuth()
    }, [])

    const login = (token: string, userData: any) => {
        localStorage.setItem('accessToken', token)
        localStorage.setItem('userData', JSON.stringify(userData))
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userData')
        setUser(null)
        window.location.href = '/login'
    }

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated: !!user, login, logout, isLoading }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}
