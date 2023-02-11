import express from 'express'
import cors from 'cors'
import connectDB from './config/db'
import { config } from 'dotenv'
import { getDecksController } from './controllers/getDecksController'
import { createDeckController } from './controllers/createDeckController'
import { deleteDeckController } from './controllers/deleteDeckController'
import { createCardForDeckController } from './controllers/createCardForDeckController'
import { getDeckController } from './controllers/getDeckController'
import { deleteCardOnDeckController } from './controllers/deleteCardOnDeckController'

config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
connectDB()

app.get('/decks', getDecksController)
app.post('/decks', createDeckController)
app.delete('/decks/:deckId', deleteDeckController)
app.get('/decks/:deckId', getDeckController)
app.post('/decks/:deckId/cards', createCardForDeckController)
app.delete('/decks/:deckId/cards/:index', deleteCardOnDeckController)

app.listen(PORT, () => console.log(`Server started on ${PORT}`))
