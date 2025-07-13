import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface TypingStats {
  wpm: number
  accuracy: number
  time: number
  errors: number
  correctChars: number
  totalChars: number
}

export interface TestConfig {
  mode: 'time' | 'words'
  timeLimit: number // in seconds
  wordCount: number
  includeNumbers: boolean
  includePunctuation: boolean
  language: string
}

export interface TypingState {
  // Test configuration
  config: TestConfig
  
  // Test state
  isTestActive: boolean
  isTestCompleted: boolean
  startTime: number | null
  currentWordIndex: number
  currentCharIndex: number
  input: string
  words: string[]
  
  // Real-time stats
  stats: TypingStats
  
  // Character tracking
  typedChars: { char: string; isCorrect: boolean; isExtra?: boolean }[]
  
  // Settings
  soundEnabled: boolean
  theme: string
  
  // Actions
  setConfig: (config: Partial<TestConfig>) => void
  startTest: () => void
  resetTest: () => void
  completeTest: () => void
  updateInput: (input: string) => void
  updateStats: () => void
  generateWords: () => void
  toggleSound: () => void
  setTheme: (theme: string) => void
}

const defaultConfig: TestConfig = {
  mode: 'time',
  timeLimit: 30,
  wordCount: 50,
  includeNumbers: false,
  includePunctuation: false,
  language: 'english',
}

const defaultStats: TypingStats = {
  wpm: 0,
  accuracy: 100,
  time: 0,
  errors: 0,
  correctChars: 0,
  totalChars: 0,
}

// Common English words for typing test
const commonWords = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
  'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
  'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
  'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us'
]

export const useTypingStore = create<TypingState>()(
  persist(
    (set, get) => ({
      config: defaultConfig,
      isTestActive: false,
      isTestCompleted: false,
      startTime: null,
      currentWordIndex: 0,
      currentCharIndex: 0,
      input: '',
      words: [],
      stats: defaultStats,
      typedChars: [],
      soundEnabled: false,
      theme: 'serika',

      setConfig: (newConfig) =>
        set((state) => ({
          config: { ...state.config, ...newConfig },
        })),

      startTest: () => {
        const state = get()
        if (!state.isTestActive) {
          set({
            isTestActive: true,
            isTestCompleted: false,
            startTime: Date.now(),
            stats: defaultStats,
          })
        }
      },

      resetTest: () => {
        get().generateWords()
        set({
          isTestActive: false,
          isTestCompleted: false,
          startTime: null,
          currentWordIndex: 0,
          currentCharIndex: 0,
          input: '',
          stats: defaultStats,
          typedChars: [],
        })
      },

      completeTest: () => {
        set({
          isTestActive: false,
          isTestCompleted: true,
        })
        get().updateStats()
      },

      updateInput: (input) => {
        const state = get()
        
        if (!state.isTestActive && input.length > 0) {
          get().startTest()
        }

        set({ input })
        get().updateStats()

        // Check if test should be completed
        const words = state.words.join(' ')
        if (input.length >= words.length || 
            (state.config.mode === 'words' && state.currentWordIndex >= state.config.wordCount)) {
          get().completeTest()
        }
      },

      updateStats: () => {
        const state = get()
        const { input, words, startTime, config } = state
        
        if (!startTime) return

        const currentTime = Date.now()
        const elapsedSeconds = (currentTime - startTime) / 1000
        const text = words.join(' ')
        
        let correctChars = 0
        let errors = 0
        
        for (let i = 0; i < input.length; i++) {
          if (i < text.length && input[i] === text[i]) {
            correctChars++
          } else {
            errors++
          }
        }
        
        const accuracy = input.length > 0 ? (correctChars / input.length) * 100 : 100
        const wpm = elapsedSeconds > 0 ? (correctChars / 5) / (elapsedSeconds / 60) : 0
        
        set({
          stats: {
            wpm: Math.round(wpm),
            accuracy: Math.round(accuracy),
            time: Math.round(elapsedSeconds),
            errors,
            correctChars,
            totalChars: input.length,
          },
        })

        // Complete test if time limit reached
        if (config.mode === 'time' && elapsedSeconds >= config.timeLimit) {
          get().completeTest()
        }
      },

      generateWords: () => {
        const state = get()
        const { config } = state
        
        let wordCount = config.mode === 'words' ? config.wordCount : 200
        const words: string[] = []
        
        for (let i = 0; i < wordCount; i++) {
          const randomWord = commonWords[Math.floor(Math.random() * commonWords.length)]
          words.push(randomWord)
        }
        
        set({ words })
      },

      toggleSound: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),

      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'typing-settings',
      partialize: (state) => ({
        config: state.config,
        soundEnabled: state.soundEnabled,
        theme: state.theme,
      }),
    }
  )
)