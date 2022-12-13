import { Form } from 'react-router-dom'
import Select from 'react-select'

type ActionData = {
  formError?: string
  formFieldsError?: {
    title?: string
    body?: string
    tags?: string
  }
  formFields?: {
    title: string
    body: string
    tags: string[]
  }
}

export default function EditNote() {
  const error: ActionData = {}

  return (
    <Form className="row">
      <h1>Edit note:</h1>
      <div className="col-12 col-sm-6">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Note Title..."
          className={`form-control ${
            error?.formFieldsError?.title ? 'is-invalid' : ''
          }`}
          aria-describedby="titleFeedback"
        />
        <div id="titleFeedback" className="invalid-feedback">
          {error?.formFieldsError?.title}
        </div>
      </div>

      <div className="col-12 col-sm-6">
        <label htmlFor="tags" className="form-label">
          Tags:
        </label>
        <Select
          isMulti
          id="tags"
          name="tags"
          //options={tags.map((tag) => ({ value: tag.label, label: tag.label }))}
        />
        {error?.formFieldsError?.tags && (
          <p className="invalid-feedback d-block">
            {error.formFieldsError.tags}
          </p>
        )}
      </div>
    </Form>
  )
}
