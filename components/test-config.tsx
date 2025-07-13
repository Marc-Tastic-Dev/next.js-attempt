'use client'

import React from 'react'
import { Clock, Type, Hash, Settings } from 'lucide-react'
import { useTypingStore } from '@/store/typing-store'
import { Button } from '@/components/ui/button'

export function TestConfig() {
  const { config, setConfig, resetTest } = useTypingStore()

  const timeOptions = [15, 30, 60, 120]
  const wordOptions = [10, 25, 50, 100]

  const handleModeChange = (mode: 'time' | 'words') => {
    setConfig({ mode })
    resetTest()
  }

  const handleTimeChange = (timeLimit: number) => {
    setConfig({ timeLimit })
    resetTest()
  }

  const handleWordCountChange = (wordCount: number) => {
    setConfig({ wordCount })
    resetTest()
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Mode Selection */}
      <div className="flex items-center space-x-4">
        <Button
          variant={config.mode === 'time' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleModeChange('time')}
          className={`${
            config.mode === 'time'
              ? 'bg-mt-main text-mt-bg'
              : 'text-mt-sub hover:text-mt-text'
          }`}
        >
          <Clock className="w-4 h-4 mr-2" />
          time
        </Button>
        <Button
          variant={config.mode === 'words' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleModeChange('words')}
          className={`${
            config.mode === 'words'
              ? 'bg-mt-main text-mt-bg'
              : 'text-mt-sub hover:text-mt-text'
          }`}
        >
          <Type className="w-4 h-4 mr-2" />
          words
        </Button>
      </div>

      {/* Options */}
      <div className="flex items-center space-x-2">
        {config.mode === 'time' ? (
          <>
            {timeOptions.map((time) => (
              <Button
                key={time}
                variant="ghost"
                size="sm"
                onClick={() => handleTimeChange(time)}
                className={`${
                  config.timeLimit === time
                    ? 'text-mt-main border-b-2 border-mt-main'
                    : 'text-mt-sub hover:text-mt-text'
                }`}
              >
                {time}
              </Button>
            ))}
          </>
        ) : (
          <>
            {wordOptions.map((words) => (
              <Button
                key={words}
                variant="ghost"
                size="sm"
                onClick={() => handleWordCountChange(words)}
                className={`${
                  config.wordCount === words
                    ? 'text-mt-main border-b-2 border-mt-main'
                    : 'text-mt-sub hover:text-mt-text'
                }`}
              >
                {words}
              </Button>
            ))}
          </>
        )}
      </div>

      {/* Additional Settings */}
      <div className="flex items-center space-x-4 text-mt-sub text-sm">
        <div className="flex items-center space-x-2">
          <Hash className="w-4 h-4" />
          <span>punctuation</span>
        </div>
        <div className="flex items-center space-x-2">
          <Type className="w-4 h-4" />
          <span>numbers</span>
        </div>
      </div>
    </div>
  )
}