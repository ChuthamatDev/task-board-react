import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'

export function useNavbar() {
    const { trans } = useLanguage()
    const { isAuthenticated, logout, user } = useAuth()

    const getInitials = (name?: string) => {
        if (!name) return '?'
        const parts = name.trim().split(' ')
        if (parts.length > 1) {
            return (parts[0][0] + parts[1][0]).toUpperCase()
        }
        return name.slice(0, 2).toUpperCase()
    }

    const displayName = user?.username || user?.name || user?.email || 'Guest'
    const initials = getInitials(displayName)

    return {
        trans,
        isAuthenticated,
        logout,
        displayName,
        initials,
    }
}
