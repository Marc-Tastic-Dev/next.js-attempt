'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Settings, BarChart3, Keyboard, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'

export function Navbar() {
  const { data: session, status } = useSession()

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Keyboard className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">TypeSpeed</span>
          </Link>

          <nav className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            ) : session ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                    <BarChart3 className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Button>
                </Link>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{session.user.name || session.user.email}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="flex items-center space-x-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </motion.header>
  )
}