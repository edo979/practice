import express from 'express'
import noteRouter from './routers/noteRouter'
import './db/mongoose'

const app = express()
app.use(express.json())
app.use(noteRouter)

export default app
