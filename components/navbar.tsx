'use client'

import React from 'react'
import Link from 'next/link'
import { Settings, BarChart3, Keyboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <Keyboard className="h-8 w-8 text-blue-600" />
                <motion.div
                  className="absolute inset-0 bg-blue-100 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                monkeytype
              </span>
            </Link>
          </motion.div>
          
          <div className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                asChild
              >
                <Link href="/stats">
                  <BarChart3 className="h-4 w-4" />
                  <span className="ml-2 hidden sm:inline font-medium">stats</span>
                </Link>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline font-medium">settings</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}