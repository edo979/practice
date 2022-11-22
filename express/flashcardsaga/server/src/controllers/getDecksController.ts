import Deck from '../model/Deck'
import { Request, Response } from 'express'

export async function getDeckController(req: Request, res: Response) {
  const decks = await Deck.find()
  res.json(decks)
}
