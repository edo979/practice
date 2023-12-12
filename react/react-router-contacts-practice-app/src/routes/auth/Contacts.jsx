import {
  Outlet,
  Form,
  useLoaderData,
  redirect,
  useNavigate,
} from 'react-router-dom'
import { createContact, getContacts } from '../../db/contacts'
import { getCurrentUserId, logoutUser } from '../../db/users'

export async function loader() {
  const userId = await getCurrentUserId()
  if (!userId) return redirect('/signin')
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

  const logoutHandler = async () => {
    await logoutUser()
    navigate('/')
  }

  return (
    <div className="container">
      <div className="row">
        <div
          className="col-4 py-4 d-flex flex-column justify-content-between bg-primary-subtle text-body-emphasis"
          style={{ minHeight: '100vh' }}
        >
          <div>
            <div className="d-flex gap-2 mt-4">
              <form className="flex-fill" role="search">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
              <Form method="post">
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
                    {contact.first} {contact.last}
                  </li>
                ))
              ) : (
                <p>No contacts yet.</p>
              )}
            </ul>

            <hr className="my-4" />
          </div>

          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-secondary"
              onClick={logoutHandler}
            >
              Login Out
            </button>
          </div>
        </div>
        <div className="col-8">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default Contacts
