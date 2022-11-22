import Deck from '../model/Deck'
import { Request, Response } from 'express'

export async function getDeckController(req: Request, res: Response) {
  const { deckId } = req.params
  const deck = await Deck.findById(deckId)
  res.json(deck)
}
