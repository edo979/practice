import Deck from '../model/Deck'
import { Request, Response } from 'express'

export async function createDeckController(req: Request, res: Response) {
  const newDeck = new Deck({
    title: req.body.title,
  })
  const createdDeck = await newDeck.save()

  res.json(createdDeck)
}
