import { Router } from 'express'
import User from '../models/user'

const userRouter = Router()

userRouter.post('/users', (req, res) => {
  try {
    throw new Error()
  } catch (error) {
    res.status(404).send()
  }
})

export default userRouter
