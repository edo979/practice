import express, { Request, Response } from 'express'
import { config } from 'dotenv'

config()
const PORT = process.env.PORT || 5000
const app = express()

// Index
app.get('/', (req: Request, res: Response) => {
  res.send('Index note')
})

// Show notes
app.get('/notes', (req: Request, res: Response) => {
  res.send('View notes')
})

// Add note
app.post('/notes', (req: Request, res: Response) => {
  res.send('Add note')
})

app.listen(PORT, () => console.log(`Server listenint on port: ${PORT}`))
