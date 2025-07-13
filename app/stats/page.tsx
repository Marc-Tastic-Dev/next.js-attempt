'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, Target, Clock, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatsChart } from '@/components/stats-chart'

export default function StatsPage() {
  // Mock data for demonstration
  const mockStats = {
    averageWpm: 68,
    bestWpm: 84,
    averageAccuracy: 96.2,
    testsCompleted: 47,
    timeTyping: '2h 34m',
    totalWords: 3420,
  }

  const mockRecentTests = [
    { date: '2024-01-15', wpm: 72, accuracy: 97.1, mode: '30s' },
    { date: '2024-01-15', wpm: 68, accuracy: 95.8, mode: '60s' },
    { date: '2024-01-14', wpm: 84, accuracy: 98.2, mode: '30s' },
    { date: '2024-01-14', wpm: 65, accuracy: 94.5, mode: '120s' },
    { date: '2024-01-13', wpm: 70, accuracy: 96.8, mode: '30s' },
  ]

  const borderStyle = { borderColor: 'rgba(100, 102, 105, 0.2)' }
  const borderStyleLight = { borderColor: 'rgba(100, 102, 105, 0.1)' }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="text-mt-sub hover:text-mt-text">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Test
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-mt-text">Statistics</h1>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-mt-bg border rounded-lg p-4 text-center" style={borderStyle}>
          <TrendingUp className="w-6 h-6 text-mt-main mx-auto mb-2" />
          <div className="text-2xl font-bold text-mt-text">{mockStats.averageWpm}</div>
          <div className="text-sm text-mt-sub">avg wpm</div>
        </div>
        
        <div className="bg-mt-bg border rounded-lg p-4 text-center" style={borderStyle}>
          <Zap className="w-6 h-6 text-mt-main mx-auto mb-2" />
          <div className="text-2xl font-bold text-mt-text">{mockStats.bestWpm}</div>
          <div className="text-sm text-mt-sub">best wpm</div>
        </div>
        
        <div className="bg-mt-bg border rounded-lg p-4 text-center" style={borderStyle}>
          <Target className="w-6 h-6 text-mt-main mx-auto mb-2" />
          <div className="text-2xl font-bold text-mt-text">{mockStats.averageAccuracy}%</div>
          <div className="text-sm text-mt-sub">avg accuracy</div>
        </div>
        
        <div className="bg-mt-bg border rounded-lg p-4 text-center" style={borderStyle}>
          <Clock className="w-6 h-6 text-mt-main mx-auto mb-2" />
          <div className="text-2xl font-bold text-mt-text">{mockStats.testsCompleted}</div>
          <div className="text-sm text-mt-sub">tests completed</div>
        </div>
        
        <div className="bg-mt-bg border rounded-lg p-4 text-center" style={borderStyle}>
          <div className="text-2xl font-bold text-mt-text">{mockStats.timeTyping}</div>
          <div className="text-sm text-mt-sub">time typing</div>
        </div>
        
        <div className="bg-mt-bg border rounded-lg p-4 text-center" style={borderStyle}>
          <div className="text-2xl font-bold text-mt-text">{mockStats.totalWords}</div>
          <div className="text-sm text-mt-sub">words typed</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-mt-bg border rounded-lg p-6" style={borderStyle}>
          <h2 className="text-xl font-semibold text-mt-text mb-4">WPM Over Time</h2>
          <StatsChart type="wpm" />
        </div>
        
        <div className="bg-mt-bg border rounded-lg p-6" style={borderStyle}>
          <h2 className="text-xl font-semibold text-mt-text mb-4">Accuracy Over Time</h2>
          <StatsChart type="accuracy" />
        </div>
      </div>

      {/* Recent Tests */}
      <div className="bg-mt-bg border rounded-lg p-6" style={borderStyle}>
        <h2 className="text-xl font-semibold text-mt-text mb-4">Recent Tests</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={borderStyle}>
                <th className="text-left py-2 text-mt-sub">Date</th>
                <th className="text-left py-2 text-mt-sub">WPM</th>
                <th className="text-left py-2 text-mt-sub">Accuracy</th>
                <th className="text-left py-2 text-mt-sub">Mode</th>
              </tr>
            </thead>
            <tbody>
              {mockRecentTests.map((test, index) => (
                <tr key={index} className="border-b" style={borderStyleLight}>
                  <td className="py-3 text-mt-text">{test.date}</td>
                  <td className="py-3 text-mt-text font-semibold">{test.wpm}</td>
                  <td className="py-3 text-mt-text">{test.accuracy}%</td>
                  <td className="py-3 text-mt-sub">{test.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Personal Bests */}
      <div className="bg-mt-bg border rounded-lg p-6" style={borderStyle}>
        <h2 className="text-xl font-semibold text-mt-text mb-4">Personal Bests</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-mt-main">84</div>
            <div className="text-sm text-mt-sub">30 seconds</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-mt-main">76</div>
            <div className="text-sm text-mt-sub">60 seconds</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-mt-main">68</div>
            <div className="text-sm text-mt-sub">120 seconds</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-mt-main">72</div>
            <div className="text-sm text-mt-sub">50 words</div>
          </div>
        </div>
      </div>
    </div>
  )
}