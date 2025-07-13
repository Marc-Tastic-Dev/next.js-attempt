# Monkeytype Clone

A beautiful, fast, and accurate typing test application built with Next.js 13+, TypeScript, TailwindCSS, and GSAP animations.

## Features

🚀 **Core Features:**
- Real-time typing test with WPM, accuracy, and speed tracking
- Smooth GSAP-powered caret animations
- Character-level typing feedback with visual highlights
- Multiple test modes: Time-based (15s, 30s, 60s, 120s) and Word-based (10, 25, 50, 100 words)
- Beautiful Monkeytype-inspired UI with multiple themes

⚙️ **Technical Features:**
- Built with Next.js 13+ App Router
- TypeScript for type safety
- TailwindCSS for styling
- Zustand for state management
- GSAP for smooth animations
- shadcn/ui for beautiful components
- Persistent settings with localStorage

🎨 **Themes:**
- Serika (default)
- Coral
- Blueberry
- Light/Dark mode support

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd monkeytype-clone
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Keyboard Shortcuts
- **Tab**: Restart test
- **Esc**: Reset test
- **Click or start typing**: Focus the typing area

### Test Configuration
1. Select test mode: Time or Words
2. Choose duration (time mode) or word count (words mode)
3. Start typing to begin the test
4. View real-time stats: WPM, accuracy, and remaining time/words

### Features
- **Real-time feedback**: See correct/incorrect characters as you type
- **Smooth animations**: GSAP-powered caret movement and transitions
- **Detailed results**: Complete statistics after test completion
- **Theme switching**: Multiple beautiful color schemes
- **Responsive design**: Works perfectly on desktop and mobile

## Technology Stack

- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Animations**: GSAP
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Fonts**: JetBrains Mono

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and theme variables
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Main typing test page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── navbar.tsx        # Navigation bar
│   ├── test-box.tsx      # Main typing test container
│   ├── test-config.tsx   # Test configuration controls
│   ├── test-results.tsx  # Results display after test
│   ├── typing-caret.tsx  # Animated typing caret
│   ├── word-display.tsx  # Word rendering with highlights
│   └── stats-display.tsx # Real-time statistics
├── lib/                  # Utility functions
│   └── utils.ts          # Class name utilities
├── store/                # State management
│   └── typing-store.ts   # Zustand store for typing state
└── public/               # Static assets
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

This project is for educational purposes. Inspired by [Monkeytype](https://monkeytype.com/).

## Acknowledgments

- [Monkeytype](https://monkeytype.com/) for the original inspiration
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [GSAP](https://gsap.com/) for smooth animations