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

userRouter.post('/notes/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()

    res.send({ user, token })
  } catch (error) {
    res.status(404).send()
  }
})

export default userRouter
