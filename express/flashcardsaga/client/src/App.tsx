import React, { useEffect, useState } from 'react'
import './App.css'

type TDeck = {
  _id: string
  title: string
}

function App() {
  const [title, setTitle] = useState('')
  const [decks, setDecks] = useState<TDeck[]>([])

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('http://localhost:5000/decks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
      }),
    })

    const deck = await res.json()

    setDecks([...decks, deck])
    setTitle('')
  }

  const handleDeleteDeck = async (deckId: string) => {
    await fetch(`http://localhost:5000/decks/${deckId}`, {
      method: 'DELETE',
    })

    setDecks((prev) => prev.filter((deck) => deck._id !== deckId))
  }

  useEffect(() => {
    const fetchDecks = async () => {
      const res = await fetch('http://localhost:5000/decks')
      const newDecks = await res.json()

      setDecks(newDecks)
    }

    fetchDecks()
  }, [])

  return (
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <button
              className="btn-close"
              onClick={() => handleDeleteDeck(deck._id)}
            >
              X
            </button>
            {deck.title}
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

export default App
