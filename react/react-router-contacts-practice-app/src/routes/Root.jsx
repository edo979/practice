import { Link } from 'react-router-dom'
import UserNav from '../components/UserNav'

const Root = () => {
  return (
    <main className="container py-4">
      <header className="pb-3 mb-5 border-bottom">
        <UserNav />
      </header>

      <div className="p-5 mb-5 bg-body-tertiary rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">My Contacts app</h1>
          <p className="col-md-8 fs-4">
            Save your contacts and find it later when you need it. With this app
            you can create, edit data and image for you contact. Stay in touch
            with your college, friend, family. Start using Contact app today.
          </p>
          <Link
            to="/my_contacts"
            className="btn btn-primary btn-lg"
            type="button"
          >
            👉 Go To Contacts
          </Link>
        </div>
      </div>

      <div className="row align-items-md-stretch">
        <div className="col-md-6">
          <div className="h-100 p-5 text-bg-dark rounded-3">
            <h2>Change the data</h2>
            <p>
              Change different data about contact, add image for easy
              identifying a person. You can easily update all contact data very
              easy. Wan't delete contact it is not problem, simple click button
              for deleting contact.
            </p>
            <p className="text-center fs-4">👩👨👵👴🤴👳‍♂️</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="h-100 p-5 bg-body-tertiary border rounded-3">
            <h2>Add new contact</h2>
            <p>
              Meet new people and want to have all data: name, twitter profile,
              image and more on one place. This is perfect app for you. Simple
              create new contact with all data you want then store it in
              database for later viewing. Easy find contact with search bar.
            </p>
            <p className="text-center fs-3">✏ 📝 🗃</p>
          </div>
        </div>
      </div>

      <footer className="pt-3 mt-5 text-body-secondary border-top">
        © 2023 - edo979
      </footer>
    </main>
  )
}

export default Root
