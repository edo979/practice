import { Stack, Row, Col, Button } from 'react-bootstrap'
import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  useLoaderData,
} from 'react-router-dom'
import { Tag } from './App'
import CreatableReactSelect from 'react-select/creatable'
import { v4 as uuidV4 } from 'uuid'
import { useLocalStorage } from './useLocalStorage'

export const action: ActionFunction = async ({ params, request }) => {
  const formData = await request.formData()
  let labelsFromForm = formData.getAll('tags') as string[]

  labelsFromForm = labelsFromForm.filter((label) => label !== '')

  // TODO: add validation for empty tags
  if (!labelsFromForm) return

  // Get tags from storage
  const jsonValue = localStorage.getItem('TAGS')
  const tagsFromStorage: Tag[] = jsonValue ? JSON.parse(jsonValue) : []

  // TAGS
  // Check for new tags
  const newTags = labelsFromForm.filter((label) => {
    const labelsFromStorage = tagsFromStorage.map((tag) => tag.label)
    return !labelsFromStorage.includes(label)
  })

  // Save new tags to storage
  if (newTags.length > 0) {
    const tagsToSave: Tag[] = newTags.map((label) => ({ id: uuidV4(), label }))

    localStorage.setItem(
      'TAGS',
      JSON.stringify([...tagsFromStorage, ...tagsToSave])
    )
  }

  // NOTE
}

export const loader: LoaderFunction = async () => {
  const jsonValue = localStorage.getItem('TAGS')
  if (!jsonValue) return { tags: [] }

  const tags: Tag[] = JSON.parse(jsonValue)

  return { tags }
}

export default function NewNote() {
  const { tags } = useLoaderData() as { tags: Tag[] }

  //console.log(tags)

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
              />
            </Col>
            <Col>
              <label htmlFor="tags" className="form-label">
                Tags
              </label>

              <CreatableReactSelect
                // onCreateOption={(label) => {
                //   const newTag = { id: uuidV4(), label }
                //   onAddTag(newTag)
                //   setSelectedTags((prev) => [...prev, newTag])
                // }}
                // value={selectedTags.map((tag) => {
                //   return { label: tag.label, value: tag.id }
                // })}
                options={tags.map((tag) => ({
                  label: tag.label,
                  value: tag.label,
                }))}
                // onChange={(tags) => {
                //   setSelectedTags(
                //     tags.map((tag) => {
                //       return { label: tag.label, id: tag.value }
                //     })
                //   )
                // }}
                isMulti
                name="tags"
                id="tags"
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
