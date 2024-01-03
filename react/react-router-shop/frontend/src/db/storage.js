import { ref, uploadBytes } from 'firebase/storage'
import { storage } from './init'

export const uploadImg = async ({ image, imageName }) => {
  const fileExtension = image.name.split('.').pop()
  const imageNameForStorage = `${imageName}.${fileExtension}`
  const productImageRef = ref(storage, `proShop/${imageNameForStorage}`)

  await uploadBytes(productImageRef, image)
}
