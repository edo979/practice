import { Form, Link, LoaderFunction, useLoaderData } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import { Tag } from './NotesList'

type LoaderData = {
  tags: Tag[]
}

export const loader: LoaderFunction = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/tags`)
  if (!res.ok) throw new Error("Can't get tags!")
  const { tags } = await res.json()
  return { tags } as LoaderData
}

export default function NewNote() {
  const { tags } = useLoaderData() as LoaderData
  console.log(tags)

  return (
    <Form className="row">
      <h1>New Note:</h1>
      <div className="col-12 col-sm-6">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Note Title..."
          className="form-control"
        />
      </div>

      <div className="col-12 col-sm-6">
        <label htmlFor="tags" className="form-label">
          Tags:
        </label>
        <CreatableSelect isMulti id="tags" name="tags" />
      </div>

      <div className="col-12 mt-2">
        <label htmlFor="body" className="form-label">
          Note Text:
        </label>
        <textarea
          name="body"
          id="body"
          rows={10}
          className="form-control"
          placeholder="Input Note text here ..."
        />
      </div>

      <div className="col-12 my-2">
        <div className="hstack gap-2 justify-content-end">
          <Link to="..">
            <button className="btn btn-secondary">Back</button>
          </Link>

          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </div>
    </Form>
  )
}
