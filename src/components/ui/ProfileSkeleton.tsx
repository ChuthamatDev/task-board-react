import Skeleton from './Skeleton'

export default function ProfileSkeleton() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8">
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-1">
                    <div className="h-full flex flex-col justify-center rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                        <Skeleton className="mx-auto h-24 w-24 rounded-full" />
                        <Skeleton className="mx-auto mt-4 h-6 w-32" />
                        <Skeleton className="mx-auto mt-2 h-4 w-20" />
                        <Skeleton className="mx-auto mt-6 h-4 w-40" />
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="h-full rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <Skeleton className="h-6 w-32 mb-6" />
                        <div className="space-y-5">
                            <div>
                                <Skeleton className="h-4 w-24 mb-2" />
                                <Skeleton className="h-10 w-full rounded-lg" />
                                <Skeleton className="h-3 w-48 mt-2" />
                            </div>
                            <div>
                                <Skeleton className="h-4 w-24 mb-2" />
                                <Skeleton className="h-10 w-full rounded-lg" />
                            </div>
                            <div className="pt-4 flex justify-end">
                                <Skeleton className="h-10 w-32 rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
