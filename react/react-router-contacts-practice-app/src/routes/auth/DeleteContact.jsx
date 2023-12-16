import { redirect } from 'react-router-dom'
import { getCurrentUserId } from '../../db/users'
import { deleteContact } from '../../db/contacts'

export async function action({ params }) {
  const userId = await getCurrentUserId()
  if (!userId) return redirect('/signin')

  const isDeleted = await deleteContact(userId, params.contactId)
  if (!isDeleted) throw new Error('Error while deleting contact!')

  return redirect('/my_contacts')
}
