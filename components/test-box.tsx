'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useTypingStore } from '@/store/typing-store'
import { TypingCaret } from '@/components/typing-caret'
import { WordDisplay } from '@/components/word-display'
import { StatsDisplay } from '@/components/stats-display'

export function TestBox() {
  const {
    words,
    input,
    updateInput,
    resetTest,
    generateWords,
    isTestActive,
    isTestCompleted,
  } = useTypingStore()
  
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (words.length === 0) {
      generateWords()
    }
  }, [words.length, generateWords])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        resetTest()
        inputRef.current?.focus()
      } else if (e.key === 'Tab') {
        e.preventDefault()
        resetTest()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [resetTest])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTestCompleted) {
      updateInput(e.target.value)
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  if (words.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-mt-sub">
        Generating words...
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <StatsDisplay />
      
      <div
        className={`relative p-8 rounded-lg border-2 transition-colors duration-200 cursor-text ${
          isFocused
            ? 'border-mt-main bg-mt-bg'
            : 'border-mt-sub bg-mt-bg'
        }`}
        style={{
          borderColor: isFocused ? undefined : 'rgba(100, 102, 105, 0.2)',
          '--tw-border-opacity': isFocused ? undefined : '0.4'
        } as React.CSSProperties}
        onClick={handleContainerClick}
      >
        {/* Hidden input for capturing keystrokes */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="absolute opacity-0 pointer-events-none"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
        />

        {/* Focus prompt */}
        {!isFocused && !isTestActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-mt-bg/80 backdrop-blur-sm rounded-lg">
            <div className="text-mt-sub text-lg">
              Click here or start typing to focus
            </div>
          </div>
        )}

        {/* Word display with caret */}
        <div className="relative">
          <TypingCaret />
          <WordDisplay />
        </div>

        {/* Instructions */}
        {!isTestActive && (
          <div className="mt-8 text-center text-mt-sub text-sm">
            <div className="space-y-1">
              <div>Press <kbd className="px-2 py-1 rounded" style={{ backgroundColor: 'rgba(100, 102, 105, 0.2)' }}>Tab</kbd> to restart</div>
              <div>Press <kbd className="px-2 py-1 rounded" style={{ backgroundColor: 'rgba(100, 102, 105, 0.2)' }}>Esc</kbd> to reset</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}