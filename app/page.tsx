'use client'

import { TestBox } from '@/components/test-box'
import { TestConfig } from '@/components/test-config'
import { TestResults } from '@/components/test-results'
import { useTypingStore } from '@/store/typing-store'

export default function Home() {
  const { isTestCompleted } = useTypingStore()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        {!isTestCompleted ? (
          <>
            <TestConfig />
            <TestBox />
          </>
        ) : (
          <TestResults />
        )}
      </div>
    </div>
  )
}