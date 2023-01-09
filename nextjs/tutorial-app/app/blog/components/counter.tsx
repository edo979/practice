'use client'

import { useState } from 'react'

export default function Counter() {
  const [counter, setCounter] = useState(0)

  return (
    <section className="my-8 w-52 mx-auto gradient-container text-center">
      <h3 className="h3">Click to see a wonder!</h3>
      <p className="my-2 font-semibold text-2xl">{counter}</p>

      <button
        className="btn btn-primary"
        onClick={() => setCounter((prev) => prev + 1)}
      >
        Click Me!
      </button>
    </section>
  )
}
