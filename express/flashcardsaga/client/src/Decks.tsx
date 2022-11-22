import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createDeck } from './api/createDeck'
import { deleteDeck } from './api/deleteDeck'
import { getDecks, TDeck } from './api/getDecks'

export default function Decks() {
  const [title, setTitle] = useState('')
  const [decks, setDecks] = useState<TDeck[]>([])

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault()
    const deck = await createDeck(title)
    setDecks([...decks, deck])
    setTitle('')
  }

  const handleDeleteDeck = async (deckId: string) => {
    await deleteDeck(deckId)
    setDecks((prev) => prev.filter((deck) => deck._id !== deckId))
  }

  useEffect(() => {
    const fetchDecks = async () => {
      const newDecks = await getDecks()
      setDecks(newDecks)
    }

    fetchDecks()
  }, [])

  return (
    <div className="App">
      <ul className="cards-container">
        {decks.map((deck) => (
          <li key={deck._id} className="card">
            <button
              className="btn-close"
              onClick={() => handleDeleteDeck(deck._id)}
            >
              X
            </button>

            <Link to={`decks/${deck._id}`}>{deck.title}</Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input
          type="text"
          id="deck-title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value)
          }}
          value={title}
        />
        <button>Create Deck</button>
      </form>
    </div>
  )
}
