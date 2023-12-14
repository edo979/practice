import { useLoaderData } from 'react-router-dom'
import Star from '../../components/Star'
import { getSingleContact } from '../../db/contacts'

export async function loader({ params }) {
  const contact = await getSingleContact(params.contactId)
  console.log(contact)
  return { contact }
}

const Contact = () => {
  const { contact } = useLoaderData()

  return (
    <div className="d-flex gap-4 mt-4 px-lg-5">
      <img className="rounded-4 img-fluid" src={contact?.avatar} />
      <div>
        <div className="d-flex gap-1 align-items-start ">
          <h2>
            {contact.first} {contact.last}{' '}
          </h2>
          <button className="btn btn-ghost">
            <Star fill={contact?.favorite} />
          </button>
        </div>
        <p className="fs-3 text-info">{contact?.twitter}</p>
        <p>{contact?.notes}</p>

        <div className="d-flex gap-2">
          <button className="btn btn-light text-primary shadow-sm">Edit</button>
          <button className="btn btn-light text-danger shadow-sm">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact
