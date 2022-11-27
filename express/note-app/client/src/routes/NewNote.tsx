import { ActionFunction, Form, useActionData } from 'react-router-dom'
import CreatableReactSelect from 'react-select/creatable'
import { Note } from './Home'

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const title = formData.get('title')
  const body = formData.get('body')

  const errors = {}

  const res = await fetch('http://localhost:5000/notes/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body }),
  })

  const note: Note = await res.json()

  return errors
}

export default function NewNote() {
  const errors = useActionData()

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
            <CreatableReactSelect name="tags" />
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
