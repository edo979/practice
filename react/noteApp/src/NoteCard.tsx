import { Badge, Card } from 'react-bootstrap'
import { Note } from './data/model'

type NoteCardProps = {
  note: Note
}

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <Card>
      <Card.Body>
        <h2 className="h4">{note.title}</h2>
        <p>{note.markdown}</p>
      </Card.Body>
      <Card.Footer>
        {note.tags.map((tag) => (
          <Badge key={tag.id}>{tag.label}</Badge>
        ))}
      </Card.Footer>
    </Card>
  )
}
