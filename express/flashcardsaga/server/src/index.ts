import express, { Request, Response } from 'express'
import cors from 'cors'
import connectDB from './config/db'
import Deck from './model/Deck'
import { config } from 'dotenv'

config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
connectDB()

app.get('/decks', async (req: Request, res: Response) => {
  const decks = await Deck.find()
  res.json(decks)
})

app.post('/decks', async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  })
  const createdDeck = await newDeck.save()

  res.json(createdDeck)
})

app.delete('/decks/:deckId', async (req: Request, res: Response) => {
  const deckId = req.params.deckId
  await Deck.findByIdAndDelete(deckId)

  res.json({ message: 'successfully delete the entry' })
})

app.listen(PORT, () => console.log(`Server started on ${PORT}`))
