import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import api from '../services/api'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAlert } from '../contexts/AlertContext'
import { useLanguage } from '../contexts/LanguageContext'
import Logo from '../Logo'
import PasswordToggleIcon from '../components/ui/PasswordToggleIcon'

export default function SignIn() {
    const [usernameError, setUsernameError] = useState(false)
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()
    const { setAlert } = useAlert()
    const { trans } = useLanguage()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setUsernameError(false)
        setPasswordError(false)
        setIsLoading(false)

        const data = new FormData(event.currentTarget)
        const username = (data.get('username') as string).trim().toLowerCase()
        const password = data.get('password') as string

        let isValid = true

        if (!username || username.length === 0) {
            setUsernameError(true)
            setUsernameErrorMessage('Please enter your username.')
            isValid = false
        } else if (username.length < 3) {
            setUsernameError(true)
            setUsernameErrorMessage('Username must be at least 3 characters.')
            isValid = false
        }

        if (!password || password.length < 6) {
            setPasswordError(true)
            setPasswordErrorMessage('Password must be at least 6 characters.')
            isValid = false
        }

        if (!isValid) return

        setIsLoading(true)

        try {
            const res = await api.post('/auth/login', { username, password })
            login(res.data.accessToken, res.data.user)

            navigate('/dashboard')
            setAlert(`${trans('login')}`, 'success')
        } catch (error: any) {
            console.error(error)
            const status = error.response?.status
            const backendMsg =
                error.response?.data?.message ||
                'Login failed. Please check your credentials.'

            // แสดง inline error ตาม response จาก backend
            if (status === 401 || status === 403) {
                // รหัสผ่านผิด หรือ credentials ไม่ถูกต้อง
                setPasswordError(true)
                setPasswordErrorMessage(backendMsg)
                setUsernameError(true)
                setUsernameErrorMessage('')
            } else if (status === 404) {
                // ไม่พบ username ในระบบ
                setUsernameError(true)
                setUsernameErrorMessage(backendMsg)
            } else {
                // error อื่นๆ (500, network error)
                setPasswordError(true)
                setPasswordErrorMessage(backendMsg)
            }

            setAlert(backendMsg, 'error')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
            <div className="flex flex-col items-center justify-center w-full">
                <div className="mb-6">
                    <Logo />
                </div>

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            Sign in
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Username
                                </label>
                                <Input
                                    type="text"
                                    name="username"
                                    id="username"
                                    data-testid="login-username-input"
                                    placeholder="Enter your username"
                                    required
                                    className={
                                        usernameError
                                            ? 'border-red-500 focus:ring-red-500'
                                            : ''
                                    }
                                />
                                {usernameError && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {usernameErrorMessage}
                                    </p>
                                )}
                            </div>

                            <div className="relative">
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    data-testid="login-password-input"
                                    required
                                    className={
                                        passwordError
                                            ? 'border-red-500 focus:ring-red-500 pr-10'
                                            : 'pr-10'
                                    }
                                />
                                <p
                                    className={`mt-1 text-xs min-h-[1.25rem] ${passwordError ? 'text-red-500' : 'invisible'}`}
                                >
                                    {passwordError
                                        ? passwordErrorMessage
                                        : 'placeholder'}
                                </p>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-12 -translate-y-1/2 flex items-center cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    <PasswordToggleIcon
                                        isVisible={showPassword}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-gray-500 dark:text-gray-300"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <Link
                                    to="/forgot-password"
                                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                loading={isLoading}
                                loadingText="Signing in..."
                            >
                                Sign in
                            </Button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                                Don't have an account?{' '}
                                <Link
                                    to="/register"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
