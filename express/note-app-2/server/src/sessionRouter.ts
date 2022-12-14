import express, { Request, Response, NextFunction } from 'express'
import session from 'express-session'
import { body, check, validationResult } from 'express-validator'
import { config } from 'dotenv'
import bcrypt from 'bcryptjs'
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
  if (!req.session.userId) return next('route')

  const user = await User.findById(req.session.userId).select('_id')
  if (!user?.id) return next('route')

  return next()
}

router.get('/notes', isAuthenticated, notesController.userNotes)
router.get('/notes', (req: Request, res: Response) => {
  res.status(403).send('Must be logedin')
})

router.post(
  '/notes',
  isAuthenticated,
  check('title').trim().escape(),
  check('body').trim().escape(),
  check('tags.*').trim().escape(),
  notesController.save
)
router.post('/notes', (req: Request, res: Response) => {
  res.status(403).send('Must be logedin')
})
router.delete(
  '/notes',
  isAuthenticated,
  check('noteId').isString(),
  notesController.delete
)
router.delete('/notes', (req: Request, res: Response) => {
  res.status(403).send('Must be logedin')
})

router.get('/notes/:noteId', isAuthenticated, notesController.note)
router.get('/notes/:noteId', (req: Request, res: Response) => {
  res.status(403).send('Must be logedin')
})
router.post(
  '/notes/:noteId',
  isAuthenticated,
  check('title').trim().escape(),
  check('body').trim().escape(),
  check('tags.*').trim().escape(),
  notesController.update
)
router.post('/notes/:noteId', (req: Request, res: Response) => {
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

    let isPasswordOK = false
    try {
      isPasswordOK = await bcrypt.compare(password, user.password!)
    } catch (error) {
      return next(error)
    }

    if (isPasswordOK) {
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

router.post(
  '/register',
  body('username').isString().isLength({ min: 5 }),
  body('password').isLength({ min: 5 }),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({
        message: 'Username and password must be 5 charachter long or more.',
      })
    }

    const { username, password } = req.body
    const userFromDB = await User.findOne({ userName: username }).exec()
    if (userFromDB)
      return res.status(406).send({ message: 'Username already exist' })

    try {
      const hashPassword = await bcrypt.hash(password, 8)
      const user = await User.create({
        userName: username,
        password: hashPassword,
      })

      req.session.regenerate(function (err) {
        if (err) next(err)
        req.session.userId = user.id
        req.session.save(function (err) {
          if (err) return next(err)
          res.status(302).end()
        })
      })
    } catch {
      return res.status(500).end()
    }
  }
)
