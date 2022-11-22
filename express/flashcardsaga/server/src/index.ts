import express from 'express'
import cors from 'cors'
import connectDB from './config/db'
import { config } from 'dotenv'
import { getDeckController } from './controllers/getDecksController'
import { createDeckController } from './controllers/createDeckController'
import { deleteDeckController } from './controllers/deleteDeckController'
import { createCardForDeckController } from './controllers/createCardForDeckController'

config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
connectDB()

app.get('/decks', getDeckController)
app.post('/decks', createDeckController)
app.delete('/decks/:deckId', deleteDeckController)
app.post('/decks/:deckId/cards', createCardForDeckController)

app.listen(PORT, () => console.log(`Server started on ${PORT}`))
