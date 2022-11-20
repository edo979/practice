import { useState } from 'react'
import './App.css'

const files = {
  children: [
    {
      name: 'node_modules',
      children: [
        {
          name: 'joi',
          children: [
            {
              name: 'node_modules',
              children: [
                {
                  name: 'classname',
                  children: [{ name: 'index.js' }, { name: 'index.css' }],
                },
              ],
            },
            { name: 'package.json' },
          ],
        },
        { name: 'typescript.config' },
      ],
    },
    {
      name: 'package.json',
    },
    {
      name: 'vite.config.ts',
    },
  ],
}

type TEntry = {
  name: string
  children?: TEntry[]
}

function Entry({ name, children }: TEntry) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      {children ? (
        <>
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? '-' : '+'} {name}
          </button>
          {isExpanded && (
            <div className="folder">
              {children.map((entry) => (
                <Entry {...entry} />
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="entry-name">{name}</p>
      )}
    </>
  )
}

export default function App() {
  return (
    <div className="app">
      {files.children.map((entry) => (
        <Entry {...entry} />
      ))}
    </div>
  )
}
