'use client'

import React from 'react'
import { Clock, Type, Hash, Zap } from 'lucide-react'
import { useTypingStore } from '@/store/typing-store'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      className="flex flex-col items-center space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Mode Selection */}
      <motion.div 
        className="flex items-center space-x-4 p-2 bg-gray-50 rounded-lg border border-gray-200"
        variants={itemVariants}
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant={config.mode === 'time' ? 'default' : 'ghost'}
            size="lg"
            onClick={() => handleModeChange('time')}
            className={`${
              config.mode === 'time'
                ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            } transition-all duration-200 font-medium`}
          >
            <Clock className="w-5 h-5 mr-2" />
            time
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant={config.mode === 'words' ? 'default' : 'ghost'}
            size="lg"
            onClick={() => handleModeChange('words')}
            className={`${
              config.mode === 'words'
                ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            } transition-all duration-200 font-medium`}
          >
            <Type className="w-5 h-5 mr-2" />
            words
          </Button>
        </motion.div>
      </motion.div>

      {/* Options */}
      <motion.div 
        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
        variants={itemVariants}
      >
        {config.mode === 'time' ? (
          <>
            {timeOptions.map((time) => (
              <motion.div key={time} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => handleTimeChange(time)}
                  className={`${
                    config.timeLimit === time
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  } transition-all duration-200 font-medium min-w-[60px]`}
                >
                  {time}
                </Button>
              </motion.div>
            ))}
          </>
        ) : (
          <>
            {wordOptions.map((words) => (
              <motion.div key={words} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => handleWordCountChange(words)}
                  className={`${
                    config.wordCount === words
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  } transition-all duration-200 font-medium min-w-[60px]`}
                >
                  {words}
                </Button>
              </motion.div>
            ))}
          </>
        )}
      </motion.div>

      {/* Additional Settings */}
      <motion.div 
        className="flex items-center space-x-6 text-gray-600 text-sm"
        variants={itemVariants}
      >
        <motion.div 
          className="flex items-center space-x-2 cursor-pointer hover:text-gray-900 transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          <Hash className="w-4 h-4" />
          <span className="font-medium">punctuation</span>
        </motion.div>
        <motion.div 
          className="flex items-center space-x-2 cursor-pointer hover:text-gray-900 transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          <Zap className="w-4 h-4" />
          <span className="font-medium">numbers</span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}