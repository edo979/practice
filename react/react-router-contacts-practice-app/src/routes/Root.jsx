import { useState, useEffect } from 'react'
import { getContacts } from '../db/firebaseInit'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const Root = () => {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    const getFromFirebase = async () => {
      setContacts(await getContacts())
    }

    getFromFirebase()
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div
          className="col-4 bg-primary-subtle text-body-emphasis"
          style={{ minHeight: '100vh' }}
        >
          <div className="d-flex gap-2 mt-4">
            <form className="flex-fill" role="search">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            <button className="btn btn-primary">New</button>
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

export default Root
