import { useState, useEffect, FormEvent } from 'react'
import {
    UserCircleIcon,
    CalendarIcon,
    ArrowLeftIcon,
} from '@heroicons/react/24/outline'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { auth, UserProfile } from '../services/api'
import { Link } from 'react-router-dom'
import { useAlert } from '../contexts/AlertContext'
import { useLanguage } from '../contexts/LanguageContext'

export default function ProfilePage() {
    const { setAlert } = useAlert()
    const { trans } = useLanguage()

    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [username, setUsername] = useState('')

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await auth.getProfile()
                setProfile(data)
                setUsername(data.username)
            } catch (error) {
                setAlert('Failed to load profile data', 'error')
            } finally {
                setIsLoading(false)
            }
        }
        fetchProfile()
    }, [setAlert])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (username === profile?.username) return

        setIsSaving(true)
        try {
            const updatedUser = await auth.updateProfile({ username })
            setProfile(updatedUser)
            setAlert('Profile updated successfully!', 'success')
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } catch (error: any) {
            setAlert(
                error.response?.data?.message || 'Failed to update profile',
                'error'
            )
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-app-primary border-t-transparent"></div>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8">
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-6 transition-colors group"
                >
                    <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Dashboard
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {trans('profile_setting')}
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {trans('profile_sub')}
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-1">
                    <div className="h-full flex flex-col justify-center rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-app-primary dark:bg-app-primary text-3xl font-bold text-white shadow-lg ring-4 ring-white dark:ring-gray-800">
                            {profile?.username?.slice(0, 2).toUpperCase()}
                        </div>
                        <h2 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                            {profile?.username}
                        </h2>
                        <p className="text-xs text-blue-500 uppercase tracking-wider font-semibold">
                            {trans('member')}
                        </p>

                        <div className="mt-6 flex flex-col gap-2 text-left text-sm text-gray-500 dark:text-gray-400 justify-center items-center">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                <span>
                                    {trans('joined')}{' '}
                                    {profile?.createdAt
                                        ? new Date(
                                              profile.createdAt
                                          ).toLocaleDateString()
                                        : '-'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="h-full rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                            {trans('edit_profile')}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {trans('username')}
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <UserCircleIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        className="pl-10 w-full"
                                        placeholder="Enter username"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {trans('userId')}
                                </label>
                                <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-500 text-sm font-mono border border-transparent">
                                    {profile?.id}
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    loading={isSaving}
                                    disabled={username === profile?.username}
                                >
                                    {trans('btn_save')}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
