import './App.css'

const files = {
  children: [
    {
      name: 'node_modules',
      children: [
        {
          name: 'joi',
        },
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
  return <div className="folder">{name}</div>
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
