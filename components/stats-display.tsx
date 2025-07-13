'use client'

import React, { useEffect } from 'react'
import { useTypingStore } from '@/store/typing-store'

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

  return (
    <div className="flex justify-center space-x-8 mb-8 text-mt-main">
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold">{stats.wpm}</div>
        <div className="text-sm text-mt-sub">wpm</div>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold">{stats.accuracy}%</div>
        <div className="text-sm text-mt-sub">acc</div>
      </div>
      
      {config.mode === 'time' && (
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold">{getTimeRemaining()}</div>
          <div className="text-sm text-mt-sub">time</div>
        </div>
      )}
      
      {config.mode === 'words' && (
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold">{config.wordCount}</div>
          <div className="text-sm text-mt-sub">words</div>
        </div>
      )}
    </div>
  )
}