import { Badge, Card, Stack } from 'react-bootstrap'
import { Note } from './data/model'

type NoteCardProps = {
  note: Note
}

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <Card
      as="a"
      href={`notes/${note.id}`}
      className="text-reset text-decoration-none"
    >
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
  )
}
