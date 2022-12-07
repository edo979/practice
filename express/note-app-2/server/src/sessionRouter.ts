import express, { Request, Response, NextFunction } from 'express'
import session from 'express-session'
import { check } from 'express-validator'
import { config } from 'dotenv'
import User from './model/User'

config()

declare module 'express-session' {
  interface SessionData {
    userId: string
  }
}

export const router = express.Router()

router.use(
  session({
    secret: process.env.SECRET_STRING || 'jah jah',
    resave: false,
    saveUninitialized: true,
    name: 'my-session',
  })
)

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session.userId) next()
  else next('route')
}

router.get('/', isAuthenticated, (req: Request, res: Response) => {
  res.send('Hello' + req.session.userId)
})

router.post(
  '/login',
  check('username').trim().escape(),
  check('password').escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password }: { username: string; password: string } =
      req.body

    if (username === '' || password === '')
      return res
        .status(406)
        .json({ message: 'User and password must be filed up' })

    const user = await User.findOne({ userName: username })
    if (!user) return res.status(404).json({ message: 'That user not found' })

    if (user.password === password) {
      req.session.regenerate(function (err) {
        if (err) next(err)
        req.session.userId = user.id
        req.session.save(function (err) {
          if (err) return next(err)
          return res.json({ message: 'success' })
        })
      })
    } else {
      return res
        .status(404)
        .json({ message: 'Username and password dont match' })
    }
  }
)
