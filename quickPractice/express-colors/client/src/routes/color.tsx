import { useEffect } from 'react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'
import { ColorT } from '.'

type LoaderDataT = {
  color: ColorT
}

export const loader: LoaderFunction = async ({ params }) => {
  const res = await fetch(`http://localhost:3001/colors/${params.color}`)

  if (!res.ok) {
    throw new Error()
  }

  return { color: await res.json() } as LoaderDataT
}

export default function Color() {
  const { color } = useLoaderData() as LoaderDataT

  useEffect(() => {
    const defaultColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--bg-color')

    document.documentElement.style.setProperty('--bg-color', color.value)

    return () => {
      document.documentElement.style.setProperty('--bg-color', defaultColor)
    }
  }, [])

  return (
    <div>
      <h1>This is the {color.name}</h1>
    </div>
  )
}
