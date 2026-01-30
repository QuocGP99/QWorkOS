'use client'

import { useEffect } from 'react'
import { useSettingsStore } from '@/store/useSettingsStore'

export function ThemeManager() {
    const { theme } = useSettingsStore()

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    return null
}
