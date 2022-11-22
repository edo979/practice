import Deck from '../model/Deck'
import { Request, Response } from 'express'

export async function deleteDeckController(req: Request, res: Response) {
  const deckId = req.params.deckId
  await Deck.findByIdAndDelete(deckId)

  res.json({ message: 'successfully delete the entry' })
}
