'use client'

import { useEffect } from 'react'
import { usePomodoroStore } from '@/store/usePomodoroStore'
import { Play, Pause, RotateCcw } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function PomodoroTimer() {
    const { timeLeft, isActive, mode, startTimer, pauseTimer, resetTimer, setMode, tick } = usePomodoroStore()

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isActive && timeLeft > 0) {
            interval = setInterval(tick, 1000)
        } else if (timeLeft === 0 && isActive) {
            // Completed!
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            })
            pauseTimer()
            // Play sound here if needed
        }
        return () => clearInterval(interval)
    }, [isActive, timeLeft, tick, pauseTimer])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className="flex flex-col items-center gap-4 bg-black/40 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex gap-2 mb-2">
                <button
                    onClick={() => setMode('focus')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${mode === 'focus' ? 'bg-white text-black' : 'text-white/50 hover:bg-white/10'}`}
                >
                    Focus
                </button>
                <button
                    onClick={() => setMode('shortBreak')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${mode === 'shortBreak' ? 'bg-white text-black' : 'text-white/50 hover:bg-white/10'}`}
                >
                    Short Break
                </button>
                <button
                    onClick={() => setMode('longBreak')}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${mode === 'longBreak' ? 'bg-white text-black' : 'text-white/50 hover:bg-white/10'}`}
                >
                    Long Break
                </button>
            </div>

            <div className="text-7xl font-mono font-bold tracking-tighter text-white tabular-nums">
                {formatTime(timeLeft)}
            </div>

            <div className="flex gap-4">
                <button
                    onClick={isActive ? pauseTimer : startTimer}
                    className="p-4 rounded-full bg-white text-black hover:scale-105 transition-all shadow-lg active:scale-95"
                >
                    {isActive ? <Pause fill="currentColor" /> : <Play fill="currentColor" className="ml-1" />}
                </button>
                <button
                    onClick={resetTimer}
                    className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-105 transition-all active:scale-95"
                >
                    <RotateCcw />
                </button>
            </div>
        </div>
    )
}
