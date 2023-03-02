import { LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useEffect } from 'react'
import { colors } from '../data/colors'

type LoaderDataT = {
  color: { name: string; value: string }
}

export const loader = async ({ params }: LoaderArgs) => {
  const paramsColor = params.color
  const colorData = colors.find(
    (color) => color.name.toLowerCase() === paramsColor
  )

  return { color: colorData } as LoaderDataT
}

export default function ColorLayoutRoute() {
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
    <main>
      <h1>This is {color?.name} </h1>
    </main>
  )
}
