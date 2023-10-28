import { Router } from 'express'
import User from '../models/user'

const userRouter = Router()

userRouter.post('/users', async (req, res) => {
  try {
    const user = new User(req.body)
    const token = await user.generateAuthToken()

    await user.save()
    res.status(201).send({ token, user })
  } catch (error) {
    res.status(404).send()
  }
})

userRouter.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()

    res.cookie('note_app_session', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax',
    })

    res.status(302).redirect('/')
  } catch (error) {
    res.status(404).send()
  }
})

export default userRouter
