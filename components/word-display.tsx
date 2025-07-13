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
      let style: React.CSSProperties = { position: 'relative' }
      
      if (index < input.length) {
        // Character has been typed
        if (input[index] === char) {
          className += ' correct text-mt-text'
        } else {
          className += ' incorrect text-mt-error'
          style.backgroundColor = 'rgba(202, 71, 84, 0.2)'
        }
      } else if (index === input.length) {
        // Current character to type
        className += ' current'
        style.backgroundColor = 'rgba(100, 102, 105, 0.3)'
      } else {
        // Untyped character
        className += ' text-mt-sub'
      }

      return (
        <span
          key={index}
          className={className}
          style={style}
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