exports.validateString = (value, min = 3, max = 22) => {
  if (!value && typeof value !== 'string') return 'Empty or wrong type of data!'
  if (value.length < min) return `Minimum is ${min} characters!`
  if (value.length > max) return `Maximum is ${max} characters!`
  return null
}

exports.validateNumber = (value, type = 'int') => {
  if (type === 'int') {
    return value === '' || isNaN(parseInt(value)) ? 'Wrong data!' : null
  } else {
    return value === '' || isNaN(parseFloat(value)) ? 'Wrong data!' : null
  }
}
