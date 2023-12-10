import { Outlet, useLoaderData } from 'react-router-dom'
import { createContact, getContacts } from '../../db/firebaseInit'
import UserNav from '../../components/UserNav'

export async function loader({ params }) {
  const contacts = await getContacts(params.userId)
  return { contacts }
}

const Contacts = () => {
  const { contacts } = useLoaderData()

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
            <button className="btn btn-primary" onClick={createContact}>
              New
            </button>
          </div>

          <hr className="my-4" />
          <ul>
            {contacts.map((contact) => (
              <li key={contact.id}>
                {contact.name} {contact.last}
              </li>
            ))}
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
