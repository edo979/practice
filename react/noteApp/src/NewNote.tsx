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
import { v4 as uuidV4 } from 'uuid'
import { getTags, saveNote, saveTags, Tag } from './data/model'

export const action: ActionFunction = async ({ params, request }) => {
  const formData = await request.formData()
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

  // Save note
  saveNote({ id: uuidV4(), title, markdown, tagIds: tagsId })

  return redirect('/')
}

export const loader: LoaderFunction = async () => {
  const tags = getTags()
  return { tags }
}

export default function NewNote() {
  const { tags } = useLoaderData() as { tags: Tag[] }

  return (
    <>
      <h1 className="mb-4">New Note</h1>
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
