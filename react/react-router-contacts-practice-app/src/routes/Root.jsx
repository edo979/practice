import { useState, useEffect } from 'react'
import { getContacts } from '../db/firebaseInit'
import UserNav from '../components/UserNav'
import { Outlet, useLoaderData } from 'react-router-dom'

export async function loader() {
  const contacts = await getContacts()
  //const contacts = []

  return { contacts }
}

const Root = () => {
  let { contacts } = useLoaderData()

  // useEffect(() => {
  //   const getFromFirebase = async () => {
  //     contacts = await getContacts()
  //   }

  //   getFromFirebase()
  // }, [contacts])

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
