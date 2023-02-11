import { compareHashAndPassword } from 'node-hash-password'

export const getIsLogged = (Astro) => {
  const cookie_jwt = Astro.cookies.get(import.meta.env.LOGIN_COOKIE).value

  if (
    compareHashAndPassword({
      method: 'keccak256',
      hash: cookie_jwt,
      session: import.meta.env.SESSION,
    })
  )
    return true
  return false
}
