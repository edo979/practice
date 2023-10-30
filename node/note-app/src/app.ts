import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import noteRouter from './routers/noteRouter'
import userRouter from './routers/userRoutes'
import './db/mongoose'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')))
app.use(cookieParser())
app.use(noteRouter)
app.use(userRouter)

export default app
