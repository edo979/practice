import { Storage } from '@google-cloud/storage'

const storage = new Storage({
  projectId: 'my-shop-practice-cd1af',
  keyFilename: './secrets/my-shop-practice-cd1af-storage-admin.json',
})
export const bucket = storage.bucket('my-shop-app-storage')
