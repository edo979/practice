export function validateEmail(email: unknown): email is string {
  return typeof email === 'string' && email.length > 3 && email.includes('@')
}

export function validatePassword(password: unknown): password is string {
  return typeof password === 'string'
}
