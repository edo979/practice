import { Stack, Row, Col, Button } from 'react-bootstrap'
import { ActionFunction, Form, Link } from 'react-router-dom'
import { Tag } from './App'
import CreatableReactSelect from 'react-select/creatable'
import { v4 as uuidV4 } from 'uuid'

function onSubmit() {}
function onAddTag() {}
const availableTags: Tag[] = []

export const action: ActionFunction = async ({ params, request }) => {
  const formData = await request.formData()
  const values = Object.fromEntries(formData)
  console.log(values)
}

export default function NewNote() {
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
                // options={availableTags.map((tag) => ({
                //   label: tag.label,
                //   value: tag.id,
                // }))}
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
                value={[
                  { label: 'jah', value: 'jah' },
                  { label: 'haj', value: 'haj' },
                ]}
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
