export const validateProductName = (name: string) => {
  if (name.length < 3) return 'Name is to short!'
}

export const validateProductDesc = (desc: string) => {
  if (desc.length < 3) return 'Description is to short!'
}

export const validateProductPrice = (price: string) => {
  if (Number.isNaN(parseFloat(price)))
    return 'Please enter valid price in this format 34.44'
  if (parseFloat(price) <= 0) return 'Add valid price!'
}

export const validateProductImage = (image: File | null) => {
  const allowedFileTypes = ['image/png', 'image/jpeg']

  if (!image || image.size === 0) return 'No image selected.'
  if (!allowedFileTypes.includes(image.type))
    return 'Only png, jpg, jpeg images is alloved!'

  if (image.size > 1e6) return 'Max size of image is 1Mb!'
}
