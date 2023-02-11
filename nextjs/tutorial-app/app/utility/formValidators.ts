export function validateInputField(input: string, minLenght = 3) {
  if (input.length < minLenght) {
    return `Minimum is ${minLenght} characters, input more.`
  }
}
