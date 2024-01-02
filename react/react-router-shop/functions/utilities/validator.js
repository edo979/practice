validateString = (value, min = 3, max = 22) => {
  if (!value && typeof value !== 'string') return 'Empty or wrong type of data!'
  if (value.length < min) return `Minimum is ${min} characters!`
  if (value.length > max) return `Maximum is ${max} characters!`
  return null
}

validateNumber = (value, type = 'int') => {
  if (type === 'int') {
    return value === '' || isNaN(parseInt(value)) ? 'Wrong data!' : null
  } else {
    return value === '' || isNaN(parseFloat(value)) ? 'Wrong data!' : null
  }
}

exports.validateProductData = (req) => {
  const errors = {}
  const productData = {
    name: req.data.name.trim(),
    brand: req.data.brand.trim(),
    category: req.data.category.trim(),
    description: req.data.description.trim(),
    inStock: req.data.inStock,
    price: req.data.price,
    numReviews: 0,
    rating: 0,
  }

  errors.name = validateString(productData.name, 5)
  errors.brand = validateString(productData.brand, 3)
  errors.category = validateString(productData.category, 3)
  errors.description = validateString(productData.description, 10, 150)
  errors.inStock = validateNumber(productData.inStock)
  errors.price = validateNumber(productData.price, 'float')

  return { errors, productData }
}
