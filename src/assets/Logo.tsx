export default function Logo() {
    return (
        <div className="flex items-center">
            <h1 className="text-2xl font-bold transition-colors duration-300 flex items-center gap-1">

                <span className="text-gray-900 dark:text-gray-100">
                    Task
                </span>


                <span className="inline-block text-app-primary bg-app-primary/10 dark:bg-app-primary/20 px-2 py-0.5 rounded-lg transform -rotate-2">
                    Board
                </span>
            </h1>
        </div>
    )
}