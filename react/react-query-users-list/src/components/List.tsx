import { useQuery } from 'react-query'
import { getUsers, User } from '../api'
import ListItem from './ListItem'

type ListProps = {
  users?: User[]
  serverStatus: string
}

export default function List() {
  const usersQuery = useQuery('users', getUsers)

  return (
    <div>
      {usersQuery.isLoading && <p>Loading...</p>}
      {usersQuery.isSuccess && (
        <ul className="user-list">
          {usersQuery.data?.map((user) => (
            <ListItem user={user} key={user.id} />
          ))}
        </ul>
      )}
      {usersQuery.isError && <p>Sorry, an error is ocured!</p>}
    </div>
  )
}
