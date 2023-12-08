import { useState, useEffect } from 'react'
import { getContacts } from '../db/firebaseInit'
import Header from '../components/Header'

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
      <Header />

      <div className="row mt-2">
        <div className="col-4 bg-secondary text-body-emphasis">
          <div className="d-flex gap-2">
            <form className="flex-fill" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            <button className="btn btn-primary">New</button>
          </div>

          {contacts.map((contact) => (
            <ul key={contact.id}>
              <li>{contact.id}</li>
              <li>{contact.name}</li>
              <li>{contact.phone}</li>
            </ul>
          ))}
        </div>
        <div className="col-8"></div>
      </div>
    </div>
  )
}

export default Root
