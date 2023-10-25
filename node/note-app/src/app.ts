import express from 'express'
import noteRouter from './routers/noteRouter'
import userRouter from './routers/userRoutes'
import './db/mongoose'

const app = express()
app.use(express.json())
app.use(noteRouter)
app.use(userRouter)

export default app
