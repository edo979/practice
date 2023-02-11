import { API_URL } from './config'
import { TDeck } from './getDecks'

export const createCard = async (
  deckId: string,
  text: string
): Promise<TDeck> => {
  const res = await fetch(`${API_URL}/decks/${deckId}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
    }),
  })

  return res.json()
}
