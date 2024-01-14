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
    countInStock: req.data.countInStock,
    price: req.data.price,
    numReviews: 0,
    rating: 0,
  }

  errors.name = validateString(productData.name, 5)
  errors.brand = validateString(productData.brand, 3)
  errors.category = validateString(productData.category, 3)
  errors.description = validateString(productData.description, 10, 150)
  errors.countInStock = validateNumber(productData.countInStock)
  errors.price = validateNumber(productData.price, 'float')

  return { errors, productData }
}

exports.validateOrderData = (req) => {
  const errors = {}
  const orderData = {
    firstName: req.data.firstName.trim(),
    lastName: req.data.lastName.trim(),
    email: req.data.email.trim(),
    address: req.data.address.trim(),
    address2: req.data.address2.trim(),
    country: req.data.country.trim(),
    state: req.data.state.trim(),
    zip: req.data.zip.trim(),
    payment: 'payPal', // Hard coded!
    isPayed: true,
    isDelivered: false,
    isShipped: false,
    paymentResults: {
      id: req.data.paymentId,
      status: req.data.status,
      update_time: req.data.update_time,
      email: req.data.payerEmail,
    },
  }

  errors.firstName = validateString(orderData.firstName)
  errors.lastName = validateString(orderData.lastName)
  errors.email = validateString(orderData.email)
  errors.address = validateString(orderData.address)
  errors.address2 =
    orderData.address2 !== '' ? validateString(orderData.address2) : null
  errors.country = validateString(orderData.country)
  errors.state = validateString(orderData.state)
  errors.zip = validateString(orderData.firstName)

  return { errors, orderData }
}
