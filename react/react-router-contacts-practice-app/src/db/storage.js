import { ref, uploadBytes } from 'firebase/storage'
import { storage } from './firebaseInit'

export const resizeImage = (file, cb) => {
  const reader = new FileReader()

  reader.onload = (e) => {
    const img = new Image()
    const maxSize = 200

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      const newWidth =
        img.width > img.height ? maxSize : (img.width / img.height) * maxSize
      const newHeight =
        img.height > img.width ? maxSize : (img.height / img.width) * maxSize

      canvas.width = newWidth
      canvas.height = newHeight

      ctx.drawImage(img, 0, 0, newWidth, newHeight)

      // Convert the canvas content to a data URL
      const resizedDataURL = canvas.toDataURL('image/jpeg')

      cb(resizedDataURL)
    }

    img.src = e.target.result
  }

  reader.readAsDataURL(file)
}

export const dataURLtoFile = (dataURL, filename) => {
  const arr = dataURL.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

export const uploadImageToStorage = async (file) => {
  const storageRef = ref(storage, `contactsApp/${Date.now()}`)

  try {
    const snapshot = uploadBytes(storageRef, file)
    console.log(snapshot)
  } catch (error) {
    console.log(error)
  }
}
