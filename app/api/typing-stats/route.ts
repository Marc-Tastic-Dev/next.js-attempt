import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const CreateTypingStatSchema = z.object({
  wpm: z.number().positive(),
  accuracy: z.number().min(0).max(100),
  testLength: z.number().positive(),
})

const GetTypingStatsSchema = z.object({
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  testLength: z.string().optional(),
  limit: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { wpm, accuracy, testLength } = CreateTypingStatSchema.parse(body)

    const stat = await prisma.typingStat.create({
      data: {
        userId: session.user.id,
        wpm,
        accuracy,
        testLength,
      },
    })

    return NextResponse.json(stat, { status: 201 })
  } catch (error) {
    console.error('Error creating typing stat:', error)
    return NextResponse.json(
      { error: 'Failed to create typing stat' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const params = GetTypingStatsSchema.parse({
      dateFrom: searchParams.get('dateFrom'),
      dateTo: searchParams.get('dateTo'),
      testLength: searchParams.get('testLength'),
      limit: searchParams.get('limit'),
    })

    const where: any = {
      userId: session.user.id,
    }

    if (params.dateFrom || params.dateTo) {
      where.createdAt = {}
      if (params.dateFrom) {
        where.createdAt.gte = new Date(params.dateFrom)
      }
      if (params.dateTo) {
        where.createdAt.lte = new Date(params.dateTo)
      }
    }

    if (params.testLength) {
      where.testLength = parseInt(params.testLength)
    }

    const stats = await prisma.typingStat.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: params.limit ? parseInt(params.limit) : 50,
    })

    // Calculate summary statistics
    const summary = {
      totalTests: stats.length,
      averageWpm: stats.length > 0 ? stats.reduce((sum, stat) => sum + stat.wpm, 0) / stats.length : 0,
      averageAccuracy: stats.length > 0 ? stats.reduce((sum, stat) => sum + stat.accuracy, 0) / stats.length : 0,
      bestWpm: stats.length > 0 ? Math.max(...stats.map(stat => stat.wpm)) : 0,
      bestAccuracy: stats.length > 0 ? Math.max(...stats.map(stat => stat.accuracy)) : 0,
    }

    return NextResponse.json({
      stats,
      summary,
    })
  } catch (error) {
    console.error('Error fetching typing stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch typing stats' },
      { status: 500 }
    )
  }
}