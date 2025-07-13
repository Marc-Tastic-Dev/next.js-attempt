'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTypingStore } from '@/store/typing-store'
import { TrendingUp, Target, Clock, Zap } from 'lucide-react'

export function StatsDisplay() {
  const { stats, config, isTestActive, isTestCompleted, startTime, updateStats } = useTypingStore()

  useEffect(() => {
    if (!isTestActive || isTestCompleted) return

    const interval = setInterval(updateStats, 100)
    return () => clearInterval(interval)
  }, [isTestActive, isTestCompleted, updateStats])

  const getTimeRemaining = () => {
    if (config.mode !== 'time' || !startTime) return config.timeLimit
    
    const elapsed = Math.floor((Date.now() - startTime) / 1000)
    return Math.max(0, config.timeLimit - elapsed)
  }

  const statItems = [
    {
      value: stats.wpm,
      label: 'wpm',
      icon: TrendingUp,
      color: 'text-mt-main'
    },
    {
      value: stats.accuracy,
      label: 'acc',
      icon: Target,
      color: 'text-green-400'
    },
    ...(config.mode === 'time' ? [{
      value: getTimeRemaining(),
      label: 'time',
      icon: Clock,
      color: 'text-blue-400'
    }] : [{
      value: config.wordCount,
      label: 'words',
      icon: Zap,
      color: 'text-purple-400'
    }])
  ]

  return (
    <motion.div 
      className="flex justify-center space-x-8 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="relative">
            <item.icon className={`w-6 h-6 ${item.color} mb-2 mx-auto opacity-60`} />
            <motion.div
              className={`text-4xl font-bold ${item.color} tracking-tight`}
              key={item.value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {item.label === 'acc' ? `${item.value}%` : item.value}
            </motion.div>
          </div>
          <div className="text-sm text-mt-sub font-medium uppercase tracking-wider">
            {item.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}