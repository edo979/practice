import { Badge, Card, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Note } from './data/model'

type NoteCardProps = {
  note: Note
}

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <Link
      to={`${note.id}`}
      state={{ note }}
      className="text-reset text-decoration-none"
    >
      <Card>
        <Card.Body className="text-center">
          <h2 className="h4">{note.title}</h2>
          <Stack
            direction="horizontal"
            gap={1}
            className="justify-content-center flex-wrap"
          >
            {note.tags.map((tag) => (
              <Badge key={tag.id} pill>
                {tag.label}
              </Badge>
            ))}
          </Stack>
        </Card.Body>
      </Card>
    </Link>
  )
}
