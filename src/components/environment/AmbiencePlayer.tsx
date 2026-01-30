'use client'

import { useAmbienceStore } from '@/store/useAmbienceStore'
import { useEffect, useRef, useState } from 'react'

export default function AmbiencePlayer() {
    const { rainVolume, windVolume, isPlaying } = useAmbienceStore()
    const [noiseErrors, setNoiseErrors] = useState<Record<string, boolean>>({})

    // Refs for audio elements
    const rainRef = useRef<HTMLAudioElement>(null)
    const windRef = useRef<HTMLAudioElement>(null)

    const handleError = (id: string, path: string) => {
        if (!noiseErrors[id]) {
            console.warn(`[Ambience] Failed to load sound: ${path}. Please ensure file exists in /public/sounds/ambience/`)
            setNoiseErrors(prev => ({ ...prev, [id]: true }))
        }
    }

    useEffect(() => {
        if (rainRef.current && !noiseErrors['rain']) {
            rainRef.current.volume = rainVolume
            if (rainVolume > 0 && isPlaying) {
                rainRef.current.play().catch(e => console.debug('[Ambience] Play suppressed', e))
            } else {
                rainRef.current.pause()
            }
        }
    }, [rainVolume, isPlaying, noiseErrors])

    useEffect(() => {
        if (windRef.current && !noiseErrors['wind']) {
            windRef.current.volume = windVolume
            if (windVolume > 0 && isPlaying) {
                windRef.current.play().catch(e => console.debug('[Ambience] Play suppressed', e))
            } else {
                windRef.current.pause()
            }
        }
    }, [windVolume, isPlaying, noiseErrors])

    return (
        <div className="hidden">
            <audio
                ref={rainRef}
                src="/sounds/ambience/rain.mp3"
                loop
                onError={() => handleError('rain', '/sounds/ambience/rain.mp3')}
            />
            <audio
                ref={windRef}
                src="/sounds/ambience/wind.mp3"
                loop
                onError={() => handleError('wind', '/sounds/ambience/wind.mp3')}
            />
        </div>
    )
}
