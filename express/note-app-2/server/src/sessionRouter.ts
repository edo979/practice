import express, { Request, Response, NextFunction } from 'express'
import session from 'express-session'
import { check } from 'express-validator'
import { config } from 'dotenv'
import User from './model/User'
import { notesController } from './controllers/notesController'

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

async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session.userId) next('route')

  const user = await User.findById(req.session.userId).select('_id')
  if (!user?.id) next('route')

  next()
}

router.get('/notes', isAuthenticated, notesController.userNotes)

router.get('/notes', (req: Request, res: Response) => {
  res.status(403).send('Must be logedin')
})

router.post(
  '/login',
  check('username').trim().escape(),
  check('password').escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body

    if (
      typeof username !== 'string' ||
      username === '' ||
      typeof password !== 'string' ||
      password === ''
    )
      return res.status(401).send({ errorMessage: 'Data form is wrong' })

    const user = await User.findOne({ userName: username }).exec()
    if (!user) return res.status(403).send({ errorMessage: 'User not found' })

    if (user.password === password) {
      req.session.regenerate(function (err) {
        if (err) next(err)
        req.session.userId = user.id
        req.session.save(function (err) {
          if (err) return next(err)
          res.status(302).end()
        })
      })
    } else {
      res.status(401).send({ errorMessage: 'Username and password dont match' })
    }
  }
)
