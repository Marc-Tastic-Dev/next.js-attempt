# TypeSpeed - Typing Test Application

A modern, feature-rich typing test application built with Next.js, TypeScript, Prisma, and Neon PostgreSQL.

## Features

### � Core Features
- **Real-time typing test** with configurable duration (15s, 30s, 60s, 120s)
- **Live WPM and accuracy calculation**
- **Smooth animations** using motion.dev
- **Dark/Light theme support** with next-themes
- **Responsive design** with Tailwind CSS

### 🔐 Authentication
- **NextAuth.js integration** with custom credentials provider
- **User registration and login**
- **Session management** with JWT strategy
- **Protected routes** for dashboard and settings

### 📊 Dashboard & Analytics
- **Comprehensive stats dashboard** with filtering options
- **Interactive charts** showing WPM and accuracy over time
- **Filter by date range and test length**
- **Performance summary cards** (total tests, averages, personal bests)
- **Recent tests table** with detailed breakdown

### ⚙️ Settings & Customization
- **Theme toggle** (Light/Dark/System)
- **Profile management** (username, email)
- **Test configuration** (time limits, punctuation, numbers)

### 🗄️ Database & API
- **Neon PostgreSQL database** with Prisma ORM
- **Type-safe API routes** with Zod validation
- **Automatic stats saving** after each test
- **RESTful endpoints** for stats management

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Neon PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Animations**: Motion.dev
- **State Management**: Zustand
- **Charts**: Recharts
- **UI Components**: Radix UI
- **Validation**: Zod

## Database Schema

### User Model
```sql
- id: String (cuid, primary key)
- username: String (unique, optional)
- email: String (unique)
- emailVerified: DateTime (optional)
- image: String (optional)
- createdAt: DateTime (default: now)
```

### TypingStat Model
```sql
- id: String (cuid, primary key)
- userId: String (foreign key to User)
- wpm: Float (words per minute)
- accuracy: Float (percentage 0-100)
- testLength: Int (test duration in seconds)
- createdAt: DateTime (default: now)
```

## API Routes

### Authentication
- `POST /api/auth/[...nextauth]` - NextAuth.js authentication endpoint

### Typing Stats
- `POST /api/typing-stats` - Save new typing test result
- `GET /api/typing-stats` - Retrieve user's typing stats with optional filters

#### POST /api/typing-stats
```json
{
  "wpm": 75.5,
  "accuracy": 94.2,
  "testLength": 60
}
```

#### GET /api/typing-stats
Query parameters:
- `dateFrom`: Filter from date (ISO string)
- `dateTo`: Filter to date (ISO string)
- `testLength`: Filter by test duration
- `limit`: Number of results to return

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="your-neon-database-url"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Marc-Tastic-Dev/next.js-attempt.git
   cd next.js-attempt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Add your Neon database URL
   - Add your NextAuth secret

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

## Usage

### 1. Authentication
- Sign up for a new account or sign in with existing credentials
- Session is maintained across browser tabs

### 2. Taking a Test
- Configure test settings (duration, punctuation, numbers)
- Start typing when ready - test begins automatically
- View real-time WPM and accuracy feedback
- See detailed results after completion

### 3. Dashboard
- View comprehensive statistics
- Filter by date range or test length
- Analyze performance trends with interactive charts
- Track personal bests and averages

### 4. Settings
- Toggle between light and dark themes
- Update profile information
- Customize test preferences

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard page
│   ├── settings/          # Settings page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── navbar.tsx        # Navigation component
│   ├── test-box.tsx      # Main typing test component
│   └── ...
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Helper functions
├── prisma/                # Database schema
├── store/                 # Zustand stores
└── types/                 # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.