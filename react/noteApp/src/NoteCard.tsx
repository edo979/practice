import { Note } from './data/model'

type NoteCardProps = {
  note: Note
}

export default function NoteCard({ note }: NoteCardProps) {
  return <div>{note.title}</div>
}
