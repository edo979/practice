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
  return (
    <>
      {children ? (
        <div className="folder">
          <p className="">{name}</p>
          {children.map((entry) => (
            <Entry {...entry} />
          ))}
        </div>
      ) : (
        <p className="file">{name}</p>
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
