import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
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
}
