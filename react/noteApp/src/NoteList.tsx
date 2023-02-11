import { useMemo, useState } from 'react'
import { Row, Col, Stack, Button } from 'react-bootstrap'
import { Link, Form, LoaderFunction, useLoaderData } from 'react-router-dom'
import ReactSelect from 'react-select'
import { getNotes, getTags, Note, Tag } from './data/model'
import EditTagsModal from './EditTagsModal'
import NoteCard from './NoteCard'

type LoaderData = {
  notes: Note[]
  tags: Tag[]
}

export const loadar: LoaderFunction = async () => {
  const notes = getNotes()
  const tags = getTags()

  return { notes, tags }
}

export default function NoteList() {
  const { notes, tags } = useLoaderData() as LoaderData
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState('')
  const [showModal, setShowModal] = useState(false)

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === '' ||
          note.title.toLowerCase().includes(title.toLocaleLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      )
    })
  }, [title, selectedTags])

  const handleShowModal = () => setShowModal(true)
  const handleHideModal = () => setShowModal(false)

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button variant="outline-secondary" onClick={handleShowModal}>
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>

      <Form onSubmit={(e) => e.preventDefault()}>
        <Row className="mb-4">
          <Col>
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
          <Col>
            <label htmlFor="tags" className="form-label">
              Tags
            </label>
            <ReactSelect
              value={selectedTags.map((tag) => {
                return { label: tag.label, value: tag.id }
              })}
              options={tags.map((tag) => ({
                label: tag.label,
                value: tag.id,
              }))}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.value }
                  })
                )
              }}
              name="tags"
              isMulti
            />
          </Col>
        </Row>
      </Form>

      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard note={note} />
          </Col>
        ))}
      </Row>

      <EditTagsModal
        show={showModal}
        handleClose={handleHideModal}
        tags={tags}
      />
    </>
  )
}
