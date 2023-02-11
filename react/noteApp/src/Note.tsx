import { Badge, Button, Col, Row, Stack } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import { Form, Link, useLocation } from 'react-router-dom'
import { Note as NoteType } from './data/model'

export default function Note() {
  const location = useLocation()
  const { note } = location.state as { note: NoteType }

  return (
    <>
      <Row className="align-items-center gap-2 mb-4">
        <Col>
          <h1>{note.title}</h1>
          <Stack direction="horizontal" gap={1} className="flex-wrap">
            {note.tags.map((tag) => (
              <Badge key={tag.id} pill>
                {tag.label}
              </Badge>
            ))}
          </Stack>
        </Col>

        <Col xs="auto">
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Link to="edit">
              <Button>Edit</Button>
            </Link>
            <Form
              method="post"
              action={`/${note.id}/delete`}
              onSubmit={(e) => {
                if (!confirm('This note will be delete!')) {
                  e.preventDefault()
                }
              }}
            >
              <Button variant="outline-danger" type="submit">
                Delete
              </Button>
            </Form>
            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>

      <Row>
        <Col>
          <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </Col>
      </Row>
    </>
  )
}
