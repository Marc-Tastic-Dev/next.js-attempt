'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useTypingStore } from '@/store/typing-store'

export function WordDisplay() {
  const { words, input, currentWordIndex, currentCharIndex } = useTypingStore()

  const getWordStatus = (wordIndex: number) => {
    if (wordIndex < currentWordIndex) return 'completed'
    if (wordIndex === currentWordIndex) return 'current'
    return 'remaining'
  }

  const getCharStatus = (wordIndex: number, charIndex: number) => {
    if (wordIndex < currentWordIndex) return 'correct'
    if (wordIndex === currentWordIndex) {
      if (charIndex < currentCharIndex) {
        const expectedChar = words[wordIndex]?.[charIndex]
        const actualChar = input[charIndex]
        return expectedChar === actualChar ? 'correct' : 'incorrect'
      }
      if (charIndex === currentCharIndex) return 'current'
    }
    return 'remaining'
  }

  const renderWord = (word: string, wordIndex: number) => {
    const status = getWordStatus(wordIndex)
    const isCurrent = status === 'current'
    const isCompleted = status === 'completed'

    return (
      <motion.span
        key={wordIndex}
        className={`word word-${status} ${isCurrent ? 'bg-blue-50' : ''} ${isCompleted ? 'text-gray-900' : ''}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: wordIndex * 0.01 }}
      >
        {word.split('').map((char, charIndex) => {
          const charStatus = getCharStatus(wordIndex, charIndex)
          return (
            <span
              key={charIndex}
              className={`letter letter-${charStatus} ${
                charStatus === 'correct' ? 'text-gray-900' :
                charStatus === 'incorrect' ? 'text-red-600 bg-red-50' :
                charStatus === 'current' ? 'bg-blue-100 text-blue-900' :
                'text-gray-400'
              }`}
            >
              {char}
            </span>
          )
        })}
        {wordIndex < words.length - 1 && <span className="text-gray-300"> </span>}
      </motion.span>
    )
  }

  return (
    <div className="typing-area text-lg leading-relaxed font-mono">
      <div className="text-gray-900">
        {words.map((word, index) => renderWord(word, index))}
      </div>
    </div>
  )
}