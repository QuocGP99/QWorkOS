'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSettingsStore } from '@/store/useSettingsStore'
import { usePlayerStore } from '@/store/usePlayerStore'
import { useSound } from '@/hooks/useSound'
import SettingsModal from './SettingsModal'
import AudioVisualizer from './AudioVisualizer'
import {
    SquareKanban,
    Music,
    Settings,
    Timer,
    Maximize2
} from 'lucide-react'

export default function Dock() {
    const { isDockVisible, toggleFocusMode, isFocusMode } = useSettingsStore()
    const { isPlaying, play, pause, currentTrack } = usePlayerStore()
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const { playClick } = useSound()

    if (!isDockVisible && isFocusMode) return null

    return (
        <>
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4">
                {/* Now Playing Toaster */}
                <AnimatePresence>
                    {isPlaying && currentTrack && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="flex items-center gap-3 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 shadow-lg mb-2"
                        >
                            <AudioVisualizer />
                            <span className="text-xs font-medium text-white/90 max-w-[200px] truncate">
                                {currentTrack.title} (Playing)
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex items-end gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                    <DockIcon
                        icon={SquareKanban}
                        label="Board"
                        onClick={() => { playClick(); /* Navigate */ }}
                    />
                    <DockIcon
                        icon={Timer}
                        label="Focus"
                        onClick={() => { playClick(); toggleFocusMode() }}
                    />
                    <DockIcon
                        icon={Music}
                        label={isPlaying ? "Pause Vibe" : "Play Vibe"}
                        onClick={() => { playClick(); isPlaying ? pause() : play() }}
                    />
                    <DockIcon
                        icon={Settings}
                        label="Settings"
                        onClick={() => { playClick(); setIsSettingsOpen(true) }}
                    />

                    <div className="w-[1px] h-8 bg-white/20 mx-1" /> {/* Divider */}

                    <DockIcon
                        icon={Maximize2}
                        label={isFocusMode ? "Exit Focus" : "Focus Mode"}
                        onClick={() => { playClick(); toggleFocusMode() }}
                    />
                </div>
            </div>

            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </>
    )
}

function DockIcon({ icon: Icon, label, onClick }: { icon: any, label: string, onClick?: () => void }) {
    return (
        <motion.button
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 hover:bg-white/20 transition-colors"
        >
            <Icon className="w-6 h-6 text-white" />

            <span className="absolute -top-10 px-2 py-1 text-xs text-white bg-black/50 backdrop-blur-md rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {label}
            </span>
        </motion.button>
    )
}
