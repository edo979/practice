import { Form } from 'react-router-dom'

export default function NewNote() {
  return (
    <>
      <div className="row mt-4">
        <h1>Add new Note</h1>
      </div>

      <Form method="post">
        <div className="row row-cols-1 row-cols-sm-2">
          <div className="col">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
            />
          </div>
          <div className="col">
            <label htmlFor="tags" className="form-label">
              Tags
            </label>
            <select name="" id="" className="form-control"></select>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col">
            <label className="form-label" htmlFor="body">
              Body
            </label>
            <textarea className="form-control" name="body" rows={15} />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-auto ms-auto">
            <button className="btn btn-primary">Save</button>
            <button className="btn btn-secondary ms-2">Cancel</button>
          </div>
        </div>
      </Form>
    </>
  )
}
