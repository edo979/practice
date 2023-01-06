import { useQuery } from 'react-query'
import { getUsers } from '../api'

export default function UserCount() {
  const usersQuery = useQuery('users', getUsers)

  return (
    <p className="pl-2">
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
