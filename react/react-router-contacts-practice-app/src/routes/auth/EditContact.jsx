import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from 'react-router-dom'
import { editContact } from '../../db/contacts'
import { getCurrentUserId } from '../../db/users'
import { useRef, useState } from 'react'
import { uploadImageToStorage } from '../../db/storage'
import { EditAvatar } from '../../components/EditAvatar'

export async function action({ request, params }) {
  const userId = await getCurrentUserId()
  if (!userId) return redirect('/signin')

  const updates = {}
  const imageUploadError = false

  // Mutate updates object
  for (const entry of await request.formData()) {
    if (entry[1] !== '') {
      if (entry[0] === 'image') {
        // Upload image to storage
        // get link then sent data to update contact
        const imageURL = await uploadImageToStorage(entry[1], params.contactId)

        if (imageURL) {
          updates.avatar = imageURL
        } else {
          updates.avatar = 'https://picsum.photos/200'
          imageUploadError = true
        }

        continue
      }

      updates[entry[0]] = entry[1]
    }
  } // end for

  const contact = await editContact(userId, params.contactId, updates)

  if (!contact || imageUploadError)
    throw new Error(
      `Error with database server. Contact is not updated. Please try again.
      ${imageUploadError && 'Error saving image to server.'}
      `
    )

  return redirect(`./../`)
}

const EditContact = () => {
  const actionData = useActionData()
  const { contact } = useLoaderData()
  const navigation = useNavigation()
  const [selectedImage, setSelectedImage] = useState(null)
  const [resizedImage, setResizedImage] = useState(null)
  const submit = useSubmit()
  const first = useRef(null)
  const last = useRef(null)
  const twitter = useRef(null)
  const notes = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.set('first', first.current.value)
    formData.set('last', last.current.value)
    formData.set('twitter', twitter.current.value)
    formData.set('notes', notes.current.value)

    if (resizedImage) {
      formData.set('image', resizedImage)
    }

    submit(formData, { method: 'post', encType: 'multipart/form-data' })
  }

  let content = null

  if (navigation.state === 'loading') {
    content = (
      <div className="row">
        <div className="col">
          <div className="alert alert-info" role="alert">
            Loading...
          </div>
        </div>
      </div>
    )
  } else if (navigation.state === 'submitting') {
    content = (
      <div className="row">
        <div className="col">
          <div className="alert alert-info" role="alert">
            Saving...
          </div>
        </div>
      </div>
    )
  } else if (navigation.state === 'idle') {
    content = (
      <>
        {contact ? (
          <Form className="mx-sm-2 my-sm-5 m-5" onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="first" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-5">
                <input
                  ref={first}
                  type="text"
                  name="first"
                  id="first"
                  className="form-control"
                  placeholder="First"
                  maxLength={15}
                  minLength={2}
                  defaultValue={contact.first}
                />
              </div>

              <div className="col-sm-5 mt-3 mt-sm-0">
                <input
                  ref={last}
                  type="text"
                  name="last"
                  id="last"
                  className="form-control"
                  placeholder="Last"
                  maxLength={15}
                  minLength={2}
                  defaultValue={contact.last}
                />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="twitter" className="col-sm-2 col-form-label">
                Twitter
              </label>
              <div className="col-sm-10">
                <input
                  ref={twitter}
                  type="text"
                  name="twitter"
                  id="twitter"
                  className="form-control"
                  placeholder="@jack"
                  maxLength={30}
                  minLength={2}
                  defaultValue={contact.twitter}
                />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="image" className="col-sm-2 col-form-label">
                Image
              </label>
              <div className="col-sm-10">
                {selectedImage ? (
                  <EditAvatar img={selectedImage} setImg={setResizedImage} />
                ) : (
                  <img src={contact.avatar} className="img-thumbnail" />
                )}

                <input
                  type="file"
                  name="image"
                  id="image"
                  className="form-control mt-2"
                  accept="image/*"
                  onChange={(e) => {
                    setSelectedImage(e.target.files[0])
                  }}
                />
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="notes"
                className="col-sm-2 col-form-label"
                maxLength={250}
              >
                Notes
              </label>
              <div className="col-sm-10">
                <textarea
                  ref={notes}
                  name="notes"
                  id="notes"
                  className="form-control"
                  rows={5}
                  defaultValue={contact.notes}
                  placeholder="Add some notes..."
                />
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Link to={-1} className="btn btn-secondary" type="button">
                Cancel
              </Link>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={navigation.state !== 'idle'}
              >
                Submit
              </button>
            </div>
          </Form>
        ) : (
          <div>Error loading contacts.</div>
        )}
      </>
    )
  }

  return content
}

export default EditContact
