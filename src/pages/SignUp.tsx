import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import api from '../services/api'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAlert } from '../contexts/AlertContext'
import { useLanguage } from '../contexts/LanguageContext'
import Logo from '../assets/Logo'

export default function SignUp() {
    const [usernameError, setUsernameError] = useState(false)
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

    const { login } = useAuth()
    const navigate = useNavigate()
    const { setAlert } = useAlert()
    const { trans } = useLanguage()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setUsernameError(false)
        setPasswordError(false)

        const data = new FormData(event.currentTarget)
        const username = data.get('username') as string
        const password = data.get('password') as string

        let isValid = true

        if (!username || username.trim().length === 0) {
            setUsernameError(true)
            setUsernameErrorMessage('Please enter a username.')
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

        try {
            const res = await api.post('/auth/register', { username, password })

            login(res.data.accessToken, res.data.user)

            navigate('/login')
            setAlert(`${trans('register')}`, 'success')
        } catch (error: any) {
            console.error(error)
            const backendMsg =
                error.response?.data?.message ||
                'Registration failed. Please try again.'
            alert(backendMsg)
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
            <div className="flex flex-col items-center justify-center w-full">
                <div className="mb-6">
                    <Logo />
                </div>

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            Sign up
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

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    required
                                    className={
                                        passwordError
                                            ? 'border-red-500 focus:ring-red-500'
                                            : ''
                                    }
                                />
                                {passwordError && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {passwordErrorMessage}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="terms"
                                        className="font-light text-gray-500 dark:text-gray-300"
                                    >
                                        I accept the{' '}
                                        <a
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            href="#"
                                        >
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>

                            <Button type="submit" className="w-full">
                                Sign up
                            </Button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
