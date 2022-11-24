import { NoteData, Tag } from './App'
import NoteForm from './NoteForm'

function onSubmit() {}
function onAddTag() {}
const availableTags: Tag[] = []

export default function NewNote() {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  )
}
