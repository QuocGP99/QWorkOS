import { useSettingsStore } from '@/store/useSettingsStore'
import { useAmbienceStore } from '@/store/useAmbienceStore'
import { Background } from '@/types'
import { X, Volume2, Image as ImageIcon, CloudRain, Music } from 'lucide-react'
import { useState } from 'react'
import { usePlayerStore, DEFAULT_PLAYLIST } from '@/store/usePlayerStore'

const PRESET_BACKGROUNDS: Background[] = [
    {
        id: 'cyberpunk-city',
        type: 'video',
        url: 'https://video.wixstatic.com/video/11062b_92619c730c4b4b0bb27ea39c4276a52b/1080p/mp4/file.mp4',
        name: 'Cyberpunk'
    },
    {
        id: 'lofi-girl',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop',
        name: 'Lofi Room'
    },
    {
        id: 'rain-window',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2574&auto=format&fit=crop',
        name: 'Rainy Window'
    }
]

interface SettingsModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const {
        volume,
        setVolume,
        currentBackground,
        setBackground,
    } = useSettingsStore()

    const { setTrack, currentTrack } = usePlayerStore()

    const { rainVolume, setRainVolume, windVolume, setWindVolume } = useAmbienceStore()

    const [customUrl, setCustomUrl] = useState('')

    if (!isOpen) return null

    const handleCustomBg = (e: React.FormEvent) => {
        e.preventDefault()
        if (!customUrl) return

        // Simple type detection based on extension
        const type = customUrl.match(/\.(mp4|webm)$/i) ? 'video' : 'image'

        setBackground({
            id: 'custom-' + Date.now(),
            type,
            url: customUrl,
            name: 'Custom Background'
        })
        setCustomUrl('')
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Settings</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Volume Control */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-white/70">
                            <Volume2 className="w-4 h-4" /> Global Volume
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-full accent-white h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer"
                        />
                    </div>

                    {/* Background Selection */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-medium text-white/70">
                            <ImageIcon className="w-4 h-4" /> Background
                        </label>

                        <div className="grid grid-cols-3 gap-2">
                            {PRESET_BACKGROUNDS.map(bg => (
                                <button
                                    key={bg.id}
                                    onClick={() => setBackground(bg)}
                                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${currentBackground.id === bg.id ? 'border-white' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                >
                                    {bg.type === 'video' ? (
                                        <video src={bg.url} className="w-full h-full object-cover" muted />
                                    ) : (
                                        <img src={bg.url} className="w-full h-full object-cover" alt={bg.name} />
                                    )}
                                    <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-[10px] p-1 text-center truncate">
                                        {bg.name}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Custom URL Input */}
                        <form onSubmit={handleCustomBg} className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Paste Image or Video URL..."
                                value={customUrl}
                                onChange={(e) => setCustomUrl(e.target.value)}
                                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30 transition-colors"
                            />
                            <button
                                type="submit"
                                className="px-3 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition-colors"
                            >
                                Set
                            </button>
                        </form>
                    </div>

                    {/* Ambience Control */}
                    <div className="space-y-4 pt-4 border-t border-white/10">
                        <h3 className="flex items-center gap-2 text-sm font-medium text-white/70">
                            <CloudRain className="w-4 h-4" /> Ambience Mixer
                        </h3>

                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="text-xs text-white/50">Rain Intensity</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={rainVolume}
                                    onChange={(e) => setRainVolume(parseFloat(e.target.value))}
                                    className="w-full accent-blue-400 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs text-white/50">Wind Intensity</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={windVolume}
                                    onChange={(e) => setWindVolume(parseFloat(e.target.value))}
                                    className="w-full accent-gray-400 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Music Vibe Selector */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                        <label className="flex items-center gap-2 text-sm font-medium text-white/70">
                            <Music className="w-4 h-4" /> Music Vibe
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {DEFAULT_PLAYLIST.map(track => (
                                <button
                                    key={track.id}
                                    onClick={() => setTrack(track)}
                                    className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${currentTrack?.id === track.id ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10 text-white/70'}`}
                                >
                                    {track.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                        <p className="text-xs text-center text-white/30">
                            Pro Tip: Use direct links for MP4 videos or high-res images.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
