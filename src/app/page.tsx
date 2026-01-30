'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTaskStore } from '@/store/useTaskStore'
import KanbanBoard from '@/components/management/KanbanBoard'

export default function Home() {
  const [time, setTime] = useState<string>('')
  const { tasks } = useTaskStore()

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-12 gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-8xl font-bold tracking-tighter text-white drop-shadow-2xl font-mono">
          {time}
        </h1>
        <p className="text-xl mt-2 font-light text-white/80">
          {tasks.length > 0
            ? `${tasks.filter(t => t.status !== 'done').length} pending tasks. Stay flowing.`
            : 'No tasks. Add one to start the flow.'}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full h-full flex-1 mb-10"
      >
        <KanbanBoard />
      </motion.div>
    </div>
  )
}
