import axios from 'axios'

export interface UserProfile {
    id: string
    username: string
    createdAt: string
}

const API_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            localStorage.clear()
            window.location.href = '/login'
            return Promise.reject(error)
        }
        return Promise.reject(error)
    }
)

export default api

export const auth = {
    forgotPassword: async (username: string) => {
        const response = await api.post('/auth/forgot-password', { username })
        return response.data
    },

    resetPassword: async (
        token: string,
        newPassword: string,
        confirmPassword: string
    ) => {
        const response = await api.post('/auth/reset-password', {
            token,
            newPassword,
            confirmPassword,
        })
        return response.data
    },

    getProfile: async () => {
        const response = await api.get<UserProfile>('/auth/profile')
        return response.data
    },

    updateProfile: async (data: { username?: string }) => {
        const response = await api.put<UserProfile>('/auth/profile', data)
        return response.data
    },
}
