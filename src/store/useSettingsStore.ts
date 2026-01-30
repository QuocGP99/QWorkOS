import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Theme, Background } from '@/types'

interface SettingsState {
    theme: Theme
    isDockVisible: boolean
    isFocusMode: boolean
    currentBackground: Background
    volume: number

    setTheme: (theme: Theme) => void
    toggleDock: () => void
    toggleFocusMode: () => void
    setBackground: (bg: Background) => void
    setVolume: (volume: number) => void
}

const DEFAULT_BACKGROUND: Background = {
    id: 'cyberpunk-city',
    type: 'video',
    url: 'https://video.wixstatic.com/video/11062b_92619c730c4b4b0bb27ea39c4276a52b/1080p/mp4/file.mp4',
    // Fallback/Alternative: 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4'
    name: 'Cyberpunk City'
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            theme: 'lofi',
            isDockVisible: true,
            isFocusMode: false,
            currentBackground: DEFAULT_BACKGROUND,
            volume: 0.5,

            setTheme: (theme) => set({ theme }),
            toggleDock: () => set((state) => ({ isDockVisible: !state.isDockVisible })),
            toggleFocusMode: () => set((state) => ({ isFocusMode: !state.isFocusMode })),
            setBackground: (currentBackground) => set({ currentBackground }),
            setVolume: (volume) => set({ volume }),
        }),
        {
            name: 'qworkos-settings',
        }
    )
)
