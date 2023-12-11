import { useEffect } from 'react'
import { Outlet, Form, useLoaderData, useNavigate } from 'react-router-dom'
import { createContact, getContacts } from '../../db/firebaseInit'
import UserNav from '../../components/UserNav'
import { useUserContext } from '../../context/userContext'

export async function loader() {
  const contacts = await getContacts()

  return { contacts }
}

export async function action() {
  const contact = await createContact()
  return { contact }
}

const Contacts = () => {
  const { contacts } = useLoaderData()
  const navigate = useNavigate()
  const { userId } = useUserContext()

  useEffect(() => {
    if (userId) navigate('/auth/contacts', { replace: true })
  }, [userId])

  return (
    <div className="container">
      <div className="row">
        <div
          className="col-4 pt-4 bg-primary-subtle text-body-emphasis"
          style={{ minHeight: '100vh' }}
        >
          <UserNav />

          <hr className="my-4" />
          <div className="d-flex gap-2 mt-4">
            <form className="flex-fill" role="search">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            <Form>
              <button className="btn btn-primary" type="submit">
                New
              </button>
            </Form>
          </div>

          <hr className="my-4" />

          <ul>
            {contacts ? (
              contacts.map((contact) => (
                <li key={contact.id}>
                  {contact.name} {contact.last}
                </li>
              ))
            ) : (
              <p>No contacts yet.</p>
            )}
          </ul>
        </div>
        <div className="col-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Contacts
