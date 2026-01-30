import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type TimerMode = 'focus' | 'shortBreak' | 'longBreak'

interface PomodoroState {
    timeLeft: number
    isActive: boolean
    mode: TimerMode

    startTimer: () => void
    pauseTimer: () => void
    resetTimer: () => void
    setMode: (mode: TimerMode) => void
    tick: () => void
}

const DURATIONS = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
}

export const usePomodoroStore = create<PomodoroState>()(
    persist(
        (set, get) => ({
            timeLeft: DURATIONS.focus,
            isActive: false,
            mode: 'focus',

            startTimer: () => set({ isActive: true }),
            pauseTimer: () => set({ isActive: false }),
            resetTimer: () => set((state) => ({
                isActive: false,
                timeLeft: DURATIONS[state.mode]
            })),
            setMode: (mode) => set({
                mode,
                isActive: false,
                timeLeft: DURATIONS[mode]
            }),
            tick: () => set((state) => {
                if (state.timeLeft <= 0) {
                    // Timer finished logic can be expanded here (notification, sound)
                    return { isActive: false, timeLeft: 0 }
                }
                return { timeLeft: state.timeLeft - 1 }
            }),
        }),
        {
            name: 'qworkos-pomodoro',
        }
    )
)
