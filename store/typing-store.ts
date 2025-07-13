import { create } from 'zustand'

interface TypingConfig {
  mode: 'time' | 'words'
  timeLimit: number
  wordCount: number
  includePunctuation: boolean
  includeNumbers: boolean
}

interface TypingStats {
  wpm: number
  accuracy: number
  time: number
  errors: number
}

interface TypingState {
  words: string[]
  input: string
  currentWordIndex: number
  currentCharIndex: number
  isTestActive: boolean
  isTestCompleted: boolean
  startTime: number | null
  config: TypingConfig
  stats: TypingStats
  
  // Actions
  generateWords: () => void
  updateInput: (value: string) => void
  resetTest: () => void
  setConfig: (config: Partial<TypingConfig>) => void
  updateStats: () => void
  togglePunctuation: () => void
  toggleNumbers: () => void
}

const commonWords = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
  'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us'
]

const punctuationMarks = [',', '.', '!', '?', ';', ':', '"', "'", '(', ')', '-', '—']
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export const useTypingStore = create<TypingState>((set, get) => ({
  words: [],
  input: '',
  currentWordIndex: 0,
  currentCharIndex: 0,
  isTestActive: false,
  isTestCompleted: false,
  startTime: null,
  config: {
    mode: 'time',
    timeLimit: 30,
    wordCount: 25,
    includePunctuation: false,
    includeNumbers: false
  },
  stats: {
    wpm: 0,
    accuracy: 100,
    time: 0,
    errors: 0
  },

  generateWords: () => {
    const { config } = get()
    const wordCount = config.mode === 'time' ? 50 : config.wordCount
    const words: string[] = []
    
    for (let i = 0; i < wordCount; i++) {
      let word = commonWords[Math.floor(Math.random() * commonWords.length)]
      
      // Add punctuation if enabled
      if (config.includePunctuation && Math.random() < 0.3) {
        const punctuation = punctuationMarks[Math.floor(Math.random() * punctuationMarks.length)]
        word += punctuation
      }
      
      // Add numbers if enabled
      if (config.includeNumbers && Math.random() < 0.2) {
        const number = numbers[Math.floor(Math.random() * numbers.length)]
        if (Math.random() < 0.5) {
          word = number + word // number at start
        } else {
          word += number // number at end
        }
      }
      
      words.push(word)
    }
    
    set({ words })
  },

  updateInput: (value: string) => {
    const { words, config } = get()
    const currentWord = words[get().currentWordIndex] || ''
    
    set({ input: value })
    
    // Start test if not already started
    if (!get().isTestActive && value.length > 0) {
      set({ 
        isTestActive: true, 
        startTime: Date.now() 
      })
    }
    
    // Calculate current word and character indices
    let charCount = 0
    let wordIndex = 0
    let charIndex = 0
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i]
      if (charCount + word.length + (i < words.length - 1 ? 1 : 0) >= value.length) {
        wordIndex = i
        charIndex = value.length - charCount
        break
      }
      charCount += word.length + (i < words.length - 1 ? 1 : 0)
    }
    
    set({ 
      currentWordIndex: wordIndex,
      currentCharIndex: charIndex
    })
    
    // Check if test is completed
    if (config.mode === 'time') {
      const elapsed = Date.now() - (get().startTime || 0)
      if (elapsed >= config.timeLimit * 1000) {
        set({ isTestCompleted: true, isTestActive: false })
        get().updateStats()
      }
    } else {
      if (wordIndex >= words.length - 1 && charIndex >= currentWord.length) {
        set({ isTestCompleted: true, isTestActive: false })
        get().updateStats()
      }
    }
  },

  resetTest: () => {
    set({
      input: '',
      currentWordIndex: 0,
      currentCharIndex: 0,
      isTestActive: false,
      isTestCompleted: false,
      startTime: null,
      stats: {
        wpm: 0,
        accuracy: 100,
        time: 0,
        errors: 0
      }
    })
    get().generateWords()
  },

  setConfig: (newConfig: Partial<TypingConfig>) => {
    set(state => ({
      config: { ...state.config, ...newConfig }
    }))
  },

  updateStats: () => {
    const { input, words, startTime, config } = get()
    if (!startTime) return
    
    const endTime = Date.now()
    const timeElapsed = (endTime - startTime) / 1000
    const timeInMinutes = timeElapsed / 60
    
    // Calculate words typed
    const wordsTyped = input.trim().split(/\s+/).length
    const wpm = timeInMinutes > 0 ? Math.round(wordsTyped / timeInMinutes) : 0
    
    // Calculate accuracy
    let correctChars = 0
    let totalChars = 0
    let errors = 0
    
    const inputChars = input.split('')
    let charIndex = 0
    
    for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
      const word = words[wordIndex]
      for (let i = 0; i < word.length; i++) {
        if (charIndex < inputChars.length) {
          if (inputChars[charIndex] === word[i]) {
            correctChars++
          } else {
            errors++
          }
          charIndex++
        }
        totalChars++
      }
      // Account for space between words
      if (wordIndex < words.length - 1 && charIndex < inputChars.length) {
        if (inputChars[charIndex] === ' ') {
          correctChars++
        } else {
          errors++
        }
        charIndex++
        totalChars++
      }
    }
    
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100
    
    set({
      stats: {
        wpm,
        accuracy,
        time: Math.round(timeElapsed),
        errors
      }
    })
  },

  togglePunctuation: () => {
    set(state => ({
      config: {
        ...state.config,
        includePunctuation: !state.config.includePunctuation
      }
    }))
    get().resetTest()
  },

  toggleNumbers: () => {
    set(state => ({
      config: {
        ...state.config,
        includeNumbers: !state.config.includeNumbers
      }
    }))
    get().resetTest()
  }
}))