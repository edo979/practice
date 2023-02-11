import { FaUser } from 'react-icons/fa'
import { Form, json, redirect, useActionData } from 'react-router-dom'

const validateName = (name) => {
  if (name.lenght < 4) {
    return 'Name must have at least 5 charachters!'
  }
}

export const action = async ({ request, params }) => {
  const formData = await request.formData()
  const name = formData.get('name')
  const email = formData.get('email')
  const phone = formData.get('phone')

  const errors = {
    formError: '',
    fieldErrors: {
      name: '',
      email: '',
      phone: '',
    },
    fields: {
      name: '',
      email: '',
      phone: '',
    },
  }

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof phone !== 'string'
  ) {
    errors.formError = 'Form not submitted correctly.'
  }

  errors.fieldErrors = {
    name: validateName(name),
  }

  await fetch('http://localhost:5000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation addClient($name: String!, $email: String!, $phone: String!) {
          addClient(name: $name, email: $email, phone: $phone) {
            id
            name
            email
            phone
          }
        }
      `,
      variables: { name, email, phone },
    }),
  })

  return redirect('/')
}

export default function AddClient() {
  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Add Client
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <Form method="post" action="addClient">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Submit
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
