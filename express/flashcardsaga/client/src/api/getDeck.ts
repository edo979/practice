import { API_URL } from './config'
import { TDeck } from './getDecks'

export async function getDeck(deckId: string): Promise<TDeck> {
  const res = await fetch(`${API_URL}/decks/${deckId}`)
  return res.json()
}
