import { useQuery } from 'react-query'
import { getUsers } from '../api'

export default function UserCount() {
  console.log('UserCount is rendered')
  const usersQuery = useQuery('users', getUsers)

  return (
    <p>
      Total:{' '}
      {usersQuery.isLoading ? (
        <span>loading...</span>
      ) : (
        <span>
          <b>{usersQuery.data?.length}</b> users.
        </span>
      )}
    </p>
  )
}
