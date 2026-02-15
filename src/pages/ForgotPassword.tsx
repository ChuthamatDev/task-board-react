import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../Logo'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useAlert } from '../contexts/AlertContext'
import { auth } from '../services/api'

export default function ForgotPassword() {
    const { setAlert } = useAlert()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const data = await auth.forgotPassword(username)
            setAlert('Account verified! Please set a new password.', 'success')
            navigate('/reset-password', {
                state: {
                    token: data.token,
                    username: username,
                },
            })
        } catch (error: any) {
            setAlert(error.response?.data?.message || 'User not found', 'error')
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
                            Reset your password
                        </h1>
                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                            Enter your username to reset your password.
                        </p>

                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Username
                                </label>
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    data-testid="login-username-input"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full"
                                loading={isLoading}
                            >
                                Next
                            </Button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                                Remember your password?{' '}
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
