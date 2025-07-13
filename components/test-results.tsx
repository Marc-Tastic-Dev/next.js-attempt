'use client'

import React from 'react'
import { RotateCcw, Share } from 'lucide-react'
import { useTypingStore } from '@/store/typing-store'
import { Button } from '@/components/ui/button'

export function TestResults() {
  const { stats, config, resetTest } = useTypingStore()

  const formatAccuracy = (accuracy: number) => {
    return `${accuracy.toFixed(1)}%`
  }

  const getGrade = (wpm: number, accuracy: number) => {
    if (accuracy < 90) return { grade: 'F', color: 'text-mt-error' }
    if (wpm < 20) return { grade: 'D', color: 'text-orange-400' }
    if (wpm < 40) return { grade: 'C', color: 'text-yellow-400' }
    if (wpm < 60) return { grade: 'B', color: 'text-blue-400' }
    if (wpm < 80) return { grade: 'A', color: 'text-green-400' }
    return { grade: 'S', color: 'text-mt-main' }
  }

  const { grade, color } = getGrade(stats.wpm, stats.accuracy)

  return (
    <div className="w-full max-w-2xl mx-auto text-center space-y-8">
      {/* Main Stats */}
      <div className="space-y-4">
        <div className="text-6xl font-bold text-mt-main">
          {stats.wpm}
        </div>
        <div className="text-xl text-mt-sub">words per minute</div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <div className="text-2xl font-semibold text-mt-text">{formatAccuracy(stats.accuracy)}</div>
          <div className="text-sm text-mt-sub">accuracy</div>
        </div>
        
        <div className="space-y-2">
          <div className="text-2xl font-semibold text-mt-text">{stats.time}s</div>
          <div className="text-sm text-mt-sub">time</div>
        </div>
        
        <div className="space-y-2">
          <div className="text-2xl font-semibold text-mt-text">{stats.errors}</div>
          <div className="text-sm text-mt-sub">errors</div>
        </div>
        
        <div className="space-y-2">
          <div className={`text-2xl font-semibold ${color}`}>{grade}</div>
          <div className="text-sm text-mt-sub">grade</div>
        </div>
      </div>

      {/* Test Configuration */}
      <div className="text-sm text-mt-sub space-y-1">
        <div>
          {config.mode === 'time' ? `${config.timeLimit}s` : `${config.wordCount} words`} • 
          english • {config.includePunctuation ? 'punctuation' : 'no punctuation'} •
          {config.includeNumbers ? ' numbers' : ' no numbers'}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <Button
          onClick={resetTest}
          className="bg-mt-main text-mt-bg hover:bg-mt-main/90"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
        
        <Button
          variant="outline"
          className="border-mt-sub text-mt-sub hover:text-mt-text"
          style={{ '--tw-bg-opacity': '0.1' } as React.CSSProperties}
        >
          <Share className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>

      {/* Quick restart hint */}
      <div className="text-xs text-mt-sub">
        Press <kbd className="px-1 py-0.5 rounded text-xs" style={{ backgroundColor: 'rgba(100, 102, 105, 0.2)' }}>Tab</kbd> to quickly restart
      </div>
    </div>
  )
}