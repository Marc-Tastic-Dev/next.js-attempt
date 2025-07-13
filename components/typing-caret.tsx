'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useTypingStore } from '@/store/typing-store'

export function TypingCaret() {
  const { input, words, isTestActive } = useTypingStore()
  const caretRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!caretRef.current || !containerRef.current) return

    const text = words.join(' ')
    const currentCharIndex = input.length
    
    // Calculate caret position
    const getCaretPosition = () => {
      if (currentCharIndex === 0) return { x: 0, y: 0 }
      
      // Create a temporary span to measure text width
      const tempSpan = document.createElement('span')
      tempSpan.style.font = 'inherit'
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

    const { x, y } = getCaretPosition()
    
    // Animate caret to new position
    gsap.to(caretRef.current, {
      x,
      y,
      duration: 0.1,
      ease: 'power2.out',
    })

    // Animate blinking
    if (isTestActive) {
      gsap.set(caretRef.current, { opacity: 1 })
      gsap.to(caretRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      })
    } else {
      gsap.killTweensOf(caretRef.current)
      gsap.to(caretRef.current, {
        opacity: 1,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      })
    }
  }, [input, words, isTestActive])

  return (
    <div ref={containerRef} className="relative">
      <div
        ref={caretRef}
        className="absolute w-0.5 h-7 bg-mt-caret pointer-events-none z-10"
        style={{ transform: 'translateX(0px) translateY(0px)' }}
      />
    </div>
  )
}