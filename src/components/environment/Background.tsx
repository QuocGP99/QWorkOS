'use client'

import { useSettingsStore } from '@/store/useSettingsStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function Background() {
    const { currentBackground } = useSettingsStore()

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden w-full h-full bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentBackground.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full"
                >
                    {currentBackground.type === 'video' ? (
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="object-cover w-full h-full opacity-60"
                        >
                            <source src={currentBackground.url} type="video/mp4" />
                        </video>
                    ) : (
                        <img
                            src={currentBackground.url}
                            alt="background"
                            className="object-cover w-full h-full opacity-70"
                        />
                    )}

                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
