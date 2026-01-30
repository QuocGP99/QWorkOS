'use client'

import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Column, Task } from '@/types'
import TaskCard from './TaskCard'
import { useMemo } from 'react'

interface KanbanColumnProps {
    column: Column
    tasks: Task[]
    onDeleteTask: (id: string) => void
}

export default function KanbanColumn({ column, tasks, onDeleteTask }: KanbanColumnProps) {
    const {
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: column.id,
        data: {
            type: 'Column',
            column,
        },
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const tasksIds = useMemo(() => tasks.map((t) => t.id), [tasks])

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex flex-col w-80 h-full max-h-[70vh] bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden"
        >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-bold text-lg text-white capitalize flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${column.id === 'todo' ? 'bg-red-400' :
                        column.id === 'in_progress' ? 'bg-yellow-400' : 'bg-green-400'
                        }`} />
                    {column.title}
                </h3>
                <span className="px-2 py-1 text-xs font-mono bg-white/10 rounded-full text-white/70">
                    {tasks.length}
                </span>
            </div>

            <div className="flex-1 p-3 overflow-y-auto scrollbar-hide">
                <SortableContext items={tasksIds}>
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} onDelete={onDeleteTask} />
                    ))}
                </SortableContext>
            </div>
        </div>
    )
}
