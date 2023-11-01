import { Response, Router } from 'express'
import User from '../models/user'
import auth, { AuthRequest } from '../middleware/auth'

const userRouter = Router()
const COOKIE_NAME = 'note_app_session'

userRouter.post('/users', async (req, res) => {
  try {
    const user = new User(req.body)
    const token = await user.generateAuthToken()

    saveToCookie(res, token)

    await user.save()
    res.status(201).send({ user, token })
  } catch (error) {
    res.status(404).send()
  }
})

userRouter.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()

    saveToCookie(res, token)

    res.send({ user, token })
  } catch (error) {
    res.status(404).send()
  }
})

userRouter.get('/users/logout', auth, async (req: AuthRequest, res) => {
  try {
    if (!req.user) return res.status(401).send()

    req.user.tokens = req.user?.tokens.filter(
      (token) => token.token !== req.token
    )

    res.clearCookie(COOKIE_NAME)

    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

userRouter.get('/users/logoutAll', auth, async (req: AuthRequest, res) => {
  try {
    if (!req.user) return res.status(401).send()

    req.user.tokens = []
    res.clearCookie(COOKIE_NAME)
    await req.user.save()

    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

// Warning modified response object!
const saveToCookie = (res: Response, token: string) => {
  res.cookie(COOKIE_NAME, token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
  })
}

export default userRouter
