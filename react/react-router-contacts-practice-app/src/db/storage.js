import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'
import { storage } from './firebaseInit'

const getImageRef = (contactId) => ref(storage, `contactsApp/${contactId}`)

const dataURLtoFile = (dataURL, filename) => {
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

export const uploadImageToStorage = async (file, contactId) => {
  const imageRef = getImageRef(contactId)

  // Try to delete old image
  try {
    await deleteImageFromStorage(imageRef)
  } catch (error) {
    // no image in storage don't delete it
  }

  // Save image to storage
  try {
    const image = dataURLtoFile(file, 'avatarImage')
    const snapshot = await uploadBytes(imageRef, image)
    const url = await getDownloadURL(snapshot.ref)

    return url
  } catch (error) {
    console.log(error)
    return false
  }
}

export const deleteImageFromStorage = async (contactId) => {
  await deleteObject(getImageRef(contactId))
  return true
}
