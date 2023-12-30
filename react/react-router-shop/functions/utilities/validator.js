exports.validateString = (value, min = 3, max = 22) => {
  console.log(value, value.length)
  if (!value && typeof value !== 'string') return 'Empty or wrong type of data!'
  if (value.length < min) return `Minimum is ${min} characters!`
  if (value.length > max) return `Maximum is ${max} characters!`
  return null
}
