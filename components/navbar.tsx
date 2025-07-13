'use client'

import React from 'react'
import Link from 'next/link'
import { Settings, BarChart3, Keyboard, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="border-b border-mt-sub/20 bg-mt-bg/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Keyboard className="h-6 w-6 text-mt-main" />
            <span className="text-xl font-bold text-mt-main">monkeytype</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-mt-sub hover:text-mt-text hover:bg-mt-sub/10"
              asChild
            >
              <Link href="/stats">
                <BarChart3 className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">stats</span>
              </Link>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-mt-sub hover:text-mt-text hover:bg-mt-sub/10"
            >
              <Settings className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">settings</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-mt-sub hover:text-mt-text hover:bg-mt-sub/10"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}