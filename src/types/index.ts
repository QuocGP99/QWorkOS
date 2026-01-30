export type Theme = 'cyberpunk' | 'lofi' | 'nature' | 'dark' | 'light'

export type TaskStatus = 'todo' | 'in_progress' | 'done'

export interface Task {
    id: string
    title: string
    status: TaskStatus
    order: number
    userId?: string
}

export interface Column {
    id: TaskStatus
    title: string
    tasks: Task[]
}

export interface Track {
    id: string
    url: string
    title: string
    provider: 'youtube' | 'soundcloud' | 'file'
}

export type BackgroundType = 'video' | 'image' | 'color'

export interface Background {
    id: string
    type: BackgroundType
    url: string
    name: string
}
