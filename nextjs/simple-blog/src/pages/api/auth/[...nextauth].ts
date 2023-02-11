import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'
import { getUserByUsername } from '@/lib/usersModel'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string
          password: string
        }

        if (typeof username !== 'string' || typeof password !== 'string') {
          throw new Error('Wrong input data.')
        }
        const user = await getUserByUsername(username)
        if (!user) throw new Error('User not exist yet')

        const matchPassword = await bcrypt.compare(password, user.password)
        if (matchPassword)
          return {
            id: uuidv4(),
            name: username,
          }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
})
