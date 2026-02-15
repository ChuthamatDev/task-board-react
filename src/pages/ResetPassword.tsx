import { useState, FormEvent, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Logo from '../Logo'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useAlert } from '../contexts/AlertContext'
import { auth } from '../services/api'
import PasswordToggleIcon from '../components/ui/PasswordToggleIcon'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function ResetPassword() {
    const location = useLocation()
    const navigate = useNavigate()
    const { setAlert } = useAlert()

    const token = location.state?.token
    const username = location.state?.username

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [newPasswordError, setNewPasswordError] = useState(false)
    const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('')

    useEffect(() => {
        if (!token) {
            setAlert(
                'Invalid access. Please verify your username first.',
                'error'
            )
            navigate('/forgot-password')
        }
    }, [token, navigate, setAlert])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        setNewPasswordError(false)
        setConfirmPasswordError(false)

        let isValid = true

        if (!newPassword || newPassword.length < 6) {
            setNewPasswordError(true)
            setNewPasswordErrorMessage('Password must be at least 6 characters.')
            isValid = false
        }

        if (!confirmPassword || confirmPassword.length < 6) {
            setConfirmPasswordError(true)
            setConfirmPasswordErrorMessage('Password must be at least 6 characters.')
            isValid = false
        } else if (newPassword !== confirmPassword) {
            setConfirmPasswordError(true)
            setConfirmPasswordErrorMessage('Passwords do not match.')
            isValid = false
        }

        if (!isValid) return

        setIsLoading(true)

        try {
            await auth.resetPassword(token, newPassword, confirmPassword)
            setAlert('Password reset successfully! Please login.', 'success')
            navigate('/login')
        } catch (error: any) {
            setAlert(
                error.response?.data?.message || 'Failed to reset password',
                'error'
            )
        } finally {
            setIsLoading(false)
        }
    }

    if (!token) return null

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
            <div className="flex flex-col items-center justify-center w-full">
                <div className="mb-6">
                    <Logo />
                </div>

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            Set New Password
                        </h1>
                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                            for account:{' '}
                            <span className="font-semibold text-gray-900 dark:text-white">
                                {username}
                            </span>
                        </p>

                        <form className="space-y-2" onSubmit={handleSubmit}>
                            <div className="relative">
                                <label className="block mb-2 text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                    New Password
                                </label>
                                <Input
                                    type={showNewPassword ? 'text' : 'password'}
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className={newPasswordError ? 'border-red-500 focus:ring-red-500 pr-10' : 'pr-10'}
                                    placeholder="Enter new password"
                                    autoFocus
                                />
                                <p className={`mt-1 text-xs min-h-[1.25rem] ${newPasswordError ? 'text-red-500' : 'invisible'}`}>
                                    {newPasswordError ? newPasswordErrorMessage : 'placeholder'}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-4 top-13 -translate-y-1/2 flex items-center cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    <PasswordToggleIcon isVisible={showNewPassword} />
                                </button>
                            </div>

                            <div className="relative">
                                <label className="block mb-2 text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                    Confirm Password
                                </label>
                                <Input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={confirmPasswordError ? 'border-red-500 focus:ring-red-500 pr-10' : 'pr-10'}
                                    placeholder="Confirm new password"
                                />
                                <p className={`mt-1 text-xs min-h-[1.25rem] ${confirmPasswordError ? 'text-red-500' : 'invisible'}`}>
                                    {confirmPasswordError ? confirmPasswordErrorMessage : 'placeholder'}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-13 -translate-y-1/2 flex items-center cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    <PasswordToggleIcon isVisible={showConfirmPassword} />
                                </button>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full"
                                loading={isLoading}
                            >
                                Change Password
                            </Button>

                            <div className="text-center pt-2">
                                <Button
                                    variant="ghost"
                                    size="md"
                                    onClick={() => navigate('/forgot-password')}
                                    className="gap-1"
                                >
                                    <ArrowLeftIcon className="w-5 h-5" />
                                    Back
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
