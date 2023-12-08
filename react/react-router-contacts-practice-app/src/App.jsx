import { useState } from 'react'
import { getContacts } from './db/firebaseInit'
import { useEffect } from 'react'
import Header from './components/Header'

const App = () => {
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
      <h1>Contacts:</h1>
      {contacts.map((contact) => (
        <ul key={contact.id}>
          <li>{contact.id}</li>
          <li>{contact.name}</li>
          <li>{contact.phone}</li>
        </ul>
      ))}
    </div>
  )
}

export default App
