'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Save, Moon, Sun, User, Mail } from 'lucide-react'

export default function Settings() {
  const { data: session, status } = useSession()
  const { theme, setTheme } = useTheme()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (session?.user) {
      setUsername(session.user.name || '')
      setEmail(session.user.email || '')
    }
  }, [session])

  const handleSave = async () => {
    setIsLoading(true)
    setMessage('')

    try {
      // In a real implementation, you would call an API to update user settings
      // For now, we'll just show a success message
      setTimeout(() => {
        setMessage('Settings saved successfully!')
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      setMessage('Failed to save settings')
      setIsLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Please sign in to access settings
        </h1>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>

        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mb-6 p-4 rounded-md ${
              message.includes('success')
                ? 'bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400'
                : 'bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400'
            }`}
          >
            {message}
          </motion.div>
        )}

        <div className="space-y-8">
          {/* Profile Settings */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Profile</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="inline h-4 w-4 mr-2" />
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </section>

          {/* Theme Settings */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Theme
                </label>
                <div className="flex space-x-2">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('light')}
                    className="flex items-center space-x-2"
                  >
                    <Sun className="h-4 w-4" />
                    <span>Light</span>
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('dark')}
                    className="flex items-center space-x-2"
                  >
                    <Moon className="h-4 w-4" />
                    <span>Dark</span>
                  </Button>
                  <Button
                    variant={theme === 'system' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('system')}
                  >
                    System
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Save Button */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{isLoading ? 'Saving...' : 'Save Settings'}</span>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}