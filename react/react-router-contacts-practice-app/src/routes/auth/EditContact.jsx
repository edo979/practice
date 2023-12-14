import { Form, redirect, useActionData } from 'react-router-dom'
import { editContact } from '../../db/contacts'
import { getCurrentUserId } from '../../db/users'

export async function action({ request, params }) {
  const userId = await getCurrentUserId()
  if (!userId) return redirect('/signin')

  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  console.log(updates)
  const contact = await editContact(userId, params.contactId, updates)
  return { contact }
}

const EditContact = () => {
  const actionData = useActionData()
  console.log(actionData)

  return (
    <Form className="mx-sm-2 my-sm-5 m-5" method="post">
      <div className="row mb-3">
        <label htmlFor="first" className="col-sm-2 col-form-label">
          Name
        </label>
        <div className="col-sm-5">
          <input
            type="text"
            name="first"
            id="first"
            className="form-control"
            placeholder="First"
          />
        </div>

        <div className="col-sm-5 mt-3 mt-sm-0">
          <input
            type="text"
            name="last"
            id="last"
            className="form-control"
            placeholder="Last"
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="twitter" className="col-sm-2 col-form-label">
          Twitter
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            name="twitter"
            id="twitter"
            className="form-control"
            placeholder="@jack"
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="avatar" className="col-sm-2 col-form-label">
          Avatar URL
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            name="avatar"
            id="avatar"
            className="form-control"
            placeholder="http://example.com/avatar.jpg"
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="notes" className="col-sm-2 col-form-label">
          Notes
        </label>
        <div className="col-sm-10">
          <textarea name="notes" id="notes" className="form-control" rows={5} />
        </div>
      </div>

      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </Form>
  )
}

export default EditContact
