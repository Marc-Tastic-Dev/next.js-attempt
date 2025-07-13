'use client'

import React from 'react'
import Link from 'next/link'
import { Settings, BarChart3, Keyboard, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-b border-mt-sub/20 bg-mt-bg/95 backdrop-blur-sm sticky top-0 z-50"
      style={{ backgroundColor: 'rgba(44, 46, 52, 0.95)' }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <Keyboard className="h-8 w-8 text-mt-main" />
                <motion.div
                  className="absolute inset-0 bg-mt-main/20 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-2xl font-bold text-mt-main tracking-tight">
                monkeytype
              </span>
            </Link>
          </motion.div>
          
          <div className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                className="text-mt-sub hover:text-mt-text transition-colors"
                style={{ '--tw-bg-opacity': '0.1' } as React.CSSProperties}
                asChild
              >
                <Link href="/stats">
                  <BarChart3 className="h-4 w-4" />
                  <span className="ml-2 hidden sm:inline font-medium">stats</span>
                </Link>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                className="text-mt-sub hover:text-mt-text transition-colors"
                style={{ '--tw-bg-opacity': '0.1' } as React.CSSProperties}
              >
                <Settings className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline font-medium">settings</span>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="text-mt-sub hover:text-mt-text transition-colors"
                style={{ '--tw-bg-opacity': '0.1' } as React.CSSProperties}
              >
                <motion.div
                  animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}