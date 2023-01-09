'use client'

import { useState } from 'react'

export default function Counter() {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <h2>{counter}</h2>

      <button onClick={() => setCounter((prev) => prev + 1)}>Click Me!</button>
    </div>
  )
}
