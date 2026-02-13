import { Fragment, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: ReactNode
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
}: ModalProps) {
    return (
        // ✅ 1. AnimatePresence คือหัวใจสำคัญที่ทำให้แอนิเมชันตอน "ปิด" (exit) ทำงานได้
        <AnimatePresence>
            {isOpen && (
                <Fragment>
                    {/* ✅ 2. Backdrop: พื้นหลังสีดำเบลอๆ ค่อยๆ ปรากฏขึ้นมา */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                        onClick={onClose} // คลิกพื้นหลังเพื่อปิด
                    />

                    {/* ✅ 3. Modal Container: ตัวกล่องจัดให้อยู่กึ่งกลางหน้าจอ */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            // ✨ แอนิเมชันตอนเปิด: เริ่มจากโปร่งใส เล็กกว่าปกติเล็กน้อย และอยู่ต่ำลงมา
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            // ✨ แอนิเมชันตอนแสดงผล: ชัดเจน ขนาดเต็ม 100% อยู่ตำแหน่งเดิม
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            // ✨ แอนิเมชันตอนปิด: จางหายไป หดเล็กลง และร่วงลงไปนิดนึง
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            // 🧲 กำหนดความเด้ง (Spring) ให้ดูนุ่มนวลเหมือนแอปมือถือ
                            transition={{
                                type: 'spring',
                                duration: 0.5,
                                bounce: 0.3,
                            }}
                            className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Header: ชื่อ Modal และปุ่มกากบาท */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {title}
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Body: เนื้อหาฟอร์มที่จะส่งเข้ามา (children) */}
                            <div className="px-6 py-4 overflow-y-auto">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </Fragment>
            )}
        </AnimatePresence>
    )
}
