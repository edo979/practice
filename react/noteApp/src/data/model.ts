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

export const getNotes = () => {
  const jsonValue = localStorage.getItem('NOTES')
  const rawNotes: RawNote[] = jsonValue ? JSON.parse(jsonValue) : []

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

export const getTags = () => {
  const jsonValue = localStorage.getItem('TAGS')
  const tags: Tag[] = jsonValue ? JSON.parse(jsonValue) : []

  return tags
}
