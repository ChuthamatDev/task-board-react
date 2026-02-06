import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
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
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {

                const refreshToken = localStorage.getItem('refreshToken')
                if (!refreshToken) throw new Error('No refresh token')

                const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/auth/refresh-token`, {
                    refreshToken
                })


                localStorage.setItem('accessToken', res.data.accessToken)
                localStorage.setItem('refreshToken', res.data.refreshToken)

                originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`
                return api(originalRequest)

            } catch (refreshError) {

                localStorage.clear()
                window.location.href = '/login'
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)

export default api
