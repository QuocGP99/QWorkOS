'use client'

import dynamic from 'next/dynamic'
import { usePlayerStore } from '@/store/usePlayerStore'
import { useSettingsStore } from '@/store/useSettingsStore'
import { useEffect, useState } from 'react'

// Load ReactPlayer dynamically to avoid Hydration Error
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as any

export default function AudioPlayer() {
    const { currentTrack, isPlaying, nextTrack } = usePlayerStore()
    const { volume } = useSettingsStore()
    const [isReady, setIsReady] = useState(false)

    // Hydration fix
    useEffect(() => {
        setIsReady(true)
    }, [])

    if (!isReady || !currentTrack) return null

    return (
        <div className="fixed bottom-0 right-0 opacity-0 pointer-events-none">
            <ReactPlayer
                url={currentTrack.url}
                playing={isPlaying}
                volume={volume}
                loop={false}
                onEnded={() => nextTrack()}
                width="1px"
                height="1px"
                config={{
                    youtube: {
                        playerVars: { showinfo: 0, controls: 0, disablekb: 1 }
                    }
                }}
                onError={(e: any) => console.error('[AudioPlayer] Error:', e)}
                onReady={() => console.log('[AudioPlayer] Ready - Volume:', volume)}
            />
        </div>
    )
}
