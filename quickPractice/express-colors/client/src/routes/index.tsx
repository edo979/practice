import { LoaderFunction, useLoaderData } from 'react-router-dom'

export type ColorT = {
  name: string
  value: string
}

type LoaderDataT = {
  colors: ColorT[]
}

export const loader: LoaderFunction = async () => {
  const res = await fetch('http://localhost:3001/colors')

  if (!res.ok) {
    throw new Error()
  }

  return { colors: await res.json() } as LoaderDataT
}

export default function Index() {
  const { colors } = useLoaderData() as LoaderDataT

  return (
    <>
      <h1>Colors</h1>
      <ul>
        {colors &&
          colors.map((color) => (
            <li key={color.name}>
              <a href={color.name.toLowerCase()}>{color.name}</a>
            </li>
          ))}
      </ul>
    </>
  )
}
