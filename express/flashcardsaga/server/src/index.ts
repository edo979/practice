import express, { Request, Response } from 'express'
import connectDB from './config/db'
import Deck from './model/Deck'
import { config } from 'dotenv'

config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
connectDB()

app.post('/decks', async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  })
  const createdDeck = await newDeck.save()

  res.json(createdDeck)
})

app.listen(PORT, () => console.log(`Server started on ${PORT}`))
