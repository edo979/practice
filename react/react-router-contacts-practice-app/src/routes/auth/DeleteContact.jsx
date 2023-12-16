import { redirect } from 'react-router-dom'
import { getCurrentUserId } from '../../db/users'
import { deleteContact } from '../../db/contacts'

export async function action({ params }) {
  const userId = await getCurrentUserId()
  if (!userId) return redirect('/signin')

  await deleteContact(userId, params.contactId)

  return redirect('/my_contacts')
}
