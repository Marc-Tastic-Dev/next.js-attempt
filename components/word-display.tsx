'use client'

import React from 'react'
import { useTypingStore } from '@/store/typing-store'

export function WordDisplay() {
  const { words, input } = useTypingStore()

  if (!words.length) return null

  const text = words.join(' ')
  
  const renderCharacters = () => {
    return text.split('').map((char, index) => {
      let className = 'letter'
      
      if (index < input.length) {
        // Character has been typed
        if (input[index] === char) {
          className += ' correct text-mt-text'
        } else {
          className += ' incorrect text-mt-error bg-mt-error/20'
        }
      } else if (index === input.length) {
        // Current character to type
        className += ' current bg-mt-sub/30'
      } else {
        // Untyped character
        className += ' text-mt-sub'
      }

      return (
        <span
          key={index}
          className={className}
          style={{ position: 'relative' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      )
    })
  }

  // Handle extra characters typed beyond the text
  const extraChars = input.length > text.length ? input.slice(text.length) : ''

  return (
    <div className="text-2xl leading-relaxed font-mono select-none">
      <div className="flex flex-wrap">
        {renderCharacters()}
        {extraChars && (
          <span className="letter extra text-mt-error bg-mt-error/30">
            {extraChars}
          </span>
        )}
      </div>
    </div>
  )
}