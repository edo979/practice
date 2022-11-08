import { json, LoaderFunction, redirect } from '@remix-run/node'

export const loader: LoaderFunction = async ({ params }) => {
  const jokeId = params.jokeId
  if (!jokeId) throw new Error(`Can't delete that joke!`)
  console.log(jokeId)
  return redirect('/jokes')
}
