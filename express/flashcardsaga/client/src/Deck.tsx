import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createCard } from './api/createCard'
import { deleteCard } from './api/deleteCard'
import { getDeck } from './api/getDeck'
import { TDeck } from './api/getDecks'

export default function Deck() {
  const [text, setText] = useState('')
  const { deckId } = useParams()
  const [cards, setCards] = useState<string[]>([])
  const [deck, setDeck] = useState<TDeck | undefined>()

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault()
    const { cards: serverCards } = await createCard(deckId!, text)
    setCards(serverCards)
    setText('')
  }

  const handleDeleteCard = async (index: number) => {
    if (!deckId) return
    const newDeck = await deleteCard(deckId, index)
    setCards(newDeck.cards)
  }

  useEffect(() => {
    const fetchDeck = async () => {
      if (!deckId) return
      const newDeck = await getDeck(deckId)
      setDeck(newDeck)
      setCards(newDeck.cards)
    }

    fetchDeck()
  }, [deckId])

  return (
    <div className="App">
      <ul className="cards-container">
        {cards.map((card, index) => (
          <li key={index} className="card p1 py-2">
            <button
              className="btn-close"
              onClick={() => handleDeleteCard(index)}
            >
              X
            </button>
            {card}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-text">Card Text</label>
        <input
          type="text"
          id="deck-text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value)
          }}
          value={text}
        />
        <button>Create Card</button>
      </form>
    </div>
  )
}
