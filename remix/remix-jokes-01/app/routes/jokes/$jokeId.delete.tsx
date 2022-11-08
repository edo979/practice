import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/node'
import { db } from '~/utils/db.server'
import { requireUserId } from '~/utils/session.server'

export const action: ActionFunction = async ({ request, params }) => {
  const jokeId = params.jokeId
  const userId = await requireUserId(request)

  if (!jokeId) throw new Error(`Can't delete that joke!`)
  console.log(jokeId)

  const joke = await db.joke.findFirst({ where: { id: jokeId } })

  if (joke?.jokesterId === userId) {
    await db.joke.delete({
      where: {
        id: jokeId,
      },
    })
  }

  return redirect('/jokes')
}
