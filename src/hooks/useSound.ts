'use client'

import { useCallback } from 'react'

export function useSound() {
    const playClick = useCallback(() => {
        try {
            const audio = new Audio('/sounds/ui/click.mp3')
            audio.volume = 0.5
            const playPromise = audio.play()

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Suppress "NotSupportedError" which happens when file format is invalid (or 404 text/html response)
                    // or "NotAllowedError" (user didn't interact yet)
                    if (error.name === 'NotSupportedError' || error.name === 'NotAllowedError') {
                        console.debug('[UI Sound] Playback suppressed:', error.message)
                    } else {
                        console.warn('[UI Sound] Playback failed:', error)
                    }
                })
            }
        } catch (e) {
            console.debug('[UI Sound] Audio construction failed', e)
        }
    }, [])

    return { playClick }
}
