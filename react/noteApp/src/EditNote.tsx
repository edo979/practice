import { Stack, Row, Col, Button } from 'react-bootstrap'
import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
} from 'react-router-dom'
import CreatableReactSelect from 'react-select/creatable'
import {
  getNote,
  getTags,
  Note,
  saveNote,
  saveTags,
  Tag,
  updateNote,
} from './data/model'
import { v4 as uuidV4 } from 'uuid'

type LoaderData = {
  note: Note
  tags: Tag[]
}

export const action: ActionFunction = async ({ params, request }) => {
  const formData = await request.formData()
  const noteId = params.noteId as string
  const title = formData.get('title')
  const markdown = formData.get('markdown')
  let labelsFromForm = formData.getAll('tags') as string[]

  // TODO: add validation
  if (typeof title !== 'string' || typeof markdown !== 'string') return

  // TAGS
  let tagsId: string[] = []
  // TODO: add validation for empty tags
  labelsFromForm = labelsFromForm.filter((label) => label !== '')
  if (!labelsFromForm) return

  // Get tags from storage
  const tagsFromStorage: Tag[] = getTags()

  // Check for new tags
  const newLabels = labelsFromForm.filter((label) => {
    const labelsFromStorage = tagsFromStorage.map((tag) => tag.label)

    return !labelsFromStorage.includes(label)
  })

  // Save new tags to storage
  if (newLabels.length > 0) {
    const tagsToSave: Tag[] = newLabels.map((label) => ({
      id: uuidV4(),
      label,
    }))

    // Add new tag to notes tags
    tagsId = tagsToSave.map((tag) => tag.id)
    //Save to storage
    saveTags([...tagsFromStorage, ...tagsToSave])
  }

  // NOTE
  // Complete notes tags
  const savedTagsId = tagsFromStorage
    .filter((tag) => labelsFromForm.includes(tag.label))
    .map((tag) => tag.id)
  tagsId = [...tagsId, ...savedTagsId]

  updateNote({ id: noteId, title, markdown, tagIds: tagsId })

  return redirect('..')
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const noteId = params.noteId
  const tags = getTags()
  const note = getNote(noteId!)

  return { note, tags } as LoaderData
}

export default function EditNote() {
  const { note, tags } = useLoaderData() as LoaderData

  return (
    <>
      <h1>Edit Note</h1>
      <Form method="post">
        <Stack gap={4}>
          <Row>
            <Col>
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                defaultValue={note.title}
                required
              />
            </Col>
            <Col>
              <label htmlFor="tags" className="form-label">
                Tags
              </label>

              <CreatableReactSelect
                options={tags.map((tag) => ({
                  label: tag.label,
                  value: tag.label,
                }))}
                isMulti
                name="tags"
                id="tags"
                defaultValue={note.tags.map((tag) => ({
                  label: tag.label,
                  value: tag.label,
                }))}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <label htmlFor="markdown" className="form-label">
                Body
              </label>
              <textarea
                className="form-control"
                id="markdown"
                name="markdown"
                rows={15}
                defaultValue={note.markdown}
                required
              />
            </Col>
          </Row>
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Link to={'..'}>
              <Button type="button" variant="outline-secondary">
                Cancel
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Form>
    </>
  )
}
