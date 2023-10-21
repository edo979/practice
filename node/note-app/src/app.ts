import express from 'express'
import noteRouter from './routers/noteRouter'

const app = express()
app.use(express.json())
app.use(noteRouter)

export default app
