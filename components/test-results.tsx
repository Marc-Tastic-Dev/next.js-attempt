'use client'

import React from 'react'
import { RotateCcw, Share, Trophy, Target, Clock, AlertCircle } from 'lucide-react'
import { useTypingStore } from '@/store/typing-store'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'

export function TestResults() {
  const { stats, config, resetTest } = useTypingStore()

  const formatAccuracy = (accuracy: number) => {
    return `${accuracy.toFixed(1)}%`
  }

  const getGrade = (wpm: number, accuracy: number) => {
    if (accuracy < 90) return { grade: 'F', color: 'text-red-600', icon: AlertCircle }
    if (wpm < 20) return { grade: 'D', color: 'text-orange-600', icon: AlertCircle }
    if (wpm < 40) return { grade: 'C', color: 'text-yellow-600', icon: Target }
    if (wpm < 60) return { grade: 'B', color: 'text-blue-600', icon: Target }
    if (wpm < 80) return { grade: 'A', color: 'text-green-600', icon: Trophy }
    return { grade: 'S', color: 'text-blue-600', icon: Trophy }
  }

  const { grade, color, icon: GradeIcon } = getGrade(stats.wpm, stats.accuracy)

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      className="w-full max-w-3xl mx-auto text-center space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Stats */}
      <motion.div className="space-y-6" variants={itemVariants}>
        <motion.div
          className="text-7xl font-bold text-blue-600"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        >
          {stats.wpm}
        </motion.div>
        <div className="text-xl text-gray-600 font-medium">words per minute</div>
      </motion.div>

      {/* Detailed Stats */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
        variants={itemVariants}
      >
        <motion.div 
          className="space-y-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Target className="w-6 h-6 text-green-600 mx-auto" />
          <div className="text-2xl font-semibold text-gray-900">{formatAccuracy(stats.accuracy)}</div>
          <div className="text-sm text-gray-600 font-medium">accuracy</div>
        </motion.div>
        
        <motion.div 
          className="space-y-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Clock className="w-6 h-6 text-blue-600 mx-auto" />
          <div className="text-2xl font-semibold text-gray-900">{stats.time}s</div>
          <div className="text-sm text-gray-600 font-medium">time</div>
        </motion.div>
        
        <motion.div 
          className="space-y-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <AlertCircle className="w-6 h-6 text-red-600 mx-auto" />
          <div className="text-2xl font-semibold text-gray-900">{stats.errors}</div>
          <div className="text-sm text-gray-600 font-medium">errors</div>
        </motion.div>
        
        <motion.div 
          className="space-y-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <GradeIcon className={`w-6 h-6 ${color} mx-auto`} />
          <div className={`text-2xl font-semibold ${color}`}>{grade}</div>
          <div className="text-sm text-gray-600 font-medium">grade</div>
        </motion.div>
      </motion.div>

      {/* Test Configuration */}
      <motion.div 
        className="text-sm text-gray-600 space-y-1 p-4 bg-gray-50 rounded-lg border border-gray-200"
        variants={itemVariants}
      >
        <div className="font-medium">
          {config.mode === 'time' ? `${config.timeLimit}s` : `${config.wordCount} words`} • 
          english • {config.includePunctuation ? 'punctuation' : 'no punctuation'} •
          {config.includeNumbers ? ' numbers' : ' no numbers'}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div 
        className="flex justify-center space-x-4"
        variants={itemVariants}
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={resetTest}
            className="bg-blue-600 text-white hover:bg-blue-700 shadow-sm font-medium"
            size="lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-medium"
            size="lg"
          >
            <Share className="w-5 h-5 mr-2" />
            Share
          </Button>
        </motion.div>
      </motion.div>

      {/* Quick restart hint */}
      <motion.div 
        className="text-xs text-gray-500"
        variants={itemVariants}
      >
        Press <kbd className="px-2 py-1 bg-gray-100 rounded-lg text-xs font-mono border border-gray-200">Tab</kbd> to quickly restart
      </motion.div>
    </motion.div>
  )
}