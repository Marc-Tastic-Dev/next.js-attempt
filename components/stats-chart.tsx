'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

interface StatsChartProps {
  type: 'wpm' | 'accuracy'
}

export function StatsChart({ type }: StatsChartProps) {
  // Mock data for demonstration
  const mockWpmData = [
    { date: '1/10', value: 45 },
    { date: '1/11', value: 52 },
    { date: '1/12', value: 48 },
    { date: '1/13', value: 58 },
    { date: '1/14', value: 65 },
    { date: '1/15', value: 72 },
    { date: '1/16', value: 68 },
    { date: '1/17', value: 74 },
    { date: '1/18', value: 69 },
    { date: '1/19', value: 76 },
    { date: '1/20', value: 84 },
  ]

  const mockAccuracyData = [
    { date: '1/10', value: 92.5 },
    { date: '1/11', value: 94.2 },
    { date: '1/12', value: 91.8 },
    { date: '1/13', value: 95.6 },
    { date: '1/14', value: 96.1 },
    { date: '1/15', value: 97.3 },
    { date: '1/16', value: 95.8 },
    { date: '1/17', value: 98.1 },
    { date: '1/18', value: 96.9 },
    { date: '1/19', value: 97.8 },
    { date: '1/20', value: 98.2 },
  ]

  const data = type === 'wpm' ? mockWpmData : mockAccuracyData
  const color = '#e2b714' // mt-main color

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-mt-bg border border-mt-sub/20 rounded-lg p-3 shadow-lg">
          <p className="text-mt-sub text-sm">{label}</p>
          <p className="text-mt-text font-semibold">
            {type === 'wpm' ? `${payload[0].value} WPM` : `${payload[0].value}% Accuracy`}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#646669', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#646669', fontSize: 12 }}
            domain={type === 'wpm' ? ['dataMin - 5', 'dataMax + 5'] : [85, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}