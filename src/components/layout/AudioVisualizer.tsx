'use client'

import { motion } from 'framer-motion'
import { usePlayerStore } from '@/store/usePlayerStore'

export default function AudioVisualizer() {
    const { isPlaying } = usePlayerStore()

    if (!isPlaying) return null

    return (
        <div className="flex items-end gap-[2px] h-4">
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    className="w-[3px] bg-green-400 rounded-full"
                    animate={{
                        height: [4, 12, 4],
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.1,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    )
}
