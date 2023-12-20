import { useState } from 'react'
import {
  Outlet,
  Form,
  useLoaderData,
  redirect,
  useNavigate,
  NavLink,
} from 'react-router-dom'
import classNames from 'classnames'
import {
  createContact,
  getContacts,
  getFilteredContacts,
} from '../../db/contacts'
import { getCurrentUserId, logoutUser } from '../../db/users'

export async function loader({ request }) {
  const userId = await getCurrentUserId()
  if (!userId) return redirect('/signin')

  // const url = new URL(request.url)
  // const q = url.searchParams.get('q')?.toLowerCase()

  // if (q) {
  //   const contacts = await getFilteredContacts(userId, q)
  //   return { contacts }
  // } else {
  // }
  const contacts = await getContacts(userId)
  return { contacts }
}

export async function action() {
  const userId = await getCurrentUserId()
  if (!userId) return redirect('/signin')

  const contact = await createContact(userId)
  if (!contact) throw new Error('Create contact error!')

  return redirect(`/my_contacts/${contact.id}/edit`)
}

const Contacts = () => {
  const { contacts } = useLoaderData()
  const navigate = useNavigate()
  const [searchFor, setSearchFor] = useState()
  const [contactsToShow, setContactsToShow] = useState(contacts)

  const logoutHandler = async () => {
    await logoutUser()
    navigate('/')
  }

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase()
    setSearchFor(query)

    if (query === '') {
      setContactsToShow(contacts)
      return
    }

    const newContacts = contacts.filter(
      (contact) =>
        contact.first.toLowerCase().includes(query) ||
        contact.last.toLowerCase().includes(query)
    )

    setContactsToShow(newContacts)
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
              <form
                className="flex-fill"
                role="search"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  id="q"
                  name="q"
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchFor}
                  onChange={handleSearch}
                />
              </form>
              <Form method="post">
                <button className="btn btn-primary" type="submit">
                  New
                </button>
              </Form>
            </div>

            <hr className="my-4 border-primary" />

            <div className="list-group">
              {contactsToShow?.length > 0 ? (
                contactsToShow.map((contact) => (
                  <NavLink
                    to={`./${contact.id}`}
                    key={contact.id}
                    className={({ isActive, isPending }) =>
                      classNames(
                        'list-group-item list-group-item-action',
                        { active: isActive },
                        {
                          'list-group-item-secondary': isPending,
                          'list-group-item-primary': !isPending,
                        }
                      )
                    }
                  >
                    {contact.first} {contact.last}
                  </NavLink>
                ))
              ) : (
                <p>No contacts yet.</p>
              )}
            </div>
          </div>

          <div>
            <hr className="my-4 border-secondary" />
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-outline-secondary"
                onClick={logoutHandler}
              >
                Login Out
              </button>
            </div>
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
