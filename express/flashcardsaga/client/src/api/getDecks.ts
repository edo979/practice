import { API_URL } from './config'

export type TDeck = {
  _id: string
  cards: string[]
  title: string
}

export async function getDecks(): Promise<TDeck[]> {
  const res = await fetch(`${API_URL}/decks`)
  return res.json()
}
