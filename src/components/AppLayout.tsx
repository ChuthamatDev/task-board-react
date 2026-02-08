import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"

export const AppLayout = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-app-bg transition-colors duration-200">
            <Navbar />

            <main className="flex-1 overflow-hidden relative">
                <Outlet />
            </main>
        </div>
    )
}