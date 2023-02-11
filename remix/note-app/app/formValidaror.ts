export function validateEmail(email: unknown): string | undefined {
  if (typeof email !== 'string' || email.length < 4 || !email.includes('@')) {
    return 'Please enter valid email address.'
  }
}

export function validatePassword(password: unknown): string | undefined {
  if (typeof password !== 'string' || password.length < 3) {
    return 'Password must be at least 3 char long.'
  }
}

export function validateNoteInputField(input: string): string | undefined {
  if (input.length < 6) return 'Please add more text'
}
