import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Task, TaskStatus } from '@/types'
import { v4 as uuidv4 } from 'uuid'

interface TaskState {
    tasks: Task[]
    addTask: (title: string, status?: TaskStatus) => void
    updateTask: (id: string, updates: Partial<Task>) => void
    deleteTask: (id: string) => void
    moveTask: (id: string, toStatus: TaskStatus, newOrder: number) => void
    setTasks: (tasks: Task[]) => void // For sync
}

export const useTaskStore = create<TaskState>()(
    persist(
        (set) => ({
            tasks: [],

            addTask: (title, status = 'todo') => set((state) => ({
                tasks: [
                    ...state.tasks,
                    {
                        id: uuidv4(),
                        title,
                        status,
                        order: state.tasks.filter(t => t.status === status).length,
                        // userId will be handled by sync logic later
                    }
                ]
            })),

            updateTask: (id, updates) => set((state) => ({
                tasks: state.tasks.map(task =>
                    task.id === id ? { ...task, ...updates } : task
                )
            })),

            deleteTask: (id) => set((state) => ({
                tasks: state.tasks.filter(task => task.id !== id)
            })),

            moveTask: (id, toStatus, newOrder) => set((state) => ({
                tasks: state.tasks.map(task =>
                    task.id === id ? { ...task, status: toStatus, order: newOrder } : task
                )
            })),

            setTasks: (tasks) => set({ tasks }),
        }),
        {
            name: 'qworkos-tasks',
        }
    )
)
