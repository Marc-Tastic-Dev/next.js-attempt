'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useTypingStore } from '@/store/typing-store'

export function TypingCaret() {
  const { input, words, isTestActive } = useTypingStore()
  const caretRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const [caretPosition, setCaretPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!caretRef.current || !containerRef.current) return

    const text = words.join(' ')
    const currentCharIndex = input.length
    
    // Calculate caret position
    const getCaretPosition = () => {
      if (currentCharIndex === 0) return { x: 0, y: 0 }
      
      // Create a temporary span to measure text width
      const tempSpan = document.createElement('span')
      tempSpan.style.font = 'var(--font-mono)'
      tempSpan.style.visibility = 'hidden'
      tempSpan.style.position = 'absolute'
      tempSpan.style.whiteSpace = 'pre'
      tempSpan.textContent = text.substring(0, currentCharIndex)
      
      document.body.appendChild(tempSpan)
      const width = tempSpan.offsetWidth
      document.body.removeChild(tempSpan)
      
      // Calculate line height and line breaks
      const containerWidth = containerRef.current?.offsetWidth || 800
      const charWidth = width / currentCharIndex || 14
      const charsPerLine = Math.floor(containerWidth / charWidth)
      
      const x = (currentCharIndex % charsPerLine) * charWidth
      const y = Math.floor(currentCharIndex / charsPerLine) * 32 // line height
      
      return { x, y }
    }

    const newPosition = getCaretPosition()
    setCaretPosition(newPosition)
    
    // Animate caret to new position
    controls.start({
      x: newPosition.x,
      y: newPosition.y,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.1
      }
    })

    // Animate blinking
    if (isTestActive) {
      controls.start({
        opacity: [1, 0, 1],
        transition: {
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }
      })
    } else {
      controls.start({
        opacity: [1, 0.5, 1],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      })
    }
  }, [input, words, isTestActive, controls])

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        ref={caretRef}
        className="absolute w-0.5 h-6 bg-blue-600 rounded-full pointer-events-none z-10"
        animate={controls}
        initial={{ x: 0, y: 0, opacity: 1 }}
        style={{
          boxShadow: '0 0 8px rgba(47, 128, 237, 0.4)'
        }}
      />
    </div>
  )
}