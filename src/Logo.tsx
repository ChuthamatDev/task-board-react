import { motion } from 'framer-motion'

export default function Logo() {
    return (
        <div className="flex items-center">
            <h1 className="text-2xl font-bold transition-colors duration-300 flex items-center gap-1">
                <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 15,
                        delay: 0.1,
                    }}
                    className="text-gray-900 dark:text-gray-100"
                >
                    Task
                </motion.span>

                <motion.span
                    initial={{ opacity: 0, y: -40, rotate: -10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, rotate: -2, scale: 1 }}
                    transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 12,
                        delay: 0.3,
                    }}
                    whileHover={{
                        scale: 1.08,
                        rotate: 0,
                        transition: { type: 'spring', stiffness: 400, damping: 10 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block text-app-primary bg-app-primary/10 dark:bg-app-primary/20 px-2 py-0.5 rounded-lg cursor-default"
                >
                    Board
                </motion.span>
            </h1>
        </div>
    )
}