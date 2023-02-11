import Deck from '../model/Deck'
import { Request, Response } from 'express'

export async function createCardForDeckController(req: Request, res: Response) {
  const deckId = req.params.deckId
  const deck = await Deck.findById(deckId)
  if (!deck) return res.status(400).send('no deck of this id')
  const { text } = req.body
  deck.cards.push(text)
  await deck?.save()

  res.json(deck)
}
