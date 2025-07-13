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
        className="flex items-center justify-center h-32 text-gray-500"
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
        className={`relative p-8 rounded-lg border-2 transition-all duration-300 cursor-text ${
          isFocused
            ? 'border-blue-500 bg-white shadow-lg'
            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
        }`}
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
              className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-lg"
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
                  <MousePointer className="w-8 h-8 text-blue-600 mx-auto" />
                </motion.div>
                <div className="text-gray-600 text-lg font-medium">
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
              className="mt-8 text-center text-gray-500 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.5 }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <kbd className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-mono border border-gray-200">
                    Tab
                  </kbd>
                  <span>to restart</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <kbd className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-mono border border-gray-200">
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