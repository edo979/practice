export type Note = {
  id: string
  title: string
  markdown: string
  tags: Tag[]
}

type RawNote = {
  id: string
  title: string
  markdown: string
  tagIds: string[]
}

export type Tag = {
  id: string
  label: string
}

export const getRawNotes = () => {
  const jsonValue = localStorage.getItem('NOTES')
  const rawNotes: RawNote[] = jsonValue ? JSON.parse(jsonValue) : []

  return rawNotes
}

export const getNotes = () => {
  const rawNotes: RawNote[] = getRawNotes()
  const tagsFromStorage: Tag[] = getTags()

  const notes: Note[] = rawNotes.map((note) => {
    const tags = note.tagIds.map((tagId) => {
      const tag = tagsFromStorage.find((tag) => tag.id === tagId)

      return tag || { id: '', label: 'No tag' }
    })

    return { id: note.id, markdown: note.markdown, title: note.title, tags }
  })

  return notes
}

export const getNote = (noteId: string) => {
  const notes = getNotes()
  const note = notes.find((note) => note.id === noteId)

  if (!note) return []

  return note
}

export const saveNote = (note: RawNote) => {
  const notes = getRawNotes()
  localStorage.setItem('NOTES', JSON.stringify([...notes, note]))
}

export const saveRawNotes = (notes: RawNote[]) => {
  localStorage.setItem('NOTES', JSON.stringify(notes))
}

export const updateNote = (updateNote: RawNote) => {
  const notes = getRawNotes()
  const updateNotes = notes.map((note) => {
    if (note.id === updateNote.id) {
      return updateNote
    }
    return note
  })

  saveRawNotes(updateNotes)
}

export const getTags = () => {
  const jsonValue = localStorage.getItem('TAGS')
  const tags: Tag[] = jsonValue ? JSON.parse(jsonValue) : []

  return tags
}

export const saveTags = (tags: Tag[]) => {
  localStorage.setItem('TAGS', JSON.stringify(tags))
}

export const deleteTag = (tagId: string) => {
  const tags = getTags()
  const notes = getRawNotes()

  const newTags = tags.filter((tag) => tag.id !== tagId)
  saveTags(newTags)

  // Delete tag in notes
  const newNotes = notes.map((note) => {
    note.tagIds = note.tagIds.filter((id) => id !== tagId)
    return note
  })
  saveRawNotes(newNotes)
}
