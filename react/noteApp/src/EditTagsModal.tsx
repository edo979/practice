import { Badge, Button, Col, Modal, Row, Stack } from 'react-bootstrap'
import { Form } from 'react-router-dom'
import { Tag } from './data/model'

type EditTagsModalProps = {
  show: boolean
  handleClose: () => void
  tags: Tag[]
}

export default function EditTagsModal({
  show,
  handleClose,
  tags,
}: EditTagsModalProps) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Stack gap={2}>
            {tags.map((tag) => (
              <Form
                key={tag.id}
                className="row g-2"
                method="post"
                action={`/tags/edit`}
              >
                <input type="hidden" name="id" value={tag.id} />
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={tag.label}
                    name="tag"
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    className="form-control"
                    variant="outline-success"
                    type="submit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      height={12}
                      fill="currentcolor"
                    >
                      <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                  </Button>
                </Col>
                <Col xs="auto">
                  <Form method="post" action="/tags/delete">
                    <input type="hidden" name="id" value={tag.id} />
                    <Button
                      className="form-control"
                      variant="outline-danger"
                      type="submit"
                    >
                      &times;
                    </Button>
                  </Form>
                </Col>
              </Form>
            ))}
          </Stack>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  )
}
