import { Router } from 'express'

const noteRouter = Router()

noteRouter.get('/notes', (req, res) => {
  res.send('Welcome!')
})

export default noteRouter
