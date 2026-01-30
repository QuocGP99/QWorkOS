import { create } from 'zustand'
import { Track } from '@/types'

interface PlayerState {
    isPlaying: boolean
    currentTrack: Track | null
    playlist: Track[]

    play: () => void
    pause: () => void
    setTrack: (track: Track) => void
    setPlaylist: (tracks: Track[]) => void
    nextTrack: () => void
}

export const DEFAULT_PLAYLIST: Track[] = [
    {
        id: 'lofi-girl',
        title: 'Lofi Girl',
        url: 'https://www.youtube.com/watch?v=lTRiuFIWV54',
        provider: 'youtube'
    },
    {
        id: 'synthwave',
        title: 'Synthwave Radio - beats to chill/game to',
        url: 'https://www.youtube.com/watch?v=MVPTGNGiI-4',
        provider: 'youtube'
    },
    {
        id: 'coffee-shop',
        title: 'Coffee Shop Vibes - Smooth Jazz & Rain',
        url: 'https://www.youtube.com/watch?v=lP26UCnoH9s',
        provider: 'youtube'
    },
    {
        id: 'ghibli',
        title: 'Studio Ghibli Piano Collection',
        url: 'https://www.youtube.com/watch?v=0K4oym9fv6o',
        provider: 'youtube'
    }
]

import { persist } from 'zustand/middleware'

export const usePlayerStore = create<PlayerState>()(
    persist(
        (set) => ({
            isPlaying: false,
            currentTrack: DEFAULT_PLAYLIST[0],
            playlist: DEFAULT_PLAYLIST,

            play: () => set({ isPlaying: true }),
            pause: () => set({ isPlaying: false }),
            setTrack: (track) => set({ currentTrack: track, isPlaying: true }),
            setPlaylist: (playlist) => set({ playlist }),
            nextTrack: () => set((state) => {
                if (!state.currentTrack || state.playlist.length === 0) return {}
                const currentIndex = state.playlist.findIndex(t => t.id === state.currentTrack?.id)
                const nextIndex = (currentIndex + 1) % state.playlist.length
                return { currentTrack: state.playlist[nextIndex], isPlaying: true }
            }),
        }),
        {
            name: 'qworkos-player',
            partialize: (state) => ({ currentTrack: state.currentTrack, playlist: state.playlist }), // Don't persist isPlaying to avoid auto-play on load
        }
    )
)
