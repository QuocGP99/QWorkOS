'use client'

import { useSettingsStore } from '@/store/useSettingsStore'
import { useTaskStore } from '@/store/useTaskStore'
import { AnimatePresence, motion } from 'framer-motion'
import PomodoroTimer from './PomodoroTimer'

export default function FocusOverlay() {
    const { isFocusMode } = useSettingsStore()
    const { tasks } = useTaskStore()

    // Assuming the user should focus on the first "In Progress" task, or "Todo" if none
    const currentTask = tasks.find(t => t.status === 'in_progress') || tasks.find(t => t.status === 'todo')

    if (!isFocusMode) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-8"
            >
                <div className="flex flex-col items-center gap-12 max-w-2xl w-full">
                    <PomodoroTimer />

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                    >
                        <h2 className="text-white/50 text-sm uppercase tracking-widest mb-4">Current Focus</h2>
                        {currentTask ? (
                            <div className="text-4xl font-bold text-white leading-tight">
                                {currentTask.title}
                            </div>
                        ) : (
                            <div className="text-2xl text-white/50 italic">
                                No active task. Select one from your board.
                            </div>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
