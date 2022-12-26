import { Form } from '@remix-run/react'

export default function NewNoteRoute() {
  return (
    <div className="container">
      <Form method="post" className="row">
        <h2 className="fs-5 border-bottom pb-2 mb-3">Create new note:</h2>

        <div className="col">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            aria-label="Title"
            id="title"
            name="title"
          />
        </div>

        <div className="col">
          <label htmlFor="tags" className="form-label">
            Tags
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Tags"
            aria-label="Tags"
            id="tags"
            name="tags"
          />
        </div>

        <div className="col-12 mt-4">
          <label htmlFor="body" className="form-label">
            Body
          </label>
          <textarea name="body" id="body" className="form-control" rows={10} />
        </div>

        <div className="col-12 d-flex justify-content-end align-items-center gap-2 mt-4 ">
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-success">Save</button>
        </div>
      </Form>
    </div>
  )
}
