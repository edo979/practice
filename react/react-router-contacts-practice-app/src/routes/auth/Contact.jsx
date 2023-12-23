import {
  redirect,
  useLoaderData,
  Link,
  Form,
  useFetcher,
} from 'react-router-dom'
import { editContact, getSingleContact } from '../../db/contacts'
import { getCurrentUserId } from '../../db/users'

export async function loader({ params }) {
  const userId = await getCurrentUserId()
  if (!userId) return redirect('/signin')

  const contact = await getSingleContact(userId, params.contactId)

  return { contact }
}

export async function action({ request, params }) {
  const userId = await getCurrentUserId()
  if (!userId) return redirect('/signin')

  const formData = await request.formData()
  const favorite = formData.get('favorite') === 'true'

  const isUpdated = await editContact(userId, params.contactId, { favorite })

  if (!isUpdated) throw new Error('Error when try add to favorite!')

  return null
}

const Contact = () => {
  const { contact } = useLoaderData()

  return (
    <div className="d-flex align-items-start gap-4 mt-4 px-lg-5">
      <img className="rounded-4 img-fluid" src={contact.avatar} />
      <div>
        <div className="d-flex gap-1 align-items-start ">
          <h2>
            {contact.first} {contact.last}
          </h2>
          <Favorite contact={contact} />
        </div>
        <p className="fs-3 text-info">{contact.twitter}</p>
        <div dangerouslySetInnerHTML={{ __html: contact.notes }}></div>

        <div className="d-flex gap-2">
          <Link to={`./edit`} className="btn btn-light text-primary shadow-sm">
            Edit
          </Link>
          <Form method="post" action="destroy">
            <button
              type="submit"
              className="btn btn-light text-danger shadow-sm"
              onClick={(e) => {
                if (confirm('Delete contact, are you shure?')) return
                e.preventDefault()
              }}
            >
              Delete
            </button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Contact

function Favorite({ contact }) {
  const fetcher = useFetcher()
  const favorite = contact.favorite

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        className="btn btn-ghost"
      >
        {favorite ? '❤' : '🤍'}
      </button>
    </fetcher.Form>
  )
}
