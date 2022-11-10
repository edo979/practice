import { ActionFunction, LoaderFunction } from '@remix-run/node'
import { logout } from '~/utils/session.server'

export const action: ActionFunction = async ({ request }) => {
  return await logout(request)
}
export const loader: LoaderFunction = async ({ request }) => {
  return await logout(request)
}
