'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTypingStore } from '@/store/typing-store'
import { TypingCaret } from '@/components/typing-caret'
import { WordDisplay } from '@/components/word-display'
import { StatsDisplay } from '@/components/stats-display'
import { Keyboard, MousePointer } from 'lucide-react'

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
      <motion.div 
        className="flex items-center justify-center h-32 text-mt-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mr-3"
        >
          <Keyboard className="w-5 h-5" />
        </motion.div>
        Generating words...
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="w-full max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <StatsDisplay />
      
      <motion.div
        className={`relative p-8 rounded-2xl border-2 transition-all duration-300 cursor-text ${
          isFocused
            ? 'border-mt-main bg-mt-bg shadow-lg shadow-mt-main/20'
            : 'border-mt-sub bg-mt-bg/50 hover:border-mt-sub/40 hover:bg-mt-bg/70'
        }`}
        style={{
          borderColor: isFocused ? undefined : 'rgba(100, 102, 105, 0.2)',
          '--tw-border-opacity': isFocused ? undefined : '0.4'
        } as React.CSSProperties}
        onClick={handleContainerClick}
        whileHover={{ scale: isFocused ? 1 : 1.01 }}
        whileTap={{ scale: 0.99 }}
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
        <AnimatePresence>
          {!isFocused && !isTestActive && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-mt-bg/90 backdrop-blur-sm rounded-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-4"
                >
                  <MousePointer className="w-8 h-8 text-mt-main mx-auto" />
                </motion.div>
                <div className="text-mt-sub text-lg font-medium">
                  Click here or start typing to focus
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Word display with caret */}
        <div className="relative">
          <TypingCaret />
          <WordDisplay />
        </div>

        {/* Instructions */}
        <AnimatePresence>
          {!isTestActive && (
            <motion.div 
              className="mt-8 text-center text-mt-sub text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.5 }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <kbd className="px-3 py-1 bg-mt-sub/20 rounded-lg text-xs font-mono border border-mt-sub/30">
                    Tab
                  </kbd>
                  <span>to restart</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <kbd className="px-3 py-1 bg-mt-sub/20 rounded-lg text-xs font-mono border border-mt-sub/30">
                    Esc
                  </kbd>
                  <span>to reset</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}