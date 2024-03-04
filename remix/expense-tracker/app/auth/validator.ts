import { UserDataRawT, UserDataT } from '~/data/user.server'

function isValidEmail(value: string | undefined): boolean {
  return (
    value !== undefined &&
    typeof value === 'string' &&
    validateEmailFormat(value.trim())
  )
}

function validateEmailFormat(email: string): boolean {
  const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  return re.test(email)
}

function isValidPassword(value: string | undefined): boolean {
  return (
    value !== undefined &&
    typeof value === 'string' &&
    value.trim().length > 6 &&
    value.trim().length <= 30
  )
}

export function validateUserCredentials(input: UserDataRawT) {
  let validationErrors: Record<string, string> = {}

  if (!isValidPassword(input.password))
    validationErrors.password =
      'Password must be longer than 6 and less than 30 characters'

  if (!isValidEmail(input.email))
    validationErrors.email = 'Please enter a valid email'

  if (Object.keys(validationErrors).length) throw validationErrors

  return { email: input.email, password: input.password } as UserDataT
}
