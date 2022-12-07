import express, { Request, Response, NextFunction } from 'express'
import session from 'express-session'
import User from './model/User'

declare module 'express-session' {
  interface SessionData {
    userId: string
  }
}

export const router = express.Router()
router.use(
  session({
    secret: 'keyboard cat',
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
  express.urlencoded({ extended: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password }: { username: string; password: string } =
      req.body

    if (username === '' || password === '')
      return res.send('User and password must be filed up')

    const user = await User.findOne({ username })
    if (!user) return res.send('That user not found')

    if (user.password === password) {
      req.session.regenerate(function (err) {
        if (err) next(err)
        req.session.userId = user.id
        req.session.save(function (err) {
          if (err) return next(err)
          res.json({ userId: 'success' })
        })
      })
    } else {
      return res
        .status(400)
        .json({ message: 'Username and password dont match' })
    }
  }
)
