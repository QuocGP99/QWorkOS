'use client'

import { useState, useMemo, useEffect } from 'react'
import {
    DndContext,
    DragOverlay,
    DragStartEvent,
    DragEndEvent,
    DragOverEvent,
    useSensor,
    useSensors,
    PointerSensor
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import { Task, TaskStatus, Column } from '@/types'
import { useTaskStore } from '@/store/useTaskStore'
import KanbanColumn from './KanbanColumn'
import TaskCard from './TaskCard'
import { Plus } from 'lucide-react'
import { useSound } from '@/hooks/useSound'

export default function KanbanBoard() {
    const { tasks, addTask, moveTask, deleteTask, setTasks } = useTaskStore()
    const { playClick } = useSound()
    const [activeTask, setActiveTask] = useState<Task | null>(null)

    const columns: Column[] = useMemo(() => [
        { id: 'todo', title: 'To Do', tasks: [] },
        { id: 'in_progress', title: 'In Progress', tasks: [] },
        { id: 'done', title: 'Done', tasks: [] },
    ], [])

    const columnsId = useMemo(() => columns.map((col) => col.id), [columns])

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3, // Requires 3px movement to start drag
            },
        })
    )

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === 'Task') {
            setActiveTask(event.active.data.current.task)
        }
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const isActiveTask = active.data.current?.type === 'Task'
        const isOverTask = over.data.current?.type === 'Task'

        if (!isActiveTask) return

        // Dropping a Task over another Task
        if (isActiveTask && isOverTask) {
            // Logic handled in dragEnd usually for simple lists, 
            // but for Kanban usually we want visual feedback.
            // For simplicity, we handle reordering in onDragEnd unless cross-column
        }
    }

    function onDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (!over) {
            setActiveTask(null)
            return
        }

        const activeId = active.id as string
        const overId = over.id as string

        // Find valid task objects
        const activeTask = tasks.find(t => t.id === activeId)
        // Over could be a column or a task
        const overTask = tasks.find(t => t.id === overId)

        // Determine target column
        let overColumnId: TaskStatus | undefined
        if (overTask) {
            overColumnId = overTask.status
        } else {
            // Check if dropped directly on a column
            if (columnsId.includes(overId as any)) {
                overColumnId = overId as TaskStatus
            }
        }

        if (!activeTask || !overColumnId) {
            setActiveTask(null)
            return
        }

        // Move logic
        if (activeTask.status !== overColumnId) {
            // Moved to different column
            // We'll put it at the end if dropped on column, or replace index if dropped on task
            // For simplicity/vibe: just update status and let it fall to end or use existing order
            moveTask(activeId, overColumnId, 9999) // 9999 to put at end for now
        } else if (activeId !== overId) {
            // Reordering within same column (Not fully implemented in store yet, just status update)
            // Future: Implement array reordering in store
        }

        setActiveTask(null)
    }

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className="flex h-full w-full gap-6 overflow-x-auto p-4 items-start justify-center">
            <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
            >
                <div className="flex gap-6">
                    {columns.map((col) => {
                        const colTasks = tasks.filter(t => t.status === col.id)
                        return (
                            <div key={col.id} className="flex flex-col gap-4">
                                <KanbanColumn
                                    column={col}
                                    tasks={colTasks}
                                    onDeleteTask={deleteTask}
                                />
                                <button
                                    onClick={() => {
                                        playClick()
                                        const title = prompt('Name your task:')
                                        if (title) addTask(title, col.id)
                                    }}
                                    className="flex items-center justify-center w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl border border-dashed border-white/30 text-white/50 hover:text-white transition-all backdrop-blur-sm"
                                >
                                    <Plus className="w-5 h-5 mr-2" /> Add Card
                                </button>
                            </div>
                        )
                    })}
                </div>

                {mounted && createPortal(
                    <DragOverlay>
                        {activeTask && (
                            <TaskCard
                                task={activeTask}
                                onDelete={() => { }}
                            />
                        )}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    )
}
