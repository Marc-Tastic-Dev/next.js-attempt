import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
    }
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        username: { label: 'Username', type: 'text' },
        isSignUp: { label: 'Is Sign Up', type: 'hidden' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Sign up
        if (credentials.isSignUp === 'true') {
          const existingUser = await prisma.user.findFirst({
            where: {
              OR: [
                { email: credentials.email },
                { username: credentials.username }
              ]
            }
          })

          if (existingUser) {
            throw new Error('User already exists')
          }

          const hashedPassword = await bcrypt.hash(credentials.password, 10)
          
          const user = await prisma.user.create({
            data: {
              email: credentials.email,
              username: credentials.username || credentials.email.split('@')[0],
            }
          })

          return {
            id: user.id,
            email: user.email,
            name: user.username,
          }
        }

        // Sign in
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.username,
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
}