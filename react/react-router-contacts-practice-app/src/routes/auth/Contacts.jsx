import { useEffect, useState } from 'react'
import {
  Outlet,
  Form,
  useLoaderData,
  redirect,
  useNavigate,
  NavLink,
} from 'react-router-dom'
import classNames from 'classnames'
import { createContact, getContacts } from '../../db/contacts'
import { getCurrentUserId, logoutUser } from '../../db/users'

export async function loader() {
  const userId = await getCurrentUserId()
  if (!userId) return redirect('/signin')

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
  const [searchFor, setSearchFor] = useState('')
  const [contactsToShow, setContactsToShow] = useState([])

  useEffect(() => {
    if (!searchFor) {
      setContactsToShow(contacts)
      return
    }

    const newContacts = contacts.filter(
      (contact) =>
        contact.first.toLowerCase().includes(searchFor) ||
        contact.last.toLowerCase().includes(searchFor)
    )

    setContactsToShow(newContacts)
  }, [contacts, searchFor])

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
                  onChange={(e) => setSearchFor(e.target.value.toLowerCase())}
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
                    <div className="d-flex justify-content-between">
                      <span>
                        {contact.first} {contact.last}
                      </span>
                      {contact.favorite && <span>❤</span>}
                    </div>
                  </NavLink>
                ))
              ) : (
                <p>No contacts to show.</p>
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
