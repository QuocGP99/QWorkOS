'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Task } from '@/types'
import { GripVertical, X } from 'lucide-react'
import { useSound } from '@/hooks/useSound'

interface TaskCardProps {
    task: Task
    onDelete: (id: string) => void
}

export default function TaskCard({ task, onDelete }: TaskCardProps) {
    const { playClick } = useSound()
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: 'Task',
            task,
        },
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="relative flex items-center p-4 mb-3 bg-white/20 backdrop-blur-md rounded-xl border-2 border-primary/50 opacity-50 h-[80px]"
            />
        )
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="group relative flex items-center justify-between p-4 mb-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl border border-white/10 shadow-sm transition-all cursor-grab active:cursor-grabbing"
            {...attributes}
            {...listeners}
        >
            <div className="flex items-center gap-3 overflow-hidden">
                <GripVertical className="w-4 h-4 text-white/40 cursor-grab active:cursor-grabbing flex-shrink-0" />
                <span className="text-sm font-medium text-white truncate">{task.title}</span>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation() // Prevent drag start
                    playClick()
                    onDelete(task.id)
                }}
                className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-white/20 transition-all"
            >
                <X className="w-4 h-4 text-white/60 hover:text-red-400" />
            </button>
        </div>
    )
}
