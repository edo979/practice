export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

export const getNotes = () => {
  const jsonValue = localStorage.getItem('NOTES')
  const notes: Note[] = jsonValue ? JSON.parse(jsonValue) : []

  return notes
}
