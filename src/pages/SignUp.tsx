import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import api from '../services/api'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAlert } from '../contexts/AlertContext'
import { useLanguage } from '../contexts/LanguageContext'
import Logo from '../Logo'
import PasswordToggleIcon from '../components/ui/PasswordToggleIcon'

export default function SignUp() {
    const [usernameError, setUsernameError] = useState(false)
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const { setAlert } = useAlert()
    const { trans } = useLanguage()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setUsernameError(false)
        setPasswordError(false)
        setConfirmPasswordError(false)

        const data = new FormData(event.currentTarget)
        const username = (data.get('username') as string).trim().toLowerCase()
        const password = data.get('password') as string

        let isValid = true

        if (!username || username.length === 0) {
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

        if (password !== confirmPassword) {
            setConfirmPasswordError(true)
            setConfirmPasswordErrorMessage('Passwords do not match.')
            isValid = false
        }

        if (!isValid) return

        setIsLoading(true)

        try {
            await api.post('/auth/register', { username, password })

            navigate('/login')
            setAlert(`${trans('register')}`, 'success')
        } catch (error: any) {
            console.error(error)
            const backendMsg =
                error.response?.data?.message ||
                'Registration failed. Please try again.'
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
                    <div className="p-6 space-y-2 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            Sign up
                        </h1>
                        <form
                            className="space-y-2 md:space-y-6"
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
                                    data-testid="signup-password-input"
                                    placeholder="••••••••"
                                    required
                                    className={
                                        passwordError
                                            ? 'border-red-500 focus:ring-red-500 pr-10'
                                            : 'pr-10'
                                    }
                                />
                                <p className={`mt-1 text-xs min-h-[1.25rem] ${passwordError ? 'text-red-500' : 'invisible'}`}>
                                    {passwordError ? passwordErrorMessage : 'placeholder'}
                                </p>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-12 -translate-y-1/2 flex items-center cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    <PasswordToggleIcon isVisible={showPassword} />
                                </button>
                            </div>

                            <div className="relative">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Confirm Password
                                </label>
                                <Input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    data-testid="signup-confirm-password-input"
                                    placeholder="••••••••"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={
                                        confirmPasswordError
                                            ? 'border-red-500 focus:ring-red-500 pr-10'
                                            : 'pr-10'
                                    }
                                />
                                <p className={`mt-1 text-xs min-h-[1.25rem] ${confirmPasswordError ? 'text-red-500' : 'invisible'}`}>
                                    {confirmPasswordError ? confirmPasswordErrorMessage : 'placeholder'}
                                </p>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    className="absolute right-4 top-12 -translate-y-1/2 flex items-center cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    <PasswordToggleIcon isVisible={showConfirmPassword} />
                                </button>
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

                            <Button
                                type="submit"
                                className="w-full"
                                loading={isLoading}
                                loadingText="Signing up..."
                            >
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
