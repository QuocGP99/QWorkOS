import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AmbienceState {
    rainVolume: number
    windVolume: number
    isPlaying: boolean

    setRainVolume: (val: number) => void
    setWindVolume: (val: number) => void
    toggleAmbience: () => void
}

export const useAmbienceStore = create<AmbienceState>()(
    persist(
        (set) => ({
            rainVolume: 0,
            windVolume: 0,
            isPlaying: true,

            setRainVolume: (rainVolume) => set({ rainVolume }),
            setWindVolume: (windVolume) => set({ windVolume }),
            toggleAmbience: () => set((state) => ({ isPlaying: !state.isPlaying })),
        }),
        {
            name: 'qworkos-ambience',
        }
    )
)
