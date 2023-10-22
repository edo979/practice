import Note from '../../src/models/note'

export const setupDatabase = async () => {
  await Note.deleteMany()
}
