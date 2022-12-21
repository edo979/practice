export function validateEmail(email: unknown): string | undefined {
  if (typeof email !== 'string' || email.length < 4 || !email.includes('@')) {
    return 'Please enter valid email address.'
  }
}

export function validatePassword(password: unknown): string | undefined {
  if (typeof password !== 'string' || password.length < 3) {
    return 'At least 3 char long.'
  }
}
