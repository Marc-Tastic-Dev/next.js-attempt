'use client'

import React from 'react'
import { RotateCcw, Share, Trophy, Target, Clock, AlertCircle } from 'lucide-react'
import { useTypingStore } from '@/store/typing-store'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function TestResults() {
  const { stats, config, resetTest } = useTypingStore()

  const formatAccuracy = (accuracy: number) => {
    return `${accuracy.toFixed(1)}%`
  }

  const getGrade = (wpm: number, accuracy: number) => {
    if (accuracy < 90) return { grade: 'F', color: 'text-red-400', icon: AlertCircle }
    if (wpm < 20) return { grade: 'D', color: 'text-orange-400', icon: AlertCircle }
    if (wpm < 40) return { grade: 'C', color: 'text-yellow-400', icon: Target }
    if (wpm < 60) return { grade: 'B', color: 'text-blue-400', icon: Target }
    if (wpm < 80) return { grade: 'A', color: 'text-green-400', icon: Trophy }
    return { grade: 'S', color: 'text-mt-main', icon: Trophy }
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
          className="text-7xl font-bold text-mt-main"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        >
          {stats.wpm}
        </motion.div>
        <div className="text-xl text-mt-sub font-medium">words per minute</div>
      </motion.div>

      {/* Detailed Stats */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
        variants={itemVariants}
      >
        <motion.div 
          className="space-y-3 p-4 bg-mt-bg/50 rounded-xl border border-mt-sub/10"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Target className="w-6 h-6 text-green-400 mx-auto" />
          <div className="text-2xl font-semibold text-mt-text">{formatAccuracy(stats.accuracy)}</div>
          <div className="text-sm text-mt-sub font-medium">accuracy</div>
        </motion.div>
        
        <motion.div 
          className="space-y-3 p-4 bg-mt-bg/50 rounded-xl border border-mt-sub/10"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Clock className="w-6 h-6 text-blue-400 mx-auto" />
          <div className="text-2xl font-semibold text-mt-text">{stats.time}s</div>
          <div className="text-sm text-mt-sub font-medium">time</div>
        </motion.div>
        
        <motion.div 
          className="space-y-3 p-4 bg-mt-bg/50 rounded-xl border border-mt-sub/10"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <AlertCircle className="w-6 h-6 text-red-400 mx-auto" />
          <div className="text-2xl font-semibold text-mt-text">{stats.errors}</div>
          <div className="text-sm text-mt-sub font-medium">errors</div>
        </motion.div>
        
        <motion.div 
          className="space-y-3 p-4 bg-mt-bg/50 rounded-xl border border-mt-sub/10"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <GradeIcon className={`w-6 h-6 ${color} mx-auto`} />
          <div className={`text-2xl font-semibold ${color}`}>{grade}</div>
          <div className="text-sm text-mt-sub font-medium">grade</div>
        </motion.div>
      </motion.div>

      {/* Test Configuration */}
      <motion.div 
        className="text-sm text-mt-sub space-y-1 p-4 bg-mt-bg/30 rounded-lg border border-mt-sub/10"
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
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={resetTest}
            className="bg-mt-main text-mt-bg hover:bg-mt-main/90 shadow-lg shadow-mt-main/25 font-medium"
            size="lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            className="border-mt-sub text-mt-sub hover:bg-mt-sub/10 hover:text-mt-text font-medium"
            size="lg"
          >
            <Share className="w-5 h-5 mr-2" />
            Share
          </Button>
        </motion.div>
      </motion.div>

      {/* Quick restart hint */}
      <motion.div 
        className="text-xs text-mt-sub"
        variants={itemVariants}
      >
        Press <kbd className="px-2 py-1 bg-mt-sub/20 rounded-lg text-xs font-mono border border-mt-sub/30">Tab</kbd> to quickly restart
      </motion.div>
    </motion.div>
  )
}